// Serviço para funcionalidades de produção (Rate Limiting, CORS, Compression, Segurança)

import type {
  RequestLog,
  MetricsData,
  ProductionDashboard,
  ProductionAlert,
} from '../types/production';

// Mock data para demonstração
const generateMockMetrics = (): MetricsData => ({
  requests: {
    total: Math.floor(Math.random() * 50000) + 10000,
    byMethod: {
      GET: Math.floor(Math.random() * 30000) + 15000,
      POST: Math.floor(Math.random() * 10000) + 5000,
      PUT: Math.floor(Math.random() * 5000) + 2000,
      DELETE: Math.floor(Math.random() * 2000) + 1000,
      PATCH: Math.floor(Math.random() * 1000) + 500,
    },
    byStatus: {
      '200': Math.floor(Math.random() * 40000) + 20000,
      '201': Math.floor(Math.random() * 5000) + 2000,
      '400': Math.floor(Math.random() * 1000) + 200,
      '401': Math.floor(Math.random() * 500) + 100,
      '403': Math.floor(Math.random() * 200) + 50,
      '404': Math.floor(Math.random() * 800) + 200,
      '429': Math.floor(Math.random() * 100) + 20,
      '500': Math.floor(Math.random() * 200) + 50,
    },
    byEndpoint: {
      '/v1/users': Math.floor(Math.random() * 15000) + 8000,
      '/v1/patrimonios': Math.floor(Math.random() * 10000) + 5000,
      '/v1/auth': Math.floor(Math.random() * 8000) + 3000,
      '/v1/metrics': Math.floor(Math.random() * 2000) + 1000,
      '/health': Math.floor(Math.random() * 5000) + 2000,
    },
  },
  performance: {
    averageResponseTime: Math.floor(Math.random() * 200) + 50,
    p95Latency: Math.floor(Math.random() * 500) + 150,
    p99Latency: Math.floor(Math.random() * 1000) + 300,
    throughput: Math.floor(Math.random() * 100) + 50,
  },
  rateLimiting: {
    totalRequests: Math.floor(Math.random() * 100000) + 50000,
    blockedRequests: Math.floor(Math.random() * 1000) + 100,
    averageRequestsPerMinute: Math.floor(Math.random() * 200) + 50,
    topClients: [
      { ip: '192.168.1.100', requests: 1500, blocked: 5 },
      { ip: '10.0.0.50', requests: 1200, blocked: 2 },
      { ip: '172.16.0.25', requests: 800, blocked: 1 },
      { ip: '203.0.113.10', requests: 600, blocked: 8 },
      { ip: '198.51.100.5', requests: 400, blocked: 0 },
    ],
  },
  compression: {
    totalRequests: Math.floor(Math.random() * 50000) + 20000,
    compressedRequests: Math.floor(Math.random() * 40000) + 15000,
    totalOriginalSize: Math.floor(Math.random() * 1000000000) + 500000000, // bytes
    totalCompressedSize: Math.floor(Math.random() * 200000000) + 100000000, // bytes
    averageCompressionRatio: Math.random() * 0.5 + 0.3, // 30-80%
    bytesSaved: Math.floor(Math.random() * 800000000) + 400000000,
  },
  security: {
    blockedRequests: Math.floor(Math.random() * 500) + 50,
    suspiciousActivity: Math.floor(Math.random() * 100) + 10,
    corsViolations: Math.floor(Math.random() * 200) + 20,
    invalidHeaders: Math.floor(Math.random() * 50) + 5,
  },
  timestamp: new Date().toISOString(),
});

const generateMockLogs = (): RequestLog[] => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const statusCodes = [200, 201, 400, 401, 403, 404, 429, 500];
  const endpoints = [
    '/v1/users',
    '/v1/patrimonios',
    '/v1/auth',
    '/v1/metrics',
    '/health',
  ];
  const ips = [
    '192.168.1.100',
    '10.0.0.50',
    '172.16.0.25',
    '203.0.113.10',
    '198.51.100.5',
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `log-${i}`,
    method: methods[Math.floor(Math.random() * methods.length)],
    url: endpoints[Math.floor(Math.random() * endpoints.length)],
    statusCode: statusCodes[Math.floor(Math.random() * statusCodes.length)],
    duration: Math.floor(Math.random() * 500) + 10,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    ip: ips[Math.floor(Math.random() * ips.length)],
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    query: Math.random() > 0.7 ? { page: 1, limit: 20 } : undefined,
    params:
      Math.random() > 0.8
        ? { id: Math.floor(Math.random() * 1000) }
        : undefined,
    body: Math.random() > 0.9 ? { name: 'Test User' } : undefined,
    responseSize: Math.floor(Math.random() * 10000) + 100,
    rateLimitStatus:
      Math.random() > 0.5
        ? {
            total: Math.floor(Math.random() * 100) + 1,
            remaining: Math.floor(Math.random() * 50),
            resetTime: Date.now() + 60000,
            limit: 100,
            windowMs: 60000,
          }
        : undefined,
    compressionApplied: Math.random() > 0.3,
    compressionRatio: Math.random() * 0.6 + 0.2,
  }));
};

