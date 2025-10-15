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
  Users,
  FileText,
  Bell,
} from 'lucide-react';
import { MonitoringDashboard } from './components/monitoring/MonitoringDashboard';
import { CacheDashboard } from './components/cache/CacheDashboard';
import { UsersPage } from './pages/users/UsersPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LogoutButton } from './components/auth/LogoutButton';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './types/user';
// import { ProductionPage } from './pages/production/ProductionPage';
// import { TestingPage } from './pages/testing/TestingPage';

type TabType =
  | 'home'
  | 'dashboard'
  | 'users'
  | 'reports'
  | 'notifications'
  | 'cache'
  | 'filters'
  | 'analytics'
  | 'monitoring'
  | 'performance'
  | 'advanced'
  | 'production'
  | 'testing';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const { user, isAuthenticated } = useAuth();

  const tabs = [
    {
      id: 'home',
      name: 'Início',
      icon: Home,
      roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN],
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart3,
      roles: [UserRole.TEACHER, UserRole.ADMIN],
    },
    { id: 'users', name: 'Usuários', icon: Users, roles: [UserRole.ADMIN] },
    {
      id: 'reports',
      name: 'Relatórios',
      icon: FileText,
      roles: [UserRole.TEACHER, UserRole.ADMIN],
    },
    {
      id: 'notifications',
      name: 'Notificações',
      icon: Bell,
      roles: [UserRole.TEACHER, UserRole.ADMIN],
    },
    {
      id: 'cache',
      name: 'Cache Redis',
      icon: Database,
      roles: [UserRole.TEACHER, UserRole.ADMIN],
    },
    {
      id: 'filters',
      name: 'Filtros Avançados',
      icon: Filter,
      roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN],
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      roles: [UserRole.TEACHER, UserRole.ADMIN],
    },
    {
      id: 'monitoring',
      name: 'Monitoramento',
      icon: Activity,
      roles: [UserRole.ADMIN],
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: Zap,
      roles: [UserRole.ADMIN],
    },
    {
      id: 'advanced',
      name: 'Avançado',
      icon: Settings,
      roles: [UserRole.ADMIN],
    },
    {
      id: 'production',
      name: 'Produção',
      icon: Shield,
      roles: [UserRole.ADMIN],
    },
    { id: 'testing', name: 'Testes', icon: TestTube, roles: [UserRole.ADMIN] },
  ];

  // Filtrar tabs baseado no role do usuário
  const visibleTabs =
    isAuthenticated && user
      ? tabs.filter((tab) => tab.roles.includes(user.role))
      : [];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'reports':
        return <ReportsPage />;
      case 'notifications':
        return <NotificationsPage />;
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
              {isAuthenticated && user && (
                <div className="flex items-center space-x-3">
                  {/* Dropdown de Notificações - Componente será implementado futuramente */}

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <LogoutButton variant="dropdown" />
                </div>
              )}
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
            {visibleTabs.map((tab) => {
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

// Componente principal que envolve tudo com autenticação
export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
};
