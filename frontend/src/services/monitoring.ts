// Serviço de monitoramento e observabilidade (M2)

import {
  MetricsData,
  LogEntry,
  AlertRule,
  DashboardConfig,
  SystemHealth,
} from '../types/monitoring';

const API_BASE_URL =
  (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:3101';

export class MonitoringService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/v1`;
  }

  // Métricas em tempo real
  async getMetrics(): Promise<MetricsData> {
    try {
      const response = await fetch(`${this.baseUrl}/metrics`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.warn('Resposta não é JSON válido:', text);
        throw new Error('Resposta do servidor não é JSON válido');
      }

      return (await response.json()) as MetricsData;
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
      throw error;
    }
  }

  // Logs estruturados
  async getLogs(
    params: {
      level?: string;
      startDate?: string;
      endDate?: string;
      limit?: number;
      offset?: number;
    } = {},
  ): Promise<{ logs: LogEntry[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params.level) queryParams.append('level', params.level);
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());

      const response = await fetch(
        `${this.baseUrl}/metrics/logs?${queryParams}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.warn('Resposta não é JSON válido:', text);
        throw new Error('Resposta do servidor não é JSON válido');
      }

      return (await response.json()) as { logs: LogEntry[]; total: number };
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      throw error;
    }
  }

  // Regras de alerta
  async getAlertRules(): Promise<AlertRule[]> {
    try {
      const response = await fetch(`${this.baseUrl}/cache/alerts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as AlertRule[];
    } catch (error) {
      console.error('Erro ao buscar regras de alerta:', error);
      throw error;
    }
  }

  async createAlertRule(rule: Omit<AlertRule, 'id'>): Promise<AlertRule> {
    try {
      const response = await fetch(`${this.baseUrl}/cache/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as AlertRule;
    } catch (error) {
      console.error('Erro ao criar regra de alerta:', error);
      throw error;
    }
  }

  async updateAlertRule(
    id: string,
    rule: Partial<AlertRule>,
  ): Promise<AlertRule> {
    try {
      const response = await fetch(`${this.baseUrl}/cache/alerts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as AlertRule;
    } catch (error) {
      console.error('Erro ao atualizar regra de alerta:', error);
      throw error;
    }
  }

  async deleteAlertRule(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/cache/alerts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao deletar regra de alerta:', error);
      throw error;
    }
  }

  // Configuração de dashboards
  async getDashboards(): Promise<DashboardConfig[]> {
    try {
      // TODO: Implementar endpoint de dashboards no backend
      const response = await fetch(`${this.baseUrl}/cache/config`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as DashboardConfig[];
    } catch (error) {
      console.error('Erro ao buscar dashboards:', error);
      throw error;
    }
  }

  async createDashboard(
    dashboard: Omit<DashboardConfig, 'id'>,
  ): Promise<DashboardConfig> {
    try {
      // TODO: Implementar endpoint de dashboards no backend
      const response = await fetch(`${this.baseUrl}/cache/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dashboard),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as DashboardConfig;
    } catch (error) {
      console.error('Erro ao criar dashboard:', error);
      throw error;
    }
  }

  // Saúde do sistema
  async getSystemHealth(): Promise<SystemHealth> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.warn('Resposta não é JSON válido:', text);
        // Retorna um objeto de saúde padrão se a resposta não for JSON
        return {
          status: 'unknown' as const,
          services: [],
          lastCheck: new Date().toISOString(),
        };
      }

      return (await response.json()) as SystemHealth;
    } catch (error) {
      console.error('Erro ao buscar saúde do sistema:', error);
      throw error;
    }
  }

  // Métricas históricas
  async getHistoricalMetrics(params: {
    startDate: string;
    endDate: string;
    interval: '1m' | '5m' | '15m' | '1h' | '1d';
    metrics: string[];
  }): Promise<MetricsData[]> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('startDate', params.startDate);
      queryParams.append('endDate', params.endDate);
      queryParams.append('interval', params.interval);
      params.metrics.forEach((metric) => queryParams.append('metrics', metric));

      const response = await fetch(
        `${this.baseUrl}/metrics/historical?${queryParams}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as MetricsData[];
    } catch (error) {
      console.error('Erro ao buscar métricas históricas:', error);
      throw error;
    }
  }

  // WebSocket para métricas em tempo real
  createMetricsWebSocket(onMessage: (data: MetricsData) => void): WebSocket {
    const wsUrl = `${API_BASE_URL.replace('http', 'ws')}/v1/metrics/stream`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(String(event.data)) as MetricsData;
        onMessage(data);
      } catch (error) {
        console.error('Erro ao processar mensagem WebSocket:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket de métricas:', error);
    };

    return ws;
  }

  // Exportar dados
  async exportMetrics(params: {
    startDate: string;
    endDate: string;
    format: 'json' | 'csv' | 'xlsx';
    metrics: string[];
  }): Promise<Blob> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('startDate', params.startDate);
      queryParams.append('endDate', params.endDate);
      queryParams.append('format', params.format);
      params.metrics.forEach((metric) => queryParams.append('metrics', metric));

      const response = await fetch(
        `${this.baseUrl}/metrics/export?${queryParams}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.blob();
    } catch (error) {
      console.error('Erro ao exportar métricas:', error);
      throw error;
    }
  }
}

// Instância singleton
export const monitoringService = new MonitoringService();
