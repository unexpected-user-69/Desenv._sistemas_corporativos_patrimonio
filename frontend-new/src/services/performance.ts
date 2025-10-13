// Serviço para testes de performance (M3)

import { PerformanceTest, TestResult, TestConfig, PerformanceMetrics, TestSuite } from '../types/performance';

// Mock data para demonstração
const mockTests: PerformanceTest[] = [
  {
    id: 'load-test-1',
    name: 'Teste de Carga Básico',
    description: 'Teste de carga com 10 conexões por 30 segundos',
    type: 'load',
    duration: 30,
    connections: 10,
    status: 'available'
  },
  {
    id: 'stress-test-1',
    name: 'Teste de Stress Médio',
    description: 'Teste de stress com 50 conexões por 60 segundos',
    type: 'stress',
    duration: 60,
    connections: 50,
    status: 'available'
  },
  {
    id: 'stress-test-2',
    name: 'Teste de Stress Pesado',
    description: 'Teste de stress com 100 conexões por 120 segundos',
    type: 'stress',
    duration: 120,
    connections: 100,
    status: 'available'
  },
  {
    id: 'spike-test-1',
    name: 'Teste de Pico',
    description: 'Teste de pico com 200 conexões por 10 segundos',
    type: 'spike',
    duration: 10,
    connections: 200,
    status: 'available'
  }
];

const mockResults: TestResult[] = [
  {
    id: 'result-1',
    testId: 'load-test-1',
    testName: 'Teste de Carga Básico',
    status: 'passed',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    duration: 30,
    requests: {
      total: 1500,
      successful: 1485,
      failed: 15
    },
    latency: {
      average: 85,
      min: 12,
      max: 450,
      p50: 75,
      p95: 180,
      p99: 320
    },
    throughput: 50,
    errors: 15,
    errorRate: 1.0
  },
  {
    id: 'result-2',
    testId: 'stress-test-1',
    testName: 'Teste de Stress Médio',
    status: 'warning',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    duration: 60,
    requests: {
      total: 2800,
      successful: 2700,
      failed: 100
    },
    latency: {
      average: 180,
      min: 25,
      max: 1200,
      p50: 150,
      p95: 450,
      p99: 800
    },
    throughput: 45,
    errors: 100,
    errorRate: 3.6
  }
];

class PerformanceService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  }

  async getAvailableTests(): Promise<PerformanceTest[]> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/tests`);
      // return response.json();
      
      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockTests), 500);
      });
    } catch (error) {
      console.error('Erro ao buscar testes disponíveis:', error);
      throw new Error('Falha ao carregar testes disponíveis');
    }
  }

  async runTest(testId: string, config?: TestConfig): Promise<TestResult> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/tests/${testId}/run`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });
      // return response.json();

      // Mock data para demonstração
      const test = mockTests.find(t => t.id === testId);
      if (!test) {
        throw new Error('Teste não encontrado');
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simular execução do teste
          const result: TestResult = {
            id: `result-${Date.now()}`,
            testId: test.id,
            testName: test.name,
            status: Math.random() > 0.2 ? 'passed' : 'failed',
            timestamp: new Date().toISOString(),
            duration: test.duration,
            requests: {
              total: Math.floor(Math.random() * 2000) + 500,
              successful: Math.floor(Math.random() * 1800) + 400,
              failed: Math.floor(Math.random() * 200) + 10
            },
            latency: {
              average: Math.floor(Math.random() * 300) + 50,
              min: Math.floor(Math.random() * 50) + 10,
              max: Math.floor(Math.random() * 1000) + 200,
              p50: Math.floor(Math.random() * 200) + 30,
              p95: Math.floor(Math.random() * 500) + 100,
              p99: Math.floor(Math.random() * 800) + 200
            },
            throughput: Math.floor(Math.random() * 80) + 20,
            errors: Math.floor(Math.random() * 100) + 5,
            errorRate: Math.random() * 5
          };

          if (result.status === 'failed') {
            result.error = 'Teste falhou devido a alta latência';
          }

          resolve(result);
        }, 2000); // Simular tempo de execução
      });
    } catch (error) {
      console.error('Erro ao executar teste:', error);
      throw new Error('Falha ao executar teste');
    }
  }

  async getTestResults(): Promise<TestResult[]> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/results`);
      // return response.json();

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockResults), 300);
      });
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
      throw new Error('Falha ao carregar resultados');
    }
  }

  async getTestResult(resultId: string): Promise<TestResult> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/results/${resultId}`);
      // return response.json();

      // Mock data para demonstração
      const result = mockResults.find(r => r.id === resultId);
      if (!result) {
        throw new Error('Resultado não encontrado');
      }

      return new Promise((resolve) => {
        setTimeout(() => resolve(result), 200);
      });
    } catch (error) {
      console.error('Erro ao buscar resultado:', error);
      throw new Error('Falha ao carregar resultado');
    }
  }

  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/metrics`);
      // return response.json();

      // Mock data para demonstração
      const totalTests = mockResults.length;
      const passedTests = mockResults.filter(r => r.status === 'passed').length;
      const failedTests = mockResults.filter(r => r.status === 'failed').length;
      const averageLatency = mockResults.reduce((sum, r) => sum + r.latency.average, 0) / mockResults.length;
      const averageThroughput = mockResults.reduce((sum, r) => sum + r.throughput, 0) / mockResults.length;

      return new Promise((resolve) => {
        setTimeout(() => resolve({
          totalTests,
          passedTests,
          failedTests,
          averageLatency,
          averageThroughput,
          lastTestTime: mockResults[0]?.timestamp || new Date().toISOString()
        }), 200);
      });
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw new Error('Falha ao carregar métricas');
    }
  }

  async createTestSuite(suite: Omit<TestSuite, 'id' | 'status'>): Promise<TestSuite> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/suites`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(suite)
      // });
      // return response.json();

      // Mock data para demonstração
      const newSuite: TestSuite = {
        ...suite,
        id: `suite-${Date.now()}`,
        status: 'idle'
      };

      return new Promise((resolve) => {
        setTimeout(() => resolve(newSuite), 300);
      });
    } catch (error) {
      console.error('Erro ao criar suite de testes:', error);
      throw new Error('Falha ao criar suite de testes');
    }
  }

  async runTestSuite(suiteId: string): Promise<TestResult[]> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/suites/${suiteId}/run`, {
      //   method: 'POST'
      // });
      // return response.json();

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockResults), 1000);
      });
    } catch (error) {
      console.error('Erro ao executar suite de testes:', error);
      throw new Error('Falha ao executar suite de testes');
    }
  }

  async exportResults(format: 'json' | 'csv' | 'excel'): Promise<Blob> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/performance/export?format=${format}`);
      // return response.blob();

      // Mock data para demonstração
      const data = format === 'json' 
        ? JSON.stringify(mockResults, null, 2)
        : 'CSV,Data,Teste,Status,Latencia,Throughput\n' + 
          mockResults.map(r => `${r.timestamp},${r.testName},${r.status},${r.latency.average},${r.throughput}`).join('\n');

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = new Blob([data], { 
            type: format === 'json' ? 'application/json' : 'text/csv' 
          });
          resolve(blob);
        }, 500);
      });
    } catch (error) {
      console.error('Erro ao exportar resultados:', error);
      throw new Error('Falha ao exportar resultados');
    }
  }
}

export const performanceService = new PerformanceService();
