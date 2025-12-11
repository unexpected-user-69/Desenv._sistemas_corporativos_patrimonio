import { RefreshToken } from '../../src/auth/entities/refresh-token.entity';
import { randomUUID } from 'crypto';

let seq = 1;

export function makeRefreshTokenEntity(
  overrides?: Partial<RefreshToken>,
): Partial<RefreshToken> {
  const now = new Date();
  const base: Partial<RefreshToken> = {
    id: seq++,
    userId: randomUUID(), // UUID em vez de Integer
    tokenHash: 'hashed-token',
    issuedAt: now,
    expiresAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7), // 7 dias
    revokedAt: null,
    replacedByTokenId: null,
    ip: null,
    userAgent: null,
    createdAt: now,
    updatedAt: now,
  };
  return { ...base, ...(overrides ?? {}) };
}

