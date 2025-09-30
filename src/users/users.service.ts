import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const entity = this.userRepository.create({
      ...dto,
      passwordHash: hashed,
      isActive: dto.isActive ?? true,
    });
    return this.userRepository.save(entity);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...dto,
      ...(dto.password && {
        passwordHash: await bcrypt.hash(dto.password, 10),
      }),
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Verifica se existe
    await this.userRepository.softDelete(id);
  }
}
