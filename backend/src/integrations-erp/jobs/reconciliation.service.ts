import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Execution } from '../entities/execution.entity';
import { ExecutionLog, LogLevel } from '../entities/execution-log.entity';

export interface ReconciliationSummary {
  /** Total de registros processados */
  total: number;
  /** Registros inseridos */
  inserted: number;
  /** Registros atualizados */
  updated: number;
  /** Registros ignorados (duplicados sem mudanças) */
  ignored: number;
  /** Registros com erro */
  errors: number;
  /** Detalhes dos erros */
  errorDetails: Array<{
    externalId: string;
    error: string;
    field?: string;
  }>;
  /** Estatísticas por campo */
  fieldStats?: Record<string, {
    mapped: number;
    errors: number;
  }>;
}

@Injectable()
export class ReconciliationService {
  private readonly logger = new Logger(ReconciliationService.name);

  constructor(private readonly dataSource: DataSource) {}

  /**
   * Gera sumário de reconciliação a partir dos logs de uma execução
   */
  async generateReconciliationSummary(
    executionId: string,
  ): Promise<ReconciliationSummary> {
    const execution = await this.dataSource.manager.findOne(Execution, {
      where: { id: executionId },
      relations: ['logs'],
    });

    if (!execution) {
      throw new Error(`Execution ${executionId} not found`);
    }

    const summary: ReconciliationSummary = {
      total: 0,
      inserted: 0,
      updated: 0,
      ignored: 0,
      errors: 0,
      errorDetails: [],
      fieldStats: {},
    };

    // Processar logs para extrair estatísticas
    for (const log of execution.logs || []) {
      const meta = log.metaJson as any;

      // Contar inserções
      if (log.message.includes('created') || log.message.includes('inserted')) {
        summary.inserted += meta.count || 1;
        summary.total += meta.count || 1;
      }

      // Contar atualizações
      if (log.message.includes('updated')) {
        summary.updated += meta.count || 1;
        summary.total += meta.count || 1;
      }

      // Contar ignorados
      if (log.message.includes('Skipping duplicate') || log.message.includes('skipped')) {
        summary.ignored += meta.count || 1;
        summary.total += meta.count || 1;
      }

      // Contar erros
      if (log.level === LogLevel.ERROR || log.level === LogLevel.WARN) {
        summary.errors += 1;
        if (meta.externalId || meta.error) {
          summary.errorDetails.push({
            externalId: meta.externalId || 'unknown',
            error: log.message,
            field: meta.field,
          });
        }
      }

      // Estatísticas por campo
      if (meta.errorsByField) {
        for (const [field, count] of Object.entries(meta.errorsByField as Record<string, number>)) {
          if (!summary.fieldStats![field]) {
            summary.fieldStats![field] = { mapped: 0, errors: 0 };
          }
          summary.fieldStats![field].errors += count as number;
        }
      }
    }

    // Buscar log final com estatísticas consolidadas
    const finalLog = execution.logs
      ?.filter((log) => log.message.includes('completed') || log.message.includes('Import completed'))
      .pop();

    if (finalLog?.metaJson) {
      const finalMeta = finalLog.metaJson as any;
      if (finalMeta.created !== undefined) {
        summary.inserted = finalMeta.created;
      }
      if (finalMeta.updated !== undefined) {
        summary.updated = finalMeta.updated;
      }
      if (finalMeta.skipped !== undefined) {
        summary.ignored = finalMeta.skipped;
      }
      if (finalMeta.failed !== undefined) {
        summary.errors = finalMeta.failed;
      }
      summary.total = (summary.inserted || 0) + (summary.updated || 0) + (summary.ignored || 0) + (summary.errors || 0);
    }

    return summary;
  }

  /**
   * Salva sumário de reconciliação nos logs
   */
  async saveReconciliationSummary(
    executionId: string,
    summary: ReconciliationSummary,
  ): Promise<void> {
    const logRepo = this.dataSource.manager.getRepository(ExecutionLog);
    
    const log = logRepo.create({
      executionId,
      level: LogLevel.INFO,
      message: 'Reconciliation summary',
      metaJson: {
        summary: {
          total: summary.total,
          inserted: summary.inserted,
          updated: summary.updated,
          ignored: summary.ignored,
          errors: summary.errors,
          errorDetails: summary.errorDetails,
          fieldStats: summary.fieldStats,
        },
      },
    });

    await logRepo.save(log);
  }
}

