import { IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ReportModel } from '../entities/report-request.entity';

export class MetricsQueryDto {
  @ApiPropertyOptional({
    description: 'Data inicial (ISO 8601)',
    example: '2025-11-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'Data final (ISO 8601)',
    example: '2025-11-07T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário para filtrar métricas',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    description: 'Modelo de relatório para filtrar',
    enum: ReportModel,
  })
  @IsOptional()
  @IsEnum(ReportModel)
  model?: ReportModel;
}

