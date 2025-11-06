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
 * Testes E2E para o módulo maintenance
 * 
 * ⚠️ PRÉ-REQUISITOS:
 * - Banco de dados PostgreSQL deve estar rodando
 * - Migrações devem estar executadas (npm run migration:run)
 * 
 * Os testes validam:
 * - ✅ Cenários de sucesso (criação, atualização, listagem)
 * - ✅ Erros 404 (OS não encontrada, patrimônio não encontrado)
 * - ✅ Erros 400 (dados inválidos, transições de status inválidas)
 * - ✅ Workflow de status (validação de transições)
 */
describe('Maintenance (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let testPatrimonioId: string;
  let testWorkOrderId: string;
  let testUserId: string;

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

    // Criar usuário de teste
    testUserId = '00000000-0000-0000-0000-000000000001';
    await createTestUser(dataSource, testUserId);

    // Criar patrimônio de teste
    testPatrimonioId = await createTestPatrimonio(dataSource);
    console.log('✅ Patrimônio de teste criado/encontrado:', testPatrimonioId);
    
    // Verificar se o patrimônio realmente existe
    const verifyPatrimonio = await dataSource.query(
      `SELECT id, codigo, nome FROM patrimonios WHERE id = $1`,
      [testPatrimonioId],
    );
    console.log('✅ Verificação do patrimônio:', verifyPatrimonio);
  });

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('POST /v1/maintenance/os', () => {
    it('deve criar uma OS com sucesso (201)', async () => {
      const dto = {
        patrimonioId: testPatrimonioId,
        titulo: 'Manutenção preventiva do ar condicionado',
        descricao: 'Limpeza e verificação do sistema de ar condicionado',
        prioridade: 'media',
      };

      const response = await request(httpServer)
        .post('/v1/maintenance/os')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.titulo).toBe(dto.titulo);
      expect(response.body.status).toBe('aberta');
      expect(response.body.prioridade).toBe(dto.prioridade);
      expect(response.body.patrimonioId).toBe(testPatrimonioId);
      expect(response.body.ownerId).toBe(testUserId);
      testWorkOrderId = response.body.id;
    });

    it('deve retornar 400 para dados faltando', async () => {
      const dto = {
        // patrimonioId faltando
        titulo: 'OS sem patrimônio',
      };

      await request(httpServer)
        .post('/v1/maintenance/os')
        .send(dto)
        .expect(400);
    });

    it('deve retornar 404 para patrimônio não encontrado', async () => {
      const dto = {
        patrimonioId: '00000000-0000-0000-0000-000000000999',
        titulo: 'OS teste',
      };

      await request(httpServer)
        .post('/v1/maintenance/os')
        .send(dto)
        .expect(404);
    });
  });

  describe('PATCH /v1/maintenance/os/:id/status', () => {
    it('deve atualizar status da OS com sucesso (200)', async () => {
      // Criar nova OS para este teste
      const createResponse = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS Teste Status ${Date.now()}`,
        })
        .expect(201);
      const workOrderId = createResponse.body.id;

      const dto = {
        status: 'em_andamento',
      };

      const response = await request(httpServer)
        .patch(`/v1/maintenance/os/${workOrderId}/status`)
        .send(dto)
        .expect(200);

      expect(response.body.status).toBe('em_andamento');
    });

    it('deve retornar 400 para transição de status inválida', async () => {
      // Criar nova OS para este teste
      const createResponse = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS Teste Transição Inválida ${Date.now()}`,
        })
        .expect(201);
      const workOrderId = createResponse.body.id;

      // Tentar transicionar de ABERTA diretamente para CONCLUIDA (inválido)
      const dto = {
        status: 'concluida',
      };

      // Tentar transição inválida (ABERTA -> CONCLUIDA não é permitida)
      await request(httpServer)
        .patch(`/v1/maintenance/os/${workOrderId}/status`)
        .send(dto)
        .expect(400);
    });

    it('deve retornar 404 para OS não encontrada', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000999';
      const dto = {
        status: 'em_andamento',
      };

      await request(httpServer)
        .patch(`/v1/maintenance/os/${fakeId}/status`)
        .send(dto)
        .expect(404);
    });

    it('deve validar workflow completo (aberta -> em_andamento -> concluida -> validada)', async () => {
      // Criar nova OS para este teste
      const createResponse = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: 'OS Teste Workflow',
        })
        .expect(201);
      const workOrderId = createResponse.body.id;

      // ABERTA -> EM_ANDAMENTO
      let response = await request(httpServer)
        .patch(`/v1/maintenance/os/${workOrderId}/status`)
        .send({ status: 'em_andamento' })
        .expect(200);
      expect(response.body.status).toBe('em_andamento');

      // EM_ANDAMENTO -> CONCLUIDA
      response = await request(httpServer)
        .patch(`/v1/maintenance/os/${workOrderId}/status`)
        .send({ status: 'concluida' })
        .expect(200);
      expect(response.body.status).toBe('concluida');
      expect(response.body.closedAt).toBeDefined();

      // CONCLUIDA -> VALIDADA
      response = await request(httpServer)
        .patch(`/v1/maintenance/os/${workOrderId}/status`)
        .send({ status: 'validada' })
        .expect(200);
      expect(response.body.status).toBe('validada');
    });
  });

  describe('GET /v1/maintenance/planos', () => {
    it('deve listar planos preventivos (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/maintenance/planos')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /v1/maintenance/os', () => {
    it('deve listar OS com paginação (200)', async () => {
      // Criar algumas OS para testar
      const os1 = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: 'OS Teste Listagem 1',
          prioridade: 'alta',
        })
        .expect(201);

      const os2 = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: 'OS Teste Listagem 2',
          prioridade: 'media',
        })
        .expect(201);

      // Listar todas as OS
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.meta).toHaveProperty('page', 1);
      expect(response.body.meta).toHaveProperty('limit', 10);
      expect(response.body.meta).toHaveProperty('total');
      expect(response.body.meta).toHaveProperty('totalPages');
      expect(response.body.meta).toHaveProperty('hasNextPage');
      expect(response.body.meta).toHaveProperty('hasPreviousPage');
    });

    it('deve filtrar OS por status (200)', async () => {
      // Criar OS em status específico
      const createResponse = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS Teste Status ${Date.now()}`,
        })
        .expect(201);
      const workOrderId = createResponse.body.id;

      // Mudar status para em_andamento
      await request(httpServer)
        .patch(`/v1/maintenance/os/${workOrderId}/status`)
        .send({ status: 'em_andamento' })
        .expect(200);

      // Filtrar por status em_andamento
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ status: 'em_andamento', page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach((os: any) => {
        expect(os.status).toBe('em_andamento');
      });
    });

    it('deve filtrar OS por prioridade (200)', async () => {
      // Criar OS com prioridade alta
      await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS Teste Prioridade ${Date.now()}`,
          prioridade: 'alta',
        })
        .expect(201);

      // Filtrar por prioridade alta
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ prioridade: 'alta', page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach((os: any) => {
        expect(os.prioridade).toBe('alta');
      });
    });

    it('deve filtrar OS por patrimônio (200)', async () => {
      // Filtrar por patrimônio específico
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ patrimonioId: testPatrimonioId, page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      response.body.data.forEach((os: any) => {
        expect(os.patrimonioId).toBe(testPatrimonioId);
      });
    });

    it('deve buscar OS por texto (título ou descrição) (200)', async () => {
      // Criar OS com título específico
      const searchTerm = `BuscaTeste${Date.now()}`;
      await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS ${searchTerm}`,
          descricao: 'Descrição de teste',
        })
        .expect(201);

      // Buscar por texto
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ q: searchTerm, page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      const found = response.body.data.some(
        (os: any) =>
          os.titulo.includes(searchTerm) ||
          (os.descricao && os.descricao.includes(searchTerm)),
      );
      expect(found).toBe(true);
    });

    it('deve ordenar OS por data de abertura (200)', async () => {
      // Criar algumas OS
      await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: 'OS Ordenação 1',
        })
        .expect(201);

      await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeno delay

      await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: 'OS Ordenação 2',
        })
        .expect(201);

      // Ordenar por data de abertura DESC (mais recente primeiro)
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ sortBy: 'openedAt', sortOrder: 'DESC', page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
      // Verificar se está ordenado (primeira deve ser mais recente)
      if (response.body.data.length > 1) {
        const first = new Date(response.body.data[0].openedAt).getTime();
        const second = new Date(response.body.data[1].openedAt).getTime();
        expect(first).toBeGreaterThanOrEqual(second);
      }
    });

    it('deve retornar página vazia quando não há resultados (200)', async () => {
      // Buscar por texto que não existe
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ q: 'TextoQueNaoExiste123456789', page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data).toEqual([]);
      expect(response.body.meta.total).toBe(0);
      expect(response.body.meta.totalPages).toBe(0);
      expect(response.body.meta.hasNextPage).toBe(false);
      expect(response.body.meta.hasPreviousPage).toBe(false);
    });

    it('deve validar paginação (200)', async () => {
      // Criar múltiplas OS
      for (let i = 0; i < 5; i++) {
        await request(httpServer)
          .post('/v1/maintenance/os')
          .send({
            patrimonioId: testPatrimonioId,
            titulo: `OS Paginação ${i}`,
          })
          .expect(201);
      }

      // Primeira página
      const page1 = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ page: 1, limit: 2 })
        .expect(200);

      expect(page1.body.meta.page).toBe(1);
      expect(page1.body.meta.limit).toBe(2);
      expect(page1.body.data.length).toBeLessThanOrEqual(2);

      // Segunda página
      const page2 = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({ page: 2, limit: 2 })
        .expect(200);

      expect(page2.body.meta.page).toBe(2);
      expect(page2.body.meta.limit).toBe(2);
    });

    it('deve filtrar OS por data de abertura (200)', async () => {
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Criar OS agora
      await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: 'OS Teste Data',
        })
        .expect(201);

      // Filtrar por data (hoje)
      const response = await request(httpServer)
        .get('/v1/maintenance/os')
        .query({
          openedAtStart: yesterday.toISOString(),
          openedAtEnd: tomorrow.toISOString(),
          page: 1,
          limit: 10,
        })
        .expect(200);

      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /v1/maintenance/apontamentos', () => {
    it('deve criar apontamento com sucesso (201)', async () => {
      // Criar nova OS para este teste
      const createResponse = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS Teste Apontamento ${Date.now()}`,
        })
        .expect(201);
      const workOrderId = createResponse.body.id;

      const dto = {
        workOrderId: workOrderId,
        tipo: 'trabalho',
        horas: 2.5,
        custo: 150.0,
        observacao: 'Limpeza completa do equipamento',
      };

      await request(httpServer)
        .post('/v1/maintenance/apontamentos')
        .send(dto)
        .expect(201);
    });

    it('deve retornar 400 para dados inválidos', async () => {
      // Criar nova OS para este teste
      const createResponse = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS Teste Dados Inválidos ${Date.now()}`,
        })
        .expect(201);
      const workOrderId = createResponse.body.id;

      const dto = {
        workOrderId: workOrderId,
        // horas faltando
        tipo: 'trabalho',
      };

      await request(httpServer)
        .post('/v1/maintenance/apontamentos')
        .send(dto)
        .expect(400);
    });

    it('deve retornar 400 para horas negativas', async () => {
      // Criar nova OS para este teste
      const createResponse = await request(httpServer)
        .post('/v1/maintenance/os')
        .send({
          patrimonioId: testPatrimonioId,
          titulo: `OS Teste Horas Negativas ${Date.now()}`,
        })
        .expect(201);
      const workOrderId = createResponse.body.id;

      const dto = {
        workOrderId: workOrderId,
        tipo: 'trabalho',
        horas: -1,
      };

      await request(httpServer)
        .post('/v1/maintenance/apontamentos')
        .send(dto)
        .expect(400);
    });

    it('deve retornar 404 para OS não encontrada', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000999';
      const dto = {
        workOrderId: fakeId,
        tipo: 'trabalho',
        horas: 2.0,
      };

      await request(httpServer)
        .post('/v1/maintenance/apontamentos')
        .send(dto)
        .expect(404);
    });
  });
});

// Funções auxiliares
async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela maintenance_plans
    try {
      await queryRunner.query('SELECT 1 FROM maintenance_plans LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS maintenance_plans (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          categoria_id uuid NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
          periodicidade varchar(20) NOT NULL,
          proxima_execucao timestamptz NOT NULL,
          owner_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS ix_maintenance_plans_categoria ON maintenance_plans(categoria_id);
        CREATE INDEX IF NOT EXISTS ix_maintenance_plans_owner ON maintenance_plans(owner_id);
      `);
    }

    // Verificar e criar tabela work_orders
    try {
      await queryRunner.query('SELECT 1 FROM work_orders LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS work_orders (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          patrimonio_id uuid NOT NULL REFERENCES patrimonios(id) ON DELETE RESTRICT,
          status varchar(20) NOT NULL DEFAULT 'aberta',
          titulo varchar(200) NOT NULL,
          descricao text,
          prioridade varchar(20) NOT NULL DEFAULT 'media',
          opened_at timestamptz NOT NULL,
          closed_at timestamptz,
          owner_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS ix_work_orders_status_opened_at ON work_orders(status, opened_at);
        CREATE INDEX IF NOT EXISTS ix_work_orders_patrimonio_status ON work_orders(patrimonio_id, status);
        CREATE INDEX IF NOT EXISTS ix_work_orders_owner_opened_at ON work_orders(owner_id, opened_at);
      `);
    }

    // Verificar e criar tabela work_logs
    try {
      await queryRunner.query('SELECT 1 FROM work_logs LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS work_logs (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          work_order_id uuid NOT NULL REFERENCES work_orders(id) ON DELETE CASCADE,
          tipo varchar(20) NOT NULL DEFAULT 'trabalho',
          horas decimal(5,2) NOT NULL,
          custo decimal(10,2) NOT NULL DEFAULT 0,
          observacao text,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS ix_work_logs_work_order ON work_logs(work_order_id);
      `);
    }

    // Verificar e criar tabela parts
    try {
      await queryRunner.query('SELECT 1 FROM parts LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS parts (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          work_order_id uuid NOT NULL REFERENCES work_orders(id) ON DELETE CASCADE,
          descricao varchar(200) NOT NULL,
          quantidade int NOT NULL DEFAULT 1,
          custo_unitario decimal(10,2) NOT NULL
        );
        CREATE INDEX IF NOT EXISTS ix_parts_work_order ON parts(work_order_id);
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
       VALUES ($1, 'Usuário Teste', 'teste@test.com', 'hash', 'ADMIN', true, NOW(), NOW())
       ON CONFLICT (id) DO NOTHING`,
      [userId],
    );
  } catch (error) {
    // Usuário pode já existir, ignorar
  }
}

async function createTestPatrimonio(dataSource: DataSource): Promise<string> {
  try {
    // Verificar se já existe um patrimônio de teste pelo código
    const result = await dataSource.query(
      `SELECT id FROM patrimonios WHERE codigo = 'TEST-MAINT-001' LIMIT 1`,
    );

    if (result && result.length > 0) {
      console.log('✅ Patrimônio encontrado pelo código:', result[0].id);
      return result[0].id;
    }

    // Criar novo patrimônio de teste com todos os campos obrigatórios
    const patrimonioId = '00000000-0000-0000-0000-000000000100';
    
    // Primeiro, tentar deletar se existir pelo ID (para evitar conflito)
    try {
      await dataSource.query(`DELETE FROM patrimonios WHERE id = $1`, [patrimonioId]);
    } catch (e) {
      // Ignorar erro se não existir
    }
    
    // Criar patrimônio com todos os campos necessários
    // A tabela tem 'categoria' (varchar) mas a entidade espera 'categoria_id' (uuid)
    // Vamos criar sem categoria_id para evitar conflito
    await dataSource.query(
      `INSERT INTO patrimonios (
        id, codigo, nome, categoria, status, created_at, updated_at, version
      )
       VALUES ($1, 'TEST-MAINT-001', 'Patrimônio Teste Manutenção', 'EQUIPAMENTO', 'ATIVO', NOW(), NOW(), 1)`,
      [patrimonioId],
    );

    console.log('✅ Patrimônio criado com sucesso:', patrimonioId);

    // Verificar se foi criado
    const verify = await dataSource.query(
      `SELECT id, codigo, nome FROM patrimonios WHERE id = $1 LIMIT 1`,
      [patrimonioId],
    );

    if (!verify || verify.length === 0) {
      throw new Error('Patrimônio não foi criado - verificação falhou');
    }

    console.log('✅ Verificação pós-criação:', verify[0]);
    return patrimonioId;
  } catch (error: any) {
    console.error('❌ Erro ao criar patrimônio de teste:', error.message);
    console.error('Stack:', error.stack);
    
    // Se der erro de constraint única (código duplicado), tentar buscar pelo código
    if (error.message.includes('unique') || error.message.includes('duplicate')) {
      try {
        const existing = await dataSource.query(
          `SELECT id FROM patrimonios WHERE codigo = 'TEST-MAINT-001' LIMIT 1`,
        );
        if (existing && existing.length > 0) {
          console.log('✅ Patrimônio encontrado após erro de constraint:', existing[0].id);
          return existing[0].id;
        }
      } catch (err: any) {
        console.error('Erro ao buscar patrimônio após constraint:', err.message);
      }
    }
    
    // Se der erro, tentar buscar qualquer patrimônio existente
    try {
      const anyPatrimonio = await dataSource.query(
        `SELECT id FROM patrimonios LIMIT 1`,
      );
      if (anyPatrimonio && anyPatrimonio.length > 0) {
        console.log('✅ Usando patrimônio existente:', anyPatrimonio[0].id);
        return anyPatrimonio[0].id;
      }
    } catch (err: any) {
      console.error('Erro ao buscar patrimônio existente:', err.message);
    }
    
    // Se tudo falhar, retornar um ID padrão (pode causar 404, mas pelo menos o teste roda)
    console.warn('⚠️ Retornando ID padrão - testes podem falhar');
    return '00000000-0000-0000-0000-000000000100';
  }
}

async function cleanupTestData(dataSource: DataSource): Promise<void> {
  try {
    // Limpar dados de teste (opcional, pode deixar para análise)
    // await dataSource.query(`DELETE FROM work_logs WHERE work_order_id IN (SELECT id FROM work_orders WHERE titulo LIKE 'OS Teste%')`);
    // await dataSource.query(`DELETE FROM work_orders WHERE titulo LIKE 'OS Teste%'`);
  } catch (error) {
    // Ignorar erros de limpeza
  }
}

