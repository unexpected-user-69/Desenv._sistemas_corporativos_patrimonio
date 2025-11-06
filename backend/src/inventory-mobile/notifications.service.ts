import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { Campaign, CampaignStatus } from './entities/campaign.entity';
import { Assignment, AssignmentStatus } from './entities/assignment.entity';
import { Reconciliation, ReconciliationStatus } from './entities/reconciliation.entity';
import { EventType } from '../events/enums/event-type.enum';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Reconciliation)
    private readonly reconciliationRepository: Repository<Reconciliation>,
    private readonly eventsService: EventsService,
  ) {}

  /**
   * Notifica quando uma campanha é criada
   */
  async notifyCampaignCreated(campaignId: string, ownerId: string): Promise<void> {
    try {
      const campaign = await this.campaignRepository.findOne({
        where: { id: campaignId },
      });

      if (!campaign) {
        return;
      }

      // Criar evento de inventário
      await this.eventsService.create(
        {
          title: `Nova Campanha de Inventário: ${campaign.nome}`,
          description: `Campanha de inventário criada em ${campaign.local}`,
          startDate: campaign.periodoInicio.toISOString(),
          endDate: campaign.periodoFim.toISOString(),
          eventType: EventType.INVENTARIO,
        },
        ownerId,
      );

      this.logger.log(`Notificação de campanha criada enviada: ${campaignId}`);
    } catch (error: any) {
      this.logger.error(`Erro ao notificar criação de campanha: ${error.message}`);
    }
  }

  /**
   * Notifica quando uma campanha muda de status
   */
  async notifyCampaignStatusChanged(
    campaignId: string,
    oldStatus: CampaignStatus,
    newStatus: CampaignStatus,
  ): Promise<void> {
    try {
      const campaign = await this.campaignRepository.findOne({
        where: { id: campaignId },
      });

      if (!campaign) {
        return;
      }

      // Criar evento apenas para mudanças importantes
      if (
        newStatus === CampaignStatus.ACTIVE ||
        newStatus === CampaignStatus.COMPLETED ||
        newStatus === CampaignStatus.CANCELED
      ) {
        await this.eventsService.create(
          {
            title: `Campanha ${campaign.nome}: ${newStatus}`,
            description: `Status da campanha alterado de ${oldStatus} para ${newStatus}`,
            startDate: new Date().toISOString(),
            eventType: EventType.INVENTARIO,
          },
          campaign.ownerId,
        );

        this.logger.log(
          `Notificação de mudança de status enviada: ${campaignId} (${oldStatus} -> ${newStatus})`,
        );
      }
    } catch (error: any) {
      this.logger.error(
        `Erro ao notificar mudança de status: ${error.message}`,
      );
    }
  }

  /**
   * Notifica quando uma reconciliação é concluída com divergências
   */
  async notifyReconciliationCompleted(
    reconciliationId: string,
    campaignId: string,
  ): Promise<void> {
    try {
      const reconciliation = await this.reconciliationRepository.findOne({
        where: { id: reconciliationId },
        relations: ['campaign'],
      });

      if (!reconciliation || reconciliation.status !== ReconciliationStatus.COMPLETED) {
        return;
      }

      const divergenceCount = reconciliation.divergenciasJson.length;

      if (divergenceCount > 0) {
        const campaign = await this.campaignRepository.findOne({
          where: { id: campaignId },
        });

        if (campaign) {
          await this.eventsService.create(
            {
              title: `Reconciliação concluída: ${divergenceCount} divergências encontradas`,
              description: `A reconciliação da campanha ${campaign.nome} encontrou ${divergenceCount} divergências que requerem atenção.`,
              startDate: (reconciliation.executedAt || new Date()).toISOString(),
              eventType: EventType.INVENTARIO,
            },
            campaign.ownerId,
          );

          this.logger.log(
            `Notificação de reconciliação com divergências enviada: ${reconciliationId}`,
          );
        }
      }
    } catch (error: any) {
      this.logger.error(
        `Erro ao notificar conclusão de reconciliação: ${error.message}`,
      );
    }
  }

  /**
   * Notifica quando um assignment é completado
   */
  async notifyAssignmentCompleted(assignmentId: string): Promise<void> {
    try {
      const assignment = await this.assignmentRepository.findOne({
        where: { id: assignmentId },
        relations: ['campaign'],
      });

      if (!assignment || assignment.status !== AssignmentStatus.COMPLETED) {
        return;
      }

      const campaign = await this.campaignRepository.findOne({
        where: { id: assignment.campaignId },
      });

      if (campaign) {
        await this.eventsService.create(
          {
            title: `Assignment completado na campanha ${campaign.nome}`,
            description: `O coletor ${assignment.coletorId} completou seu assignment.`,
            startDate: new Date().toISOString(),
            eventType: EventType.INVENTARIO,
          },
          campaign.ownerId,
        );

        this.logger.log(
          `Notificação de assignment completado enviada: ${assignmentId}`,
        );
      }
    } catch (error: any) {
      this.logger.error(
        `Erro ao notificar conclusão de assignment: ${error.message}`,
      );
    }
  }
}

