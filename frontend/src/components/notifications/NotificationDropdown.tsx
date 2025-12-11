// Componente de dropdown de notificações

import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  X,
  CheckCircle,
  Archive,
  Trash2,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { useNotificationsStore } from '../../stores/notificationsStore';
import { NotificationItem } from './NotificationItem';
import {
  Notification,
  NotificationWebSocketMessage,
} from '../../types/notifications';

interface NotificationDropdownProps {
  className?: string;
  maxItems?: number;
  onViewAll?: () => void;
  onSettings?: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  className = '',
  maxItems = 5,
  onViewAll,
  onSettings,
}) => {
  const {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAllAsRead,
    connectWebSocket,
    disconnectWebSocket,
    handleWebSocketMessage,
  } = useNotificationsStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carregar notificações iniciais
    void fetchNotifications({ limit: maxItems });

    // Conectar WebSocket
    connectWebSocket();
    setIsWebSocketConnected(true);

    // Adicionar listener para mensagens WebSocket
    const handleMessage = (message: NotificationWebSocketMessage) => {
      handleWebSocketMessage(message);
    };

    // Cleanup
    return () => {
      disconnectWebSocket();
      setIsWebSocketConnected(false);
    };
  }, [
    fetchNotifications,
    maxItems,
    connectWebSocket,
    disconnectWebSocket,
    handleWebSocketMessage,
  ]);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Marcar como lida se não estiver lida
    if (notification.status === 'unread') {
      // A lógica de marcar como lida será tratada pelo NotificationItem
    }
  };

  const handleActionClick = (notification: Notification) => {
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  };

  const recentNotifications = notifications.slice(0, maxItems);
  const hasMoreNotifications = notifications.length > maxItems;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Botão do dropdown */}
      <button
        onClick={handleToggle}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
        aria-label={`${unreadCount} notificações não lidas`}
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        {isWebSocketConnected && (
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Notificações
              </h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Marcar todas como lidas
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Lista de notificações */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-500 text-sm">Carregando...</p>
              </div>
            ) : recentNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-3">
                    <NotificationItem
                      notification={notification}
                      onNotificationClick={handleNotificationClick}
                      onActionClick={handleActionClick}
                      showActions={false}
                      compact={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isWebSocketConnected ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Conectado</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Desconectado</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {onSettings && (
                  <button
                    onClick={onSettings}
                    className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                )}
                {onViewAll && (
                  <button
                    onClick={onViewAll}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
                  >
                    <span>Ver todas</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
