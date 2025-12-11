import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HistoricoResponsavelItemDto {
  @ApiProperty({
    description: 'ID do responsável',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  responsavelId!: string;

  @ApiPropertyOptional({
    description: 'Nome do responsável',
    example: 'João Silva',
  })
  responsavelNome?: string;

  @ApiProperty({
    description: 'Data de início da responsabilidade',
    example: '2024-01-15T10:00:00Z',
  })
  dataInicio!: Date;

  @ApiPropertyOptional({
    description: 'Data de fim da responsabilidade',
    example: '2024-12-31T10:00:00Z',
  })
  dataFim?: Date;

  @ApiPropertyOptional({
    description: 'Observações sobre a transferência',
    example: 'Transferência de setor',
  })
  observacoes?: string;
}

export class HistoricoResponsaveisResponseDto {
  @ApiProperty({
    description: 'ID do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  patrimonioId!: string;

  @ApiProperty({
    description: 'Lista de responsáveis históricos',
    type: [HistoricoResponsavelItemDto],
  })
  responsaveis!: HistoricoResponsavelItemDto[];

  @ApiProperty({
    description: 'Total de responsáveis',
    example: 3,
  })
  total!: number;
}

