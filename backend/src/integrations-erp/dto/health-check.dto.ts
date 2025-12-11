import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IntegrationHealthDto {
  @ApiProperty({ description: 'Chave do conector', example: 'sap' })
  connectorKey!: string;

  @ApiProperty({ description: 'Nome do conector', example: 'SAP ERP' })
  connectorName!: string;

  @ApiProperty({
    description: 'Status de saúde',
    enum: ['healthy', 'degraded', 'unhealthy'],
    example: 'healthy',
  })
  status!: 'healthy' | 'degraded' | 'unhealthy';

  @ApiProperty({ description: 'Se o conector está habilitado', example: true })
  enabled!: boolean;

  @ApiPropertyOptional({
    description: 'Última execução bem-sucedida',
    example: '2025-01-15T10:30:00Z',
  })
  lastSuccess?: Date;

  @ApiPropertyOptional({
    description: 'Última execução falhada',
    example: '2025-01-15T09:00:00Z',
  })
  lastFailure?: Date;

  @ApiProperty({
    description: 'Taxa de sucesso nas últimas 24h (%)',
    example: 98.5,
  })
  successRate24h!: number;

  @ApiProperty({
    description: 'Latência média nas últimas 24h (ms)',
    example: 1200,
  })
  averageLatency24h!: number;

  @ApiProperty({ description: 'SLA atual (%)', example: 99.5 })
  sla!: number;

  @ApiProperty({
    description: 'Mensagens de status',
    type: [String],
    example: [],
  })
  messages!: string[];
}

export class HealthCheckResultDto {
  @ApiProperty({
    description: 'Status geral',
    enum: ['healthy', 'degraded', 'unhealthy'],
    example: 'healthy',
  })
  status!: 'healthy' | 'degraded' | 'unhealthy';

  @ApiProperty({
    description: 'Timestamp da verificação',
    example: '2025-01-15T10:30:00Z',
  })
  timestamp!: Date;

  @ApiProperty({
    description: 'Health de cada integração',
    type: [IntegrationHealthDto],
  })
  integrations!: IntegrationHealthDto[];

  @ApiProperty({ description: 'Resumo' })
  summary!: {
    total: number;
    healthy: number;
    degraded: number;
    unhealthy: number;
  };
}





