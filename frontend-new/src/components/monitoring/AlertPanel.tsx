// Painel de alertas do sistema

import React, { useState, useEffect } from 'react';
import { Alert, AlertRule } from '../../types/monitoring';
import { monitoringService } from '../../services/monitoring';

export const AlertPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertRules, setAlertRules] = useState<AlertRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [alertsData, rulesData] = await Promise.all([
        monitoringService.getAlerts(),
        monitoringService.getAlertRules()
      ]);

      setAlerts(alertsData);
      setAlertRules(rulesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar alertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAcknowledge = async (alertId: string) => {
    try {
      await monitoringService.acknowledgeAlert(alertId);
      await loadData(); // Recarregar dados
    } catch (err) {
      setError('Erro ao reconhecer alerta');
    }
  };

  const handleResolve = async (alertId: string) => {
    try {
      await monitoringService.resolveAlert(alertId);
      await loadData(); // Recarregar dados
    } catch (err) {
      setError('Erro ao resolver alerta');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'active') return alert.status === 'active';
    if (filter === 'resolved') return alert.status === 'resolved';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erro ao carregar alertas</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos ({alerts.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'active'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Ativos ({alerts.filter(a => a.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'resolved'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Resolvidos ({alerts.filter(a => a.status === 'resolved').length})
          </button>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      {/* Lista de Alertas */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-gray-50 border rounded-lg p-8 text-center">
            <p className="text-gray-600">Nenhum alerta encontrado</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium">{alert.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{alert.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>Fonte: {alert.source}</span>
                    <span>•</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    {alert.tags && alert.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <span>Tags: {alert.tags.join(', ')}</span>
                      </>
                    )}
                  </div>
                  {alert.metadata && (
                    <details className="mt-2">
                      <summary className="text-xs text-gray-600 cursor-pointer">Detalhes</summary>
                      <pre className="mt-1 text-xs bg-white bg-opacity-50 p-2 rounded">
                        {JSON.stringify(alert.metadata, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  {alert.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-3 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded hover:bg-yellow-200"
                      >
                        Reconhecer
                      </button>
                      <button
                        onClick={() => handleResolve(alert.id)}
                        className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                      >
                        Resolver
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Regras de Alerta */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Regras de Alerta</h3>
        <div className="space-y-3">
          {alertRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{rule.name}</h4>
                <p className="text-sm text-gray-600">{rule.description}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <span>Condição: {rule.condition}</span>
                  <span>•</span>
                  <span>Limite: {rule.threshold}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                    {rule.severity.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rule.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {rule.enabled ? 'ATIVO' : 'INATIVO'}
                </span>
                {rule.lastTriggered && (
                  <span className="text-xs text-gray-500">
                    Último: {new Date(rule.lastTriggered).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};