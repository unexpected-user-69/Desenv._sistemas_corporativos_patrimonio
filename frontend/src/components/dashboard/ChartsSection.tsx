// Componente de gráficos do dashboard

import React, { useEffect, useRef } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Activity,
  Database,
  RefreshCw,
} from 'lucide-react';
import { useDashboardStore } from '../../stores/dashboardStore';
import { ChartData } from '../../types/dashboard';

// Mock Chart.js para demonstração (em produção, usar Chart.js real)
const createMockChart = (
  canvas: HTMLCanvasElement,
  data: ChartData,
  type: 'line' | 'bar' | 'doughnut',
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Limpar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Configurações básicas
  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;

  if (type === 'line') {
    // Desenhar gráfico de linha simples
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.datasets[0].data.forEach((value, index) => {
      const x =
        padding + index * (chartWidth / (data.datasets[0].data.length - 1));
      const y =
        padding +
        chartHeight -
        (value / Math.max(...data.datasets[0].data)) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  } else if (type === 'bar') {
    // Desenhar gráfico de barras simples
    const barWidth = (chartWidth / data.datasets[0].data.length) * 0.8;
    const barSpacing = (chartWidth / data.datasets[0].data.length) * 0.2;

    data.datasets[0].data.forEach((value, index) => {
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const barHeight =
        (value / Math.max(...data.datasets[0].data)) * chartHeight;
      const y = padding + chartHeight - barHeight;

      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  }

  // Desenhar labels
  ctx.fillStyle = '#6B7280';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';

  data.labels.forEach((label, index) => {
    const x = padding + index * (chartWidth / (data.labels.length - 1));
    ctx.fillText(label, x, canvas.height - 10);
  });
};

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  type: 'line' | 'bar' | 'doughnut';
  data: ChartData;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  icon,
  type,
  data,
  isLoading = false,
  onRefresh,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && data && !isLoading) {
      createMockChart(canvasRef.current, data, type);
    }
  }, [data, type, isLoading]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            </h3>
          </div>
        </div>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <div className="text-blue-600">{icon}</div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Atualizar gráfico"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="h-64">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export const ChartsSection: React.FC = () => {
  const {
    userGrowthData,
    patrimonioGrowthData,
    systemMetrics,
    cacheMetrics,
    fetchUserGrowthData,
    fetchPatrimonioGrowthData,
    fetchSystemMetrics,
    fetchCacheMetrics,
    isLoading,
  } = useDashboardStore();

  // Dados mockados para demonstração
  const mockUserGrowthData: ChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Novos Usuários',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        borderWidth: 2,
      },
    ],
  };

  const mockPatrimonioData: ChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Patrimônios Adicionados',
        data: [8, 15, 7, 12, 9, 11],
        backgroundColor: '#8B5CF6',
        borderColor: '#8B5CF6',
        borderWidth: 2,
      },
    ],
  };

  const mockSystemMetricsData: ChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: [25, 30, 45, 35, 40, 28],
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
        borderWidth: 2,
      },
    ],
  };

  const mockCacheMetricsData: ChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Hit Rate (%)',
        data: [85, 88, 92, 89, 87, 90],
        backgroundColor: '#10B981',
        borderColor: '#10B981',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Crescimento de Usuários */}
      <ChartCard
        title="Crescimento de Usuários"
        icon={<Users className="h-5 w-5" />}
        type="line"
        data={mockUserGrowthData}
        isLoading={isLoading}
        onRefresh={() => fetchUserGrowthData('30d')}
      />

      {/* Gráfico de Patrimônios */}
      <ChartCard
        title="Patrimônios por Mês"
        icon={<Building2 className="h-5 w-5" />}
        type="bar"
        data={mockPatrimonioData}
        isLoading={isLoading}
        onRefresh={() => fetchPatrimonioGrowthData('30d')}
      />

      {/* Métricas do Sistema */}
      <ChartCard
        title="Uso de CPU"
        icon={<Activity className="h-5 w-5" />}
        type="line"
        data={mockSystemMetricsData}
        isLoading={isLoading}
        onRefresh={() => fetchSystemMetrics('1h')}
      />

      {/* Métricas do Cache */}
      <ChartCard
        title="Taxa de Hit do Cache"
        icon={<Database className="h-5 w-5" />}
        type="line"
        data={mockCacheMetricsData}
        isLoading={isLoading}
        onRefresh={() => fetchCacheMetrics('1h')}
      />
    </div>
  );
};

// Componente para gráfico de pizza (doughnut)
export const DoughnutChart: React.FC<{
  title: string;
  data: ChartData;
  isLoading?: boolean;
}> = ({ title, data, isLoading = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && data && !isLoading) {
      createMockChart(canvasRef.current, data, 'doughnut');
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="w-48 h-48"
        />
      </div>
    </div>
  );
};
