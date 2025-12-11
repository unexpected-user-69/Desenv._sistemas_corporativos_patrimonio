import { ApiProperty } from '@nestjs/swagger';

export class AquisicaoStatsItemDto {
  @ApiProperty({
    description: 'Período de aquisição',
    example: '2025-01',
  })
  periodo!: string;

  @ApiProperty({
    description: 'Data inicial do período',
    example: '2025-01-01',
  })
  dataInicial!: string;

  @ApiProperty({
    description: 'Data final do período',
    example: '2025-01-31',
  })
  dataFinal!: string;

  @ApiProperty({
    description: 'Quantidade de patrimônios adquiridos no período',
    example: 15,
  })
  quantidade!: number;

  @ApiProperty({
    description: 'Valor total dos patrimônios adquiridos no período',
    example: 125000.50,
  })
  valorTotal!: number;
}

export class AquisicaoStatsResponseDto {
  @ApiProperty({
    description: 'Lista de estatísticas por período de aquisição',
    type: [AquisicaoStatsItemDto],
  })
  periodos!: AquisicaoStatsItemDto[];

  @ApiProperty({
    description: 'Tipo de período usado (mensal, trimestral, anual)',
    example: 'mensal',
    enum: ['mensal', 'trimestral', 'anual'],
  })
  tipoPeriodo!: string;
}
