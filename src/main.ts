import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http-exception.filter';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Compressão gzip
  app.use(compression());

  // CORS para produção
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // Segurança básica
  app.use(helmet());

  // Prefixo global v1 (deve vir antes do Swagger)
  app.setGlobalPrefix('v1');

  // ValidationPipe com configurações completas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ClassSerializerInterceptor global para @Exclude/@Expose
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get('Reflector')),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger configurado após o prefixo global
  const config = new DocumentBuilder()
    .setTitle('Patrimonio & Inventario API')
    .setDescription('API para gestão de patrimônio e inventário')
    .setVersion('1.0.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
