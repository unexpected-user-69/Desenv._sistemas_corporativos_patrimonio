import React, { useEffect } from 'react';
import { useCacheStore } from '../../stores/cacheStore';
import { CacheStats } from './CacheStats';
import { CacheHealth } from './CacheHealth';
import { CacheKeys } from './CacheKeys';
import { CacheOperations } from './CacheOperations';
import { CacheAlerts } from './CacheAlerts';
import { CacheConfig } from './CacheConfig';
import { 
  Database, 
  Activity, 
  Key, 
  History, 
  AlertTriangle, 
  RefreshCw
} from 'lucide-react';

export const CacheDashboard: React.FC = () => {
  const {
    stats,
    health,
    keys,
    operations,
    alerts,
    config,
    isLoading,
    error,
    fetchStats,
    fetchHealth,
    fetchKeys,
    fetchOperations,
    fetchAlerts,
    fetchConfig,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
    clearError
  } = useCacheStore();

  useEffect(() => {
    // Carregar dados iniciais
    const loadInitialData = async () => {
      await Promise.all([
        fetchStats(),
        fetchHealth(),
        fetchKeys(),
        fetchOperations(),
        fetchAlerts(),
        fetchConfig()
      ]);
    };

    loadInitialData();
    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, [fetchStats, fetchHealth, fetchKeys, fetchOperations, fetchAlerts, fetchConfig, startMonitoring, stopMonitoring]);

  const handleRefresh = async () => {
    clearError();
    await Promise.all([
      fetchStats(),
      fetchHealth(),
      fetchKeys(),
      fetchOperations(),
      fetchAlerts()
    ]);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Erro ao carregar dados do cache</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="mt-3 btn-primary"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard do Cache Redis</h1>
                <p className="text-sm text-gray-500">Monitoramento e gerenciamento do cache em tempo real</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <div className={`w-2 h-2 rounded-full mr-2 ${isMonitoring ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                {isMonitoring ? 'Monitorando' : 'Pausado'}
              </div>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="btn-secondary flex items-center"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Estatísticas</h3>
                <p className="text-sm text-gray-500">
                  {stats ? `${stats.hitRate.toFixed(1)}% hit rate` : 'Carregando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  health?.status === 'healthy' ? 'bg-green-100' : 
                  health?.status === 'degraded' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <div className={`h-3 w-3 rounded-full ${
                    health?.status === 'healthy' ? 'bg-green-500' : 
                    health?.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Saúde</h3>
                <p className="text-sm text-gray-500">
                  {health ? health.status : 'Carregando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Key className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Chaves</h3>
                <p className="text-sm text-gray-500">
                  {stats ? `${stats.totalKeys} total` : 'Carregando...'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <History className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Operações</h3>
                <p className="text-sm text-gray-500">
                  {operations.length} recentes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <CacheStats stats={stats} isLoading={isLoading} />
            <CacheKeys />
            <CacheOperations operations={operations} isLoading={isLoading} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <CacheHealth health={health} isLoading={isLoading} />
            <CacheAlerts alerts={alerts} isLoading={isLoading} />
            <CacheConfig config={config} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};
