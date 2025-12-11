// Serviço para sistema de notificações e alertas

import axios, { AxiosResponse } from 'axios';
import { config } from '../config/environment';
import {
  Notification,
  NotificationTemplate,
  NotificationPreferences,
  NotificationStats,
  NotificationSearchResult,
  NotificationHistory,
  NotificationSystemConfig,
  NotificationMetrics,
  NotificationWebSocketMessage,
  NotificationSearchOptions,
  NotificationBulkAction,
  NotificationAlert,
  NotificationIntegration,
} from '../types/notifications';

class NotificationsService {
  private baseURL = `${config.api.baseUrl}/v1/notifications`;
  private wsConnection: WebSocket | null = null;
  private wsReconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private wsListeners: ((message: NotificationWebSocketMessage) => void)[] = [];

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Conectar ao WebSocket para notificações em tempo real
   */
  connectWebSocket(): void {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      return;
    }

    const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token');
    if (!token) {
      // Silenciar aviso - token pode não estar disponível ainda ou WebSocket não está implementado
      return;
    }

    const wsUrl = `${config.api.baseUrl.replace('http', 'ws')}/v1/notifications/ws?token=${token}`;

    try {
      this.wsConnection = new WebSocket(wsUrl);

      this.wsConnection.onopen = () => {
        this.wsReconnectAttempts = 0;
        this.sendHeartbeat();
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const message: NotificationWebSocketMessage = JSON.parse(event.data);
          this.wsListeners.forEach((listener) => listener(message));
        } catch (error) {
          // Silenciar erro de parsing - pode ser mensagem inválida
        }
      };

      this.wsConnection.onclose = (event) => {
        // Apenas tentar reconectar se não foi um fechamento intencional (code 1000)
        // e se ainda não excedemos as tentativas
        if (event.code !== 1000 && this.wsReconnectAttempts < this.maxReconnectAttempts) {
          this.attemptReconnect();
        } else {
          // Limpar conexão se exceder tentativas ou fechamento intencional
          this.wsConnection = null;
        }
      };

