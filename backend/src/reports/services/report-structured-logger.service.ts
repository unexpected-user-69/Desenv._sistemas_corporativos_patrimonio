import { Injectable, LoggerService, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';

export interface ReportLogContext {
  requestId?: string;
  userId?: string;
  type?: string;
  model?: string;
  status?: string;
  catalogKey?: string;
  jobId?: string;
  durationMs?: number;
  error?: string;
  [key: string]: any;
}

@Injectable()
export class ReportStructuredLoggerService implements LoggerService {
  private readonly logger: winston.Logger;
  private readonly defaultLogger: Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly winstonLogger: winston.Logger,
  ) {
    this.logger = winstonLogger;
    this.defaultLogger = new Logger(ReportStructuredLoggerService.name);
  }

  /**
   * Log estruturado com contexto de relatório
   */
  logWithContext(
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    context: ReportLogContext,
  ): void {
    // Adicionar correlação IDs
    const correlationIds: string[] = [];
    if (context.requestId) {
      correlationIds.push(`request:${context.requestId}`);
    }
    if (context.jobId) {
      correlationIds.push(`job:${context.jobId}`);
    }
    if (context.userId) {
      correlationIds.push(`user:${context.userId}`);
    }

    const logData: Record<string, any> = {
      message,
      ...context,
      timestamp: new Date().toISOString(),
      service: 'reports',
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
   * Log de criação de solicitação
   */
  logRequestCreated(
    requestId: string,
    userId: string,
    type: string,
    model: string,
    catalogKey?: string,
  ): void {
    this.logWithContext('info', 'Solicitação de relatório criada', {
      requestId,
      userId,
      type,
      model,
      catalogKey,
      status: 'created',
    });
  }

  /**
   * Log de processamento de relatório
   */
  logRequestProcessed(
    requestId: string,
    userId: string,
    type: string,
    model: string,
    status: string,
    durationMs: number,
  ): void {
    this.logWithContext('info', 'Relatório processado', {
      requestId,
      userId,
      type,
      model,
      status,
      durationMs,
    });
  }

  /**
   * Log de falha de processamento
   */
  logRequestFailed(
    requestId: string,
    userId: string,
    type: string,
    model: string,
    error: string,
    durationMs: number,
  ): void {
    this.logWithContext('error', 'Falha ao processar relatório', {
      requestId,
      userId,
      type,
      model,
      error,
      durationMs,
      status: 'failed',
    });
  }

  /**
   * Log de quota excedida
   */
  logQuotaExceeded(
    userId: string,
    limit: number,
    used: number,
    periodType: string,
  ): void {
    this.logWithContext('warn', 'Quota de relatórios excedida', {
      userId,
      limit,
      used,
      periodType,
      status: 'quota_exceeded',
    });
  }

  /**
   * Log de processamento de fila
   */
  logQueueProcessing(
    requestId: string,
    jobId: string,
    type: string,
    model: string,
    attempt: number,
  ): void {
    this.logWithContext('info', 'Processando relatório da fila', {
      requestId,
      jobId,
      type,
      model,
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

