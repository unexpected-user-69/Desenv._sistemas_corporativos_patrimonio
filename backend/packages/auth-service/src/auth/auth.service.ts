import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, IsNull } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { UsersHttpClient, UserIdentity } from './users-http-client';
import { HashService } from '../common/services/hash.service';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

function nowUtc(): Date {
  return new Date();
}
function addDays(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
    private readonly jwt: JwtService,
    private readonly usersHttpClient: UsersHttpClient,
    private readonly hashService: HashService,
  ) {}

  /**
   * Valida credenciais do usuário usando UsersHttpClient.
   * 
   * ✅ Implementado conforme requisito da atividade: comunicação HTTP
   * com o Users Service via UsersHttpClient.
   */
  private async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserIdentity | null> {
    // Usa o UsersHttpClient para validar credenciais via HTTP
    return await this.usersHttpClient.validateCredentials(email, password);
  }

  /**
   * Busca usuário por ID usando UsersHttpClient.
   * 
   * ✅ Implementado conforme requisito da atividade: comunicação HTTP
   * com o Users Service via UsersHttpClient.
   */
  private async getUserById(userId: string): Promise<UserIdentity | null> {
    // Usa o UsersHttpClient para buscar usuário via HTTP
    return await this.usersHttpClient.getUserById(userId);
  }

  // Assina access token curto e stateless
  private signAccess(user: UserIdentity) {
    return this.jwt.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles ?? [],
    });
  }

  // Emite um novo refresh (hash persistido) e retorna par {raw, entity}
  private async issueRefresh(
    userId: string,
    ip?: string,
    userAgent?: string,
  ): Promise<{ raw: string; entity: RefreshToken }> {
    const raw = crypto.randomBytes(48).toString('base64url'); // ~64+ chars
    // Hash rápido (SHA256) para lookup eficiente
    const lookupKey = crypto.createHash('sha256').update(raw).digest('hex');
    // Hash seguro (Argon2) para verificação final
    const tokenHash = await argon2.hash(raw);
    const entity = this.refreshRepo.create({
      userId,
      lookupKey,
      tokenHash,
      issuedAt: nowUtc(),
      expiresAt: addDays(Number(process.env.REFRESH_EXPIRES_DAYS ?? '7')),
      revokedAt: null,
      replacedByTokenId: null,
      ip: ip ?? null,
      userAgent: userAgent ?? null,
    });
    await this.refreshRepo.save(entity);
    return { raw, entity };
  }

  // LOGIN: valida no Users, emite access + refresh
  async login(
    email: string,
    password: string,
    ip?: string,
    userAgent?: string,
  ) {
    const user = await this.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.signAccess(user);
    const { raw: refreshToken } = await this.issueRefresh(
      user.id,
      ip,
      userAgent,
    );
    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.roles[0] },
    };
  }

  // REFRESH: verifica hash, revoga atual, cria novo e retorna novo access+refresh
  async refresh(refreshTokenRaw: string, ip?: string, userAgent?: string) {
    if (!refreshTokenRaw)
      throw new BadRequestException('Missing refresh token');

    // Validação: detecta se está tentando usar um JWT (access token) como refresh token
    // JWTs contêm pontos (.), refresh tokens são base64url sem pontos
    if (refreshTokenRaw.includes('.')) {
      throw new BadRequestException(
        'Token inválido: parece ser um access token (JWT). Use o refreshToken retornado no login, não o accessToken! O refreshToken é um token base64url sem pontos, não um JWT.',
      );
    }

    // Calcula lookupKey (hash rápido) para pré-filtrar tokens
    const lookupKey = crypto.createHash('sha256').update(refreshTokenRaw).digest('hex');
    const now = nowUtc();

    // Busca apenas tokens com o lookupKey correspondente, não revogados e não expirados
    // Isso reduz drasticamente o número de tokens a verificar
    const candidates = await this.refreshRepo.find({
      where: {
        lookupKey,
        revokedAt: IsNull(),
        expiresAt: MoreThan(now),
      },
      order: { id: 'DESC' },
      take: 10, // Limite adicional de segurança (normalmente deve haver apenas 1)
    });

    // Verifica o hash Argon2 apenas nos candidatos pré-filtrados
    let current: RefreshToken | undefined;
    for (const t of candidates) {
      try {
        if (await argon2.verify(t.tokenHash, refreshTokenRaw)) {
          current = t;
          break;
        }
      } catch (error) {
        // Se houver erro na verificação (token inválido), continua procurando
        continue;
      }
    }

    // Se não encontrou, também verifica tokens antigos sem lookupKey (backward compatibility)
    if (!current) {
      // Busca tokens mais recentes sem lookupKey (para compatibilidade com tokens antigos)
      const fallbackCandidates = await this.refreshRepo.find({
        where: {
          lookupKey: IsNull(),
          revokedAt: IsNull(),
          expiresAt: MoreThan(now),
        },
        order: { id: 'DESC' },
        take: 50, // Limite para evitar timeout
      });

      for (const t of fallbackCandidates) {
        try {
          if (await argon2.verify(t.tokenHash, refreshTokenRaw)) {
            current = t;
            // Atualiza o token antigo com lookupKey para futuras buscas serem mais rápidas
            if (!t.lookupKey) {
              t.lookupKey = lookupKey;
              await this.refreshRepo.save(t);
            }
            break;
          }
        } catch (error) {
          continue;
        }
      }
    }

    if (!current)
      throw new UnauthorizedException('Invalid or expired refresh token');

    // Rotação: cria novo e marca o atual como revogado apontando para o novo
    const { raw: newRaw, entity: newEntity } = await this.issueRefresh(
      current.userId,
      ip,
      userAgent,
    );
    current.revokedAt = nowUtc();
    current.replacedByTokenId = newEntity.id;
    await this.refreshRepo.save(current);

    const user = await this.getUserById(current.userId);
    if (!user) throw new UnauthorizedException('User not found');

    const accessToken = this.signAccess(user);
    return {
      accessToken,
      refreshToken: newRaw,
      user: { id: user.id, email: user.email, name: user.name, role: user.roles[0] },
    };
  }

  // LOGOUT: revoga o refresh atual
  async logout(refreshTokenRaw: string) {
    if (!refreshTokenRaw) return { message: 'Logout successful', revoked: 0 };

    // Calcula lookupKey (hash rápido) para pré-filtrar tokens
    const lookupKey = crypto.createHash('sha256').update(refreshTokenRaw).digest('hex');
    const now = nowUtc();

    // Busca apenas tokens com o lookupKey correspondente
    const candidates = await this.refreshRepo.find({
      where: {
        lookupKey,
        revokedAt: IsNull(),
        expiresAt: MoreThan(now),
      },
      order: { id: 'DESC' },
      take: 10,
    });

    let current: RefreshToken | undefined;
    for (const t of candidates) {
      try {
        if (await argon2.verify(t.tokenHash, refreshTokenRaw)) {
          current = t;
          break;
        }
      } catch (error) {
        continue;
      }
    }

    // Fallback para tokens antigos sem lookupKey
    if (!current) {
      const fallbackCandidates = await this.refreshRepo.find({
        where: {
          lookupKey: IsNull(),
          revokedAt: IsNull(),
          expiresAt: MoreThan(now),
        },
        order: { id: 'DESC' },
        take: 50,
      });

      for (const t of fallbackCandidates) {
        try {
          if (await argon2.verify(t.tokenHash, refreshTokenRaw)) {
            current = t;
            if (!t.lookupKey) {
              t.lookupKey = lookupKey;
              await this.refreshRepo.save(t);
            }
            break;
          }
        } catch (error) {
          continue;
        }
      }
    }

    if (!current) return { message: 'Logout successful', revoked: 0 };

    current.revokedAt = now;
    await this.refreshRepo.save(current);
    return { message: 'Logout successful', revoked: 1 };
  }

  // ME: introspecção de identidade a partir do sub do access (feito no controller)
  async me(userId: string) {
    const user = await this.getUserById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles ?? [],
    };
  }
}

