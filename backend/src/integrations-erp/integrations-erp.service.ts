import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { DataSource } from 'typeorm';
import { Connector } from './entities/connector.entity';
import { Execution, ExecutionStatus, ExecutionType } from './entities/execution.entity';
import { ExecutionLog, LogLevel } from './entities/execution-log.entity';
import { RunIntegrationDto, IntegrationEntity } from './dto/run-integration.dto';
import {
  ExecutionResponseDto,
  RunIntegrationResponseDto,
} from './dto/execution-response.dto';
import { ListExecutionsDto } from './dto/list-executions.dto';
import { ConnectorFactoryService } from './connectors/connector-factory.service';
import { IConnector, RestConnectorConfig } from './connectors/rest-connector.interface';
import { DataMapperService } from './mappings/data-mapper.service';
import { IdempotencyService } from './mappings/idempotency.service';
import { DryRunService } from './mappings/dry-run.service';
import { MappingConfigService } from './mappings/mapping-config.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { IntegrationJobData } from './jobs/job-data.interface';
import { JobIdempotencyService } from './jobs/job-idempotency.service';
import { ReconciliationService } from './jobs/reconciliation.service';
import { IntegrationMetricsService } from './observability/integration-metrics.service';
import { StructuredLoggerService } from './observability/structured-logger.service';
import { TracingService } from './observability/tracing.service';
import { HealthCheckService } from './observability/health-check.service';
import { DataSanitizationService } from './security/data-sanitization.service';
import { CircuitBreakerService } from './security/circuit-breaker.service';
import { WebhookService, WebhookEvent } from './webhooks/webhook.service';

@Injectable()
export class IntegrationsErpService {
  private readonly logger = new Logger(IntegrationsErpService.name);

  constructor(
    @InjectRepository(Connector)
    private readonly connectorRepository: Repository<Connector>,
    @InjectRepository(Execution)
    private readonly executionRepository: Repository<Execution>,
    @InjectRepository(ExecutionLog)
    private readonly executionLogRepository: Repository<ExecutionLog>,
    private readonly connectorFactory: ConnectorFactoryService,
    private readonly dataSource: DataSource,
    private readonly dataMapper: DataMapperService,
    private readonly idempotency: IdempotencyService,
    private readonly dryRun: DryRunService,
    private readonly mappingConfig: MappingConfigService,
    @InjectQueue('integration-queue')
    private readonly integrationQueue: Queue<IntegrationJobData>,
    private readonly jobIdempotency: JobIdempotencyService,
    private readonly reconciliation: ReconciliationService,
    private readonly metrics: IntegrationMetricsService,
    private readonly structuredLogger: StructuredLoggerService,
    private readonly tracing: TracingService,
    private readonly healthCheck: HealthCheckService,
    private readonly sanitization: DataSanitizationService,
    private readonly circuitBreaker: CircuitBreakerService,
    private readonly webhook: WebhookService,
  ) {}

