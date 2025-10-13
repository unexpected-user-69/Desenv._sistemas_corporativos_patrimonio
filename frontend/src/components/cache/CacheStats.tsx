import React from 'react';
import { CacheStats as CacheStatsType } from '../../types/cache';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  HardDrive, 
  Users,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface CacheStatsProps {
  stats: CacheStatsType | null;
  isLoading: boolean;
}

export const CacheStats: React.FC<CacheStatsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Estatísticas do Cache</h3>
        <div className="text-center py-8">
          <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhuma estatística disponível</p>
        </div>
      </div>
    );
  }

  // Dados simulados para o gráfico (em uma implementação real, estes dados viriam do backend)
  const chartData = [
    { time: '00:00', hits: 120, misses: 30 },
    { time: '04:00', hits: 95, misses: 25 },
    { time: '08:00', hits: 180, misses: 45 },
    { time: '12:00', hits: 220, misses: 55 },
    { time: '16:00', hits: 190, misses: 40 },
    { time: '20:00', hits: 150, misses: 35 },
  ];

  const memoryData = [
    { name: 'Usado', value: 75, color: '#3b82f6' },
    { name: 'Livre', value: 25, color: '#e5e7eb' },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Estatísticas do Cache</h3>
        <div className="flex items-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          Atualizado agora
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-600">Hit Rate</p>
              <p className="text-2xl font-bold text-blue-900">{stats.hitRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-green-600">Hits</p>
              <p className="text-2xl font-bold text-green-900">{stats.hits.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-red-600">Misses</p>
              <p className="text-2xl font-bold text-red-900">{stats.misses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <KeyRound className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-purple-600">Total Keys</p>
              <p className="text-2xl font-bold text-purple-900">{stats.totalKeys.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Hits/Misses ao longo do tempo */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Hits vs Misses (24h)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="hits" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Hits"
                />
                <Line 
                  type="monotone" 
                  dataKey="misses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Misses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Uso de Memória */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Uso de Memória</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <HardDrive className="h-5 w-5 text-gray-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Memória</p>
            <p className="text-sm text-gray-500">{stats.memoryUsage}</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Clock className="h-5 w-5 text-gray-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Uptime</p>
            <p className="text-sm text-gray-500">{Math.floor(stats.uptime / 3600)}h {Math.floor((stats.uptime % 3600) / 60)}m</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Users className="h-5 w-5 text-gray-600 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Clientes</p>
            <p className="text-sm text-gray-500">{stats.connectedClients}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
