import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExecutionStatus } from '../entities/execution.entity';

export class ConnectorMetricsDto {
  @ApiProperty({ description: 'Chave do conector', example: 'sap' })
  connectorKey!: string;

  @ApiProperty({ description: 'Nome do conector', example: 'SAP ERP' })
  connectorName!: string;

  @ApiProperty({ description: 'Período analisado' })
  period!: {
    from: Date;
    to: Date;
  };

  @ApiProperty({ description: 'Total de execuções', example: 100 })
  totalExecutions!: number;

  @ApiProperty({ description: 'Execuções por status' })
  executionsByStatus!: Record<ExecutionStatus, number>;

  @ApiProperty({ description: 'Taxa de sucesso (%)', example: 95.5 })
  successRate!: number;

  @ApiProperty({ description: 'Latência média (ms)', example: 1250 })
  averageLatency!: number;

  @ApiProperty({ description: 'Latência p95 (ms)', example: 2500 })
  p95Latency!: number;

  @ApiProperty({ description: 'Latência p99 (ms)', example: 5000 })
  p99Latency!: number;

  @ApiProperty({ description: 'Throughput (execuções/hora)', example: 10.5 })
  throughput!: number;

  @ApiProperty({ description: 'Erros por código HTTP' })
  errorsByCode!: Record<string, number>;

  @ApiProperty({ description: 'Total de registros processados', example: 5000 })
  totalRecordsProcessed!: number;

  @ApiProperty({ description: 'Taxa de erro (%)', example: 4.5 })
  errorRate!: number;
}




