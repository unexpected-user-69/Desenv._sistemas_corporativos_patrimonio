// Store Zustand para gerenciamento de notificações

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { notificationsService } from '../services/notificationsService';
import {
  Notification,
  NotificationTemplate,
  NotificationPreferences,
  NotificationStats,
  NotificationMetrics,
  NotificationWebSocketMessage,
  NotificationSearchOptions,
  NotificationBulkAction,
  NotificationAlert,
  NotificationIntegration,
  NotificationFilter,
  NotificationStatus,
  NotificationType,
  NotificationCategory,
  NotificationPriority,
} from '../types/notifications';

interface NotificationsState {
  // Notificações
  notifications: Notification[];
  selectedNotification: Notification | null;
  unreadCount: number;

  // Templates
  templates: NotificationTemplate[];
  selectedTemplate: NotificationTemplate | null;

  // Preferências
  preferences: NotificationPreferences | null;

  // Alertas
  alerts: NotificationAlert[];
  selectedAlert: NotificationAlert | null;

  // Integrações
  integrations: NotificationIntegration[];
  selectedIntegration: NotificationIntegration | null;

  // Estatísticas e métricas
  stats: NotificationStats | null;
  metrics: NotificationMetrics | null;

  // Estado da aplicação
  isLoading: boolean;
  error: string | null;

  // Filtros e paginação
  filters: NotificationFilter;
  searchOptions: NotificationSearchOptions;

  // WebSocket
  isWebSocketConnected: boolean;
  lastWebSocketMessage: NotificationWebSocketMessage | null;
}

interface NotificationsActions {
  // Notificações CRUD
  fetchNotifications: (
    searchOptions?: NotificationSearchOptions,
  ) => Promise<void>;
  fetchNotificationById: (id: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAsUnread: (id: string) => Promise<void>;
  archiveNotification: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  bulkAction: (action: NotificationBulkAction) => Promise<void>;

  // Templates CRUD
  fetchTemplates: () => Promise<void>;
  fetchTemplateById: (id: string) => Promise<void>;
  createTemplate: (
    template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<NotificationTemplate | undefined>;
  updateTemplate: (
    id: string,
    template: Partial<NotificationTemplate>,
  ) => Promise<NotificationTemplate | undefined>;
  deleteTemplate: (id: string) => Promise<void>;

  // Preferências
  fetchPreferences: () => Promise<void>;
  updatePreferences: (
    preferences: Partial<NotificationPreferences>,
  ) => Promise<NotificationPreferences | undefined>;

  // Alertas CRUD
  fetchAlerts: () => Promise<void>;
  fetchAlertById: (id: string) => Promise<void>;
  createAlert: (
    alert: Omit<NotificationAlert, 'id' | 'createdAt' | 'updatedAt'>,
  ) => Promise<NotificationAlert | undefined>;
  updateAlert: (
    id: string,
    alert: Partial<NotificationAlert>,
  ) => Promise<NotificationAlert | undefined>;
  deleteAlert: (id: string) => Promise<void>;

  // Integrações CRUD
  fetchIntegrations: () => Promise<void>;
  fetchIntegrationById: (id: string) => Promise<void>;
  createIntegration: (
    integration: Omit<
      NotificationIntegration,
      'id' | 'createdAt' | 'updatedAt'
    >,
  ) => Promise<NotificationIntegration | undefined>;
  updateIntegration: (
    id: string,
    integration: Partial<NotificationIntegration>,
  ) => Promise<NotificationIntegration | undefined>;
  deleteIntegration: (id: string) => Promise<void>;
  testIntegration: (
    id: string,
  ) => Promise<{ success: boolean; message: string } | undefined>;

  // Estatísticas e métricas
  fetchStats: () => Promise<void>;
  fetchMetrics: () => Promise<void>;

  // WebSocket
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
  handleWebSocketMessage: (message: NotificationWebSocketMessage) => void;

  // Filtros e busca
  setFilters: (filters: NotificationFilter) => void;
  setSearchOptions: (options: NotificationSearchOptions) => void;
  clearFilters: () => void;

  // Seleção
  setSelectedNotification: (notification: Notification | null) => void;
  setSelectedTemplate: (template: NotificationTemplate | null) => void;
  setSelectedAlert: (alert: NotificationAlert | null) => void;
  setSelectedIntegration: (integration: NotificationIntegration | null) => void;

  // Estado
  clearError: () => void;
  reset: () => void;
}

const initialState: NotificationsState = {
  notifications: [],
  selectedNotification: null,
  unreadCount: 0,
  templates: [],
  selectedTemplate: null,
  preferences: null,
  alerts: [],
  selectedAlert: null,
  integrations: [],
  selectedIntegration: null,
  stats: null,
  metrics: null,
  isLoading: false,
  error: null,
  filters: {},
  searchOptions: {
    limit: 20,
    offset: 0,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  isWebSocketConnected: false,
  lastWebSocketMessage: null,
};

export const useNotificationsStore = create<
  NotificationsState & NotificationsActions
>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Notificações CRUD
      fetchNotifications: async (searchOptions = get().searchOptions) => {
        set({ isLoading: true, error: null });
        try {
          const result =
            await notificationsService.getNotifications(searchOptions);
          set({
            notifications: result.notifications,
            unreadCount: result.stats.unread,
            stats: {
              total: result.stats?.unread || 0,
              unread: result.stats?.unread || 0,
              read: 0,
              archived: 0,
              byType:
                result.stats?.byType ||
                ({} as Record<NotificationType, number>),
              byCategory:
                result.stats?.byCategory ||
                ({} as Record<NotificationCategory, number>),
              byPriority: {} as Record<NotificationPriority, number>,
              byStatus: {} as Record<NotificationStatus, number>,
              recentActivity: {
                last24h: 0,
                last7d: 0,
                last30d: 0,
                today: 0,
                thisWeek: 0,
                thisMonth: 0,
              },
            },
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao buscar notificações',
            isLoading: false,
          });
        }
      },

      fetchNotificationById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const notification =
            await notificationsService.getNotificationById(id);
          set({
            selectedNotification: notification,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || `Erro ao buscar notificação ${id}`,
            isLoading: false,
          });
        }
      },

