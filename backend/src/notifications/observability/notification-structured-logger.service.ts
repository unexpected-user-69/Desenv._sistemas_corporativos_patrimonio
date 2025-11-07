import { Injectable, LoggerService, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';

export interface NotificationLogContext {
  eventKey?: string;
  messageId?: string;
  channel?: string;
  recipient?: string;
  templateId?: string;
  policyId?: string;
  webhookId?: string;
  jobId?: string;
  attempt?: number;
  durationMs?: number;
  [key: string]: any;
}

@Injectable()
export class NotificationStructuredLoggerService implements LoggerService {
  private readonly logger: winston.Logger;
  private readonly defaultLogger: Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly winstonLogger: winston.Logger,
  ) {
    this.logger = winstonLogger;
    this.defaultLogger = new Logger(NotificationStructuredLoggerService.name);
  }

  /**
   * Log estruturado com contexto de notificação
   */
  logWithContext(
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    context: NotificationLogContext,
  ): void {
    // Adicionar correlação IDs
    const correlationIds: string[] = [];
    if (context.messageId) {
      correlationIds.push(`message:${context.messageId}`);
    }
    if (context.jobId) {
      correlationIds.push(`job:${context.jobId}`);
    }
    if (context.eventKey) {
      correlationIds.push(`event:${context.eventKey}`);
    }

    const logData: Record<string, any> = {
      message,
      ...context,
      timestamp: new Date().toISOString(),
      service: 'notifications',
    };

    if (correlationIds.length > 0) {
      logData.correlationIds = correlationIds;
    }

    try {
      switch (level) {
        case 'info':
          this.logger.info(logData);
          break;
        case 'warn':
          this.logger.warn(logData);
          break;
        case 'error':
          this.logger.error(logData);
          break;
        case 'debug':
          this.logger.debug(logData);
          break;
      }
    } catch (error) {
      // Fallback para logger padrão se winston falhar
      switch (level) {
        case 'info':
          this.defaultLogger.log(message, JSON.stringify(context));
          break;
        case 'warn':
          this.defaultLogger.warn(message, JSON.stringify(context));
          break;
        case 'error':
          this.defaultLogger.error(message, JSON.stringify(context));
          break;
        case 'debug':
          this.defaultLogger.debug(message, JSON.stringify(context));
          break;
      }
    }
  }

  /**
   * Log de envio de notificação
   */
  logNotificationSent(
    eventKey: string,
    channel: string,
    recipient: string,
    messageId: string,
    durationMs: number,
  ): void {
    this.logWithContext('info', 'Notificação enviada com sucesso', {
      eventKey,
      channel,
      recipient,
      messageId,
      durationMs,
      status: 'sent',
    });
  }

  /**
   * Log de falha de notificação
   */
  logNotificationFailed(
    eventKey: string,
    channel: string,
    recipient: string,
    messageId: string,
    error: string,
    attempt: number,
  ): void {
    this.logWithContext('error', 'Falha ao enviar notificação', {
      eventKey,
      channel,
      recipient,
      messageId,
      error,
      attempt,
      status: 'failed',
    });
  }

  /**
   * Log de processamento de fila
   */
  logQueueProcessing(
    messageId: string,
    eventKey: string,
    jobId: string,
    attempt: number,
  ): void {
    this.logWithContext('info', 'Processando notificação da fila', {
      messageId,
      eventKey,
      jobId,
      attempt,
      status: 'processing',
    });
  }

  log(message: string, context?: string): void {
    if (this.logger) {
      this.logger.info(message, { context });
    } else {
      this.defaultLogger.log(message, context);
    }
  }

  error(message: string, trace?: string, context?: string): void {
    if (this.logger) {
      this.logger.error(message, { trace, context });
    } else {
      this.defaultLogger.error(message, trace, context);
    }
  }

  warn(message: string, context?: string): void {
    if (this.logger) {
      this.logger.warn(message, { context });
    } else {
      this.defaultLogger.warn(message, context);
    }
  }

  debug(message: string, context?: string): void {
    if (this.logger) {
      this.logger.debug(message, { context });
    } else {
      this.defaultLogger.debug(message, context);
    }
  }

  verbose(message: string, context?: string): void {
    if (this.logger) {
      this.logger.verbose(message, { context });
    } else {
      this.defaultLogger.verbose(message, context);
    }
  }
}

