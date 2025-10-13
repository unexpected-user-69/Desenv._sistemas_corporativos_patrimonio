// Serviço para funcionalidades avançadas

import { 
  AdvancedSearchParams, 
  CursorPaginationParams, 
  FuzzySearchParams, 
  DateRangeParams,
  SearchResult,
  FuzzySearchResult,
  ServiceStatus,
  BulkOperationResult
} from '../types/advanced';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export class AdvancedService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/v1`;
  }

  // Busca avançada
  async advancedSearch<T = any>(params: AdvancedSearchParams): Promise<SearchResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/advanced/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na busca avançada:', error);
      throw error;
    }
  }

  // Paginação baseada em cursor
  async cursorSearch<T = any>(params: CursorPaginationParams): Promise<SearchResult<T>> {
    try {
      const queryParams = new URLSearchParams();
      if (params.cursor) queryParams.append('cursor', params.cursor);
      queryParams.append('limit', params.limit.toString());
      queryParams.append('direction', params.direction);
      queryParams.append('sortField', params.sort.field);
      queryParams.append('sortOrder', params.sort.order);

      const response = await fetch(`${this.baseUrl}/users/cursor/search?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na busca por cursor:', error);
      throw error;
    }
  }

  // Busca fuzzy (aproximada)
  async fuzzySearch<T = any>(params: FuzzySearchParams): Promise<FuzzySearchResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/fuzzy/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na busca fuzzy:', error);
      throw error;
    }
  }

  // Busca por intervalo de datas
  async dateRangeSearch<T = any>(params: DateRangeParams): Promise<SearchResult<T>> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('field', params.field);
      queryParams.append('start', params.start);
      queryParams.append('end', params.end);
      if (params.timezone) queryParams.append('timezone', params.timezone);
      if (params.format) queryParams.append('format', params.format);

      const response = await fetch(`${this.baseUrl}/users/date-range?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na busca por intervalo de datas:', error);
      throw error;
    }
  }

  // Estatísticas por role
  async getRoleStats(): Promise<Record<string, number>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/stats/roles`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar estatísticas por role:', error);
      throw error;
    }
  }

  // Usuários ativos recentes
  async getRecentActiveUsers(params: {
    limit?: number;
    hours?: number;
  } = {}): Promise<any[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.hours) queryParams.append('hours', params.hours.toString());

      const response = await fetch(`${this.baseUrl}/users/recent/active?${queryParams}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuários ativos recentes:', error);
      throw error;
    }
  }

  // Status dos serviços
  async getServiceStatus(): Promise<ServiceStatus[]> {
    try {
      const response = await fetch(`${this.baseUrl}/services/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar status dos serviços:', error);
      throw error;
    }
  }

  // Configuração de hash
  async getHashConfig(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/config/hash`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar configuração de hash:', error);
      throw error;
    }
  }

  async updateHashConfig(config: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/config/hash`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar configuração de hash:', error);
      throw error;
    }
  }

  // Configuração de normalização
  async getNormalizationConfig(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/config/normalization`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar configuração de normalização:', error);
      throw error;
    }
  }

  async updateNormalizationConfig(config: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/config/normalization`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar configuração de normalização:', error);
      throw error;
    }
  }

  // Configuração de filtros
  async getFilterConfig(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/config/filters`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar configuração de filtros:', error);
      throw error;
    }
  }

  async updateFilterConfig(config: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/config/filters`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar configuração de filtros:', error);
      throw error;
    }
  }

  // Operações em lote
  async bulkCreate<T = any>(data: T[]): Promise<BulkOperationResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na criação em lote:', error);
      throw error;
    }
  }

  async bulkUpdate<T = any>(data: Array<{ id: string; data: Partial<T> }>): Promise<BulkOperationResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/bulk`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na atualização em lote:', error);
      throw error;
    }
  }

  async bulkDelete(ids: string[]): Promise<BulkOperationResult> {
    try {
      const response = await fetch(`${this.baseUrl}/users/bulk`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na exclusão em lote:', error);
      throw error;
    }
  }

  // Validação de dados
  async validateData<T = any>(data: T, rules: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, rules }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro na validação de dados:', error);
      throw error;
    }
  }

  // Cache management
  async getCacheStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/cache/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar estatísticas de cache:', error);
      throw error;
    }
  }

  async clearCache(pattern?: string): Promise<void> {
    try {
      const url = pattern 
        ? `${this.baseUrl}/cache/clear?pattern=${encodeURIComponent(pattern)}`
        : `${this.baseUrl}/cache/clear`;
      
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
      throw error;
    }
  }
}

// Instância singleton
export const advancedService = new AdvancedService();
