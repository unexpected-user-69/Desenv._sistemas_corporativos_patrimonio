import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { Request, Response } from 'express';

/**
 * Interface para dados de log estruturado.
 */
interface LogData {
  method: string;
  url: string;
  userAgent?: string;
  ip?: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
  userId?: string;
}

/**
 * Interceptor para logging estruturado de requisições HTTP.
 *
 * Registra informações como método, rota, status code, latência e dados do usuário.
 * Utiliza o Logger nativo do NestJS com níveis de log baseados no status HTTP.
 *
 * @example
 * ```typescript
 * // Registrado globalmente em main.ts
 * app.useGlobalInterceptors(new LoggingInterceptor());
 * ```
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * Intercepta a requisição e adiciona logging estruturado.
   *
   * @param context - Contexto de execução da requisição
   * @param next - Handler da próxima função no pipeline
   * @returns Observable com a resposta
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const startTime = Date.now();
    const { method, url, headers, ip } = request;
    const userAgent = headers['user-agent'];

    // Extrai userId se disponível (quando autenticação estiver implementada)
    const userId = (request as any).user?.id;

    return next.handle().pipe(
      tap({
        next: () => {
          // Log de sucesso
          this.logRequest({
            method,
            url,
            userAgent,
            ip,
            statusCode: response.statusCode,
            responseTime: Date.now() - startTime,
            timestamp: new Date().toISOString(),
            userId,
          });
        },
        error: (error) => {
          // Log de erro
          this.logRequest({
            method,
            url,
            userAgent,
            ip,
            statusCode: error.status || 500,
            responseTime: Date.now() - startTime,
            timestamp: new Date().toISOString(),
            userId,
          });
        },
      }),
      finalize(() => {
        // Garante que o log seja emitido mesmo em casos de erro
        // Este bloco é executado sempre, independente do resultado
      }),
    );
  }

  /**
   * Registra a requisição com o nível de log apropriado.
   *
   * @param logData - Dados estruturados para o log
   */
  private logRequest(logData: LogData): void {
    const {
      method,
      url,
      statusCode,
      responseTime,
      timestamp,
      userId,
      ip,
      userAgent,
    } = logData;

    const logMessage = `${method} ${url} ${statusCode} ${responseTime}ms`;
    const logContext = {
      method,
      url,
      statusCode,
      responseTime,
      timestamp,
      userId,
      ip,
      userAgent,
    };

    // Determina o nível de log baseado no status HTTP
    if (statusCode >= 500) {
      this.logger.error(logMessage, logContext);
    } else if (statusCode >= 400) {
      this.logger.warn(logMessage, logContext);
    } else {
      this.logger.log(logMessage, logContext);
    }
  }
}
