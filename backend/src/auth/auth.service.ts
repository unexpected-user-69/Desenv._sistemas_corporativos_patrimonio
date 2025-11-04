import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, IsNull } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token.entity';
import { UsersService } from '../users/users.service';
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

/**
 * Interface para identidade do usuário.
 * Adaptado para UUID (string) conforme padrão do Patrimônio.
 */
export interface UserIdentity {
  id: string; // UUID
  email: string;
  name: string;
  roles: string[];
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
    private readonly jwt: JwtService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  /**
   * Valida credenciais do usuário usando UsersService.
   * 
   * ✅ Agente 03 implementou método validateCredentials no UsersService.
   */
  private async validateCredentials(
    email: string,
    password: string,
  ): Promise<UserIdentity | null> {
    try {
      // Usa o método validateCredentials do UsersService
      const user = await this.usersService.validateCredentials(email, password);

      if (!user) {
        return null;
      }

      // Converte User entity para UserIdentity
      // user.role é string (UserRole enum), convertemos para array
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: [user.role as string],
      };
    } catch {
      return null;
    }
  }

  /**
   * Busca usuário por ID.
   * 
   * ⚠️ TEMPORÁRIO: Este método será melhorado pelo Agente 03.
   */
  private async getUserById(userId: string): Promise<UserIdentity | null> {
    try {
      const user = await this.usersService.findOne(userId);
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: [user.role],
      };
    } catch {
      return null;
    }
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
    const tokenHash = await argon2.hash(raw);
    const entity = this.refreshRepo.create({
      userId,
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
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  // REFRESH: verifica hash, revoga atual, cria novo e retorna novo access+refresh
  async refresh(refreshTokenRaw: string, ip?: string, userAgent?: string) {
    if (!refreshTokenRaw)
      throw new BadRequestException('Missing refresh token');

    // Busca candidatos não revogados e não expirados (ordem decrescente)
    const candidates = await this.refreshRepo.find({
      where: { revokedAt: IsNull(), expiresAt: MoreThan(nowUtc()) },
      order: { id: 'DESC' },
    });

    let current: RefreshToken | undefined;
    for (const t of candidates) {
      if (await argon2.verify(t.tokenHash, refreshTokenRaw)) {
        current = t;
        break;
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
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  // LOGOUT: revoga o refresh atual
  async logout(refreshTokenRaw: string) {
    if (!refreshTokenRaw) return { revoked: 0 };

    const candidates = await this.refreshRepo.find({
      where: { revokedAt: IsNull(), expiresAt: MoreThan(nowUtc()) },
      order: { id: 'DESC' },
    });

    let current: RefreshToken | undefined;
    for (const t of candidates) {
      if (await argon2.verify(t.tokenHash, refreshTokenRaw)) {
        current = t;
        break;
      }
    }
    if (!current) return { revoked: 0 };

    current.revokedAt = nowUtc();
    await this.refreshRepo.save(current);
    return { revoked: 1 };
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

