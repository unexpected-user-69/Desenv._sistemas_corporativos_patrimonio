import React, { useState } from 'react';
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Database,
  Bell,
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types/user';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Sistema de Patrimônio/Inventário',
  subtitle = 'Sistema Avançado - Monitoramento, Performance & Cache',
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAdmin, isManager, isOperator } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const getUserRoleLabel = () => {
    if (isAdmin()) return 'Administrador';
    if (isManager()) return 'Gerente';
    if (isOperator()) return 'Operador';
    return 'Usuário';
  };

  const getUserRoleColor = () => {
    if (isAdmin()) return 'text-red-600 bg-red-100';
    if (isManager()) return 'text-blue-600 bg-blue-100';
    if (isOperator()) return 'text-green-600 bg-green-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo e Título */}
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Menu do Usuário */}
          <div className="flex items-center space-x-4">
            {/* Notificações */}
            <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full">
              <Bell className="h-5 w-5" />
            </button>

            {/* Menu do Usuário */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {user?.avatarUrl ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatarUrl}
                      alt={user.name}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                </div>

                {/* Informações do Usuário */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUserRoleColor()}`}
                    >
                      {getUserRoleLabel()}
                    </span>
                  </div>
                </div>

                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {/* Informações do Usuário */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getUserRoleColor()}`}
                    >
                      {getUserRoleLabel()}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Navegar para perfil
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Meu Perfil
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Navegar para configurações
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Configurações
                  </button>

                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para fechar o menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};
