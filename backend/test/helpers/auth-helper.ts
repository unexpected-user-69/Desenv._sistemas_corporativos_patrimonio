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
 * Cria um usuário de teste no banco de dados
 */
export async function createTestUser(
  dataSource: DataSource,
  hashService: HashService,
  user: TestUser,
): Promise<void> {
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
        const newEmail = `${user.email}.${Date.now()}`;
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
        const newEmail = `${user.email}.${Date.now()}`;
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
): Promise<string> {
  const response = await request(httpServer)
    .post('/v1/auth/login')
    .send({ email, password })
    .expect((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(
          `Login failed: Expected 200 or 201, got ${res.status}. Body: ${JSON.stringify(res.body)}`,
        );
      }
    });

  return response.body.accessToken || response.body.token;
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
  const timestamp = Date.now();
  const emailPrefix = prefix || `test-${timestamp}`;

  // Criar usuário ADMIN
  const adminUser: TestUser = {
    id: randomUUID(),
    email: `${emailPrefix}-admin@example.com`,
    password: 'AdminPassword123!',
    name: 'Admin Test User',
    role: UserRole.ADMIN,
    isActive: true,
  };

  await createTestUser(dataSource, hashService, adminUser);

  // Aguardar um pouco antes do login para evitar rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const adminToken = await loginUser(httpServer, adminUser.email, adminUser.password);

  // Criar usuário MANAGER (Gerente de Patrimônio)
  const managerUser: TestUser = {
    id: randomUUID(),
    email: `${emailPrefix}-manager@example.com`,
    password: 'ManagerPassword123!',
    name: 'Manager Test User',
    role: UserRole.MANAGER,
    isActive: true,
  };

  await createTestUser(dataSource, hashService, managerUser);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const managerToken = await loginUser(httpServer, managerUser.email, managerUser.password);

  // Criar usuário OPERATOR (Operador de Inventário)
  const operatorUser: TestUser = {
    id: randomUUID(),
    email: `${emailPrefix}-operator@example.com`,
    password: 'OperatorPassword123!',
    name: 'Operator Test User',
    role: UserRole.OPERATOR,
    isActive: true,
  };

  await createTestUser(dataSource, hashService, operatorUser);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const operatorToken = await loginUser(httpServer, operatorUser.email, operatorUser.password);

  return {
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
}

/**
 * Retorna o token apropriado baseado na role necessária
 * 
 * @param tokens - Tokens de teste
 * @param requiredRole - Role necessária para o endpoint
 * @returns Token de acesso apropriado
 */
export function getTokenForRole(
  tokens: TestUserTokens,
  requiredRole: UserRole | UserRole[],
): string {
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  // Se ADMIN está nas roles necessárias, usar ADMIN (maior permissão)
  if (roles.includes(UserRole.ADMIN)) {
    return tokens.adminToken;
  }

  // Se MANAGER está nas roles necessárias, usar MANAGER
  if (roles.includes(UserRole.MANAGER)) {
    return tokens.managerToken;
  }

  // Se OPERATOR está nas roles necessárias, usar OPERATOR
  if (roles.includes(UserRole.OPERATOR)) {
    return tokens.operatorToken;
  }

  // Por padrão, usar ADMIN (maior permissão)
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
  tokens: TestUserTokens,
  requiredRole: UserRole | UserRole[] = UserRole.ADMIN,
) {
  const token = getTokenForRole(tokens, requiredRole);
  return request(httpServer)[method](path).set('Authorization', `Bearer ${token}`);
}

/**
 * Helper para delay entre requisições (evitar rate limiting)
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

