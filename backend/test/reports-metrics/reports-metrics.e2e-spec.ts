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
import { ReportModel } from '../../src/reports/entities/report-request.entity';
import { randomUUID } from 'crypto';

/**
 * Testes E2E para Reports Metrics Controller
 * 
 * Cobre todos os 5 endpoints do Reports Metrics Controller:
 * 1. GET /v1/reports/metrics - Obter métricas de relatórios (ADMIN/TEACHER)
 * 2. GET /v1/reports/metrics/summary - Obter métricas resumidas (ADMIN/TEACHER)
 * 3. GET /v1/reports/metrics/model/:model - Obter métricas por modelo (ADMIN/TEACHER)
 * 4. GET /v1/reports/metrics/quota - Obter quota atual do usuário (ADMIN/TEACHER)
 * 5. GET /v1/reports/metrics/quota/:userId - Obter quota de um usuário (ADMIN apenas)
 */

// Função auxiliar para delays entre testes (evitar rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Reports Metrics (e2e)', () => {
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
    adminEmail = `admin-reports-metrics-test-${timestamp}@example.com`;
    adminPassword = 'AdminPassword123!';
    await createTestUser(dataSource, hashService, {
      id: adminUserId,
      email: adminEmail,
      password: adminPassword,
      name: 'Admin Reports Metrics Test',
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
    teacherEmail = `teacher-reports-metrics-test-${timestamp}@example.com`;
    teacherPassword = 'TeacherPassword123!';
    await createTestUser(dataSource, hashService, {
      id: teacherUserId,
      email: teacherEmail,
      password: teacherPassword,
      name: 'Teacher Reports Metrics Test',
      role: UserRole.TEACHER,
      isActive: true,
    });
    
    await delay(1000);
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
    studentEmail = `student-reports-metrics-test-${timestamp}@example.com`;
    studentPassword = 'StudentPassword123!';
    await createTestUser(dataSource, hashService, {
      id: studentUserId,
      email: studentEmail,
      password: studentPassword,
      name: 'Student Reports Metrics Test',
      role: UserRole.STUDENT,
      isActive: true,
    });
    
    await delay(1000);
    const studentLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: studentEmail, password: studentPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    studentAccessToken = studentLoginResponse.body.accessToken;
  });

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('GET /v1/reports/metrics', () => {
    it('deve obter métricas de relatórios com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
      // A estrutura pode variar, mas deve ter algumas propriedades básicas
      // Como totalRequests, successRate, etc. (dependendo da implementação)
    });

    it('deve obter métricas de relatórios com sucesso (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve filtrar métricas por período (200) - ADMIN', async () => {
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = new Date().toISOString();

      const response = await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ fromDate, toDate })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar métricas por modelo (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ model: ReportModel.PATRIMONIO })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar métricas por usuário (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ userId: adminUserId })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve retornar 400 para data inválida (fromDate)', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ fromDate: 'invalid-date' })
        .expect(400);
    });

    it('deve retornar 400 para data inválida (toDate)', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ toDate: 'invalid-date' })
        .expect(400);
    });

    it('deve retornar 400 para modelo inválido', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ model: 'invalid-model' })
        .expect(400);
    });

    it('deve retornar 400 para UUID inválido (userId)', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ userId: 'invalid-uuid' })
        .expect(400);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/reports/metrics/summary', () => {
    it('deve obter métricas resumidas com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics/summary')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve obter métricas resumidas com sucesso (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics/summary')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics/summary')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/reports/metrics/model/:model', () => {
    it('deve obter métricas por modelo com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/metrics/model/${ReportModel.PATRIMONIO}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve obter métricas por modelo com sucesso (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/metrics/model/${ReportModel.MANUTENCAO}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar métricas por modelo e período (200) - ADMIN', async () => {
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = new Date().toISOString();

      const response = await request(httpServer)
        .get(`/v1/reports/metrics/model/${ReportModel.PATRIMONIO}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ fromDate, toDate })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve retornar 400 para modelo inválido', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics/model/invalid-model')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(400);
    });

    it('deve retornar 400 para data inválida (fromDate)', async () => {
      await request(httpServer)
        .get(`/v1/reports/metrics/model/${ReportModel.PATRIMONIO}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ fromDate: 'invalid-date' })
        .expect(400);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/reports/metrics/model/${ReportModel.PATRIMONIO}`)
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/reports/metrics/quota', () => {
    it('deve obter quota atual do usuário com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics/quota')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('used');
      expect(response.body).toHaveProperty('periodType');
    });

    it('deve obter quota atual do usuário com sucesso (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics/quota')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('used');
    });

    it('deve filtrar quota por período (daily) (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics/quota')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ periodType: 'daily' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'daily');
    });

    it('deve filtrar quota por período (weekly) (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics/quota')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ periodType: 'weekly' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'weekly');
    });

    it('deve filtrar quota por período (monthly) (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/metrics/quota')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ periodType: 'monthly' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'monthly');
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics/quota')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/reports/metrics/quota/:userId', () => {
    it('deve obter quota de usuário com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/metrics/quota/${teacherUserId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('userId', teacherUserId);
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('used');
    });

    it('deve filtrar quota por período (daily) (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/metrics/quota/${teacherUserId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ periodType: 'daily' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'daily');
    });

    it('deve retornar 404 para usuário não encontrado', async () => {
      const nonExistentId = randomUUID();
      await request(httpServer)
        .get(`/v1/reports/metrics/quota/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 400 para UUID inválido', async () => {
      await request(httpServer)
        .get('/v1/reports/metrics/quota/invalid-uuid')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(400);
    });

    it('deve retornar 403 para TEACHER (sem permissão - apenas ADMIN)', async () => {
      await request(httpServer)
        .get(`/v1/reports/metrics/quota/${studentUserId}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/reports/metrics/quota/${teacherUserId}`)
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

    // Verificar e criar tabela report_requests (para métricas)
    try {
      await queryRunner.query('SELECT 1 FROM report_requests LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE IF NOT EXISTS report_requests (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          type varchar(10) NOT NULL,
          model varchar(50) NOT NULL,
          filters_json jsonb,
          status varchar(20) NOT NULL DEFAULT 'pending',
          created_by_id uuid NOT NULL,
          error_message text,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS ix_report_requests_status_created_at ON report_requests(status, created_at);
        CREATE INDEX IF NOT EXISTS ix_report_requests_created_by_created_at ON report_requests(created_by_id, created_at);
      `);
    }

    // Verificar e criar tabela report_quotas (para quotas)
    try {
      await queryRunner.query('SELECT 1 FROM report_quotas LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report_quotas (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id uuid NOT NULL,
          "limit" int NOT NULL DEFAULT 100,
          used int NOT NULL DEFAULT 0,
          period_start date NOT NULL,
          period_end date NOT NULL,
          period_type varchar(20) NOT NULL DEFAULT 'monthly',
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, period_start, period_end)
        );
        CREATE INDEX IF NOT EXISTS idx_report_quotas_user ON report_quotas(user_id);
        CREATE INDEX IF NOT EXISTS idx_report_quotas_period ON report_quotas(period_start, period_end);
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
    // Limpar quotas de teste
    await dataSource.query(
      `DELETE FROM report_quotas 
       WHERE user_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%reports-metrics-test%@example.com'
       )`,
    );

    // Limpar report requests de teste
    await dataSource.query(
      `DELETE FROM report_requests 
       WHERE created_by_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%reports-metrics-test%@example.com'
       )`,
    );

    // Limpar refresh tokens de teste
    await dataSource.query(
      `DELETE FROM auth_refresh_tokens 
       WHERE user_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%@example.com' 
         AND (email LIKE '%reports-metrics-test%')
       )`,
    );

    // Limpar usuários de teste
    await dataSource.query(
      `DELETE FROM users 
       WHERE email LIKE '%@example.com' 
       AND (email LIKE '%reports-metrics-test%')`,
    );
  } catch (error) {
    // Ignorar erros de limpeza
    console.warn('Erro ao limpar dados de teste:', error);
  }
}

