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
  UserRole,
} from '../types/user';

// Mock data para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    role: UserRole.ADMIN,
    isActive: true,
    avatarUrl: undefined,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: UserRole.MANAGER,
    isActive: true,
    avatarUrl: undefined,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    role: UserRole.OPERATOR,
    isActive: true,
    avatarUrl: undefined,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    email: 'ana@email.com',
    role: UserRole.OPERATOR,
    isActive: false,
    avatarUrl: undefined,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    name: 'Carlos Ferreira',
    email: 'carlos@email.com',
    role: UserRole.MANAGER,
    isActive: true,
    avatarUrl: undefined,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
];

// Simular delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockUserService {
  private users: User[] = [...mockUsers];
  private nextId = 6;

  /**
   * Lista usuários com paginação e filtros
   */
  async getUsers(filters: UserFilters = {}): Promise<PaginatedUsersResponse> {
    await delay(800); // Simular delay de rede

    const {
      page = 1,
      limit = 10,
      q = '',
      role,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    let filteredUsers = [...this.users];

    // Aplicar filtros
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm),
      );
    }

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (isActive !== undefined) {
      filteredUsers = filteredUsers.filter(
        (user) => user.isActive === isActive,
      );
    }

    // Aplicar ordenação
    filteredUsers.sort((a, b) => {
      const aValue = a[sortBy as keyof User];
      const bValue = b[sortBy as keyof User];

      if (sortOrder === 'asc') {
        return (aValue || 0) > (bValue || 0) ? 1 : -1;
      } else {
        return (aValue || 0) < (bValue || 0) ? 1 : -1;
      }
    });

    // Aplicar paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);

    return {
      data: paginatedUsers,
      total,
      page,
      limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * Busca usuário por ID
   */
  async getUserById(id: string): Promise<User> {
    await delay(500);

    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  /**
   * Busca usuário por email
   */
  async getUserByEmail(email: string): Promise<User> {
    await delay(500);

    const user = this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  /**
   * Cria novo usuário
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    await delay(1000);

    // Verificar se email já existe
    const existingUser = this.users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
    );
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    const newUser: User = {
      id: this.nextId.toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role || UserRole.OPERATOR,
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      avatarUrl: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.nextId++;

    return newUser;
  }

  /**
   * Cria usuários em lote
   */
  async createUsersBulk(
    bulkData: BulkCreateUserRequest,
  ): Promise<BulkCreateUserResponse> {
    await delay(1500);

    const created: User[] = [];
    const errors: Array<{
      index: number;
      data: CreateUserRequest;
      error: string;
    }> = [];

    for (let i = 0; i < bulkData.users.length; i++) {
      const userData = bulkData.users[i];

      try {
        // Verificar se email já existe
        const existingUser = this.users.find(
          (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
        );
        if (existingUser) {
          errors.push({
            index: i,
            data: userData,
            error: 'Email já está em uso',
          });
          continue;
        }

        const newUser: User = {
          id: this.nextId.toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role || UserRole.OPERATOR,
          isActive: userData.isActive !== undefined ? userData.isActive : true,
          avatarUrl: undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        this.users.push(newUser);
        created.push(newUser);
        this.nextId++;
      } catch (error: any) {
        errors.push({
          index: i,
          data: userData,
          error: error.message,
        });
      }
    }

    return { created, errors };
  }

  /**
   * Atualiza usuário
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    await delay(800);

    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar se email já existe (se estiver sendo alterado)
    if (userData.email) {
      const existingUser = this.users.find(
        (u) =>
          u.id !== id &&
          u.email.toLowerCase() === userData.email!.toLowerCase(),
      );
      if (existingUser) {
        throw new Error('Email já está em uso');
      }
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  /**
   * Deleta usuário
   */
  async deleteUser(id: string): Promise<void> {
    await delay(600);

    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    this.users.splice(userIndex, 1);
  }

  /**
   * Busca avançada de usuários
   */
  async advancedSearch(
    searchRequest: AdvancedSearchRequest,
  ): Promise<PaginatedUsersResponse> {
    await delay(1000);

    const { filters, pagination, sorting } = searchRequest;
    let filteredUsers = [...this.users];

    // Aplicar filtros avançados
    if (filters.name) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filters.name!.toLowerCase()),
      );
    }

    if (filters.email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(filters.email!.toLowerCase()),
      );
    }

    if (filters.role && filters.role.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        filters.role!.includes(user.role),
      );
    }

    if (filters.isActive !== undefined) {
      filteredUsers = filteredUsers.filter(
        (user) => user.isActive === filters.isActive,
      );
    }

    if (filters.createdAtAfter) {
      filteredUsers = filteredUsers.filter(
        (user) => user.createdAt >= filters.createdAtAfter!,
      );
    }

    if (filters.createdAtBefore) {
      filteredUsers = filteredUsers.filter(
        (user) => user.createdAt <= filters.createdAtBefore!,
      );
    }

    // Aplicar ordenação
    if (sorting && sorting.length > 0) {
      const sort = sorting[0];
      filteredUsers.sort((a, b) => {
        const aValue = a[sort.field as keyof User];
        const bValue = b[sort.field as keyof User];

        if (sort.order === 'asc') {
          return (aValue || 0) > (bValue || 0) ? 1 : -1;
        } else {
          return (aValue || 0) < (bValue || 0) ? 1 : -1;
        }
      });
    }

    // Aplicar paginação
    const { page, limit } = pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);

    return {
      data: paginatedUsers,
      total,
      page,
      limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * Busca com cursor
   */
  async cursorSearch(
    searchRequest: CursorSearchRequest,
  ): Promise<CursorSearchResponse> {
    await delay(800);

    const { cursor, limit, filters } = searchRequest;
    let filteredUsers = [...this.users];

    // Aplicar filtros
    if (filters?.role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.role === filters.role,
      );
    }

    if (filters?.isActive !== undefined) {
      filteredUsers = filteredUsers.filter(
        (user) => user.isActive === filters.isActive,
      );
    }

    // Ordenar por ID para cursor
    filteredUsers.sort((a, b) => a.id.localeCompare(b.id));

    // Aplicar cursor
    let startIndex = 0;
    if (cursor) {
      const cursorIndex = filteredUsers.findIndex((user) => user.id === cursor);
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const resultUsers = filteredUsers.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < filteredUsers.length;
    const nextCursor = hasMore
      ? resultUsers[resultUsers.length - 1]?.id
      : undefined;

    return {
      data: resultUsers,
      nextCursor,
      hasMore,
    };
  }

  /**
   * Busca fuzzy
   */
  async fuzzySearch(searchRequest: FuzzySearchRequest): Promise<User[]> {
    await delay(600);

    const { query, fields, limit = 10, threshold = 0.6 } = searchRequest;
    const results: Array<{ user: User; score: number }> = [];

    for (const user of this.users) {
      let maxScore = 0;

      for (const field of fields) {
        const fieldValue = user[field].toLowerCase();
        const queryLower = query.toLowerCase();

        // Simulação simples de fuzzy search
        let score = 0;
        if (fieldValue.includes(queryLower)) {
          score = 1;
        } else {
          // Calcular similaridade simples
          const commonChars = queryLower
            .split('')
            .filter((char) => fieldValue.includes(char)).length;
          score = commonChars / Math.max(queryLower.length, fieldValue.length);
        }

        maxScore = Math.max(maxScore, score);
      }

      if (maxScore >= threshold) {
        results.push({ user, score: maxScore });
      }
    }

    // Ordenar por score e retornar limit
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit).map((r) => r.user);
  }

  /**
   * Busca por intervalo de datas
   */
  async searchByDateRange(dateRange: DateRangeRequest): Promise<User[]> {
    await delay(600);

    const { startDate, endDate, field, limit = 100 } = dateRange;

    return this.users
      .filter((user) => {
        const userDate = user[field];
        return userDate >= startDate && userDate <= endDate;
      })
      .slice(0, limit);
  }

  /**
   * Obtém estatísticas de usuários por role
   */
  async getUserRoleStats(): Promise<UserRoleStats[]> {
    await delay(500);

    const stats: UserRoleStats[] = [];
    const total = this.users.length;

    for (const role of Object.values(UserRole)) {
      const roleUsers = this.users.filter((user) => user.role === role);
      const active = roleUsers.filter((user) => user.isActive).length;
      const inactive = roleUsers.length - active;
      const count = roleUsers.length;
      const percentage = total > 0 ? (count / total) * 100 : 0;

      stats.push({
        role,
        count,
        percentage,
        active,
        inactive,
      });
    }

    return stats;
  }

  /**
   * Obtém usuários ativos recentes
   */
  async getRecentActiveUsers(
    period: 'last_7_days' | 'last_30_days' | 'last_90_days' = 'last_30_days',
  ): Promise<RecentActiveUsersResponse> {
    await delay(500);

    const now = new Date();
    const days =
      period === 'last_7_days' ? 7 : period === 'last_30_days' ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const recentUsers = this.users.filter((user) => {
      const userDate = new Date(user.createdAt);
      return userDate >= cutoffDate && user.isActive;
    });

    return {
      users: recentUsers,
      total: recentUsers.length,
      period,
    };
  }

  /**
   * Obtém estatísticas gerais de usuários
   */
  async getUserStats(): Promise<UserStats> {
    await delay(500);

    const total = this.users.length;
    const active = this.users.filter((user) => user.isActive).length;
    const inactive = total - active;

    const byRole = {
      [UserRole.ADMIN]: this.users.filter(
        (user) => user.role === UserRole.ADMIN,
      ).length,
      [UserRole.MANAGER]: this.users.filter(
        (user) => user.role === UserRole.MANAGER,
      ).length,
      [UserRole.OPERATOR]: this.users.filter(
        (user) => user.role === UserRole.OPERATOR,
      ).length,
    };

    // Usuários criados nos últimos 30 dias
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recent = this.users.filter(
      (user) => new Date(user.createdAt) >= thirtyDaysAgo,
    ).length;

    return {
      total,
      byRole,
      active,
      inactive,
      recent,
    };
  }
}

export const mockUserService = new MockUserService();
