/**
 * Helper para autenticação em testes E2E
 * 
 * Este módulo fornece funções reutilizáveis para criar usuários de teste
 * e obter tokens de autenticação para diferentes roles (ADMIN, MANAGER, OPERATOR).
 * 
 * Uso:
 * ```typescript
 * const { adminToken, managerToken, operatorToken } = await setupTestUsers(httpServer, dataSource, hashService);
 * 
 * // Usar token em requisições
 * await request(httpServer)
 *   .get('/v1/users')
 *   .set('Authorization', `Bearer ${adminToken}`)
 *   .expect(200);
 * ```
 */

import { DataSource } from 'typeorm';
import { HashService } from '../../src/common/services/hash.service';
import { UserRole } from '../../src/users/enums/user-role.enum';
import request from 'supertest';
import { randomUUID } from 'crypto';
import * as http from 'http';

export interface TestUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

export interface TestUserTokens {
  adminToken: string;
  managerToken: string;
  operatorToken: string;
  adminUserId: string;
  managerUserId: string;
  operatorUserId: string;
  adminEmail: string;
  managerEmail: string;
  operatorEmail: string;
  adminPassword: string;
  managerPassword: string;
  operatorPassword: string;
}

/**
 * Normaliza email (trim + lowercase) para garantir consistência
 */
function normalizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }
  return email.trim().toLowerCase();
}

/**
 * Cria um usuário de teste no banco de dados
 */
