import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike, Between, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, In, Not, IsNull } from 'typeorm';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Patrimonio } from './entities/patrimonio.entity';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { PatrimonioResponseDto } from './dto/patrimonio-response.dto';
import { QueryPatrimonioDto } from './dto/query-patrimonio.dto';
import { PaginatedPatrimonioResponseDto } from './dto/paginated-patrimonio-response.dto';
import { UpdateStatusPatrimonioDto } from './dto/update-status-patrimonio.dto';
import { TransferirResponsavelDto } from './dto/transferir-responsavel.dto';
import { PatrimonioDashboardResponseDto } from './dto/dashboard-response.dto';
import { DescartePatrimonioDto } from './dto/descarte-patrimonio.dto';
import { UpdateLocalizacaoPatrimonioDto } from './dto/update-localizacao-patrimonio.dto';
import { LocalizacoesStatsResponseDto, LocalizacaoStatsItemDto } from './dto/localizacoes-stats-response.dto';
import { FaixaValorStatsResponseDto, FaixaValorStatsItemDto } from './dto/faixa-valor-stats-response.dto';
import { AquisicaoStatsResponseDto, AquisicaoStatsItemDto } from './dto/aquisicao-stats-response.dto';
import { EvolucaoStatsResponseDto, EvolucaoStatsItemDto } from './dto/evolucao-stats-response.dto';
import { UsersService } from '../users/users.service';
import { stringify } from 'csv-stringify/sync';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { PatrimonioStatus } from './entities/patrimonio.entity';
import { StorageService } from './services/storage.service';
import { QueryAquisicaoPeriodoDto } from './dto/query-aquisicao-periodo.dto';
import { QueryValorRangeDto } from './dto/query-valor-range.dto';
import { QueryStatusMultiplosDto } from './dto/query-status-multiplos.dto';
import { QueryCategoriasMultiplasDto } from './dto/query-categorias-multiplas.dto';
import { ResponsavelStatsResponseDto } from './dto/responsavel-stats-response.dto';
import { MarcaModeloStatsResponseDto, MarcaModeloStatsItemDto } from './dto/marca-modelo-stats-response.dto';
import { TopValiososQueryDto } from './dto/top-valiosos-query.dto';
import { NovosQueryDto } from './dto/novos-query.dto';
import { PatrimonioLocalizacaoHistorico } from './entities/patrimonio-localizacao-historico.entity';
import { HistoricoLocalizacoesResponseDto, HistoricoLocalizacaoItemDto } from './dto/historico-localizacoes-response.dto';
import { CreateBulkPatrimonioDto } from './dto/create-bulk-patrimonio.dto';
import { UpdateBulkPatrimonioDto } from './dto/update-bulk-patrimonio.dto';
import { TransferirResponsavelBulkDto } from './dto/transferir-responsavel-bulk.dto';
import { DeleteBulkPatrimonioDto } from './dto/delete-bulk-patrimonio.dto';
import { DeleteBulkResponseDto } from './dto/delete-bulk-response.dto';
import { ValidarCodigoResponseDto } from './dto/validar-codigo-response.dto';
import { VerificarDuplicidadeDto } from './dto/verificar-duplicidade.dto';
import { DuplicataResponseDto } from './dto/duplicata-response.dto';
import { DisponibilidadeResponseDto } from './dto/disponibilidade-response.dto';
import { BulkResponseDto } from './dto/bulk-response.dto';
import { HistoricoAlteracaoResponseDto, HistoricoAlteracaoItemDto } from './dto/historico-alteracao-response.dto';
import { HistoricoResponsaveisResponseDto, HistoricoResponsavelItemDto } from './dto/historico-responsaveis-response.dto';

@Injectable()
export class PatrimonioService {
  private readonly logger = new Logger(PatrimonioService.name);

  constructor(
    @InjectRepository(Patrimonio)
    private readonly patrimonioRepository: Repository<Patrimonio>,
    @InjectRepository(PatrimonioLocalizacaoHistorico)
    private readonly historicoRepository: Repository<PatrimonioLocalizacaoHistorico>,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Serializa Patrimonio para PatrimonioResponseDto usando class-transformer
   */
  private serializePatrimonio(patrimonio: Patrimonio): PatrimonioResponseDto {
    try {
      return plainToInstance(PatrimonioResponseDto, patrimonio, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      this.logger.error('Erro ao serializar patrimônio', {
        error: error?.message,
        stack: error?.stack,
        patrimonio: JSON.stringify(patrimonio, null, 2),
      });
      throw error;
    }
  }

  /**
   * Normaliza string para busca
   */
  private normalizeSearchText(text: string): string {
    return text.trim().toLowerCase();
  }

  /**
   * Lista patrimônios com paginação e filtros avançados
   */
  async findAllWithFilters(
    query: QueryPatrimonioDto,
  ): Promise<PaginatedPatrimonioResponseDto> {
    const {
      page = 1,
      limit = 10,
      q,
      categoriaId,
      status,
      marca,
      modelo,
      localizacao,
      responsavelId,
      valorMinimo,
      valorMaximo,
      dataInicial,
      dataFinal,
      sortBy = 'nome',
      sortOrder = 'ASC',
    } = query;

    const skip = (page - 1) * limit;

    // Filtros específicos (base)
    const baseWhere: FindOptionsWhere<Patrimonio> = {};
    if (categoriaId) {
      baseWhere.categoriaId = categoriaId;
    }
    if (status) {
      baseWhere.status = status;
    }
    if (marca && !q) {
      // Se não há busca textual, aplica filtro de marca normalmente
      baseWhere.marca = ILike(`%${marca}%`);
    }
    if (modelo && !q) {
      // Se não há busca textual, aplica filtro de modelo normalmente
      baseWhere.modelo = ILike(`%${modelo}%`);
    }
    if (localizacao) {
      baseWhere.localizacao = ILike(`%${localizacao}%`);
    }
    if (responsavelId) {
      baseWhere.responsavelId = responsavelId;
    }

    // Filtros de valor
    if (valorMinimo !== undefined || valorMaximo !== undefined) {
      baseWhere.valorAquisicao = Between(
        valorMinimo ?? 0,
        valorMaximo ?? Number.MAX_SAFE_INTEGER,
      );
    }

    // Filtros de data
    if (dataInicial || dataFinal) {
      baseWhere.dataAquisicao = Between(
        dataInicial ? new Date(dataInicial) : new Date('1900-01-01'),
        dataFinal ? new Date(dataFinal) : new Date(),
      );
    }

    // Busca textual (aplica filtros base em cada condição OR)
    let whereConditions: FindOptionsWhere<Patrimonio>[] = [];
    if (q) {
      const searchText = this.normalizeSearchText(q);
      whereConditions = [
        { nome: ILike(`%${searchText}%`), ...baseWhere },
        { codigo: ILike(`%${searchText}%`), ...baseWhere },
        { descricao: ILike(`%${searchText}%`), ...baseWhere },
        { marca: ILike(`%${searchText}%`), ...baseWhere },
        { modelo: ILike(`%${searchText}%`), ...baseWhere },
      ];
    } else if (Object.keys(baseWhere).length > 0) {
      whereConditions = [baseWhere];
    }

    // Mapear sortBy para campos válidos
    let orderField = sortBy;
    const allowedSortFields = [
      'codigo',
      'nome',
      'status',
      'marca',
      'modelo',
      'valorAquisicao',
      'dataAquisicao',
      'localizacao',
    ];

    // Se tentar ordenar por categoria, usar categoriaId
    if (sortBy === 'categoria') {
      orderField = 'categoriaId';
    } else if (!allowedSortFields.includes(sortBy)) {
      // Default se campo não permitido
      orderField = 'nome';
    }

    const findOptions: FindManyOptions<Patrimonio> = {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      skip,
      take: limit,
      order: { [orderField]: sortOrder },
      relations: ['categoria'],
    };

    const [patrimonios, total] =
      await this.patrimonioRepository.findAndCount(findOptions);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: patrimonios.map((patrimonio) =>
        this.serializePatrimonio(patrimonio),
      ),
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  /**
   * Busca patrimônio por ID
   */
  async findOne(id: string): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }
    return this.serializePatrimonio(patrimonio);
  }

  /**
   * Busca patrimônio por código
   */
  async findByCodigo(codigo: string): Promise<PatrimonioResponseDto> {
    try {
      // Primeiro tentar sem relações para ver se o patrimônio existe
      let patrimonio = await this.patrimonioRepository.findOne({
        where: { codigo: codigo.toUpperCase() },
      });
      
      if (!patrimonio) {
        throw new NotFoundException(
          `Patrimônio com código "${codigo}" não encontrado`,
        );
      }

      // Se encontrou, buscar com relações
      patrimonio = await this.patrimonioRepository.findOne({
        where: { codigo: codigo.toUpperCase() },
        relations: ['categoria'],
      });

      if (!patrimonio) {
        throw new NotFoundException(
          `Patrimônio com código "${codigo}" não encontrado`,
        );
      }

      return this.serializePatrimonio(patrimonio);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error('Erro ao buscar patrimônio por código', {
        error: error?.message,
        stack: error?.stack,
        codigo,
      });
      throw error;
    }
  }

  /**
   * Cria novo patrimônio
   */
  async create(dto: CreatePatrimonioDto): Promise<PatrimonioResponseDto> {
    // Verificar se código já existe
    const existingPatrimonio = await this.patrimonioRepository.findOne({
      where: { codigo: dto.codigo },
    });
    if (existingPatrimonio) {
      throw new ConflictException('Código de patrimônio já existe');
    }

    try {
      const patrimonio = this.patrimonioRepository.create({
        ...dto,
        dataAquisicao: dto.dataAquisicao
          ? new Date(dto.dataAquisicao)
          : undefined,
        dataGarantia: dto.dataGarantia ? new Date(dto.dataGarantia) : undefined,
      });
      const saved = await this.patrimonioRepository.save(patrimonio);
      return this.serializePatrimonio(saved);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === '23505') {
        throw new ConflictException('Código de patrimônio já existe');
      }
      throw error;
    }
  }

