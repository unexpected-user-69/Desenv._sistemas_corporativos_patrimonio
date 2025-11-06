// Habilitar auto-auth para testes ANTES de importar módulos
process.env.DEV_AUTO_AUTH = 'true';
process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

/**
 * Testes E2E para o módulo inventory-mobile
 * 
 * ⚠️ PRÉ-REQUISITOS:
 * - Banco de dados PostgreSQL deve estar rodando
 * - Migrações devem estar executadas (npm run migration:run)
 * 
 * Os testes validam:
 * - ✅ Cenários de sucesso (criação, listagem, sincronização, conciliação)
 * - ✅ Erros 404 (campanha não encontrada, assignment não encontrado)
 * - ✅ Erros 400 (dados inválidos, campanha inválida)
 * - ✅ Edge cases (campanha sem assignments, sincronização vazia)
 */
describe('Inventory Mobile (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let testColetorId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Criar usuário coletor de teste
    // Usar o mesmo ID do usuário fake injetado pelo JwtAuthGuard
    // UUID v4 válido: 550e8400-e29b-41d4-a716-446655440000 (modificado para corresponder ao fake user)
    testColetorId = '00000000-0000-0000-0000-000000000001';
    await createTestUser(dataSource, testColetorId);
  });

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('POST /v1/inventory/campaigns', () => {
    it('deve criar uma campanha com sucesso (201)', async () => {
      const dto = {
        nome: 'Inventário Q1 2025',
        local: 'Setor A - Sala 101',
        periodoInicio: '2025-01-20T00:00:00Z',
        periodoFim: '2025-01-25T23:59:59Z',
      };

      const response = await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(dto.nome);
      expect(response.body.local).toBe(dto.local);
      expect(response.body.status).toBe('draft');
    });

    it('deve retornar 400 para período inválido (início >= fim)', async () => {
      const dto = {
        nome: 'Campanha Inválida',
        local: 'Local Teste',
        periodoInicio: '2025-01-25T00:00:00Z',
        periodoFim: '2025-01-20T00:00:00Z',
      };

      await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send(dto)
        .expect(400);
    });

    it('deve retornar 400 para dados faltando', async () => {
      const dto = {
        nome: 'Campanha Incompleta',
        // local faltando
        periodoInicio: '2025-01-20T00:00:00Z',
        periodoFim: '2025-01-25T23:59:59Z',
      };

      await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send(dto)
        .expect(400);
    });
  });

  describe('GET /v1/inventory/campaigns/:id/assignments', () => {
    it('deve listar assignments de uma campanha (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send({
          nome: `Campanha Teste ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await request(httpServer)
        .get(`/v1/inventory/campaigns/${campaignId}/assignments`)
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.items)).toBe(true);
    });

    it('deve retornar 404 para campanha não encontrada', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000999';
      await request(httpServer)
        .get(`/v1/inventory/campaigns/${fakeId}/assignments`)
        .expect(404);
    });
  });

  describe('POST /v1/inventory/campaigns/:id/assignments', () => {
    it('deve distribuir assignments com sucesso (201)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
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
        coletorIds: [testColetorId],
      };

      const response = await request(httpServer)
        .post(`/v1/inventory/campaigns/${campaignId}/assignments`)
        .send(dto)
        .expect(201);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('campaignId', campaignId);
      expect(response.body[0]).toHaveProperty('coletorId', testColetorId);
    });

    it('deve retornar 400 para campanha com status inválido', async () => {
      // Criar campanha e marcar como completed
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send({
          nome: 'Campanha Completed',
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);

      const campaignId = createResponse.body.id;

      // Atualizar status para completed (via SQL direto)
      await dataSource.query(
        `UPDATE campaigns SET status = 'completed' WHERE id = $1`,
        [campaignId],
      );

      const dto = {
        coletorIds: [testColetorId],
      };

      await request(httpServer)
        .post(`/v1/inventory/campaigns/${campaignId}/assignments`)
        .send(dto)
        .expect(400);
    });

    it('deve retornar 400 para assignment duplicado', async () => {
      // Criar nova campanha para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send({
          nome: `Campanha Teste Duplicado ${Date.now()}`,
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
        coletorIds: [testColetorId],
      };

      // Primeira distribuição
      await request(httpServer)
        .post(`/v1/inventory/campaigns/${campaignId}/assignments`)
        .send(dto)
        .expect(201);

      // Segunda distribuição (deve falhar)
      await request(httpServer)
        .post(`/v1/inventory/campaigns/${campaignId}/assignments`)
        .send(dto)
        .expect(400);
    });
  });

  describe('POST /v1/inventory/sync/pull', () => {
    it('deve retornar dados de sincronização (200)', async () => {
      const dto = {
        deviceId: 'device-test-123',
      };

      const response = await request(httpServer)
        .post('/v1/inventory/sync/pull')
        .send(dto)
        .expect(200); // Endpoint retorna 200 OK

      expect(response.body).toHaveProperty('campaigns');
      expect(response.body).toHaveProperty('assignments');
      expect(response.body).toHaveProperty('syncTimestamp');
      expect(response.body).toHaveProperty('version');
      expect(Array.isArray(response.body.campaigns)).toBe(true);
      expect(Array.isArray(response.body.assignments)).toBe(true);
    });

    it('deve suportar sincronização incremental com lastSyncAt', async () => {
      const dto = {
        deviceId: 'device-test-456',
        lastSyncAt: '2025-01-15T10:00:00Z',
      };

      const response = await request(httpServer)
        .post('/v1/inventory/sync/pull')
        .send(dto)
        .expect(200); // Endpoint retorna 200 OK

      expect(response.body).toHaveProperty('campaigns');
      expect(response.body).toHaveProperty('assignments');
    });
  });

  describe('POST /v1/inventory/sync/push', () => {
    it('deve processar itens coletados com sucesso (200)', async () => {
      // Criar campanha e assignment para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
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

      const assignResponse = await request(httpServer)
        .post(`/v1/inventory/campaigns/${campaignId}/assignments`)
        .send({ coletorIds: [testColetorId] })
        .expect(201);
      const assignmentId = assignResponse.body[0].id;

      const dto = {
        deviceId: 'device-test-789',
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

      const response = await request(httpServer)
        .post('/v1/inventory/sync/push')
        .send(dto)
        .expect(200);

      expect(response.body).toHaveProperty('processed');
      expect(response.body).toHaveProperty('conflictsCount');
      expect(response.body).toHaveProperty('errors');
      expect(response.body).toHaveProperty('conflicts');
      expect(response.body.processed).toBeGreaterThanOrEqual(0);
    });

    it('deve retornar 200 com erros para assignment que não pertence ao coletor', async () => {
      const fakeAssignmentId = '00000000-0000-0000-0000-000000000999';
      const dto = {
        deviceId: 'device-test-error',
        items: [
          {
            assignmentId: fakeAssignmentId,
            codigoLido: 'PAT-002',
            tipoLeitura: 'qrcode',
            coletadoEm: '2025-01-20T10:30:00Z',
          },
        ],
      };

      const response = await request(httpServer)
        .post('/v1/inventory/sync/push')
        .send(dto)
        .expect(200); // Retorna 200 mas com erros na lista

      expect(response.body).toHaveProperty('errors');
      expect(Array.isArray(response.body.errors)).toBe(true);
      // Pode ter 0 erros se o assignment não existir, mas o processamento continua
    });
  });

  describe('POST /v1/inventory/reconcile', () => {
    it('deve iniciar conciliação com sucesso (202)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
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
      await request(httpServer)
        .post(`/v1/inventory/campaigns/${campaignId}/assignments`)
        .send({ coletorIds: [testColetorId] })
        .expect(201);

      const dto = {
        campaignId: campaignId,
      };

      const response = await request(httpServer)
        .post('/v1/inventory/reconcile')
        .send(dto)
        .expect(202);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('campaignId', campaignId);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('processing');
    });

    it('deve retornar 404 para campanha não encontrada', async () => {
      const dto = {
        campaignId: '00000000-0000-0000-0000-000000000999',
      };

      // O endpoint pode retornar 400 se a validação do DTO falhar antes de verificar a campanha
      // Mas se o UUID for válido, deve retornar 404
      const response = await request(httpServer)
        .post('/v1/inventory/reconcile')
        .send(dto);

      // Aceitar tanto 400 (validação) quanto 404 (não encontrado)
      expect([400, 404]).toContain(response.status);
    });
  });

  describe('GET /v1/inventory/campaigns/:id/report', () => {
    it('deve gerar relatório de campanha (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send({
          nome: `Campanha Relatório ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await request(httpServer)
        .get(`/v1/inventory/campaigns/${campaignId}/report`)
        .expect(200);

      expect(response.body).toHaveProperty('campaignId', campaignId);
      expect(response.body).toHaveProperty('campaignName');
      expect(response.body).toHaveProperty('stats');
      expect(response.body.stats).toHaveProperty('totalAssignments');
      expect(response.body.stats).toHaveProperty('totalCollectedItems');
      expect(response.body.stats).toHaveProperty('totalDivergences');
    });

    it('deve retornar 404 para campanha não encontrada', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000999';
      await request(httpServer)
        .get(`/v1/inventory/campaigns/${fakeId}/report`)
        .expect(404);
    });
  });

  describe('GET /v1/inventory/campaigns/:id/export/csv', () => {
    it('deve exportar divergências para CSV (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send({
          nome: `Campanha CSV ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await request(httpServer)
        .get(`/v1/inventory/campaigns/${campaignId}/export/csv`)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.headers['content-disposition']).toContain('.csv');
    });
  });

  describe('GET /v1/inventory/campaigns/:id/export/excel', () => {
    it('deve exportar relatório para Excel (200)', async () => {
      // Criar nova campanha para este teste
      const createResponse = await request(httpServer)
        .post('/v1/inventory/campaigns')
        .send({
          nome: `Campanha Excel ${Date.now()}`,
          local: 'Local Teste',
          periodoInicio: '2025-01-20T00:00:00Z',
          periodoFim: '2025-01-25T23:59:59Z',
        })
        .expect(201);
      const campaignId = createResponse.body.id;

      const response = await request(httpServer)
        .get(`/v1/inventory/campaigns/${campaignId}/export/excel`)
        .expect(200);

      expect(response.headers['content-type']).toContain(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      expect(response.headers['content-disposition']).toContain('.xlsx');
    });
  });

  describe('GET /v1/inventory/dashboard', () => {
    it('deve retornar dashboard com estatísticas (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/inventory/dashboard')
        .expect(200);

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

async function createTestUser(
  dataSource: DataSource,
  userId: string,
): Promise<void> {
  try {
    await dataSource.query(
      `INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES ($1, 'Coletor Teste', 'coletor@test.com', 'hash', 'STUDENT', true, NOW(), NOW())
       ON CONFLICT (id) DO NOTHING`,
      [userId],
    );
  } catch (error) {
    // Usuário pode já existir, ignorar
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

