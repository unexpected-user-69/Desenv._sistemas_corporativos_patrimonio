import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());
  app.use(compression());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Audit Service API')
    .setDescription('Microsserviço de Auditoria e Logs para Sistema de Patrimônio')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('audit', 'Operações de auditoria')
    .addTag('logs', 'Sistema de logs')
    .addTag('metrics', 'Métricas do sistema')
    .addTag('alerts', 'Sistema de alertas')
    .addTag('dashboard', 'Dashboard de monitoramento')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Audit Service rodando na porta ${port}`);
  console.log(`📚 Documentação disponível em http://localhost:${port}/docs`);
}

bootstrap();
