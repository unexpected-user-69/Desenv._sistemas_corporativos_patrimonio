import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isUUID } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsUUIDOrEmptyConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, _args: ValidationArguments) {
    // Se for undefined, null, string vazia ou "string", não valida (é opcional)
    if (value === undefined || value === null || value === '' || value === 'string') {
      return true;
    }
    // Se tiver valor, valida se é UUID
    return isUUID(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a UUID or empty`;
  }
}

export function IsUUIDOrEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUUIDOrEmptyConstraint,
    });
  };
}


