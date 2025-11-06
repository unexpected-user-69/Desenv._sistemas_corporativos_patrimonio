import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { Connector } from '../../src/integrations-erp/entities/connector.entity';
import { Execution } from '../../src/integrations-erp/entities/execution.entity';
import { ExecutionLog } from '../../src/integrations-erp/entities/execution-log.entity';
import { ExecutionType, ExecutionStatus } from '../../src/integrations-erp/entities/execution.entity';
import { IntegrationEntity } from '../../src/integrations-erp/dto/run-integration.dto';
import { LogLevel } from '../../src/integrations-erp/entities/execution-log.entity';

describe('Integrations ERP (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let testConnectorId: string;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    
    // Obter DataSource do NestJS
    dataSource = app.get(DataSource);

    // Criar conector de teste
    const connectorRepo = dataSource.getRepository(Connector);
    const testConnector = connectorRepo.create({
      key: 'test-connector',
      name: 'Test Connector',
      configJson: {
        baseUrl: 'https://api.example.com',
        authType: 'basic',
        authConfig: {
          username: 'test',
          password: 'test',
        },
      },
      enabled: true,
    });
    const savedConnector = await connectorRepo.save(testConnector);
    testConnectorId = savedConnector.id;

    // TODO: Obter token de autenticação se necessário
    // authToken = await getAuthToken();
  });

  afterAll(async () => {
    // Limpar dados de teste
    if (dataSource.isInitialized) {
      const executionRepo = dataSource.getRepository(Execution);
      const logRepo = dataSource.getRepository(ExecutionLog);
      const connectorRepo = dataSource.getRepository(Connector);

      // Deletar execuções e logs relacionados
      const executions = await executionRepo.find({
        where: { connectorId: testConnectorId },
      });
      for (const exec of executions) {
        await logRepo.delete({ executionId: exec.id });
      }
      await executionRepo.delete({ connectorId: testConnectorId });
      await connectorRepo.delete({ id: testConnectorId });
    }

    await app.close();
  });

  describe('POST /v1/integrations/run', () => {
    it('should create and queue an integration execution', async () => {
      const runDto = {
        connectorKey: 'test-connector',
        type: ExecutionType.IMPORT,
        entity: IntegrationEntity.ASSETS,
        options: {
          limit: 100,
          dryRun: true,
        },
      };

      const response = await request(httpServer)
        .post('/v1/integrations/run')
        .send(runDto)
        // .set('Authorization', `Bearer ${authToken}`) // TODO: Adicionar quando autenticação estiver configurada
        .expect(201);

      expect(response.body).toHaveProperty('executionId');
      expect(response.body).toHaveProperty('status', 'queued');
      expect(typeof response.body.executionId).toBe('string');
    });

    it('should return 404 for non-existent connector', async () => {
      const runDto = {
        connectorKey: 'non-existent',
        type: ExecutionType.IMPORT,
        entity: IntegrationEntity.ASSETS,
      };

      await request(httpServer)
        .post('/v1/integrations/run')
        .send(runDto)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return 400 for invalid data', async () => {
      const invalidDto = {
        connectorKey: '', // Inválido
        type: 'invalid-type', // Inválido
      };

      await request(httpServer)
        .post('/v1/integrations/run')
        .send(invalidDto)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(400);
    });

    it('should return 400 for disabled connector', async () => {
      // Criar conector desabilitado
      const connectorRepo = dataSource.getRepository(Connector);
      const disabledConnector = connectorRepo.create({
        key: 'disabled-connector',
        name: 'Disabled Connector',
        configJson: { baseUrl: 'https://api.example.com' },
        enabled: false,
      });
      await connectorRepo.save(disabledConnector);

      const runDto = {
        connectorKey: 'disabled-connector',
        type: ExecutionType.IMPORT,
        entity: IntegrationEntity.ASSETS,
      };

      await request(httpServer)
        .post('/v1/integrations/run')
        .send(runDto)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(400);

      // Limpar
      await connectorRepo.delete({ key: 'disabled-connector' });
    });

    it('should create export execution', async () => {
      const runDto = {
        connectorKey: 'test-connector',
        type: ExecutionType.EXPORT,
        entity: IntegrationEntity.ASSETS,
        options: {
          dryRun: true,
        },
      };

      const response = await request(httpServer)
        .post('/v1/integrations/run')
        .send(runDto)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(201);

      expect(response.body).toHaveProperty('executionId');
      expect(response.body).toHaveProperty('status', 'queued');
    });

    it('should create execution for different entities', async () => {
      const entities = [
        IntegrationEntity.COST_CENTERS,
        IntegrationEntity.LOCATIONS,
        IntegrationEntity.DEPRECIATIONS,
      ];

      for (const entity of entities) {
        const runDto = {
          connectorKey: 'test-connector',
          type: ExecutionType.IMPORT,
          entity,
          options: { dryRun: true },
        };

        const response = await request(httpServer)
          .post('/v1/integrations/run')
          .send(runDto)
          // .set('Authorization', `Bearer ${authToken}`)
          .expect(201);

        expect(response.body).toHaveProperty('executionId');
      }
    });
  });

  describe('GET /v1/integrations/executions', () => {
    it('should return paginated executions', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/executions')
        .query({ page: 1, limit: 20 })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('limit', 20);
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.items)).toBe(true);
    });

    it('should filter executions by connectorKey', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/executions')
        .query({ connectorKey: 'test-connector', page: 1, limit: 20 })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.items).toBeDefined();
      if (response.body.items.length > 0) {
        expect(response.body.items[0]).toHaveProperty('connectorKey', 'test-connector');
      }
    });

    it('should filter executions by status', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/executions')
        .query({ status: 'queued', page: 1, limit: 20 })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.items).toBeDefined();
      if (response.body.items.length > 0) {
        expect(response.body.items[0]).toHaveProperty('status', 'queued');
      }
    });

    it('should filter executions by type', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/executions')
        .query({ type: ExecutionType.IMPORT, page: 1, limit: 20 })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.items).toBeDefined();
      if (response.body.items.length > 0) {
        expect(response.body.items[0]).toHaveProperty('type', ExecutionType.IMPORT);
      }
    });

    it('should handle pagination correctly', async () => {
      const response1 = await request(httpServer)
        .get('/v1/integrations/executions')
        .query({ page: 1, limit: 5 })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response1.body.page).toBe(1);
      expect(response1.body.limit).toBe(5);
      expect(response1.body.items.length).toBeLessThanOrEqual(5);

      if (response1.body.total > 5) {
        const response2 = await request(httpServer)
          .get('/v1/integrations/executions')
          .query({ page: 2, limit: 5 })
          // .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        expect(response2.body.page).toBe(2);
        expect(response2.body.limit).toBe(5);
      }
    });

    it('should combine multiple filters', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/executions')
        .query({
          connectorKey: 'test-connector',
          status: 'queued',
          type: ExecutionType.IMPORT,
          page: 1,
          limit: 20,
        })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.items).toBeDefined();
      if (response.body.items.length > 0) {
        const item = response.body.items[0];
        expect(item).toHaveProperty('connectorKey', 'test-connector');
        expect(item).toHaveProperty('status', 'queued');
        expect(item).toHaveProperty('type', ExecutionType.IMPORT);
      }
    });
  });

  describe('GET /v1/integrations/executions/:id', () => {
    let createdExecutionId: string;

    beforeAll(async () => {
      // Criar uma execução de teste
      const executionRepo = dataSource.getRepository(Execution);
      const testExecution = executionRepo.create({
        connectorId: testConnectorId,
        type: ExecutionType.IMPORT,
        status: ExecutionStatus.QUEUED,
      });
      const saved = await executionRepo.save(testExecution);
      createdExecutionId = saved.id;
    });

    it('should return execution details with logs', async () => {
      const response = await request(httpServer)
        .get(`/v1/integrations/executions/${createdExecutionId}`)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdExecutionId);
      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('type', ExecutionType.IMPORT);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('logs');
      expect(Array.isArray(response.body.logs)).toBe(true);
    });

    it('should return 404 for non-existent execution', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      await request(httpServer)
        .get(`/v1/integrations/executions/${fakeId}`)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return 400 for invalid UUID', async () => {
      await request(httpServer)
        .get('/v1/integrations/executions/invalid-uuid')
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(400);
    });
  });

  describe('GET /v1/integrations/executions/:id/reconciliation', () => {
    let createdExecutionId: string;

    beforeAll(async () => {
      // Criar uma execução de teste com logs
      const executionRepo = dataSource.getRepository(Execution);
      const logRepo = dataSource.getRepository(ExecutionLog);
      
      const testExecution = executionRepo.create({
        connectorId: testConnectorId,
        type: ExecutionType.IMPORT,
        status: ExecutionStatus.SUCCESS,
        startedAt: new Date(),
        finishedAt: new Date(),
      });
      const saved = await executionRepo.save(testExecution);
      createdExecutionId = saved.id;

      // Adicionar logs simulando processamento
      const log = logRepo.create({
        executionId: saved.id,
        level: LogLevel.INFO,
        message: 'Import completed',
        metaJson: { created: 10, updated: 5, skipped: 2, failed: 1 },
      });
      await logRepo.save(log);
    });

    it('should return reconciliation summary', async () => {
      const response = await request(httpServer)
        .get(`/v1/integrations/executions/${createdExecutionId}/reconciliation`)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('inserted');
      expect(response.body).toHaveProperty('updated');
      expect(response.body).toHaveProperty('ignored');
      expect(response.body).toHaveProperty('errors');
    });

    it('should return 404 for non-existent execution reconciliation', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      await request(httpServer)
        .get(`/v1/integrations/executions/${fakeId}/reconciliation`)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should handle execution without logs', async () => {
      // Criar execução sem logs
      const executionRepo = dataSource.getRepository(Execution);
      const testExecution = executionRepo.create({
        connectorId: testConnectorId,
        type: ExecutionType.IMPORT,
        status: ExecutionStatus.QUEUED,
      });
      const saved = await executionRepo.save(testExecution);

      const response = await request(httpServer)
        .get(`/v1/integrations/executions/${saved.id}/reconciliation`)
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('inserted', 0);
      expect(response.body).toHaveProperty('updated', 0);
      expect(response.body).toHaveProperty('ignored', 0);
      expect(response.body).toHaveProperty('errors', 0);
    });
  });

  describe('GET /v1/integrations/metrics', () => {
    it('should return metrics for all connectors', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/metrics')
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('connectorKey');
        expect(response.body[0]).toHaveProperty('successRate');
        expect(response.body[0]).toHaveProperty('averageLatency');
      }
    });

    it('should return metrics for specific connector', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/metrics')
        .query({ connectorKey: 'test-connector' })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('successRate');
    });

    it('should return metrics with date filters', async () => {
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = new Date().toISOString();

      const response = await request(httpServer)
        .get('/v1/integrations/metrics')
        .query({
          connectorKey: 'test-connector',
          fromDate,
          toDate,
        })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('period');
      expect(new Date(response.body.period.from)).toBeInstanceOf(Date);
      expect(new Date(response.body.period.to)).toBeInstanceOf(Date);
    });

    it('should return 404 for non-existent connector metrics', async () => {
      await request(httpServer)
        .get('/v1/integrations/metrics')
        .query({ connectorKey: 'non-existent-connector' })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('GET /v1/integrations/health', () => {
    it('should return health check for all integrations', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/health')
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('integrations');
      expect(response.body).toHaveProperty('summary');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(response.body.status);
    });

    it('should return health check for specific connector', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/health')
        .query({ connectorKey: 'test-connector' })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('status');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(response.body.status);
    });

    it('should return 404 for non-existent connector health', async () => {
      await request(httpServer)
        .get('/v1/integrations/health')
        .query({ connectorKey: 'non-existent-connector' })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('should return health with all required fields', async () => {
      const response = await request(httpServer)
        .get('/v1/integrations/health')
        .query({ connectorKey: 'test-connector' })
        // .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('connectorKey');
      expect(response.body).toHaveProperty('connectorName');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('enabled');
      expect(response.body).toHaveProperty('successRate24h');
      expect(response.body).toHaveProperty('averageLatency24h');
      expect(response.body).toHaveProperty('sla');
      expect(response.body).toHaveProperty('messages');
      expect(Array.isArray(response.body.messages)).toBe(true);
    });
  });
});

