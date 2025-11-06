import { Injectable, LoggerService, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';

export interface StructuredLogContext {
  executionId?: string;
  jobId?: string;
  connectorKey?: string;
  entity?: string;
  type?: string;
  [key: string]: any;
}

@Injectable()
export class StructuredLoggerService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly winstonLogger: winston.Logger,
  ) {
    this.logger = winstonLogger;
  }

  /**
   * Log estruturado com correlação
   */
  logWithContext(
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    context: StructuredLogContext,
  ): void {
    // Adicionar correlação IDs
    const correlationIds: string[] = [];
    if (context.executionId) {
      correlationIds.push(`execution:${context.executionId}`);
    }
    if (context.jobId) {
      correlationIds.push(`job:${context.jobId}`);
    }

    const logData: Record<string, any> = {
      message,
      ...context,
      timestamp: new Date().toISOString(),
      service: 'integrations-erp',
    };

    if (correlationIds.length > 0) {
      logData.correlationIds = correlationIds;
    }

    this.logger[level](logData);
  }

  log(message: string, context?: string): void {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string): void {
    this.logger.verbose(message, { context });
  }
}

