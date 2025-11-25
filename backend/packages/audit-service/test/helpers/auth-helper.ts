/**
 * Helper para autenticação em testes E2E do Audit Service
 * 
 * Este módulo fornece funções para gerar tokens JWT válidos para testes,
 * já que o audit-service valida tokens localmente usando JWT_ACCESS_SECRET.
 */

import { DataSource } from 'typeorm';
import { UserRole } from '../../src/shared/enums/user-role.enum';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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
}

/**
 * Gera um token JWT válido para testes
 */
function generateTestToken(
  userId: string,
  email: string,
  roles: string[],
  secret: string = process.env.JWT_ACCESS_SECRET || 'dev_access_secret',
): string {
  const payload = {
    sub: userId,
    email,
    roles,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora
  };

  return jwt.sign(payload, secret);
}

/**
 * Hash de senha usando bcrypt
 */
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Configura usuários de teste e retorna tokens JWT válidos
 */
export async function setupTestUsers(
  dataSource: DataSource,
  prefix?: string,
): Promise<TestUserTokens> {
  const timestamp = Date.now();
  const emailPrefix = prefix || `test-${timestamp}`;

  // Criar usuário ADMIN
  const adminUser: TestUser = {
    id: randomUUID(),
    email: `${emailPrefix}-admin@example.com`.toLowerCase(),
    password: 'AdminPassword123!',
    name: 'Admin Test User',
    role: UserRole.ADMIN,
    isActive: true,
  };

  // Criar usuário MANAGER
  const managerUser: TestUser = {
    id: randomUUID(),
    email: `${emailPrefix}-manager@example.com`.toLowerCase(),
    password: 'ManagerPassword123!',
    name: 'Manager Test User',
    role: UserRole.MANAGER,
    isActive: true,
  };

  // Criar usuário OPERATOR
  const operatorUser: TestUser = {
    id: randomUUID(),
    email: `${emailPrefix}-operator@example.com`.toLowerCase(),
    password: 'OperatorPassword123!',
    name: 'Operator Test User',
    role: UserRole.OPERATOR,
    isActive: true,
  };

  // Criar usuários no banco de dados (se a tabela users existir)
  const passwordHash = await hashPassword(adminUser.password);
  
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
      [adminUser.id, adminUser.email, passwordHash, adminUser.name, adminUser.role, adminUser.isActive],
    );
  } catch (error: any) {
    // Ignorar se a tabela não existir (audit-service pode não ter acesso à tabela users)
    if (!error.message?.includes('relation "users" does not exist')) {
      if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        await dataSource.query(
          `UPDATE users 
           SET id = $1, password_hash = $2, name = $3, role = $4, is_active = $5, 
               updated_at = NOW(), deleted_at = NULL
           WHERE email = $6`,
          [adminUser.id, passwordHash, adminUser.name, adminUser.role, adminUser.isActive, adminUser.email],
        );
      }
    }
  }

  const managerPasswordHash = await hashPassword(managerUser.password);
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
      [managerUser.id, managerUser.email, managerPasswordHash, managerUser.name, managerUser.role, managerUser.isActive],
    );
  } catch (error: any) {
    if (!error.message?.includes('relation "users" does not exist')) {
      if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        await dataSource.query(
          `UPDATE users 
           SET id = $1, password_hash = $2, name = $3, role = $4, is_active = $5, 
               updated_at = NOW(), deleted_at = NULL
           WHERE email = $6`,
          [managerUser.id, managerPasswordHash, managerUser.name, managerUser.role, managerUser.isActive, managerUser.email],
        );
      }
    }
  }

  const operatorPasswordHash = await hashPassword(operatorUser.password);
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
      [operatorUser.id, operatorUser.email, operatorPasswordHash, operatorUser.name, operatorUser.role, operatorUser.isActive],
    );
  } catch (error: any) {
    if (!error.message?.includes('relation "users" does not exist')) {
      if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        await dataSource.query(
          `UPDATE users 
           SET id = $1, password_hash = $2, name = $3, role = $4, is_active = $5, 
               updated_at = NOW(), deleted_at = NULL
           WHERE email = $6`,
          [operatorUser.id, operatorPasswordHash, operatorUser.name, operatorUser.role, operatorUser.isActive, operatorUser.email],
        );
      }
    }
  }

  // Gerar tokens JWT
  const jwtSecret = process.env.JWT_ACCESS_SECRET || 'dev_access_secret';
  
  const adminToken = generateTestToken(adminUser.id, adminUser.email, ['ADMIN'], jwtSecret);
  const managerToken = generateTestToken(managerUser.id, managerUser.email, ['MANAGER'], jwtSecret);
  const operatorToken = generateTestToken(operatorUser.id, operatorUser.email, ['OPERATOR'], jwtSecret);

  return {
    adminToken,
    managerToken,
    operatorToken,
    adminUserId: adminUser.id,
    managerUserId: managerUser.id,
    operatorUserId: operatorUser.id,
  };
}

/**
 * Retorna o token apropriado baseado na role necessária
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

  if (roles.includes(UserRole.ADMIN)) {
    return tokens.adminToken;
  }

  if (roles.includes(UserRole.MANAGER)) {
    return tokens.managerToken;
  }

  if (roles.includes(UserRole.OPERATOR)) {
    return tokens.operatorToken;
  }

  return tokens.adminToken;
}

/**
 * Cria uma requisição autenticada com o token apropriado
 */
export function authenticatedRequest(
  httpServer: any,
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

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const request = require('supertest');
  return request(httpServer)[method](path).set('Authorization', `Bearer ${token}`);
}

