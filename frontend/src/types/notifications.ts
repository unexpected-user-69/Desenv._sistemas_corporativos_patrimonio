// Sistema de Notificações e Alertas - Tipos e Interfaces
// IA_ArquitetoFrontend (IA 2) - FASE 6

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  SYSTEM = 'system',
  USER = 'user',
  USER_ACTION = 'user_action',
  PATRIMONIO = 'patrimonio',
  PATRIMONIO_UPDATE = 'patrimonio_update',
  REPORT = 'report',
  REPORT_READY = 'report_ready',
  SECURITY = 'security',
  SECURITY_ALERT = 'security_alert',
  MAINTENANCE = 'maintenance',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum NotificationStatus {
  UNREAD = 'unread',
  READ = 'read',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export enum NotificationChannel {
  IN_APP = 'in_app',
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WEBHOOK = 'webhook',
}

export enum NotificationCategory {
  SYSTEM_ALERTS = 'system_alerts',
  USER_ACTIVITY = 'user_activity',
  PATRIMONIO_UPDATES = 'patrimonio_updates',
  REPORT_GENERATION = 'report_generation',
  SECURITY_EVENTS = 'security_events',
  MAINTENANCE_NOTICES = 'maintenance_notices',
  CUSTOM = 'custom',
}

// Interface principal de notificação
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  category: NotificationCategory;
  channels: NotificationChannel[];

  // Metadados
  userId?: string;
  userRole?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  readAt?: string;
  expiresAt?: string;

  // Conteúdo adicional
  data?: Record<string, any>;
  actions?: NotificationAction[];
  attachments?: NotificationAttachment[];

  // Configurações
  isPersistent: boolean;
  isDismissible: boolean;
  autoExpire: boolean;
  groupKey?: string;
}

// Ações disponíveis na notificação
export interface NotificationAction {
  id: string;
  label: string;
  type: 'button' | 'link' | 'dismiss';
  action: string;
  style?: 'primary' | 'secondary' | 'danger';
  icon?: string;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: Record<string, any>;
}

// Anexos da notificação
export interface NotificationAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'link';
  url: string;
  size?: number;
  mimeType?: string;
}

// Configurações de notificação do usuário
export interface NotificationPreferences {
  id: string;
  userId: string;

  // Preferências por canal
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };

  // Preferências por categoria
  categories: {
    [key in NotificationCategory]: {
      enabled: boolean;
      channels: NotificationChannel[];
      priority: NotificationPriority;
    };
  };

  // Preferências por tipo
  types: {
    [key in NotificationType]: {
      enabled: boolean;
      channels: NotificationChannel[];
    };
  };

  // Configurações gerais
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string; // HH:MM format
    timezone: string;
  };

  frequency: {
    digest: boolean;
    digestFrequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
    maxPerHour: number;
    maxPerDay: number;
  };

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// Template de notificação
export interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
  category: NotificationCategory;
  type: NotificationType;
  priority: NotificationPriority;

  // Conteúdo do template
  title: string;
  message: string;
  variables: string[]; // Lista de variáveis disponíveis

  // Configurações
  channels: NotificationChannel[];
  isActive: boolean;
  isSystem: boolean;

  // Metadados
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Grupo de notificações
export interface NotificationGroup {
  key: string;
  title: string;
  count: number;
  latestNotification: Notification;
  notifications: Notification[];
  isCollapsed: boolean;
  createdAt: string;
}

// Estatísticas de notificações
export interface NotificationStats {
  total: number;
  unread: number;
  read: number;
  archived: number;

  byType: {
    [key in NotificationType]: number;
  };

  byCategory: {
    [key in NotificationCategory]: number;
  };

  byPriority: {
    [key in NotificationPriority]: number;
  };

  recentActivity: {
    last24h: number;
    last7d: number;
    last30d: number;
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  byStatus: {
    [key in NotificationStatus]: number;
  };
}

// Filtros para busca de notificações
export interface NotificationFilters {
  status?: NotificationStatus[];
  type?: NotificationType[];
  category?: NotificationCategory[];
  priority?: NotificationPriority[];
  channels?: NotificationChannel[];

  // Filtros de data
  dateFrom?: string;
  dateTo?: string;

  // Filtros de texto
  search?: string;

  // Filtros de entidade relacionada
  relatedEntityType?: string;
  relatedEntityId?: string;

