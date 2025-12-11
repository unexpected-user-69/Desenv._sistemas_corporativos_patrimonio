// Serviço de Performance para testes de carga e stress
// IA_DesenvolvedorFrontend (IA 3) - Correção de erros de compilação

import {
  LoadTestConfig,
  LoadTestResult,
  StressTestResult,
} from '../types/performance';

class PerformanceService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3101';
  }

  // Obter configurações de teste
  async getTestConfigs(): Promise<LoadTestConfig[]> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/performance/configs`);
      if (!response.ok) {
        throw new Error('Erro ao carregar configurações');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      // Retornar configurações mockadas para desenvolvimento
      return this.getMockConfigs();
    }
  }

  // Obter resultados de teste
  async getTestResults(
    params: { limit?: number } = {},
  ): Promise<{ results: LoadTestResult[] }> {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await fetch(
        `${this.baseUrl}/v1/performance/results?${queryParams}`,
      );
      if (!response.ok) {
        throw new Error('Erro ao carregar resultados');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
      // Retornar resultados mockados para desenvolvimento
      return { results: this.getMockResults() };
    }
  }

  // Iniciar teste de carga
  async startLoadTest(configId: string): Promise<LoadTestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/performance/load-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ configId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao iniciar teste de carga');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao iniciar teste de carga:', error);
      // Retornar resultado mockado para desenvolvimento
      return this.getMockLoadTestResult(configId);
    }
  }

  // Iniciar teste de stress
  async startStressTest(configId: string): Promise<StressTestResult> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/performance/stress-test`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ configId }),
        },
      );

      if (!response.ok) {
        throw new Error('Erro ao iniciar teste de stress');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao iniciar teste de stress:', error);
      // Retornar resultado mockado para desenvolvimento
      return this.getMockStressTestResult(configId);
    }
  }

  // Parar teste
  async stopTest(testId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/performance/tests/${testId}/stop`,
        {
          method: 'POST',
        },
      );

      if (!response.ok) {
        throw new Error('Erro ao parar teste');
      }
    } catch (error) {
      console.error('Erro ao parar teste:', error);
    }
  }

  // Obter resultado de teste específico
  async getTestResult(
    testId: string,
  ): Promise<LoadTestResult | StressTestResult> {
    try {
      const response = await fetch(
        `${this.baseUrl}/v1/performance/tests/${testId}`,
      );
      if (!response.ok) {
        throw new Error('Erro ao carregar resultado do teste');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar resultado do teste:', error);
      // Retornar resultado mockado para desenvolvimento
      return this.getMockLoadTestResult(testId);
    }
  }

  // Métodos para dados mockados (desenvolvimento)
  private getMockConfigs(): LoadTestConfig[] {
    return [
      {
        id: 'config-1',
        name: 'Teste Básico',
        description: 'Teste de carga básico para endpoints principais',
        target: {
          url: 'http://localhost:3101/v1/users',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        load: {
          connections: 10,
          duration: 60,
          rate: 5,
        },
        thresholds: {
          maxResponseTime: 1000,
          maxErrorRate: 5,
          minThroughput: 10,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'config-2',
        name: 'Teste Intensivo',
        description: 'Teste de stress com alta carga',
        target: {
          url: 'http://localhost:3101/v1/patrimonio',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        load: {
          connections: 50,
          duration: 300,
          rate: 20,
        },
        thresholds: {
          maxResponseTime: 2000,
          maxErrorRate: 10,
          minThroughput: 50,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  private getMockResults(): LoadTestResult[] {
    return [
      {
        id: 'result-1',
        configId: 'config-1',
        status: 'completed',
        startTime: new Date(Date.now() - 3600000).toISOString(),
        endTime: new Date(Date.now() - 3540000).toISOString(),
        duration: 60,
        summary: {
          totalRequests: 300,
          successfulRequests: 295,
          failedRequests: 5,
          averageResponseTime: 150,
          p95ResponseTime: 300,
          p99ResponseTime: 500,
          requestsPerSecond: 5,
          errorRate: 1.67,
        },
        metrics: {
          responseTime: Array.from({ length: 60 }, (_, i) => ({
            timestamp: new Date(Date.now() - (60 - i) * 60000).toISOString(),
            value: 100 + Math.random() * 200,
          })),
          throughput: Array.from({ length: 60 }, (_, i) => ({
            timestamp: new Date(Date.now() - (60 - i) * 60000).toISOString(),
            value: 4 + Math.random() * 2,
          })),
          errorRate: Array.from({ length: 60 }, (_, i) => ({
            timestamp: new Date(Date.now() - (60 - i) * 60000).toISOString(),
            value: Math.random() * 5,
          })),
        },
      },
    ];
  }

  private getMockLoadTestResult(configId: string): LoadTestResult {
    return {
      id: `test-${Date.now()}`,
      configId,
      status: 'running',
      startTime: new Date().toISOString(),
      endTime: '',
      duration: 0,
      summary: {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        requestsPerSecond: 0,
        errorRate: 0,
      },
      metrics: {
        responseTime: [],
        throughput: [],
        errorRate: [],
      },
    };
  }

  private getMockStressTestResult(configId: string): StressTestResult {
    return {
      id: `stress-test-${Date.now()}`,
      configId,
      status: 'running',
      startTime: new Date().toISOString(),
      endTime: '',
      duration: 0,
      summary: {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        requestsPerSecond: 0,
        errorRate: 0,
        maxConcurrentUsers: 0,
        breakingPoint: 0,
      },
      metrics: {
        responseTime: [],
        throughput: [],
        errorRate: [],
        concurrentUsers: [],
      },
    };
  }
}

export const performanceService = new PerformanceService();
