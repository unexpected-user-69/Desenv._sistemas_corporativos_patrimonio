// Configuração de ambiente

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 30000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Patrimônio Inventário',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Sistema de Patrimônio/Inventário - Frontend Avançado',
  },
  development: {
    debug: import.meta.env.VITE_DEBUG === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
  },
  monitoring: {
    enabled: import.meta.env.VITE_MONITORING_ENABLED === 'true',
    interval: parseInt(import.meta.env.VITE_METRICS_INTERVAL || '30000'),
  },
  performance: {
    testingEnabled: import.meta.env.VITE_PERFORMANCE_TESTING_ENABLED === 'true',
    defaultTestDuration: parseInt(import.meta.env.VITE_DEFAULT_TEST_DURATION || '60'),
  },
  cache: {
    enabled: import.meta.env.VITE_CACHE_ENABLED === 'true',
    ttl: parseInt(import.meta.env.VITE_CACHE_TTL || '300000'),
  },
} as const;

export default config;
