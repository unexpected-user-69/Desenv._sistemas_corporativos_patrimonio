import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface NotificationSpan {
  spanId: string;
  traceId: string;
  operation: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  tags: Record<string, string | number>;
  logs: Array<{ timestamp: number; message: string; level: string }>;
}

export interface NotificationTrace {
  traceId: string;
  spans: NotificationSpan[];
  startTime: number;
  endTime?: number;
  duration?: number;
}

/**
 * Serviço simplificado de tracing para notificações
 * Em produção, integrar com OpenTelemetry ou Jaeger
 */
@Injectable()
export class NotificationTracingService {
  private readonly logger = new Logger(NotificationTracingService.name);
  private readonly traces: Map<string, NotificationTrace> = new Map();

  /**
   * Inicia um novo trace
   */
  startTrace(operation: string, tags: Record<string, string | number> = {}): string {
    const traceId = this.generateTraceId();
    const spanId = this.generateSpanId();

    const span: NotificationSpan = {
      spanId,
      traceId,
      operation,
      startTime: Date.now(),
      tags: {
        service: 'notifications',
        ...tags,
      },
      logs: [],
    };

    const trace: NotificationTrace = {
      traceId,
      spans: [span],
      startTime: Date.now(),
    };

    this.traces.set(traceId, trace);

    this.logger.debug(`Trace iniciado: ${traceId} (${operation})`);

    return traceId;
  }

  /**
   * Adiciona um span filho a um trace
   */
  addSpan(
    traceId: string,
    operation: string,
    tags: Record<string, string | number> = {},
  ): string {
    const trace = this.traces.get(traceId);
    if (!trace) {
      this.logger.warn(`Trace ${traceId} não encontrado`);
      return this.generateSpanId();
    }

    const spanId = this.generateSpanId();
    const span: NotificationSpan = {
      spanId,
      traceId,
      operation,
      startTime: Date.now(),
      tags: {
        service: 'notifications',
        ...tags,
      },
      logs: [],
    };

    trace.spans.push(span);

    return spanId;
  }

  /**
   * Finaliza um span
   */
  finishSpan(traceId: string, spanId: string, tags?: Record<string, string | number>): void {
    const trace = this.traces.get(traceId);
    if (!trace) {
      return;
    }

    const span = trace.spans.find((s) => s.spanId === spanId);
    if (!span) {
      return;
    }

    span.endTime = Date.now();
    span.duration = span.endTime - span.startTime;

    if (tags) {
      span.tags = { ...span.tags, ...tags };
    }

    this.logger.debug(`Span finalizado: ${spanId} (${span.operation}) - ${span.duration}ms`);
  }

  /**
   * Finaliza um trace
   */
  finishTrace(traceId: string): NotificationTrace | null {
    const trace = this.traces.get(traceId);
    if (!trace) {
      return null;
    }

    trace.endTime = Date.now();
    trace.duration = trace.endTime - trace.startTime;

    // Log do trace completo
    this.logger.debug(
      `Trace finalizado: ${traceId} - ${trace.spans.length} spans - ${trace.duration}ms`,
    );

    // Manter trace por 1 hora (em produção, enviar para sistema de tracing)
    setTimeout(() => {
      this.traces.delete(traceId);
    }, 60 * 60 * 1000);

    return trace;
  }

  /**
   * Adiciona log a um span
   */
  addLog(
    traceId: string,
    spanId: string,
    message: string,
    level: 'info' | 'warn' | 'error' | 'debug' = 'info',
  ): void {
    const trace = this.traces.get(traceId);
    if (!trace) {
      return;
    }

    const span = trace.spans.find((s) => s.spanId === spanId);
    if (!span) {
      return;
    }

    span.logs.push({
      timestamp: Date.now(),
      message,
      level,
    });
  }

  /**
   * Obtém um trace
   */
  getTrace(traceId: string): NotificationTrace | null {
    return this.traces.get(traceId) || null;
  }

  /**
   * Gera um trace ID único
   */
  private generateTraceId(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Gera um span ID único
   */
  private generateSpanId(): string {
    return crypto.randomBytes(8).toString('hex');
  }
}



