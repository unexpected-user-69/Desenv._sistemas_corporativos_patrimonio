import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../../src/common/guards/jwt-auth.guard';

describe('JwtAuthGuard (unit)', () => {
  let guard: JwtAuthGuard;
  const originalEnv = process.env.NODE_ENV;
  const originalAutoAuth = process.env.DEV_AUTO_AUTH;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    process.env.DEV_AUTO_AUTH = originalAutoAuth;
  });

  function makeContext(authHeader?: string) {
    const req: any = {
      get: jest.fn((key: string) => {
        if (key === 'authorization') return authHeader;
        return undefined;
      }),
      user: undefined,
    };
    return {
      switchToHttp: () => ({ getRequest: () => req }),
    } as unknown as ExecutionContext;
  }

  it('should inject fake user when DEV_AUTO_AUTH=true in non-production', () => {
    process.env.NODE_ENV = 'development';
    process.env.DEV_AUTO_AUTH = 'true';
    
    const context = makeContext();
    const result = guard.canActivate(context);

    expect(result).toBe(true);
    const req = context.switchToHttp().getRequest();
    expect(req.user).toBeDefined();
    expect(req.user.sub).toBe('00000000-0000-0000-0000-000000000001');
    expect(req.user.isAdmin).toBe(true);
    expect(req.user.roles).toEqual(['admin']);
  });

  it('should not inject fake user when DEV_AUTO_AUTH=false', () => {
    process.env.NODE_ENV = 'development';
    process.env.DEV_AUTO_AUTH = 'false';
    
    const context = makeContext();
    const result = guard.canActivate(context);

    expect(result).toBe(false);
    const req = context.switchToHttp().getRequest();
    expect(req.user).toBeUndefined();
  });

  it('should delegate to super when Bearer token is provided in dev', () => {
    process.env.NODE_ENV = 'development';
    process.env.DEV_AUTO_AUTH = 'true';
    
    const context = makeContext('Bearer valid-token');
    // Mock super.canActivate
    jest.spyOn(Object.getPrototypeOf(JwtAuthGuard.prototype), 'canActivate').mockReturnValue(true);
    
    const result = guard.canActivate(context);

    expect(result).toBe(true);
    const req = context.switchToHttp().getRequest();
    // Should not have fake user when Bearer token is provided
    expect(req.user).toBeUndefined();
  });

  it('should delegate to super in production', () => {
    process.env.NODE_ENV = 'production';
    
    const context = makeContext('Bearer valid-token');
    jest.spyOn(Object.getPrototypeOf(JwtAuthGuard.prototype), 'canActivate').mockReturnValue(true);
    
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });
});

