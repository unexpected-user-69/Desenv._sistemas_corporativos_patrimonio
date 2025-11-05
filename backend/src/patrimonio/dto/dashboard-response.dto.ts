import { ApiProperty } from '@nestjs/swagger';

export class DashboardResponseDto {
  @ApiProperty({
    description: 'Total de patrimônios cadastrados',
    example: 1000,
  })
  total!: number;

  @ApiProperty({
    description: 'Valor total do patrimônio',
    example: 5000000,
  })
  valorTotal!: number;

  @ApiProperty({
    description: 'Quantidade de patrimônios por status',
    example: {
      ATIVO: 800,
      MANUTENCAO: 50,
      DESCARTADO: 150,
    },
    type: 'object',
    additionalProperties: true,
  })
  porStatus!: Record<string, number>;

  @ApiProperty({
    description: 'Quantidade de patrimônios por categoria (ID da categoria)',
    example: {
      '123e4567-e89b-12d3-a456-426614174000': 300,
      '223e4567-e89b-12d3-a456-426614174001': 200,
    },
    type: 'object',
    additionalProperties: true,
  })
  porCategoria!: Record<string, number>;

  @ApiProperty({
    description: 'Quantidade de patrimônios com garantia vencendo nos próximos 30 dias',
    example: 15,
  })
  garantiasVencendo!: number;

  @ApiProperty({
    description: 'Quantidade de patrimônios em manutenção',
    example: 8,
  })
  emManutencao!: number;

  @ApiProperty({
    description: 'Quantidade de patrimônios adquiridos no último mês',
    example: 25,
  })
  novosUltimoMes!: number;
}

