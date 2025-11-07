import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationTemplate, NotificationChannel } from '../entities/notification-template.entity';
import { NotificationPolicy } from '../entities/notification-policy.entity';
import { Webhook } from '../entities/webhook.entity';
import { NotificationLog, NotificationStatus } from '../entities/notification-log.entity';
import { TemplateEngineService } from './template-engine.service';
import { EmailChannelService } from './channels/email-channel.service';
import { WebhookChannelService } from './channels/webhook-channel.service';
import { NotificationStructuredLoggerService } from '../observability/notification-structured-logger.service';
import { NotificationTracingService } from '../observability/notification-tracing.service';

/**
 * Serviço responsável por processar e enviar notificações
 */
@Injectable()
export class NotificationSenderService {
  private readonly logger = new Logger(NotificationSenderService.name);

  constructor(
    @InjectRepository(NotificationTemplate)
    private templateRepository: Repository<NotificationTemplate>,
    @InjectRepository(NotificationPolicy)
    private policyRepository: Repository<NotificationPolicy>,
    @InjectRepository(Webhook)
    private webhookRepository: Repository<Webhook>,
    @InjectRepository(NotificationLog)
    private logRepository: Repository<NotificationLog>,
    private templateEngine: TemplateEngineService,
    private emailChannel: EmailChannelService,
    private webhookChannel: WebhookChannelService,
    private structuredLogger: NotificationStructuredLoggerService,
    private tracing: NotificationTracingService,
  ) {}

  /**
   * Processa e envia uma notificação baseada em um evento
   * Este método é chamado pelo processor da fila ou diretamente (modo síncrono)
   */
  async sendNotification(
    eventKey: string,
    data: Record<string, any>,
    recipient?: string,
  ): Promise<void> {
    const startTime = Date.now();
    const traceId = this.tracing.startTrace('send-notification', {
      eventKey,
      recipient: recipient || 'N/A',
    });

    try {
      // Buscar política para o evento
      const policy = await this.policyRepository.findOne({
        where: { eventKey, enabled: true },
      });

      if (!policy) {
        this.logger.warn(`Nenhuma política encontrada para evento: ${eventKey}`);
        return;
      }

      // Processar cada canal configurado
      for (const channel of policy.channels) {
        const spanId = this.tracing.addSpan(traceId, `send-to-${channel}`, { channel });
        try {
          await this.sendToChannel(channel, eventKey, data, recipient, policy.priority);
          this.tracing.finishSpan(traceId, spanId, { success: 1 });
        } catch (error: any) {
          this.tracing.finishSpan(traceId, spanId, { success: 0, error: error.message });
          throw error;
        }
      }

      this.tracing.finishTrace(traceId);
    } catch (error: any) {
      const durationMs = Date.now() - startTime;
      this.logger.error(`Erro ao processar notificação para evento ${eventKey}:`, error);
      
      this.structuredLogger.logNotificationFailed(
        eventKey,
        'multi',
        recipient || 'N/A',
        `trace-${traceId}`,
        error.message,
        1,
      );

      this.tracing.finishTrace(traceId);

      await this.createLog(eventKey, NotificationChannel.EMAIL, NotificationStatus.FAILED, {
        error: error.message,
        durationMs,
        recipient,
      });
    }
  }

  /**
   * Envia notificação para um canal específico
   */
  private async sendToChannel(
    channel: string,
    eventKey: string,
    data: Record<string, any>,
    recipient?: string,
    priority?: string,
  ): Promise<void> {
    const startTime = Date.now();
    let status = NotificationStatus.PENDING;
    let error: string | undefined;

    try {
      // Buscar template para o canal
      const template = await this.templateRepository.findOne({
        where: { key: eventKey, channel: channel as NotificationChannel },
        order: { version: 'DESC' }, // Pegar versão mais recente
      });

      if (!template) {
        throw new Error(`Template não encontrado para evento ${eventKey} e canal ${channel}`);
      }

      // Renderizar template
      const rendered = this.templateEngine.renderTemplate(template, data);

      // Enviar via canal apropriado
      switch (channel) {
        case NotificationChannel.EMAIL:
          if (!recipient) {
            throw new Error('Destinatário não fornecido para canal email');
          }
          const emailResult = await this.emailChannel.sendEmail(
            recipient,
            rendered.subject || 'Notificação',
            rendered.body,
          );
          status = emailResult.success ? NotificationStatus.SENT : NotificationStatus.FAILED;
          error = emailResult.error;
          break;

        case NotificationChannel.WEBHOOK:
          // Buscar webhooks ativos
          const webhooks = await this.webhookRepository.find({
            where: { enabled: true },
          });

          for (const webhook of webhooks) {
            const webhookResult = await this.webhookChannel.sendWebhook(webhook, {
              event: eventKey,
              data,
              rendered: rendered,
            });

            // Criar log para cada webhook
            await this.createLog(
              eventKey,
              NotificationChannel.WEBHOOK,
              webhookResult.success ? NotificationStatus.SENT : NotificationStatus.FAILED,
              {
                durationMs: Date.now() - startTime,
                recipient: webhook.url,
                error: webhookResult.error,
              },
            );
          }
          return; // Já criou logs, não precisa criar outro

        case NotificationChannel.SLACK:
        case NotificationChannel.TEAMS:
          // TODO: Implementar canais Slack e Teams
          this.logger.warn(`Canal ${channel} ainda não implementado`);
          status = NotificationStatus.FAILED;
          error = `Canal ${channel} não implementado`;
          break;

        default:
          throw new Error(`Canal desconhecido: ${channel}`);
      }

      const durationMs = Date.now() - startTime;

      // Log estruturado
      if (status === NotificationStatus.SENT) {
        this.structuredLogger.logNotificationSent(
          eventKey,
          channel,
          recipient || 'N/A',
          `trace-${Date.now()}`,
          durationMs,
        );
      } else if (status === NotificationStatus.FAILED) {
        this.structuredLogger.logNotificationFailed(
          eventKey,
          channel,
          recipient || 'N/A',
          `trace-${Date.now()}`,
          error || 'Unknown error',
          1,
        );
      }

      // Criar log de notificação
      await this.createLog(eventKey, channel as NotificationChannel, status, {
        durationMs,
        recipient,
        error,
      });
    } catch (err: any) {
      status = NotificationStatus.FAILED;
      error = err.message;
      await this.createLog(eventKey, channel as NotificationChannel, status, {
        durationMs: Date.now() - startTime,
        recipient,
        error,
      });
    }
  }

  /**
   * Cria um log de notificação
   */
  private async createLog(
    eventKey: string,
    channel: NotificationChannel,
    status: NotificationStatus,
    options: {
      durationMs?: number;
      recipient?: string;
      error?: string;
    },
  ): Promise<void> {
    const log = this.logRepository.create({
      eventKey,
      channel,
      status,
      attempts: 1,
      durationMs: options.durationMs,
      recipient: options.recipient,
      error: options.error,
    });

    await this.logRepository.save(log);
  }
}

