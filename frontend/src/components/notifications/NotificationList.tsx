// Componente de lista de notificações

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Archive,
  Trash2,
  RefreshCw,
  Bell,
  BellOff,
} from 'lucide-react';
import { useNotificationsStore } from '../../stores/notificationsStore';
import { NotificationItem } from './NotificationItem';
import {
  // NotificationFilter: _NotificationFilter,
  NotificationType,
  NotificationPriority,
  NotificationStatus,
} from '../../types/notifications';

interface NotificationListProps {
  onNotificationClick?: (notification: any) => void;
  onActionClick?: (notification: any) => void;
  showFilters?: boolean;
  showBulkActions?: boolean;
  limit?: number;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  onNotificationClick: _onNotificationClick,
  onActionClick,
  showFilters = true,
  showBulkActions = true,
  limit = 20,
}) => {
  const {
    notifications,
    isLoading,
    error,
    filters,
    fetchNotifications,
    markAllAsRead,
    bulkAction,
    setFilters,
    clearFilters,
  } = useNotificationsStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );
  const [showBulkActionsPanel, setShowBulkActionsPanel] = useState(false);

  useEffect(() => {
    void fetchNotifications({ limit });
  }, [fetchNotifications, limit, filters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilters({ search: term });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ [key]: value });
  };

  const handleSelectNotification = (_id: string) => {
    // Implementar seleção de notificações se necessário
  };

  const handleSelectAll = () => {
    // Implementar seleção de todas as notificações se necessário
  };

  const handleBulkAction = async (
    action: 'mark_read' | 'mark_unread' | 'archive' | 'delete',
  ) => {
    if (selectedNotifications.length === 0) return;

    try {
      await bulkAction({
        action,
        notificationIds: selectedNotifications,
      });
      setSelectedNotifications([]);
      setShowBulkActionsPanel(false);
    } catch (error) {
      console.error('Erro ao executar ação em lote:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (
      searchTerm &&
      !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getFilterCount = () => {
    let count = 0;
    if (filters.type && filters.type.length > 0) count++;
    if (filters.priority && filters.priority.length > 0) count++;
    if (filters.status && filters.status.length > 0) count++;
    if (filters.search) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900">Notificações</h3>
            {notifications.length > 0 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                {notifications.length}{' '}
                {notifications.length === 1 ? 'notificação' : 'notificações'}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              disabled={
                notifications.filter(
                  (n) => n.status === NotificationStatus.UNREAD,
                ).length === 0
              }
            >
              Marcar todas como lidas
            </button>
            <button
              onClick={() => void fetchNotifications({ limit })}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Atualizar"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar notificações..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtros */}
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-colors ${
                getFilterCount() > 0
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              {getFilterCount() > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getFilterCount()}
                </span>
              )}
            </button>

            {/* Ações em lote */}
            {showBulkActions && selectedNotifications.length > 0 && (
              <button
                onClick={() => setShowBulkActionsPanel(!showBulkActionsPanel)}
                className="flex items-center space-x-2 px-3 py-2 border border-orange-500 bg-orange-50 text-orange-700 rounded-lg"
              >
                <MoreVertical className="h-4 w-4" />
                <span>{selectedNotifications.length} selecionadas</span>
              </button>
            )}
          </div>

          {/* Painel de filtros */}
          {showFilterPanel && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo
                  </label>
                  <select
                    multiple
                    value={filters.type || []}
                    onChange={(e) => {
                      const values = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value,
                      );
                      handleFilterChange('type', values);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.values(NotificationType).map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prioridade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioridade
                  </label>
                  <select
                    multiple
                    value={filters.priority || []}
                    onChange={(e) => {
                      const values = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value,
                      );
                      handleFilterChange('priority', values);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.values(NotificationPriority).map((priority) => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    multiple
                    value={filters.status || []}
                    onChange={(e) => {
                      const values = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value,
                      );
                      handleFilterChange('status', values);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.values(NotificationStatus).map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          )}

          {/* Painel de ações em lote */}
          {showBulkActionsPanel && selectedNotifications.length > 0 && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-800">
                  {selectedNotifications.length} notificações selecionadas
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction('mark_read')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Marcar como lidas</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                  >
                    <Archive className="h-4 w-4" />
                    <span>Arquivar</span>
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lista de notificações */}
      <div className="divide-y divide-gray-200">
        {isLoading ? (
          <div className="px-6 py-8 text-center">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Carregando notificações...</p>
          </div>
        ) : error ? (
          <div className="px-6 py-8 text-center">
            <BellOff className="h-6 w-6 mx-auto text-red-400 mb-2" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <Bell className="h-6 w-6 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">Nenhuma notificação encontrada</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onAction={async (id: string, actionId: string) => {
                if (onActionClick) {
                  await onActionClick(id, actionId);
                }
              }}
              onActionClick={onActionClick}
              showActions={true}
            />
          ))
        )}
      </div>
    </div>
  );
};
