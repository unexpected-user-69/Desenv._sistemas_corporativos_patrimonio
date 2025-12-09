import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

/**
 * ServiceTokenGuard - Guard para autenticação service-to-service
 * 
 * Valida o token de serviço recebido no header `x-service-token` e compara
 * com o SERVICE_TOKEN configurado via variável de ambiente.
 * 
 * Aplica o princípio Fail-Closed Security: rejeita automaticamente se:
 * - Token ausente
 * - Token inválido
 * - SERVICE_TOKEN não configurado
 * 
 * Suporta Dual Token Strategy para rotação sem downtime:
 * - SERVICE_TOKEN_CURRENT: token atual
 * - SERVICE_TOKEN_NEXT: próximo token (durante transição)
 * 
 * Injeta um usuário virtual com privilégios de administrador se válido.
 */
@Injectable()
export class ServiceTokenGuard implements CanActivate {
  private readonly logger = new Logger(ServiceTokenGuard.name);
  private readonly currentToken: string | undefined;
  private readonly nextToken: string | undefined;

  constructor(private configService: ConfigService) {
    // Prioriza process.env diretamente (permite atualizações em tempo de execução)
    this.currentToken = process.env.SERVICE_TOKEN_CURRENT || process.env.SERVICE_TOKEN;
    this.nextToken = process.env.SERVICE_TOKEN_NEXT;

    // Validação de configuração
    if (!this.currentToken) {
      this.logger.warn(
        '⚠️ SERVICE_TOKEN não configurado. Comunicação service-to-service será rejeitada.',
      );
    } else {
      // Valida que o token tem pelo menos 32 caracteres (segredo forte)
      if (this.currentToken.length < 32) {
        this.logger.warn(
          '⚠️ SERVICE_TOKEN muito curto. Recomenda-se pelo menos 32 caracteres para segurança.',
        );
      }
      this.logger.log('✅ ServiceTokenGuard configurado (token length: ' + this.currentToken.length + ')');
    }

    if (this.nextToken) {
      this.logger.log('✅ Dual Token Strategy ativada (SERVICE_TOKEN_NEXT configurado)');
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<
      Request & {
        user?: {
          sub: string;
          isAdmin: boolean;
          roles?: string[];
          isServiceAccount?: boolean;
        };
      }
    >();

    // Fail-Closed Security: se SERVICE_TOKEN não está configurado, rejeita
    if (!this.currentToken) {
      this.logger.error(
        '❌ SERVICE_TOKEN não configurado. Rejeitando requisição service-to-service.',
      );
      throw new UnauthorizedException(
        'Service-to-service authentication not configured',
      );
    }

    // Extrai o token do header
    const providedToken = request.headers['x-service-token'] as string | undefined;

    // Fail-Closed Security: se token ausente, rejeita
    if (!providedToken) {
      this.logger.warn(
        `❌ Requisição service-to-service sem token. IP: ${request.ip}, Path: ${request.path}`,
      );
      throw new UnauthorizedException('Service token required');
    }

    // Valida o token (aceita CURRENT ou NEXT durante transição)
    const isValid =
      this.validateToken(providedToken, this.currentToken) ||
      (this.nextToken && this.validateToken(providedToken, this.nextToken));

    if (!isValid) {
      // Log sem expor o token (segurança OWASP)
      this.logger.warn(
        `❌ Token service-to-service inválido. IP: ${request.ip}, Path: ${request.path}, Token length: ${providedToken.length}`,
      );
      throw new UnauthorizedException('Invalid service token');
    }

    // Log de sucesso (sem expor o token)
    this.logger.debug(
      `✅ Autenticação service-to-service bem-sucedida. IP: ${request.ip}, Path: ${request.path}`,
    );

    // Injeta usuário virtual com privilégios de administrador
    request.user = {
      sub: 'service-account',
      isAdmin: true,
      roles: ['ADMIN', 'SERVICE'],
      isServiceAccount: true,
    };

    return true;
  }

  /**
   * Valida o token usando comparação segura (timing-safe)
   * Previne timing attacks comparando todos os caracteres
   */
  private validateToken(provided: string, expected: string): boolean {
    if (provided.length !== expected.length) {
      return false;
    }

    // Comparação timing-safe
    let result = 0;
    for (let i = 0; i < provided.length; i++) {
      result |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
    }

    return result === 0;
  }
}

