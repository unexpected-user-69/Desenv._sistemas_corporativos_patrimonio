// Configuração do FilterService

import React, { useState, useEffect } from 'react';

interface FilterConfig {
  searchText: {
    enabled: boolean;
    caseSensitive: boolean;
    fuzzySearch: boolean;
    minLength: number;
  };
  dateRange: {
    enabled: boolean;
    defaultRange: '7d' | '30d' | '90d' | '1y';
    allowCustom: boolean;
  };
  pagination: {
    defaultLimit: number;
    maxLimit: number;
    cursorBased: boolean;
  };
  sorting: {
    defaultField: string;
    defaultOrder: 'ASC' | 'DESC';
    allowedFields: string[];
  };
  enabled: boolean;
}

export const FilterServiceConfig: React.FC = () => {
  const [config, setConfig] = useState<FilterConfig>({
    searchText: {
      enabled: true,
      caseSensitive: false,
      fuzzySearch: true,
      minLength: 2
    },
    dateRange: {
      enabled: true,
      defaultRange: '30d',
      allowCustom: true
    },
    pagination: {
      defaultLimit: 20,
      maxLimit: 100,
      cursorBased: false
    },
    sorting: {
      defaultField: 'createdAt',
      defaultOrder: 'DESC',
      allowedFields: ['name', 'email', 'createdAt', 'updatedAt', 'role']
    },
    enabled: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadConfig = async () => {
    try {
      setLoading(true);
      // Em produção, fazer requisição real para o backend
      // const response = await fetch('/api/filter/config');
      // const data = await response.json();
      // setConfig(data);

      // Mock data para demonstração
      setTimeout(() => {
        setConfig({
          searchText: {
            enabled: true,
            caseSensitive: false,
            fuzzySearch: true,
            minLength: 2
          },
          dateRange: {
            enabled: true,
            defaultRange: '30d',
            allowCustom: true
          },
          pagination: {
            defaultLimit: 20,
            maxLimit: 100,
            cursorBased: false
          },
          sorting: {
            defaultField: 'createdAt',
            defaultOrder: 'DESC',
            allowedFields: ['name', 'email', 'createdAt', 'updatedAt', 'role']
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
      // await fetch('/api/filter/config', {
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Configuração do Filter Service</h2>
        <p className="text-sm text-gray-600">
          Configure os filtros avançados e busca full-text
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
          {/* Busca Textual */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Busca Textual</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="search-enabled"
                  checked={config.searchText.enabled}
                  onChange={(e) => setConfig({
                    ...config,
                    searchText: { ...config.searchText, enabled: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="search-enabled" className="ml-2 block text-sm text-gray-700">
                  Busca textual habilitada
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="search-case-sensitive"
                  checked={config.searchText.caseSensitive}
                  onChange={(e) => setConfig({
                    ...config,
                    searchText: { ...config.searchText, caseSensitive: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="search-case-sensitive" className="ml-2 block text-sm text-gray-700">
                  Busca sensível a maiúsculas/minúsculas
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="search-fuzzy"
                  checked={config.searchText.fuzzySearch}
                  onChange={(e) => setConfig({
                    ...config,
                    searchText: { ...config.searchText, fuzzySearch: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="search-fuzzy" className="ml-2 block text-sm text-gray-700">
                  Busca fuzzy (aproximada)
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comprimento mínimo da busca
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.searchText.minLength}
                  onChange={(e) => setConfig({
                    ...config,
                    searchText: { ...config.searchText, minLength: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Filtro de Data */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Filtro de Data</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="date-enabled"
                  checked={config.dateRange.enabled}
                  onChange={(e) => setConfig({
                    ...config,
                    dateRange: { ...config.dateRange, enabled: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="date-enabled" className="ml-2 block text-sm text-gray-700">
                  Filtro de data habilitado
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período padrão
                </label>
                <select
                  value={config.dateRange.defaultRange}
                  onChange={(e) => setConfig({
                    ...config,
                    dateRange: { ...config.dateRange, defaultRange: e.target.value as any }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7d">7 dias</option>
                  <option value="30d">30 dias</option>
                  <option value="90d">90 dias</option>
                  <option value="1y">1 ano</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="date-custom"
                  checked={config.dateRange.allowCustom}
                  onChange={(e) => setConfig({
                    ...config,
                    dateRange: { ...config.dateRange, allowCustom: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="date-custom" className="ml-2 block text-sm text-gray-700">
                  Permitir período personalizado
                </label>
              </div>
            </div>
          </div>

          {/* Paginação */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Paginação</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limite padrão
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={config.pagination.defaultLimit}
                  onChange={(e) => setConfig({
                    ...config,
                    pagination: { ...config.pagination, defaultLimit: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limite máximo
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={config.pagination.maxLimit}
                  onChange={(e) => setConfig({
                    ...config,
                    pagination: { ...config.pagination, maxLimit: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pagination-cursor"
                  checked={config.pagination.cursorBased}
                  onChange={(e) => setConfig({
                    ...config,
                    pagination: { ...config.pagination, cursorBased: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="pagination-cursor" className="ml-2 block text-sm text-gray-700">
                  Paginação baseada em cursor
                </label>
              </div>
            </div>
          </div>

          {/* Ordenação */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Ordenação</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campo padrão
                </label>
                <select
                  value={config.sorting.defaultField}
                  onChange={(e) => setConfig({
                    ...config,
                    sorting: { ...config.sorting, defaultField: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {config.sorting.allowedFields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordem padrão
                </label>
                <select
                  value={config.sorting.defaultOrder}
                  onChange={(e) => setConfig({
                    ...config,
                    sorting: { ...config.sorting, defaultOrder: e.target.value as 'ASC' | 'DESC' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ASC">Crescente</option>
                  <option value="DESC">Decrescente</option>
                </select>
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

        {/* Informações */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Informações sobre Filtros</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>Busca Textual:</strong> Permite busca por texto em campos específicos</p>
              <p><strong>Busca Fuzzy:</strong> Tolerante a erros de digitação</p>
              <p><strong>Filtro de Data:</strong> Filtra registros por período</p>
              <p><strong>Paginação:</strong> Controla quantos registros são retornados</p>
              <p><strong>Ordenação:</strong> Define como os resultados são ordenados</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-medium text-green-900 mb-2">Recomendações</h3>
            <div className="text-sm text-green-800 space-y-1">
              <p>• Use busca fuzzy para melhor experiência do usuário</p>
              <p>• Configure limites razoáveis para paginação</p>
              <p>• Permita filtros de data personalizados</p>
              <p>• Monitore performance dos filtros</p>
              <p>• Teste com dados reais</p>
            </div>
          </div>

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
  );
};
