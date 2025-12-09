// Componente de atividade recente do dashboard

import React from 'react';
import {
  User,
  Building2,
  Plus,
  Edit,
  Trash2,
  LogIn,
  LogOut,
  Clock,
  MoreVertical,
  Eye,
} from 'lucide-react';
import {
  useRecentActivity,
  useDashboardLoading,
} from '../../stores/dashboardStore';
import { RecentActivity as RecentActivityType } from '../../types/dashboard';

interface ActivityItemProps {
  activity: RecentActivityType;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'user_created':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'user_updated':
        return <Edit className="h-4 w-4 text-blue-600" />;
      case 'user_deleted':
        return <Trash2 className="h-4 w-4 text-red-600" />;
      case 'patrimonio_created':
        return <Plus className="h-4 w-4 text-green-600" />;
      case 'patrimonio_updated':
        return <Edit className="h-4 w-4 text-blue-600" />;
      case 'patrimonio_deleted':
        return <Trash2 className="h-4 w-4 text-red-600" />;
      case 'login':
        return <LogIn className="h-4 w-4 text-green-600" />;
      case 'logout':
        return <LogOut className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = () => {
    switch (activity.type) {
      case 'user_created':
      case 'patrimonio_created':
      case 'login':
        return 'bg-green-100';
      case 'user_updated':
      case 'patrimonio_updated':
        return 'bg-blue-100';
      case 'user_deleted':
      case 'patrimonio_deleted':
        return 'bg-red-100';
      case 'logout':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - activityTime.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return 'Agora mesmo';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min atrás`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h atrás`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}d atrás`;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-full ${getActivityColor()}`}>
        {getActivityIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-900">{activity.description}</p>
          <span className="text-xs text-gray-500">
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>
        {activity.user && (
          <div className="flex items-center space-x-2 mt-1">
            <User className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-600">
              {activity.user.name} ({activity.user.email})
            </span>
          </div>
        )}
        <div className="flex items-center space-x-2 mt-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {formatTimestamp(activity.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

interface RecentActivityProps {
  limit?: number;
  showHeader?: boolean;
  showViewAll?: boolean;
  isLoading?: boolean;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  limit = 10,
  showHeader = true,
  showViewAll = true,
  isLoading: propLoading,
}) => {
  const activities = useRecentActivity();
  const storeLoading = useDashboardLoading();
  const isLoading = propLoading !== undefined ? propLoading : storeLoading;

  const displayActivities = activities.slice(0, limit);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        {showHeader && (
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        )}
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        {showHeader && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Atividade Recente
            </h3>
          </div>
        )}
        <div className="p-6 text-center">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nenhuma atividade recente
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            As atividades do sistema aparecerão aqui quando houver movimentação.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {showHeader && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Atividade Recente
            </h3>
            {showViewAll && activities.length > limit && (
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Ver todas
              </button>
            )}
          </div>
        </div>
      )}
      <div className="divide-y divide-gray-200">
        {displayActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      {activities.length > limit && showViewAll && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <button className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium">
            Ver mais atividades ({activities.length - limit} restantes)
          </button>
        </div>
      )}
    </div>
  );
};

// Componente compacto para uso em cards menores
export const CompactRecentActivity: React.FC<{ limit?: number }> = ({
  limit = 5,
}) => {
  const activities = useRecentActivity();
  const isLoading = useDashboardLoading();

  const displayActivities = activities.slice(0, limit);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-4">
        <Clock className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">Nenhuma atividade</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-2 text-sm">
          <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
          <span className="text-gray-600 truncate">{activity.description}</span>
          <span className="text-xs text-gray-400 flex-shrink-0">
            {new Date(activity.timestamp).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      ))}
    </div>
  );
};
