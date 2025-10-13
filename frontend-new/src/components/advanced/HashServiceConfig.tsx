// Configuração do HashService

import React, { useState, useEffect } from 'react';

interface HashConfig {
  saltRounds: number;
  pepper: string;
  algorithm: 'bcrypt' | 'scrypt' | 'argon2';
  enabled: boolean;
}

export const HashServiceConfig: React.FC = () => {
  const [config, setConfig] = useState<HashConfig>({
    saltRounds: 10,
    pepper: '',
    algorithm: 'bcrypt',
    enabled: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadConfig = async () => {
    try {
      setLoading(true);
      // Em produção, fazer requisição real para o backend
      // const response = await fetch('/api/hash/config');
      // const data = await response.json();
      // setConfig(data);

      // Mock data para demonstração
      setTimeout(() => {
        setConfig({
          saltRounds: 12,
          pepper: '***hidden***',
          algorithm: 'bcrypt',
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
      // await fetch('/api/hash/config', {
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

  const testHash = async () => {
    try {
      setLoading(true);
      setMessage(null);

      // Em produção, fazer requisição real para o backend
      // const response = await fetch('/api/hash/test', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ password: 'test123' })
      // });
      // const result = await response.json();

      // Mock data para demonstração
      setTimeout(() => {
        setMessage({ 
          type: 'success', 
          text: 'Teste realizado com sucesso! Hash gerado: $2b$12$...' 
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao testar hash' });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Configuração do Hash Service</h2>
        <p className="text-sm text-gray-600">
          Configure os parâmetros de hash de senhas e algoritmos de segurança
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Algoritmo de Hash
            </label>
            <select
              value={config.algorithm}
              onChange={(e) => setConfig({ ...config, algorithm: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bcrypt">bcrypt (Recomendado)</option>
              <option value="scrypt">scrypt</option>
              <option value="argon2">argon2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salt Rounds
            </label>
            <input
              type="number"
              min="8"
              max="20"
              value={config.saltRounds}
              onChange={(e) => setConfig({ ...config, saltRounds: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Valores mais altos aumentam a segurança mas reduzem a performance
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pepper (Opcional)
            </label>
            <input
              type="password"
              value={config.pepper}
              onChange={(e) => setConfig({ ...config, pepper: e.target.value })}
              placeholder="Digite o pepper para maior segurança"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              String adicional para aumentar a segurança do hash
            </p>
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

        {/* Informações e Testes */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Informações do Algoritmo</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>bcrypt:</strong> Algoritmo amplamente usado e testado</p>
              <p><strong>scrypt:</strong> Resistente a ataques de hardware especializado</p>
              <p><strong>argon2:</strong> Vencedor do Password Hashing Competition</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Recomendações</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Use pelo menos 12 salt rounds para produção</p>
              <p>• Configure um pepper forte e único</p>
              <p>• Teste a performance com seus dados</p>
              <p>• Monitore logs de hash para problemas</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={testHash}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Testando...' : 'Testar Hash'}
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Configuração'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
