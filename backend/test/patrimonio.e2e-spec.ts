import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  Patrimonio,
  PatrimonioStatus,
  PatrimonioCategoria,
} from '../src/patrimonio/entities/patrimonio.entity';
import { User, UserRole } from '../src/users/entities/user.entity';

describe('PatrimonioController (e2e)', () => {
  let app: INestApplication;
  let createdPatrimonioId: string;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/patrimonios', () => {
    it('should create a new patrimonio', () => {
      const createPatrimonioDto = {
        codigo: 'PAT-2024-001',
        nome: 'Notebook Dell Inspiron 15',
        descricao: 'Notebook para uso administrativo com Windows 11',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
        status: PatrimonioStatus.ATIVO,
        marca: 'Dell',
        modelo: 'Inspiron 15 3000',
        numeroSerie: 'ABC123456789',
        valorAquisicao: 2500.0,
        dataAquisicao: '2024-01-15',
        dataGarantia: '2025-01-15',
        localizacao: 'Sala 101 - Setor Administrativo',
        observacoes: 'Equipamento em perfeito estado de conservação',
      };

      return request(app.getHttpServer())
        .post('/v1/patrimonios')
        .send(createPatrimonioDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toMatchObject({
            codigo: createPatrimonioDto.codigo,
            nome: createPatrimonioDto.nome,
            categoria: createPatrimonioDto.categoria,
            status: createPatrimonioDto.status,
            marca: createPatrimonioDto.marca,
            modelo: createPatrimonioDto.modelo,
            numeroSerie: createPatrimonioDto.numeroSerie,
            valorAquisicao: createPatrimonioDto.valorAquisicao,
            localizacao: createPatrimonioDto.localizacao,
            observacoes: createPatrimonioDto.observacoes,
          });
          expect(res.body.id).toBeDefined();
          expect(res.body.createdAt).toBeDefined();
          expect(res.body.updatedAt).toBeDefined();
          expect(res.body.version).toBeDefined();
          createdPatrimonioId = res.body.id;
        });
    });

    it('should return 409 when codigo already exists', () => {
      const createPatrimonioDto = {
        codigo: 'PAT-2024-001', // Same codigo as previous test
        nome: 'Another Notebook',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
      };

      return request(app.getHttpServer())
        .post('/v1/patrimonios')
        .send(createPatrimonioDto)
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('Código de patrimônio já existe');
        });
    });

    it('should return 400 when required fields are missing', () => {
      const invalidDto = {
        nome: 'Notebook without codigo',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
      };

      return request(app.getHttpServer())
        .post('/v1/patrimonios')
        .send(invalidDto)
        .expect(400);
    });
  });

  describe('GET /v1/patrimonios', () => {
    it('should return paginated patrimonios list', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios')
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            data: expect.any(Array),
            total: expect.any(Number),
            page: 1,
            limit: 10,
            totalPages: expect.any(Number),
            hasNextPage: expect.any(Boolean),
            hasPreviousPage: expect.any(Boolean),
          });
          expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    it('should filter patrimonios by categoria', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios')
        .query({ categoria: PatrimonioCategoria.EQUIPAMENTO })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
          if (res.body.data.length > 0) {
            expect(res.body.data[0].categoria).toBe(
              PatrimonioCategoria.EQUIPAMENTO,
            );
          }
        });
    });

    it('should filter patrimonios by status', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios')
        .query({ status: PatrimonioStatus.ATIVO })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
          if (res.body.data.length > 0) {
            expect(res.body.data[0].status).toBe(PatrimonioStatus.ATIVO);
          }
        });
    });

    it('should search patrimonios by text query', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios')
        .query({ q: 'notebook' })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
          if (res.body.data.length > 0) {
            const nome = res.body.data[0].nome.toLowerCase();
            expect(nome).toContain('notebook');
          }
        });
    });

    it('should filter patrimonios by valor range', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios')
        .query({ valorMin: 1000, valorMax: 3000 })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
          if (res.body.data.length > 0) {
            const valor = res.body.data[0].valorAquisicao;
            expect(valor).toBeGreaterThanOrEqual(1000);
            expect(valor).toBeLessThanOrEqual(3000);
          }
        });
    });

    it('should sort patrimonios by nome ASC', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios')
        .query({ sortBy: 'nome', sortOrder: 'ASC' })
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBeDefined();
          if (res.body.data.length > 1) {
            const nomes = res.body.data.map((p: any) => p.nome);
            const sortedNomes = [...nomes].sort();
            expect(nomes).toEqual(sortedNomes);
          }
        });
    });
  });

  describe('GET /v1/patrimonios/:id', () => {
    it('should return a patrimonio by id', () => {
      return request(app.getHttpServer())
        .get(`/v1/patrimonios/${createdPatrimonioId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: createdPatrimonioId,
            codigo: 'PAT-2024-001',
            nome: 'Notebook Dell Inspiron 15',
            categoria: PatrimonioCategoria.EQUIPAMENTO,
            status: PatrimonioStatus.ATIVO,
          });
        });
    });

    it('should return 404 when patrimonio not found', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios/00000000-0000-0000-0000-000000000000')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain('não encontrado');
        });
    });
  });

  describe('GET /v1/patrimonios/codigo/:codigo', () => {
    it('should return a patrimonio by codigo', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios/codigo/PAT-2024-001')
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            codigo: 'PAT-2024-001',
            nome: 'Notebook Dell Inspiron 15',
            categoria: PatrimonioCategoria.EQUIPAMENTO,
          });
        });
    });

    it('should return 404 when patrimonio not found by codigo', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios/codigo/NON-EXISTENT')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain('não encontrado');
        });
    });
  });

  describe('GET /v1/patrimonios/categoria/:categoria', () => {
    it('should return patrimonios by categoria', () => {
      return request(app.getHttpServer())
        .get(`/v1/patrimonios/categoria/${PatrimonioCategoria.EQUIPAMENTO}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          if (res.body.length > 0) {
            expect(res.body[0].categoria).toBe(PatrimonioCategoria.EQUIPAMENTO);
          }
        });
    });
  });

  describe('GET /v1/patrimonios/stats/categoria', () => {
    it('should return stats by categoria', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios/stats/categoria')
        .expect(200)
        .expect((res) => {
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty(PatrimonioCategoria.EQUIPAMENTO);
        });
    });
  });

  describe('GET /v1/patrimonios/stats/status', () => {
    it('should return stats by status', () => {
      return request(app.getHttpServer())
        .get('/v1/patrimonios/stats/status')
        .expect(200)
        .expect((res) => {
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty(PatrimonioStatus.ATIVO);
        });
    });
  });

  describe('PATCH /v1/patrimonios/:id', () => {
    it('should update a patrimonio', () => {
      const updateDto = {
        nome: 'Notebook Dell Inspiron 15 - Atualizado',
        valorAquisicao: 2800.0,
        observacoes: 'Atualizado via teste E2E',
      };

      return request(app.getHttpServer())
        .patch(`/v1/patrimonios/${createdPatrimonioId}`)
        .send(updateDto)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: createdPatrimonioId,
            nome: updateDto.nome,
            valorAquisicao: updateDto.valorAquisicao,
            observacoes: updateDto.observacoes,
          });
        });
    });

    it('should return 404 when updating non-existent patrimonio', () => {
      const updateDto = { nome: 'Updated Name' };

      return request(app.getHttpServer())
        .patch('/v1/patrimonios/00000000-0000-0000-0000-000000000000')
        .send(updateDto)
        .expect(404);
    });
  });

  describe('POST /v1/patrimonios/bulk', () => {
    it('should create multiple patrimonios', () => {
      const createDtos = [
        {
          codigo: 'PAT-2024-002',
          nome: 'Monitor Dell 24"',
          categoria: PatrimonioCategoria.EQUIPAMENTO,
          marca: 'Dell',
          valorAquisicao: 800.0,
          localizacao: 'Sala 101',
        },
        {
          codigo: 'PAT-2024-003',
          nome: 'Teclado Logitech',
          categoria: PatrimonioCategoria.EQUIPAMENTO,
          marca: 'Logitech',
          valorAquisicao: 150.0,
          localizacao: 'Sala 101',
        },
      ];

      return request(app.getHttpServer())
        .post('/v1/patrimonios/bulk')
        .send(createDtos)
        .expect(201)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).toHaveLength(2);
          expect(res.body[0]).toMatchObject({
            codigo: 'PAT-2024-002',
            nome: 'Monitor Dell 24"',
            categoria: PatrimonioCategoria.EQUIPAMENTO,
          });
          expect(res.body[1]).toMatchObject({
            codigo: 'PAT-2024-003',
            nome: 'Teclado Logitech',
            categoria: PatrimonioCategoria.EQUIPAMENTO,
          });
        });
    });

    it('should return 409 when empty array provided', () => {
      return request(app.getHttpServer())
        .post('/v1/patrimonios/bulk')
        .send([])
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('Nenhum patrimônio fornecido');
        });
    });

    it('should return 409 when duplicate codigos in request', () => {
      const duplicateDtos = [
        {
          codigo: 'PAT-2024-004',
          nome: 'First Item',
          categoria: PatrimonioCategoria.EQUIPAMENTO,
        },
        {
          codigo: 'PAT-2024-004', // Duplicate codigo
          nome: 'Second Item',
          categoria: PatrimonioCategoria.EQUIPAMENTO,
        },
      ];

      return request(app.getHttpServer())
        .post('/v1/patrimonios/bulk')
        .send(duplicateDtos)
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain(
            'Códigos duplicados na requisição',
          );
        });
    });

    it('should return 409 when too many patrimonios provided', () => {
      const tooManyDtos = Array(101).fill({
        codigo: 'PAT-2024-XXX',
        nome: 'Test Item',
        categoria: PatrimonioCategoria.EQUIPAMENTO,
      });

      return request(app.getHttpServer())
        .post('/v1/patrimonios/bulk')
        .send(tooManyDtos)
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('Máximo 100 patrimônios');
        });
    });
  });

  describe('DELETE /v1/patrimonios/:id', () => {
    it('should soft delete a patrimonio', () => {
      return request(app.getHttpServer())
        .delete(`/v1/patrimonios/${createdPatrimonioId}`)
        .expect(204);
    });

    it('should return 404 when deleting non-existent patrimonio', () => {
      return request(app.getHttpServer())
        .delete('/v1/patrimonios/00000000-0000-0000-0000-000000000000')
        .expect(404);
    });
  });
});
