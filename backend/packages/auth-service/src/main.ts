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

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Auth Service está rodando em: http://localhost:${port}`);
  console.log(`Swagger está disponível em: http://localhost:${port}/api`);
}

bootstrap();

