import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { IsTrimmed, ToLowerCase, IsStrongPassword } from '../../common/validators';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsTrimmed({ message: 'O nome não pode conter espaços no início ou fim' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  @ToLowerCase()
  email?: string;

  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
    { message: 'A senha deve ser forte' }
  )
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role deve ser um valor válido' })
  role?: UserRole;

  @IsOptional()
  @IsBoolean({ message: 'isActive deve ser um valor booleano' })
  isActive?: boolean;

  @IsOptional()
  @IsUrl({}, { message: 'avatarUrl deve ser uma URL válida' })
  avatarUrl?: string;
}
