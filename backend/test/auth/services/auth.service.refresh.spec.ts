import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository, MoreThan, IsNull } from 'typeorm';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

// Mock argon2 para acelerar os testes
jest.mock('argon2', () => ({
  hash: jest.fn((input: string) => Promise.resolve(`hashed_${input}`)),
  verify: jest.fn((hash: string, plain: string) => {
    // Verifica se o hash corresponde ao plain (simulação simplificada)
    // O hash mockado é `hashed_${plain}`, então verificamos se o hash é igual a `hashed_${plain}`
    return Promise.resolve(hash === `hashed_${plain}`);
  }),
}));

import { AuthService } from '../../../src/auth/auth.service';
import { RefreshToken } from '../../../src/auth/entities/refresh-token.entity';
import { UsersHttpClient } from '../../../src/auth/users-http-client';
import { HashService } from '../../../src/common/services/hash.service';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { makeRefreshTokenEntity } from '../../factories/refresh-token.factory';
import { makeUserEntity } from '../../factories/user.factory';

describe('AuthService.refresh (unit)', () => {
  let service: AuthService;
  let refreshRepo: MockType<Repository<RefreshToken>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let hashService: Partial<HashService>;
  let jwt: Partial<JwtService>;

  beforeEach(async () => {
    refreshRepo = repositoryMockFactory<RefreshToken>();
    hashService = {
      compare: jest.fn(),
      hash: jest.fn().mockResolvedValue('hashed-token'),
    };
    usersHttpClient = {
      validateCredentials: jest.fn(),
      getUserById: jest.fn(),
    };
    jwt = {
      sign: jest.fn().mockReturnValue('new-access-token'),
    };

    const mod = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(RefreshToken), useValue: refreshRepo },
        { provide: UsersHttpClient, useValue: usersHttpClient },
        { provide: HashService, useValue: hashService },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = mod.get(AuthService);
  });

  it('should throw BadRequestException for missing refresh token', async () => {
    await expect(service.refresh('', '1.2.3.4')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw UnauthorizedException for invalid refresh token', async () => {
    // Mock para retornar array vazio em ambas as buscas (com lookupKey e fallback)
    refreshRepo.find.mockResolvedValue([]);

    await expect(service.refresh('invalid-token')).rejects.toThrow(
      UnauthorizedException,
    );

    // Verifica que foi chamado pelo menos uma vez (pode ser chamado duas vezes: com lookupKey e fallback)
    expect(refreshRepo.find).toHaveBeenCalled();
    
    // Verifica que a última chamada foi a busca de fallback (sem lookupKey)
    const lastCall = refreshRepo.find.mock.calls[refreshRepo.find.mock.calls.length - 1];
    expect(lastCall[0]).toMatchObject({
      where: expect.objectContaining({
        revokedAt: IsNull(),
        expiresAt: expect.any(Object), // MoreThan retorna um objeto FindOperator
      }),
      order: { id: 'DESC' },
    });
  });

  it('should return new tokens and revoke old refresh token', async () => {
    const refreshTokenRaw = 'valid-refresh-token';
    // Usa o hash mockado do argon2
    const oldTokenHash = `hashed_${refreshTokenRaw}`;
    const lookupKey = crypto.createHash('sha256').update(refreshTokenRaw).digest('hex');
    const oldToken = makeRefreshTokenEntity({
      id: 1,
      tokenHash: oldTokenHash,
      lookupKey,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 86400000), // +1 day
    }) as RefreshToken;

    // Mock para retornar o token na primeira chamada (busca com lookupKey)
    // e array vazio na segunda chamada (busca de fallback, caso não encontre)
    refreshRepo.find.mockResolvedValueOnce([oldToken]).mockResolvedValueOnce([]);
    
    // Mock do argon2.verify para retornar true quando o hash corresponde ao token
    (argon2.verify as jest.Mock).mockImplementation((hash: string, plain: string) => {
      return Promise.resolve(hash === `hashed_${plain}`);
    });
    
    refreshRepo.save.mockImplementation((e: Partial<RefreshToken>) =>
      Promise.resolve(Object.assign({ id: 2 }, e) as RefreshToken),
    );
    refreshRepo.create.mockImplementation(
      (e: Partial<RefreshToken>) => Object.assign({ id: 2 }, e) as RefreshToken,
    );

    const mockUser = makeUserEntity();
    usersHttpClient.getUserById = jest.fn().mockResolvedValue({
      id: mockUser.id,
      email: mockUser.email,
      roles: mockUser.role ? [mockUser.role] : [],
    });

    const res = await service.refresh(
      refreshTokenRaw,
      '1.2.3.4',
      'jest',
    );

    expect(res).toHaveProperty('accessToken', 'new-access-token');
    expect(res).toHaveProperty('refreshToken');
    expect(res.user).toHaveProperty('id');
    expect(res.user).toHaveProperty('email');

    // Old token should be revoked
    expect(oldToken.revokedAt).toBeTruthy();
    expect(oldToken.replacedByTokenId).toBe(2);
    expect(refreshRepo.save).toHaveBeenCalledWith(oldToken);
  });

  it('should throw UnauthorizedException if user not found', async () => {
    const refreshTokenRaw = 'valid-refresh-token';
    // Usa o hash mockado do argon2
    const oldTokenHash = `hashed_${refreshTokenRaw}`;
    const lookupKey = crypto.createHash('sha256').update(refreshTokenRaw).digest('hex');
    const oldToken = makeRefreshTokenEntity({
      id: 1,
      tokenHash: oldTokenHash,
      lookupKey,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 86400000),
    }) as RefreshToken;

    // Mock para retornar o token na primeira chamada (busca com lookupKey)
    // e array vazio na segunda chamada (busca de fallback, caso não encontre)
    refreshRepo.find.mockResolvedValueOnce([oldToken]).mockResolvedValueOnce([]);
    refreshRepo.save.mockImplementation((e: Partial<RefreshToken>) =>
      Promise.resolve(Object.assign({ id: 2 }, e) as RefreshToken),
    );
    refreshRepo.create.mockImplementation(
      (e: Partial<RefreshToken>) => Object.assign({ id: 2 }, e) as RefreshToken,
    );

    // Mock getUserById to return null (user not found)
    usersHttpClient.getUserById = jest.fn().mockResolvedValue(null);

    await expect(service.refresh(refreshTokenRaw)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

