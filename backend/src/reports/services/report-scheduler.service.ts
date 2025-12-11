import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ReportRequest, ReportRequestStatus } from '../entities/report-request.entity';
import { ReportArtifact } from '../entities/report-artifact.entity';
import { ReportQueueService } from './report-queue.service';

/**
 * Serviço responsável por agendar rotinas periódicas de relatórios
 */
@Injectable()
export class ReportSchedulerService {
  private readonly logger = new Logger(ReportSchedulerService.name);

  constructor(
    @InjectRepository(ReportRequest)
    private readonly requestRepository: Repository<ReportRequest>,
    @InjectRepository(ReportArtifact)
    private readonly artifactRepository: Repository<ReportArtifact>,
    private readonly reportQueue: ReportQueueService,
  ) {}

  /**
   * Processa solicitações pendentes que foram criadas há mais de 1 minuto
   * Executa a cada 5 minutos
   */
  @Cron(CronExpression.EVERY_5_MINUTES)
  async processPendingReports() {
    this.logger.log('Iniciando processamento de solicitações pendentes...');

    try {
      // Verificar se Redis está disponível antes de processar
      const isRedisAvailable = await this.reportQueue.isRedisAvailable();
      
      if (!isRedisAvailable) {
        this.logger.warn(
          'Redis não está disponível. Pulando processamento de solicitações pendentes. ' +
          'Para iniciar o Redis, execute: docker-compose up redis -d ou npm run redis:start',
        );
        return;
      }

      // Buscar solicitações PENDING criadas há mais de 1 minuto
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      const pendingRequests = await this.requestRepository.find({
        where: {
          status: ReportRequestStatus.PENDING,
          createdAt: LessThan(oneMinuteAgo),
        },
        take: 10, // Processar até 10 por vez
      });

      if (pendingRequests.length === 0) {
        this.logger.debug('Nenhuma solicitação pendente encontrada');
        return;
      }

      this.logger.log(`Encontradas ${pendingRequests.length} solicitações pendentes`);

      // Enfileirar cada solicitação
      let successCount = 0;
      let errorCount = 0;

      for (const request of pendingRequests) {
        try {
          await this.reportQueue.enqueueReport(
            request.id,
            request.type,
            request.model,
            request.createdById,
            request.filtersJson,
            'medium',
          );
          this.logger.log(`Solicitação ${request.id} enfileirada com sucesso`);
          successCount++;
        } catch (error: any) {
          errorCount++;
          
          // Verificar se é um erro de Redis
          const isRedisError = 
            error.message?.includes('Redis não está disponível') ||
            error.message?.includes('ECONNREFUSED') ||
            error.message?.includes('max retries');
          
          if (isRedisError) {
            // Se Redis ficou indisponível durante o processamento, parar
            this.logger.warn(
              `Redis ficou indisponível durante o processamento. ` +
              `${successCount} solicitações enfileiradas, ${errorCount} falhas. ` +
              `Para iniciar o Redis, execute: docker-compose up redis -d ou npm run redis:start`,
            );
            break; // Parar o loop se Redis ficar indisponível
          }
          
          this.logger.error(
            `Erro ao enfileirar solicitação ${request.id}:`,
            error.message,
          );
        }
      }

      if (successCount > 0) {
        this.logger.log(
          `Processamento concluído: ${successCount} solicitações enfileiradas com sucesso`,
        );
      }
      
      if (errorCount > 0 && successCount === 0) {
        this.logger.warn(
          `Nenhuma solicitação foi enfileirada. ${errorCount} erros ocorreram.`,
        );
      }
    } catch (error: any) {
      // Verificar se é um erro de Redis
      const isRedisError = 
        error.message?.includes('Redis') ||
        error.message?.includes('ECONNREFUSED') ||
        error.message?.includes('max retries');
      
      if (isRedisError) {
        this.logger.warn(
          'Erro de conexão com Redis ao processar solicitações pendentes. ' +
          'Para iniciar o Redis, execute: docker-compose up redis -d ou npm run redis:start',
        );
      } else {
        this.logger.error('Erro ao processar solicitações pendentes:', error);
      }
    }
  }

  /**
   * Limpa artefatos expirados
   * Executa diariamente às 2h da manhã
   */
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async cleanupExpiredArtifacts() {
    this.logger.log('Iniciando limpeza de artefatos expirados...');

    try {
      const now = new Date();
      const expiredArtifacts = await this.artifactRepository.find({
        where: {
          expiresAt: LessThan(now),
        },
      });

      if (expiredArtifacts.length === 0) {
        this.logger.debug('Nenhum artefato expirado encontrado');
        return;
      }

      this.logger.log(`Encontrados ${expiredArtifacts.length} artefatos expirados`);

      // TODO: Remover arquivos do S3/MinIO antes de deletar do banco
      // Por enquanto, apenas deletamos do banco
      await this.artifactRepository.remove(expiredArtifacts);

      this.logger.log(`${expiredArtifacts.length} artefatos expirados removidos`);
    } catch (error: any) {
      this.logger.error('Erro ao limpar artefatos expirados:', error);
    }
  }

  /**
   * Marca solicitações antigas como expiradas
   * Executa diariamente às 3h da manhã
   */
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async expireOldRequests() {
    this.logger.log('Iniciando expiração de solicitações antigas...');

    try {
      // Solicitações PENDING ou PROCESSING há mais de 24 horas
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const oldRequests = await this.requestRepository.find({
        where: [
          {
            status: ReportRequestStatus.PENDING,
            createdAt: LessThan(oneDayAgo),
          },
          {
            status: ReportRequestStatus.PROCESSING,
            updatedAt: LessThan(oneDayAgo),
          },
        ],
      });

      if (oldRequests.length === 0) {
        this.logger.debug('Nenhuma solicitação antiga encontrada');
        return;
      }

      this.logger.log(`Encontradas ${oldRequests.length} solicitações antigas`);

      // Atualizar status para EXPIRED
      for (const request of oldRequests) {
        request.status = ReportRequestStatus.EXPIRED;
        request.errorMessage = 'Solicitação expirada por timeout';
      }

      await this.requestRepository.save(oldRequests);

      this.logger.log(`${oldRequests.length} solicitações marcadas como expiradas`);
    } catch (error: any) {
      this.logger.error('Erro ao expirar solicitações antigas:', error);
    }
  }

  /**
   * Gera relatórios periódicos (exemplo: relatório diário de manutenção)
   * Executa diariamente às 6h da manhã
   */
  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async generateDailyReports() {
    this.logger.log('Iniciando geração de relatórios periódicos...');

    try {
      // TODO: Implementar lógica para gerar relatórios periódicos
      // Por exemplo:
      // - Relatório diário de manutenções concluídas
      // - Relatório semanal de patrimônio
      // - Relatório mensal de uso

      this.logger.log('Geração de relatórios periódicos concluída');
    } catch (error: any) {
      this.logger.error('Erro ao gerar relatórios periódicos:', error);
    }
  }
}



