import React, { useState } from 'react';
import {
  Database,
  Filter,
  BarChart3,
  Home,
  Activity,
  Zap,
  Settings,
  Shield,
  TestTube,
} from 'lucide-react';
import { MonitoringDashboard } from './components/monitoring/MonitoringDashboard';
import { CacheDashboard } from './components/cache/CacheDashboard';
// import { ProductionPage } from './pages/production/ProductionPage';
// import { TestingPage } from './pages/testing/TestingPage';

type TabType =
  | 'home'
  | 'cache'
  | 'filters'
  | 'analytics'
  | 'monitoring'
  | 'performance'
  | 'advanced'
  | 'production'
  | 'testing';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const tabs = [
    { id: 'home', name: 'Início', icon: Home },
    { id: 'cache', name: 'Cache Redis', icon: Database },
    { id: 'filters', name: 'Filtros Avançados', icon: Filter },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'monitoring', name: 'Monitoramento', icon: Activity },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'advanced', name: 'Avançado', icon: Settings },
    { id: 'production', name: 'Produção', icon: Shield },
    { id: 'testing', name: 'Testes', icon: TestTube },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Sistema de Patrimônio/Inventário
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Frontend com funcionalidades avançadas de Cache Redis e
                  Filtros
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="card text-center">
                    <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Cache Redis
                    </h3>
                    <p className="text-gray-600">
                      Gerenciamento e monitoramento do cache Redis com métricas
                      em tempo real
                    </p>
                  </div>
                  <div className="card text-center">
                    <Filter className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Filtros Avançados
                    </h3>
                    <p className="text-gray-600">
                      Busca avançada com filtros por intervalo de datas e mais
                    </p>
                  </div>
                  <div className="card text-center">
                    <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Analytics
                    </h3>
                    <p className="text-gray-600">
                      Análise de performance e uso dos filtros
                    </p>
                  </div>
                  <div className="card text-center">
                    <Activity className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Monitoramento
                    </h3>
                    <p className="text-gray-600">
                      Dashboard de métricas em tempo real e logs estruturados
                    </p>
                  </div>
                  <div className="card text-center">
                    <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Performance
                    </h3>
                    <p className="text-gray-600">
                      Testes de carga e stress para avaliação de performance
                    </p>
                  </div>
                  <div className="card text-center">
                    <Settings className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Avançado
                    </h3>
                    <p className="text-gray-600">
                      Funcionalidades avançadas e configurações do sistema
                    </p>
                  </div>
                  <div className="card text-center">
                    <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Produção
                    </h3>
                    <p className="text-gray-600">
                      Configurações de produção, segurança e monitoramento
                    </p>
                  </div>
                  <div className="card text-center">
                    <TestTube className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Testes
                    </h3>
                    <p className="text-gray-600">
                      Utilitários de teste, mocks e qualidade de código
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cache':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CacheDashboard />
            </div>
          </div>
        );
      case 'filters':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Filtros Avançados
                </h2>
                <p className="text-lg text-gray-600">
                  Sistema de filtros avançados em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Analytics e Relatórios
                </h2>
                <p className="text-lg text-gray-600">
                  Em desenvolvimento - Analytics avançados em breve
                </p>
              </div>
            </div>
          </div>
        );
      case 'monitoring':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <MonitoringDashboard />
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Testes de Performance
                </h2>
                <p className="text-lg text-gray-600">
                  Interface para testes de carga e stress em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        );
      case 'advanced':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Funcionalidades Avançadas
                </h2>
                <p className="text-lg text-gray-600">
                  Serviços avançados e endpoints especiais em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        );
      case 'production':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Funcionalidades de Produção
                </h2>
                <p className="text-lg text-gray-600">
                  Rate limiting, CORS, compression em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        );
      case 'testing':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Utilitários de Teste
                </h2>
                <p className="text-lg text-gray-600">
                  Test doubles, mocks avançados em desenvolvimento
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Sistema de Patrimônio/Inventário
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Sistema Avançado - Monitoramento, Performance & Cache
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{renderContent()}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>Sistema de Patrimônio/Inventário - Frontend Avançado</p>
            <p className="mt-1">
              Implementado com React, TypeScript, Tailwind CSS, Zustand e
              funcionalidades avançadas
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
