// Painel de configuração e monitoramento de CORS

import React, { useState, useEffect } from 'react';
import { CORSConfig, CORSStats } from '../../types/security';
import { securityService } from '../../services/security';

export const CORSPanel: React.FC = () => {
  const [config, setConfig] = useState<CORSConfig | null>(null);
  const [stats, setStats] = useState<CORSStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editConfig, setEditConfig] = useState<Partial<CORSConfig>>({});

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [configData, statsData] = await Promise.all([
        securityService.getCORSConfig(),
        securityService.getCORSStats(),
      ]);
      setConfig(configData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditConfig(config || {});
  };

  const handleSave = async () => {
    try {
      if (config) {
        const updatedConfig =
          await securityService.updateCORSConfig(editConfig);
        setConfig(updatedConfig);
        setIsEditing(false);
        setEditConfig({});
      }
    } catch {
      setError('Erro ao salvar configuração');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditConfig({});
  };

  const addOrigin = () => {
    const origins = Array.isArray(editConfig.origin) ? editConfig.origin : [];
    setEditConfig({ ...editConfig, origin: [...origins, ''] });
  };

  const removeOrigin = (index: number) => {
    const origins = Array.isArray(editConfig.origin) ? editConfig.origin : [];
    setEditConfig({
      ...editConfig,
      origin: origins.filter((_, i) => i !== index),
    });
  };

  const updateOrigin = (index: number, value: string) => {
    const origins = Array.isArray(editConfig.origin) ? editConfig.origin : [];
    const newOrigins = [...origins];
    newOrigins[index] = value;
    setEditConfig({ ...editConfig, origin: newOrigins });
  };

  const addMethod = () => {
    const methods = editConfig.methods || [];
    setEditConfig({ ...editConfig, methods: [...methods, ''] });
  };

  const removeMethod = (index: number) => {
    const methods = editConfig.methods || [];
    setEditConfig({
      ...editConfig,
      methods: methods.filter((_, i) => i !== index),
    });
  };

  const updateMethod = (index: number, value: string) => {
    const methods = editConfig.methods || [];
    const newMethods = [...methods];
    newMethods[index] = value;
    setEditConfig({ ...editConfig, methods: newMethods });
  };

  const addHeader = (type: 'allowed' | 'exposed') => {
    const headers =
      editConfig[type === 'allowed' ? 'allowedHeaders' : 'exposedHeaders'] ||
      [];
    setEditConfig({
      ...editConfig,
      [type === 'allowed' ? 'allowedHeaders' : 'exposedHeaders']: [
        ...headers,
        '',
      ],
    });
  };

  const removeHeader = (type: 'allowed' | 'exposed', index: number) => {
    const headers =
      editConfig[type === 'allowed' ? 'allowedHeaders' : 'exposedHeaders'] ||
      [];
    setEditConfig({
      ...editConfig,
      [type === 'allowed' ? 'allowedHeaders' : 'exposedHeaders']:
        headers.filter((_, i) => i !== index),
    });
  };

  const updateHeader = (
    type: 'allowed' | 'exposed',
    index: number,
    value: string,
  ) => {
    const headers =
      editConfig[type === 'allowed' ? 'allowedHeaders' : 'exposedHeaders'] ||
      [];
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setEditConfig({
      ...editConfig,
      [type === 'allowed' ? 'allowedHeaders' : 'exposedHeaders']: newHeaders,
    });
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
          onClick={() => {
            void loadData();
          }}
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
          CORS (Cross-Origin Resource Sharing)
        </h2>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
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
                onClick={() => {
                  void handleSave();
                }}
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
                onClick={handleCancel}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
            </>
          )}
          <button
            onClick={() => {
              void loadData();
            }}
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

      {/* Configuração */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Configuração
        </h3>
        {config && (
          <div className="space-y-6">
            {/* Origins */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origens Permitidas
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  {(Array.isArray(editConfig.origin)
                    ? editConfig.origin
                    : []
                  ).map((origin, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => updateOrigin(index, e.target.value)}
                        placeholder="https://example.com"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeOrigin(index)}
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
                    </div>
                  ))}
                  <button
                    onClick={addOrigin}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Adicionar Origem
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  {(Array.isArray(config.origin)
                    ? config.origin
                    : [config.origin]
                  ).map((origin, index) => (
                    <p
                      key={index}
                      className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded"
                    >
                      {origin}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Methods */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Métodos Permitidos
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  {(editConfig.methods || []).map((method, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <select
                        value={method}
                        onChange={(e) => updateMethod(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecione um método</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                        <option value="OPTIONS">OPTIONS</option>
                        <option value="HEAD">HEAD</option>
                      </select>
                      <button
                        onClick={() => removeMethod(index)}
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
                    </div>
                  ))}
                  <button
                    onClick={addMethod}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Adicionar Método
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {config.methods.map((method, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Headers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headers Permitidos
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(editConfig.allowedHeaders || []).map((header, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={header}
                          onChange={(e) =>
                            updateHeader('allowed', index, e.target.value)
                          }
                          placeholder="Content-Type"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeHeader('allowed', index)}
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
                      </div>
                    ))}
                    <button
                      onClick={() => addHeader('allowed')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Adicionar Header
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {config.allowedHeaders.map((header, index) => (
                      <p
                        key={index}
                        className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded"
                      >
                        {header}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headers Expostos
                </label>
                {isEditing ? (
                  <div className="space-y-2">
                    {(editConfig.exposedHeaders || []).map((header, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={header}
                          onChange={(e) =>
                            updateHeader('exposed', index, e.target.value)
                          }
                          placeholder="X-Total-Count"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeHeader('exposed', index)}
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
                      </div>
                    ))}
                    <button
                      onClick={() => addHeader('exposed')}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Adicionar Header
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {config.exposedHeaders.map((header, index) => (
                      <p
                        key={index}
                        className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded"
                      >
                        {header}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Outras Configurações */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credenciais
                </label>
                {isEditing ? (
                  <input
                    type="checkbox"
                    checked={editConfig.credentials ?? config.credentials}
                    onChange={(e) =>
                      setEditConfig({
                        ...editConfig,
                        credentials: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                ) : (
                  <p className="text-sm text-gray-900">
                    {config.credentials ? 'Habilitado' : 'Desabilitado'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Age (segundos)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editConfig.maxAge ?? config.maxAge}
                    onChange={(e) =>
                      setEditConfig({
                        ...editConfig,
                        maxAge: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{config.maxAge}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status de Sucesso
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={
                      editConfig.optionsSuccessStatus ??
                      config.optionsSuccessStatus
                    }
                    onChange={(e) =>
                      setEditConfig({
                        ...editConfig,
                        optionsSuccessStatus: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-sm text-gray-900">
                    {config.optionsSuccessStatus}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      {stats && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Estatísticas
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

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-green-600">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">
                    Preflight Requests
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {stats.preflightRequests.toLocaleString()}
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
          </div>

          {/* Origens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">
                Origens Permitidas
              </h4>
              <div className="space-y-1">
                {stats.allowedOrigins.map((origin, index) => (
                  <p
                    key={index}
                    className="text-sm text-gray-900 bg-green-50 px-3 py-2 rounded border border-green-200"
                  >
                    ✅ {origin}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">
                Origens Bloqueadas
              </h4>
              <div className="space-y-1">
                {stats.blockedOrigins.map((origin, index) => (
                  <p
                    key={index}
                    className="text-sm text-gray-900 bg-red-50 px-3 py-2 rounded border border-red-200"
                  >
                    ❌ {origin}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Top Origens */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">
              Top Origens por Atividade
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Origem
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.topOrigins.map((origin, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {origin.origin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {origin.requests.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            stats.allowedOrigins.includes(origin.origin)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {stats.allowedOrigins.includes(origin.origin)
                            ? 'Permitido'
                            : 'Bloqueado'}
                        </span>
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
