import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ReportJobData } from '../interfaces/report-job-data.interface';
import { ReportType, ReportModel } from '../entities/report-request.entity';

/**
 * Serviço responsável por enfileirar solicitações de relatórios
 */
@Injectable()
export class ReportQueueService {
  private readonly logger = new Logger(ReportQueueService.name);
  private redisAvailable: boolean = true;
  private lastRedisCheck: number = 0;
  private readonly REDIS_CHECK_INTERVAL = 60000; // 1 minuto

  constructor(
    @InjectQueue('report-queue')
    private readonly reportQueue: Queue<ReportJobData>,
  ) {
    // Verificar conectividade do Redis na inicialização
    this.checkRedisConnection().catch((error) => {
      this.logger.warn('Redis não disponível na inicialização:', error.message);
      this.redisAvailable = false;
    });
  }

  /**
   * Verifica se o Redis está disponível
   */
  private async checkRedisConnection(): Promise<boolean> {
    const now = Date.now();
    
    // Cache do resultado por 1 minuto (apenas se Redis estiver disponível)
    // Se Redis estiver disponível e a última verificação foi recente, usar cache
    if (this.redisAvailable && (now - this.lastRedisCheck) < this.REDIS_CHECK_INTERVAL) {
      return true;
    }

    try {
      // Tentar uma operação simples na fila com timeout
      // Isso vai falhar rapidamente se Redis não estiver disponível
      const checkPromise = this.reportQueue.getWaitingCount();
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Redis check timeout')), 2000)
      );
      
      await Promise.race([checkPromise, timeoutPromise]);
      
      this.redisAvailable = true;
      this.lastRedisCheck = now;
      return true;
    } catch (error: any) {
      const previousStatus = this.redisAvailable;
      this.redisAvailable = false;
      this.lastRedisCheck = now;
      
      // Verificar se é um erro de conexão Redis
      const isRedisError = 
        error.message?.includes('ECONNREFUSED') ||
        error.message?.includes('max retries') ||
        error.message?.includes('Redis') ||
        error.message?.includes('timeout') ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT';
      
      // Só logar quando o status mudar de disponível para indisponível
      // para evitar spam de logs
      if (isRedisError && previousStatus) {
        this.logger.warn('Redis ficou indisponível:', error.message);
      }
      
      return false;
    }
  }

  /**
   * Verifica se o Redis está disponível (método público)
   */
  async isRedisAvailable(): Promise<boolean> {
    return this.checkRedisConnection();
  }

  /**
   * Adiciona uma solicitação de relatório à fila
   */
  async enqueueReport(
    requestId: string,
    type: ReportType,
    model: ReportModel,
    userId: string,
    filters?: Record<string, any>,
    priority: 'high' | 'medium' | 'low' = 'medium',
  ): Promise<string> {
    // Verificar se Redis está disponível antes de tentar enfileirar
    const isAvailable = await this.checkRedisConnection();
    
    if (!isAvailable) {
      const errorMessage = 'Redis não está disponível. Não é possível enfileirar a solicitação.';
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      const jobData: ReportJobData = {
        requestId,
        type,
        model,
        filters,
        userId,
        priority,
        attempt: 1,
      };

      // Configurar opções baseadas na prioridade
      const jobOptions = this.getJobOptions(priority, requestId);

      const job = await this.reportQueue.add('process-report', jobData, jobOptions);

      this.logger.log(
        `Relatório enfileirado: ${requestId} (${type}/${model}, jobId: ${job.id}, priority: ${priority})`,
      );

      return job.id.toString();
    } catch (error: any) {
      // Verificar se é um erro de conexão Redis
      const isRedisError = 
        error.message?.includes('ECONNREFUSED') ||
        error.message?.includes('max retries') ||
        error.message?.includes('Redis') ||
        error.code === 'ECONNREFUSED';
      
      if (isRedisError) {
        this.redisAvailable = false;
        this.lastRedisCheck = Date.now();
        this.logger.error(
          `Erro ao conectar com Redis ao enfileirar relatório ${requestId}:`,
          error.message,
        );
        throw new Error(
          `Redis não está disponível. Verifique se o Redis está rodando (docker-compose up redis ou npm run redis:start)`,
        );
      }
      
      throw error;
    }
  }

  /**
   * Retorna opções de job baseadas na prioridade
   */
  private getJobOptions(priority: 'high' | 'medium' | 'low', requestId: string) {
    const baseOptions = {
      jobId: requestId, // Usar requestId como jobId para idempotência
      removeOnComplete: {
        age: 7 * 24 * 3600, // 7 dias
        count: 1000,
      },
      removeOnFail: {
        age: 30 * 24 * 3600, // 30 dias (DLQ)
      },
    };

    switch (priority) {
      case 'high':
        return {
          ...baseOptions,
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 2000, // 2 segundos inicial
          },
          priority: 1, // Maior prioridade
        };

      case 'medium':
        return {
          ...baseOptions,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000, // 5 segundos inicial
          },
          priority: 2,
        };

      case 'low':
        return {
          ...baseOptions,
          attempts: 2,
          backoff: {
            type: 'exponential',
            delay: 10000, // 10 segundos inicial
          },
          priority: 3,
        };

      default:
        return {
          ...baseOptions,
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
          priority: 2,
        };
    }
  }

  /**
   * Retorna estatísticas da fila
   */
  async getQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.reportQueue.getWaitingCount(),
      this.reportQueue.getActiveCount(),
      this.reportQueue.getCompletedCount(),
      this.reportQueue.getFailedCount(),
      this.reportQueue.getDelayedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
      total: waiting + active + completed + failed + delayed,
    };
  }

  /**
   * Retorna informações sobre um job específico
   */
  async getJobInfo(jobId: string) {
    const job = await this.reportQueue.getJob(jobId);
    if (!job) {
      return null;
    }

    const state = await job.getState();
    const progress = job.progress();

    return {
      id: job.id,
      data: job.data,
      state,
      progress,
      attemptsMade: job.attemptsMade,
      failedReason: job.failedReason,
      processedOn: job.processedOn,
      finishedOn: job.finishedOn,
    };
  }
}



