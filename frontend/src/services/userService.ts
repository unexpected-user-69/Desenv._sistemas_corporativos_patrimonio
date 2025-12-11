import axios, { AxiosResponse } from 'axios';
import { config } from '../config/environment';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilters,
  PaginatedUsersResponse,
  UserStats,
  BulkCreateUserRequest,
  BulkCreateUserResponse,
  AdvancedSearchRequest,
  CursorSearchRequest,
  CursorSearchResponse,
  FuzzySearchRequest,
  DateRangeRequest,
  UserRoleStats,
  RecentActiveUsersResponse,
} from '../types/user';

class UserService {
  private baseURL = config.api.baseUrl;

  /**
   * Helper para obter headers de autenticação
   */
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Lista usuários com paginação e filtros
   */
  async getUsers(filters: UserFilters = {}): Promise<PaginatedUsersResponse> {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.q) params.append('q', filters.q);
    if (filters.role) params.append('role', filters.role);
    if (filters.isActive !== undefined)
      params.append('is_active', filters.isActive.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.baseURL}/v1/users?${params.toString()}`,
        { headers: this.getAuthHeaders() },
      );

      // Mapear resposta do backend para o formato esperado pelo frontend
      const backendData = response.data;
      return {
        data: backendData.data || [],
        total: backendData.total || 0,
        page: backendData.page || 1,
        limit: backendData.limit || 10,
        hasNext: backendData.hasNextPage || false,
        hasPrev: backendData.hasPreviousPage || false,
      };
    } catch (error: any) {
      // Tratamento específico para erro 403 (Forbidden)
      if (error.response?.status === 403) {
        const token = localStorage.getItem('auth_token');
        const user = localStorage.getItem('user');
        let errorMessage = 'Acesso negado. Você não tem permissão para visualizar usuários.';
        
        if (!token) {
          errorMessage = 'Você precisa estar autenticado para acessar esta funcionalidade.';
        } else if (user) {
          try {
            const userData = JSON.parse(user);
            if (userData.role === 'OPERATOR') {
              errorMessage = 'Apenas usuários com role MANAGER ou ADMIN podem visualizar a lista de usuários.';
            } else {
              errorMessage = 'Seu token de autenticação pode ter expirado. Tente fazer login novamente.';
            }
          } catch {
            errorMessage = 'Erro ao validar suas permissões. Tente fazer login novamente.';
          }
        }
        
        throw new Error(errorMessage);
      }
      
      // Tratamento para outros erros
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erro ao carregar usuários'
      );
    }
  }

  /**
   * Busca usuário por ID
   */
  async getUserById(id: string): Promise<User> {
    const response: AxiosResponse<User> = await axios.get(
      `${this.baseURL}/v1/users/${id}`,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Busca usuário por email
   */
  async getUserByEmail(email: string): Promise<User> {
    const response: AxiosResponse<User> = await axios.get(
      `${this.baseURL}/v1/users/email/${email}`,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Cria novo usuário
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response: AxiosResponse<User> = await axios.post(
      `${this.baseURL}/v1/users`,
      userData,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Cria usuários em lote
   */
  async createUsersBulk(
    bulkData: BulkCreateUserRequest,
  ): Promise<BulkCreateUserResponse> {
    const response: AxiosResponse<BulkCreateUserResponse> = await axios.post(
      `${this.baseURL}/v1/users/bulk`,
      bulkData,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Atualiza usuário
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response: AxiosResponse<User> = await axios.put(
      `${this.baseURL}/v1/users/${id}`,
      userData,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Deleta usuário
   */
  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${this.baseURL}/v1/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  /**
   * Busca avançada de usuários
   */
  async advancedSearch(
    searchRequest: AdvancedSearchRequest,
  ): Promise<PaginatedUsersResponse> {
    const response: AxiosResponse<PaginatedUsersResponse> = await axios.post(
      `${this.baseURL}/v1/users/advanced/search`,
      searchRequest,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Busca com cursor
   */
  async cursorSearch(
    searchRequest: CursorSearchRequest,
  ): Promise<CursorSearchResponse> {
    const response: AxiosResponse<CursorSearchResponse> = await axios.post(
      `${this.baseURL}/v1/users/cursor/search`,
      searchRequest,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Busca fuzzy
   */
  async fuzzySearch(searchRequest: FuzzySearchRequest): Promise<User[]> {
    const response: AxiosResponse<User[]> = await axios.post(
      `${this.baseURL}/v1/users/fuzzy/search`,
      searchRequest,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Busca por intervalo de datas
   */
  async searchByDateRange(dateRange: DateRangeRequest): Promise<User[]> {
    const response: AxiosResponse<User[]> = await axios.post(
      `${this.baseURL}/v1/users/date-range`,
      dateRange,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Obtém estatísticas de usuários por role
   */
  async getUserRoleStats(): Promise<UserRoleStats[]> {
    const response: AxiosResponse<UserRoleStats[]> = await axios.get(
      `${this.baseURL}/v1/users/stats/roles`,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Obtém usuários ativos recentes
   */
  async getRecentActiveUsers(
    period: 'last_7_days' | 'last_30_days' | 'last_90_days' = 'last_30_days',
  ): Promise<RecentActiveUsersResponse> {
    const response: AxiosResponse<RecentActiveUsersResponse> = await axios.get(
      `${this.baseURL}/v1/users/recent/active?period=${period}`,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }

  /**
   * Obtém estatísticas gerais de usuários
   */
  async getUserStats(): Promise<UserStats> {
    const response: AxiosResponse<UserStats> = await axios.get(
      `${this.baseURL}/v1/users/stats`,
      { headers: this.getAuthHeaders() },
    );

    return response.data;
  }
}

export const userService = new UserService();
