import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AuthService } from '../../../src/auth/auth.service';
import { RefreshToken } from '../../../src/auth/entities/refresh-token.entity';
import { UsersHttpClient } from '../../../src/auth/users-http-client';
import { HashService } from '../../../src/common/services/hash.service';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { makeUserEntity } from '../../factories/user.factory';

describe('AuthService.login (unit)', () => {
  let service: AuthService;
  let refreshRepo: MockType<Repository<RefreshToken>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let hashService: Partial<HashService>;
  let jwt: Partial<JwtService>;

  beforeEach(async () => {
    refreshRepo = repositoryMockFactory<RefreshToken>();

    // Mock HashService
    hashService = {
      compare: jest.fn().mockResolvedValue(true),
      hash: jest.fn().mockResolvedValue('hashed-password'),
    };

    // Mock UsersHttpClient
    const mockUser = makeUserEntity({
      email: 'test@example.com',
      isActive: true,
    });
    usersHttpClient = {
      validateCredentials: jest.fn().mockResolvedValue({
        id: mockUser.id,
        email: mockUser.email,
        roles: mockUser.role ? [mockUser.role] : [],
      }),
      getUserById: jest.fn(),
    };

    // Mock JwtService
    jwt = {
      sign: jest.fn().mockReturnValue('signed-access-token'),
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

  it('should return access and refresh tokens for valid credentials', async () => {
    // Mock repository.save to return entity with id
    refreshRepo.save.mockImplementation((e: Partial<RefreshToken>) =>
      Promise.resolve(Object.assign({ id: 1 }, e) as RefreshToken),
    );
    refreshRepo.create.mockImplementation(
      (e: Partial<RefreshToken>) => Object.assign({}, e) as RefreshToken,
    );

    const res = await service.login(
      'test@example.com',
      'StrongP@ssw0rd!',
      '1.2.3.4',
      'jest',
    );

    expect(res).toHaveProperty('accessToken', 'signed-access-token');
    expect(res).toHaveProperty('refreshToken');
    expect(res.user).toMatchObject({
      email: 'test@example.com',
    });
    expect(res.user).toHaveProperty('id');
    expect(res.user).toHaveProperty('name');

    expect(usersHttpClient.validateCredentials).toHaveBeenCalledWith(
      'test@example.com',
      'StrongP@ssw0rd!',
    );
    expect(refreshRepo.create).toHaveBeenCalled();
    expect(refreshRepo.save).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    usersHttpClient.validateCredentials = jest.fn().mockResolvedValue(null);

    await expect(
      service.login('invalid@example.com', 'wrong-password'),
    ).rejects.toThrow(UnauthorizedException);

    expect(usersHttpClient.validateCredentials).toHaveBeenCalledWith(
      'invalid@example.com',
      'wrong-password',
    );
    expect(refreshRepo.create).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  it('should include IP and user agent in refresh token', async () => {
    refreshRepo.save.mockImplementation((e: Partial<RefreshToken>) =>
      Promise.resolve(Object.assign({ id: 1 }, e) as RefreshToken),
    );
    refreshRepo.create.mockImplementation(
      (e: Partial<RefreshToken>) => Object.assign({}, e) as RefreshToken,
    );

    await service.login(
      'test@example.com',
      'StrongP@ssw0rd!',
      '192.168.1.1',
      'Mozilla/5.0',
    );

    expect(refreshRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
      }),
    );
  });
});

