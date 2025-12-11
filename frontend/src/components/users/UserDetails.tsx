// Componente de visualização detalhada de usuário

import React from 'react';
import {
  X,
  Edit,
  Trash2,
  User,
  Mail,
  Shield,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';
import { User as UserType, UserRole } from '../../types/user';

interface UserDetailsProps {
  user: UserType;
  onEdit?: (user: UserType) => void;
  onDelete?: (user: UserType) => void;
  onClose: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  onEdit,
  onDelete,
  onClose,
}) => {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800 border-red-200';
      case UserRole.MANAGER:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case UserRole.OPERATOR:
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield className="h-5 w-5" />;
      case UserRole.MANAGER:
        return <UserCheck className="h-5 w-5" />;
      case UserRole.OPERATOR:
        return <Users className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
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

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Acesso total ao sistema, incluindo gerenciamento de usuários e configurações';
      case UserRole.MANAGER:
        return 'Acesso a funcionalidades de gerenciamento e relatórios';
      case UserRole.OPERATOR:
        return 'Acesso básico ao sistema para operações do dia a dia';
      default:
        return 'Acesso básico ao sistema';
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

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Agora mesmo';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minuto${minutes > 1 ? 's' : ''} atrás`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} dia${days > 1 ? 's' : ''} atrás`;
    } else {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} mês${months > 1 ? 'es' : ''} atrás`;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/5 shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Detalhes do Usuário
              </h3>
              <p className="text-sm text-gray-600">
                Informações completas do usuário
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onEdit && (
              <button
                onClick={() => onEdit(user)}
                className="text-indigo-600 hover:text-indigo-900 p-1"
                title="Editar usuário"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(user)}
                className="text-red-600 hover:text-red-900 p-1"
                title="Excluir usuário"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={user.avatarUrl}
                  alt={user.name}
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xl font-semibold text-gray-900 truncate">
                {user.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 truncate">
                  {user.email}
                </span>
              </div>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(user.role)}`}
                >
                  {getRoleIcon(user.role)}
                  <span className="ml-2">{getRoleLabel(user.role)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {user.isActive ? (
                  <UserCheck className="h-5 w-5 text-green-600" />
                ) : (
                  <UserX className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm font-medium text-gray-900">
                  Status da Conta
                </span>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {user.isActive
                ? 'O usuário pode fazer login e acessar o sistema normalmente'
                : 'O usuário não pode fazer login no sistema'}
            </p>
          </div>

          {/* Role Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                Informações da Função
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {getRoleDescription(user.role)}
            </p>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Criado em
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {formatDate(user.createdAt)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {getTimeAgo(user.createdAt)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Última atualização
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {formatDate(user.updatedAt)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {getTimeAgo(user.updatedAt)}
              </p>
            </div>
          </div>

          {/* User ID */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                ID do Usuário
              </span>
            </div>
            <p className="text-sm text-gray-600 font-mono">{user.id}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Fechar
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center space-x-2"
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
