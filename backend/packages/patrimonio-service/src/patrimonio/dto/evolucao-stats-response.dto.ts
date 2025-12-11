import { ApiProperty } from '@nestjs/swagger';

export class EvolucaoStatsItemDto {
  @ApiProperty({
    description: 'Data/período de referência',
    example: '2025-01',
  })
  periodo!: string;

  @ApiProperty({
    description: 'Quantidade total de patrimônios até este período',
    example: 150,
  })
  quantidadeTotal!: number;

  @ApiProperty({
    description: 'Valor total dos patrimônios até este período',
    example: 1500000.00,
  })
  valorTotal!: number;

  @ApiProperty({
    description: 'Quantidade de patrimônios adicionados neste período',
    example: 10,
  })
  quantidadeAdicionada!: number;

  @ApiProperty({
    description: 'Valor dos patrimônios adicionados neste período',
    example: 125000.50,
  })
  valorAdicionado!: number;
}

export class EvolucaoStatsResponseDto {
  @ApiProperty({
    description: 'Lista de estatísticas de evolução temporal',
    type: [EvolucaoStatsItemDto],
  })
  evolucao!: EvolucaoStatsItemDto[];

  @ApiProperty({
    description: 'Tipo de período usado (mensal, trimestral, anual)',
    example: 'mensal',
    enum: ['mensal', 'trimestral', 'anual'],
  })
  tipoPeriodo!: string;

  @ApiProperty({
    description: 'Ano de referência',
    example: 2025,
  })
  ano!: number;
}
