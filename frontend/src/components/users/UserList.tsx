// Componente de listagem de usuários

import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Shield,
  FileText,
} from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { User, UserRole } from '../../types/user';
import { UserFilters } from '../../types/user';

interface UserListProps {
  onEditUser?: (user: User) => void;
  onViewUser?: (user: User) => void;
  onDeleteUser?: (user: User) => void;
  onCreateUser?: () => void;
  onBulkOperations?: () => void;
}

export const UserList: React.FC<UserListProps> = ({
  onEditUser,
  onViewUser,
  onDeleteUser,
  onCreateUser,
  onBulkOperations,
}) => {
  const {
    users,
    totalUsers,
    currentPage,
    totalPages,
    hasNext,
    hasPrev,
    isLoading,
    error,
    filters,
    fetchUsers,
    setFilters,
    clearError,
  } = useUserStore();

  const [searchTerm, setSearchTerm] = useState(filters.q || '');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>(
    filters.role || '',
  );
  const [selectedStatus, setSelectedStatus] = useState<boolean | ''>(
    filters.isActive ?? '',
  );

  useEffect(() => {
    void fetchUsers();
  }, []);

  const handleSearch = () => {
    setFilters({ q: searchTerm, page: 1 });
    void fetchUsers({ q: searchTerm, page: 1 });
  };

  const handleFilterChange = () => {
    const newFilters: UserFilters = {
      page: 1,
      q: searchTerm,
      role: selectedRole || undefined,
      isActive: selectedStatus !== '' ? selectedStatus : undefined,
    };
    setFilters(newFilters);
    void fetchUsers(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    void fetchUsers(newFilters);
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.TEACHER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.STUDENT:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield className="h-4 w-4" />;
      case UserRole.TEACHER:
        return <UserCheck className="h-4 w-4" />;
      case UserRole.STUDENT:
        return <Users className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
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
              <h3 className="text-sm font-medium text-red-800">
                Erro ao carregar usuários
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
          <button
            onClick={clearError}
            className="text-red-600 hover:text-red-800"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Usuários</h2>
          <p className="text-gray-600">
            {totalUsers > 0
              ? `${totalUsers} usuários encontrados`
              : 'Carregando...'}
          </p>
        </div>
        <div className="flex space-x-3">
          {onBulkOperations && (
            <button
              onClick={onBulkOperations}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Operações em Lote</span>
            </button>
          )}
          <button
            onClick={onCreateUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Usuário</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Função
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) =>
                    setSelectedRole(e.target.value as UserRole | '')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todas as funções</option>
                  <option value={UserRole.ADMIN}>Administrador</option>
                  <option value={UserRole.TEACHER}>Professor</option>
                  <option value={UserRole.STUDENT}>Estudante</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={
                    selectedStatus === true
                      ? 'true'
                      : selectedStatus === false
                        ? 'false'
                        : ''
                  }
                  onChange={(e) =>
                    setSelectedStatus(
                      e.target.value === '' ? '' : e.target.value === 'true',
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos os status</option>
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleFilterChange}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Carregando usuários...</span>
        </div>
      )}

      {/* Users Table */}
      {!isLoading && users.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Função
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatarUrl ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatarUrl}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                      >
                        {getRoleIcon(user.role)}
                        <span className="ml-1">
                          {user.role === UserRole.ADMIN
                            ? 'Administrador'
                            : user.role === UserRole.TEACHER
                              ? 'Professor'
                              : 'Estudante'}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? (
                          <>
                            <UserCheck className="h-3 w-3 mr-1" />
                            Ativo
                          </>
                        ) : (
                          <>
                            <UserX className="h-3 w-3 mr-1" />
                            Inativo
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {onViewUser && (
                          <button
                            onClick={() => onViewUser(user)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        {onEditUser && (
                          <button
                            onClick={() => onEditUser(user)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        )}
                        {onDeleteUser && (
                          <button
                            onClick={() => onDeleteUser(user)}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && users.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nenhum usuário encontrado
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedRole || selectedStatus !== ''
              ? 'Tente ajustar os filtros de busca.'
              : 'Comece criando um novo usuário.'}
          </p>
          {onCreateUser && (
            <div className="mt-6">
              <button
                onClick={onCreateUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Usuário</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalUsers > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrev}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNext}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando{' '}
                <span className="font-medium">
                  {(currentPage - 1) * (filters.limit || 10) + 1}
                </span>{' '}
                até{' '}
                <span className="font-medium">
                  {Math.min(currentPage * (filters.limit || 10), totalUsers)}
                </span>{' '}
                de <span className="font-medium">{totalUsers}</span> resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrev}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Página {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNext}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
