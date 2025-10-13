// Serviço para sistema de monitoramento e observabilidade (M2)

import { MetricsData, SystemHealth, LogEntry, Alert, AlertRule, ChartData } from '../types/monitoring';

// Mock data para demonstração
const generateMockMetrics = (): MetricsData => ({
  requests: {
    total: Math.floor(Math.random() * 10000) + 5000,
    byMethod: {
      GET: Math.floor(Math.random() * 6000) + 3000,
      POST: Math.floor(Math.random() * 2000) + 1000,
      PUT: Math.floor(Math.random() * 1000) + 500,
      DELETE: Math.floor(Math.random() * 500) + 200
    },
    byStatus: {
      '200': Math.floor(Math.random() * 8000) + 4000,
      '201': Math.floor(Math.random() * 1000) + 500,
      '400': Math.floor(Math.random() * 200) + 50,
      '401': Math.floor(Math.random() * 100) + 25,
      '404': Math.floor(Math.random() * 150) + 50,
      '500': Math.floor(Math.random() * 50) + 10
    }
  },
  performance: {
    averageResponseTime: Math.floor(Math.random() * 200) + 50,
    p95Latency: Math.floor(Math.random() * 500) + 100,
    throughput: Math.floor(Math.random() * 100) + 50
  },
  system: {
    cpu: Math.random() * 100,
    memory: Math.random() * 100,
    disk: Math.random() * 100,
    network: Math.random() * 100
  },
  timestamp: new Date().toISOString()
});

const generateMockLogs = (): LogEntry[] => {
  const levels = ['error', 'warn', 'info', 'debug'] as const;
  const messages = [
    'User authentication successful',
    'Database connection established',
    'Cache miss for key: user:123',
    'Request processed successfully',
    'Rate limit exceeded for IP: 192.168.1.1',
    'Database query timeout',
    'Memory usage high: 85%',
    'New user registered',
    'Password reset requested',
    'API endpoint called'
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: `log-${i}`,
    level: levels[Math.floor(Math.random() * levels.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    userId: Math.random() > 0.5 ? `user-${Math.floor(Math.random() * 100)}` : undefined,
    context: Math.random() > 0.7 ? {
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      userAgent: 'Mozilla/5.0...',
      endpoint: '/api/users'
    } : undefined,
    service: ['api', 'auth', 'database', 'cache'][Math.floor(Math.random() * 4)],
    traceId: `trace-${Math.random().toString(36).substr(2, 9)}`
  }));
};

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'High CPU Usage',
    description: 'CPU usage has exceeded 80% for the last 5 minutes',
    severity: 'high',
    status: 'active',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    source: 'system-monitor',
    tags: ['cpu', 'performance'],
    metadata: { currentValue: 85, threshold: 80 }
  },
  {
    id: 'alert-2',
    title: 'Database Connection Pool Exhausted',
    description: 'All database connections are in use',
    severity: 'critical',
    status: 'active',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    source: 'database-monitor',
    tags: ['database', 'connections'],
    metadata: { poolSize: 100, activeConnections: 100 }
  },
  {
    id: 'alert-3',
    title: 'High Error Rate',
    description: 'Error rate has exceeded 5% in the last 10 minutes',
    severity: 'medium',
    status: 'acknowledged',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    source: 'api-monitor',
    tags: ['errors', 'api'],
    metadata: { errorRate: 6.2, threshold: 5 }
  }
];

