// Tipos globais para o sistema

// Tipos básicos para requisições HTTP
export interface Request {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
  query?: Record<string, string | string[]>;
  params?: Record<string, string>;
}

export interface Response {
  statusCode: number;
  headers: Record<string, string>;
  body?: unknown;
}

// Tipos para validação
export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

// Tipos para configuração de ambiente
export interface EnvironmentVariables {
  VITE_API_BASE_URL?: string;
  VITE_APP_NAME?: string;
  VITE_APP_VERSION?: string;
  VITE_APP_DESCRIPTION?: string;
  VITE_DEBUG?: string;
  VITE_LOG_LEVEL?: string;
  VITE_MONITORING_ENABLED?: string;
  VITE_METRICS_INTERVAL?: string;
  VITE_PERFORMANCE_TESTING_ENABLED?: string;
  VITE_DEFAULT_TEST_DURATION?: string;
  VITE_CACHE_ENABLED?: string;
  VITE_CACHE_TTL?: string;
}
