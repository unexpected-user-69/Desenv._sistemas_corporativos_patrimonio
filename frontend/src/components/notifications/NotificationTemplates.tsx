// Componente de templates de notificações

import React, { useEffect } from 'react';
import { Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useNotificationsStore } from '../../stores/notificationsStore';

export const NotificationTemplates: React.FC = () => {
  const { templates, isLoading, fetchTemplates } = useNotificationsStore();

  useEffect(() => {
    void fetchTemplates();
  }, [fetchTemplates]);

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Carregando templates...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Templates de Notificação
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Novo Template</span>
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-8">
          <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Nenhum template encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">
                  {template.name}
                </h4>
                <div className="flex items-center space-x-1">
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
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {template.isActive ? 'Ativo' : 'Inativo'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(template.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
