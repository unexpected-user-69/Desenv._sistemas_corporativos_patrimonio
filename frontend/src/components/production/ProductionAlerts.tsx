// Componente de alertas de produção

import React, { useState } from 'react';
import { ProductionAlert } from '../../types/production';
import { productionService } from '../../services/production';

interface Props {
  alerts: ProductionAlert[];
  onResolve: () => void;
}

export const ProductionAlerts: React.FC<Props> = ({ alerts, onResolve }) => {
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>(
    'all',
  );
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [loading, setLoading] = useState<string | null>(null);

  const handleResolve = async (alertId: string) => {
    try {
      setLoading(alertId);
      await productionService.resolveAlert(alertId);
      onResolve();
    } catch (error) {
      console.error('Erro ao resolver alerta:', error);
    } finally {
      setLoading(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rate_limit':
        return '⏱️';
      case 'cors_violation':
        return '🌐';
      case 'security_threat':
        return '🔒';
      case 'compression_error':
        return '🗜️';
      case 'performance_degradation':
        return '📈';
      default:
        return '⚠️';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'rate_limit':
        return 'Rate Limiting';
      case 'cors_violation':
        return 'Violação CORS';
      case 'security_threat':
        return 'Ameaça de Segurança';
      case 'compression_error':
        return 'Erro de Compressão';
      case 'performance_degradation':
        return 'Degradação de Performance';
      default:
        return 'Alerta';
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'unresolved' && alert.resolved) return false;
    if (filter === 'resolved' && !alert.resolved) return false;
    if (typeFilter !== 'all' && alert.type !== typeFilter) return false;
    if (severityFilter !== 'all' && alert.severity !== severityFilter)
      return false;
    return true;
  });

  const alertTypes = [...new Set(alerts.map((alert) => alert.type))];
  const alertSeverities = [...new Set(alerts.map((alert) => alert.severity))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Alertas de Produção
        </h2>
        <p className="text-sm text-gray-600">
          Monitoramento de alertas e eventos de segurança
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as 'all' | 'unresolved' | 'resolved')
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos ({alerts.length})</option>
              <option value="unresolved">
                Não Resolvidos ({alerts.filter((a) => !a.resolved).length})
              </option>
              <option value="resolved">
                Resolvidos ({alerts.filter((a) => a.resolved).length})
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Tipos</option>
              {alertTypes.map((type) => (
                <option key={type} value={type}>
                  {getTypeName(type)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severidade
            </label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as Severidades</option>
              {alertSeverities.map((severity) => (
                <option key={severity} value={severity}>
                  {severity.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFilter('all');
                setTypeFilter('all');
                setSeverityFilter('all');
              }}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-gray-50 border rounded-lg p-8 text-center">
            <p className="text-gray-600">
              Nenhum alerta encontrado com os filtros aplicados
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-6 ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{getTypeIcon(alert.type)}</span>
                    <h3 className="font-medium">{alert.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.resolved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {alert.resolved ? 'RESOLVIDO' : 'ATIVO'}
                    </span>
                  </div>

                  <p className="text-sm mb-3">{alert.description}</p>

                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>Tipo: {getTypeName(alert.type)}</span>
                    <span>•</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>

                  {alert.metadata && (
                    <details className="mt-3">
                      <summary className="text-xs text-gray-600 cursor-pointer">
                        Detalhes Técnicos
                      </summary>
                      <pre className="mt-2 text-xs bg-white bg-opacity-50 p-3 rounded overflow-x-auto">
                        {JSON.stringify(alert.metadata, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  {!alert.resolved && (
                    <button
                      onClick={() => void handleResolve(alert.id)}
                      disabled={loading === alert.id}
                      className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 disabled:opacity-50"
                    >
                      {loading === alert.id ? 'Resolvendo...' : 'Resolver'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Estatísticas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Estatísticas de Alertas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
            <p className="text-sm text-gray-600">Total de Alertas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {alerts.filter((a) => !a.resolved).length}
            </p>
            <p className="text-sm text-gray-600">Não Resolvidos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {
                alerts.filter(
                  (a) => a.severity === 'critical' || a.severity === 'high',
                ).length
              }
            </p>
            <p className="text-sm text-gray-600">Alta Prioridade</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {alerts.filter((a) => a.type === 'security_threat').length}
            </p>
            <p className="text-sm text-gray-600">Ameaças de Segurança</p>
          </div>
        </div>
      </div>
    </div>
  );
};