  /**
   * Atualiza patrimônio
   */
  async update(
    id: string,
    dto: UpdatePatrimonioDto,
    userId?: string,
  ): Promise<PatrimonioResponseDto> {
    // Buscar patrimônio atual para comparar localização
    const patrimonioAtual = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonioAtual) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    const localizacaoAnterior = patrimonioAtual.localizacao;

    const patrimonio = await this.patrimonioRepository.preload({
      id,
      ...dto,
      dataAquisicao: dto.dataAquisicao
        ? new Date(dto.dataAquisicao)
        : undefined,
      dataGarantia: dto.dataGarantia ? new Date(dto.dataGarantia) : undefined,
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Verificar se houve mudança de localização
    const localizacaoNova = dto.localizacao;
    if (localizacaoNova !== undefined && localizacaoAnterior !== localizacaoNova) {
      // Registrar no histórico
      const historico = this.historicoRepository.create({
        patrimonioId: id,
        localizacaoAnterior: localizacaoAnterior || undefined,
        localizacaoNova: localizacaoNova,
        dataMudanca: new Date(),
        usuarioId: userId || undefined,
      });

      await this.historicoRepository.save(historico);
      this.logger.log(`Histórico de localização registrado para patrimônio ${id} (via update)`);
    }

    try {
      const saved = await this.patrimonioRepository.save(patrimonio);
      return this.serializePatrimonio(saved);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === '23505') {
        throw new ConflictException('Código de patrimônio já existe');
      }
      throw error;
    }
  }

