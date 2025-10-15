// Tipos para sistema de gestão de usuários

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  avatarUrl?: string;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  q?: string; // Busca textual
  role?: UserRole;
  isActive?: boolean;
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedUsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface UserStats {
  total: number;
  byRole: {
    [key in UserRole]: number;
  };
  active: number;
  inactive: number;
  recent: number; // Usuários criados nos últimos 30 dias
}

export interface BulkCreateUserRequest {
  users: CreateUserRequest[];
}

export interface BulkCreateUserResponse {
  created: User[];
  errors: Array<{
    index: number;
    data: CreateUserRequest;
    error: string;
  }>;
}

export interface AdvancedSearchRequest {
  filters: {
    name?: string;
    email?: string;
    role?: UserRole[];
    isActive?: boolean;
    createdAtAfter?: string;
    createdAtBefore?: string;
    updatedAtAfter?: string;
    updatedAtBefore?: string;
  };
  pagination: {
    page: number;
    limit: number;
  };
  sorting: {
    field: string;
    order: 'asc' | 'desc';
  }[];
}

export interface CursorSearchRequest {
  cursor?: string;
  limit: number;
  filters?: {
    role?: UserRole;
    isActive?: boolean;
  };
}

export interface CursorSearchResponse {
  data: User[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface FuzzySearchRequest {
  query: string;
  fields: ('name' | 'email')[];
  limit?: number;
  threshold?: number; // 0-1, quanto menor mais restritivo
}

export interface DateRangeRequest {
  startDate: string;
  endDate: string;
  field: 'createdAt' | 'updatedAt';
  limit?: number;
}

export interface UserRoleStats {
  role: UserRole;
  count: number;
  percentage: number;
  active: number;
  inactive: number;
}

export interface RecentActiveUsersResponse {
  users: User[];
  total: number;
  period: string; // "last_7_days" | "last_30_days" | "last_90_days"
}
