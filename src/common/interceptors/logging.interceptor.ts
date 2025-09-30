import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, url, body, query, params } = request as unknown as Record<
      string,
      unknown
    >;
    const userAgent = request.get('User-Agent') || '';
    const ip = request.ip;

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data: unknown) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          const statusCode = response.statusCode;

          this.logger.log({
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
            userAgent,
            ip,
            query,
            params,
            body: method === 'POST' || method === 'PUT' ? body : undefined,
            responseSize: JSON.stringify(data).length,
          });
        },
        error: (error: Error & { status?: number }) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          const statusCode = error.status || 500;

          this.logger.error({
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
            userAgent,
            ip,
            query,
            params,
            body: method === 'POST' || method === 'PUT' ? body : undefined,
            error: error.message,
            stack: error.stack,
          });
        },
      }),
    );
  }
}
