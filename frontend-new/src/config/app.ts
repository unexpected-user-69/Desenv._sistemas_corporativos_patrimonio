// Configurações da aplicação

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Sistema de Patrimônio',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  monitoring: {
    refreshInterval: parseInt(import.meta.env.VITE_MONITORING_REFRESH_INTERVAL || '30000'),
    autoRefresh: import.meta.env.VITE_MONITORING_AUTO_REFRESH === 'true',
  },
  websocket: {
    baseUrl: import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000',
  },
} as const;
