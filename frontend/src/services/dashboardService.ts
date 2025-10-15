// Serviço para dashboard e métricas

import axios, { AxiosResponse } from 'axios';
import { config } from '../config/environment';
import {
  DashboardStats,
  ChartData,
  TimeSeriesData,
  UserGrowthData,
  PatrimonioGrowthData,
  SystemMetricsData,
  CacheMetricsData,
  RecentActivity,
  DashboardFilters,
  RealtimeMetrics,
  PerformanceMetrics,
  UserActivityMetrics,
  PatrimonioMetrics,
  TrendData,
  ComparisonData,
  DashboardInsight,
} from '../types/dashboard';

class DashboardService {
  private baseURL = config.api.baseUrl;

  /**
   * Obtém estatísticas gerais do dashboard
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response: AxiosResponse<DashboardStats> = await axios.get(
        `${this.baseURL}/v1/dashboard/stats`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar estatísticas do dashboard',
      );
    }
  }

  /**
   * Obtém dados de crescimento de usuários
   */
  async getUserGrowthData(period: string = '30d'): Promise<UserGrowthData[]> {
    try {
      const response: AxiosResponse<UserGrowthData[]> = await axios.get(
        `${this.baseURL}/v1/dashboard/users/growth?period=${period}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de crescimento de usuários',
      );
    }
  }

  /**
   * Obtém dados de crescimento de patrimônios
   */
  async getPatrimonioGrowthData(
    period: string = '30d',
  ): Promise<PatrimonioGrowthData[]> {
    try {
      const response: AxiosResponse<PatrimonioGrowthData[]> = await axios.get(
        `${this.baseURL}/v1/dashboard/patrimonios/growth?period=${period}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de crescimento de patrimônios',
      );
    }
  }

  /**
   * Obtém métricas do sistema
   */
  async getSystemMetrics(period: string = '1h'): Promise<SystemMetricsData[]> {
    try {
      const response: AxiosResponse<SystemMetricsData[]> = await axios.get(
        `${this.baseURL}/v1/dashboard/system/metrics?period=${period}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar métricas do sistema',
      );
    }
  }

  /**
   * Obtém métricas do cache
   */
  async getCacheMetrics(period: string = '1h'): Promise<CacheMetricsData[]> {
    try {
      const response: AxiosResponse<CacheMetricsData[]> = await axios.get(
        `${this.baseURL}/v1/dashboard/cache/metrics?period=${period}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar métricas do cache',
      );
    }
  }

  /**
   * Obtém atividade recente
   */
  async getRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
    try {
      const response: AxiosResponse<RecentActivity[]> = await axios.get(
        `${this.baseURL}/v1/dashboard/activity/recent?limit=${limit}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar atividade recente',
      );
    }
  }

  /**
   * Obtém métricas em tempo real
   */
  async getRealtimeMetrics(): Promise<RealtimeMetrics> {
    try {
      const response: AxiosResponse<RealtimeMetrics> = await axios.get(
        `${this.baseURL}/v1/dashboard/metrics/realtime`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar métricas em tempo real',
      );
    }
  }

  /**
   * Obtém métricas de performance
   */
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    try {
      const response: AxiosResponse<PerformanceMetrics> = await axios.get(
        `${this.baseURL}/v1/dashboard/performance/metrics`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar métricas de performance',
      );
    }
  }

  /**
   * Obtém métricas de atividade de usuários
   */
  async getUserActivityMetrics(
    period: string = '7d',
  ): Promise<UserActivityMetrics> {
    try {
      const response: AxiosResponse<UserActivityMetrics> = await axios.get(
        `${this.baseURL}/v1/dashboard/users/activity?period=${period}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar métricas de atividade de usuários',
      );
    }
  }

  /**
   * Obtém métricas de patrimônios
   */
  async getPatrimonioMetrics(): Promise<PatrimonioMetrics> {
    try {
      const response: AxiosResponse<PatrimonioMetrics> = await axios.get(
        `${this.baseURL}/v1/dashboard/patrimonios/metrics`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar métricas de patrimônios',
      );
    }
  }

  /**
   * Obtém dados de tendência para um métrica específica
   */
  async getTrendData(
    metric: string,
    period: string = '30d',
  ): Promise<TrendData> {
    try {
      const response: AxiosResponse<TrendData> = await axios.get(
        `${this.baseURL}/v1/dashboard/trends/${metric}?period=${period}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar dados de tendência',
      );
    }
  }

  /**
   * Obtém dados de comparação entre períodos
   */
  async getComparisonData(
    metric: string,
    currentPeriod: string,
    previousPeriod: string,
  ): Promise<ComparisonData> {
    try {
      const response: AxiosResponse<ComparisonData> = await axios.get(
        `${this.baseURL}/v1/dashboard/comparison/${metric}?current=${currentPeriod}&previous=${previousPeriod}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar dados de comparação',
      );
    }
  }

  /**
   * Obtém insights do dashboard
   */
  async getDashboardInsights(): Promise<DashboardInsight[]> {
    try {
      const response: AxiosResponse<DashboardInsight[]> = await axios.get(
        `${this.baseURL}/v1/dashboard/insights`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar insights do dashboard',
      );
    }
  }

  /**
   * Marca um insight como lido
   */
  async markInsightAsRead(insightId: string): Promise<void> {
    try {
      await axios.patch(
        `${this.baseURL}/v1/dashboard/insights/${insightId}/read`,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao marcar insight como lido',
      );
    }
  }

  /**
   * Obtém dados para gráficos específicos
   */
  async getChartData(
    chartType: string,
    filters?: DashboardFilters,
  ): Promise<ChartData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.dateRange) {
          params.append('start', filters.dateRange.start);
          params.append('end', filters.dateRange.end);
        }
        if (filters.period) {
          params.append('period', filters.period);
        }
      }

      const response: AxiosResponse<ChartData> = await axios.get(
        `${this.baseURL}/v1/dashboard/charts/${chartType}?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar dados do gráfico',
      );
    }
  }

  /**
   * Obtém dados de série temporal
   */
  async getTimeSeriesData(
    metric: string,
    period: string = '24h',
  ): Promise<TimeSeriesData[]> {
    try {
      const response: AxiosResponse<TimeSeriesData[]> = await axios.get(
        `${this.baseURL}/v1/dashboard/timeseries/${metric}?period=${period}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de série temporal',
      );
    }
  }

  /**
   * Exporta dados do dashboard
   */
  async exportDashboard(
    format: string,
    filters?: DashboardFilters,
  ): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      params.append('format', format);

      if (filters) {
        if (filters.dateRange) {
          params.append('start', filters.dateRange.start);
          params.append('end', filters.dateRange.end);
        }
        if (filters.period) {
          params.append('period', filters.period);
        }
      }

      const response = await axios.get(
        `${this.baseURL}/v1/dashboard/export?${params.toString()}`,
        { responseType: 'blob' },
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao exportar dados do dashboard',
      );
    }
  }

  /**
   * Obtém configurações do dashboard
   */
  async getDashboardConfig(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseURL}/v1/dashboard/config`);

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar configurações do dashboard',
      );
    }
  }

  /**
   * Salva configurações do dashboard
   */
  async saveDashboardConfig(config: any): Promise<void> {
    try {
      await axios.put(`${this.baseURL}/v1/dashboard/config`, config);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao salvar configurações do dashboard',
      );
    }
  }
}

export const dashboardService = new DashboardService();
