// Tipos para sistema de cache Redis

export interface CacheStats {
  hits: number;
  misses: number;
  keys: number;
  memoryUsage: number; // in bytes
  uptime: number; // in seconds
  evictions: number;
}

export interface CacheKey {
  key: string;
  ttl: number; // time to live in seconds
  type: string; // e.g., 'string', 'hash', 'list'
  valuePreview: string; // A snippet of the value
}

export interface CacheConfig {
  maxmemory: string; // e.g., '100mb'
  maxmemoryPolicy: 'noeviction' | 'allkeys-lru' | 'volatile-lru' | 'allkeys-random' | 'volatile-random' | 'volatile-ttl';
  defaultTTL: number; // in seconds
}

export interface CacheAlert {
  id: string;
  message: string;
  level: 'info' | 'warn' | 'error';
  timestamp: string;
  resolved: boolean;
}

export interface CacheOperation {
  id: string;
  type: 'GET' | 'SET' | 'DEL' | 'EXPIRE' | 'FLUSH';
  key: string;
  timestamp: string;
  duration: number; // in milliseconds
  success: boolean;
  error?: string;
}

export interface CacheMetrics {
  responseTime: {
    min: number;
    max: number;
    avg: number;
    p95: number;
    p99: number;
  };
  throughput: {
    operationsPerSecond: number;
    totalOperations: number;
  };
  hitRate: {
    percentage: number;
    hits: number;
    misses: number;
  };
}

export interface CacheHealth {
  status: 'healthy' | 'warning' | 'critical';
  lastCheck: string;
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  connections: {
    active: number;
    max: number;
  };
}

export interface CachePattern {
  pattern: string;
  count: number;
  memoryUsage: number;
  avgTTL: number;
}

export interface CacheFlushOptions {
  async: boolean;
  pattern?: string;
}

export interface CacheSearchOptions {
  pattern: string;
  limit?: number;
  offset?: number;
}

export interface CacheSearchResult {
  keys: CacheKey[];
  total: number;
  hasMore: boolean;
}
