import { LoginRequest, LoginResponse } from '../types/auth';
import { User, UserRole } from '../types/user';

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
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    role: UserRole.OPERATOR,
    isActive: true,
    avatarUrl: undefined,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Simular delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockAuthService {
  /**
   * Simula login do usuário
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    await delay(1000); // Simular delay de rede

    // Encontrar usuário pelo email
    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase(),
    );

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Simular validação de senha (qualquer senha funciona no mock)
    if (!credentials.password || credentials.password.length < 6) {
      throw new Error('Senha inválida');
    }

    // Gerar tokens mock
    const token = `mock_token_${user.id}_${Date.now()}`;
    const refreshToken = `mock_refresh_${user.id}_${Date.now()}`;
    const expiresIn = 3600; // 1 hora

    return {
      user,
      token,
      refreshToken,
      expiresIn,
    };
  }

  /**
   * Simula logout do usuário
   */
  static async logout(): Promise<void> {
    await delay(500); // Simular delay de rede
    // No mock, apenas retorna sucesso
  }

  /**
   * Simula renovação de token
   */
  static async refreshToken(): Promise<LoginResponse> {
    await delay(500); // Simular delay de rede

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    // Extrair ID do usuário do token mock
    const userId = refreshToken.split('_')[2];
    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Gerar novos tokens
    const token = `mock_token_${user.id}_${Date.now()}`;
    const newRefreshToken = `mock_refresh_${user.id}_${Date.now()}`;
    const expiresIn = 3600; // 1 hora

    return {
      user,
      token,
      refreshToken: newRefreshToken,
      expiresIn,
    };
  }

  /**
   * Obtém usuário mock pelo ID
   */
  static getUserById(id: string): User | null {
    return mockUsers.find((u) => u.id === id) || null;
  }

  /**
   * Lista todos os usuários mock
   */
  static getAllUsers(): User[] {
    return [...mockUsers];
  }
}

export default MockAuthService;
