import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { NotificationJobData, NotificationJobResult } from '../interfaces/notification-job-data.interface';
import { NotificationSenderService } from '../services/notification-sender.service';
import { NotificationStructuredLoggerService } from '../observability/notification-structured-logger.service';

/**
 * Processor para processar jobs de notificação da fila
 */
@Processor('notification-queue')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(
    private readonly notificationSender: NotificationSenderService,
    private readonly structuredLogger: NotificationStructuredLoggerService,
  ) {}

  @Process('send-notification')
  async handleNotificationJob(
    job: Job<NotificationJobData>,
  ): Promise<NotificationJobResult> {
    const { eventKey, data, recipient, attempt = 1, messageId } = job.data;

    this.logger.log(
      `Processando notificação: ${eventKey} (attempt ${attempt}/${job.opts.attempts}, messageId: ${messageId})`,
    );

    // Log estruturado
    this.structuredLogger.logQueueProcessing(
      messageId || `job-${job.id}`,
      eventKey,
      job.id.toString(),
      attempt,
    );

    try {
      // Enviar notificação
      await this.notificationSender.sendNotification(eventKey, data, recipient);

      this.logger.log(`Notificação enviada com sucesso: ${eventKey} (messageId: ${messageId})`);

      return {
        success: true,
        messageId,
        channel: 'multi',
      };
    } catch (error: any) {
      this.logger.error(
        `Erro ao processar notificação ${eventKey} (attempt ${attempt}):`,
        error.message,
      );

      // Se ainda há tentativas, o BullMQ vai reenfileirar automaticamente
      // Se não, vai para DLQ
      throw error; // Re-throw para que o BullMQ gerencie a reentrega
    }
  }

  /**
   * Handler para jobs que falharam após todas as tentativas (DLQ)
   * Este handler é chamado automaticamente pelo BullMQ quando um job falha
   */
  async handleFailedNotification(job: Job<NotificationJobData>, error: Error) {
    const { eventKey, messageId } = job.data;

    this.logger.error(
      `Notificação falhou após todas as tentativas: ${eventKey} (messageId: ${messageId})`,
      error.stack,
    );

    // Job já está na DLQ (removeOnFail configurado)
    // Aqui podemos adicionar lógica adicional, como:
    // - Notificar administradores
    // - Registrar em tabela de DLQ customizada
    // - Enviar para sistema de monitoramento
  }
}

