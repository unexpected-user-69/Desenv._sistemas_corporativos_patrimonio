import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository, MoreThan, IsNull } from 'typeorm';
import * as argon2 from 'argon2';

import { AuthService } from '../../../src/auth/auth.service';
import { RefreshToken } from '../../../src/auth/entities/refresh-token.entity';
import { UsersService } from '../../../src/users/users.service';
import { HashService } from '../../../src/common/services/hash.service';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { makeRefreshTokenEntity } from '../../factories/refresh-token.factory';
import { makeUserEntity } from '../../factories/user.factory';

describe('AuthService.refresh (unit)', () => {
  let service: AuthService;
  let refreshRepo: MockType<Repository<RefreshToken>>;
  let usersService: Partial<UsersService>;
  let hashService: Partial<HashService>;
  let jwt: Partial<JwtService>;

  beforeEach(async () => {
    refreshRepo = repositoryMockFactory<RefreshToken>();
    hashService = {
      compare: jest.fn(),
      hash: jest.fn().mockResolvedValue('hashed-token'),
    };
    usersService = {
      findOne: jest.fn(),
    };
    jwt = {
      sign: jest.fn().mockReturnValue('new-access-token'),
    };

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

  it('should throw BadRequestException for missing refresh token', async () => {
    await expect(service.refresh('', '1.2.3.4')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw UnauthorizedException for invalid refresh token', async () => {
    refreshRepo.find.mockResolvedValue([]);

    await expect(service.refresh('invalid-token')).rejects.toThrow(
      UnauthorizedException,
    );

    expect(refreshRepo.find).toHaveBeenCalledWith({
      where: { revokedAt: IsNull(), expiresAt: MoreThan(expect.any(Date)) },
      order: { id: 'DESC' },
    });
  });

  it('should return new tokens and revoke old refresh token', async () => {
    const oldTokenHash = await argon2.hash('valid-refresh-token');
    const oldToken = makeRefreshTokenEntity({
      id: 1,
      tokenHash: oldTokenHash,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 86400000), // +1 day
    }) as RefreshToken;

    refreshRepo.find.mockResolvedValue([oldToken]);
    refreshRepo.save.mockImplementation((e: Partial<RefreshToken>) =>
      Promise.resolve(Object.assign({ id: 2 }, e) as RefreshToken),
    );
    refreshRepo.create.mockImplementation(
      (e: Partial<RefreshToken>) => Object.assign({ id: 2 }, e) as RefreshToken,
    );

    const mockUser = makeUserEntity();
    usersService.findOne = jest.fn().mockResolvedValue(mockUser);

    const res = await service.refresh(
      'valid-refresh-token',
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
    const oldTokenHash = await argon2.hash('valid-refresh-token');
    const oldToken = makeRefreshTokenEntity({
      id: 1,
      tokenHash: oldTokenHash,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 86400000),
    }) as RefreshToken;

    refreshRepo.find.mockResolvedValue([oldToken]);
    refreshRepo.save.mockImplementation((e: Partial<RefreshToken>) =>
      Promise.resolve(Object.assign({ id: 2 }, e) as RefreshToken),
    );
    refreshRepo.create.mockImplementation(
      (e: Partial<RefreshToken>) => Object.assign({ id: 2 }, e) as RefreshToken,
    );

    // Mock getUserById to return null (user not found)
    usersService.findOne = jest.fn().mockRejectedValue(new Error('Not found'));

    await expect(service.refresh('valid-refresh-token')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

