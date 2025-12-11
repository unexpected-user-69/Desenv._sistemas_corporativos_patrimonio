import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HistoricoAlteracaoItemDto {
  @ApiProperty({
    description: 'Data da alteração',
    example: '2025-01-27T10:30:00Z',
  })
  data!: Date;

  @ApiPropertyOptional({
    description: 'ID do usuário que realizou a alteração',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  usuarioId?: string;

  @ApiPropertyOptional({
    description: 'Nome do usuário que realizou a alteração',
    example: 'João Silva',
  })
  usuarioNome?: string;

  @ApiProperty({
    description: 'Campo alterado',
    example: 'status',
  })
  campo!: string;

  @ApiPropertyOptional({
    description: 'Valor anterior',
    example: 'ATIVO',
  })
  valorAnterior?: any;

  @ApiPropertyOptional({
    description: 'Novo valor',
    example: 'MANUTENCAO',
  })
  novoValor?: any;

  @ApiPropertyOptional({
    description: 'Ação realizada',
    example: 'UPDATE',
  })
  acao?: string;
}

export class HistoricoAlteracaoResponseDto {
  @ApiProperty({
    description: 'ID do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  patrimonioId!: string;

  @ApiProperty({
    description: 'Lista de alterações',
    type: [HistoricoAlteracaoItemDto],
  })
  historico!: HistoricoAlteracaoItemDto[];

  @ApiProperty({
    description: 'Total de alterações',
    example: 5,
  })
  total!: number;
}

