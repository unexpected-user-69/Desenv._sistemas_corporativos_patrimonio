import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WorkOrder, WorkOrderStatus } from '../entities/work-order.entity';
import { WorkLog } from '../entities/work-log.entity';

/**
 * Serviço responsável por calcular indicadores de SLA (MTTR, MTBF, etc.)
 */
@Injectable()
export class SlaService {
  private readonly logger = new Logger(SlaService.name);

  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(WorkLog)
    private workLogRepository: Repository<WorkLog>,
  ) {}

  /**
   * Calcula MTTR (Mean Time To Repair) - Tempo médio para reparo
   * MTTR = Soma dos tempos de reparo / Número de reparos
   */
  async calculateMTTR(startDate?: Date, endDate?: Date): Promise<number> {
    const query = this.workOrderRepository
      .createQueryBuilder('wo')
      .where('wo.status = :status', { status: WorkOrderStatus.VALIDADA })
      .andWhere('wo.closedAt IS NOT NULL')
      .andWhere('wo.openedAt IS NOT NULL');

    if (startDate) {
      query.andWhere('wo.closedAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('wo.closedAt <= :endDate', { endDate });
    }

    const orders = await query.getMany();

    if (orders.length === 0) {
      return 0;
    }

    const totalTime = orders.reduce((sum, order) => {
      if (order.openedAt && order.closedAt) {
        const duration = order.closedAt.getTime() - order.openedAt.getTime();
        return sum + duration;
      }
      return sum;
    }, 0);

    const mttr = totalTime / orders.length / (1000 * 60 * 60); // Converter para horas
    return Math.round(mttr * 100) / 100; // Arredondar para 2 casas decimais
  }

  /**
   * Calcula MTBF (Mean Time Between Failures) - Tempo médio entre falhas
   * MTBF = Tempo total de operação / Número de falhas
   */
  async calculateMTBF(patrimonioId: string, startDate?: Date, endDate?: Date): Promise<number> {
    const query = this.workOrderRepository
      .createQueryBuilder('wo')
      .where('wo.patrimonioId = :patrimonioId', { patrimonioId })
      .andWhere('wo.status = :status', { status: WorkOrderStatus.VALIDADA })
      .andWhere('wo.closedAt IS NOT NULL')
      .orderBy('wo.openedAt', 'ASC');

    if (startDate) {
      query.andWhere('wo.openedAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('wo.openedAt <= :endDate', { endDate });
    }

    const orders = await query.getMany();

    if (orders.length < 2) {
      return 0; // Precisa de pelo menos 2 falhas para calcular MTBF
    }

    // Calcular tempo entre falhas
    let totalTimeBetweenFailures = 0;
    for (let i = 1; i < orders.length; i++) {
      const previousClose = orders[i - 1].closedAt;
      const currentOpen = orders[i].openedAt;

      if (previousClose && currentOpen) {
        const timeBetween = currentOpen.getTime() - previousClose.getTime();
        totalTimeBetweenFailures += timeBetween;
      }
    }

    const mtbf = totalTimeBetweenFailures / (orders.length - 1) / (1000 * 60 * 60); // Converter para horas
    return Math.round(mtbf * 100) / 100; // Arredondar para 2 casas decimais
  }

  /**
   * Calcula taxa de cumprimento de prazos
   */
  async calculateOnTimeCompletionRate(startDate?: Date, endDate?: Date): Promise<number> {
    const query = this.workOrderRepository
      .createQueryBuilder('wo')
      .where('wo.status IN (:...statuses)', {
        statuses: [WorkOrderStatus.CONCLUIDA, WorkOrderStatus.VALIDADA],
      })
      .andWhere('wo.closedAt IS NOT NULL');

    if (startDate) {
      query.andWhere('wo.closedAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('wo.closedAt <= :endDate', { endDate });
    }

    const orders = await query.getMany();

    if (orders.length === 0) {
      return 0;
    }

    // Por enquanto, consideramos que todas as OS concluídas estão no prazo
    // Em uma implementação completa, seria necessário ter um campo "prazo_estimado"
    return 100; // TODO: Implementar cálculo real baseado em prazos estimados
  }

  /**
   * Calcula custo total de manutenção
   */
  async calculateTotalMaintenanceCost(startDate?: Date, endDate?: Date): Promise<number> {
    const query = this.workLogRepository
      .createQueryBuilder('wl')
      .leftJoin('wl.workOrder', 'wo')
      .select('SUM(wl.custo)', 'total')
      .where('wo.status = :status', { status: WorkOrderStatus.VALIDADA });

    if (startDate) {
      query.andWhere('wo.closedAt >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('wo.closedAt <= :endDate', { endDate });
    }

    const result = await query.getRawOne();
    return parseFloat(result?.total || '0');
  }

  /**
   * Retorna métricas consolidadas de SLA
   */
  async getSlaMetrics(startDate?: Date, endDate?: Date) {
    const [mttr, onTimeRate, totalCost] = await Promise.all([
      this.calculateMTTR(startDate, endDate),
      this.calculateOnTimeCompletionRate(startDate, endDate),
      this.calculateTotalMaintenanceCost(startDate, endDate),
    ]);

    return {
      mttr, // Tempo médio para reparo (horas)
      onTimeCompletionRate: onTimeRate, // Taxa de cumprimento de prazos (%)
      totalMaintenanceCost: totalCost, // Custo total (R$)
      period: {
        start: startDate || null,
        end: endDate || null,
      },
    };
  }
}

