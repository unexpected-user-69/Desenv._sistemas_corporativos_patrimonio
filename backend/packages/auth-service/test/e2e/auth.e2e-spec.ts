process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';
// Configurar JWT secret para testes
process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret';
// Configurar URL do users-service para testes
process.env.USERS_API_URL = process.env.USERS_API_URL || 'http://localhost:3002';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { createTestUser, deleteTestUser, cleanupTestUsers, TestUser } from '../helpers/users-helper';

/**
 * Testes E2E para Auth Controller
 * 
 * Cobre todos os 5 endpoints do Auth Controller:
 * - POST /auth/login - Autenticar usuário
 * - POST /auth/refresh - Renovar access token
 * - POST /auth/logout - Revogar refresh token
 * - GET /auth/me - Obter informações do usuário autenticado
 * - GET /health - Health check
 */

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;

  // Usuários de teste
  let testUser: TestUser;
  let testUserInactive: TestUser;
  const testPrefix = `auth-test-${Date.now()}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Criar usuários de teste no banco
    testUser = await createTestUser(
      dataSource,
      `${testPrefix}-active@example.com`,
      'TestPassword123!',
      'Test User Active',
      'ADMIN',
      true,
    );

    testUserInactive = await createTestUser(
      dataSource,
      `${testPrefix}-inactive@example.com`,
      'TestPassword123!',
      'Test User Inactive',
      'OPERATOR',
      false,
    );
  });

  afterAll(async () => {
    // Limpeza de dados de teste
    try {
      await cleanupTestUsers(dataSource, testPrefix);
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('POST /auth/login', () => {
    it('deve fazer login com sucesso (200)', async () => {
      const response = await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('email', testUser.email);
      expect(response.body.user).toHaveProperty('name', testUser.name);
      expect(response.body.user).toHaveProperty('role', testUser.role);
      expect(typeof response.body.accessToken).toBe('string');
      expect(response.body.accessToken.length).toBeGreaterThan(0);
      expect(typeof response.body.refreshToken).toBe('string');
      expect(response.body.refreshToken.length).toBeGreaterThan(0);
    });

    it('deve retornar 401 para credenciais inválidas', async () => {
      await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword123!',
        })
        .expect(401);
    });

    it('deve retornar 401 para email não encontrado', async () => {
      await request(httpServer)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'SomePassword123!',
        })
        .expect(401);
    });

    it('deve retornar 400 para dados inválidos (email inválido)', async () => {
      await request(httpServer)
        .post('/auth/login')
        .send({
          email: 'invalid-email',
          password: 'TestPassword123!',
        })
        .expect(400);
    });

    it('deve retornar 400 para dados inválidos (senha muito curta)', async () => {
      await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: '123',
        })
        .expect(400);
    });

    it('deve retornar 400 para dados faltando', async () => {
      await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
        })
        .expect(400);
    });
  });

  describe('POST /auth/refresh', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Obter refresh token fazendo login
      const loginResponse = await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      refreshToken = loginResponse.body.refreshToken;
    });

    it('deve renovar tokens com sucesso (200)', async () => {
      const response = await request(httpServer)
        .post('/auth/refresh')
        .send({
          refreshToken,
        })
        .expect(200);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('email', testUser.email);
      expect(typeof response.body.accessToken).toBe('string');
      expect(response.body.accessToken.length).toBeGreaterThan(0);
      expect(typeof response.body.refreshToken).toBe('string');
      expect(response.body.refreshToken.length).toBeGreaterThan(0);
      // O novo refresh token deve ser diferente do antigo
      expect(response.body.refreshToken).not.toBe(refreshToken);
    });

    it('deve retornar 401 para refresh token inválido', async () => {
      await request(httpServer)
        .post('/auth/refresh')
        .send({
          refreshToken: 'invalid-refresh-token',
        })
        .expect(401);
    });

    it('deve retornar 401 para refresh token já usado (após refresh)', async () => {
      // Fazer refresh uma vez
      await request(httpServer)
        .post('/auth/refresh')
        .send({
          refreshToken,
        })
        .expect(200);

      // Tentar usar o mesmo refresh token novamente (deve falhar)
      await request(httpServer)
        .post('/auth/refresh')
        .send({
          refreshToken,
        })
        .expect(401);
    });

    it('deve retornar 400 para dados inválidos (refreshToken faltando)', async () => {
      await request(httpServer)
        .post('/auth/refresh')
        .send({})
        .expect(400);
    });
  });

  describe('POST /auth/logout', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Obter refresh token fazendo login
      const loginResponse = await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      refreshToken = loginResponse.body.refreshToken;
    });

    it('deve fazer logout com sucesso (200)', async () => {
      const response = await request(httpServer)
        .post('/auth/logout')
        .send({
          refreshToken,
        })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('revoked');
      expect(response.body.revoked).toBe(1);
    });

    it('deve retornar 200 mesmo para refresh token já revogado', async () => {
      // Fazer logout uma vez
      await request(httpServer)
        .post('/auth/logout')
        .send({
          refreshToken,
        })
        .expect(200);

      // Tentar fazer logout novamente (deve retornar 200 mas revoked = 0)
      const response = await request(httpServer)
        .post('/auth/logout')
        .send({
          refreshToken,
        })
        .expect(200);

      expect(response.body.revoked).toBe(0);
    });

    it('deve retornar 400 para dados inválidos (refreshToken faltando)', async () => {
      await request(httpServer)
        .post('/auth/logout')
        .send({})
        .expect(400);
    });
  });

  describe('GET /auth/me', () => {
    let accessToken: string;

    beforeEach(async () => {
      // Obter access token fazendo login
      const loginResponse = await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      accessToken = loginResponse.body.accessToken;
    });

    it('deve retornar informações do usuário autenticado (200)', async () => {
      const response = await request(httpServer)
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('email', testUser.email);
      expect(response.body).toHaveProperty('name', testUser.name);
      expect(response.body).toHaveProperty('roles');
      expect(Array.isArray(response.body.roles)).toBe(true);
      expect(response.body.roles.length).toBeGreaterThan(0);
    });

    it('deve retornar 401 para token não fornecido', async () => {
      await request(httpServer)
        .get('/auth/me')
        .expect(401);
    });

    it('deve retornar 401 para token inválido', async () => {
      await request(httpServer)
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('deve retornar 401 para token malformado', async () => {
      await request(httpServer)
        .get('/auth/me')
        .set('Authorization', 'InvalidFormat')
        .expect(401);
    });
  });

  describe('GET /health', () => {
    it('deve retornar status de saúde (200)', async () => {
      const response = await request(httpServer)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('service', 'auth-service');
      expect(response.body).toHaveProperty('version');
      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });
  });
});

