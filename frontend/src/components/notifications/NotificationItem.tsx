// Componente de item de notificação

import React from 'react';
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
  Archive,
  ExternalLink,
  Clock,
} from 'lucide-react';
import {
  Notification,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
} from '../../types/notifications';
import { useNotificationsStore } from '../../stores/notificationsStore';

interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => Promise<void>;
  onArchive?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onDismiss?: (id: string) => Promise<void>;
  onAction?: (notificationId: string, actionId: string) => Promise<void>;
  showActions?: boolean;
  showTimestamp?: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRead,
  onArchive,
  onDelete,
  onDismiss: _onDismiss,
  onAction,
  showActions = true,
  showTimestamp: _showTimestamp = true,
}) => {
  const { markAsRead, archiveNotification, deleteNotification } =
    useNotificationsStore();

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case NotificationType.ERROR:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case NotificationType.WARNING:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case NotificationType.INFO:
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case NotificationPriority.URGENT:
        return 'border-l-red-500 bg-red-50';
      case NotificationPriority.HIGH:
        return 'border-l-orange-500 bg-orange-50';
      case NotificationPriority.MEDIUM:
        return 'border-l-yellow-500 bg-yellow-50';
      case NotificationPriority.LOW:
        return 'border-l-gray-500 bg-gray-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  const getStatusColor = (status: NotificationStatus) => {
    switch (status) {
      case NotificationStatus.UNREAD:
        return 'bg-blue-100 text-blue-800';
      case NotificationStatus.READ:
        return 'bg-gray-100 text-gray-800';
      case NotificationStatus.ARCHIVED:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return date.toLocaleDateString('pt-BR');
  };

  const handleMarkAsRead = () => {
    if (notification.status === NotificationStatus.UNREAD) {
      if (onRead) {
        onRead(notification.id);
      } else {
        void markAsRead(notification.id);
      }
    }
  };

  const handleMarkAsUnread = () => {
    if (notification.status === NotificationStatus.READ) {
      // Implementar função para marcar como não lida se necessário
      console.log('Marcar como não lida:', notification.id);
    }
  };

  const handleArchive = () => {
    if (onArchive) {
      onArchive(notification.id);
    } else {
      void archiveNotification(notification.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(notification.id);
    } else {
      void deleteNotification(notification.id);
    }
  };

  const handleActionClick = () => {
    if (notification.actions?.[0]?.url && onAction) {
      void onAction(notification.id, 'action');
    }
  };

  return (
    <div
      className={`border-l-4 ${getPriorityColor(notification.priority)} ${
        notification.status === NotificationStatus.UNREAD
          ? 'bg-blue-50'
          : 'bg-white'
      } p-4 hover:bg-gray-50 transition-colors cursor-pointer`}
      onClick={handleMarkAsRead}
    >
      <div className="flex items-start space-x-3">
        {/* Ícone do tipo */}
        <div className="flex-shrink-0 mt-0.5">
          {getTypeIcon(notification.type)}
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {notification.title}
            </h4>
            <div className="flex items-center space-x-2">
              {/* Status badge */}
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}
              >
                {notification.status === NotificationStatus.UNREAD
                  ? 'Não lida'
                  : 'Lida'}
              </span>
              {/* Timestamp */}
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(notification.createdAt)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {notification.message}
          </p>

          {/* Ação */}
          {notification.actions && notification.actions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {notification.actions.map((action) => (
                <button
                  key={action.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAction) {
                      onAction(notification.id, action.id);
                    }
                  }}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {action.label}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              ))}
            </div>
          )}

          {/* Metadata */}
          {notification.data && Object.keys(notification.data).length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              {Object.entries(notification.data).map(([key, value]) => (
                <span key={key} className="mr-3">
                  <strong>{key}:</strong> {String(value)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Ações */}
        {showActions && (
          <div className="flex-shrink-0 flex items-center space-x-1">
            {notification.status === NotificationStatus.UNREAD ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkAsRead();
                }}
                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                title="Marcar como lida"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkAsUnread();
                }}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Marcar como não lida"
              >
                <Clock className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleArchive();
              }}
              className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
              title="Arquivar"
            >
              <Archive className="h-4 w-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Excluir"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
