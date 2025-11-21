import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { MaintenancePlan, Periodicidade } from '../entities/maintenance-plan.entity';
import { WorkOrder, WorkOrderStatus, Prioridade } from '../entities/work-order.entity';
import { MaintenanceService } from '../maintenance.service';
import { MaintenanceNotificationsService } from './notifications.service';
import { PatrimonioHttpClient } from '../../http-clients/patrimonio-http-client';

/**
 * Serviço responsável por executar planos preventivos automaticamente
 */
@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(MaintenancePlan)
    private maintenancePlanRepository: Repository<MaintenancePlan>,
    private maintenanceService: MaintenanceService,
    private notificationsService: MaintenanceNotificationsService,
    private patrimonioHttpClient: PatrimonioHttpClient,
  ) { }

  /**
   * Executa diariamente às 6h da manhã para verificar planos preventivos
   */
  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async processMaintenancePlans(): Promise<void> {
    this.logger.log('Iniciando processamento de planos preventivos...');

    try {
      const now = new Date();

      // Buscar planos que devem ser executados hoje ou antes
      // Não carregar relação categoria para evitar problemas com categoria_id vs categoria
      const plansToExecute = await this.maintenancePlanRepository.find({
        where: {
          proximaExecucao: LessThanOrEqual(now),
        },
        relations: [], // Não carregar relações
      });

      this.logger.log(`Encontrados ${plansToExecute.length} planos para executar`);

      for (const plan of plansToExecute) {
        await this.executeMaintenancePlan(plan);
      }

      this.logger.log('Processamento de planos preventivos concluído');
    } catch (error: any) {
      this.logger.error('Erro ao processar planos preventivos:', error);
    }
  }

  /**
   * Executa um plano preventivo específico
   */
  private async executeMaintenancePlan(plan: MaintenancePlan): Promise<void> {
    try {
      this.logger.log(`Executando plano preventivo ${plan.id} para categoria ${plan.categoriaId}`);

      // Buscar patrimônios da categoria via microserviço
      let patrimonios: any[] = [];
      try {
        patrimonios = await this.patrimonioHttpClient.findByCategoria(plan.categoriaId);
      } catch (error) {
        this.logger.warn(`Erro ao buscar patrimônios da categoria ${plan.categoriaId}: ${error.message}`);
        return;
      }

      this.logger.log(`Encontrados ${patrimonios.length} patrimônios para manutenção`);

      // Criar OS para cada patrimônio
      let osCount = 0;
      for (const patrimonio of patrimonios) {
        try {
          await this.maintenanceService.createWorkOrder(
            {
              patrimonioId: patrimonio.id,
              titulo: `Manutenção preventiva - Plano ${plan.id.substring(0, 8)}`,
              descricao: `Manutenção preventiva agendada conforme plano ${plan.id}`,
              prioridade: Prioridade.MEDIA,
            },
            plan.ownerId,
          );

          osCount++;
          this.logger.log(`OS criada para patrimônio ${patrimonio.id}`);
        } catch (error: any) {
          this.logger.error(
            `Erro ao criar OS para patrimônio ${patrimonio.id}:`,
            error.message,
          );
        }
      }

      // Atualizar próxima execução
      const nextExecution = this.calculateNextExecution(plan.proximaExecucao, plan.periodicidade);
      plan.proximaExecucao = nextExecution;
      await this.maintenancePlanRepository.save(plan);

      this.logger.log(
        `Plano ${plan.id} executado. Próxima execução: ${nextExecution.toISOString()}`,
      );

      // Notificar execução do plano
      await this.notificationsService.notifyMaintenancePlanExecuted(plan, osCount).catch((err) => {
        this.logger.warn(`Erro ao notificar execução de plano: ${err.message}`);
      });
    } catch (error: any) {
      this.logger.error(`Erro ao executar plano ${plan.id}:`, error);
    }
  }

  /**
   * Calcula a próxima data de execução baseada na periodicidade
   */
  private calculateNextExecution(currentDate: Date, periodicidade: Periodicidade): Date {
    const next = new Date(currentDate);

    switch (periodicidade) {
      case Periodicidade.DIARIA:
        next.setDate(next.getDate() + 1);
        break;
      case Periodicidade.SEMANAL:
        next.setDate(next.getDate() + 7);
        break;
      case Periodicidade.QUINZENAL:
        next.setDate(next.getDate() + 15);
        break;
      case Periodicidade.MENSAL:
        next.setMonth(next.getMonth() + 1);
        break;
      case Periodicidade.BIMESTRAL:
        next.setMonth(next.getMonth() + 2);
        break;
      case Periodicidade.TRIMESTRAL:
        next.setMonth(next.getMonth() + 3);
        break;
      case Periodicidade.SEMESTRAL:
        next.setMonth(next.getMonth() + 6);
        break;
      case Periodicidade.ANUAL:
        next.setFullYear(next.getFullYear() + 1);
        break;
      default:
        next.setMonth(next.getMonth() + 1);
    }

    return next;
  }
}

