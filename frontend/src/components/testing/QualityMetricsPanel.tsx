// Painel de Métricas de Qualidade

import React from 'react';
import { QualityMetrics } from '../../types/testing';

interface QualityMetricsPanelProps {
  qualityMetrics: QualityMetrics | null;
}

export const QualityMetricsPanel: React.FC<QualityMetricsPanelProps> = ({
  qualityMetrics,
}) => {
  if (!qualityMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">
          Nenhuma métrica de qualidade disponível
        </div>
      </div>
    );
  }

  const getQualityColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityBgColor = (value: number) => {
    if (value >= 90) return 'bg-green-100';
    if (value >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getQualityLabel = (value: number) => {
    if (value >= 90) return 'Excelente';
    if (value >= 70) return 'Bom';
    if (value >= 50) return 'Aceitável';
    return 'Precisa melhorar';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Métricas de Qualidade
        </h2>
        <p className="text-sm text-gray-600">
          Análise de qualidade do código e dívida técnica
        </p>
      </div>

      {/* Code Quality Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Qualidade do Código
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getQualityBgColor(qualityMetrics.codeQuality.maintainability)} mb-3`}
            >
              <span
                className={`text-2xl font-bold ${getQualityColor(qualityMetrics.codeQuality.maintainability)}`}
              >
                {qualityMetrics.codeQuality.maintainability}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">Manutenibilidade</h4>
            <p className="text-sm text-gray-600">
              {getQualityLabel(qualityMetrics.codeQuality.maintainability)}
            </p>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getQualityBgColor(qualityMetrics.codeQuality.reliability)} mb-3`}
            >
              <span
                className={`text-2xl font-bold ${getQualityColor(qualityMetrics.codeQuality.reliability)}`}
              >
                {qualityMetrics.codeQuality.reliability}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">Confiabilidade</h4>
            <p className="text-sm text-gray-600">
              {getQualityLabel(qualityMetrics.codeQuality.reliability)}
            </p>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getQualityBgColor(qualityMetrics.codeQuality.security)} mb-3`}
            >
              <span
                className={`text-2xl font-bold ${getQualityColor(qualityMetrics.codeQuality.security)}`}
              >
                {qualityMetrics.codeQuality.security}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">Segurança</h4>
            <p className="text-sm text-gray-600">
              {getQualityLabel(qualityMetrics.codeQuality.security)}
            </p>
          </div>

          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getQualityBgColor(qualityMetrics.codeQuality.performance)} mb-3`}
            >
              <span
                className={`text-2xl font-bold ${getQualityColor(qualityMetrics.codeQuality.performance)}`}
              >
                {qualityMetrics.codeQuality.performance}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">Performance</h4>
            <p className="text-sm text-gray-600">
              {getQualityLabel(qualityMetrics.codeQuality.performance)}
            </p>
          </div>
        </div>
      </div>

      {/* Technical Debt */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Dívida Técnica
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {qualityMetrics.technicalDebt.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{
                  width: `${Math.min((qualityMetrics.technicalDebt.total / 200) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Por Categoria
            </h4>
            <div className="space-y-2">
              {Object.entries(qualityMetrics.technicalDebt.byCategory).map(
                ([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-600 capitalize">
                      {category}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {count}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Files with Technical Debt */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Arquivos com Dívida Técnica
          </h4>
          <div className="space-y-2">
            {qualityMetrics.technicalDebt.byFile.map((file) => (
              <div
                key={file.file}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <span className="text-sm font-medium text-gray-900">
                    {file.file}
                  </span>
                  <p className="text-xs text-gray-600">{file.issues} issues</p>
                </div>
                <span className="text-sm font-bold text-red-600">
                  {file.debt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complexity Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Complexidade
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {qualityMetrics.complexity.cyclomatic}
            </div>
            <h4 className="font-medium text-gray-900">Ciclomática</h4>
            <p className="text-sm text-gray-600">Complexidade estrutural</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {qualityMetrics.complexity.cognitive}
            </div>
            <h4 className="font-medium text-gray-900">Cognitiva</h4>
            <p className="text-sm text-gray-600">Dificuldade de compreensão</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {qualityMetrics.complexity.halstead.effort}
            </div>
            <h4 className="font-medium text-gray-900">Esforço</h4>
            <p className="text-sm text-gray-600">Esforço de manutenção</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h5 className="font-medium text-gray-900 mb-2">Volume</h5>
            <p className="text-2xl font-bold text-gray-900">
              {qualityMetrics.complexity.halstead.volume}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h5 className="font-medium text-gray-900 mb-2">Dificuldade</h5>
            <p className="text-2xl font-bold text-gray-900">
              {qualityMetrics.complexity.halstead.difficulty}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h5 className="font-medium text-gray-900 mb-2">Esforço</h5>
            <p className="text-2xl font-bold text-gray-900">
              {qualityMetrics.complexity.halstead.effort}
            </p>
          </div>
        </div>
      </div>

      {/* Duplications */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Duplicações
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Total de Linhas
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {qualityMetrics.duplications.total}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Percentual
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {qualityMetrics.duplications.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  qualityMetrics.duplications.percentage < 3
                    ? 'bg-green-600'
                    : qualityMetrics.duplications.percentage < 5
                      ? 'bg-yellow-600'
                      : 'bg-red-600'
                }`}
                style={{
                  width: `${Math.min(qualityMetrics.duplications.percentage * 10, 100)}%`,
                }}
              ></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Arquivos com Duplicação
            </h4>
            <div className="space-y-2">
              {qualityMetrics.duplications.files.map((file) => (
                <div
                  key={file.file}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      {file.file}
                    </span>
                    <p className="text-xs text-gray-600">{file.lines} linhas</p>
                  </div>
                  <span className="text-sm font-bold text-orange-600">
                    {file.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Recomendações
        </h3>
        <div className="space-y-2">
          {qualityMetrics.technicalDebt.total > 100 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">⚠️</span>
              <span className="text-sm text-blue-800">
                Dívida técnica alta detectada. Considere refatorar código com
                mais de 100 pontos de dívida.
              </span>
            </div>
          )}
          {qualityMetrics.duplications.percentage > 5 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">📋</span>
              <span className="text-sm text-blue-800">
                Duplicação de código acima de 5%. Extraia código comum para
                funções reutilizáveis.
              </span>
            </div>
          )}
          {qualityMetrics.complexity.cyclomatic > 10 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">🔧</span>
              <span className="text-sm text-blue-800">
                Complexidade ciclomática alta. Considere quebrar funções
                complexas em funções menores.
              </span>
            </div>
          )}
          {qualityMetrics.codeQuality.maintainability < 70 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">🛠️</span>
              <span className="text-sm text-blue-800">
                Manutenibilidade baixa. Melhore a documentação e estrutura do
                código.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
