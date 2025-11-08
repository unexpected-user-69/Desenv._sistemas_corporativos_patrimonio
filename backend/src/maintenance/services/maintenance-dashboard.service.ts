import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, LessThanOrEqual } from 'typeorm';
import { WorkOrder, WorkOrderStatus } from '../entities/work-order.entity';
import { WorkLog } from '../entities/work-log.entity';
import { Part } from '../entities/part.entity';
import { MaintenancePlan } from '../entities/maintenance-plan.entity';
import { SlaService } from './sla.service';

export interface DashboardData {
  overview: {
    totalOs: number;
    osAbertas: number;
    osEmAndamento: number;
    osConcluidas: number;
    osCanceladas: number;
    planosPreventivos: number;
    proximosPlanos: number;
  };
  costs: {
    totalCost: number;
    laborCost: number;
    partsCost: number;
    costByStatus: Record<WorkOrderStatus, number>;
  };
  performance: {
    mttr: number;
    averageResolutionTime: number;
    completionRate: number;
  };
  recent: {
    recentWorkOrders: Array<{
      id: string;
      titulo: string;
      status: WorkOrderStatus;
      patrimonioId: string;
      openedAt: Date;
    }>;
    upcomingPlans: Array<{
      id: string;
      categoriaId: string;
      proximaExecucao: Date;
    }>;
  };
}

@Injectable()
export class MaintenanceDashboardService {
  private readonly logger = new Logger(MaintenanceDashboardService.name);

  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(WorkLog)
    private workLogRepository: Repository<WorkLog>,
    @InjectRepository(Part)
    private partRepository: Repository<Part>,
    @InjectRepository(MaintenancePlan)
    private maintenancePlanRepository: Repository<MaintenancePlan>,
    private slaService: SlaService,
  ) {}

  /**
   * Obtém dados do dashboard
   */
  async getDashboardData(): Promise<DashboardData> {
    // Contar OS por status
    const [abertas, emAndamento, concluidas, canceladas, totalOs] = await Promise.all([
      this.workOrderRepository.count({ where: { status: WorkOrderStatus.ABERTA } }),
      this.workOrderRepository.count({ where: { status: WorkOrderStatus.EM_ANDAMENTO } }),
      this.workOrderRepository.count({ where: { status: WorkOrderStatus.CONCLUIDA } }),
      this.workOrderRepository.count({ where: { status: WorkOrderStatus.CANCELADA } }),
      this.workOrderRepository.count(),
    ]);

    // Contar planos preventivos
    const nextWeekDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Próximos 7 dias
    const [planosPreventivos, proximosPlanos] = await Promise.all([
      this.maintenancePlanRepository.count(),
      this.maintenancePlanRepository.count({
        where: {
          proximaExecucao: LessThanOrEqual(nextWeekDate),
        },
      }),
    ]);

    // Calcular custos
    const allWorkOrders = await this.workOrderRepository.find();
    const workOrderIds = allWorkOrders.map((wo) => wo.id);

    let workLogs: WorkLog[] = [];
    let parts: Part[] = [];

    if (workOrderIds.length > 0) {
      [workLogs, parts] = await Promise.all([
        this.workLogRepository.find({
          where: { workOrderId: In(workOrderIds) },
        }),
        this.partRepository.find({
          where: { workOrderId: In(workOrderIds) },
        }),
      ]);
    }

    const laborCost = workLogs.reduce((sum, log) => sum + log.custo, 0);
    const partsCost = parts.reduce(
      (sum, part) => sum + part.quantidade * part.custoUnitario,
      0,
    );
    const totalCost = laborCost + partsCost;

    // Calcular custos por status
    const costByStatus: Record<WorkOrderStatus, number> = {
      [WorkOrderStatus.ABERTA]: 0,
      [WorkOrderStatus.EM_ANDAMENTO]: 0,
      [WorkOrderStatus.CONCLUIDA]: 0,
      [WorkOrderStatus.VALIDADA]: 0,
      [WorkOrderStatus.CANCELADA]: 0,
    };

    for (const wo of allWorkOrders) {
      const woLogs = workLogs.filter((log) => log.workOrderId === wo.id);
      const woParts = parts.filter((part) => part.workOrderId === wo.id);
      const woCost =
        woLogs.reduce((sum, log) => sum + log.custo, 0) +
        woParts.reduce((sum, part) => sum + part.quantidade * part.custoUnitario, 0);
      costByStatus[wo.status] = (costByStatus[wo.status] || 0) + woCost;
    }

    // Calcular métricas de performance
    const mttr = await this.slaService.calculateMTTR().catch(() => 0);
    const completedOrders = allWorkOrders.filter(
      (wo) => wo.closedAt && (wo.status === WorkOrderStatus.CONCLUIDA || wo.status === WorkOrderStatus.VALIDADA),
    );
    const averageResolutionTime =
      completedOrders.length > 0
        ? completedOrders.reduce((sum, wo) => {
            const resolutionTime = wo.closedAt!.getTime() - wo.openedAt.getTime();
            return sum + resolutionTime;
          }, 0) / completedOrders.length / (1000 * 60 * 60) // Converter para horas
        : 0;

    const completionRate =
      totalOs > 0
        ? ((concluidas + (allWorkOrders.filter((wo) => wo.status === WorkOrderStatus.VALIDADA).length)) /
            totalOs) *
          100
        : 0;

    // OS recentes (últimas 10)
    const recentWorkOrders = await this.workOrderRepository.find({
      order: { openedAt: 'DESC' },
      take: 10,
    });

    // Planos próximos (próximos 7 dias)
    const now = new Date();
    const upcomingPlans = await this.maintenancePlanRepository
      .createQueryBuilder('plan')
      .where('plan.proximaExecucao >= :now', { now })
      .andWhere('plan.proximaExecucao <= :nextWeekDate', { nextWeekDate })
      .orderBy('plan.proximaExecucao', 'ASC')
      .take(10)
      .getMany();

    return {
      overview: {
        totalOs,
        osAbertas: abertas,
        osEmAndamento: emAndamento,
        osConcluidas: concluidas,
        osCanceladas: canceladas,
        planosPreventivos,
        proximosPlanos: proximosPlanos,
      },
      costs: {
        totalCost,
        laborCost,
        partsCost,
        costByStatus,
      },
      performance: {
        mttr,
        averageResolutionTime: Math.round(averageResolutionTime * 100) / 100,
        completionRate: Math.round(completionRate * 100) / 100,
      },
      recent: {
        recentWorkOrders: recentWorkOrders.map((wo) => ({
          id: wo.id,
          titulo: wo.titulo,
          status: wo.status,
          patrimonioId: wo.patrimonioId,
          openedAt: wo.openedAt,
        })),
        upcomingPlans: upcomingPlans.map((plan) => ({
          id: plan.id,
          categoriaId: plan.categoriaId,
          proximaExecucao: plan.proximaExecucao,
        })),
      },
    };
  }
}

