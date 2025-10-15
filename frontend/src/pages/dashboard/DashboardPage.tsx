// Página principal do dashboard

import React, { useEffect, useState } from 'react';
import {
  RefreshCw,
  Download,
  Settings,
  Bell,
  Filter,
  Calendar,
  BarChart3,
  Activity,
  Users,
  Building2,
  Database,
  Zap,
} from 'lucide-react';
import { useDashboardStore } from '../../stores/dashboardStore';
import {
  StatsCards,
  SystemMetricsCards,
} from '../../components/dashboard/StatsCards';
import { ChartsSection } from '../../components/dashboard/ChartsSection';
import {
  RecentActivity,
  CompactRecentActivity,
} from '../../components/dashboard/RecentActivity';
import { DashboardFilters } from '../../types/dashboard';

export const DashboardPage: React.FC = () => {
  const {
    stats,
    isLoading,
    isRefreshing,
    error,
    filters,
    autoRefresh,
    refreshInterval,
    lastUpdate,
    fetchDashboardStats,
    refreshAll,
    setFilters,
    setAutoRefresh,
    setRefreshInterval,
    clearError,
  } = useDashboardStore();

  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Carregar dados iniciais
  useEffect(() => {
    void fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refreshAll();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refreshAll]);

  const handleRefresh = () => {
    refreshAll();
  };

  const handleExport = () => {
    try {
      // Implementar exportação
      console.log('Exportando dashboard...');
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  const handleFilterChange = (newFilters: Partial<DashboardFilters>) => {
    setFilters(newFilters);
  };

  const formatLastUpdate = (timestamp: string | null) => {
    if (!timestamp) return 'Nunca';

    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Agora mesmo';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min atrás`;
    } else {
      return date.toLocaleString('pt-BR');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">
                  Dashboard
                </h1>
              </div>
              {lastUpdate && (
                <div className="text-sm text-gray-500">
                  Última atualização: {formatLastUpdate(lastUpdate)}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* Auto-refresh toggle */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Auto-refresh:</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoRefresh ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoRefresh ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Refresh interval */}
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
                disabled={!autoRefresh}
              >
                <option value={10}>10s</option>
                <option value={30}>30s</option>
                <option value={60}>1m</option>
                <option value={300}>5m</option>
              </select>

              {/* Actions */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                title="Atualizar dados"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                />
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Filtros"
              >
                <Filter className="h-4 w-4" />
              </button>

              <button
                onClick={() => void handleExport()}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Exportar dados"
              >
                <Download className="h-4 w-4" />
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Configurações"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-600"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Visão Geral
          </h2>
          <StatsCards />
        </div>

        {/* System Metrics */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Métricas do Sistema
          </h2>
          <SystemMetricsCards />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Gráficos e Tendências
            </h2>
            <ChartsSection />
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Atividade Recente
            </h2>
            <RecentActivity limit={8} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Gerenciar Usuários
                  </h3>
                  <p className="text-sm text-gray-500">
                    Criar e editar usuários
                  </p>
                </div>
              </div>
            </button>

            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Patrimônios</h3>
                  <p className="text-sm text-gray-500">Gerenciar patrimônios</p>
                </div>
              </div>
            </button>

            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Cache Redis</h3>
                  <p className="text-sm text-gray-500">Monitorar cache</p>
                </div>
              </div>
            </button>

            <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Activity className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Monitoramento</h3>
                  <p className="text-sm text-gray-500">
                    Ver métricas detalhadas
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
