process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { setupTestUsers, authenticatedRequest, TestUserTokens } from '../helpers/auth-helper';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { HashService } from '../../src/common/services/hash.service';

/**
 * Testes E2E para o módulo inventory-mobile
 * 
 * ⚠️ PRÉ-REQUISITOS:
 * - Banco de dados PostgreSQL deve estar rodando
 * - Migrações devem estar executadas (npm run migration:run)
 * 
 * Os testes validam:
 * - ✅ Cenários de sucesso (criação, listagem, sincronização, conciliação) - retornando 200/201/202
 * - ✅ Usa auth-helper para autenticação consistente
 */
describe('Inventory Mobile (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let tokens: TestUserTokens;
  let hashService: HashService;

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

    // Configurar usuários de teste
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'inventory-mobile');
  });

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('POST /v1/inventory/campaigns', () => {
    it('deve criar uma campanha com sucesso (201)', async () => {
      const dto = {
        nome: `Inventário Q1 2025 ${Date.now()}`,
        local: 'Setor A - Sala 101',
        periodoInicio: '2025-01-20T00:00:00Z',
        periodoFim: '2025-01-25T23:59:59Z',
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN, // POST /inventory/campaigns requer ADMIN ou MANAGER
      )
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(dto.nome);
      expect(response.body.local).toBe(dto.local);
      expect(response.body.status).toBe('draft');
    });
  });

  describe('GET /v1/inventory/campaigns/:id/assignments', () => {
    it('deve listar assignments de uma campanha (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: `Campanha Teste ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/inventory/campaigns/${campaignId}/assignments`,
        tokens,
        UserRole.ADMIN, // GET /inventory/campaigns/:id/assignments requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.items)).toBe(true);
    });
  });

  describe('POST /v1/inventory/campaigns/:id/assignments', () => {
    it('deve distribuir assignments com sucesso (201)', async () => {
      // Verificar se o usuário operator existe antes de criar assignments
      const operatorUser = await dataSource.query(
        `SELECT id FROM users WHERE id = $1 AND deleted_at IS NULL`,
        [tokens.operatorUserId],
      );
      
      if (!operatorUser || operatorUser.length === 0) {
        throw new Error(`Operator user ${tokens.operatorUserId} não existe ou foi soft-deleted`);
      }

      // Criar nova campanha para este teste
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: `Campanha Teste Assignments ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      // Limpar assignments anteriores desta campanha (se houver)
      await dataSource.query(
        `DELETE FROM assignments WHERE campaign_id = $1`,
        [campaignId],
      );

      const dto = {
        coletorIds: [tokens.operatorUserId], // Usar operatorUserId do tokens
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        `/v1/inventory/campaigns/${campaignId}/assignments`,
        tokens,
        UserRole.ADMIN, // POST /inventory/campaigns/:id/assignments requer ADMIN ou MANAGER
      )
        .send(dto)
        .expect(201);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('campaignId', campaignId);
      expect(response.body[0]).toHaveProperty('coletorId', tokens.operatorUserId);
    });
  });

  describe('POST /v1/inventory/sync/pull', () => {
    it('deve retornar dados de sincronização (200)', async () => {
      const dto = {
        deviceId: `device-test-${Date.now()}`,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/sync/pull',
        tokens,
        UserRole.OPERATOR, // POST /inventory/sync/pull requer ADMIN, MANAGER ou OPERATOR
      )
        .send(dto)
        .expect(200);

      expect(response.body).toHaveProperty('campaigns');
      expect(response.body).toHaveProperty('assignments');
      expect(response.body).toHaveProperty('syncTimestamp');
      expect(response.body).toHaveProperty('version');
      expect(Array.isArray(response.body.campaigns)).toBe(true);
      expect(Array.isArray(response.body.assignments)).toBe(true);
    });

    it('deve suportar sincronização incremental com lastSyncAt', async () => {
      const dto = {
        deviceId: `device-test-${Date.now()}`,
        lastSyncAt: '2025-01-15T10:00:00Z',
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/sync/pull',
        tokens,
        UserRole.OPERATOR,
      )
        .send(dto)
        .expect(200);

      expect(response.body).toHaveProperty('campaigns');
      expect(response.body).toHaveProperty('assignments');
    });
  });

  describe('POST /v1/inventory/sync/push', () => {
    it('deve processar itens coletados com sucesso (200)', async () => {
      // Verificar se o usuário operator existe antes de criar assignments
      const operatorUser = await dataSource.query(
        `SELECT id FROM users WHERE id = $1 AND deleted_at IS NULL`,
        [tokens.operatorUserId],
      );
      
      if (!operatorUser || operatorUser.length === 0) {
        throw new Error(`Operator user ${tokens.operatorUserId} não existe ou foi soft-deleted`);
      }

      // Criar campanha e assignment para este teste
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: `Campanha Sync ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      // Limpar assignments anteriores desta campanha (se houver)
      await dataSource.query(
        `DELETE FROM assignments WHERE campaign_id = $1`,
        [campaignId],
      );

      const assignResponse = await authenticatedRequest(
        httpServer,
        'post',
        `/v1/inventory/campaigns/${campaignId}/assignments`,
        tokens,
        UserRole.ADMIN,
      )
        .send({ coletorIds: [tokens.operatorUserId] })
        .expect(201);
      const assignmentId = assignResponse.body[0].id;

      const dto = {
        deviceId: `device-test-${Date.now()}`,
        items: [
          {
            assignmentId: assignmentId,
            codigoLido: 'PAT-001',
            tipoLeitura: 'qrcode',
            coletadoEm: '2025-01-20T10:30:00Z',
            version: 1,
          },
        ],
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/sync/push',
        tokens,
        UserRole.OPERATOR, // POST /inventory/sync/push requer ADMIN, MANAGER ou OPERATOR
      )
        .send(dto)
        .expect(200);

      expect(response.body).toHaveProperty('processed');
      expect(response.body).toHaveProperty('conflictsCount');
      expect(response.body).toHaveProperty('errors');
      expect(response.body).toHaveProperty('conflicts');
      expect(response.body.processed).toBeGreaterThanOrEqual(0);
    });
  });

  describe('POST /v1/inventory/reconcile', () => {
    it('deve iniciar conciliação com sucesso (202)', async () => {
      // Verificar se o usuário operator existe antes de criar assignments
      const operatorUser = await dataSource.query(
        `SELECT id FROM users WHERE id = $1 AND deleted_at IS NULL`,
        [tokens.operatorUserId],
      );
      
      if (!operatorUser || operatorUser.length === 0) {
        throw new Error(`Operator user ${tokens.operatorUserId} não existe ou foi soft-deleted`);
      }

      // Criar nova campanha para este teste
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: `Campanha Reconciliação ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      // Limpar assignments anteriores desta campanha (se houver)
      await dataSource.query(
        `DELETE FROM assignments WHERE campaign_id = $1`,
        [campaignId],
      );

      // Criar pelo menos um assignment para a conciliação funcionar
      await authenticatedRequest(
        httpServer,
        'post',
        `/v1/inventory/campaigns/${campaignId}/assignments`,
        tokens,
        UserRole.ADMIN,
      )
        .send({ coletorIds: [tokens.operatorUserId] })
        .expect(201);

      const dto = {
        campaignId: campaignId,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/reconcile',
        tokens,
        UserRole.ADMIN, // POST /inventory/reconcile requer ADMIN ou MANAGER
      )
        .send(dto)
        .expect(202);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('campaignId', campaignId);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('processing');
    });
  });

  describe('GET /v1/inventory/campaigns/:id/report', () => {
    it('deve gerar relatório de campanha (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: `Campanha Relatório ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/inventory/campaigns/${campaignId}/report`,
        tokens,
        UserRole.ADMIN, // GET /inventory/campaigns/:id/report requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('campaignId', campaignId);
      expect(response.body).toHaveProperty('campaignName');
      expect(response.body).toHaveProperty('stats');
      expect(response.body.stats).toHaveProperty('totalAssignments');
      expect(response.body.stats).toHaveProperty('totalCollectedItems');
      expect(response.body.stats).toHaveProperty('totalDivergences');
    });
  });

  describe('GET /v1/inventory/campaigns/:id/export/csv', () => {
    it('deve exportar divergências para CSV (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: `Campanha CSV ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/inventory/campaigns/${campaignId}/export/csv`,
        tokens,
        UserRole.ADMIN, // GET /inventory/campaigns/:id/export/csv requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.headers['content-disposition']).toContain('.csv');
    });
  });

  describe('GET /v1/inventory/campaigns/:id/export/excel', () => {
    it('deve exportar relatório para Excel (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/inventory/campaigns',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: `Campanha Excel ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/inventory/campaigns/${campaignId}/export/excel`,
        tokens,
        UserRole.ADMIN, // GET /inventory/campaigns/:id/export/excel requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.headers['content-type']).toContain(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      expect(response.headers['content-disposition']).toContain('.xlsx');
    });
  });

  describe('GET /v1/inventory/dashboard', () => {
    it('deve retornar dashboard com estatísticas (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/inventory/dashboard',
        tokens,
        UserRole.ADMIN, // GET /inventory/dashboard requer ADMIN ou MANAGER
      ).expect(200);

      expect(response.body).toHaveProperty('totalCampaigns');
      expect(response.body).toHaveProperty('activeCampaigns');
      expect(response.body).toHaveProperty('completedCampaigns');
      expect(response.body).toHaveProperty('totalCollectedItems');
      expect(response.body).toHaveProperty('totalDivergences');
      expect(response.body).toHaveProperty('campaigns');
      expect(Array.isArray(response.body.campaigns)).toBe(true);
    });
  });
});

// Funções auxiliares
async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela campaigns
    try {
      await queryRunner.query('SELECT 1 FROM campaigns LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS campaigns (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          nome varchar(200) NOT NULL,
          local varchar(200) NOT NULL,
          periodo_inicio timestamptz NOT NULL,
          periodo_fim timestamptz NOT NULL,
          owner_id uuid NOT NULL,
          status varchar(20) NOT NULL DEFAULT 'draft',
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Verificar e criar tabela assignments
    try {
      await queryRunner.query('SELECT 1 FROM assignments LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS assignments (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
          coletor_id uuid NOT NULL,
          status varchar(20) NOT NULL DEFAULT 'pending',
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      // Criar foreign key para users se a tabela users existir
      try {
        await queryRunner.query(`
          ALTER TABLE assignments
          ADD CONSTRAINT fk_assignments_coletor
          FOREIGN KEY (coletor_id) REFERENCES users(id) ON DELETE RESTRICT;
        `);
      } catch (error) {
        // Se a constraint já existir ou a tabela users não existir, apenas logar
        console.warn('Foreign key fk_assignments_coletor não criada (pode já existir ou tabela users não existe)');
      }
      
      // Criar constraint de check para status
      try {
        await queryRunner.query(`
          ALTER TABLE assignments 
          ADD CONSTRAINT chk_assignments_status 
          CHECK (status IN ('pending', 'in_progress', 'completed', 'canceled'));
        `);
      } catch (error) {
        // Se a constraint já existir, apenas logar
        console.warn('Constraint chk_assignments_status não criada (pode já existir)');
      }
    }

    // Verificar e criar tabela collected_items
    try {
      await queryRunner.query('SELECT 1 FROM collected_items LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS collected_items (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          assignment_id uuid NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
          patrimonio_id uuid,
          codigo_lido varchar(100) NOT NULL,
          tipo_leitura varchar(10) NOT NULL,
          coletado_em timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          geo jsonb,
          offline_batch_id uuid,
          version int NOT NULL DEFAULT 1,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Verificar e criar tabela reconciliations
    try {
      await queryRunner.query('SELECT 1 FROM reconciliations LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS reconciliations (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
          status varchar(20) NOT NULL DEFAULT 'pending',
          divergencias_json jsonb NOT NULL DEFAULT '[]',
          executed_at timestamptz,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Verificar e criar tabela events (para notificações)
    try {
      await queryRunner.query('SELECT 1 FROM events LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS events (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          title varchar(255) NOT NULL,
          description text,
          slug varchar(255) UNIQUE,
          start_date timestamptz NOT NULL,
          end_date timestamptz,
          event_type varchar(50) NOT NULL DEFAULT 'OUTROS',
          visibility varchar(50) NOT NULL DEFAULT 'PUBLIC',
          state varchar(50) NOT NULL DEFAULT 'DRAFT',
          created_by uuid NOT NULL,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          deleted_at timestamptz,
          version int NOT NULL DEFAULT 1
        );
      `);
    }
  } finally {
    await queryRunner.release();
  }
}

async function cleanupTestData(dataSource: DataSource): Promise<void> {
  try {
    // Limpar dados de teste (opcional, pode deixar para análise)
    // await dataSource.query('DELETE FROM collected_items WHERE assignment_id IN (SELECT id FROM assignments WHERE campaign_id IN (SELECT id FROM campaigns WHERE nome LIKE \'%Teste%\'))');
    // await dataSource.query('DELETE FROM assignments WHERE campaign_id IN (SELECT id FROM campaigns WHERE nome LIKE \'%Teste%\')');
    // await dataSource.query('DELETE FROM campaigns WHERE nome LIKE \'%Teste%\'');
  } catch (error) {
    // Ignorar erros de limpeza
  }
}

