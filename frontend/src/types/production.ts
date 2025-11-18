// Tipos para funcionalidades de produção (Rate Limiting, CORS, Compression, Segurança)

export interface RateLimitConfig {
  ttl: number; // Time to live em milissegundos
  limit: number; // Número máximo de requisições
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: string;
  blockDuration?: number;
}

export interface RateLimitStatus {
  total: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
  limit: number;
  windowMs: number;
}

export interface CorsConfig {
  origin: string[];
  methods: string[];
  allowedHeaders: string[];
  credentials: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}

export interface CompressionConfig {
  enabled: boolean;
  level: number; // 1-9
  threshold: number; // Tamanho mínimo em bytes
  filter?: (req: Request, res: Response) => boolean;
}

export interface CompressionStats {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  bytesSaved: number;
  requestsCompressed: number;
  totalRequests: number;
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
  customHeaders: Record<string, string>;
}

export interface EnvironmentConfig {
  name: 'development' | 'staging' | 'production';
  apiUrl: string;
  corsOrigins: string[];
  rateLimitConfig: RateLimitConfig;
  compressionConfig: CompressionConfig;
  securityConfig: SecurityHeaders;
  loggingLevel: 'error' | 'warn' | 'info' | 'debug';
  enableMetrics: boolean;
  enableSwagger: boolean;
}

export interface RequestLog {
  id: string;
  method: string;
  url: string;
  statusCode: number;
  duration: number;
  userAgent: string;
  ip: string;
  timestamp: string;
  query?: Record<string, string | string[]>;
  params?: Record<string, string>;
  body?: unknown;
  responseSize: number;
  rateLimitStatus?: RateLimitStatus;
  compressionApplied?: boolean;
  compressionRatio?: number;
}

export interface MetricsData {
  requests: {
    total: number;
    byMethod: Record<string, number>;
    byStatus: Record<string, number>;
    byEndpoint: Record<string, number>;
  };
  performance: {
    averageResponseTime: number;
    p95Latency: number;
    p99Latency: number;
    throughput: number;
  };
  rateLimiting: {
    totalRequests: number;
    blockedRequests: number;
    averageRequestsPerMinute: number;
    topClients: Array<{
      ip: string;
      requests: number;
      blocked: number;
    }>;
  };
  compression: {
    totalRequests: number;
    compressedRequests: number;
    totalOriginalSize: number;
    totalCompressedSize: number;
    averageCompressionRatio: number;
    bytesSaved: number;
  };
  security: {
    blockedRequests: number;
    suspiciousActivity: number;
    corsViolations: number;
    invalidHeaders: number;
  };
  timestamp: string;
}

export interface ProductionDashboard {
  environment: EnvironmentConfig;
  metrics: MetricsData;
  rateLimitConfig: RateLimitConfig;
  corsConfig: CorsConfig;
  compressionConfig: CompressionConfig;
  securityConfig: SecurityHeaders;
  recentLogs: RequestLog[];
  alerts: ProductionAlert[];
}

export interface ProductionAlert {
  id: string;
  type:
    | 'rate_limit'
    | 'cors_violation'
    | 'security_threat'
    | 'compression_error'
    | 'performance_degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  metadata?: Record<string, unknown>;
}

export interface ProductionConfig {
  rateLimiting: RateLimitConfig;
  cors: CorsConfig;
  compression: CompressionConfig;
  security: SecurityHeaders;
  environment: EnvironmentConfig;
}
