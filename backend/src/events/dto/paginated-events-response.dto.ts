import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EventResponseDto } from './event-response.dto';

export class PaginatedEventsResponseDto {
  @ApiProperty({
    description: 'Lista de eventos',
    type: [EventResponseDto],
  })
  @Type(() => EventResponseDto)
  data!: EventResponseDto[];

  @ApiProperty({
    description: 'Total de registros encontrados',
    example: 100,
  })
  total!: number;

  @ApiProperty({
    description: 'Página atual',
    example: 1,
  })
  page!: number;

  @ApiProperty({
    description: 'Itens por página',
    example: 20,
  })
  limit!: number;

  @ApiProperty({
    description: 'Total de páginas',
    example: 5,
  })
  totalPages!: number;

  @ApiProperty({
    description: 'Indica se existe próxima página',
    example: true,
  })
  hasNextPage!: boolean;

  @ApiProperty({
    description: 'Indica se existe página anterior',
    example: false,
  })
  hasPreviousPage!: boolean;
}
