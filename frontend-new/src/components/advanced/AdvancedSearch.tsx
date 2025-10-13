// Interface para endpoints avançados de busca

import React, { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  score?: number;
}

interface SearchParams {
  q: string;
  role?: string;
  isActive?: boolean;
  createdAfter?: string;
  createdBefore?: string;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
  page: number;
  limit: number;
}

export const AdvancedSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    q: '',
    role: '',
    isActive: undefined,
    createdAfter: '',
    createdBefore: '',
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    page: 1,
    limit: 20
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const searchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Em produção, fazer requisição real para o backend
      // const params = new URLSearchParams();
      // Object.entries(searchParams).forEach(([key, value]) => {
      //   if (value !== undefined && value !== '') {
      //     params.append(key, value.toString());
      //   }
      // });
      // const response = await fetch(`/api/users/advanced?${params}`);
      // const data = await response.json();
      // setResults(data.data);
      // setTotal(data.total);

      // Mock data para demonstração
      const mockResults: SearchResult[] = [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao.silva@email.com',
          role: 'STUDENT',
          createdAt: '2024-01-15T10:30:00Z',
          score: 0.95
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria.santos@email.com',
          role: 'TEACHER',
          createdAt: '2024-01-20T14:15:00Z',
          score: 0.87
        },
        {
          id: '3',
          name: 'Pedro Oliveira',
          email: 'pedro.oliveira@email.com',
          role: 'ADMIN',
          createdAt: '2024-02-01T09:45:00Z',
          score: 0.92
        }
      ];

      setTimeout(() => {
        setResults(mockResults);
        setTotal(mockResults.length);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Erro ao buscar usuários');
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers();
  };

  const clearSearch = () => {
    setSearchParams({
      q: '',
      role: '',
      isActive: undefined,
      createdAfter: '',
      createdBefore: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
      page: 1,
      limit: 20
    });
    setResults([]);
    setTotal(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Busca Avançada de Usuários</h2>
        <p className="text-sm text-gray-600">
          Utilize filtros avançados para encontrar usuários específicos
        </p>
      </div>

      {/* Formulário de Busca */}
      <div className="bg-white border rounded-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Busca Textual
              </label>
              <input
                type="text"
                value={searchParams.q}
                onChange={(e) => setSearchParams({ ...searchParams, q: e.target.value })}
                placeholder="Nome ou email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                value={searchParams.role}
                onChange={(e) => setSearchParams({ ...searchParams, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="STUDENT">Estudante</option>
                <option value="TEACHER">Professor</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={searchParams.isActive === undefined ? '' : searchParams.isActive.toString()}
                onChange={(e) => setSearchParams({ 
                  ...searchParams, 
                  isActive: e.target.value === '' ? undefined : e.target.value === 'true'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Criação (Início)
              </label>
              <input
                type="date"
                value={searchParams.createdAfter}
                onChange={(e) => setSearchParams({ ...searchParams, createdAfter: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Criação (Fim)
              </label>
              <input
                type="date"
                value={searchParams.createdBefore}
                onChange={(e) => setSearchParams({ ...searchParams, createdBefore: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={searchParams.sortBy}
                onChange={(e) => setSearchParams({ ...searchParams, sortBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Nome</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
                <option value="createdAt">Data de Criação</option>
                <option value="updatedAt">Data de Atualização</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordem
              </label>
              <select
                value={searchParams.sortOrder}
                onChange={(e) => setSearchParams({ ...searchParams, sortOrder: e.target.value as 'ASC' | 'DESC' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ASC">Crescente</option>
                <option value="DESC">Decrescente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Limite por página
              </label>
              <select
                value={searchParams.limit}
                onChange={(e) => setSearchParams({ ...searchParams, limit: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Limpar
            </button>
          </div>
        </form>
      </div>

      {/* Resultados */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="bg-white border rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Resultados ({total} encontrados)
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {results.map((user) => (
              <div key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                    {user.score && (
                      <p className="text-xs text-gray-500 mt-1">
                        Score: {(user.score * 100).toFixed(0)}%
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Criado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && results.length === 0 && searchParams.q && (
        <div className="bg-gray-50 border rounded-lg p-8 text-center">
          <p className="text-gray-600">Nenhum usuário encontrado com os critérios especificados.</p>
        </div>
      )}
    </div>
  );
};
