import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface para resposta padronizada.
 */
export interface StandardResponse<T = any> {
  data: T;
  meta?: {
    timestamp: string;
    path: string;
    method: string;
  };
}

/**
 * Interceptor para padronizar o formato de resposta da API.
 *
 * Envelopa todas as respostas em um formato consistente com `data` e `meta`.
 * Sua ativação deve ser alinhada com os clientes da API.
 *
 * @example
 * ```typescript
 * // Resposta original: { id: 1, name: "João" }
 * // Resposta transformada: {
 * //   data: { id: 1, name: "João" },
 * //   meta: { timestamp: "2025-10-14T14:30:00Z", path: "/users", method: "GET" }
 * // }
 * ```
 */
@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  /**
   * Intercepta a resposta e aplica o formato padronizado.
   *
   * @param context - Contexto de execução da requisição
   * @param next - Handler da próxima função no pipeline
   * @returns Observable com resposta transformada
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    return next.handle().pipe(
      map((data) => ({
        data,
        meta: {
          timestamp: new Date().toISOString(),
          path: url,
          method,
        },
      })),
    );
  }
}
