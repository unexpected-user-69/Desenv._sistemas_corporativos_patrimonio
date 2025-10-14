// Componente de logs de requisições

import React, { useState } from 'react';
import { RequestLog } from '../../types/production';

interface Props {
  logs: RequestLog[];
}

export const RequestLogs: React.FC<Props> = ({ logs }) => {
  const [filter, setFilter] = useState({
    method: 'all',
    statusCode: 'all',
    search: ''
  });
  const [sortBy, setSortBy] = useState<'timestamp' | 'duration' | 'statusCode'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedLog, setSelectedLog] = useState<RequestLog | null>(null);

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600 bg-green-100';
    if (statusCode >= 300 && statusCode < 400) return 'text-blue-600 bg-blue-100';
    if (statusCode >= 400 && statusCode < 500) return 'text-yellow-600 bg-yellow-100';
    if (statusCode >= 500) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-blue-600 bg-blue-100';
      case 'POST': return 'text-green-600 bg-green-100';
      case 'PUT': return 'text-yellow-600 bg-yellow-100';
      case 'DELETE': return 'text-red-600 bg-red-100';
      case 'PATCH': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const filteredAndSortedLogs = logs
    .filter(log => {
      if (filter.method !== 'all' && log.method !== filter.method) return false;
      if (filter.statusCode !== 'all' && log.statusCode.toString() !== filter.statusCode) return false;
      if (filter.search && !log.url.toLowerCase().includes(filter.search.toLowerCase()) && 
          !log.ip.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'timestamp':
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
          break;
        case 'duration':
          aValue = a.duration;
          bValue = b.duration;
          break;
        case 'statusCode':
          aValue = a.statusCode;
          bValue = b.statusCode;
          break;
        default:
          return 0;
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const methods = [...new Set(logs.map(log => log.method))];
  const statusCodes = [...new Set(logs.map(log => log.statusCode))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Logs de Requisições</h2>
        <p className="text-sm text-gray-600">
          Histórico detalhado de requisições HTTP
        </p>
      </div>

      {/* Filtros e Controles */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Método HTTP</label>
            <select
              value={filter.method}
              onChange={(e) => setFilter({ ...filter, method: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              {methods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status Code</label>
            <select
              value={filter.statusCode}
              onChange={(e) => setFilter({ ...filter, statusCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              {statusCodes.map(code => (
                <option key={code} value={code.toString()}>{code}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="URL ou IP..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="timestamp">Data/Hora</option>
                <option value="duration">Duração</option>
                <option value="statusCode">Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Mostrando {filteredAndSortedLogs.length} de {logs.length} logs
          </p>
          <button
            onClick={() => setFilter({ method: 'all', statusCode: 'all', search: '' })}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Lista de Logs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duração
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(log.method)}`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={log.url}>
                      {log.url}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.statusCode)}`}>
                      {log.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.duration}ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedLog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Detalhes da Requisição</h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Método</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.method}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status Code</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.statusCode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duração</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.duration}ms</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tamanho da Resposta</label>
                    <p className="mt-1 text-sm text-gray-900">{formatBytes(selectedLog.responseSize)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IP</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.ip}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data/Hora</label>
                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">URL</label>
                  <p className="mt-1 text-sm text-gray-900 break-all">{selectedLog.url}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">User Agent</label>
                  <p className="mt-1 text-sm text-gray-900 break-all">{selectedLog.userAgent}</p>
                </div>

                {selectedLog.query && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Query Parameters</label>
                    <pre className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(selectedLog.query, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog.params && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Path Parameters</label>
                    <pre className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(selectedLog.params, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog.body && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Request Body</label>
                    <pre className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(selectedLog.body, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog.rateLimitStatus && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rate Limit Status</label>
                    <div className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">
                      <p>Total: {selectedLog.rateLimitStatus.total}</p>
                      <p>Restantes: {selectedLog.rateLimitStatus.remaining}</p>
                      <p>Limite: {selectedLog.rateLimitStatus.limit}</p>
                      <p>Reset: {new Date(selectedLog.rateLimitStatus.resetTime).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {selectedLog.compressionApplied && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Compressão</label>
                    <div className="mt-1 text-sm text-gray-900 bg-gray-100 p-2 rounded">
                      <p>Compressão aplicada: {selectedLog.compressionApplied ? 'Sim' : 'Não'}</p>
                      {selectedLog.compressionRatio && (
                        <p>Taxa de compressão: {(selectedLog.compressionRatio * 100).toFixed(1)}%</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
