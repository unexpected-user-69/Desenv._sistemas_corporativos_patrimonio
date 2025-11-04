import { IsStrongPasswordConstraint } from '../../../src/common/validators/is-strong-password.validator';
import { ValidationArguments } from 'class-validator';

describe('IsStrongPasswordConstraint (unit)', () => {
  let validator: IsStrongPasswordConstraint;

  beforeEach(() => {
    validator = new IsStrongPasswordConstraint();
  });

  function makeArgs(constraints: any[]): ValidationArguments {
    return {
      value: '',
      constraints,
      targetName: 'TestClass',
      object: {},
      property: 'password',
    } as ValidationArguments;
  }

  it('should validate strong password with default options', () => {
    const args = makeArgs([{}]);
    
    expect(validator.validate('StrongP@ssw0rd!', args)).toBe(true);
    expect(validator.validate('Weak123', args)).toBe(false); // Too short
    expect(validator.validate('weakpassword', args)).toBe(false); // No uppercase/number
    expect(validator.validate('WEAKPASSWORD', args)).toBe(false); // No lowercase/number
    expect(validator.validate('WeakPassword', args)).toBe(false); // No number
  });

  it('should validate password with custom minLength', () => {
    const args = makeArgs([{ minLength: 12 }]);
    
    expect(validator.validate('StrongP@ssw0rd', args)).toBe(true);
    expect(validator.validate('Short123', args)).toBe(false);
  });

  it('should validate password without requiring special chars', () => {
    const args = makeArgs([{ requireSpecialChars: false }]);
    
    expect(validator.validate('StrongPass123', args)).toBe(true);
  });

  it('should validate password requiring special chars', () => {
    const args = makeArgs([{ requireSpecialChars: true }]);
    
    expect(validator.validate('StrongP@ss123', args)).toBe(true);
    expect(validator.validate('StrongPass123', args)).toBe(false);
  });

  it('should return false for non-string values', () => {
    const args = makeArgs([{}]);
    
    expect(validator.validate(null, args)).toBe(false);
    expect(validator.validate(123, args)).toBe(false);
    expect(validator.validate({}, args)).toBe(false);
    expect(validator.validate([], args)).toBe(false);
  });

  it('should return appropriate error message', () => {
    const args = makeArgs([{}]);
    
    const message = validator.defaultMessage(args);
    expect(message).toContain('pelo menos');
    expect(message).toContain('letra maiúscula');
    expect(message).toContain('letra minúscula');
    expect(message).toContain('número');
  });

  it('should return error message with custom options', () => {
    const args = makeArgs([{ minLength: 12, requireSpecialChars: true }]);
    
    const message = validator.defaultMessage(args);
    expect(message).toContain('12 caracteres');
    expect(message).toContain('caractere especial');
  });
});

