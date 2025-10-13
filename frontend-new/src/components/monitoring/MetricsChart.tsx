// Componente de gráficos para métricas

import React from 'react';
import { MetricsData } from '../../types/monitoring';

interface MetricsChartProps {
  data: MetricsData[];
  type: 'line' | 'bar' | 'pie';
  metric: 'responseTime' | 'throughput' | 'requests' | 'system';
  title: string;
  height?: number;
}

export const MetricsChart: React.FC<MetricsChartProps> = ({
  data,
  type,
  metric,
  title,
  height = 300
}) => {
  const getChartData = () => {
    if (!data || data.length === 0) return { labels: [], datasets: [] };

    const labels = data.map(d => {
      const date = new Date(d.timestamp);
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    });

    switch (metric) {
      case 'responseTime':
        return {
          labels,
          datasets: [{
            label: 'Tempo de Resposta (ms)',
            data: data.map(d => d.performance.averageResponseTime),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }]
        };
      case 'throughput':
        return {
          labels,
          datasets: [{
            label: 'Throughput (req/s)',
            data: data.map(d => d.performance.throughput),
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4
          }]
        };
      case 'requests':
        if (type === 'pie') {
          // Para gráfico de pizza, usar dados do último ponto
          const lastData = data[data.length - 1];
          if (!lastData) return { labels: [], datasets: [] };
          
          return {
            labels: Object.keys(lastData.requests.byMethod),
            datasets: [{
              data: Object.values(lastData.requests.byMethod),
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)'
              ]
            }]
          };
        } else {
          return {
            labels,
            datasets: [{
              label: 'Total de Requests',
              data: data.map(d => d.requests.total),
              borderColor: 'rgb(139, 92, 246)',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              fill: true,
              tension: 0.4
            }]
          };
        }
      case 'system':
        return {
          labels,
          datasets: [
            {
              label: 'CPU (%)',
              data: data.map(d => d.system.cpu),
              borderColor: 'rgb(239, 68, 68)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Memória (%)',
              data: data.map(d => d.system.memory),
              borderColor: 'rgb(245, 158, 11)',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Disco (%)',
              data: data.map(d => d.system.disk),
              borderColor: 'rgb(16, 185, 129)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              fill: true,
              tension: 0.4
            }
          ]
        };
      default:
        return { labels: [], datasets: [] };
    }
  };

  const chartData = getChartData();

  // Componente de gráfico simples (sem biblioteca externa)
  const renderSimpleChart = () => {
    if (!chartData.labels.length) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Nenhum dado disponível
        </div>
      );
    }

    const maxValue = Math.max(
      ...chartData.datasets.flatMap(dataset => dataset.data as number[])
    );
    const minValue = Math.min(
      ...chartData.datasets.flatMap(dataset => dataset.data as number[])
    );
    const range = maxValue - minValue || 1;

    return (
      <div className="relative" style={{ height: `${height}px` }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <line
              key={i}
              x1="0"
              y1={height * ratio}
              x2="100%"
              y2={height * ratio}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Chart content */}
          {chartData.datasets.map((dataset, datasetIndex) => {
            if (type === 'line') {
              const points = chartData.labels.map((_, index) => {
                const x = (index / (chartData.labels.length - 1)) * 100;
                const y = height - ((dataset.data[index] as number - minValue) / range) * height;
                return `${x},${y}`;
              }).join(' ');

              return (
                <g key={datasetIndex}>
                  <polyline
                    points={points}
                    fill="none"
                    stroke={dataset.borderColor}
                    strokeWidth="2"
                  />
                  <polygon
                    points={`0,${height} ${points} 100%,${height}`}
                    fill={dataset.backgroundColor}
                  />
                </g>
              );
            } else if (type === 'bar') {
              const barWidth = 100 / chartData.labels.length;
              return chartData.labels.map((_, index) => {
                const x = index * barWidth;
                const barHeight = ((dataset.data[index] as number - minValue) / range) * height;
                return (
                  <rect
                    key={`${datasetIndex}-${index}`}
                    x={`${x}%`}
                    y={height - barHeight}
                    width={`${barWidth * 0.8}%`}
                    height={barHeight}
                    fill={dataset.backgroundColor}
                    stroke={dataset.borderColor}
                    strokeWidth="1"
                  />
                );
              });
            } else if (type === 'pie') {
              const total = (dataset.data as number[]).reduce((sum, value) => sum + value, 0);
              let currentAngle = 0;
              const centerX = 50;
              const centerY = 50;
              const radius = 40;

              return (dataset.data as number[]).map((value, index) => {
                const percentage = value / total;
                const angle = percentage * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                currentAngle += angle;

                const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
                const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
                const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
                const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

                const largeArcFlag = angle > 180 ? 1 : 0;

                const pathData = [
                  `M ${centerX} ${centerY}`,
                  `L ${x1} ${y1}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');

                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={dataset.backgroundColor[index]}
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              });
            }
            return null;
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center space-x-4 text-xs">
          {chartData.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: dataset.backgroundColor }}
              />
              <span>{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        {renderSimpleChart()}
      </div>
      {chartData.labels.length > 0 && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          Última atualização: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};