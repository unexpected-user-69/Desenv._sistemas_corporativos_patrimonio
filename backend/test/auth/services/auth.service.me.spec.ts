import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AuthService } from '../../../src/auth/auth.service';
import { RefreshToken } from '../../../src/auth/entities/refresh-token.entity';
import { UsersService } from '../../../src/users/users.service';
import { HashService } from '../../../src/common/services/hash.service';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { makeUserEntity } from '../../factories/user.factory';

describe('AuthService.me (unit)', () => {
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
    usersService = {
      findOne: jest.fn(),
    };
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

  it('should return user information for valid userId', async () => {
    const mockUser = makeUserEntity();
    usersService.findOne = jest.fn().mockResolvedValue(mockUser);

    const res = await service.me(mockUser.id as string);

    expect(res).toHaveProperty('id', mockUser.id);
    expect(res).toHaveProperty('email', mockUser.email);
    expect(res).toHaveProperty('name', mockUser.name);
    expect(res).toHaveProperty('roles');
    expect(Array.isArray(res.roles)).toBe(true);
    expect(usersService.findOne).toHaveBeenCalledWith(mockUser.id);
  });

  it('should throw UnauthorizedException if user not found', async () => {
    usersService.findOne = jest
      .fn()
      .mockRejectedValue(new Error('User not found'));

    await expect(service.me('non-existent-id')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

