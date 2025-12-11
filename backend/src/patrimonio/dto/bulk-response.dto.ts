import { ApiProperty } from '@nestjs/swagger';
import { PatrimonioResponseDto } from './patrimonio-response.dto';

export class BulkResponseDto {
  @ApiProperty({
    description: 'Lista de patrimônios processados com sucesso',
    type: [PatrimonioResponseDto],
  })
  sucessos!: PatrimonioResponseDto[];

  @ApiProperty({
    description: 'Lista de erros (se houver)',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        index: { type: 'number' },
        codigo: { type: 'string' },
        erro: { type: 'string' },
      },
    },
  })
  erros!: Array<{
    index: number;
    codigo?: string;
    erro: string;
  }>;

  @ApiProperty({
    description: 'Total de patrimônios processados com sucesso',
    example: 8,
  })
  totalSucessos!: number;

  @ApiProperty({
    description: 'Total de erros',
    example: 2,
  })
  totalErros!: number;
}