  /**
   * Executa uma integração
   */
  async runIntegration(
    dto: RunIntegrationDto,
    createdBy?: string,
  ): Promise<RunIntegrationResponseDto> {
    // Buscar conector
    const connector = await this.connectorRepository.findOne({
      where: { key: dto.connectorKey },
    });

    if (!connector) {
      throw new NotFoundException(
        `Connector with key "${dto.connectorKey}" not found`,
      );
    }

    if (!connector.enabled) {
      throw new BadRequestException(
        `Connector "${dto.connectorKey}" is disabled`,
      );
    }

    // Criar execução
    const execution = this.executionRepository.create({
      connectorId: connector.id,
      type: dto.type,
      status: ExecutionStatus.QUEUED,
      createdBy,
    });

    const savedExecution = await this.executionRepository.save(execution);

    // Iniciar trace
    this.tracing.startTrace(savedExecution.id);

    // Log estruturado (sanitizado)
    const logContext = this.sanitization.sanitizeForLogs({
      executionId: savedExecution.id,
      connectorKey: dto.connectorKey,
      entity: dto.entity,
      type: dto.type,
    });
    this.structuredLogger.logWithContext('info', 'Integration queued', logContext);

    // Verificar idempotência de job
    const idempotencyKey = this.jobIdempotency.generateIdempotencyKey(
      dto.connectorKey,
      dto.type,
      dto.entity,
    );

    const idempotencyCheck = await this.jobIdempotency.checkJobIdempotency(
      idempotencyKey,
    );

    if (idempotencyCheck.exists && idempotencyCheck.executionId) {
      await this.addLog(
        savedExecution.id,
        LogLevel.WARN,
        `Duplicate job detected, using existing execution ${idempotencyCheck.executionId}`,
        { existingExecutionId: idempotencyCheck.executionId },
      );
      
      // Atualizar status para canceled
      await this.executionRepository.update(savedExecution.id, {
        status: ExecutionStatus.CANCELED,
        error: `Duplicate job - execution ${idempotencyCheck.executionId} already exists`,
      });

      return {
        executionId: idempotencyCheck.executionId,
        status: ExecutionStatus.QUEUED,
      };
    }

    // Registrar job como executado
    await this.jobIdempotency.registerJob(idempotencyKey, savedExecution.id);

    // Adicionar log inicial
    await this.addLog(
      savedExecution.id,
      LogLevel.INFO,
      `Integration ${dto.type} queued for entity ${dto.entity}`,
      { connectorKey: dto.connectorKey, entity: dto.entity },
    );

    // Enfileirar job no BullMQ
    const jobData: IntegrationJobData = {
      executionId: savedExecution.id,
      connectorId: connector.id,
      integrationDto: dto,
      createdBy,
      attempt: 1,
    };

    const jobName = dto.type === ExecutionType.IMPORT ? 'import-job' : 'export-job';
    
    await this.integrationQueue.add(jobName, jobData, {
      jobId: savedExecution.id, // Usar executionId como jobId para evitar duplicatas
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: {
        age: 24 * 3600, // 24 horas
      },
      removeOnFail: {
        age: 7 * 24 * 3600, // 7 dias
      },
    });

    // Iniciar processamento assíncrono
    this.executeJob(savedExecution.id, dto, connector).catch((error) => {
      this.logger.error(`Job ${savedExecution.id} failed`, error);
    });

    return {
      executionId: savedExecution.id,
      status: ExecutionStatus.QUEUED,
    };
  }

