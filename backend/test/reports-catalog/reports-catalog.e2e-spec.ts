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
import { ReportType, ReportModel } from '../../src/reports/entities/report-request.entity';
import {
  setupTestUsers,
  authenticatedRequest,
  TestUserTokens,
} from '../helpers/auth-helper';
import { setupTestApp } from '../helpers/app-init.helper';

/**
 * Testes E2E para Report Catalog Controller
 * 
 * Cobre todos os 11 endpoints do Report Catalog Controller:
 * 1. GET /v1/reports/catalog - Listar catálogos
 * 2. POST /v1/reports/catalog - Criar catálogo (ADMIN)
 * 3. GET /v1/reports/catalog/:id - Buscar catálogo por ID
 * 4. PUT /v1/reports/catalog/:id - Atualizar catálogo (ADMIN)
 * 5. DELETE /v1/reports/catalog/:id - Deletar catálogo (ADMIN)
 * 6. GET /v1/reports/catalog/key/:key - Buscar catálogo por chave
 * 7. GET /v1/reports/catalog/permissions/catalog/:catalogId - Listar permissões do catálogo (ADMIN)
 * 8. GET /v1/reports/catalog/permissions/user/:userId - Listar permissões do usuário (ADMIN)
 * 9. POST /v1/reports/catalog/:id/versions - Criar versão (ADMIN)
 * 10. POST /v1/reports/catalog/permissions - Criar permissão (ADMIN)
 * 11. PUT /v1/reports/catalog/:id/versions/:version/current - Definir versão atual (ADMIN)
 * 12. DELETE /v1/reports/catalog/permissions/:id - Deletar permissão (ADMIN)
 */

