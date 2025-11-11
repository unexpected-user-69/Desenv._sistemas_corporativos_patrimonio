import { SetMetadata } from '@nestjs/common';

/**
 * Chave de metadata para identificar rotas públicas.
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator para marcar rotas como públicas (sem necessidade de autenticação).
 * 
 * Baseado no padrão do Aurora Platform.
 * 
 * Quando uma rota é marcada com @Public(), o JwtAuthGuard permite acesso
 * sem validação de token JWT.
 * 
 * @example
 * ```typescript
 * @Public()
 * @Post('login')
 * async login(@Body() dto: LoginDto) {
 *   return this.authService.login(dto);
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);



