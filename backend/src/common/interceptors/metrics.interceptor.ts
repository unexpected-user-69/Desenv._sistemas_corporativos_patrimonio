import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

export interface MetricsData {
  totalRequests: number;
  requestsByMethod: Record<string, number>;
  requestsByStatus: Record<number, number>;
  averageResponseTime: number;
  responseTimes: number[];
}

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  private metrics: MetricsData = {
    totalRequests: 0,
    requestsByMethod: {},
    requestsByStatus: {},
    averageResponseTime: 0,
    responseTimes: [],
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method } = request;

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          const statusCode = response.statusCode;

          this.updateMetrics(method, statusCode, duration);
        },
        error: (error: Error & { status?: number }) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          const statusCode = error.status || 500;

          this.updateMetrics(method, statusCode, duration);
        },
      }),
    );
  }

  private updateMetrics(
    method: string,
    statusCode: number,
    duration: number,
  ): void {
    // Incrementar contadores
    this.metrics.totalRequests++;
    this.metrics.requestsByMethod[method] =
      (this.metrics.requestsByMethod[method] || 0) + 1;
    this.metrics.requestsByStatus[statusCode] =
      (this.metrics.requestsByStatus[statusCode] || 0) + 1;

    // Atualizar tempos de resposta
    this.metrics.responseTimes.push(duration);

    // Manter apenas os últimos 1000 tempos de resposta para calcular média
    if (this.metrics.responseTimes.length > 1000) {
      this.metrics.responseTimes = this.metrics.responseTimes.slice(-1000);
    }

    // Calcular tempo médio de resposta
    const sum = this.metrics.responseTimes.reduce((acc, time) => acc + time, 0);
    this.metrics.averageResponseTime = Math.round(
      sum / this.metrics.responseTimes.length,
    );
  }

  getMetrics(): MetricsData {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.metrics = {
      totalRequests: 0,
      requestsByMethod: {},
      requestsByStatus: {},
      averageResponseTime: 0,
      responseTimes: [],
    };
  }
}
