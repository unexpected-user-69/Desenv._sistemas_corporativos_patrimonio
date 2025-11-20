import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Estratégia JWT para validação de tokens.
 * 
 * Baseado no padrão do Aurora Platform.
 * Valida tokens JWT emitidos pelo auth-service.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') || 'default-secret',
    });
  }

  /**
   * Valida o payload do token JWT.
   * 
   * @param payload - Payload do token JWT
   * @returns Usuário autenticado
   */
  async validate(payload: any) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Token inválido');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles || [],
      isAdmin: payload.roles?.includes('ADMIN') || false,
    };
  }
}



