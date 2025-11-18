// Tipos para testes de performance
// IA_DesenvolvedorFrontend (IA 3) - Correção de erros de compilação

export interface LoadTestConfig {
  id: string;
  name: string;
  description: string;
  target: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: unknown;
  };
  load: {
    connections: number;
    duration: number; // em segundos
    rate: number; // requests por segundo
  };
  thresholds: {
    maxResponseTime: number;
    maxErrorRate: number;
    minThroughput: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LoadTestResult {
  id: string;
  configId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime: string;
  duration: number; // em segundos
  summary: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    requestsPerSecond: number;
    errorRate: number;
  };
  metrics: {
    responseTime: Array<{
      timestamp: string;
      value: number;
    }>;
    throughput: Array<{
      timestamp: string;
      value: number;
    }>;
    errorRate: Array<{
      timestamp: string;
      value: number;
    }>;
  };
}

export interface StressTestConfig extends LoadTestConfig {
  stress: {
    maxConnections: number;
    rampUpTime: number;
    holdTime: number;
  };
}

export interface StressTestResult extends LoadTestResult {
  summary: LoadTestResult['summary'] & {
    maxConcurrentUsers: number;
    breakingPoint: number;
  };
  metrics: LoadTestResult['metrics'] & {
    concurrentUsers: Array<{
      timestamp: string;
      value: number;
    }>;
  };
}

export interface PerformanceMetrics {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    bytesIn: number;
    bytesOut: number;
    packetsIn: number;
    packetsOut: number;
  };
}

export interface PerformanceAlert {
  id: string;
  type: 'cpu' | 'memory' | 'disk' | 'network' | 'response_time';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  threshold: number;
  currentValue: number;
  timestamp: string;
  resolved: boolean;
}
