// Tipos para sistema de testes e qualidade de código
// IA_DesenvolvedorFrontend (IA 3) - Correção de erros de compilação

export interface TestDouble {
  id: string;
  name: string;
  type: 'dummy' | 'stub' | 'spy' | 'mock' | 'fake';
  description: string;
  implementation: string;
  usage: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockConfig {
  id: string;
  name: string;
  endpoint: string;
  method: string;
  statusCode: number;
  response: any;
  delay: number;
  conditions: MockCondition[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockCondition {
  field: string;
  operator: 'equals' | 'contains' | 'regex';
  value: any;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: string[];
  status: 'ready' | 'running' | 'completed' | 'failed';
  lastRun: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TestExecution {
  id: string;
  suiteId: string;
  startTime: string;
  endTime: string | null;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  results: TestResult[];
  summary: TestSummary;
}

export interface TestResult {
  testId: string;
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  logs: string[];
}

export interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  coverage: number;
}

export interface QualityMetrics {
  codeQuality: {
    maintainability: number;
    reliability: number;
    security: number;
    performance: number;
  };
  technicalDebt: {
    total: number;
    critical: number;
    major: number;
    minor: number;
  };
  complexity: {
    cyclomatic: number;
    cognitive: number;
    halstead: number;
  };
  duplications: {
    lines: number;
    blocks: number;
    files: number;
  };
}

export interface CoverageSummary {
  overall: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
  files: CoverageFile[];
  thresholds: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
}

export interface CoverageFile {
  name: string;
  lines: number;
  functions: number;
  branches: number;
  statements: number;
}

export interface TestConfiguration {
  frameworks: {
    unit: string;
    integration: string;
    e2e: string;
  };
  settings: {
    timeout: number;
    retries: number;
    parallel: boolean;
  };
  paths: {
    tests: string;
    coverage: string;
    reports: string;
  };
}

export interface TestEnvironment {
  id: string;
  name: string;
  description: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
