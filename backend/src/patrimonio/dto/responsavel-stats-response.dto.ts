import { ApiProperty } from '@nestjs/swagger';

export class ResponsavelStatsResponseDto {
  @ApiProperty({
    description: 'ID do responsável',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  responsavelId!: string;

  @ApiProperty({
    description: 'Total de patrimônios do responsável',
    example: 15,
  })
  total!: number;

  @ApiProperty({
    description: 'Valor total dos patrimônios',
    example: 125000.50,
  })
  valorTotal!: number;

  @ApiProperty({
    description: 'Quantidade de patrimônios por categoria',
    type: Object,
    example: {
      EQUIPAMENTO: 10,
      MOBILIARIO: 5,
    },
  })
  porCategoria!: Record<string, number>;

  @ApiProperty({
    description: 'Quantidade de patrimônios por status',
    type: Object,
    example: {
      ATIVO: 12,
      MANUTENCAO: 3,
    },
  })
  porStatus!: Record<string, number>;
}

