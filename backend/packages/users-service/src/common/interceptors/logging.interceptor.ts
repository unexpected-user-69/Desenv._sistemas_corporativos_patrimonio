import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, finalize } from 'rxjs';
import type { Request, Response } from 'express';

/**
 * Interceptor para logging de requisições HTTP.
 * 
 * Baseado no padrão do Aurora Platform.
 * Registra método, rota, status code e tempo de resposta.
 * Utiliza níveis de log apropriados baseados no status HTTP.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url } = req;
    const now = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const res = context.switchToHttp().getResponse<Response>();
        const status = res?.statusCode ?? 200;
        const ms = Date.now() - now;
        const message = `${method} ${url} ${status} - ${ms}ms`;
        if (status >= 500) this.logger.error(message);
        else if (status >= 400) this.logger.warn(message);
        else this.logger.log(message);
      }),
    );
  }
}







