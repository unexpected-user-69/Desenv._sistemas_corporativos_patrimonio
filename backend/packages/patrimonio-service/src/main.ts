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

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  app.setGlobalPrefix('');

  const config = new DocumentBuilder()
    .setTitle('Patrimonio Service API')
    .setDescription('Serviço de gerenciamento de patrimônios para o sistema de patrimônio')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://localhost:3003', 'Servidor de desenvolvimento local')
    .addServer('http://patrimonio-service:3003', 'Servidor Docker interno')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  try {
    const openApiPath = path.join(__dirname, '..', 'openapi.yaml');
    if (fs.existsSync(openApiPath)) {
      console.log('OpenAPI spec encontrado em:', openApiPath);
    }
  } catch (error) {
    console.warn('Não foi possível carregar openapi.yaml:', error);
  }

  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`Patrimonio Service está rodando em: http://localhost:${port}`);
  console.log(`Swagger está disponível em: http://localhost:${port}/api`);
}

bootstrap();




