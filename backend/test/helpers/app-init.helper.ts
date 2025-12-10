/**
 * Helper para inicialização consistente da aplicação em testes E2E
 * 
 * Garante que a aplicação seja inicializada da mesma forma que em produção,
 * incluindo todas as configurações necessárias (CORS, prefixo global, etc.)
 */

import { INestApplication } from '@nestjs/common';
import * as http from 'http';

/**
 * Configura a aplicação de teste com as mesmas configurações do main.ts
 * 
 * @param app - Aplicação NestJS
 * @returns Servidor HTTP configurado
 */
export async function setupTestApp(app: INestApplication): Promise<http.Server> {
  // Habilitar CORS (igual ao main.ts)
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3101',
      'http://localhost:3002',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Configurar prefixo global v1 (deve vir antes de app.init())
  app.setGlobalPrefix('v1');

  // Inicializar a aplicação
  await app.init();

  // Obter servidor HTTP
  const httpServer = app.getHttpServer() as http.Server;

  // Aguardar um pouco para garantir que a aplicação está totalmente inicializada
  // Isso é importante porque o app.init() pode não ter terminado completamente
  // Aumentar o tempo de espera para garantir que todas as rotas estão registradas
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return httpServer;
}

