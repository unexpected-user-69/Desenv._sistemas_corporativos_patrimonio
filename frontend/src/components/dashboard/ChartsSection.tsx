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

// Função auxiliar para reduzir labels - mostra apenas os últimos N
const reduceLabels = (labels: string[], maxLabels: number = 10): string[] => {
  if (labels.length <= maxLabels) {
    return labels;
  }

  // Manter apenas os últimos maxLabels labels
  // Preencher os anteriores com strings vazias para manter o alinhamento dos dados
  const emptyLabels = new Array(labels.length - maxLabels).fill('');
  const lastLabels = labels.slice(-maxLabels);
  
  return [...emptyLabels, ...lastLabels];
};

// Função para converter dados de crescimento de usuários para ChartData
const convertUserGrowthToChartData = (
  data: any[],
): ChartData | null => {
  if (!data || data.length === 0) {
    return null;
  }

  // Se os dados vêm no formato { date, count }
  if (data[0]?.date && data[0]?.count !== undefined) {
    const allLabels = data.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
    });
    const values = data.map((item) => item.count);
    
    // Reduzir labels para mostrar apenas os últimos 8
    const labels = reduceLabels(allLabels, 8);

    return {
      labels,
      datasets: [
        {
          label: 'Novos Usuários',
          data: values,
          backgroundColor: '#3B82F6',
          borderColor: '#3B82F6',
          borderWidth: 2,
        },
      ],
    };
  }

  // Se os dados vêm no formato { period, new, total, active }
  if (data[0]?.period) {
    const allLabels = data.map((item) => {
      // Formatar período (ex: "2024-01" -> "Jan 2024")
      const [year, month] = item.period.split('-');
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
    });
    const values = data.map((item) => item.new || 0);
    
    // Reduzir labels para mostrar apenas os últimos 6
    const labels = reduceLabels(allLabels, 6);

    return {
      labels,
      datasets: [
        {
          label: 'Novos Usuários',
          data: values,
          backgroundColor: '#3B82F6',
          borderColor: '#3B82F6',
          borderWidth: 2,
        },
      ],
    };
  }

  return null;
};

// Função para converter dados de crescimento de patrimônios para ChartData
const convertPatrimonioGrowthToChartData = (
  data: any[],
): ChartData | null => {
  if (!data || data.length === 0) {
    return null;
  }

  // Se os dados vêm no formato { date, count }
  if (data[0]?.date && data[0]?.count !== undefined) {
    const allLabels = data.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
    });
    const values = data.map((item) => item.count);
    
    // Reduzir labels para mostrar apenas os últimos 8
    const labels = reduceLabels(allLabels, 8);

    return {
      labels,
      datasets: [
        {
          label: 'Patrimônios Adicionados',
          data: values,
          backgroundColor: '#8B5CF6',
          borderColor: '#8B5CF6',
          borderWidth: 2,
        },
      ],
    };
  }

  // Se os dados vêm no formato { period, novos, total, valorTotal }
  if (data[0]?.period) {
    const allLabels = data.map((item) => {
      // Formatar período (ex: "2024-01" -> "Jan 2024")
      const [year, month] = item.period.split('-');
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      return `${monthNames[parseInt(month) - 1]} ${year.slice(2)}`;
    });
    const values = data.map((item) => item.novos || 0);
    
    // Reduzir labels para mostrar apenas os últimos 6
    const labels = reduceLabels(allLabels, 6);

    return {
      labels,
      datasets: [
        {
          label: 'Patrimônios Adicionados',
          data: values,
          backgroundColor: '#8B5CF6',
          borderColor: '#8B5CF6',
          borderWidth: 2,
        },
      ],
    };
  }

  return null;
};

// Função para converter métricas do sistema para ChartData
const convertSystemMetricsToChartData = (
  data: any[],
): ChartData | null => {
  if (!data || data.length === 0) {
    return null;
  }

  const allLabels = data.map((item) => {
    const date = new Date(item.timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  });

  // Usar cpuUsage ou cpu dependendo do formato
  const values = data.map((item) => item.cpuUsage || item.cpu || 0);
  
  // Reduzir labels para mostrar apenas os últimos 6
  const labels = reduceLabels(allLabels, 6);

  return {
    labels,
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: values,
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
        borderWidth: 2,
      },
    ],
  };
};

// Função para converter métricas do cache para ChartData
const convertCacheMetricsToChartData = (
  data: any[],
): ChartData | null => {
  if (!data || data.length === 0) {
    return null;
  }

  const allLabels = data.map((item) => {
    const date = new Date(item.timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  });

  // Usar hitRate ou hit_rate dependendo do formato
  const values = data.map((item) => item.hitRate || item.hit_rate || 0);
  
  // Reduzir labels para mostrar apenas os últimos 6
  const labels = reduceLabels(allLabels, 6);

  return {
    labels,
    datasets: [
      {
        label: 'Hit Rate (%)',
        data: values,
        backgroundColor: '#10B981',
        borderColor: '#10B981',
        borderWidth: 2,
      },
    ],
  };
};

// Dados padrão quando não há dados reais
const getDefaultChartData = (label: string, color: string): ChartData => ({
  labels: [],
  datasets: [
    {
      label,
      data: [],
      backgroundColor: color,
      borderColor: color,
      borderWidth: 2,
    },
  ],
});

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

  // Carregar dados ao montar o componente
  useEffect(() => {
    fetchUserGrowthData('30d');
    fetchPatrimonioGrowthData('30d');
    fetchSystemMetrics('1h');
    fetchCacheMetrics('1h');
  }, [fetchUserGrowthData, fetchPatrimonioGrowthData, fetchSystemMetrics, fetchCacheMetrics]);

  // Converter dados reais para formato de gráfico
  const userChartData = convertUserGrowthToChartData(userGrowthData) ||
    getDefaultChartData('Novos Usuários', '#3B82F6');

  const patrimonioChartData = convertPatrimonioGrowthToChartData(patrimonioGrowthData) ||
    getDefaultChartData('Patrimônios Adicionados', '#8B5CF6');

  const systemChartData = convertSystemMetricsToChartData(systemMetrics) ||
    getDefaultChartData('CPU Usage (%)', '#EF4444');

  const cacheChartData = convertCacheMetricsToChartData(cacheMetrics) ||
    getDefaultChartData('Hit Rate (%)', '#10B981');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Crescimento de Usuários */}
      <ChartCard
        title="Crescimento de Usuários"
        icon={<Users className="h-5 w-5" />}
        type="line"
        data={userChartData}
        isLoading={isLoading}
        onRefresh={() => fetchUserGrowthData('30d')}
      />

      {/* Gráfico de Patrimônios */}
      <ChartCard
        title="Patrimônios por Mês"
        icon={<Building2 className="h-5 w-5" />}
        type="bar"
        data={patrimonioChartData}
        isLoading={isLoading}
        onRefresh={() => fetchPatrimonioGrowthData('30d')}
      />

      {/* Métricas do Sistema */}
      <ChartCard
        title="Uso de CPU"
        icon={<Activity className="h-5 w-5" />}
        type="line"
        data={systemChartData}
        isLoading={isLoading}
        onRefresh={() => fetchSystemMetrics('1h')}
      />

      {/* Métricas do Cache */}
      <ChartCard
        title="Taxa de Hit do Cache"
        icon={<Database className="h-5 w-5" />}
        type="line"
        data={cacheChartData}
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
