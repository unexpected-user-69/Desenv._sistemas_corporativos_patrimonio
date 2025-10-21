/**
 * Exportações dos guards customizados.
 *
 * Este arquivo centraliza todas as exportações dos guards
 * para facilitar a importação e manutenção.
 */

// Guards principais
export { RolesGuard } from './roles.guard';
export { JwtAuthGuard } from './jwt-auth.guard';

// Decorators
export { Roles, ROLES_KEY } from './roles.decorator';
