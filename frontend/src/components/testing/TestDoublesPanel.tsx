// Painel de Test Doubles - Dummy, Stub, Spy, Mock, Fake

import React, { useState, useEffect } from 'react';
import { TestDouble } from '../../types/testing';
import { testingService } from '../../services/testing';

export const TestDoublesPanel: React.FC = () => {
  const [testDoubles, setTestDoubles] = useState<TestDouble[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDouble, setSelectedDouble] = useState<TestDouble | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'examples'>('list');

  useEffect(() => {
    fetchTestDoubles();
  }, []);

  const fetchTestDoubles = async () => {
    try {
      setLoading(true);
      setError(null);
      const doubles = await testingService.getTestDoubles();
      setTestDoubles(doubles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar test doubles');
      console.error('Erro ao buscar test doubles:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'dummy': return 'bg-gray-100 text-gray-800';
      case 'stub': return 'bg-blue-100 text-blue-800';
      case 'spy': return 'bg-green-100 text-green-800';
      case 'mock': return 'bg-purple-100 text-purple-800';
      case 'fake': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'dummy': return 'Objeto que nunca é usado, apenas preenche parâmetros';
      case 'stub': return 'Fornece respostas pré-definidas para chamadas de método';
      case 'spy': return 'Registra informações sobre como foi chamado';
      case 'mock': return 'Verifica se as interações ocorreram como esperado';
      case 'fake': return 'Implementação funcional simplificada para testes';
      default: return 'Tipo de test double não reconhecido';
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
            <h3 className="text-sm font-medium text-red-800">Erro ao carregar test doubles</h3>
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
          <h2 className="text-xl font-semibold text-gray-900">Test Doubles</h2>
          <p className="text-sm text-gray-600">
            Dummy, Stub, Spy, Mock e Fake - Padrões para testes unitários
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
            onClick={() => setActiveTab('create')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === 'create' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Criar
          </button>
          <button
            onClick={() => setActiveTab('examples')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeTab === 'examples' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Exemplos
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testDoubles.map((testDouble) => (
            <div
              key={testDouble.id}
              className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedDouble(testDouble)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">{testDouble.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(testDouble.type)}`}>
                  {testDouble.type.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{testDouble.description}</p>
              <p className="text-xs text-gray-500 mb-4">{getTypeDescription(testDouble.type)}</p>
              <div className="text-xs text-gray-400">
                {testDouble.examples.length} exemplo(s)
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Test Double</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: UserRepository Mock"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="dummy">Dummy</option>
                <option value="stub">Stub</option>
                <option value="spy">Spy</option>
                <option value="mock">Mock</option>
                <option value="fake">Fake</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva o propósito deste test double..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Implementação
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="// Código do test double..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Criar Test Double
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'examples' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemplos de Uso</h3>
            <div className="space-y-4">
              {testDoubles.map((testDouble) => (
                <div key={testDouble.id} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{testDouble.name}</h4>
                  <div className="space-y-3">
                    {testDouble.examples.map((example) => (
                      <div key={example.id} className="bg-gray-50 rounded p-3">
                        <h5 className="font-medium text-gray-800 mb-2">{example.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                        <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                        <p className="text-xs text-gray-500 mt-2">
                          <strong>Resultado esperado:</strong> {example.expectedResult}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedDouble && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedDouble.name}</h3>
                <button
                  onClick={() => setSelectedDouble(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedDouble.type)}`}>
                    {selectedDouble.type.toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">{selectedDouble.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Implementação</h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                    <code>{selectedDouble.implementation}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Uso</h4>
                  <p className="text-sm text-gray-600">{selectedDouble.usage}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Exemplos</h4>
                  <div className="space-y-3">
                    {selectedDouble.examples.map((example) => (
                      <div key={example.id} className="border rounded p-3">
                        <h5 className="font-medium text-gray-800 mb-2">{example.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                        <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                        <p className="text-xs text-gray-500 mt-2">
                          <strong>Resultado esperado:</strong> {example.expectedResult}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
