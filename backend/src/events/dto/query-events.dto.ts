import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsNumber,
  IsUUID,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { EventType } from '../enums/event-type.enum';
import { EventVisibility } from '../enums/event-visibility.enum';
import { EventState } from '../enums/event-state.enum';

export class QueryEventsDto {
  @ApiPropertyOptional({
    description: 'Número da página',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de itens por página',
    example: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({
    description: 'Busca textual (título e descrição)',
    example: 'manutenção',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  q?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por tipo de evento',
    enum: EventType,
    example: EventType.MANUTENCAO,
  })
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;

  @ApiPropertyOptional({
    description: 'Filtrar por estado do evento',
    enum: EventState,
    example: EventState.PUBLISHED,
  })
  @IsOptional()
  @IsEnum(EventState)
  state?: EventState;

  @ApiPropertyOptional({
    description: 'Filtrar por visibilidade do evento',
    enum: EventVisibility,
    example: EventVisibility.PUBLIC,
  })
  @IsOptional()
  @IsEnum(EventVisibility)
  visibility?: EventVisibility;

  @ApiPropertyOptional({
    description: 'Filtrar por ID de patrimônio relacionado',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('4')
  patrimonioId?: string;

  @ApiPropertyOptional({
    description: 'Data inicial para filtrar eventos (eventos que começam a partir desta data)',
    example: '2025-02-01T00:00:00Z',
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    description: 'Data final para filtrar eventos (eventos que terminam até esta data)',
    example: '2025-02-28T23:59:59Z',
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  to?: string;
}
