import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from '../../../src/common/guards/roles.guard';

describe('RolesGuard (unit)', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    // Garantir que o bypass não interfere nos testes unitários de negação
    process.env.BYPASS_AUTH = 'false';

    const module = await Test.createTestingModule({
      providers: [RolesGuard, Reflector],
    }).compile();

    guard = module.get(RolesGuard);
    reflector = module.get(Reflector);
  });

  function makeContext(userRoles?: string[]) {
    const req: any = {
      user: userRoles ? { roles: userRoles } : undefined,
    };
    return {
      switchToHttp: () => ({ getRequest: () => req }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  }

  it('should allow access when no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    const context = makeContext();
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should allow access when empty roles array is required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([]);

    const context = makeContext();
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should allow access when user has required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);

    const context = makeContext(['ADMIN', 'TEACHER']);
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should deny access when user does not have required role', () => {
    const spy = jest.spyOn(reflector, 'getAllAndOverride');
    // Primeiro para IS_PUBLIC_KEY (false/undefined)
    spy.mockImplementationOnce(() => undefined);
    // Depois para ROLES_KEY
    spy.mockReturnValue(['ADMIN']);

    const context = makeContext(['STUDENT']);
    const result = guard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should deny access when user is not authenticated', () => {
    const spy = jest.spyOn(reflector, 'getAllAndOverride');
    spy.mockImplementationOnce(() => undefined);
    spy.mockReturnValue(['ADMIN']);

    const context = makeContext();
    const result = guard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should deny access when user has no roles', () => {
    const spy = jest.spyOn(reflector, 'getAllAndOverride');
    spy.mockImplementationOnce(() => undefined);
    spy.mockReturnValue(['ADMIN']);

    const context = makeContext([]);
    const result = guard.canActivate(context);

    expect(result).toBe(false);
  });

  it('should allow access when user has one of multiple required roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN', 'TEACHER']);

    const context = makeContext(['TEACHER']);
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });
});

