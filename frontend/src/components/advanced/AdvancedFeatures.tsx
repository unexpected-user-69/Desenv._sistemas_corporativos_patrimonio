// Componente para funcionalidades avançadas

import React, { useState } from 'react';
import {
  AdvancedSearchParams,
  FuzzySearchParams,
  DateRangeParams,
  SearchResult,
} from '../../types/advanced';
import { advancedService } from '../../services/advanced';

export const AdvancedFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'search' | 'fuzzy' | 'dateRange' | 'stats'
  >('search');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para busca avançada
  const [advancedSearch, setAdvancedSearch] = useState<AdvancedSearchParams>({
    query: '',
    fields: ['name', 'email'],
    filters: {},
    sort: { field: 'name', order: 'asc' },
    pagination: { page: 1, limit: 10 },
    options: { fuzzy: false, highlight: false, explain: false },
  });

  // Estados para busca fuzzy
  const [fuzzySearch, setFuzzySearch] = useState<FuzzySearchParams>({
    query: '',
    fields: ['name', 'email'],
    threshold: 0.7,
    maxResults: 10,
    options: { caseSensitive: false, exactMatch: false, wildcards: false },
  });

  // Estados para busca por data
  const [dateRange, setDateRange] = useState<DateRangeParams>({
    field: 'createdAt',
    start: '',
    end: '',
    timezone: 'America/Sao_Paulo',
  });

  const handleAdvancedSearch = async () => {
    if (!advancedSearch.query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const results = await advancedService.advancedSearch(advancedSearch);
      setSearchResults(results);
    } catch {
      setError('Erro na busca avançada');
    } finally {
      setLoading(false);
    }
  };

  const handleFuzzySearch = async () => {
    if (!fuzzySearch.query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const results = await advancedService.fuzzySearch(fuzzySearch);
      setSearchResults(results);
    } catch {
      setError('Erro na busca fuzzy');
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeSearch = async () => {
    if (!dateRange.start || !dateRange.end) return;

    try {
      setLoading(true);
      setError(null);
      const results = await advancedService.dateRangeSearch(dateRange);
      setSearchResults(results);
    } catch {
      setError('Erro na busca por data');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'search', name: 'Busca Avançada', icon: '🔍' },
    { id: 'fuzzy', name: 'Busca Fuzzy', icon: '🎯' },
    { id: 'dateRange', name: 'Busca por Data', icon: '📅' },
    { id: 'stats', name: 'Estatísticas', icon: '📊' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Funcionalidades Avançadas
        </h1>
        <p className="text-sm text-gray-600">
          Ferramentas avançadas de busca, filtros e análise de dados
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as 'search' | 'fuzzy' | 'dateRange' | 'stats',
                )
              }
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erro</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo das Tabs */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'search' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Busca Avançada
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Query de Busca
                </label>
                <input
                  type="text"
                  value={advancedSearch.query}
                  onChange={(e) =>
                    setAdvancedSearch({
                      ...advancedSearch,
                      query: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua busca..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campos de Busca
                </label>
                <select
                  multiple
                  value={advancedSearch.fields}
                  onChange={(e) =>
                    setAdvancedSearch({
                      ...advancedSearch,
                      fields: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value,
                      ),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Nome</option>
                  <option value="email">Email</option>
                  <option value="role">Role</option>
                  <option value="createdAt">Data de Criação</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={advancedSearch.sort.field}
                  onChange={(e) =>
                    setAdvancedSearch({
                      ...advancedSearch,
                      sort: { ...advancedSearch.sort, field: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Nome</option>
                  <option value="email">Email</option>
                  <option value="createdAt">Data de Criação</option>
                  <option value="updatedAt">Data de Atualização</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordem
                </label>
                <select
                  value={advancedSearch.sort.order}
                  onChange={(e) =>
                    setAdvancedSearch({
                      ...advancedSearch,
                      sort: {
                        ...advancedSearch.sort,
                        order: e.target.value as 'asc' | 'desc',
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limite de Resultados
                </label>
                <input
                  type="number"
                  value={advancedSearch.pagination.limit}
                  onChange={(e) =>
                    setAdvancedSearch({
                      ...advancedSearch,
                      pagination: {
                        ...advancedSearch.pagination,
                        limit: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={advancedSearch.options.fuzzy}
                  onChange={(e) =>
                    setAdvancedSearch({
                      ...advancedSearch,
                      options: {
                        ...advancedSearch.options,
                        fuzzy: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Busca Fuzzy</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={advancedSearch.options.highlight}
                  onChange={(e) =>
                    setAdvancedSearch({
                      ...advancedSearch,
                      options: {
                        ...advancedSearch.options,
                        highlight: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Destaque</span>
              </label>
            </div>

            <button
              onClick={() => {
                void handleAdvancedSearch();
              }}
              disabled={loading || !advancedSearch.query.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              Buscar
            </button>
          </div>
        )}

        {activeTab === 'fuzzy' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Busca Fuzzy (Aproximada)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Query de Busca
                </label>
                <input
                  type="text"
                  value={fuzzySearch.query}
                  onChange={(e) =>
                    setFuzzySearch({ ...fuzzySearch, query: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua busca (pode ter erros de digitação)..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limiar de Similaridade
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={fuzzySearch.threshold}
                  onChange={(e) =>
                    setFuzzySearch({
                      ...fuzzySearch,
                      threshold: parseFloat(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <div className="text-sm text-gray-600 mt-1">
                  {fuzzySearch.threshold} (0 = muito flexível, 1 = muito
                  restritivo)
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                void handleFuzzySearch();
              }}
              disabled={loading || !fuzzySearch.query.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              Busca Fuzzy
            </button>
          </div>
        )}

        {activeTab === 'dateRange' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Busca por Intervalo de Datas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campo de Data
                </label>
                <select
                  value={dateRange.field}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, field: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="createdAt">Data de Criação</option>
                  <option value="updatedAt">Data de Atualização</option>
                  <option value="lastLogin">Último Login</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Inicial
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Final
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => {
                void handleDateRangeSearch();
              }}
              disabled={loading || !dateRange.start || !dateRange.end}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
              Buscar por Data
            </button>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Estatísticas
            </h2>
            <p className="text-gray-600">
              Visualize estatísticas detalhadas do sistema e usuários.
            </p>
            {/* Implementar componentes de estatísticas aqui */}
          </div>
        )}
      </div>

      {/* Resultados */}
      {searchResults && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Resultados da Busca
            </h2>
            <p className="text-sm text-gray-600">
              {searchResults.pagination.total} resultados encontrados
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {searchResults.data.map((item: any, index: number) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.name || item.email}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.email || item.role}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.createdAt &&
                      new Date(item.createdAt as string).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
