import { IsOptional, IsEnum, IsBoolean, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';
import { PaginationDto } from './pagination.dto';
import { IsTrimmed } from '../../common/validators';

export class FilterUsersDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Filtrar por role do usuário',
    enum: UserRole,
    example: UserRole.STUDENT,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Filtrar por status ativo/inativo',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Buscar por nome (busca parcial, case-insensitive)',
    example: 'João',
  })
  @IsOptional()
  @IsString({ message: 'O termo de busca deve ser uma string' })
  @IsTrimmed({
    message: 'O termo de busca não pode conter espaços no início ou fim',
  })
  search?: string;

  @ApiPropertyOptional({
    description: 'Ordenar por campo',
    enum: ['name', 'email', 'createdAt', 'updatedAt'],
    default: 'createdAt',
    example: 'name',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt' = 'createdAt';

  @ApiPropertyOptional({
    description: 'Direção da ordenação',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    example: 'ASC',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}
