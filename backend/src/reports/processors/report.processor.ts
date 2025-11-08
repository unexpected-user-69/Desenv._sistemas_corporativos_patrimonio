import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { ReportJobData, ReportJobResult } from '../interfaces/report-job-data.interface';
import { ReportsService } from '../reports.service';
import { ReportRequestStatus } from '../entities/report-request.entity';
import { ReportStructuredLoggerService } from '../services/report-structured-logger.service';

/**
 * Processor para processar jobs de relatórios da fila
 */
@Processor('report-queue')
export class ReportProcessor {
  private readonly logger = new Logger(ReportProcessor.name);

  constructor(
    private readonly reportsService: ReportsService,
    private readonly structuredLogger: ReportStructuredLoggerService,
  ) {}

  @Process('process-report')
  async handleReportJob(job: Job<ReportJobData>): Promise<ReportJobResult> {
    const { requestId, type, model, filters, attempt = 1 } = job.data;

    this.logger.log(
      `Processando relatório: ${requestId} (${type}/${model}, attempt ${attempt}/${job.opts.attempts})`,
    );

    // Log estruturado
    this.structuredLogger.logQueueProcessing(
      requestId,
      job.id.toString(),
      type,
      model,
      attempt,
    );

    try {
      // Processar o relatório (gera o arquivo)
      const { buffer, mime } = await this.reportsService.processRequest(requestId);

      // Criar artefato (por enquanto, armazenamos em memória/banco)
      // TODO: Integrar com S3/MinIO para armazenamento real
      const storageKey = `reports/${requestId}.${type.toLowerCase()}`;
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // Expira em 7 dias

      const artifact = await this.reportsService.createArtifact(
        requestId,
        storageKey,
        mime,
        buffer.length,
        expiresAt,
      );

      this.logger.log(
        `Relatório processado com sucesso: ${requestId} (artifact: ${artifact.id})`,
      );

      return {
        success: true,
        requestId,
        artifactId: artifact.id,
      };
    } catch (error: any) {
      this.logger.error(
        `Erro ao processar relatório ${requestId} (attempt ${attempt}):`,
        error.message,
      );

      // Atualizar status para FAILED (já feito no processRequest, mas garantimos)
      try {
        await this.reportsService.updateRequestStatus(
          requestId,
          ReportRequestStatus.FAILED,
          error.message || 'Erro desconhecido ao processar relatório',
        );
      } catch (updateError) {
        this.logger.error(`Erro ao atualizar status da solicitação ${requestId}:`, updateError);
      }

      // Re-throw para que o BullMQ gerencie a reentrega
      throw error;
    }
  }

  /**
   * Handler para jobs que falharam após todas as tentativas (DLQ)
   * Este handler é chamado automaticamente pelo BullMQ quando um job falha
   */
  async handleFailedReport(job: Job<ReportJobData>, error: Error) {
    const { requestId } = job.data;

    this.logger.error(
      `Relatório falhou após todas as tentativas: ${requestId}`,
      error.stack,
    );

    // Job já está na DLQ (removeOnFail configurado)
    // Aqui podemos adicionar lógica adicional, como:
    // - Notificar administradores
    // - Registrar em tabela de DLQ customizada
    // - Enviar para sistema de monitoramento
  }
}


