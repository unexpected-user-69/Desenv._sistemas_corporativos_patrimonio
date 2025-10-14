import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validador customizado que verifica se uma string não contém espaços excedentes
 * à esquerda ou à direita (ou seja, se está "trimmed").
 *
 * @example
 * ```typescript
 * class CreateUserDto {
 *   @IsTrimmed({ message: 'O nome não pode conter espaços no início ou fim' })
 *   name: string;
 * }
 * ```
 */
@ValidatorConstraint({ async: false })
export class IsTrimmedConstraint implements ValidatorConstraintInterface {
  /**
   * Valida se o valor é uma string e se está trimmed (sem espaços no início/fim).
   *
   * @param value - Valor a ser validado
   * @param args - Argumentos de validação
   * @returns true se o valor for válido, false caso contrário
   */
  validate(value: any, _args: ValidationArguments): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    // Verifica se a string é igual à sua versão trimmed
    return value === value.trim();
  }

  /**
   * Mensagem de erro padrão quando a validação falha.
   *
   * @param args - Argumentos de validação
   * @returns Mensagem de erro
   */
  defaultMessage(args: ValidationArguments): string {
    return `${args.property} não pode conter espaços no início ou fim`;
  }
}

/**
 * Decorator que aplica a validação IsTrimmed a uma propriedade.
 *
 * @param validationOptions - Opções de validação (mensagem customizada, etc.)
 * @returns Decorator de validação
 */
export function IsTrimmed(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTrimmedConstraint,
    });
  };
}
