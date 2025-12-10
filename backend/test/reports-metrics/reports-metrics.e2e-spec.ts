process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { HashService } from '../../src/common/services/hash.service';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { ReportModel } from '../../src/reports/entities/report-request.entity';
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';

/**
 * Testes E2E para Reports Metrics Controller
 * 
 * Cobre todos os 5 endpoints do Reports Metrics Controller:
 * 1. GET /v1/reports/metrics - Obter métricas de relatórios (ADMIN/MANAGER)
 * 2. GET /v1/reports/metrics/summary - Obter métricas resumidas (ADMIN/MANAGER)
 * 3. GET /v1/reports/metrics/model/:model - Obter métricas por modelo (ADMIN/MANAGER)
 * 4. GET /v1/reports/metrics/quota - Obter quota atual do usuário (ADMIN/MANAGER)
 * 5. GET /v1/reports/metrics/quota/:userId - Obter quota de um usuário (ADMIN apenas)
 */

describe('Reports Metrics (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

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

    // Aguardar um pouco para garantir que a aplicação está totalmente inicializada
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'reports-metrics-test');
  });

  afterAll(async () => {
    // Limpeza de dados de teste (opcional)
    try {
      await dataSource.query(
        `DELETE FROM report_quotas 
         WHERE user_id IN (
           SELECT id FROM users 
           WHERE email LIKE '%reports-metrics-test%@example.com'
         )`,
      );
      await dataSource.query(
        `DELETE FROM report_requests 
         WHERE created_by_id IN (
           SELECT id FROM users 
           WHERE email LIKE '%reports-metrics-test%@example.com'
         )`,
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('GET /v1/reports/metrics', () => {
    it('deve obter métricas de relatórios com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics',
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve obter métricas de relatórios com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics',
        tokens,
        UserRole.MANAGER,
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve filtrar métricas por período (200) - ADMIN', async () => {
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = new Date().toISOString();

      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics',
        tokens,
        UserRole.ADMIN,
      )
        .query({ fromDate, toDate })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar métricas por modelo (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics',
        tokens,
        UserRole.ADMIN,
      )
        .query({ model: ReportModel.PATRIMONIO })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar métricas por usuário (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics',
        tokens,
        UserRole.ADMIN,
      )
        .query({ userId: tokens.adminUserId })
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /v1/reports/metrics/summary', () => {
    it('deve obter métricas resumidas com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics/summary',
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve obter métricas resumidas com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics/summary',
        tokens,
        UserRole.MANAGER,
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });
  });

  describe('GET /v1/reports/metrics/model/:model', () => {
    it('deve obter métricas por modelo com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/metrics/model/${ReportModel.PATRIMONIO}`,
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });

    it('deve obter métricas por modelo com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/metrics/model/${ReportModel.MANUTENCAO}`,
        tokens,
        UserRole.MANAGER,
      ).expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar métricas por modelo e período (200) - ADMIN', async () => {
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = new Date().toISOString();

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/metrics/model/${ReportModel.PATRIMONIO}`,
        tokens,
        UserRole.ADMIN,
      )
        .query({ fromDate, toDate })
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /v1/reports/metrics/quota', () => {
    it('deve obter quota atual do usuário com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics/quota',
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('used');
      expect(response.body).toHaveProperty('periodType');
    });

    it('deve obter quota atual do usuário com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics/quota',
        tokens,
        UserRole.MANAGER,
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('used');
    });

    it('deve filtrar quota por período (daily) (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics/quota',
        tokens,
        UserRole.ADMIN,
      )
        .query({ periodType: 'daily' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'daily');
    });

    it('deve filtrar quota por período (weekly) (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics/quota',
        tokens,
        UserRole.ADMIN,
      )
        .query({ periodType: 'weekly' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'weekly');
    });

    it('deve filtrar quota por período (monthly) (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/metrics/quota',
        tokens,
        UserRole.ADMIN,
      )
        .query({ periodType: 'monthly' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'monthly');
    });
  });

  describe('GET /v1/reports/metrics/quota/:userId', () => {
    it('deve obter quota de usuário com sucesso (200) - ADMIN', async () => {
      // Primeiro, garantir que o usuário manager existe no banco
      // Verificar se o managerUserId existe
      const userExists = await dataSource.query(
        `SELECT id FROM users WHERE id = $1 LIMIT 1`,
        [tokens.managerUserId],
      );

      if (!userExists || userExists.length === 0) {
        console.warn('⚠️ Manager user não encontrado, pulando teste');
        return;
      }

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/metrics/quota/${tokens.managerUserId}`,
        tokens,
        UserRole.ADMIN, // Apenas ADMIN pode acessar quota de outros usuários
      ).expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('userId', tokens.managerUserId);
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('used');
    });

    it('deve filtrar quota por período (daily) (200) - ADMIN', async () => {
      // Primeiro, garantir que o usuário manager existe no banco
      const userExists = await dataSource.query(
        `SELECT id FROM users WHERE id = $1 LIMIT 1`,
        [tokens.managerUserId],
      );

      if (!userExists || userExists.length === 0) {
        console.warn('⚠️ Manager user não encontrado, pulando teste');
        return;
      }

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/metrics/quota/${tokens.managerUserId}`,
        tokens,
        UserRole.ADMIN,
      )
        .query({ periodType: 'daily' })
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('periodType', 'daily');
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
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
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
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
      
      // Adicionar foreign key se a tabela users existir
      try {
        await queryRunner.query(`
          ALTER TABLE report_quotas
          ADD CONSTRAINT IF NOT EXISTS fk_report_quotas_user_id
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        `);
      } catch (error: any) {
        // Se a constraint já existir ou users não existir, ignorar
        if (!error.message?.includes('already exists') && !error.message?.includes('does not exist')) {
          console.warn('Aviso: Não foi possível adicionar foreign key em report_quotas:', error.message);
        }
      }
    }
  } finally {
    await queryRunner.release();
  }
}

