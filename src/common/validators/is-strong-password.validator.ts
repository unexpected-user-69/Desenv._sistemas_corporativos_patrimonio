import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Interface para configuração de validação de senha forte.
 */
export interface StrongPasswordOptions {
  /** Comprimento mínimo da senha (padrão: 8) */
  minLength?: number;
  /** Se deve exigir letras maiúsculas (padrão: true) */
  requireUppercase?: boolean;
  /** Se deve exigir letras minúsculas (padrão: true) */
  requireLowercase?: boolean;
  /** Se deve exigir números (padrão: true) */
  requireNumbers?: boolean;
  /** Se deve exigir caracteres especiais (padrão: false) */
  requireSpecialChars?: boolean;
}

/**
 * Validador customizado que verifica se uma senha atende aos critérios de força.
 *
 * @example
 * ```typescript
 * class CreateUserDto {
 *   @IsStrongPassword({
 *     minLength: 8,
 *     requireUppercase: true,
 *     requireLowercase: true,
 *     requireNumbers: true,
 *     requireSpecialChars: false
 *   })
 *   password: string;
 * }
 * ```
 */
@ValidatorConstraint({ async: false })
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  /**
   * Valida se a senha atende aos critérios de força configurados.
   *
   * @param value - Valor a ser validado
   * @param args - Argumentos de validação
   * @returns true se a senha for forte, false caso contrário
   */
  validate(value: any, args: ValidationArguments): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    const options: StrongPasswordOptions = args.constraints[0] || {};
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = false,
    } = options;

    // Verifica comprimento mínimo
    if (value.length < minLength) {
      return false;
    }

    // Verifica letras maiúsculas
    if (requireUppercase && !/[A-Z]/.test(value)) {
      return false;
    }

    // Verifica letras minúsculas
    if (requireLowercase && !/[a-z]/.test(value)) {
      return false;
    }

    // Verifica números
    if (requireNumbers && !/\d/.test(value)) {
      return false;
    }

    // Verifica caracteres especiais
    if (
      requireSpecialChars &&
      !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
    ) {
      return false;
    }

    return true;
  }

  /**
   * Mensagem de erro padrão quando a validação falha.
   *
   * @param args - Argumentos de validação
   * @returns Mensagem de erro
   */
  defaultMessage(args: ValidationArguments): string {
    const options: StrongPasswordOptions = args.constraints[0] || {};
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = false,
    } = options;

    const requirements: string[] = [];

    requirements.push(`pelo menos ${minLength} caracteres`);

    if (requireUppercase) {
      requirements.push('uma letra maiúscula');
    }

    if (requireLowercase) {
      requirements.push('uma letra minúscula');
    }

    if (requireNumbers) {
      requirements.push('um número');
    }

    if (requireSpecialChars) {
      requirements.push('um caractere especial');
    }

    return `A senha deve conter ${requirements.join(', ')}`;
  }
}

/**
 * Decorator que aplica a validação IsStrongPassword a uma propriedade.
 *
 * @param options - Opções de configuração da validação
 * @param validationOptions - Opções de validação (mensagem customizada, etc.)
 * @returns Decorator de validação
 */
export function IsStrongPassword(
  options?: StrongPasswordOptions,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsStrongPasswordConstraint,
    });
  };
}
