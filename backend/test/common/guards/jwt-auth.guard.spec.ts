import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../../src/common/guards/jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../../../src/common/decorators/public.decorator';

describe('JwtAuthGuard (unit)', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;
  const originalEnv = process.env.NODE_ENV;
  const originalAutoAuth = process.env.DEV_AUTO_AUTH;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtAuthGuard, Reflector],
    }).compile();

    guard = module.get(JwtAuthGuard);
    reflector = module.get(Reflector);
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    process.env.DEV_AUTO_AUTH = originalAutoAuth;
    jest.clearAllMocks();
  });

  function makeContext(authHeader?: string, isPublic = false) {
    const req: any = {
      get: jest.fn((key: string) => {
        if (key === 'authorization') return authHeader;
        return undefined;
      }),
      user: undefined,
    };
    
    // Mock Reflector para verificar @Public()
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(isPublic);
    
    return {
      switchToHttp: () => ({ getRequest: () => req }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  }

  it('should allow access when route is marked as @Public()', () => {
    const context = makeContext(undefined, true);
    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
  });

  it('should inject fake user when DEV_AUTO_AUTH=true in non-production and route is not public', () => {
    process.env.NODE_ENV = 'development';
    process.env.DEV_AUTO_AUTH = 'true';
    
    const context = makeContext(undefined, false);
    const result = guard.canActivate(context);

    expect(result).toBe(true);
    const req = context.switchToHttp().getRequest();
    expect(req.user).toBeDefined();
    expect(req.user.sub).toBe('00000000-0000-0000-0000-000000000001');
    expect(req.user.isAdmin).toBe(true);
    expect(req.user.roles).toEqual(['ADMIN']);
  });

  it('should not inject fake user when DEV_AUTO_AUTH=false and route is not public', () => {
    process.env.NODE_ENV = 'development';
    process.env.DEV_AUTO_AUTH = 'false';
    
    const context = makeContext(undefined, false);
    const result = guard.canActivate(context);

    expect(result).toBe(false);
    const req = context.switchToHttp().getRequest();
    expect(req.user).toBeUndefined();
  });

  it('should delegate to super when Bearer token is provided in dev and route is not public', () => {
    process.env.NODE_ENV = 'development';
    process.env.DEV_AUTO_AUTH = 'true';
    
    const context = makeContext('Bearer valid-token', false);
    // Mock super.canActivate
    const superCanActivate = jest.spyOn(Object.getPrototypeOf(JwtAuthGuard.prototype), 'canActivate').mockReturnValue(true);
    
    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(superCanActivate).toHaveBeenCalled();
    const req = context.switchToHttp().getRequest();
    // Should not have fake user when Bearer token is provided
    expect(req.user).toBeUndefined();
  });

  it('should delegate to super in production when route is not public', () => {
    process.env.NODE_ENV = 'production';
    
    const context = makeContext('Bearer valid-token', false);
    const superCanActivate = jest.spyOn(Object.getPrototypeOf(JwtAuthGuard.prototype), 'canActivate').mockReturnValue(true);
    
    const result = guard.canActivate(context);

    expect(result).toBe(true);
    expect(superCanActivate).toHaveBeenCalled();
  });
});

