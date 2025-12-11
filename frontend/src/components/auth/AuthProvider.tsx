import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { checkAuth, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Verificar autenticação na inicialização
    checkAuth();
  }, [checkAuth]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
