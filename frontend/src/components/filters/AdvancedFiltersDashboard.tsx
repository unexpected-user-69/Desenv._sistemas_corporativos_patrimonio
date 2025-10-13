import React, { useEffect } from 'react';
import { useFilterStore } from '../../stores/filterStore';
import { FilterControls } from './FilterControls';
import { FilterResults } from './FilterResults';
import { FilterPresets } from './FilterPresets';
import { FilterAnalytics } from './FilterAnalytics';
import { 
  Filter, 
  Search, 
  BarChart3, 
  Settings,
  Download
} from 'lucide-react';

export const AdvancedFiltersDashboard: React.FC = () => {
  const {
    filterGroups,
    presets,
    analytics,
    currentFilters,
    totalResults,
    performance,
    isLoading,
    error,
    fetchFilterGroups,
    fetchPresets,
    fetchAnalytics,
    applyFilters,
    startMonitoring,
    stopMonitoring,
    isMonitoring,
    clearError,
    exportResults
  } = useFilterStore();

  useEffect(() => {
    // Carregar dados iniciais
    const loadInitialData = async () => {
      await Promise.all([
        fetchFilterGroups(),
        fetchPresets(),
        fetchAnalytics()
      ]);
    };

    loadInitialData();
    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, [fetchFilterGroups, fetchPresets, fetchAnalytics, startMonitoring, stopMonitoring]);

  const handleApplyFilters = async () => {
    clearError();
    await applyFilters(currentFilters);
  };

  const handleExport = async (format: 'csv' | 'json' | 'xlsx') => {
    try {
      const blob = await exportResults(format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `filtros-avancados.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao exportar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Filter className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Filtros Avançados</h1>
                <p className="text-sm text-gray-500">Busca avançada com filtros por intervalo de datas e mais</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <div className={`w-2 h-2 rounded-full mr-2 ${isMonitoring ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                {isMonitoring ? 'Monitorando' : 'Pausado'}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleExport('csv')}
                  className="btn-secondary flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="btn-secondary flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  JSON
                </button>
                <button
                  onClick={handleApplyFilters}
                  disabled={isLoading}
                  className="btn-primary flex items-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Resultados</h3>
                <p className="text-sm text-gray-500">
                  {totalResults.toLocaleString()} encontrados
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Performance</h3>
                <p className="text-sm text-gray-500">
                  {performance ? `${performance.queryTime}ms` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Filter className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Filtros Ativos</h3>
                <p className="text-sm text-gray-500">
                  {Object.keys(currentFilters).filter(key => 
                    currentFilters[key as keyof typeof currentFilters] !== undefined && 
                    currentFilters[key as keyof typeof currentFilters] !== ''
                  ).length} aplicados
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Presets</h3>
                <p className="text-sm text-gray-500">
                  {presets.length} salvos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-5 w-5 text-red-400">⚠</div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erro ao aplicar filtros</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Filtros */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <FilterControls />
              <FilterPresets />
            </div>
          </div>

          {/* Right Column - Resultados e Analytics */}
          <div className="lg:col-span-3 space-y-8">
            <FilterResults />
            <FilterAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};
