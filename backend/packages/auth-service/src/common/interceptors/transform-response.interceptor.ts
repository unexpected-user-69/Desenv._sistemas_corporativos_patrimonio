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
 * ⚠️ NOTA: Sua ativação deve ser alinhada com os clientes da API.
 */
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(map((data: unknown) => ({ data })));
  }
}






