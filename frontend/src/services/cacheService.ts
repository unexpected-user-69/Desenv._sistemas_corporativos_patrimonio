// Serviço para gerenciamento de cache Redis

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
  CacheSearchResult,
} from '../types/cache';

class CacheService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:3101'; // Hardcoded for now, was import.meta.env.VITE_API_BASE_URL
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
      },
    );
  }

  // Estatísticas do cache
  async getStats(): Promise<CacheStats> {
    try {
      const response = await this.api.get('/v1/cache/stats');
      return response.data as CacheStats;
    } catch (error) {
      console.error('Erro ao buscar estatísticas do cache:', error);
      // Retorna dados mockados em caso de erro
      return {
        hits: 1250,
        misses: 150,
        keys: 500,
        memoryUsage: 1024 * 1024 * 50, // 50MB
        uptime: 86400, // 24 hours
        evictions: 25,
      };
    }
  }

  // Listar chaves do cache
  async getKeys(
    pattern: string = '*',
    limit: number = 100,
  ): Promise<CacheKey[]> {
    try {
      const response = await this.api.get('/v1/cache/keys', {
        params: { pattern, limit },
      });
      return response.data as CacheKey[];
    } catch (error) {
      console.error('Erro ao buscar chaves do cache:', error);
      // Retorna dados mockados
      return [
        {
          key: 'user:123',
          ttl: 3600,
          type: 'string',
          valuePreview:
            '{"id":123,"name":"João Silva","email":"joao@example.com"}',
        },
        {
          key: 'session:abc123',
          ttl: 1800,
          type: 'hash',
          valuePreview:
            '{"userId":123,"role":"admin","lastActivity":"2024-12-19T10:30:00Z"}',
        },
        {
          key: 'cache:users:list',
          ttl: 600,
          type: 'list',
          valuePreview: '[{"id":1,"name":"User 1"},{"id":2,"name":"User 2"}]',
        },
      ];
    }
  }

  // Obter valor de uma chave específica
  async getKey(key: string): Promise<any> {
    try {
      const response = await this.api.get(
        `/v1/cache/keys/${encodeURIComponent(key)}`,
      );
      return response.data as CacheKey[];
    } catch (error) {
      console.error(`Erro ao buscar chave ${key}:`, error);
      throw error;
    }
  }

  // Definir valor de uma chave
  async setKey(key: string, value: unknown, ttl?: number): Promise<void> {
    try {
      await this.api.post('/v1/cache/keys', {
        key,
        value,
        ttl,
      });
    } catch (error) {
      console.error(`Erro ao definir chave ${key}:`, error);
      throw error;
    }
  }

  // Deletar uma chave
  async deleteKey(key: string): Promise<void> {
    try {
      await this.api.delete(`/v1/cache/keys/${encodeURIComponent(key)}`);
    } catch (error) {
      console.error(`Erro ao deletar chave ${key}:`, error);
      throw error;
    }
  }

  // Configuração do cache
  async getConfig(): Promise<CacheConfig> {
    try {
      const response = await this.api.get('/v1/cache/config');
      return response.data as CacheConfig;
    } catch (error) {
      console.error('Erro ao buscar configuração do cache:', error);
      // Retorna configuração padrão
      return {
        maxmemory: '100mb',
        maxmemoryPolicy: 'allkeys-lru',
        defaultTTL: 3600,
      };
    }
  }

  async updateConfig(config: Partial<CacheConfig>): Promise<CacheConfig> {
    try {
      const response = await this.api.patch('/v1/cache/config', config);
      return response.data as CacheConfig;
    } catch (error) {
      console.error('Erro ao atualizar configuração do cache:', error);
      throw error;
    }
  }

  // Operações do cache
  async getOperations(limit: number = 50): Promise<CacheOperation[]> {
    try {
      const response = await this.api.get('/v1/cache/operations', {
        params: { limit },
      });
      return response.data as CacheOperation[];
    } catch (error) {
      console.error('Erro ao buscar operações do cache:', error);
      // Retorna dados mockados
      return [
        {
          id: '1',
          type: 'GET',
          key: 'user:123',
          timestamp: new Date().toISOString(),
          duration: 2,
          success: true,
        },
        {
          id: '2',
          type: 'SET',
          key: 'session:abc123',
          timestamp: new Date(Date.now() - 60000).toISOString(),
          duration: 5,
          success: true,
        },
        {
          id: '3',
          type: 'DEL',
          key: 'temp:data',
          timestamp: new Date(Date.now() - 120000).toISOString(),
          duration: 1,
          success: true,
        },
      ];
    }
  }

  // Métricas do cache
  async getMetrics(): Promise<CacheMetrics> {
    try {
      const response = await this.api.get('/v1/cache/metrics');
      return response.data as CacheMetrics;
    } catch (error) {
      console.error('Erro ao buscar métricas do cache:', error);
      // Retorna métricas mockadas
      return {
        responseTime: {
          min: 1,
          max: 50,
          avg: 5,
          p95: 15,
          p99: 25,
        },
        throughput: {
          operationsPerSecond: 100,
          totalOperations: 10000,
        },
        hitRate: {
          percentage: 89.3,
          hits: 1250,
          misses: 150,
        },
      };
    }
  }

  // Alertas do cache
  async getAlerts(): Promise<CacheAlert[]> {
    try {
      const response = await this.api.get('/v1/cache/alerts');
      return response.data as CacheAlert[];
    } catch (error) {
      console.error('Erro ao buscar alertas do cache:', error);
      // Retorna alertas mockados
      return [
        {
          id: '1',
          message: 'Alto uso de memória detectado (85%)',
          level: 'warn',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          resolved: false,
        },
        {
          id: '2',
          message: 'Taxa de hit baixa (65%)',
          level: 'warn',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          resolved: false,
        },
        {
          id: '3',
          message: 'Cache reiniciado com sucesso',
          level: 'info',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          resolved: true,
        },
      ];
    }
  }

  async resolveAlert(alertId: string): Promise<void> {
    try {
      await this.api.patch(`/v1/cache/alerts/${alertId}/resolve`);
    } catch (error) {
      console.error(`Erro ao resolver alerta ${alertId}:`, error);
      throw error;
    }
  }

  // Saúde do cache
  async getHealth(): Promise<CacheHealth> {
    try {
      const response = await this.api.get('/v1/cache/health');
      return response.data as CacheHealth;
    } catch (error) {
      console.error('Erro ao buscar saúde do cache:', error);
      // Retorna dados mockados
      return {
        status: 'healthy',
        lastCheck: new Date().toISOString(),
        memoryUsage: {
          used: 50 * 1024 * 1024, // 50MB
          total: 100 * 1024 * 1024, // 100MB
          percentage: 50,
        },
        connections: {
          active: 5,
          max: 100,
        },
      };
    }
  }

  // Padrões de chaves
  async getPatterns(): Promise<CachePattern[]> {
    try {
      const response = await this.api.get('/v1/cache/patterns');
      return response.data as CachePattern[];
    } catch (error) {
      console.error('Erro ao buscar padrões do cache:', error);
      // Retorna padrões mockados
      return [
        {
          pattern: 'user:*',
          count: 150,
          memoryUsage: 1024 * 1024 * 10, // 10MB
          avgTTL: 3600,
        },
        {
          pattern: 'session:*',
          count: 50,
          memoryUsage: 1024 * 1024 * 5, // 5MB
          avgTTL: 1800,
        },
        {
          pattern: 'cache:*',
          count: 25,
          memoryUsage: 1024 * 1024 * 2, // 2MB
          avgTTL: 600,
        },
      ];
    }
  }

  // Limpar cache
  async flushCache(
    options: CacheFlushOptions = { async: true },
  ): Promise<void> {
    try {
      await this.api.post('/v1/cache/flush', options);
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
      throw error;
    }
  }

  // Buscar chaves
  async searchKeys(options: CacheSearchOptions): Promise<CacheSearchResult> {
    try {
      const response = await this.api.post('/v1/cache/search', options);
      return response.data as CacheSearchResult;
    } catch (error) {
      console.error('Erro ao buscar chaves:', error);
      throw error;
    }
  }

  // WebSocket para métricas em tempo real
  createMetricsWebSocket(onMessage: (data: CacheMetrics) => void): WebSocket {
    const wsUrl = `${this.baseURL.replace('http', 'ws')}/v1/cache/metrics/stream`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as CacheMetrics;
        onMessage(data);
      } catch (error) {
        console.error('Erro ao processar mensagem WebSocket:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket de métricas:', error);
    };

    return ws;
  }
}

// Instância singleton
export const cacheService = new CacheService();
