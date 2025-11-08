import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ReportRequestStatus, ReportType, ReportModel } from '../entities/report-request.entity';

export class ListReportsQueryDto {
  @ApiPropertyOptional({
    description: 'Filtrar por status',
    enum: ReportRequestStatus,
  })
  @IsOptional()
  @IsEnum(ReportRequestStatus)
  status?: ReportRequestStatus;

  @ApiPropertyOptional({
    description: 'Filtrar por tipo',
    enum: ReportType,
  })
  @IsOptional()
  @IsEnum(ReportType)
  type?: ReportType;

  @ApiPropertyOptional({
    description: 'Filtrar por modelo',
    enum: ReportModel,
  })
  @IsOptional()
  @IsEnum(ReportModel)
  model?: ReportModel;

  @ApiPropertyOptional({
    description: 'Data inicial (ISO 8601)',
    example: '2025-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'Data final (ISO 8601)',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;
}




