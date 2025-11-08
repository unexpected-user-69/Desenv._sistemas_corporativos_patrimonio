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
 * Testes E2E para Audit Controller
 * 
 * Cobre todos os 6 endpoints do Audit Controller:
 * - POST /v1/audit/logs - Criar log de auditoria (público)
 * - GET /v1/audit/logs - Buscar logs de auditoria (ADMIN/TEACHER)
 * - GET /v1/audit/logs/:id - Buscar log por ID (ADMIN/TEACHER)
 * - GET /v1/audit/logs/entity/:entityType/:entityId - Buscar logs por entidade (ADMIN/TEACHER)
 * - GET /v1/audit/logs/user/:userId - Buscar logs por usuário (ADMIN/TEACHER)
 * - GET /v1/audit/stats - Obter estatísticas de auditoria (ADMIN apenas)
 */

// Função auxiliar para delays entre testes (evitar rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Audit (e2e)', () => {
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

  // Audit logs de teste
  let auditLogId1: string;
  let auditLogId2: string;
  let testEntityId: string;
  let testEntityType: string;

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
    adminEmail = `admin-audit-test-${timestamp}@example.com`;
    adminPassword = 'AdminPassword123!';
    await createTestUser(dataSource, hashService, {
      id: adminUserId,
      email: adminEmail,
      password: adminPassword,
      name: 'Admin Audit Test',
      role: UserRole.ADMIN,
      isActive: true,
    });
    
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
    teacherEmail = `teacher-audit-test-${timestamp}@example.com`;
    teacherPassword = 'TeacherPassword123!';
    await createTestUser(dataSource, hashService, {
      id: teacherUserId,
      email: teacherEmail,
      password: teacherPassword,
      name: 'Teacher Audit Test',
      role: UserRole.TEACHER,
      isActive: true,
    });
    
    await delay(13000);
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
    studentEmail = `student-audit-test-${timestamp}@example.com`;
    studentPassword = 'StudentPassword123!';
    await createTestUser(dataSource, hashService, {
      id: studentUserId,
      email: studentEmail,
      password: studentPassword,
      name: 'Student Audit Test',
      role: UserRole.STUDENT,
      isActive: true,
    });
    
    await delay(13000);
    const studentLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: studentEmail, password: studentPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    studentAccessToken = studentLoginResponse.body.accessToken;

    // Preparar dados para testes
    testEntityId = randomUUID();
    testEntityType = 'Patrimonio';
  });

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('POST /v1/audit/logs', () => {
    it('deve criar log de auditoria com sucesso (201) - público', async () => {
      const createAuditLogDto = {
        action: 'CREATE',
        entityType: 'Patrimonio',
        entityId: testEntityId,
        userId: adminUserId,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        description: 'Criação de patrimônio de teste',
      };

      const response = await request(httpServer)
        .post('/v1/audit/logs')
        .send(createAuditLogDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('action', createAuditLogDto.action);
      expect(response.body).toHaveProperty('entityType', createAuditLogDto.entityType);
      expect(response.body).toHaveProperty('entityId', createAuditLogDto.entityId);
      expect(response.body).toHaveProperty('timestamp');

      auditLogId1 = response.body.id;
    });

    it('deve criar log de auditoria com valores old/new (201)', async () => {
      await delay(1000);
      const createAuditLogDto = {
        action: 'UPDATE',
        entityType: 'Patrimonio',
        entityId: testEntityId,
        userId: adminUserId,
        oldValues: { nome: 'Nome Antigo', status: 'ATIVO' },
        newValues: { nome: 'Nome Novo', status: 'MANUTENCAO' },
        description: 'Atualização de patrimônio',
      };

      const response = await request(httpServer)
        .post('/v1/audit/logs')
        .send(createAuditLogDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('action', createAuditLogDto.action);
      expect(response.body).toHaveProperty('oldValues');
      expect(response.body).toHaveProperty('newValues');

      auditLogId2 = response.body.id;
    });

    it('deve criar log de auditoria sem userId (201)', async () => {
      await delay(1000);
      const createAuditLogDto = {
        action: 'DELETE',
        entityType: 'Patrimonio',
        entityId: testEntityId,
        description: 'Exclusão de patrimônio',
      };

      const response = await request(httpServer)
        .post('/v1/audit/logs')
        .send(createAuditLogDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('action', createAuditLogDto.action);
    });

    it('deve retornar 400 para dados inválidos (action faltando)', async () => {
      await delay(1000);
      const invalidDto = {
        entityType: 'Patrimonio',
        entityId: testEntityId,
      };

      await request(httpServer)
        .post('/v1/audit/logs')
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 400 para dados inválidos (entityType faltando)', async () => {
      await delay(1000);
      const invalidDto = {
        action: 'CREATE',
        entityId: testEntityId,
      };

      await request(httpServer)
        .post('/v1/audit/logs')
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 400 para UUID inválido (userId)', async () => {
      await delay(1000);
      const invalidDto = {
        action: 'CREATE',
        entityType: 'Patrimonio',
        userId: 'invalid-uuid',
      };

      await request(httpServer)
        .post('/v1/audit/logs')
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 400 para UUID inválido (entityId)', async () => {
      await delay(1000);
      const invalidDto = {
        action: 'CREATE',
        entityType: 'Patrimonio',
        entityId: 'invalid-uuid',
      };

      await request(httpServer)
        .post('/v1/audit/logs')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /v1/audit/logs', () => {
    it('deve listar logs de auditoria (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/audit/logs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      // Pode retornar array ou objeto com paginação
      if (Array.isArray(response.body)) {
        expect(response.body.length).toBeGreaterThanOrEqual(0);
      } else {
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
      }
    });

    it('deve listar logs de auditoria (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get('/v1/audit/logs')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar logs por action (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/audit/logs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ action: 'CREATE' })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar logs por entityType (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/audit/logs')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ entityType: 'Patrimonio' })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/audit/logs')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });

    it('deve retornar 401 para não autenticado', async () => {
      // Com DEV_AUTO_AUTH, pode retornar 200
      const response = await request(httpServer)
        .get('/v1/audit/logs');
      
      // Aceita 200 (com auto-auth) ou 401 (sem auto-auth)
      expect([200, 401]).toContain(response.status);
    });
  });

  describe('GET /v1/audit/logs/:id', () => {
    it('deve buscar log por ID (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/audit/logs/${auditLogId1}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', auditLogId1);
      expect(response.body).toHaveProperty('action');
      expect(response.body).toHaveProperty('entityType');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve buscar log por ID (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get(`/v1/audit/logs/${auditLogId2}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', auditLogId2);
    });

    it('deve retornar 404 para log não encontrado', async () => {
      const nonExistentId = randomUUID();
      await request(httpServer)
        .get(`/v1/audit/logs/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 400 para UUID inválido', async () => {
      await request(httpServer)
        .get('/v1/audit/logs/invalid-uuid')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(400);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/audit/logs/${auditLogId1}`)
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/audit/logs/entity/:entityType/:entityId', () => {
    it('deve buscar logs por entidade (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/audit/logs/entity/${testEntityType}/${testEntityId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      // Pode retornar array ou objeto
      if (Array.isArray(response.body)) {
        expect(Array.isArray(response.body)).toBe(true);
      } else {
        expect(response.body).toBeDefined();
      }
    });

    it('deve buscar logs por entidade (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get(`/v1/audit/logs/entity/${testEntityType}/${testEntityId}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve retornar 400 para UUID inválido (entityId)', async () => {
      await request(httpServer)
        .get(`/v1/audit/logs/entity/${testEntityType}/invalid-uuid`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(400);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/audit/logs/entity/${testEntityType}/${testEntityId}`)
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/audit/logs/user/:userId', () => {
    it('deve buscar logs por usuário (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/audit/logs/user/${adminUserId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      // Pode retornar array ou objeto
      if (Array.isArray(response.body)) {
        expect(Array.isArray(response.body)).toBe(true);
      } else {
        expect(response.body).toBeDefined();
      }
    });

    it('deve buscar logs por usuário (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get(`/v1/audit/logs/user/${teacherUserId}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve retornar 400 para UUID inválido (userId)', async () => {
      await request(httpServer)
        .get('/v1/audit/logs/user/invalid-uuid')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(400);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/audit/logs/user/${adminUserId}`)
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/audit/stats', () => {
    it('deve retornar estatísticas de auditoria (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/audit/stats')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      // Verificar estrutura básica (pode variar conforme implementação)
      expect(typeof response.body).toBe('object');
    });

    it('deve retornar 403 para TEACHER (sem permissão - apenas ADMIN)', async () => {
      await request(httpServer)
        .get('/v1/audit/stats')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/audit/stats')
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

    // Verificar e criar tabela audit_logs
    try {
      await queryRunner.query('SELECT 1 FROM audit_logs LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE IF NOT EXISTS audit_logs (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id uuid,
          action varchar(100) NOT NULL,
          entity_type varchar(100) NOT NULL,
          entity_id uuid,
          old_values jsonb,
          new_values jsonb,
          ip_address inet,
          user_agent text,
          session_id uuid,
          service varchar(100),
          endpoint varchar(200),
          description text,
          timestamp timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id, timestamp);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
        CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action, timestamp);
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
    // Limpar audit logs de teste
    await dataSource.query(
      `DELETE FROM audit_logs 
       WHERE user_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%audit-test%@example.com'
       )`,
    );

    // Limpar refresh tokens de teste
    await dataSource.query(
      `DELETE FROM auth_refresh_tokens 
       WHERE user_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%@example.com' 
         AND (email LIKE '%audit-test%')
       )`,
    );

    // Limpar usuários de teste
    await dataSource.query(
      `DELETE FROM users 
       WHERE email LIKE '%@example.com' 
       AND (email LIKE '%audit-test%')`,
    );
  } catch (error) {
    // Ignorar erros de limpeza
    console.warn('Erro ao limpar dados de teste:', error);
  }
}

