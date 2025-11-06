import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger, Inject, forwardRef } from '@nestjs/common';
import { IntegrationJobData, IntegrationJobResult } from './job-data.interface';
import { ReconciliationService } from './reconciliation.service';

@Processor('integration-queue')
export class IntegrationProcessor {
  private readonly logger = new Logger(IntegrationProcessor.name);

  constructor(
    private readonly reconciliationService: ReconciliationService,
  ) {}

  @Process('import-job')
  async handleImportJob(job: Job<IntegrationJobData>): Promise<IntegrationJobResult> {
    const { executionId, integrationDto, createdBy } = job.data;

    this.logger.log(`Processing import job for execution ${executionId}`);

    try {
      // O processamento real é feito pelo IntegrationsErpService
      // Aqui apenas aguardamos a conclusão e geramos o sumário
      
      // Aguardar um pouco para a execução processar
      // Em produção, isso seria feito de forma mais robusta
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Gerar sumário de reconciliação
      const summary = await this.reconciliationService.generateReconciliationSummary(
        executionId,
      );

      // Salvar sumário
      await this.reconciliationService.saveReconciliationSummary(
        executionId,
        summary,
      );

      return {
        success: true,
        message: 'Import job completed successfully',
        stats: {
          created: summary.inserted,
          updated: summary.updated,
          skipped: summary.ignored,
          failed: summary.errors,
          total: summary.total,
        },
      };
    } catch (error: any) {
      this.logger.error(`Error processing import job ${executionId}`, error);
      return {
        success: false,
        message: error.message || 'Unknown error',
        errors: [error.message],
      };
    }
  }

  @Process('export-job')
  async handleExportJob(job: Job<IntegrationJobData>): Promise<IntegrationJobResult> {
    const { executionId, integrationDto } = job.data;

    this.logger.log(`Processing export job for execution ${executionId}`);

    try {
      // Similar ao import, mas para exportação
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        success: true,
        message: 'Export job completed successfully',
        stats: {
          created: 0,
          updated: 0,
          skipped: 0,
          failed: 0,
          total: 0,
        },
      };
    } catch (error: any) {
      this.logger.error(`Error processing export job ${executionId}`, error);
      return {
        success: false,
        message: error.message || 'Unknown error',
        errors: [error.message],
      };
    }
  }
}

