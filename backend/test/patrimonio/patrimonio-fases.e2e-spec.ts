import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  PatrimonioStatus,
  PatrimonioCategoria,
} from '../../src/patrimonio/entities/patrimonio.entity';

describe('PatrimonioController - Fases 1, 2 e 3 (e2e)', () => {
  let app: INestApplication;
  let createdPatrimonioId: string;
  let createdPatrimonioCodigo: string;
  let adminToken: string;

  beforeAll(async () => {
    // Habilitar auto-auth para testes
    process.env.DEV_AUTO_AUTH = 'true';
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    delete process.env.DEV_AUTO_AUTH;
  });

  describe('FASE 1: Endpoints de Alta Prioridade', () => {
    // Setup: Criar patrimônio de teste
    beforeAll(async () => {
      const createDto = {
        codigo: 'PAT-E2E-001',
        nome: 'Notebook E2E Test',
        descricao: 'Equipamento para testes E2E',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
        status: PatrimonioStatus.ATIVO,
        marca: 'Dell',
        modelo: 'Inspiron 15',
        numeroSerie: 'E2E123456',
        valorAquisicao: 2500.0,
        dataAquisicao: '2024-01-15',
        localizacao: 'Sala 101',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/patrimonio')
        .send(createDto)
        .expect(201);

      createdPatrimonioId = response.body.id;
      createdPatrimonioCodigo = response.body.codigo;
    });

    describe('PATCH /v1/patrimonio/:id/status', () => {
      it('deve alterar status do patrimônio para MANUTENCAO', async () => {
        const dto = { status: PatrimonioStatus.MANUTENCAO };

        const response = await request(app.getHttpServer())
          .patch(`/v1/patrimonio/${createdPatrimonioId}/status`)
          .send(dto)
          .expect(200);

        expect(response.body.status).toBe(PatrimonioStatus.MANUTENCAO);
      });

      it('deve retornar 400 quando status é o mesmo', async () => {
        const dto = { status: PatrimonioStatus.MANUTENCAO };

        await request(app.getHttpServer())
          .patch(`/v1/patrimonio/${createdPatrimonioId}/status`)
          .send(dto)
          .expect(400);
      });

      it('deve retornar 404 quando patrimônio não existe', async () => {
        const dto = { status: PatrimonioStatus.ATIVO };

        await request(app.getHttpServer())
          .patch('/v1/patrimonio/00000000-0000-0000-0000-000000000000/status')
          .send(dto)
          .expect(404);
      });
    });

    describe('POST /v1/patrimonio/:id/transferir-responsavel', () => {
      it('deve transferir responsável do patrimônio', async () => {
        // Assumindo que existe um usuário com ID válido
        const novoResponsavelId = '00000000-0000-0000-0000-000000000001';
        const dto = {
          novoResponsavelId,
          observacoes: 'Transferência via teste E2E',
        };

        const response = await request(app.getHttpServer())
          .post(`/v1/patrimonio/${createdPatrimonioId}/transferir-responsavel`)
          .send(dto)
          .expect(200);

        expect(response.body).toHaveProperty('responsavelId', novoResponsavelId);
      });

      it('deve retornar 400 quando mesmo responsável', async () => {
        const response = await request(app.getHttpServer())
          .get(`/v1/patrimonio/${createdPatrimonioId}`)
          .expect(200);

        const responsavelAtual = response.body.responsavelId;
        if (responsavelAtual) {
          const dto = { novoResponsavelId: responsavelAtual };

          await request(app.getHttpServer())
            .post(`/v1/patrimonio/${createdPatrimonioId}/transferir-responsavel`)
            .send(dto)
            .expect(400);
        }
      });
    });

    describe('GET /v1/patrimonio/dashboard', () => {
      it('deve retornar métricas do dashboard', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/dashboard')
          .expect(200);

        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('porStatus');
        expect(response.body).toHaveProperty('porCategoria');
        expect(response.body).toHaveProperty('valorTotal');
        expect(response.body).toHaveProperty('ultimosPatrimonios');
        expect(Array.isArray(response.body.ultimosPatrimonios)).toBe(true);
      });
    });
  });

  describe('FASE 2: Gestão de Status', () => {
    let patrimonioParaAtivarId: string;

    beforeAll(async () => {
      // Criar patrimônio INATIVO para testes
      const createDto = {
        codigo: 'PAT-E2E-002',
        nome: 'Equipamento Inativo',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
        status: PatrimonioStatus.INATIVO,
        valorAquisicao: 1000.0,
      };

      const response = await request(app.getHttpServer())
        .post('/v1/patrimonio')
        .send(createDto)
        .expect(201);

      patrimonioParaAtivarId = response.body.id;
    });

    describe('PATCH /v1/patrimonio/:id/ativar', () => {
      it('deve ativar patrimônio inativo', async () => {
        const response = await request(app.getHttpServer())
          .patch(`/v1/patrimonio/${patrimonioParaAtivarId}/ativar`)
          .expect(200);

        expect(response.body.status).toBe(PatrimonioStatus.ATIVO);
      });

      it('deve retornar 400 quando já está ativo', async () => {
        await request(app.getHttpServer())
          .patch(`/v1/patrimonio/${patrimonioParaAtivarId}/ativar`)
          .expect(400);
      });
    });

    describe('PATCH /v1/patrimonio/:id/desativar', () => {
      it('deve desativar patrimônio ativo', async () => {
        const response = await request(app.getHttpServer())
          .patch(`/v1/patrimonio/${patrimonioParaAtivarId}/desativar`)
          .expect(200);

        expect(response.body.status).toBe(PatrimonioStatus.INATIVO);
      });

      it('deve retornar 400 quando já está inativo', async () => {
        await request(app.getHttpServer())
          .patch(`/v1/patrimonio/${patrimonioParaAtivarId}/desativar`)
          .expect(400);
      });
    });

    describe('POST /v1/patrimonio/:id/descarte', () => {
      it('deve marcar patrimônio para descarte', async () => {
        const dto = {
          dataDescarte: '2024-12-31',
          motivo: 'Equipamento obsoleto',
        };

        const response = await request(app.getHttpServer())
          .post(`/v1/patrimonio/${patrimonioParaAtivarId}/descarte`)
          .send(dto)
          .expect(200);

        expect(response.body.status).toBe(PatrimonioStatus.DESCARTADO);
      });
    });
  });

  describe('FASE 2: Gestão de Localização', () => {
    let patrimonioId: string;

    beforeAll(async () => {
      const createDto = {
        codigo: 'PAT-E2E-003',
        nome: 'Equipamento Localização',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
        localizacao: 'Sala Original',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/patrimonio')
        .send(createDto)
        .expect(201);

      patrimonioId = response.body.id;
    });

    describe('PATCH /v1/patrimonio/:id/localizacao', () => {
      it('deve atualizar localização do patrimônio', async () => {
        const dto = {
          localizacao: 'Sala 205 - Novo Setor',
          observacoes: 'Mudança de setor via E2E',
        };

        const response = await request(app.getHttpServer())
          .patch(`/v1/patrimonio/${patrimonioId}/localizacao`)
          .send(dto)
          .expect(200);

        expect(response.body.localizacao).toBe(dto.localizacao);
      });
    });

    describe('GET /v1/patrimonio/localizacao/:localizacao', () => {
      it('deve listar patrimônios por localização', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/localizacao/Sala%20205%20-%20Novo%20Setor')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        if (response.body.length > 0) {
          expect(response.body[0].localizacao).toContain('Sala 205');
        }
      });
    });

    describe('GET /v1/patrimonio/stats/localizacoes', () => {
      it('deve retornar estatísticas por localização', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/stats/localizacoes')
          .expect(200);

        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('localizacoes');
        expect(Array.isArray(response.body.localizacoes)).toBe(true);
      });
    });
  });

  describe('FASE 2: Estatísticas Avançadas', () => {
    describe('GET /v1/patrimonio/stats/faixa-valor', () => {
      it('deve retornar estatísticas por faixa de valor', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/stats/faixa-valor?intervalo=1000')
          .expect(200);

        expect(response.body).toHaveProperty('intervalo');
        expect(response.body).toHaveProperty('faixas');
        expect(Array.isArray(response.body.faixas)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/stats/aquisicao', () => {
      it('deve retornar estatísticas por período de aquisição', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/stats/aquisicao?periodo=mensal')
          .expect(200);

        expect(response.body).toHaveProperty('periodo');
        expect(response.body).toHaveProperty('dados');
        expect(Array.isArray(response.body.dados)).toBe(true);
      });

      it('deve aceitar período trimestral', async () => {
        await request(app.getHttpServer())
          .get('/v1/patrimonio/stats/aquisicao?periodo=trimestral')
          .expect(200);
      });

      it('deve aceitar período anual', async () => {
        await request(app.getHttpServer())
          .get('/v1/patrimonio/stats/aquisicao?periodo=anual')
          .expect(200);
      });
    });

    describe('GET /v1/patrimonio/stats/evolucao', () => {
      it('deve retornar gráfico de evolução temporal', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/stats/evolucao?periodo=mensal&ano=2024')
          .expect(200);

        expect(response.body).toHaveProperty('periodo');
        expect(response.body).toHaveProperty('ano');
        expect(response.body).toHaveProperty('dados');
        expect(Array.isArray(response.body.dados)).toBe(true);
      });
    });
  });

  describe('FASE 3: Buscas Avançadas', () => {
    let patrimonioComNumeroSerieId: string;

    beforeAll(async () => {
      const createDto = {
        codigo: 'PAT-E2E-SERIE',
        nome: 'Equipamento com Número de Série',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
        numeroSerie: 'E2E-SERIE-12345',
        valorAquisicao: 3500.0,
        dataAquisicao: '2024-06-15',
      };

      const response = await request(app.getHttpServer())
        .post('/v1/patrimonio')
        .send(createDto)
        .expect(201);

      patrimonioComNumeroSerieId = response.body.id;
    });

    describe('GET /v1/patrimonio/numero-serie/:numeroSerie', () => {
      it('deve buscar patrimônio por número de série', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/numero-serie/E2E-SERIE-12345')
          .expect(200);

        expect(response.body.numeroSerie).toBe('E2E-SERIE-12345');
      });

      it('deve retornar 404 quando não encontrado', async () => {
        await request(app.getHttpServer())
          .get('/v1/patrimonio/numero-serie/NAO-EXISTE')
          .expect(404);
      });
    });

    describe('GET /v1/patrimonio/aquisicao-periodo', () => {
      it('deve buscar patrimônios por período de aquisição', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/aquisicao-periodo?dataInicial=2024-01-01&dataFinal=2024-12-31')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/valor-range', () => {
      it('deve buscar patrimônios por intervalo de valor', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/valor-range?valorMinimo=1000&valorMaximo=5000')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/status-multiplos', () => {
      it('deve buscar patrimônios por múltiplos status', async () => {
        const statuses = [PatrimonioStatus.ATIVO, PatrimonioStatus.MANUTENCAO].join(',');
        const response = await request(app.getHttpServer())
          .get(`/v1/patrimonio/status-multiplos?status=${statuses}`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/categorias-multiplas', () => {
      it('deve buscar patrimônios por múltiplas categorias', async () => {
        // Precisa de IDs de categorias reais - simplificando
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/categorias-multiplas')
          .query({
            categoriaIds: ['00000000-0000-0000-0000-000000000001'],
          })
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });

  describe('FASE 3: Operações em Lote', () => {
    describe('POST /v1/patrimonio/bulk', () => {
      it('deve criar múltiplos patrimônios em lote', async () => {
        const dto = {
          patrimonios: [
            {
              codigo: 'PAT-BULK-001',
              nome: 'Item Bulk 1',
              categoria: PatrimonioCategoria.EQUIPAMENTO,
              valorAquisicao: 100.0,
            },
            {
              codigo: 'PAT-BULK-002',
              nome: 'Item Bulk 2',
              categoria: PatrimonioCategoria.EQUIPAMENTO,
              valorAquisicao: 200.0,
            },
          ],
        };

        const response = await request(app.getHttpServer())
          .post('/v1/patrimonio/bulk')
          .send(dto)
          .expect(201);

        expect(response.body).toHaveProperty('totalSucessos');
        expect(response.body).toHaveProperty('totalErros');
        expect(response.body).toHaveProperty('sucessos');
        expect(response.body).toHaveProperty('erros');
      });
    });

    describe('PATCH /v1/patrimonio/bulk', () => {
      it('deve atualizar múltiplos patrimônios', async () => {
        const dto = {
          ids: [createdPatrimonioId],
          dados: {
            observacoes: 'Atualização em lote via E2E',
          },
        };

        const response = await request(app.getHttpServer())
          .patch('/v1/patrimonio/bulk')
          .send(dto)
          .expect(200);

        expect(response.body).toHaveProperty('atualizados');
        expect(response.body.atualizados).toBeGreaterThanOrEqual(0);
      });
    });

    describe('POST /v1/patrimonio/bulk/transferir-responsavel', () => {
      it('deve transferir múltiplos patrimônios', async () => {
        const dto = {
          ids: [createdPatrimonioId],
          novoResponsavelId: '00000000-0000-0000-0000-000000000001',
        };

        const response = await request(app.getHttpServer())
          .post('/v1/patrimonio/bulk/transferir-responsavel')
          .send(dto)
          .expect(200);

        expect(response.body).toHaveProperty('transferidos');
        expect(response.body.transferidos).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('FASE 3: Validações', () => {
    describe('GET /v1/patrimonio/validar-codigo/:codigo', () => {
      it('deve validar código disponível', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/validar-codigo/PAT-NOVO-CODIGO')
          .expect(200);

        expect(response.body).toHaveProperty('disponivel');
        expect(response.body).toHaveProperty('codigo');
      });

      it('deve retornar não disponível para código existente', async () => {
        const response = await request(app.getHttpServer())
          .get(`/v1/patrimonio/validar-codigo/${createdPatrimonioCodigo}`)
          .expect(200);

        expect(response.body.disponivel).toBe(false);
      });
    });

    describe('POST /v1/patrimonio/verificar-duplicidade', () => {
      it('deve verificar duplicidade de patrimônios', async () => {
        const dto = {
          numeroSerie: 'E2E-SERIE-12345',
        };

        const response = await request(app.getHttpServer())
          .post('/v1/patrimonio/verificar-duplicidade')
          .send(dto)
          .expect(200);

        expect(response.body).toHaveProperty('temDuplicatas');
        expect(response.body).toHaveProperty('duplicatas');
      });
    });

    describe('GET /v1/patrimonio/:id/disponibilidade', () => {
      it('deve verificar disponibilidade do patrimônio', async () => {
        const response = await request(app.getHttpServer())
          .get(`/v1/patrimonio/${createdPatrimonioId}/disponibilidade`)
          .expect(200);

        expect(response.body).toHaveProperty('disponivel');
        expect(response.body).toHaveProperty('status');
      });
    });
  });

  describe('FASE 3: Alertas', () => {
    describe('GET /v1/patrimonio/garantia-expirada', () => {
      it('deve buscar patrimônios com garantia expirada', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/garantia-expirada?dias=0')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/alertas/garantia', () => {
      it('deve buscar patrimônios com garantia vencendo', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/alertas/garantia?dias=30')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/manutencao-prolongada', () => {
      it('deve buscar patrimônios em manutenção prolongada', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/manutencao-prolongada?dias=90')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/sem-responsavel', () => {
      it('deve buscar patrimônios sem responsável', async () => {
        const response = await request(app.getHttpServer())
          .get('/v1/patrimonio/sem-responsavel')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });

  describe('FASE 3: Histórico', () => {
    describe('GET /v1/patrimonio/:id/historico', () => {
      it('deve retornar histórico de alterações', async () => {
        const response = await request(app.getHttpServer())
          .get(`/v1/patrimonio/${createdPatrimonioId}/historico`)
          .expect(200);

        expect(response.body).toHaveProperty('patrimonioId');
        expect(response.body).toHaveProperty('alteracoes');
        expect(Array.isArray(response.body.alteracoes)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/:id/historico/responsaveis', () => {
      it('deve retornar histórico de responsáveis', async () => {
        const response = await request(app.getHttpServer())
          .get(`/v1/patrimonio/${createdPatrimonioId}/historico/responsaveis`)
          .expect(200);

        expect(response.body).toHaveProperty('patrimonioId');
        expect(response.body).toHaveProperty('historico');
        expect(Array.isArray(response.body.historico)).toBe(true);
      });
    });

    describe('GET /v1/patrimonio/responsavel/:id/historico', () => {
      it('deve retornar histórico por responsável', async () => {
        const responsavelId = '00000000-0000-0000-0000-000000000001';
        const response = await request(app.getHttpServer())
          .get(`/v1/patrimonio/responsavel/${responsavelId}/historico`)
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });
});
