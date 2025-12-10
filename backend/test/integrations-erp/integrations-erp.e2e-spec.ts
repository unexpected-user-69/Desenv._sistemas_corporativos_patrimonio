process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { Connector } from '../../src/integrations-erp/entities/connector.entity';
import { Execution } from '../../src/integrations-erp/entities/execution.entity';
import { ExecutionLog } from '../../src/integrations-erp/entities/execution-log.entity';
import { ExecutionType, ExecutionStatus } from '../../src/integrations-erp/entities/execution.entity';
import { IntegrationEntity } from '../../src/integrations-erp/dto/run-integration.dto';
import { LogLevel } from '../../src/integrations-erp/entities/execution-log.entity';
import { setupTestUsers, authenticatedRequest, TestUserTokens } from '../helpers/auth-helper';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { HashService } from '../../src/common/services/hash.service';

/**
 * Testes E2E para o módulo integrations-erp
 * 
 * ⚠️ PRÉ-REQUISITOS:
 * - Banco de dados PostgreSQL deve estar rodando
 * - Migrações devem estar executadas (npm run migration:run)
 * 
 * Os testes validam:
 * - ✅ Cenários de sucesso (criação, listagem, detalhes) - retornando 200/201
 * - ✅ Usa auth-helper para autenticação consistente
 */
