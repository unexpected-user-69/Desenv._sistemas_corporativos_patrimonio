import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';
import {
  IsTrimmed,
  ToLowerCase,
  IsStrongPassword,
} from '../../common/validators';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    minLength: 1,
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsTrimmed({ message: 'O nome não pode conter espaços no início ou fim' })
  name!: string;

  @ApiProperty({
    description: 'Email do usuário (será convertido para minúsculas)',
    example: 'joao.silva@example.com',
  })
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  @ToLowerCase()
  email!: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 8 caracteres, com maiúscula, minúscula e número)',
    example: 'Senha123!',
    minLength: 8,
  })
  @IsStrongPassword(
    {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
    },
    { message: 'A senha deve ser forte' },
  )
  password!: string;

  @ApiProperty({
    description: 'Papel/função do usuário no sistema',
    enum: UserRole,
    example: UserRole.OPERATOR,
  })
  @IsEnum(UserRole, { message: 'Role deve ser um valor válido' })
  role!: UserRole;

  @ApiPropertyOptional({
    description: 'Se o usuário está ativo no sistema',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isActive deve ser um valor booleano' })
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'URL do avatar do usuário',
    example: 'https://example.com/avatar.jpg',
  })
  @IsOptional()
  @IsUrl({}, { message: 'avatarUrl deve ser uma URL válida' })
  avatarUrl?: string;
}
