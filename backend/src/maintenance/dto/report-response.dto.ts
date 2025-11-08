import { ApiProperty } from '@nestjs/swagger';
import { WorkOrderStatus } from '../entities/work-order.entity';

class PeriodDto {
  @ApiProperty({ description: 'Data inicial' })
  from: Date;

  @ApiProperty({ description: 'Data final' })
  to: Date;
}

class SummaryDto {
  @ApiProperty({ description: 'Total de OS' })
  totalOs: number;

  @ApiProperty({ 
    description: 'OS por status',
    type: Object,
    example: { ABERTA: 5, EM_ANDAMENTO: 10, CONCLUIDA: 20, VALIDADA: 15, CANCELADA: 2 },
  })
  osByStatus: Record<WorkOrderStatus, number>;

  @ApiProperty({ description: 'Custo total' })
  totalCost: number;

  @ApiProperty({ description: 'Total de horas trabalhadas' })
  totalLaborHours: number;

  @ApiProperty({ description: 'Custo total de peças' })
  totalPartsCost: number;
}

class WorkOrderReportDto {
  @ApiProperty({ description: 'ID da OS' })
  id: string;

  @ApiProperty({ description: 'Título' })
  titulo: string;

  @ApiProperty({ description: 'ID do patrimônio' })
  patrimonioId: string;

  @ApiProperty({ description: 'Status', enum: WorkOrderStatus })
  status: WorkOrderStatus;

  @ApiProperty({ description: 'Data de abertura' })
  openedAt: Date;

  @ApiProperty({ description: 'Data de fechamento', required: false })
  closedAt?: Date;

  @ApiProperty({ description: 'Custo total' })
  totalCost: number;

  @ApiProperty({ description: 'Horas trabalhadas' })
  laborHours: number;

  @ApiProperty({ description: 'Custo de peças' })
  partsCost: number;

  @ApiProperty({ description: 'Quantidade de peças' })
  partsCount: number;
}

export class ReportResponseDto {
  @ApiProperty({ description: 'Período', type: PeriodDto })
  period: PeriodDto;

  @ApiProperty({ description: 'Resumo', type: SummaryDto })
  summary: SummaryDto;

  @ApiProperty({ description: 'Ordens de serviço', type: [WorkOrderReportDto] })
  workOrders: WorkOrderReportDto[];
}

