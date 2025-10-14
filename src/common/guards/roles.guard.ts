import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/enums/user-role.enum';
import { ROLES_KEY } from './roles.decorator';

/**
 * Interface para usuário autenticado.
 * 
 * Esta interface define a estrutura esperada do usuário autenticado
 * quando a autenticação JWT estiver implementada.
 */
interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

/**
 * Guard para autorização baseada em roles.
 * 
 * Verifica se o usuário autenticado possui um dos roles necessários
 * para acessar o endpoint. Usa o Reflector para ler a metadata de roles
 * definida pelo decorator @Roles().
 * 
 * @example
 * ```typescript
 * // Registrado globalmente ou em módulos específicos
 * app.useGlobalGuards(new RolesGuard());
 * ```
 */
@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  /**
   * Determina se a requisição pode prosseguir baseado nos roles do usuário.
   * 
   * @param context - Contexto de execução da requisição
   * @returns true se o usuário tem permissão, false caso contrário
   */
  canActivate(context: ExecutionContext): boolean {
    // Obtém os roles necessários definidos pelo decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Se não há roles definidos, permite acesso (endpoint público)
    if (!requiredRoles) {
      return true;
    }

    // Obtém o usuário autenticado da requisição
    const request = context.switchToHttp().getRequest();
    const user: AuthenticatedUser = request.user;

    // Se não há usuário autenticado, nega acesso
    if (!user) {
      this.logger.warn(
        `Acesso negado: usuário não autenticado tentou acessar ${request.method} ${request.url}`,
        {
          method: request.method,
          url: request.url,
          timestamp: new Date().toISOString(),
        }
      );
      throw new ForbiddenException('Usuário não autenticado');
    }

    // Verifica se o usuário está ativo
    if (!user.isActive) {
      this.logger.warn(
        `Acesso negado: usuário inativo tentou acessar ${request.method} ${request.url}`,
        {
          userId: user.id,
          userEmail: user.email,
          method: request.method,
          url: request.url,
          timestamp: new Date().toISOString(),
        }
      );
      throw new ForbiddenException('Usuário inativo');
    }

    // Verifica se o usuário possui um dos roles necessários
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      this.logger.warn(
        `Acesso negado: usuário com role ${user.role} tentou acessar endpoint que requer roles: ${requiredRoles.join(', ')}`,
        {
          userId: user.id,
          userEmail: user.email,
          userRole: user.role,
          requiredRoles,
          method: request.method,
          url: request.url,
          timestamp: new Date().toISOString(),
        }
      );
      throw new ForbiddenException(
        `Acesso negado. Roles necessários: ${requiredRoles.join(', ')}`
      );
    }

    this.logger.log(
      `Acesso autorizado: usuário ${user.email} (${user.role}) acessou ${request.method} ${request.url}`,
      {
        userId: user.id,
        userEmail: user.email,
        userRole: user.role,
        method: request.method,
        url: request.url,
        timestamp: new Date().toISOString(),
      }
    );

    return true;
  }
}
