// Painel de monitoramento de validação

import React, { useState, useEffect } from 'react';
import { ValidationStats } from '../../types/security';
import { securityService } from '../../services/security';

export const ValidationPanel: React.FC = () => {
  const [stats, setStats] = useState<ValidationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await securityService.getValidationStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
    const interval = setInterval(() => {
      void loadData();
    }, 30000); // Atualizar a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

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

  if (!stats) {
    return (
      <div className="text-center text-gray-500">
        <p>Nenhum dado disponível</p>
      </div>
    );
  }

  const successRate =
    (stats.successfulValidations / stats.totalValidations) * 100;
  const failureRate = (stats.failedValidations / stats.totalValidations) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Monitoramento de Validação
        </h2>
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

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">
                Total de Validações
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {stats.totalValidations.toLocaleString()}
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
                Validações Bem-sucedidas
              </p>
              <p className="text-2xl font-bold text-green-900">
                {stats.successfulValidations.toLocaleString()}
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
                Validações Falhadas
              </p>
              <p className="text-2xl font-bold text-red-900">
                {stats.failedValidations.toLocaleString()}
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">
                Taxa de Sucesso
              </p>
              <p className="text-2xl font-bold text-purple-900">
                {successRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Performance */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Performance de Validação
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Tempo Médio
            </h4>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.validationPerformance.averageTime.toFixed(2)}ms
              </div>
              <div className="ml-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stats.validationPerformance.averageTime < 5
                      ? 'bg-green-100 text-green-800'
                      : stats.validationPerformance.averageTime < 10
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stats.validationPerformance.averageTime < 5
                    ? 'Excelente'
                    : stats.validationPerformance.averageTime < 10
                      ? 'Bom'
                      : 'Lento'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Tempo Máximo
            </h4>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.validationPerformance.maxTime.toFixed(2)}ms
              </div>
              <div className="ml-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stats.validationPerformance.maxTime < 20
                      ? 'bg-green-100 text-green-800'
                      : stats.validationPerformance.maxTime < 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {stats.validationPerformance.maxTime < 20
                    ? 'Excelente'
                    : stats.validationPerformance.maxTime < 50
                      ? 'Bom'
                      : 'Lento'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Tempo Mínimo
            </h4>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                {stats.validationPerformance.minTime.toFixed(2)}ms
              </div>
              <div className="ml-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Ótimo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribuição de Sucesso/Falha */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Distribuição de Validações
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Validações Bem-sucedidas</span>
              <span>{successRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Validações Falhadas</span>
              <span>{failureRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${failureRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Erros de Validação */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Erros de Validação
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Erro
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
              {stats.topValidationErrors.map((error, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {error.field}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {error.error}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {error.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${(error.count / stats.failedValidations) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {(
                          (error.count / stats.failedValidations) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recomendações */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Recomendações
        </h3>

        <div className="space-y-3">
          {successRate < 90 && (
            <div className="flex items-start">
              <div className="text-blue-600 mt-1">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <strong>Taxa de sucesso baixa:</strong> Considere melhorar a
                  validação no frontend para reduzir erros de validação no
                  backend.
                </p>
              </div>
            </div>
          )}

          {stats.validationPerformance.averageTime > 10 && (
            <div className="flex items-start">
              <div className="text-blue-600 mt-1">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <strong>Performance de validação lenta:</strong> Considere
                  otimizar as regras de validação ou implementar cache de
                  validação.
                </p>
              </div>
            </div>
          )}

          {stats.topValidationErrors.length > 0 && (
            <div className="flex items-start">
              <div className="text-blue-600 mt-1">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <strong>Erros frequentes:</strong> Os campos "
                  {stats.topValidationErrors[0].field}" e "
                  {stats.topValidationErrors[1]?.field}" têm muitos erros.
                  Considere melhorar a UX para esses campos.
                </p>
              </div>
            </div>
          )}

          {successRate >= 95 && stats.validationPerformance.averageTime < 5 && (
            <div className="flex items-start">
              <div className="text-green-600 mt-1">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800">
                  <strong>Excelente performance:</strong> O sistema de validação
                  está funcionando muito bem com alta taxa de sucesso e baixo
                  tempo de resposta.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
