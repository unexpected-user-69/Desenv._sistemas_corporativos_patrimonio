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

      // Verificar se o erro é porque a solicitação não existe
      const isNotFoundError = error.message?.includes('não encontrada') || 
                              error.message?.includes('not found') ||
                              error.status === 404 ||
                              error.statusCode === 404;

      if (isNotFoundError) {
        // Se a solicitação não existe, não tentar atualizar o status
        // Apenas logar e marcar o job como concluído (sem rethrow)
        this.logger.warn(
          `Solicitação ${requestId} não encontrada no banco de dados. Job será marcado como concluído sem processar.`,
        );
        
        // Retornar resultado indicando que o job foi concluído mas não processado
        // Isso evita que o BullMQ tente reprocessar indefinidamente
        return {
          success: false,
          requestId,
          artifactId: undefined,
          skipped: true,
          reason: 'Solicitação não encontrada no banco de dados',
        };
      }

      // Para outros erros, tentar atualizar o status para FAILED
      // Mas verificar se a solicitação existe antes
      try {
        // Verificar se a solicitação existe antes de tentar atualizar
        const request = await this.reportsService.findOne(requestId);
        if (request) {
          await this.reportsService.updateRequestStatus(
            requestId,
            ReportRequestStatus.FAILED,
            error.message || 'Erro desconhecido ao processar relatório',
          );
        } else {
          this.logger.warn(
            `Solicitação ${requestId} não encontrada. Não é possível atualizar o status.`,
          );
        }
      } catch (updateError: any) {
        // Se também for erro de não encontrado, apenas logar
        if (updateError.message?.includes('não encontrada') || 
            updateError.status === 404 ||
            updateError.statusCode === 404) {
          this.logger.warn(
            `Solicitação ${requestId} não encontrada. Status não pode ser atualizado.`,
          );
        } else {
          this.logger.error(
            `Erro ao atualizar status da solicitação ${requestId}:`,
            updateError.message || updateError,
          );
        }
      }

      // Re-throw apenas se não for erro de "não encontrado"
      // Isso evita que jobs de solicitações inexistentes fiquem sendo reprocessados
      if (!isNotFoundError) {
        throw error;
      }

      // Para erros de "não encontrado", retornar resultado sem rethrow
      return {
        success: false,
        requestId,
        artifactId: undefined,
        skipped: true,
        reason: 'Solicitação não encontrada',
      };
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


