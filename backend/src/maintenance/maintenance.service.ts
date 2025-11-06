import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrder, WorkOrderStatus, Prioridade } from './entities/work-order.entity';
import { WorkLog, WorkLogType } from './entities/work-log.entity';
import { MaintenancePlan } from './entities/maintenance-plan.entity';
import { CreateWorkOrderDto } from './dto/create-work-order.dto';
import { UpdateWorkOrderStatusDto } from './dto/update-work-order-status.dto';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { CreateMaintenancePlanDto } from './dto/create-maintenance-plan.dto';
import { QueryWorkOrdersDto } from './dto/query-work-orders.dto';
import { WorkOrderResponseDto } from './dto/work-order-response.dto';
import { MaintenancePlanResponseDto } from './dto/maintenance-plan-response.dto';
import { PaginatedWorkOrdersResponseDto } from './dto/paginated-work-orders-response.dto';
import { WorkflowService } from './services/workflow.service';
import { MaintenanceNotificationsService } from './services/notifications.service';
import { Patrimonio } from '../patrimonio/entities/patrimonio.entity';

@Injectable()
export class MaintenanceService {
  private readonly logger = new Logger(MaintenanceService.name);

  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
    @InjectRepository(WorkLog)
    private workLogRepository: Repository<WorkLog>,
    @InjectRepository(MaintenancePlan)
    private maintenancePlanRepository: Repository<MaintenancePlan>,
    @InjectRepository(Patrimonio)
    private patrimonioRepository: Repository<Patrimonio>,
    private workflowService: WorkflowService,
    private notificationsService: MaintenanceNotificationsService,
  ) {}

  /**
   * Cria uma nova OS
   */
  async createWorkOrder(
    dto: CreateWorkOrderDto,
    ownerId: string,
  ): Promise<WorkOrderResponseDto> {
    // Verificar se o patrimônio existe usando query manager para evitar eager loading
    const queryRunner = this.patrimonioRepository.manager.connection.createQueryRunner();
    try {
      const result = await queryRunner.query(
        `SELECT id FROM patrimonios WHERE id = $1 AND deleted_at IS NULL`,
        [dto.patrimonioId],
      );
      
      if (!result || result.length === 0) {
        this.logger.warn(`Patrimônio ${dto.patrimonioId} não encontrado`);
        throw new NotFoundException(`Patrimônio ${dto.patrimonioId} não encontrado`);
      }
    } finally {
      await queryRunner.release();
    }

    // Criar OS
    const workOrder = this.workOrderRepository.create({
      patrimonioId: dto.patrimonioId,
      titulo: dto.titulo,
      descricao: dto.descricao,
      prioridade: dto.prioridade || Prioridade.MEDIA,
      status: WorkOrderStatus.ABERTA,
      openedAt: new Date(),
      ownerId,
    });

    const saved = await this.workOrderRepository.save(workOrder);

    this.logger.log(`OS ${saved.id} criada para patrimônio ${dto.patrimonioId}`);

    // Notificar criação da OS
    await this.notificationsService.notifyWorkOrderCreated(saved).catch((err) => {
      this.logger.warn(`Erro ao notificar criação de OS: ${err.message}`);
    });

    return this.toResponseDto(saved);
  }

  /**
   * Atualiza o status de uma OS (com validação de workflow)
   */
  async updateWorkOrderStatus(
    workOrderId: string,
    dto: UpdateWorkOrderStatusDto,
  ): Promise<WorkOrderResponseDto> {
    const workOrder = await this.workOrderRepository.findOne({
      where: { id: workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException(`OS ${workOrderId} não encontrada`);
    }

    const oldStatus = workOrder.status;

    // Validar transição de status
    this.workflowService.validateTransition(workOrder.status, dto.status);

    // Atualizar status
    workOrder.status = dto.status;

    // Se concluída ou validada, atualizar closedAt
    if (dto.status === WorkOrderStatus.CONCLUIDA || dto.status === WorkOrderStatus.VALIDADA) {
      if (!workOrder.closedAt) {
        workOrder.closedAt = new Date();
      }
    }

    const saved = await this.workOrderRepository.save(workOrder);

    this.logger.log(`OS ${workOrderId} atualizada para status ${dto.status}`);

    // Notificar mudança de status
    await this.notificationsService.notifyWorkOrderStatusChanged(saved, oldStatus).catch((err) => {
      this.logger.warn(`Erro ao notificar mudança de status: ${err.message}`);
    });

    return this.toResponseDto(saved);
  }

  /**
   * Lista ordens de serviço com filtros e paginação
   */
  async listWorkOrders(
    query: QueryWorkOrdersDto,
  ): Promise<PaginatedWorkOrdersResponseDto> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    // Usar QueryBuilder para suportar busca textual em múltiplos campos
    let queryBuilder = this.workOrderRepository.createQueryBuilder('wo');

    // Aplicar filtros básicos
    if (query.status) {
      queryBuilder = queryBuilder.andWhere('wo.status = :status', { status: query.status });
    }

    if (query.prioridade) {
      queryBuilder = queryBuilder.andWhere('wo.prioridade = :prioridade', {
        prioridade: query.prioridade,
      });
    }

    if (query.patrimonioId) {
      queryBuilder = queryBuilder.andWhere('wo.patrimonioId = :patrimonioId', {
        patrimonioId: query.patrimonioId,
      });
    }

    if (query.ownerId) {
      queryBuilder = queryBuilder.andWhere('wo.ownerId = :ownerId', {
        ownerId: query.ownerId,
      });
    }

    // Busca textual (título ou descrição)
    if (query.q) {
      queryBuilder = queryBuilder.andWhere(
        '(wo.titulo ILIKE :q OR wo.descricao ILIKE :q)',
        { q: `%${query.q}%` },
      );
    }

    // Filtro por data de abertura
    if (query.openedAtStart) {
      queryBuilder = queryBuilder.andWhere('wo.openedAt >= :openedAtStart', {
        openedAtStart: new Date(query.openedAtStart),
      });
    }

    if (query.openedAtEnd) {
      queryBuilder = queryBuilder.andWhere('wo.openedAt <= :openedAtEnd', {
        openedAtEnd: new Date(query.openedAtEnd),
      });
    }

    // Ordenação
    const sortBy = query.sortBy || 'openedAt';
    const sortOrder = query.sortOrder || 'DESC';
    queryBuilder = queryBuilder.orderBy(`wo.${sortBy}`, sortOrder);

    // Paginação
    queryBuilder = queryBuilder.skip(skip).take(limit);

    // Executar query
    const [workOrders, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: workOrders.map((wo) => this.toResponseDto(wo)),
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  /**
   * Lista planos de manutenção preventiva
   */
  async listMaintenancePlans(): Promise<MaintenancePlanResponseDto[]> {
    const plans = await this.maintenancePlanRepository.find({
      order: { proximaExecucao: 'ASC' },
    });

    return plans.map((plan) => ({
      id: plan.id,
      categoriaId: plan.categoriaId,
      periodicidade: plan.periodicidade,
      proximaExecucao: plan.proximaExecucao,
      ownerId: plan.ownerId,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    }));
  }

  /**
   * Cria um novo plano de manutenção preventiva
   */
  async createMaintenancePlan(
    dto: CreateMaintenancePlanDto,
    ownerId: string,
  ): Promise<MaintenancePlanResponseDto> {
    const plan = this.maintenancePlanRepository.create({
      categoriaId: dto.categoriaId,
      periodicidade: dto.periodicidade,
      proximaExecucao: new Date(dto.proximaExecucao),
      ownerId,
    });

    const saved = await this.maintenancePlanRepository.save(plan);

    this.logger.log(`Plano preventivo ${saved.id} criado para categoria ${dto.categoriaId}`);

    // Notificar criação do plano
    await this.notificationsService.notifyMaintenancePlanCreated(saved).catch((err) => {
      this.logger.warn(`Erro ao notificar criação de plano: ${err.message}`);
    });

    return {
      id: saved.id,
      categoriaId: saved.categoriaId,
      periodicidade: saved.periodicidade,
      proximaExecucao: saved.proximaExecucao,
      ownerId: saved.ownerId,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  /**
   * Cria um apontamento de trabalho (work log)
   */
  async createWorkLog(dto: CreateWorkLogDto): Promise<void> {
    // Verificar se a OS existe
    const workOrder = await this.workOrderRepository.findOne({
      where: { id: dto.workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException(`OS ${dto.workOrderId} não encontrada`);
    }

    // Criar apontamento
    const workLog = this.workLogRepository.create({
      workOrderId: dto.workOrderId,
      tipo: dto.tipo,
      horas: dto.horas,
      custo: dto.custo || 0,
      observacao: dto.observacao,
    });

    await this.workLogRepository.save(workLog);

    this.logger.log(
      `Apontamento criado para OS ${dto.workOrderId}: ${dto.horas}h, R$ ${dto.custo || 0}`,
    );
  }

  /**
   * Converte entidade para DTO de resposta
   */
  private toResponseDto(workOrder: WorkOrder): WorkOrderResponseDto {
    return {
      id: workOrder.id,
      patrimonioId: workOrder.patrimonioId,
      status: workOrder.status,
      titulo: workOrder.titulo,
      descricao: workOrder.descricao,
      prioridade: workOrder.prioridade,
      openedAt: workOrder.openedAt,
      closedAt: workOrder.closedAt,
      ownerId: workOrder.ownerId,
      createdAt: workOrder.createdAt,
      updatedAt: workOrder.updatedAt,
    };
  }
}

