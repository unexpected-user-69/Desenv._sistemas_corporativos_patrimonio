process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';

/**
 * Testes E2E para Metrics Controller
 * 
 * Cobre todos os 3 endpoints do Metrics Controller (todos públicos):
 * - GET /v1/metrics - Obter métricas do sistema
 * - GET /v1/metrics/health - Verificar saúde do sistema
 * - GET /v1/metrics/logs - Obter logs do sistema
 */

describe('Metrics (e2e)', () => {
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

  describe('GET /v1/metrics', () => {
    it('deve retornar métricas do sistema (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/metrics')
        .expect(200);

      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('requests');
      expect(response.body).toHaveProperty('performance');
      expect(response.body).toHaveProperty('system');
      
      // Verificar estrutura de requests
      expect(response.body.requests).toHaveProperty('total');
      expect(response.body.requests).toHaveProperty('byMethod');
      expect(response.body.requests).toHaveProperty('byStatus');
      
      // Verificar estrutura de performance
      expect(response.body.performance).toHaveProperty('averageResponseTime');
      expect(response.body.performance).toHaveProperty('p95Latency');
      expect(response.body.performance).toHaveProperty('throughput');
      
      // Verificar estrutura de system
      expect(response.body.system).toHaveProperty('memoryUsage');
      expect(response.body.system).toHaveProperty('cpuUsage');
      expect(response.body.system).toHaveProperty('diskUsage');
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/metrics');
      
      expect(response.status).toBe(200);
    });
  });

  describe('GET /v1/metrics/health', () => {
    it('deve retornar saúde do sistema (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/metrics/health')
        .expect(200);

      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('services');
      expect(response.body).toHaveProperty('lastCheck');
      
      // Verificar que status é uma string
      expect(typeof response.body.status).toBe('string');
      
      // Verificar estrutura de services
      expect(Array.isArray(response.body.services)).toBe(true);
      response.body.services.forEach((service: any) => {
        expect(service).toHaveProperty('name');
        expect(service).toHaveProperty('status');
        expect(service).toHaveProperty('responseTime');
        expect(service).toHaveProperty('lastCheck');
      });
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/metrics/health');
      
      expect(response.status).toBe(200);
    });
  });

  describe('GET /v1/metrics/logs', () => {
    it('deve retornar logs do sistema (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/metrics/logs')
        .expect(200);

      expect(response.body).toHaveProperty('logs');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.logs)).toBe(true);
      expect(typeof response.body.total).toBe('number');
      
      // Verificar estrutura de cada log
      if (response.body.logs.length > 0) {
        response.body.logs.forEach((log: any) => {
          expect(log).toHaveProperty('id');
          expect(log).toHaveProperty('level');
          expect(log).toHaveProperty('message');
          expect(log).toHaveProperty('timestamp');
          expect(log).toHaveProperty('context');
        });
      }
    });

    it('deve aceitar parâmetro limit (200)', async () => {
      const response = await request(httpServer)
        .get('/v1/metrics/logs')
        .query({ limit: 5 })
        .expect(200);

      expect(response.body).toHaveProperty('logs');
      expect(Array.isArray(response.body.logs)).toBe(true);
    });

    it('deve funcionar sem autenticação (endpoint público)', async () => {
      const response = await request(httpServer)
        .get('/v1/metrics/logs');
      
      expect(response.status).toBe(200);
    });
  });
});

