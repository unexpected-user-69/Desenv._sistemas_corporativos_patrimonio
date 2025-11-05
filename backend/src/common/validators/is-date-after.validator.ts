import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

/**
 * Validador customizado que verifica se uma data é posterior ou igual a outra data.
 * 
 * @example
 * ```typescript
 * class CreateEventDto {
 *   @IsDateString()
 *   startDate: string;
 * 
 *   @IsDateString()
 *   @IsDateAfter('startDate', { message: 'A data de término deve ser posterior ou igual à data de início' })
 *   endDate: string;
 * }
 * ```
 */
@ValidatorConstraint({ async: false })
export class IsDateAfterConstraint implements ValidatorConstraintInterface {
  /**
   * Valida se endDate é posterior ou igual a startDate.
   *
   * @param endDate - Valor da data de término
   * @param args - Argumentos de validação contendo o objeto e o nome da propriedade de referência
   * @returns true se a data de término for válida, false caso contrário
   */
  validate(endDate: unknown, args: ValidationArguments): boolean {
    if (!endDate) {
      // Se endDate não foi fornecido, a validação passa (pode ser opcional)
      return true;
    }

    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName];

    if (!relatedValue) {
      // Se startDate não foi fornecido, não podemos validar
      return true;
    }

    // Converte ambas as datas para Date objects
    const endDateObj = new Date(endDate as string);
    const startDateObj = new Date(relatedValue as string);

    // Verifica se ambas são datas válidas
    if (isNaN(endDateObj.getTime()) || isNaN(startDateObj.getTime())) {
      return false;
    }

    // Verifica se endDate >= startDate
    return endDateObj >= startDateObj;
  }

  /**
   * Mensagem de erro padrão quando a validação falha.
   *
   * @param args - Argumentos de validação
   * @returns Mensagem de erro
   */
  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} deve ser posterior ou igual a ${relatedPropertyName}`;
  }
}

/**
 * Decorator que aplica a validação IsDateAfter a uma propriedade.
 *
 * @param property - Nome da propriedade de referência (ex: 'startDate')
 * @param validationOptions - Opções de validação (mensagem customizada, etc.)
 * @returns Decorator de validação
 */
export function IsDateAfter(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsDateAfterConstraint,
    });
  };
}

