import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { name, email, password, role, isActive } = dto;
    const entity = new User();
    entity.name = name;
    entity.email = email;
    entity.passwordHash = password;
    entity.role = role;
    entity.isActive = isActive ?? true;
    return this.userRepository.save(entity);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (dto.name !== undefined) {
      user.name = dto.name;
    }
    if (dto.email !== undefined) {
      user.email = dto.email;
    }
    if (dto.role !== undefined) {
      user.role = dto.role;
    }
    if (dto.isActive !== undefined) {
      user.isActive = dto.isActive;
    }
    if (dto.password) {
      user.passwordHash = dto.password;
    }

    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
