import { Test } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LogoutDto } from '../../../src/auth/dto/logout.dto';

describe('AuthController – logout', () => {
  let controller: AuthController;
  const service = { logout: jest.fn() };
  const jwt = { verify: jest.fn(), sign: jest.fn() };

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: service },
        { provide: JwtService, useValue: jwt },
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

