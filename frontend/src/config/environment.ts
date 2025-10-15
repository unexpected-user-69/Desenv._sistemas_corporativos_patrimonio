// Configuração de ambiente

// Helper function to safely get environment variables
const getEnvVar = (key: string, defaultValue: string): string => {
  const value = (import.meta as any).env?.[key];
  return value || defaultValue;
};

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = (import.meta as any).env?.[key];
  return value === 'true' || defaultValue;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = (import.meta as any).env?.[key];
  return value ? parseInt(value, 10) : defaultValue;
};

export const config = {
  api: {
    baseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3101'),
    timeout: 30000,
  },
  app: {
    name: getEnvVar('VITE_APP_NAME', 'Patrimônio Inventário'),
    version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
    description: getEnvVar(
      'VITE_APP_DESCRIPTION',
      'Sistema de Patrimônio/Inventário - Frontend Avançado',
    ),
  },
  development: {
    debug: getEnvBoolean('VITE_DEBUG', false),
    logLevel: getEnvVar('VITE_LOG_LEVEL', 'info'),
  },
  monitoring: {
    enabled: getEnvBoolean('VITE_MONITORING_ENABLED', false),
    interval: getEnvNumber('VITE_METRICS_INTERVAL', 30000),
  },
  performance: {
    testingEnabled: getEnvBoolean('VITE_PERFORMANCE_TESTING_ENABLED', false),
    defaultTestDuration: getEnvNumber('VITE_DEFAULT_TEST_DURATION', 60),
  },
  cache: {
    enabled: getEnvBoolean('VITE_CACHE_ENABLED', false),
    ttl: getEnvNumber('VITE_CACHE_TTL', 300000),
  },
} as const;

export default config;
