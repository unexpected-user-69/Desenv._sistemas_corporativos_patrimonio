import { ApiProperty } from '@nestjs/swagger';

export class MarcaModeloStatsItemDto {
  @ApiProperty({
    description: 'Marca do patrimônio',
    example: 'Dell',
  })
  marca!: string;

  @ApiProperty({
    description: 'Modelo do patrimônio',
    example: 'Inspiron 15',
  })
  modelo!: string;

  @ApiProperty({
    description: 'Quantidade de patrimônios com esta marca/modelo',
    example: 5,
  })
  quantidade!: number;

  @ApiProperty({
    description: 'Valor total dos patrimônios com esta marca/modelo',
    example: 25000.00,
  })
  valorTotal!: number;
}

export class MarcaModeloStatsResponseDto {
  @ApiProperty({
    description: 'Lista de estatísticas por marca/modelo',
    type: [MarcaModeloStatsItemDto],
  })
  itens!: MarcaModeloStatsItemDto[];

  @ApiProperty({
    description: 'Total de grupos (marca/modelo)',
    example: 10,
  })
  total!: number;

  @ApiProperty({
    description: 'Valor total geral de todos os patrimônios',
    example: 500000.00,
  })
  valorTotalGeral!: number;
}

