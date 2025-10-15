// Serviço para sistema de relatórios avançados

import axios, { AxiosResponse } from 'axios';
import { config } from '../config/environment';
import {
  Report,
  ReportConfig,
  ReportTemplate,
  ReportSchedule,
  ReportHistory,
  ReportStats,
  ReportData,
  ReportPreview,
  ReportExportOptions,
  ReportExportResult,
  ReportValidation,
  ReportSearchOptions,
  ReportSearchResult,
  ReportAnalytics,
  ReportSharing,
  ReportNotification,
  ReportType,
  ReportFormat,
  ReportStatus,
  UserReportData,
  PatrimonioReportData,
  ActivityReportData,
  SystemReportData,
  CacheReportData,
  AuditReportData,
} from '../types/reports';

class ReportsService {
  private baseURL = config.api.baseUrl;

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Lista todos os relatórios
   */
  async getReports(
    searchOptions?: ReportSearchOptions,
  ): Promise<ReportSearchResult> {
    try {
      const params = new URLSearchParams();
      if (searchOptions) {
        Object.entries(searchOptions).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (typeof value === 'object') {
              params.append(key, JSON.stringify(value));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const response: AxiosResponse<ReportSearchResult> = await axios.get(
        `${this.baseURL}/v1/reports?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar relatórios',
      );
    }
  }

  /**
   * Busca relatório por ID
   */
  async getReportById(id: string): Promise<Report> {
    try {
      const response: AxiosResponse<Report> = await axios.get(
        `${this.baseURL}/v1/reports/${id}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar relatório',
      );
    }
  }

  /**
   * Cria novo relatório
   */
  async createReport(config: ReportConfig): Promise<Report> {
    try {
      const response: AxiosResponse<Report> = await axios.post(
        `${this.baseURL}/v1/reports`,
        config,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao criar relatório',
      );
    }
  }

  /**
   * Atualiza relatório existente
   */
  async updateReport(
    id: string,
    config: Partial<ReportConfig>,
  ): Promise<Report> {
    try {
      const response: AxiosResponse<Report> = await axios.put(
        `${this.baseURL}/v1/reports/${id}`,
        config,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao atualizar relatório',
      );
    }
  }

  /**
   * Deleta relatório
   */
  async deleteReport(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/v1/reports/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao deletar relatório',
      );
    }
  }

  /**
   * Gera relatório
   */
  async generateReport(
    id: string,
    options?: ReportExportOptions,
  ): Promise<Report> {
    try {
      const response: AxiosResponse<Report> = await axios.post(
        `${this.baseURL}/v1/reports/${id}/generate`,
        options,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao gerar relatório',
      );
    }
  }

  /**
   * Gera preview do relatório
   */
  async generatePreview(config: ReportConfig): Promise<ReportPreview> {
    try {
      const response: AxiosResponse<ReportPreview> = await axios.post(
        `${this.baseURL}/v1/reports/preview`,
        config,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao gerar preview do relatório',
      );
    }
  }

  /**
   * Exporta relatório
   */
  async exportReport(
    id: string,
    format: ReportFormat,
    options?: ReportExportOptions,
  ): Promise<ReportExportResult> {
    try {
      const response: AxiosResponse<ReportExportResult> = await axios.post(
        `${this.baseURL}/v1/reports/${id}/export`,
        { format, ...options },
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao exportar relatório',
      );
    }
  }

  /**
   * Valida configuração do relatório
   */
  async validateReportConfig(config: ReportConfig): Promise<ReportValidation> {
    try {
      const response: AxiosResponse<ReportValidation> = await axios.post(
        `${this.baseURL}/v1/reports/validate`,
        config,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao validar configuração do relatório',
      );
    }
  }

  /**
   * Obtém estatísticas dos relatórios
   */
  async getReportStats(): Promise<ReportStats> {
    try {
      const response: AxiosResponse<ReportStats> = await axios.get(
        `${this.baseURL}/v1/reports/stats`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar estatísticas dos relatórios',
      );
    }
  }

