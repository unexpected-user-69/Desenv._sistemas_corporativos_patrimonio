// Componente de Lista de Notificações
// IA_ArquitetoFrontend (IA 2) - FASE 6

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Filter,
  Archive,
  Trash2,
  RefreshCw,
  Eye,
  AlertCircle,
} from 'lucide-react';
import {
  NotificationFilters,
  NotificationType,
  NotificationStatus,
  NotificationPriority,
  NotificationListProps,
} from '../../types/notifications';
import { NotificationItem } from './NotificationItem';
import {
  useNotificationActions,
  useNotificationFilters,
} from '../../stores/notificationsStore';

export const NotificationsList: React.FC<NotificationListProps> = ({
  notifications,
  loading = false,
  error,
  onLoadMore,
  onFilter,
  showFilters = true,
  showBulkActions = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [localFilters, setLocalFilters] = useState<NotificationFilters>({
    status: [],
    type: [],
    category: [],
    priority: [],
  });

  const { filters, clearFilters, search, pagination, nextPage, prevPage } =
    useNotificationFilters();

  const {
    markAsRead,
    archiveNotification,
    deleteNotification,
    dismissNotification,
    executeAction,
    batchOperation,
    clearError,
  } = useNotificationActions();

  // Aplicar filtros
  useEffect(() => {
    if (onFilter) {
      onFilter({ ...filters, ...localFilters });
    }
  }, [filters, localFilters, onFilter]);

  // Buscar notificações
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      search(term);
    } else {
      clearFilters();
    }
  };

  // Aplicar filtro
  const handleFilterChange = (key: keyof NotificationFilters, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Limpar todos os filtros
  const clearAllFilters = () => {
    setLocalFilters({
      status: [],
      type: [],
      category: [],
      priority: [],
    });
    clearFilters();
    setSearchTerm('');
  };

  // Selecionar notificação
  const toggleNotificationSelection = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id)
        ? prev.filter((notificationId) => notificationId !== id)
        : [...prev, id],
    );
  };

  // Selecionar todas as notificações
  const selectAllNotifications = () => {
    setSelectedNotifications(notifications.map((n) => n.id));
  };

  // Desmarcar todas as notificações
  const deselectAllNotifications = () => {
    setSelectedNotifications([]);
  };

  // Operação em lote
  const handleBatchOperation = async (
    operation: 'read' | 'archive' | 'delete' | 'dismiss',
  ) => {
    if (selectedNotifications.length === 0) return;

    try {
      await batchOperation(operation, selectedNotifications);
      setSelectedNotifications([]);
    } catch (error) {
      console.error('Erro na operação em lote:', error);
    }
  };

  // Ações individuais
  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveNotification(id);
    } catch (error) {
      console.error('Erro ao arquivar:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      await dismissNotification(id);
    } catch (error) {
      console.error('Erro ao descartar:', error);
    }
  };

  const handleAction = async (notificationId: string, actionId: string) => {
    try {
      await executeAction(notificationId, actionId);
    } catch (error) {
      console.error('Erro ao executar ação:', error);
    }
  };

  // Estatísticas rápidas
  const unreadCount = notifications.filter(
    (n) => n.status === NotificationStatus.UNREAD,
  ).length;
  const urgentCount = notifications.filter(
    (n) => n.priority === NotificationPriority.URGENT,
  ).length;

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-gray-600" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Notificações
              </h2>
              <p className="text-sm text-gray-600">
                {notifications.length} notificações
                {unreadCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {unreadCount} não lidas
                  </span>
                )}
                {urgentCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {urgentCount} urgentes
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              title="Filtros"
            >
              <Filter className="h-5 w-5" />
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              title="Atualizar"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && showFiltersPanel && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar notificações..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                multiple
                value={localFilters.status || []}
                onChange={(e) => {
                  const values = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                  );
                  handleFilterChange('status', values);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={NotificationStatus.UNREAD}>Não lidas</option>
                <option value={NotificationStatus.READ}>Lidas</option>
                <option value={NotificationStatus.ARCHIVED}>Arquivadas</option>
              </select>
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                multiple
                value={localFilters.type || []}
                onChange={(e) => {
                  const values = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                  );
                  handleFilterChange('type', values);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={NotificationType.INFO}>Info</option>
                <option value={NotificationType.SUCCESS}>Sucesso</option>
                <option value={NotificationType.WARNING}>Aviso</option>
                <option value={NotificationType.ERROR}>Erro</option>
                <option value={NotificationType.SYSTEM}>Sistema</option>
                <option value={NotificationType.USER}>Usuário</option>
                <option value={NotificationType.PATRIMONIO}>Patrimônio</option>
                <option value={NotificationType.REPORT}>Relatório</option>
                <option value={NotificationType.SECURITY}>Segurança</option>
                <option value={NotificationType.MAINTENANCE}>Manutenção</option>
              </select>
            </div>

            {/* Prioridade */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade
              </label>
              <select
                multiple
                value={localFilters.priority || []}
                onChange={(e) => {
                  const values = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                  );
                  handleFilterChange('priority', values);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={NotificationPriority.LOW}>Baixa</option>
                <option value={NotificationPriority.MEDIUM}>Média</option>
                <option value={NotificationPriority.HIGH}>Alta</option>
                <option value={NotificationPriority.URGENT}>Urgente</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Limpar filtros
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {notifications.length} resultados
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Ações em lote */}
      {showBulkActions && selectedNotifications.length > 0 && (
        <div className="px-6 py-3 border-b border-gray-200 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-900">
                {selectedNotifications.length} selecionadas
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBatchOperation('read')}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded"
              >
                <Eye className="h-4 w-4 mr-1" />
                Marcar como lidas
              </button>
              <button
                onClick={() => handleBatchOperation('archive')}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-800 hover:bg-gray-100 rounded"
              >
                <Archive className="h-4 w-4 mr-1" />
                Arquivar
              </button>
              <button
                onClick={() => handleBatchOperation('delete')}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 hover:text-red-800 hover:bg-red-100 rounded"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de notificações */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="px-6 py-8 text-center">
            <RefreshCw className="h-8 w-8 text-gray-400 animate-spin mx-auto mb-2" />
            <p className="text-gray-600">Carregando notificações...</p>
          </div>
        ) : error ? (
          <div className="px-6 py-8 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 mb-2">{error}</p>
            <button
              onClick={() => clearError()}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Tentar novamente
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Nenhuma notificação encontrada</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="px-6 py-4">
              <div className="flex items-start space-x-3">
                {showBulkActions && (
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() =>
                      toggleNotificationSelection(notification.id)
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                )}

                <div className="flex-1">
                  <NotificationItem
                    notification={notification}
                    onRead={handleMarkAsRead}
                    onArchive={handleArchive}
                    onDelete={handleDelete}
                    onDismiss={handleDismiss}
                    onAction={handleAction}
                    showActions={true}
                    showTimestamp={true}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginação */}
      {pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Página {pagination.page} de {pagination.totalPages}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevPage}
                disabled={!pagination.hasPrev}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              <button
                onClick={nextPage}
                disabled={!pagination.hasNext}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Carregar mais */}
      {onLoadMore && pagination.hasNext && (
        <div className="px-6 py-4 border-t border-gray-200 text-center">
          <button
            onClick={onLoadMore}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Carregar mais notificações
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
