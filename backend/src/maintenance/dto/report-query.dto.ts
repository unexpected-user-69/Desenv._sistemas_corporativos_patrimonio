import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsEnum, IsUUID } from 'class-validator';
import { WorkOrderStatus } from '../entities/work-order.entity';

export class ReportQueryDto {
  @ApiPropertyOptional({
    description: 'Data inicial',
    example: '2025-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional({
    description: 'Data final',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  toDate?: string;

  @ApiPropertyOptional({
    description: 'ID do patrimônio',
  })
  @IsOptional()
  @IsUUID()
  patrimonioId?: string;

  @ApiPropertyOptional({
    description: 'Status da OS',
    enum: WorkOrderStatus,
  })
  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;
}


