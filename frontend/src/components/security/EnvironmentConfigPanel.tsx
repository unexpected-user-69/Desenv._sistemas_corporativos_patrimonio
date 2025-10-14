// Painel de configuração de ambiente

import React, { useState, useEffect } from 'react';
import { EnvironmentConfig } from '../../types/security';
import { securityService } from '../../services/security';

export const EnvironmentConfigPanel: React.FC = () => {
  const [config, setConfig] = useState<EnvironmentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editConfig, setEditConfig] = useState<Partial<EnvironmentConfig>>({});

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await securityService.getEnvironmentConfig();
      setConfig(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditConfig(config || {});
  };

  const handleSave = async () => {
    try {
      if (config) {
        const updatedConfig = await securityService.updateEnvironmentConfig(editConfig);
        setConfig(updatedConfig);
        setIsEditing(false);
        setEditConfig({});
      }
    } catch (err) {
      setError('Erro ao salvar configuração');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditConfig({});
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'development': return 'bg-blue-100 text-blue-800';
      case 'staging': return 'bg-yellow-100 text-yellow-800';
      case 'production': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          onClick={loadData}
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
        <h2 className="text-lg font-semibold text-gray-900">Configuração de Ambiente</h2>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
            onClick={loadData}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar
          </button>
        </div>
      </div>

      {/* Configuração Geral */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuração Geral</h3>
        {config && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ambiente
              </label>
              {isEditing ? (
                <select
                  value={editConfig.nodeEnv || config.nodeEnv}
                  onChange={(e) => setEditConfig({ ...editConfig, nodeEnv: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              ) : (
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getEnvironmentColor(config.nodeEnv)}`}>
                  {config.nodeEnv.toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Porta
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={editConfig.port || config.port}
                  onChange={(e) => setEditConfig({ ...editConfig, port: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm text-gray-900">{config.port}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Configuração de Logging */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuração de Logging</h3>
        {config && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível de Log
              </label>
              {isEditing ? (
                <select
                  value={editConfig.logging?.level || config.logging.level}
                  onChange={(e) => setEditConfig({ 
                    ...editConfig, 
                    logging: { ...editConfig.logging, level: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="error">Error</option>
                  <option value="warn">Warn</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{config.logging.level}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formato
              </label>
              {isEditing ? (
                <select
                  value={editConfig.logging?.format || config.logging.format}
                  onChange={(e) => setEditConfig({ 
                    ...editConfig, 
                    logging: { ...editConfig.logging, format: e.target.value } 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="combined">Combined</option>
                  <option value="common">Common</option>
                  <option value="dev">Development</option>
                  <option value="short">Short</option>
                  <option value="tiny">Tiny</option>
                </select>
              ) : (
                <p className="text-sm text-gray-900">{config.logging.format}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Console Habilitado
              </label>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={editConfig.logging?.enableConsole ?? config.logging.enableConsole}
                  onChange={(e) => setEditConfig({ 
                    ...editConfig, 
                    logging: { ...editConfig.logging, enableConsole: e.target.checked } 
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              ) : (
                <p className="text-sm text-gray-900">{config.logging.enableConsole ? 'Sim' : 'Não'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arquivo Habilitado
              </label>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={editConfig.logging?.enableFile ?? config.logging.enableFile}
                  onChange={(e) => setEditConfig({ 
                    ...editConfig, 
                    logging: { ...editConfig.logging, enableFile: e.target.checked } 
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              ) : (
                <p className="text-sm text-gray-900">{config.logging.enableFile ? 'Sim' : 'Não'}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Resumo das Configurações */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo das Configurações</h3>
        {config && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">CORS</h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  Origens: {Array.isArray(config.cors.origin) ? config.cors.origin.length : 1}
                </p>
                <p className="text-xs text-gray-600">
                  Métodos: {config.cors.methods.length}
                </p>
                <p className="text-xs text-gray-600">
                  Credenciais: {config.cors.credentials ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rate Limiting</h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  Janela: {config.rateLimit.windowMs / 1000}s
                </p>
                <p className="text-xs text-gray-600">
                  Máximo: {config.rateLimit.maxRequests} requests
                </p>
                <p className="text-xs text-gray-600">
                  Headers: {config.rateLimit.standardHeaders ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Compressão</h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  Habilitado: {config.compression.enabled ? 'Sim' : 'Não'}
                </p>
                <p className="text-xs text-gray-600">
                  Nível: {config.compression.level}
                </p>
                <p className="text-xs text-gray-600">
                  Threshold: {config.compression.threshold} bytes
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Headers de Segurança</h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  CSP: {config.security.helmet.contentSecurityPolicy ? 'Sim' : 'Não'}
                </p>
                <p className="text-xs text-gray-600">
                  HSTS: {config.security.helmet.hsts ? 'Sim' : 'Não'}
                </p>
                <p className="text-xs text-gray-600">
                  XSS Filter: {config.security.helmet.xssFilter ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Logging</h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  Nível: {config.logging.level}
                </p>
                <p className="text-xs text-gray-600">
                  Formato: {config.logging.format}
                </p>
                <p className="text-xs text-gray-600">
                  Console: {config.logging.enableConsole ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sistema</h4>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  Ambiente: {config.nodeEnv}
                </p>
                <p className="text-xs text-gray-600">
                  Porta: {config.port}
                </p>
                <p className="text-xs text-gray-600">
                  Status: <span className="text-green-600">Ativo</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