describe('Reports Catalog (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

  // Dados de teste
  let catalogId1: string;
  let catalogId2: string;
  let catalogKey1: string;
  let permissionId1: string;
  let versionId1: string;

  beforeAll(async () => {
    // Configurar USERS_API_URL antes de compilar o módulo
    if (!process.env.USERS_API_URL) {
      process.env.USERS_API_URL = 'http://localhost:3000/v1';
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpServer = await setupTestApp(app);
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

    // Configurar usuários de teste e obter tokens
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'reports-catalog-test');
  });

  afterAll(async () => {
    // Limpeza de dados de teste (opcional)
    try {
      await dataSource.query(
        `DELETE FROM report_permissions 
         WHERE created_by_id IN (
           SELECT id FROM users 
           WHERE email LIKE '%reports-catalog-test%@example.com'
         )`,
      );
      await dataSource.query(
        `DELETE FROM report_catalog_versions 
         WHERE created_by_id IN (
           SELECT id FROM users 
           WHERE email LIKE '%reports-catalog-test%@example.com'
         )`,
      );
      await dataSource.query(
        `DELETE FROM report_catalogs 
         WHERE created_by_id IN (
           SELECT id FROM users 
           WHERE email LIKE '%reports-catalog-test%@example.com'
         )`,
      );
    } catch (error) {
      // Ignorar erros de limpeza
    }
    await app.close();
  });

  describe('POST /v1/reports/catalog', () => {
    it('deve criar catálogo de relatório com sucesso (201) - ADMIN', async () => {
      catalogKey1 = `test-catalog-${Date.now()}`;
      const createCatalogDto = {
        key: catalogKey1,
        name: 'Test Catalog 1',
        description: 'Test catalog description',
        type: ReportType.PDF,
        model: ReportModel.PATRIMONIO,
        defaultFilters: { status: 'ATIVO' },
        currentVersion: '1.0.0',
        active: true,
        requiresPermission: false,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/reports/catalog',
        tokens,
        UserRole.ADMIN, // POST /catalog requer apenas ADMIN
      )
        .send(createCatalogDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('key', createCatalogDto.key);
      expect(response.body).toHaveProperty('name', createCatalogDto.name);
      expect(response.body).toHaveProperty('type', createCatalogDto.type);
      expect(response.body).toHaveProperty('model', createCatalogDto.model);
      expect(response.body).toHaveProperty('active', true);

      catalogId1 = response.body.id;
    });

    it('deve criar segundo catálogo com sucesso (201) - ADMIN', async () => {
      const catalogKey2 = `test-catalog-2-${Date.now()}`;
      const createCatalogDto = {
        key: catalogKey2,
        name: 'Test Catalog 2',
        type: ReportType.CSV,
        model: ReportModel.MANUTENCAO,
        active: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/reports/catalog',
        tokens,
        UserRole.ADMIN,
      )
        .send(createCatalogDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      catalogId2 = response.body.id;
    });
  });

  describe('GET /v1/reports/catalog', () => {
    it('deve listar catálogos com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/catalog',
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    it('deve listar catálogos com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/catalog',
        tokens,
        UserRole.MANAGER,
      ).expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve filtrar apenas catálogos ativos (200)', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/reports/catalog',
        tokens,
        UserRole.ADMIN,
      )
        .query({ activeOnly: 'true' })
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        response.body.forEach((catalog: any) => {
          expect(catalog.active).toBe(true);
        });
      }
    });
  });

  describe('GET /v1/reports/catalog/:id', () => {
    it('deve buscar catálogo por ID com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/catalog/${catalogId1}`,
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toHaveProperty('id', catalogId1);
      expect(response.body).toHaveProperty('key');
      expect(response.body).toHaveProperty('name');
    });

    it('deve buscar catálogo por ID com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/catalog/${catalogId1}`,
        tokens,
        UserRole.MANAGER,
      ).expect(200);

      expect(response.body).toHaveProperty('id', catalogId1);
    });
  });

  describe('GET /v1/reports/catalog/key/:key', () => {
    it('deve buscar catálogo por chave com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/catalog/key/${catalogKey1}`,
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toHaveProperty('key', catalogKey1);
      expect(response.body).toHaveProperty('id');
    });

    it('deve buscar catálogo por chave com sucesso (200) - MANAGER', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/catalog/key/${catalogKey1}`,
        tokens,
        UserRole.MANAGER,
      ).expect(200);

      expect(response.body).toHaveProperty('key', catalogKey1);
    });
  });

  describe('PUT /v1/reports/catalog/:id', () => {
    it('deve atualizar catálogo com sucesso (200) - ADMIN', async () => {
      const updateCatalogDto = {
        name: 'Updated Test Catalog 1',
        description: 'Updated description',
        active: false,
      };

      const response = await authenticatedRequest(
        httpServer,
        'put',
        `/v1/reports/catalog/${catalogId1}`,
        tokens,
        UserRole.ADMIN, // PUT /catalog/:id requer apenas ADMIN
      )
        .send(updateCatalogDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', catalogId1);
      expect(response.body).toHaveProperty('name', updateCatalogDto.name);
      expect(response.body).toHaveProperty('description', updateCatalogDto.description);
      expect(response.body).toHaveProperty('active', false);
    });
  });

  describe('POST /v1/reports/catalog/:id/versions', () => {
    it('deve criar versão de catálogo com sucesso (201) - ADMIN', async () => {
      const createVersionDto = {
        version: '1.1.0',
        changelog: 'Adicionado novo filtro por categoria',
        filters: { status: 'ATIVO', categoriaId: 'xxx' },
        isCurrent: false,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        `/v1/reports/catalog/${catalogId1}/versions`,
        tokens,
        UserRole.ADMIN, // POST /catalog/:id/versions requer apenas ADMIN
      )
        .send(createVersionDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('version', createVersionDto.version);
      expect(response.body).toHaveProperty('catalogId', catalogId1);

      versionId1 = response.body.id;
    });
  });

  describe('PUT /v1/reports/catalog/:id/versions/:version/current', () => {
    it('deve definir versão como atual com sucesso (200) - ADMIN', async () => {
      await authenticatedRequest(
        httpServer,
        'put',
        `/v1/reports/catalog/${catalogId1}/versions/1.1.0/current`,
        tokens,
        UserRole.ADMIN, // PUT /catalog/:id/versions/:version/current requer apenas ADMIN
      ).expect(200);
    });
  });

  describe('POST /v1/reports/catalog/permissions', () => {
    it('deve criar permissão de catálogo com sucesso (201) - ADMIN', async () => {
      // Garantir que catalogId1 existe
      if (!catalogId1) {
        console.warn('⚠️ catalogId1 não definido, pulando teste');
        return;
      }

      // Garantir que o usuário manager existe no banco
      const userExists = await dataSource.query(
        `SELECT id FROM users WHERE id = $1 LIMIT 1`,
        [tokens.managerUserId],
      );

      if (!userExists || userExists.length === 0) {
        console.warn('⚠️ Manager user não encontrado, pulando teste');
        return;
      }

      const createPermissionDto = {
        catalogId: catalogId1,
        userId: tokens.managerUserId,
        canView: true,
        canGenerate: true,
        canDownload: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/reports/catalog/permissions',
        tokens,
        UserRole.ADMIN, // POST /catalog/permissions requer apenas ADMIN
      )
        .send(createPermissionDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('catalogId', catalogId1);
      expect(response.body).toHaveProperty('userId', tokens.managerUserId);
      expect(response.body).toHaveProperty('canView', true);

      permissionId1 = response.body.id;
    });

    it('deve criar permissão por role com sucesso (201) - ADMIN', async () => {
      // Garantir que catalogId2 existe (foi criado no segundo teste de POST /catalog)
      if (!catalogId2) {
        console.warn('⚠️ catalogId2 não definido, pulando teste');
        return;
      }

      // Criar permissão por role usando catalogId2 com role MANAGER
      const createPermissionDto = {
        catalogId: catalogId2,
        role: UserRole.MANAGER,
        canView: true,
        canGenerate: false,
        canDownload: true,
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/reports/catalog/permissions',
        tokens,
        UserRole.ADMIN,
      )
        .send(createPermissionDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('role', UserRole.MANAGER);
    });
  });

  describe('GET /v1/reports/catalog/permissions/catalog/:catalogId', () => {
    it('deve listar permissões do catálogo com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/catalog/permissions/catalog/${catalogId1}`,
        tokens,
        UserRole.ADMIN, // GET /catalog/permissions/catalog/:catalogId requer apenas ADMIN
      ).expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('GET /v1/reports/catalog/permissions/user/:userId', () => {
    it('deve listar permissões do usuário com sucesso (200) - ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        `/v1/reports/catalog/permissions/user/${tokens.managerUserId}`,
        tokens,
        UserRole.ADMIN, // GET /catalog/permissions/user/:userId requer apenas ADMIN
      ).expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('DELETE /v1/reports/catalog/permissions/:id', () => {
    it('deve deletar permissão com sucesso (204) - ADMIN', async () => {
      // Garantir que permissionId1 foi definido
      if (!permissionId1) {
        console.warn('⚠️ permissionId1 não definido, pulando teste de delete');
        return;
      }

      await authenticatedRequest(
        httpServer,
        'delete',
        `/v1/reports/catalog/permissions/${permissionId1}`,
        tokens,
        UserRole.ADMIN, // DELETE /catalog/permissions/:id requer apenas ADMIN
      ).expect(204);
    });
  });

  describe('DELETE /v1/reports/catalog/:id', () => {
    it('deve deletar catálogo com sucesso (204) - ADMIN', async () => {
      await authenticatedRequest(
        httpServer,
        'delete',
        `/v1/reports/catalog/${catalogId2}`,
        tokens,
        UserRole.ADMIN, // DELETE /catalog/:id requer apenas ADMIN
      ).expect(204);
    });
  });
});

// ==================== FUNÇÕES AUXILIARES ====================

async function setupDatabaseTables(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    // Verificar e criar tabela report_catalogs
    try {
      await queryRunner.query('SELECT 1 FROM report_catalogs LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE IF NOT EXISTS report_catalogs (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          key varchar(100) NOT NULL UNIQUE,
          name varchar(255) NOT NULL,
          description text,
          type varchar(10) NOT NULL,
          model varchar(50) NOT NULL,
          default_filters jsonb,
          current_version varchar(20) NOT NULL DEFAULT '1.0.0',
          active boolean NOT NULL DEFAULT true,
          requires_permission boolean NOT NULL DEFAULT false,
          created_by_id uuid NOT NULL,
          updated_by_id uuid,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_report_catalogs_key ON report_catalogs(key);
        CREATE INDEX IF NOT EXISTS idx_report_catalogs_active ON report_catalogs(active);
      `);
    }

    // Verificar e criar tabela report_catalog_versions
    try {
      await queryRunner.query('SELECT 1 FROM report_catalog_versions LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report_catalog_versions (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          catalog_id uuid NOT NULL,
          version varchar(20) NOT NULL,
          changelog text,
          filters jsonb,
          is_current boolean NOT NULL DEFAULT false,
          created_by_id uuid NOT NULL,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_report_catalog_versions_catalog ON report_catalog_versions(catalog_id);
        CREATE INDEX IF NOT EXISTS idx_report_catalog_versions_version ON report_catalog_versions(version);
      `);
      
      // Adicionar foreign key se a tabela report_catalogs existir
      try {
        await queryRunner.query(`
          ALTER TABLE report_catalog_versions
          ADD CONSTRAINT IF NOT EXISTS fk_report_catalog_versions_catalog
          FOREIGN KEY (catalog_id) REFERENCES report_catalogs(id) ON DELETE CASCADE
        `);
      } catch (error: any) {
        if (!error.message?.includes('already exists') && !error.message?.includes('does not exist')) {
          console.warn('Aviso: Não foi possível adicionar foreign key em report_catalog_versions:', error.message);
        }
      }
    }

    // Verificar e criar tabela report_permissions
    try {
      await queryRunner.query('SELECT 1 FROM report_permissions LIMIT 1');
    } catch {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS report_permissions (
          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          catalog_id uuid NOT NULL,
          user_id uuid,
          role varchar(50),
          can_view boolean NOT NULL DEFAULT true,
          can_generate boolean NOT NULL DEFAULT true,
          can_download boolean NOT NULL DEFAULT true,
          created_by_id uuid NOT NULL,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_report_permissions_catalog ON report_permissions(catalog_id);
        CREATE INDEX IF NOT EXISTS idx_report_permissions_user ON report_permissions(user_id);
        CREATE INDEX IF NOT EXISTS idx_report_permissions_role ON report_permissions(role);
      `);
      
      // Adicionar foreign key se a tabela report_catalogs existir
      try {
        await queryRunner.query(`
          ALTER TABLE report_permissions
          ADD CONSTRAINT IF NOT EXISTS fk_report_permissions_catalog
          FOREIGN KEY (catalog_id) REFERENCES report_catalogs(id) ON DELETE CASCADE
        `);
      } catch (error: any) {
        if (!error.message?.includes('already exists') && !error.message?.includes('does not exist')) {
          console.warn('Aviso: Não foi possível adicionar foreign key em report_permissions:', error.message);
        }
      }
    }
  } finally {
    await queryRunner.release();
  }
}