  /**
   * Remove patrimônio (soft delete)
   */
  async remove(id: string): Promise<void> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });
    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    await this.patrimonioRepository.softDelete(id);
  }

  /**
   * Cria múltiplos patrimônios
   */
  async createBulk(
    dtos: CreatePatrimonioDto[],
  ): Promise<PatrimonioResponseDto[]> {
    if (!dtos || dtos.length === 0) {
      throw new ConflictException('Nenhum patrimônio fornecido');
    }

    if (dtos.length > 100) {
      throw new ConflictException(
        'Máximo 100 patrimônios podem ser criados por vez',
      );
    }

    // Verificar códigos duplicados na entrada
    const codigos = dtos.map((dto) => dto.codigo);
    const uniqueCodigos = new Set(codigos);
    if (codigos.length !== uniqueCodigos.size) {
      throw new ConflictException('Códigos duplicados na requisição');
    }

    // Verificar se algum código já existe no banco
    const existingPatrimonios = await this.patrimonioRepository.find({
      where: codigos.map((codigo) => ({ codigo })),
    });

    if (existingPatrimonios.length > 0) {
      const existingCodigos = existingPatrimonios.map((p) => p.codigo);
      throw new ConflictException(
        `Códigos já existem: ${existingCodigos.join(', ')}`,
      );
    }

    try {
      const patrimonios = dtos.map((dto) =>
        this.patrimonioRepository.create({
          ...dto,
          dataAquisicao: dto.dataAquisicao
            ? new Date(dto.dataAquisicao)
            : undefined,
          dataGarantia: dto.dataGarantia
            ? new Date(dto.dataGarantia)
            : undefined,
        }),
      );

      const savedPatrimonios =
        await this.patrimonioRepository.save(patrimonios);
      return savedPatrimonios.map((patrimonio) =>
        this.serializePatrimonio(patrimonio),
      );
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === '23505') {
        throw new ConflictException('Um ou mais códigos já existem');
      }
      throw error;
    }
  }

  /**
   * Busca patrimônios por categoria
   */
  async findByCategoria(categoriaId: string): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: { categoriaId },
      order: { nome: 'ASC' },
    });
    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Busca patrimônios por responsável
   */
  async findByResponsavel(
    responsavelId: string,
  ): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: { responsavelId },
      order: { nome: 'ASC' },
    });
    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Estatísticas por categoria
   */
  async getStatsByCategoria(): Promise<Record<string, number>> {
    const result = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .leftJoin('patrimonio.categoria', 'categoria')
      .select('categoria.codigo', 'categoria')
      .addSelect('COUNT(*)', 'count')
      .groupBy('categoria.codigo')
      .getRawMany();

    return result.reduce(
      (stats, row) => {
        if (row.categoria) {
          stats[row.categoria] = parseInt(row.count);
        }
        return stats;
      },
      {} as Record<string, number>,
    );
  }

  /**
   * Estatísticas por status
   */
  async getStatsByStatus(): Promise<Record<string, number>> {
    const result = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patrimonio.status')
      .getRawMany();

    return result.reduce(
      (stats, row) => {
        stats[row.status] = parseInt(row.count);

        return stats;
      },
      {} as Record<string, number>,
    );
  }

  /**
   * Buscar patrimônios por status
   */
  async findByStatus(status: string): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: { status: status as any },
      relations: ['responsavel'],
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Obter valor total do patrimônio
   */
  async getValorTotal(): Promise<number> {
    const result = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('SUM(patrimonio.valorAquisicao)', 'total')
      .where('patrimonio.valorAquisicao IS NOT NULL')
      .getRawOne();

    return parseFloat(result.total) || 0;
  }

  /**
   * Obter patrimônios próximos do vencimento de garantia
   */
  async getPatrimoniosProximosVencimentoGarantia(
    dias: number = 30,
  ): Promise<PatrimonioResponseDto[]> {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);

    const patrimonios = await this.patrimonioRepository.find({
      where: {
        dataGarantia: Between(new Date(), dataLimite),
      },
      relations: ['responsavel'],
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Atualiza o status de um patrimônio
   */
  async updateStatus(
    id: string,
    dto: UpdateStatusPatrimonioDto,
  ): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Validar se o novo status é diferente do atual
    if (patrimonio.status === dto.status) {
      throw new BadRequestException(
        `O patrimônio já possui o status "${dto.status}"`,
      );
    }

    // Atualizar status e observações
    patrimonio.status = dto.status;
    if (dto.observacoes !== undefined) {
      patrimonio.observacoes = dto.observacoes;
    }

    const saved = await this.patrimonioRepository.save(patrimonio);
    return this.serializePatrimonio(saved);
  }

  /**
   * Transfere a responsabilidade de um patrimônio para outro usuário
   */
  async transferResponsavel(
    id: string,
    dto: TransferirResponsavelDto,
  ): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Validar se o novo responsável existe
    try {
      await this.usersService.findOne(dto.novoResponsavelId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(
        `Usuário com ID "${dto.novoResponsavelId}" não encontrado`,
      );
    }

    // Validar se o novo responsável é diferente do atual
    if (patrimonio.responsavelId === dto.novoResponsavelId) {
      throw new BadRequestException(
        'O patrimônio já está atribuído a este responsável',
      );
    }

    // Atualizar responsável e observações
    patrimonio.responsavelId = dto.novoResponsavelId;
    if (dto.observacoes !== undefined) {
      const observacoesAtuais = patrimonio.observacoes || '';
      const novaObservacao = dto.observacoes
        ? `${observacoesAtuais}\n[Transferência ${new Date().toISOString()}] ${dto.observacoes}`.trim()
        : observacoesAtuais;
      patrimonio.observacoes = novaObservacao;
    }

    const saved = await this.patrimonioRepository.save(patrimonio);
    return this.serializePatrimonio(saved);
  }

  /**
   * Obtém todas as métricas principais para o dashboard
   */
  async getDashboard(): Promise<PatrimonioDashboardResponseDto> {
    // Contar total de patrimônios (não deletados - TypeORM ignora soft deletes por padrão)
    const total = await this.patrimonioRepository.count();

    // Calcular valor total (soma de valorAquisicao)
    const valorTotalResult = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('SUM(patrimonio.valorAquisicao)', 'total')
      .where('patrimonio.valorAquisicao IS NOT NULL')
      .getRawOne();
    const valorTotal = parseFloat(valorTotalResult?.total || '0') || 0;

    // Agrupar por status (COUNT GROUP BY status)
    const porStatusResult = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patrimonio.status')
      .getRawMany();
    const porStatus = porStatusResult.reduce(
      (acc, row) => {
        acc[row.status] = parseInt(row.count, 10);
        return acc;
      },
      {} as Record<string, number>,
    );

    // Agrupar por categoria (COUNT GROUP BY categoriaId)
    const porCategoriaResult = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.categoriaId', 'categoriaId')
      .addSelect('COUNT(*)', 'count')
      .where('patrimonio.categoriaId IS NOT NULL')
      .groupBy('patrimonio.categoriaId')
      .getRawMany();
    const porCategoria = porCategoriaResult.reduce(
      (acc, row) => {
        acc[row.categoriaId] = parseInt(row.count, 10);
        return acc;
      },
      {} as Record<string, number>,
    );

    // Contar garantias vencendo (dataGarantia < hoje + 30 dias)
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + 30);
    const garantiasVencendo = await this.patrimonioRepository.count({
      where: {
        dataGarantia: LessThanOrEqual(dataLimite),
      } as any,
    });

    // Contar em manutenção (status = MANUTENCAO)
    const emManutencao = await this.patrimonioRepository.count({
      where: {
        status: 'MANUTENCAO' as any,
      } as any,
    });

    // Contar novos no último mês (dataAquisicao >= 30 dias atrás)
    const dataUltimoMes = new Date();
    dataUltimoMes.setDate(dataUltimoMes.getDate() - 30);
    const novosUltimoMes = await this.patrimonioRepository.count({
      where: {
        dataAquisicao: MoreThanOrEqual(dataUltimoMes),
      } as any,
    });

    return {
      total,
      valorTotal,
      porStatus,
      porCategoria,
      garantiasVencendo,
      emManutencao,
      novosUltimoMes,
    };
  }

  /**
   * Ativa um patrimônio (define status = ATIVO)
   */
  async ativar(id: string): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    if (patrimonio.status === PatrimonioStatus.ATIVO) {
      throw new BadRequestException('O patrimônio já está ativo');
    }

    patrimonio.status = PatrimonioStatus.ATIVO;
    const saved = await this.patrimonioRepository.save(patrimonio);
    return this.serializePatrimonio(saved);
  }

  /**
   * Desativa um patrimônio (define status = INATIVO)
   */
  async desativar(id: string): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    if (patrimonio.status === PatrimonioStatus.INATIVO) {
      throw new BadRequestException('O patrimônio já está inativo');
    }

    patrimonio.status = PatrimonioStatus.INATIVO;
    const saved = await this.patrimonioRepository.save(patrimonio);
    return this.serializePatrimonio(saved);
  }

  /**
   * Marca um patrimônio para descarte
   */
  async marcarDescarte(
    id: string,
    dto: DescartePatrimonioDto,
  ): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    patrimonio.status = PatrimonioStatus.DESCARTADO;
    const observacoesAtuais = patrimonio.observacoes || '';
    const novaObservacao = `[Descarte ${new Date().toISOString()}] Data: ${dto.dataDescarte}, Motivo: ${dto.motivoDescarte}${dto.destinoDescarte ? `, Destino: ${dto.destinoDescarte}` : ''}${observacoesAtuais ? `\n${observacoesAtuais}` : ''}`;
    patrimonio.observacoes = novaObservacao.trim();

    const saved = await this.patrimonioRepository.save(patrimonio);
    return this.serializePatrimonio(saved);
  }

  /**
   * Atualiza a localização de um patrimônio e registra no histórico
   */
  async updateLocalizacao(
    id: string,
    dto: UpdateLocalizacaoPatrimonioDto,
    userId?: string,
  ): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    const localizacaoAnterior = patrimonio.localizacao;
    const localizacaoNova = dto.localizacao;

    // Verificar se houve mudança real de localização
    if (localizacaoAnterior !== localizacaoNova) {
      // Registrar no histórico
      const historico = this.historicoRepository.create({
        patrimonioId: id,
        localizacaoAnterior: localizacaoAnterior || undefined,
        localizacaoNova: localizacaoNova,
        dataMudanca: new Date(),
        usuarioId: userId || undefined,
        observacoes: dto.observacoes || undefined,
      });

      await this.historicoRepository.save(historico);
      this.logger.log(`Histórico de localização registrado para patrimônio ${id}`);
    }

    patrimonio.localizacao = dto.localizacao;
    if (dto.observacoes !== undefined) {
      const observacoesAtuais = patrimonio.observacoes || '';
      const novaObservacao = dto.observacoes
        ? `${observacoesAtuais}\n[Mudança de localização ${new Date().toISOString()}] ${dto.observacoes}`.trim()
        : observacoesAtuais;
      patrimonio.observacoes = novaObservacao;
    }

    const saved = await this.patrimonioRepository.save(patrimonio);
    return this.serializePatrimonio(saved);
  }

  /**
   * Busca patrimônios por localização
   */
  async findByLocalizacao(
    localizacao: string,
  ): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: { localizacao: ILike(`%${localizacao}%`) },
      order: { nome: 'ASC' },
      relations: ['categoria', 'responsavel'],
    });
    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Obtém estatísticas agrupadas por localização
   */
  async getStatsLocalizacoes(): Promise<LocalizacoesStatsResponseDto> {
    const result = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.localizacao', 'localizacao')
      .addSelect('COUNT(*)', 'quantidade')
      .addSelect('SUM(patrimonio.valorAquisicao)', 'valorTotal')
      .where('patrimonio.localizacao IS NOT NULL')
      .groupBy('patrimonio.localizacao')
      .orderBy('quantidade', 'DESC')
      .getRawMany();

    const localizacoes: LocalizacaoStatsItemDto[] = result.map((row) => ({
      localizacao: row.localizacao,
      quantidade: parseInt(row.quantidade, 10),
      valorTotal: parseFloat(row.valorTotal || '0') || 0,
    }));

    return {
      localizacoes,
      totalLocalizacoes: localizacoes.length,
    };
  }

  /**
   * Obtém estatísticas por faixa de valor
   */
  async getStatsFaixaValor(
    intervalo: number = 1000,
  ): Promise<FaixaValorStatsResponseDto> {
    const result = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.valorAquisicao', 'valorAquisicao')
      .where('patrimonio.valorAquisicao IS NOT NULL')
      .getMany();

    const faixasMap = new Map<string, { quantidade: number; valorTotal: number }>();

    result.forEach((patrimonio) => {
      const valor = Number(patrimonio.valorAquisicao);
      const faixaIndex = Math.floor(valor / intervalo);
      const valorMinimo = faixaIndex * intervalo;
      const valorMaximo = (faixaIndex + 1) * intervalo;
      const faixaKey = `${valorMinimo}-${valorMaximo}`;

      if (!faixasMap.has(faixaKey)) {
        faixasMap.set(faixaKey, { quantidade: 0, valorTotal: 0 });
      }

      const faixa = faixasMap.get(faixaKey)!;
      faixa.quantidade += 1;
      faixa.valorTotal += valor;
    });

    const faixas: FaixaValorStatsItemDto[] = Array.from(faixasMap.entries())
      .map(([key, data]) => {
        const [valorMinimoStr, valorMaximoStr] = key.split('-');
        return {
          faixa: `${valorMinimoStr} - ${valorMaximoStr}`,
          valorMinimo: parseInt(valorMinimoStr, 10),
          valorMaximo: parseInt(valorMaximoStr, 10),
          quantidade: data.quantidade,
          valorTotal: data.valorTotal,
        };
      })
      .sort((a, b) => a.valorMinimo - b.valorMinimo);

    return {
      faixas,
      intervalo,
    };
  }

  /**
   * Obtém estatísticas por período de aquisição
   */
  async getStatsAquisicao(
    periodo: 'mensal' | 'trimestral' | 'anual' = 'mensal',
  ): Promise<AquisicaoStatsResponseDto> {
    let dateFormat: string;
    let dateTrunc: string;

    switch (periodo) {
      case 'mensal':
        dateFormat = 'YYYY-MM';
        dateTrunc = 'month';
        break;
      case 'trimestral':
        dateFormat = 'YYYY-Q';
        dateTrunc = 'quarter';
        break;
      case 'anual':
        dateFormat = 'YYYY';
        dateTrunc = 'year';
        break;
      default:
        dateFormat = 'YYYY-MM';
        dateTrunc = 'month';
    }

    const result = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select(`DATE_TRUNC('${dateTrunc}', patrimonio.dataAquisicao)`, 'periodo')
      .addSelect('COUNT(*)', 'quantidade')
      .addSelect('SUM(patrimonio.valorAquisicao)', 'valorTotal')
      .where('patrimonio.dataAquisicao IS NOT NULL')
      .groupBy('periodo')
      .orderBy('periodo', 'ASC')
      .getRawMany();

    const periodos: AquisicaoStatsItemDto[] = result.map((row) => {
      const date = new Date(row.periodo);
      let periodoStr = '';
      let dataInicial = '';
      let dataFinal = '';

      switch (periodo) {
        case 'mensal': {
          periodoStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          dataInicial = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;
          const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
          dataFinal = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(ultimoDia.getDate()).padStart(2, '0')}`;
          break;
        }
        case 'trimestral': {
          const trimestre = Math.floor(date.getMonth() / 3) + 1;
          periodoStr = `${date.getFullYear()}-Q${trimestre}`;
          const mesInicial = (trimestre - 1) * 3;
          dataInicial = `${date.getFullYear()}-${String(mesInicial + 1).padStart(2, '0')}-01`;
          const mesFinal = trimestre * 3;
          const ultimoDiaTrimestre = new Date(date.getFullYear(), mesFinal, 0);
          dataFinal = `${date.getFullYear()}-${String(mesFinal).padStart(2, '0')}-${String(ultimoDiaTrimestre.getDate()).padStart(2, '0')}`;
          break;
        }
        case 'anual':
          periodoStr = String(date.getFullYear());
          dataInicial = `${date.getFullYear()}-01-01`;
          dataFinal = `${date.getFullYear()}-12-31`;
          break;
      }

      return {
        periodo: periodoStr,
        dataInicial,
        dataFinal,
        quantidade: parseInt(row.quantidade, 10),
        valorTotal: parseFloat(row.valorTotal || '0') || 0,
      };
    });

    return {
      periodos,
      tipoPeriodo: periodo,
    };
  }

  /**
   * Obtém estatísticas de evolução temporal
   */
  async getStatsEvolucao(
    periodo: 'mensal' | 'trimestral' | 'anual' = 'mensal',
    ano?: number,
  ): Promise<EvolucaoStatsResponseDto> {
    const anoReferencia = ano || new Date().getFullYear();
    let dateTrunc: string;

    switch (periodo) {
      case 'mensal':
        dateTrunc = 'month';
        break;
      case 'trimestral':
        dateTrunc = 'quarter';
        break;
      case 'anual':
        dateTrunc = 'year';
        break;
      default:
        dateTrunc = 'month';
    }

    // Buscar todos os patrimônios ordenados por data de criação
    const patrimonios = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.createdAt', 'createdAt')
      .addSelect('patrimonio.valorAquisicao', 'valorAquisicao')
      .addSelect(`DATE_TRUNC('${dateTrunc}', patrimonio.createdAt)`, 'periodo')
      .where(`EXTRACT(YEAR FROM patrimonio.createdAt) = :ano`, { ano: anoReferencia })
      .orderBy('patrimonio.createdAt', 'ASC')
      .getRawMany();

    const evolucaoMap = new Map<string, { quantidade: number; valor: number }>();

    patrimonios.forEach((patrimonio) => {
      const periodoKey = new Date(patrimonio.periodo).toISOString().split('T')[0];
      if (!evolucaoMap.has(periodoKey)) {
        evolucaoMap.set(periodoKey, { quantidade: 0, valor: 0 });
      }
      const periodoData = evolucaoMap.get(periodoKey)!;
      periodoData.quantidade += 1;
      periodoData.valor += parseFloat(patrimonio.valorAquisicao || '0') || 0;
    });

    let quantidadeTotal = 0;
    let valorTotal = 0;

    const evolucao: EvolucaoStatsItemDto[] = Array.from(evolucaoMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([periodoKey, data]) => {
        quantidadeTotal += data.quantidade;
        valorTotal += data.valor;

        const date = new Date(periodoKey);
        let periodoStr = '';

        switch (periodo) {
          case 'mensal':
            periodoStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            break;
          case 'trimestral': {
            const trimestre = Math.floor(date.getMonth() / 3) + 1;
            periodoStr = `${date.getFullYear()}-Q${trimestre}`;
            break;
          }
          case 'anual':
            periodoStr = String(date.getFullYear());
            break;
        }

        return {
          periodo: periodoStr,
          quantidadeTotal,
          valorTotal,
          quantidadeAdicionada: data.quantidade,
          valorAdicionado: data.valor,
        };
      });

    return {
      evolucao,
      tipoPeriodo: periodo,
      ano: anoReferencia,
    };
  }

  /**
   * Exporta patrimônios para CSV
   */
  async exportToCsv(
    query: QueryPatrimonioDto,
    res: Response,
  ): Promise<void> {
         const patrimonios = await this.findAllWithFilters({
      ...query,
      limit: 10000, // Limite maior para exportação
      page: 1,
    });

    // Buscar patrimônios completos com relações para exportação
    const patrimoniosCompletos = await Promise.all(
      patrimonios.data.map(async (patrimonio) => {
        const completo = await this.patrimonioRepository.findOne({
          where: { id: patrimonio.id },
          relations: ['categoria', 'responsavel'],
        });
        return completo ? this.serializePatrimonio(completo) : patrimonio;
      }),
    );

    const headers = [
      'Código',
      'Nome',
      'Descrição',
      'Categoria',
      'Status',
      'Valor de Aquisição',
      'Data de Aquisição',
      'Data de Garantia',
      'Número de Série',
      'Modelo',
      'Marca',
      'Localização',
      'Responsável',
      'Observações',
    ];

    const rows = patrimoniosCompletos.map((patrimonio) => [
      patrimonio.codigo || '',
      patrimonio.nome || '',
      patrimonio.descricao || '',
      patrimonio.categoria?.nome || '',
      patrimonio.status || '',
      patrimonio.valorAquisicao?.toString() || '',
      patrimonio.dataAquisicao ? new Date(patrimonio.dataAquisicao).toISOString().split('T')[0] : '',
      patrimonio.dataGarantia ? new Date(patrimonio.dataGarantia).toISOString().split('T')[0] : '',
      patrimonio.numeroSerie || '',
      patrimonio.modelo || '',
      patrimonio.marca || '',
      patrimonio.localizacao || '',
      patrimonio.responsavel?.name || '',
      patrimonio.observacoes || '',
    ]);

    // Quando passamos arrays, não podemos usar header: true sem especificar colunas
    // Como já incluímos o header manualmente, apenas passamos os dados
    // Sempre incluir headers, mesmo se não houver dados
    // Passar opções explícitas para evitar detecção automática de headers
    let csvData: string;
    if (rows.length > 0) {
      csvData = stringify([headers, ...rows], { header: false });
    } else {
      // Quando não há dados, gerar CSV manualmente apenas com headers
      // Isso evita problemas com csv-stringify quando não há dados
      const bom = '\ufeff';
      const headerLine = headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(',');
      csvData = bom + headerLine + '\n';
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=patrimonios-${new Date().toISOString().split('T')[0]}.csv`,
    );
    res.send(csvData);
  }

  /**
   * Exporta patrimônios para Excel
   */
  async exportToExcel(
    query: QueryPatrimonioDto,
    res: Response,
  ): Promise<void> {
    const patrimonios = await this.findAllWithFilters({
      ...query,
      limit: 10000, // Limite maior para exportação
      page: 1,
    });

    // Buscar patrimônios completos com relações para exportação
    const patrimoniosCompletos = await Promise.all(
      patrimonios.data.map(async (patrimonio) => {
        const completo = await this.patrimonioRepository.findOne({
          where: { id: patrimonio.id },
          relations: ['categoria', 'responsavel'],
        });
        return completo ? this.serializePatrimonio(completo) : patrimonio;
      }),
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Patrimônios');

    worksheet.columns = [
      { header: 'Código', key: 'codigo', width: 15 },
      { header: 'Nome', key: 'nome', width: 30 },
      { header: 'Descrição', key: 'descricao', width: 40 },
      { header: 'Categoria', key: 'categoria', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Valor de Aquisição', key: 'valorAquisicao', width: 18 },
      { header: 'Data de Aquisição', key: 'dataAquisicao', width: 18 },
      { header: 'Data de Garantia', key: 'dataGarantia', width: 18 },
      { header: 'Número de Série', key: 'numeroSerie', width: 20 },
      { header: 'Modelo', key: 'modelo', width: 20 },
      { header: 'Marca', key: 'marca', width: 15 },
      { header: 'Localização', key: 'localizacao', width: 25 },
      { header: 'Responsável', key: 'responsavel', width: 25 },
      { header: 'Observações', key: 'observacoes', width: 40 },
    ];

    patrimoniosCompletos.forEach((patrimonio) => {
      worksheet.addRow({
        codigo: patrimonio.codigo || '',
        nome: patrimonio.nome || '',
        descricao: patrimonio.descricao || '',
        categoria: patrimonio.categoria?.nome || '',
        status: patrimonio.status || '',
        valorAquisicao: patrimonio.valorAquisicao || 0,
        dataAquisicao: patrimonio.dataAquisicao ? new Date(patrimonio.dataAquisicao).toISOString().split('T')[0] : '',
        dataGarantia: patrimonio.dataGarantia ? new Date(patrimonio.dataGarantia).toISOString().split('T')[0] : '',
        numeroSerie: patrimonio.numeroSerie || '',
        modelo: patrimonio.modelo || '',
        marca: patrimonio.marca || '',
        localizacao: patrimonio.localizacao || '',
        responsavel: patrimonio.responsavel?.name || '',
        observacoes: patrimonio.observacoes || '',
      });
    });

    // Estilizar cabeçalho
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=patrimonios-${new Date().toISOString().split('T')[0]}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  }

  /**
   * Gera relatório de inventário
   */
  async gerarRelatorioInventario(
    query: QueryPatrimonioDto & { formato?: 'pdf' | 'csv' | 'excel' },
    res: Response,
  ): Promise<void> {
    const formato = query.formato || 'csv';

    switch (formato) {
      case 'csv':
        await this.exportToCsv(query, res);
        break;
      case 'excel':
        await this.exportToExcel(query, res);
        break;
      case 'pdf':
        // PDF requer biblioteca adicional como pdfkit ou puppeteer
        // Por enquanto, retornamos erro informando que não está implementado
        throw new BadRequestException(
          'Exportação para PDF ainda não está implementada. Use CSV ou Excel.',
        );
      default:
        await this.exportToCsv(query, res);
    }
  }

  // ==================== FASE 3: BUSCAS AVANÇADAS ====================

  /**
   * Busca patrimônio por número de série
   */
  async findByNumeroSerie(numeroSerie: string): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { numeroSerie },
      relations: ['categoria', 'responsavel'],
    });

    if (!patrimonio) {
      throw new NotFoundException(
        `Patrimônio com número de série "${numeroSerie}" não encontrado`,
      );
    }

    return this.serializePatrimonio(patrimonio);
  }

  /**
   * Busca patrimônios por intervalo de data de aquisição
   */
  async findByAquisicaoPeriodo(
    dto: QueryAquisicaoPeriodoDto,
  ): Promise<PatrimonioResponseDto[]> {
    const dataInicial = new Date(dto.dataInicial);
    const dataFinal = new Date(dto.dataFinal);

    if (dataInicial > dataFinal) {
      throw new BadRequestException(
        'Data inicial deve ser anterior ou igual à data final',
      );
    }

    const patrimonios = await this.patrimonioRepository.find({
      where: {
        dataAquisicao: Between(dataInicial, dataFinal),
      },
      relations: ['categoria', 'responsavel'],
      order: { dataAquisicao: 'ASC' },
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Busca patrimônios por intervalo de valor
   */
  async findByValorRange(
    dto: QueryValorRangeDto,
  ): Promise<PatrimonioResponseDto[]> {
    if (dto.valorMinimo > dto.valorMaximo) {
      throw new BadRequestException(
        'Valor mínimo deve ser menor ou igual ao valor máximo',
      );
    }

    const patrimonios = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .leftJoinAndSelect('patrimonio.categoria', 'categoria')
      .leftJoinAndSelect('patrimonio.responsavel', 'responsavel')
      .where('patrimonio.valorAquisicao >= :valorMinimo', {
        valorMinimo: dto.valorMinimo,
      })
      .andWhere('patrimonio.valorAquisicao <= :valorMaximo', {
        valorMaximo: dto.valorMaximo,
      })
      .orderBy('patrimonio.valorAquisicao', 'ASC')
      .getMany();

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Busca patrimônios por múltiplos status
   */
  async findByStatusMultiplos(
    dto: QueryStatusMultiplosDto,
  ): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: {
        status: In(dto.status),
      },
      relations: ['categoria', 'responsavel'],
      order: { nome: 'ASC' },
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Busca patrimônios por múltiplas categorias
   */
  async findByCategoriasMultiplas(
    dto: QueryCategoriasMultiplasDto,
  ): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: {
        categoriaId: In(dto.categoriaIds),
      },
      relations: ['categoria', 'responsavel'],
      order: { nome: 'ASC' },
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  // ==================== FASE 3: OPERAÇÕES EM LOTE ====================

  /**
   * Cria múltiplos patrimônios em lote (com transação)
   */
  async createBulkWithTransaction(
    dto: CreateBulkPatrimonioDto,
  ): Promise<BulkResponseDto> {
    const sucessos: PatrimonioResponseDto[] = [];
    const erros: Array<{ index: number; codigo?: string; erro: string }> = [];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < dto.patrimonios.length; i++) {
        const patrimonioDto = dto.patrimonios[i];
        try {
          // Verificar se código já existe
          const existing = await queryRunner.manager.findOne(Patrimonio, {
            where: { codigo: patrimonioDto.codigo },
          });

          if (existing) {
            erros.push({
              index: i,
              codigo: patrimonioDto.codigo,
              erro: 'Código já existe',
            });
            continue;
          }

          // Criar patrimônio
          const patrimonio = queryRunner.manager.create(Patrimonio, {
            ...patrimonioDto,
            dataAquisicao: patrimonioDto.dataAquisicao
              ? new Date(patrimonioDto.dataAquisicao)
              : undefined,
            dataGarantia: patrimonioDto.dataGarantia
              ? new Date(patrimonioDto.dataGarantia)
              : undefined,
          });

          const saved = await queryRunner.manager.save(patrimonio);
          sucessos.push(this.serializePatrimonio(saved));
        } catch (error: any) {
          erros.push({
            index: i,
            codigo: patrimonioDto.codigo,
            erro: error?.message || 'Erro desconhecido',
          });
        }
      }

      await queryRunner.commitTransaction();

      return {
        sucessos,
        erros,
        totalSucessos: sucessos.length,
        totalErros: erros.length,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Atualiza múltiplos patrimônios em lote
   */
  async updateBulk(
    dto: UpdateBulkPatrimonioDto,
  ): Promise<{ atualizados: number }> {
    // Verificar se todos os IDs existem
    const patrimonios = await this.patrimonioRepository.find({
      where: { id: In(dto.ids) },
    });

    if (patrimonios.length !== dto.ids.length) {
      const encontrados = patrimonios.map((p) => p.id);
      const naoEncontrados = dto.ids.filter((id) => !encontrados.includes(id));
      throw new NotFoundException(
        `Patrimônios não encontrados: ${naoEncontrados.join(', ')}`,
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const patrimonio of patrimonios) {
        Object.assign(patrimonio, {
          ...dto.dados,
          dataAquisicao: dto.dados.dataAquisicao
            ? new Date(dto.dados.dataAquisicao)
            : undefined,
          dataGarantia: dto.dados.dataGarantia
            ? new Date(dto.dados.dataGarantia)
            : undefined,
        });
        await queryRunner.manager.save(patrimonio);
      }

      await queryRunner.commitTransaction();

      return { atualizados: patrimonios.length };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Transfere múltiplos patrimônios para o mesmo responsável
   */
  async transferResponsavelBulk(
    dto: TransferirResponsavelBulkDto,
  ): Promise<{ transferidos: number }> {
    // Verificar se todos os IDs existem
    const patrimonios = await this.patrimonioRepository.find({
      where: { id: In(dto.ids) },
    });

    if (patrimonios.length !== dto.ids.length) {
      const encontrados = patrimonios.map((p) => p.id);
      const naoEncontrados = dto.ids.filter((id) => !encontrados.includes(id));
      throw new NotFoundException(
        `Patrimônios não encontrados: ${naoEncontrados.join(', ')}`,
      );
    }

    // Verificar se novo responsável existe
    try {
      await this.usersService.findOne(dto.novoResponsavelId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Usuário com ID "${dto.novoResponsavelId}" não encontrado`,
        );
      }
      throw error;
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const patrimonio of patrimonios) {
        patrimonio.responsavelId = dto.novoResponsavelId;
        if (dto.observacoes) {
          const observacoesAtuais = patrimonio.observacoes || '';
          const novaObservacao = `${observacoesAtuais}\n[Transferência em lote ${new Date().toISOString()}] ${dto.observacoes}`.trim();
          patrimonio.observacoes = novaObservacao;
        }
        await queryRunner.manager.save(patrimonio);
      }

      await queryRunner.commitTransaction();

      return { transferidos: patrimonios.length };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // ==================== FASE 3: VALIDAÇÕES ====================

  /**
   * Valida se um código está disponível
   */
  async validarCodigo(codigo: string): Promise<ValidarCodigoResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { codigo: codigo.toUpperCase() },
    });

    return {
      disponivel: !patrimonio,
    };
  }

  /**
   * Verifica duplicidade de patrimônios
   */
  async verificarDuplicidade(
    dto: VerificarDuplicidadeDto,
  ): Promise<DuplicataResponseDto> {
    const where: FindOptionsWhere<Patrimonio> = {};

    if (dto.numeroSerie) {
      where.numeroSerie = dto.numeroSerie;
    }
    if (dto.modelo) {
      where.modelo = dto.modelo;
    }
    if (dto.marca) {
      where.marca = dto.marca;
    }

    if (Object.keys(where).length === 0) {
      throw new BadRequestException(
        'Deve informar pelo menos um campo (numeroSerie, modelo ou marca)',
      );
    }

    const patrimonios = await this.patrimonioRepository.find({
      where,
      relations: ['categoria', 'responsavel'],
    });

    return {
      duplicatas: patrimonios.map((p) => this.serializePatrimonio(p)),
      total: patrimonios.length,
    };
  }

  /**
   * Verifica disponibilidade de um patrimônio
   */
  async verificarDisponibilidade(
    id: string,
  ): Promise<DisponibilidadeResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Verificar se está em manutenção
    if (patrimonio.status === PatrimonioStatus.MANUTENCAO) {
      return {
        disponivel: false,
        motivo: 'Patrimônio em manutenção',
      };
    }

    // Verificar se foi descartado
    if (patrimonio.status === PatrimonioStatus.DESCARTADO) {
      return {
        disponivel: false,
        motivo: 'Patrimônio descartado',
      };
    }

    // Verificar se está inativo
    if (patrimonio.status !== PatrimonioStatus.ATIVO) {
      return {
        disponivel: false,
        motivo: `Patrimônio está com status: ${patrimonio.status}`,
      };
    }

    return {
      disponivel: true,
    };
  }

  // ==================== FASE 3: ALERTAS ====================

  /**
   * Busca patrimônios com garantia expirada
   */
  async findGarantiaExpirada(
    dias: number = 0,
  ): Promise<PatrimonioResponseDto[]> {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    const patrimonios = await this.patrimonioRepository.find({
      where: {
        dataGarantia: LessThanOrEqual(dataLimite),
      },
      relations: ['categoria', 'responsavel'],
      order: { dataGarantia: 'ASC' },
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Busca patrimônios com garantia vencendo em breve
   */
  async findGarantiaVencendo(
    dias: number = 30,
  ): Promise<PatrimonioResponseDto[]> {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);
    dataLimite.setHours(23, 59, 59, 999);

    const patrimonios = await this.patrimonioRepository.find({
      where: {
        dataGarantia: Between(hoje, dataLimite),
      },
      relations: ['categoria', 'responsavel'],
      order: { dataGarantia: 'ASC' },
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Busca patrimônios em manutenção prolongada
   */
  async findManutencaoProlongada(
    dias: number = 90,
  ): Promise<PatrimonioResponseDto[]> {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);

    const patrimonios = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .leftJoinAndSelect('patrimonio.categoria', 'categoria')
      .leftJoinAndSelect('patrimonio.responsavel', 'responsavel')
      .where('patrimonio.status = :status', {
        status: PatrimonioStatus.MANUTENCAO,
      })
      .andWhere('patrimonio.updated_at <= :dataLimite', { dataLimite })
      .orderBy('patrimonio.updated_at', 'ASC')
      .getMany();

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Busca patrimônios sem responsável
   */
  async findSemResponsavel(): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: {
        responsavelId: null as any,
      },
      relations: ['categoria'],
      order: { nome: 'ASC' },
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  // ==================== FASE 3: HISTÓRICO ====================

  /**
   * Obtém histórico de alterações de um patrimônio
   * Nota: Integra com módulo de auditoria se disponível
   */
  async getHistorico(
    id: string,
  ): Promise<HistoricoAlteracaoResponseDto> {
    // Verificar se patrimônio existe
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Por enquanto, retornar histórico básico baseado em updatedAt
    // Em produção, isso deve integrar com o módulo de auditoria
    const historico: HistoricoAlteracaoItemDto[] = [];

    if (patrimonio.updatedAt) {
      historico.push({
        data: patrimonio.updatedAt,
        campo: 'updatedAt',
        acao: 'UPDATE',
      });
    }

    if (patrimonio.createdAt) {
      historico.push({
        data: patrimonio.createdAt,
        campo: 'createdAt',
        acao: 'CREATE',
      });
    }

    return {
      patrimonioId: id,
      historico: historico.sort((a, b) => b.data.getTime() - a.data.getTime()),
      total: historico.length,
    };
  }

  /**
   * Obtém histórico de responsáveis de um patrimônio
   */
  async getHistoricoResponsaveis(
    id: string,
  ): Promise<HistoricoResponsaveisResponseDto> {
    // Verificar se patrimônio existe
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
      relations: ['responsavel'],
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    const responsaveis: HistoricoResponsavelItemDto[] = [];

    // Se tem responsável atual, adicionar ao histórico
    if (patrimonio.responsavelId && patrimonio.responsavel) {
      responsaveis.push({
        responsavelId: patrimonio.responsavelId,
        responsavelNome: patrimonio.responsavel.name || undefined,
        dataInicio: patrimonio.createdAt,
        observacoes: patrimonio.observacoes || undefined,
      });
    }

    // Nota: Em produção, isso deve buscar histórico de transferências do módulo de auditoria

    return {
      patrimonioId: id,
      responsaveis,
      total: responsaveis.length,
    };
  }

  /**
   * Obtém histórico de patrimônios por responsável
   */
  async getHistoricoPorResponsavel(
    responsavelId: string,
  ): Promise<PatrimonioResponseDto[]> {
    // Verificar se responsável existe
    try {
      await this.usersService.findOne(responsavelId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Usuário com ID "${responsavelId}" não encontrado`,
        );
      }
      throw error;
    }

    // Buscar patrimônios atuais do responsável
    const patrimonios = await this.patrimonioRepository.find({
      where: { responsavelId },
      relations: ['categoria'],
      order: { nome: 'ASC' },
    });

    return patrimonios.map((patrimonio) =>
      this.serializePatrimonio(patrimonio),
    );
  }

  /**
   * Faz upload de foto para um patrimônio
   */
  async uploadFoto(
    id: string,
    file: Express.Multer.File,
  ): Promise<PatrimonioResponseDto> {
    // Verificar se patrimônio existe
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Se já existe foto, remover a anterior
    if (patrimonio.fotoUrl) {
      await this.storageService.deleteFile(patrimonio.fotoUrl);
    }

    // Salvar nova foto
    const fileResult = await this.storageService.saveFile(file, id);

    // Atualizar patrimônio
    patrimonio.fotoUrl = fileResult.url;
    const updatedPatrimonio = await this.patrimonioRepository.save(patrimonio);

    this.logger.log(`Foto uploadada para patrimônio ${id}: ${fileResult.url}`);

    return this.serializePatrimonio(updatedPatrimonio);
  }

  /**
   * Remove foto de um patrimônio
   */
  async removeFoto(id: string): Promise<PatrimonioResponseDto> {
    // Verificar se patrimônio existe
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Remover arquivo do storage
    if (patrimonio.fotoUrl) {
      await this.storageService.deleteFile(patrimonio.fotoUrl);
    }

    // Limpar fotoUrl (usar null para compatibilidade com TypeORM)
    (patrimonio as any).fotoUrl = null;
    const updatedPatrimonio = await this.patrimonioRepository.save(patrimonio);

    this.logger.log(`Foto removida do patrimônio ${id}`);

    return this.serializePatrimonio(updatedPatrimonio);
  }

  /**
   * Lista patrimônios que possuem foto
   */
  async findAllWithFoto(
    query: QueryPatrimonioDto,
  ): Promise<PaginatedPatrimonioResponseDto> {
    // Criar query builder com filtro para fotoUrl não nulo
    const queryBuilder = this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .where('patrimonio.fotoUrl IS NOT NULL')
      .andWhere('patrimonio.fotoUrl != :empty', { empty: '' });

    // Aplicar os mesmos filtros do findAllWithFilters
    const {
      page = 1,
      limit = 10,
      q,
      categoriaId,
      status,
      marca,
      modelo,
      localizacao,
      responsavelId,
      valorMinimo,
      valorMaximo,
      dataInicial,
      dataFinal,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    // Aplicar filtros
    if (q) {
      const searchText = `%${this.normalizeSearchText(q)}%`;
      queryBuilder.andWhere(
        '(LOWER(patrimonio.codigo) LIKE LOWER(:search) OR LOWER(patrimonio.nome) LIKE LOWER(:search) OR LOWER(patrimonio.descricao) LIKE LOWER(:search))',
        { search: searchText },
      );
    }

    if (categoriaId) {
      queryBuilder.andWhere('patrimonio.categoriaId = :categoriaId', { categoriaId });
    }

    if (status) {
      queryBuilder.andWhere('patrimonio.status = :status', { status });
    }

    if (marca) {
      queryBuilder.andWhere('LOWER(patrimonio.marca) LIKE LOWER(:marca)', {
        marca: `%${marca}%`,
      });
    }

    if (modelo) {
      queryBuilder.andWhere('LOWER(patrimonio.modelo) LIKE LOWER(:modelo)', {
        modelo: `%${modelo}%`,
      });
    }

    if (localizacao) {
      queryBuilder.andWhere('LOWER(patrimonio.localizacao) LIKE LOWER(:localizacao)', {
        localizacao: `%${localizacao}%`,
      });
    }

    if (responsavelId) {
      queryBuilder.andWhere('patrimonio.responsavelId = :responsavelId', { responsavelId });
    }

    if (valorMinimo !== undefined) {
      queryBuilder.andWhere('patrimonio.valorAquisicao >= :valorMinimo', { valorMinimo });
    }

    if (valorMaximo !== undefined) {
      queryBuilder.andWhere('patrimonio.valorAquisicao <= :valorMaximo', { valorMaximo });
    }

    if (dataInicial) {
      queryBuilder.andWhere('patrimonio.dataAquisicao >= :dataInicial', {
        dataInicial,
      });
    }

    if (dataFinal) {
      queryBuilder.andWhere('patrimonio.dataAquisicao <= :dataFinal', {
        dataFinal,
      });
    }

    // Aplicar ordenação
    const validSortFields = ['nome', 'codigo', 'createdAt', 'updatedAt', 'valorAquisicao', 'dataAquisicao'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    queryBuilder.orderBy(`patrimonio.${sortField}`, order);

    // Contar total
    const total = await queryBuilder.getCount();

    // Aplicar paginação
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Carregar relações necessárias
    queryBuilder.leftJoinAndSelect('patrimonio.categoria', 'categoria');
    queryBuilder.leftJoinAndSelect('patrimonio.responsavel', 'responsavel');

    // Executar query
    const patrimonios = await queryBuilder.getMany();

    const totalPages = Math.ceil(total / limit);
    return {
      data: patrimonios.map((p) => this.serializePatrimonio(p)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  /**
   * Obtém estatísticas de patrimônios por responsável
   */
  async getStatsByResponsavel(responsavelId: string): Promise<ResponsavelStatsResponseDto> {
    // Verificar se responsável existe
    try {
      await this.usersService.findOne(responsavelId);
    } catch (error) {
      throw new NotFoundException(`Responsável com ID "${responsavelId}" não encontrado`);
    }

    // Buscar todos os patrimônios do responsável
    const patrimonios = await this.patrimonioRepository.find({
      where: { responsavelId },
      relations: ['categoria'],
    });

    // Calcular estatísticas
    const total = patrimonios.length;
    const valorTotal = patrimonios.reduce((sum, p) => sum + (parseFloat(String(p.valorAquisicao || 0)) || 0), 0);

    // Agrupar por categoria
    const porCategoria: Record<string, number> = {};
    patrimonios.forEach((p) => {
      const categoriaNome = p.categoria?.nome || 'SEM_CATEGORIA';
      porCategoria[categoriaNome] = (porCategoria[categoriaNome] || 0) + 1;
    });

    // Agrupar por status
    const porStatus: Record<string, number> = {};
    patrimonios.forEach((p) => {
      porStatus[p.status] = (porStatus[p.status] || 0) + 1;
    });

    return {
      responsavelId,
      total,
      valorTotal,
      porCategoria,
      porStatus,
    };
  }

  /**
   * Obtém estatísticas agrupadas por marca e modelo
   */
  async getStatsByMarcaModelo(): Promise<MarcaModeloStatsResponseDto> {
    // Buscar todos os patrimônios com marca e modelo usando QueryBuilder
    const patrimonios = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .where('patrimonio.marca IS NOT NULL')
      .andWhere('patrimonio.marca != :empty', { empty: '' })
      .andWhere('patrimonio.modelo IS NOT NULL')
      .andWhere('patrimonio.modelo != :empty2', { empty2: '' })
      .getMany();

    // Filtrar apenas os que têm marca E modelo (já filtrado na query, mas garantindo)
    const patrimoniosComMarcaModelo = patrimonios.filter(
      (p) => p.marca && p.modelo && p.marca.trim() !== '' && p.modelo.trim() !== '',
    );

    // Agrupar por marca/modelo
    const statsMap = new Map<string, { quantidade: number; valorTotal: number }>();

    patrimoniosComMarcaModelo.forEach((p) => {
      const key = `${p.marca}|||${p.modelo}`;
      if (!statsMap.has(key)) {
        statsMap.set(key, { quantidade: 0, valorTotal: 0 });
      }
      const stats = statsMap.get(key)!;
      stats.quantidade += 1;
      stats.valorTotal += parseFloat(String(p.valorAquisicao || 0)) || 0;
    });

    // Converter para array de DTOs
    const itens: MarcaModeloStatsItemDto[] = Array.from(statsMap.entries()).map(([key, stats]) => {
      const [marca, modelo] = key.split('|||');
      return {
        marca,
        modelo,
        quantidade: stats.quantidade,
        valorTotal: stats.valorTotal,
      };
    });

    // Calcular total geral
    const valorTotalGeral = itens.reduce((sum, item) => sum + item.valorTotal, 0);

    return {
      itens,
      total: itens.length,
      valorTotalGeral,
    };
  }

  /**
   * Obtém os patrimônios mais valiosos
   */
  async getTopValiosos(query: TopValiososQueryDto): Promise<PatrimonioResponseDto[]> {
    const limit = query.limit || 10;

    // Buscar patrimônios ordenados por valor de aquisição usando QueryBuilder
    const patrimonios = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .where('patrimonio.valorAquisicao IS NOT NULL')
      .orderBy('patrimonio.valorAquisicao', 'DESC')
      .leftJoinAndSelect('patrimonio.categoria', 'categoria')
      .leftJoinAndSelect('patrimonio.responsavel', 'responsavel')
      .take(limit)
      .getMany();

    return patrimonios.map((p) => this.serializePatrimonio(p));
  }

  /**
   * Obtém patrimônios adquiridos recentemente
   */
  async getNovos(query: NovosQueryDto): Promise<PatrimonioResponseDto[]> {
    const dias = query.dias || 30;
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);
    dataLimite.setHours(0, 0, 0, 0); // Zerar horas para comparação de data

    // Buscar patrimônios adquiridos nos últimos X dias usando QueryBuilder
    const patrimonios = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .where('patrimonio.dataAquisicao IS NOT NULL')
      .andWhere('patrimonio.dataAquisicao >= :dataLimite', { dataLimite })
      .orderBy('patrimonio.dataAquisicao', 'DESC')
      .leftJoinAndSelect('patrimonio.categoria', 'categoria')
      .leftJoinAndSelect('patrimonio.responsavel', 'responsavel')
      .getMany();

    return patrimonios.map((p) => this.serializePatrimonio(p));
  }

  /**
   * Obtém histórico de localizações de um patrimônio
   */
  async getHistoricoLocalizacoes(id: string): Promise<HistoricoLocalizacoesResponseDto> {
    // Verificar se patrimônio existe
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Buscar histórico ordenado por data de mudança (mais recente primeiro)
    const historico = await this.historicoRepository.find({
      where: { patrimonioId: id },
      order: { dataMudanca: 'DESC' },
      relations: ['usuario'],
    });

    // Converter para DTO
    const historicoItems: HistoricoLocalizacaoItemDto[] = historico.map((h) => ({
      id: h.id,
      localizacaoAnterior: h.localizacaoAnterior,
      localizacaoNova: h.localizacaoNova,
      dataMudanca: h.dataMudanca,
      usuarioId: h.usuarioId,
      observacoes: h.observacoes,
    }));

    return {
      patrimonioId: id,
      historico: historicoItems,
      total: historicoItems.length,
    };
  }

  /**
   * Deleta múltiplos patrimônios em lote (soft delete)
   */
  async deleteBulk(dto: DeleteBulkPatrimonioDto): Promise<DeleteBulkResponseDto> {
    if (!dto.ids || dto.ids.length === 0) {
      throw new BadRequestException('IDs não fornecidos');
    }

    if (dto.ids.length > 100) {
      throw new BadRequestException('Máximo de 100 patrimônios podem ser deletados por vez');
    }

    // Remover IDs duplicados
    const idsUnicos = [...new Set(dto.ids)];

    // Buscar patrimônios existentes
    const patrimonios = await this.patrimonioRepository.find({
      where: idsUnicos.map((id) => ({ id })),
    });

    const idsEncontrados = patrimonios.map((p) => p.id);
    const idsNaoEncontrados = idsUnicos.filter((id) => !idsEncontrados.includes(id));

    if (patrimonios.length === 0) {
      return {
        deletados: 0,
        naoEncontrados: idsNaoEncontrados.length,
        idsDeletados: [],
        idsNaoEncontrados,
      };
    }

    // Soft delete usando TypeORM (define deletedAt)
    await this.patrimonioRepository.softRemove(patrimonios);

    this.logger.log(`Deletados ${patrimonios.length} patrimônios em lote`);

    return {
      deletados: patrimonios.length,
      naoEncontrados: idsNaoEncontrados.length,
      idsDeletados: idsEncontrados,
      idsNaoEncontrados,
    };
  }
}
