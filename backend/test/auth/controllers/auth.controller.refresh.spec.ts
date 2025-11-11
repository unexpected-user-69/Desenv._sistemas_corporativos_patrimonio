import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { UsersService } from '../../../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from '../../../src/auth/dto/refresh.dto';

describe('AuthController – refresh', () => {
  let controller: AuthController;
  const service = { refresh: jest.fn() };
  const usersService = {}; // Mock vazio, não usado neste teste
  const jwt = { verify: jest.fn(), sign: jest.fn() };
  const configService = {
    get: jest.fn((key: string) => {
      if (key === 'JWT_ACCESS_SECRET') return 'test-secret';
      return undefined;
    }),
  };

  beforeEach(async () => {
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

  it('POST /auth/refresh → delega ao service.refresh', async () => {
    const mockResponse = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
      user: { id: 'user-id', email: 'test@example.com', name: 'Test User' },
    };
    service.refresh.mockResolvedValue(mockResponse);

    const body: RefreshDto = { refreshToken: 'old-refresh-token' };
    const req = {
      get: (k: string) => (k === 'user-agent' ? 'test-agent' : undefined),
    } as unknown as import('express').Request;

    const res = await controller.refresh(body, '1.2.3.4', req);

    expect(service.refresh).toHaveBeenCalledWith(
      body.refreshToken,
      '1.2.3.4',
      'test-agent',
    );
    expect(res).toEqual(mockResponse);
  });
});

