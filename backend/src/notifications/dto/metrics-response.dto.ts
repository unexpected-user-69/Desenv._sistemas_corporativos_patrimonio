import { ApiProperty } from '@nestjs/swagger';
import { NotificationStatus } from '../entities/notification-log.entity';

export class MetricsResponseDto {
  @ApiProperty({ description: 'Período analisado' })
  period!: {
    from: Date;
    to: Date;
  };

  @ApiProperty({ description: 'Total de notificações' })
  totalNotifications!: number;

  @ApiProperty({ description: 'Notificações por status' })
  notificationsByStatus!: Record<NotificationStatus, number>;

  @ApiProperty({ description: 'Notificações por canal' })
  notificationsByChannel!: Record<string, number>;

  @ApiProperty({ description: 'Taxa de sucesso (%)' })
  successRate!: number;

  @ApiProperty({ description: 'Taxa de falha (%)' })
  failureRate!: number;

  @ApiProperty({ description: 'Latência média (ms)' })
  averageLatency!: number;

  @ApiProperty({ description: 'Latência p95 (ms)' })
  p95Latency!: number;

  @ApiProperty({ description: 'Latência p99 (ms)' })
  p99Latency!: number;

  @ApiProperty({ description: 'Throughput (notificações/hora)' })
  throughput!: number;

  @ApiProperty({ description: 'Total de tentativas' })
  totalAttempts!: number;

  @ApiProperty({ description: 'Média de tentativas por notificação' })
  averageAttempts!: number;

  @ApiProperty({ description: 'Erros mais comuns' })
  topErrors!: Array<{ error: string; count: number }>;
}



