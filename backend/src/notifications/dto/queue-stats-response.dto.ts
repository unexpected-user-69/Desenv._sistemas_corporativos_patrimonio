import { ApiProperty } from '@nestjs/swagger';

export class QueueStatsResponseDto {
  @ApiProperty({ description: 'Jobs aguardando processamento' })
  waiting!: number;

  @ApiProperty({ description: 'Jobs em processamento' })
  active!: number;

  @ApiProperty({ description: 'Jobs completados' })
  completed!: number;

  @ApiProperty({ description: 'Jobs falhados (DLQ)' })
  failed!: number;

  @ApiProperty({ description: 'Jobs agendados (delayed)' })
  delayed!: number;

  @ApiProperty({ description: 'Total de jobs' })
  total!: number;
}



