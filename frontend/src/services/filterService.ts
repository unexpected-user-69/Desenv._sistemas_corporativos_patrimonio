import axios, { AxiosInstance } from 'axios';
import {
  AdvancedFilters,
  FilterGroup,
  FilterPreset,
  FilterValidation,
  FilterPerformance,
  FilterSuggestion,
  FilterAnalytics,
} from '../types/filters';

class FilterService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL =
      (import.meta.env as Record<string, string>).VITE_API_BASE_URL ||
      'http://localhost:3000';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Filter Service Error:', error);
        throw error;
      },
    );
  }

  // Métodos de filtros avançados
  async getAdvancedUsers(filters: AdvancedFilters): Promise<{
    users: unknown[];
    total: number;
    page: number;
    totalPages: number;
    performance: FilterPerformance;
  }> {
    const response = await this.api.get('/v1/users/advanced', {
      params: filters,
    });
    return response.data as {
      users: unknown[];
      total: number;
      page: number;
      totalPages: number;
      performance: FilterPerformance;
    };
  }

  async getCursorUsers(filters: AdvancedFilters): Promise<{
    users: unknown[];
    nextCursor?: string;
    hasMore: boolean;
    performance: FilterPerformance;
  }> {
    const response = await this.api.get('/v1/users/cursor/search', {
      params: filters,
    });
    return response.data as {
      users: unknown[];
      nextCursor?: string;
      hasMore: boolean;
      performance: FilterPerformance;
    };
  }

  async getFuzzyUsers(filters: AdvancedFilters): Promise<{
    users: unknown[];
    total: number;
    suggestions: FilterSuggestion[];
    performance: FilterPerformance;
  }> {
    const response = await this.api.get('/v1/users/fuzzy/search', {
      params: filters,
    });
    return response.data as {
      users: unknown[];
      total: number;
      suggestions: FilterSuggestion[];
      performance: FilterPerformance;
    };
  }

  async getDateRangeUsers(filters: AdvancedFilters): Promise<{
    users: unknown[];
    total: number;
    dateRange: {
      start: string;
      end: string;
    };
    performance: FilterPerformance;
  }> {
    const response = await this.api.get('/v1/users/date-range', {
      params: filters,
    });
    return response.data as {
      users: unknown[];
      total: number;
      dateRange: {
        start: string;
        end: string;
      };
      performance: FilterPerformance;
    };
  }

  // Métodos de opções de filtro
  async getFilterOptions(): Promise<FilterGroup[]> {
    const response = await this.api.get('/v1/filters/options');
    return response.data as FilterGroup[];
  }

  async getFilterSuggestions(
    field: string,
    query: string,
  ): Promise<FilterSuggestion[]> {
    const response = await this.api.get('/v1/filters/suggestions', {
      params: { field, query },
    });
    return response.data as FilterSuggestion[];
  }

  // Métodos de validação
  async validateFilters(filters: AdvancedFilters): Promise<FilterValidation> {
    const response = await this.api.post('/v1/filters/validate', filters);
    return response.data as FilterValidation;
  }

  // Métodos de presets
  async getFilterPresets(): Promise<FilterPreset[]> {
    const response = await this.api.get('/v1/filters/presets');
    return response.data as unknown;
  }

  async createFilterPreset(
    preset: Omit<FilterPreset, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FilterPreset> {
    const response = await this.api.post('/v1/filters/presets', preset);
    return response.data as unknown;
  }

  async updateFilterPreset(
    id: string,
    preset: Partial<FilterPreset>,
  ): Promise<FilterPreset> {
    const response = await this.api.put(`/v1/filters/presets/${id}`, preset);
    return response.data as unknown;
  }

  async deleteFilterPreset(id: string): Promise<void> {
    await this.api.delete(`/v1/filters/presets/${id}`);
  }

  // Métodos de analytics
  async getFilterAnalytics(): Promise<FilterAnalytics> {
    const response = await this.api.get('/v1/filters/analytics');
    return response.data as unknown;
  }

  async getFilterPerformance(
    filters: AdvancedFilters,
  ): Promise<FilterPerformance> {
    const response = await this.api.post('/v1/filters/performance', filters);
    return response.data as unknown;
  }

  // Métodos utilitários
  buildQueryString(filters: AdvancedFilters): string {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, String(v)));
        } else {
          params.append(key, String(value));
        }
      }
    });

    return params.toString();
  }

  parseQueryString(queryString: string): AdvancedFilters {
    const params = new URLSearchParams(queryString);
    const filters: AdvancedFilters = {};

    for (const [key, value] of params.entries()) {
      switch (key) {
        case 'page':
        case 'limit':
          filters[key] = parseInt(value);
          break;
        case 'isActive':
          filters[key] = value === 'true';
          break;
        case 'sortOrder':
          filters[key] = value as 'ASC' | 'DESC';
          break;
        case 'searchFields':
          if (!filters.searchFields) filters.searchFields = [];
          filters.searchFields.push(value);
          break;
        default:
          (filters as Record<string, unknown>)[key] = value;
      }
    }

    return filters;
  }

  // Métodos de cache de filtros
  private filterCache = new Map<string, unknown>();

  getCachedFilterResults(filters: AdvancedFilters): unknown {
    const cacheKey = this.buildQueryString(filters);
    return this.filterCache.get(cacheKey);
  }

  setCachedFilterResults(filters: AdvancedFilters, results: unknown): void {
    const cacheKey = this.buildQueryString(filters);
    this.filterCache.set(cacheKey, results);

    // Limitar o tamanho do cache
    if (this.filterCache.size > 100) {
      const firstKey = this.filterCache.keys().next().value;
      this.filterCache.delete(firstKey);
    }
  }

  clearFilterCache(): void {
    this.filterCache.clear();
  }

  // Métodos de otimização
  async optimizeFilters(filters: AdvancedFilters): Promise<AdvancedFilters> {
    const response = await this.api.post('/v1/filters/optimize', filters);
    return response.data as unknown;
  }

  async getFilterRecommendations(currentFilters: AdvancedFilters): Promise<{
    recommended: AdvancedFilters[];
    reasons: string[];
  }> {
    const response = await this.api.post(
      '/v1/filters/recommendations',
      currentFilters,
    );
    return response.data as unknown;
  }

  // Métodos de exportação
  async exportFilterResults(
    filters: AdvancedFilters,
    format: 'csv' | 'json' | 'xlsx',
  ): Promise<Blob> {
    const response = await this.api.post(
      '/v1/filters/export',
      {
        filters,
        format,
      },
      {
        responseType: 'blob',
      },
    );
    return response.data as unknown;
  }

  // Métodos de estatísticas em tempo real
  subscribeToFilterStats(
    callback: (stats: FilterAnalytics) => void,
  ): () => void {
    const interval = setInterval(() => {
      void (async () => {
        try {
          const stats = await this.getFilterAnalytics();
          callback(stats);
        } catch (error) {
          console.error('Error fetching filter stats:', error);
        }
      })();
    }, 10000);

    return () => clearInterval(interval);
  }
}

export const filterService = new FilterService();
export default filterService;
