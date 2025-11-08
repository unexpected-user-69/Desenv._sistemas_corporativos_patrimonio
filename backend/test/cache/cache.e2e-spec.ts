// Habilitar auto-auth para testes ANTES de importar módulos
process.env.DEV_AUTO_AUTH = 'true';
process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { HashService } from '../../src/common/services/hash.service';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { randomUUID } from 'crypto';

/**
 * Testes E2E para Cache Controller
 * 
 * Cobre todos os 9 endpoints do Cache Controller (todos requerem ADMIN):
 * - GET /v1/cache/stats - Obter estatísticas do cache
 * - GET /v1/cache/health - Verificar saúde do cache
 * - GET /v1/cache/keys - Listar chaves do cache
 * - GET /v1/cache/operations - Listar operações recentes
 * - GET /v1/cache/alerts - Listar alertas do cache
 * - GET /v1/cache/config - Obter configuração do cache
 * - GET /v1/cache/key/:key - Obter valor de uma chave
 * - DELETE /v1/cache/key/:key - Remover chave específica
 * - POST /v1/cache/clear - Limpar cache
 */

// Função auxiliar para delays entre testes (evitar rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Cache (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  
  // Usuários de teste
  let adminUserId: string;
  let adminEmail: string;
  let adminPassword: string;
  let adminAccessToken: string;
  
  let teacherUserId: string;
  let teacherEmail: string;
  let teacherPassword: string;
  let teacherAccessToken: string;
  
  let studentUserId: string;
  let studentEmail: string;
  let studentPassword: string;
  let studentAccessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);
    hashService = app.get(HashService);

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Criar usuários de teste (ADMIN, TEACHER, STUDENT)
    const timestamp = Date.now();
    
    // ADMIN
    adminUserId = randomUUID();
    adminEmail = `admin-cache-test-${timestamp}@example.com`;
    adminPassword = 'AdminPassword123!';
    await createTestUser(dataSource, hashService, {
      id: adminUserId,
      email: adminEmail,
      password: adminPassword,
      name: 'Admin Cache Test',
      role: UserRole.ADMIN,
      isActive: true,
    });
    
    await delay(2000);
    const adminLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: adminEmail, password: adminPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    adminAccessToken = adminLoginResponse.body.accessToken;

    // TEACHER
    teacherUserId = randomUUID();
    teacherEmail = `teacher-cache-test-${timestamp}@example.com`;
    teacherPassword = 'TeacherPassword123!';
    await createTestUser(dataSource, hashService, {
      id: teacherUserId,
      email: teacherEmail,
      password: teacherPassword,
      name: 'Teacher Cache Test',
      role: UserRole.TEACHER,
      isActive: true,
    });
    
    await delay(2000);
    const teacherLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: teacherEmail, password: teacherPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    teacherAccessToken = teacherLoginResponse.body.accessToken;

    // STUDENT
    studentUserId = randomUUID();
    studentEmail = `student-cache-test-${timestamp}@example.com`;
    studentPassword = 'StudentPassword123!';
    await createTestUser(dataSource, hashService, {
      id: studentUserId,
      email: studentEmail,
      password: studentPassword,
      name: 'Student Cache Test',
      role: UserRole.STUDENT,
      isActive: true,
    });
    
    await delay(2000);
    const studentLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: studentEmail, password: studentPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    studentAccessToken = studentLoginResponse.body.accessToken;
  }, 180000); // Timeout de 3 minutos para beforeAll

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('GET /v1/cache/stats', () => {
    it('deve retornar estatísticas do cache (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/stats')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('hits');
      expect(response.body).toHaveProperty('misses');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('hitRate');
      expect(response.body).toHaveProperty('memoryUsage');
      expect(response.body).toHaveProperty('keysCount');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/stats')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/stats')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/cache/health', () => {
    it('deve retornar saúde do cache (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/health')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memoryUsage');
      expect(response.body).toHaveProperty('connections');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/health')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/cache/keys', () => {
    it('deve retornar lista de chaves (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/keys')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('keys');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('pattern');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('timestamp');
      expect(Array.isArray(response.body.keys)).toBe(true);
    });

    it('deve filtrar chaves por pattern (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/keys')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ pattern: 'user', limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('keys');
      expect(response.body).toHaveProperty('pattern', 'user');
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/keys')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/cache/operations', () => {
    it('deve retornar operações recentes (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/operations')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('operations');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('timestamp');
      expect(Array.isArray(response.body.operations)).toBe(true);
    });

    it('deve aceitar parâmetro limit (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/operations')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('limit', 10);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/operations')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/cache/alerts', () => {
    it('deve retornar alertas do cache (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/alerts')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('alerts');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('activeAlerts');
      expect(response.body).toHaveProperty('timestamp');
      expect(Array.isArray(response.body.alerts)).toBe(true);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/alerts')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/cache/config', () => {
    it('deve retornar configuração do cache (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/cache/config')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('ttl');
      expect(response.body).toHaveProperty('maxSize');
      expect(response.body).toHaveProperty('strategy');
      expect(response.body).toHaveProperty('compression');
      expect(response.body).toHaveProperty('encryption');
      expect(response.body).toHaveProperty('persistence');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/config')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/cache/key/:key', () => {
    it('deve retornar valor da chave (200) - ADMIN', async () => {
      const testKey = 'user:123';
      const response = await request(httpServer)
        .get(`/v1/cache/key/${testKey}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('key', testKey);
      expect(response.body).toHaveProperty('value');
      expect(response.body).toHaveProperty('ttl');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/cache/key/test-key')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('DELETE /v1/cache/key/:key', () => {
    it('deve remover chave do cache (200) - ADMIN', async () => {
      const testKey = 'test:delete:key';
      const response = await request(httpServer)
        .delete(`/v1/cache/key/${testKey}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('key', testKey);
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .delete('/v1/cache/key/test-key')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('POST /v1/cache/clear', () => {
    it('deve limpar cache (200/201) - ADMIN', async () => {
      const response = await request(httpServer)
        .post('/v1/cache/clear')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error(`Expected 200 or 201, got ${res.status}`);
          }
        });

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('clearedKeys');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .post('/v1/cache/clear')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .post('/v1/cache/clear')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela users
    try {
      await queryRunner.query('SELECT 1 FROM users LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS citext;
        CREATE TABLE IF NOT EXISTS users (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name varchar(255) NOT NULL,
          email citext NOT NULL,
          password_hash varchar(255) NOT NULL,
          role varchar(32) NOT NULL DEFAULT 'STUDENT',
          is_active boolean NOT NULL DEFAULT true,
          avatar_url varchar(500),
          created_at timestamptz NOT NULL DEFAULT NOW(),
          updated_at timestamptz NOT NULL DEFAULT NOW(),
          deleted_at timestamptz,
          version int NOT NULL DEFAULT 1
        );
        CREATE UNIQUE INDEX IF NOT EXISTS uq_users_email ON users(email);
      `);
    }

    // Verificar e criar tabela auth_refresh_tokens
    try {
      await queryRunner.query('SELECT 1 FROM auth_refresh_tokens LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS auth_refresh_tokens (
          id SERIAL PRIMARY KEY,
          user_id uuid NOT NULL,
          token_hash varchar(255) NOT NULL,
          issued_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          expires_at timestamptz NOT NULL,
          revoked_at timestamptz,
          replaced_by_token_id int,
          ip varchar(45),
          user_agent varchar(255),
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_auth_refresh_tokens_user_id ON auth_refresh_tokens(user_id);
        CREATE INDEX IF NOT EXISTS idx_auth_refresh_tokens_expires_at ON auth_refresh_tokens(expires_at);
      `);
    }
  } finally {
    await queryRunner.release();
  }
}

interface CreateTestUserParams {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive?: boolean;
}

async function createTestUser(
  dataSource: DataSource,
  hashService: HashService,
  params: CreateTestUserParams,
): Promise<void> {
  const { id, email, password, name, role, isActive = true } = params;

  try {
    const passwordHash = await hashService.hash(password);

    await dataSource.query(
      `INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       ON CONFLICT (email) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           is_active = EXCLUDED.is_active,
           updated_at = NOW()`,
      [id, name, email, passwordHash, role, isActive],
    );
  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error);
    throw error;
  }
}

async function cleanupTestData(dataSource: DataSource): Promise<void> {
  try {
    // Limpar refresh tokens de teste
    await dataSource.query(
      `DELETE FROM auth_refresh_tokens 
       WHERE user_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%@example.com' 
         AND (email LIKE '%cache-test%')
       )`,
    );

    // Limpar usuários de teste
    await dataSource.query(
      `DELETE FROM users 
       WHERE email LIKE '%@example.com' 
       AND (email LIKE '%cache-test%')`,
    );
  } catch (error) {
    // Ignorar erros de limpeza
    console.warn('Erro ao limpar dados de teste:', error);
  }
}

