// Painel de configuração e monitoramento de Headers de Segurança

import React, { useState, useEffect } from 'react';
import { SecurityHeaders, SecurityStats } from '../../types/security';
import { securityService } from '../../services/security';

export const SecurityHeadersPanel: React.FC = () => {
  const [headers, setHeaders] = useState<SecurityHeaders | null>(null);
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editHeaders, setEditHeaders] = useState<Partial<SecurityHeaders>>({});

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [headersData, statsData] = await Promise.all([
        securityService.getSecurityHeaders(),
        securityService.getSecurityStats(),
      ]);
      setHeaders(headersData);
      setStats(statsData);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditHeaders(headers || {});
  };

  const handleSave = async () => {
    try {
      if (headers) {
        const updatedHeaders =
          await securityService.updateSecurityHeaders(editHeaders);
        setHeaders(updatedHeaders);
        setIsEditing(false);
        setEditHeaders({});
      }
    } catch {
      setError('Erro ao salvar configuração');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditHeaders({});
  };

  const addCustomHeader = () => {
    const customHeaders = editHeaders.customHeaders || [];
    setEditHeaders({
      ...editHeaders,
      customHeaders: [...customHeaders, { name: '', value: '', enabled: true }],
    });
  };

  const removeCustomHeader = (index: number) => {
    const customHeaders = editHeaders.customHeaders || [];
    setEditHeaders({
      ...editHeaders,
      customHeaders: customHeaders.filter((_, i) => i !== index),
    });
  };

  const updateCustomHeader = (
    index: number,
    field: 'name' | 'value' | 'enabled',
    value: string | boolean,
  ) => {
    const customHeaders = editHeaders.customHeaders || [];
    const newHeaders = [...customHeaders];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setEditHeaders({ ...editHeaders, customHeaders: newHeaders });
  };

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
        <p className="text-sm text-red-700">{error}</p>
        <button
          onClick={() => void loadData()}
          className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Headers de Segurança
        </h2>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={() => void handleEdit()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </button>
          ) : (
            <>
              <button
                onClick={() => void handleSave()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Salvar
              </button>
              <button
                onClick={() => void handleCancel()}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
            </>
          )}
          <button
            onClick={() => void loadData()}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Atualizar
          </button>
        </div>
      </div>

      {/* Headers do Helmet */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Headers do Helmet
        </h3>
        {headers && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(headers.helmet).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </p>
                  <p className="text-xs text-gray-500">
                    {key === 'contentSecurityPolicy' && 'Proteção contra XSS'}
                    {key === 'crossOriginEmbedderPolicy' &&
                      'Política de incorporação'}
                    {key === 'crossOriginOpenerPolicy' &&
                      'Política de abertura'}
                    {key === 'crossOriginResourcePolicy' &&
                      'Política de recursos'}
                    {key === 'dnsPrefetchControl' && 'Controle de DNS prefetch'}
                    {key === 'frameguard' && 'Proteção contra clickjacking'}
                    {key === 'hidePoweredBy' && 'Ocultar tecnologia'}
                    {key === 'hsts' && 'HTTP Strict Transport Security'}
                    {key === 'ieNoOpen' && 'Proteção IE'}
                    {key === 'noSniff' && 'Proteção MIME sniffing'}
                    {key === 'originAgentCluster' && 'Cluster de agente'}
                    {key === 'permittedCrossDomainPolicies' &&
                      'Políticas cross-domain'}
                    {key === 'referrerPolicy' && 'Política de referrer'}
                    {key === 'xssFilter' && 'Filtro XSS'}
                  </p>
                </div>
                {isEditing ? (
                  <input
                    type="checkbox"
                    checked={
                      editHeaders.helmet?.[
                        key as keyof typeof headers.helmet
                      ] ?? value
                    }
                    onChange={(e) =>
                      setEditHeaders({
                        ...editHeaders,
                        helmet: {
                          ...headers.helmet,
                          ...editHeaders.helmet,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {value ? 'Ativo' : 'Inativo'}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Headers Customizados */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Headers Customizados
          </h3>
          {isEditing && (
            <button
              onClick={addCustomHeader}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Adicionar Header
            </button>
          )}
        </div>

        {headers && (
          <div className="space-y-4">
            {(isEditing
              ? editHeaders.customHeaders
              : headers.customHeaders
            )?.map((header, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={header.name}
                    onChange={(e) =>
                      updateCustomHeader(index, 'name', e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Nome do header (ex: X-Custom-Header)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) =>
                      updateCustomHeader(index, 'value', e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="Valor do header"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={header.enabled}
                    onChange={(e) =>
                      updateCustomHeader(index, 'enabled', e.target.checked)
                    }
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                {isEditing && (
                  <button
                    onClick={() => removeCustomHeader(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Estatísticas de Segurança */}
      {stats && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Estatísticas de Segurança
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-blue-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">
                    Total de Requests
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {stats.totalRequests.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-red-600">
                    Requests Bloqueados
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    {stats.blockedRequests.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-orange-600">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-orange-600">
                    Taxa de Bloqueio
                  </p>
                  <p className="text-2xl font-bold text-orange-900">
                    {(
                      (stats.blockedRequests / stats.totalRequests) *
                      100
                    ).toFixed(1)}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Violações de Segurança */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-2">
              Violações de Segurança Recentes
            </h4>
            <div className="space-y-2">
              {stats.securityViolations.map((violation, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div>
                    <p className="text-sm font-medium text-red-900">
                      {violation.type}
                    </p>
                    <p className="text-xs text-red-600">
                      Última ocorrência:{' '}
                      {new Date(violation.lastOccurrence).toLocaleString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    {violation.count} ocorrências
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Violações */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">
              Top Violações
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo de Violação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contagem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentual
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.topViolations.map((violation, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {violation.violation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {violation.count.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-red-600 h-2 rounded-full"
                              style={{ width: `${violation.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {violation.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
