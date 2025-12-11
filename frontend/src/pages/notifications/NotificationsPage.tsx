// Página Principal de Notificações
// IA_ArquitetoFrontend (IA 2) - FASE 6

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Settings,
  BarChart3,
  Filter,
  RefreshCw,
  Archive,
  Trash2,
  Eye,
  Calendar,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import { NotificationList } from '../../components/notifications/NotificationList';
import { NotificationStats } from '../../components/notifications/NotificationStats';
import { NotificationPreferences } from '../../components/notifications/NotificationPreferences';
import { useNotificationsStore } from '../../stores/notificationsStore';
import { NotificationPriority } from '../../types/notifications';

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'preferences' | 'stats'>(
    'list',
  );
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const {
    notifications,
    unreadCount,
    stats,
    error,
    fetchNotifications,
    fetchStats,
    fetchPreferences,
    connectWebSocket,
    disconnectWebSocket,
    markAllAsRead,
    clearError,
  } = useNotificationsStore();

  // Carregar dados iniciais
  useEffect(() => {
    void fetchNotifications();
    void fetchStats();
    void fetchPreferences();
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [
    fetchNotifications,
    fetchStats,
    fetchPreferences,
    connectWebSocket,
    disconnectWebSocket,
  ]);

  // Estatísticas rápidas
  const urgentCount = notifications.filter(
    (n) => n.priority === NotificationPriority.URGENT,
  ).length;
  const todayCount = notifications.filter((n) => {
    const today = new Date();
    const notificationDate = new Date(n.createdAt);
    return notificationDate.toDateString() === today.toDateString();
  }).length;

  // Ações em lote
  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const handleArchiveAll = () => {
    try {
      // Implementar arquivamento de todas as notificações
      console.log('Arquivando todas as notificações');
    } catch (error) {
      console.error('Erro ao arquivar todas:', error);
    }
  };

  const handleDeleteAll = () => {
    if (
      window.confirm(
        'Tem certeza que deseja deletar todas as notificações? Esta ação não pode ser desfeita.',
      )
    ) {
      try {
        // Implementar exclusão de todas as notificações
        console.log('Excluindo todas as notificações');
      } catch (error) {
        console.error('Erro ao deletar todas:', error);
      }
    }
  };

  // Atualizar preferências

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
              <p className="text-gray-600 mt-1">
                Gerencie suas notificações e preferências
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Status da conexão */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${true ? 'bg-green-500' : 'bg-red-500'}`}
                ></div>
                <span className="text-sm text-gray-600">Conectado</span>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {notifications.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Não Lidas</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {unreadCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Urgentes</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {urgentCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Hoje</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {todayCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'list', label: 'Lista', icon: Bell },
              { id: 'preferences', label: 'Preferências', icon: Settings },
              { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Conteúdo das tabs */}
        {activeTab === 'list' && (
          <div className="space-y-6">
            {/* Ações rápidas */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ações Rápidas
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium ${
                      showFilters
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </button>
                  <button
                    onClick={() => setShowBulkActions(!showBulkActions)}
                    className={`inline-flex items-center px-3 py-2 border rounded-lg text-sm font-medium ${
                      showBulkActions
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Ações em Lote
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Marcar todas como lidas
                  </button>
                )}
                <button
                  onClick={handleArchiveAll}
                  className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700"
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Arquivar todas
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Deletar todas
                </button>
              </div>
            </div>

            {/* Lista de notificações */}
            <NotificationList
              onNotificationClick={(notification) => {
                console.log('Notification clicked:', notification);
              }}
              onActionClick={(notification) => {
                if (notification.actionUrl) {
                  window.open(notification.actionUrl, '_blank');
                }
              }}
              showFilters={true}
              showBulkActions={true}
              limit={50}
            />
          </div>
        )}

        {activeTab === 'preferences' && <NotificationPreferences />}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Estatísticas gerais */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estatísticas Gerais
              </h3>
              {stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </p>
                    <p className="text-sm text-gray-600">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.unread}
                    </p>
                    <p className="text-sm text-gray-600">Não Lidas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {stats.read}
                    </p>
                    <p className="text-sm text-gray-600">Lidas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-600">
                      {stats.archived}
                    </p>
                    <p className="text-sm text-gray-600">Arquivadas</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Carregando estatísticas...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Erro global */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
              <button
                onClick={clearError}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
