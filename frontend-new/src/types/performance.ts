// Tipos para testes de performance (M3)

export interface PerformanceTest {
  id: string;
  name: string;
  description: string;
  type: 'load' | 'stress' | 'spike' | 'volume';
  duration: number; // em segundos
  connections: number;
  status: 'available' | 'running' | 'completed' | 'failed';
  config?: TestConfig;
}

export interface TestConfig {
  url?: string;
  connections?: number;
  duration?: number;
  requests?: Array<{
    method: string;
    path: string;
  }>;
  headers?: Record<string, string>;
  body?: any;
}

export interface TestResult {
  id: string;
  testId: string;
  testName: string;
  status: 'passed' | 'failed' | 'running' | 'warning';
  timestamp: string;
  duration: number;
  requests: {
    total: number;
    successful: number;
    failed: number;
  };
  latency: {
    average: number;
    min: number;
    max: number;
    p50: number;
    p95: number;
    p99: number;
  };
  throughput: number; // requests por segundo
  errors: number;
  errorRate: number; // porcentagem
  error?: string;
  details?: {
    cpu?: number;
    memory?: number;
    network?: number;
  };
}

export interface PerformanceMetrics {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  averageLatency: number;
  averageThroughput: number;
  lastTestTime: string;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: string[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  results?: TestResult[];
}
