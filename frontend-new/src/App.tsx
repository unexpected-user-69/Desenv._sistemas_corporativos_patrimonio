import React, { useState } from 'react';
import { MonitoringPage } from './pages/monitoring/MonitoringPage';
import { PerformancePage } from './pages/performance/PerformancePage';
import { AdvancedFeatures } from './components/advanced/AdvancedFeatures';
import { AlertPanel } from './components/monitoring/AlertPanel';
import { MetricsChart } from './components/monitoring/MetricsChart';
import { monitoringService } from './services/monitoring';
import { MetricsData } from './types/monitoring';

type TabType = 'monitoring' | 'performance' | 'advanced' | 'alerts' | 'charts';

function App() {
  const [currentPage, setCurrentPage] = useState<TabType>('monitoring');
  const [metricsData, setMetricsData] = useState<MetricsData[]>([]);

  // Simular dados de métricas para demonstração
  React.useEffect(() => {
    const generateMockData = () => {
      const now = new Date();
      const mockData: MetricsData[] = [];
      
      for (let i = 0; i < 10; i++) {
        const timestamp = new Date(now.getTime() - (9 - i) * 60000); // Últimos 10 minutos
        mockData.push({
          timestamp: timestamp.toISOString(),
          requests: {
            total: Math.floor(Math.random() * 1000) + 500,
            byMethod: {
              GET: Math.floor(Math.random() * 600) + 300,
              POST: Math.floor(Math.random() * 200) + 100,
              PUT: Math.floor(Math.random() * 100) + 50,
              DELETE: Math.floor(Math.random() * 50) + 25,
            },
            byStatus: {
              '200': Math.floor(Math.random() * 800) + 400,
              '400': Math.floor(Math.random() * 50) + 10,
              '500': Math.floor(Math.random() * 20) + 5,
            },
          },
          performance: {
            averageResponseTime: Math.floor(Math.random() * 200) + 50,
            p95Latency: Math.floor(Math.random() * 500) + 100,
            throughput: Math.floor(Math.random() * 50) + 20,
          },
          system: {
            memoryUsage: Math.floor(Math.random() * 30) + 40,
            cpuUsage: Math.floor(Math.random() * 40) + 20,
            diskUsage: Math.floor(Math.random() * 20) + 60,
          },
        });
      }
      
      setMetricsData(mockData);
    };

    generateMockData();
    const interval = setInterval(generateMockData, 30000); // Atualizar a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Sistema de Patrimônio - Monitoramento
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('monitoring')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'monitoring'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📊 Monitoramento
              </button>
              <button
                onClick={() => setCurrentPage('performance')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'performance'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ⚡ Performance
              </button>
              <button
                onClick={() => setCurrentPage('advanced')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'advanced'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🔧 Avançado
              </button>
              <button
                onClick={() => setCurrentPage('alerts')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'alerts'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🚨 Alertas
              </button>
              <button
                onClick={() => setCurrentPage('charts')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'charts'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📈 Gráficos
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'monitoring' && <MonitoringPage />}
        
        {currentPage === 'performance' && <PerformancePage />}
        
        {currentPage === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Funcionalidades Avançadas</h1>
              <p className="text-sm text-gray-600">Configuração e monitoramento de serviços avançados</p>
            </div>
            <AdvancedFeatures />
          </div>
        )}
        
        {currentPage === 'alerts' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alertas do Sistema</h1>
              <p className="text-sm text-gray-600">Monitoramento de alertas e regras de negócio</p>
            </div>
            <AlertPanel />
          </div>
        )}
        
        {currentPage === 'charts' && (
          <div className="space-y-6">
      <div>
              <h1 className="text-2xl font-bold text-gray-900">Gráficos de Métricas</h1>
              <p className="text-sm text-gray-600">Visualização de dados históricos e tendências</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart
                data={metricsData}
                type="line"
                metric="responseTime"
                title="Tempo de Resposta (ms)"
              />
              <MetricsChart
                data={metricsData}
                type="bar"
                metric="throughput"
                title="Throughput (req/s)"
              />
              <MetricsChart
                data={metricsData}
                type="line"
                metric="requests"
                title="Total de Requests"
              />
              <MetricsChart
                data={metricsData}
                type="pie"
                metric="requests"
                title="Distribuição por Método HTTP"
              />
            </div>
      </div>
        )}
      </main>
      </div>
  );
}

export default App
