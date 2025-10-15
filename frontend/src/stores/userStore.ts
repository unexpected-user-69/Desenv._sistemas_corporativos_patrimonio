import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { userService } from '../services/userService';
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

interface UserState {
  // Estado dos usuários
  users: User[];
  selectedUser: User | null;
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;

  // Estado de filtros
  filters: UserFilters;

  // Estado de carregamento
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  // Estado de erro
  error: string | null;

  // Estatísticas
  stats: UserStats | null;
  roleStats: UserRoleStats[] | null;
  recentActiveUsers: RecentActiveUsersResponse | null;

  // Ações de listagem
  fetchUsers: (filters?: UserFilters) => Promise<void>;
  refreshUsers: () => Promise<void>;
  setFilters: (filters: UserFilters) => void;
  clearFilters: () => void;

  // Ações de CRUD
  createUser: (userData: CreateUserRequest) => Promise<User>;
  updateUser: (id: string, userData: UpdateUserRequest) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;

  // Ações em lote
  createUsersBulk: (
    bulkData: BulkCreateUserRequest,
  ) => Promise<BulkCreateUserResponse>;

  // Ações de busca avançada
  advancedSearch: (
    searchRequest: AdvancedSearchRequest,
  ) => Promise<PaginatedUsersResponse>;
  cursorSearch: (
    searchRequest: CursorSearchRequest,
  ) => Promise<CursorSearchResponse>;
  fuzzySearch: (searchRequest: FuzzySearchRequest) => Promise<User[]>;
  searchByDateRange: (dateRange: DateRangeRequest) => Promise<User[]>;

  // Ações de estatísticas
  fetchUserStats: () => Promise<void>;
  fetchUserRoleStats: () => Promise<void>;
  fetchRecentActiveUsers: (
    period?: 'last_7_days' | 'last_30_days' | 'last_90_days',
  ) => Promise<void>;

