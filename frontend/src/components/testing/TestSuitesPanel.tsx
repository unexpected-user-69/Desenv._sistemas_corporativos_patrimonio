// Painel de Test Suites

import React, { useState } from 'react';
import { TestSuite } from '../../types/testing';
import { testingService } from '../../services/testing';

interface TestSuitesPanelProps {
  testSuites: TestSuite[];
  onRefresh: () => void;
}

export const TestSuitesPanel: React.FC<TestSuitesPanelProps> = ({ testSuites, onRefresh }) => {
  const [runningSuites, setRunningSuites] = useState<Set<string>>(new Set());
  const [selectedSuite, setSelectedSuite] = useState<TestSuite | null>(null);

  const handleRunSuite = async (suiteId: string) => {
    try {
      setRunningSuites(prev => new Set(prev).add(suiteId));
      await testingService.runTestSuite(suiteId);
      onRefresh();
    } catch (error) {
      console.error('Erro ao executar test suite:', error);
    } finally {
      setRunningSuites(prev => {
        const newSet = new Set(prev);
        newSet.delete(suiteId);
        return newSet;
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'running': return 'text-blue-600';
      case 'skipped': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Test Suites</h2>
          <p className="text-sm text-gray-600">
            Execute e monitore suites de teste
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      {/* Test Suites List */}
      <div className="space-y-4">
        {testSuites.map((suite) => (
          <div key={suite.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-medium text-gray-900">{suite.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(suite.status)}`}>
                  {suite.status}
                </span>
                {runningSuites.has(suite.id) && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleRunSuite(suite.id)}
                  disabled={runningSuites.has(suite.id)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200 disabled:opacity-50"
                >
                  {runningSuites.has(suite.id) ? 'Executando...' : 'Executar'}
                </button>
                <button
                  onClick={() => setSelectedSuite(suite)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200"
                >
                  Detalhes
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{suite.description}</p>

            {/* Test Results Summary */}
            {suite.results && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{suite.results.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{suite.results.passed}</div>
                  <div className="text-sm text-gray-600">Passaram</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{suite.results.failed}</div>
                  <div className="text-sm text-gray-600">Falharam</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{suite.results.skipped}</div>
                  <div className="text-sm text-gray-600">Ignorados</div>
                </div>
              </div>
            )}

            {/* Coverage */}
            {suite.results?.coverage && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Cobertura</span>
                  <span className="text-sm text-gray-600">{suite.results.coverage.overall}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      suite.results.coverage.overall >= 80 ? 'bg-green-600' :
                      suite.results.coverage.overall >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${suite.results.coverage.overall}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Test List */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Testes:</h4>
              {suite.tests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <span className={`text-sm ${getTestStatusColor(test.status)}`}>
                      {test.status === 'passed' ? '✅' :
                       test.status === 'failed' ? '❌' :
                       test.status === 'running' ? '🔄' :
                       test.status === 'skipped' ? '⏭️' : '⏳'}
                    </span>
                    <span className="text-sm text-gray-900">{test.name}</span>
                    <span className="text-xs text-gray-500">({test.type})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {test.duration && (
                      <span className="text-xs text-gray-500">{test.duration}ms</span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      {selectedSuite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedSuite.name}</h3>
                <button
                  onClick={() => setSelectedSuite(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Descrição</h4>
                  <p className="text-sm text-gray-600">{selectedSuite.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Configuração</h4>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Timeout:</span> {selectedSuite.config.timeout}ms
                      </div>
                      <div>
                        <span className="font-medium">Retries:</span> {selectedSuite.config.retries}
                      </div>
                      <div>
                        <span className="font-medium">Paralelo:</span> {selectedSuite.config.parallel ? 'Sim' : 'Não'}
                      </div>
                      <div>
                        <span className="font-medium">Ambiente:</span> {selectedSuite.config.environment}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSuite.results && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resultados</h4>
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Duração:</span> {selectedSuite.results.duration}ms
                        </div>
                        <div>
                          <span className="font-medium">Cobertura:</span> {selectedSuite.results.coverage.overall}%
                        </div>
                        <div>
                          <span className="font-medium">Início:</span> {new Date(selectedSuite.results.startTime).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Fim:</span> {new Date(selectedSuite.results.endTime).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Testes Detalhados</h4>
                  <div className="space-y-2">
                    {selectedSuite.tests.map((test) => (
                      <div key={test.id} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{test.name}</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                            {test.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                        {test.error && (
                          <div className="bg-red-50 border border-red-200 rounded p-2">
                            <p className="text-sm text-red-800">{test.error}</p>
                          </div>
                        )}
                        {test.assertions && test.assertions.length > 0 && (
                          <div className="mt-2">
                            <h6 className="text-xs font-medium text-gray-700 mb-1">Assertions:</h6>
                            <div className="space-y-1">
                              {test.assertions.map((assertion) => (
                                <div key={assertion.id} className="flex items-center space-x-2 text-xs">
                                  <span className={assertion.status === 'passed' ? 'text-green-600' : 'text-red-600'}>
                                    {assertion.status === 'passed' ? '✅' : '❌'}
                                  </span>
                                  <span className="text-gray-600">{assertion.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
