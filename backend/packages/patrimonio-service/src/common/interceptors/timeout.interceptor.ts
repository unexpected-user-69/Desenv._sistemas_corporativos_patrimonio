import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

/**
 * Interceptor para impor timeout em requisições HTTP.
 *
 * Evita requisições penduradas liberando recursos do servidor.
 * Configurável via parâmetro no construtor.
 *
 * @example
 * ```typescript
 * // Timeout padrão de 10 segundos
 * app.useGlobalInterceptors(new TimeoutInterceptor());
 *
 * // Timeout customizado de 30 segundos
 * app.useGlobalInterceptors(new TimeoutInterceptor(30000));
 * ```
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeoutInterceptor.name);
  private readonly timeoutMs: number;

  /**
   * Construtor do interceptor de timeout.
   *
   * @param timeoutMs - Tempo limite em milissegundos (padrão: 10000ms = 10s)
   */
  constructor(timeoutMs: number = 10000) {
    this.timeoutMs = timeoutMs;
  }

  /**
   * Intercepta a requisição e aplica timeout.
   *
   * @param context - Contexto de execução da requisição
   * @param next - Handler da próxima função no pipeline
   * @returns Observable com timeout aplicado
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    return next.handle().pipe(
      timeout(this.timeoutMs),
      catchError((error) => {
        if (error instanceof TimeoutError) {
          this.logger.warn(
            `Request timeout: ${method} ${url} (${this.timeoutMs}ms)`,
            {
              method,
              url,
              timeoutMs: this.timeoutMs,
              timestamp: new Date().toISOString(),
            },
          );

          return throwError(
            () =>
              new RequestTimeoutException(
                `A requisição excedeu o tempo limite de ${this.timeoutMs}ms`,
              ),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}


