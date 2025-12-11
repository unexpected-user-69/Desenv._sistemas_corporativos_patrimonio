import axios, { AxiosResponse } from 'axios';
import { config } from '../config/environment';
import {
  Patrimonio,
  CreatePatrimonioRequest,
  UpdatePatrimonioRequest,
  PatrimonioFilters,
  PaginatedPatrimoniosResponse,
  PatrimonioStats,
  PatrimonioSearchResult,
} from '../types/patrimonio';

class PatrimonioService {
  private baseURL = config.api.baseUrl;

  /**
   * Helper para obter headers de autenticação
   */
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Lista patrimônios com paginação e filtros
   */
  async getPatrimonios(
    filters: PatrimonioFilters = {},
  ): Promise<PaginatedPatrimoniosResponse> {
    try {
      const params = new URLSearchParams();

      // Paginação
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      // Filtros
      if (filters.q) params.append('q', filters.q);
      if (filters.categoria) params.append('categoria', filters.categoria);
      if (filters.status) params.append('status', filters.status);
      if (filters.localizacao)
        params.append('localizacao', filters.localizacao);
      if (filters.responsavelId)
        params.append('responsavelId', filters.responsavelId);
      if (filters.dataAquisicaoInicio)
        params.append('dataAquisicaoInicio', filters.dataAquisicaoInicio);
      if (filters.dataAquisicaoFim)
        params.append('dataAquisicaoFim', filters.dataAquisicaoFim);
      if (filters.valorMinimo)
        params.append('valorMinimo', filters.valorMinimo.toString());
      if (filters.valorMaximo)
        params.append('valorMaximo', filters.valorMaximo.toString());

      const response: AxiosResponse<PaginatedPatrimoniosResponse> =
        await axios.get(`${this.baseURL}/v1/patrimonio?${params.toString()}`, {
          headers: this.getAuthHeaders(),
        });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar patrimônios:', error);
      throw error;
    }
  }

