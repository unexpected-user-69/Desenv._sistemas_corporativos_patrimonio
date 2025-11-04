import { IsTrimmedConstraint } from '../../../src/common/validators/is-trimmed.validator';
import { ValidationArguments } from 'class-validator';

describe('IsTrimmedConstraint (unit)', () => {
  let validator: IsTrimmedConstraint;

  beforeEach(() => {
    validator = new IsTrimmedConstraint();
  });

  function makeArgs(): ValidationArguments {
    return {
      value: '',
      constraints: [],
      targetName: 'TestClass',
      object: {},
      property: 'field',
    } as ValidationArguments;
  }

  it('should validate trimmed string', () => {
    expect(validator.validate('trimmed')).toBe(true);
    expect(validator.validate('')).toBe(true);
  });

  it('should reject string with leading spaces', () => {
    expect(validator.validate(' leading')).toBe(false);
    expect(validator.validate('  leading')).toBe(false);
  });

  it('should reject string with trailing spaces', () => {
    expect(validator.validate('trailing ')).toBe(false);
    expect(validator.validate('trailing  ')).toBe(false);
  });

  it('should reject string with both leading and trailing spaces', () => {
    expect(validator.validate(' both ')).toBe(false);
    expect(validator.validate('  both  ')).toBe(false);
  });

  it('should allow string with spaces in the middle', () => {
    expect(validator.validate('middle space')).toBe(true);
    expect(validator.validate('multiple middle spaces')).toBe(true);
  });

  it('should return appropriate error message', () => {
    const args = makeArgs();
    
    const message = validator.defaultMessage(args);
    expect(message).toContain('não pode conter espaços');
  });
});

