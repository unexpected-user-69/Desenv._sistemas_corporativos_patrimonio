// Configuração de Rate Limiting

import React, { useState } from 'react';
import type { RateLimitConfig as RateLimitConfigType } from '../../types/production';
import { productionService } from '../../services/production';

interface Props {
  config: RateLimitConfigType;
  onUpdate: () => void;
}

export const RateLimitConfig: React.FC<Props> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<RateLimitConfigType>(config);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      await productionService.updateRateLimitConfig();
      setMessage({
        type: 'success',
        text: 'Configuração de Rate Limiting salva com sucesso!',
      });
      onUpdate();
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Configuração de Rate Limiting
        </h2>
        <p className="text-sm text-gray-600">
          Configure os limites de requisições para proteção contra spam e
          ataques DDoS
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time to Live (TTL) - Milissegundos
            </label>
            <input
              type="number"
              min="1000"
              max="3600000"
              step="1000"
              value={formData.ttl}
              onChange={(e) =>
                setFormData({ ...formData, ttl: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Janela de tempo para contagem de requisições (1000ms = 1 segundo)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limite de Requisições
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={formData.limit}
              onChange={(e) =>
                setFormData({ ...formData, limit: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Número máximo de requisições permitidas na janela de tempo
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duração do Bloqueio - Milissegundos
            </label>
            <input
              type="number"
              min="0"
              max="3600000"
              step="1000"
              value={formData.blockDuration || 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  blockDuration: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tempo adicional de bloqueio após exceder o limite (0 = sem
              bloqueio extra)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gerador de Chave
            </label>
            <select
              value={formData.keyGenerator || 'ip'}
              onChange={(e) =>
                setFormData({ ...formData, keyGenerator: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ip">Por IP</option>
              <option value="user">Por Usuário</option>
              <option value="endpoint">Por Endpoint</option>
              <option value="ip-user">Por IP + Usuário</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Como identificar requisições para contagem (recomendado: Por IP)
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="skipSuccessfulRequests"
                checked={formData.skipSuccessfulRequests || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skipSuccessfulRequests: e.target.checked,
                  })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="skipSuccessfulRequests"
                className="ml-2 block text-sm text-gray-700"
              >
                Pular requisições bem-sucedidas
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="skipFailedRequests"
                checked={formData.skipFailedRequests || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skipFailedRequests: e.target.checked,
                  })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="skipFailedRequests"
                className="ml-2 block text-sm text-gray-700"
              >
                Pular requisições com falha
              </label>
            </div>
          </div>
        </div>

        {/* Informações e Presets */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">
              Informações sobre Rate Limiting
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>TTL:</strong> Janela de tempo para contagem de
                requisições
              </p>
              <p>
                <strong>Limite:</strong> Número máximo de requisições na janela
              </p>
              <p>
                <strong>Bloqueio:</strong> Tempo adicional após exceder o limite
              </p>
              <p>
                <strong>Gerador:</strong> Como identificar requisições únicas
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
                    ttl: 60000,
                    limit: 100,
                    skipSuccessfulRequests: false,
                    skipFailedRequests: false,
                    keyGenerator: 'ip',
                    blockDuration: 0,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Desenvolvimento:</strong> 100 req/min por IP
              </button>
              <button
                onClick={() =>
                  setFormData({
                    ttl: 60000,
                    limit: 1000,
                    skipSuccessfulRequests: false,
                    skipFailedRequests: false,
                    keyGenerator: 'ip',
                    blockDuration: 300000,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Produção:</strong> 1000 req/min por IP (bloqueio 5min)
              </button>
              <button
                onClick={() =>
                  setFormData({
                    ttl: 3600000,
                    limit: 10000,
                    skipSuccessfulRequests: false,
                    skipFailedRequests: false,
                    keyGenerator: 'user',
                    blockDuration: 0,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>API Pública:</strong> 10000 req/hora por usuário
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">Recomendações</h3>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>• Use TTL de 60 segundos para APIs REST</p>
              <p>• Configure limites baseados no uso esperado</p>
              <p>• Monitore métricas para ajustar limites</p>
              <p>• Use bloqueio adicional para ataques persistentes</p>
              <p>• Teste configurações em ambiente de staging</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => void handleSave()}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Configuração'}
            </button>
            <button
              onClick={() => void handleReset()}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Resetar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