class MonitoringService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  }

  async getMetrics(): Promise<MetricsData> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/metrics`);
      // return response.json();

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(generateMockMetrics()), 500);
      });
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw new Error('Falha ao carregar métricas');
    }
  }

  async getSystemHealth(): Promise<SystemHealth> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/health`);
      // return response.json();

      // Mock data para demonstração
      const health: SystemHealth = {
        status: Math.random() > 0.1 ? 'healthy' : 'warning',
        lastCheck: new Date().toISOString(),
        services: [
          {
            name: 'API Server',
            status: 'healthy',
            responseTime: Math.floor(Math.random() * 50) + 10
          },
          {
            name: 'Database',
            status: Math.random() > 0.2 ? 'healthy' : 'warning',
            responseTime: Math.floor(Math.random() * 100) + 20
          },
          {
            name: 'Redis Cache',
            status: 'healthy',
            responseTime: Math.floor(Math.random() * 10) + 2
          },
          {
            name: 'File Storage',
            status: Math.random() > 0.15 ? 'healthy' : 'warning',
            responseTime: Math.floor(Math.random() * 200) + 50
          }
        ],
        uptime: Math.floor(Math.random() * 86400) + 3600, // 1-24 horas
        version: '1.0.0'
      };

      return new Promise((resolve) => {
        setTimeout(() => resolve(health), 300);
      });
    } catch (error) {
      console.error('Erro ao buscar status do sistema:', error);
      throw new Error('Falha ao carregar status do sistema');
    }
  }

  async getLogs(params: { limit?: number; level?: string; service?: string } = {}): Promise<{ logs: LogEntry[]; total: number }> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/logs?${new URLSearchParams(params)}`);
      // return response.json();

      // Mock data para demonstração
      let logs = generateMockLogs();

      if (params.level) {
        logs = logs.filter(log => log.level === params.level);
      }

      if (params.service) {
        logs = logs.filter(log => log.service === params.service);
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

  async getAlerts(): Promise<Alert[]> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/alerts`);
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

  async getAlertRules(): Promise<AlertRule[]> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/alert-rules`);
      // return response.json();

      // Mock data para demonstração
      const rules: AlertRule[] = [
        {
          id: 'rule-1',
          name: 'High CPU Usage',
          description: 'Alert when CPU usage exceeds 80%',
          condition: 'cpu_usage > 80',
          threshold: 80,
          severity: 'high',
          enabled: true,
          lastTriggered: new Date(Date.now() - 300000).toISOString()
        },
        {
          id: 'rule-2',
          name: 'High Memory Usage',
          description: 'Alert when memory usage exceeds 90%',
          condition: 'memory_usage > 90',
          threshold: 90,
          severity: 'critical',
          enabled: true
        },
        {
          id: 'rule-3',
          name: 'High Error Rate',
          description: 'Alert when error rate exceeds 5%',
          condition: 'error_rate > 5',
          threshold: 5,
          severity: 'medium',
          enabled: true
        }
      ];

      return new Promise((resolve) => {
        setTimeout(() => resolve(rules), 200);
      });
    } catch (error) {
      console.error('Erro ao buscar regras de alerta:', error);
      throw new Error('Falha ao carregar regras de alerta');
    }
  }

  async getChartData(type: 'performance' | 'requests' | 'system', period: '1h' | '24h' | '7d' = '1h'): Promise<ChartData> {
    try {
      // Em produção, fazer requisição real para o backend
      // const response = await fetch(`${this.baseUrl}/v1/charts/${type}?period=${period}`);
      // return response.json();

      // Mock data para demonstração
      const generateTimeLabels = (period: string) => {
        const now = new Date();
        const labels: string[] = [];
        
        if (period === '1h') {
          for (let i = 11; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 5 * 60000);
            labels.push(time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
          }
        } else if (period === '24h') {
          for (let i = 23; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60 * 60000);
            labels.push(time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
          }
        } else {
          for (let i = 6; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 24 * 60 * 60000);
            labels.push(time.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
          }
        }
        
        return labels;
      };

      const labels = generateTimeLabels(period);
      const generateData = (min: number, max: number) => 
        labels.map(() => Math.floor(Math.random() * (max - min)) + min);

      let chartData: ChartData;

      switch (type) {
        case 'performance':
          chartData = {
            labels,
            datasets: [
              {
                label: 'Tempo de Resposta (ms)',
                data: generateData(50, 300),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true
              },
              {
                label: 'Throughput (req/s)',
                data: generateData(20, 100),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true
              }
            ]
          };
          break;
        case 'requests':
          chartData = {
            labels,
            datasets: [
              {
                label: 'GET',
                data: generateData(100, 500),
                backgroundColor: 'rgba(59, 130, 246, 0.8)'
              },
              {
                label: 'POST',
                data: generateData(50, 200),
                backgroundColor: 'rgba(16, 185, 129, 0.8)'
              },
              {
                label: 'PUT',
                data: generateData(20, 100),
                backgroundColor: 'rgba(245, 158, 11, 0.8)'
              },
              {
                label: 'DELETE',
                data: generateData(10, 50),
                backgroundColor: 'rgba(239, 68, 68, 0.8)'
              }
            ]
          };
          break;
        case 'system':
          chartData = {
            labels,
            datasets: [
              {
                label: 'CPU (%)',
                data: generateData(20, 80),
                borderColor: 'rgb(239, 68, 68)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                fill: true
              },
              {
                label: 'Memória (%)',
                data: generateData(30, 90),
                borderColor: 'rgb(245, 158, 11)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: true
              },
              {
                label: 'Disco (%)',
                data: generateData(40, 95),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true
              }
            ]
          };
          break;
        default:
          throw new Error('Tipo de gráfico não suportado');
      }

      return new Promise((resolve) => {
        setTimeout(() => resolve(chartData), 400);
      });
    } catch (error) {
      console.error('Erro ao buscar dados do gráfico:', error);
      throw new Error('Falha ao carregar dados do gráfico');
    }
  }

  async acknowledgeAlert(alertId: string): Promise<void> {
    try {
      // Em produção, fazer requisição real para o backend
      // await fetch(`${this.baseUrl}/v1/alerts/${alertId}/acknowledge`, {
      //   method: 'POST'
      // });

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 200);
      });
    } catch (error) {
      console.error('Erro ao reconhecer alerta:', error);
      throw new Error('Falha ao reconhecer alerta');
    }
  }

  async resolveAlert(alertId: string): Promise<void> {
    try {
      // Em produção, fazer requisição real para o backend
      // await fetch(`${this.baseUrl}/v1/alerts/${alertId}/resolve`, {
      //   method: 'POST'
      // });

      // Mock data para demonstração
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 200);
      });
    } catch (error) {
      console.error('Erro ao resolver alerta:', error);
      throw new Error('Falha ao resolver alerta');
    }
  }
}

export const monitoringService = new MonitoringService();