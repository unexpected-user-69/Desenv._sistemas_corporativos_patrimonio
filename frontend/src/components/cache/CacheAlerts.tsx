import React from 'react';
import { useCacheStore } from '../../stores/cacheStore';
import { CacheAlert } from '../../types/cache';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle,
  X,
  Clock
} from 'lucide-react';

interface CacheAlertsProps {
  alerts: CacheAlert[];
  isLoading: boolean;
}

export const CacheAlerts: React.FC<CacheAlertsProps> = ({ alerts, isLoading }) => {
  const { resolveAlert } = useCacheStore();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string, severity: string) => {
    if (type === 'error' || severity === 'critical') {
      return 'bg-red-50 border-red-200';
    }
    if (type === 'warning' || severity === 'high') {
      return 'bg-yellow-50 border-yellow-200';
    }
    if (severity === 'medium') {
      return 'bg-orange-50 border-orange-200';
    }
    return 'bg-blue-50 border-blue-200';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-yellow-100 text-yellow-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Agora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m atrás`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
    return date.toLocaleDateString();
  };

  const handleResolveAlert = async (alertId: string) => {
    await resolveAlert(alertId);
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
  const criticalAlerts = unresolvedAlerts.filter(alert => alert.severity === 'critical');
  const highAlerts = unresolvedAlerts.filter(alert => alert.severity === 'high');

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Alertas do Cache</h3>
        <div className="flex items-center space-x-2">
          {criticalAlerts.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {criticalAlerts.length} Crítico
            </span>
          )}
          {highAlerts.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {highAlerts.length} Alto
            </span>
          )}
        </div>
      </div>

      {unresolvedAlerts.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum alerta ativo</p>
          <p className="text-sm text-gray-400 mt-1">O cache está funcionando normalmente</p>
        </div>
      ) : (
        <div className="space-y-3">
          {unresolvedAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg ${getAlertColor(alert.type, alert.severity)}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-900 mt-2">{alert.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resumo de alertas */}
      {alerts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {unresolvedAlerts.length}
              </p>
              <p className="text-sm text-gray-500">Ativos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {criticalAlerts.length}
              </p>
              <p className="text-sm text-gray-500">Críticos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {highAlerts.length}
              </p>
              <p className="text-sm text-gray-500">Altos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {alerts.filter(alert => alert.resolved).length}
              </p>
              <p className="text-sm text-gray-500">Resolvidos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
