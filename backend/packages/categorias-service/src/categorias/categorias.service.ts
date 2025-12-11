import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  ILike,
  FindManyOptions,
  FindOptionsWhere,
  QueryFailedError,
} from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { QueryCategoriaDto } from './dto/query-categoria.dto';
import {
  CategoriaResponseDto,
  PaginatedCategoriaResponseDto,
} from './dto/categoria-response.dto';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger(CategoriasService.name);

  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  /**
   * Criar nova categoria
   */
  async create(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    // Verificar se já existe categoria com mesmo código (apenas ativas)
    const existente = await this.categoriaRepository.findOne({
      where: { codigo: createCategoriaDto.codigo },
    });

    if (existente) {
      throw new ConflictException(
        `Categoria com código '${createCategoriaDto.codigo}' já existe`,
      );
    }

    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      const saved = await this.categoriaRepository.save(categoria);
      return this.serializeCategoria(saved);
    } catch (error: unknown) {
      // Tratamento de erro de conflito do banco (código '23505' = PostgreSQL unique constraint violation)
      // Isso cobre casos de race condition ou soft-deleted com constraint única ainda ativa
      const errorCode = (error as any)?.code;
      const errorName = (error as any)?.name;
      
      if (
        error instanceof QueryFailedError ||
        errorCode === '23505' ||
        (errorCode && errorCode.toString().startsWith('23')) ||
        errorName === 'QueryFailedError'
      ) {
        this.logger.warn(
          `Tentativa de criar categoria com código duplicado: ${createCategoriaDto.codigo}`,
        );
        throw new ConflictException(
          `Categoria com código '${createCategoriaDto.codigo}' já existe`,
        );
      }
      
      // Log de outros erros para debug
      this.logger.error('Erro ao criar categoria', {
        errorType: error?.constructor?.name,
        message: (error as any)?.message,
        code: errorCode,
        name: errorName,
        stack: (error as any)?.stack,
      });
      
      throw error;
    }
  }

  /**
   * Listar categorias com filtros e paginação
   */
  async findAll(
    query: QueryCategoriaDto,
  ): Promise<PaginatedCategoriaResponseDto> {
    const {
      page = 1,
      limit = 10,
      q,
      codigo,
      ativo,
      sortBy = 'nome',
      sortOrder = 'ASC',
    } = query;

    const skip = (page - 1) * limit;

    // Construir filtros
    const where: FindOptionsWhere<Categoria> = {};

    if (codigo) {
      where.codigo = codigo;
    }

    if (ativo !== undefined) {
      where.ativo = ativo;
    }

    // Busca textual
    let whereConditions: FindOptionsWhere<Categoria>[] = [];
    if (q) {
      whereConditions = [
        { nome: ILike(`%${q}%`), ...where },
        { codigo: ILike(`%${q}%`), ...where },
        { descricao: ILike(`%${q}%`), ...where },
      ];
    } else if (Object.keys(where).length > 0) {
      whereConditions = [where];
    }

    const findOptions: FindManyOptions<Categoria> = {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      skip,
      take: limit,
      order: { [sortBy]: sortOrder },
    };

    const [categorias, total] =
      await this.categoriaRepository.findAndCount(findOptions);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: categorias.map((cat) => this.serializeCategoria(cat)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  /**
   * Buscar categoria por ID
   */
  async findOne(id: string): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID '${id}' não encontrada`);
    }

    return this.serializeCategoria(categoria);
  }

  /**
   * Buscar categoria por código
   */
  async findByCodigo(codigo: string): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { codigo },
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria com código '${codigo}' não encontrada`,
      );
    }

    return this.serializeCategoria(categoria);
  }

  /**
   * Atualizar categoria
   */
  async update(
    id: string,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID '${id}' não encontrada`);
    }

    // Se está mudando o código, verificar se não existe outro com o mesmo
    if (
      updateCategoriaDto.codigo &&
      updateCategoriaDto.codigo !== categoria.codigo
    ) {
      const existente = await this.categoriaRepository.findOne({
        where: { codigo: updateCategoriaDto.codigo },
      });

      if (existente && existente.id !== id) {
        throw new ConflictException(
          `Categoria com código '${updateCategoriaDto.codigo}' já existe`,
        );
      }
    }

    try {
      Object.assign(categoria, updateCategoriaDto);
      const updated = await this.categoriaRepository.save(categoria);
      return this.serializeCategoria(updated);
    } catch (error: unknown) {
      // Tratamento de erro de conflito do banco (código '23505' = PostgreSQL unique constraint violation)
      const errorCode = (error as any)?.code;
      const errorName = (error as any)?.name;
      
      if (
        error instanceof QueryFailedError ||
        errorCode === '23505' ||
        (errorCode && errorCode.toString().startsWith('23')) ||
        errorName === 'QueryFailedError'
      ) {
        this.logger.warn(
          `Tentativa de atualizar categoria com código duplicado: ${updateCategoriaDto.codigo || categoria.codigo}`,
        );
        throw new ConflictException(
          `Categoria com código '${updateCategoriaDto.codigo || categoria.codigo}' já existe`,
        );
      }
      
      // Log de outros erros para debug
      this.logger.error('Erro ao atualizar categoria', {
        errorType: error?.constructor?.name,
        message: (error as any)?.message,
        code: errorCode,
        name: errorName,
        stack: (error as any)?.stack,
      });
      
      throw error;
    }
  }

  /**
   * Desativar categoria (soft delete)
   */
  async deactivate(id: string): Promise<void> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID '${id}' não encontrada`);
    }

    categoria.ativo = false;
    await this.categoriaRepository.save(categoria);
  }

  /**
   * Ativar categoria
   */
  async activate(id: string): Promise<void> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID '${id}' não encontrada`);
    }

    categoria.ativo = true;
    await this.categoriaRepository.save(categoria);
  }

  /**
   * Deletar categoria (soft delete)
   */
  async remove(id: string): Promise<void> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com ID '${id}' não encontrada`);
    }

    // Verificar se há patrimônios usando esta categoria
    // TODO: Implementar quando atualizar a relação em Patrimonio
    // const patrimoniosCount = await this.patrimonioRepository.count({
    //   where: { categoriaId: id },
    // });

    // if (patrimoniosCount > 0) {
    //   throw new BadRequestException(
    //     `Não é possível deletar a categoria. Existem ${patrimoniosCount} patrimônio(s) associado(s)`,
    //   );
    // }

    await this.categoriaRepository.softDelete(id);
  }

  /**
   * Serializar categoria para resposta
   */
  private serializeCategoria(categoria: Categoria): CategoriaResponseDto {
    return {
      id: categoria.id,
      codigo: categoria.codigo,
      nome: categoria.nome,
      descricao: categoria.descricao,
      icone: categoria.icone,
      cor: categoria.cor,
      ativo: categoria.ativo,
      createdAt: categoria.createdAt,
      updatedAt: categoria.updatedAt,
    };
  }
}






