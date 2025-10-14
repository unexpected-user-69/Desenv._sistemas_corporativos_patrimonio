import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
  IsUUID,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PatrimonioStatus, PatrimonioCategoria } from '../entities/patrimonio.entity';
import { IsTrimmed, ToLowerCase } from '../../common/validators';

export class CreatePatrimonioDto {
  @ApiProperty({
    description: 'Código único do patrimônio',
    example: 'PAT-2024-001',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'O código é obrigatório' })
  @IsString({ message: 'O código deve ser uma string' })
  @MinLength(3, { message: 'O código deve ter pelo menos 3 caracteres' })
  @MaxLength(50, { message: 'O código deve ter no máximo 50 caracteres' })
  @IsTrimmed({ message: 'O código não pode conter espaços no início ou fim' })
  codigo!: string;

  @ApiProperty({
    description: 'Nome do patrimônio',
    example: 'Notebook Dell Inspiron 15',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  @IsTrimmed({ message: 'O nome não pode conter espaços no início ou fim' })
  nome!: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do patrimônio',
    example: 'Notebook para uso administrativo com processador Intel i5',
  })
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  descricao?: string;

  @ApiProperty({
    description: 'Categoria do patrimônio',
    enum: PatrimonioCategoria,
    example: PatrimonioCategoria.EQUIPAMENTO,
  })
  @IsEnum(PatrimonioCategoria, { message: 'Categoria deve ser um valor válido' })
  categoria!: PatrimonioCategoria;

  @ApiPropertyOptional({
    description: 'Status do patrimônio',
    enum: PatrimonioStatus,
    example: PatrimonioStatus.ATIVO,
    default: PatrimonioStatus.ATIVO,
  })
  @IsOptional()
  @IsEnum(PatrimonioStatus, { message: 'Status deve ser um valor válido' })
  status?: PatrimonioStatus = PatrimonioStatus.ATIVO;

  @ApiPropertyOptional({
    description: 'Valor de aquisição do patrimônio',
    example: 2500.00,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O valor de aquisição deve ser um número' })
  @Min(0, { message: 'O valor de aquisição deve ser maior ou igual a zero' })
  valorAquisicao?: number;

  @ApiPropertyOptional({
    description: 'Data de aquisição do patrimônio',
    example: '2024-01-15',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de aquisição deve estar no formato ISO' })
  dataAquisicao?: string;

  @ApiPropertyOptional({
    description: 'Data de garantia do patrimônio',
    example: '2025-01-15',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data de garantia deve estar no formato ISO' })
  dataGarantia?: string;

  @ApiPropertyOptional({
    description: 'Número de série do patrimônio',
    example: 'DL123456789',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'O número de série deve ser uma string' })
  @MaxLength(255, { message: 'O número de série deve ter no máximo 255 caracteres' })
  @IsTrimmed({ message: 'O número de série não pode conter espaços no início ou fim' })
  numeroSerie?: string;

  @ApiPropertyOptional({
    description: 'Modelo do patrimônio',
    example: 'Inspiron 15 3000',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'O modelo deve ser uma string' })
  @MaxLength(255, { message: 'O modelo deve ter no máximo 255 caracteres' })
  @IsTrimmed({ message: 'O modelo não pode conter espaços no início ou fim' })
  modelo?: string;

  @ApiPropertyOptional({
    description: 'Marca do patrimônio',
    example: 'Dell',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'A marca deve ser uma string' })
  @MaxLength(255, { message: 'A marca deve ter no máximo 255 caracteres' })
  @IsTrimmed({ message: 'A marca não pode conter espaços no início ou fim' })
  marca?: string;

  @ApiPropertyOptional({
    description: 'Localização física do patrimônio',
    example: 'Sala 101 - Setor Administrativo',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'A localização deve ser uma string' })
  @MaxLength(255, { message: 'A localização deve ter no máximo 255 caracteres' })
  @IsTrimmed({ message: 'A localização não pode conter espaços no início ou fim' })
  localizacao?: string;

  @ApiPropertyOptional({
    description: 'Observações adicionais sobre o patrimônio',
    example: 'Equipamento em perfeito estado, sem avarias',
  })
  @IsOptional()
  @IsString({ message: 'As observações devem ser uma string' })
  observacoes?: string;

  @ApiPropertyOptional({
    description: 'URL da foto do patrimônio',
    example: 'https://example.com/patrimonio-foto.jpg',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'A URL da foto deve ser uma string' })
  @MaxLength(500, { message: 'A URL da foto deve ter no máximo 500 caracteres' })
  fotoUrl?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário responsável pelo patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'O ID do responsável deve ser um UUID válido' })
  responsavelId?: string;
}