import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions, ILike } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { FilterUsersDto } from './dto/filter-users.dto';
import { PaginatedResponseDto } from './dto/pagination.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Gera hash seguro da senha usando bcrypt
   */
  private async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }

  /**
   * Serializa User para UserResponseDto usando class-transformer
   */
  private serializeUser(user: User): UserResponseDto {
    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
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

    // Construir condições de busca de forma declarativa
    const whereConditions: any[] = [];

    // Filtros específicos
    if (role) {
      whereConditions.push({ role });
    }

    if (isActive !== undefined) {
      whereConditions.push({ isActive });
    }

    // Busca textual genérica (nome e email) - mais eficiente
    if (q) {
      whereConditions.push([
        { name: ILike(`%${q}%`) },
        { email: ILike(`%${q}%`) },
      ]);
    }

    // Construir opções de busca
    const findOptions: FindManyOptions<User> = {
      where: whereConditions.length > 0 ? whereConditions : undefined,
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

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    // Normalização de email
    const normalizedEmail = dto.email.toLowerCase();

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
        email: normalizedEmail,
        passwordHash: hashedPassword,
        isActive: dto.isActive ?? true,
      });
      const saved = await this.userRepository.save(entity);
      return this.serializeUser(saved);
    } catch (error: any) {
      // Tratamento de erro de conflito do banco (código '23505')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.preload({
      id,
      ...dto,
      ...(dto.email && { email: dto.email.toLowerCase() }),
      ...(dto.password && {
        passwordHash: await this.hash(dto.password),
      }),
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    const saved = await this.userRepository.save(user);
    return saved as UserResponseDto;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Verifica se existe
    await this.userRepository.softDelete(id);
  }
}
