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
import { mockUserService } from './mockUserService';

class UserService {
  private baseURL = config.api.baseUrl;
  private useMock = true; // Mude para false quando backend estiver pronto

  /**
   * Lista usuários com paginação e filtros
   */
  async getUsers(filters: UserFilters = {}): Promise<PaginatedUsersResponse> {
    if (this.useMock) {
      return mockUserService.getUsers(filters);
    }

    try {
      const params = new URLSearchParams();

      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.q) params.append('q', filters.q);
      if (filters.role) params.append('role', filters.role);
      if (filters.isActive !== undefined)
        params.append('is_active', filters.isActive.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

      const response: AxiosResponse<PaginatedUsersResponse> = await axios.get(
        `${this.baseURL}/v1/users?${params.toString()}`,
      );

      return response.data;
    } catch (error: any) {
      // Se falhar, tentar com mock
      console.warn('Backend não disponível, usando mock:', error.message);
      return mockUserService.getUsers(filters);
    }
  }

  /**
   * Busca usuário por ID
   */
  async getUserById(id: string): Promise<User> {
    if (this.useMock) {
      return mockUserService.getUserById(id);
    }

    try {
      const response: AxiosResponse<User> = await axios.get(
        `${this.baseURL}/v1/users/${id}`,
      );

      return response.data;
    } catch (error: any) {
      console.warn('Backend não disponível, usando mock:', error.message);
      return mockUserService.getUserById(id);
    }
  }

  /**
   * Busca usuário por email
   */
  async getUserByEmail(email: string): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${this.baseURL}/v1/users/email/${email}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar usuário por email',
      );
    }
  }

  /**
   * Cria novo usuário
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    if (this.useMock) {
      return mockUserService.createUser(userData);
    }

    try {
      const response: AxiosResponse<User> = await axios.post(
        `${this.baseURL}/v1/users`,
        userData,
      );

      return response.data;
    } catch (error: any) {
      console.warn('Backend não disponível, usando mock:', error.message);
      return mockUserService.createUser(userData);
    }
  }

  /**
   * Cria usuários em lote
   */
  async createUsersBulk(
    bulkData: BulkCreateUserRequest,
  ): Promise<BulkCreateUserResponse> {
    try {
      const response: AxiosResponse<BulkCreateUserResponse> = await axios.post(
        `${this.baseURL}/v1/users/bulk`,
        bulkData,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao criar usuários em lote',
      );
    }
  }

  /**
   * Atualiza usuário
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    if (this.useMock) {
      return mockUserService.updateUser(id, userData);
    }

    try {
      const response: AxiosResponse<User> = await axios.put(
        `${this.baseURL}/v1/users/${id}`,
        userData,
      );

      return response.data;
    } catch (error: any) {
      console.warn('Backend não disponível, usando mock:', error.message);
      return mockUserService.updateUser(id, userData);
    }
  }

  /**
   * Deleta usuário
   */
  async deleteUser(id: string): Promise<void> {
    if (this.useMock) {
      return mockUserService.deleteUser(id);
    }

    try {
      await axios.delete(`${this.baseURL}/v1/users/${id}`);
    } catch (error: any) {
      console.warn('Backend não disponível, usando mock:', error.message);
      return mockUserService.deleteUser(id);
    }
  }

  /**
   * Busca avançada de usuários
   */
  async advancedSearch(
    searchRequest: AdvancedSearchRequest,
  ): Promise<PaginatedUsersResponse> {
    try {
      const response: AxiosResponse<PaginatedUsersResponse> = await axios.post(
        `${this.baseURL}/v1/users/advanced/search`,
        searchRequest,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro na busca avançada',
      );
    }
  }

  /**
   * Busca com cursor
   */
  async cursorSearch(
    searchRequest: CursorSearchRequest,
  ): Promise<CursorSearchResponse> {
    try {
      const response: AxiosResponse<CursorSearchResponse> = await axios.post(
        `${this.baseURL}/v1/users/cursor/search`,
        searchRequest,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro na busca com cursor',
      );
    }
  }

  /**
   * Busca fuzzy
   */
  async fuzzySearch(searchRequest: FuzzySearchRequest): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await axios.post(
        `${this.baseURL}/v1/users/fuzzy/search`,
        searchRequest,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro na busca fuzzy');
    }
  }

  /**
   * Busca por intervalo de datas
   */
  async searchByDateRange(dateRange: DateRangeRequest): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await axios.post(
        `${this.baseURL}/v1/users/date-range`,
        dateRange,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro na busca por intervalo de datas',
      );
    }
  }

  /**
   * Obtém estatísticas de usuários por role
   */
  async getUserRoleStats(): Promise<UserRoleStats[]> {
    try {
      const response: AxiosResponse<UserRoleStats[]> = await axios.get(
        `${this.baseURL}/v1/users/stats/roles`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Erro ao buscar estatísticas por role',
      );
    }
  }

  /**
   * Obtém usuários ativos recentes
   */
  async getRecentActiveUsers(
    period: 'last_7_days' | 'last_30_days' | 'last_90_days' = 'last_30_days',
  ): Promise<RecentActiveUsersResponse> {
    try {
      const response: AxiosResponse<RecentActiveUsersResponse> =
        await axios.get(
          `${this.baseURL}/v1/users/recent/active?period=${period}`,
        );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar usuários ativos recentes',
      );
    }
  }

  /**
   * Obtém estatísticas gerais de usuários
   */
  async getUserStats(): Promise<UserStats> {
    try {
      const response: AxiosResponse<UserStats> = await axios.get(
        `${this.baseURL}/v1/users/stats`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Erro ao buscar estatísticas de usuários',
      );
    }
  }
}

export const userService = new UserService();
