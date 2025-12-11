import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import type { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
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






