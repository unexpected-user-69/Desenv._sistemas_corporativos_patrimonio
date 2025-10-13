// Componente para funcionalidades avançadas

import React, { useState } from 'react';
import { HashServiceConfig } from './HashServiceConfig';
import { NormalizationServiceConfig } from './NormalizationServiceConfig';
import { FilterServiceConfig } from './FilterServiceConfig';
import { AdvancedSearch } from './AdvancedSearch';

type TabType = 'hash' | 'normalization' | 'filters' | 'search';

export const AdvancedFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('hash');

  const tabs = [
    { id: 'hash', name: 'Hash Service', icon: '🔐', description: 'Configuração de algoritmos de hash' },
    { id: 'normalization', name: 'Normalização', icon: '📝', description: 'Normalização de dados de entrada' },
    { id: 'filters', name: 'Filtros Avançados', icon: '🔍', description: 'Filtros avançados e busca full-text' },
    { id: 'search', name: 'Busca Avançada', icon: '⚡', description: 'Endpoints avançados de busca' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'hash':
        return <HashServiceConfig />;
      case 'normalization':
        return <NormalizationServiceConfig />;
      case 'filters':
        return <FilterServiceConfig />;
      case 'search':
        return <AdvancedSearch />;
      default:
        return <HashServiceConfig />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Funcionalidades Avançadas</h1>
        <p className="text-sm text-gray-600">
          Configuração e monitoramento de serviços avançados do backend
        </p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{tab.icon}</span>
                  <div className="text-left">
                    <div>{tab.name}</div>
                    <div className="text-xs text-gray-400">{tab.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
