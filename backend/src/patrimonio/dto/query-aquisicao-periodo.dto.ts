import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class QueryAquisicaoPeriodoDto {
  @ApiProperty({
    description: 'Data inicial de aquisição (YYYY-MM-DD)',
    example: '2024-01-01',
    format: 'date',
  })
  @IsString()
  @IsDateString()
  dataInicial!: string;

  @ApiProperty({
    description: 'Data final de aquisição (YYYY-MM-DD)',
    example: '2024-12-31',
    format: 'date',
  })
  @IsString()
  @IsDateString()
  dataFinal!: string;
}

