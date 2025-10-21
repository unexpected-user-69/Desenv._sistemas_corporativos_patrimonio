import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '../../modules/audit/audit.service';
import { AUDIT_KEY, AuditOptions } from '../decorators/audit.decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly auditService: AuditService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditOptions = this.reflector.get<AuditOptions>(AUDIT_KEY, context.getHandler());
    
    if (!auditOptions) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const startTime = Date.now();

    return next.handle().pipe(
      tap(async (data) => {
        try {
          const responseTime = Date.now() - startTime;
          
          await this.auditService.createAuditLog({
            userId: request.user?.id,
            action: auditOptions.action,
            entityType: auditOptions.entityType,
            entityId: data?.id || request.params?.id,
            oldValues: auditOptions.skipOldValues ? undefined : request.body,
            newValues: auditOptions.skipNewValues ? undefined : data,
            ipAddress: request.ip,
            userAgent: request.headers['user-agent'],
            sessionId: request.sessionID,
            service: 'audit-service',
            endpoint: request.url,
            description: auditOptions.description,
          });
        } catch (error) {
          console.error('Erro ao criar log de auditoria:', error);
        }
      }),
    );
  }
}
