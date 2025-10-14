import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/enums/user-role.enum';

/**
 * Chave para metadata de roles.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator para definir os papéis (roles) necessários para acessar um endpoint.
 * 
 * Este decorator define quais roles são permitidos para acessar um endpoint específico.
 * Deve ser usado em conjunto com o RolesGuard para implementar autorização baseada em roles.
 * 
 * @param roles - Array de roles permitidos para acessar o endpoint
 * 
 * @example
 * ```typescript
 * @Controller('admin')
 * export class AdminController {
 *   @Get('users')
 *   @Roles(UserRole.ADMIN)
 *   findAllUsers() {
 *     return this.userService.findAll();
 *   }
 * 
 *   @Post('users')
 *   @Roles(UserRole.ADMIN, UserRole.TEACHER)
 *   createUser(@Body() createUserDto: CreateUserDto) {
 *     return this.userService.create(createUserDto);
 *   }
 * }
 * ```
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
