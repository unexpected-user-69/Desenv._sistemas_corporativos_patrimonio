// Componente de métricas de produção

import React from 'react';
import { MetricsData } from '../../types/production';

interface Props {
  metrics: MetricsData;
}

export const ProductionMetrics: React.FC<Props> = ({ metrics }) => {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Métricas de Produção
        </h2>
        <p className="text-sm text-gray-600">
          Visão detalhada das métricas de performance e segurança
        </p>
      </div>

      {/* Métricas de Requests */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Métricas de Requests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              {metrics.requests.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Requests</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              {metrics.performance.averageResponseTime}ms
            </p>
            <p className="text-sm text-gray-600">Tempo Médio de Resposta</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              {metrics.performance.throughput}
            </p>
            <p className="text-sm text-gray-600">Throughput (req/s)</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">
              {metrics.performance.p95Latency}ms
            </p>
            <p className="text-sm text-gray-600">Latência P95</p>
          </div>
        </div>
      </div>

      {/* Distribuição por Método HTTP */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribuição por Método HTTP
        </h3>
        <div className="space-y-3">
          {Object.entries(metrics.requests.byMethod).map(([method, count]) => {
            const percentage = (count / metrics.requests.total) * 100;
            const methodColors = {
              GET: 'bg-blue-500',
              POST: 'bg-green-500',
              PUT: 'bg-yellow-500',
              DELETE: 'bg-red-500',
              PATCH: 'bg-purple-500',
            };

            return (
              <div key={method} className="flex items-center">
                <div className="w-16 text-sm font-medium text-gray-700">
                  {method}
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${methodColors[method as keyof typeof methodColors] || 'bg-gray-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-sm text-gray-600 text-right">
                  {count.toLocaleString()} ({percentage.toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Codes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribuição por Status Code
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(metrics.requests.byStatus).map(([status, count]) => {
            const percentage = (count / metrics.requests.total) * 100;
            const statusColor = status.startsWith('2')
              ? 'text-green-600'
              : status.startsWith('4')
                ? 'text-yellow-600'
                : status.startsWith('5')
                  ? 'text-red-600'
                  : 'text-gray-600';

            return (
              <div
                key={status}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <p className={`text-2xl font-bold ${statusColor}`}>{status}</p>
                <p className="text-sm text-gray-600">
                  {count.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {percentage.toFixed(1)}%
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rate Limiting */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Métricas de Rate Limiting
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {metrics.rateLimiting.totalRequests.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total de Requests</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {metrics.rateLimiting.blockedRequests.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Requests Bloqueados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {metrics.rateLimiting.averageRequestsPerMinute}
            </p>
            <p className="text-sm text-gray-600">Média por Minuto</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-3">
            Top Clientes
          </h4>
          <div className="space-y-2">
            {metrics.rateLimiting.topClients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">
                    {client.ip}
                  </span>
                  <span className="text-sm text-gray-600">
                    {client.requests} requests
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {client.blocked > 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {client.blocked} bloqueados
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    {(
                      (client.requests / metrics.rateLimiting.totalRequests) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compressão */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Métricas de Compressão
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {metrics.compression.compressedRequests.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Requests Comprimidos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {formatBytes(metrics.compression.totalOriginalSize)}
            </p>
            <p className="text-sm text-gray-600">Tamanho Original</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {formatBytes(metrics.compression.totalCompressedSize)}
            </p>
            <p className="text-sm text-gray-600">Tamanho Comprimido</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {formatBytes(metrics.compression.bytesSaved)}
            </p>
            <p className="text-sm text-gray-600">Bytes Economizados</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Taxa de Compressão Média
            </span>
            <span className="text-sm font-medium text-gray-900">
              {(metrics.compression.averageCompressionRatio * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${metrics.compression.averageCompressionRatio * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Métricas de Segurança
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {metrics.security.blockedRequests}
            </p>
            <p className="text-sm text-gray-600">Requests Bloqueados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {metrics.security.suspiciousActivity}
            </p>
            <p className="text-sm text-gray-600">Atividade Suspeita</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {metrics.security.corsViolations}
            </p>
            <p className="text-sm text-gray-600">Violações CORS</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {metrics.security.invalidHeaders}
            </p>
            <p className="text-sm text-gray-600">Headers Inválidos</p>
          </div>
        </div>
      </div>

      {/* Performance por Endpoint */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Requests por Endpoint
        </h3>
        <div className="space-y-3">
          {Object.entries(metrics.requests.byEndpoint).map(
            ([endpoint, count]) => {
              const percentage = (count / metrics.requests.total) * 100;

              return (
                <div key={endpoint} className="flex items-center">
                  <div className="w-48 text-sm font-medium text-gray-700 truncate">
                    {endpoint}
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-20 text-sm text-gray-600 text-right">
                    {count.toLocaleString()} ({percentage.toFixed(1)}%)
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};
