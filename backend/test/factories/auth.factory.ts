import { LoginDto } from '../../src/auth/dto/login.dto';
import { randomUUID } from 'crypto';

let authSeq = 1;

export function makeLoginDto(overrides?: Partial<LoginDto>): LoginDto {
  const base: LoginDto = {
    email: `user${authSeq}@example.com`,
    password: 'StrongP@ssw0rd!',
  };
  authSeq++;
  return { ...base, ...(overrides ?? {}) };
}

export function makeJwtPayload(overrides?: {
  sub?: string;
  email?: string;
  role?: string;
}) {
  return {
    sub: randomUUID(), // UUID
    email: `user${authSeq}@example.com`,
    role: 'STUDENT',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    ...overrides,
  };
}