const mockAlerts: ProductionAlert[] = [
  {
    id: 'alert-1',
    type: 'rate_limit',
    severity: 'high',
    title: 'Rate Limit Exceeded',
    description:
      'IP 192.168.1.100 exceeded rate limit of 100 requests per minute',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    resolved: false,
    metadata: { ip: '192.168.1.100', limit: 100, actual: 150 },
  },
  {
    id: 'alert-2',
    type: 'cors_violation',
    severity: 'medium',
    title: 'CORS Policy Violation',
    description: 'Request from unauthorized origin: https://malicious-site.com',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    resolved: false,
    metadata: {
      origin: 'https://malicious-site.com',
      allowedOrigins: ['http://localhost:3001'],
    },
  },
  {
    id: 'alert-3',
    type: 'security_threat',
    severity: 'critical',
    title: 'Suspicious Activity Detected',
    description: 'Multiple failed authentication attempts from IP 203.0.113.10',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    resolved: false,
    metadata: { ip: '203.0.113.10', attempts: 15, timeWindow: '5 minutes' },
  },
  {
    id: 'alert-4',
    type: 'performance_degradation',
    severity: 'medium',
    title: 'High Response Time',
    description: 'Average response time exceeded 500ms threshold',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    resolved: true,
    metadata: { averageTime: 750, threshold: 500 },
  },
];

class ProductionService {
  // private _baseUrl: string;

  constructor() {
    // this._baseUrl = 'http://localhost:3001';
  }

