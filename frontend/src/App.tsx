// App principal do frontend

import React, { useState } from 'react';
import { MonitoringPage } from './pages/monitoring/MonitoringPage';
import { PerformancePage } from './pages/performance/PerformancePage';
import { AdvancedFeatures } from './components/advanced/AdvancedFeatures';

type TabType = 'monitoring' | 'performance' | 'advanced';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('monitoring');

  const tabs = [
    { id: 'monitoring', name: 'Monitoramento', icon: '📊' },
    { id: 'performance', name: 'Performance', icon: '⚡' },
    { id: 'advanced', name: 'Avançado', icon: '🔧' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'monitoring':
        return <MonitoringPage />;
      case 'performance':
        return <PerformancePage />;
      case 'advanced':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <AdvancedFeatures />
            </div>
          </div>
        );
      default:
        return <MonitoringPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Sistema de Patrimônio/Inventário
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Frontend - Funcionalidades Avançadas
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
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
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>
              Sistema de Patrimônio/Inventário - Frontend Avançado
            </p>
            <p className="mt-1">
              Implementado com React, TypeScript e Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
