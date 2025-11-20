import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsGreaterThanOrEqual } from '../../common/validators';
import { PatrimonioStatus } from '../entities/patrimonio.entity';

export class QueryPatrimonioDto {
  @ApiPropertyOptional({
    description: 'Número da página',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de itens por página',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Busca textual (nome, código, descrição)',
    example: 'notebook dell',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  q?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por ID da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  categoriaId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por status',
    enum: PatrimonioStatus,
    example: PatrimonioStatus.ATIVO,
  })
  @IsOptional()
  @IsEnum(PatrimonioStatus)
  status?: PatrimonioStatus;

  @ApiPropertyOptional({
    description: 'Filtrar por marca',
    example: 'Dell',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  marca?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por modelo',
    example: 'Inspiron 15',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  modelo?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por localização',
    example: 'Sala 101',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  localizacao?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por responsável',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('all', { message: 'O ID do responsável deve ser um UUID válido' })
  responsavelId?: string;

  @ApiPropertyOptional({
    description: 'Valor mínimo de aquisição',
    example: 1000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  valorMinimo?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo de aquisição',
    example: 5000,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsGreaterThanOrEqual('valorMinimo', { 
    message: 'O valor máximo deve ser maior ou igual ao valor mínimo' 
  })
  valorMaximo?: number;

  @ApiPropertyOptional({
    description: 'Data de aquisição inicial (YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsString()
  dataInicial?: string;

  @ApiPropertyOptional({
    description: 'Data de aquisição final (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsString()
  dataFinal?: string;

  @ApiPropertyOptional({
    description: 'Campo para ordenação',
    enum: [
      'nome',
      'codigo',
      'categoria',
      'status',
      'valorAquisicao',
      'dataAquisicao',
      'createdAt',
    ],
    example: 'nome',
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'nome';

  @ApiPropertyOptional({
    description: 'Direção da ordenação',
    enum: ['ASC', 'DESC'],
    example: 'ASC',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}

