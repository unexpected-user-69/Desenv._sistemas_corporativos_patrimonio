// Serviço de testes de performance (M3)
/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import {
  LoadTestConfig,
  LoadTestResult,
  PerformanceReport,
  TestSuite,
  TestExecution,
} from '../types/performance';

const API_BASE_URL =
  (import.meta.env as { VITE_API_BASE_URL?: string }).VITE_API_BASE_URL ||
  'http://localhost:3000';

export class PerformanceService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/v1`;
  }

  // Configurações de teste
  async getTestConfigs(): Promise<LoadTestConfig[]> {
    try {
      const response = await fetch(`${this.baseUrl}/performance/configs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar configurações de teste:', error);
      throw error;
    }
  }

  async createTestConfig(
    config: Omit<LoadTestConfig, 'id'>,
  ): Promise<LoadTestConfig> {
    try {
      const response = await fetch(`${this.baseUrl}/performance/configs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar configuração de teste:', error);
      throw error;
    }
  }

  async updateTestConfig(
    id: string,
    config: Partial<LoadTestConfig>,
  ): Promise<LoadTestConfig> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/configs/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar configuração de teste:', error);
      throw error;
    }
  }

  async deleteTestConfig(id: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/configs/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao deletar configuração de teste:', error);
      throw error;
    }
  }

  // Execução de testes
  async startLoadTest(configId: string): Promise<LoadTestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/performance/tests/load`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ configId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao iniciar teste de carga:', error);
      throw error;
    }
  }

  async startStressTest(configId: string): Promise<LoadTestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/performance/tests/stress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ configId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao iniciar teste de stress:', error);
      throw error;
    }
  }

  async stopTest(testId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/tests/${testId}/stop`,
        {
          method: 'POST',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao parar teste:', error);
      throw error;
    }
  }

  // Resultados de testes
  async getTestResult(testId: string): Promise<LoadTestResult> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/tests/${testId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar resultado do teste:', error);
      throw error;
    }
  }

  async getTestResults(
    params: {
      configId?: string;
      startDate?: string;
      endDate?: string;
      limit?: number;
      offset?: number;
    } = {},
  ): Promise<{ results: LoadTestResult[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params.configId) queryParams.append('configId', params.configId);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());

      const response = await fetch(
        `${this.baseUrl}/performance/tests?${queryParams}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar resultados de testes:', error);
      throw error;
    }
  }

  // Relatórios de performance
  async generateReport(testId: string): Promise<PerformanceReport> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/tests/${testId}/report`,
        {
          method: 'POST',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      throw error;
    }
  }

  async getReport(reportId: string): Promise<PerformanceReport> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/reports/${reportId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar relatório:', error);
      throw error;
    }
  }

  // Suites de teste
  async getTestSuites(): Promise<TestSuite[]> {
    try {
      const response = await fetch(`${this.baseUrl}/performance/suites`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar suites de teste:', error);
      throw error;
    }
  }

  async createTestSuite(suite: Omit<TestSuite, 'id'>): Promise<TestSuite> {
    try {
      const response = await fetch(`${this.baseUrl}/performance/suites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(suite),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao criar suite de teste:', error);
      throw error;
    }
  }

  async executeTestSuite(suiteId: string): Promise<TestExecution> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/suites/${suiteId}/execute`,
        {
          method: 'POST',
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao executar suite de teste:', error);
      throw error;
    }
  }

  // WebSocket para monitoramento em tempo real
  createTestWebSocket(
    testId: string,
    onUpdate: (result: LoadTestResult) => void,
  ): WebSocket {
    const wsUrl = `${API_BASE_URL.replace('http', 'ws')}/v1/performance/tests/${testId}/stream`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as LoadTestResult;
        onUpdate(data);
      } catch (error) {
        console.error('Erro ao processar atualização do teste:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket do teste:', error);
    };

    return ws;
  }

  // Exportar resultados
  async exportResults(
    testId: string,
    format: 'json' | 'csv' | 'xlsx',
  ): Promise<Blob> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/tests/${testId}/export?format=${format}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.error('Erro ao exportar resultados:', error);
      throw error;
    }
  }

  // Validação de configuração
  async validateConfig(
    config: LoadTestConfig,
  ): Promise<{ valid: boolean; errors: string[] }> {
    try {
      const response = await fetch(
        `${this.baseUrl}/performance/configs/validate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao validar configuração:', error);
      throw error;
    }
  }
}

// Instância singleton
export const performanceService = new PerformanceService();
