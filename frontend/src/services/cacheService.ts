import axios, { AxiosInstance } from 'axios';
import {
  CacheStats,
  CacheKey,
  CacheConfig,
  CacheOperation,
  CacheMetrics,
  CacheAlert,
  CacheHealth,
  CachePattern,
  CacheFlushOptions,
  CacheSearchOptions,
  CacheSearchResult
} from '../types/cache';

class CacheService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Cache Service Error:', error);
        throw error;
      }
    );
  }

  // Métodos de estatísticas
  async getStats(): Promise<CacheStats> {
    const response = await this.api.get('/v1/cache/stats');
    return response.data;
  }

  async getMetrics(): Promise<CacheMetrics> {
    const response = await this.api.get('/v1/cache/metrics');
    return response.data;
  }

  async getHealth(): Promise<CacheHealth> {
    const response = await this.api.get('/v1/cache/health');
    return response.data;
  }

  // Métodos de configuração
  async getConfig(): Promise<CacheConfig> {
    const response = await this.api.get('/v1/cache/config');
    return response.data;
  }

  async updateConfig(config: Partial<CacheConfig>): Promise<CacheConfig> {
    const response = await this.api.put('/v1/cache/config', config);
    return response.data;
  }

  // Métodos de chaves
  async getKeys(pattern: string = '*', limit: number = 100): Promise<CacheKey[]> {
    const response = await this.api.get('/v1/cache/keys', {
      params: { pattern, limit }
    });
    return response.data;
  }

  async getKey(key: string): Promise<CacheKey> {
    const response = await this.api.get(`/v1/cache/keys/${encodeURIComponent(key)}`);
    return response.data;
  }

  async setKey(key: string, value: string, ttl?: number): Promise<void> {
    await this.api.post('/v1/cache/keys', {
      key,
      value,
      ttl
    });
  }

  async deleteKey(key: string): Promise<void> {
    await this.api.delete(`/v1/cache/keys/${encodeURIComponent(key)}`);
  }

  async deleteKeys(keys: string[]): Promise<number> {
    const response = await this.api.delete('/v1/cache/keys/bulk', {
      data: { keys }
    });
    return response.data.deleted;
  }

  // Métodos de busca
  async searchKeys(options: CacheSearchOptions): Promise<CacheSearchResult> {
    const response = await this.api.post('/v1/cache/search', options);
    return response.data;
  }

  async getPatterns(): Promise<CachePattern[]> {
    const response = await this.api.get('/v1/cache/patterns');
    return response.data;
  }

  // Métodos de operações
  async getOperations(limit: number = 50): Promise<CacheOperation[]> {
    const response = await this.api.get('/v1/cache/operations', {
      params: { limit }
    });
    return response.data;
  }

  async flushCache(options: CacheFlushOptions): Promise<void> {
    await this.api.post('/v1/cache/flush', options);
  }

  // Métodos de alertas
  async getAlerts(): Promise<CacheAlert[]> {
    const response = await this.api.get('/v1/cache/alerts');
    return response.data;
  }

  async resolveAlert(alertId: string): Promise<void> {
    await this.api.patch(`/v1/cache/alerts/${alertId}/resolve`);
  }

  // Métodos de monitoramento em tempo real
  async subscribeToStats(callback: (stats: CacheStats) => void): Promise<() => void> {
    // Implementação de WebSocket ou Server-Sent Events
    // Por enquanto, vamos usar polling
    const interval = setInterval(async () => {
      try {
        const stats = await this.getStats();
        callback(stats);
      } catch (error) {
        console.error('Error fetching cache stats:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }

  async subscribeToOperations(callback: (operation: CacheOperation) => void): Promise<() => void> {
    // Implementação de WebSocket ou Server-Sent Events
    // Por enquanto, vamos usar polling
    const interval = setInterval(async () => {
      try {
        const operations = await this.getOperations(1);
        if (operations.length > 0) {
          callback(operations[0]);
        }
      } catch (error) {
        console.error('Error fetching cache operations:', error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }

  // Métodos utilitários
  async testConnection(): Promise<boolean> {
    try {
      await this.getHealth();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getMemoryUsage(): Promise<{
    used: number;
    total: number;
    percentage: number;
  }> {
    const response = await this.api.get('/v1/cache/memory');
    return response.data;
  }

  async getPerformanceMetrics(): Promise<{
    averageResponseTime: number;
    operationsPerSecond: number;
    errorRate: number;
  }> {
    const response = await this.api.get('/v1/cache/performance');
    return response.data;
  }

  // Métodos de exportação/importação
  async exportKeys(pattern: string = '*'): Promise<Blob> {
    const response = await this.api.get('/v1/cache/export', {
      params: { pattern },
      responseType: 'blob'
    });
    return response.data;
  }

  async importKeys(file: File): Promise<{ imported: number; errors: number }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.api.post('/v1/cache/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const cacheService = new CacheService();
export default cacheService;
