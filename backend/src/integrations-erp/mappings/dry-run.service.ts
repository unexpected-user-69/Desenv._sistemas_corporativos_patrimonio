import { Injectable, Logger } from '@nestjs/common';
import { DataMapperService, MappingResult } from './data-mapper.service';
import { IdempotencyService } from './idempotency.service';
import { MappingConfigService } from './mapping-config.service';
import { DryRunReportDto, DryRunRecordDto } from './dry-run-report.dto';
import { IntegrationEntity } from '../dto/run-integration.dto';
import { Connector } from '../entities/connector.entity';

@Injectable()
export class DryRunService {
  private readonly logger = new Logger(DryRunService.name);

  constructor(
    private readonly dataMapper: DataMapperService,
    private readonly idempotency: IdempotencyService,
    private readonly mappingConfig: MappingConfigService,
  ) {}

  /**
   * Gera relatório de dry-run para uma execução
   */
  async generateDryRunReport(
    executionId: string,
    connector: Connector,
    entity: IntegrationEntity,
    sourceRecords: Record<string, any>[],
  ): Promise<DryRunReportDto> {
    // Obter configuração de mapeamento
    let mappingConfig = this.mappingConfig.getMappingConfig(connector, entity);
    if (!mappingConfig) {
      mappingConfig = this.mappingConfig.getDefaultMappingConfig(entity);
      this.logger.warn(
        `Using default mapping config for entity ${entity}`,
      );
    }

    // Mapear registros
    const mappingResult = this.dataMapper.mapRecords(
      sourceRecords,
      mappingConfig,
    );

    // Verificar idempotência e determinar ações
    const records: DryRunRecordDto[] = [];
    const divergences: DryRunReportDto['divergences'] = [];
    let wouldCreate = 0;
    let wouldUpdate = 0;
    let wouldSkip = 0;

    for (const record of mappingResult.mapped) {
      const idempotencyCheck = await this.idempotency.checkIdempotency(
        executionId,
        entity,
        record.externalId,
      );

      let action: 'create' | 'update' | 'skip' = 'create';
      if (idempotencyCheck.exists) {
        if (idempotencyCheck.hasChanges) {
          action = 'update';
          wouldUpdate++;
        } else {
          action = 'skip';
          wouldSkip++;
        }
      } else {
        wouldCreate++;
      }

      records.push({
        externalId: record.externalId,
        data: record.data,
        errors: record.errors,
        valid: record.valid,
        action,
      });
    }

    // Adicionar registros com falha
    for (const record of mappingResult.failed) {
      records.push({
        externalId: record.externalId,
        data: record.data,
        errors: record.errors,
        valid: false,
      });
    }

    return {
      records,
      stats: {
        total: mappingResult.stats.total,
        successful: mappingResult.stats.successful,
        failed: mappingResult.stats.failed,
        wouldCreate,
        wouldUpdate,
        wouldSkip,
        errorsByField: mappingResult.stats.errorsByField,
      },
      divergences,
    };
  }
}

