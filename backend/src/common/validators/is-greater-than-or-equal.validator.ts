import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validador customizado que verifica se um valor numérico é maior ou igual a outro valor.
 * 
 * @example
 * ```typescript
 * class QueryDto {
 *   @IsNumber()
 *   @Min(0)
 *   valorMinimo?: number;
 * 
 *   @IsNumber()
 *   @Min(0)
 *   @IsGreaterThanOrEqual('valorMinimo', { message: 'O valor máximo deve ser maior ou igual ao valor mínimo' })
 *   valorMaximo?: number;
 * }
 * ```
 */
@ValidatorConstraint({ async: false })
export class IsGreaterThanOrEqualConstraint implements ValidatorConstraintInterface {
  /**
   * Valida se o valor é maior ou igual ao valor de referência.
   *
   * @param value - Valor a ser validado
   * @param args - Argumentos de validação contendo o objeto e o nome da propriedade de referência
   * @returns true se o valor for válido, false caso contrário
   */
  validate(value: unknown, args: ValidationArguments): boolean {
    if (value === undefined || value === null) {
      // Se o valor não foi fornecido, a validação passa (pode ser opcional)
      return true;
    }

    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName];

    if (relatedValue === undefined || relatedValue === null) {
      // Se o valor de referência não foi fornecido, não podemos validar
      return true;
    }

    // Converte ambos os valores para números
    const numValue = typeof value === 'number' ? value : Number(value);
    const numRelatedValue = typeof relatedValue === 'number' ? relatedValue : Number(relatedValue);

    // Verifica se ambos são números válidos
    if (isNaN(numValue) || isNaN(numRelatedValue)) {
      return false;
    }

    // Verifica se value >= relatedValue
    return numValue >= numRelatedValue;
  }

  /**
   * Mensagem de erro padrão quando a validação falha.
   *
   * @param args - Argumentos de validação
   * @returns Mensagem de erro
   */
  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} deve ser maior ou igual a ${relatedPropertyName}`;
  }
}

/**
 * Decorator que aplica a validação IsGreaterThanOrEqual a uma propriedade.
 *
 * @param property - Nome da propriedade de referência (ex: 'valorMinimo')
 * @param validationOptions - Opções de validação (mensagem customizada, etc.)
 * @returns Decorator de validação
 */
export function IsGreaterThanOrEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsGreaterThanOrEqualConstraint,
    });
  };
}

