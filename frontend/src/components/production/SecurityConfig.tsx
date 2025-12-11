// Configuração de Segurança (Helmet)

import React, { useState } from 'react';
import { SecurityHeaders } from '../../types/production';
import { productionService } from '../../services/production';

interface Props {
  config: SecurityHeaders;
  onUpdate: () => void;
}

export const SecurityConfig: React.FC<Props> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState<SecurityHeaders>(config);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [newHeaderKey, setNewHeaderKey] = useState('');
  const [newHeaderValue, setNewHeaderValue] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      await productionService.updateSecurityConfig();
      setMessage({
        type: 'success',
        text: 'Configuração de Segurança salva com sucesso!',
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

  const toggleHelmetOption = (option: keyof typeof formData.helmet) => {
    setFormData({
      ...formData,
      helmet: {
        ...formData.helmet,
        [option]: !formData.helmet[option],
      },
    });
  };

  const addCustomHeader = () => {
    if (newHeaderKey.trim() && newHeaderValue.trim()) {
      setFormData({
        ...formData,
        customHeaders: {
          ...formData.customHeaders,
          [newHeaderKey.trim()]: newHeaderValue.trim(),
        },
      });
      setNewHeaderKey('');
      setNewHeaderValue('');
    }
  };

  const removeCustomHeader = (key: string) => {
    const { [key]: removed, ...rest } = formData.customHeaders;
    void removed; // Mark as used to avoid lint error
    setFormData({
      ...formData,
      customHeaders: rest,
    });
  };

  const helmetOptions = [
    {
      key: 'contentSecurityPolicy',
      name: 'Content Security Policy',
      description: 'Previne ataques XSS',
    },
    {
      key: 'crossOriginEmbedderPolicy',
      name: 'Cross-Origin Embedder Policy',
      description: 'Controla recursos incorporados',
    },
    {
      key: 'crossOriginOpenerPolicy',
      name: 'Cross-Origin Opener Policy',
      description: 'Controla janelas abertas',
    },
    {
      key: 'crossOriginResourcePolicy',
      name: 'Cross-Origin Resource Policy',
      description: 'Controla recursos cross-origin',
    },
    {
      key: 'dnsPrefetchControl',
      name: 'DNS Prefetch Control',
      description: 'Controla prefetch de DNS',
    },
    {
      key: 'frameguard',
      name: 'Frameguard',
      description: 'Previne clickjacking',
    },
    {
      key: 'hidePoweredBy',
      name: 'Hide Powered By',
      description: 'Remove header X-Powered-By',
    },
    {
      key: 'hsts',
      name: 'HTTP Strict Transport Security',
      description: 'Força HTTPS',
    },
    {
      key: 'ieNoOpen',
      name: 'IE No Open',
      description: 'Previne abertura em IE',
    },
    { key: 'noSniff', name: 'No Sniff', description: 'Previne MIME sniffing' },
    {
      key: 'originAgentCluster',
      name: 'Origin Agent Cluster',
      description: 'Isolamento de origem',
    },
    {
      key: 'permittedCrossDomainPolicies',
      name: 'Permitted Cross Domain Policies',
      description: 'Políticas cross-domain',
    },
    {
      key: 'referrerPolicy',
      name: 'Referrer Policy',
      description: 'Controla informações de referrer',
    },
    {
      key: 'xssFilter',
      name: 'XSS Filter',
      description: 'Filtro XSS do navegador',
    },
  ];

  const commonHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains',
    },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Configuração de Segurança
        </h2>
        <p className="text-sm text-gray-600">
          Configure headers de segurança e políticas de proteção (Helmet.js)
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
        {/* Configurações Helmet */}
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-4">
              Opções do Helmet
            </h3>
            <div className="space-y-3">
              {helmetOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    id={option.key}
                    checked={
                      formData.helmet[
                        option.key as keyof typeof formData.helmet
                      ]
                    }
                    onChange={() =>
                      toggleHelmetOption(
                        option.key as keyof typeof formData.helmet,
                      )
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={option.key}
                      className="block text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {option.name}
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Headers Customizados */}
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-4">
              Headers Customizados
            </h3>
            <div className="space-y-2">
              {Object.entries(formData.customHeaders).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                >
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">
                      {key}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      : {value}
                    </span>
                  </div>
                  <button
                    onClick={() => removeCustomHeader(key)}
                    className="text-red-600 hover:text-red-800 ml-2"
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

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newHeaderKey}
                  onChange={(e) => setNewHeaderKey(e.target.value)}
                  placeholder="Nome do header"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newHeaderValue}
                  onChange={(e) => setNewHeaderValue(e.target.value)}
                  placeholder="Valor do header"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={addCustomHeader}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Adicionar Header
              </button>
            </div>
          </div>
        </div>

        {/* Informações e Presets */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">
              Informações sobre Segurança
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Helmet:</strong> Middleware de segurança para Express
              </p>
              <p>
                <strong>CSP:</strong> Previne ataques de injeção de código
              </p>
              <p>
                <strong>HSTS:</strong> Força conexões HTTPS
              </p>
              <p>
                <strong>XSS Filter:</strong> Proteção contra ataques XSS
              </p>
              <p>
                <strong>Frameguard:</strong> Previne clickjacking
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">Headers Comuns</h3>
            <div className="space-y-2">
              {commonHeaders.map((header) => (
                <button
                  key={header.key}
                  onClick={() => {
                    setNewHeaderKey(header.key);
                    setNewHeaderValue(header.value);
                  }}
                  className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
                >
                  <strong>{header.key}:</strong> {header.value}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">
              Presets de Segurança
            </h3>
            <div className="space-y-2">
              <button
                onClick={() =>
                  setFormData({
                    helmet: {
                      contentSecurityPolicy: true,
                      crossOriginEmbedderPolicy: true,
                      crossOriginOpenerPolicy: true,
                      crossOriginResourcePolicy: true,
                      dnsPrefetchControl: true,
                      frameguard: true,
                      hidePoweredBy: true,
                      hsts: true,
                      ieNoOpen: true,
                      noSniff: true,
                      originAgentCluster: true,
                      permittedCrossDomainPolicies: true,
                      referrerPolicy: true,
                      xssFilter: true,
                    },
                    customHeaders: {
                      'X-Content-Type-Options': 'nosniff',
                      'X-Frame-Options': 'DENY',
                      'X-XSS-Protection': '1; mode=block',
                    },
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Máxima Segurança:</strong> Todas as opções habilitadas
              </button>
              <button
                onClick={() =>
                  setFormData({
                    helmet: {
                      contentSecurityPolicy: true,
                      frameguard: true,
                      hidePoweredBy: true,
                      hsts: true,
                      noSniff: true,
                      xssFilter: true,
                      crossOriginEmbedderPolicy: false,
                      crossOriginOpenerPolicy: false,
                      crossOriginResourcePolicy: false,
                      dnsPrefetchControl: false,
                      ieNoOpen: false,
                      originAgentCluster: false,
                      permittedCrossDomainPolicies: false,
                      referrerPolicy: false,
                    },
                    customHeaders: {
                      'X-Content-Type-Options': 'nosniff',
                      'X-Frame-Options': 'SAMEORIGIN',
                    },
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Balanceado:</strong> Opções essenciais habilitadas
              </button>
              <button
                onClick={() =>
                  setFormData({
                    helmet: {
                      contentSecurityPolicy: false,
                      crossOriginEmbedderPolicy: false,
                      crossOriginOpenerPolicy: false,
                      crossOriginResourcePolicy: false,
                      dnsPrefetchControl: false,
                      frameguard: false,
                      hidePoweredBy: true,
                      hsts: false,
                      ieNoOpen: false,
                      noSniff: true,
                      originAgentCluster: false,
                      permittedCrossDomainPolicies: false,
                      referrerPolicy: false,
                      xssFilter: false,
                    },
                    customHeaders: {
                      'X-Content-Type-Options': 'nosniff',
                    },
                  })
                }
                className="w-full text-left px-3 py-2 text-sm bg-white rounded border hover:bg-gray-50"
              >
                <strong>Mínimo:</strong> Apenas proteções básicas
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-2">Recomendações</h3>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>• Habilite CSP para prevenir XSS</p>
              <p>• Use HSTS em produção com HTTPS</p>
              <p>• Configure Frameguard para prevenir clickjacking</p>
              <p>• Monitore violações de segurança nos logs</p>
              <p>• Teste configurações em diferentes navegadores</p>
              <p>• Mantenha headers customizados simples</p>
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
