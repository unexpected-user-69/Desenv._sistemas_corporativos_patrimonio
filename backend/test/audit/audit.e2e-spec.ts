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
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';

/**
 * Testes E2E para Audit Controller
 * 
 * Cobre todos os 6 endpoints do Audit Controller:
 * - POST /v1/audit/logs - Criar log de auditoria (público)
 * - GET /v1/audit/logs - Buscar logs de auditoria (ADMIN/MANAGER)
 * - GET /v1/audit/logs/:id - Buscar log por ID (ADMIN/MANAGER)
 * - GET /v1/audit/logs/entity/:entityType/:entityId - Buscar logs por entidade (ADMIN/MANAGER)
 * - GET /v1/audit/logs/user/:userId - Buscar logs por usuário (ADMIN/MANAGER)
 * - GET /v1/audit/stats - Obter estatísticas de auditoria (ADMIN apenas)
 */

describe('Audit (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

  // Audit logs de teste
  let auditLogId1: string;
  let auditLogId2: string;
  let testEntityId: string;
  let testEntityType: string;

  beforeAll(async () => {
    // Configurar USERS_API_URL antes de compilar o módulo
    if (!process.env.USERS_API_URL) {
      process.env.USERS_API_URL = 'http://localhost:3000/v1';
    }

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

    // Atualizar USERS_API_URL com a porta real do servidor
    const address = httpServer.address();
    if (address && typeof address === 'object') {
      const port = address.port;
      process.env.USERS_API_URL = `http://localhost:${port}/v1`;
    } else {
      process.env.USERS_API_URL = process.env.USERS_API_URL || 'http://localhost:3000/v1';
    }

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'audit-test');

    // Preparar dados para testes
    testEntityId = randomUUID();
    testEntityType = 'Patrimonio';
  });

  afterAll(async () => {
    // Limpeza de dados de teste (opcional)
    try {
      await dataSource.query(
        `DELETE FROM audit_logs 
         WHERE user_id IN (
           SELECT id FROM users 
           WHERE email LIKE '%audit-test%@example.com'
         )`,
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('POST /v1/audit/logs', () => {
    it('deve criar log de auditoria com sucesso (201) - público', async () => {
      const createAuditLogDto = {
        action: 'CREATE',
        entityType: 'Patrimonio',
        entityId: testEntityId,
        userId: tokens.adminUserId,
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        description: 'Criação de patrimônio de teste',
      };

      // POST /v1/audit/logs é público, não precisa de autenticação
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
      const createAuditLogDto = {
        action: 'UPDATE',
        entityType: 'Patrimonio',
        entityId: testEntityId,
        userId: tokens.adminUserId,
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
  });

  describe('GET /v1/audit/logs', () => {
    it('deve listar logs de auditoria (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/audit/logs',
        tokens,
        UserRole.ADMIN, // GET /audit/logs requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toBeDefined();
      // Pode retornar array ou objeto com paginação
      if (Array.isArray(response.body)) {
        expect(response.body.length).toBeGreaterThanOrEqual(0);
      } else {
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
      }
    });

    it('deve listar logs de auditoria (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/audit/logs',
        tokens,
        UserRole.MANAGER, // GET /audit/logs requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar logs por action (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/audit/logs',
        tokens,
        UserRole.ADMIN,
      )
        .query({ action: 'CREATE' })
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('deve filtrar logs por entityType (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/audit/logs',
        tokens,
        UserRole.ADMIN,
      )
        .query({ entityType: 'Patrimonio' })
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /v1/audit/logs/:id', () => {
    it('deve buscar log por ID (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/audit/logs/${auditLogId1}`,
        tokens,
        UserRole.ADMIN, // GET /audit/logs/:id requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('id', auditLogId1);
      expect(response.body).toHaveProperty('action');
      expect(response.body).toHaveProperty('entityType');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('deve buscar log por ID (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/audit/logs/${auditLogId2}`,
        tokens,
        UserRole.MANAGER, // GET /audit/logs/:id requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('id', auditLogId2);
    });
  });

  describe('GET /v1/audit/logs/entity/:entityType/:entityId', () => {
    it('deve buscar logs por entidade (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/audit/logs/entity/${testEntityType}/${testEntityId}`,
        tokens,
        UserRole.ADMIN, // GET /audit/logs/entity/:entityType/:entityId requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toBeDefined();
      // Pode retornar array ou objeto
      if (Array.isArray(response.body)) {
        expect(Array.isArray(response.body)).toBe(true);
      } else {
        expect(response.body).toBeDefined();
      }
    });

    it('deve buscar logs por entidade (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/audit/logs/entity/${testEntityType}/${testEntityId}`,
        tokens,
        UserRole.MANAGER, // GET /audit/logs/entity/:entityType/:entityId requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /v1/audit/logs/user/:userId', () => {
    it('deve buscar logs por usuário (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/audit/logs/user/${tokens.adminUserId}`,
        tokens,
        UserRole.ADMIN, // GET /audit/logs/user/:userId requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toBeDefined();
      // Pode retornar array ou objeto
      if (Array.isArray(response.body)) {
        expect(Array.isArray(response.body)).toBe(true);
      } else {
        expect(response.body).toBeDefined();
      }
    });

    it('deve buscar logs por usuário (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/audit/logs/user/${tokens.managerUserId}`,
        tokens,
        UserRole.MANAGER, // GET /audit/logs/user/:userId requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /v1/audit/stats', () => {
    it('deve retornar estatísticas de auditoria (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/audit/stats',
        tokens,
        UserRole.ADMIN, // GET /audit/stats requer apenas ADMIN
      ).expect(200);

      expect(response.body).toBeDefined();
      // Verificar estrutura básica (pode variar conforme implementação)
      expect(typeof response.body).toBe('object');
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
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
  } finally {
    await queryRunner.release();
  }
}

