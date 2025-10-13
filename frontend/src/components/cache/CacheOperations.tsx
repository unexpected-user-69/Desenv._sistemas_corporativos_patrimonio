import React from 'react';
import { CacheOperation } from '../../types/cache';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Database, 
  Key,
  Trash2,
  Plus,
  Timer
} from 'lucide-react';

interface CacheOperationsProps {
  operations: CacheOperation[];
  isLoading: boolean;
}

export const CacheOperations: React.FC<CacheOperationsProps> = ({ operations, isLoading }) => {
  const getOperationIcon = (operation: string) => {
    switch (operation) {
      case 'GET':
        return <Database className="h-4 w-4 text-blue-500" />;
      case 'SET':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'DEL':
        return <Trash2 className="h-4 w-4 text-red-500" />;
      case 'EXPIRE':
        return <Timer className="h-4 w-4 text-yellow-500" />;
      case 'FLUSH':
        return <Trash2 className="h-4 w-4 text-purple-500" />;
      default:
        return <Key className="h-4 w-4 text-gray-500" />;
    }
  };

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case 'GET':
        return 'bg-blue-100 text-blue-800';
      case 'SET':
        return 'bg-green-100 text-green-800';
      case 'DEL':
        return 'bg-red-100 text-red-800';
      case 'EXPIRE':
        return 'bg-yellow-100 text-yellow-800';
      case 'FLUSH':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (duration: number) => {
    if (duration < 1) return `${(duration * 1000).toFixed(0)}μs`;
    if (duration < 1000) return `${duration.toFixed(1)}ms`;
    return `${(duration / 1000).toFixed(1)}s`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Operações Recentes</h3>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          Últimas {operations.length} operações
        </div>
      </div>

      {operations.length === 0 ? (
        <div className="text-center py-8">
          <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma operação registrada</p>
        </div>
      ) : (
        <div className="space-y-3">
          {operations.map((operation) => (
            <div
              key={operation.id}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              {/* Status */}
              <div className="flex-shrink-0 mr-4">
                {operation.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>

              {/* Operação */}
              <div className="flex-shrink-0 mr-4">
                <div className="flex items-center">
                  {getOperationIcon(operation.operation)}
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getOperationColor(operation.operation)}`}>
                    {operation.operation}
                  </span>
                </div>
              </div>

              {/* Detalhes */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {operation.key}
                  </p>
                  {operation.value && (
                    <span className="ml-2 text-xs text-gray-500 truncate max-w-xs">
                      = {operation.value.length > 50 ? `${operation.value.substring(0, 50)}...` : operation.value}
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{formatTimestamp(operation.timestamp)}</span>
                  {operation.duration && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{formatDuration(operation.duration)}</span>
                    </>
                  )}
                  {operation.ttl && (
                    <>
                      <span className="mx-2">•</span>
                      <span>TTL: {operation.ttl}s</span>
                    </>
                  )}
                </div>
                {operation.error && (
                  <p className="text-xs text-red-600 mt-1">{operation.error}</p>
                )}
              </div>

              {/* Duração */}
              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-medium text-gray-900">
                  {formatDuration(operation.duration)}
                </p>
                <p className="text-xs text-gray-500">duração</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estatísticas das operações */}
      {operations.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {operations.filter(op => op.operation === 'GET').length}
              </p>
              <p className="text-sm text-gray-500">GET</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {operations.filter(op => op.operation === 'SET').length}
              </p>
              <p className="text-sm text-gray-500">SET</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {operations.filter(op => op.operation === 'DEL').length}
              </p>
              <p className="text-sm text-gray-500">DEL</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {operations.filter(op => !op.success).length}
              </p>
              <p className="text-sm text-gray-500">Erros</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
