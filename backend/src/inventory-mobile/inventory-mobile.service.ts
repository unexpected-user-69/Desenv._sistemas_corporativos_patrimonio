import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Campaign, CampaignStatus } from './entities/campaign.entity';
import { Assignment, AssignmentStatus } from './entities/assignment.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CampaignResponseDto } from './dto/campaign-response.dto';
import { AssignmentResponseDto } from './dto/assignment-response.dto';
import { NotificationsService } from './notifications.service';

@Injectable()
export class InventoryMobileService {
  private readonly logger = new Logger(InventoryMobileService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    private readonly notificationsService: NotificationsService,
  ) {}

  /**
   * Cria uma nova campanha de inventário
   */
  async createCampaign(
    dto: CreateCampaignDto,
    ownerId: string,
  ): Promise<CampaignResponseDto> {
    // Validar período
    const inicio = new Date(dto.periodoInicio);
    const fim = new Date(dto.periodoFim);

    if (inicio >= fim) {
      throw new BadRequestException(
        'A data de início deve ser anterior à data de fim',
      );
    }

    const campaign = this.campaignRepository.create({
      nome: dto.nome,
      local: dto.local,
      periodoInicio: inicio,
      periodoFim: fim,
      ownerId,
      status: CampaignStatus.DRAFT,
    });

    const saved = await this.campaignRepository.save(campaign);

    this.logger.log(`Campanha criada: ${saved.id} por usuário ${ownerId}`);

    // Notificar criação da campanha
    this.notificationsService.notifyCampaignCreated(saved.id, ownerId).catch(
      (error) => {
        this.logger.warn(`Erro ao enviar notificação: ${error.message}`);
      },
    );

    return {
      id: saved.id,
      nome: saved.nome,
      local: saved.local,
      periodoInicio: saved.periodoInicio,
      periodoFim: saved.periodoFim,
      ownerId: saved.ownerId,
      status: saved.status,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  /**
   * Lista assignments de uma campanha
   */
  async getCampaignAssignments(
    campaignId: string,
  ): Promise<{ items: AssignmentResponseDto[]; total: number }> {
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campanha ${campaignId} não encontrada`);
    }

    const assignments = await this.assignmentRepository.find({
      where: { campaignId },
      relations: ['coletor'],
      order: { createdAt: 'DESC' },
    });

    return {
      items: assignments.map((a) => ({
        id: a.id,
        campaignId: a.campaignId,
        coletorId: a.coletorId,
        status: a.status,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      })),
      total: assignments.length,
    };
  }

  /**
   * Distribui lotes (assignments) para coletores em uma campanha
   */
  async distributeAssignments(
    campaignId: string,
    dto: CreateAssignmentDto,
  ): Promise<AssignmentResponseDto[]> {
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campanha ${campaignId} não encontrada`);
    }

    if (campaign.status !== CampaignStatus.DRAFT && campaign.status !== CampaignStatus.ACTIVE) {
      throw new BadRequestException(
        `Não é possível distribuir lotes para campanha com status ${campaign.status}`,
      );
    }

    // Verificar se já existem assignments para esses coletores nesta campanha
    // Verificar cada coletor individualmente para evitar problemas com query builder
    for (const coletorId of dto.coletorIds) {
      const existing = await this.assignmentRepository.findOne({
        where: {
          campaignId,
          coletorId,
        },
      });

      if (existing) {
        throw new BadRequestException(
          `Já existe um assignment para o coletor ${coletorId} nesta campanha`,
        );
      }
    }

    // Criar assignments para cada coletor
    const assignments = dto.coletorIds.map((coletorId) =>
      this.assignmentRepository.create({
        campaignId,
        coletorId,
        status: AssignmentStatus.PENDING,
      }),
    );

    const saved = await this.assignmentRepository.save(assignments);

    this.logger.log(
      `Distribuídos ${saved.length} assignments para campanha ${campaignId}`,
    );

    return saved.map((a) => ({
      id: a.id,
      campaignId: a.campaignId,
      coletorId: a.coletorId,
      status: a.status,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
  }
}

