import axios, { AxiosResponse } from 'axios';
import { config } from '../config/environment';
import { LoginRequest, LoginResponse } from '../types/auth';
import { User } from '../types/user';
import { MockAuthService } from './mockAuthService';

// Configuração do axios para autenticação
const authApi = axios.create({
  baseURL: `${config.api.baseUrl}/v1`,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para lidar com respostas e refresh token
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await authApi.post('/auth/refresh', {
            refreshToken,
          });

          const { token, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Repetir a requisição original com o novo token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return authApi(originalRequest);
        }
      } catch (refreshError) {
        // Se o refresh falhar, limpar tokens e redirecionar para login
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export class AuthService {
  // Flag para usar mock quando backend não estiver disponível
  private static useMock = false; // Backend está pronto

  /**
   * Realiza login do usuário
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    if (this.useMock) {
      return this.loginWithMock(credentials);
    }

    try {
      const response: AxiosResponse<any> = await authApi.post(
        '/auth/login',
        credentials,
      );

      // O backend retorna: { accessToken, refreshToken, user: { id, email, name, role } }
      // Precisamos converter para o formato esperado pelo frontend
      const { accessToken, refreshToken, user: backendUser } = response.data;
      
      // Converter o user do backend para o formato do frontend
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name,
        role: backendUser.role as any, // Converter role string para UserRole
        isActive: true, // Assumir ativo se o login foi bem-sucedido
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // JWT tokens geralmente expiram em 15 minutos (900 segundos)
      // Mas vamos usar um valor padrão seguro
      const expiresIn = 15 * 60; // 15 minutos em segundos

      // Armazenar tokens e dados do usuário
      localStorage.setItem('auth_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem(
        'token_expires',
        (Date.now() + expiresIn * 1000).toString(),
      );

      return {
        user,
        token: accessToken,
        refreshToken,
        expiresIn,
      };
    } catch (error: any) {
      // Se falhar, mostrar erro real do backend
      let errorMessage = 'Erro ao realizar login';
      
      if (error.response?.data) {
        // Backend retorna: { message: "Invalid credentials", error: "Unauthorized", statusCode: 401 }
        errorMessage = error.response.data.message || error.response.data.error || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error('Erro no login:', errorMessage, error.response?.data);
      throw new Error(errorMessage);
    }
  }

  /**
   * Login usando mock
   */
  private static async loginWithMock(
    credentials: LoginRequest,
  ): Promise<LoginResponse> {
    const response = await MockAuthService.login(credentials);

    // Armazenar tokens e dados do usuário
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem(
      'token_expires',
      (Date.now() + response.expiresIn * 1000).toString(),
    );

    return response;
  }

  /**
   * Realiza logout do usuário
   */
  static async logout(): Promise<void> {
    if (this.useMock) {
      await MockAuthService.logout();
    } else {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          await authApi.post('/auth/logout');
        }
      } catch (error) {
        console.warn('Erro ao fazer logout no servidor:', error);
      }
    }

    // Sempre limpar dados locais
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expires');
  }

  /**
   * Renova o token de acesso
   */
  static async refreshToken(): Promise<LoginResponse> {
    if (this.useMock) {
      return this.refreshTokenWithMock();
    }

    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('Refresh token não encontrado');
      }

      const response: AxiosResponse<any> = await authApi.post(
        '/auth/refresh',
        { refreshToken },
      );

      // O backend retorna: { accessToken, refreshToken, user: { id, email, name, role } }
      const { accessToken, refreshToken: newRefreshToken, user: backendUser } = response.data;
      
      // Converter o user do backend para o formato do frontend
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name,
        role: backendUser.role as any,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const expiresIn = 15 * 60; // 15 minutos em segundos

      // Atualizar tokens
      localStorage.setItem('auth_token', accessToken);
      localStorage.setItem('refresh_token', newRefreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem(
        'token_expires',
        (Date.now() + expiresIn * 1000).toString(),
      );

      return {
        user,
        token: accessToken,
        refreshToken: newRefreshToken,
        expiresIn,
      };
    } catch (error: any) {
      // Se falhar, mostrar erro real
      const errorMessage = error.response?.data?.message || error.message || 'Erro ao renovar token';
      console.error('Erro no refresh token:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Refresh token usando mock
   */
  private static async refreshTokenWithMock(): Promise<LoginResponse> {
    const response = await MockAuthService.refreshToken();

    // Atualizar tokens
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem(
      'token_expires',
      (Date.now() + response.expiresIn * 1000).toString(),
    );

    return response;
  }

  /**
   * Obtém o usuário atual do localStorage
   */
  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  }

  /**
   * Obtém o token atual
   */
  static getCurrentToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Verifica se o usuário está autenticado
   */
  static isAuthenticated(): boolean {
    const token = this.getCurrentToken();
    const user = this.getCurrentUser();
    const expires = localStorage.getItem('token_expires');

    if (!token || !user || !expires) {
      return false;
    }

    // Verificar se o token não expirou
    const now = Date.now();
    const tokenExpires = parseInt(expires, 10);

    if (now >= tokenExpires) {
      this.logout();
      return false;
    }

    return true;
  }

  /**
   * Verifica se o token está próximo do vencimento (5 minutos)
   */
  static isTokenExpiringSoon(): boolean {
    const expires = localStorage.getItem('token_expires');
    if (!expires) return true;

    const now = Date.now();
    const tokenExpires = parseInt(expires, 10);
    const fiveMinutes = 5 * 60 * 1000; // 5 minutos em ms

    return tokenExpires - now < fiveMinutes;
  }

  /**
   * Atualiza dados do usuário no localStorage
   */
  static updateUser(user: Partial<User>): void {
    try {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  }

  /**
   * Verifica se o usuário tem uma role específica
   */
  static hasRole(requiredRole: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === requiredRole;
  }

  /**
   * Verifica se o usuário tem uma das roles necessárias
   */
  static hasAnyRole(requiredRoles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? requiredRoles.includes(user.role) : false;
  }

  /**
   * Verifica se o usuário é admin
   */
  static isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  /**
   * Verifica se o usuário é teacher
   */
  static isTeacher(): boolean {
    return this.hasRole('TEACHER');
  }

  /**
   * Verifica se o usuário é student
   */
  static isStudent(): boolean {
    return this.hasRole('STUDENT');
  }
}

export default AuthService;
