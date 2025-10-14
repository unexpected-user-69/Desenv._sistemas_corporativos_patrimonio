// Dashboard principal de funcionalidades avançadas de produção

import React, { useState, useEffect } from 'react';
import { ProductionDashboard as ProductionDashboardType } from '../../types/security';
import { securityService } from '../../services/security';
import { RateLimitPanel } from './RateLimitPanel';
import { CORSPanel } from './CORSPanel';
import { CompressionPanel } from './CompressionPanel';
import { SecurityHeadersPanel } from './SecurityHeadersPanel';
import { EnvironmentConfigPanel } from './EnvironmentConfigPanel';
import { ValidationPanel } from './ValidationPanel';
import { InterceptorPanel } from './InterceptorPanel';

export const ProductionDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<ProductionDashboardType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'rate-limit'
    | 'cors'
    | 'compression'
    | 'security'
    | 'environment'
    | 'validation'
    | 'interceptors'
  >('overview');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await securityService.getProductionDashboard();
      setDashboard(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar dashboard',
      );
      console.error('Erro ao carregar dashboard de produção:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
    const interval = setInterval(() => {
      void loadDashboard();
    }, 30000); // Atualizar a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSystemStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'critical':
        return '🚨';
      default:
        return '❓';
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
        <div className="flex items-center">
          <div className="text-red-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Erro ao carregar dashboard
            </h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={() => void loadDashboard()}
              className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center text-gray-500">
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard de Produção
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Monitoramento e configuração de funcionalidades avançadas de
              segurança e performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getSystemStatusColor(dashboard.systemStatus)}`}
            >
              {getSystemStatusIcon(dashboard.systemStatus)}{' '}
              {dashboard.systemStatus.toUpperCase()}
            </div>
            <button
              onClick={() => void loadDashboard()}
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
        <div className="mt-4 text-xs text-gray-500">
          Última atualização: {new Date(dashboard.lastUpdate).toLocaleString()}
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Visão Geral', icon: '📊' },
              { id: 'rate-limit', name: 'Rate Limiting', icon: '🚦' },
              { id: 'cors', name: 'CORS', icon: '🌐' },
              { id: 'compression', name: 'Compressão', icon: '🗜️' },
              { id: 'security', name: 'Segurança', icon: '🔒' },
              { id: 'environment', name: 'Ambiente', icon: '⚙️' },
              { id: 'validation', name: 'Validação', icon: '✅' },
              { id: 'interceptors', name: 'Interceptors', icon: '🔄' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | 'overview'
                      | 'rate-limit'
                      | 'cors'
                      | 'compression'
                      | 'security'
                      | 'environment'
                      | 'validation'
                      | 'interceptors',
                  )
                }
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Visão Geral do Sistema
              </h2>

              {/* Métricas Principais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        Rate Limiting
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {dashboard.rateLimit.blockedRequests}
                      </p>
                      <p className="text-xs text-blue-600">
                        Requests bloqueados
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
                      <p className="text-sm font-medium text-green-600">CORS</p>
                      <p className="text-2xl font-bold text-green-900">
                        {dashboard.cors.allowedOrigins.length}
                      </p>
                      <p className="text-xs text-green-600">
                        Origens permitidas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="text-purple-600">
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">
                        Compressão
                      </p>
                      <p className="text-2xl font-bold text-purple-900">
                        {Math.round(
                          dashboard.compression.compressionRatio * 100,
                        )}
                        %
                      </p>
                      <p className="text-xs text-purple-600">
                        Taxa de compressão
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
                        Segurança
                      </p>
                      <p className="text-2xl font-bold text-red-900">
                        {dashboard.security.blockedRequests}
                      </p>
                      <p className="text-xs text-red-600">
                        Violações bloqueadas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status dos Serviços */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Status dos Serviços
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Rate Limiting
                    </span>
                    <span className="text-green-600 text-sm">✅ Ativo</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      CORS
                    </span>
                    <span className="text-green-600 text-sm">✅ Ativo</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Compressão
                    </span>
                    <span className="text-green-600 text-sm">✅ Ativo</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Headers de Segurança
                    </span>
                    <span className="text-green-600 text-sm">✅ Ativo</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Validação
                    </span>
                    <span className="text-green-600 text-sm">✅ Ativo</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">
                      Interceptors
                    </span>
                    <span className="text-green-600 text-sm">✅ Ativo</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rate-limit' && <RateLimitPanel />}
          {activeTab === 'cors' && <CORSPanel />}
          {activeTab === 'compression' && <CompressionPanel />}
          {activeTab === 'security' && <SecurityHeadersPanel />}
          {activeTab === 'environment' && <EnvironmentConfigPanel />}
          {activeTab === 'validation' && <ValidationPanel />}
          {activeTab === 'interceptors' && <InterceptorPanel />}
        </div>
      </div>
    </div>
  );
};
