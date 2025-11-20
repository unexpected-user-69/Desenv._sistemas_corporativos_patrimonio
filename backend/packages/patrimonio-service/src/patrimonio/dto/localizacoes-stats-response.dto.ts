import { ApiProperty } from '@nestjs/swagger';

export class LocalizacaoStatsItemDto {
  @ApiProperty({
    description: 'Localização do patrimônio',
    example: 'Sala 205 - Setor Financeiro',
  })
  localizacao!: string;

  @ApiProperty({
    description: 'Quantidade de patrimônios nesta localização',
    example: 15,
  })
  quantidade!: number;

  @ApiProperty({
    description: 'Valor total dos patrimônios nesta localização',
    example: 125000.50,
  })
  valorTotal!: number;
}

export class LocalizacoesStatsResponseDto {
  @ApiProperty({
    description: 'Lista de estatísticas por localização',
    type: [LocalizacaoStatsItemDto],
  })
  localizacoes!: LocalizacaoStatsItemDto[];

  @ApiProperty({
    description: 'Total de localizações',
    example: 10,
  })
  totalLocalizacoes!: number;
}
