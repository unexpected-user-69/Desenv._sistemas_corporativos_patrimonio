import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../../src/common/guards/jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../../../src/common/decorators/public.decorator';

describe('JwtAuthGuard - @Public() decorator', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtAuthGuard, Reflector],
    }).compile();

    guard = module.get(JwtAuthGuard);
    reflector = module.get(Reflector);
  });

  function makeContext(isPublic = false): ExecutionContext {
    const handler = {};
    if (isPublic) {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    } else {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    }

    return {
      switchToHttp: () => ({
        getRequest: () => ({
          get: () => '',
        }),
      }),
      getHandler: () => handler,
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  }

  it('should allow access when route is marked as @Public()', () => {
    const context = makeContext(true);
    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should require authentication when route is not marked as @Public()', () => {
    const context = makeContext(false);
    // Quando não é público e não há token, deve retornar false (ou chamar super.canActivate)
    // Em desenvolvimento sem DEV_AUTO_AUTH, deve retornar false
    process.env.NODE_ENV = 'test';
    process.env.DEV_AUTO_AUTH = 'false';
    
    const result = guard.canActivate(context);
    expect(result).toBe(false);
  });

  it('should check IS_PUBLIC_KEY metadata', () => {
    const context = makeContext(true);
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    
    guard.canActivate(context);
    
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
  });
});



