import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { UsersService } from '../../../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LogoutDto } from '../../../src/auth/dto/logout.dto';

describe('AuthController – logout', () => {
  let controller: AuthController;
  const service = { logout: jest.fn() };
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

  it('POST /auth/logout → delega ao service.logout', async () => {
    const mockResponse = { revoked: 1 };
    service.logout.mockResolvedValue(mockResponse);

    const body: LogoutDto = { refreshToken: 'refresh-token-to-revoke' };

    const res = await controller.logout(body);

    expect(service.logout).toHaveBeenCalledWith(body.refreshToken);
    expect(res).toEqual(mockResponse);
  });

  it('should handle case when token is not revoked', async () => {
    const mockResponse = { revoked: 0 };
    service.logout.mockResolvedValue(mockResponse);

    const body: LogoutDto = { refreshToken: 'invalid-token' };

    const res = await controller.logout(body);

    expect(service.logout).toHaveBeenCalledWith(body.refreshToken);
    expect(res).toEqual(mockResponse);
  });
});

