import React from 'react';
import {
  X,
  Edit,
  Mail,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';
import { User, UserRole } from '../../types/user';

interface UserViewProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (user: User) => void;
}

export const UserView: React.FC<UserViewProps> = ({
  user,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!isOpen) return null;

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.MANAGER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.OPERATOR:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield className="h-4 w-4" />;
      case UserRole.MANAGER:
        return <UserCheck className="h-4 w-4" />;
      case UserRole.OPERATOR:
        return <Users className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Administrador';
      case UserRole.MANAGER:
        return 'Gerente';
      case UserRole.OPERATOR:
        return 'Operador';
      default:
        return 'Operador';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Detalhes do Usuário
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  className="h-16 w-16 rounded-full"
                  src={user.avatarUrl}
                  alt={user.name}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {user.email}
              </p>
            </div>
          </div>

          {/* Role and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Função
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}
              >
                {getRoleIcon(user.role)}
                <span className="ml-1">{getRoleLabel(user.role)}</span>
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user.isActive ? (
                  <>
                    <UserCheck className="h-4 w-4 mr-1" />
                    Ativo
                  </>
                ) : (
                  <>
                    <UserX className="h-4 w-4 mr-1" />
                    Inativo
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Criado em
              </label>
              <p className="text-sm text-gray-900 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {formatDate(user.createdAt)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Última atualização
              </label>
              <p className="text-sm text-gray-900 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>

          {/* ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID do Usuário
            </label>
            <p className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-2 rounded">
              {user.id}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Fechar
          </button>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(user)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Editar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
