// Polyfill para crypto (necessário para TypeORM)
import { webcrypto } from 'crypto';
(global as any).crypto = webcrypto;

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('');

  // ValidationPipe, Interceptors e Filters estão configurados no AppModule
  // via APP_PIPE, APP_INTERCEPTOR e APP_FILTER

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('Serviço de autenticação e autorização para o sistema de patrimônio')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://localhost:3001', 'Servidor de desenvolvimento local')
    .addServer('http://auth-service:3001', 'Servidor Docker interno')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Load OpenAPI spec from file for validation
  try {
    const openApiPath = path.join(__dirname, '..', 'openapi.yaml');
    if (fs.existsSync(openApiPath)) {
      console.log('OpenAPI spec encontrado em:', openApiPath);
    }
  } catch (error) {
    console.warn('Não foi possível carregar openapi.yaml:', error);
  }

  const port = parseInt(process.env.PORT || '3001', 10);
  
  // Função para verificar se a porta está livre
  const checkPort = async (portNumber: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const server = require('http').createServer();
      server.listen(portNumber, () => {
        server.once('close', () => resolve(true));
        server.close();
      });
      server.on('error', () => resolve(false));
    });
  };

  // Verificar porta antes de tentar usar
  const portAvailable = await checkPort(port);
  
  if (!portAvailable) {
    console.error(`\n❌ Erro: Porta ${port} já está em uso!`);
    console.error(`\nPara resolver, execute um dos comandos:`);
    console.error(`  1. npm run kill-port:3001`);
    console.error(`  2. Ou encontre e encerre o processo manualmente:`);
    console.error(`     netstat -ano | findstr :${port}`);
    console.error(`     taskkill /PID <PID> /F`);
    console.error(`\nOu use outra porta:`);
    console.error(`  $env:PORT=3002; npm run start:dev\n`);
    process.exit(1);
  }
  
  try {
    await app.listen(port);
    console.log(`✅ Auth Service está rodando em: http://localhost:${port}`);
    console.log(`📖 Swagger está disponível em: http://localhost:${port}/api`);
  } catch (error: any) {
    if (error.code === 'EADDRINUSE') {
      console.error(`\n❌ Erro: Porta ${port} já está em uso!`);
      console.error(`\nExecute: npm run kill-port:3001\n`);
      process.exit(1);
    }
    throw error;
  }
}

bootstrap();

