import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
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
  ) {}

  /**
   * Cria uma nova solicitação de relatório
   */
  async createRequest(
    dto: CreateReportRequestDto,
    userId: string,
  ): Promise<ReportRequestResponseDto> {
    const request = this.requestRepository.create({
      type: dto.type,
      model: dto.model,
      filtersJson: dto.filters || {},
      status: ReportRequestStatus.PENDING,
      createdById: userId,
    });

    const saved = await this.requestRepository.save(request);
    this.logger.log(`Solicitação de relatório criada: ${saved.id} (${saved.type}/${saved.model})`);

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
    errorMessage?: string,
  ): Promise<ReportRequestResponseDto> {
    const request = await this.requestRepository.findOne({ where: { id } });

    if (!request) {
      throw new NotFoundException(`Solicitação ${id} não encontrada`);
    }

    request.status = status;
    if (errorMessage) {
      request.errorMessage = errorMessage;
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

      return { buffer, mime };
    } catch (error: any) {
      // Atualizar status para FAILED
      request.status = ReportRequestStatus.FAILED;
      request.errorMessage = error.message || 'Erro desconhecido ao processar relatório';
      await this.requestRepository.save(request);

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