  async getProductionDashboard(): Promise<ProductionDashboard> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/production/dashboard`);
      // return response.json();

      // Mock data para demonstração
      const dashboard: ProductionDashboard = {
        environment: {
          name: 'production',
          apiUrl: 'http://localhost:3001',
          corsOrigins: ['http://localhost:3001', 'http://localhost:5173'],
          rateLimitConfig: {
            ttl: 60000,
            limit: 100,
            skipSuccessfulRequests: false,
            skipFailedRequests: false,
          },
          compressionConfig: {
            enabled: true,
            level: 6,
            threshold: 1024,
          },
          securityConfig: {
            helmet: {
              contentSecurityPolicy: true,
              crossOriginEmbedderPolicy: true,
              crossOriginOpenerPolicy: true,
              crossOriginResourcePolicy: true,
              dnsPrefetchControl: true,
              frameguard: true,
              hidePoweredBy: true,
              hsts: true,
              ieNoOpen: true,
              noSniff: true,
              originAgentCluster: true,
              permittedCrossDomainPolicies: true,
              referrerPolicy: true,
              xssFilter: true,
            },
            customHeaders: {
              'X-Content-Type-Options': 'nosniff',
              'X-Frame-Options': 'DENY',
              'X-XSS-Protection': '1; mode=block',
            },
          },
          loggingLevel: 'info',
          enableMetrics: true,
          enableSwagger: true,
        },
        metrics: generateMockMetrics(),
        rateLimitConfig: {
          ttl: 60000,
          limit: 100,
          skipSuccessfulRequests: false,
          skipFailedRequests: false,
        },
        corsConfig: {
          origin: ['http://localhost:3001', 'http://localhost:5173'],
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
          credentials: true,
          maxAge: 86400,
        },
        compressionConfig: {
          enabled: true,
          level: 6,
          threshold: 1024,
        },
        securityConfig: {
          helmet: {
            contentSecurityPolicy: true,
            crossOriginEmbedderPolicy: true,
            crossOriginOpenerPolicy: true,
            crossOriginResourcePolicy: true,
            dnsPrefetchControl: true,
            frameguard: true,
            hidePoweredBy: true,
            hsts: true,
            ieNoOpen: true,
            noSniff: true,
            originAgentCluster: true,
            permittedCrossDomainPolicies: true,
            referrerPolicy: true,
            xssFilter: true,
          },
          customHeaders: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
          },
        },
        recentLogs: generateMockLogs(),
        alerts: mockAlerts,
      };

      return new Promise((resolve) => {
        setTimeout(() => resolve(dashboard), 500);
      });
    } catch (error) {
      console.error('Erro ao buscar dashboard de produção:', error);
      throw new Error('Falha ao carregar dashboard de produção');
    }
  }

  async getMetrics(): Promise<MetricsData> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/production/metrics`);
      // return response.json();

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(generateMockMetrics()), 300);
      });
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw new Error('Falha ao carregar métricas');
    }
  }

  async getRequestLogs(
    params: {
      limit?: number;
      offset?: number;
      method?: string;
      statusCode?: number;
    } = {},
  ): Promise<{ logs: RequestLog[]; total: number }> {
    try {
      // Em produção, fazer requisição real para o backend
      // const queryParams = new URLSearchParams();
      // Object.entries(params).forEach(([key, value]) => {
      //   if (value !== undefined) queryParams.append(key, value.toString());
      // });
      // const response = await fetch(`${this.baseUrl}/v1/production/logs?${queryParams}`);
      // return response.json();

      // Mock data para demonstração
      let logs = generateMockLogs();

      if (params.method) {
        logs = logs.filter((log) => log.method === params.method);
      }

      if (params.statusCode) {
        logs = logs.filter((log) => log.statusCode === params.statusCode);
      }

      if (params.limit) {
        logs = logs.slice(0, params.limit);
      }

      return new Promise((resolve) => {
        setTimeout(() => resolve({ logs, total: logs.length }), 400);
      });
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      throw new Error('Falha ao carregar logs');
    }
  }

  async getAlerts(): Promise<ProductionAlert[]> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/production/alerts`);
      // return response.json();

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockAlerts), 300);
      });
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      throw new Error('Falha ao carregar alertas');
    }
  }

  async updateRateLimitConfig(): Promise<void> {
    try {
      // Em produção, fazer requisição real para o backend
      // await fetch(`${this.baseUrl}/v1/production/rate-limit`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      console.error('Erro ao atualizar configuração de rate limit:', error);
      throw new Error('Falha ao atualizar configuração de rate limit');
    }
  }

  async updateCorsConfig(): Promise<void> {
    try {
      // Em produção, fazer requisição real para o backend
      // await fetch(`${this.baseUrl}/v1/production/cors`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      console.error('Erro ao atualizar configuração de CORS:', error);
      throw new Error('Falha ao atualizar configuração de CORS');
    }
  }

  async updateCompressionConfig(): Promise<void> {
    try {
      // Em produção, fazer requisição real para o backend
      // await fetch(`${this.baseUrl}/v1/production/compression`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      console.error('Erro ao atualizar configuração de compressão:', error);
      throw new Error('Falha ao atualizar configuração de compressão');
    }
  }

  async updateSecurityConfig(): Promise<void> {
    try {
      // Em produção, fazer requisição real para o backend
      // await fetch(`${this.baseUrl}/v1/production/security`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    } catch (error) {
      console.error('Erro ao atualizar configuração de segurança:', error);
      throw new Error('Falha ao atualizar configuração de segurança');
    }
  }

  async resolveAlert(): Promise<void> {
    try {
      // Em produção, fazer requisição real para o backend
      // await fetch(`${this.baseUrl}/v1/production/alerts/${alertId}/resolve`, {
      //   method: 'POST'
      // });

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 200);
      });
    } catch {
      throw new Error('Falha ao resolver alerta');
    }
  }

  async getCompressionStats(): Promise<CompressionStats> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/production/compression/stats`);
      // return response.json();

      // Mock data para demonstração
      const originalSize = Math.floor(Math.random() * 1000000000) + 500000000;
      const compressedSize = Math.floor(
        originalSize * (Math.random() * 0.5 + 0.3),
      );

      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              originalSize,
              compressedSize,
              compressionRatio: compressedSize / originalSize,
              bytesSaved: originalSize - compressedSize,
              requestsCompressed: Math.floor(Math.random() * 40000) + 15000,
              totalRequests: Math.floor(Math.random() * 50000) + 20000,
            }),
          300,
        );
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas de compressão:', error);
      throw new Error('Falha ao carregar estatísticas de compressão');
    }
  }
}

export const productionService = new ProductionService();
