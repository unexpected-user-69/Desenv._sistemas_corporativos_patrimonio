import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Obtém um valor do cache
   */
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const value = await this.cacheManager.get<T>(key);
      if (value) {
        this.logger.debug(`Cache hit for key: ${key}`);
      }
      return value;
    } catch (error) {
      this.logger.error(`Error getting cache key ${key}:`, error);
      return undefined;
    }
  }

  /**
   * Define um valor no cache com TTL opcional
   */
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttl);
      this.logger.debug(
        `Cache set for key: ${key} with TTL: ${ttl || 'default'}`,
      );
    } catch (error) {
      this.logger.error(`Error setting cache key ${key}:`, error);
    }
  }

  /**
   * Remove um valor do cache
   */
  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
      this.logger.debug(`Cache deleted for key: ${key}`);
    } catch (error) {
      this.logger.error(`Error deleting cache key ${key}:`, error);
    }
  }

  /**
   * Limpa todo o cache
   */
  reset(): void {
    try {
      // Note: reset() method may not be available in all cache implementations
      // This is a placeholder for cache clearing functionality
      this.logger.debug(
        'Cache reset requested - implementation depends on cache store',
      );
    } catch (error) {
      this.logger.error('Error resetting cache:', error);
    }
  }

  /**
   * Gera uma chave de cache baseada em parâmetros
   */
  generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce(
        (result, key) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          result[key] = params[key];
          return result;
        },
        {} as Record<string, any>,
      );

    const paramString = JSON.stringify(sortedParams);
    return `${prefix}:${Buffer.from(paramString).toString('base64')}`;
  }

  /**
   * Wrapper para operações com cache que retorna o valor do cache ou executa a função
   */
  async getOrSet<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    const result = await fn();
    await this.set(key, result, ttl);
    return result;
  }

  /**
   * Invalida cache por padrão
   */
  invalidatePattern(pattern: string): void {
    try {
      // Para Redis, precisaríamos de uma implementação específica
      // Por enquanto, vamos usar uma abordagem simples
      this.logger.debug(`Cache invalidation requested for pattern: ${pattern}`);
    } catch (error) {
      this.logger.error(`Error invalidating cache pattern ${pattern}:`, error);
    }
  }
}
