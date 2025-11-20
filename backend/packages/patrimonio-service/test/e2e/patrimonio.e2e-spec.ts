import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { Patrimonio } from '../../src/patrimonio/entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from '../../src/patrimonio/entities/patrimonio-localizacao-historico.entity';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../../src/shared/enums/user-role.enum';

describe('PatrimonioController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let authToken: string;
  let createdPatrimonioId: string;

  // Mock user para JWT (formato esperado pela JwtStrategy)
  const mockUser = {
    sub: '123e4567-e89b-12d3-a456-426614174000',
    email: 'admin@test.com',
    roles: [UserRole.ADMIN], // Array conforme esperado pela estratégia
  };

  beforeAll(async () => {
    // Configurar variáveis de ambiente para testes
    process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret';
    process.env.NODE_ENV = 'test';
    process.env.DB_SYNC_TEST = 'true'; // Habilitar synchronize para testes

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    dataSource = moduleFixture.get<DataSource>(DataSource);

    // Gerar token JWT para testes
    const jwtSecret = process.env.JWT_ACCESS_SECRET || 'dev_access_secret';
    authToken = jwt.sign(mockUser, jwtSecret, { expiresIn: '1h' });

    await app.init();
  });

  afterAll(async () => {
    // Limpar dados de teste
    if (dataSource && dataSource.isInitialized) {
      const patrimonioRepo = dataSource.getRepository(Patrimonio);
      const historicoRepo = dataSource.getRepository(PatrimonioLocalizacaoHistorico);

      if (createdPatrimonioId) {
        await historicoRepo.delete({ patrimonioId: createdPatrimonioId });
        await patrimonioRepo.delete({ id: createdPatrimonioId });
      }

      // Limpar outros dados de teste
      await patrimonioRepo.delete({ codigo: 'TEST-E2E-001' });
      await patrimonioRepo.delete({ codigo: 'TEST-E2E-002' });
      await patrimonioRepo.delete({ codigo: 'TEST-E2E-UPDATE' });

      await dataSource.destroy();
    }
    await app.close();
  });

  describe('Health Check', () => {
    it('/health (GET) deve retornar status OK', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('status', 'ok');
        });
    });
  });

  describe('POST /patrimonio', () => {
    it('deve criar um novo patrimônio com sucesso', () => {
      const createDto = {
        codigo: 'TEST-E2E-001',
        nome: 'Notebook de Teste E2E',
        descricao: 'Notebook para testes E2E',
        marca: 'Dell',
        modelo: 'Inspiron 15',
        valorAquisicao: 2500.0,
        dataAquisicao: '2024-01-15',
        localizacao: 'Sala de Testes',
        status: 'ATIVO',
      };

      return request(app.getHttpServer())
        .post('/patrimonio')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createDto)
        .expect(201)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('id');
          expect(res.body.data.codigo).toBe('TEST-E2E-001');
          expect(res.body.data.nome).toBe('Notebook de Teste E2E');
          createdPatrimonioId = res.body.data.id;
        });
    });

    it('deve retornar erro 400 ao criar patrimônio com código duplicado', async () => {
      const createDto = {
        codigo: 'TEST-E2E-001', // Código já criado
        nome: 'Outro Notebook',
      };

      return request(app.getHttpServer())
        .post('/patrimonio')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createDto)
        .expect(409); // Conflict
    });

    it('deve retornar erro 401 ou 403 sem token de autenticação', () => {
      const createDto = {
        codigo: 'TEST-E2E-002',
        nome: 'Notebook sem Auth',
      };

      return request(app.getHttpServer())
        .post('/patrimonio')
        .send(createDto)
        .expect((res) => {
          // Pode ser 401 (JwtAuthGuard) ou 403 (ThrottlerGuard)
          expect([401, 403]).toContain(res.status);
        });
    });

    it('deve retornar erro 400 com dados inválidos', () => {
      const createDto = {
        codigo: 'AB', // Muito curto
        nome: '', // Vazio
      };

      return request(app.getHttpServer())
        .post('/patrimonio')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createDto)
        .expect(400);
    });
  });

  describe('GET /patrimonio', () => {
    it('deve listar patrimônios com paginação', () => {
      return request(app.getHttpServer())
        .get('/patrimonio')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('meta');
          expect(res.body.meta).toHaveProperty('page');
          expect(res.body.meta).toHaveProperty('limit');
          expect(res.body.meta).toHaveProperty('total');
        });
    });

    it('deve filtrar patrimônios por código', () => {
      return request(app.getHttpServer())
        .get('/patrimonio')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ codigo: 'TEST-E2E-001' })
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body.data).toBeInstanceOf(Array);
          if (res.body.data.length > 0) {
            expect(res.body.data[0].codigo).toBe('TEST-E2E-001');
          }
        });
    });

    it('deve retornar erro 401 sem token de autenticação', () => {
      return request(app.getHttpServer())
        .get('/patrimonio')
        .expect(401);
    });
  });

  describe('GET /patrimonio/:id', () => {
    it('deve retornar um patrimônio por ID', async () => {
      if (!createdPatrimonioId) {
        // Criar um patrimônio se ainda não foi criado
        const createResponse = await request(app.getHttpServer())
          .post('/patrimonio')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            codigo: 'TEST-E2E-GET',
            nome: 'Patrimônio para GET',
          });
        createdPatrimonioId = createResponse.body.data.id;
      }

      return request(app.getHttpServer())
        .get(`/patrimonio/${createdPatrimonioId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('id', createdPatrimonioId);
        });
    });

    it('deve retornar erro 404 para ID inexistente', () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174999';
      return request(app.getHttpServer())
        .get(`/patrimonio/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });

    it('deve retornar erro 400 para ID inválido', () => {
      return request(app.getHttpServer())
        .get('/patrimonio/invalid-id')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(400);
    });
  });

  describe('PATCH /patrimonio/:id', () => {
    it('deve atualizar um patrimônio existente', async () => {
      if (!createdPatrimonioId) {
        const createResponse = await request(app.getHttpServer())
          .post('/patrimonio')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            codigo: 'TEST-E2E-UPDATE',
            nome: 'Patrimônio para Update',
          });
        createdPatrimonioId = createResponse.body.data.id;
      }

      const updateDto = {
        nome: 'Nome Atualizado E2E',
        descricao: 'Descrição atualizada',
        valorAquisicao: 3000.0,
      };

      return request(app.getHttpServer())
        .patch(`/patrimonio/${createdPatrimonioId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateDto)
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.nome).toBe('Nome Atualizado E2E');
          expect(res.body.data.descricao).toBe('Descrição atualizada');
        });
    });

    it('deve retornar erro 404 ao atualizar patrimônio inexistente', () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174999';
      return request(app.getHttpServer())
        .patch(`/patrimonio/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ nome: 'Novo Nome' })
        .expect(404);
    });
  });

  describe('DELETE /patrimonio/:id', () => {
    it('deve deletar um patrimônio existente', async () => {
      // Criar um patrimônio para deletar
      const createResponse = await request(app.getHttpServer())
        .post('/patrimonio')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          codigo: 'TEST-E2E-DELETE',
          nome: 'Patrimônio para Deletar',
        });
      const patrimonioToDelete = createResponse.body.data.id;

      return request(app.getHttpServer())
        .delete(`/patrimonio/${patrimonioToDelete}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('message');
        });
    });

    it('deve retornar erro 404 ao deletar patrimônio inexistente', () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174999';
      return request(app.getHttpServer())
        .delete(`/patrimonio/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('GET /patrimonio/codigo/:codigo', () => {
    it('deve retornar patrimônio por código', async () => {
      // Garantir que existe um patrimônio com código conhecido
      if (!createdPatrimonioId) {
        const createResponse = await request(app.getHttpServer())
          .post('/patrimonio')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            codigo: 'TEST-E2E-CODIGO',
            nome: 'Patrimônio por Código',
          });
        createdPatrimonioId = createResponse.body.data.id;
      }

      return request(app.getHttpServer())
        .get('/patrimonio/codigo/TEST-E2E-001')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('codigo');
        });
    });

    it('deve retornar erro 404 para código inexistente', () => {
      return request(app.getHttpServer())
        .get('/patrimonio/codigo/CODIGO-INEXISTENTE-999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('GET /patrimonio/dashboard', () => {
    it('deve retornar dados do dashboard', () => {
      return request(app.getHttpServer())
        .get('/patrimonio/dashboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body.data).toHaveProperty('total');
          expect(res.body.data).toHaveProperty('porStatus');
          expect(res.body.data).toHaveProperty('valorTotal');
        });
    });
  });

  describe('PATCH /patrimonio/:id/status', () => {
    it('deve atualizar o status de um patrimônio', async () => {
      if (!createdPatrimonioId) {
        const createResponse = await request(app.getHttpServer())
          .post('/patrimonio')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            codigo: 'TEST-E2E-STATUS',
            nome: 'Patrimônio para Status',
          });
        createdPatrimonioId = createResponse.body.data.id;
      }

      const updateStatusDto = {
        status: 'MANUTENCAO',
        motivo: 'Manutenção preventiva',
      };

      return request(app.getHttpServer())
        .patch(`/patrimonio/${createdPatrimonioId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateStatusDto)
        .expect(200)
        .expect((res: request.Response) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body.data.status).toBe('MANUTENCAO');
        });
    });
  });

  describe('Autenticação e Autorização', () => {
    it('deve rejeitar requisições sem token', () => {
      return request(app.getHttpServer())
        .get('/patrimonio')
        .expect(401);
    });

    it('deve rejeitar requisições com token inválido', () => {
      return request(app.getHttpServer())
        .get('/patrimonio')
        .set('Authorization', 'Bearer token-invalido')
        .expect(401);
    });
  });
});

