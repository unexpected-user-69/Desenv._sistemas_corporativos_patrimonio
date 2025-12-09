import React, { useEffect, useState } from 'react';
import {
  RefreshCw,
  TrendingUp,
  Users,
  Database,
  AlertCircle,
} from 'lucide-react';
import { StatsCards } from './StatsCards';
import { ChartsSection } from './ChartsSection';
import { RecentActivity } from './RecentActivity';
import { dashboardService } from '../../services/dashboardService';
import { DashboardStats } from '../../types/dashboard';

export const DashboardMain: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await dashboardService.getDashboardStats();
      setStats(data);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleRefresh = () => {
    loadDashboardData();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">
                  Erro ao carregar dashboard
                </h3>
                <p className="text-red-700 mt-1">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Tentar novamente</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Principal
              </h1>
              <p className="text-gray-600 mt-1">
                Visão geral do sistema de patrimônio e usuários
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-sm text-gray-500">
                  Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
                </div>
              )}
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                />
                <span>Atualizar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={stats!} isLoading={isLoading} />
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <ChartsSection isLoading={isLoading} />
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <RecentActivity isLoading={isLoading} />
        </div>

        {/* System Info */}
        {stats && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Informações do Sistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stats.system.uptime}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Versão</p>
                  <p className="text-lg font-semibold text-gray-900">
                    "1.0.0"
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-600">Online</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
