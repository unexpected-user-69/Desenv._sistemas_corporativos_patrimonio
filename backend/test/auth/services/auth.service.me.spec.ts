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

describe('AuthService.me (unit)', () => {
  let service: AuthService;
  let refreshRepo: MockType<Repository<RefreshToken>>;
  let usersHttpClient: Partial<UsersHttpClient>;
  let hashService: Partial<HashService>;
  let jwt: Partial<JwtService>;

  beforeEach(async () => {
    refreshRepo = repositoryMockFactory<RefreshToken>();
    hashService = {
      compare: jest.fn(),
      hash: jest.fn(),
    };
    usersHttpClient = {
      getUserById: jest.fn(),
      validateCredentials: jest.fn(),
    };
    jwt = {};

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

  it('should return user information for valid userId', async () => {
    const mockUser = makeUserEntity();
    usersHttpClient.getUserById = jest.fn().mockResolvedValue({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      roles: mockUser.role ? [mockUser.role] : [],
    });

    const res = await service.me(mockUser.id as string);

    expect(res).toHaveProperty('id', mockUser.id);
    expect(res).toHaveProperty('email', mockUser.email);
    expect(res).toHaveProperty('name', mockUser.name);
    expect(res).toHaveProperty('roles');
    expect(Array.isArray(res.roles)).toBe(true);
    expect(usersHttpClient.getUserById).toHaveBeenCalledWith(mockUser.id);
  });

  it('should throw UnauthorizedException if user not found', async () => {
    usersHttpClient.getUserById = jest.fn().mockResolvedValue(null);

    await expect(service.me('non-existent-id')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

