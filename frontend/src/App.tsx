import React, { useState, useEffect } from 'react';
import { Spinner } from './components/ui/Spinner';
import { Toast, ToastItem } from './components/ui/Toast';
import Splash from './components/ui/Splash';
// framer-motion removed to avoid install/runtime issues; using CSS transitions instead
import CacheIcon from './components/icons/CacheIcon';
import FilterIcon from './components/icons/FilterIcon';
import AnalyticsIcon from './components/icons/AnalyticsIcon';
import MonitoringIcon from './components/icons/MonitoringIcon';
import PerformanceIcon from './components/icons/PerformanceIcon';
import AdvancedIcon from './components/icons/AdvancedIcon';
import ProductionIcon from './components/icons/ProductionIcon';
import TestingIcon from './components/icons/TestingIcon';
import api from './utils/api';
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [showSplash, setShowSplash] = useState(true);

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      id: 'cache',
                      title: 'Cache Redis',
                      icon: CacheIcon,
                      description:
                        'Gerenciamento e monitoramento do cache Redis com métricas em tempo real',
                    },
                    {
                      id: 'filters',
                      title: 'Filtros Avançados',
                      icon: FilterIcon,
                      description: 'Busca avançada com filtros por intervalo de datas e mais',
                    },
                    {
                      id: 'analytics',
                      title: 'Analytics',
                      icon: AnalyticsIcon,
                      description: 'Análise de performance e uso dos filtros',
                    },
                    {
                      id: 'monitoring',
                      title: 'Monitoramento',
                      icon: MonitoringIcon,
                      description: 'Dashboard de métricas em tempo real e logs estruturados',
                    },
                    {
                      id: 'performance',
                      title: 'Performance',
                      icon: PerformanceIcon,
                      description: 'Testes de carga e stress para avaliação de performance',
                    },
                    {
                      id: 'advanced',
                      title: 'Avançado',
                      icon: AdvancedIcon,
                      description: 'Funcionalidades avançadas e configurações do sistema',
                    },
                    {
                      id: 'production',
                      title: 'Produção',
                      icon: ProductionIcon,
                      description: 'Configurações de produção, segurança e monitoramento',
                    },
                    {
                      id: 'testing',
                      title: 'Testes',
                      icon: TestingIcon,
                      description: 'Utilitários de teste, mocks e qualidade de código',
                    },
                    ].map((c) => {
                    const Icon = c.icon as any;
                    return (
                      <div
                        key={c.id}
                        className="bg-white/90 backdrop-blur-md rounded-lg shadow p-6 flex flex-col justify-between animate-fade-in hover:scale-[1.02] hover:shadow-lg transition-transform duration-200"
                      >
                        <div>
                          <Icon className="h-10 w-10 mb-4" />
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            {c.title}
                          </h3>
                          <p className="text-slate-600 mb-4">{c.description}</p>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => setActiveTab(c.id as TabType)}
                            className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-600 text-sm"
                          >
                            Abrir
                          </button>
                          {c.id === 'cache' && (
                            <button
                              onClick={async () => {
                                setStatusMessage(null);
                                setActionLoading((s) => ({ ...s, [c.id]: true }));
                                try {
                                  const res = await api.safeFetch('/v1/cache/stats');
                                  const msg = `Cache stats: ${res.status} - ${res.text.slice(0,200)}`;
                                  setStatusMessage(msg);
                                  addToast('Stats carregados', 'success');
                                } catch (err: any) {
                                  const msg = `Erro ao buscar stats: ${err.message || err}`;
                                  setStatusMessage(msg);
                                  addToast('Erro ao buscar stats', 'error');
                                } finally {
                                  setActionLoading((s) => ({ ...s, [c.id]: false }));
                                }
                              }}
                              className="px-3 py-1 bg-white border text-slate-800 rounded hover:bg-slate-50 text-sm flex items-center gap-2"
                            >
                              {actionLoading[c.id] ? <Spinner className="h-4 w-4" /> : 'Ver stats'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6">
                  <div className="max-w-xl mx-auto">
                        <div className="flex items-center justify-between p-4 bg-white rounded shadow">
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="text-sm text-gray-800">
                          {loading ? 'Carregando...' : statusMessage || 'Pronto'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={async () => {
                            setStatusMessage(null);
                            setActionLoading((s) => ({ ...s, health: true }));
                            try {
                              const res = await api.safeFetch('/v1/health');
                              const msg = `Health: ${res.status} - ${res.text.slice(0,200)}`;
                              setStatusMessage(msg);
                              addToast('Health verificado', 'success');
                            } catch (e: any) {
                              const msg = `Erro health: ${e.message || e}`;
                              setStatusMessage(msg);
                              addToast('Erro health', 'error');
                            } finally {
                              setActionLoading((s) => ({ ...s, health: false }));
                            }
                          }}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center gap-2"
                        >
                          {actionLoading.health ? <Spinner className="h-4 w-4" /> : 'Ver Health'}
                        </button>
                        <button
                          onClick={() => {
                            setToasts([]);
                            setStatusMessage(null);
                          }}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm"
                        >
                          Limpar
                        </button>
                      </div>
                    </div>
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

  const addToast = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    const item: ToastItem = { id, message, type };
    setToasts((s) => [item, ...s]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
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
      <Toast items={toasts} onRemove={removeToast} />
    </div>
  );
};
