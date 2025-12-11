import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, Home, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export const UnauthorizedPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Acesso Negado
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Você não tem permissão para acessar esta página
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Informações da sua conta
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <strong>Nome:</strong> {user?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {user?.email}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Função:</strong> {user?.role}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Home className="h-4 w-4 mr-2" />
                Ir para o Dashboard
              </Link>

              <button
                onClick={() => window.history.back()}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </button>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-500">
                Se você acredita que deveria ter acesso a esta página, entre em
                contato com o administrador do sistema.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
