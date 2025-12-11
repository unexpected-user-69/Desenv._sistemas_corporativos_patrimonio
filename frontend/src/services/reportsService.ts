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
    const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Mapeia ReportRequestResponseDto do backend para Report do frontend
   */
  private mapBackendToFrontend(backendReport: any): Report {
    // O backend retorna ReportRequestResponseDto que precisa ser mapeado para Report
    return {
      id: backendReport.id,
      config: {
        id: backendReport.id,
        name: `${backendReport.model} - ${backendReport.type.toUpperCase()}`,
        description: `Relatório de ${backendReport.model} em formato ${backendReport.type.toUpperCase()}`,
        type: this.mapModelToReportType(backendReport.model),
        format: this.mapTypeToReportFormat(backendReport.type),
        filters: backendReport.filters || {},
        isScheduled: false,
        createdAt: backendReport.createdAt,
        updatedAt: backendReport.updatedAt,
        createdBy: backendReport.createdById,
      },
      status: this.mapStatusToReportStatus(backendReport.status),
      fileUrl: backendReport.artifact?.storageKey,
      fileName: backendReport.artifact?.storageKey ? `${backendReport.id}.${backendReport.type}` : undefined,
      fileSize: backendReport.artifact?.sizeBytes,
      generatedAt: backendReport.artifact?.createdAt || backendReport.updatedAt,
      expiresAt: backendReport.artifact?.expiresAt,
      error: backendReport.errorMessage,
      metadata: {
        totalRows: undefined,
        processingTime: undefined,
        filters: backendReport.filters,
        generatedBy: backendReport.createdById,
      },
    };
  }

  private mapModelToReportType(model: string): ReportType {
    const modelMap: Record<string, ReportType> = {
      'patrimonio': ReportType.PATRIMONIOS,
      'usuario': ReportType.USERS,
      'users': ReportType.USERS,
      'patrimonios': ReportType.PATRIMONIOS,
      'audit': ReportType.AUDIT,
      'system': ReportType.SYSTEM,
      'cache': ReportType.CACHE,
      'activity': ReportType.ACTIVITY,
    };
    return modelMap[model.toLowerCase()] || ReportType.CUSTOM;
  }

  private mapTypeToReportFormat(type: string): ReportFormat {
    const typeMap: Record<string, ReportFormat> = {
      'csv': ReportFormat.CSV,
      'pdf': ReportFormat.PDF,
      'excel': ReportFormat.EXCEL,
      'json': ReportFormat.JSON,
    };
    return typeMap[type.toLowerCase()] || ReportFormat.PDF;
  }

  private mapStatusToReportStatus(status: string): ReportStatus {
    const statusMap: Record<string, ReportStatus> = {
      'pending': ReportStatus.PENDING,
      'processing': ReportStatus.GENERATING,
      'completed': ReportStatus.COMPLETED,
      'failed': ReportStatus.FAILED,
      'expired': ReportStatus.EXPIRED,
    };
    return statusMap[status.toLowerCase()] || ReportStatus.PENDING;
  }

  /**
   * Lista todos os relatórios
   */
  async getReports(
    searchOptions?: ReportSearchOptions,
  ): Promise<ReportSearchResult> {
    try {
      const params = new URLSearchParams();
      
      // Mapear filtros do frontend para o formato do backend
      if (searchOptions?.type) {
        // Mapear ReportType para ReportModel do backend
        const modelMap: Record<string, string> = {
          'patrimonios': 'patrimonio',
          'users': 'usuario',
          'activity': 'activity',
          'system': 'system',
          'cache': 'cache',
          'audit': 'audit',
        };
        const model = modelMap[searchOptions.type] || searchOptions.type;
        params.append('model', model);
      }

      if (searchOptions?.status) {
        // Mapear ReportStatus para ReportRequestStatus do backend
        const statusMap: Record<string, string> = {
          'pending': 'pending',
          'generating': 'processing',
          'completed': 'completed',
          'failed': 'failed',
          'expired': 'expired',
        };
        const backendStatus = statusMap[searchOptions.status] || searchOptions.status;
        params.append('status', backendStatus);
      }

      if (searchOptions?.format) {
        params.append('type', searchOptions.format);
      }

      if (searchOptions?.dateRange) {
        if (searchOptions.dateRange.start) {
          params.append('fromDate', searchOptions.dateRange.start);
        }
        if (searchOptions.dateRange.end) {
          params.append('toDate', searchOptions.dateRange.end);
        }
      }

      if (searchOptions?.page) {
        // O backend não tem paginação padrão, mas vamos adicionar para consistência
        // Por enquanto, vamos buscar todos e paginar no frontend se necessário
      }

      const response: AxiosResponse<any[]> = await axios.get(
        `${this.baseURL}/v1/reports/requests?${params.toString()}`,
        { headers: this.getAuthHeaders() },
      );

      // Mapear resposta do backend para o formato do frontend
      const backendReports = Array.isArray(response.data) ? response.data : [];
      const mappedReports = backendReports.map((report) => this.mapBackendToFrontend(report));

      // Se houver paginação no backend, usar; caso contrário, paginar no frontend
      const page = searchOptions?.page || 1;
      const limit = searchOptions?.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedReports = mappedReports.slice(startIndex, endIndex);

      return {
        reports: paginatedReports,
        total: mappedReports.length,
        page,
        limit,
        totalPages: Math.ceil(mappedReports.length / limit),
        hasNext: endIndex < mappedReports.length,
        hasPrev: page > 1,
      };
    } catch (error: any) {
      // Se o endpoint não existir (404), retornar lista vazia
      if (error.response?.status === 404) {
        return {
          reports: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        };
      }

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
      const response: AxiosResponse<any> = await axios.get(
        `${this.baseURL}/v1/reports/requests/${id}`,
        { headers: this.getAuthHeaders() },
      );

      return this.mapBackendToFrontend(response.data);
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
      // Mapear ReportConfig do frontend para CreateReportRequestDto do backend
      const modelMap: Record<string, string> = {
        'patrimonios': 'patrimonio',
        'users': 'usuario',
        'activity': 'activity',
        'system': 'system',
        'cache': 'cache',
        'audit': 'audit',
      };

      const typeMap: Record<string, string> = {
        'pdf': 'pdf',
        'excel': 'csv', // O backend usa csv para Excel
        'csv': 'csv',
        'json': 'csv', // O backend não tem JSON, usar CSV
      };

      const backendRequest = {
        type: typeMap[config.format] || 'csv',
        model: modelMap[config.type] || config.type.toLowerCase(),
        filters: config.filters || {},
        catalogKey: config.template,
      };

      const response: AxiosResponse<any> = await axios.post(
        `${this.baseURL}/v1/reports/export`,
        backendRequest,
        { headers: this.getAuthHeaders() },
      );

      return this.mapBackendToFrontend(response.data);
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
    _id: string,
    _config: Partial<ReportConfig>,
  ): Promise<Report> {
    try {
      // O backend não tem endpoint de atualização de relatórios
      // Por enquanto, retornar erro informativo
      throw new Error('Atualização de relatórios não está disponível. Crie um novo relatório.');
    } catch (error: any) {
      throw new Error(
        error.message || 'Erro ao atualizar relatório',
      );
    }
  }

  /**
   * Deleta relatório
   */
  async deleteReport(_id: string): Promise<void> {
    try {
      // O backend não tem endpoint de exclusão de relatórios
      // Por enquanto, retornar erro informativo
      throw new Error('Exclusão de relatórios não está disponível no momento.');
    } catch (error: any) {
      throw new Error(
        error.message || 'Erro ao deletar relatório',
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
    _options?: ReportExportOptions,
  ): Promise<ReportExportResult> {
    try {
      // O backend usa GET /v1/reports/:id/download para baixar relatórios
      const typeMap: Record<string, string> = {
        'pdf': 'pdf',
        'excel': 'csv',
        'csv': 'csv',
        'json': 'csv',
      };

      const backendType = typeMap[format] || 'csv';
      
      // Baixar o arquivo diretamente
      const response = await axios.get(
        `${this.baseURL}/v1/reports/${id}/download`,
        {
          headers: this.getAuthHeaders(),
          responseType: 'blob',
        },
      );

      // Criar URL do blob e fazer download
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `relatorio-${id}.${backendType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return {
        downloadUrl,
        fileName: `relatorio-${id}.${backendType}`,
        fileSize: blob.size,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        reportId: id,
      };
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
