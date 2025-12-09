// Componente de cards de estatísticas do dashboard

import React from 'react';
import {
  Users,
  Building2,
  Activity,
  Database,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Zap,
  HardDrive,
  Cpu,
  MemoryStick,
} from 'lucide-react';
import {
  useDashboardStats,
  useDashboardLoading,
} from '../../stores/dashboardStore';
import { DashboardStats } from '../../types/dashboard';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  bgColor,
  isLoading = false,
}) => {
  const getTrendIcon = () => {
    if (change === undefined || change === 0)
      return <Minus className="h-4 w-4" />;
    return change > 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return 'text-gray-500';
    return change > 0 ? 'text-green-600' : 'text-red-600';
  };

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4">
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
            <div className="mt-2 h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <div className={`${color}`}>{icon}</div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">
          {formatValue(value)}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
      </div>
    </div>
  );
};

interface StatsCardsProps {
  stats?: DashboardStats | null;
  isLoading?: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats: propStats,
  isLoading: propLoading,
}) => {
  const storeStats = useDashboardStats();
  const storeLoading = useDashboardLoading();

  const stats = propStats !== undefined ? propStats : storeStats;
  const isLoading = propLoading !== undefined ? propLoading : storeLoading;

  if (!stats && !isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="mt-4">
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
                <div className="mt-2 h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Usuários */}
      <StatCard
        title="Total de Usuários"
        value={stats?.users.total || 0}
        change={stats?.users.growth}
        icon={<Users className="h-6 w-6" />}
        color="text-blue-600"
        bgColor="bg-blue-100"
        isLoading={isLoading}
      />

      <StatCard
        title="Usuários Ativos"
        value={stats?.users.active || 0}
        icon={<Activity className="h-6 w-6" />}
        color="text-green-600"
        bgColor="bg-green-100"
        isLoading={isLoading}
      />

      {/* Patrimônios */}
      <StatCard
        title="Total de Patrimônios"
        value={stats?.patrimonios.total || 0}
        change={stats?.patrimonios.growth}
        icon={<Building2 className="h-6 w-6" />}
        color="text-purple-600"
        bgColor="bg-purple-100"
        isLoading={isLoading}
      />

      <StatCard
        title="Valor Total"
        value={`R$ ${(stats?.patrimonios.valorTotal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        icon={<TrendingUp className="h-6 w-6" />}
        color="text-yellow-600"
        bgColor="bg-yellow-100"
        isLoading={isLoading}
      />

      {/* Sistema */}
      <StatCard
        title="Uptime"
        value={`${Math.floor((stats?.system.uptime || 0) / 3600)}h`}
        icon={<Clock className="h-6 w-6" />}
        color="text-indigo-600"
        bgColor="bg-indigo-100"
        isLoading={isLoading}
      />

      <StatCard
        title="Tempo de Resposta"
        value={`${(stats?.system.responseTime || 0).toFixed(0)}ms`}
        icon={<Zap className="h-6 w-6" />}
        color="text-orange-600"
        bgColor="bg-orange-100"
        isLoading={isLoading}
      />

      {/* Cache */}
      <StatCard
        title="Taxa de Hit"
        value={`${(stats?.cache.hitRate || 0).toFixed(1)}%`}
        icon={<Database className="h-6 w-6" />}
        color="text-cyan-600"
        bgColor="bg-cyan-100"
        isLoading={isLoading}
      />

      <StatCard
        title="Chaves no Cache"
        value={stats?.cache.totalKeys || 0}
        icon={<HardDrive className="h-6 w-6" />}
        color="text-pink-600"
        bgColor="bg-pink-100"
        isLoading={isLoading}
      />
    </div>
  );
};

// Componente adicional para métricas do sistema
export const SystemMetricsCards: React.FC = () => {
  const stats = useDashboardStats();
  const isLoading = useDashboardLoading();

  if (!stats && !isLoading) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Uso de CPU"
        value={`${(stats?.system.cpuUsage || 0).toFixed(1)}%`}
        icon={<Cpu className="h-6 w-6" />}
        color="text-red-600"
        bgColor="bg-red-100"
        isLoading={isLoading}
      />

      <StatCard
        title="Uso de Memória"
        value={`${(stats?.system.memoryUsage || 0).toFixed(0)} MB`}
        icon={<MemoryStick className="h-6 w-6" />}
        color="text-blue-600"
        bgColor="bg-blue-100"
        isLoading={isLoading}
      />

      <StatCard
        title="Uso de Disco"
        value={`${(stats?.system.diskUsage || 0).toFixed(1)}%`}
        icon={<HardDrive className="h-6 w-6" />}
        color="text-green-600"
        bgColor="bg-green-100"
        isLoading={isLoading}
      />
    </div>
  );
};
