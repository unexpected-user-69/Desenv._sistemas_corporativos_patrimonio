import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsEnum,
  IsDateString,
  Matches,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { WorkOrderStatus, Prioridade } from '../entities/work-order.entity';

export class QueryWorkOrdersDto {
  @ApiPropertyOptional({
    description: 'Número da página (começando em 1)',
    minimum: 1,
    default: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de itens por página',
    minimum: 1,
    maximum: 100,
    default: 10,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Busca textual (título e descrição)',
    example: 'manutenção',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value) as string)
  q?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por status da OS',
    enum: WorkOrderStatus,
    example: WorkOrderStatus.EM_ANDAMENTO,
  })
  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;

  @ApiPropertyOptional({
    description: 'Filtrar por prioridade',
    enum: Prioridade,
    example: Prioridade.ALTA,
  })
  @IsOptional()
  @IsEnum(Prioridade)
  prioridade?: Prioridade;

  @ApiPropertyOptional({
    description: 'Filtrar por ID do patrimônio',
    format: 'uuid',
  })
  @IsOptional()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'patrimonioId deve ser um UUID válido',
  })
  patrimonioId?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por ID do responsável (owner)',
    format: 'uuid',
  })
  @IsOptional()
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
    message: 'ownerId deve ser um UUID válido',
  })
  ownerId?: string;

  @ApiPropertyOptional({
    description: 'Data inicial para filtrar por data de abertura',
    example: '2025-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  openedAtStart?: string;

  @ApiPropertyOptional({
    description: 'Data final para filtrar por data de abertura',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  openedAtEnd?: string;

  @ApiPropertyOptional({
    description: 'Ordenar por campo',
    enum: ['openedAt', 'closedAt', 'createdAt', 'titulo', 'prioridade'],
    default: 'openedAt',
  })
  @IsOptional()
  @IsEnum(['openedAt', 'closedAt', 'createdAt', 'titulo', 'prioridade'])
  sortBy?: 'openedAt' | 'closedAt' | 'createdAt' | 'titulo' | 'prioridade' = 'openedAt';

  @ApiPropertyOptional({
    description: 'Ordem de classificação',
    enum: ['ASC', 'DESC'],
    default: 'DESC',
  })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}

