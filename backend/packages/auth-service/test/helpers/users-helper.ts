/**
 * Helper para criar usuários de teste no banco de dados
 * 
 * Este módulo fornece funções para criar usuários diretamente no banco,
 * já que o auth-service depende do users-service para validar credenciais.
 * Para testes E2E, criamos usuários no banco compartilhado.
 */

import { DataSource } from 'typeorm';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';

export interface TestUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  isActive: boolean;
}

/**
 * Hash de senha usando bcrypt
 */
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Cria um usuário de teste no banco de dados
 */
export async function createTestUser(
  dataSource: DataSource,
  email: string,
  password: string,
  name: string,
  role: string = 'ADMIN',
  isActive: boolean = true,
): Promise<TestUser> {
  const userId = randomUUID();
  const passwordHash = await hashPassword(password);

  try {
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
      [userId, email.toLowerCase(), passwordHash, name, role, isActive],
    );
  } catch (error: any) {
    // Se der erro de ID duplicado, tentar atualizar pelo email
    if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
      const existingUser = await dataSource.query(
        `SELECT id FROM users WHERE email = $1`,
        [email.toLowerCase()],
      );
      
      if (existingUser.length > 0) {
        await dataSource.query(
          `UPDATE users 
           SET password_hash = $1, name = $2, role = $3, is_active = $4, 
               updated_at = NOW(), deleted_at = NULL
           WHERE email = $5`,
          [passwordHash, name, role, isActive, email.toLowerCase()],
        );
        return {
          id: existingUser[0].id,
          email: email.toLowerCase(),
          password,
          name,
          role,
          isActive,
        };
      }
    }
    throw error;
  }

  return {
    id: userId,
    email: email.toLowerCase(),
    password,
    name,
    role,
    isActive,
  };
}

/**
 * Remove um usuário de teste do banco de dados
 */
export async function deleteTestUser(
  dataSource: DataSource,
  email: string,
): Promise<void> {
  try {
    await dataSource.query(
      `DELETE FROM users WHERE email = $1`,
      [email.toLowerCase()],
    );
  } catch (error) {
    // Ignorar erros de limpeza
  }
}

/**
 * Remove todos os usuários de teste criados com um prefixo específico
 */
export async function cleanupTestUsers(
  dataSource: DataSource,
  emailPrefix: string,
): Promise<void> {
  try {
    await dataSource.query(
      `DELETE FROM users WHERE email LIKE $1`,
      [`%${emailPrefix}%@%`],
    );
  } catch (error) {
    // Ignorar erros de limpeza
  }
}