  /**
   * Busca patrimônio por ID
   */
  async getPatrimonioById(id: string): Promise<Patrimonio> {
    try {
      const response: AxiosResponse<Patrimonio> = await axios.get(
        `${this.baseURL}/v1/patrimonio/${id}`,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar patrimônio:', error);
      throw error;
    }
  }

  /**
   * Busca patrimônio por código
   */
  async getPatrimonioByCodigo(codigo: string): Promise<Patrimonio> {
    try {
      const response: AxiosResponse<Patrimonio> = await axios.get(
        `${this.baseURL}/v1/patrimonio/codigo/${codigo}`,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar patrimônio por código:', error);
      throw error;
    }
  }

  /**
   * Busca patrimônios por categoria
   */
  async getPatrimoniosByCategoria(
    categoria: string,
  ): Promise<PaginatedPatrimoniosResponse> {
    try {
      const response: AxiosResponse<PaginatedPatrimoniosResponse> =
        await axios.get(`${this.baseURL}/v1/patrimonio/categoria/${categoria}`, {
          headers: this.getAuthHeaders(),
        });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar patrimônios por categoria:', error);
      throw error;
    }
  }

  /**
   * Busca patrimônios por status
   */
  async getPatrimoniosByStatus(
    status: string,
  ): Promise<PaginatedPatrimoniosResponse> {
    try {
      const response: AxiosResponse<PaginatedPatrimoniosResponse> =
        await axios.get(`${this.baseURL}/v1/patrimonio/status/${status}`, {
          headers: this.getAuthHeaders(),
        });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar patrimônios por status:', error);
      throw error;
    }
  }

  /**
   * Busca patrimônios por responsável
   */
  async getPatrimoniosByResponsavel(
    responsavelId: string,
  ): Promise<PaginatedPatrimoniosResponse> {
    try {
      const response: AxiosResponse<PaginatedPatrimoniosResponse> =
        await axios.get(
          `${this.baseURL}/v1/patrimonio/responsavel/${responsavelId}`,
          { headers: this.getAuthHeaders() },
        );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar patrimônios por responsável:', error);
      throw error;
    }
  }

  /**
   * Cria novo patrimônio
   */
  async createPatrimonio(data: CreatePatrimonioRequest): Promise<Patrimonio> {
    try {
      const response: AxiosResponse<Patrimonio> = await axios.post(
        `${this.baseURL}/v1/patrimonio`,
        data,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao criar patrimônio:', error);
      throw error;
    }
  }

  /**
   * Atualiza patrimônio existente
   */
  async updatePatrimonio(
    id: string,
    data: UpdatePatrimonioRequest,
  ): Promise<Patrimonio> {
    try {
      const response: AxiosResponse<Patrimonio> = await axios.patch(
        `${this.baseURL}/v1/patrimonio/${id}`,
        data,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar patrimônio:', error);
      throw error;
    }
  }

  /**
   * Remove patrimônio
   */
  async deletePatrimonio(id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/v1/patrimonio/${id}`, {
        headers: this.getAuthHeaders(),
      });
    } catch (error) {
      console.error('Erro ao deletar patrimônio:', error);
      throw error;
    }
  }

  /**
   * Busca estatísticas de patrimônios
   */
  async getPatrimonioStats(): Promise<PatrimonioStats> {
    try {
      const response: AxiosResponse<PatrimonioStats> = await axios.get(
        `${this.baseURL}/v1/patrimonio/stats/categoria`,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }

  /**
   * Busca estatísticas por status
   */
  async getPatrimonioStatsByStatus(): Promise<Record<string, number>> {
    try {
      const response: AxiosResponse<Record<string, number>> = await axios.get(
        `${this.baseURL}/v1/patrimonio/stats/status`,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas por status:', error);
      throw error;
    }
  }

  /**
   * Busca valor total dos patrimônios
   */
  async getValorTotal(): Promise<{ valorTotal: number }> {
    try {
      const response: AxiosResponse<{ valorTotal: number }> = await axios.get(
        `${this.baseURL}/v1/patrimonio/stats/valor-total`,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar valor total:', error);
      throw error;
    }
  }

  /**
   * Busca patrimônios com garantia vencendo
   */
  async getPatrimoniosVencimentoGarantia(): Promise<Patrimonio[]> {
    try {
      const response: AxiosResponse<Patrimonio[]> = await axios.get(
        `${this.baseURL}/v1/patrimonio/vencimento-garantia`,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar patrimônios com garantia vencendo:', error);
      throw error;
    }
  }

  /**
   * Busca avançada com facets
   */
  async searchPatrimonios(
    filters: PatrimonioFilters,
  ): Promise<PatrimonioSearchResult> {
    try {
      const params = new URLSearchParams();

      if (filters.q) params.append('q', filters.q);
      if (filters.categoria) params.append('categoria', filters.categoria);
      if (filters.status) params.append('status', filters.status);
      if (filters.localizacao)
        params.append('localizacao', filters.localizacao);
      if (filters.responsavelId)
        params.append('responsavelId', filters.responsavelId);
      if (filters.dataAquisicaoInicio)
        params.append('dataAquisicaoInicio', filters.dataAquisicaoInicio);
      if (filters.dataAquisicaoFim)
        params.append('dataAquisicaoFim', filters.dataAquisicaoFim);
      if (filters.valorMinimo)
        params.append('valorMinimo', filters.valorMinimo.toString());
      if (filters.valorMaximo)
        params.append('valorMaximo', filters.valorMaximo.toString());
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());

      const response: AxiosResponse<PatrimonioSearchResult> = await axios.get(
        `${this.baseURL}/v1/patrimonio/search?${params.toString()}`,
        { headers: this.getAuthHeaders() },
      );

      return response.data;
    } catch (error) {
      console.error('Erro na busca avançada:', error);
      throw error;
    }
  }

  /**
   * Exporta patrimônios para CSV/Excel
   */
  async exportPatrimonios(
    filters: PatrimonioFilters,
    format: 'csv' | 'excel' = 'csv',
  ): Promise<Blob> {
    try {
      const params = new URLSearchParams();

      if (filters.q) params.append('q', filters.q);
      if (filters.categoria) params.append('categoria', filters.categoria);
      if (filters.status) params.append('status', filters.status);
      if (filters.localizacao)
        params.append('localizacao', filters.localizacao);
      if (filters.responsavelId)
        params.append('responsavelId', filters.responsavelId);
      if (filters.dataAquisicaoInicio)
        params.append('dataAquisicaoInicio', filters.dataAquisicaoInicio);
      if (filters.dataAquisicaoFim)
        params.append('dataAquisicaoFim', filters.dataAquisicaoFim);
      if (filters.valorMinimo)
        params.append('valorMinimo', filters.valorMinimo.toString());
      if (filters.valorMaximo)
        params.append('valorMaximo', filters.valorMaximo.toString());

      params.append('format', format);

      const response = await axios.get(
        `${this.baseURL}/v1/patrimonio/export?${params.toString()}`,
        { 
          responseType: 'blob',
          headers: this.getAuthHeaders(),
        },
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao exportar patrimônios:', error);
      throw error;
    }
  }
}

// Instância singleton
export const patrimonioService = new PatrimonioService();
