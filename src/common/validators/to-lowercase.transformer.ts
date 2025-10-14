import { Transform } from 'class-transformer';

/**
 * Transformador que converte uma string para minúsculas.
 * 
 * Este transformador é útil para normalizar valores como email ou username,
 * garantindo consistência nos dados mesmo com o uso de CITEXT no banco de dados.
 * 
 * @example
 * ```typescript
 * class CreateUserDto {
 *   @ToLowerCase()
 *   @IsEmail()
 *   email: string;
 * 
 *   @ToLowerCase()
 *   @IsNotEmpty()
 *   username: string;
 * }
 * ```
 * 
 * @returns Decorator de transformação
 */
export function ToLowerCase() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  });
}
