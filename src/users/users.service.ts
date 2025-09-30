import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
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
   * Remove dados sensíveis da entidade User
   */
  private stripSensitive(user: User): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponseDto;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.stripSensitive(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.stripSensitive(user);
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
      return this.stripSensitive(saved);
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
    return this.stripSensitive(saved);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Verifica se existe
    await this.userRepository.softDelete(id);
  }
}
