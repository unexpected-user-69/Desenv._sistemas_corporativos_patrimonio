import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WorkOrderStatus } from '../entities/work-order.entity';

export class UpdateWorkOrderStatusDto {
  @ApiProperty({
    description: 'Novo status da OS',
    enum: WorkOrderStatus,
    example: WorkOrderStatus.EM_ANDAMENTO,
  })
  @IsEnum(WorkOrderStatus)
  status!: WorkOrderStatus;
}