      this.wsConnection.onerror = () => {
        // Silenciar erro - endpoint pode não estar implementado no backend
        // O erro será tratado no onclose
      };
    } catch (error) {
      // Silenciar erro ao criar WebSocket - pode não estar disponível
      this.wsConnection = null;
    }
  }

  /**
   * Desconectar do WebSocket
   */
  disconnectWebSocket(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
  }

  /**
   * Adicionar listener para mensagens WebSocket
   */
  addWebSocketListener(
    listener: (message: NotificationWebSocketMessage) => void,
  ): void {
    this.wsListeners.push(listener);
  }

  /**
   * Remover listener WebSocket
   */
  removeWebSocketListener(
    listener: (message: NotificationWebSocketMessage) => void,
  ): void {
    this.wsListeners = this.wsListeners.filter((l) => l !== listener);
  }

  /**
   * Tentar reconectar WebSocket
   */
  private attemptReconnect(): void {
    if (this.wsReconnectAttempts >= this.maxReconnectAttempts) {
      // Silenciar - endpoint pode não estar implementado
      this.wsConnection = null;
      return;
    }

    const token = localStorage.getItem('auth_token') || localStorage.getItem('access_token');
    if (!token) {
      // Não tentar reconectar se não houver token
      this.wsConnection = null;
      return;
    }

    this.wsReconnectAttempts++;
    const delay =
      this.reconnectDelay * Math.pow(2, this.wsReconnectAttempts - 1);

    setTimeout(() => {
      this.connectWebSocket();
    }, delay);
  }

  /**
   * Enviar heartbeat para manter conexão ativa
   */
  private sendHeartbeat(): void {
    if (this.wsConnection?.readyState === WebSocket.OPEN) {
      const heartbeat: NotificationWebSocketMessage = {
        type: 'heartbeat',
        data: { timestamp: new Date().toISOString() },
        timestamp: new Date().toISOString(),
      };
      this.wsConnection.send(JSON.stringify(heartbeat));
    }
  }

  /**
   * Listar notificações com filtros e paginação
   */
  async getNotifications(
    searchOptions?: NotificationSearchOptions,
  ): Promise<NotificationSearchResult> {
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

      const response: AxiosResponse<NotificationSearchResult> = await axios.get(
        `${this.baseURL}`,
        { params, headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      // Se o endpoint não existir (404), retornar lista vazia
      if (error.response?.status === 404) {
        return {
          notifications: [],
          total: 0,
          page: 1,
          limit: searchOptions?.limit || 10,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        };
      }

      throw new Error(
        error.response?.data?.message || 'Erro ao buscar notificações',
      );
    }
  }

  /**
   * Buscar notificação por ID
   */
  async getNotificationById(id: string): Promise<Notification> {
    try {
      const response: AxiosResponse<Notification> = await axios.get(
        `${this.baseURL}/${id}`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao buscar notificação ${id}`,
      );
    }
  }

  /**
   * Marcar notificação como lida
   */
  async markAsRead(id: string): Promise<Notification> {
    try {
      const response: AxiosResponse<Notification> = await axios.patch(
        `${this.baseURL}/${id}/read`,
        {},
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          `Erro ao marcar notificação ${id} como lida`,
      );
    }
  }

  /**
   * Marcar notificação como não lida
   */
  async markAsUnread(id: string): Promise<Notification> {
    try {
      const response: AxiosResponse<Notification> = await axios.patch(
        `${this.baseURL}/${id}/unread`,
        {},
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          `Erro ao marcar notificação ${id} como não lida`,
      );
    }
  }

  /**
   * Arquivar notificação
   */
  async archiveNotification(id: string): Promise<Notification> {
    try {
      const response: AxiosResponse<Notification> = await axios.patch(
        `${this.baseURL}/${id}/archive`,
        {},
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao arquivar notificação ${id}`,
      );
    }
  }

  /**
   * Excluir notificação
   */
  async deleteNotification(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${id}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao excluir notificação ${id}`,
      );
    }
  }

  /**
   * Ações em lote para notificações
   */
  async bulkAction(action: NotificationBulkAction): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/bulk`, action, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao executar ação em lote',
      );
    }
  }

  /**
   * Marcar todas as notificações como lidas
   */
  async markAllAsRead(): Promise<void> {
    try {
      await axios.patch(
        `${this.baseURL}/mark-all-read`,
        {},
        { headers: this.getAuthHeaders() },
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao marcar todas as notificações como lidas',
      );
    }
  }

  /**
   * Obter estatísticas de notificações
   */
  async getNotificationStats(): Promise<NotificationStats> {
    try {
      const response: AxiosResponse<NotificationStats> = await axios.get(
        `${this.baseURL}/stats`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      // Se o endpoint não existir (404), retornar estatísticas vazias
      if (error.response?.status === 404) {
        return {
          total: 0,
          unread: 0,
          read: 0,
          archived: 0,
          byType: {},
          byStatus: {},
          recentActivity: [],
        };
      }

      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar estatísticas de notificações',
      );
    }
  }

  /**
   * Listar templates de notificações
   */
  async getTemplates(): Promise<NotificationTemplate[]> {
    try {
      const response: AxiosResponse<NotificationTemplate[]> = await axios.get(
        `${this.baseURL}/templates`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar templates de notificações',
      );
    }
  }

  /**
   * Criar template de notificação
   */
  async createTemplate(
    template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<NotificationTemplate> {
    try {
      const response: AxiosResponse<NotificationTemplate> = await axios.post(
        `${this.baseURL}/templates`,
        template,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao criar template de notificação',
      );
    }
  }

  /**
   * Atualizar template de notificação
   */
  async updateTemplate(
    id: string,
    template: Partial<NotificationTemplate>,
  ): Promise<NotificationTemplate> {
    try {
      const response: AxiosResponse<NotificationTemplate> = await axios.put(
        `${this.baseURL}/templates/${id}`,
        template,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao atualizar template ${id}`,
      );
    }
  }

  /**
   * Excluir template de notificação
   */
  async deleteTemplate(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/templates/${id}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao excluir template ${id}`,
      );
    }
  }

  /**
   * Obter preferências de notificação do usuário
   */
  async getPreferences(): Promise<NotificationPreferences> {
    try {
      const response: AxiosResponse<NotificationPreferences> = await axios.get(
        `${this.baseURL}/preferences`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      // Se o endpoint não existir (404), retornar preferências padrão
      if (error.response?.status === 404) {
        return {
          email: true,
          sms: false,
          push: true,
          channels: {
            email: true,
            sms: false,
            push: true,
          },
          frequency: 'realtime',
          quietHours: {
            enabled: false,
            start: '22:00',
            end: '08:00',
          },
        };
      }

      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar preferências de notificação',
      );
    }
  }

  /**
   * Atualizar preferências de notificação
   */
  async updatePreferences(
    preferences: Partial<NotificationPreferences>,
  ): Promise<NotificationPreferences> {
    try {
      const response: AxiosResponse<NotificationPreferences> = await axios.put(
        `${this.baseURL}/preferences`,
        preferences,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao atualizar preferências de notificação',
      );
    }
  }

  /**
   * Listar alertas de notificação
   */
  async getAlerts(): Promise<NotificationAlert[]> {
    try {
      const response: AxiosResponse<NotificationAlert[]> = await axios.get(
        `${this.baseURL}/alerts`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar alertas de notificação',
      );
    }
  }

  /**
   * Criar alerta de notificação
   */
  async createAlert(
    alert: Omit<NotificationAlert, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<NotificationAlert> {
    try {
      const response: AxiosResponse<NotificationAlert> = await axios.post(
        `${this.baseURL}/alerts`,
        alert,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao criar alerta de notificação',
      );
    }
  }

  /**
   * Atualizar alerta de notificação
   */
  async updateAlert(
    id: string,
    alert: Partial<NotificationAlert>,
  ): Promise<NotificationAlert> {
    try {
      const response: AxiosResponse<NotificationAlert> = await axios.put(
        `${this.baseURL}/alerts/${id}`,
        alert,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao atualizar alerta ${id}`,
      );
    }
  }

  /**
   * Excluir alerta de notificação
   */
  async deleteAlert(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/alerts/${id}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao excluir alerta ${id}`,
      );
    }
  }

  /**
   * Obter histórico de notificações
   */
  async getNotificationHistory(
    notificationId: string,
  ): Promise<NotificationHistory[]> {
    try {
      const response: AxiosResponse<NotificationHistory[]> = await axios.get(
        `${this.baseURL}/${notificationId}/history`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          `Erro ao buscar histórico da notificação ${notificationId}`,
      );
    }
  }

  /**
   * Obter métricas de notificações
   */
  async getMetrics(): Promise<NotificationMetrics> {
    try {
      const response: AxiosResponse<NotificationMetrics> = await axios.get(
        `${this.baseURL}/metrics`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar métricas de notificações',
      );
    }
  }

  /**
   * Obter configurações do sistema de notificações
   */
  async getSystemConfig(): Promise<NotificationSystemConfig> {
    try {
      const response: AxiosResponse<NotificationSystemConfig> = await axios.get(
        `${this.baseURL}/config`,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar configurações do sistema',
      );
    }
  }

  /**
   * Listar integrações de notificação
   */
  async getIntegrations(): Promise<NotificationIntegration[]> {
    try {
      const response: AxiosResponse<NotificationIntegration[]> =
        await axios.get(`${this.baseURL}/integrations`, {
          headers: this.getAuthHeaders(),
        });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar integrações de notificação',
      );
    }
  }

  /**
   * Criar integração de notificação
   */
  async createIntegration(
    integration: Omit<
      NotificationIntegration,
      'id' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<NotificationIntegration> {
    try {
      const response: AxiosResponse<NotificationIntegration> = await axios.post(
        `${this.baseURL}/integrations`,
        integration,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao criar integração de notificação',
      );
    }
  }

  /**
   * Atualizar integração de notificação
   */
  async updateIntegration(
    id: string,
    integration: Partial<NotificationIntegration>,
  ): Promise<NotificationIntegration> {
    try {
      const response: AxiosResponse<NotificationIntegration> = await axios.put(
        `${this.baseURL}/integrations/${id}`,
        integration,
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao atualizar integração de notificação',
      );
    }
  }

  /**
   * Excluir integração de notificação
   */
  async deleteIntegration(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/integrations/${id}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao excluir integração de notificação',
      );
    }
  }

  /**
   * Testar integração de notificação
   */
  async testIntegration(
    id: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response: AxiosResponse<{ success: boolean; message: string }> =
        await axios.post(
          `${this.baseURL}/integrations/${id}/test`,
          {},
          { headers: this.getAuthHeaders() },
        );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao testar integração ${id}`,
      );
    }
  }

  /**
   * Enviar notificação de teste
   */
  async sendTestNotification(
    templateId: string,
    userId?: string,
  ): Promise<Notification> {
    try {
      const response: AxiosResponse<Notification> = await axios.post(
        `${this.baseURL}/test`,
        { templateId, userId },
        { headers: this.getAuthHeaders() },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao enviar notificação de teste',
      );
    }
  }

  /**
   * Dispensar notificação
   */
  async dismissNotification(id: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseURL}/${id}/dismiss`,
        {},
        { headers: this.getAuthHeaders() },
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || `Erro ao dispensar notificação ${id}`,
      );
    }
  }

  /**
   * Executar ação de notificação
   */
  async executeAction(notificationId: string, actionId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseURL}/${notificationId}/actions/${actionId}`,
        {},
        { headers: this.getAuthHeaders() },
      );
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao executar ação da notificação',
      );
    }
  }
}

export const notificationsService = new NotificationsService();
