// Painel de configuração de Mocks

import React, { useState, useEffect } from 'react';
import { MockConfig } from '../../types/testing';
import { testingService } from '../../services/testing';

export const MockConfigPanel: React.FC = () => {
  const [mockConfigs, setMockConfigs] = useState<MockConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMock, setSelectedMock] = useState<MockConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'edit'>('list');
  const [editingMock, setEditingMock] = useState<MockConfig | null>(null);

  useEffect(() => {
    fetchMockConfigs();
  }, []);

  const fetchMockConfigs = async () => {
    try {
      setLoading(true);
      setError(null);
      const configs = await testingService.getMockConfigs();
      setMockConfigs(configs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar mock configs');
      console.error('Erro ao buscar mock configs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMock = async (mockId: string, enabled: boolean) => {
    try {
      await testingService.updateMockConfig(mockId, { enabled });
      setMockConfigs(prev => prev.map(mock => 
        mock.id === mockId ? { ...mock, enabled } : mock
      ));
    } catch (err) {
      console.error('Erro ao atualizar mock:', err);
    }
  };

  const handleDeleteMock = async (mockId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este mock?')) {
      try {
        await testingService.deleteMockConfig(mockId);
        setMockConfigs(prev => prev.filter(mock => mock.id !== mockId));
      } catch (err) {
        console.error('Erro ao deletar mock:', err);
      }
    }
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600 bg-green-100';
    if (statusCode >= 400 && statusCode < 500) return 'text-yellow-600 bg-yellow-100';
    if (statusCode >= 500) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erro ao carregar mock configs</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Configuração de Mocks</h2>
          <p className="text-sm text-gray-600">
            Configure mocks para simular respostas da API durante testes
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === 'list' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => {
              setActiveTab('create');
              setEditingMock(null);
            }}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === 'create' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Criar Mock
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          {mockConfigs.map((mock) => (
            <div key={mock.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-gray-900">{mock.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(mock.method)}`}>
                    {mock.method}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mock.statusCode)}`}>
                    {mock.statusCode}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    mock.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {mock.enabled ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleMock(mock.id, !mock.enabled)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      mock.enabled 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {mock.enabled ? 'Desativar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingMock(mock);
                      setActiveTab('edit');
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteMock(mock.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200"
                  >
                    Deletar
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Endpoint:</span>
                  <span className="ml-2 text-sm text-gray-600 font-mono">{mock.endpoint}</span>
                </div>
                
                {mock.delay && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Delay:</span>
                    <span className="ml-2 text-sm text-gray-600">{mock.delay}ms</span>
                  </div>
                )}

                <div>
                  <span className="text-sm font-medium text-gray-700">Resposta:</span>
                  <pre className="mt-1 bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>{JSON.stringify(mock.response, null, 2)}</code>
                  </pre>
                </div>

                {mock.conditions && mock.conditions.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Condições:</span>
                    <div className="mt-1 space-y-1">
                      {mock.conditions.map((condition) => (
                        <div key={condition.id} className="text-sm text-gray-600">
                          <span className="font-mono">{condition.field}</span>
                          <span className="mx-1">{condition.operator}</span>
                          <span className="font-mono">{JSON.stringify(condition.value)}</span>
                          <span className="ml-2 text-gray-500">({condition.description})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {(activeTab === 'create' || activeTab === 'edit') && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {activeTab === 'create' ? 'Criar Novo Mock' : 'Editar Mock'}
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  defaultValue={editingMock?.name || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Users API Mock"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endpoint
                </label>
                <input
                  type="text"
                  defaultValue={editingMock?.endpoint || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/v1/users"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método
                </label>
                <select
                  defaultValue={editingMock?.method || 'GET'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status Code
                </label>
                <input
                  type="number"
                  defaultValue={editingMock?.statusCode || 200}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="100"
                  max="599"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delay (ms)
                </label>
                <input
                  type="number"
                  defaultValue={editingMock?.delay || 0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resposta JSON
              </label>
              <textarea
                rows={6}
                defaultValue={editingMock ? JSON.stringify(editingMock.response, null, 2) : '{\n  "message": "Mock response"\n}'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="{\n  \"message\": \"Mock response\"\n}"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={editingMock?.enabled ?? true}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Mock ativo
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('list');
                  setEditingMock(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                {activeTab === 'create' ? 'Criar Mock' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
