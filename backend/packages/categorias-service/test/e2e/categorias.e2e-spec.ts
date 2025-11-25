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
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';

/**
 * Testes E2E para Categorias Controller
 * 
 * Cobre todos os endpoints do Categorias Controller:
 * - POST /categorias - Criar categoria
 * - GET /categorias - Listar categorias
 * - GET /categorias/:id - Buscar categoria por ID
 * - PUT /categorias/:id - Atualizar categoria
 * - DELETE /categorias/:id - Deletar categoria
 * - GET /health - Health check
 */

describe('Categorias (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let tokens: TestUserTokens;

  // IDs de categorias criadas durante os testes
  let createdCategoriaId: string;
  const testPrefix = `categorias-test-${Date.now()}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(dataSource, testPrefix);
  });

  afterAll(async () => {
    // Limpeza de dados de teste
    try {
      if (createdCategoriaId) {
        await dataSource.query(
          `DELETE FROM categorias WHERE id = $1`,
          [createdCategoriaId],
        );
      }
      await dataSource.query(
        `DELETE FROM categorias WHERE codigo LIKE $1`,
        [`${testPrefix}%`],
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('POST /categorias', () => {
    it('deve criar categoria com sucesso (201) - ADMIN', async () => {
      const categoriaData = {
        codigo: `${testPrefix}_TEST_001`,
        nome: 'Categoria de Teste',
        descricao: 'Descrição da categoria de teste',
        icone: 'test-icon',
        cor: '#FF5733',
        ativo: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.ADMIN,
      )
        .send(categoriaData)
        .expect(201);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('codigo', categoriaData.codigo);
      expect(response.body.data).toHaveProperty('nome', categoriaData.nome);
      expect(response.body.data).toHaveProperty('descricao', categoriaData.descricao);

      createdCategoriaId = response.body.data.id;
    });

    it('deve criar categoria com sucesso (201) - MANAGER', async () => {
      const categoriaData = {
        codigo: `${testPrefix}_TEST_002`,
        nome: 'Categoria Manager',
        descricao: 'Categoria criada por manager',
        ativo: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.MANAGER,
      )
        .send(categoriaData)
        .expect(201);

      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('codigo', categoriaData.codigo);
    });

    it('deve retornar 403 para OPERATOR', async () => {
      const categoriaData = {
        codigo: `${testPrefix}_TEST_003`,
        nome: 'Categoria Operator',
      };

      await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.OPERATOR,
      )
        .send(categoriaData)
        .expect(403);
    });

    it('deve retornar 401 para requisição não autenticada', async () => {
      await require('supertest')(httpServer)
        .post('/categorias')
        .send({
          codigo: `${testPrefix}_TEST_004`,
          nome: 'Categoria Pública',
        })
        .expect(401);
    });

    it('deve retornar 409 para código duplicado', async () => {
      const categoriaData = {
        codigo: `${testPrefix}_DUPLICATE`,
        nome: 'Categoria Duplicada',
      };

      // Criar primeira categoria
      await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.ADMIN,
      )
        .send(categoriaData)
        .expect(201);

      // Tentar criar segunda categoria com mesmo código
      await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.ADMIN,
      )
        .send(categoriaData)
        .expect(409);
    });

    it('deve retornar 400 para dados inválidos (codigo faltando)', async () => {
      await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          nome: 'Categoria sem código',
        })
        .expect(400);
    });

    it('deve retornar 400 para código inválido (minúsculas)', async () => {
      await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          codigo: 'codigo_invalido',
          nome: 'Categoria',
        })
        .expect(400);
    });
  });

  describe('GET /categorias', () => {
    it('deve listar categorias com sucesso (200) - público', async () => {
      const response = await require('supertest')(httpServer)
        .get('/categorias')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('items');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('limit');
      expect(Array.isArray(response.body.data.items)).toBe(true);
    });

    it('deve filtrar categorias por nome', async () => {
      const response = await require('supertest')(httpServer)
        .get('/categorias?nome=Teste')
        .expect(200);

      expect(Array.isArray(response.body.data.items)).toBe(true);
    });

    it('deve paginar resultados', async () => {
      const response = await require('supertest')(httpServer)
        .get('/categorias?page=1&limit=5')
        .expect(200);

      expect(response.body.data.page).toBe(1);
      expect(response.body.data.limit).toBe(5);
    });
  });

  describe('GET /categorias/:id', () => {
    it('deve buscar categoria por ID com sucesso (200) - público', async () => {
      if (!createdCategoriaId) {
        // Criar uma categoria primeiro se não existir
        const createResponse = await authenticatedRequest(
          httpServer,
          'post',
          '/categorias',
          tokens,
          UserRole.ADMIN,
        )
          .send({
            codigo: `${testPrefix}_GET_TEST`,
            nome: 'Categoria para Get',
          });
        createdCategoriaId = createResponse.body.data.id;
      }

      const response = await require('supertest')(httpServer)
        .get(`/categorias/${createdCategoriaId}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', createdCategoriaId);
    });

    it('deve retornar 404 para categoria não encontrada', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      await require('supertest')(httpServer)
        .get(`/categorias/${nonExistentId}`)
        .expect(404);
    });

    it('deve retornar 400 para ID inválido', async () => {
      await require('supertest')(httpServer)
        .get('/categorias/invalid-id')
        .expect(400);
    });
  });

  describe('PUT /categorias/:id', () => {
    it('deve atualizar categoria com sucesso (200) - ADMIN', async () => {
      if (!createdCategoriaId) {
        const createResponse = await authenticatedRequest(
          httpServer,
          'post',
          '/categorias',
          tokens,
          UserRole.ADMIN,
        )
          .send({
            codigo: `${testPrefix}_UPDATE_TEST`,
            nome: 'Categoria para Update',
          });
        createdCategoriaId = createResponse.body.data.id;
      }

      const updateData = {
        nome: 'Categoria Atualizada',
        descricao: 'Nova descrição',
      };

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/categorias/${createdCategoriaId}`,
        tokens,
        UserRole.ADMIN,
      )
        .send(updateData)
        .expect(200);

      expect(response.body.data).toHaveProperty('nome', updateData.nome);
      expect(response.body.data).toHaveProperty('descricao', updateData.descricao);
    });

    it('deve atualizar categoria com sucesso (200) - MANAGER', async () => {
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.MANAGER,
      )
        .send({
          codigo: `${testPrefix}_MANAGER_UPDATE`,
          nome: 'Categoria Manager',
        });

      const categoriaId = createResponse.body.data.id;

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/categorias/${categoriaId}`,
        tokens,
        UserRole.MANAGER,
      )
        .send({
          nome: 'Categoria Manager Atualizada',
        })
        .expect(200);

      expect(response.body.data).toHaveProperty('nome', 'Categoria Manager Atualizada');
    });

    it('deve retornar 403 para OPERATOR', async () => {
      if (!createdCategoriaId) {
        const createResponse = await authenticatedRequest(
          httpServer,
          'post',
          '/categorias',
          tokens,
          UserRole.ADMIN,
        )
          .send({
            codigo: `${testPrefix}_OPERATOR_TEST`,
            nome: 'Categoria',
          });
        createdCategoriaId = createResponse.body.data.id;
      }

      await authenticatedRequest(
        httpServer,
        'put',
        `/categorias/${createdCategoriaId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .send({
          nome: 'Tentativa de Update',
        })
        .expect(403);
    });

    it('deve retornar 400 para dados inválidos', async () => {
      if (!createdCategoriaId) {
        const createResponse = await authenticatedRequest(
          httpServer,
          'post',
          '/categorias',
          tokens,
          UserRole.ADMIN,
        )
          .send({
            codigo: `${testPrefix}_INVALID_TEST`,
            nome: 'Categoria',
          });
        createdCategoriaId = createResponse.body.data.id;
      }

      await authenticatedRequest(
        httpServer,
        'put',
        `/categorias/${createdCategoriaId}`,
        tokens,
        UserRole.ADMIN,
      )
        .send({
          codigo: 'codigo_invalido', // Código em minúsculas
        })
        .expect(400);
    });
  });

  describe('DELETE /categorias/:id', () => {
    it('deve deletar categoria com sucesso (200) - ADMIN', async () => {
      // Criar uma categoria para deletar
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          codigo: `${testPrefix}_DELETE_TEST`,
          nome: 'Categoria para Deletar',
        });

      const categoriaId = createResponse.body.data.id;

      // Deletar a categoria
      await authenticatedRequest(
        httpServer,
        'delete',
        `/categorias/${categoriaId}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      // Verificar que a categoria foi deletada
      await require('supertest')(httpServer)
        .get(`/categorias/${categoriaId}`)
        .expect(404);
    });

    it('deve retornar 403 para MANAGER tentando deletar', async () => {
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/categorias',
        tokens,
        UserRole.MANAGER,
      )
        .send({
          codigo: `${testPrefix}_MANAGER_DELETE`,
          nome: 'Categoria Manager',
        });

      const categoriaId = createResponse.body.data.id;

      await authenticatedRequest(
        httpServer,
        'delete',
        `/categorias/${categoriaId}`,
        tokens,
        UserRole.MANAGER,
      )
        .expect(403);
    });

    it('deve retornar 403 para OPERATOR tentando deletar', async () => {
      if (!createdCategoriaId) {
        const createResponse = await authenticatedRequest(
          httpServer,
          'post',
          '/categorias',
          tokens,
          UserRole.ADMIN,
        )
          .send({
            codigo: `${testPrefix}_OPERATOR_DELETE`,
            nome: 'Categoria',
          });
        createdCategoriaId = createResponse.body.data.id;
      }

      await authenticatedRequest(
        httpServer,
        'delete',
        `/categorias/${createdCategoriaId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .expect(403);
    });

    it('deve retornar 404 para categoria não encontrada', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      await authenticatedRequest(
        httpServer,
        'delete',
        `/categorias/${nonExistentId}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(404);
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
      expect(response.body).toHaveProperty('service', 'categorias-service');
      expect(response.body).toHaveProperty('version');
      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });
  });
});

