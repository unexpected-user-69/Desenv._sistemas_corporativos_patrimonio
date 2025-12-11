import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Execution, ExecutionStatus } from '../entities/execution.entity';
import { Connector } from '../entities/connector.entity';

export interface ConnectorMetrics {
  /** Chave do conector */
  connectorKey: string;
  /** Nome do conector */
  connectorName: string;
  /** Período analisado */
  period: {
    from: Date;
    to: Date;
  };
  /** Total de execuções */
  totalExecutions: number;
  /** Execuções por status */
  executionsByStatus: Record<ExecutionStatus, number>;
  /** Taxa de sucesso (%) */
  successRate: number;
  /** Latência média (ms) */
  averageLatency: number;
  /** Latência p95 (ms) */
  p95Latency: number;
  /** Latência p99 (ms) */
  p99Latency: number;
  /** Throughput (execuções/hora) */
  throughput: number;
  /** Erros por código HTTP */
  errorsByCode: Record<string, number>;
  /** Total de registros processados */
  totalRecordsProcessed: number;
  /** Taxa de erro (%) */
  errorRate: number;
}

@Injectable()
export class IntegrationMetricsService {
  private readonly logger = new Logger(IntegrationMetricsService.name);

  constructor(
    @InjectRepository(Execution)
    private readonly executionRepository: Repository<Execution>,
    @InjectRepository(Connector)
    private readonly connectorRepository: Repository<Connector>,
  ) {}

  /**
   * Obtém métricas de um conector para um período
   */
  async getConnectorMetrics(
    connectorKey: string,
    fromDate: Date,
    toDate: Date,
  ): Promise<ConnectorMetrics> {
    const connector = await this.connectorRepository.findOne({
      where: { key: connectorKey },
    });

    if (!connector) {
      throw new NotFoundException(`Connector ${connectorKey} not found`);
    }

    const executions = await this.executionRepository.find({
      where: {
        connectorId: connector.id,
        createdAt: Between(fromDate, toDate),
      },
      relations: ['logs'],
    });

    const totalExecutions = executions.length;
    const successfulExecutions = executions.filter(
      (e) => e.status === ExecutionStatus.SUCCESS,
    ).length;
    const failedExecutions = executions.filter(
      (e) => e.status === ExecutionStatus.FAILED,
    ).length;

    // Calcular latências
    const latencies = executions
      .filter((e) => e.startedAt && e.finishedAt)
      .map((e) => {
        const start = e.startedAt!.getTime();
        const end = e.finishedAt!.getTime();
        return end - start;
      })
      .sort((a, b) => a - b);

    const averageLatency =
      latencies.length > 0
        ? latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length
        : 0;

    const p95Index = Math.floor(latencies.length * 0.95);
    const p99Index = Math.floor(latencies.length * 0.99);
    const p95Latency = latencies[p95Index] || 0;
    const p99Latency = latencies[p99Index] || 0;

    // Calcular throughput (execuções por hora)
    const hoursDiff = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60);
    const throughput = hoursDiff > 0 ? totalExecutions / hoursDiff : 0;

    // Contar execuções por status
    const executionsByStatus: Record<ExecutionStatus, number> = {
      [ExecutionStatus.QUEUED]: 0,
      [ExecutionStatus.RUNNING]: 0,
      [ExecutionStatus.SUCCESS]: 0,
      [ExecutionStatus.FAILED]: 0,
      [ExecutionStatus.CANCELED]: 0,
    };

    for (const execution of executions) {
      executionsByStatus[execution.status] =
        (executionsByStatus[execution.status] || 0) + 1;
    }

    // Extrair erros por código dos logs
    const errorsByCode: Record<string, number> = {};
    for (const execution of executions) {
      if (execution.error) {
        // Tentar extrair código HTTP do erro
        const httpCodeMatch = execution.error.match(/\b(\d{3})\b/);
        if (httpCodeMatch) {
          const code = httpCodeMatch[1];
          errorsByCode[code] = (errorsByCode[code] || 0) + 1;
        } else {
          errorsByCode['unknown'] = (errorsByCode['unknown'] || 0) + 1;
        }
      }
    }

    // Contar registros processados dos logs
    let totalRecordsProcessed = 0;
    for (const execution of executions) {
      for (const log of execution.logs || []) {
        const meta = log.metaJson as any;
        if (meta.count !== undefined) {
          totalRecordsProcessed += meta.count;
        }
        if (meta.created !== undefined) {
          totalRecordsProcessed += meta.created;
        }
        if (meta.updated !== undefined) {
          totalRecordsProcessed += meta.updated;
        }
      }
    }

    const successRate =
      totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;
    const errorRate =
      totalExecutions > 0 ? (failedExecutions / totalExecutions) * 100 : 0;

    return {
      connectorKey: connector.key,
      connectorName: connector.name,
      period: {
        from: fromDate,
        to: toDate,
      },
      totalExecutions,
      executionsByStatus,
      successRate: Math.round(successRate * 100) / 100,
      averageLatency: Math.round(averageLatency),
      p95Latency,
      p99Latency,
      throughput: Math.round(throughput * 100) / 100,
      errorsByCode,
      totalRecordsProcessed,
      errorRate: Math.round(errorRate * 100) / 100,
    };
  }

  /**
   * Obtém métricas de todos os conectores
   */
  async getAllConnectorsMetrics(
    fromDate: Date,
    toDate: Date,
  ): Promise<ConnectorMetrics[]> {
    const connectors = await this.connectorRepository.find();
    const metrics: ConnectorMetrics[] = [];

    for (const connector of connectors) {
      try {
        const metric = await this.getConnectorMetrics(
          connector.key,
          fromDate,
          toDate,
        );
        metrics.push(metric);
      } catch (error: any) {
        this.logger.warn(
          `Failed to get metrics for connector ${connector.key}`,
          error,
        );
      }
    }

    return metrics;
  }
}