  /**
   * Executa o job de integração
   */
  private async executeJob(
    executionId: string,
    dto: RunIntegrationDto,
    connector: Connector,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Atualizar status para running
      await queryRunner.manager.update(
        Execution,
        { id: executionId },
        {
          status: ExecutionStatus.RUNNING,
          startedAt: new Date(),
        },
      );

      await this.addLog(
        executionId,
        LogLevel.INFO,
        'Job started',
        { entity: dto.entity, type: dto.type },
        queryRunner,
      );

      // Buscar execução atualizada
      const currentExecution = await queryRunner.manager.findOne(Execution, {
        where: { id: executionId },
      });

      if (!currentExecution) {
        throw new Error(`Execution ${executionId} not found`);
      }

      // Criar conector REST com circuit breaker
      const connectorConfig = this.buildConnectorConfig(connector);
      const restConnector = this.connectorFactory.createRestConnector(
        connectorConfig,
      );

      // Disparar webhook de início
      await this.webhook.triggerWebhook(
        currentExecution,
        WebhookEvent.STARTED,
        { entity: dto.entity, type: dto.type },
      );

      // Executar integração baseada no tipo
      if (dto.type === ExecutionType.IMPORT) {
        await this.executeImport(executionId, dto, restConnector, queryRunner, connector);
      } else {
        await this.executeExport(executionId, dto, restConnector, queryRunner);
      }

      // Atualizar status para success
      await queryRunner.manager.update(
        Execution,
        { id: executionId },
        {
          status: ExecutionStatus.SUCCESS,
          finishedAt: new Date(),
        },
      );

      await this.addLog(
        executionId,
        LogLevel.INFO,
        'Job completed successfully',
        {},
        queryRunner,
      );

      await queryRunner.commitTransaction();

      // Buscar execução atualizada para webhook
      const updatedExecution = await this.executionRepository.findOne({
        where: { id: executionId },
      });

      // Disparar webhook de sucesso
      if (updatedExecution) {
        await this.webhook.triggerWebhook(
          updatedExecution,
          WebhookEvent.SUCCESS,
          { finishedAt: updatedExecution.finishedAt },
        );
      }

      // Gerar e salvar sumário de reconciliação
      try {
        const summary = await this.reconciliation.generateReconciliationSummary(
          executionId,
        );
        await this.reconciliation.saveReconciliationSummary(executionId, summary);
      } catch (error: any) {
        this.logger.warn(`Failed to generate reconciliation summary for ${executionId}`, error);
      }
    } catch (error: any) {
      await queryRunner.rollbackTransaction();

      // Atualizar status para failed
      await this.dataSource.manager.update(
        Execution,
        { id: executionId },
        {
          status: ExecutionStatus.FAILED,
          finishedAt: new Date(),
          error: error.message || 'Unknown error',
        },
      );

      // Buscar execução atualizada para webhook
      const failedExecution = await this.executionRepository.findOne({
        where: { id: executionId },
      });

      // Disparar webhook de falha
      if (failedExecution) {
        await this.webhook.triggerWebhook(
          failedExecution,
          WebhookEvent.FAILED,
          {
            error: this.sanitization.sanitizeForWebhooks({
              message: error.message,
              stack: error.stack,
            }),
          },
        );
      }

      await this.addLog(
        executionId,
        LogLevel.ERROR,
        `Job failed: ${error.message}`,
        { error: this.sanitization.sanitizeForLogs({ message: error.message, stack: error.stack }) },
      );

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Executa importação
   */
  private async executeImport(
    executionId: string,
    dto: RunIntegrationDto,
    connector: IConnector,
    queryRunner: any,
    connectorEntity: Connector,
  ): Promise<void> {
    await this.addLog(
      executionId,
      LogLevel.INFO,
      `Starting import for entity ${dto.entity}`,
      {},
      queryRunner,
    );

    // Buscar dados do ERP
    const endpoint = this.getEntityEndpoint(dto.entity);
    const response = await connector.fetch(endpoint);
    const sourceRecords = Array.isArray(response.data) ? response.data : [response.data];

    await this.addLog(
      executionId,
      LogLevel.INFO,
      `Fetched ${sourceRecords.length} records`,
      { count: sourceRecords.length },
      queryRunner,
    );

    // Obter configuração de mapeamento
    let mappingConfig = this.mappingConfig.getMappingConfig(connectorEntity, dto.entity);
    if (!mappingConfig) {
      mappingConfig = this.mappingConfig.getDefaultMappingConfig(dto.entity);
      await this.addLog(
        executionId,
        LogLevel.WARN,
        `Using default mapping configuration for entity ${dto.entity}`,
        {},
        queryRunner,
      );
    }

    // Mapear registros
    const mappingResult = this.dataMapper.mapRecords(sourceRecords, mappingConfig);

    await this.addLog(
      executionId,
      LogLevel.INFO,
      `Mapped ${mappingResult.stats.successful} records successfully, ${mappingResult.stats.failed} failed`,
      {
        successful: mappingResult.stats.successful,
        failed: mappingResult.stats.failed,
        errorsByField: mappingResult.stats.errorsByField,
      },
      queryRunner,
    );

    if (dto.options?.dryRun) {
      // Gerar relatório de dry-run
      const dryRunReport = await this.dryRun.generateDryRunReport(
        executionId,
        connectorEntity,
        dto.entity,
        sourceRecords,
      );

      await this.addLog(
        executionId,
        LogLevel.INFO,
        'Dry-run completed',
        {
          report: {
            wouldCreate: dryRunReport.stats.wouldCreate,
            wouldUpdate: dryRunReport.stats.wouldUpdate,
            wouldSkip: dryRunReport.stats.wouldSkip,
            totalErrors: dryRunReport.stats.failed,
          },
        },
        queryRunner,
      );
    } else {
      // Processar registros mapeados
      let created = 0;
      let updated = 0;
      let skipped = 0;
      const errors: string[] = [];

      for (const record of mappingResult.mapped) {
        try {
          // Verificar idempotência
          const idempotencyCheck = await this.idempotency.checkIdempotency(
            executionId,
            dto.entity,
            record.externalId,
          );

          if (idempotencyCheck.exists && !idempotencyCheck.hasChanges) {
            skipped++;
            await this.addLog(
              executionId,
              LogLevel.DEBUG,
              `Skipping duplicate record: ${record.externalId}`,
              { externalId: record.externalId },
              queryRunner,
            );
            continue;
          }

          // TODO: Persistir no banco de dados (PatrimonioService, etc.)
          // Por enquanto, apenas registra o mapeamento
          if (idempotencyCheck.exists) {
            updated++;
            await this.idempotency.registerMapping(
              executionId,
              dto.entity,
              record.externalId,
              idempotencyCheck.internalId || record.externalId,
            );
          } else {
            created++;
            // Simular criação de ID interno
            const internalId = `internal-${record.externalId}`;
            await this.idempotency.registerMapping(
              executionId,
              dto.entity,
              record.externalId,
              internalId,
            );
          }
        } catch (error: any) {
          errors.push(`Error processing ${record.externalId}: ${error.message}`);
          await this.addLog(
            executionId,
            LogLevel.ERROR,
            `Error processing record ${record.externalId}`,
            { error: error.message, externalId: record.externalId },
            queryRunner,
          );
        }
      }

      // Processar registros com falha
      for (const record of mappingResult.failed) {
        await this.addLog(
          executionId,
          LogLevel.WARN,
          `Failed to map record ${record.externalId}`,
          { errors: record.errors, externalId: record.externalId },
          queryRunner,
        );
      }

      await this.addLog(
        executionId,
        LogLevel.INFO,
        'Import completed',
        {
          created,
          updated,
          skipped,
          failed: mappingResult.stats.failed,
          errors: errors.length,
        },
        queryRunner,
      );
    }
  }

  /**
   * Executa exportação
   */
  private async executeExport(
    executionId: string,
    dto: RunIntegrationDto,
    connector: IConnector,
    queryRunner: any,
  ): Promise<void> {
    await this.addLog(
      executionId,
      LogLevel.INFO,
      `Starting export for entity ${dto.entity}`,
      {},
      queryRunner,
    );

    // TODO: Implementar lógica de exportação
    const endpoint = this.getEntityEndpoint(dto.entity);
    // Simular dados a exportar
    const dataToExport: any[] = [];

    if (dto.options?.dryRun) {
      await this.addLog(
        executionId,
        LogLevel.INFO,
        `Dry-run mode: would export ${dataToExport.length} records`,
        { count: dataToExport.length },
        queryRunner,
      );
    } else {
      await connector.post(endpoint, dataToExport);
      await this.addLog(
        executionId,
        LogLevel.INFO,
        `Exported ${dataToExport.length} records`,
        { count: dataToExport.length },
        queryRunner,
      );
    }
  }

  /**
   * Retorna endpoint baseado na entidade
   */
  private getEntityEndpoint(entity: IntegrationEntity): string {
    const endpoints: Record<IntegrationEntity, string> = {
      [IntegrationEntity.ASSETS]: '/api/assets',
      [IntegrationEntity.COST_CENTERS]: '/api/cost-centers',
      [IntegrationEntity.LOCATIONS]: '/api/locations',
      [IntegrationEntity.DEPRECIATIONS]: '/api/depreciations',
    };
    return endpoints[entity] || '/api/unknown';
  }

  /**
   * Constrói configuração do conector a partir do connector entity
   */
  private buildConnectorConfig(connector: Connector): RestConnectorConfig {
    const config = connector.configJson as any;
    return {
      baseUrl: config.baseUrl || '',
      authType: config.authType || 'basic',
      authConfig: config.authConfig || {},
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      retryDelay: config.retryDelay || 1000,
    };
  }

  /**
   * Adiciona log à execução
   */
  private async addLog(
    executionId: string,
    level: LogLevel,
    message: string,
    metaJson: Record<string, any> = {},
    queryRunner?: any,
  ): Promise<void> {
    const log = this.executionLogRepository.create({
      executionId,
      level,
      message,
      metaJson,
    });

    if (queryRunner) {
      await queryRunner.manager.save(ExecutionLog, log);
    } else {
      await this.executionLogRepository.save(log);
    }
  }

  /**
   * Lista execuções com filtros e paginação
   */
  async listExecutions(
    dto: ListExecutionsDto,
  ): Promise<{ items: ExecutionResponseDto[]; page: number; limit: number; total: number }> {
    const { page = 1, limit = 20, connectorKey, status, type } = dto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.executionRepository
      .createQueryBuilder('execution')
      .leftJoinAndSelect('execution.connector', 'connector')
      .leftJoinAndSelect('execution.logs', 'logs')
      .orderBy('execution.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (connectorKey) {
      queryBuilder.andWhere('connector.key = :connectorKey', { connectorKey });
    }

    if (status) {
      queryBuilder.andWhere('execution.status = :status', { status });
    }

    if (type) {
      queryBuilder.andWhere('execution.type = :type', { type });
    }

    const [executions, total] = await queryBuilder.getManyAndCount();

    const items = executions.map((execution) => ({
      id: execution.id,
      connectorKey: execution.connector.key,
      type: execution.type,
      status: execution.status,
      startedAt: execution.startedAt,
      finishedAt: execution.finishedAt,
      error: execution.error,
      createdBy: execution.createdBy,
      createdAt: execution.createdAt,
      logs: execution.logs?.map((log) => ({
        id: log.id.toString(),
        level: log.level,
        message: log.message,
        metaJson: log.metaJson,
        createdAt: log.createdAt,
      })),
    }));

    return {
      items,
      page,
      limit,
      total,
    };
  }

  /**
   * Obtém sumário de reconciliação de uma execução
   */
  async getReconciliationSummary(executionId: string) {
    return this.reconciliation.generateReconciliationSummary(executionId);
  }

  /**
   * Obtém métricas de um conector
   */
  async getConnectorMetrics(connectorKey: string, fromDate: Date, toDate: Date) {
    return this.metrics.getConnectorMetrics(connectorKey, fromDate, toDate);
  }

  /**
   * Obtém métricas de todos os conectores
   */
  async getAllConnectorsMetrics(fromDate: Date, toDate: Date) {
    return this.metrics.getAllConnectorsMetrics(fromDate, toDate);
  }

  /**
   * Obtém health de uma integração
   */
  async getIntegrationHealth(connectorKey: string) {
    return this.healthCheck.checkIntegrationHealth(connectorKey);
  }

  /**
   * Obtém health de todas as integrações
   */
  async getAllIntegrationsHealth() {
    return this.healthCheck.checkAllIntegrationsHealth();
  }

  /**
   * Busca execução por ID
   */
  async getExecutionById(id: string): Promise<ExecutionResponseDto> {
    const execution = await this.executionRepository.findOne({
      where: { id },
      relations: ['connector', 'logs'],
      order: {
        logs: {
          createdAt: 'ASC',
        },
      },
    });

    if (!execution) {
      throw new NotFoundException(`Execution with id "${id}" not found`);
    }

    return {
      id: execution.id,
      connectorKey: execution.connector.key,
      type: execution.type,
      status: execution.status,
      startedAt: execution.startedAt,
      finishedAt: execution.finishedAt,
      error: execution.error,
      createdBy: execution.createdBy,
      createdAt: execution.createdAt,
      logs: execution.logs?.map((log) => ({
        id: log.id.toString(),
        level: log.level,
        message: log.message,
        metaJson: log.metaJson,
        createdAt: log.createdAt,
      })),
    };
  }
}

