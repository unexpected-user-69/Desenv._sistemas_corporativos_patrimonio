import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PatrimonioResponseDto } from './patrimonio-response.dto';

export class PaginatedPatrimonioResponseDto {
  @ApiProperty({
    description: 'Lista de patrimônios',
    type: [PatrimonioResponseDto],
  })
  @Type(() => PatrimonioResponseDto)
  data!: PatrimonioResponseDto[];

  @ApiProperty({
    description: 'Total de registros',
    example: 150,
  })
  total!: number;

  @ApiProperty({
    description: 'Página atual',
    example: 1,
  })
  page!: number;

  @ApiProperty({
    description: 'Número de itens por página',
    example: 10,
  })
  limit!: number;

  @ApiProperty({
    description: 'Total de páginas',
    example: 15,
  })
  totalPages!: number;

  @ApiProperty({
    description: 'Indica se há próxima página',
    example: true,
  })
  hasNextPage!: boolean;

  @ApiProperty({
    description: 'Indica se há página anterior',
    example: false,
  })
  hasPreviousPage!: boolean;
}

