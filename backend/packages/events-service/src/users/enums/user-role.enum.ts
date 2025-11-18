/**
 * Enum que define os papéis (roles) disponíveis para usuários no sistema de patrimônio e inventário.
 *
 * @enum {string}
 */
export enum UserRole {
  /** Operador - papel para operadores de inventário e manutenção */
  OPERATOR = 'OPERATOR',

  /** Gerente - papel para gerentes de patrimônio e inventário */
  MANAGER = 'MANAGER',

  /** Administrador - papel com privilégios elevados */
  ADMIN = 'ADMIN',
}

/**
 * Array com todos os roles disponíveis para validação e iteração.
 */
export const USER_ROLES = Object.values(UserRole);

/**
 * Verifica se um valor é um role válido.
 *
 * @param value - Valor a ser verificado
 * @returns true se o valor for um role válido, false caso contrário
 */
export function isValidUserRole(value: string): value is UserRole {
  return USER_ROLES.includes(value as UserRole);
}
