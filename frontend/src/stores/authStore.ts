import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginRequest } from '../types/auth';
import { User, UserRole } from '../types/user';
import { AuthService } from '../services/authService';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokenAction: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  checkAuth: () => void;
  clearError: () => void;

  // Computed getters
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });

        try {
          const response = await AuthService.login(credentials);

          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Erro ao realizar login',
          });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        try {
          await AuthService.logout();
        } catch (error) {
          console.warn('Erro ao fazer logout:', error);
        } finally {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      refreshTokenAction: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await AuthService.refreshToken();

          set({
            user: response.user,
            token: response.token,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || 'Erro ao renovar token',
          });
          throw error;
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          set({ user: updatedUser });
          AuthService.updateUser(updatedUser);
        }
      },

      checkAuth: () => {
        const isAuth = AuthService.isAuthenticated();
        const user = AuthService.getCurrentUser();
        const token = AuthService.getCurrentToken();

        set({
          isAuthenticated: isAuth,
          user: isAuth ? user : null,
          token: isAuth ? token : null,
        });

        // Se o token está próximo do vencimento, tentar renovar
        if (isAuth && AuthService.isTokenExpiringSoon()) {
          get()
            .refreshTokenAction()
            .catch(() => {
              // Se falhar, fazer logout
              get().logout();
            });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      // Computed getters
      isAdmin: () => {
        const user = get().user;
        return user?.role === UserRole.ADMIN;
      },

      isTeacher: () => {
        const user = get().user;
        return user?.role === UserRole.TEACHER;
      },

      isStudent: () => {
        const user = get().user;
        return user?.role === UserRole.STUDENT;
      },

      hasRole: (role: UserRole) => {
        const user = get().user;
        return user?.role === role;
      },

      hasAnyRole: (roles: UserRole[]) => {
        const user = get().user;
        return user ? roles.includes(user.role) : false;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

// Hook para verificar autenticação na inicialização
export const useAuthInit = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Verificar autenticação quando o store é inicializado
  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);
};

export default useAuthStore;
