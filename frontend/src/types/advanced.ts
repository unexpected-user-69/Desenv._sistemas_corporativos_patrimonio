// Tipos para serviços avançados e endpoints especiais

export interface HashServiceConfig {
  algorithm: 'bcrypt' | 'scrypt' | 'argon2';
  saltRounds: number;
  pepper?: string;
  customSalt?: string;
}

export interface NormalizationConfig {
  email: {
    trim: boolean;
    lowercase: boolean;
    removeDots: boolean;
  };
  name: {
    trim: boolean;
    capitalize: boolean;
    removeExtraSpaces: boolean;
  };
  text: {
    trim: boolean;
    normalizeUnicode: boolean;
    removeSpecialChars: boolean;
  };
}

export interface FilterConfig {
  search: {
    caseSensitive: boolean;
    fuzzy: boolean;
    minLength: number;
    maxResults: number;
  };
  pagination: {
    defaultLimit: number;
    maxLimit: number;
    cursorBased: boolean;
  };
  sorting: {
    allowedFields: string[];
    defaultField: string;
    defaultOrder: 'asc' | 'desc';
  };
}

export interface AdvancedSearchParams {
  query: string;
  fields: string[];
  filters: Record<string, unknown>;
  sort: {
    field: string;
    order: 'asc' | 'desc';
  };
  pagination: {
    page?: number;
    limit?: number;
    cursor?: string;
  };
  options: {
    fuzzy: boolean;
    highlight: boolean;
    explain: boolean;
  };
}

export interface CursorPaginationParams {
  cursor?: string;
  limit: number;
  direction: 'forward' | 'backward';
  sort: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface FuzzySearchParams {
  query: string;
  fields: string[];
  threshold: number; // 0-1, similaridade mínima
  maxResults: number;
  options: {
    caseSensitive: boolean;
    exactMatch: boolean;
    wildcards: boolean;
  };
}

export interface DateRangeParams {
  field: string;
  start: string;
  end: string;
  timezone?: string;
  format?: string;
}

export interface SearchResult<T = any> {
  data: T[];
  pagination: {
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextCursor?: string;
    prevCursor?: string;
  };
  meta: {
    query: string;
    executionTime: number;
    suggestions?: string[];
    facets?: Record<string, unknown>;
  };
}

export interface FuzzySearchResult<T = any> extends SearchResult<T> {
  fuzzy: {
    matches: Array<{
      item: T;
      score: number;
      highlights: Record<string, string[]>;
    }>;
    suggestions: string[];
    didYouMean?: string;
  };
}

export interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: string;
  responseTime?: number;
  error?: string;
  metrics: {
    requestsPerSecond: number;
    averageResponseTime: number;
    errorRate: number;
    uptime: number;
  };
}

export interface CacheConfig {
  enabled: boolean;
  ttl: number; // time to live em segundos
  maxSize: number;
  strategy: 'lru' | 'lfu' | 'fifo';
  invalidation: {
    onWrite: boolean;
    onDelete: boolean;
    patterns: string[];
  };
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export interface BulkOperationResult<T = any> {
  total: number;
  successful: number;
  failed: number;
  results: Array<{
    index: number;
    success: boolean;
    data?: T;
    error?: string;
  }>;
  summary: {
    executionTime: number;
    averageTimePerItem: number;
    errors: Record<string, number>;
  };
}
