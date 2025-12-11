import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Campaign, CampaignStatus } from './entities/campaign.entity';
import { CollectedItem } from './entities/collected-item.entity';
import { Reconciliation, ReconciliationStatus, Divergencia } from './entities/reconciliation.entity';
import { Patrimonio } from '../patrimonio/entities/patrimonio.entity';
import { NotificationsService } from './notifications.service';

@Injectable()
export class ReconciliationService {
  private readonly logger = new Logger(ReconciliationService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(CollectedItem)
    private readonly collectedItemRepository: Repository<CollectedItem>,
    @InjectRepository(Reconciliation)
    private readonly reconciliationRepository: Repository<Reconciliation>,
    private readonly dataSource: DataSource,
    private readonly notificationsService: NotificationsService,
  ) {}

  /**
   * Executa conciliação de uma campanha
   * Compara itens coletados com a base cadastral e classifica divergências
   */
  async reconcile(campaignId: string): Promise<Reconciliation> {
    // Verificar se a campanha existe
    const campaign = await this.campaignRepository.findOne({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campanha ${campaignId} não encontrada`);
    }

    // Verificar se já existe uma reconciliação em processamento
    const existingReconciliation = await this.reconciliationRepository.findOne({
      where: {
        campaignId,
        status: ReconciliationStatus.PROCESSING,
      },
    });

    if (existingReconciliation) {
      throw new BadRequestException(
        `Já existe uma reconciliação em processamento para esta campanha`,
      );
    }

    // Criar reconciliação
    const reconciliation = this.reconciliationRepository.create({
      campaignId,
      status: ReconciliationStatus.PROCESSING,
      divergenciasJson: [],
    });

    const saved = await this.reconciliationRepository.save(reconciliation);

    // Executar conciliação de forma assíncrona
    this.performReconciliation(saved.id, campaignId).catch((error) => {
      this.logger.error(`Erro ao executar conciliação ${saved.id}`, error);
      this.reconciliationRepository.update(saved.id, {
        status: ReconciliationStatus.FAILED,
      });
    });

    return saved;
  }

  /**
   * Executa a conciliação de forma assíncrona
   */
  private async performReconciliation(
    reconciliationId: string,
    campaignId: string,
  ): Promise<void> {
    this.logger.log(`Iniciando conciliação ${reconciliationId} para campanha ${campaignId}`);

    try {
      // Buscar todos os itens coletados da campanha
      const assignmentRepo = this.dataSource.getRepository('assignments');
      const assignments = await assignmentRepo.find({ where: { campaignId } });

      const assignmentIds = assignments.map((a: any) => a.id);

      if (assignmentIds.length === 0) {
        throw new BadRequestException('Nenhum assignment encontrado para esta campanha');
      }

      const collectedItems = assignmentIds.length > 0
        ? await this.collectedItemRepository.find({
            where: { assignmentId: In(assignmentIds) },
            order: { coletadoEm: 'ASC' },
          })
        : [];

      this.logger.log(
        `Encontrados ${collectedItems.length} itens coletados para conciliação`,
      );

      const divergencias: Divergencia[] = [];

      // Processar cada item coletado
      for (const item of collectedItems) {
        try {
          const divergencia = await this.compareWithPatrimonio(item);
          if (divergencia) {
            divergencias.push(divergencia);
          }
        } catch (error: any) {
          this.logger.warn(
            `Erro ao comparar item ${item.codigoLido}: ${error.message}`,
          );
          // Adicionar como divergência de tipo "dados_inconsistentes"
          divergencias.push({
            patrimonioId: item.patrimonioId || 'unknown',
            codigoLido: item.codigoLido,
            tipo: 'dados_inconsistentes',
            detalhes: {
              error: error.message,
              itemId: item.id,
            },
          });
        }
      }

      // Atualizar reconciliação com resultados
      await this.reconciliationRepository.update(reconciliationId, {
        status: ReconciliationStatus.COMPLETED,
        divergenciasJson: divergencias,
        executedAt: new Date(),
      });

      this.logger.log(
        `Conciliação ${reconciliationId} concluída: ${divergencias.length} divergências encontradas`,
      );

      // Notificar conclusão da reconciliação
      if (divergencias.length > 0) {
        this.notificationsService
          .notifyReconciliationCompleted(reconciliationId, campaignId)
          .catch((error) => {
            this.logger.warn(`Erro ao enviar notificação: ${error.message}`);
          });
      }
    } catch (error: any) {
      this.logger.error(`Erro ao executar conciliação ${reconciliationId}`, error);
      await this.reconciliationRepository.update(reconciliationId, {
        status: ReconciliationStatus.FAILED,
      });
      throw error;
    }
  }

  /**
   * Compara um item coletado com a base cadastral
   * Retorna divergência se houver, null se estiver correto
   */
  private async compareWithPatrimonio(
    item: CollectedItem,
  ): Promise<Divergencia | null> {
    try {
      // Buscar patrimônio por código
      const patrimonioRepo = this.dataSource.getRepository(Patrimonio);
      const patrimonio = await patrimonioRepo.findOne({
        where: { codigo: item.codigoLido.toUpperCase() },
      });

      // Se não encontrou, é divergência tipo "nao_encontrado"
      if (!patrimonio) {
        return {
          patrimonioId: item.patrimonioId || 'not_found',
          codigoLido: item.codigoLido,
          tipo: 'nao_encontrado',
          detalhes: {
            message: 'Patrimônio não encontrado na base cadastral',
            codigoLido: item.codigoLido,
            coletadoEm: item.coletadoEm,
          },
        };
      }

      // Atualizar item coletado com o ID do patrimônio encontrado
      if (!item.patrimonioId) {
        await this.collectedItemRepository.update(item.id, {
          patrimonioId: patrimonio.id,
        });
      }

      // Verificar localização (se houver geo no item coletado)
      const localizacaoDivergente =
        item.geo &&
        patrimonio.localizacao &&
        !this.compareLocalizacao(item.geo, patrimonio.localizacao);

      if (localizacaoDivergente) {
        return {
          patrimonioId: patrimonio.id,
          codigoLido: item.codigoLido,
          tipo: 'localizacao_diferente',
          detalhes: {
            localizacaoCadastral: patrimonio.localizacao,
            localizacaoColetada: item.geo,
            patrimonioId: patrimonio.id,
          },
        };
      }

      // Verificar status (se patrimônio está inativo/descartado mas foi coletado)
      if (
        patrimonio.status !== 'ATIVO' &&
        (patrimonio.status === 'INATIVO' ||
          patrimonio.status === 'DESCARTADO' ||
          patrimonio.status === 'MANUTENCAO')
      ) {
        return {
          patrimonioId: patrimonio.id,
          codigoLido: item.codigoLido,
          tipo: 'status_diferente',
          detalhes: {
            statusCadastral: patrimonio.status,
            statusEsperado: 'ATIVO',
            patrimonioId: patrimonio.id,
          },
        };
      }

      // Verificar dados inconsistentes (nome, modelo, marca diferentes)
      const dadosInconsistentes: Record<string, any> = {};

      // Se o item coletado tem informações adicionais que não batem
      // (isso seria expandido conforme necessário)

      if (Object.keys(dadosInconsistentes).length > 0) {
        return {
          patrimonioId: patrimonio.id,
          codigoLido: item.codigoLido,
          tipo: 'dados_inconsistentes',
          detalhes: {
            ...dadosInconsistentes,
            patrimonioId: patrimonio.id,
          },
        };
      }

      // Sem divergências
      return null;
    } catch (error: any) {
      // Se o patrimônio não foi encontrado, retornar divergência
      if (error instanceof NotFoundException) {
        return {
          patrimonioId: item.patrimonioId || 'not_found',
          codigoLido: item.codigoLido,
          tipo: 'nao_encontrado',
          detalhes: {
            message: error.message,
            codigoLido: item.codigoLido,
          },
        };
      }
      throw error;
    }
  }

  /**
   * Compara localização coletada (geo) com localização cadastral
   * Retorna true se forem similares, false caso contrário
   */
  private compareLocalizacao(
    geo: { lat: number; lng: number; accuracy?: number },
    localizacaoCadastral: string,
  ): boolean {
    // Implementação básica: se a localização cadastral contém coordenadas,
    // comparar. Caso contrário, assumir que são diferentes seções/edifícios
    // Por enquanto, retornar true (não comparar geo por padrão)
    // Isso pode ser expandido para usar geocoding ou comparação de strings
    return true; // Simplificado por enquanto
  }

  /**
   * Obtém o resultado de uma reconciliação
   */
  async getReconciliation(reconciliationId: string): Promise<Reconciliation> {
    const reconciliation = await this.reconciliationRepository.findOne({
      where: { id: reconciliationId },
      relations: ['campaign'],
    });

    if (!reconciliation) {
      throw new NotFoundException(
        `Reconciliação ${reconciliationId} não encontrada`,
      );
    }

    return reconciliation;
  }

  /**
   * Lista reconciliações de uma campanha
   */
  async getCampaignReconciliations(
    campaignId: string,
  ): Promise<Reconciliation[]> {
    return this.reconciliationRepository.find({
      where: { campaignId },
      order: { createdAt: 'DESC' },
    });
  }
}

