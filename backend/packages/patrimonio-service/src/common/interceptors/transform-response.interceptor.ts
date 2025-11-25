import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * Interceptor para padronizar o formato de resposta da API.
 * 
 * Baseado no padrão do Aurora Platform.
 * Envelopa todas as respostas em formato { data: ... }.
 * 
 * Para respostas paginadas, transforma em { data: [...], meta: {...} }.
 * Para respostas void/undefined, retorna { message: ... }.
 * 
 * ⚠️ NOTA: Sua ativação deve ser alinhada com os clientes da API.
 */
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        // Se data é undefined ou null (void), retorna mensagem padrão
        if (data === undefined || data === null) {
          return { message: 'Operação realizada com sucesso' };
        }

        // Verifica se é uma resposta paginada (tem data, total, page, etc.)
        if (
          typeof data === 'object' &&
          data !== null &&
          'data' in data &&
          'total' in data &&
          'page' in data &&
          'limit' in data
        ) {
          const paginated = data as {
            data: unknown[];
            total: number;
            page: number;
            limit: number;
            totalPages?: number;
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
          };

          return {
            data: paginated.data,
            meta: {
              page: paginated.page,
              limit: paginated.limit,
              total: paginated.total,
              totalPages: paginated.totalPages ?? Math.ceil(paginated.total / paginated.limit),
              hasNextPage: paginated.hasNextPage ?? paginated.page < (paginated.totalPages ?? Math.ceil(paginated.total / paginated.limit)),
              hasPreviousPage: paginated.hasPreviousPage ?? paginated.page > 1,
            },
          };
        }

        // Para outras respostas, envolve em { data: ... }
        return { data };
      }),
    );
  }
}




