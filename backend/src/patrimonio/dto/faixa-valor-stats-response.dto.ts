import { ApiProperty } from '@nestjs/swagger';

export class FaixaValorStatsItemDto {
  @ApiProperty({
    description: 'Faixa de valor',
    example: '0 - 1000',
  })
  faixa!: string;

  @ApiProperty({
    description: 'Valor mínimo da faixa',
    example: 0,
  })
  valorMinimo!: number;

  @ApiProperty({
    description: 'Valor máximo da faixa',
    example: 1000,
    nullable: true,
  })
  valorMaximo?: number;

  @ApiProperty({
    description: 'Quantidade de patrimônios nesta faixa',
    example: 25,
  })
  quantidade!: number;

  @ApiProperty({
    description: 'Valor total dos patrimônios nesta faixa',
    example: 15000.00,
  })
  valorTotal!: number;
}

export class FaixaValorStatsResponseDto {
  @ApiProperty({
    description: 'Lista de estatísticas por faixa de valor',
    type: [FaixaValorStatsItemDto],
  })
  faixas!: FaixaValorStatsItemDto[];

  @ApiProperty({
    description: 'Intervalo usado para calcular as faixas',
    example: 1000,
  })
  intervalo!: number;
}
