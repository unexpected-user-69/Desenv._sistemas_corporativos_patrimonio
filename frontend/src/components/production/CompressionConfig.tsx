// Configuração de Compressão

import React, { useState, useEffect } from 'react';
import type {
  CompressionConfig as CompressionConfigType,
  CompressionStats,
} from '../../types/production';
import { productionService } from '../../services/production';

interface Props {
  config: CompressionConfigType;
  onUpdate: () => void;
}

export const CompressionConfig: React.FC<Props> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<CompressionConfigType>(config);
  const [stats, setStats] = useState<CompressionStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const compressionStats =
        (await productionService.getCompressionStats()) as CompressionStats;
      setStats(compressionStats);
    } catch {
      console.error('Erro ao carregar estatísticas de compressão');
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    void loadStats();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      await productionService.updateCompressionConfig();
      setMessage({
        type: 'success',
        text: 'Configuração de Compressão salva com sucesso!',
      });
      onUpdate();
      void loadStats(); // Recarregar estatísticas
    } catch {
      setMessage({ type: 'error', text: 'Erro ao salvar configuração' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(config);
    setMessage(null);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionLevelDescription = (level: number) => {
    const descriptions = {
      1: 'Compressão mais rápida, menor eficiência',
      2: 'Compressão rápida',
      3: 'Compressão balanceada',
      4: 'Compressão balanceada',
      5: 'Compressão balanceada',
      6: 'Compressão balanceada (recomendado)',
      7: 'Compressão mais eficiente',
      8: 'Compressão muito eficiente',
      9: 'Compressão máxima, mais lenta',
    };
    return descriptions[level as keyof typeof descriptions] || 'Nível inválido';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Configuração de Compressão
        </h2>
        <p className="text-sm text-gray-600">
          Configure a compressão gzip para otimização de performance e redução
          de bandwidth
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={formData.enabled}
              onChange={(e) =>
                setFormData({ ...formData, enabled: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="enabled"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Habilitar compressão gzip
            </label>
          </div>

          {formData.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Compressão (1-9)
                </label>
                <input
                  type="range"
                  min="1"
                  max="9"
                  value={formData.level}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      level: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 (Rápido)</span>
                  <span className="font-medium">Nível {formData.level}</span>
                  <span>9 (Eficiente)</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {getCompressionLevelDescription(formData.level)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Threshold (bytes)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1048576"
                  step="1024"
                  value={formData.threshold}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      threshold: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tamanho mínimo do conteúdo para aplicar compressão (
                  {formatBytes(formData.threshold)})
                </p>
              </div>
            </>
          )}
        </div>

        {/* Estatísticas e Informações */}
        <div className="space-y-4">
          {/* Estatísticas Atuais */}
          {stats && (
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">
                Estatísticas de Compressão
              </h3>
              {loadingStats ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Requests Compressos</p>
                      <p className="font-semibold">
                        {stats.requestsCompressed.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total de Requests</p>
                      <p className="font-semibold">
                        {stats.totalRequests.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tamanho Original</p>
                      <p className="font-semibold">
                        {formatBytes(stats.originalSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tamanho Comprimido</p>
                      <p className="font-semibold">
                        {formatBytes(stats.compressedSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Taxa de Compressão</p>
                      <p className="font-semibold">
                        {(stats.compressionRatio * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Bytes Economizados</p>
                      <p className="font-semibold text-green-600">
                        {formatBytes(stats.bytesSaved)}
                      </p>
                    </div>
                  </div>

                  {/* Barra de Progresso da Taxa de Compressão */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Taxa de Compressão</span>
                      <span>{(stats.compressionRatio * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.compressionRatio * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">
              Informações sobre Compressão
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Gzip:</strong> Algoritmo de compressão padrão para web
              </p>
              <p>
                <strong>Nível:</strong> 1-9, onde 9 é máxima compressão
              </p>
              <p>
                <strong>Threshold:</strong> Tamanho mínimo para comprimir
              </p>
              <p>
                <strong>Benefícios:</strong> Reduz bandwidth e melhora
                performance
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">
              Presets Recomendados
            </h3>
            <div className="space-y-2">
              <button
                onClick={() =>
                  setFormData({
                    enabled: true,
                    level: 6,
                    threshold: 1024,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Balanceado:</strong> Nível 6, threshold 1KB
                (recomendado)
              </button>
              <button
                onClick={() =>
                  setFormData({
                    enabled: true,
                    level: 1,
                    threshold: 512,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Performance:</strong> Nível 1, threshold 512B (mais
                rápido)
              </button>
              <button
                onClick={() =>
                  setFormData({
                    enabled: true,
                    level: 9,
                    threshold: 2048,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Máxima Compressão:</strong> Nível 9, threshold 2KB
              </button>
              <button
                onClick={() =>
                  setFormData({
                    enabled: false,
                    level: 6,
                    threshold: 1024,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Desabilitado:</strong> Sem compressão
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">Recomendações</h3>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>• Use nível 6 para melhor balanceamento</p>
              <p>• Configure threshold baseado no conteúdo</p>
              <p>• Monitore estatísticas de compressão</p>
              <p>• Teste diferentes níveis em produção</p>
              <p>• Considere CDN para compressão adicional</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                void handleSave();
              }}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Configuração'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Resetar
            </button>
            <button
              onClick={() => {
                void loadStats();
              }}
              disabled={loadingStats}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loadingStats ? 'Carregando...' : 'Atualizar Stats'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
