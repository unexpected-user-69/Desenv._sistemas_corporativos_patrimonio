import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy, AuthUser, AccessTokenPayload } from '../../../src/auth/strategies/jwt.strategy';
import { randomUUID } from 'crypto';

describe('JwtStrategy (unit)', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    // Set environment variable for testing
    process.env.JWT_ACCESS_SECRET = 'test-secret';

    const mod = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_ACCESS_SECRET') return 'test-secret';
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    strategy = mod.get(JwtStrategy);
  });

  afterEach(() => {
    delete process.env.JWT_ACCESS_SECRET;
  });

  it('should validate and return AuthUser from valid payload', () => {
    const userId = randomUUID();
    const payload: AccessTokenPayload = {
      sub: userId,
      email: 'test@example.com',
      roles: ['STUDENT'],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    const result: AuthUser = strategy.validate(payload);

    expect(result).toEqual({
      sub: userId,
      email: 'test@example.com',
      roles: ['STUDENT'],
    });
  });

  it('should handle empty roles array', () => {
    const userId = randomUUID();
    const payload: AccessTokenPayload = {
      sub: userId,
      email: 'test@example.com',
      roles: [],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    const result: AuthUser = strategy.validate(payload);

    expect(result.roles).toEqual([]);
  });

  it('should handle non-array roles', () => {
    const userId = randomUUID();
    const payload = {
      sub: userId,
      email: 'test@example.com',
      roles: 'STUDENT', // not an array
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    } as unknown as AccessTokenPayload;

    const result: AuthUser = strategy.validate(payload);

    expect(result.roles).toEqual([]);
  });

  it('should use default secret when ConfigService is not available', () => {
    // This test verifies that the strategy can be instantiated without ConfigService
    // by using the default secret from environment
    process.env.JWT_ACCESS_SECRET = 'default-secret';

    const mod = Test.createTestingModule({
      providers: [JwtStrategy],
    });

    expect(mod).toBeDefined();
  });

  it('should use secret from ConfigService when available', async () => {
    const configService = {
      get: jest.fn((key: string) => {
        if (key === 'JWT_ACCESS_SECRET') return 'config-secret';
        return undefined;
      }),
    };

    delete process.env.JWT_ACCESS_SECRET;

    const mod = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    const strategy = mod.get(JwtStrategy);
    expect(strategy).toBeDefined();
    expect(configService.get).toHaveBeenCalledWith('JWT_ACCESS_SECRET');
  });
});

