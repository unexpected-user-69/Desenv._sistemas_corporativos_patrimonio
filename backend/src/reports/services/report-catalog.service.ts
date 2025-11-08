import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ReportCatalog } from '../entities/report-catalog.entity';
import { ReportCatalogVersion } from '../entities/report-catalog-version.entity';
import { CreateCatalogDto } from '../dto/create-catalog.dto';
import { UpdateCatalogDto } from '../dto/update-catalog.dto';
import { CatalogResponseDto } from '../dto/catalog-response.dto';
import { CreateCatalogVersionDto } from '../dto/create-catalog-version.dto';
import { CatalogVersionResponseDto } from '../dto/catalog-response.dto';

@Injectable()
export class ReportCatalogService {
  private readonly logger = new Logger(ReportCatalogService.name);

  constructor(
    @InjectRepository(ReportCatalog)
    private readonly catalogRepository: Repository<ReportCatalog>,
    @InjectRepository(ReportCatalogVersion)
    private readonly versionRepository: Repository<ReportCatalogVersion>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Cria um novo catálogo de relatório
   */
  async create(dto: CreateCatalogDto, userId: string): Promise<CatalogResponseDto> {
    // Verificar se já existe um catálogo com a mesma chave
    const existing = await this.catalogRepository.findOne({
      where: { key: dto.key },
    });

    if (existing) {
      throw new ConflictException(`Catálogo com chave '${dto.key}' já existe`);
    }

    const catalog = this.catalogRepository.create({
      ...dto,
      currentVersion: dto.currentVersion || '1.0.0',
      active: dto.active ?? true,
      requiresPermission: dto.requiresPermission ?? false,
      createdById: userId,
    });

    const saved = await this.catalogRepository.save(catalog);

    // Criar versão inicial
    const version = this.versionRepository.create({
      catalogId: saved.id,
      version: saved.currentVersion,
      filters: dto.defaultFilters,
      isCurrent: true,
      createdById: userId,
    });

    await this.versionRepository.save(version);

    this.logger.log(`Catálogo criado: ${saved.id} (${saved.key})`);

    return this.toCatalogResponseDto(saved);
  }

  /**
   * Lista todos os catálogos (opcionalmente filtrados por ativos)
   */
  async findAll(activeOnly: boolean = false): Promise<CatalogResponseDto[]> {
    const where: any = {};
    if (activeOnly) {
      where.active = true;
    }

    const catalogs = await this.catalogRepository.find({
      where,
      relations: ['versions'],
      order: { createdAt: 'DESC' },
    });

    return catalogs.map((c) => this.toCatalogResponseDto(c));
  }

  /**
   * Busca um catálogo por ID
   */
  async findOne(id: string): Promise<CatalogResponseDto> {
    const catalog = await this.catalogRepository.findOne({
      where: { id },
      relations: ['versions'],
    });

    if (!catalog) {
      throw new NotFoundException(`Catálogo ${id} não encontrado`);
    }

    return this.toCatalogResponseDto(catalog);
  }

  /**
   * Busca um catálogo por chave
   */
  async findByKey(key: string): Promise<CatalogResponseDto> {
    const catalog = await this.catalogRepository.findOne({
      where: { key },
      relations: ['versions'],
    });

    if (!catalog) {
      throw new NotFoundException(`Catálogo com chave '${key}' não encontrado`);
    }

    return this.toCatalogResponseDto(catalog);
  }

  /**
   * Atualiza um catálogo
   */
  async update(
    id: string,
    dto: UpdateCatalogDto,
    userId: string,
  ): Promise<CatalogResponseDto> {
    const catalog = await this.catalogRepository.findOne({ where: { id } });

    if (!catalog) {
      throw new NotFoundException(`Catálogo ${id} não encontrado`);
    }

    // Verificar se a chave está sendo alterada e se já existe
    if (dto.key && dto.key !== catalog.key) {
      const existing = await this.catalogRepository.findOne({
        where: { key: dto.key },
      });

      if (existing) {
        throw new ConflictException(`Catálogo com chave '${dto.key}' já existe`);
      }
    }

    Object.assign(catalog, dto);
    catalog.updatedById = userId;

    const saved = await this.catalogRepository.save(catalog);

    this.logger.log(`Catálogo atualizado: ${saved.id}`);

    return this.toCatalogResponseDto(saved);
  }

  /**
   * Remove um catálogo
   */
  async remove(id: string): Promise<void> {
    const catalog = await this.catalogRepository.findOne({ where: { id } });

    if (!catalog) {
      throw new NotFoundException(`Catálogo ${id} não encontrado`);
    }

    await this.catalogRepository.remove(catalog);

    this.logger.log(`Catálogo removido: ${id}`);
  }

  /**
   * Adiciona uma nova versão a um catálogo
   */
  async addVersion(
    catalogId: string,
    dto: CreateCatalogVersionDto,
    userId: string,
  ): Promise<CatalogVersionResponseDto> {
    const catalog = await this.catalogRepository.findOne({ where: { id: catalogId } });

    if (!catalog) {
      throw new NotFoundException(`Catálogo ${catalogId} não encontrado`);
    }

    // Verificar se a versão já existe
    const existingVersion = await this.versionRepository.findOne({
      where: { catalogId, version: dto.version },
    });

    if (existingVersion) {
      throw new ConflictException(
        `Versão ${dto.version} já existe para o catálogo ${catalogId}`,
      );
    }

    // Se esta é a versão atual, marcar as outras como não atuais
    if (dto.isCurrent) {
      await this.versionRepository.update(
        { catalogId, isCurrent: true },
        { isCurrent: false },
      );

      // Atualizar a versão atual do catálogo
      catalog.currentVersion = dto.version;
      await this.catalogRepository.save(catalog);
    }

    const version = this.versionRepository.create({
      catalogId,
      version: dto.version,
      changelog: dto.changelog,
      filters: dto.filters,
      isCurrent: dto.isCurrent ?? false,
      createdById: userId,
    });

    const saved = await this.versionRepository.save(version);

    this.logger.log(`Versão ${dto.version} adicionada ao catálogo ${catalogId}`);

    return this.toVersionResponseDto(saved);
  }

  /**
   * Define uma versão como atual
   */
  async setCurrentVersion(catalogId: string, version: string, userId: string): Promise<void> {
    const catalog = await this.catalogRepository.findOne({ where: { id: catalogId } });

    if (!catalog) {
      throw new NotFoundException(`Catálogo ${catalogId} não encontrado`);
    }

    const versionEntity = await this.versionRepository.findOne({
      where: { catalogId, version },
    });

    if (!versionEntity) {
      throw new NotFoundException(
        `Versão ${version} não encontrada para o catálogo ${catalogId}`,
      );
    }

    // Usar transação para garantir consistência
    await this.dataSource.transaction(async (manager) => {
      // Marcar todas as versões como não atuais
      await manager.update(ReportCatalogVersion, { catalogId }, { isCurrent: false });

      // Marcar a versão selecionada como atual
      await manager.update(
        ReportCatalogVersion,
        { catalogId, version },
        { isCurrent: true },
      );

      // Atualizar a versão atual do catálogo
      await manager.update(ReportCatalog, { id: catalogId }, { currentVersion: version });
    });

    this.logger.log(`Versão ${version} definida como atual para o catálogo ${catalogId}`);
  }

  /**
   * Converte entity para DTO de resposta
   */
  private toCatalogResponseDto(catalog: ReportCatalog): CatalogResponseDto {
    return {
      id: catalog.id,
      key: catalog.key,
      name: catalog.name,
      description: catalog.description,
      type: catalog.type,
      model: catalog.model,
      defaultFilters: catalog.defaultFilters,
      currentVersion: catalog.currentVersion,
      active: catalog.active,
      requiresPermission: catalog.requiresPermission,
      createdById: catalog.createdById,
      updatedById: catalog.updatedById,
      versions: catalog.versions?.map((v) => this.toVersionResponseDto(v)),
      createdAt: catalog.createdAt,
      updatedAt: catalog.updatedAt,
    };
  }

  /**
   * Converte entity de versão para DTO de resposta
   */
  private toVersionResponseDto(version: ReportCatalogVersion): CatalogVersionResponseDto {
    return {
      id: version.id,
      catalogId: version.catalogId,
      version: version.version,
      changelog: version.changelog,
      filters: version.filters,
      isCurrent: version.isCurrent,
      createdById: version.createdById,
      createdAt: version.createdAt,
    };
  }
}