  // Ações de estado
  setSelectedUser: (user: User | null) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  users: [],
  selectedUser: null,
  totalUsers: 0,
  currentPage: 1,
  totalPages: 0,
  hasNext: false,
  hasPrev: false,
  filters: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  stats: null,
  roleStats: null,
  recentActiveUsers: null,
};

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Ações de listagem
      fetchUsers: async (filters?: UserFilters) => {
        set({ isLoading: true, error: null });

        try {
          const currentFilters = { ...get().filters, ...filters };
          const response = await userService.getUsers(currentFilters);

          set({
            users: response.data,
            totalUsers: response.total,
            currentPage: response.page,
            totalPages: Math.ceil(response.total / response.limit),
            hasNext: response.hasNext,
            hasPrev: response.hasPrev,
            filters: currentFilters,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      refreshUsers: async () => {
        const { filters } = get();
        await get().fetchUsers(filters);
      },

      setFilters: (filters: UserFilters) => {
        set({ filters: { ...get().filters, ...filters } });
      },

      clearFilters: () => {
        set({
          filters: { page: 1, limit: 10, sortBy: 'name', sortOrder: 'asc' },
        });
      },

      // Ações de CRUD
      createUser: async (userData: CreateUserRequest) => {
        set({ isCreating: true, error: null });

        try {
          const newUser = await userService.createUser(userData);

          // Atualizar lista de usuários
          const { users } = get();
          set({
            users: [newUser, ...users],
            totalUsers: get().totalUsers + 1,
            isCreating: false,
          });

          return newUser;
        } catch (error: any) {
          set({
            error: error.message,
            isCreating: false,
          });
          throw error;
        }
      },

      updateUser: async (id: string, userData: UpdateUserRequest) => {
        set({ isUpdating: true, error: null });

        try {
          const updatedUser = await userService.updateUser(id, userData);

          // Atualizar usuário na lista
          const { users } = get();
          const updatedUsers = users.map((user) =>
            user.id === id ? updatedUser : user,
          );

          set({
            users: updatedUsers,
            selectedUser:
              get().selectedUser?.id === id ? updatedUser : get().selectedUser,
            isUpdating: false,
          });

          return updatedUser;
        } catch (error: any) {
          set({
            error: error.message,
            isUpdating: false,
          });
          throw error;
        }
      },

      deleteUser: async (id: string) => {
        set({ isDeleting: true, error: null });

        try {
          await userService.deleteUser(id);

          // Remover usuário da lista
          const { users } = get();
          const filteredUsers = users.filter((user) => user.id !== id);

          set({
            users: filteredUsers,
            totalUsers: get().totalUsers - 1,
            selectedUser:
              get().selectedUser?.id === id ? null : get().selectedUser,
            isDeleting: false,
          });
        } catch (error: any) {
          set({
            error: error.message,
            isDeleting: false,
          });
          throw error;
        }
      },

      getUserById: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await userService.getUserById(id);
          set({ selectedUser: user, isLoading: false });
          return user;
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      getUserByEmail: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await userService.getUserByEmail(email);
          set({ isLoading: false });
          return user;
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Ações em lote
      createUsersBulk: async (bulkData: BulkCreateUserRequest) => {
        set({ isCreating: true, error: null });

        try {
          const response = await userService.createUsersBulk(bulkData);

          // Atualizar lista de usuários com os novos usuários criados
          const { users } = get();
          set({
            users: [...response.created, ...users],
            totalUsers: get().totalUsers + response.created.length,
            isCreating: false,
          });

          return response;
        } catch (error: any) {
          set({
            error: error.message,
            isCreating: false,
          });
          throw error;
        }
      },

      // Ações de busca avançada
      advancedSearch: async (searchRequest: AdvancedSearchRequest) => {
        set({ isLoading: true, error: null });

        try {
          const response = await userService.advancedSearch(searchRequest);

          set({
            users: response.data,
            totalUsers: response.total,
            currentPage: response.page,
            totalPages: Math.ceil(response.total / response.limit),
            hasNext: response.hasNext,
            hasPrev: response.hasPrev,
            isLoading: false,
          });

          return response;
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      cursorSearch: async (searchRequest: CursorSearchRequest) => {
        set({ isLoading: true, error: null });

        try {
          const response = await userService.cursorSearch(searchRequest);
          set({ isLoading: false });
          return response;
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      fuzzySearch: async (searchRequest: FuzzySearchRequest) => {
        set({ isLoading: true, error: null });

        try {
          const users = await userService.fuzzySearch(searchRequest);
          set({ isLoading: false });
          return users;
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      searchByDateRange: async (dateRange: DateRangeRequest) => {
        set({ isLoading: true, error: null });

        try {
          const users = await userService.searchByDateRange(dateRange);
          set({ isLoading: false });
          return users;
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Ações de estatísticas
      fetchUserStats: async () => {
        set({ isLoading: true, error: null });

        try {
          const stats = await userService.getUserStats();
          set({ stats, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      fetchUserRoleStats: async () => {
        set({ isLoading: true, error: null });

        try {
          const roleStats = await userService.getUserRoleStats();
          set({ roleStats, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      fetchRecentActiveUsers: async (
        period:
          | 'last_7_days'
          | 'last_30_days'
          | 'last_90_days' = 'last_30_days',
      ) => {
        set({ isLoading: true, error: null });

        try {
          const recentActiveUsers =
            await userService.getRecentActiveUsers(period);
          set({ recentActiveUsers, isLoading: false });
        } catch (error: any) {
          set({
            error: error.message,
            isLoading: false,
          });
        }
      },

      // Ações de estado
      setSelectedUser: (user: User | null) => {
        set({ selectedUser: user });
      },

      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set({
          ...initialState,
          filters: { page: 1, limit: 10, sortBy: 'name', sortOrder: 'asc' },
        });
      },
    }),
    {
      name: 'user-store',
    },
  ),
);
