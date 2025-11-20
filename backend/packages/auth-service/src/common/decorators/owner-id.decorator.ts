import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Interface para usuário autenticado.
 * Adaptado para UUID (string) conforme padrão do Patrimônio.
 */
interface User {
  sub: string; // UUID em vez de number
}

/**
 * Decorator para extrair o ID do usuário autenticado (owner).
 * 
 * Baseado no padrão do Aurora Platform, adaptado para UUID.
 * 
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(JwtAuthGuard)
 * getProfile(@OwnerId() ownerId: string) {
 *   return this.service.findByOwner(ownerId);
 * }
 * ```
 */
export const OwnerId = createParamDecorator(
   
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = (request as { user?: User }).user;
    return user?.sub ?? '';
  },
);






