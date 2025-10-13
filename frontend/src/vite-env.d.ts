/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_DEBUG: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_MONITORING_ENABLED: string
  readonly VITE_METRICS_INTERVAL: string
  readonly VITE_PERFORMANCE_TESTING_ENABLED: string
  readonly VITE_DEFAULT_TEST_DURATION: string
  readonly VITE_CACHE_ENABLED: string
  readonly VITE_CACHE_TTL: string
  readonly VITE_REDIS_HOST: string
  readonly VITE_REDIS_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
