import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsUUID,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  PatrimonioStatus,
  PatrimonioCategoria,
} from '../entities/patrimonio.entity';
import { IsTrimmed } from '../../common/validators';

export class FilterPatrimoniosDto {
  @ApiPropertyOptional({
    description: 'Número da página (começando em 1)',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'A página deve ser um número' })
  @Min(1, { message: 'A página deve ser maior ou igual a 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de itens por página',
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'O limite deve ser um número' })
  @Min(1, { message: 'O limite deve ser maior ou igual a 1' })
  @Max(100, { message: 'O limite deve ser menor ou igual a 100' })
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Busca textual genérica (código, nome, descrição)',
    example: 'notebook',
  })
  @IsOptional()
  @IsString({ message: 'A busca deve ser uma string' })
  @IsTrimmed({ message: 'A busca não pode conter espaços no início ou fim' })
  q?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por categoria do patrimônio',
    enum: PatrimonioCategoria,
    example: PatrimonioCategoria.EQUIPAMENTO,
  })
  @IsOptional()
  @IsEnum(PatrimonioCategoria, {
    message: 'Categoria deve ser um valor válido',
  })
  categoria?: PatrimonioCategoria;

  @ApiPropertyOptional({
    description: 'Filtrar por status do patrimônio',
    enum: PatrimonioStatus,
    example: PatrimonioStatus.ATIVO,
  })
  @IsOptional()
  @IsEnum(PatrimonioStatus, { message: 'Status deve ser um valor válido' })
  status?: PatrimonioStatus;

  @ApiPropertyOptional({
    description: 'Filtrar por marca',
    example: 'Dell',
  })
  @IsOptional()
  @IsString({ message: 'A marca deve ser uma string' })
  @IsTrimmed({ message: 'A marca não pode conter espaços no início ou fim' })
  marca?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por modelo',
    example: 'Inspiron 15',
  })
  @IsOptional()
  @IsString({ message: 'O modelo deve ser uma string' })
  @IsTrimmed({ message: 'O modelo não pode conter espaços no início ou fim' })
  modelo?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por localização',
    example: 'Sala 101',
  })
  @IsOptional()
  @IsString({ message: 'A localização deve ser uma string' })
  @IsTrimmed({
    message: 'A localização não pode conter espaços no início ou fim',
  })
  localizacao?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por responsável (ID do usuário)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID('4', { message: 'O ID do responsável deve ser um UUID válido' })
  responsavelId?: string;

  @ApiPropertyOptional({
    description: 'Valor mínimo de aquisição',
    example: 1000.0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'O valor mínimo deve ser um número' })
  @Min(0, { message: 'O valor mínimo deve ser maior ou igual a zero' })
  valorMinimo?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo de aquisição',
    example: 5000.0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'O valor máximo deve ser um número' })
  @Min(0, { message: 'O valor máximo deve ser maior ou igual a zero' })
  valorMaximo?: number;

  @ApiPropertyOptional({
    description: 'Data inicial de aquisição',
    example: '2024-01-01',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data inicial deve estar no formato ISO' })
  dataInicial?: string;

  @ApiPropertyOptional({
    description: 'Data final de aquisição',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data final deve estar no formato ISO' })
  dataFinal?: string;

  @ApiPropertyOptional({
    description: 'Ordenar por campo',
    enum: [
      'codigo',
      'nome',
      'categoria',
      'status',
      'valorAquisicao',
      'dataAquisicao',
      'createdAt',
    ],
    default: 'createdAt',
    example: 'nome',
  })
  @IsOptional()
  @IsString({ message: 'O campo de ordenação deve ser uma string' })
  sortBy?:
    | 'codigo'
    | 'nome'
    | 'categoria'
    | 'status'
    | 'valorAquisicao'
    | 'dataAquisicao'
    | 'createdAt' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Direção da ordenação',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    example: 'ASC',
  })
  @IsOptional()
  @IsString({ message: 'A direção da ordenação deve ser uma string' })
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
