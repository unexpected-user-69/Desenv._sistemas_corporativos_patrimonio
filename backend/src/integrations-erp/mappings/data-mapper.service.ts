import { Injectable, Logger } from '@nestjs/common';
import {
  EntityMappingConfig,
  FieldMapping,
} from './field-mapping.interface';
import { FieldTransformerService } from './field-transformer.service';

export interface MappedRecord {
  /** ID externo do registro */
  externalId: string;
  /** Dados mapeados */
  data: Record<string, any>;
  /** Erros de mapeamento/validação */
  errors: string[];
  /** Se o registro é válido */
  valid: boolean;
}

export interface MappingResult {
  /** Registros mapeados com sucesso */
  mapped: MappedRecord[];
  /** Registros com erros */
  failed: MappedRecord[];
  /** Estatísticas */
  stats: {
    total: number;
    successful: number;
    failed: number;
    errorsByField: Record<string, number>;
  };
}

@Injectable()
export class DataMapperService {
  private readonly logger = new Logger(DataMapperService.name);

  constructor(
    private readonly transformer: FieldTransformerService,
  ) {}

  /**
   * Mapeia um array de registros de acordo com a configuração
   */
  mapRecords(
    sourceRecords: Record<string, any>[],
    config: EntityMappingConfig,
  ): MappingResult {
    const mapped: MappedRecord[] = [];
    const failed: MappedRecord[] = [];
    const errorsByField: Record<string, number> = {};

    for (const sourceRecord of sourceRecords) {
      const mappedRecord = this.mapRecord(sourceRecord, config);
      
      // Contar erros por campo
      for (const error of mappedRecord.errors) {
        const fieldMatch = error.match(/Campo (\w+)/);
        if (fieldMatch) {
          const field = fieldMatch[1];
          errorsByField[field] = (errorsByField[field] || 0) + 1;
        }
      }

      if (mappedRecord.valid) {
        mapped.push(mappedRecord);
      } else {
        failed.push(mappedRecord);
      }
    }

    return {
      mapped,
      failed,
      stats: {
        total: sourceRecords.length,
        successful: mapped.length,
        failed: failed.length,
        errorsByField,
      },
    };
  }

  /**
   * Mapeia um único registro
   */
  private mapRecord(
    sourceRecord: Record<string, any>,
    config: EntityMappingConfig,
  ): MappedRecord {
    const errors: string[] = [];
    const mappedData: Record<string, any> = {};

    // Extrair externalId
    const externalId = sourceRecord[config.externalIdField];
    if (!externalId) {
      errors.push(`Campo ${config.externalIdField} (externalId) não encontrado`);
    }

    // Aplicar mapeamentos
    for (const mapping of config.fieldMappings) {
      const sourceValue = this.getNestedValue(sourceRecord, mapping.source);
      const result = this.transformer.transform(sourceValue, mapping);

      if (result.errors.length > 0) {
        errors.push(...result.errors);
      }

      if (result.value !== null && result.value !== undefined) {
        this.setNestedValue(mappedData, mapping.target, result.value);
      }
    }

    // Aplicar validações globais
    if (config.globalValidations) {
      for (const validation of config.globalValidations) {
        // TODO: Implementar validações globais se necessário
      }
    }

    return {
      externalId: externalId || '',
      data: mappedData,
      errors,
      valid: errors.length === 0 && !!externalId,
    };
  }

  /**
   * Obtém valor aninhado de um objeto usando notação de ponto
   */
  private getNestedValue(obj: any, path: string): any {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      if (value === null || value === undefined) {
        return undefined;
      }
      value = value[key];
    }
    return value;
  }

  /**
   * Define valor aninhado em um objeto usando notação de ponto
   */
  private setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
  }
}





