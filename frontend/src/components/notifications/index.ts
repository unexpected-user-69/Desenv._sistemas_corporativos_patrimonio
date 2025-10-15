// Exportações dos Componentes de Notificações
// IA_ArquitetoFrontend (IA 2) - FASE 6

export { NotificationItem } from './NotificationItem';
export { NotificationsList } from './NotificationsList';
export { NotificationsDropdown } from './NotificationsDropdown';
export { NotificationPreferences } from './NotificationPreferences';

// Re-exportar tipos para conveniência
export type {
  Notification,
  NotificationFilters,
  NotificationSearchResult,
  NotificationPreferences,
  NotificationStats,
  NotificationTemplate,
  NotificationBatchResponse,
  CreateNotificationRequest,
  UpdateNotificationRequest,
  UpdateNotificationPreferencesRequest,
  NotificationGroup,
  NotificationType,
  NotificationStatus,
  NotificationPriority,
  NotificationCategory,
  NotificationChannel,
  NotificationComponentProps,
  NotificationListProps,
  NotificationPreferencesProps,
} from '../../types/notifications';
