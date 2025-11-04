import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateUserDto {
  @ApiProperty({ format: 'email', description: 'Email do usuário' })
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email!: string;

  @ApiProperty({ minLength: 6, description: 'Senha do usuário' })
  @IsString()
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password!: string;
}

