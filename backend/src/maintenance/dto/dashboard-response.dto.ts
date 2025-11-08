import { ApiProperty } from '@nestjs/swagger';
import { WorkOrderStatus } from '../entities/work-order.entity';

class OverviewDto {
  @ApiProperty({ description: 'Total de OS' })
  totalOs: number;

  @ApiProperty({ description: 'OS abertas' })
  osAbertas: number;

  @ApiProperty({ description: 'OS em andamento' })
  osEmAndamento: number;

  @ApiProperty({ description: 'OS concluídas' })
  osConcluidas: number;

  @ApiProperty({ description: 'OS canceladas' })
  osCanceladas: number;

  @ApiProperty({ description: 'Total de planos preventivos' })
  planosPreventivos: number;

  @ApiProperty({ description: 'Próximos planos (7 dias)' })
  proximosPlanos: number;
}

class CostsDto {
  @ApiProperty({ description: 'Custo total' })
  totalCost: number;

  @ApiProperty({ description: 'Custo de mão de obra' })
  laborCost: number;

  @ApiProperty({ description: 'Custo de peças' })
  partsCost: number;

  @ApiProperty({ 
    description: 'Custo por status',
    type: Object,
    example: { ABERTA: 1000, EM_ANDAMENTO: 2000, CONCLUIDA: 5000, VALIDADA: 3000, CANCELADA: 0 },
  })
  costByStatus: Record<WorkOrderStatus, number>;
}

class PerformanceDto {
  @ApiProperty({ description: 'MTTR - Tempo médio para reparo (horas)' })
  mttr: number;

  @ApiProperty({ description: 'Tempo médio de resolução (horas)' })
  averageResolutionTime: number;

  @ApiProperty({ description: 'Taxa de conclusão (%)' })
  completionRate: number;
}

class RecentWorkOrderDto {
  @ApiProperty({ description: 'ID da OS' })
  id: string;

  @ApiProperty({ description: 'Título da OS' })
  titulo: string;

  @ApiProperty({ description: 'Status da OS', enum: WorkOrderStatus })
  status: WorkOrderStatus;

  @ApiProperty({ description: 'ID do patrimônio' })
  patrimonioId: string;

  @ApiProperty({ description: 'Data de abertura' })
  openedAt: Date;
}

class UpcomingPlanDto {
  @ApiProperty({ description: 'ID do plano' })
  id: string;

  @ApiProperty({ description: 'ID da categoria' })
  categoriaId: string;

  @ApiProperty({ description: 'Próxima execução' })
  proximaExecucao: Date;
}

class RecentDto {
  @ApiProperty({ description: 'OS recentes', type: [RecentWorkOrderDto] })
  recentWorkOrders: RecentWorkOrderDto[];

  @ApiProperty({ description: 'Próximos planos', type: [UpcomingPlanDto] })
  upcomingPlans: UpcomingPlanDto[];
}

export class DashboardResponseDto {
  @ApiProperty({ description: 'Visão geral', type: OverviewDto })
  overview: OverviewDto;

  @ApiProperty({ description: 'Custos', type: CostsDto })
  costs: CostsDto;

  @ApiProperty({ description: 'Performance', type: PerformanceDto })
  performance: PerformanceDto;

  @ApiProperty({ description: 'Dados recentes', type: RecentDto })
  recent: RecentDto;
}

