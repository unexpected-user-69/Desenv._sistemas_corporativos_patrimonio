// No Node.js v18+, crypto já está disponível globalmente
// Não é necessário fazer polyfill

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // ValidationPipe, Interceptors e Filters estão configurados no AppModule
  // via APP_PIPE, APP_INTERCEPTOR e APP_FILTER

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway centralizado para todos os microsserviços do sistema de patrimônio')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('gateway', 'Roteamento para microsserviços')
    .addTag('health', 'Health checks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`\n🚀 API Gateway está rodando em: http://localhost:${port}`);
  console.log(`📚 Swagger está disponível em: http://localhost:${port}/api\n`);
  console.log(`📡 Roteando para microsserviços:`);
  console.log(`   - Auth Service:       http://localhost:3001`);
  console.log(`   - Users Service:      http://localhost:3002`);
  console.log(`   - Events Service:     http://localhost:3003`);
  console.log(`   - Audit Service:      http://localhost:3004`);
  console.log(`   - Categorias Service: http://localhost:3005`);
  console.log(`   - Patrimonio Service: http://localhost:3006\n`);
}

bootstrap();

