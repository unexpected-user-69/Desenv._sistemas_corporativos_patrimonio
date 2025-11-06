import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, In } from 'typeorm';
import { Campaign, CampaignStatus } from './entities/campaign.entity';
import { Assignment, AssignmentStatus } from './entities/assignment.entity';
import { CollectedItem, TipoLeitura } from './entities/collected-item.entity';
import { SyncPullDto } from './dto/sync-pull.dto';
import { SyncPushDto, CollectedItemPushDto } from './dto/sync-push.dto';
import { SyncPullResponseDto, SyncPushResponseDto } from './dto/sync-response.dto';
import { CampaignResponseDto } from './dto/campaign-response.dto';
import { AssignmentResponseDto } from './dto/assignment-response.dto';
import { CacheService } from '../common/services/cache.service';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  private syncVersion = 1; // Versão global de sincronização

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(CollectedItem)
    private readonly collectedItemRepository: Repository<CollectedItem>,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Pull: Busca dados para sincronização no dispositivo mobile
   */
  async pull(dto: SyncPullDto, coletorId: string): Promise<SyncPullResponseDto> {
    const lastSyncAt = dto.lastSyncAt ? new Date(dto.lastSyncAt) : null;

    // Buscar campanhas ativas
    const campaignQuery = this.campaignRepository
      .createQueryBuilder('campaign')
      .where('campaign.status = :status', { status: CampaignStatus.ACTIVE });

    if (lastSyncAt) {
      campaignQuery.andWhere('campaign.updatedAt > :lastSyncAt', { lastSyncAt });
    }

    const campaigns = await campaignQuery.getMany();

    // Buscar assignments do coletor
    const assignmentQuery = this.assignmentRepository
      .createQueryBuilder('assignment')
      .where('assignment.coletorId = :coletorId', { coletorId })
      .andWhere('assignment.status IN (:...statuses)', {
        statuses: [AssignmentStatus.PENDING, AssignmentStatus.IN_PROGRESS],
      });

    if (lastSyncAt) {
      assignmentQuery.andWhere('assignment.updatedAt > :lastSyncAt', { lastSyncAt });
    }

    const assignments = await assignmentQuery.getMany();

    this.logger.log(
      `Sync pull: device ${dto.deviceId}, coletor ${coletorId}, ${campaigns.length} campanhas, ${assignments.length} assignments`,
    );

    // Incrementar versão de sincronização
    this.syncVersion++;

    // Cachear dados de sincronização (TTL: 5 minutos)
    const cacheKey = `sync:pull:${coletorId}:${dto.deviceId}`;
    await this.cacheService.set(
      cacheKey,
      {
        campaigns: campaigns.map(this.mapCampaignToDto),
        assignments: assignments.map(this.mapAssignmentToDto),
        version: this.syncVersion,
      },
      300, // 5 minutos
    );

    return {
      campaigns: campaigns.map(this.mapCampaignToDto),
      assignments: assignments.map(this.mapAssignmentToDto),
      syncTimestamp: new Date(),
      version: this.syncVersion,
    };
  }

  /**
   * Push: Envia dados coletados do dispositivo mobile
   */
  async push(dto: SyncPushDto, coletorId: string): Promise<SyncPushResponseDto> {
    const errors: string[] = [];
    const conflicts: Array<{
      itemId: string;
      codigoLido: string;
      serverVersion: number;
      clientVersion: number;
      strategy?: string;
    }> = [];
    let processed = 0;

    // Validar assignments
    const assignmentIds = [...new Set(dto.items.map((item) => item.assignmentId))];
    const assignments = assignmentIds.length > 0
      ? await this.assignmentRepository.find({
          where: {
            id: In(assignmentIds),
            coletorId,
          },
        })
      : [];

    const validAssignmentIds = new Set(assignments.map((a) => a.id));

    // Processar cada item
    for (const itemDto of dto.items) {
      try {
        // Verificar se o assignment pertence ao coletor
        if (!validAssignmentIds.has(itemDto.assignmentId)) {
          errors.push(
            `Assignment ${itemDto.assignmentId} não pertence ao coletor ${coletorId}`,
          );
          continue;
        }

        // Verificar duplicatas e conflitos de versão
        const existing = await this.collectedItemRepository.findOne({
          where: {
            assignmentId: itemDto.assignmentId,
            codigoLido: itemDto.codigoLido,
          },
        });

        if (existing) {
          // Verificar conflito de versão
          if (itemDto.version !== undefined && existing.version > itemDto.version) {
            // Conflito: servidor tem versão mais recente
            conflicts.push({
              itemId: existing.id,
              codigoLido: itemDto.codigoLido,
              serverVersion: existing.version,
              clientVersion: itemDto.version,
              strategy: 'server_wins', // Por padrão, servidor vence
            });
            this.logger.warn(
              `Conflito de versão: item ${itemDto.codigoLido} - servidor v${existing.version} vs cliente v${itemDto.version}`,
            );
            continue;
          }

          // Se cliente tem versão igual ou maior, atualizar
          if (itemDto.version === undefined || itemDto.version >= existing.version) {
            // Atualizar item existente
            existing.coletadoEm = new Date(itemDto.coletadoEm);
            existing.geo = itemDto.geo;
            existing.patrimonioId = itemDto.patrimonioId;
            existing.version = (itemDto.version || existing.version) + 1;
            await this.collectedItemRepository.save(existing);
            processed++;
            continue;
          }
        }

        // Criar item coletado
        const collectedItem = this.collectedItemRepository.create({
          assignmentId: itemDto.assignmentId,
          codigoLido: itemDto.codigoLido,
          tipoLeitura: itemDto.tipoLeitura,
          coletadoEm: new Date(itemDto.coletadoEm),
          geo: itemDto.geo,
          offlineBatchId: dto.batchId,
          patrimonioId: itemDto.patrimonioId,
          version: itemDto.version || 1,
        });

        await this.collectedItemRepository.save(collectedItem);
        processed++;

        // Atualizar status do assignment para IN_PROGRESS
        const assignment = assignments.find((a) => a.id === itemDto.assignmentId);
        if (assignment && assignment.status === AssignmentStatus.PENDING) {
          assignment.status = AssignmentStatus.IN_PROGRESS;
          await this.assignmentRepository.save(assignment);
        }
      } catch (error: any) {
        errors.push(`Erro ao processar item ${itemDto.codigoLido}: ${error.message}`);
        this.logger.error(`Erro ao processar item coletado`, error);
      }
    }

    this.logger.log(
      `Sync push: device ${dto.deviceId}, coletor ${coletorId}, processados: ${processed}, conflitos: ${conflicts.length}, erros: ${errors.length}`,
    );

    return {
      processed,
      conflictsCount: conflicts.length,
      errors,
      conflicts,
    };
  }

  private mapCampaignToDto(campaign: Campaign): CampaignResponseDto {
    return {
      id: campaign.id,
      nome: campaign.nome,
      local: campaign.local,
      periodoInicio: campaign.periodoInicio,
      periodoFim: campaign.periodoFim,
      ownerId: campaign.ownerId,
      status: campaign.status,
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt,
    };
  }

  private mapAssignmentToDto(assignment: Assignment): AssignmentResponseDto {
    return {
      id: assignment.id,
      campaignId: assignment.campaignId,
      coletorId: assignment.coletorId,
      status: assignment.status,
      createdAt: assignment.createdAt,
      updatedAt: assignment.updatedAt,
    };
  }
}

