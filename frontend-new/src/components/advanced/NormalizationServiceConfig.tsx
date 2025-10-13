// Configuração do NormalizationService

import React, { useState, useEffect } from 'react';

interface NormalizationConfig {
  email: {
    trim: boolean;
    lowercase: boolean;
    removeSpaces: boolean;
  };
  name: {
    trim: boolean;
    compactSpaces: boolean;
    capitalize: boolean;
  };
  text: {
    trim: boolean;
    compactSpaces: boolean;
    removeSpecialChars: boolean;
  };
  enabled: boolean;
}

export const NormalizationServiceConfig: React.FC = () => {
  const [config, setConfig] = useState<NormalizationConfig>({
    email: {
      trim: true,
      lowercase: true,
      removeSpaces: true
    },
    name: {
      trim: true,
      compactSpaces: true,
      capitalize: false
    },
    text: {
      trim: true,
      compactSpaces: true,
      removeSpecialChars: false
    },
    enabled: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');

  const loadConfig = async () => {
    try {
      setLoading(true);
      // Em produção, fazer requisição real para o backend
      // const response = await fetch('/api/normalization/config');
      // const data = await response.json();
      // setConfig(data);

      // Mock data para demonstração
      setTimeout(() => {
        setConfig({
          email: {
            trim: true,
            lowercase: true,
            removeSpaces: true
          },
          name: {
            trim: true,
            compactSpaces: true,
            capitalize: true
          },
          text: {
            trim: true,
            compactSpaces: true,
            removeSpecialChars: false
          },
          enabled: true
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao carregar configuração' });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Em produção, fazer requisição real para o backend
      // await fetch('/api/normalization/config', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });

      // Mock data para demonstração
      setTimeout(() => {
        setMessage({ type: 'success', text: 'Configuração salva com sucesso!' });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao salvar configuração' });
      setLoading(false);
    }
  };

  const testNormalization = async () => {
    if (!testInput.trim()) {
      setMessage({ type: 'error', text: 'Digite um texto para testar' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // Em produção, fazer requisição real para o backend
      // const response = await fetch('/api/normalization/test', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     input: testInput,
      //     type: 'text' // ou 'email', 'name'
      //   })
      // });
      // const result = await response.json();
      // setTestOutput(result.normalized);

      // Mock data para demonstração
      let normalized = testInput;
      
      if (config.text.trim) {
        normalized = normalized.trim();
      }
      
      if (config.text.compactSpaces) {
        normalized = normalized.replace(/\s+/g, ' ');
      }
      
      if (config.text.removeSpecialChars) {
        normalized = normalized.replace(/[^\w\s]/g, '');
      }

      setTimeout(() => {
        setTestOutput(normalized);
        setLoading(false);
      }, 500);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao testar normalização' });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Configuração do Normalization Service</h2>
        <p className="text-sm text-gray-600">
          Configure como os dados de entrada são normalizados antes do processamento
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-6">
          {/* Email */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Normalização de Email</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-trim"
                  checked={config.email.trim}
                  onChange={(e) => setConfig({
                    ...config,
                    email: { ...config.email, trim: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="email-trim" className="ml-2 block text-sm text-gray-700">
                  Remover espaços no início e fim
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-lowercase"
                  checked={config.email.lowercase}
                  onChange={(e) => setConfig({
                    ...config,
                    email: { ...config.email, lowercase: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="email-lowercase" className="ml-2 block text-sm text-gray-700">
                  Converter para minúsculas
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email-remove-spaces"
                  checked={config.email.removeSpaces}
                  onChange={(e) => setConfig({
                    ...config,
                    email: { ...config.email, removeSpaces: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="email-remove-spaces" className="ml-2 block text-sm text-gray-700">
                  Remover espaços internos
                </label>
              </div>
            </div>
          </div>

          {/* Nome */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Normalização de Nome</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="name-trim"
                  checked={config.name.trim}
                  onChange={(e) => setConfig({
                    ...config,
                    name: { ...config.name, trim: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="name-trim" className="ml-2 block text-sm text-gray-700">
                  Remover espaços no início e fim
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="name-compact-spaces"
                  checked={config.name.compactSpaces}
                  onChange={(e) => setConfig({
                    ...config,
                    name: { ...config.name, compactSpaces: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="name-compact-spaces" className="ml-2 block text-sm text-gray-700">
                  Compactar espaços múltiplos
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="name-capitalize"
                  checked={config.name.capitalize}
                  onChange={(e) => setConfig({
                    ...config,
                    name: { ...config.name, capitalize: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="name-capitalize" className="ml-2 block text-sm text-gray-700">
                  Capitalizar primeira letra de cada palavra
                </label>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Normalização de Texto</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="text-trim"
                  checked={config.text.trim}
                  onChange={(e) => setConfig({
                    ...config,
                    text: { ...config.text, trim: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="text-trim" className="ml-2 block text-sm text-gray-700">
                  Remover espaços no início e fim
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="text-compact-spaces"
                  checked={config.text.compactSpaces}
                  onChange={(e) => setConfig({
                    ...config,
                    text: { ...config.text, compactSpaces: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="text-compact-spaces" className="ml-2 block text-sm text-gray-700">
                  Compactar espaços múltiplos
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="text-remove-special"
                  checked={config.text.removeSpecialChars}
                  onChange={(e) => setConfig({
                    ...config,
                    text: { ...config.text, removeSpecialChars: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="text-remove-special" className="ml-2 block text-sm text-gray-700">
                  Remover caracteres especiais
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="enabled"
              checked={config.enabled}
              onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="enabled" className="ml-2 block text-sm text-gray-700">
              Serviço ativo
            </label>
          </div>
        </div>

        {/* Teste */}
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Teste de Normalização</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto de Entrada
                </label>
                <textarea
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="Digite um texto para testar a normalização..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <button
                onClick={testNormalization}
                disabled={loading || !testInput.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Normalizando...' : 'Testar Normalização'}
              </button>
              {testOutput && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resultado
                  </label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md">
                    {testOutput}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar Configuração'}
          </button>
        </div>
      </div>
    </div>
  );
};
