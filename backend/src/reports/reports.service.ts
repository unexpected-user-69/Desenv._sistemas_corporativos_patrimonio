import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Between } from 'typeorm';
import { ReportRequest, ReportRequestStatus, ReportType } from './entities/report-request.entity';
import { ReportArtifact } from './entities/report-artifact.entity';
import { CreateReportRequestDto } from './dto/create-report-request.dto';
import { ReportRequestResponseDto } from './dto/report-request-response.dto';
import { ListReportsQueryDto } from './dto/list-reports-query.dto';
import { CsvGeneratorService } from './services/csv-generator.service';
import { PdfGeneratorService } from './services/pdf-generator.service';
import { ReportQueueService } from './services/report-queue.service';
import { ReportCatalogService } from './services/report-catalog.service';
import { ReportPermissionService } from './services/report-permission.service';
import { ReportQuotaService } from './services/report-quota.service';
import { ReportStructuredLoggerService } from './services/report-structured-logger.service';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(ReportRequest)
    private readonly requestRepository: Repository<ReportRequest>,
    @InjectRepository(ReportArtifact)
    private readonly artifactRepository: Repository<ReportArtifact>,
    private readonly csvGenerator: CsvGeneratorService,
    private readonly pdfGenerator: PdfGeneratorService,
    private readonly reportQueue: ReportQueueService,
    private readonly catalogService: ReportCatalogService,
    private readonly permissionService: ReportPermissionService,
    private readonly quotaService: ReportQuotaService,
    private readonly structuredLogger: ReportStructuredLoggerService,
  ) {}

  /**
   * Cria uma nova solicitação de relatório e enfileira para processamento
   */
  async createRequest(
    dto: CreateReportRequestDto,
    userId: string,
    userRole?: string,
  ): Promise<ReportRequestResponseDto> {
    const effectiveUserId = userId || process.env.DEFAULT_TEST_USER_ID || '00000000-0000-0000-0000-000000000001';
    const startTime = Date.now();

    // Verificar quota antes de criar solicitação
    try {
      await this.quotaService.checkAndIncrementQuota(effectiveUserId, 'monthly');
    } catch (error: any) {
      if (error instanceof HttpException && error.getStatus() === HttpStatus.TOO_MANY_REQUESTS) {
        const quota = await this.quotaService.getQuota(effectiveUserId, 'monthly');
        this.structuredLogger.logQuotaExceeded(
          effectiveUserId,
          quota.limit,
          quota.used,
          'monthly',
        );
        throw error;
      }
      throw error;
    }

    // Se um catalogKey foi fornecido, buscar do catálogo
    if (dto.catalogKey) {
      try {
        const catalog = await this.catalogService.findByKey(dto.catalogKey);

        // Verificar permissões se o catálogo requer
        if (catalog.requiresPermission && userRole) {
          const hasPermission = await this.permissionService.checkPermission(
            catalog.id,
            userId,
            userRole as any,
            'generate',
          );

          if (!hasPermission) {
            throw new BadRequestException(
              `Você não tem permissão para gerar o relatório '${catalog.key}'`,
            );
          }
        }

        // Usar dados do catálogo se não foram fornecidos
        const type = dto.type || catalog.type;
        const model = dto.model || catalog.model;
        const filters = { ...catalog.defaultFilters, ...(dto.filters || {}) };

        const request = this.requestRepository.create({
          type,
          model,
          filtersJson: filters,
          status: ReportRequestStatus.PENDING,
          createdById: effectiveUserId,
        });

        const saved = await this.requestRepository.save(request);
        this.logger.log(
          `Solicitação de relatório criada do catálogo: ${saved.id} (${catalog.key})`,
        );

        // Log estruturado
        this.structuredLogger.logRequestCreated(
          saved.id,
          effectiveUserId,
          saved.type,
          saved.model,
          catalog.key,
        );

        // Enfileirar para processamento assíncrono
        try {
          await this.reportQueue.enqueueReport(
            saved.id,
            saved.type,
            saved.model,
            effectiveUserId,
            saved.filtersJson,
            'medium',
          );
          this.logger.log(`Solicitação ${saved.id} enfileirada com sucesso`);
        } catch (error: any) {
          this.logger.error(`Erro ao enfileirar solicitação ${saved.id}:`, error);
        }

        return this.toRequestResponseDto(saved);
      } catch (error: any) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        this.logger.warn(`Erro ao buscar catálogo ${dto.catalogKey}:`, error.message);
        // Continuar com criação normal se catálogo não for encontrado
      }
    }

    // Criação normal sem catálogo
    const request = this.requestRepository.create({
      type: dto.type,
      model: dto.model,
      filtersJson: dto.filters || {},
      status: ReportRequestStatus.PENDING,
      createdById: effectiveUserId,
    });

    const saved = await this.requestRepository.save(request);
    this.logger.log(`Solicitação de relatório criada: ${saved.id} (${saved.type}/${saved.model})`);

    // Log estruturado
    this.structuredLogger.logRequestCreated(
      saved.id,
      effectiveUserId,
      saved.type,
      saved.model,
    );

    // Enfileirar para processamento assíncrono
    try {
      await this.reportQueue.enqueueReport(
        saved.id,
        saved.type,
        saved.model,
        effectiveUserId,
        saved.filtersJson,
        'medium',
      );
      this.logger.log(`Solicitação ${saved.id} enfileirada com sucesso`);
    } catch (error: any) {
      this.logger.error(`Erro ao enfileirar solicitação ${saved.id}:`, error);
      // Não falha a criação, mas registra o erro
      // O scheduler vai tentar processar depois
    }

    return this.toRequestResponseDto(saved);
  }

  /**
   * Lista solicitações de relatório com filtros
   */
  async findAllRequests(
    query: ListReportsQueryDto,
    userId?: string,
  ): Promise<ReportRequestResponseDto[]> {
    const where: any = {};

    if (query.status) {
      where.status = query.status;
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.model) {
      where.model = query.model;
    }

    if (userId) {
      where.createdById = userId;
    }

    const findOptions: FindManyOptions<ReportRequest> = {
      where,
      relations: ['artifact'],
      order: { createdAt: 'DESC' },
    };

    // Filtro por data
    if (query.fromDate || query.toDate) {
      const fromDate = query.fromDate ? new Date(query.fromDate) : undefined;
      const toDate = query.toDate ? new Date(query.toDate) : undefined;

      if (fromDate && toDate) {
        findOptions.where = {
          ...where,
          createdAt: Between(fromDate, toDate),
        };
      } else if (fromDate) {
        findOptions.where = {
          ...where,
          createdAt: Between(fromDate, new Date()),
        };
      } else if (toDate) {
        findOptions.where = {
          ...where,
          createdAt: Between(new Date(0), toDate),
        };
      }
    }

    const requests = await this.requestRepository.find(findOptions);

    return requests.map((r) => this.toRequestResponseDto(r));
  }

  /**
   * Busca uma solicitação por ID (retorna null se não encontrar)
   * Método interno para verificação de existência
   */
  async findOne(id: string): Promise<ReportRequest | null> {
    return this.requestRepository.findOne({
      where: { id },
    });
  }

  /**
   * Busca uma solicitação por ID
   */
  async findRequestById(id: string): Promise<ReportRequestResponseDto> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['artifact'],
    });

    if (!request) {
      throw new NotFoundException(`Solicitação ${id} não encontrada`);
    }

    return this.toRequestResponseDto(request);
  }

  /**
   * Atualiza o status de uma solicitação
   */
  async updateRequestStatus(
    id: string,
    status: ReportRequestStatus,
    errorMessage?: string | null,
  ): Promise<ReportRequestResponseDto> {
    const request = await this.requestRepository.findOne({ where: { id } });

    if (!request) {
      throw new NotFoundException(`Solicitação ${id} não encontrada`);
    }

    request.status = status;
    // Se errorMessage for explicitamente null, limpar a mensagem de erro
    // Se for undefined, manter a mensagem atual
    if (errorMessage !== undefined) {
      request.errorMessage = errorMessage || undefined;
    }

    const saved = await this.requestRepository.save(request);
    this.logger.log(`Status da solicitação ${id} atualizado para ${status}`);

    return this.toRequestResponseDto(saved);
  }

  /**
   * Cria um artefato para uma solicitação
   */
  async createArtifact(
    requestId: string,
    storageKey: string,
    mime: string,
    sizeBytes: number,
    expiresAt?: Date,
  ): Promise<ReportArtifact> {
    // Verificar se já existe artefato para esta solicitação
    const existing = await this.artifactRepository.findOne({
      where: { requestId },
    });

    if (existing) {
      throw new BadRequestException(`Artefato já existe para solicitação ${requestId}`);
    }

    const artifact = this.artifactRepository.create({
      requestId,
      storageKey,
      mime,
      sizeBytes,
      expiresAt,
    });

    const saved = await this.artifactRepository.save(artifact);
    this.logger.log(`Artefato criado: ${saved.id} para solicitação ${requestId}`);

    return saved;
  }

  /**
   * Busca um artefato por ID da solicitação
   */
  async findArtifactByRequestId(requestId: string): Promise<ReportArtifact | null> {
    return this.artifactRepository.findOne({
      where: { requestId },
    });
  }

  /**
   * Processa uma solicitação de relatório (gera o arquivo)
   */
  async processRequest(requestId: string): Promise<{ buffer: Buffer; mime: string }> {
    const startTime = Date.now();
    const request = await this.requestRepository.findOne({ where: { id: requestId } });

    if (!request) {
      throw new NotFoundException(`Solicitação ${requestId} não encontrada`);
    }

    // Atualizar status para PROCESSING
    request.status = ReportRequestStatus.PROCESSING;
    await this.requestRepository.save(request);

    try {
      let buffer: Buffer;
      let mime: string;

      if (request.type === ReportType.CSV) {
        buffer = await this.csvGenerator.generateCsv(request.model, request.filtersJson);
        mime = 'text/csv; charset=utf-8';
      } else if (request.type === ReportType.PDF) {
        buffer = await this.pdfGenerator.generatePdf(request.model, request.filtersJson);
        mime = 'application/pdf';
      } else {
        throw new BadRequestException(`Tipo de relatório ${request.type} não suportado`);
      }

      // Atualizar status para COMPLETED
      request.status = ReportRequestStatus.COMPLETED;
      await this.requestRepository.save(request);

      const durationMs = Date.now() - startTime;

      // Log estruturado
      this.structuredLogger.logRequestProcessed(
        requestId,
        request.createdById,
        request.type,
        request.model,
        'completed',
        durationMs,
      );

      return { buffer, mime };
    } catch (error: any) {
      // Atualizar status para FAILED
      request.status = ReportRequestStatus.FAILED;
      request.errorMessage = error.message || 'Erro desconhecido ao processar relatório';
      await this.requestRepository.save(request);

      const durationMs = Date.now() - startTime;

      // Log estruturado
      this.structuredLogger.logRequestFailed(
        requestId,
        request.createdById,
        request.type,
        request.model,
        error.message || 'Erro desconhecido',
        durationMs,
      );

      throw error;
    }
  }

  /**
   * Converte entity para DTO de resposta
   */
  private toRequestResponseDto(request: ReportRequest): ReportRequestResponseDto {
    return {
      id: request.id,
      type: request.type,
      model: request.model,
      filters: request.filtersJson,
      status: request.status,
      createdById: request.createdById,
      errorMessage: request.errorMessage,
      artifact: request.artifact
        ? {
            id: request.artifact.id,
            requestId: request.artifact.requestId,
            storageKey: request.artifact.storageKey,
            mime: request.artifact.mime,
            sizeBytes: request.artifact.sizeBytes,
            expiresAt: request.artifact.expiresAt,
            createdAt: request.artifact.createdAt,
          }
        : undefined,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    };
  }
}

