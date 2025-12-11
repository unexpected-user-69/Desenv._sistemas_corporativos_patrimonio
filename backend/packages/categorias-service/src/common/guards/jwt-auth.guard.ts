import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Guard de autenticação JWT baseado no padrão Aurora.
 * 
 * Utiliza Passport JWT Strategy quando configurada.
 * Respeita o decorator @Public() para rotas públicas.
 * Em desenvolvimento, pode auto-injetar usuário fake se DEV_AUTO_AUTH=true.
 * 
 * Adaptado para UUID (sub será string em vez de number).
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Verifica se a rota é pública usando o decorator @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota é pública, permite acesso sem autenticação
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<
      Request & {
        user?: { sub: string; isAdmin: boolean; roles?: string[] };
      }
    >();

    const authHeader = request.get?.('authorization') ?? '';

    if (process.env.NODE_ENV !== 'production') {
      // Se houver um header Authorization, delega para o Passport para validar
      // um token real mesmo em desenvolvimento.
      if (authHeader?.startsWith('Bearer ')) {
        return super.canActivate(context) as boolean | Promise<boolean>;
      }

      // Apenas auto-injeta um usuário fake se DEV_AUTO_AUTH estiver explicitamente
      // definido como 'true'.
      if ((process.env.DEV_AUTO_AUTH ?? 'false').toLowerCase() === 'true') {
        request.user = { sub: '00000000-0000-0000-0000-000000000001', isAdmin: true, roles: ['ADMIN'] };
        return true;
      }

      // Sem header de auth e auto-auth desabilitado: nega acesso (comporta-se como produção).
      return false;
    }
    // AuthGuard retorna boolean | Promise<boolean> | Observable<boolean>
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  /**
   * Trata erros de autenticação do Passport.
   * Converte erros do Passport em UnauthorizedException do NestJS.
   */
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Se houver um erro, lança a exceção
    if (err) {
      // Log do erro para debug (apenas em desenvolvimento/testes)
      if (process.env.NODE_ENV !== 'production') {
        console.error('[JwtAuthGuard] Erro na validação do token:', err.message || err);
      }
      throw err;
    }
    
    // Se o usuário não foi encontrado, verifica o motivo
    if (!user) {
      // info pode conter informações sobre o erro de validação do token
      const errorMessage = info?.message || info?.name || 'Invalid or expired token';
      // Log do erro para debug (apenas em desenvolvimento/testes)
      if (process.env.NODE_ENV !== 'production') {
        console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
        console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
      }
      throw new UnauthorizedException(errorMessage);
    }
    
    return user;
  }
}






