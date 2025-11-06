import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsObject,
  IsBoolean,
  IsDateString,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ExecutionType } from '../entities/execution.entity';

export enum IntegrationEntity {
  ASSETS = 'assets',
  COST_CENTERS = 'costCenters',
  LOCATIONS = 'locations',
  DEPRECIATIONS = 'depreciations',
}

export class RunIntegrationOptionsDto {
  @ApiPropertyOptional({
    description: 'Data inicial para sincronização',
    example: '2025-01-01',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'Data final para sincronização',
    example: '2025-12-31',
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiPropertyOptional({
    description: 'Limite de registros a processar',
    example: 1000,
    minimum: 1,
    maximum: 10000,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10000)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Executar em modo dry-run (sem persistir dados)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;
}

export class RunIntegrationDto {
  @ApiProperty({
    description: 'Chave do conector ERP',
    example: 'sap',
    maxLength: 80,
  })
  @IsString()
  @IsNotEmpty()
  connectorKey!: string;

  @ApiProperty({
    description: 'Tipo de execução',
    enum: ExecutionType,
    example: ExecutionType.IMPORT,
  })
  @IsEnum(ExecutionType)
  type!: ExecutionType;

  @ApiProperty({
    description: 'Entidade a sincronizar',
    enum: IntegrationEntity,
    example: IntegrationEntity.ASSETS,
  })
  @IsEnum(IntegrationEntity)
  entity!: IntegrationEntity;

  @ApiPropertyOptional({
    description: 'Opções de execução',
    type: RunIntegrationOptionsDto,
  })
  @IsOptional()
  @IsObject()
  options?: RunIntegrationOptionsDto;
}


