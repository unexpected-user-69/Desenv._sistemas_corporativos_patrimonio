import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';

/**
 * Guard de autenticação JWT (placeholder).
 *
 * Este guard é um placeholder que implementa CanActivate diretamente.
 * NÃO deve ser aplicado globalmente até que a estratégia JWT seja
 * configurada e implementada no projeto.
 *
 * @example
 * ```typescript
 * // Aplicação em endpoints específicos (quando JWT estiver implementado)
 * @Controller('protected')
 * export class ProtectedController {
 *   @Get('profile')
 *   @UseGuards(JwtAuthGuard)
 *   getProfile(@Request() req) {
 *     return req.user;
 *   }
 * }
 * ```
 *
 * @warning
 * Este guard não deve ser registrado globalmente até que:
 * 1. A estratégia JWT do Passport seja configurada
 * 2. O módulo de autenticação seja implementado
 * 3. Os tokens JWT sejam gerados e validados corretamente
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  /**
   * Determina se a requisição pode prosseguir baseado na autenticação JWT.
   *
   * @param context - Contexto de execução da requisição
   * @returns true se o usuário estiver autenticado, false caso contrário
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest() as any;

    // Log para debug (remover em produção)
    this.logger.debug(
      `JwtAuthGuard: verificando autenticação para ${request.method} ${request.url}`,
      {
        method: (request as any).method,
        url: (request as any).url,
        hasAuthHeader: !!(request as any).headers.authorization,
        timestamp: new Date().toISOString(),
      },
    );

    // Por enquanto, sempre retorna true (placeholder)
    // TODO: Implementar validação JWT real quando a estratégia estiver configurada
    this.logger.warn(
      'JwtAuthGuard está funcionando como placeholder. Implementar estratégia JWT real.',
      {
        method: (request as any).method,
        url: (request as any).url,
        timestamp: new Date().toISOString(),
      },
    );

    return true;
  }

  /**
   * Manipula erros de autenticação.
   *
   * @param err - Erro de autenticação
   * @param user - Usuário autenticado (se houver)
   * @param info - Informações adicionais do erro
   * @returns true se a autenticação for bem-sucedida, false caso contrário
   */
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error('Falha na autenticação JWT', {
        error: err?.message,
        info: info?.message,
        timestamp: new Date().toISOString(),
      });
      throw err || new UnauthorizedException('Token JWT inválido ou expirado');
    }

    this.logger.log(`Usuário autenticado: ${user.email}`, {
      userId: user.id,
      userEmail: user.email,
      userRole: user.role,
      timestamp: new Date().toISOString(),
    });

    return user;
  }
}
