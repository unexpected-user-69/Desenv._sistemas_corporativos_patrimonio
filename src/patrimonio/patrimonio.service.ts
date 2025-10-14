import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Between, FindManyOptions } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Patrimonio, PatrimonioStatus, PatrimonioCategoria } from './entities/patrimonio.entity';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { PatrimonioResponseDto } from './dto/patrimonio-response.dto';
import { FilterPatrimoniosDto } from './dto/filter-patrimonios.dto';
import { PaginatedPatrimoniosResponseDto } from './dto/paginated-patrimonios-response.dto';

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
   * Cria um novo patrimônio
   */
  async create(dto: CreatePatrimonioDto): Promise<PatrimonioResponseDto> {
    // Verificar se o código já existe
    const existingPatrimonio = await this.patrimonioRepository.findOne({
      where: { codigo: dto.codigo },
    });

    if (existingPatrimonio) {
      throw new ConflictException(`Patrimônio com código "${dto.codigo}" já existe`);
    }

    // Converter datas de string para Date se fornecidas
    const patrimonioData = {
      ...dto,
      dataAquisicao: dto.dataAquisicao ? new Date(dto.dataAquisicao) : undefined,
      dataGarantia: dto.dataGarantia ? new Date(dto.dataGarantia) : undefined,
    };

    // Criar e salvar o patrimônio
    const patrimonio = this.patrimonioRepository.create(patrimonioData);
    const savedPatrimonio = await this.patrimonioRepository.save(patrimonio);

    return this.serializePatrimonio(savedPatrimonio);
  }

  /**
   * Busca patrimônios com filtros avançados e paginação
   */
  async findAllWithFilters(
    filters: FilterPatrimoniosDto,
  ): Promise<PaginatedPatrimoniosResponseDto> {
    const {
      page = 1,
      limit = 10,
      q,
      categoria,
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
    } = filters;

    const skip = (page - 1) * limit;

    // Construir condições de busca
    const whereConditions: any[] = [];

    // Filtros específicos
    if (categoria) {
      whereConditions.push({ categoria });
    }

    if (status) {
      whereConditions.push({ status });
    }

    if (marca) {
      whereConditions.push({ marca: ILike(`%${marca}%`) });
    }

    if (modelo) {
      whereConditions.push({ modelo: ILike(`%${modelo}%`) });
    }

    if (localizacao) {
      whereConditions.push({ localizacao: ILike(`%${localizacao}%`) });
    }

    if (responsavelId) {
      whereConditions.push({ responsavelId });
    }

    // Filtros de valor
    if (valorMinimo !== undefined || valorMaximo !== undefined) {
      const valorCondition: any = {};
      if (valorMinimo !== undefined) {
        valorCondition.valorAquisicao = { ...valorCondition.valorAquisicao, $gte: valorMinimo };
      }
      if (valorMaximo !== undefined) {
        valorCondition.valorAquisicao = { ...valorCondition.valorAquisicao, $lte: valorMaximo };
      }
      whereConditions.push(valorCondition);
    }

    // Filtros de data
    if (dataInicial && dataFinal) {
      whereConditions.push({
        dataAquisicao: Between(new Date(dataInicial), new Date(dataFinal)),
      });
    } else if (dataInicial) {
      whereConditions.push({
        dataAquisicao: Between(new Date(dataInicial), new Date('2099-12-31')),
      });
    } else if (dataFinal) {
      whereConditions.push({
        dataAquisicao: Between(new Date('1900-01-01'), new Date(dataFinal)),
      });
    }

    // Busca textual genérica (código, nome, descrição)
    if (q) {
      whereConditions.push([
        { codigo: ILike(`%${q}%`) },
        { nome: ILike(`%${q}%`) },
        { descricao: ILike(`%${q}%`) },
      ]);
    }

    // Construir opções de busca
    const findOptions: FindManyOptions<Patrimonio> = {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder,
      },
      relations: ['responsavel'],
    };

    // Executar busca paginada
    const [patrimonios, total] = await this.patrimonioRepository.findAndCount(findOptions);

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: patrimonios.map((patrimonio) => this.serializePatrimonio(patrimonio)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  /**
   * Busca um patrimônio por ID
   */
  async findOne(id: string): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { id },
      relations: ['responsavel'],
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    return this.serializePatrimonio(patrimonio);
  }

  /**
   * Busca um patrimônio por código
   */
  async findByCodigo(codigo: string): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({
      where: { codigo },
      relations: ['responsavel'],
    });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com código "${codigo}" não encontrado`);
    }

    return this.serializePatrimonio(patrimonio);
  }

  /**
   * Atualiza um patrimônio
   */
  async update(id: string, dto: UpdatePatrimonioDto): Promise<PatrimonioResponseDto> {
    const patrimonio = await this.patrimonioRepository.findOne({ where: { id } });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    // Verificar se o novo código já existe (se fornecido e diferente do atual)
    if (dto.codigo && dto.codigo !== patrimonio.codigo) {
      const existingPatrimonio = await this.patrimonioRepository.findOne({
        where: { codigo: dto.codigo },
      });

      if (existingPatrimonio) {
        throw new ConflictException(`Patrimônio com código "${dto.codigo}" já existe`);
      }
    }

    // Converter datas de string para Date se fornecidas
    const updateData = {
      ...dto,
      dataAquisicao: dto.dataAquisicao ? new Date(dto.dataAquisicao) : undefined,
      dataGarantia: dto.dataGarantia ? new Date(dto.dataGarantia) : undefined,
    };

    // Atualizar o patrimônio
    Object.assign(patrimonio, updateData);
    const updatedPatrimonio = await this.patrimonioRepository.save(patrimonio);

    return this.serializePatrimonio(updatedPatrimonio);
  }

  /**
   * Remove um patrimônio (soft delete)
   */
  async remove(id: string): Promise<void> {
    const patrimonio = await this.patrimonioRepository.findOne({ where: { id } });

    if (!patrimonio) {
      throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
    }

    await this.patrimonioRepository.softDelete(id);
  }

  /**
   * Busca patrimônios por categoria
   */
  async findByCategoria(categoria: PatrimonioCategoria): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: { categoria },
      relations: ['responsavel'],
      order: { nome: 'ASC' },
    });

    return patrimonios.map((patrimonio) => this.serializePatrimonio(patrimonio));
  }

  /**
   * Busca patrimônios por status
   */
  async findByStatus(status: PatrimonioStatus): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: { status },
      relations: ['responsavel'],
      order: { nome: 'ASC' },
    });

    return patrimonios.map((patrimonio) => this.serializePatrimonio(patrimonio));
  }

  /**
   * Busca patrimônios por responsável
   */
  async findByResponsavel(responsavelId: string): Promise<PatrimonioResponseDto[]> {
    const patrimonios = await this.patrimonioRepository.find({
      where: { responsavelId },
      relations: ['responsavel'],
      order: { nome: 'ASC' },
    });

    return patrimonios.map((patrimonio) => this.serializePatrimonio(patrimonio));
  }

  /**
   * Obtém estatísticas de patrimônios por categoria
   */
  async getStatsByCategoria(): Promise<Record<string, number>> {
    const stats = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.categoria', 'categoria')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patrimonio.categoria')
      .getRawMany();

    return stats.reduce((acc, stat) => {
      acc[stat.categoria] = parseInt(stat.count);
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Obtém estatísticas de patrimônios por status
   */
  async getStatsByStatus(): Promise<Record<string, number>> {
    const stats = await this.patrimonioRepository
      .createQueryBuilder('patrimonio')
      .select('patrimonio.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patrimonio.status')
      .getRawMany();

    return stats.reduce((acc, stat) => {
      acc[stat.status] = parseInt(stat.count);
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Obtém o valor total do patrimônio
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
   * Obtém patrimônios próximos da data de vencimento de garantia
   */
  async getPatrimoniosProximosVencimentoGarantia(dias: number = 30): Promise<PatrimonioResponseDto[]> {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + dias);

    // Esta é uma implementação simplificada
    // Em um cenário real, você teria um campo de data de vencimento de garantia
    const patrimonios = await this.patrimonioRepository.find({
      where: {
        status: PatrimonioStatus.ATIVO,
        dataAquisicao: Between(new Date('2020-01-01'), dataLimite),
      },
      relations: ['responsavel'],
      order: { dataAquisicao: 'ASC' },
    });

    return patrimonios.map((patrimonio) => this.serializePatrimonio(patrimonio));
  }
}