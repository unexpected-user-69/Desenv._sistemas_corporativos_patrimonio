import { ApiProperty } from '@nestjs/swagger';
import { WorkOrderResponseDto } from './work-order-response.dto';

export class PaginatedWorkOrdersResponseDto {
  @ApiProperty({
    description: 'Lista de ordens de serviço',
    type: [WorkOrderResponseDto],
  })
  data!: WorkOrderResponseDto[];

  @ApiProperty({
    description: 'Informações de paginação',
  })
  meta!: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

