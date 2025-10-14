// Tipos para funcionalidades avançadas de produção e segurança

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message: string;
  standardHeaders: boolean;
  legacyHeaders: boolean;
  skipSuccessfulRequests: boolean;
  skipFailedRequests: boolean;
}

export interface RateLimitStats {
  totalRequests: number;
  blockedRequests: number;
  allowedRequests: number;
  currentWindow: {
    start: string;
    end: string;
    requests: number;
  };
  topIPs: Array<{
    ip: string;
    requests: number;
    blocked: number;
  }>;
}

export interface CORSConfig {
  origin: string | string[] | boolean;
  methods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
  preflightContinue: boolean;
  optionsSuccessStatus: number;
}

export interface CORSStats {
  totalRequests: number;
  preflightRequests: number;
  blockedRequests: number;
  allowedOrigins: string[];
  blockedOrigins: string[];
  topOrigins: Array<{
    origin: string;
    requests: number;
  }>;
}

export interface CompressionConfig {
  enabled: boolean;
  level: number;
  threshold: number;
  filter: (req: any, res: any) => boolean;
}

export interface CompressionStats {
  totalRequests: number;
  compressedRequests: number;
  compressionRatio: number;
  bytesSaved: number;
  averageCompressionRatio: number;
  topCompressedEndpoints: Array<{
    endpoint: string;
    requests: number;
    compressionRatio: number;
    bytesSaved: number;
  }>;
}

export interface SecurityHeaders {
  helmet: {
    contentSecurityPolicy: boolean;
    crossOriginEmbedderPolicy: boolean;
    crossOriginOpenerPolicy: boolean;
    crossOriginResourcePolicy: boolean;
    dnsPrefetchControl: boolean;
    frameguard: boolean;
    hidePoweredBy: boolean;
    hsts: boolean;
    ieNoOpen: boolean;
    noSniff: boolean;
    originAgentCluster: boolean;
    permittedCrossDomainPolicies: boolean;
    referrerPolicy: boolean;
    xssFilter: boolean;
  };
  customHeaders: Array<{
    name: string;
    value: string;
    enabled: boolean;
  }>;
}

export interface SecurityStats {
  totalRequests: number;
  blockedRequests: number;
  securityViolations: Array<{
    type: string;
    count: number;
    lastOccurrence: string;
  }>;
  topViolations: Array<{
    violation: string;
    count: number;
    percentage: number;
  }>;
}

export interface EnvironmentConfig {
  nodeEnv: 'development' | 'staging' | 'production';
  port: number;
  cors: CORSConfig;
  rateLimit: RateLimitConfig;
  compression: CompressionConfig;
  security: SecurityHeaders;
  logging: {
    level: string;
    format: string;
    enableConsole: boolean;
    enableFile: boolean;
  };
}

export interface ValidationPipeConfig {
  transform: boolean;
  whitelist: boolean;
  forbidNonWhitelisted: boolean;
  disableErrorMessages: boolean;
  validateCustomDecorators: boolean;
  exceptionFactory: (errors: any[]) => any;
}

export interface ValidationStats {
  totalValidations: number;
  successfulValidations: number;
  failedValidations: number;
  topValidationErrors: Array<{
    field: string;
    error: string;
    count: number;
  }>;
  validationPerformance: {
    averageTime: number;
    maxTime: number;
    minTime: number;
  };
}

export interface InterceptorStats {
  logging: {
    totalRequests: number;
    averageResponseTime: number;
    slowestRequests: Array<{
      method: string;
      url: string;
      responseTime: number;
      timestamp: string;
    }>;
  };
  metrics: {
    totalMetrics: number;
    lastUpdate: string;
    systemHealth: 'healthy' | 'warning' | 'critical';
  };
}

export interface ProductionDashboard {
  rateLimit: RateLimitStats;
  cors: CORSStats;
  compression: CompressionStats;
  security: SecurityStats;
  validation: ValidationStats;
  interceptors: InterceptorStats;
  environment: EnvironmentConfig;
  lastUpdate: string;
  systemStatus: 'healthy' | 'warning' | 'critical';
}
