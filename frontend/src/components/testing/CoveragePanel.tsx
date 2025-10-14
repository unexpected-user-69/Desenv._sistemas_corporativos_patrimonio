// Painel de Cobertura de Código

import React from 'react';
import { CoverageSummary } from '../../types/testing';

interface CoveragePanelProps {
  coverage: CoverageSummary | null;
}

export const CoveragePanel: React.FC<CoveragePanelProps> = ({ coverage }) => {
  if (!coverage) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Nenhum relatório de cobertura disponível</div>
      </div>
    );
  }

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCoverageBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getCoverageBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getCoverageLabel = (percentage: number) => {
    if (percentage >= 90) return 'Excelente';
    if (percentage >= 80) return 'Bom';
    if (percentage >= 60) return 'Aceitável';
    return 'Precisa melhorar';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Cobertura de Código</h2>
        <p className="text-sm text-gray-600">
          Análise de cobertura de testes e qualidade do código
        </p>
      </div>

      {/* Overall Coverage */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cobertura Geral</h3>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getCoverageBgColor(coverage.overall)} mb-4`}>
            <span className={`text-4xl font-bold ${getCoverageColor(coverage.overall)}`}>
              {coverage.overall}%
            </span>
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {getCoverageLabel(coverage.overall)}
          </h4>
          <p className="text-sm text-gray-600">
            Cobertura geral de {coverage.files.length} arquivos
          </p>
        </div>
      </div>

      {/* Coverage by Type */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cobertura por Tipo</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Linhas</span>
              <span className={`text-sm font-bold ${getCoverageColor(coverage.thresholds.lines)}`}>
                {coverage.thresholds.lines}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getCoverageBarColor(coverage.thresholds.lines)}`}
                style={{ width: `${coverage.thresholds.lines}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Funções</span>
              <span className={`text-sm font-bold ${getCoverageColor(coverage.thresholds.functions)}`}>
                {coverage.thresholds.functions}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getCoverageBarColor(coverage.thresholds.functions)}`}
                style={{ width: `${coverage.thresholds.functions}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Branches</span>
              <span className={`text-sm font-bold ${getCoverageColor(coverage.thresholds.branches)}`}>
                {coverage.thresholds.branches}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getCoverageBarColor(coverage.thresholds.branches)}`}
                style={{ width: `${coverage.thresholds.branches}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Statements</span>
              <span className={`text-sm font-bold ${getCoverageColor(coverage.thresholds.statements)}`}>
                {coverage.thresholds.statements}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getCoverageBarColor(coverage.thresholds.statements)}`}
                style={{ width: `${coverage.thresholds.statements}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* File Coverage Details */}
      {coverage.files.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cobertura por Arquivo</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arquivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Linhas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Funções
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branches
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statements
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Geral
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coverage.files.map((file, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {file.path}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getCoverageBarColor(file.coverage.lines.percentage)}`}
                            style={{ width: `${file.coverage.lines.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getCoverageColor(file.coverage.lines.percentage)}`}>
                          {file.coverage.lines.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getCoverageBarColor(file.coverage.functions.percentage)}`}
                            style={{ width: `${file.coverage.functions.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getCoverageColor(file.coverage.functions.percentage)}`}>
                          {file.coverage.functions.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getCoverageBarColor(file.coverage.branches.percentage)}`}
                            style={{ width: `${file.coverage.branches.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getCoverageColor(file.coverage.branches.percentage)}`}>
                          {file.coverage.branches.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getCoverageBarColor(file.coverage.statements.percentage)}`}
                            style={{ width: `${file.coverage.statements.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getCoverageColor(file.coverage.statements.percentage)}`}>
                          {file.coverage.statements.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCoverageBgColor(file.coverage.lines.percentage)} ${getCoverageColor(file.coverage.lines.percentage)}`}>
                        {getCoverageLabel(file.coverage.lines.percentage)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Coverage Recommendations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Recomendações de Cobertura</h3>
        <div className="space-y-2">
          {coverage.overall < 80 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">📈</span>
              <span className="text-sm text-blue-800">
                Cobertura geral abaixo de 80%. Adicione mais testes para melhorar a cobertura.
              </span>
            </div>
          )}
          {coverage.thresholds.branches < 70 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">🌿</span>
              <span className="text-sm text-blue-800">
                Cobertura de branches baixa. Teste diferentes caminhos condicionais.
              </span>
            </div>
          )}
          {coverage.files.some(file => file.coverage.lines.percentage < 50) && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">📄</span>
              <span className="text-sm text-blue-800">
                Alguns arquivos têm cobertura muito baixa. Foque em testar arquivos críticos.
              </span>
            </div>
          )}
          {coverage.overall >= 90 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">🎉</span>
              <span className="text-sm text-blue-800">
                Excelente cobertura! Mantenha os testes atualizados conforme o código evolui.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Coverage Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações</h3>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Baixar Relatório
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Copiar Relatório
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Configurar Thresholds
          </button>
        </div>
      </div>
    </div>
  );
};
