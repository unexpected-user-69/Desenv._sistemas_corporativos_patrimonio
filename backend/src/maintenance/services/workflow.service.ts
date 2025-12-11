import { Injectable, BadRequestException } from '@nestjs/common';
import { WorkOrderStatus } from '../entities/work-order.entity';

/**
 * Serviço responsável por validar transições de status no workflow de OS
 */
@Injectable()
export class WorkflowService {
  /**
   * Mapa de transições válidas no workflow
   * De -> Para
   */
  private readonly validTransitions: Map<WorkOrderStatus, WorkOrderStatus[]> = new Map([
    [WorkOrderStatus.ABERTA, [WorkOrderStatus.EM_ANDAMENTO, WorkOrderStatus.CANCELADA]],
    [WorkOrderStatus.EM_ANDAMENTO, [WorkOrderStatus.CONCLUIDA, WorkOrderStatus.CANCELADA]],
    [WorkOrderStatus.CONCLUIDA, [WorkOrderStatus.VALIDADA, WorkOrderStatus.EM_ANDAMENTO]],
    [WorkOrderStatus.VALIDADA, []], // Estado final, não permite transições
    [WorkOrderStatus.CANCELADA, []], // Estado final, não permite transições
  ]);

  /**
   * Valida se uma transição de status é permitida
   */
  validateTransition(currentStatus: WorkOrderStatus, newStatus: WorkOrderStatus): void {
    // Não permite manter o mesmo status
    if (currentStatus === newStatus) {
      throw new BadRequestException(
        `A OS já está com status ${currentStatus}. Não é necessário alterar.`,
      );
    }

    // Verifica se a transição é válida
    const allowedTransitions = this.validTransitions.get(currentStatus) || [];

    if (!allowedTransitions.includes(newStatus)) {
      throw new BadRequestException(
        `Transição inválida: não é possível alterar de ${currentStatus} para ${newStatus}. ` +
          `Transições permitidas: ${allowedTransitions.join(', ') || 'nenhuma'}`,
      );
    }
  }

  /**
   * Retorna as transições válidas para um status atual
   */
  getValidTransitions(currentStatus: WorkOrderStatus): WorkOrderStatus[] {
    return this.validTransitions.get(currentStatus) || [];
  }
}

