import { ApiProperty } from '@nestjs/swagger';
import { PatrimonioResponseDto } from './patrimonio-response.dto';

export class DuplicataResponseDto {
  @ApiProperty({
    description: 'Lista de patrimônios possivelmente duplicados',
    type: [PatrimonioResponseDto],
  })
  duplicatas!: PatrimonioResponseDto[];

  @ApiProperty({
    description: 'Total de duplicatas encontradas',
    example: 2,
  })
  total!: number;
}

