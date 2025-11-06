import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Connector } from '../entities/connector.entity';
import { Execution, ExecutionStatus } from '../entities/execution.entity';

export interface IntegrationHealth {
  /** Chave do conector */
  connectorKey: string;
  /** Nome do conector */
  connectorName: string;
  /** Status de saúde */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Se o conector está habilitado */
  enabled: boolean;
  /** Última execução bem-sucedida */
  lastSuccess?: Date;
  /** Última execução falhada */
  lastFailure?: Date;
  /** Taxa de sucesso nas últimas 24h (%) */
  successRate24h: number;
  /** Latência média nas últimas 24h (ms) */
  averageLatency24h: number;
  /** SLA atual (%) */
  sla: number;
  /** Mensagens de status */
  messages: string[];
}

export interface HealthCheckResult {
  /** Status geral */
  status: 'healthy' | 'degraded' | 'unhealthy';
  /** Timestamp da verificação */
  timestamp: Date;
  /** Health de cada integração */
  integrations: IntegrationHealth[];
  /** Resumo */
  summary: {
    total: number;
    healthy: number;
    degraded: number;
    unhealthy: number;
  };
}

@Injectable()
export class HealthCheckService {
  private readonly logger = new Logger(HealthCheckService.name);

  constructor(
    @InjectRepository(Connector)
    private readonly connectorRepository: Repository<Connector>,
    @InjectRepository(Execution)
    private readonly executionRepository: Repository<Execution>,
  ) {}

  /**
   * Verifica saúde de uma integração específica
   */
  async checkIntegrationHealth(
    connectorKey: string,
  ): Promise<IntegrationHealth> {
    const connector = await this.connectorRepository.findOne({
      where: { key: connectorKey },
    });

    if (!connector) {
      throw new Error(`Connector ${connectorKey} not found`);
    }

    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Buscar execuções das últimas 24h
    const recentExecutions = await this.executionRepository.find({
      where: {
        connectorId: connector.id,
        createdAt: MoreThan(last24h),
      },
      order: { createdAt: 'DESC' },
    });

    const successful = recentExecutions.filter(
      (e) => e.status === ExecutionStatus.SUCCESS,
    );
    const failed = recentExecutions.filter(
      (e) => e.status === ExecutionStatus.FAILED,
    );

    const total = recentExecutions.length;
    const successRate24h =
      total > 0 ? (successful.length / total) * 100 : 100;

    // Calcular latência média
    const latencies = successful
      .filter((e) => e.startedAt && e.finishedAt)
      .map((e) => e.finishedAt!.getTime() - e.startedAt!.getTime());
    const averageLatency24h =
      latencies.length > 0
        ? latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length
        : 0;

    const lastSuccess = successful[0]?.finishedAt;
    const lastFailure = failed[0]?.finishedAt;

    // Determinar status
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    const messages: string[] = [];

    if (!connector.enabled) {
      status = 'unhealthy';
      messages.push('Connector está desabilitado');
    } else if (successRate24h < 50) {
      status = 'unhealthy';
      messages.push(`Taxa de sucesso muito baixa: ${successRate24h.toFixed(1)}%`);
    } else if (successRate24h < 80) {
      status = 'degraded';
      messages.push(`Taxa de sucesso abaixo do ideal: ${successRate24h.toFixed(1)}%`);
    }

    if (lastFailure && (!lastSuccess || lastFailure > lastSuccess)) {
      const hoursSinceFailure =
        (now.getTime() - lastFailure.getTime()) / (1000 * 60 * 60);
      if (hoursSinceFailure < 1) {
        status = 'degraded';
        messages.push('Falha recente detectada');
      }
    }

    // Calcular SLA (objetivo: 99.5%)
    const sla = Math.min(100, successRate24h);

    return {
      connectorKey: connector.key,
      connectorName: connector.name,
      status,
      enabled: connector.enabled,
      lastSuccess: lastSuccess || undefined,
      lastFailure: lastFailure || undefined,
      successRate24h: Math.round(successRate24h * 100) / 100,
      averageLatency24h: Math.round(averageLatency24h),
      sla: Math.round(sla * 100) / 100,
      messages,
    };
  }

  /**
   * Verifica saúde de todas as integrações
   */
  async checkAllIntegrationsHealth(): Promise<HealthCheckResult> {
    const connectors = await this.connectorRepository.find();
    const integrations: IntegrationHealth[] = [];

    for (const connector of connectors) {
      try {
        const health = await this.checkIntegrationHealth(connector.key);
        integrations.push(health);
      } catch (error: any) {
        this.logger.error(
          `Failed to check health for connector ${connector.key}`,
          error,
        );
        integrations.push({
          connectorKey: connector.key,
          connectorName: connector.name,
          status: 'unhealthy',
          enabled: connector.enabled,
          successRate24h: 0,
          averageLatency24h: 0,
          sla: 0,
          messages: [`Erro ao verificar saúde: ${error.message}`],
        });
      }
    }

    const healthy = integrations.filter((i) => i.status === 'healthy').length;
    const degraded = integrations.filter((i) => i.status === 'degraded').length;
    const unhealthy = integrations.filter((i) => i.status === 'unhealthy').length;

    // Status geral baseado na maioria
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    if (unhealthy > 0) {
      overallStatus = unhealthy > degraded ? 'unhealthy' : 'degraded';
    } else if (degraded > 0) {
      overallStatus = 'degraded';
    }

    return {
      status: overallStatus,
      timestamp: new Date(),
      integrations,
      summary: {
        total: integrations.length,
        healthy,
        degraded,
        unhealthy,
      },
    };
  }
}

