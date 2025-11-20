import { SetMetadata } from '@nestjs/common';

/**
 * Decorator para definir roles necessários para acessar um endpoint.
 * 
 * Baseado no padrão do Aurora Platform.
 * Deve ser usado em conjunto com RolesGuard.
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);


