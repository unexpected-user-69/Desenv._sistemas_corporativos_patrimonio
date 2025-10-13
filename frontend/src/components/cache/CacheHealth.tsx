import React from 'react';
import { CacheHealth as CacheHealthType } from '../../types/cache';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Users,
  AlertCircle,
  HardDrive
} from 'lucide-react';

interface CacheHealthProps {
  health: CacheHealthType | null;
  isLoading: boolean;
}

export const CacheHealth: React.FC<CacheHealthProps> = ({ health, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!health) {
    return (
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Saúde do Cache</h3>
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Status não disponível</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'unhealthy':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'unhealthy':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'Saudável';
      case 'degraded':
        return 'Degradado';
      case 'unhealthy':
        return 'Não Saudável';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Saúde do Cache</h3>
        <div className="flex items-center">
          {getStatusIcon(health.status)}
          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(health.status)}`}>
            {getStatusText(health.status)}
          </span>
        </div>
      </div>

      {/* Status Principal */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-gray-900">Status Geral</p>
            <p className="text-sm text-gray-500">Última verificação: {new Date(health.lastCheck).toLocaleTimeString()}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">{health.responseTime}ms</p>
            <p className="text-xs text-gray-500">Tempo de resposta</p>
          </div>
        </div>
      </div>

      {/* Métricas de Saúde */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <Memory className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Uso de Memória</p>
              <p className="text-xs text-gray-500">Percentual utilizado</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{health.memoryUsage.toFixed(1)}%</p>
            <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
              <div 
                className={`h-2 rounded-full ${
                  health.memoryUsage > 90 ? 'bg-red-500' : 
                  health.memoryUsage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${health.memoryUsage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Clientes Conectados</p>
              <p className="text-xs text-gray-500">Conexões ativas</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{health.connectedClients}</p>
            <p className="text-xs text-gray-500">
              {health.connectedClients > 100 ? 'Alto' : health.connectedClients > 50 ? 'Médio' : 'Baixo'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <XCircle className="h-5 w-5 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Erros</p>
              <p className="text-xs text-gray-500">Últimas 24h</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold ${health.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {health.errors}
            </p>
            <p className="text-xs text-gray-500">
              {health.errors === 0 ? 'Nenhum erro' : 'Requer atenção'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Avisos</p>
              <p className="text-xs text-gray-500">Últimas 24h</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold ${health.warnings > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
              {health.warnings}
            </p>
            <p className="text-xs text-gray-500">
              {health.warnings === 0 ? 'Nenhum aviso' : 'Monitorar'}
            </p>
          </div>
        </div>
      </div>

      {/* Recomendações */}
      {health.status !== 'healthy' && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Recomendações</h4>
              <div className="mt-2 text-sm text-yellow-700">
                {health.status === 'degraded' && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Verifique o uso de memória</li>
                    <li>Monitore as conexões ativas</li>
                    <li>Considere aumentar a capacidade</li>
                  </ul>
                )}
                {health.status === 'unhealthy' && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Verifique a conectividade com o Redis</li>
                    <li>Reinicie o serviço se necessário</li>
                    <li>Verifique os logs de erro</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
