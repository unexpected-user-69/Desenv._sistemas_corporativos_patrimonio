process.env.NODE_ENV = 'test';
// Desabilitar rate limiting para testes
process.env.THROTTLE_TTL = '1';
process.env.THROTTLE_LIMIT = '1000';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { HashService } from '../../src/common/services/hash.service';
import { UserRole } from '../../src/users/enums/user-role.enum';
import { setupTestUsers, authenticatedRequest, TestUserTokens } from '../helpers/auth-helper';

/**
 * Testes E2E para Cache Controller
 * 
 * Cobre todos os endpoints do Cache Controller (todos requerem ADMIN):
 * - GET /v1/cache/stats - Obter estatísticas do cache
 * - GET /v1/cache/health - Verificar saúde do cache
 * - GET /v1/cache/keys - Listar chaves do cache
 * - GET /v1/cache/operations - Listar operações recentes
 * - GET /v1/cache/alerts - Listar alertas do cache
 * - GET /v1/cache/config - Obter configuração do cache
 * - GET /v1/cache/key/:key - Obter valor de uma chave
 * - DELETE /v1/cache/key/:key - Remover chave específica
 * - POST /v1/cache/clear - Limpar cache
 * 
 * Os testes validam:
 * - ✅ Cenários de sucesso (retornando 200/201) - apenas ADMIN
 * - ✅ Usa auth-helper para autenticação consistente
 */

describe('Cache (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

  beforeAll(async () => {
    // Configurar USERS_API_URL antes de compilar o módulo
    if (!process.env.USERS_API_URL) {
      process.env.USERS_API_URL = 'http://localhost:3000/v1';
    }

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

    // Atualizar USERS_API_URL com a porta real do servidor
    const address = httpServer.address();
    if (address && typeof address === 'object') {
      const port = address.port;
      process.env.USERS_API_URL = `http://localhost:${port}/v1`;
    } else {
      process.env.USERS_API_URL = process.env.USERS_API_URL || 'http://localhost:3000/v1';
    }

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Configurar usuários de teste
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'cache');
  }, 180000); // Timeout de 3 minutos para beforeAll

  afterAll(async () => {
    await cleanupTestData(dataSource);
    await app.close();
  });

  describe('GET /v1/cache/stats', () => {
    it('deve retornar estatísticas do cache (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/stats',
        tokens,
        UserRole.ADMIN, // GET /cache/stats requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('hits');
      expect(response.body).toHaveProperty('misses');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('hitRate');
      expect(response.body).toHaveProperty('memoryUsage');
      expect(response.body).toHaveProperty('keysCount');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /v1/cache/health', () => {
    it('deve retornar saúde do cache (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/health',
        tokens,
        UserRole.ADMIN, // GET /cache/health requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('memoryUsage');
      expect(response.body).toHaveProperty('connections');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /v1/cache/keys', () => {
    it('deve retornar lista de chaves (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/keys',
        tokens,
        UserRole.ADMIN, // GET /cache/keys requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('keys');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('pattern');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('timestamp');
      expect(Array.isArray(response.body.keys)).toBe(true);
    });

    it('deve filtrar chaves por pattern (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/keys',
        tokens,
        UserRole.ADMIN,
      )
        .query({ pattern: 'user', limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('keys');
      expect(response.body).toHaveProperty('pattern', 'user');
    });
  });

  describe('GET /v1/cache/operations', () => {
    it('deve retornar operações recentes (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/operations',
        tokens,
        UserRole.ADMIN, // GET /cache/operations requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('operations');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('limit');
      expect(response.body).toHaveProperty('timestamp');
      expect(Array.isArray(response.body.operations)).toBe(true);
    });

    it('deve aceitar parâmetro limit (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/operations',
        tokens,
        UserRole.ADMIN,
      )
        .query({ limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('limit', 10);
    });
  });

  describe('GET /v1/cache/alerts', () => {
    it('deve retornar alertas do cache (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/alerts',
        tokens,
        UserRole.ADMIN, // GET /cache/alerts requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('alerts');
      expect(response.body).toHaveProperty('total');
      expect(response.body).toHaveProperty('activeAlerts');
      expect(response.body).toHaveProperty('timestamp');
      expect(Array.isArray(response.body.alerts)).toBe(true);
    });
  });

  describe('GET /v1/cache/config', () => {
    it('deve retornar configuração do cache (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/cache/config',
        tokens,
        UserRole.ADMIN, // GET /cache/config requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('ttl');
      expect(response.body).toHaveProperty('maxSize');
      expect(response.body).toHaveProperty('strategy');
      expect(response.body).toHaveProperty('compression');
      expect(response.body).toHaveProperty('encryption');
      expect(response.body).toHaveProperty('persistence');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /v1/cache/key/:key', () => {
    it('deve retornar valor da chave (200) - ADMIN', async () => {
      const testKey = 'user:123';
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/cache/key/${testKey}`,
        tokens,
        UserRole.ADMIN, // GET /cache/key/:key requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('key', testKey);
      expect(response.body).toHaveProperty('value');
      expect(response.body).toHaveProperty('ttl');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('DELETE /v1/cache/key/:key', () => {
    it('deve remover chave do cache (200) - ADMIN', async () => {
      const testKey = 'test:delete:key';
      const response = await authenticatedRequest(
        httpServer,
        'delete',
        `/v1/cache/key/${testKey}`,
        tokens,
        UserRole.ADMIN, // DELETE /cache/key/:key requer ADMIN
      ).expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('key', testKey);
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /v1/cache/clear', () => {
    it('deve limpar cache (200/201) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/cache/clear',
        tokens,
        UserRole.ADMIN, // POST /cache/clear requer ADMIN
      ).expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('clearedKeys');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela users
    try {
      await queryRunner.query('SELECT 1 FROM users LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS citext;
        CREATE TABLE IF NOT EXISTS users (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name varchar(255) NOT NULL,
          email citext NOT NULL,
          password_hash varchar(255) NOT NULL,
          role varchar(32) NOT NULL DEFAULT 'OPERATOR',
          is_active boolean NOT NULL DEFAULT true,
          avatar_url varchar(500),
          created_at timestamptz NOT NULL DEFAULT NOW(),
          updated_at timestamptz NOT NULL DEFAULT NOW(),
          deleted_at timestamptz,
          version int NOT NULL DEFAULT 1
        );
        CREATE UNIQUE INDEX IF NOT EXISTS uq_users_email ON users(email);
      `);
    }

    // Verificar e criar tabela auth_refresh_tokens
    try {
      await queryRunner.query('SELECT 1 FROM auth_refresh_tokens LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS auth_refresh_tokens (
          id SERIAL PRIMARY KEY,
          user_id uuid NOT NULL,
          token_hash varchar(255) NOT NULL,
          issued_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          expires_at timestamptz NOT NULL,
          revoked_at timestamptz,
          replaced_by_token_id int,
          ip varchar(45),
          user_agent varchar(255),
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_auth_refresh_tokens_user_id ON auth_refresh_tokens(user_id);
        CREATE INDEX IF NOT EXISTS idx_auth_refresh_tokens_expires_at ON auth_refresh_tokens(expires_at);
      `);
    }
  } finally {
    await queryRunner.release();
  }
}

async function cleanupTestData(dataSource: DataSource): Promise<void> {
  try {
    // Limpeza de dados de teste (opcional, pode deixar para análise)
    // Os usuários criados pelo auth-helper serão limpos automaticamente
  } catch (error) {
    // Ignorar erros de limpeza
    console.warn('Erro ao limpar dados de teste:', error);
  }
}

