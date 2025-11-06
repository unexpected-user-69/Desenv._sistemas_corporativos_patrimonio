import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExecutionStatus, ExecutionType } from '../entities/execution.entity';
import { LogLevel } from '../entities/execution-log.entity';

export class ExecutionLogResponseDto {
  @ApiProperty({ description: 'ID do log', example: '1' })
  id!: string;

  @ApiProperty({
    description: 'Nível do log',
    enum: LogLevel,
    example: LogLevel.INFO,
  })
  level!: LogLevel;

  @ApiProperty({ description: 'Mensagem do log', example: 'Started import' })
  message!: string;

  @ApiPropertyOptional({
    description: 'Metadados adicionais',
    type: Object,
    example: { step: 'fetch', records: 100 },
  })
  metaJson?: Record<string, any>;

  @ApiProperty({
    description: 'Data de criação',
    example: '2025-01-15T10:30:00Z',
  })
  createdAt!: Date;
}

export class ExecutionResponseDto {
  @ApiProperty({ description: 'ID da execução', format: 'uuid' })
  id!: string;

  @ApiProperty({
    description: 'Chave do conector',
    example: 'sap',
  })
  connectorKey!: string;

  @ApiProperty({
    description: 'Tipo de execução',
    enum: ExecutionType,
    example: ExecutionType.IMPORT,
  })
  type!: ExecutionType;

  @ApiProperty({
    description: 'Status da execução',
    enum: ExecutionStatus,
    example: ExecutionStatus.RUNNING,
  })
  status!: ExecutionStatus;

  @ApiPropertyOptional({
    description: 'Data de início',
    example: '2025-01-15T10:30:00Z',
  })
  startedAt?: Date;

  @ApiPropertyOptional({
    description: 'Data de término',
    example: '2025-01-15T10:35:00Z',
  })
  finishedAt?: Date;

  @ApiPropertyOptional({
    description: 'Mensagem de erro (se houver)',
    example: 'Connection timeout',
  })
  error?: string;

  @ApiPropertyOptional({
    description: 'Usuário que criou a execução',
    example: 'admin@example.com',
  })
  createdBy?: string;

  @ApiProperty({
    description: 'Data de criação',
    example: '2025-01-15T10:30:00Z',
  })
  createdAt!: Date;

  @ApiPropertyOptional({
    description: 'Logs da execução',
    type: [ExecutionLogResponseDto],
  })
  logs?: ExecutionLogResponseDto[];
}

export class RunIntegrationResponseDto {
  @ApiProperty({
    description: 'ID da execução criada',
    format: 'uuid',
  })
  executionId!: string;

  @ApiProperty({
    description: 'Status inicial da execução',
    enum: ExecutionStatus,
    example: ExecutionStatus.QUEUED,
  })
  status!: ExecutionStatus;
}

