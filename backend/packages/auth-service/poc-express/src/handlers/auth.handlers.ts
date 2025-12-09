import { Request, Response } from 'express';

/**
 * Mock de usuários para demonstração do PoC
 * Em uma implementação real, isso viria de um banco de dados
 */
const MOCK_USERS = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'admin@dev.local',
    password: 'AdminPassword123!',
    name: 'Admin User',
    role: 'ADMIN',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    email: 'user@dev.local',
    password: 'UserPassword123!',
    name: 'Regular User',
    role: 'OPERATOR',
  },
];

/**
 * POST /auth/login
 * Valida credenciais e retorna tokens mockados
 */
export const loginHandler = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: [
        email ? '' : 'email should not be empty',
        password ? '' : 'password should not be empty',
      ].filter(Boolean),
      error: 'Bad Request',
    });
  }

  // Validação de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      statusCode: 400,
      message: ['email must be an email'],
      error: 'Bad Request',
    });
  }

  // Buscar usuário mockado
  const user = MOCK_USERS.find((u) => u.email === email.toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid credentials',
      error: 'Unauthorized',
    });
  }

  // Resposta mockada conforme contrato OpenAPI
  const timestamp = Date.now();
  res.status(200).json({
    accessToken: `mock-access-token-${timestamp}`,
    refreshToken: `mock-refresh-token-${timestamp}`,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};

/**
 * POST /auth/refresh
 * Renova o access token usando o refresh token
 */
export const refreshHandler = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      statusCode: 400,
      message: ['refreshToken should not be empty'],
      error: 'Bad Request',
    });
  }

  // Validação básica do refresh token (mock)
  if (!refreshToken.startsWith('mock-refresh-token-')) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid refresh token',
      error: 'Unauthorized',
    });
  }

  // Resposta mockada
  const timestamp = Date.now();
  res.status(200).json({
    accessToken: `mock-access-token-${timestamp}`,
    refreshToken: `mock-refresh-token-${timestamp}`,
  });
};

/**
 * POST /auth/logout
 * Realiza logout do usuário
 */
export const logoutHandler = (req: Request, res: Response) => {
  // Em um PoC, apenas retorna sucesso
  // Em produção, invalidaria o refresh token
  res.status(200).json({
    message: 'Logout successful',
  });
};

/**
 * GET /auth/me
 * Retorna informações do usuário autenticado
 */
export const meHandler = (req: Request, res: Response) => {
  // Mock: extrair token do header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    });
  }

  const token = authHeader.substring(7);
  
  // Validação básica do token (mock)
  if (!token.startsWith('mock-access-token-')) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid token',
      error: 'Unauthorized',
    });
  }

  // Resposta mockada (retorna o primeiro usuário como exemplo)
  const user = MOCK_USERS[0];
  res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
};

