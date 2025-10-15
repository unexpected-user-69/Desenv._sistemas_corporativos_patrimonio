// Componente para testes de performance (M3)

import React, { useState, useEffect } from 'react';
import {
  LoadTestConfig,
  LoadTestResult,
  StressTestConfig,
  StressTestResult,
} from '../../types/performance';
// import { performanceService } from '../../services/performance';

interface PerformanceTestingProps {
  onTestComplete?: (result: LoadTestResult | StressTestResult) => void;
}

export const PerformanceTesting: React.FC<PerformanceTestingProps> = ({
  onTestComplete,
}) => {
  const [testConfigs, setTestConfigs] = useState<LoadTestConfig[]>([]);
  const [activeTest, setActiveTest] = useState<LoadTestResult | null>(null);
  const [testResults, setTestResults] = useState<LoadTestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConfig, setSelectedConfig] = useState<string>('');
  const [testType, setTestType] = useState<'load' | 'stress'>('load');

  useEffect(() => {
    loadTestConfigs();
    loadTestResults();
  }, []);

  const loadTestConfigs = async () => {
    try {
      const configs = await performanceService.getTestConfigs();
      setTestConfigs(configs);
      if (configs.length > 0 && !selectedConfig) {
        setSelectedConfig(configs[0].id);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar configurações',
      );
    }
  };

  const loadTestResults = async () => {
    try {
      const results = await performanceService.getTestResults({ limit: 10 });
      setTestResults(results.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar resultados',
      );
    }
  };

  const startTest = async () => {
    if (!selectedConfig) return;

    try {
      setLoading(true);
      setError(null);

      let result: LoadTestResult | StressTestResult;
      if (testType === 'load') {
        result = await performanceService.startLoadTest(selectedConfig);
      } else {
        result = await performanceService.startStressTest(selectedConfig);
      }

      setActiveTest(result);
      onTestComplete?.(result);

      // Monitorar progresso do teste
      monitorTest(result.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao iniciar teste');
    } finally {
      setLoading(false);
    }
  };

  const stopTest = async () => {
    if (!activeTest) return;

    try {
      await performanceService.stopTest(activeTest.id);
      setActiveTest(null);
      loadTestResults();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao parar teste');
    }
  };

  const monitorTest = async (testId: string) => {
    const interval = setInterval(async () => {
      try {
        const result = await performanceService.getTestResult(testId);
        setActiveTest(result);

        if (result.status === 'completed' || result.status === 'failed') {
          clearInterval(interval);
          setActiveTest(null);
          loadTestResults();
        }
      } catch (err) {
        console.error('Erro ao monitorar teste:', err);
        clearInterval(interval);
      }
    }, 2000);

    // Limpar intervalo após 10 minutos
    setTimeout(() => clearInterval(interval), 600000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const selectedConfigData = testConfigs.find(
    (config) => config.id === selectedConfig,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Testes de Performance
          </h1>
          <p className="text-sm text-gray-600">
            Execute testes de carga e stress para avaliar a performance da
            aplicação
          </p>
        </div>
      </div>

      {error && (
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
              <h3 className="text-sm font-medium text-red-800">Erro</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Configuração do Teste */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Configuração do Teste
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Teste
            </label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value as 'load' | 'stress')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="load">Teste de Carga</option>
              <option value="stress">Teste de Stress</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Configuração
            </label>
            <select
              value={selectedConfig}
              onChange={(e) => setSelectedConfig(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma configuração</option>
              {testConfigs.map((config) => (
                <option key={config.id} value={config.id}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedConfigData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Detalhes da Configuração
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">URL:</span>
                <p className="font-medium">{selectedConfigData.target.url}</p>
              </div>
              <div>
                <span className="text-gray-600">Conexões:</span>
                <p className="font-medium">
                  {selectedConfigData.load.connections}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Duração:</span>
                <p className="font-medium">
                  {formatDuration(selectedConfigData.load.duration)}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Taxa:</span>
                <p className="font-medium">
                  {selectedConfigData.load.rate} req/s
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex space-x-4">
          <button
            onClick={startTest}
            disabled={loading || !selectedConfig || !!activeTest}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            Iniciar Teste
          </button>

          {activeTest && (
            <button
              onClick={stopTest}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 10h6v4H9z"
                />
              </svg>
              Parar Teste
            </button>
          )}
        </div>
      </div>

      {/* Teste Ativo */}
      {activeTest && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Teste em Execução
          </h2>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(activeTest.status)}`}
              >
                {activeTest.status.toUpperCase()}
              </span>
              <span className="text-sm text-gray-600">
                Iniciado em: {new Date(activeTest.startTime).toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Duração: {formatDuration(activeTest.duration)}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {activeTest.summary.totalRequests}
              </p>
              <p className="text-sm text-gray-600">Total Requests</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {activeTest.summary.successfulRequests}
              </p>
              <p className="text-sm text-gray-600">Sucessos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {activeTest.summary.failedRequests}
              </p>
              <p className="text-sm text-gray-600">Falhas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {activeTest.summary.averageResponseTime.toFixed(0)}ms
              </p>
              <p className="text-sm text-gray-600">Tempo Médio</p>
            </div>
          </div>
        </div>
      )}

      {/* Resultados Recentes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Resultados Recentes
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {testResults.map((result) => (
            <div key={result.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}
                  >
                    {result.status.toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {testConfigs.find((c) => c.id === result.configId)?.name ||
                      'Configuração não encontrada'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(result.startTime).toLocaleString()}
                </div>
              </div>

              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Requests:</span>
                  <span className="ml-1 font-medium">
                    {result.summary.totalRequests}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Taxa de Erro:</span>
                  <span className="ml-1 font-medium">
                    {result.summary.errorRate.toFixed(2)}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Tempo Médio:</span>
                  <span className="ml-1 font-medium">
                    {result.summary.averageResponseTime.toFixed(0)}ms
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Throughput:</span>
                  <span className="ml-1 font-medium">
                    {result.summary.requestsPerSecond.toFixed(0)} req/s
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
