import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike, Between } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Patrimonio } from './entities/patrimonio.entity';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { PatrimonioResponseDto } from './dto/patrimonio-response.dto';
import { QueryPatrimonioDto } from './dto/query-patrimonio.dto';
import { PaginatedPatrimonioResponseDto } from './dto/paginated-patrimonio-response.dto';

@Injectable()
export class PatrimonioService {
  constructor(
    @InjectRepository(Patrimonio)
    private readonly patrimonioRepository: Repository<Patrimonio>,
  ) {}

  /**
   * Serializa Patrimonio para PatrimonioResponseDto usando class-transformer
   */
  private serializePatrimonio(patrimonio: Patrimonio): PatrimonioResponseDto {
    return plainToClass(PatrimonioResponseDto, patrimonio, {
      excludeExtraneousValues: true,
    });
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
      categoria,
      status,
      marca,
      localizacao,
      responsavelId,
      valorMin,
      valorMax,
      dataInicio,
      dataFim,
      sortBy = 'nome',
      sortOrder = 'ASC',
    } = query;

    const skip = (page - 1) * limit;
    const where: any = {};

    // Busca textual
    if (q) {
      const searchText = this.normalizeSearchText(q);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.$or = [
        { nome: ILike(`%${searchText}%`) },
        { codigo: ILike(`%${searchText}%`) },
        { descricao: ILike(`%${searchText}%`) },
        { marca: ILike(`%${searchText}%`) },
        { modelo: ILike(`%${searchText}%`) },
      ];
    }

    // Filtros específicos
    if (categoria) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.categoria = categoria;
    }
    if (status) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.status = status;
    }
    if (marca) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.marca = ILike(`%${marca}%`);
    }
    if (localizacao) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.localizacao = ILike(`%${localizacao}%`);
    }
    if (responsavelId) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.responsavelId = responsavelId;
    }

    // Filtros de valor
    if (valorMin !== undefined || valorMax !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.valorAquisicao = Between(
        valorMin ?? 0,
        valorMax ?? Number.MAX_SAFE_INTEGER,
      );
    }

    // Filtros de data
    if (dataInicio || dataFim) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      where.dataAquisicao = Between(
        dataInicio ? new Date(dataInicio) : new Date('1900-01-01'),
        dataFim ? new Date(dataFim) : new Date(),
      );
    }

    const findOptions: FindManyOptions<Patrimonio> = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where,
      skip,
      take: limit,
      order: { [sortBy]: sortOrder },
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
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { codigo: codigo.toUpperCase() },
    });
    if (!patrimonio) {
      throw new NotFoundException(
        `Patrimônio com código "${codigo}" não encontrado`,
      );
    }
    return this.serializePatrimonio(patrimonio);
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
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === '23505') {
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
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === '23505') {
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
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === '23505') {
        throw new ConflictException('Um ou mais códigos já existem');
      }
      throw error;
    }
  }

  /**
   * Busca patrimônios por categoria
   */
  async findByCategoria(categoria: string): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { categoria: categoria as any },
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
      .select('patrimonio.categoria', 'categoria')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patrimonio.categoria')
      .getRawMany();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.reduce(
      (stats, row) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        stats[row.categoria] = parseInt(row.count);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result.reduce(
      (stats, row) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
        stats[row.status] = parseInt(row.count);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return stats;
      },
      {} as Record<string, number>,
    );
  }
}
