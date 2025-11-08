import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReconciliationSummaryDto {
  @ApiProperty({ description: 'Total de registros processados', example: 100 })
  total!: number;

  @ApiProperty({ description: 'Registros inseridos', example: 50 })
  inserted!: number;

  @ApiProperty({ description: 'Registros atualizados', example: 30 })
  updated!: number;

  @ApiProperty({ description: 'Registros ignorados (duplicados sem mudanças)', example: 15 })
  ignored!: number;

  @ApiProperty({ description: 'Registros com erro', example: 5 })
  errors!: number;

  @ApiPropertyOptional({
    description: 'Detalhes dos erros',
    type: [Object],
    example: [
      { externalId: 'EXT-001', error: 'Campo obrigatório ausente', field: 'nome' },
    ],
  })
  errorDetails?: Array<{
    externalId: string;
    error: string;
    field?: string;
  }>;

  @ApiPropertyOptional({
    description: 'Estatísticas por campo',
    type: Object,
    example: { nome: { mapped: 95, errors: 5 } },
  })
  fieldStats?: Record<string, {
    mapped: number;
    errors: number;
  }>;
}