  /**
   * Obtém histórico de relatórios
   */
  async getReportHistory(
    reportId?: string,
    limit?: number,
  ): Promise<ReportHistory[]> {
    try {
      const params = new URLSearchParams();
      if (reportId) params.append('reportId', reportId);
      if (limit) params.append('limit', limit.toString());

      const response: AxiosResponse<ReportHistory[]> = await axios.get(
        `${this.baseURL}/v1/reports/history?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar histórico de relatórios',
      );
    }
  }

  /**
   * Obtém templates de relatórios
   */
  async getReportTemplates(type?: ReportType): Promise<ReportTemplate[]> {
    try {
      const params = new URLSearchParams();
      if (type) params.append('type', type);

      const response: AxiosResponse<ReportTemplate[]> = await axios.get(
        `${this.baseURL}/v1/reports/templates?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar templates de relatórios',
      );
    }
  }

  /**
   * Cria template de relatório
   */
  async createReportTemplate(
    template: Omit<ReportTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ReportTemplate> {
    try {
      const response: AxiosResponse<ReportTemplate> = await axios.post(
        `${this.baseURL}/v1/reports/templates`,
        template,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao criar template de relatório',
      );
    }
  }

  /**
   * Obtém agendamentos de relatórios
   */
  async getReportSchedules(): Promise<ReportSchedule[]> {
    try {
      const response: AxiosResponse<ReportSchedule[]> = await axios.get(
        `${this.baseURL}/v1/reports/schedules`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar agendamentos de relatórios',
      );
    }
  }

  /**
   * Cria agendamento de relatório
   */
  async createReportSchedule(
    schedule: Omit<ReportSchedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ReportSchedule> {
    try {
      const response: AxiosResponse<ReportSchedule> = await axios.post(
        `${this.baseURL}/v1/reports/schedules`,
        schedule,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao criar agendamento de relatório',
      );
    }
  }

  /**
   * Atualiza agendamento de relatório
   */
  async updateReportSchedule(
    id: string,
    schedule: Partial<ReportSchedule>,
  ): Promise<ReportSchedule> {
    try {
      const response: AxiosResponse<ReportSchedule> = await axios.put(
        `${this.baseURL}/v1/reports/schedules/${id}`,
        schedule,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao atualizar agendamento de relatório',
      );
    }
  }

  /**
   * Deleta agendamento de relatório
   */
  async deleteReportSchedule(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/v1/reports/schedules/${id}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao deletar agendamento de relatório',
      );
    }
  }