export async function createTestUser(
  dataSource: DataSource,
  hashService: HashService,
  user: TestUser,
): Promise<void> {
  // Garantir que o email está normalizado
  user.email = normalizeEmail(user.email);
  
  const passwordHash = await hashService.hash(user.password);

  // Verificar se o usuário já existe por email (incluindo soft delete)
  const existingUserByEmail = await dataSource.query(
    `SELECT id, deleted_at FROM users WHERE email = $1 LIMIT 1`,
    [user.email],
  );

  // Verificar se o usuário já existe por ID
  const existingUserById = await dataSource.query(
    `SELECT id, deleted_at FROM users WHERE id = $1 LIMIT 1`,
    [user.id],
  );

  if (existingUserById && existingUserById.length > 0) {
    const existingUser = existingUserById[0];
    const isSoftDeleted = existingUser.deleted_at !== null;
    
    // Se o usuário existe e NÃO está soft deleted, apenas atualizar senha se necessário
    // Não tentar atualizar outros campos para evitar problemas de FK constraint
    if (!isSoftDeleted) {
      // Usuário está ativo, apenas atualizar senha (se necessário)
      try {
        await dataSource.query(
          `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
          [passwordHash, user.id],
        );
      } catch (error: any) {
        // Se falhar, pode ser devido a FKs, mas usuário já existe e está ativo
        // Continuar mesmo se não conseguir atualizar senha
        // O login pode falhar, mas pelo menos o usuário existe
      }
    } else {
      // Usuário está soft deleted, tentar restaurar (pode falhar devido a FKs)
      try {
        await dataSource.query(
          `UPDATE users SET deleted_at = NULL, password_hash = $1, updated_at = NOW() WHERE id = $2`,
          [passwordHash, user.id],
        );
      } catch (error: any) {
        // Se falhar devido a FKs, criar novo usuário com email único
        const newEmail = normalizeEmail(`${user.email}.${Date.now()}`);
        try {
          await dataSource.query(
            `INSERT INTO users (id, email, password_hash, name, role, is_active, created_at, updated_at, deleted_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NULL)`,
            [user.id, newEmail, passwordHash, user.name, user.role, user.isActive],
          );
          user.email = newEmail;
        } catch (insertError: any) {
          // Se ainda falhar, tentar com novo ID
          const newId = randomUUID();
          await dataSource.query(
            `INSERT INTO users (id, email, password_hash, name, role, is_active, created_at, updated_at, deleted_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NULL)`,
            [newId, newEmail, passwordHash, user.name, user.role, user.isActive],
          );
          user.id = newId;
          user.email = newEmail;
        }
      }
    }
  } else if (existingUserByEmail && existingUserByEmail.length > 0) {
    const existingUser = existingUserByEmail[0];
    const existingId = existingUser.id;
    const isSoftDeleted = existingUser.deleted_at !== null;
    
    // Usar o ID existente
    user.id = existingId;
    
    // Se o usuário existe e NÃO está soft deleted, apenas atualizar senha
    if (!isSoftDeleted) {
      try {
        await dataSource.query(
          `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE email = $2`,
          [passwordHash, user.email],
        );
      } catch (error: any) {
        // Se falhar, pode ser devido a FKs, mas usuário já existe e está ativo
        // Continuar mesmo se não conseguir atualizar senha
      }
    } else {
      // Usuário está soft deleted, tentar restaurar (pode falhar devido a FKs)
      try {
        await dataSource.query(
          `UPDATE users SET deleted_at = NULL, password_hash = $1, updated_at = NOW() WHERE email = $2`,
          [passwordHash, user.email],
        );
      } catch (error: any) {
        // Se falhar devido a FKs, criar novo usuário com email único
        const newEmail = normalizeEmail(`${user.email}.${Date.now()}`);
        try {
          await dataSource.query(
            `INSERT INTO users (id, email, password_hash, name, role, is_active, created_at, updated_at, deleted_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NULL)`,
            [existingId, newEmail, passwordHash, user.name, user.role, user.isActive],
          );
          user.email = newEmail;
        } catch (insertError: any) {
          // Se ainda falhar, tentar com novo ID
          const newId = randomUUID();
          await dataSource.query(
            `INSERT INTO users (id, email, password_hash, name, role, is_active, created_at, updated_at, deleted_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NULL)`,
            [newId, newEmail, passwordHash, user.name, user.role, user.isActive],
          );
          user.id = newId;
          user.email = newEmail;
        }
      }
    }
  } else {
    // Usuário não existe, inserir
    try {
      await dataSource.query(
        `INSERT INTO users (id, email, password_hash, name, role, is_active, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NULL)
         ON CONFLICT (id) DO UPDATE SET
           email = EXCLUDED.email,
           password_hash = EXCLUDED.password_hash,
           name = EXCLUDED.name,
           role = EXCLUDED.role,
           is_active = EXCLUDED.is_active,
           updated_at = NOW(),
           deleted_at = NULL`,
        [user.id, user.email, passwordHash, user.name, user.role, user.isActive],
      );
    } catch (error: any) {
      // Se der erro de email duplicado, tentar atualizar pelo email
      if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        await dataSource.query(
          `UPDATE users 
           SET id = $1, password_hash = $2, name = $3, role = $4, is_active = $5, 
               updated_at = NOW(), deleted_at = NULL
           WHERE email = $6`,
          [user.id, passwordHash, user.name, user.role, user.isActive, user.email],
        );
      } else {
        throw error;
      }
    }
  }

  // Verificar se o usuário foi criado/atualizado corretamente
  // Tentar primeiro pelo ID, depois pelo email (caso o ID tenha mudado)
  let verifyUser = await dataSource.query(
    `SELECT id FROM users WHERE id = $1 AND deleted_at IS NULL`,
    [user.id],
  );
  
  // Se não encontrou pelo ID, tentar pelo email
  if (!verifyUser || verifyUser.length === 0) {
    verifyUser = await dataSource.query(
      `SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL`,
      [user.email],
    );
    
    // Se encontrou pelo email, atualizar o ID do usuário
    if (verifyUser && verifyUser.length > 0) {
      user.id = verifyUser[0].id;
    }
  }
  
  if (!verifyUser || verifyUser.length === 0) {
    // Tentar criar novamente de forma mais simples
    try {
      const passwordHash = await hashService.hash(user.password);
      await dataSource.query(
        `INSERT INTO users (id, email, password_hash, name, role, is_active, created_at, updated_at, deleted_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), NULL)
         ON CONFLICT (email) DO UPDATE SET
           id = EXCLUDED.id,
           password_hash = EXCLUDED.password_hash,
           name = EXCLUDED.name,
           role = EXCLUDED.role,
           is_active = EXCLUDED.is_active,
           updated_at = NOW(),
           deleted_at = NULL`,
        [user.id, user.email, passwordHash, user.name, user.role, user.isActive],
      );
      
      // Verificar novamente
      verifyUser = await dataSource.query(
        `SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL`,
        [user.email],
      );
      
      if (verifyUser && verifyUser.length > 0) {
        user.id = verifyUser[0].id;
      }
    } catch (finalError: any) {
      throw new Error(
        `Failed to create/update test user: ${user.id} (${user.email}). Error: ${finalError.message}`,
      );
    }
  }
  
  if (!verifyUser || verifyUser.length === 0) {
    throw new Error(`Failed to create/update test user: ${user.id} (${user.email})`);
  }
}

/**
 * Faz login e retorna o token de acesso
 */
export async function loginUser(
  httpServer: http.Server,
  email: string,
  password: string,
  retries: number = 3,
): Promise<string> {
  const normalizedEmail = normalizeEmail(email);
  
  // Aguardar um pouco para garantir que o servidor está totalmente inicializado
  // Isso é importante porque o app.init() pode não ter terminado completamente
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await request(httpServer)
        .post('/v1/auth/login')
        .send({ email: normalizedEmail, password });

      if (response.status === 200 || response.status === 201) {
        const token = response.body.accessToken || response.body.token;
        if (!token) {
          throw new Error(`Login succeeded but no token returned. Body: ${JSON.stringify(response.body)}`);
        }
        return token;
      }

      // Se não for última tentativa, aguardar antes de tentar novamente
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        continue;
      }

      // Última tentativa falhou
      throw new Error(
        `Login failed after ${retries} attempts: Expected 200 or 201, got ${response.status}. Body: ${JSON.stringify(response.body)}. Email: ${normalizedEmail}`,
      );
    } catch (error: any) {
      if (attempt === retries) {
        throw error;
      }
      // Aguardar antes de tentar novamente
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  throw new Error(`Login failed after ${retries} attempts for email: ${normalizedEmail}`);
}

/**
 * Configura usuários de teste (ADMIN, MANAGER, OPERATOR) e retorna tokens
 * 
 * @param httpServer - Servidor HTTP da aplicação
 * @param dataSource - DataSource do TypeORM
 * @param hashService - Serviço de hash de senhas
 * @param prefix - Prefixo único para emails (opcional, usa timestamp por padrão)
 * @returns Tokens de acesso para cada role
 */
export async function setupTestUsers(
  httpServer: http.Server,
  dataSource: DataSource,
  hashService: HashService,
  prefix?: string,
): Promise<TestUserTokens> {
  // Configurar USERS_API_URL com a porta correta do servidor
  // Isso é necessário para que o UsersHttpClient possa validar credenciais
  // O getter baseUrl do UsersHttpClient lê do process.env como fallback,
  // então podemos atualizar aqui e será refletido nas próximas chamadas
  
  let baseUrl: string | undefined;
  let detectedPort: number | undefined;
  
  // Aguardar um pouco para garantir que o servidor está totalmente iniciado
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  // Tentar obter a porta do servidor (múltiplas tentativas)
  // Nota: Em alguns casos, o servidor pode não retornar um endereço válido quando usado com supertest
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const address = httpServer.address();
      if (address && typeof address === 'object' && address.port) {
        detectedPort = address.port;
        baseUrl = `http://localhost:${detectedPort}/v1`;
        break; // Porta detectada com sucesso
      }
    } catch (error) {
      // Ignorar erros na detecção da porta
    }
    
    // Se não conseguiu na primeira tentativa, aguardar um pouco antes de tentar novamente
    if (attempt < 2 && !baseUrl) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  
  // Se não conseguiu detectar a porta, usar fallback
  if (!baseUrl) {
    // Tentar variáveis de ambiente primeiro
    const envPort = process.env.PORT || process.env.APP_PORT || process.env.BACKEND_PORT;
    if (envPort) {
      baseUrl = `http://localhost:${envPort}/v1`;
    } else if (process.env.USERS_API_URL) {
      // Usar o valor já configurado em process.env
      baseUrl = process.env.USERS_API_URL;
    } else {
      // Fallback: usar porta padrão do NestJS em desenvolvimento (3101 conforme BACKEND_PORT)
      // Em testes e2e com supertest, o servidor pode não estar escutando em uma porta TCP real
      // Nesse caso, o UsersHttpClient precisa de uma URL válida para fazer requisições HTTP
      baseUrl = 'http://localhost:3101/v1';
    }
  }
  
  // Garantir que baseUrl está definido (TypeScript safety)
  if (!baseUrl) {
    throw new Error('Não foi possível determinar USERS_API_URL. Configure manualmente antes de chamar setupTestUsers.');
  }
  
  // Sempre atualizar process.env
  // O getter baseUrl do UsersHttpClient prioriza process.env.USERS_API_URL diretamente
  process.env.USERS_API_URL = baseUrl;
  
  if (detectedPort) {
    console.log(`[setupTestUsers] ✅ Porta detectada: ${detectedPort}, USERS_API_URL: ${baseUrl}`);
  } else {
    // Apenas logar se não houver USERS_API_URL configurado no .env
    if (!process.env.USERS_API_URL || process.env.USERS_API_URL === 'http://users:3000') {
      console.warn(`[setupTestUsers] ⚠️ Porta não detectada, usando fallback: ${baseUrl}`);
      console.warn(`[setupTestUsers] ⚠️ Em testes e2e com supertest, o servidor pode não estar escutando em uma porta TCP real.`);
      console.warn(`[setupTestUsers] ⚠️ Se os testes falharem com erro 401, configure USERS_API_URL no .env.`);
    } else {
      // Se já está configurado no .env, apenas logar info
      console.log(`[setupTestUsers] ✅ Usando USERS_API_URL do .env: ${baseUrl}`);
    }
  }

  const timestamp = Date.now();
  const emailPrefix = prefix || `test-${timestamp}`;

  // Normalizar prefixo do email
  const normalizedPrefix = normalizeEmail(emailPrefix);

  // Criar usuário ADMIN
  const adminUser: TestUser = {
    id: randomUUID(),
    email: `${normalizedPrefix}-admin@example.com`,
    password: 'AdminPassword123!',
    name: 'Admin Test User',
    role: UserRole.ADMIN,
    isActive: true,
  };

  // Normalizar email do usuário
  adminUser.email = normalizeEmail(adminUser.email);

  try {
    await createTestUser(dataSource, hashService, adminUser);
  } catch (error: any) {
    throw new Error(`Failed to create ADMIN user: ${error.message}. Email: ${adminUser.email}`);
  }

  // Verificar que o usuário foi criado corretamente
  const adminCheck = await dataSource.query(
    `SELECT id, email, is_active, deleted_at FROM users WHERE email = $1`,
    [adminUser.email],
  );

  if (!adminCheck || adminCheck.length === 0 || adminCheck[0].deleted_at !== null) {
    throw new Error(`ADMIN user was not created correctly. Email: ${adminUser.email}`);
  }

  if (!adminCheck[0].is_active) {
    throw new Error(`ADMIN user is not active. Email: ${adminUser.email}`);
  }

  // Atualizar ID do usuário caso tenha mudado
  if (adminCheck[0].id !== adminUser.id) {
    adminUser.id = adminCheck[0].id;
  }

  // Verificar senha diretamente no banco antes de tentar login
  try {
    const passwordCheck = await dataSource.query(
      `SELECT password_hash FROM users WHERE email = $1 AND deleted_at IS NULL`,
      [adminUser.email],
    );
    
    if (passwordCheck && passwordCheck.length > 0) {
      const storedHash = passwordCheck[0].password_hash;
      const isValid = await hashService.compare(adminUser.password, storedHash);
      if (!isValid) {
        console.error(`[setupTestUsers] Senha do usuário ADMIN não corresponde ao hash no banco. Email: ${adminUser.email}`);
        // Tentar atualizar a senha
        const newHash = await hashService.hash(adminUser.password);
        await dataSource.query(
          `UPDATE users SET password_hash = $1 WHERE email = $2`,
          [newHash, adminUser.email],
        );
        console.log(`[setupTestUsers] Senha do usuário ADMIN atualizada.`);
      }
    }
  } catch (error: any) {
    console.warn(`[setupTestUsers] Erro ao verificar senha: ${error.message}`);
  }

  // Aguardar um pouco antes do login para evitar rate limiting
  await new Promise((resolve) => setTimeout(resolve, 500));

  let adminToken: string;
  try {
    // Fazer login (logs apenas em caso de erro)
    adminToken = await loginUser(httpServer, adminUser.email, adminUser.password);
    // Login bem-sucedido - não precisa logar (reduz poluição nos logs)
  } catch (error: any) {
    // Log adicional para debug
    console.error(`[setupTestUsers] Erro no login ADMIN: ${error.message}`);
    console.error(`[setupTestUsers] USERS_API_URL atual: ${process.env.USERS_API_URL}`);
    console.error(`[setupTestUsers] Email do usuário: ${adminUser.email}`);
    
    // Tentar verificar o usuário no banco novamente
    try {
      const finalCheck = await dataSource.query(
        `SELECT id, email, is_active, deleted_at, password_hash IS NOT NULL as has_password FROM users WHERE email = $1`,
        [adminUser.email],
      );
      console.error(`[setupTestUsers] Estado final do usuário no banco: ${JSON.stringify(finalCheck)}`);
    } catch (dbError: any) {
      console.error(`[setupTestUsers] Erro ao verificar usuário no banco: ${dbError.message}`);
    }
    
    throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
  }

  // Criar usuário MANAGER (Gerente de Patrimônio)
  const managerUser: TestUser = {
    id: randomUUID(),
    email: `${normalizedPrefix}-manager@example.com`,
    password: 'ManagerPassword123!',
    name: 'Manager Test User',
    role: UserRole.MANAGER,
    isActive: true,
  };

  // Normalizar email do usuário
  managerUser.email = normalizeEmail(managerUser.email);

  try {
    await createTestUser(dataSource, hashService, managerUser);
  } catch (error: any) {
    throw new Error(`Failed to create MANAGER user: ${error.message}. Email: ${managerUser.email}`);
  }

  // Verificar que o usuário foi criado corretamente
  const managerCheck = await dataSource.query(
    `SELECT id, email, is_active, deleted_at FROM users WHERE email = $1`,
    [managerUser.email],
  );

  if (!managerCheck || managerCheck.length === 0 || managerCheck[0].deleted_at !== null) {
    throw new Error(`MANAGER user was not created correctly. Email: ${managerUser.email}`);
  }

  if (!managerCheck[0].is_active) {
    throw new Error(`MANAGER user is not active. Email: ${managerUser.email}`);
  }

  // Atualizar ID do usuário caso tenha mudado
  if (managerCheck[0].id !== managerUser.id) {
    managerUser.id = managerCheck[0].id;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  let managerToken: string;
  try {
    managerToken = await loginUser(httpServer, managerUser.email, managerUser.password);
  } catch (error: any) {
    throw new Error(`Failed to login MANAGER user: ${error.message}. Email: ${managerUser.email}`);
  }

  // Criar usuário OPERATOR (Operador de Inventário)
  const operatorUser: TestUser = {
    id: randomUUID(),
    email: `${normalizedPrefix}-operator@example.com`,
    password: 'OperatorPassword123!',
    name: 'Operator Test User',
    role: UserRole.OPERATOR,
    isActive: true,
  };

  // Normalizar email do usuário
  operatorUser.email = normalizeEmail(operatorUser.email);

  try {
    await createTestUser(dataSource, hashService, operatorUser);
  } catch (error: any) {
    throw new Error(`Failed to create OPERATOR user: ${error.message}. Email: ${operatorUser.email}`);
  }

  // Verificar que o usuário foi criado corretamente
  const operatorCheck = await dataSource.query(
    `SELECT id, email, is_active, deleted_at FROM users WHERE email = $1`,
    [operatorUser.email],
  );

  if (!operatorCheck || operatorCheck.length === 0 || operatorCheck[0].deleted_at !== null) {
    throw new Error(`OPERATOR user was not created correctly. Email: ${operatorUser.email}`);
  }

  if (!operatorCheck[0].is_active) {
    throw new Error(`OPERATOR user is not active. Email: ${operatorUser.email}`);
  }

  // Atualizar ID do usuário caso tenha mudado
  if (operatorCheck[0].id !== operatorUser.id) {
    operatorUser.id = operatorCheck[0].id;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  let operatorToken: string;
  try {
    operatorToken = await loginUser(httpServer, operatorUser.email, operatorUser.password);
  } catch (error: any) {
    throw new Error(`Failed to login OPERATOR user: ${error.message}. Email: ${operatorUser.email}`);
  }

  const tokens: TestUserTokens = {
    adminToken,
    managerToken,
    operatorToken,
    adminUserId: adminUser.id,
    managerUserId: managerUser.id,
    operatorUserId: operatorUser.id,
    adminEmail: adminUser.email,
    managerEmail: managerUser.email,
    operatorEmail: operatorUser.email,
    adminPassword: adminUser.password,
    managerPassword: managerUser.password,
    operatorPassword: operatorUser.password,
  };

  // Validar que todos os tokens foram obtidos
  if (!tokens.adminToken || !tokens.managerToken || !tokens.operatorToken) {
    throw new Error(
      `Failed to obtain all tokens. Admin: ${!!tokens.adminToken}, Manager: ${!!tokens.managerToken}, Operator: ${!!tokens.operatorToken}`,
    );
  }

  return tokens;
}

/**
 * Retorna o token apropriado baseado na role necessária
 * 
 * @param tokens - Tokens de teste
 * @param requiredRole - Role necessária para o endpoint
 * @returns Token de acesso apropriado
 */
export function getTokenForRole(
  tokens: TestUserTokens | undefined,
  requiredRole: UserRole | UserRole[],
): string {
  if (!tokens) {
    throw new Error(
      'Tokens are undefined. Make sure setupTestUsers() completed successfully in beforeAll hook.',
    );
  }

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Se ADMIN está nas roles necessárias, usar ADMIN (maior permissão)
  if (roles.includes(UserRole.ADMIN)) {
    if (!tokens.adminToken) {
      throw new Error('Admin token is undefined. Make sure setupTestUsers() completed successfully.');
    }
    return tokens.adminToken;
  }

  // Se MANAGER está nas roles necessárias, usar MANAGER
  if (roles.includes(UserRole.MANAGER)) {
    if (!tokens.managerToken) {
      throw new Error('Manager token is undefined. Make sure setupTestUsers() completed successfully.');
    }
    return tokens.managerToken;
  }

  // Se OPERATOR está nas roles necessárias, usar OPERATOR
  if (roles.includes(UserRole.OPERATOR)) {
    if (!tokens.operatorToken) {
      throw new Error('Operator token is undefined. Make sure setupTestUsers() completed successfully.');
    }
    return tokens.operatorToken;
  }

  // Por padrão, usar ADMIN (maior permissão)
  if (!tokens.adminToken) {
    throw new Error('Admin token is undefined. Make sure setupTestUsers() completed successfully.');
  }
  return tokens.adminToken;
}

/**
 * Cria uma requisição autenticada com o token apropriado
 * 
 * @param httpServer - Servidor HTTP
 * @param method - Método HTTP (get, post, put, patch, delete)
 * @param path - Caminho do endpoint
 * @param tokens - Tokens de teste
 * @param requiredRole - Role necessária
 * @returns Requisição configurada com autenticação
 */
export function authenticatedRequest(
  httpServer: http.Server,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  path: string,
  tokens: TestUserTokens | undefined,
  requiredRole: UserRole | UserRole[] = UserRole.ADMIN,
) {
  if (!tokens) {
    throw new Error(
      'Tokens are undefined. Make sure setupTestUsers() completed successfully in beforeAll hook.',
    );
  }

  const token = getTokenForRole(tokens, requiredRole);
  
  if (!token) {
    throw new Error(
      `Token for role ${Array.isArray(requiredRole) ? requiredRole.join(', ') : requiredRole} is undefined.`,
    );
  }

  return request(httpServer)[method](path).set('Authorization', `Bearer ${token}`);
}

/**
 * Helper para delay entre requisições (evitar rate limiting)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

