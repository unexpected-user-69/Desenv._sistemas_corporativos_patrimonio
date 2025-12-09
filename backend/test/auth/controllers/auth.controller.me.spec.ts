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
      roles: ['OPERATOR'],
    };

    const mockReq = {
      user: {
        sub: userId,
        email: 'test@example.com',
        roles: ['OPERATOR'],
      },
    } as any;

    service.me.mockResolvedValue(mockUser);

    const res = await controller.me(mockReq);

    expect(service.me).toHaveBeenCalledWith(userId);
    expect(res).toEqual(mockUser);
  });

  it('should throw UnauthorizedException for missing user', async () => {
    const mockReq = {} as any;

    await expect(controller.me(mockReq)).rejects.toThrow(UnauthorizedException);
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for missing user.sub', async () => {
    const mockReq = {
      user: {},
    } as any;

    await expect(controller.me(mockReq)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for invalid token', async () => {
    const mockReq = {
      user: {
        sub: undefined,
      },
    } as any;

    await expect(controller.me(mockReq)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for invalid token payload', async () => {
    const mockReq = {
      user: null,
    } as any;

    await expect(controller.me(mockReq)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(service.me).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException for non-UUID sub', async () => {
    const mockReq = {
      user: {
        sub: 'not-a-uuid',
      },
    } as any;

    // O controller só verifica se req.user e req.user.sub existem
    // A validação de UUID é feita pelo service.me() através do getUserById
    // então este teste não precisa verificar UUID aqui
    service.me.mockRejectedValue(new UnauthorizedException('User not found'));

    await expect(controller.me(mockReq)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});

