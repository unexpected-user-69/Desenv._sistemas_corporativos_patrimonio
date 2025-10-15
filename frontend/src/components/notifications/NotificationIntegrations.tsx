// Componente de integrações de notificações

import React, { useEffect } from 'react';
import {
  Activity,
  Plus,
  Edit,
  Trash2,
  Eye,
  TestTube,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { useNotificationsStore } from '../../stores/notificationsStore';

export const NotificationIntegrations: React.FC = () => {
  const { integrations, isLoading, fetchIntegrations } =
    useNotificationsStore();

  useEffect(() => {
    void fetchIntegrations();
  }, [fetchIntegrations]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Carregando integrações...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Integrações de Notificação
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nova Integração</span>
        </button>
      </div>

      {integrations.length === 0 ? (
        <div className="text-center py-8">
          <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Nenhuma integração configurada</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-md font-medium text-gray-900">
                      {integration.name}
                    </h4>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      {integration.isActive ? (
                        <ToggleRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Tipo: {integration.type}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>
                      Criado:{' '}
                      {new Date(integration.createdAt).toLocaleDateString(
                        'pt-BR',
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                    <TestTube className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-yellow-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
