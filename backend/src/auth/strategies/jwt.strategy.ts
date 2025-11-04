import { Injectable, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * Interface para usuário autenticado.
 * Adaptado para UUID (string) conforme padrão do Patrimônio.
 */
export interface AuthUser {
  sub: string; // UUID em vez de number
  email: string;
  roles: string[]; // ex.: ['student'] | ['teacher'] | ['admin']
}

export type AccessTokenPayload = AuthUser & {
  iat: number;
  exp: number;
};

/**
 * Estratégia JWT do Passport.
 * 
 * Baseada no padrão do Aurora Platform, adaptada para UUID.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Optional() private readonly config?: ConfigService) {
    // Resolve secret explicitamente para poder lançar erro em produção se faltar.
    const resolvedSecret =
      config?.get<string>('JWT_ACCESS_SECRET') ?? process.env.JWT_ACCESS_SECRET;

    if (!resolvedSecret) {
      if (process.env.NODE_ENV === 'production') {
        // Em produção queremos falhar rápido se o secret não estiver configurado.
        throw new Error(
          'JwtStrategy requires JWT_ACCESS_SECRET when running in production',
        );
      }
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: resolvedSecret ?? 'dev_access_secret',
      ignoreExpiration: false,
      // Se você usa issuer/audience, descomente e configure no .env:
      // issuer: config.get<string>('JWT_ISSUER'),
      // audience: config.get<string>('JWT_AUDIENCE'),
    });
  }

  /**
   * É chamado automaticamente se a assinatura e a expiração forem válidas.
   * O valor retornado aqui vira `request.user` nos controllers/guards.
   */
  validate(payload: AccessTokenPayload): AuthUser {
    // Sanitiza e garante o shape canônico
    const { sub, email, roles } = payload;

    // (Opcional) Regras extras de sanidade:
    if (typeof sub !== 'string') {
      // Você pode lançar um UnauthorizedException aqui se desejar
      // mas, em geral, o token não deveria chegar até aqui errado.
    }

    return { sub, email, roles: Array.isArray(roles) ? roles : [] };
  }
}

