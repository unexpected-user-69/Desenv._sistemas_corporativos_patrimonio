import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike, Between, FindOptionsWhere } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Patrimonio } from './entities/patrimonio.entity';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { PatrimonioResponseDto } from './dto/patrimonio-response.dto';
import { QueryPatrimonioDto } from './dto/query-patrimonio.dto';
import { PaginatedPatrimonioResponseDto } from './dto/paginated-patrimonio-response.dto';

@Injectable()
export class PatrimonioService {
  private readonly logger = new Logger(PatrimonioService.name);

  constructor(
    @InjectRepository(Patrimonio)
    private readonly patrimonioRepository: Repository<Patrimonio>,
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
  ): Promise<PatrimonioResponseDto> {
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
}
