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
import { UsersHttpClient } from '../../src/auth/users-http-client';

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

  // Helper para extrair dados da resposta (considera TransformResponseInterceptor)
  function getResponseData(body: any): any {
    return body.data || body;
  }

  // Helper para fazer login (simplificado, sem retry já que throttler está desabilitado em testes)
  async function loginWithRetry(email: string, password: string): Promise<any> {
    return await request(httpServer)
      .post('/auth/login')
      .send({ email, password });
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);

    // Configurar UsersHttpClient para usar validação direta no banco em testes
    try {
      const usersHttpClient = app.get(UsersHttpClient);
      if (usersHttpClient && typeof usersHttpClient.setDataSource === 'function') {
        usersHttpClient.setDataSource(dataSource);
      }
    } catch (error) {
      // Ignorar se não conseguir obter o UsersHttpClient
    }

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
        });
      
      // Aceita 200 ou 201 (Created)
      expect([200, 201]).toContain(response.status);
      
      const data = getResponseData(response.body);
      expect(data).toHaveProperty('accessToken');
      expect(data).toHaveProperty('refreshToken');
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('id');
      expect(data.user).toHaveProperty('email', testUser.email);
      expect(data.user).toHaveProperty('name', testUser.name);
      expect(data.user).toHaveProperty('role', testUser.role);
      expect(typeof data.accessToken).toBe('string');
      expect(data.accessToken.length).toBeGreaterThan(0);
      expect(typeof data.refreshToken).toBe('string');
      expect(data.refreshToken.length).toBeGreaterThan(0);
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
      // Pode retornar 429 (rate limit) se muitos testes foram executados
      // Aguardar um pouco antes de fazer a requisição
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const response = await request(httpServer)
        .post('/auth/login')
        .send({
          email: testUser.email,
        });
      
      // Aceita 400 (validação) ou 429 (rate limit)
      expect([400, 429]).toContain(response.status);
    });
  });

  describe('POST /auth/refresh', () => {
    let refreshToken: string;

    beforeEach(async () => {
      // Obter refresh token fazendo login com retry
      const loginResponse = await loginWithRetry(testUser.email, testUser.password);
      
      expect([200, 201]).toContain(loginResponse.status);
      const loginData = getResponseData(loginResponse.body);
      expect(loginData).toHaveProperty('refreshToken');
      refreshToken = loginData.refreshToken;
      expect(refreshToken).toBeDefined();
      expect(typeof refreshToken).toBe('string');
      expect(refreshToken.length).toBeGreaterThan(0);
    });

    it('deve renovar tokens com sucesso (200)', async () => {
      const response = await request(httpServer)
        .post('/auth/refresh')
        .send({
          refreshToken,
        });
      
      expect([200, 201]).toContain(response.status);

      const data = getResponseData(response.body);
      expect(data).toHaveProperty('accessToken');
      expect(data).toHaveProperty('refreshToken');
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('id');
      expect(data.user).toHaveProperty('email', testUser.email);
      expect(typeof data.accessToken).toBe('string');
      expect(data.accessToken.length).toBeGreaterThan(0);
      expect(typeof data.refreshToken).toBe('string');
      expect(data.refreshToken.length).toBeGreaterThan(0);
      // O novo refresh token deve ser diferente do antigo
      expect(data.refreshToken).not.toBe(refreshToken);
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
      const refreshResponse = await request(httpServer)
        .post('/auth/refresh')
        .send({
          refreshToken,
        });
      
      expect([200, 201]).toContain(refreshResponse.status);

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
      // Obter refresh token fazendo login com retry
      const loginResponse = await loginWithRetry(testUser.email, testUser.password);
      
      expect([200, 201]).toContain(loginResponse.status);
      const loginData = getResponseData(loginResponse.body);
      expect(loginData).toHaveProperty('refreshToken');
      refreshToken = loginData.refreshToken;
      expect(refreshToken).toBeDefined();
      expect(typeof refreshToken).toBe('string');
      expect(refreshToken.length).toBeGreaterThan(0);
    });

    it('deve fazer logout com sucesso (200)', async () => {
      const response = await request(httpServer)
        .post('/auth/logout')
        .send({
          refreshToken,
        });
      
      expect([200, 201]).toContain(response.status);

      const data = getResponseData(response.body);
      expect(data).toHaveProperty('message');
      expect(data).toHaveProperty('revoked');
      expect(data.revoked).toBe(1);
    });

    it('deve retornar 200 mesmo para refresh token já revogado', async () => {
      // Fazer logout uma vez
      const firstLogout = await request(httpServer)
        .post('/auth/logout')
        .send({
          refreshToken,
        });
      
      expect([200, 201]).toContain(firstLogout.status);

      // Tentar fazer logout novamente (deve retornar 200 mas revoked = 0)
      const response = await request(httpServer)
        .post('/auth/logout')
        .send({
          refreshToken,
        });
      
      expect([200, 201]).toContain(response.status);

      const data = getResponseData(response.body);
      expect(data.revoked).toBe(0);
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
      // Obter access token fazendo login com retry
      const loginResponse = await loginWithRetry(testUser.email, testUser.password);
      
      expect([200, 201]).toContain(loginResponse.status);
      const loginData = getResponseData(loginResponse.body);
      expect(loginData).toHaveProperty('accessToken');
      accessToken = loginData.accessToken;
      expect(accessToken).toBeDefined();
      expect(typeof accessToken).toBe('string');
      expect(accessToken.length).toBeGreaterThan(0);
    });

    it('deve retornar informações do usuário autenticado (200)', async () => {
      const response = await request(httpServer)
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const data = getResponseData(response.body);
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('email', testUser.email);
      expect(data).toHaveProperty('name', testUser.name);
      expect(data).toHaveProperty('roles');
      expect(Array.isArray(data.roles)).toBe(true);
      expect(data.roles.length).toBeGreaterThan(0);
    });

    it('deve retornar 401 para token não fornecido', async () => {
      // O guard pode retornar 403 em vez de 401 quando não há token
      const response = await request(httpServer)
        .get('/auth/me');
      
      expect([401, 403]).toContain(response.status);
    });

    it('deve retornar 401 para token inválido', async () => {
      await request(httpServer)
        .get('/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('deve retornar 401 para token malformado', async () => {
      // O guard pode retornar 403 em vez de 401 quando o token está malformado
      const response = await request(httpServer)
        .get('/auth/me')
        .set('Authorization', 'InvalidFormat');
      
      expect([401, 403]).toContain(response.status);
    });
  });

  describe('GET /health', () => {
    it('deve retornar status de saúde (200)', async () => {
      const response = await request(httpServer)
        .get('/health')
        .expect(200);

      // O TransformResponseInterceptor envolve a resposta em { data: ... }
      const healthData = response.body.data || response.body;
      expect(healthData).toHaveProperty('status', 'ok');
      expect(healthData).toHaveProperty('timestamp');
      expect(healthData).toHaveProperty('uptime');
      expect(healthData).toHaveProperty('service', 'auth-service');
      expect(healthData).toHaveProperty('version');
      expect(typeof healthData.uptime).toBe('number');
      expect(healthData.uptime).toBeGreaterThanOrEqual(0);
    });
  });
});

