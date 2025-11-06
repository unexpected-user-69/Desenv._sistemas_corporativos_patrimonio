import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { NotificationJobData, NotificationJobResult } from '../interfaces/notification-job-data.interface';
import * as crypto from 'crypto';

/**
 * Serviço responsável por enfileirar notificações
 */
@Injectable()
export class NotificationQueueService {
  private readonly logger = new Logger(NotificationQueueService.name);

  constructor(
    @InjectQueue('notification-queue')
    private readonly notificationQueue: Queue<NotificationJobData>,
  ) {}

  /**
   * Adiciona uma notificação à fila
   */
  async enqueueNotification(
    eventKey: string,
    data: Record<string, any>,
    recipient?: string,
    priority: string = 'medium',
  ): Promise<string> {
    // Gerar messageId para idempotência
    const messageId = this.generateMessageId(eventKey, data, recipient);

    const jobData: NotificationJobData = {
      eventKey,
      data,
      recipient,
      priority,
      attempt: 1,
      messageId,
    };

    // Configurar opções baseadas na prioridade
    const jobOptions = this.getJobOptions(priority, messageId);

    const job = await this.notificationQueue.add('send-notification', jobData, jobOptions);

    this.logger.log(
      `Notificação enfileirada: ${eventKey} (jobId: ${job.id}, messageId: ${messageId})`,
    );

    return messageId;
  }

  /**
   * Gera um messageId único baseado no conteúdo
   */
  private generateMessageId(
    eventKey: string,
    data: Record<string, any>,
    recipient?: string,
  ): string {
    const content = JSON.stringify({ eventKey, data, recipient });
    return crypto.createHash('sha256').update(content).digest('hex').substring(0, 32);
  }

  /**
   * Retorna opções de job baseadas na prioridade
   */
  private getJobOptions(priority: string, messageId: string) {
    const baseOptions = {
      jobId: messageId, // Usar messageId como jobId para idempotência
      removeOnComplete: {
        age: 24 * 3600, // 24 horas
        count: 1000,
      },
      removeOnFail: {
        age: 7 * 24 * 3600, // 7 dias (DLQ)
      },
    };

    switch (priority) {
      case 'urgent':
        return {
          ...baseOptions,
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 1000, // 1 segundo inicial
          },
          priority: 1, // Maior prioridade
        };

      case 'high':
        return {
          ...baseOptions,
          attempts: 4,
          backoff: {
            type: 'exponential',
            delay: 2000, // 2 segundos inicial
          },
          priority: 2,
        };

      case 'medium':
        return {
          ...baseOptions,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 3000, // 3 segundos inicial
          },
          priority: 3,
        };

      case 'low':
        return {
          ...baseOptions,
          attempts: 2,
          backoff: {
            type: 'exponential',
            delay: 5000, // 5 segundos inicial
          },
          priority: 4,
        };

      default:
        return {
          ...baseOptions,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 3000,
          },
          priority: 3,
        };
    }
  }

  /**
   * Retorna estatísticas da fila
   */
  async getQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.notificationQueue.getWaitingCount(),
      this.notificationQueue.getActiveCount(),
      this.notificationQueue.getCompletedCount(),
      this.notificationQueue.getFailedCount(),
      this.notificationQueue.getDelayedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
      total: waiting + active + completed + failed + delayed,
    };
  }
}

