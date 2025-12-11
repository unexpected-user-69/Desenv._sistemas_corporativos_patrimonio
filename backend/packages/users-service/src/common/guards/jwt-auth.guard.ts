import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { IS_SERVICE_ONLY_KEY } from '../decorators/service-only.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isServiceOnly = this.reflector.getAllAndOverride<boolean>(IS_SERVICE_ONLY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se for service-only, permite (ServiceTokenGuard vai cuidar da autenticação)
    if (isServiceOnly) {
      return true;
    }

    const request = context.switchToHttp().getRequest<
      Request & {
        user?: { sub: string; isAdmin: boolean; roles?: string[] };
      }
    >();

    // Armazena se é público no request para uso no handleRequest
    (request as any).__isPublic = isPublic;

    const authHeader = request.get?.('authorization') ?? '';

    // Se for público mas tiver token, valida o token para popular req.user
    if (isPublic && authHeader?.startsWith('Bearer ')) {
      try {
        const result = await super.canActivate(context) as boolean;
        return result;
      } catch (error) {
        // Se falhar, permite continuar (é público)
        return true;
      }
    }

    // Se for público sem token, permite
    if (isPublic) {
      return true;
    }

    // Se não for público, valida normalmente
    if (process.env.NODE_ENV !== 'production') {
      if (authHeader?.startsWith('Bearer ')) {
        return super.canActivate(context) as boolean | Promise<boolean>;
      }

      if ((process.env.DEV_AUTO_AUTH ?? 'false').toLowerCase() === 'true') {
        request.user = { sub: '00000000-0000-0000-0000-000000000001', isAdmin: true, roles: ['ADMIN'] };
        return true;
      }

      return false;
    }
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isPublic = (request as any).__isPublic;

    // Se for público, não lança exceção mesmo se o token for inválido
    if (isPublic) {
      return user || null;
    }

    if (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[JwtAuthGuard] Erro na validação do token:', err.message || err);
      }
      throw err;
    }
    
    if (!user) {
      const errorMessage = info?.message || info?.name || 'Invalid or expired token';
      if (process.env.NODE_ENV !== 'production') {
        console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
      }
      throw new UnauthorizedException(errorMessage);
    }
    
    return user;
  }
}






