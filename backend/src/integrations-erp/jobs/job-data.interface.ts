import { RunIntegrationDto } from '../dto/run-integration.dto';

/**
 * Dados do job de integração
 */
export interface IntegrationJobData {
  /** ID da execução */
  executionId: string;
  /** ID do conector */
  connectorId: string;
  /** Dados da requisição de integração */
  integrationDto: RunIntegrationDto;
  /** Usuário que criou a execução */
  createdBy?: string;
  /** Tentativa atual (para retries) */
  attempt?: number;
}

/**
 * Resultado do processamento do job
 */
export interface IntegrationJobResult {
  /** Se o job foi processado com sucesso */
  success: boolean;
  /** Mensagem de resultado */
  message?: string;
  /** Estatísticas do processamento */
  stats?: {
    created: number;
    updated: number;
    skipped: number;
    failed: number;
    total: number;
  };
  /** Erros encontrados */
  errors?: string[];
}

/**
 * Chave de idempotência para jobs
 */
export interface JobIdempotencyKey {
  /** Chave do conector */
  connectorKey: string;
  /** Tipo de execução */
  type: string;
  /** Entidade */
  entity: string;
  /** Janela temporal (timestamp do início da hora) */
  timeWindow: number;
}





