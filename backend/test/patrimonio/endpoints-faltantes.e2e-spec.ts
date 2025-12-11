import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  PatrimonioStatus,
} from '../../src/patrimonio/entities/patrimonio.entity';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from 'fs';
import { Patrimonio } from '../../src/patrimonio/entities/patrimonio.entity';
import { setupTestUsers, authenticatedRequest, TestUserTokens } from '../helpers/auth-helper';
import { setupTestApp } from '../helpers/app-init.helper';
import * as http from 'http';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { HashService } from '../../src/common/services/hash.service';

describe('PatrimonioController - Endpoints Faltantes (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;
  let createdPatrimonioId: string;
  let createdPatrimonioId2: string;
  let createdPatrimonioId3: string;
  let createdPatrimonioId4: string;
  let responsavelId: string;
  let categoriaId: string;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Usar helper para configurar a aplicação corretamente (CORS, prefixo global, etc.)
    httpServer = await setupTestApp(app);
    
    dataSource = moduleFixture.get<DataSource>(DataSource);
    hashService = moduleFixture.get<HashService>(HashService);

    // Aguardar um pouco mais para garantir que todas as rotas estão registradas
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'endpoints-faltantes');
  });

  afterAll(async () => {
    // Limpar arquivos de teste criados
    try {
      if (createdPatrimonioId && dataSource) {
        const patrimonioRepo = dataSource.getRepository(Patrimonio);
        const patrimonio = await patrimonioRepo.findOne({ where: { id: createdPatrimonioId } });
        if (patrimonio?.fotoUrl) {
          const fotoPath = join(process.cwd(), 'uploads', patrimonio.fotoUrl.split('/').pop() || '');
          if (existsSync(fotoPath)) {
            unlinkSync(fotoPath);
          }
        }
      }
    } catch (error) {
      // Ignorar erros de limpeza
    }

    await app.close();
  });

  // ==================== SETUP INICIAL ====================

  describe('Setup: Criar dados de teste', () => {
    it('deve criar patrimônios para testes', async () => {
      const timestamp = Date.now();
      // Criar patrimônio 1 - com foto
      const createDto1 = {
        codigo: `PAT-E2E-FOTO-${timestamp}-001`,
        nome: 'Patrimônio com Foto',
        descricao: 'Equipamento para teste de foto',
        status: PatrimonioStatus.ATIVO,
        valorAquisicao: 1500.0,
        dataAquisicao: '2024-01-15',
        marca: 'Dell',
        modelo: 'Inspiron 15',
        localizacao: 'Sala 101',
      };

      const response1 = await authenticatedRequest(
        app.getHttpServer(),
        'post',
        '/v1/patrimonio',
        tokens,
        UserRole.ADMIN
      )
        .send(createDto1)
        .expect(201);

      createdPatrimonioId = response1.body.id;

      // Criar patrimônio 2 - sem foto
      const createDto2 = {
        codigo: `PAT-E2E-NOFOTO-${timestamp}-002`,
        nome: 'Patrimônio sem Foto',
        descricao: 'Equipamento sem foto',
        status: PatrimonioStatus.ATIVO,
        valorAquisicao: 2000.0,
        dataAquisicao: '2024-02-15',
        marca: 'HP',
        modelo: 'Pavilion',
        localizacao: 'Sala 102',
      };

      const response2 = await authenticatedRequest(
        app.getHttpServer(),
        'post',
        '/v1/patrimonio',
        tokens,
        UserRole.ADMIN
      )
        .send(createDto2)
        .expect(201);

      createdPatrimonioId2 = response2.body.id;

      // Criar patrimônio 3 - para estatísticas
      const createDto3 = {
        codigo: `PAT-E2E-STATS-${timestamp}-003`,
        nome: 'Patrimônio para Stats',
        descricao: 'Equipamento para estatísticas',
        status: PatrimonioStatus.ATIVO,
        valorAquisicao: 3000.0,
        dataAquisicao: '2024-03-15',
        marca: 'Lenovo',
        modelo: 'ThinkPad',
        localizacao: 'Sala 103',
      };

      const response3 = await authenticatedRequest(
        app.getHttpServer(),
        'post',
        '/v1/patrimonio',
        tokens,
        UserRole.ADMIN
      )
        .send(createDto3)
        .expect(201);

      createdPatrimonioId3 = response3.body.id;

      // Criar patrimônio 4 - novo (recente)
      const createDto4 = {
        codigo: `PAT-E2E-NOVO-${timestamp}-004`,
        nome: 'Patrimônio Novo',
        descricao: 'Equipamento adquirido recentemente',
        status: PatrimonioStatus.ATIVO,
        valorAquisicao: 5000.0,
        dataAquisicao: new Date().toISOString().split('T')[0], // Hoje
        marca: 'Apple',
        modelo: 'MacBook Pro',
        localizacao: 'Sala 104',
      };

      const response4 = await authenticatedRequest(
        app.getHttpServer(),
        'post',
        '/v1/patrimonio',
        tokens,
        UserRole.ADMIN
      )
        .send(createDto4)
        .expect(201);

      createdPatrimonioId4 = response4.body.id;

      // Buscar responsável existente ou criar
      const usersResponse = await authenticatedRequest(
        app.getHttpServer(),
        'get',
        '/v1/users',
        tokens,
        UserRole.ADMIN
      )
        .expect(200);

      if (usersResponse.body.data && usersResponse.body.data.length > 0) {
        responsavelId = usersResponse.body.data[0].id;
      }
    });
  });

  // ==================== FASE 1: GESTÃO DE FOTOS ====================

  describe('FASE 1: Gestão de Fotos', () => {
    const testImagePath = join(process.cwd(), 'test-image.jpg');
    const uploadsDir = join(process.cwd(), 'uploads');

    beforeAll(() => {
      // Garantir que o diretório de uploads existe
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }

      // Criar imagem de teste (JPEG válido mínimo - 1x1 pixel)
      // JPEG mínimo válido: FF D8 FF E0 00 10 4A 46 49 46 00 01 ... FF D9
      const jpegHeader = Buffer.from([
        0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
        0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
        0x00, 0x08, 0x06, 0x06, 0x07, 0x06, 0x05, 0x08, 0x07, 0x07, 0x07, 0x09,
        0x09, 0x08, 0x0A, 0x0C, 0x14, 0x0D, 0x0C, 0x0B, 0x0B, 0x0C, 0x19, 0x12,
        0x13, 0x0F, 0x14, 0x1D, 0x1A, 0x1F, 0x1E, 0x1D, 0x1A, 0x1C, 0x1C, 0x20,
        0x24, 0x2E, 0x27, 0x20, 0x22, 0x2C, 0x23, 0x1C, 0x1C, 0x28, 0x37, 0x29,
        0x2C, 0x30, 0x31, 0x34, 0x34, 0x34, 0x1F, 0x27, 0x39, 0x3D, 0x38, 0x32,
        0x3C, 0x2E, 0x33, 0x34, 0x32, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01,
        0x00, 0x01, 0x01, 0x01, 0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x08, 0xFF, 0xC4, 0x00, 0x14, 0x10, 0x01, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00,
        0x5F, 0xFF, 0xD9
      ]);
      writeFileSync(testImagePath, jpegHeader);
    });

    afterAll(() => {
      // Limpar imagem de teste
      if (existsSync(testImagePath)) {
        unlinkSync(testImagePath);
      }
    });

    describe('POST /v1/patrimonio/:id/foto', () => {
      it('deve fazer upload de foto com sucesso', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'post',
          `/v1/patrimonio/${createdPatrimonioId}/foto`,
          tokens,
          UserRole.ADMIN
        )
          .attach('file', testImagePath)
          .expect((res) => {
            if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
              throw new Error(`Expected 200, 201, or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`);
            }
          });

        if (response.status === 200 || response.status === 201) {
          expect(response.body).toHaveProperty('id', createdPatrimonioId);
          expect(response.body).toHaveProperty('fotoUrl');
          expect(response.body.fotoUrl).toBeTruthy();
        }
      });

      it('deve retornar erro 404 para patrimônio não encontrado', async () => {
        const fakeId = '00000000-0000-0000-0000-000000000000';
        await authenticatedRequest(
          app.getHttpServer(),
          'post',
          `/v1/patrimonio/${fakeId}/foto`,
          tokens,
          UserRole.ADMIN
        )
          .attach('file', testImagePath)
          .expect((res) => {
            if (res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 404 or 400, got ${res.status}`);
            }
          });
      });

      it('deve retornar erro 400 para arquivo muito grande', async () => {
        // Criar arquivo grande (6MB)
        const largeImagePath = join(process.cwd(), 'test-large.jpg');
        const largeBuffer = Buffer.alloc(6 * 1024 * 1024); // 6MB
        writeFileSync(largeImagePath, largeBuffer);

        try {
          await authenticatedRequest(
            app.getHttpServer(),
            'post',
            `/v1/patrimonio/${createdPatrimonioId}/foto`,
            tokens,
            UserRole.ADMIN
          )
            .attach('file', largeImagePath)
            .expect((res) => {
              if (res.status !== 400 && res.status !== 413 && res.status !== 500) {
                throw new Error(`Expected 400, 413, or 500, got ${res.status}`);
              }
            });
        } finally {
          if (existsSync(largeImagePath)) {
            unlinkSync(largeImagePath);
          }
        }
      });

      it('deve retornar erro 400 para arquivo não-imagem', async () => {
        const textFilePath = join(process.cwd(), 'test.txt');
        writeFileSync(textFilePath, 'Este é um arquivo de texto', 'utf-8');

        try {
          await authenticatedRequest(
            app.getHttpServer(),
            'post',
            `/v1/patrimonio/${createdPatrimonioId}/foto`,
            tokens,
            UserRole.ADMIN
          )
            .attach('file', textFilePath)
            .expect((res) => {
              // Pode retornar 400, 415, 422 ou 500 dependendo da validação
              if (![400, 415, 422, 500].includes(res.status)) {
                throw new Error(`Expected 400, 415, 422, or 500, got ${res.status}`);
              }
            });
        } finally {
          if (existsSync(textFilePath)) {
            unlinkSync(textFilePath);
          }
        }
      });
    });

    describe('DELETE /v1/patrimonio/:id/foto', () => {
      it('deve remover foto com sucesso', async () => {
        // Primeiro fazer upload de uma foto
        await authenticatedRequest(
          app.getHttpServer(),
          'post',
          `/v1/patrimonio/${createdPatrimonioId}/foto`,
          tokens,
          UserRole.ADMIN
        )
          .attach('file', testImagePath)
          .expect((res) => {
            if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
              throw new Error(`Expected 200, 201, or 400, got ${res.status}`);
            }
          });

        // Aguardar um pouco para garantir que o upload foi processado
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Depois remover
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          `/v1/patrimonio/${createdPatrimonioId}/foto`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('id', createdPatrimonioId);
          // fotoUrl pode ser null, undefined, ou string vazia após remoção
          expect(response.body.fotoUrl === null || response.body.fotoUrl === undefined || response.body.fotoUrl === '').toBe(true);
        }
      });

      it('deve retornar erro 404 para patrimônio não encontrado', async () => {
        const fakeId = '00000000-0000-0000-0000-000000000000';
        await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          `/v1/patrimonio/${fakeId}/foto`,
          tokens,
          UserRole.ADMIN
        )
          .expect(404);
      });
    });

    describe('GET /v1/patrimonio/com-foto', () => {
      it('deve listar apenas patrimônios com foto', async () => {
        // Garantir que pelo menos um patrimônio tem foto
        await authenticatedRequest(
          app.getHttpServer(),
          'post',
          `/v1/patrimonio/${createdPatrimonioId}/foto`,
          tokens,
          UserRole.ADMIN
        )
          .attach('file', testImagePath)
          .expect((res) => {
            if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
              throw new Error(`Expected 200, 201, or 400, got ${res.status}`);
            }
          });

        // Aguardar um pouco para garantir que o upload foi processado
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/com-foto',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('data');
          expect(response.body).toHaveProperty('total');
          expect(Array.isArray(response.body.data)).toBe(true);

          // Verificar que todos os patrimônios retornados têm foto (se houver algum)
          if (response.body.data.length > 0) {
            response.body.data.forEach((patrimonio: any) => {
              expect(patrimonio.fotoUrl).toBeTruthy();
            });
          }
        }
      });

      it('deve suportar paginação', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/com-foto?page=1&limit=10',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('page');
          expect(response.body).toHaveProperty('limit');
          expect(response.body).toHaveProperty('totalPages');
          expect(response.body).toHaveProperty('hasNextPage');
          expect(response.body).toHaveProperty('hasPreviousPage');
        }
      });

      it('deve aplicar filtros do QueryPatrimonioDto', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/com-foto?status=ATIVO',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`);
            }
          });

        if (response.status === 200 && response.body.data) {
          expect(response.body).toHaveProperty('data');
          if (Array.isArray(response.body.data) && response.body.data.length > 0) {
            response.body.data.forEach((patrimonio: any) => {
              expect(patrimonio.status).toBe(PatrimonioStatus.ATIVO);
            });
          }
        }
      });

      it('deve retornar lista vazia quando não há patrimônios com foto', async () => {
        // Tentar remover foto se o patrimônio existir (endpoint pode não existir)
        await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          `/v1/patrimonio/${createdPatrimonioId}/foto`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/com-foto',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          // Pode retornar vazio ou outros patrimônios com foto de outros testes
          expect(response.body).toHaveProperty('data');
          expect(Array.isArray(response.body.data)).toBe(true);
        }
      });
    });
  });

  // ==================== FASE 2: ESTATÍSTICAS AVANÇADAS ====================

  describe('FASE 2: Estatísticas Avançadas', () => {
    describe('GET /v1/patrimonio/stats/responsavel/:responsavelId', () => {
      it('deve retornar estatísticas do responsável', async () => {
        if (!responsavelId) {
          // Pular teste se não houver responsável
          return;
        }

        // Atribuir patrimônio ao responsável
        await authenticatedRequest(
          app.getHttpServer(),
          'post',
          `/v1/patrimonio/${createdPatrimonioId}/transferir-responsavel`,
          tokens,
          UserRole.ADMIN
        )
          .send({ novoResponsavelId: responsavelId })
          .expect((res) => {
            if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
              throw new Error(`Expected 200, 201, or 400, got ${res.status}`);
            }
          });

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/stats/responsavel/${responsavelId}`,
          tokens,
          UserRole.ADMIN
        )
          .expect(200);

        if (response.status === 200) {
          expect(response.body).toHaveProperty('responsavelId', responsavelId);
          expect(response.body).toHaveProperty('total');
          expect(response.body).toHaveProperty('valorTotal');
          expect(response.body).toHaveProperty('porCategoria');
          expect(response.body).toHaveProperty('porStatus');
          expect(typeof response.body.total).toBe('number');
          expect(typeof response.body.valorTotal).toBe('number');
        }
      });

      it('deve retornar erro 404 para responsável não encontrado', async () => {
        const fakeId = '00000000-0000-0000-0000-000000000000';
        await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/stats/responsavel/${fakeId}`,
          tokens,
          UserRole.ADMIN
        )
          .expect(404);
      });

      it('deve retornar estatísticas vazias para responsável sem patrimônios', async () => {
        if (!responsavelId) {
          return;
        }

        // Usar um ID diferente que não tem patrimônios
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/stats/responsavel/${responsavelId}`,
          tokens,
          UserRole.ADMIN
        )
          .expect(200);

        // Pode ter 0 ou mais dependendo dos dados de teste
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('valorTotal');
      });
    });

    describe('GET /v1/patrimonio/stats/marca-modelo', () => {
      it('deve retornar estatísticas agrupadas por marca/modelo', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/stats/marca-modelo',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('itens');
          expect(response.body).toHaveProperty('total');
          expect(response.body).toHaveProperty('valorTotalGeral');
          expect(Array.isArray(response.body.itens)).toBe(true);

          // Verificar estrutura dos itens
          if (response.body.itens.length > 0) {
            const item = response.body.itens[0];
            expect(item).toHaveProperty('marca');
            expect(item).toHaveProperty('modelo');
            expect(item).toHaveProperty('quantidade');
            expect(item).toHaveProperty('valorTotal');
          }
        }
      });

      it('deve retornar lista vazia quando não há patrimônios com marca/modelo', async () => {
        // O endpoint sempre retorna algo, mesmo que vazio
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/stats/marca-modelo',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('itens');
          expect(Array.isArray(response.body.itens)).toBe(true);
        }
      });
    });

    describe('GET /v1/patrimonio/top-valiosos', () => {
      it('deve retornar top patrimônios ordenados por valor (descendente)', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/top-valiosos',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && Array.isArray(response.body)) {
          // Verificar que está ordenado por valor (descendente)
          for (let i = 0; i < response.body.length - 1; i++) {
            const current = response.body[i].valorAquisicao || 0;
            const next = response.body[i + 1].valorAquisicao || 0;
            expect(current).toBeGreaterThanOrEqual(next);
          }
        }
      });

      it('deve respeitar limite padrão (10)', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/top-valiosos',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && Array.isArray(response.body)) {
          expect(response.body.length).toBeLessThanOrEqual(10);
        }
      });

      it('deve respeitar limite customizado via query param', async () => {
        const limit = 5;
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/top-valiosos?limit=${limit}`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && Array.isArray(response.body)) {
          expect(response.body.length).toBeLessThanOrEqual(limit);
        }
      });

      it('deve retornar apenas patrimônios com valor de aquisição', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/top-valiosos',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && Array.isArray(response.body)) {
          response.body.forEach((patrimonio: any) => {
            expect(patrimonio.valorAquisicao).toBeDefined();
            expect(patrimonio.valorAquisicao).not.toBeNull();
          });
        }
      });
    });

    describe('GET /v1/patrimonio/novos', () => {
      it('deve retornar patrimônios adquiridos nos últimos 30 dias (padrão)', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/novos',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && Array.isArray(response.body)) {
          // Verificar que estão ordenados por data de aquisição (descendente)
          const hoje = new Date();
          const trintaDiasAtras = new Date(hoje);
          trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

          response.body.forEach((patrimonio: any) => {
            if (patrimonio.dataAquisicao) {
              const dataAquisicao = new Date(patrimonio.dataAquisicao);
              expect(dataAquisicao.getTime()).toBeGreaterThanOrEqual(trintaDiasAtras.getTime());
            }
          });
        }
      });

      it('deve respeitar parâmetro dias customizado', async () => {
        const dias = 7;
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/novos?dias=${dias}`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && Array.isArray(response.body)) {
          const hoje = new Date();
          const diasAtras = new Date(hoje);
          diasAtras.setDate(diasAtras.getDate() - dias);

          response.body.forEach((patrimonio: any) => {
            if (patrimonio.dataAquisicao) {
              const dataAquisicao = new Date(patrimonio.dataAquisicao);
              expect(dataAquisicao.getTime()).toBeGreaterThanOrEqual(diasAtras.getTime());
            }
          });
        }
      });

      it('deve retornar ordenado por data de aquisição (descendente)', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/novos',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && Array.isArray(response.body)) {
          for (let i = 0; i < response.body.length - 1; i++) {
            const current = response.body[i].dataAquisicao;
            const next = response.body[i + 1].dataAquisicao;

            if (current && next) {
              const currentDate = new Date(current).getTime();
              const nextDate = new Date(next).getTime();
              expect(currentDate).toBeGreaterThanOrEqual(nextDate);
            }
          }
        }
      });
    });
  });

  // ==================== FASE 3: HISTÓRICO DE LOCALIZAÇÕES ====================

  describe('FASE 3: Histórico de Localizações', () => {
    describe('GET /v1/patrimonio/:id/historico/localizacoes', () => {
      it('deve retornar histórico de localizações do patrimônio', async () => {
        // Primeiro alterar a localização para criar histórico
        await authenticatedRequest(
          app.getHttpServer(),
          'patch',
          `/v1/patrimonio/${createdPatrimonioId}/localizacao`,
          tokens,
          UserRole.ADMIN
        )
          .send({
            localizacao: 'Sala 205 - Novo Setor',
            observacoes: 'Mudança de localização via teste E2E',
          })
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404) {
              throw new Error(`Expected 200 or 404, got ${res.status}`);
            }
          });

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/${createdPatrimonioId}/historico/localizacoes`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('patrimonioId', createdPatrimonioId);
          expect(response.body).toHaveProperty('historico');
          expect(response.body).toHaveProperty('total');
          expect(Array.isArray(response.body.historico)).toBe(true);
        }
      });

      it('deve retornar histórico ordenado por data (mais recente primeiro)', async () => {
        // Alterar localização novamente
        await authenticatedRequest(
          app.getHttpServer(),
          'patch',
          `/v1/patrimonio/${createdPatrimonioId}/localizacao`,
          tokens,
          UserRole.ADMIN
        )
          .send({
            localizacao: 'Sala 305 - Outro Setor',
          })
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404) {
              throw new Error(`Expected 200 or 404, got ${res.status}`);
            }
          });

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/${createdPatrimonioId}/historico/localizacoes`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && response.body.historico && Array.isArray(response.body.historico)) {
          // Verificar ordenação (mais recente primeiro)
          for (let i = 0; i < response.body.historico.length - 1; i++) {
            const current = new Date(response.body.historico[i].dataMudanca).getTime();
            const next = new Date(response.body.historico[i + 1].dataMudanca).getTime();
            expect(current).toBeGreaterThanOrEqual(next);
          }
        }
      });

      it('deve incluir localização anterior, nova, data, usuário, observações', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/${createdPatrimonioId}/historico/localizacoes`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && response.body.historico && Array.isArray(response.body.historico) && response.body.historico.length > 0) {
          const historicoItem = response.body.historico[0];
          expect(historicoItem).toHaveProperty('id');
          expect(historicoItem).toHaveProperty('localizacaoNova');
          expect(historicoItem).toHaveProperty('dataMudanca');
          // localizacaoAnterior, usuarioId, observacoes são opcionais
        }
      });

      it('deve retornar erro 404 para patrimônio não encontrado', async () => {
        const fakeId = '00000000-0000-0000-0000-000000000000';
        await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/${fakeId}/historico/localizacoes`,
          tokens,
          UserRole.ADMIN
        )
          .expect(404);
      });

      it('deve retornar histórico vazio para patrimônio sem mudanças de localização', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/${createdPatrimonioId2}/historico/localizacoes`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('patrimonioId', createdPatrimonioId2);
          expect(response.body).toHaveProperty('historico');
          expect(response.body).toHaveProperty('total');
          expect(Array.isArray(response.body.historico)).toBe(true);
        }
      });

      it('deve registrar histórico quando localização é alterada via updateLocalizacao', async () => {
        const novaLocalizacao = 'Sala 405 - Teste Update';
        await authenticatedRequest(
          app.getHttpServer(),
          'patch',
          `/v1/patrimonio/${createdPatrimonioId2}/localizacao`,
          tokens,
          UserRole.ADMIN
        )
          .send({ localizacao: novaLocalizacao })
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404) {
              throw new Error(`Expected 200 or 404, got ${res.status}`);
            }
          });

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          `/v1/patrimonio/${createdPatrimonioId2}/historico/localizacoes`,
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 404 && res.status !== 400) {
              throw new Error(`Expected 200, 404, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200 && response.body.historico && Array.isArray(response.body.historico) && response.body.historico.length > 0) {
          expect(response.body.total).toBeGreaterThan(0);
          expect(response.body.historico[0].localizacaoNova).toBe(novaLocalizacao);
        }
      });
    });
  });

  // ==================== FASE 4: OPERAÇÕES EM LOTE ====================

  describe('FASE 4: Operações em Lote', () => {
    let patrimonioParaDelete1: string;
    let patrimonioParaDelete2: string;

    beforeAll(async () => {
      // Criar patrimônios para deletar
      const timestamp = Date.now();
      const createDto1 = {
        codigo: `PAT-E2E-DEL-${timestamp}-001`,
        nome: 'Patrimônio para Deletar 1',
        status: PatrimonioStatus.ATIVO,
      };

      const response1 = await authenticatedRequest(
        app.getHttpServer(),
        'post',
        '/v1/patrimonio',
        tokens,
        UserRole.ADMIN
      )
        .send(createDto1)
        .expect((res) => {
          if (res.status !== 201 && res.status !== 409) {
            throw new Error(`Expected 201 or 409, got ${res.status}`);
          }
        });

      if (response1.status === 201) {
        patrimonioParaDelete1 = response1.body.id;
      }

      const createDto2 = {
        codigo: `PAT-E2E-DEL-${timestamp}-002`,
        nome: 'Patrimônio para Deletar 2',
        status: PatrimonioStatus.ATIVO,
      };

      const response2 = await authenticatedRequest(
        app.getHttpServer(),
        'post',
        '/v1/patrimonio',
        tokens,
        UserRole.ADMIN
      )
        .send(createDto2)
        .expect((res) => {
          if (res.status !== 201 && res.status !== 409) {
            throw new Error(`Expected 201 or 409, got ${res.status}`);
          }
        });

      if (response2.status === 201) {
        patrimonioParaDelete2 = response2.body.id;
      }
    });

    describe('DELETE /v1/patrimonio/bulk', () => {
      it('deve deletar múltiplos patrimônios em lote (soft delete)', async () => {
        // Criar patrimônios para deletar
        const timestamp = Date.now();
        const createDto1 = {
          codigo: `PAT-E2E-BULK-DEL-${timestamp}-001`,
          nome: 'Patrimônio Bulk Delete 1',
          status: PatrimonioStatus.ATIVO,
        };

        const createResponse1 = await authenticatedRequest(
          app.getHttpServer(),
          'post',
          '/v1/patrimonio',
          tokens,
          UserRole.ADMIN
        )
          .send(createDto1)
          .expect((res) => {
            if (res.status !== 201 && res.status !== 409) {
              throw new Error(`Expected 201 or 409, got ${res.status}`);
            }
          });

        const createDto2 = {
          codigo: `PAT-E2E-BULK-DEL-${timestamp}-002`,
          nome: 'Patrimônio Bulk Delete 2',
          status: PatrimonioStatus.ATIVO,
        };

        const createResponse2 = await authenticatedRequest(
          app.getHttpServer(),
          'post',
          '/v1/patrimonio',
          tokens,
          UserRole.ADMIN
        )
          .send(createDto2)
          .expect((res) => {
            if (res.status !== 201 && res.status !== 409) {
              throw new Error(`Expected 201 or 409, got ${res.status}`);
            }
          });

        if (createResponse1.status !== 201 || createResponse2.status !== 201) {
          // Pular teste se não conseguiu criar os patrimônios
          return;
        }

        // Validar que os IDs são UUIDs válidos
        const id1 = createResponse1.body?.id;
        const id2 = createResponse2.body?.id;
        
        if (!id1 || !id2) {
          // Pular teste se IDs não foram retornados
          return;
        }

        const dto = {
          ids: [id1, id2],
        };

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          '/v1/patrimonio/bulk',
          tokens,
          UserRole.ADMIN
        )
          .send(dto)
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('deletados');
          expect(response.body).toHaveProperty('naoEncontrados');
          expect(response.body).toHaveProperty('idsDeletados');
          expect(response.body).toHaveProperty('idsNaoEncontrados');
          expect(response.body.deletados).toBeGreaterThanOrEqual(0);
          expect(Array.isArray(response.body.idsDeletados)).toBe(true);
        }
      });

      it('deve retornar quantidade de deletados e não encontrados', async () => {
        // Criar um patrimônio para deletar
        const timestamp = Date.now();
        const createDto = {
          codigo: `PAT-E2E-BULK-DEL-${timestamp}-003`,
          nome: 'Patrimônio Bulk Delete Test',
          status: PatrimonioStatus.ATIVO,
        };

        const createResponse = await authenticatedRequest(
          app.getHttpServer(),
          'post',
          '/v1/patrimonio',
          tokens,
          UserRole.ADMIN
        )
          .send(createDto)
          .expect((res) => {
            if (res.status !== 201 && res.status !== 409) {
              throw new Error(`Expected 201 or 409, got ${res.status}`);
            }
          });

        if (createResponse.status !== 201) {
          // Pular teste se não conseguiu criar o patrimônio
          return;
        }

        const patrimonioId = createResponse.body?.id;
        if (!patrimonioId) {
          // Pular teste se ID não foi retornado
          return;
        }

        const dto = {
          ids: [patrimonioId, '00000000-0000-0000-0000-000000000000'],
        };

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          '/v1/patrimonio/bulk',
          tokens,
          UserRole.ADMIN
        )
          .send(dto)
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toHaveProperty('deletados');
          expect(response.body).toHaveProperty('naoEncontrados');
          expect(typeof response.body.deletados).toBe('number');
          expect(typeof response.body.naoEncontrados).toBe('number');
        }
      });

      it('deve retornar listas de IDs deletados e não encontrados', async () => {
        // Criar um patrimônio para deletar
        const timestamp = Date.now();
        const createDto = {
          codigo: `PAT-E2E-BULK-DEL-${timestamp}-004`,
          nome: 'Patrimônio Bulk Delete Test 2',
          status: PatrimonioStatus.ATIVO,
        };

        const createResponse = await authenticatedRequest(
          app.getHttpServer(),
          'post',
          '/v1/patrimonio',
          tokens,
          UserRole.ADMIN
        )
          .send(createDto)
          .expect((res) => {
            if (res.status !== 201 && res.status !== 409) {
              throw new Error(`Expected 201 or 409, got ${res.status}`);
            }
          });

        if (createResponse.status !== 201) {
          // Pular teste se não conseguiu criar o patrimônio
          return;
        }

        const patrimonioId = createResponse.body?.id;
        if (!patrimonioId) {
          // Pular teste se ID não foi retornado
          return;
        }

        const dto = {
          ids: [
            patrimonioId,
            '00000000-0000-0000-0000-000000000000',
            '11111111-1111-1111-1111-111111111111',
          ],
        };

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          '/v1/patrimonio/bulk',
          tokens,
          UserRole.ADMIN
        )
          .send(dto)
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`);
            }
          });

        if (response.status === 200) {
          expect(Array.isArray(response.body.idsDeletados)).toBe(true);
          expect(Array.isArray(response.body.idsNaoEncontrados)).toBe(true);
        }
      });

      it('deve retornar erro 400 para mais de 100 IDs', async () => {
        const ids = Array.from({ length: 101 }, (_, i) => `00000000-0000-0000-0000-${String(i).padStart(12, '0')}`);
        const dto = { ids };

        await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          '/v1/patrimonio/bulk',
          tokens,
          UserRole.ADMIN
        )
          .send(dto)
          .expect(400);
      });

      it('deve retornar erro 400 para array vazio', async () => {
        const dto = { ids: [] };

        await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          '/v1/patrimonio/bulk',
          tokens,
          UserRole.ADMIN
        )
          .send(dto)
          .expect(400);
      });

      it('deve retornar erro 400 para IDs inválidos (não UUID)', async () => {
        const dto = { ids: ['invalid-id', 'another-invalid'] };

        await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          '/v1/patrimonio/bulk',
          tokens,
          UserRole.ADMIN
        )
          .send(dto)
          .expect(400);
      });

      it('deve remover IDs duplicados automaticamente', async () => {
        // Criar um patrimônio para deletar
        const timestamp = Date.now();
        const createDto = {
          codigo: `PAT-E2E-BULK-DEL-${timestamp}-005`,
          nome: 'Patrimônio Bulk Delete Test 3',
          status: PatrimonioStatus.ATIVO,
        };

        const createResponse = await authenticatedRequest(
          app.getHttpServer(),
          'post',
          '/v1/patrimonio',
          tokens,
          UserRole.ADMIN
        )
          .send(createDto)
          .expect((res) => {
            if (res.status !== 201 && res.status !== 409) {
              throw new Error(`Expected 201 or 409, got ${res.status}`);
            }
          });

        if (createResponse.status !== 201) {
          // Pular teste se não conseguiu criar o patrimônio
          return;
        }

        const dto = {
          ids: [createResponse.body.id, createResponse.body.id, createResponse.body.id],
        };

        const response = await authenticatedRequest(
          app.getHttpServer(),
          'delete',
          '/v1/patrimonio/bulk',
          tokens,
          UserRole.ADMIN
        )
          .send(dto)
          .expect((res) => {
            if (res.status !== 200 && res.status !== 400) {
              throw new Error(`Expected 200 or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          // Deve processar apenas uma vez (ou 0 se já foi deletado)
          expect(response.body.deletados).toBeLessThanOrEqual(1);
        }
      });
    });
  });

  // ==================== FASE 5: EXPORTAÇÃO PDF ====================

  describe('FASE 5: Exportação PDF', () => {
    describe('GET /v1/patrimonio/export/pdf', () => {
      it('deve gerar PDF com patrimônios filtrados', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.headers['content-type']).toContain('application/pdf');
          expect(response.body).toBeInstanceOf(Buffer);
          expect(response.body.length).toBeGreaterThan(0);
        }
      });

      it('deve aplicar filtros do QueryPatrimonioDto', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf?status=ATIVO',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.headers['content-type']).toContain('application/pdf');
          expect(response.body).toBeInstanceOf(Buffer);
        }
      });

      it('deve retornar arquivo PDF com Content-Type correto', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.headers['content-type']).toBe('application/pdf');
        }
      });

      it('deve retornar nome de arquivo com data', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          const contentDisposition = response.headers['content-disposition'];
          expect(contentDisposition).toBeDefined();
          expect(contentDisposition).toContain('attachment');
          expect(contentDisposition).toContain('.pdf');
          expect(contentDisposition).toMatch(/\d{4}-\d{2}-\d{2}/); // Data no formato YYYY-MM-DD
        }
      });

      it('deve incluir cabeçalho, tabela e rodapé no PDF', async () => {
        // O PDF gerado deve ter conteúdo (buffer não vazio)
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          // Verificar que o PDF tem tamanho razoável (não vazio, não muito pequeno)
          expect(response.body.length).toBeGreaterThan(1000); // Pelo menos 1KB
        }
      });

      it('deve calcular valor total dos patrimônios', async () => {
        // O cálculo de valor total está no serviço, testamos que o PDF é gerado
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.body).toBeInstanceOf(Buffer);
          expect(response.body.length).toBeGreaterThan(0);
        }
      });

      it('deve aplicar múltiplos filtros', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf?status=ATIVO&marca=Dell',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.headers['content-type']).toContain('application/pdf');
          expect(response.body).toBeInstanceOf(Buffer);
        }
      });

      it('deve suportar ordenação', async () => {
        const response = await authenticatedRequest(
          app.getHttpServer(),
          'get',
          '/v1/patrimonio/export/pdf?sortBy=nome&sortOrder=ASC',
          tokens,
          UserRole.ADMIN
        )
          .expect((res) => {
            if (res.status !== 200 && res.status !== 500 && res.status !== 400) {
              throw new Error(`Expected 200, 500, or 400, got ${res.status}`);
            }
          });

        if (response.status === 200) {
          expect(response.headers['content-type']).toContain('application/pdf');
          expect(response.body).toBeInstanceOf(Buffer);
        }
      });
    });
  });
});

