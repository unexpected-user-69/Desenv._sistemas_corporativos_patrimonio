import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ReportRequest, ReportRequestStatus, ReportType, ReportModel } from '../entities/report-request.entity';

export interface ReportMetrics {
  /** Período analisado */
  period: {
    from: Date;
    to: Date;
  };
  /** Total de solicitações */
  totalRequests: number;
  /** Solicitações por status */
  requestsByStatus: Record<ReportRequestStatus, number>;
  /** Solicitações por tipo */
  requestsByType: Record<ReportType, number>;
  /** Solicitações por modelo */
  requestsByModel: Record<ReportModel, number>;
  /** Taxa de sucesso (%) */
  successRate: number;
  /** Taxa de falha (%) */
  failureRate: number;
  /** Tempo médio de processamento (ms) */
  averageProcessingTime: number;
  /** Tempo de processamento p95 (ms) */
  p95ProcessingTime: number;
  /** Tempo de processamento p99 (ms) */
  p99ProcessingTime: number;
  /** Throughput (solicitações/hora) */
  throughput: number;
  /** Erros mais comuns */
  topErrors: Array<{ error: string; count: number }>;
  /** Solicitações por usuário */
  requestsByUser: Array<{ userId: string; count: number }>;
}

@Injectable()
export class ReportMetricsService {
  private readonly logger = new Logger(ReportMetricsService.name);

  constructor(
    @InjectRepository(ReportRequest)
    private readonly requestRepository: Repository<ReportRequest>,
  ) {}

  /**
   * Obtém métricas de relatórios para um período
   */
  async getMetrics(
    fromDate: Date,
    toDate: Date,
    userId?: string,
    model?: ReportModel,
  ): Promise<ReportMetrics> {
    const queryBuilder = this.requestRepository
      .createQueryBuilder('request')
      .where('request.createdAt >= :fromDate', { fromDate })
      .andWhere('request.createdAt <= :toDate', { toDate });

    if (userId) {
      queryBuilder.andWhere('request.createdById = :userId', { userId });
    }

    if (model) {
      queryBuilder.andWhere('request.model = :model', { model });
    }

    const requests = await queryBuilder.getMany();

    const totalRequests = requests.length;
    const successfulRequests = requests.filter(
      (r) => r.status === ReportRequestStatus.COMPLETED,
    ).length;
    const failedRequests = requests.filter(
      (r) => r.status === ReportRequestStatus.FAILED,
    ).length;

    // Calcular tempos de processamento (baseado em createdAt e updatedAt)
    const processingTimes = requests
      .filter((r) => r.status === ReportRequestStatus.COMPLETED || r.status === ReportRequestStatus.FAILED)
      .map((r) => {
        const processingTime = r.updatedAt.getTime() - r.createdAt.getTime();
        return processingTime > 0 ? processingTime : 0;
      })
      .filter((t) => t > 0)
      .sort((a, b) => a - b);

    const averageProcessingTime =
      processingTimes.length > 0
        ? processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length
        : 0;

    const p95Index = Math.floor(processingTimes.length * 0.95);
    const p99Index = Math.floor(processingTimes.length * 0.99);
    const p95ProcessingTime = processingTimes[p95Index] || 0;
    const p99ProcessingTime = processingTimes[p99Index] || 0;

    // Calcular throughput (solicitações por hora)
    const hoursDiff = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60);
    const throughput = hoursDiff > 0 ? totalRequests / hoursDiff : 0;

    // Contar por status
    const requestsByStatus: Record<ReportRequestStatus, number> = {
      [ReportRequestStatus.PENDING]: 0,
      [ReportRequestStatus.PROCESSING]: 0,
      [ReportRequestStatus.COMPLETED]: 0,
      [ReportRequestStatus.FAILED]: 0,
      [ReportRequestStatus.EXPIRED]: 0,
    };

    for (const request of requests) {
      requestsByStatus[request.status] = (requestsByStatus[request.status] || 0) + 1;
    }

    // Contar por tipo
    const requestsByType: Record<ReportType, number> = {
      [ReportType.CSV]: 0,
      [ReportType.PDF]: 0,
    };

    for (const request of requests) {
      requestsByType[request.type] = (requestsByType[request.type] || 0) + 1;
    }

    // Contar por modelo
    const requestsByModel: Record<ReportModel, number> = {
      [ReportModel.PATRIMONIO]: 0,
      [ReportModel.MANUTENCAO]: 0,
      [ReportModel.INVENTARIO]: 0,
      [ReportModel.USO]: 0,
    };

    for (const request of requests) {
      requestsByModel[request.model] = (requestsByModel[request.model] || 0) + 1;
    }

    // Top erros
    const errorCounts: Record<string, number> = {};
    for (const request of requests) {
      if (request.errorMessage) {
        // Normalizar mensagens de erro (pegar primeira linha)
        const errorKey = request.errorMessage.split('\n')[0].substring(0, 100);
        errorCounts[errorKey] = (errorCounts[errorKey] || 0) + 1;
      }
    }

    const topErrors = Object.entries(errorCounts)
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Solicitações por usuário
    const userCounts: Record<string, number> = {};
    for (const request of requests) {
      userCounts[request.createdById] = (userCounts[request.createdById] || 0) + 1;
    }

    const requestsByUser = Object.entries(userCounts)
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    const successRate =
      totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;
    const failureRate =
      totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;

    return {
      period: {
        from: fromDate,
        to: toDate,
      },
      totalRequests,
      requestsByStatus,
      requestsByType,
      requestsByModel,
      successRate: Math.round(successRate * 100) / 100,
      failureRate: Math.round(failureRate * 100) / 100,
      averageProcessingTime: Math.round(averageProcessingTime),
      p95ProcessingTime,
      p99ProcessingTime,
      throughput: Math.round(throughput * 100) / 100,
      topErrors,
      requestsByUser,
    };
  }

  /**
   * Obtém métricas resumidas (últimas 24 horas)
   */
  async getSummaryMetrics(userId?: string): Promise<ReportMetrics> {
    const toDate = new Date();
    const fromDate = new Date(toDate.getTime() - 24 * 60 * 60 * 1000); // 24 horas atrás

    return this.getMetrics(fromDate, toDate, userId);
  }

  /**
   * Obtém métricas por modelo
   */
  async getMetricsByModel(
    model: ReportModel,
    fromDate: Date,
    toDate: Date,
  ): Promise<ReportMetrics> {
    return this.getMetrics(fromDate, toDate, undefined, model);
  }

  /**
   * Obtém métricas por usuário
   */
  async getMetricsByUser(
    userId: string,
    fromDate: Date,
    toDate: Date,
  ): Promise<ReportMetrics> {
    return this.getMetrics(fromDate, toDate, userId);
  }
}

