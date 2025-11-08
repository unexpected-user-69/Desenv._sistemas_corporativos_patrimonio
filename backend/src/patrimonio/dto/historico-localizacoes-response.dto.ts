import { ApiProperty } from '@nestjs/swagger';

export class HistoricoLocalizacaoItemDto {
  @ApiProperty({
    description: 'ID do registro de histórico',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Localização anterior',
    example: 'Sala 101',
    required: false,
  })
  localizacaoAnterior?: string;

  @ApiProperty({
    description: 'Nova localização',
    example: 'Sala 205',
  })
  localizacaoNova!: string;

  @ApiProperty({
    description: 'Data da mudança',
    example: '2025-01-20T10:30:00Z',
  })
  dataMudanca!: Date;

  @ApiProperty({
    description: 'ID do usuário que fez a mudança',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false,
  })
  usuarioId?: string;

  @ApiProperty({
    description: 'Observações sobre a mudança',
    example: 'Mudança de setor',
    required: false,
  })
  observacoes?: string;
}

export class HistoricoLocalizacoesResponseDto {
  @ApiProperty({
    description: 'ID do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  patrimonioId!: string;

  @ApiProperty({
    description: 'Lista de registros de histórico de localizações',
    type: [HistoricoLocalizacaoItemDto],
  })
  historico!: HistoricoLocalizacaoItemDto[];

  @ApiProperty({
    description: 'Total de registros de histórico',
    example: 5,
  })
  total!: number;
}


