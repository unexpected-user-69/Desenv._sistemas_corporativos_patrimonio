// Tipos para utilitários de teste e qualidade de código

export interface TestDouble {
  id: string;
  name: string;
  type: 'dummy' | 'stub' | 'spy' | 'mock' | 'fake';
  description: string;
  implementation: string;
  usage: string;
  examples: TestDoubleExample[];
}

export interface TestDoubleExample {
  id: string;
  title: string;
  code: string;
  description: string;
  expectedResult: string;
}

export interface MockConfig {
  id: string;
  name: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  response: any;
  statusCode: number;
  delay?: number;
  enabled: boolean;
  conditions?: MockCondition[];
}

export interface MockCondition {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'regex' | 'exists';
  value: any;
  description: string;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: TestCase[];
  config: TestSuiteConfig;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results?: TestSuiteResults;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  duration?: number;
  error?: string;
  coverage?: CoverageData;
  assertions: TestAssertion[];
}

export interface TestAssertion {
  id: string;
  description: string;
  status: 'passed' | 'failed' | 'pending';
  expected: any;
  actual: any;
  error?: string;
}

export interface TestSuiteConfig {
  timeout: number;
  retries: number;
  parallel: boolean;
  environment: 'test' | 'staging' | 'production';
  coverage: {
    enabled: boolean;
    threshold: number;
    include: string[];
    exclude: string[];
  };
}

export interface TestSuiteResults {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  coverage: CoverageSummary;
  startTime: string;
  endTime: string;
}

export interface CoverageData {
  lines: {
    total: number;
    covered: number;
    percentage: number;
  };
  functions: {
    total: number;
    covered: number;
    percentage: number;
  };
  branches: {
    total: number;
    covered: number;
    percentage: number;
  };
  statements: {
    total: number;
    covered: number;
    percentage: number;
  };
}

export interface CoverageSummary {
  overall: number;
  files: CoverageFile[];
  thresholds: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
}

export interface CoverageFile {
  path: string;
  coverage: CoverageData;
  uncoveredLines: number[];
  uncoveredFunctions: string[];
  uncoveredBranches: string[];
}

export interface TestExecution {
  id: string;
  suiteId: string;
  startTime: string;
  endTime?: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  progress: {
    current: number;
    total: number;
    percentage: number;
  };
  results?: TestSuiteResults;
  logs: TestLog[];
}

export interface TestLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: Record<string, any>;
  testId?: string;
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
    byCategory: Record<string, number>;
    byFile: Array<{
      file: string;
      debt: number;
      issues: number;
    }>;
  };
  complexity: {
    cyclomatic: number;
    cognitive: number;
    halstead: {
      volume: number;
      difficulty: number;
      effort: number;
    };
  };
  duplications: {
    total: number;
    percentage: number;
    files: Array<{
      file: string;
      lines: number;
      percentage: number;
    }>;
  };
}

export interface TestEnvironment {
  id: string;
  name: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance';
  config: {
    baseUrl: string;
    timeout: number;
    retries: number;
    parallel: boolean;
    headless: boolean;
    viewport: {
      width: number;
      height: number;
    };
  };
  variables: Record<string, any>;
  mocks: MockConfig[];
  status: 'active' | 'inactive' | 'error';
}

export interface TestReport {
  id: string;
  executionId: string;
  generatedAt: string;
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
    coverage: number;
  };
  details: {
    suites: Array<{
      name: string;
      tests: TestCase[];
      coverage: CoverageData;
    }>;
    failures: Array<{
      test: string;
      error: string;
      stack?: string;
    }>;
    performance: {
      slowestTests: Array<{
        name: string;
        duration: number;
      }>;
      memoryUsage: Array<{
        timestamp: string;
        usage: number;
      }>;
    };
  };
  recommendations: string[];
}

export interface TestTemplate {
  id: string;
  name: string;
  description: string;
  type: 'component' | 'service' | 'hook' | 'utility';
  template: string;
  examples: string[];
  tags: string[];
}

export interface TestConfiguration {
  frameworks: {
    unit: 'jest' | 'vitest' | 'mocha';
    e2e: 'playwright' | 'cypress' | 'puppeteer';
    coverage: 'istanbul' | 'c8' | 'v8';
  };
  settings: {
    watchMode: boolean;
    verbose: boolean;
    bail: boolean;
    maxWorkers: number;
    testTimeout: number;
    setupFiles: string[];
    globalSetup: string[];
    globalTeardown: string[];
  };
  paths: {
    tests: string;
    coverage: string;
    reports: string;
    fixtures: string;
    mocks: string;
  };
}
