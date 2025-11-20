import { Injectable } from '@nestjs/common';
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
  roles: string[]; // ex.: ['ADMIN'] | ['MANAGER'] | ['OPERATOR']
}

export type AccessTokenPayload = AuthUser & {
  iat: number;
  exp: number;
};

/**
 * Estratégia JWT do Passport.
 * 
 * Baseada no padrão do Aurora Platform, adaptada para UUID.
 * 
 * Agora usa ConfigService diretamente (sem @Optional) pois ConfigModule está global.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    // Resolve secret usando ConfigService (agora disponível globalmente)
    // Prioriza process.env diretamente para garantir consistência com JwtModule
    // O ConfigService pode não ter carregado variáveis definidas em runtime (testes)
    const resolvedSecret =
      process.env.JWT_ACCESS_SECRET ?? configService.get<string>('JWT_ACCESS_SECRET');

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
      // issuer: configService.get<string>('JWT_ISSUER'),
      // audience: configService.get<string>('JWT_AUDIENCE'),
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
