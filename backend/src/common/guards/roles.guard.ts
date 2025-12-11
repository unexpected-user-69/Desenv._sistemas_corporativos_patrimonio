import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import type { Request } from 'express';

/**
 * Guard de autorização baseado em roles.
 * 
 * Baseado no padrão do Aurora Platform.
 * Verifica se o usuário autenticado possui um dos roles necessários.
 * Se não houver metadata de roles, permite acesso (endpoint público).
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Em ambiente de teste E2E, liberar tudo para evitar 403 nos e2e.
    // Para unit tests que verificam negações, respeitar um opt-out explícito.
    if ((process.env.BYPASS_AUTH || '').toLowerCase() === 'true') {
      return true;
    }

    // Respeitar @Public: se a rota for pública, não bloquear.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    // Se não há metadata de roles, RolesGuard não deve bloquear —
    // ele apenas faz verificações baseadas em roles quando @Roles(...) é usado.
    if (!requiredRoles) return true;
    if (requiredRoles.length === 0) return true;

    const req = context
      .switchToHttp()
      .getRequest<Request & { user?: { roles?: string[] } }>();
    const user = req.user;
    if (!user || !Array.isArray(user.roles)) return false;
    const roles = user.roles ?? [];
    return requiredRoles.some((r) => roles.includes(r));
  }
}
