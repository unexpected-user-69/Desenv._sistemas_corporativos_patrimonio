// Tipos para testes de performance (M3)

export interface LoadTestConfig {
  id: string;
  name: string;
  description?: string;
  target: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: unknown;
  };
  load: {
    connections: number;
    duration: number; // em segundos
    rate: number; // requests por segundo
  };
  rampUp: {
    enabled: boolean;
    duration: number; // tempo para atingir carga máxima
  };
}

export interface LoadTestResult {
  id: string;
  configId: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  summary: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
    requestsPerSecond: number;
    errorRate: number;
  };
  latency: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  };
  throughput: {
    average: number;
    peak: number;
    total: number;
  };
  errors: TestError[];
  timeline: TimelinePoint[];
}

export interface TestError {
  code: string;
  message: string;
  count: number;
  percentage: number;
}

export interface TimelinePoint {
  timestamp: string;
  requestsPerSecond: number;
  averageResponseTime: number;
  errorRate: number;
  activeConnections: number;
}

export interface StressTestConfig extends LoadTestConfig {
  stress: {
    maxConnections: number;
    incrementStep: number;
    incrementInterval: number;
    breakpoint: {
      errorRate: number;
      responseTime: number;
    };
  };
}

export interface StressTestResult extends LoadTestResult {
  breakpoint: {
    reached: boolean;
    reason: 'errorRate' | 'responseTime' | 'maxConnections';
    value: number;
    timestamp: string;
  };
  maxSustainedLoad: number;
}

export interface PerformanceReport {
  id: string;
  testId: string;
  generatedAt: string;
  summary: {
    overallScore: number; // 0-100
    recommendations: string[];
    criticalIssues: string[];
  };
  metrics: {
    performance: number;
    reliability: number;
    scalability: number;
  };
  charts: {
    responseTime: ChartData[];
    throughput: ChartData[];
    errorRate: ChartData[];
    connections: ChartData[];
  };
}

export interface ChartData {
  timestamp: string;
  value: number;
  label?: string;
}

export interface TestSuite {
  id: string;
  name: string;
  description?: string;
  tests: LoadTestConfig[];
  schedule?: {
    enabled: boolean;
    cron: string;
    timezone: string;
  };
  notifications: {
    email: string[];
    webhook?: string;
    onFailure: boolean;
    onCompletion: boolean;
  };
}

export interface TestExecution {
  id: string;
  suiteId: string;
  startTime: string;
  endTime?: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: LoadTestResult[];
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    averageScore: number;
  };
}
