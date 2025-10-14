import React, { useEffect } from 'react';
import { useCacheStore } from '../../stores/cacheStore';
import { Database, Activity, RefreshCw } from 'lucide-react';

export const CacheDashboard: React.FC = () => {
  const {
    stats,
    health,
    keys,
    alerts,
    isLoading,
    error,
    fetchStats,
    fetchHealth,
    fetchKeys,
    fetchOperations,
    fetchAlerts,
    fetchConfig,
  } = useCacheStore();

  useEffect(() => {
    void fetchStats();
    void fetchHealth();
    void fetchKeys();
    void fetchOperations();
    void fetchAlerts();
    void fetchConfig();
  }, [
    fetchStats,
    fetchHealth,
    fetchKeys,
    fetchOperations,
    fetchAlerts,
    fetchConfig,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard de Cache Redis
          </h1>
          <p className="text-sm text-gray-600">
            Monitoramento e gerenciamento do cache Redis
          </p>
        </div>
        <button
          onClick={() => {
            void fetchStats();
            void fetchHealth();
            void fetchKeys();
          }}
          className="btn-primary"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </button>
      </div>

      {/* Status do Cache */}
      {health && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Status do Cache
          </h2>
          <div className="flex items-center space-x-4">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                health.status === 'healthy'
                  ? 'text-green-600 bg-green-100'
                  : health.status === 'warning'
                    ? 'text-yellow-600 bg-yellow-100'
                    : 'text-red-600 bg-red-100'
              }`}
            >
              {health.status.toUpperCase()}
            </div>
            <span className="text-sm text-gray-600">
              Última verificação: {new Date(health.lastCheck).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total de Chaves
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.keys}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cache Hits</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.hits}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Cache Misses
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.misses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Uso de Memória
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {(stats.memoryUsage / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chaves do Cache */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Chaves do Cache
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {keys.slice(0, 10).map((key) => (
            <div key={key.key} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{key.key}</p>
                  <p className="text-sm text-gray-600">
                    TTL: {key.ttl}s | Tipo: {key.type}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {key.valuePreview.substring(0, 50)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Alertas</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.level === 'error'
                          ? 'text-red-600 bg-red-100'
                          : alert.level === 'warn'
                            ? 'text-yellow-600 bg-yellow-100'
                            : 'text-blue-600 bg-blue-100'
                      }`}
                    >
                      {alert.level.toUpperCase()}
                    </span>
                    <p className="text-sm text-gray-900">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
