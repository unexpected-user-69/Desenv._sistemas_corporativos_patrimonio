import { Injectable, Logger } from '@nestjs/common';
import { EventsService } from '../../events/events.service';
import { EventType } from '../../events/enums/event-type.enum';
import { WorkOrder, WorkOrderStatus } from '../entities/work-order.entity';
import { MaintenancePlan } from '../entities/maintenance-plan.entity';

/**
 * Serviço responsável por enviar notificações relacionadas a manutenção
 */
@Injectable()
export class MaintenanceNotificationsService {
  private readonly logger = new Logger(MaintenanceNotificationsService.name);

  constructor(private readonly eventsService: EventsService) {}

  /**
   * Notifica quando uma OS é criada
   */
  async notifyWorkOrderCreated(workOrder: WorkOrder): Promise<void> {
    try {
      await this.eventsService.create(
        {
          title: `Nova OS: ${workOrder.titulo}`,
          description: `Ordem de serviço ${workOrder.id} criada para patrimônio ${workOrder.patrimonioId}`,
          startDate: workOrder.openedAt.toISOString(),
          eventType: EventType.MANUTENCAO,
        },
        workOrder.ownerId,
      );

      this.logger.log(`Notificação criada para OS ${workOrder.id}`);
    } catch (error: any) {
      this.logger.error(`Erro ao criar notificação para OS ${workOrder.id}:`, error);
    }
  }

  /**
   * Notifica quando o status de uma OS muda
   */
  async notifyWorkOrderStatusChanged(
    workOrder: WorkOrder,
    oldStatus: WorkOrderStatus,
  ): Promise<void> {
    try {
      const statusMessages: Record<WorkOrderStatus, string> = {
        [WorkOrderStatus.ABERTA]: 'OS aberta',
        [WorkOrderStatus.EM_ANDAMENTO]: 'OS em andamento',
        [WorkOrderStatus.CONCLUIDA]: 'OS concluída',
        [WorkOrderStatus.VALIDADA]: 'OS validada',
        [WorkOrderStatus.CANCELADA]: 'OS cancelada',
      };

      await this.eventsService.create(
        {
          title: `OS ${workOrder.titulo} - Status alterado`,
          description: `Status alterado de ${statusMessages[oldStatus]} para ${statusMessages[workOrder.status]}`,
          startDate: new Date().toISOString(),
          eventType: EventType.MANUTENCAO,
        },
        workOrder.ownerId,
      );

      this.logger.log(`Notificação de mudança de status criada para OS ${workOrder.id}`);
    } catch (error: any) {
      this.logger.error(
        `Erro ao criar notificação de mudança de status para OS ${workOrder.id}:`,
        error,
      );
    }
  }

  /**
   * Notifica quando um plano preventivo é criado
   */
  async notifyMaintenancePlanCreated(plan: MaintenancePlan): Promise<void> {
    try {
      await this.eventsService.create(
        {
          title: `Novo Plano Preventivo`,
          description: `Plano de manutenção preventiva criado. Próxima execução: ${plan.proximaExecucao.toISOString()}`,
          startDate: plan.proximaExecucao.toISOString(),
          eventType: EventType.MANUTENCAO,
        },
        plan.ownerId,
      );

      this.logger.log(`Notificação criada para plano preventivo ${plan.id}`);
    } catch (error: any) {
      this.logger.error(`Erro ao criar notificação para plano ${plan.id}:`, error);
    }
  }

  /**
   * Notifica quando um plano preventivo é executado
   */
  async notifyMaintenancePlanExecuted(plan: MaintenancePlan, osCount: number): Promise<void> {
    try {
      await this.eventsService.create(
        {
          title: `Plano Preventivo Executado`,
          description: `Plano ${plan.id} executado. ${osCount} ordem(ns) de serviço criada(s)`,
          startDate: new Date().toISOString(),
          eventType: EventType.MANUTENCAO,
        },
        plan.ownerId,
      );

      this.logger.log(`Notificação de execução criada para plano ${plan.id}`);
    } catch (error: any) {
      this.logger.error(`Erro ao criar notificação de execução para plano ${plan.id}:`, error);
    }
  }
}

