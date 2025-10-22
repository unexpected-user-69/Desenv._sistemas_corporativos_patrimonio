import { ApiProperty } from '@nestjs/swagger';

export class CategoriaResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'EQUIPAMENTO' })
  codigo: string;

  @ApiProperty({ example: 'Equipamento' })
  nome: string;

  @ApiProperty({ example: 'Equipamentos eletrônicos, computadores e periféricos' })
  descricao: string;

  @ApiProperty({ example: 'laptop' })
  icone: string;

  @ApiProperty({ example: '#3B82F6' })
  cor: string;

  @ApiProperty({ example: true })
  ativo: boolean;

  @ApiProperty({ example: '2025-10-22T18:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-10-22T18:00:00.000Z' })
  updatedAt: Date;
}

export class PaginatedCategoriaResponseDto {
  @ApiProperty({ type: [CategoriaResponseDto] })
  data: CategoriaResponseDto[];

  @ApiProperty({ example: 50 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 5 })
  totalPages: number;

  @ApiProperty({ example: true })
  hasNextPage: boolean;

  @ApiProperty({ example: false })
  hasPreviousPage: boolean;
}


