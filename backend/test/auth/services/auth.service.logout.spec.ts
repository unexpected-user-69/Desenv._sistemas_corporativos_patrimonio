import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository, MoreThan, IsNull } from 'typeorm';
import * as argon2 from 'argon2';

import { AuthService } from '../../../src/auth/auth.service';
import { RefreshToken } from '../../../src/auth/entities/refresh-token.entity';
import { UsersService } from '../../../src/users/users.service';
import { HashService } from '../../../src/common/services/hash.service';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { makeRefreshTokenEntity } from '../../factories';

describe('AuthService.logout (unit)', () => {
  let service: AuthService;
  let refreshRepo: MockType<Repository<RefreshToken>>;
  let usersService: Partial<UsersService>;
  let hashService: Partial<HashService>;
  let jwt: Partial<JwtService>;

  beforeEach(async () => {
    refreshRepo = repositoryMockFactory<RefreshToken>();
    hashService = {
      compare: jest.fn(),
      hash: jest.fn(),
    };
    usersService = {};
    jwt = {};

    const mod = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(RefreshToken), useValue: refreshRepo },
        { provide: UsersService, useValue: usersService },
        { provide: HashService, useValue: hashService },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = mod.get(AuthService);
  });

  it('should return { revoked: 0 } for empty refresh token', async () => {
    const res = await service.logout('');

    expect(res).toEqual({ revoked: 0 });
    expect(refreshRepo.find).not.toHaveBeenCalled();
  });

  it('should return { revoked: 0 } for invalid refresh token', async () => {
    refreshRepo.find.mockResolvedValue([]);

    const res = await service.logout('invalid-token');

    expect(res).toEqual({ revoked: 0 });
    expect(refreshRepo.find).toHaveBeenCalledWith({
      where: { revokedAt: IsNull(), expiresAt: MoreThan(expect.any(Date)) },
      order: { id: 'DESC' },
    });
  });

  it('should revoke valid refresh token and return { revoked: 1 }', async () => {
    const tokenHash = await argon2.hash('valid-refresh-token');
    const token = makeRefreshTokenEntity({
      id: 1,
      tokenHash,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 86400000), // +1 day
    }) as RefreshToken;

    refreshRepo.find.mockResolvedValue([token]);
    refreshRepo.save.mockResolvedValue(token);

    const res = await service.logout('valid-refresh-token');

    expect(res).toEqual({ revoked: 1 });
    expect(token.revokedAt).toBeTruthy();
    expect(refreshRepo.save).toHaveBeenCalledWith(token);
  });
});

