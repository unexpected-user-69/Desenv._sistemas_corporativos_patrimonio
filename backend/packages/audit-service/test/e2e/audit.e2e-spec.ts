process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';
// Configurar JWT secret para testes
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { UserRole } from '../../src/shared/enums/user-role.enum';
import { randomUUID } from 'crypto';
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';

/**
 * Testes E2E para Audit Controller
 * 
 * Cobre todos os endpoints do Audit Controller:
 * - POST /audit/logs - Criar log de auditoria
 * - GET /audit/logs - Buscar logs de auditoria
 * - GET /audit/logs/:id - Buscar log por ID
 * - GET /health - Health check
 */

describe('Audit (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let tokens: TestUserTokens;

  // IDs de logs criados durante os testes
  let createdLogId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(dataSource, 'audit-test');
  });

  afterAll(async () => {
    // Limpeza de dados de teste
    try {
      if (createdLogId) {
        await dataSource.query(
          `DELETE FROM audit_logs WHERE id = $1`,
          [createdLogId],
        );
      }
      await dataSource.query(
        `DELETE FROM audit_logs 
         WHERE user_id IN ($1, $2, $3)`,
        [tokens.adminUserId, tokens.managerUserId, tokens.operatorUserId],
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('POST /audit/logs', () => {
    it('deve criar log de auditoria com sucesso (201) - público', async () => {
      const logData = {
        action: 'CREATE',
        entityType: 'TestEntity',
        userId: tokens.adminUserId,
        entityId: randomUUID(),
        description: 'Test audit log creation',
      };

      const response = await require('supertest')(httpServer)
        .post('/audit/logs')
        .send(logData)
        .expect(201);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('action', logData.action);
      expect(response.body.data).toHaveProperty('entityType', logData.entityType);
      expect(response.body.data).toHaveProperty('userId', logData.userId);

      createdLogId = response.body.data.id;
    });

    it('deve criar log de auditoria sem userId (201)', async () => {
      const logData = {
        action: 'UPDATE',
        entityType: 'TestEntity',
        entityId: randomUUID(),
        description: 'Test audit log without userId',
      };

      const response = await require('supertest')(httpServer)
        .post('/audit/logs')
        .send(logData)
        .expect(201);

      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('action', logData.action);
    });

    it('deve retornar 400 para dados inválidos (action faltando)', async () => {
      await require('supertest')(httpServer)
        .post('/audit/logs')
        .send({
          entityType: 'TestEntity',
        })
        .expect(400);
    });

    it('deve retornar 400 para dados inválidos (entityType faltando)', async () => {
      await require('supertest')(httpServer)
        .post('/audit/logs')
        .send({
          action: 'CREATE',
        })
        .expect(400);
    });

    it('deve retornar 400 para UUID inválido em userId', async () => {
      await require('supertest')(httpServer)
        .post('/audit/logs')
        .send({
          action: 'CREATE',
          entityType: 'TestEntity',
          userId: 'invalid-uuid',
        })
        .expect(400);
    });
  });

  describe('GET /audit/logs', () => {
    it('deve listar logs com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/audit/logs',
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('items');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('limit');
      expect(Array.isArray(response.body.data.items)).toBe(true);
    });

    it('deve listar logs com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/audit/logs',
        tokens,
        UserRole.MANAGER,
      )
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data.items)).toBe(true);
    });

    it('deve retornar 403 para OPERATOR', async () => {
      await authenticatedRequest(
        httpServer,
        'get',
        '/audit/logs',
        tokens,
        UserRole.OPERATOR,
      )
        .expect(403);
    });

    it('deve retornar 401 para requisição não autenticada', async () => {
      await require('supertest')(httpServer)
        .get('/audit/logs')
        .expect(401);
    });

    it('deve filtrar logs por userId', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/audit/logs?userId=${tokens.adminUserId}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      expect(response.body.data.items.every((log: any) => log.userId === tokens.adminUserId)).toBe(true);
    });

    it('deve filtrar logs por action', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/audit/logs?action=CREATE',
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      expect(response.body.data.items.every((log: any) => log.action === 'CREATE')).toBe(true);
    });
  });

  describe('GET /audit/logs/:id', () => {
    it('deve buscar log por ID com sucesso (200) - ADMIN', async () => {
      if (!createdLogId) {
        // Criar um log primeiro se não existir
        const createResponse = await require('supertest')(httpServer)
          .post('/audit/logs')
          .send({
            action: 'READ',
            entityType: 'TestEntity',
            userId: tokens.adminUserId,
          });
        createdLogId = createResponse.body.data.id;
      }

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/audit/logs/${createdLogId}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', createdLogId);
    });

    it('deve buscar log por ID com sucesso (200) - MANAGER', async () => {
      if (!createdLogId) {
        const createResponse = await require('supertest')(httpServer)
          .post('/audit/logs')
          .send({
            action: 'READ',
            entityType: 'TestEntity',
            userId: tokens.adminUserId,
          });
        createdLogId = createResponse.body.data.id;
      }

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/audit/logs/${createdLogId}`,
        tokens,
        UserRole.MANAGER,
      )
        .expect(200);

      expect(response.body.data).toHaveProperty('id', createdLogId);
    });

    it('deve retornar 403 para OPERATOR', async () => {
      if (!createdLogId) {
        const createResponse = await require('supertest')(httpServer)
          .post('/audit/logs')
          .send({
            action: 'READ',
            entityType: 'TestEntity',
            userId: tokens.adminUserId,
          });
        createdLogId = createResponse.body.data.id;
      }

      await authenticatedRequest(
        httpServer,
        'get',
        `/audit/logs/${createdLogId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .expect(403);
    });

    it('deve retornar 404 para log não encontrado', async () => {
      const nonExistentId = randomUUID();
      await authenticatedRequest(
        httpServer,
        'get',
        `/audit/logs/${nonExistentId}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(404);
    });

    it('deve retornar 400 para ID inválido', async () => {
      await authenticatedRequest(
        httpServer,
        'get',
        '/audit/logs/invalid-id',
        tokens,
        UserRole.ADMIN,
      )
        .expect(400);
    });
  });

  describe('GET /health', () => {
    it('deve retornar status de saúde (200)', async () => {
      const response = await require('supertest')(httpServer)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('service', 'audit-service');
      expect(response.body).toHaveProperty('version');
      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });
  });
});

