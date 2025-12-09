// Tipos para o sistema de autenticação
import React from 'react';
import type { User, UserRole } from './user';

// Re-exportar tipos de usuários para compatibilidade
export type { User, UserRole };

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

// Tipos para proteção de rotas
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

// Tipos para guards
export interface RouteGuard {
  canActivate: (user: User | null) => boolean;
  redirectTo?: string;
}
