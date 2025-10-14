import { ApiProperty } from '@nestjs/swagger';
import { PatrimonioResponseDto } from './patrimonio-response.dto';

export class PaginatedPatrimoniosResponseDto {
  @ApiProperty({
    description: 'Lista de patrimônios da página atual',
    type: [PatrimonioResponseDto],
  })
  data!: PatrimonioResponseDto[];

  @ApiProperty({
    description: 'Total de patrimônios encontrados',
    example: 150,
  })
  total!: number;

  @ApiProperty({
    description: 'Número da página atual',
    example: 1,
  })
  page!: number;

  @ApiProperty({
    description: 'Número de itens por página',
    example: 10,
  })
  limit!: number;

  @ApiProperty({
    description: 'Total de páginas disponíveis',
    example: 15,
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
