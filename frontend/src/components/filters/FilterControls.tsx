import React, { useState } from 'react';
import { useFilterStore } from '../../stores/filterStore';
import { AdvancedFilters } from '../../types/filters';
import { 
  Calendar, 
  User, 
  Search, 
  Filter as FilterIcon,
  X,
  Plus
} from 'lucide-react';

export const FilterControls: React.FC = () => {
  const {
    currentFilters,
    setFilter,
    removeFilter,
    clearFilters,
    updateFilters
  } = useFilterStore();

  const [showDateRange, setShowDateRange] = useState(false);

  const handleDateRangeChange = (field: 'createdAfter' | 'createdBefore' | 'updatedAfter' | 'updatedBefore', value: string) => {
    setFilter(field, value || undefined);
  };

  const handleSearchChange = (value: string) => {
    setFilter('search', value || undefined);
  };

  const handleRoleChange = (value: string) => {
    setFilter('role', value || undefined);
  };

  const handleActiveChange = (value: boolean | undefined) => {
    setFilter('isActive', value);
  };

  const handleSortChange = (sortBy: string, sortOrder: 'ASC' | 'DESC') => {
    updateFilters({ sortBy, sortOrder });
  };

  const getActiveFiltersCount = () => {
    return Object.keys(currentFilters).filter(key => {
      const value = currentFilters[key as keyof AdvancedFilters];
      return value !== undefined && value !== '' && value !== null;
    }).length;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {getActiveFiltersCount()} ativo(s)
          </span>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Busca Textual */}
        <div>
          <label className="label">Busca Textual</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email..."
              value={currentFilters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>

        {/* Filtros de Data */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label mb-0">Filtros de Data</label>
            <button
              onClick={() => setShowDateRange(!showDateRange)}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Calendar className="h-4 w-4 mr-1" />
              {showDateRange ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          
          {showDateRange && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700">Criado Após</label>
                <input
                  type="datetime-local"
                  value={currentFilters.createdAfter || ''}
                  onChange={(e) => handleDateRangeChange('createdAfter', e.target.value)}
                  className="input mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Criado Antes</label>
                <input
                  type="datetime-local"
                  value={currentFilters.createdBefore || ''}
                  onChange={(e) => handleDateRangeChange('createdBefore', e.target.value)}
                  className="input mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Atualizado Após</label>
                <input
                  type="datetime-local"
                  value={currentFilters.updatedAfter || ''}
                  onChange={(e) => handleDateRangeChange('updatedAfter', e.target.value)}
                  className="input mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Atualizado Antes</label>
                <input
                  type="datetime-local"
                  value={currentFilters.updatedBefore || ''}
                  onChange={(e) => handleDateRangeChange('updatedBefore', e.target.value)}
                  className="input mt-1"
                />
              </div>
            </div>
          )}
        </div>

        {/* Filtro por Role */}
        <div>
          <label className="label">Função</label>
          <select
            value={currentFilters.role || ''}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="input"
          >
            <option value="">Todas as funções</option>
            <option value="STUDENT">Estudante</option>
            <option value="TEACHER">Professor</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        {/* Filtro por Status */}
        <div>
          <label className="label">Status</label>
          <select
            value={currentFilters.isActive === undefined ? '' : currentFilters.isActive.toString()}
            onChange={(e) => {
              const value = e.target.value;
              handleActiveChange(value === '' ? undefined : value === 'true');
            }}
            className="input"
          >
            <option value="">Todos os status</option>
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>

        {/* Ordenação */}
        <div>
          <label className="label">Ordenar Por</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={currentFilters.sortBy || 'createdAt'}
              onChange={(e) => handleSortChange(e.target.value, currentFilters.sortOrder || 'DESC')}
              className="input"
            >
              <option value="name">Nome</option>
              <option value="email">Email</option>
              <option value="role">Função</option>
              <option value="createdAt">Data de Criação</option>
              <option value="updatedAt">Data de Atualização</option>
            </select>
            <select
              value={currentFilters.sortOrder || 'DESC'}
              onChange={(e) => handleSortChange(currentFilters.sortBy || 'createdAt', e.target.value as 'ASC' | 'DESC')}
              className="input"
            >
              <option value="ASC">Crescente</option>
              <option value="DESC">Decrescente</option>
            </select>
          </div>
        </div>

        {/* Filtros Ativos */}
        {getActiveFiltersCount() > 0 && (
          <div>
            <label className="label">Filtros Ativos</label>
            <div className="space-y-2">
              {Object.entries(currentFilters).map(([key, value]) => {
                if (value === undefined || value === '' || value === null) return null;
                
                const getFilterLabel = (k: string, v: any) => {
                  switch (k) {
                    case 'search':
                      return `Busca: "${v}"`;
                    case 'role':
                      return `Função: ${v}`;
                    case 'isActive':
                      return `Status: ${v ? 'Ativo' : 'Inativo'}`;
                    case 'createdAfter':
                      return `Criado após: ${new Date(v).toLocaleDateString()}`;
                    case 'createdBefore':
                      return `Criado antes: ${new Date(v).toLocaleDateString()}`;
                    case 'updatedAfter':
                      return `Atualizado após: ${new Date(v).toLocaleDateString()}`;
                    case 'updatedBefore':
                      return `Atualizado antes: ${new Date(v).toLocaleDateString()}`;
                    case 'sortBy':
                      return `Ordenar por: ${v}`;
                    case 'sortOrder':
                      return `Ordem: ${v}`;
                    default:
                      return `${k}: ${v}`;
                  }
                };

                return (
                  <div key={key} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded">
                    <span className="text-sm text-blue-800">{getFilterLabel(key, value)}</span>
                    <button
                      onClick={() => removeFilter(key as keyof AdvancedFilters)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
