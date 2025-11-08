// Habilitar auto-auth para testes ANTES de importar módulos
process.env.DEV_AUTO_AUTH = 'true';
process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';

/**
 * Testes E2E para Enums Controller
 * 
 * Cobre todos os 5 endpoints do Enums Controller (todos públicos):
 * - GET /v1/enums/categorias - Listar categorias de patrimônio
 * - GET /v1/enums/status - Listar status de patrimônio
 * - GET /v1/enums/roles - Listar roles de usuário
 * - GET /v1/enums/campos-ordenacao - Listar campos de ordenação
 * - GET /v1/enums/direcoes-ordenacao - Listar direções de ordenação
 */

describe('Enums (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /v1/enums/categorias', () => {
    it('deve retornar lista de categorias (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/categorias')
        .expect(200);

      expect(response.body).toHaveProperty('categorias');
      expect(Array.isArray(response.body.categorias)).toBe(true);
      expect(response.body.categorias.length).toBeGreaterThan(0);
      
      // Verificar estrutura de cada categoria
      response.body.categorias.forEach((categoria: any) => {
        expect(categoria).toHaveProperty('value');
        expect(categoria).toHaveProperty('label');
        expect(categoria).toHaveProperty('description');
        expect(categoria).toHaveProperty('icon');
        expect(categoria).toHaveProperty('color');
        expect(typeof categoria.value).toBe('string');
        expect(typeof categoria.label).toBe('string');
      });
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/categorias');
      
      expect(response.status).toBe(200);
    });
  });

  describe('GET /v1/enums/status', () => {
    it('deve retornar lista de status (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/status')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(Array.isArray(response.body.status)).toBe(true);
      expect(response.body.status.length).toBeGreaterThan(0);
      
      // Verificar estrutura de cada status
      response.body.status.forEach((status: any) => {
        expect(status).toHaveProperty('value');
        expect(status).toHaveProperty('label');
        expect(status).toHaveProperty('description');
        expect(status).toHaveProperty('color');
        expect(status).toHaveProperty('badge');
        expect(typeof status.value).toBe('string');
        expect(typeof status.label).toBe('string');
      });
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/status');
      
      expect(response.status).toBe(200);
    });
  });

  describe('GET /v1/enums/roles', () => {
    it('deve retornar lista de roles (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/roles')
        .expect(200);

      expect(response.body).toHaveProperty('roles');
      expect(Array.isArray(response.body.roles)).toBe(true);
      expect(response.body.roles.length).toBeGreaterThan(0);
      
      // Verificar estrutura de cada role
      response.body.roles.forEach((role: any) => {
        expect(role).toHaveProperty('value');
        expect(role).toHaveProperty('label');
        expect(role).toHaveProperty('description');
        expect(role).toHaveProperty('permissions');
        expect(role).toHaveProperty('color');
        expect(Array.isArray(role.permissions)).toBe(true);
        expect(typeof role.value).toBe('string');
        expect(typeof role.label).toBe('string');
      });
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/roles');
      
      expect(response.status).toBe(200);
    });
  });

  describe('GET /v1/enums/campos-ordenacao', () => {
    it('deve retornar campos de ordenação (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/campos-ordenacao')
        .expect(200);

      expect(response.body).toHaveProperty('patrimonio');
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.patrimonio)).toBe(true);
      expect(Array.isArray(response.body.users)).toBe(true);
      
      // Verificar estrutura dos campos de patrimônio
      response.body.patrimonio.forEach((campo: any) => {
        expect(campo).toHaveProperty('value');
        expect(campo).toHaveProperty('label');
        expect(typeof campo.value).toBe('string');
        expect(typeof campo.label).toBe('string');
      });
      
      // Verificar estrutura dos campos de usuários
      response.body.users.forEach((campo: any) => {
        expect(campo).toHaveProperty('value');
        expect(campo).toHaveProperty('label');
        expect(typeof campo.value).toBe('string');
        expect(typeof campo.label).toBe('string');
      });
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/campos-ordenacao');
      
      expect(response.status).toBe(200);
    });
  });

  describe('GET /v1/enums/direcoes-ordenacao', () => {
    it('deve retornar direções de ordenação (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/direcoes-ordenacao')
        .expect(200);

      expect(response.body).toHaveProperty('direcoes');
      expect(Array.isArray(response.body.direcoes)).toBe(true);
      expect(response.body.direcoes.length).toBeGreaterThan(0);
      
      // Verificar estrutura de cada direção
      response.body.direcoes.forEach((direcao: any) => {
        expect(direcao).toHaveProperty('value');
        expect(direcao).toHaveProperty('label');
        expect(typeof direcao.value).toBe('string');
        expect(typeof direcao.label).toBe('string');
      });
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/enums/direcoes-ordenacao');
      
      expect(response.status).toBe(200);
    });
  });
});

