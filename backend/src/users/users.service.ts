import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions, ILike, Between } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { PaginatedResponseDto } from './dto/pagination.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import {
  FilterService,
  AdvancedFilterOptions,
} from '../common/services/filter.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly normalizationService: NormalizationService,
    private readonly filterService: FilterService,
  ) {}

  /**
   * Gera hash seguro da senha usando HashService
   */
  private async hash(plain: string): Promise<string> {
    return this.hashService.hash(plain);
  }

  /**
   * Serializa User para UserResponseDto usando class-transformer
   */
  private serializeUser(user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  /**
   * Normaliza email usando NormalizationService
   */
  private normalizeEmail(email: string): string {
    return this.normalizationService.normalizeEmail(email);
  }

  /**
   * Normaliza nome usando NormalizationService
   */
  private normalizeName(name: string): string {
    return this.normalizationService.normalizeName(name);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.serializeUser(user));
  }

  async findAllPaginated(
    filters: FilterUsersDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const {
      page = 1,
      limit = 10,
      role,
      isActive,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = filters;

    const skip = (page - 1) * limit;

    // Construir condições de busca
    const where: Record<string, unknown> = {};

    if (role) {
      where.role = role;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (search) {
      where.name = Like(`%${search}%`);
    }

    // Construir opções de busca
    const findOptions: FindManyOptions<User> = {
      where,
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder,
      },
    };

    // Executar busca paginada
    const [users, total] = await this.userRepository.findAndCount(findOptions);

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: users.map((user) => this.serializeUser(user)),
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  async findAllWithAdvancedFilters(
    query: QueryUsersDto,
  ): Promise<PaginatedUsersResponseDto> {
    const {
      page = 1,
      limit = 10,
      q,
      role,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const skip = (page - 1) * limit;

    // Construir condições de busca base (AND)
    const baseWhere: any = {};

    // Filtros específicos (combinados com AND)
    if (role) {
      baseWhere.role = role;
    }

    if (isActive !== undefined) {
      baseWhere.isActive = isActive;
    }

    // Busca textual genérica (nome OU email) - combina filtros base com OR de busca textual
    let whereConditions: any;
    if (q) {
      whereConditions = [
        { name: ILike(`%${q}%`), ...baseWhere },
        { email: ILike(`%${q}%`), ...baseWhere },
      ];
    } else if (Object.keys(baseWhere).length > 0) {
      whereConditions = baseWhere;
    }

    // Construir opções de busca
    const findOptions: FindManyOptions<User> = {
      where: whereConditions,
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder,
      },
    };

    // Executar busca paginada
    const [users, total] = await this.userRepository.findAndCount(findOptions);

    // Calcular metadados de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: users.map((user) => this.serializeUser(user)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.serializeUser(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    const normalizedEmail = this.normalizeEmail(email);
    const user = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return this.serializeUser(user);
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    // Normalização de email e nome usando serviços
    const normalizedEmail = this.normalizeEmail(dto.email);
    const normalizedName = this.normalizeName(dto.name);

    // Checagem preliminar de email único
    const existingUser = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      const hashedPassword = await this.hash(dto.password);
      const entity = this.userRepository.create({
        ...dto,
        name: normalizedName,
        email: normalizedEmail,
        passwordHash: hashedPassword,
        isActive: dto.isActive ?? true,
      });
      const saved = await this.userRepository.save(entity);
      return this.serializeUser(saved);
    } catch (error: any) {
      // Tratamento de erro de conflito do banco (código '23505')
       
      if (error?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async createBulk(dtos: CreateUserDto[]): Promise<UserResponseDto[]> {
    if (!dtos || dtos.length === 0) {
      throw new ConflictException('No users provided');
    }

    if (dtos.length > 100) {
      throw new ConflictException('Maximum 100 users can be created at once');
    }

    // Normalizar todos os emails e nomes
    const normalizedDtos = dtos.map((dto) => ({
      ...dto,
      email: this.normalizeEmail(dto.email),
      name: this.normalizeName(dto.name),
    }));

    // Verificar emails duplicados na entrada
    const emails = normalizedDtos.map((dto) => dto.email);
    const uniqueEmails = new Set(emails);
    if (emails.length !== uniqueEmails.size) {
      throw new ConflictException('Duplicate emails in the request');
    }

    // Verificar se algum email já existe no banco
    const existingUsers = await this.userRepository.find({
      where: emails.map((email) => ({ email })),
    });

    if (existingUsers.length > 0) {
      const existingEmails = existingUsers.map((user) => user.email);
      throw new ConflictException(
        `Emails already exist: ${existingEmails.join(', ')}`,
      );
    }

    try {
      // Criar entidades com senhas hasheadas
      const entities = await Promise.all(
        normalizedDtos.map(async (dto) => {
          const hashedPassword = await this.hash(dto.password);
          return this.userRepository.create({
            ...dto,
            passwordHash: hashedPassword,
            isActive: dto.isActive ?? true,
          });
        }),
      );

      // Salvar todos os usuários
      const savedUsers = await this.userRepository.save(entities);

      // Serializar e retornar
      return savedUsers.map((user) => this.serializeUser(user));
    } catch (error: any) {
      // Tratamento de erro de conflito do banco
      if (error?.code === '23505') {
        throw new ConflictException('One or more emails already exist');
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.preload({
      id,
      ...dto,
      ...(dto.email && { email: this.normalizeEmail(dto.email) }),
      ...(dto.name && { name: this.normalizeName(dto.name) }),
      ...(dto.password && {
        passwordHash: await this.hash(dto.password),
      }),
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    const saved = await this.userRepository.save(user);
    return this.serializeUser(saved);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Verifica se existe
    await this.userRepository.softDelete(id);
  }

  /**
   * Busca avançada com filtros full-text e ordenação dinâmica
   */
  async findWithAdvancedFilters(
    options: AdvancedFilterOptions,
  ): Promise<PaginatedUsersResponseDto> {
    const findOptions = this.filterService.buildAdvancedFilters(options);
    const [users, total] = await this.userRepository.findAndCount(findOptions);

    const { page = 1, limit = 20 } = options;
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: users.map((user) => this.serializeUser(user)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  /**
   * Busca com paginação baseada em cursor
   */
  async findWithCursorPagination(
    options: AdvancedFilterOptions,
    cursor?: string,
  ): Promise<{
    data: UserResponseDto[];
    nextCursor?: string;
    hasMore: boolean;
  }> {
    const findOptions = this.filterService.buildCursorFilters(options, cursor);
    const [users] = await this.userRepository.findAndCount(findOptions);

    let nextCursor: string | undefined;
    let hasMore = false;

    if (users.length > 0 && users.length === (options.limit || 20)) {
      const lastUser = users[users.length - 1];
      nextCursor = this.filterService.generateCursor(lastUser);
      hasMore = true;
    }

    return {
      data: users.map((user) => this.serializeUser(user)),
      nextCursor,
      hasMore,
    };
  }

  /**
   * Busca fuzzy (aproximada) por nome ou email
   */
  async findFuzzy(searchText: string, limit = 10): Promise<UserResponseDto[]> {
    const patterns = this.filterService.generateFuzzyPatterns(searchText);

    if (patterns.length === 0) {
      return [];
    }

    const whereConditions = patterns.flatMap((pattern) => [
      { name: ILike(pattern) },
      { email: ILike(pattern) },
    ]);

    const users = await this.userRepository.find({
      where: whereConditions,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return users.map((user) => this.serializeUser(user));
  }

  /**
   * Busca por intervalo de datas
   */
  async findByDateRange(
    dateFrom: Date,
    dateTo: Date,
    options: Partial<AdvancedFilterOptions> = {},
  ): Promise<UserResponseDto[]> {
    const findOptions: FindManyOptions<User> = {
      where: {
        createdAt: Between(dateFrom, dateTo),
        ...(options.role && { role: options.role }),
        ...(options.isActive !== undefined && { isActive: options.isActive }),
      },
      order: { createdAt: 'DESC' },
      take: options.limit || 100,
    };

    const users = await this.userRepository.find(findOptions);
    return users.map((user) => this.serializeUser(user));
  }

  /**
   * Estatísticas de usuários por role
   */
  async getUserStatsByRole(): Promise<Record<string, number>> {
    const users = await this.userRepository.find({
      select: ['role'],
    });

    const stats: Record<string, number> = {};
    users.forEach((user) => {
      stats[user.role] = (stats[user.role] || 0) + 1;
    });

    return stats;
  }

  /**
   * Busca usuários ativos recentes
   */
  async findRecentActiveUsers(
    days = 30,
    limit = 10,
  ): Promise<UserResponseDto[]> {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    const users = await this.userRepository.find({
      where: {
        isActive: true,
        updatedAt: Between(dateFrom, new Date()),
      },
      order: { updatedAt: 'DESC' },
      take: limit,
    });

    return users.map((user) => this.serializeUser(user));
  }
}
