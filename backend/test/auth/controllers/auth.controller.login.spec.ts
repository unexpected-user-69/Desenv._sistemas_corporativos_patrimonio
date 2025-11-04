import { Test } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../../src/auth/dto/login.dto';
import { makeLoginDto } from '../../factories/auth.factory';

describe('AuthController – login', () => {
  let controller: AuthController;
  const service = { login: jest.fn() };
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

  it('POST /auth/login → delega ao service.login', async () => {
    const mockResponse = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: { id: 'user-id', email: 'test@example.com', name: 'Test User' },
    };
    service.login.mockResolvedValue(mockResponse);

    const body: LoginDto = makeLoginDto();
    const req = {
      get: (k: string) => (k === 'user-agent' ? 'test-agent' : undefined),
    } as unknown as import('express').Request;

    const res = await controller.login(body, '1.2.3.4', req);

    expect(service.login).toHaveBeenCalledWith(
      body.email,
      body.password,
      '1.2.3.4',
      'test-agent',
    );
    expect(res).toEqual(mockResponse);
  });

  it('should handle missing user-agent header', async () => {
    const mockResponse = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: { id: 'user-id', email: 'test@example.com', name: 'Test User' },
    };
    service.login.mockResolvedValue(mockResponse);

    const body: LoginDto = makeLoginDto();
    const req = {
      get: (_k: string) => undefined,
    } as unknown as import('express').Request;

    const res = await controller.login(body, '1.2.3.4', req);

    expect(service.login).toHaveBeenCalledWith(
      body.email,
      body.password,
      '1.2.3.4',
      undefined,
    );
    expect(res).toEqual(mockResponse);
  });
});

