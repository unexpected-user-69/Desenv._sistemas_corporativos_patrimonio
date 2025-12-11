import { Injectable, Logger } from '@nestjs/common';

export interface Span {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  tags?: Record<string, string | number>;
  logs?: Array<{ timestamp: number; fields: Record<string, any> }>;
  children?: Span[];
}

export interface Trace {
  traceId: string;
  executionId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  spans: Span[];
}

@Injectable()
export class TracingService {
  private readonly logger = new Logger(TracingService.name);
  private readonly traces: Map<string, Trace> = new Map();

  /**
   * Inicia um novo trace
   */
  startTrace(executionId: string): string {
    const traceId = `trace-${executionId}-${Date.now()}`;
    const trace: Trace = {
      traceId,
      executionId,
      startTime: Date.now(),
      spans: [],
    };
    this.traces.set(executionId, trace);
    return traceId;
  }

  /**
   * Inicia um span
   */
  startSpan(
    executionId: string,
    spanName: string,
    tags?: Record<string, string | number>,
  ): string {
    const trace = this.traces.get(executionId);
    if (!trace) {
      this.logger.warn(`Trace not found for execution ${executionId}`);
      return '';
    }

    const span: Span = {
      name: spanName,
      startTime: Date.now(),
      tags: tags || {},
      logs: [],
      children: [],
    };

    trace.spans.push(span);
    return spanName;
  }

  /**
   * Finaliza um span
   */
  endSpan(executionId: string, spanName: string): void {
    const trace = this.traces.get(executionId);
    if (!trace) {
      return;
    }

    const span = trace.spans.find((s) => s.name === spanName);
    if (span) {
      span.endTime = Date.now();
      span.duration = span.endTime - span.startTime;
    }
  }

  /**
   * Adiciona log a um span
   */
  addSpanLog(
    executionId: string,
    spanName: string,
    fields: Record<string, any>,
  ): void {
    const trace = this.traces.get(executionId);
    if (!trace) {
      return;
    }

    const span = trace.spans.find((s) => s.name === spanName);
    if (span) {
      if (!span.logs) {
        span.logs = [];
      }
      span.logs.push({
        timestamp: Date.now(),
        fields,
      });
    }
  }

  /**
   * Finaliza um trace
   */
  endTrace(executionId: string): Trace | null {
    const trace = this.traces.get(executionId);
    if (!trace) {
      return null;
    }

    trace.endTime = Date.now();
    trace.duration = trace.endTime - trace.startTime;

    // Manter apenas últimas 1000 traces
    if (this.traces.size > 1000) {
      const entries = Array.from(this.traces.entries());
      const toRemove = entries.slice(0, entries.length - 1000);
      for (const [key] of toRemove) {
        this.traces.delete(key);
      }
    }

    return trace;
  }

  /**
   * Obtém um trace
   */
  getTrace(executionId: string): Trace | null {
    return this.traces.get(executionId) || null;
  }
}





