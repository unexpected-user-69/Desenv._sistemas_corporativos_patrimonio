// Habilitar auto-auth para testes ANTES de importar módulos
process.env.DEV_AUTO_AUTH = 'true';
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
import { ReportType, ReportModel } from '../../src/reports/entities/report-request.entity';
import { randomUUID } from 'crypto';

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

// Função auxiliar para delays entre testes (evitar rate limiting)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('Reports Catalog (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  
  // Usuários de teste
  let adminUserId: string;
  let adminEmail: string;
  let adminPassword: string;
  let adminAccessToken: string;
  
  let teacherUserId: string;
  let teacherEmail: string;
  let teacherPassword: string;
  let teacherAccessToken: string;
  
  let studentUserId: string;
  let studentEmail: string;
  let studentPassword: string;
  let studentAccessToken: string;

  // Dados de teste
  let catalogId1: string;
  let catalogId2: string;
  let catalogKey1: string;
  let permissionId1: string;
  let versionId1: string;

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

    // Criar tabelas se não existirem
    await setupDatabaseTables(dataSource);

    // Criar usuários de teste (ADMIN, TEACHER, STUDENT)
    const timestamp = Date.now();
    
    // ADMIN
    adminUserId = randomUUID();
    adminEmail = `admin-reports-catalog-test-${timestamp}@example.com`;
    adminPassword = 'AdminPassword123!';
    await createTestUser(dataSource, hashService, {
      id: adminUserId,
      email: adminEmail,
      password: adminPassword,
      name: 'Admin Reports Catalog Test',
      role: UserRole.ADMIN,
      isActive: true,
    });
    
    const adminLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: adminEmail, password: adminPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    adminAccessToken = adminLoginResponse.body.accessToken;

    // TEACHER
    teacherUserId = randomUUID();
    teacherEmail = `teacher-reports-catalog-test-${timestamp}@example.com`;
    teacherPassword = 'TeacherPassword123!';
    await createTestUser(dataSource, hashService, {
      id: teacherUserId,
      email: teacherEmail,
      password: teacherPassword,
      name: 'Teacher Reports Catalog Test',
      role: UserRole.TEACHER,
      isActive: true,
    });
    
    await delay(1000);
    const teacherLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: teacherEmail, password: teacherPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    teacherAccessToken = teacherLoginResponse.body.accessToken;

    // STUDENT
    studentUserId = randomUUID();
    studentEmail = `student-reports-catalog-test-${timestamp}@example.com`;
    studentPassword = 'StudentPassword123!';
    await createTestUser(dataSource, hashService, {
      id: studentUserId,
      email: studentEmail,
      password: studentPassword,
      name: 'Student Reports Catalog Test',
      role: UserRole.STUDENT,
      isActive: true,
    });
    
    await delay(1000);
    const studentLoginResponse = await request(httpServer)
      .post('/v1/auth/login')
      .send({ email: studentEmail, password: studentPassword })
      .expect((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(`Expected 200 or 201, got ${res.status}`);
        }
      });
    studentAccessToken = studentLoginResponse.body.accessToken;
  });

  afterAll(async () => {
    await cleanupTestData(dataSource);
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

      const response = await request(httpServer)
        .post('/v1/reports/catalog')
        .set('Authorization', `Bearer ${adminAccessToken}`)
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
      await delay(1000);
      const catalogKey2 = `test-catalog-2-${Date.now()}`;
      const createCatalogDto = {
        key: catalogKey2,
        name: 'Test Catalog 2',
        type: ReportType.CSV,
        model: ReportModel.MANUTENCAO,
        active: true,
      };

      const response = await request(httpServer)
        .post('/v1/reports/catalog')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(createCatalogDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      catalogId2 = response.body.id;
    });

    it('deve retornar 400 para dados inválidos (key faltando)', async () => {
      await delay(1000);
      const invalidDto = {
        name: 'Test Catalog',
        type: ReportType.PDF,
        model: ReportModel.PATRIMONIO,
      };

      await request(httpServer)
        .post('/v1/reports/catalog')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 400 para dados inválidos (tipo inválido)', async () => {
      await delay(1000);
      const invalidDto = {
        key: `test-invalid-${Date.now()}`,
        name: 'Test Catalog',
        type: 'invalid',
        model: ReportModel.PATRIMONIO,
      };

      await request(httpServer)
        .post('/v1/reports/catalog')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 409 para chave duplicada', async () => {
      await delay(1000);
      const duplicateDto = {
        key: catalogKey1,
        name: 'Duplicate Catalog',
        type: ReportType.PDF,
        model: ReportModel.PATRIMONIO,
      };

      await request(httpServer)
        .post('/v1/reports/catalog')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(duplicateDto)
        .expect(409);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await delay(1000);
      const createCatalogDto = {
        key: `test-teacher-${Date.now()}`,
        name: 'Test Catalog Teacher',
        type: ReportType.PDF,
        model: ReportModel.PATRIMONIO,
      };

      await request(httpServer)
        .post('/v1/reports/catalog')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .send(createCatalogDto)
        .expect(403);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await delay(1000);
      const createCatalogDto = {
        key: `test-student-${Date.now()}`,
        name: 'Test Catalog Student',
        type: ReportType.PDF,
        model: ReportModel.PATRIMONIO,
      };

      await request(httpServer)
        .post('/v1/reports/catalog')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .send(createCatalogDto)
        .expect(403);
    });
  });

  describe('GET /v1/reports/catalog', () => {
    it('deve listar catálogos com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/catalog')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    it('deve listar catálogos com sucesso (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/catalog')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve filtrar apenas catálogos ativos (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/reports/catalog')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .query({ activeOnly: 'true' })
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        response.body.forEach((catalog: any) => {
          expect(catalog.active).toBe(true);
        });
      }
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get('/v1/reports/catalog')
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/reports/catalog/:id', () => {
    it('deve buscar catálogo por ID com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', catalogId1);
      expect(response.body).toHaveProperty('key');
      expect(response.body).toHaveProperty('name');
    });

    it('deve buscar catálogo por ID com sucesso (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', catalogId1);
    });

    it('deve retornar 404 para catálogo não encontrado', async () => {
      const nonExistentId = randomUUID();
      await request(httpServer)
        .get(`/v1/reports/catalog/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 400 para UUID inválido', async () => {
      await request(httpServer)
        .get('/v1/reports/catalog/invalid-uuid')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(400);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/reports/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/reports/catalog/key/:key', () => {
    it('deve buscar catálogo por chave com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/key/${catalogKey1}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('key', catalogKey1);
      expect(response.body).toHaveProperty('id');
    });

    it('deve buscar catálogo por chave com sucesso (200) - TEACHER', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/key/${catalogKey1}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('key', catalogKey1);
    });

    it('deve retornar 404 para chave não encontrada', async () => {
      await request(httpServer)
        .get('/v1/reports/catalog/key/non-existent-key')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 403 para STUDENT (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/reports/catalog/key/${catalogKey1}`)
        .set('Authorization', `Bearer ${studentAccessToken}`)
        .expect(403);
    });
  });

  describe('PUT /v1/reports/catalog/:id', () => {
    it('deve atualizar catálogo com sucesso (200) - ADMIN', async () => {
      await delay(1000);
      const updateCatalogDto = {
        name: 'Updated Test Catalog 1',
        description: 'Updated description',
        active: false,
      };

      const response = await request(httpServer)
        .put(`/v1/reports/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateCatalogDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', catalogId1);
      expect(response.body).toHaveProperty('name', updateCatalogDto.name);
      expect(response.body).toHaveProperty('description', updateCatalogDto.description);
      expect(response.body).toHaveProperty('active', false);
    });

    it('deve retornar 404 para catálogo não encontrado', async () => {
      await delay(1000);
      const nonExistentId = randomUUID();
      const updateCatalogDto = {
        name: 'Updated Name',
      };

      await request(httpServer)
        .put(`/v1/reports/catalog/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateCatalogDto)
        .expect(404);
    });

    it('deve retornar 400 para UUID inválido', async () => {
      await delay(1000);
      const updateCatalogDto = {
        name: 'Updated Name',
      };

      await request(httpServer)
        .put('/v1/reports/catalog/invalid-uuid')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(updateCatalogDto)
        .expect(400);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await delay(1000);
      const updateCatalogDto = {
        name: 'Updated Name',
      };

      await request(httpServer)
        .put(`/v1/reports/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .send(updateCatalogDto)
        .expect(403);
    });
  });

  describe('POST /v1/reports/catalog/:id/versions', () => {
    it('deve criar versão de catálogo com sucesso (201) - ADMIN', async () => {
      await delay(1000);
      const createVersionDto = {
        version: '1.1.0',
        changelog: 'Adicionado novo filtro por categoria',
        filters: { status: 'ATIVO', categoriaId: 'xxx' },
        isCurrent: false,
      };

      const response = await request(httpServer)
        .post(`/v1/reports/catalog/${catalogId1}/versions`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(createVersionDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('version', createVersionDto.version);
      expect(response.body).toHaveProperty('catalogId', catalogId1);

      versionId1 = response.body.id;
    });

    it('deve retornar 404 para catálogo não encontrado', async () => {
      await delay(1000);
      const nonExistentId = randomUUID();
      const createVersionDto = {
        version: '1.0.0',
      };

      await request(httpServer)
        .post(`/v1/reports/catalog/${nonExistentId}/versions`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(createVersionDto)
        .expect(404);
    });

    it('deve retornar 400 para dados inválidos (version faltando)', async () => {
      await delay(1000);
      const invalidDto = {
        changelog: 'Test changelog',
      };

      await request(httpServer)
        .post(`/v1/reports/catalog/${catalogId1}/versions`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await delay(1000);
      const createVersionDto = {
        version: '1.2.0',
      };

      await request(httpServer)
        .post(`/v1/reports/catalog/${catalogId1}/versions`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .send(createVersionDto)
        .expect(403);
    });
  });

  describe('PUT /v1/reports/catalog/:id/versions/:version/current', () => {
    it('deve definir versão como atual com sucesso (200) - ADMIN', async () => {
      await delay(1000);
      await request(httpServer)
        .put(`/v1/reports/catalog/${catalogId1}/versions/1.1.0/current`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);
    });

    it('deve retornar 404 para catálogo não encontrado', async () => {
      await delay(1000);
      const nonExistentId = randomUUID();
      await request(httpServer)
        .put(`/v1/reports/catalog/${nonExistentId}/versions/1.0.0/current`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 404 para versão não encontrada', async () => {
      await delay(1000);
      await request(httpServer)
        .put(`/v1/reports/catalog/${catalogId1}/versions/999.999.999/current`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await delay(1000);
      await request(httpServer)
        .put(`/v1/reports/catalog/${catalogId1}/versions/1.1.0/current`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('POST /v1/reports/catalog/permissions', () => {
    it('deve criar permissão de catálogo com sucesso (201) - ADMIN', async () => {
      await delay(1000);
      const createPermissionDto = {
        catalogId: catalogId1,
        userId: teacherUserId,
        canView: true,
        canGenerate: true,
        canDownload: true,
      };

      const response = await request(httpServer)
        .post('/v1/reports/catalog/permissions')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(createPermissionDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('catalogId', catalogId1);
      expect(response.body).toHaveProperty('userId', teacherUserId);
      expect(response.body).toHaveProperty('canView', true);

      permissionId1 = response.body.id;
    });

    it('deve criar permissão por role com sucesso (201) - ADMIN', async () => {
      await delay(1000);
      const createPermissionDto = {
        catalogId: catalogId1,
        role: UserRole.TEACHER,
        canView: true,
        canGenerate: false,
        canDownload: true,
      };

      const response = await request(httpServer)
        .post('/v1/reports/catalog/permissions')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(createPermissionDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('role', UserRole.TEACHER);
    });

    it('deve retornar 400 para dados inválidos (catalogId faltando)', async () => {
      await delay(1000);
      const invalidDto = {
        userId: teacherUserId,
        canView: true,
      };

      await request(httpServer)
        .post('/v1/reports/catalog/permissions')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 400 para UUID inválido (catalogId)', async () => {
      await delay(1000);
      const invalidDto = {
        catalogId: 'invalid-uuid',
        userId: teacherUserId,
      };

      await request(httpServer)
        .post('/v1/reports/catalog/permissions')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await delay(1000);
      const createPermissionDto = {
        catalogId: catalogId1,
        userId: studentUserId,
      };

      await request(httpServer)
        .post('/v1/reports/catalog/permissions')
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .send(createPermissionDto)
        .expect(403);
    });
  });

  describe('GET /v1/reports/catalog/permissions/catalog/:catalogId', () => {
    it('deve listar permissões do catálogo com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/permissions/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    it('deve retornar 200 com array vazio para catálogo sem permissões', async () => {
      // O endpoint retorna 200 com array vazio quando não há permissões
      // Isso é diferente de outros endpoints que retornam 404 quando o recurso não existe
      const nonExistentId = randomUUID();
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/permissions/catalog/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      // Deve retornar array vazio quando não há permissões para o catálogo
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/reports/catalog/permissions/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('GET /v1/reports/catalog/permissions/user/:userId', () => {
    it('deve listar permissões do usuário com sucesso (200) - ADMIN', async () => {
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/permissions/user/${teacherUserId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve retornar 200 com array vazio para usuário sem permissões', async () => {
      // O endpoint retorna 200 com array vazio quando não há permissões
      // Isso é diferente de outros endpoints que retornam 404 quando o recurso não existe
      const nonExistentId = randomUUID();
      const response = await request(httpServer)
        .get(`/v1/reports/catalog/permissions/user/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(200);

      // Deve retornar array vazio quando não há permissões para o usuário
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await request(httpServer)
        .get(`/v1/reports/catalog/permissions/user/${teacherUserId}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('DELETE /v1/reports/catalog/permissions/:id', () => {
    it('deve deletar permissão com sucesso (204) - ADMIN', async () => {
      await delay(1000);
      await request(httpServer)
        .delete(`/v1/reports/catalog/permissions/${permissionId1}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(204);
    });

    it('deve retornar 404 para permissão não encontrada', async () => {
      await delay(1000);
      const nonExistentId = randomUUID();
      await request(httpServer)
        .delete(`/v1/reports/catalog/permissions/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await delay(1000);
      // Criar uma nova permissão para teste
      const createResponse = await request(httpServer)
        .post('/v1/reports/catalog/permissions')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send({
          catalogId: catalogId1,
          userId: studentUserId,
        })
        .expect(201);

      const testPermissionId = createResponse.body.id;

      await request(httpServer)
        .delete(`/v1/reports/catalog/permissions/${testPermissionId}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
    });
  });

  describe('DELETE /v1/reports/catalog/:id', () => {
    it('deve deletar catálogo com sucesso (204) - ADMIN', async () => {
      await delay(1000);
      await request(httpServer)
        .delete(`/v1/reports/catalog/${catalogId2}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(204);
    });

    it('deve retornar 404 para catálogo não encontrado', async () => {
      await delay(1000);
      const nonExistentId = randomUUID();
      await request(httpServer)
        .delete(`/v1/reports/catalog/${nonExistentId}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(404);
    });

    it('deve retornar 403 para TEACHER (sem permissão)', async () => {
      await delay(1000);
      await request(httpServer)
        .delete(`/v1/reports/catalog/${catalogId1}`)
        .set('Authorization', `Bearer ${teacherAccessToken}`)
        .expect(403);
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
          role varchar(32) NOT NULL DEFAULT 'STUDENT',
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
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (catalog_id) REFERENCES report_catalogs(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_report_catalog_versions_catalog ON report_catalog_versions(catalog_id);
        CREATE INDEX IF NOT EXISTS idx_report_catalog_versions_version ON report_catalog_versions(version);
      `);
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
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (catalog_id) REFERENCES report_catalogs(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_report_permissions_catalog ON report_permissions(catalog_id);
        CREATE INDEX IF NOT EXISTS idx_report_permissions_user ON report_permissions(user_id);
        CREATE INDEX IF NOT EXISTS idx_report_permissions_role ON report_permissions(role);
        CREATE UNIQUE INDEX IF NOT EXISTS idx_report_permissions_unique ON report_permissions(catalog_id, user_id, role);
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

interface CreateTestUserParams {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive?: boolean;
}

async function createTestUser(
  dataSource: DataSource,
  hashService: HashService,
  params: CreateTestUserParams,
): Promise<void> {
  const { id, email, password, name, role, isActive = true } = params;

  try {
    const passwordHash = await hashService.hash(password);

    await dataSource.query(
      `INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       ON CONFLICT (email) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           is_active = EXCLUDED.is_active,
           updated_at = NOW()`,
      [id, name, email, passwordHash, role, isActive],
    );
  } catch (error) {
    console.error('Erro ao criar usuário de teste:', error);
    throw error;
  }
}

async function cleanupTestData(dataSource: DataSource): Promise<void> {
  try {
    // Limpar permissões de teste
    await dataSource.query(
      `DELETE FROM report_permissions 
       WHERE created_by_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%reports-catalog-test%@example.com'
       )`,
    );

    // Limpar versões de teste
    await dataSource.query(
      `DELETE FROM report_catalog_versions 
       WHERE created_by_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%reports-catalog-test%@example.com'
       )`,
    );

    // Limpar catálogos de teste
    await dataSource.query(
      `DELETE FROM report_catalogs 
       WHERE created_by_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%reports-catalog-test%@example.com'
       )`,
    );

    // Limpar refresh tokens de teste
    await dataSource.query(
      `DELETE FROM auth_refresh_tokens 
       WHERE user_id IN (
         SELECT id FROM users 
         WHERE email LIKE '%@example.com' 
         AND (email LIKE '%reports-catalog-test%')
       )`,
    );

    // Limpar usuários de teste
    await dataSource.query(
      `DELETE FROM users 
       WHERE email LIKE '%@example.com' 
       AND (email LIKE '%reports-catalog-test%')`,
    );
  } catch (error) {
    // Ignorar erros de limpeza
    console.warn('Erro ao limpar dados de teste:', error);
  }
}

