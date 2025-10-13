// Dashboard de testes de performance (M3)

import React, { useState, useEffect } from 'react';
import { PerformanceTest, TestResult, TestConfig } from '../../types/performance';
import { performanceService } from '../../services/performance';

interface PerformanceDashboardProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  autoRefresh = false,
  refreshInterval = 30000
}) => {
  const [tests, setTests] = useState<PerformanceTest[]>([]);
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTests = async () => {
    try {
      const testsData = await performanceService.getAvailableTests();
      setTests(testsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar testes');
    }
  };

  const fetchResults = async () => {
    try {
      const resultsData = await performanceService.getTestResults();
      setResults(resultsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar resultados');
    }
  };

  useEffect(() => {
    fetchTests();
    fetchResults();

    if (autoRefresh) {
      const interval = setInterval(fetchResults, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const runTest = async (testId: string, config?: TestConfig) => {
    try {
      setRunningTests(prev => new Set(prev).add(testId));
      setError(null);

      const result = await performanceService.runTest(testId, config);
      setResults(prev => [result, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao executar teste');
    } finally {
      setRunningTests(prev => {
        const newSet = new Set(prev);
        newSet.delete(testId);
        return newSet;
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceLevel = (latency: number) => {
    if (latency < 100) return { level: 'Excelente', color: 'text-green-600' };
    if (latency < 500) return { level: 'Bom', color: 'text-blue-600' };
    if (latency < 1000) return { level: 'Aceitável', color: 'text-yellow-600' };
    return { level: 'Ruim', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard de Performance</h1>
          <p className="text-sm text-gray-600">
            Execute e monitore testes de carga e stress
          </p>
        </div>
        <button
          onClick={() => { fetchTests(); fetchResults(); }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erro</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Testes Disponíveis */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Testes Disponíveis</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((test) => (
              <div key={test.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{test.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                    {test.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{test.description}</p>
                <div className="text-xs text-gray-500 mb-3">
                  <p>Duração: {test.duration}s</p>
                  <p>Conexões: {test.connections}</p>
                </div>
                <button
                  onClick={() => runTest(test.id)}
                  disabled={runningTests.has(test.id)}
                  className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {runningTests.has(test.id) ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Executando...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Executar Teste
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resultados dos Testes */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Resultados dos Testes</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {results.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              Nenhum teste executado ainda
            </div>
          ) : (
            results.map((result) => {
              const performance = getPerformanceLevel(result.latency.average);
              return (
                <div key={result.id} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{result.testName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(result.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Duração</p>
                      <p className="text-lg font-semibold text-gray-900">{result.duration}s</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Requests</p>
                      <p className="text-lg font-semibold text-gray-900">{result.requests.total}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Latência Média</p>
                      <p className={`text-lg font-semibold ${performance.color}`}>
                        {result.latency.average.toFixed(0)}ms
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Throughput</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {result.throughput.toFixed(0)} req/s
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">
                        Latência P95: <span className="font-medium">{result.latency.p95.toFixed(0)}ms</span>
                      </span>
                      <span className="text-gray-600">
                        Erros: <span className="font-medium">{result.errors}</span>
                      </span>
                    </div>
                    <span className={`font-medium ${performance.color}`}>
                      Performance: {performance.level}
                    </span>
                  </div>

                  {result.error && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-sm text-red-800">{result.error}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
