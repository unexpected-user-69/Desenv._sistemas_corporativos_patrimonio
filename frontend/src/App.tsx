import React, { useState, useEffect } from 'react';
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
  Package,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { MonitoringDashboard } from './components/monitoring/MonitoringDashboard';
import { CacheDashboard } from './components/cache/CacheDashboard';
import { UsersPage } from './pages/users/UsersPage';
import { PatrimonioPage } from './pages/patrimonio/PatrimonioPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LogoutButton } from './components/auth/LogoutButton';
import { useAuth } from './hooks/useAuth';
import { UserRole } from './types/user';
import { NavigationProvider } from './contexts/NavigationContext';
import { patrimonioService } from './services/patrimonioService';
import { dashboardService } from './services/dashboardService';
import { Patrimonio } from './types/patrimonio';
import { useDashboardStore } from './stores/dashboardStore';
// import { ProductionPage } from './pages/production/ProductionPage';
// import { TestingPage } from './pages/testing/TestingPage';

type TabType =
  | 'home'
  | 'dashboard'
  | 'users'
  | 'patrimonio'
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const [recentPatrimonios, setRecentPatrimonios] = useState<Patrimonio[]>([]);
  const [loadingPatrimonios, setLoadingPatrimonios] = useState(false);
  const { stats, fetchDashboardStats } = useDashboardStore();

  const tabs = [
    {
      id: 'home',
      name: 'Início',
      icon: Home,
      roles: [UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart3,
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    { id: 'users', name: 'Usuários', icon: Users, roles: [UserRole.MANAGER, UserRole.ADMIN] },
    {
      id: 'patrimonio',
      name: 'Patrimônios',
      icon: Package,
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      id: 'reports',
      name: 'Relatórios',
      icon: FileText,
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      id: 'notifications',
      name: 'Notificações',
      icon: Bell,
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      id: 'cache',
      name: 'Cache Redis',
      icon: Database,
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      id: 'filters',
      name: 'Filtros Avançados',
      icon: Filter,
      roles: [UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      roles: [UserRole.MANAGER, UserRole.ADMIN],
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

  // Carregar patrimônios recentes
  useEffect(() => {
    const loadRecentPatrimonios = async () => {
      if (!isAuthenticated) return;
      try {
        setLoadingPatrimonios(true);
        const response = await patrimonioService.getPatrimonios({
          page: 1,
          limit: 5,
        });
        setRecentPatrimonios(response.data);
      } catch (error) {
        console.error('Erro ao carregar patrimônios recentes:', error);
      } finally {
        setLoadingPatrimonios(false);
      }
    };
    loadRecentPatrimonios();
  }, [isAuthenticated]);

  // Carregar estatísticas do dashboard
  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardStats().catch(console.error);
    }
  }, [isAuthenticated, fetchDashboardStats]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'patrimonio':
        return <PatrimonioPage />;
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
    <NavigationProvider navigateTo={setActiveTab}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-20'
          } flex flex-col fixed h-screen z-40`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {sidebarOpen && (
              <div className="flex items-center">
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-900 truncate">
                  Sistema
                </h2>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={sidebarOpen ? 'Recolher menu' : 'Expandir menu'}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-4">
              {/* Menu Principal */}
              <div>
                {sidebarOpen && (
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Menu
                  </h3>
                )}
                <div className="space-y-1">
                  {visibleTabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
                        className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-100 border-l-4 border-transparent'
                        } ${sidebarOpen ? 'justify-start' : 'justify-center'}`}
                        title={!sidebarOpen ? tab.name : ''}
                      >
                        <IconComponent className="h-5 w-5 flex-shrink-0" />
                        {sidebarOpen && (
                          <span className="ml-3 font-medium truncate">
                            {tab.name}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Estatísticas Rápidas */}
              {sidebarOpen && stats && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Estatísticas
                  </h3>
                  <div className="px-3 space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-xs text-gray-600">Usuários</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {stats.users?.total || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-xs text-gray-600">
                          Patrimônios
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {stats.patrimonios?.total || 0}
                      </span>
                    </div>
                    {stats.patrimonios?.valorTotal && (
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-xs text-gray-600">Valor</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-900">
                          R${' '}
                          {(
                            stats.patrimonios.valorTotal / 1000
                          ).toLocaleString('pt-BR', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                          K
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ações Rápidas */}
              {sidebarOpen && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Ações Rápidas
                  </h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab('users')}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <Users className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-xs font-medium">Gerenciar Usuários</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('patrimonio')}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <Building2 className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-xs font-medium">Patrimônios</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('cache')}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <Database className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-xs font-medium">Cache Redis</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('monitoring')}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      <Activity className="h-4 w-4 text-orange-600 mr-2" />
                      <span className="text-xs font-medium">Monitoramento</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Patrimônios Recentes */}
              {sidebarOpen && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Patrimônios Recentes
                  </h3>
                  <div className="px-3 space-y-2 max-h-48 overflow-y-auto">
                    {loadingPatrimonios ? (
                      <div className="text-xs text-gray-500 text-center py-2">
                        Carregando...
                      </div>
                    ) : recentPatrimonios.length === 0 ? (
                      <div className="text-xs text-gray-500 text-center py-2">
                        Nenhum patrimônio
                      </div>
                    ) : (
                      recentPatrimonios.map((patrimonio) => (
                        <button
                          key={patrimonio.id}
                          onClick={() => setActiveTab('patrimonio')}
                          className="w-full text-left p-2 bg-gray-50 rounded hover:bg-gray-100 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {patrimonio.codigo}
                              </p>
                              <p className="text-xs text-gray-600 truncate">
                                {patrimonio.nome}
                              </p>
                            </div>
                            <Package className="h-3 w-3 text-gray-400 ml-2 flex-shrink-0" />
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Sidebar Footer */}
          {isAuthenticated && user && sidebarOpen && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.role}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 flex flex-col ${
            sidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          {/* Header */}
          <header className="bg-white shadow sticky top-0 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-2"
                    title={sidebarOpen ? 'Recolher menu' : 'Expandir menu'}
                  >
                    <Menu className="h-5 w-5 text-gray-600" />
                  </button>
                  <h1 className="text-xl font-bold text-gray-900">
                    {visibleTabs.find((tab) => tab.id === activeTab)?.name ||
                      'Sistema de Patrimônio/Inventário'}
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  {isAuthenticated && user && (
                    <div className="flex items-center space-x-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                      <LogoutButton variant="dropdown" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-4 sm:p-6 lg:p-8">{renderContent()}</main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
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
      </div>
    </NavigationProvider>
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
