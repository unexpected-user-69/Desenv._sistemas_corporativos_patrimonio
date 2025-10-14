// Configuração de CORS

import React, { useState } from 'react';
import type { CorsConfig as CorsConfigType } from '../../types/production';
import { productionService } from '../../services/production';

interface Props {
  config: CorsConfigType;
  onUpdate: () => void;
}

export const CorsConfig: React.FC<Props> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<CorsConfigType>(config);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [newOrigin, setNewOrigin] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      await productionService.updateCorsConfig(formData);
      setMessage({
        type: 'success',
        text: 'Configuração de CORS salva com sucesso!',
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

  const addOrigin = () => {
    if (newOrigin.trim() && !formData.origin.includes(newOrigin.trim())) {
      setFormData({
        ...formData,
        origin: [...formData.origin, newOrigin.trim()],
      });
      setNewOrigin('');
    }
  };

  const removeOrigin = (originToRemove: string) => {
    setFormData({
      ...formData,
      origin: formData.origin.filter((origin) => origin !== originToRemove),
    });
  };

  const toggleMethod = (method: string) => {
    const methods = formData.methods.includes(method)
      ? formData.methods.filter((m) => m !== method)
      : [...formData.methods, method];

    setFormData({ ...formData, methods });
  };

  const toggleHeader = (header: string) => {
    const headers = formData.allowedHeaders.includes(header)
      ? formData.allowedHeaders.filter((h) => h !== header)
      : [...formData.allowedHeaders, header];

    setFormData({ ...formData, allowedHeaders: headers });
  };

  const availableMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'OPTIONS',
    'HEAD',
  ];
  const availableHeaders = [
    'Content-Type',
    'Authorization',
    'Accept',
    'X-Requested-With',
    'X-CSRF-Token',
    'X-API-Key',
    'Cache-Control',
    'Pragma',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Configuração de CORS
        </h2>
        <p className="text-sm text-gray-600">
          Configure as políticas de Cross-Origin Resource Sharing (CORS)
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
          {/* Origins Permitidos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origins Permitidos
            </label>
            <div className="space-y-2">
              {formData.origin.map((origin, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                >
                  <span className="text-sm text-gray-900">{origin}</span>
                  <button
                    onClick={() => removeOrigin(origin)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  placeholder="Adicionar origin (ex: https://example.com)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addOrigin()}
                />
                <button
                  onClick={addOrigin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Adicionar
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              URLs que podem fazer requisições para a API
            </p>
          </div>

          {/* Métodos Permitidos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Métodos HTTP Permitidos
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableMethods.map((method) => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.methods.includes(method)}
                    onChange={() => toggleMethod(method)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Headers Permitidos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Headers Permitidos
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableHeaders.map((header) => (
                <label key={header} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.allowedHeaders.includes(header)}
                    onChange={() => toggleHeader(header)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{header}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Configurações Adicionais */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="credentials"
                checked={formData.credentials}
                onChange={(e) =>
                  setFormData({ ...formData, credentials: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="credentials"
                className="ml-2 block text-sm text-gray-700"
              >
                Permitir credenciais (cookies, headers de autorização)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Age (segundos)
              </label>
              <input
                type="number"
                min="0"
                max="86400"
                value={formData.maxAge || 0}
                onChange={(e) =>
                  setFormData({ ...formData, maxAge: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tempo que o navegador pode cachear a resposta do preflight (0 =
                sem cache)
              </p>
            </div>
          </div>
        </div>

        {/* Informações e Presets */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">
              Informações sobre CORS
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Origin:</strong> Domínios que podem acessar a API
              </p>
              <p>
                <strong>Métodos:</strong> Verbos HTTP permitidos
              </p>
              <p>
                <strong>Headers:</strong> Cabeçalhos permitidos nas requisições
              </p>
              <p>
                <strong>Credentials:</strong> Permite envio de cookies e auth
                headers
              </p>
              <p>
                <strong>Max Age:</strong> Cache da resposta preflight
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
                    origin: ['http://localhost:3101', 'http://localhost:5173'],
                    methods: [
                      'GET',
                      'POST',
                      'PUT',
                      'DELETE',
                      'PATCH',
                      'OPTIONS',
                    ],
                    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                    credentials: true,
                    maxAge: 86400,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Desenvolvimento:</strong> Localhost com credenciais
              </button>
              <button
                onClick={() =>
                  setFormData({
                    origin: [
                      'https://app.example.com',
                      'https://admin.example.com',
                    ],
                    methods: [
                      'GET',
                      'POST',
                      'PUT',
                      'DELETE',
                      'PATCH',
                      'OPTIONS',
                    ],
                    allowedHeaders: [
                      'Content-Type',
                      'Authorization',
                      'Accept',
                      'X-API-Key',
                    ],
                    credentials: true,
                    maxAge: 86400,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Produção:</strong> Domínios específicos
              </button>
              <button
                onClick={() =>
                  setFormData({
                    origin: ['*'],
                    methods: ['GET', 'POST'],
                    allowedHeaders: ['Content-Type', 'Authorization'],
                    credentials: false,
                    maxAge: 3600,
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>API Pública:</strong> Acesso aberto (sem credenciais)
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">
              Recomendações de Segurança
            </h3>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>• Use origins específicos em produção</p>
              <p>• Evite usar "*" com credentials: true</p>
              <p>• Configure maxAge para otimizar performance</p>
              <p>• Monitore violações de CORS nos logs</p>
              <p>• Teste configurações em diferentes navegadores</p>
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