  // Paginação
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'type';
  sortOrder?: 'asc' | 'desc';
}

// Resultado da busca de notificações
export interface NotificationSearchResult {
  notifications: Notification[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;

  // Estatísticas do resultado
  stats: {
    unread: number;
    byType: Record<NotificationType, number>;
    byCategory: Record<NotificationCategory, number>;
  };
}

// Configurações do sistema de notificações
export interface NotificationSystemConfig {
  maxNotifications: number;
  maxUnreadNotifications: number;
  autoArchiveDays: number;
  autoDeleteDays: number;

  // Configurações de WebSocket
  websocket: {
    enabled: boolean;
    url: string;
    reconnectInterval: number;
    maxReconnectAttempts: number;
  };

  // Configurações de cache
  cache: {
    enabled: boolean;
    ttl: number; // Time to live in seconds
    maxSize: number;
  };

  // Configurações de performance
  performance: {
    batchSize: number;
    debounceMs: number;
    throttleMs: number;
  };
}

// Eventos de notificação
export interface NotificationEvent {
  type: 'created' | 'updated' | 'deleted' | 'read' | 'archived' | 'dismissed';
  notification: Notification;
  timestamp: string;
  userId?: string;
}

// WebSocket message para notificações
export interface NotificationWebSocketMessage {
  type:
    | 'notification'
    | 'stats'
    | 'preferences'
    | 'error'
    | 'heartbeat'
    | 'status_update';
  data: any;
  timestamp: string;
  userId?: string;
}

// Resposta da API para operações em lote
export interface NotificationBatchResponse {
  success: number;
  failed: number;
  errors: Array<{
    id: string;
    error: string;
  }>;
  results: Array<{
    id: string;
    status: 'success' | 'failed';
    data?: any;
  }>;
}

// Opções de busca para notificações
export interface NotificationSearchOptions {
  query?: string;
  type?: NotificationType;
  category?: NotificationCategory;
  priority?: NotificationPriority;
  status?: NotificationStatus;
  channel?: NotificationChannel;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Ações em lote para notificações
export interface NotificationBulkAction {
  action: 'mark_read' | 'mark_unread' | 'delete' | 'archive' | 'unarchive';
  notificationIds: string[];
}

// Alertas de notificação
export interface NotificationAlert {
  id: string;
  type: 'threshold' | 'pattern' | 'anomaly';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  conditions: {
    field: string;
    operator: 'gt' | 'lt' | 'eq' | 'contains';
    value: any;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Integrações de notificação
export interface NotificationIntegration {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'webhook' | 'slack' | 'teams';
  config: {
    [key: string]: any;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Filtros de notificação
export interface NotificationFilter {
  type?: NotificationType;
  category?: NotificationCategory;
  priority?: NotificationPriority;
  status?: NotificationStatus;
  channel?: NotificationChannel;
  startDate?: string;
  endDate?: string;
  search?: string;
}

// Configurações de digest de notificações
export interface NotificationDigest {
  id: string;
  userId: string;
  frequency: 'hourly' | 'daily' | 'weekly';
  lastSent: string;
  nextSend: string;
  isActive: boolean;

  // Conteúdo do digest
  notifications: Notification[];
  summary: {
    total: number;
    byType: Record<NotificationType, number>;
    byCategory: Record<NotificationCategory, number>;
  };
}

// Histórico de notificações
export interface NotificationHistory {
  id: string;
  notificationId: string;
  action: 'created' | 'read' | 'archived' | 'deleted' | 'dismissed';
  userId: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

// Métricas de notificações
export interface NotificationMetrics {
  delivery: {
    total: number;
    successful: number;
    failed: number;
    rate: number; // Success rate percentage
  };

  engagement: {
    readRate: number;
    clickRate: number;
    dismissRate: number;
    archiveRate: number;
  };

  performance: {
    averageDeliveryTime: number; // in milliseconds
    averageReadTime: number; // in milliseconds
    peakHour: number; // 0-23
  };

  channels: {
    [key in NotificationChannel]: {
      total: number;
      successful: number;
      failed: number;
      rate: number;
    };
  };
}

// Tipos para formulários
export interface CreateNotificationRequest {
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  category: NotificationCategory;
  channels: NotificationChannel[];

  // Opcionais
  userId?: string;
  userRole?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  data?: Record<string, any>;
  actions?: Omit<NotificationAction, 'id'>[];
  attachments?: Omit<NotificationAttachment, 'id'>[];
  expiresAt?: string;
  isPersistent?: boolean;
  isDismissible?: boolean;
  autoExpire?: boolean;
  groupKey?: string;
}

export interface UpdateNotificationRequest {
  title?: string;
  message?: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  status?: NotificationStatus;
  data?: Record<string, any>;
  actions?: NotificationAction[];
  attachments?: NotificationAttachment[];
}

export interface CreateNotificationTemplateRequest {
  name: string;
  description: string;
  category: NotificationCategory;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  variables: string[];
  channels: NotificationChannel[];
  isActive?: boolean;
}

export interface UpdateNotificationPreferencesRequest {
  channels?: {
    inApp?: boolean;
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
  categories?: {
    [key in NotificationCategory]?: {
      enabled?: boolean;
      channels?: NotificationChannel[];
      priority?: NotificationPriority;
    };
  };
  types?: {
    [key in NotificationType]?: {
      enabled?: boolean;
      channels?: NotificationChannel[];
    };
  };
  quietHours?: {
    enabled?: boolean;
    start?: string;
    end?: string;
    timezone?: string;
  };
  frequency?: {
    digest?: boolean;
    digestFrequency?: 'immediate' | 'hourly' | 'daily' | 'weekly';
    maxPerHour?: number;
    maxPerDay?: number;
  };
}

// Tipos para componentes
export interface NotificationComponentProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onAction?: (notificationId: string, actionId: string) => void;
  compact?: boolean;
  showActions?: boolean;
  showTimestamp?: boolean;
}

export interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  error?: string;
  onLoadMore?: () => void;
  onFilter?: (filters: NotificationFilters) => void;
  onMarkAllRead?: () => void;
  onArchiveAll?: () => void;
  onDeleteAll?: () => void;
  showFilters?: boolean;
  showBulkActions?: boolean;
  groupBy?: 'none' | 'type' | 'category' | 'date';
}

export interface NotificationPreferencesProps {
  preferences: NotificationPreferences;
  onSave: (preferences: UpdateNotificationPreferencesRequest) => void;
  onReset: () => void;
  loading?: boolean;
  error?: string;
}

// Tipos para hooks
export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;

  // Ações
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  archive: (id: string) => Promise<void>;
  archiveAll: () => Promise<void>;
  delete: (id: string) => Promise<void>;
  deleteAll: () => Promise<void>;
  dismiss: (id: string) => Promise<void>;

  // Busca e filtros
  search: (filters: NotificationFilters) => Promise<void>;
  refresh: () => Promise<void>;

  // WebSocket
  isConnected: boolean;
  reconnect: () => void;
}

export interface UseNotificationPreferencesReturn {
  preferences: NotificationPreferences | null;
  loading: boolean;
  error: string | null;

  // Ações
  updatePreferences: (
    preferences: UpdateNotificationPreferencesRequest,
  ) => Promise<void>;
  resetToDefault: () => Promise<void>;
  testNotification: (type: NotificationType) => Promise<void>;
}

// Tipos para contexto
export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences | null;
  loading: boolean;
  error: string | null;
  isConnected: boolean;

  // Ações
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  archive: (id: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
  dismiss: (id: string) => Promise<void>;
  updatePreferences: (
    preferences: UpdateNotificationPreferencesRequest,
  ) => Promise<void>;

  // WebSocket
  reconnect: () => void;
}

// Constantes
export const NOTIFICATION_LIMITS = {
  MAX_NOTIFICATIONS: 1000,
  MAX_UNREAD: 100,
  AUTO_ARCHIVE_DAYS: 30,
  AUTO_DELETE_DAYS: 90,
  BATCH_SIZE: 50,
  DEBOUNCE_MS: 300,
  THROTTLE_MS: 1000,
} as const;

export const NOTIFICATION_DEFAULTS = {
  TYPE: NotificationType.INFO,
  PRIORITY: NotificationPriority.MEDIUM,
  STATUS: NotificationStatus.UNREAD,
  CHANNELS: [NotificationChannel.IN_APP],
  IS_PERSISTENT: true,
  IS_DISMISSIBLE: true,
  AUTO_EXPIRE: false,
} as const;

export const WEBSOCKET_CONFIG = {
  RECONNECT_INTERVAL: 5000,
  MAX_RECONNECT_ATTEMPTS: 10,
  HEARTBEAT_INTERVAL: 30000,
} as const;
