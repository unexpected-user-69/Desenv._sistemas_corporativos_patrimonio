import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Código único da categoria (uppercase, sem espaços)',
    example: 'EQUIPAMENTO',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[A-Z0-9_]+$/, {
    message: 'Código deve conter apenas letras maiúsculas, números e underscore',
  })
  codigo: string;

  @ApiProperty({
    description: 'Nome da categoria',
    example: 'Equipamento',
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nome: string;

  @ApiProperty({
    description: 'Descrição detalhada da categoria',
    example: 'Equipamentos eletrônicos, computadores e periféricos',
    required: false,
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: 'Ícone da categoria (nome do ícone)',
    example: 'laptop',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  icone?: string;

  @ApiProperty({
    description: 'Cor da categoria em hexadecimal',
    example: '#3B82F6',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'Cor deve estar no formato hexadecimal (#RRGGBB)',
  })
  cor?: string;

  @ApiProperty({
    description: 'Se a categoria está ativa',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}




