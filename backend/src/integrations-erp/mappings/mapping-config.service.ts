import { Injectable, Logger } from '@nestjs/common';
import { Connector } from '../entities/connector.entity';
import {
  EntityMappingConfig,
  FieldMapping,
  TransformType,
  ValidationType,
} from './field-mapping.interface';
import { IntegrationEntity } from '../dto/run-integration.dto';

@Injectable()
export class MappingConfigService {
  private readonly logger = new Logger(MappingConfigService.name);

  /**
   * Obtém configuração de mapeamento para uma entidade de um conector
   */
  getMappingConfig(
    connector: Connector,
    entity: IntegrationEntity,
  ): EntityMappingConfig | null {
    const config = connector.configJson as any;
    const mappings = config.mappings?.[entity];

    if (!mappings) {
      this.logger.warn(
        `No mapping configuration found for entity ${entity} in connector ${connector.key}`,
      );
      return null;
    }

    return {
      entity,
      externalIdField: mappings.externalIdField || 'id',
      fieldMappings: mappings.fieldMappings || [],
      globalValidations: mappings.globalValidations || [],
    };
  }

  /**
   * Cria configuração de mapeamento padrão para assets (exemplo)
   */
  getDefaultMappingConfig(entity: IntegrationEntity): EntityMappingConfig {
    switch (entity) {
      case IntegrationEntity.ASSETS:
        return {
          entity: IntegrationEntity.ASSETS,
          externalIdField: 'externalId',
          fieldMappings: [
            {
              source: 'codigo',
              target: 'codigo',
              transform: TransformType.TO_STRING,
              required: true,
              validations: [
                { type: ValidationType.MIN_LENGTH, value: 3 },
                { type: ValidationType.MAX_LENGTH, value: 50 },
              ],
            },
            {
              source: 'nome',
              target: 'nome',
              transform: TransformType.TRIM,
              required: true,
              validations: [
                { type: ValidationType.MAX_LENGTH, value: 255 },
              ],
            },
            {
              source: 'descricao',
              target: 'descricao',
              transform: TransformType.TO_STRING,
            },
            {
              source: 'valor',
              target: 'valorAquisicao',
              transform: TransformType.TO_NUMBER,
              validations: [
                { type: ValidationType.MIN, value: 0 },
              ],
            },
            {
              source: 'data_aquisicao',
              target: 'dataAquisicao',
              transform: TransformType.TO_DATE,
            },
            {
              source: 'status',
              target: 'status',
              transform: TransformType.TO_UPPERCASE,
              validations: [
                {
                  type: ValidationType.ENUM,
                  value: ['ATIVO', 'INATIVO', 'MANUTENCAO', 'DESCARTADO'],
                },
              ],
            },
          ],
        };
      default:
        return {
          entity,
          externalIdField: 'id',
          fieldMappings: [],
        };
    }
  }
}





