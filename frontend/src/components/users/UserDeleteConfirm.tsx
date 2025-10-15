import React, { useState } from 'react';
import { X, Trash2, AlertTriangle, User } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';
import { User as UserType } from '../../types/user';

interface UserDeleteConfirmProps {
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UserDeleteConfirm: React.FC<UserDeleteConfirmProps> = ({
  user,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { deleteUser, isDeleting, error, clearError } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    clearError();

    try {
      await deleteUser(user.id);
      onSuccess?.();
      onClose();
    } catch (error) {
      // Erro já é tratado pelo store
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Confirmar Exclusão
              </h2>
              <p className="text-sm text-gray-500">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-red-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  className="h-12 w-12 rounded-full"
                  src={user.avatarUrl}
                  alt={user.name}
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Tem certeza que deseja excluir este usuário?
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Esta ação irá excluir permanentemente o usuário{' '}
                    <span className="font-medium">{user.name}</span> e todos os
                    dados associados. Esta ação não pode ser desfeita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting || isDeleting}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={isSubmitting || isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting || isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Excluindo...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Excluir Usuário</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
