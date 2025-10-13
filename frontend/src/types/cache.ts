// Tipos para o sistema de cache Redis

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  totalKeys: number;
  memoryUsage: string;
  uptime: number;
  connectedClients: number;
}

export interface CacheKey {
  key: string;
  value: string;
  ttl: number;
  type: 'string' | 'hash' | 'list' | 'set' | 'zset';
  size: number;
  lastAccessed: string;
}

export interface CacheConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
  ttl: number;
  maxMemory: string;
  evictionPolicy: 'allkeys-lru' | 'allkeys-lfu' | 'volatile-lru' | 'volatile-lfu' | 'noeviction';
}

export interface CacheOperation {
  id: string;
  operation: 'GET' | 'SET' | 'DEL' | 'EXPIRE' | 'FLUSH';
  key: string;
  value?: string;
  ttl?: number;
  timestamp: string;
  duration: number;
  success: boolean;
  error?: string;
}

export interface CacheMetrics {
  operationsPerSecond: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errorRate: number;
  memoryUsage: number;
  cpuUsage: number;
}

export interface CacheAlert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface CacheHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: string;
  responseTime: number;
  memoryUsage: number;
  connectedClients: number;
  errors: number;
  warnings: number;
}

export interface CachePattern {
  pattern: string;
  count: number;
  memoryUsage: number;
  lastAccessed: string;
}

export interface CacheFlushOptions {
  pattern?: string;
  confirm: boolean;
}

export interface CacheSearchOptions {
  pattern: string;
  limit: number;
  offset: number;
  includeValues: boolean;
  includeTtl: boolean;
}

export interface CacheSearchResult {
  keys: CacheKey[];
  total: number;
  hasMore: boolean;
}
