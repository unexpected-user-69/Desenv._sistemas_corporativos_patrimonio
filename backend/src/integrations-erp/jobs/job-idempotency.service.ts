import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Execution } from '../entities/execution.entity';
import { JobIdempotencyKey } from './job-data.interface';
import { ExecutionType } from '../entities/execution.entity';
import { IntegrationEntity } from '../dto/run-integration.dto';

@Injectable()
export class JobIdempotencyService {
  private readonly logger = new Logger(JobIdempotencyService.name);
  private readonly jobCache: Map<string, string> = new Map();

  constructor(
    @InjectRepository(Execution)
    private readonly executionRepository: Repository<Execution>,
  ) {}

  /**
   * Gera chave de idempotência para um job
   */
  generateIdempotencyKey(
    connectorKey: string,
    type: ExecutionType,
    entity: IntegrationEntity,
    timeWindowMinutes: number = 60,
  ): JobIdempotencyKey {
    // Arredondar para a janela temporal (ex: 60 minutos)
    const now = Date.now();
    const windowMs = timeWindowMinutes * 60 * 1000;
    const timeWindow = Math.floor(now / windowMs) * windowMs;

    return {
      connectorKey,
      type,
      entity,
      timeWindow,
    };
  }

  /**
   * Gera string de chave a partir do objeto
   */
  keyToString(key: JobIdempotencyKey): string {
    return `${key.connectorKey}:${key.type}:${key.entity}:${key.timeWindow}`;
  }

  /**
   * Verifica se um job já está em execução ou foi executado recentemente
   */
  async checkJobIdempotency(
    key: JobIdempotencyKey,
  ): Promise<{ exists: boolean; executionId?: string }> {
    const keyString = this.keyToString(key);

    // Verificar cache em memória
    const cachedExecutionId = this.jobCache.get(keyString);
    if (cachedExecutionId) {
      // Verificar se a execução ainda existe e está ativa
      const execution = await this.executionRepository.findOne({
        where: { id: cachedExecutionId },
      });

      if (execution && this.isExecutionActive(execution.status)) {
        return { exists: true, executionId: cachedExecutionId };
      } else {
        // Remover do cache se não está mais ativa
        this.jobCache.delete(keyString);
      }
    }

    // Verificar no banco de dados
    const recentExecution = await this.executionRepository
      .createQueryBuilder('execution')
      .leftJoin('execution.connector', 'connector')
      .where('connector.key = :connectorKey', { connectorKey: key.connectorKey })
      .andWhere('execution.type = :type', { type: key.type })
      .andWhere('execution.created_at >= :timeWindow', {
        timeWindow: new Date(key.timeWindow),
      })
      .andWhere('execution.status IN (:...statuses)', {
        statuses: ['queued', 'running'],
      })
      .orderBy('execution.created_at', 'DESC')
      .getOne();

    if (recentExecution) {
      this.jobCache.set(keyString, recentExecution.id);
      return { exists: true, executionId: recentExecution.id };
    }

    return { exists: false };
  }

  /**
   * Registra um job como executado
   */
  async registerJob(key: JobIdempotencyKey, executionId: string): Promise<void> {
    const keyString = this.keyToString(key);
    this.jobCache.set(keyString, executionId);

    // Limpar cache antigo (manter apenas últimas 1000 entradas)
    if (this.jobCache.size > 1000) {
      const entries = Array.from(this.jobCache.entries());
      const toRemove = entries.slice(0, entries.length - 1000);
      for (const [k] of toRemove) {
        this.jobCache.delete(k);
      }
    }
  }

  /**
   * Verifica se uma execução está ativa (não finalizada)
   */
  private isExecutionActive(status: string): boolean {
    return ['queued', 'running'].includes(status);
  }

  /**
   * Limpa cache de jobs antigos
   */
  clearOldCache(): void {
    // Limpar cache com mais de 24 horas
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas

    for (const [key] of this.jobCache.entries()) {
      const timeWindow = parseInt(key.split(':').pop() || '0', 10);
      if (now - timeWindow > maxAge) {
        this.jobCache.delete(key);
      }
    }
  }
}




