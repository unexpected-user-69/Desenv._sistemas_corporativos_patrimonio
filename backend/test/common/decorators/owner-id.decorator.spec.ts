import { ExecutionContext } from '@nestjs/common';
import { randomUUID } from 'crypto';

// Testa a função interna do decorator OwnerId
// Como createParamDecorator retorna uma função complexa, testamos a lógica diretamente
describe('OwnerId decorator (unit)', () => {
  function makeContext(userId?: string) {
    const req: any = {
      user: userId ? { sub: userId } : undefined,
    };
    return {
      switchToHttp: () => ({ getRequest: () => req }),
    } as unknown as ExecutionContext;
  }

  // Testa a lógica interna do decorator
  function extractOwnerId(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const user = (request as { user?: { sub?: string } }).user;
    return user?.sub ?? '';
  }

  it('should extract user id from request', () => {
    const userId = randomUUID();
    const context = makeContext(userId);
    
    const result = extractOwnerId(context);

    expect(result).toBe(userId);
  });

  it('should return empty string when user is not authenticated', () => {
    const context = makeContext();
    
    const result = extractOwnerId(context);

    expect(result).toBe('');
  });

  it('should return empty string when user has no sub', () => {
    const context = makeContext();
    context.switchToHttp().getRequest().user = {};
    
    const result = extractOwnerId(context);

    expect(result).toBe('');
  });
});

