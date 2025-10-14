// Dashboard principal de funcionalidades de produção

import React, { useState, useEffect } from 'react';
import { ProductionDashboard as ProductionDashboardType, MetricsData } from '../../types/production';
import { productionService } from '../../services/production';
import { RateLimitConfig } from './RateLimitConfig';
import { CorsConfig } from './CorsConfig';
import { CompressionConfig } from './CompressionConfig';
import { SecurityConfig } from './SecurityConfig';
import { ProductionMetrics } from './ProductionMetrics';
import { ProductionAlerts } from './ProductionAlerts';
import { RequestLogs } from './RequestLogs';

type TabType = 'overview' | 'rate-limit' | 'cors' | 'compression' | 'security' | 'metrics' | 'alerts' | 'logs';

export const ProductionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [dashboard, setDashboard] = useState<ProductionDashboardType | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashboardData, metricsData] = await Promise.all([
        productionService.getProductionDashboard(),
        productionService.getMetrics()
      ]);

      setDashboard(dashboardData);
      setMetrics(metricsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: '📊' },
    { id: 'rate-limit', name: 'Rate Limiting', icon: '⏱️' },
    { id: 'cors', name: 'CORS', icon: '🌐' },
    { id: 'compression', name: 'Compressão', icon: '🗜️' },
    { id: 'security', name: 'Segurança', icon: '🔒' },
    { id: 'metrics', name: 'Métricas', icon: '📈' },
    { id: 'alerts', name: 'Alertas', icon: '🚨' },
    { id: 'logs', name: 'Logs', icon: '📋' }
  ];

  const renderContent = () => {
    if (!dashboard || !metrics) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Requests</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.requests.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Requests Bloqueados</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.rateLimiting.blockedRequests.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Compressão Aplicada</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.compression.compressedRequests.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ameaças de Segurança</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.security.suspiciousActivity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status do Ambiente */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status do Ambiente</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Ambiente</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    dashboard.environment.name === 'production' 
                      ? 'bg-red-100 text-red-800' 
                      : dashboard.environment.name === 'staging'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {dashboard.environment.name.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">API URL</span>
                  <span className="text-sm text-gray-900">{dashboard.environment.apiUrl}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-600">Logging Level</span>
                  <span className="text-sm text-gray-900">{dashboard.environment.loggingLevel.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Performance Atual */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Atual</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">{metrics.performance.averageResponseTime}ms</p>
                  <p className="text-sm text-gray-600">Tempo Médio de Resposta</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">{metrics.performance.p95Latency}ms</p>
                  <p className="text-sm text-gray-600">Latência P95</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">{metrics.performance.throughput}</p>
                  <p className="text-sm text-gray-600">Throughput (req/s)</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold text-gray-900">{(metrics.compression.averageCompressionRatio * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Taxa de Compressão</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rate-limit':
        return <RateLimitConfig config={dashboard.rateLimitConfig} onUpdate={loadDashboard} />;
      case 'cors':
        return <CorsConfig config={dashboard.corsConfig} onUpdate={loadDashboard} />;
      case 'compression':
        return <CompressionConfig config={dashboard.compressionConfig} onUpdate={loadDashboard} />;
      case 'security':
        return <SecurityConfig config={dashboard.securityConfig} onUpdate={loadDashboard} />;
      case 'metrics':
        return <ProductionMetrics metrics={metrics} />;
      case 'alerts':
        return <ProductionAlerts alerts={dashboard.alerts} onResolve={loadDashboard} />;
      case 'logs':
        return <RequestLogs logs={dashboard.recentLogs} />;
      default:
        return null;
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
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erro ao carregar dashboard</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Produção</h1>
          <p className="text-sm text-gray-600">
            Monitoramento e configuração de funcionalidades de produção
          </p>
        </div>
        <button
          onClick={loadDashboard}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
