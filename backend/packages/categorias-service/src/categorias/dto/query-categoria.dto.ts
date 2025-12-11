import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCategoriaDto {
  @ApiProperty({
    description: 'Número da página',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Quantidade de itens por página',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiProperty({
    description: 'Busca textual (nome, código ou descrição)',
    example: 'equipamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiProperty({
    description: 'Filtrar por código exato',
    example: 'EQUIPAMENTO',
    required: false,
  })
  @IsOptional()
  @IsString()
  codigo?: string;

  @ApiProperty({
    description: 'Filtrar por status ativo/inativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  ativo?: boolean;

  @ApiProperty({
    description: 'Campo para ordenação',
    example: 'nome',
    required: false,
    default: 'nome',
    enum: ['nome', 'codigo', 'createdAt', 'updatedAt'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'nome';

  @ApiProperty({
    description: 'Direção da ordenação',
    example: 'ASC',
    required: false,
    default: 'ASC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'ASC';
}






