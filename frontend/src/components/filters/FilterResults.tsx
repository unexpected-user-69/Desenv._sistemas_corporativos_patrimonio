import React, { useState } from 'react';
import { useFilterStore } from '../../stores/filterStore';
import { 
  Users, 
  Mail, 
  Calendar, 
  Shield,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';

export const FilterResults: React.FC = () => {
  const { filterResults, isLoading } = useFilterStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const totalResults = filterResults.length;
  const loading = isLoading;

  // Dados simulados para demonstração
  const mockUsers = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      role: 'STUDENT',
      isActive: true,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      role: 'TEACHER',
      isActive: true,
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-18T16:20:00Z'
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      role: 'ADMIN',
      isActive: false,
      createdAt: '2024-01-05T08:00:00Z',
      updatedAt: '2024-01-12T11:30:00Z'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'TEACHER':
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'ADMIN':
        return <Shield className="h-4 w-4 text-purple-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return 'Estudante';
      case 'TEACHER':
        return 'Professor';
      case 'ADMIN':
        return 'Administrador';
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Resultados</h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {totalResults.toLocaleString()} resultado(s) encontrado(s)
          </div>
          <div className="text-sm text-gray-500">
            Consulta em 50ms
          </div>
        </div>
      </div>

      {totalResults === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum resultado encontrado</h3>
          <p className="text-gray-500">Tente ajustar os filtros para encontrar o que procura.</p>
        </div>
      ) : (
        <>
          {/* Lista de Usuários */}
          <div className="space-y-4">
            {mockUsers.map((user: any) => (
              <div
                key={user.id}
                className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                </div>

                {/* Informações do Usuário */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </h4>
                    <div className="ml-2 flex items-center">
                      {getRoleIcon(user.role)}
                      <span className="ml-1 text-xs text-gray-500">
                        {getRoleLabel(user.role)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="mt-1 flex items-center text-xs text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Criado em {formatDate(user.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>Atualizado em {formatDate(user.updatedAt)}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center">
                    {user.isActive ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="ml-1 text-sm text-gray-500">
                      {user.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex-shrink-0">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Itens por página:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="input w-20"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-gray-500">...</span>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`px-3 py-1 text-sm rounded ${
                          currentPage === totalPages
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
