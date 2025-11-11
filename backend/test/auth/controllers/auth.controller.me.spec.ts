import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { UsersService } from '../../../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { makeJwtPayload } from '../../factories/auth.factory';

describe('AuthController – me', () => {
  let controller: AuthController;
  const service = { me: jest.fn() };
  const usersService = {}; // Mock vazio, não usado neste teste
  let jwt: Partial<JwtService>;
  const configService = {
    get: jest.fn((key: string) => {
      if (key === 'JWT_ACCESS_SECRET') return 'test-secret';
      return undefined;
    }),
  };

  beforeEach(async () => {
    jwt = {
      verify: jest.fn(),
      sign: jest.fn(),
    };

    const mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: service },
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwt },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();
    controller = mod.get(AuthController);
    jest.clearAllMocks();
  });

  it('GET /auth/me → retorna informações do usuário autenticado', async () => {
    const userId = randomUUID();
    const mockPayload = makeJwtPayload({ sub: userId });
    const mockUser = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      roles: ['STUDENT'],
    };

    jwt.verify = jest.fn().mockReturnValue(mockPayload);
    service.me.mockResolvedValue(mockUser);

    const res = await controller.me(`Bearer ${mockPayload.sub}`);

    expect(jwt.verify).toHaveBeenCalled();
    expect(service.me).toHaveBeenCalledWith(userId);
    expect(res).toEqual(mockUser);
  });

  it('should throw UnauthorizedException for missing bearer token', async () => {
    await expect(controller.me('')).rejects.toThrow(UnauthorizedException);
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for invalid token format', async () => {
    await expect(controller.me('InvalidToken')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for invalid token', async () => {
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await expect(controller.me('Bearer invalid-token')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for invalid token payload', async () => {
    jwt.verify = jest.fn().mockReturnValue({});

    await expect(controller.me('Bearer token')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for non-UUID sub', async () => {
    jwt.verify = jest.fn().mockReturnValue({ sub: 'not-a-uuid' });

    await expect(controller.me('Bearer token')).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.me).not.toHaveBeenCalled();
  });
});

