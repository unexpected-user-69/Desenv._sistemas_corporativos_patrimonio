import { ApiProperty } from '@nestjs/swagger';

export class DeleteBulkResponseDto {
  @ApiProperty({
    description: 'Número de patrimônios deletados com sucesso',
    example: 5,
  })
  deletados!: number;

  @ApiProperty({
    description: 'Número de patrimônios que não foram encontrados',
    example: 2,
  })
  naoEncontrados!: number;

  @ApiProperty({
    description: 'IDs dos patrimônios que foram deletados',
    type: [String],
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  idsDeletados!: string[];

  @ApiProperty({
    description: 'IDs dos patrimônios que não foram encontrados',
    type: [String],
    example: ['223e4567-e89b-12d3-a456-426614174001'],
  })
  idsNaoEncontrados!: string[];
}


