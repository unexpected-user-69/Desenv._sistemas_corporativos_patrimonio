// Tipos para filtros avançados

export interface DateRange {
  start: string;
  end: string;
}

export interface AdvancedFilters {
  // Filtros de data
  createdAfter?: string;
  createdBefore?: string;
  updatedAfter?: string;
  updatedBefore?: string;
  
  // Filtros de busca textual
  search?: string;
  searchFields?: string[];
  
  // Filtros específicos
  role?: string;
  isActive?: boolean;
  
  // Ordenação
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  
  // Paginação
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  name: string;
  label: string;
  options: FilterOption[];
  type: 'select' | 'multiselect' | 'date' | 'daterange' | 'text' | 'number' | 'boolean';
  multiple?: boolean;
}

export interface FilterState {
  filters: AdvancedFilters;
  appliedFilters: string[];
  totalResults: number;
  isLoading: boolean;
  error?: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: AdvancedFilters;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterValidation {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: Record<string, string>;
}

export interface FilterPerformance {
  queryTime: number;
  cacheHit: boolean;
  indexUsed: boolean;
  resultCount: number;
  memoryUsage: number;
}

export interface FilterSuggestion {
  field: string;
  value: string;
  confidence: number;
  reason: string;
}

export interface FilterAnalytics {
  mostUsedFilters: Array<{
    filter: string;
    count: number;
    percentage: number;
  }>;
  averageQueryTime: number;
  cacheHitRate: number;
  popularCombinations: Array<{
    filters: string[];
    count: number;
  }>;
}
