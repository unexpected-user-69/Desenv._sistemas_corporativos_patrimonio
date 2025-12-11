import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Execution } from '../entities/execution.entity';

export interface IdempotencyCheck {
  /** Se o registro já existe */
  exists: boolean;
  /** ID interno se existir */
  internalId?: string;
  /** Hash do registro para comparação */
  hash?: string;
  /** Se os dados são diferentes */
  hasChanges?: boolean;
}

@Injectable()
export class IdempotencyService {
  private readonly logger = new Logger(IdempotencyService.name);
  private readonly externalIdCache: Map<string, Map<string, string>> = new Map();

  constructor(private readonly dataSource: DataSource) {}

  /**
   * Verifica se um registro já existe baseado no externalId
   */
  async checkIdempotency(
    executionId: string,
    entity: string,
    externalId: string,
  ): Promise<IdempotencyCheck> {
    // Por enquanto, implementação simples em memória
    // Em produção, isso deveria consultar o banco de dados
    const cacheKey = `${executionId}:${entity}`;
    const cache = this.externalIdCache.get(cacheKey) || new Map();
    
    const internalId = cache.get(externalId);
    
    if (internalId) {
      return {
        exists: true,
        internalId,
      };
    }

    // TODO: Consultar banco de dados para verificar se o externalId já existe
    // Isso requer uma tabela de mapeamento externalId -> internalId por entidade

    return {
      exists: false,
    };
  }

  /**
   * Registra um mapeamento externalId -> internalId
   */
  async registerMapping(
    executionId: string,
    entity: string,
    externalId: string,
    internalId: string,
  ): Promise<void> {
    const cacheKey = `${executionId}:${entity}`;
    if (!this.externalIdCache.has(cacheKey)) {
      this.externalIdCache.set(cacheKey, new Map());
    }
    this.externalIdCache.get(cacheKey)!.set(externalId, internalId);
  }

  /**
   * Limpa o cache de uma execução
   */
  clearCache(executionId: string): void {
    const keysToDelete: string[] = [];
    for (const key of this.externalIdCache.keys()) {
      if (key.startsWith(`${executionId}:`)) {
        keysToDelete.push(key);
      }
    }
    for (const key of keysToDelete) {
      this.externalIdCache.delete(key);
    }
  }

  /**
   * Gera hash de um registro para comparação
   */
  generateHash(data: Record<string, any>): string {
    // Hash simples baseado em JSON stringificado
    // Em produção, usar algo mais robusto como SHA-256
    const str = JSON.stringify(data, Object.keys(data).sort());
    return Buffer.from(str).toString('base64');
  }
}





