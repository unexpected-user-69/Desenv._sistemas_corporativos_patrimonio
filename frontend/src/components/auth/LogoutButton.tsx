import React, { useState } from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface LogoutButtonProps {
  variant?: 'button' | 'dropdown';
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'button',
  className = '',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout, user, isLoading } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-3 py-2"
        >
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </button>

        {isDropdownOpen && (
          <>
            {/* Overlay para fechar o dropdown */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <p className="text-xs text-blue-600 font-medium">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isLoading ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <LogOut className="h-4 w-4 mr-2" />
      {isLoading ? 'Saindo...' : 'Sair'}
    </button>
  );
};

export default LogoutButton;
