import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import { WorkOrder, WorkOrderStatus } from '../entities/work-order.entity';
import { WorkLog } from '../entities/work-log.entity';
import { Part } from '../entities/part.entity';

export interface MaintenanceReport {
  period: {
    from: Date;
    to: Date;
  };
  summary: {
    totalOs: number;
    osByStatus: Record<WorkOrderStatus, number>;
    totalCost: number;
    totalLaborHours: number;
    totalPartsCost: number;
  };
  workOrders: Array<{
    id: string;
    titulo: string;
    patrimonioId: string;
    status: WorkOrderStatus;
    openedAt: Date;
    closedAt?: Date;
    totalCost: number;
    laborHours: number;
    partsCost: number;
    partsCount: number;
  }>;
}

@Injectable()
export class MaintenanceReportsService {
  private readonly logger = new Logger(MaintenanceReportsService.name);

  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(WorkLog)
    private workLogRepository: Repository<WorkLog>,
    @InjectRepository(Part)
    private partRepository: Repository<Part>,
  ) {}

  /**
   * Gera relatório de manutenção para um período
   */
  async generateReport(
    fromDate: Date,
    toDate: Date,
    patrimonioId?: string,
    status?: WorkOrderStatus,
  ): Promise<MaintenanceReport> {
    const queryBuilder = this.workOrderRepository
      .createQueryBuilder('wo')
      .where('wo.openedAt >= :fromDate', { fromDate })
      .andWhere('wo.openedAt <= :toDate', { toDate });

    if (patrimonioId) {
      queryBuilder.andWhere('wo.patrimonioId = :patrimonioId', { patrimonioId });
    }

    if (status) {
      queryBuilder.andWhere('wo.status = :status', { status });
    }

    const workOrders = await queryBuilder.getMany();

    // Buscar custos e horas trabalhadas
    const workOrderIds = workOrders.map((wo) => wo.id);
    const workLogs = workOrderIds.length > 0
      ? await this.workLogRepository.find({
          where: { workOrderId: In(workOrderIds) },
        })
      : [];

    const parts = workOrderIds.length > 0
      ? await this.partRepository.find({
          where: { workOrderId: In(workOrderIds) },
        })
      : [];

    // Agrupar por OS (não precisamos do Map, só agrupar logs e parts)

    const logsByOs = new Map<string, WorkLog[]>();
    workLogs.forEach((log) => {
      const logs = logsByOs.get(log.workOrderId) || [];
      logs.push(log);
      logsByOs.set(log.workOrderId, logs);
    });

    const partsByOs = new Map<string, Part[]>();
    parts.forEach((part) => {
      const osParts = partsByOs.get(part.workOrderId) || [];
      osParts.push(part);
      partsByOs.set(part.workOrderId, osParts);
    });

    // Calcular custos por OS
    const workOrdersData = workOrders.map((wo) => {
      const logs = logsByOs.get(wo.id) || [];
      const osParts = partsByOs.get(wo.id) || [];

      const laborHours = logs.reduce((sum, log) => sum + log.horas, 0);
      const laborCost = logs.reduce((sum, log) => sum + log.custo, 0);
      const partsCost = osParts.reduce(
        (sum, part) => sum + part.quantidade * part.custoUnitario,
        0,
      );
      const totalCost = laborCost + partsCost;

      return {
        id: wo.id,
        titulo: wo.titulo,
        patrimonioId: wo.patrimonioId,
        status: wo.status,
        openedAt: wo.openedAt,
        closedAt: wo.closedAt,
        totalCost,
        laborHours,
        partsCost,
        partsCount: osParts.length,
      };
    });

    // Calcular totais
    const totalOs = workOrders.length;
    const osByStatus: Record<WorkOrderStatus, number> = {
      [WorkOrderStatus.ABERTA]: 0,
      [WorkOrderStatus.EM_ANDAMENTO]: 0,
      [WorkOrderStatus.CONCLUIDA]: 0,
      [WorkOrderStatus.VALIDADA]: 0,
      [WorkOrderStatus.CANCELADA]: 0,
    };

    workOrders.forEach((wo) => {
      osByStatus[wo.status] = (osByStatus[wo.status] || 0) + 1;
    });

    const totalCost = workOrdersData.reduce((sum, wo) => sum + wo.totalCost, 0);
    const totalLaborHours = workOrdersData.reduce((sum, wo) => sum + wo.laborHours, 0);
    const totalPartsCost = workOrdersData.reduce((sum, wo) => sum + wo.partsCost, 0);

    return {
      period: {
        from: fromDate,
        to: toDate,
      },
      summary: {
        totalOs,
        osByStatus,
        totalCost,
        totalLaborHours,
        totalPartsCost,
      },
      workOrders: workOrdersData,
    };
  }
}

