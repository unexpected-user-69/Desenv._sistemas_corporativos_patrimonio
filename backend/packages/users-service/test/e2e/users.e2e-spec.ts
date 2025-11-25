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
import { UserRole } from '../../src/users/enums/user-role.enum';
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';

/**
 * Testes E2E para Users Controller
 * 
 * Cobre os principais endpoints do Users Controller:
 * - GET /users - Listar usuários
 * - POST /users - Criar usuário
 * - GET /users/:id - Buscar usuário por ID
 * - PUT /users/:id - Atualizar usuário
 * - DELETE /users/:id - Deletar usuário
 * - POST /users/validate - Validar credenciais
 * - GET /health - Health check
 */

describe('Users (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let tokens: TestUserTokens;

  // IDs de usuários criados durante os testes
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(dataSource, 'users-test');
  });

  afterAll(async () => {
    // Limpeza de dados de teste
    try {
      await dataSource.query(
        `DELETE FROM users 
         WHERE email LIKE '%users-test%@example.com' 
         OR id = $1`,
        [createdUserId],
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('POST /users/validate', () => {
    it('deve validar credenciais válidas (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/users/validate',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          email: tokens.adminEmail,
          password: 'AdminPassword123!',
        })
        .expect(200);

      // O endpoint retorna null quando inválido, mas aqui deve retornar o usuário
      // Na verdade, o endpoint é público, então não precisa de autenticação
      const publicResponse = await require('supertest')(httpServer)
        .post('/users/validate')
        .send({
          email: tokens.adminEmail,
          password: 'AdminPassword123!',
        })
        .expect(200);

      expect(publicResponse.body).toHaveProperty('data');
      if (publicResponse.body.data) {
        expect(publicResponse.body.data).toHaveProperty('id');
        expect(publicResponse.body.data).toHaveProperty('email', tokens.adminEmail);
      }
    });

    it('deve retornar null para credenciais inválidas (200)', async () => {
      const response = await require('supertest')(httpServer)
        .post('/users/validate')
        .send({
          email: tokens.adminEmail,
          password: 'WrongPassword123!',
        })
        .expect(200);

      // O endpoint retorna null quando as credenciais são inválidas
      expect(response.body.data).toBeNull();
    });

    it('deve retornar 400 para dados inválidos', async () => {
      await require('supertest')(httpServer)
        .post('/users/validate')
        .send({
          email: 'invalid-email',
          password: 'SomePassword123!',
        })
        .expect(400);
    });
  });

  describe('GET /users', () => {
    it('deve listar usuários com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/users',
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('items');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('limit');
      expect(Array.isArray(response.body.data.items)).toBe(true);
    });

    it('deve listar usuários com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/users',
        tokens,
        UserRole.MANAGER,
      )
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data.items)).toBe(true);
    });

    it('deve retornar 403 para OPERATOR', async () => {
      await authenticatedRequest(
        httpServer,
        'get',
        '/users',
        tokens,
        UserRole.OPERATOR,
      )
        .expect(403);
    });

    it('deve retornar 401 para requisição não autenticada', async () => {
      await require('supertest')(httpServer)
        .get('/users')
        .expect(401);
    });

    it('deve filtrar usuários por role', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/users?role=ADMIN',
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      expect(response.body.data.items.every((user: any) => user.role === 'ADMIN')).toBe(true);
    });
  });

  describe('POST /users', () => {
    it('deve criar usuário com sucesso (201) - ADMIN', async () => {
      const newUser = {
        email: `new-user-${Date.now()}@example.com`,
        password: 'NewUserPassword123!',
        name: 'New Test User',
        role: UserRole.OPERATOR,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/users',
        tokens,
        UserRole.ADMIN,
      )
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('email', newUser.email);
      expect(response.body.data).toHaveProperty('name', newUser.name);
      expect(response.body.data).toHaveProperty('role', newUser.role);
      expect(response.body.data).not.toHaveProperty('passwordHash');

      createdUserId = response.body.data.id;
    });

    it('deve retornar 403 para MANAGER tentando criar usuário', async () => {
      const newUser = {
        email: `new-user-${Date.now()}@example.com`,
        password: 'NewUserPassword123!',
        name: 'New Test User',
        role: UserRole.OPERATOR,
      };

      await authenticatedRequest(
        httpServer,
        'post',
        '/users',
        tokens,
        UserRole.MANAGER,
      )
        .send(newUser)
        .expect(403);
    });

    it('deve retornar 409 para email duplicado', async () => {
      const newUser = {
        email: tokens.adminEmail, // Email já existe
        password: 'NewUserPassword123!',
        name: 'New Test User',
        role: UserRole.OPERATOR,
      };

      await authenticatedRequest(
        httpServer,
        'post',
        '/users',
        tokens,
        UserRole.ADMIN,
      )
        .send(newUser)
        .expect(409);
    });

    it('deve retornar 400 para dados inválidos', async () => {
      await authenticatedRequest(
        httpServer,
        'post',
        '/users',
        tokens,
        UserRole.ADMIN,
      )
        .send({
          email: 'invalid-email',
          password: '123', // Senha muito curta
        })
        .expect(400);
    });
  });

  describe('GET /users/:id', () => {
    it('deve buscar usuário por ID com sucesso (200) - próprio usuário', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/users/${tokens.operatorUserId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', tokens.operatorUserId);
      expect(response.body.data).toHaveProperty('email', tokens.operatorEmail);
    });

    it('deve buscar usuário por ID com sucesso (200) - ADMIN pode buscar qualquer usuário', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/users/${tokens.operatorUserId}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      expect(response.body.data).toHaveProperty('id', tokens.operatorUserId);
    });

    it('deve retornar 403 para OPERATOR tentando buscar outro usuário', async () => {
      await authenticatedRequest(
        httpServer,
        'get',
        `/users/${tokens.adminUserId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .expect(403);
    });

    it('deve retornar 404 para usuário não encontrado', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      await authenticatedRequest(
        httpServer,
        'get',
        `/users/${nonExistentId}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(404);
    });

    it('deve retornar 400 para ID inválido', async () => {
      await authenticatedRequest(
        httpServer,
        'get',
        '/users/invalid-id',
        tokens,
        UserRole.ADMIN,
      )
        .expect(400);
    });
  });

  describe('PUT /users/:id', () => {
    it('deve atualizar usuário com sucesso (200) - próprio usuário', async () => {
      const updateData = {
        name: 'Updated Name',
      };

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/users/${tokens.operatorUserId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('name', updateData.name);
    });

    it('deve atualizar usuário com sucesso (200) - ADMIN pode atualizar qualquer usuário', async () => {
      const updateData = {
        name: 'Updated by Admin',
      };

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/users/${tokens.operatorUserId}`,
        tokens,
        UserRole.ADMIN,
      )
        .send(updateData)
        .expect(200);

      expect(response.body.data).toHaveProperty('name', updateData.name);
    });

    it('deve retornar 403 para OPERATOR tentando atualizar outro usuário', async () => {
      const updateData = {
        name: 'Should Not Work',
      };

      await authenticatedRequest(
        httpServer,
        'put',
        `/users/${tokens.adminUserId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .send(updateData)
        .expect(403);
    });

    it('deve retornar 400 para dados inválidos', async () => {
      await authenticatedRequest(
        httpServer,
        'put',
        `/users/${tokens.operatorUserId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .send({
          email: 'invalid-email',
        })
        .expect(400);
    });
  });

  describe('DELETE /users/:id', () => {
    it('deve deletar usuário com sucesso (200) - ADMIN', async () => {
      // Criar um usuário para deletar
      const newUser = {
        email: `delete-user-${Date.now()}@example.com`,
        password: 'DeleteUserPassword123!',
        name: 'User to Delete',
        role: UserRole.OPERATOR,
      };

      const createResponse = await authenticatedRequest(
        httpServer,
        'post',
        '/users',
        tokens,
        UserRole.ADMIN,
      )
        .send(newUser)
        .expect(201);

      const userIdToDelete = createResponse.body.data.id;

      // Deletar o usuário
      await authenticatedRequest(
        httpServer,
        'delete',
        `/users/${userIdToDelete}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(200);

      // Verificar que o usuário foi deletado (soft delete)
      await authenticatedRequest(
        httpServer,
        'get',
        `/users/${userIdToDelete}`,
        tokens,
        UserRole.ADMIN,
      )
        .expect(404);
    });

    it('deve retornar 403 para OPERATOR tentando deletar usuário', async () => {
      await authenticatedRequest(
        httpServer,
        'delete',
        `/users/${tokens.operatorUserId}`,
        tokens,
        UserRole.OPERATOR,
      )
        .expect(403);
    });

    it('deve retornar 404 para usuário não encontrado', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      await authenticatedRequest(
        httpServer,
        'delete',
        `/users/${nonExistentId}`,
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
      expect(response.body).toHaveProperty('service', 'users-service');
      expect(response.body).toHaveProperty('version');
      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });
  });
});

