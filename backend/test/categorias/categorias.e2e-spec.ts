process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { HashService } from '../../src/common/services/hash.service';
import { UserRole } from '../../src/users/enums/user-role.enum';
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';

/**
 * Testes E2E para Categorias Controller
 * 
 * Cobre todos os 8 endpoints do Categorias Controller:
 * - GET /v1/categorias - Listar categorias
 * - POST /v1/categorias - Criar categoria
 * - GET /v1/categorias/{id} - Buscar categoria por ID
 * - GET /v1/categorias/codigo/{codigo} - Buscar categoria por código
 * - PUT /v1/categorias/{id} - Atualizar categoria
 * - PATCH /v1/categorias/{id}/ativar - Ativar categoria
 * - PATCH /v1/categorias/{id}/desativar - Desativar categoria
 * - DELETE /v1/categorias/{id} - Deletar categoria
 */

describe('Categorias (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

  // Categorias de teste
  let categoriaId1: string;
  let categoriaId2: string;
  let categoriaCodigo1: string;
  let categoriaCodigo2: string;

  beforeAll(async () => {
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

    // Configurar USERS_API_URL para apontar para o próprio servidor de teste
    // Isso permite que o AuthService use o UsersHttpClient para chamar o endpoint local
    const address = httpServer.address();
    if (address && typeof address === 'object') {
      const port = address.port;
      const baseUrl = `http://localhost:${port}/v1`;
      process.env.USERS_API_URL = baseUrl;
    } else {
      // Fallback: usar localhost com porta padrão ou variável de ambiente
      process.env.USERS_API_URL = process.env.USERS_API_URL || 'http://localhost:3000/v1';
    }

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'categorias-test');
  });

  afterAll(async () => {
    // Limpeza de dados de teste (opcional)
    try {
      await dataSource.query(
        `DELETE FROM categorias 
         WHERE codigo LIKE 'TEST_%' 
         OR codigo LIKE 'TEST_CAT_%' 
         OR codigo LIKE 'TEST_CAT_MANAGER_%' 
         OR codigo LIKE 'TEST_UPDATE_%' 
         OR codigo LIKE 'TEST_DELETE_%'`,
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('GET /v1/categorias', () => {
    it('deve listar categorias com paginação (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/categorias')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('page');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('totalPages');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('deve filtrar categorias por ativo (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/categorias')
        .query({ ativo: true, page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data).toBeDefined();
      if (response.body.data.length > 0) {
        response.body.data.forEach((categoria: any) => {
          expect(categoria.ativo).toBe(true);
        });
      }
    });

    it('deve buscar categorias por texto (q) (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/categorias')
        .query({ q: 'Equipamento', page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data).toBeDefined();
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/categorias')
        .query({ page: 1, limit: 10 });
      
      // Endpoint público, deve retornar 200
      expect(response.status).toBe(200);
    });
  });

  describe('POST /v1/categorias', () => {
    it('deve criar categoria com sucesso (201) - ADMIN', async () => {
      categoriaCodigo1 = `TEST_CAT_${Date.now()}`;
      const createCategoriaDto = {
        codigo: categoriaCodigo1,
        nome: 'Categoria de Teste',
        descricao: 'Descrição da categoria de teste',
        icone: 'test-icon',
        cor: '#FF5733',
        ativo: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/categorias',
        tokens,
        UserRole.ADMIN, // POST /categorias requer ADMIN ou MANAGER
      )
        .send(createCategoriaDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('codigo', categoriaCodigo1);
      expect(response.body).toHaveProperty('nome', createCategoriaDto.nome);
      expect(response.body).toHaveProperty('descricao', createCategoriaDto.descricao);
      expect(response.body).toHaveProperty('icone', createCategoriaDto.icone);
      expect(response.body).toHaveProperty('cor', createCategoriaDto.cor);
      expect(response.body).toHaveProperty('ativo', createCategoriaDto.ativo);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');

      categoriaId1 = response.body.id;
    });

    it('deve criar categoria com sucesso (201) - MANAGER', async () => {
      categoriaCodigo2 = `TEST_CAT_MANAGER_${Date.now()}`;
      const createCategoriaDto = {
        codigo: categoriaCodigo2,
        nome: 'Categoria de Teste MANAGER',
        descricao: 'Descrição da categoria criada por MANAGER',
        ativo: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/categorias',
        tokens,
        UserRole.MANAGER, // POST /categorias requer ADMIN ou MANAGER
      )
        .send(createCategoriaDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('codigo', categoriaCodigo2);
      expect(response.body).toHaveProperty('nome', createCategoriaDto.nome);
      categoriaId2 = response.body.id;
    });
  });

  describe('GET /v1/categorias/:id', () => {
    it('deve buscar categoria por ID (200)', async () => {
      // GET /categorias/:id é público, não precisa de autenticação
      const response = await request(httpServer)
        .get(`/v1/categorias/${categoriaId1}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', categoriaId1);
      expect(response.body).toHaveProperty('codigo', categoriaCodigo1);
      expect(response.body).toHaveProperty('nome');
    });
  });

  describe('GET /v1/categorias/codigo/:codigo', () => {
    it('deve buscar categoria por código (200)', async () => {
      // GET /categorias/codigo/:codigo é público, não precisa de autenticação
      const response = await request(httpServer)
        .get(`/v1/categorias/codigo/${categoriaCodigo1}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', categoriaId1);
      expect(response.body).toHaveProperty('codigo', categoriaCodigo1);
    });
  });

  describe('PUT /v1/categorias/:id', () => {
    it('deve atualizar categoria com sucesso (200) - ADMIN', async () => {
      const updateDto = {
        nome: 'Nome Atualizado',
        descricao: 'Descrição atualizada',
        icone: 'updated-icon',
        cor: '#00FF00',
      };

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/v1/categorias/${categoriaId1}`,
        tokens,
        UserRole.ADMIN, // PUT /categorias/:id requer ADMIN ou MANAGER
      )
        .send(updateDto)
        .expect((res) => {
          // PUT pode retornar 200 ou 201
          if (res.status !== 200 && res.status !== 201) {
            throw new Error(`Expected 200 or 201, got ${res.status}`);
          }
        });

      expect(response.body).toHaveProperty('id', categoriaId1);
      expect(response.body).toHaveProperty('nome', updateDto.nome);
      expect(response.body).toHaveProperty('descricao', updateDto.descricao);
      expect(response.body).toHaveProperty('icone', updateDto.icone);
      expect(response.body).toHaveProperty('cor', updateDto.cor);
    });

    it('deve atualizar categoria com sucesso (200) - MANAGER', async () => {
      const updateDto = {
        nome: 'Nome Atualizado por MANAGER',
      };

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/v1/categorias/${categoriaId2}`,
        tokens,
        UserRole.MANAGER, // PUT /categorias/:id requer ADMIN ou MANAGER
      )
        .send(updateDto)
        .expect((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error(`Expected 200 or 201, got ${res.status}`);
          }
        });

      expect(response.body).toHaveProperty('id', categoriaId2);
      expect(response.body).toHaveProperty('nome', updateDto.nome);
    });
  });

  describe('PATCH /v1/categorias/:id/ativar', () => {
    it('deve ativar categoria com sucesso (204) - ADMIN', async () => {
      // Primeiro desativar a categoria
      await authenticatedRequest(
        httpServer,
        'patch',
        `/v1/categorias/${categoriaId2}/desativar`,
        tokens,
        UserRole.ADMIN, // PATCH /categorias/:id/desativar requer ADMIN ou MANAGER
      ).expect(204);

      // Agora ativar
      await authenticatedRequest(
        httpServer,
        'patch',
        `/v1/categorias/${categoriaId2}/ativar`,
        tokens,
        UserRole.ADMIN, // PATCH /categorias/:id/ativar requer ADMIN ou MANAGER
      ).expect(204);

      // Verificar que está ativa
      const response = await request(httpServer)
        .get(`/v1/categorias/${categoriaId2}`)
        .expect(200);

      expect(response.body).toHaveProperty('ativo', true);
    });
  });

  describe('PATCH /v1/categorias/:id/desativar', () => {
    it('deve desativar categoria com sucesso (204) - ADMIN', async () => {
      await authenticatedRequest(
        httpServer,
        'patch',
        `/v1/categorias/${categoriaId2}/desativar`,
        tokens,
        UserRole.ADMIN, // PATCH /categorias/:id/desativar requer ADMIN ou MANAGER
      ).expect(204);

      // Verificar que está desativada
      const response = await request(httpServer)
        .get(`/v1/categorias/${categoriaId2}`)
        .expect(200);

      expect(response.body).toHaveProperty('ativo', false);
    });
  });

  describe('DELETE /v1/categorias/:id', () => {
    it('deve deletar categoria com sucesso (204) - ADMIN', async () => {
      // Criar categoria temporária para deletar
      const tempCodigo = `TEST_DELETE_${Date.now()}`;
      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/categorias',
        tokens,
        UserRole.ADMIN,
      )
        .send({ codigo: tempCodigo, nome: 'Temp Categoria', ativo: true })
        .expect(201);

      const tempCategoriaId = createResponse.body.id;

      await authenticatedRequest(
        httpServer,
        'delete',
        `/v1/categorias/${tempCategoriaId}`,
        tokens,
        UserRole.ADMIN, // DELETE /categorias/:id requer apenas ADMIN
      ).expect((res) => {
        // DELETE pode retornar 200 ou 204
        if (res.status !== 200 && res.status !== 204) {
          throw new Error(`Expected 200 or 204, got ${res.status}`);
        }
      });

      // Verificar que foi deletada (soft delete)
      await request(httpServer)
        .get(`/v1/categorias/${tempCategoriaId}`)
        .expect(404);
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela categorias
    try {
      await queryRunner.query('SELECT 1 FROM categorias LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE IF NOT EXISTS categorias (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          codigo varchar(50) UNIQUE NOT NULL,
          nome varchar(100) NOT NULL,
          descricao text,
          icone varchar(50),
          cor varchar(20),
          ativo boolean NOT NULL DEFAULT true,
          created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
          deleted_at timestamp with time zone
        );
        CREATE INDEX IF NOT EXISTS idx_categorias_codigo ON categorias(codigo);
        CREATE INDEX IF NOT EXISTS idx_categorias_ativo ON categorias(ativo);
      `);
    }
  } finally {
    await queryRunner.release();
  }
}

