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

  constructor(
    @InjectQueue('report-queue')
    private readonly reportQueue: Queue<ReportJobData>,
  ) {}

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


