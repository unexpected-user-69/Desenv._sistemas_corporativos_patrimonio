import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoriaResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'EQUIPAMENTO' })
  @Expose()
  codigo: string;

  @ApiProperty({ example: 'Equipamento' })
  @Expose()
  nome: string;

  @ApiProperty({ example: 'Equipamentos eletrônicos, computadores e periféricos' })
  @Expose()
  descricao: string;

  @ApiProperty({ example: 'laptop' })
  @Expose()
  icone: string;

  @ApiProperty({ example: '#3B82F6' })
  @Expose()
  cor: string;

  @ApiProperty({ example: true })
  @Expose()
  ativo: boolean;

  @ApiProperty({ example: '2025-10-22T18:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2025-10-22T18:00:00.000Z' })
  @Expose()
  updatedAt: Date;
}


