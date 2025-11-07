import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { NotificationLog, NotificationStatus } from '../entities/notification-log.entity';
import { NotificationChannel } from '../entities/notification-template.entity';

export interface NotificationMetrics {
  /** Período analisado */
  period: {
    from: Date;
    to: Date;
  };
  /** Total de notificações */
  totalNotifications: number;
  /** Notificações por status */
  notificationsByStatus: Record<NotificationStatus, number>;
  /** Notificações por canal */
  notificationsByChannel: Record<string, number>;
  /** Taxa de sucesso (%) */
  successRate: number;
  /** Taxa de falha (%) */
  failureRate: number;
  /** Latência média (ms) */
  averageLatency: number;
  /** Latência p95 (ms) */
  p95Latency: number;
  /** Latência p99 (ms) */
  p99Latency: number;
  /** Throughput (notificações/hora) */
  throughput: number;
  /** Total de tentativas */
  totalAttempts: number;
  /** Média de tentativas por notificação */
  averageAttempts: number;
  /** Erros mais comuns */
  topErrors: Array<{ error: string; count: number }>;
}

@Injectable()
export class NotificationMetricsService {
  private readonly logger = new Logger(NotificationMetricsService.name);

  constructor(
    @InjectRepository(NotificationLog)
    private readonly logRepository: Repository<NotificationLog>,
  ) {}

  /**
   * Obtém métricas de notificações para um período
   */
  async getMetrics(
    fromDate: Date,
    toDate: Date,
    eventKey?: string,
    channel?: NotificationChannel,
  ): Promise<NotificationMetrics> {
    const queryBuilder = this.logRepository
      .createQueryBuilder('log')
      .where('log.createdAt >= :fromDate', { fromDate })
      .andWhere('log.createdAt <= :toDate', { toDate });

    if (eventKey) {
      queryBuilder.andWhere('log.eventKey = :eventKey', { eventKey });
    }

    if (channel) {
      queryBuilder.andWhere('log.channel = :channel', { channel });
    }

    const logs = await queryBuilder.getMany();

    const totalNotifications = logs.length;
    const successfulNotifications = logs.filter(
      (l) => l.status === NotificationStatus.SENT || l.status === NotificationStatus.DELIVERED,
    ).length;
    const failedNotifications = logs.filter(
      (l) => l.status === NotificationStatus.FAILED,
    ).length;

    // Calcular latências
    const latencies = logs
      .filter((l) => l.durationMs !== null && l.durationMs !== undefined)
      .map((l) => l.durationMs!)
      .sort((a, b) => a - b);

    const averageLatency =
      latencies.length > 0
        ? latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length
        : 0;

    const p95Index = Math.floor(latencies.length * 0.95);
    const p99Index = Math.floor(latencies.length * 0.99);
    const p95Latency = latencies[p95Index] || 0;
    const p99Latency = latencies[p99Index] || 0;

    // Calcular throughput (notificações por hora)
    const hoursDiff = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60);
    const throughput = hoursDiff > 0 ? totalNotifications / hoursDiff : 0;

    // Contar por status
    const notificationsByStatus: Record<NotificationStatus, number> = {
      [NotificationStatus.PENDING]: 0,
      [NotificationStatus.SENT]: 0,
      [NotificationStatus.FAILED]: 0,
      [NotificationStatus.DELIVERED]: 0,
    };

    for (const log of logs) {
      notificationsByStatus[log.status] =
        (notificationsByStatus[log.status] || 0) + 1;
    }

    // Contar por canal
    const notificationsByChannel: Record<string, number> = {};
    for (const log of logs) {
      notificationsByChannel[log.channel] =
        (notificationsByChannel[log.channel] || 0) + 1;
    }

    // Calcular tentativas
    const totalAttempts = logs.reduce((sum, log) => sum + log.attempts, 0);
    const averageAttempts =
      totalNotifications > 0 ? totalAttempts / totalNotifications : 0;

    // Top erros
    const errorCounts: Record<string, number> = {};
    for (const log of logs) {
      if (log.error) {
        // Normalizar mensagens de erro (pegar primeira linha)
        const errorKey = log.error.split('\n')[0].substring(0, 100);
        errorCounts[errorKey] = (errorCounts[errorKey] || 0) + 1;
      }
    }

    const topErrors = Object.entries(errorCounts)
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const successRate =
      totalNotifications > 0 ? (successfulNotifications / totalNotifications) * 100 : 0;
    const failureRate =
      totalNotifications > 0 ? (failedNotifications / totalNotifications) * 100 : 0;

    return {
      period: {
        from: fromDate,
        to: toDate,
      },
      totalNotifications,
      notificationsByStatus,
      notificationsByChannel,
      successRate: Math.round(successRate * 100) / 100,
      failureRate: Math.round(failureRate * 100) / 100,
      averageLatency: Math.round(averageLatency),
      p95Latency,
      p99Latency,
      throughput: Math.round(throughput * 100) / 100,
      totalAttempts,
      averageAttempts: Math.round(averageAttempts * 100) / 100,
      topErrors,
    };
  }

  /**
   * Obtém métricas resumidas (últimas 24 horas)
   */
  async getSummaryMetrics(): Promise<NotificationMetrics> {
    const toDate = new Date();
    const fromDate = new Date(toDate.getTime() - 24 * 60 * 60 * 1000); // 24 horas atrás

    return this.getMetrics(fromDate, toDate);
  }

  /**
   * Obtém métricas por canal
   */
  async getMetricsByChannel(
    channel: NotificationChannel,
    fromDate: Date,
    toDate: Date,
  ): Promise<NotificationMetrics> {
    return this.getMetrics(fromDate, toDate, undefined, channel);
  }

  /**
   * Obtém métricas por evento
   */
  async getMetricsByEvent(
    eventKey: string,
    fromDate: Date,
    toDate: Date,
  ): Promise<NotificationMetrics> {
    return this.getMetrics(fromDate, toDate, eventKey);
  }
}

