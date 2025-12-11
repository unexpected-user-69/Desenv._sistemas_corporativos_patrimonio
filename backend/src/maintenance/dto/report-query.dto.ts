import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsEnum, Matches } from 'class-validator';
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
    format: 'uuid',
  })
  @IsOptional()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'patrimonioId deve ser um UUID válido',
  })
  patrimonioId?: string;

  @ApiPropertyOptional({
    description: 'Status da OS',
    enum: WorkOrderStatus,
  })
  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;
}


