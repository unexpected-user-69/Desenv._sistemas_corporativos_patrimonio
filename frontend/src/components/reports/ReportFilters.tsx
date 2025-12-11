// Componente de filtros para relatórios

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Filter,
  Users,
  Building2,
  Activity,
  Database,
  Shield,
  Search,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ReportFilter, ReportType } from '../../types/reports';

interface ReportFiltersProps {
  type: ReportType;
  filters: ReportFilter;
  onFiltersChange: (filters: ReportFilter) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isLoading?: boolean;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  type,
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  isLoading = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<ReportFilter>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const newDateRange = {
      ...localFilters.dateRange,
      [field]: value,
    };
    handleFilterChange('dateRange', newDateRange);
  };

  const handlePeriodChange = (period: string) => {
    handleFilterChange('period', period);

    // Auto-fill date range based on period
    const now = new Date();
    let startDate: string;

    switch (period) {
      case 'today':
        startDate = now.toISOString().split('T')[0];
        break;
      case 'yesterday': {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = yesterday.toISOString().split('T')[0];
        break;
      }
      case 'last_7_days': {
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        startDate = weekAgo.toISOString().split('T')[0];
        break;
      }
      case 'last_30_days': {
        const monthAgo = new Date(now);
        monthAgo.setDate(monthAgo.getDate() - 30);
        startDate = monthAgo.toISOString().split('T')[0];
        break;
      }
      case 'this_month': {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          .toISOString()
          .split('T')[0];
        break;
      }
      case 'last_month': {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        startDate = lastMonth.toISOString().split('T')[0];
        break;
      }
      default:
        return;
    }

    const endDate = now.toISOString().split('T')[0];
    handleDateRangeChange('start', startDate);
    handleDateRangeChange('end', endDate);
  };

  const getFilterIcon = () => {
    switch (type) {
      case ReportType.USERS:
        return <Users className="h-4 w-4" />;
      case ReportType.PATRIMONIOS:
        return <Building2 className="h-4 w-4" />;
      case ReportType.ACTIVITY:
        return <Activity className="h-4 w-4" />;
      case ReportType.SYSTEM:
        return <Database className="h-4 w-4" />;
      case ReportType.CACHE:
        return <Database className="h-4 w-4" />;
      case ReportType.AUDIT:
        return <Shield className="h-4 w-4" />;
      default:
        return <Filter className="h-4 w-4" />;
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.period) count++;
    if (localFilters.dateRange?.start || localFilters.dateRange?.end) count++;
    if (localFilters.userIds?.length) count++;
    if (localFilters.userRoles?.length) count++;
    if (localFilters.userStatus) count++;
    if (localFilters.patrimonioIds?.length) count++;
    if (localFilters.categorias?.length) count++;
    if (localFilters.status?.length) count++;
    if (localFilters.responsavelIds?.length) count++;
    if (localFilters.valorRange?.min || localFilters.valorRange?.max) count++;
    if (localFilters.logLevels?.length) count++;
    if (localFilters.operations?.length) count++;
    if (localFilters.cacheKeys?.length) count++;
    if (localFilters.cachePatterns?.length) count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getFilterIcon()}
            <h3 className="text-sm font-medium text-gray-900">Filtros</h3>
            {getActiveFiltersCount() > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Período */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <select
              value={localFilters.period || ''}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="">Selecionar período</option>
              <option value="today">Hoje</option>
              <option value="yesterday">Ontem</option>
              <option value="last_7_days">Últimos 7 dias</option>
              <option value="last_30_days">Últimos 30 dias</option>
              <option value="this_month">Este mês</option>
              <option value="last_month">Mês passado</option>
              <option value="this_year">Este ano</option>
              <option value="last_year">Ano passado</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          {/* Data Range */}
          {(localFilters.period === 'custom' || !localFilters.period) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Inicial
                </label>
                <input
                  type="date"
                  value={localFilters.dateRange?.start || ''}
                  onChange={(e) =>
                    handleDateRangeChange('start', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Final
                </label>
                <input
                  type="date"
                  value={localFilters.dateRange?.end || ''}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          {/* Filtros específicos por tipo */}
          {type === ReportType.USERS && (
            <>
              {/* User Roles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funções
                </label>
                <select
                  multiple
                  value={localFilters.userRoles || []}
                  onChange={(e) => {
                    const values = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value,
                    );
                    handleFilterChange('userRoles', values);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="MANAGER">Gerente</option>
                  <option value="OPERATOR">Operador</option>
                </select>
              </div>

              {/* User Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={localFilters.userStatus || ''}
                  onChange={(e) =>
                    handleFilterChange('userStatus', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="">Todos</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </>
          )}

          {type === ReportType.PATRIMONIOS && (
            <>
              {/* Categorias */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categorias
                </label>
                <input
                  type="text"
                  placeholder="Digite as categorias separadas por vírgula"
                  value={localFilters.categorias?.join(', ') || ''}
                  onChange={(e) => {
                    const values = e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s);
                    handleFilterChange('categorias', values);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <input
                  type="text"
                  placeholder="Digite os status separados por vírgula"
                  value={localFilters.status?.join(', ') || ''}
                  onChange={(e) => {
                    const values = e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s);
                    handleFilterChange('status', values);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              {/* Valor Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor Mínimo
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={localFilters.valorRange?.min || ''}
                    onChange={(e) => {
                      const newRange = {
                        ...localFilters.valorRange,
                        min: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      };
                      handleFilterChange('valorRange', newRange);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor Máximo
                  </label>
                  <input
                    type="number"
                    placeholder="999999.99"
                    value={localFilters.valorRange?.max || ''}
                    onChange={(e) => {
                      const newRange = {
                        ...localFilters.valorRange,
                        max: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      };
                      handleFilterChange('valorRange', newRange);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}

          {type === ReportType.ACTIVITY && (
            <>
              {/* Operations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operações
                </label>
                <input
                  type="text"
                  placeholder="Digite as operações separadas por vírgula"
                  value={localFilters.operations?.join(', ') || ''}
                  onChange={(e) => {
                    const values = e.target.value
                      .split(',')
                      .map((s) => s.trim())
                      .filter((s) => s);
                    handleFilterChange('operations', values);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          {type === ReportType.AUDIT && (
            <>
              {/* Log Levels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Níveis de Log
                </label>
                <select
                  multiple
                  value={localFilters.logLevels || []}
                  onChange={(e) => {
                    const values = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value,
                    );
                    handleFilterChange('logLevels', values);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span>Limpar Filtros</span>
            </button>

            <button
              onClick={onApplyFilters}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Aplicar Filtros</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
