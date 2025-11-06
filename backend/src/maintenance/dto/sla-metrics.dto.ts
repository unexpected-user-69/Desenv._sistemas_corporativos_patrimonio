import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class SlaMetricsQueryDto {
  @ApiPropertyOptional({
    description: 'Data inicial do período',
    example: '2025-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Data final do período',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class SlaMetricsResponseDto {
  @ApiProperty({ description: 'MTTR - Tempo médio para reparo (horas)' })
  mttr!: number;

  @ApiProperty({ description: 'Taxa de cumprimento de prazos (%)' })
  onTimeCompletionRate!: number;

  @ApiProperty({ description: 'Custo total de manutenção (R$)' })
  totalMaintenanceCost!: number;

  @ApiProperty({ description: 'Período analisado' })
  period!: {
    start: Date | null;
    end: Date | null;
  };
}

export class MttrResponseDto {
  @ApiProperty({ description: 'MTTR em horas' })
  mttr!: number;

  @ApiProperty({ description: 'Período analisado' })
  period!: {
    start: Date | null;
    end: Date | null;
  };
}

export class MtbfResponseDto {
  @ApiProperty({ description: 'MTBF em horas' })
  mtbf!: number;

  @ApiProperty({ description: 'ID do patrimônio analisado' })
  patrimonioId!: string;
}

