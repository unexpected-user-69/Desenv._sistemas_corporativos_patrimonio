// Componente de estatísticas de notificações

import React, { useEffect } from 'react';
import {
  BarChart3,
  Bell,
  CheckCircle,
  AlertCircle,
  Archive,
  Clock,
  TrendingUp,
  Users,
  Activity,
} from 'lucide-react';
import { useNotificationsStore } from '../../stores/notificationsStore';
import {
  NotificationType,
  NotificationPriority,
  NotificationStatus,
} from '../../types/notifications';

export const NotificationStats: React.FC = () => {
  const { stats, metrics, isLoading, fetchStats, fetchMetrics } =
    useNotificationsStore();

  useEffect(() => {
    void fetchStats();
    void fetchMetrics();
  }, [fetchStats, fetchMetrics]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Carregando estatísticas...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-center">
        <Bell className="h-8 w-8 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">Nenhuma estatística disponível</p>
      </div>
    );
  }

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case NotificationType.ERROR:
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case NotificationType.WARNING:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case NotificationType.INFO:
        return <Bell className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return 'Sucesso';
      case NotificationType.ERROR:
        return 'Erro';
      case NotificationType.WARNING:
        return 'Aviso';
      case NotificationType.INFO:
        return 'Informação';
      case NotificationType.SYSTEM:
        return 'Sistema';
      case NotificationType.USER_ACTION:
        return 'Ação do Usuário';
      case NotificationType.PATRIMONIO_UPDATE:
        return 'Atualização de Patrimônio';
      case NotificationType.REPORT_READY:
        return 'Relatório Pronto';
      case NotificationType.SECURITY_ALERT:
        return 'Alerta de Segurança';
      case NotificationType.MAINTENANCE:
        return 'Manutenção';
      default:
        return 'Outros';
    }
  };

  const getPriorityLabel = (priority: NotificationPriority) => {
    switch (priority) {
      case NotificationPriority.URGENT:
        return 'Urgente';
      case NotificationPriority.HIGH:
        return 'Alta';
      case NotificationPriority.MEDIUM:
        return 'Média';
      case NotificationPriority.LOW:
        return 'Baixa';
      default:
        return 'Normal';
    }
  };

  const getStatusLabel = (status: NotificationStatus) => {
    switch (status) {
      case NotificationStatus.UNREAD:
        return 'Não lidas';
      case NotificationStatus.READ:
        return 'Lidas';
      case NotificationStatus.ARCHIVED:
        return 'Arquivadas';
      case NotificationStatus.DELETED:
        return 'Excluídas';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estatísticas Gerais */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Estatísticas Gerais
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.total}
              </div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.unread}
              </div>
              <div className="text-sm text-gray-500">Não lidas</div>
            </div>
          </div>
        </div>

        {/* Atividade Recente */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Atividade Recente
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Hoje</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.recentActivity.today}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Esta semana</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.recentActivity.thisWeek}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Este mês</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.recentActivity.thisMonth}
              </span>
            </div>
          </div>
        </div>

        {/* Por Tipo */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Por Tipo
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(type as NotificationType)}
                  <span className="text-sm text-gray-600">
                    {getTypeLabel(type as NotificationType)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {count || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Por Prioridade */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Por Prioridade
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {getPriorityLabel(priority as NotificationPriority)}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {count || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Por Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Por Status
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {getStatusLabel(status as NotificationStatus)}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {count || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de Performance */}
        {metrics && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Métricas de Performance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taxa de entrega</span>
                <span className="text-sm font-medium text-gray-900">
                  {(
                    (metrics.delivery.successful / metrics.delivery.total) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taxa de leitura</span>
                <span className="text-sm font-medium text-gray-900">
                  {(metrics.engagement.readRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Tempo médio de entrega
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {metrics.performance.averageDeliveryTime.toFixed(0)}ms
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
