// Componente de Dropdown de Notificações para o Header
// IA_ArquitetoFrontend (IA 2) - FASE 6

import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
  Eye,
  Archive,
  Trash2,
  Settings,
  ExternalLink,
  Clock,
} from 'lucide-react';
import {
  Notification,
  NotificationType,
  NotificationStatus,
  NotificationPriority,
} from '../../types/notifications';
import {
  useNotificationsStore,
  // useNotificationActions,
} from '../../stores/notificationsStore';
import { NotificationItem } from './NotificationItem';

interface NotificationsDropdownProps {
  maxItems?: number;
  showMarkAllRead?: boolean;
  showViewAll?: boolean;
  onViewAll?: () => void;
  onSettings?: () => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  maxItems = 5,
  showMarkAllRead = true,
  showViewAll = true,
  onViewAll,
  onSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    // unreadNotifications,
    // loading,
    error,
    fetchNotifications,
    connectWebSocket,
    // disconnectWebSocket,
    // isConnected,
  } = useNotificationsStore();

  const {
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    dismissNotification,
    executeAction,
    clearError,
  } = useNotificationActions();

  // Conectar WebSocket quando o dropdown é aberto
  useEffect(() => {
    if (isOpen && !isConnected) {
      connectWebSocket();
    }
  }, [isOpen, isConnected, connectWebSocket]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Carregar notificações quando abrir
  useEffect(() => {
    if (isOpen && notifications.length === 0) {
      fetchNotifications({ limit: maxItems });
    }
  }, [isOpen, notifications.length, fetchNotifications, maxItems]);

  // Notificações para exibir (limitadas)
  const displayNotifications = notifications.slice(0, maxItems);
  const unreadCount = unreadNotifications.length;

  // Ícone do tipo de notificação
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
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  // Formatar timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  // Ações
  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveNotification(id);
    } catch (error) {
      console.error('Erro ao arquivar:', error);
    }
  };

  const handleDelete = async (_id: string) => {
    // Implementar exclusão de notificação se necessário
  };

  const handleDismiss = async (_id: string) => {
    // Implementar dispensa de notificação se necessário
  };

  const handleAction = async (_notificationId: string, _actionId: string) => {
    // Implementar execução de ação se necessário
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await fetchNotifications({ limit: maxItems });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="Notificações"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Notificações
                </h3>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {unreadCount} não lidas
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  title="Atualizar"
                >
                  <Clock
                    className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                  />
                </button>
                {onSettings && (
                  <button
                    onClick={onSettings}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                    title="Configurações"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  title="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Ações rápidas */}
          {showMarkAllRead && unreadCount > 0 && (
            <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
              <button
                onClick={handleMarkAllAsRead}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <Eye className="h-4 w-4 mr-1" />
                Marcar todas como lidas
              </button>
            </div>
          )}

          {/* Lista de notificações */}
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-8 text-center">
                <Clock className="h-6 w-6 text-gray-400 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-600">Carregando...</p>
              </div>
            ) : error ? (
              <div className="px-4 py-8 text-center">
                <AlertCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <p className="text-sm text-red-600 mb-2">{error}</p>
                <button
                  onClick={() => clearError()}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Tentar novamente
                </button>
              </div>
            ) : displayNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {displayNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Ícone do tipo */}
                      <div className="flex-shrink-0 mt-0.5">
                        {getTypeIcon(notification.type)}
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(notification.createdAt)}
                              </span>
                              {notification.status ===
                                NotificationStatus.UNREAD && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                          </div>

                          {/* Ações rápidas */}
                          <div className="flex items-center space-x-1 ml-2">
                            {notification.status ===
                              NotificationStatus.UNREAD && (
                              <button
                                onClick={() =>
                                  handleMarkAsRead(notification.id)
                                }
                                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                title="Marcar como lida"
                              >
                                <Eye className="h-3 w-3" />
                              </button>
                            )}
                            <button
                              onClick={() => handleArchive(notification.id)}
                              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                              title="Arquivar"
                            >
                              <Archive className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {showViewAll && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewAll?.();
                }}
                className="w-full inline-flex items-center justify-center text-sm text-blue-600 hover:text-blue-800"
              >
                Ver todas as notificações
                <ExternalLink className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}

          {/* Status da conexão */}
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
              <span>{notifications.length} notificações</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
