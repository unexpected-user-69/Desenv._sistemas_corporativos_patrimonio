import React from 'react';
import { useFilterStore } from '../../stores/filterStore';
import { FilterAnalytics as FilterAnalyticsType } from '../../types/filters';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Filter,
  Target,
  Zap
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const FilterAnalytics: React.FC = () => {
  const { analytics, performance } = useFilterStore();

  // Dados simulados para demonstração
  const mockAnalytics: FilterAnalyticsType = {
    mostUsedFilters: [
      { filter: 'search', count: 150, percentage: 35 },
      { filter: 'role', count: 120, percentage: 28 },
      { filter: 'isActive', count: 90, percentage: 21 },
      { filter: 'createdAfter', count: 60, percentage: 14 },
      { filter: 'createdBefore', count: 30, percentage: 7 }
    ],
    averageQueryTime: 45,
    cacheHitRate: 78,
    popularCombinations: [
      { filters: ['search', 'role'], count: 45 },
      { filters: ['isActive', 'createdAfter'], count: 32 },
      { filters: ['search', 'isActive'], count: 28 },
      { filters: ['role', 'createdBefore'], count: 20 }
    ]
  };

  const filterLabels: Record<string, string> = {
    search: 'Busca Textual',
    role: 'Função',
    isActive: 'Status',
    createdAfter: 'Criado Após',
    createdBefore: 'Criado Antes',
    updatedAfter: 'Atualizado Após',
    updatedBefore: 'Atualizado Antes'
  };

  const chartData = mockAnalytics.mostUsedFilters.map(item => ({
    name: filterLabels[item.filter] || item.filter,
    count: item.count,
    percentage: item.percentage
  }));

  const pieData = [
    { name: 'Cache Hit', value: mockAnalytics.cacheHitRate, color: '#10b981' },
    { name: 'Cache Miss', value: 100 - mockAnalytics.cacheHitRate, color: '#ef4444' }
  ];

  const combinationData = mockAnalytics.popularCombinations.map(item => ({
    name: item.filters.map(f => filterLabels[f] || f).join(' + '),
    count: item.count
  }));

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Analytics de Filtros</h3>
        <div className="flex items-center text-sm text-gray-500">
          <BarChart3 className="h-4 w-4 mr-2" />
          Últimas 24 horas
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-600">Tempo Médio</p>
              <p className="text-2xl font-bold text-blue-900">
                {performance ? `${performance.queryTime}ms` : `${mockAnalytics.averageQueryTime}ms`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <Zap className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-green-600">Cache Hit Rate</p>
              <p className="text-2xl font-bold text-green-900">
                {mockAnalytics.cacheHitRate}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <Filter className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-purple-600">Filtros Usados</p>
              <p className="text-2xl font-bold text-purple-900">
                {mockAnalytics.mostUsedFilters.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Filtros Mais Usados */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Filtros Mais Usados</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Cache Hit Rate */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">Cache Hit Rate</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Combinações Populares */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Combinações Populares</h4>
        <div className="space-y-3">
          {mockAnalytics.popularCombinations.map((combination, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-gray-500 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  {combination.filters.map(f => filterLabels[f] || f).join(' + ')}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">{combination.count} usos</span>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ 
                      width: `${(combination.count / Math.max(...mockAnalytics.popularCombinations.map(c => c.count))) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendações */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <TrendingUp className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Recomendações</h4>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Considere usar cache para filtros mais populares</li>
                <li>Otimize consultas com filtros de data</li>
                <li>Implemente índices para combinações frequentes</li>
                <li>Monitore o tempo de resposta das consultas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