describe('Integrations ERP (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let tokens: TestUserTokens;
  let hashService: HashService;
  let testConnectorId: string;

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
    
    // Aguardar um pouco para garantir que a aplicação está totalmente inicializada
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Obter DataSource do NestJS
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

    // Executar migrações do integrations-erp se as tabelas não existirem
    try {
      await dataSource.query('SELECT 1 FROM connectors LIMIT 1');
    } catch (error) {
      // Tabelas não existem, executar migrações
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      
      try {
        // Criar tabela connectors
        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS connectors (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            key varchar(80) NOT NULL UNIQUE,
            name varchar(120) NOT NULL,
            config_json jsonb NOT NULL DEFAULT '{}',
            enabled boolean NOT NULL DEFAULT true,
            created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
          CREATE UNIQUE INDEX IF NOT EXISTS ux_connectors_key ON connectors(key);
        `);

        // Criar tabela executions
        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS executions (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            connector_id uuid NOT NULL REFERENCES connectors(id) ON DELETE RESTRICT,
            type varchar(16) NOT NULL CHECK (type IN ('import','export')),
            status varchar(16) NOT NULL CHECK (status IN ('queued','running','success','failed','canceled')),
            started_at timestamptz,
            finished_at timestamptz,
            error text,
            created_by varchar(120),
            created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS ix_executions_connector_status_started_at ON executions(connector_id, status, started_at DESC);
          CREATE INDEX IF NOT EXISTS ix_executions_created_by_started_at ON executions(created_by, started_at DESC);
        `);

        // Criar tabela execution_logs
        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS execution_logs (
            id bigserial PRIMARY KEY,
            execution_id uuid NOT NULL REFERENCES executions(id) ON DELETE CASCADE,
            level varchar(10) NOT NULL CHECK (level IN ('debug','info','warn','error')),
            message text NOT NULL,
            meta_json jsonb NOT NULL DEFAULT '{}',
            created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS ix_execution_logs_execution_created_at ON execution_logs(execution_id, created_at ASC);
        `);
      } finally {
        await queryRunner.release();
      }
    }

    // Criar conector de teste (verificar se já existe para evitar duplicação)
    const connectorRepo = dataSource.getRepository(Connector);
    
    let existingConnector = await connectorRepo.findOne({
      where: { key: 'test-connector' },
    });
    
    if (!existingConnector) {
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
      existingConnector = await connectorRepo.save(testConnector);
    }
    
    testConnectorId = existingConnector.id;

    // Configurar usuários de teste
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'integrations-erp');
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

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/integrations/run',
        tokens,
        UserRole.ADMIN, // POST /integrations/run requer ADMIN
      )
        .send(runDto)
        .expect(201);

      expect(response.body).toHaveProperty('executionId');
      expect(response.body).toHaveProperty('status', 'queued');
      expect(typeof response.body.executionId).toBe('string');
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

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/integrations/run',
        tokens,
        UserRole.ADMIN,
      )
        .send(runDto)
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

        const response = await authenticatedRequest(
          httpServer,
          'post',
          '/v1/integrations/run',
          tokens,
          UserRole.ADMIN,
        )
          .send(runDto)
          .expect(201);

        expect(response.body).toHaveProperty('executionId');
      }
    });
  });

  describe('GET /v1/integrations/executions', () => {
    it('should return paginated executions', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/executions',
        tokens,
        UserRole.ADMIN, // GET /integrations/executions requer ADMIN ou MANAGER
      )
        .query({ page: 1, limit: 20 })
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('limit', 20);
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.items)).toBe(true);
    });

    it('should filter executions by connectorKey', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/executions',
        tokens,
        UserRole.ADMIN,
      )
        .query({ connectorKey: 'test-connector', page: 1, limit: 20 })
        .expect(200);

      expect(response.body.items).toBeDefined();
      if (response.body.items.length > 0) {
        expect(response.body.items[0]).toHaveProperty('connectorKey', 'test-connector');
      }
    });

    it('should filter executions by status', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/executions',
        tokens,
        UserRole.ADMIN,
      )
        .query({ status: 'queued', page: 1, limit: 20 })
        .expect(200);

      expect(response.body.items).toBeDefined();
      if (response.body.items.length > 0) {
        expect(response.body.items[0]).toHaveProperty('status', 'queued');
      }
    });

    it('should filter executions by type', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/executions',
        tokens,
        UserRole.ADMIN,
      )
        .query({ type: ExecutionType.IMPORT, page: 1, limit: 20 })
        .expect(200);

      expect(response.body.items).toBeDefined();
      if (response.body.items.length > 0) {
        expect(response.body.items[0]).toHaveProperty('type', ExecutionType.IMPORT);
      }
    });

    it('should handle pagination correctly', async () => {
      const response1 = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/executions',
        tokens,
        UserRole.ADMIN,
      )
        .query({ page: 1, limit: 5 })
        .expect(200);

      expect(response1.body.page).toBe(1);
      expect(response1.body.limit).toBe(5);
      expect(response1.body.items.length).toBeLessThanOrEqual(5);

      if (response1.body.total > 5) {
        const response2 = await authenticatedRequest(
          httpServer,
          'get',
          '/v1/integrations/executions',
          tokens,
          UserRole.ADMIN,
        )
          .query({ page: 2, limit: 5 })
          .expect(200);

        expect(response2.body.page).toBe(2);
        expect(response2.body.limit).toBe(5);
      }
    });

    it('should combine multiple filters', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/executions',
        tokens,
        UserRole.ADMIN,
      )
        .query({
          connectorKey: 'test-connector',
          status: 'queued',
          type: ExecutionType.IMPORT,
          page: 1,
          limit: 20,
        })
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
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/integrations/executions/${createdExecutionId}`,
        tokens,
        UserRole.ADMIN, // GET /integrations/executions/:id requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('id', createdExecutionId);
      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('type', ExecutionType.IMPORT);
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('logs');
      expect(Array.isArray(response.body.logs)).toBe(true);
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
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/integrations/executions/${createdExecutionId}/reconciliation`,
        tokens,
        UserRole.ADMIN, // GET /integrations/executions/:id/reconciliation requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('inserted');
      expect(response.body).toHaveProperty('updated');
      expect(response.body).toHaveProperty('ignored');
      expect(response.body).toHaveProperty('errors');
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

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/integrations/executions/${saved.id}/reconciliation`,
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('inserted', 0);
      expect(response.body).toHaveProperty('updated', 0);
      expect(response.body).toHaveProperty('ignored', 0);
      expect(response.body).toHaveProperty('errors', 0);
    });
  });

  describe('GET /v1/integrations/metrics', () => {
    it('should return metrics for all connectors', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/metrics',
        tokens,
        UserRole.ADMIN, // GET /integrations/metrics requer ADMIN ou MANAGER
      ).expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('connectorKey');
        expect(response.body[0]).toHaveProperty('successRate');
        expect(response.body[0]).toHaveProperty('averageLatency');
      }
    });

    it('should return metrics for specific connector', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/metrics',
        tokens,
        UserRole.ADMIN,
      )
        .query({ connectorKey: 'test-connector' })
        .expect(200);

      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('successRate');
    });

    it('should return metrics with date filters', async () => {
      const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = new Date().toISOString();

      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/metrics',
        tokens,
        UserRole.ADMIN,
      )
        .query({
          connectorKey: 'test-connector',
          fromDate,
          toDate,
        })
        .expect(200);

      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('period');
      expect(new Date(response.body.period.from)).toBeInstanceOf(Date);
      expect(new Date(response.body.period.to)).toBeInstanceOf(Date);
    });
  });

  describe('GET /v1/integrations/health', () => {
    it('should return health check for all integrations', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/health',
        tokens,
        UserRole.ADMIN, // GET /integrations/health requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('integrations');
      expect(response.body).toHaveProperty('summary');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(response.body.status);
    });

    it('should return health check for specific connector', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/health',
        tokens,
        UserRole.ADMIN,
      )
        .query({ connectorKey: 'test-connector' })
        .expect(200);

      expect(response.body).toHaveProperty('connectorKey', 'test-connector');
      expect(response.body).toHaveProperty('status');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(response.body.status);
    });

    it('should return health with all required fields', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/integrations/health',
        tokens,
        UserRole.ADMIN,
      )
        .query({ connectorKey: 'test-connector' })
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