      markAsRead: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const updatedNotification = await notificationsService.markAsRead(id);
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? updatedNotification : n,
            ),
            unreadCount: Math.max(0, state.unreadCount - 1),
            selectedNotification:
              state.selectedNotification?.id === id
                ? updatedNotification
                : state.selectedNotification,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error:
              error.message || `Erro ao marcar notificação ${id} como lida`,
            isLoading: false,
          });
        }
      },

      markAsUnread: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const updatedNotification =
            await notificationsService.markAsUnread(id);
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? updatedNotification : n,
            ),
            unreadCount: state.unreadCount + 1,
            selectedNotification:
              state.selectedNotification?.id === id
                ? updatedNotification
                : state.selectedNotification,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error:
              error.message || `Erro ao marcar notificação ${id} como não lida`,
            isLoading: false,
          });
        }
      },

      archiveNotification: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const updatedNotification =
            await notificationsService.archiveNotification(id);
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === id ? updatedNotification : n,
            ),
            selectedNotification:
              state.selectedNotification?.id === id
                ? updatedNotification
                : state.selectedNotification,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || `Erro ao arquivar notificação ${id}`,
            isLoading: false,
          });
        }
      },

      deleteNotification: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await notificationsService.deleteNotification(id);
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
            selectedNotification:
              state.selectedNotification?.id === id
                ? null
                : state.selectedNotification,
            unreadCount:
              state.notifications.find((n) => n.id === id)?.status ===
              NotificationStatus.UNREAD
                ? Math.max(0, state.unreadCount - 1)
                : state.unreadCount,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || `Erro ao excluir notificação ${id}`,
            isLoading: false,
          });
        }
      },

      markAllAsRead: async () => {
        set({ isLoading: true, error: null });
        try {
          await notificationsService.markAllAsRead();
          set((state) => ({
            notifications: state.notifications.map((n) => ({
              ...n,
              status: NotificationStatus.READ,
              readAt: new Date().toISOString(),
            })),
            unreadCount: 0,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error:
              error.message ||
              'Erro ao marcar todas as notificações como lidas',
            isLoading: false,
          });
        }
      },

      bulkAction: async (action: NotificationBulkAction) => {
        set({ isLoading: true, error: null });
        try {
          await notificationsService.bulkAction(action);
          // Recarregar notificações após ação em lote
          await get().fetchNotifications();
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao executar ação em lote',
            isLoading: false,
          });
        }
      },

      // Templates CRUD
      fetchTemplates: async () => {
        set({ isLoading: true, error: null });
        try {
          const templates = await notificationsService.getTemplates();
          set({ templates, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao buscar templates de notificações',
            isLoading: false,
          });
        }
      },

      fetchTemplateById: (id: string) => {
        set({ isLoading: true, error: null });
        try {
          // Implementar busca por ID no serviço se necessário
          const template = get().templates.find((t) => t.id === id);
          set({
            selectedTemplate: template || null,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || `Erro ao buscar template ${id}`,
            isLoading: false,
          });
        }
      },

      createTemplate: async (template) => {
        set({ isLoading: true, error: null });
        try {
          const newTemplate =
            await notificationsService.createTemplate(template);
          set((state) => ({
            templates: [newTemplate, ...state.templates],
            isLoading: false,
          }));
          return newTemplate;
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao criar template de notificação',
            isLoading: false,
          });
        }
      },

      updateTemplate: async (id: string, template) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTemplate = await notificationsService.updateTemplate(
            id,
            template,
          );
          set((state) => ({
            templates: state.templates.map((t) =>
              t.id === id ? updatedTemplate : t,
            ),
            selectedTemplate:
              state.selectedTemplate?.id === id
                ? updatedTemplate
                : state.selectedTemplate,
            isLoading: false,
          }));
          return updatedTemplate;
        } catch (error: any) {
          set({
            error: error.message || `Erro ao atualizar template ${id}`,
            isLoading: false,
          });
        }
      },

      deleteTemplate: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await notificationsService.deleteTemplate(id);
          set((state) => ({
            templates: state.templates.filter((t) => t.id !== id),
            selectedTemplate:
              state.selectedTemplate?.id === id ? null : state.selectedTemplate,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || `Erro ao excluir template ${id}`,
            isLoading: false,
          });
        }
      },

      // Preferências
      fetchPreferences: async () => {
        set({ isLoading: true, error: null });
        try {
          const preferences = await notificationsService.getPreferences();
          set({ preferences, isLoading: false });
        } catch (error: any) {
          set({
            error:
              error.message || 'Erro ao buscar preferências de notificação',
            isLoading: false,
          });
        }
      },

      updatePreferences: async (preferences) => {
        set({ isLoading: true, error: null });
        try {
          const updatedPreferences =
            await notificationsService.updatePreferences(preferences);
          set({ preferences: updatedPreferences, isLoading: false });
          return updatedPreferences;
        } catch (error: any) {
          set({
            error:
              error.message || 'Erro ao atualizar preferências de notificação',
            isLoading: false,
          });
        }
      },

      // Alertas CRUD
      fetchAlerts: async () => {
        set({ isLoading: true, error: null });
        try {
          const alerts = await notificationsService.getAlerts();
          set({ alerts, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao buscar alertas de notificação',
            isLoading: false,
          });
        }
      },

      fetchAlertById: (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const alert = get().alerts.find((a) => a.id === id);
          set({
            selectedAlert: alert || null,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || `Erro ao buscar alerta ${id}`,
            isLoading: false,
          });
        }
      },

      createAlert: async (alert) => {
        set({ isLoading: true, error: null });
        try {
          const newAlert = await notificationsService.createAlert(alert);
          set((state) => ({
            alerts: [newAlert, ...state.alerts],
            isLoading: false,
          }));
          return newAlert;
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao criar alerta de notificação',
            isLoading: false,
          });
        }
      },

      updateAlert: async (id: string, alert) => {
        set({ isLoading: true, error: null });
        try {
          const updatedAlert = await notificationsService.updateAlert(
            id,
            alert,
          );
          set((state) => ({
            alerts: state.alerts.map((a) => (a.id === id ? updatedAlert : a)),
            selectedAlert:
              state.selectedAlert?.id === id
                ? updatedAlert
                : state.selectedAlert,
            isLoading: false,
          }));
          return updatedAlert;
        } catch (error: any) {
          set({
            error: error.message || `Erro ao atualizar alerta ${id}`,
            isLoading: false,
          });
        }
      },

      deleteAlert: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await notificationsService.deleteAlert(id);
          set((state) => ({
            alerts: state.alerts.filter((a) => a.id !== id),
            selectedAlert:
              state.selectedAlert?.id === id ? null : state.selectedAlert,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || `Erro ao excluir alerta ${id}`,
            isLoading: false,
          });
        }
      },

      // Integrações CRUD
      fetchIntegrations: async () => {
        set({ isLoading: true, error: null });
        try {
          const integrations = await notificationsService.getIntegrations();
          set({ integrations, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao buscar integrações de notificação',
            isLoading: false,
          });
        }
      },

      fetchIntegrationById: (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const integration = get().integrations.find((i) => i.id === id);
          set({
            selectedIntegration: integration || null,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || `Erro ao buscar integração ${id}`,
            isLoading: false,
          });
        }
      },

      createIntegration: async (integration) => {
        set({ isLoading: true, error: null });
        try {
          const newIntegration =
            await notificationsService.createIntegration(integration);
          set((state) => ({
            integrations: [newIntegration, ...state.integrations],
            isLoading: false,
          }));
          return newIntegration;
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao criar integração de notificação',
            isLoading: false,
          });
        }
      },

      updateIntegration: async (id: string, integration) => {
        set({ isLoading: true, error: null });
        try {
          const updatedIntegration =
            await notificationsService.updateIntegration(id, integration);
          set((state) => ({
            integrations: state.integrations.map((i) =>
              i.id === id ? updatedIntegration : i,
            ),
            selectedIntegration:
              state.selectedIntegration?.id === id
                ? updatedIntegration
                : state.selectedIntegration,
            isLoading: false,
          }));
          return updatedIntegration;
        } catch (error: any) {
          set({
            error: error.message || `Erro ao atualizar integração ${id}`,
            isLoading: false,
          });
        }
      },

      deleteIntegration: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await notificationsService.deleteIntegration(id);
          set((state) => ({
            integrations: state.integrations.filter((i) => i.id !== id),
            selectedIntegration:
              state.selectedIntegration?.id === id
                ? null
                : state.selectedIntegration,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.message || `Erro ao excluir integração ${id}`,
            isLoading: false,
          });
        }
      },

      testIntegration: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const result = await notificationsService.testIntegration(id);
          set({ isLoading: false });
          return result;
        } catch (error: any) {
          set({
            error: error.message || `Erro ao testar integração ${id}`,
            isLoading: false,
          });
        }
      },

      // Estatísticas e métricas
      fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
          const stats = await notificationsService.getNotificationStats();
          set({ stats, unreadCount: stats.unread, isLoading: false });
        } catch (error: any) {
          set({
            error:
              error.message || 'Erro ao buscar estatísticas de notificações',
            isLoading: false,
          });
        }
      },

      fetchMetrics: async () => {
        set({ isLoading: true, error: null });
        try {
          const metrics = await notificationsService.getMetrics();
          set({ metrics, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message || 'Erro ao buscar métricas de notificações',
            isLoading: false,
          });
        }
      },

      // WebSocket
      connectWebSocket: () => {
        notificationsService.connectWebSocket();
        set({ isWebSocketConnected: true });
      },

      disconnectWebSocket: () => {
        notificationsService.disconnectWebSocket();
        set({ isWebSocketConnected: false });
      },

      handleWebSocketMessage: (message: NotificationWebSocketMessage) => {
        set({ lastWebSocketMessage: message });

        if (message.type === 'notification') {
          // Adicionar nova notificação à lista
          set((state) => ({
            notifications: [message.data, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          }));
        } else if (message.type === 'status_update') {
          // Atualizar status de notificação existente
          set((state) => ({
            notifications: state.notifications.map((n) =>
              n.id === message.data.id ? { ...n, ...message.data } : n,
            ),
          }));
        }
      },

      // Filtros e busca
      setFilters: (filters: NotificationFilter) => {
        set((state) => ({ filters: { ...state.filters, ...filters } }));
      },

      setSearchOptions: (options: NotificationSearchOptions) => {
        set((state) => ({
          searchOptions: { ...state.searchOptions, ...options },
        }));
      },

      clearFilters: () => {
        set({ filters: {} });
      },

      // Seleção
      setSelectedNotification: (notification: Notification | null) => {
        set({ selectedNotification: notification });
      },

      setSelectedTemplate: (template: NotificationTemplate | null) => {
        set({ selectedTemplate: template });
      },

      setSelectedAlert: (alert: NotificationAlert | null) => {
        set({ selectedAlert: alert });
      },

      setSelectedIntegration: (integration: NotificationIntegration | null) => {
        set({ selectedIntegration: integration });
      },

      // Estado
      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    { name: 'notifications-store' },
  ),
);