  /**
   * Obtém dados específicos de relatórios
   */
  async getUserReportData(filters?: any): Promise<UserReportData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<UserReportData> = await axios.get(
        `${this.baseURL}/v1/reports/data/users?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de relatório de usuários',
      );
    }
  }

  async getPatrimonioReportData(filters?: any): Promise<PatrimonioReportData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<PatrimonioReportData> = await axios.get(
        `${this.baseURL}/v1/reports/data/patrimonios?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de relatório de patrimônios',
      );
    }
  }

  async getActivityReportData(filters?: any): Promise<ActivityReportData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<ActivityReportData> = await axios.get(
        `${this.baseURL}/v1/reports/data/activity?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de relatório de atividade',
      );
    }
  }

  async getSystemReportData(filters?: any): Promise<SystemReportData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<SystemReportData> = await axios.get(
        `${this.baseURL}/v1/reports/data/system?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de relatório do sistema',
      );
    }
  }

  async getCacheReportData(filters?: any): Promise<CacheReportData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<CacheReportData> = await axios.get(
        `${this.baseURL}/v1/reports/data/cache?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de relatório de cache',
      );
    }
  }

  async getAuditReportData(filters?: any): Promise<AuditReportData> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const response: AxiosResponse<AuditReportData> = await axios.get(
        `${this.baseURL}/v1/reports/data/audit?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar dados de relatório de auditoria',
      );
    }
  }

  /**
   * Obtém analytics de relatório
   */
  async getReportAnalytics(reportId: string): Promise<ReportAnalytics> {
    try {
      const response: AxiosResponse<ReportAnalytics> = await axios.get(
        `${this.baseURL}/v1/reports/${reportId}/analytics`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar analytics do relatório',
      );
    }
  }

  /**
   * Compartilha relatório
   */
  async shareReport(
    reportId: string,
    sharing: Omit<ReportSharing, 'id' | 'reportId' | 'createdAt' | 'createdBy'>,
  ): Promise<ReportSharing> {
    try {
      const response: AxiosResponse<ReportSharing> = await axios.post(
        `${this.baseURL}/v1/reports/${reportId}/share`,
        sharing,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao compartilhar relatório',
      );
    }
  }

  /**
   * Obtém notificações de relatórios
   */
  async getReportNotifications(): Promise<ReportNotification[]> {
    try {
      const response: AxiosResponse<ReportNotification[]> = await axios.get(
        `${this.baseURL}/v1/reports/notifications`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar notificações de relatórios',
      );
    }
  }

  /**
   * Marca notificação como lida
   */
  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await axios.patch(
        `${this.baseURL}/v1/reports/notifications/${notificationId}/read`,
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao marcar notificação como lida',
      );
    }
  }

  /**
   * Download de arquivo de relatório
   */
  async downloadReportFile(url: string, fileName: string): Promise<void> {
    try {
      const response = await axios.get(url, { responseType: 'blob' });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao baixar arquivo do relatório',
      );
    }
  }

  /**
   * Download de relatório por ID e formato
   */
  async downloadReport(id: string, format: ReportFormat): Promise<void> {
    try {
      const response = await axios.get(
        `${this.baseURL}/reports/${id}/download`,
        {
          params: { format },
          responseType: 'blob',
        },
      );

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `relatorio-${id}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao baixar relatório',
      );
    }
  }

  /**
   * Lista agendamentos de relatórios
   */
  async getSchedules(): Promise<ReportSchedule[]> {
    try {
      const response: AxiosResponse<ReportSchedule[]> = await axios.get(
        `${this.baseURL}/reports/schedules`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar agendamentos',
      );
    }
  }

  /**
   * Cria agendamento de relatório
   */
  async createSchedule(
    schedule: Omit<ReportSchedule, 'id'>,
  ): Promise<ReportSchedule> {
    try {
      const response: AxiosResponse<ReportSchedule> = await axios.post(
        `${this.baseURL}/reports/schedules`,
        schedule,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao criar agendamento',
      );
    }
  }

  /**
   * Atualiza agendamento de relatório
   */
  async updateSchedule(
    id: string,
    schedule: Partial<ReportSchedule>,
  ): Promise<ReportSchedule> {
    try {
      const response: AxiosResponse<ReportSchedule> = await axios.put(
        `${this.baseURL}/reports/schedules/${id}`,
        schedule,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao atualizar agendamento',
      );
    }
  }

  /**
   * Exclui agendamento de relatório
   */
  async deleteSchedule(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/reports/schedules/${id}`, {});
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao excluir agendamento',
      );
    }
  }

  /**
   * Lista logs de auditoria
   */
  async getAuditLogs(filters?: any): Promise<any> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (typeof value === 'object') {
              params.append(key, JSON.stringify(value));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }

      const response: AxiosResponse<any> = await axios.get(
        `${this.baseURL}/v1/reports/audit-logs?${params.toString()}`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar logs de auditoria',
      );
    }
  }

  /**
   * Obtém status de geração de relatório
   */
  async getReportGenerationStatus(reportId: string): Promise<Report> {
    try {
      const response: AxiosResponse<Report> = await axios.get(
        `${this.baseURL}/v1/reports/${reportId}/status`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar status de geração do relatório',
      );
    }
  }

  /**
   * Cancela geração de relatório
   */
  async cancelReportGeneration(reportId: string): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/v1/reports/${reportId}/cancel`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao cancelar geração do relatório',
      );
    }
  }
}

export const reportsService = new ReportsService();
