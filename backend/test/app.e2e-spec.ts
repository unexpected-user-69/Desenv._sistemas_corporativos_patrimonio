process.env.NODE_ENV = 'test';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from './../src/app.module';

/**
 * Testes E2E para AppController
 * 
 * Cobre o endpoint básico da aplicação:
 * - GET / - Hello World
 * 
 * Os testes validam:
 * - ✅ Endpoint básico da aplicação (retornando 200)
 * - ✅ Endpoint público (não requer autenticação)
 */

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Não usar setGlobalPrefix aqui, pois o endpoint raiz '/' não funciona com prefixo
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
  });

  afterAll(async () => {
    if (app) {
      try {
        // Aguardar um pouco para permitir que conexões Redis sejam fechadas adequadamente
        await new Promise(resolve => setTimeout(resolve, 100));
        await Promise.race([
          app.close(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Close timeout')), 10000)
          )
        ]).catch(() => {
          // Ignorar timeout ao fechar
        });
      } catch (error) {
        // Ignorar erros ao fechar (pode ser conexão Redis já fechada)
        console.warn('Erro ao fechar aplicação:', error);
      }
    }
  }, 15000); // Timeout de 15 segundos

  it('/ (GET)', () => {
    return request(httpServer).get('/').expect(200).expect('Hello World!');
  });
});
