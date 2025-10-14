// Dashboard principal de utilitários de teste e qualidade de código

import React, { useState, useEffect } from 'react';
import type { 
  TestSuite, 
  QualityMetrics, 
  CoverageSummary,
  TestEnvironment,
  TestTemplate
} from '../../types/testing';
import { testingService } from '../../services/testing';
import { TestDoublesPanel } from './TestDoublesPanel';
import { MockConfigPanel } from './MockConfigPanel';
import { TestSuitesPanel } from './TestSuitesPanel';
import { QualityMetricsPanel } from './QualityMetricsPanel';
import { CoveragePanel } from './CoveragePanel';

interface TestingDashboardProps {
  refreshInterval?: number;
  autoRefresh?: boolean;
}

export const TestingDashboard: React.FC<TestingDashboardProps> = ({
  refreshInterval = 30000,
  autoRefresh = true
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'doubles' | 'mocks' | 'suites' | 'quality' | 'coverage'>('overview');
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics | null>(null);
  const [coverage, setCoverage] = useState<CoverageSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [suitesData, qualityData, coverageData, envData, templatesData] = await Promise.all([
        testingService.getTestSuites(),
        testingService.getQualityMetrics(),
        testingService.getCoverageReport(),
        testingService.getTestEnvironments(),
        testingService.getTestTemplates()
      ]);

      setTestSuites(suitesData);
      setQualityMetrics(qualityData);
      setCoverage(coverageData);
      setEnvironments(envData);
      setTemplates(templatesData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados de teste');
      console.error('Erro ao buscar dados de teste:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, autoRefresh]);

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: '📊' },
    { id: 'doubles', name: 'Test Doubles', icon: '🎭' },
    { id: 'mocks', name: 'Mocks', icon: '🎯' },
    { id: 'suites', name: 'Test Suites', icon: '🧪' },
    { id: 'quality', name: 'Qualidade', icon: '⭐' },
    { id: 'coverage', name: 'Cobertura', icon: '📈' }
  ];

  const getOverallStatus = () => {
    if (!testSuites.length) return { status: 'unknown', color: 'gray' };
    
    const totalTests = testSuites.reduce((sum, suite) => sum + (suite.results?.total || 0), 0);
    const passedTests = testSuites.reduce((sum, suite) => sum + (suite.results?.passed || 0), 0);
    const failedTests = testSuites.reduce((sum, suite) => sum + (suite.results?.failed || 0), 0);
    
    if (failedTests > 0) return { status: 'failed', color: 'red' };
    if (passedTests === totalTests) return { status: 'passed', color: 'green' };
    return { status: 'partial', color: 'yellow' };
  };

  const overallStatus = getOverallStatus();

  if (loading && !testSuites.length) {
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
            <h3 className="text-sm font-medium text-red-800">Erro ao carregar dados</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Geral dos Testes</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    overallStatus.color === 'green' ? 'bg-green-100 text-green-800' :
                    overallStatus.color === 'red' ? 'bg-red-100 text-red-800' :
                    overallStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {overallStatus.status === 'passed' ? '✅ Todos os testes passaram' :
                     overallStatus.status === 'failed' ? '❌ Alguns testes falharam' :
                     overallStatus.status === 'partial' ? '⚠️ Testes parciais' :
                     '❓ Status desconhecido'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {testSuites.reduce((sum, suite) => sum + (suite.results?.total || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total de Testes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {testSuites.reduce((sum, suite) => sum + (suite.results?.passed || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Testes Passaram</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {testSuites.reduce((sum, suite) => sum + (suite.results?.failed || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Testes Falharam</div>
                </div>
              </div>
            </div>

            {/* Quality Overview */}
            {qualityMetrics && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Qualidade</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {qualityMetrics.codeQuality.maintainability}%
                    </div>
                    <div className="text-sm text-gray-600">Manutenibilidade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {qualityMetrics.codeQuality.reliability}%
                    </div>
                    <div className="text-sm text-gray-600">Confiabilidade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {qualityMetrics.codeQuality.security}%
                    </div>
                    <div className="text-sm text-gray-600">Segurança</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {qualityMetrics.codeQuality.performance}%
                    </div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                </div>
              </div>
            )}

            {/* Coverage Overview */}
            {coverage && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Cobertura de Código</h2>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {coverage.overall}%
                  </div>
                  <div className="text-sm text-gray-600">Cobertura Geral</div>
                  <div className="mt-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      coverage.overall >= 80 ? 'bg-green-100 text-green-800' :
                      coverage.overall >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {coverage.overall >= 80 ? '✅ Excelente' :
                       coverage.overall >= 60 ? '⚠️ Aceitável' :
                       '❌ Precisa melhorar'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Test Suites */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Suites de Teste Recentes</h2>
              <div className="space-y-3">
                {testSuites.slice(0, 5).map((suite) => (
                  <div key={suite.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{suite.name}</h3>
                      <p className="text-sm text-gray-600">{suite.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        suite.status === 'completed' ? 'bg-green-100 text-green-800' :
                        suite.status === 'running' ? 'bg-blue-100 text-blue-800' :
                        suite.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {suite.status}
                      </span>
                      {suite.results && (
                        <span className="text-sm text-gray-600">
                          {suite.results.passed}/{suite.results.total} testes
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'doubles':
        return <TestDoublesPanel />;
      case 'mocks':
        return <MockConfigPanel />;
      case 'suites':
        return <TestSuitesPanel testSuites={testSuites} onRefresh={fetchData} />;
      case 'quality':
        return <QualityMetricsPanel qualityMetrics={qualityMetrics} />;
      case 'coverage':
        return <CoveragePanel coverage={coverage} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Testes</h1>
          <p className="text-sm text-gray-600">
            Utilitários de teste, mocks e qualidade de código
          </p>
          <p className="text-xs text-gray-500">
            Última atualização: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          Atualizar
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
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

      {/* Main Content */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
};
