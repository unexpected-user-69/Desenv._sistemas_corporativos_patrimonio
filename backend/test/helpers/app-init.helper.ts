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

  // Inicializar a aplicação e abrir uma porta TCP efêmera.
  // Sem o listen(), o HttpService/axios não consegue alcançar os endpoints
  // (ex.: /users/validate) e o login retorna 401 nos testes.
  await app.init();
  await app.listen(0);

  // Obter servidor HTTP e propagar a porta detectada para outras configs que
  // dependem de variáveis de ambiente (ex.: USERS_API_URL nos helpers de teste).
  const httpServer = app.getHttpServer() as http.Server;
  const address = httpServer.address();
  if (address && typeof address === 'object' && address.port) {
    const port = address.port.toString();
    if (!process.env.PORT) process.env.PORT = port;
    if (!process.env.BACKEND_PORT) process.env.BACKEND_PORT = port;
    if (!process.env.APP_PORT) process.env.APP_PORT = port;
    // Propagar também para PATRIMONIO_SERVICE_URL para que HttpClients locais funcionem nos e2e
    process.env.PATRIMONIO_SERVICE_URL = `http://localhost:${port}/v1`;
  }

  // Aguardar um pouco para garantir que a aplicação está totalmente inicializada
  // Isso é importante porque o app.init() pode não ter terminado completamente
  // Aumentar o tempo de espera para garantir que todas as rotas estão registradas
  // Com supertest, o servidor pode não estar "listening" em uma porta TCP real,
  // mas ainda pode receber requisições através do supertest
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return httpServer;
}

