import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { LoggingInterceptor, TimeoutInterceptor } from './common/interceptors';
import helmet from 'helmet';
import compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configurar diretório de arquivos estáticos para uploads
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });
  
  // Servir arquivos estáticos públicos (para scripts do Swagger)
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public/',
  });

  // Compressão gzip
  app.use(compression());

  // CORS para produção
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3101',
      'http://localhost:3002',
      'http://localhost:3101',
      'http://localhost:5173', // Vite dev server
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // ValidationPipe agora está configurado globalmente no AppModule
  app.useGlobalFilters(new HttpExceptionFilter());

  // Segurança básica
  app.use(helmet());

  // Prefixo global v1 (deve vir antes do Swagger)
  app.setGlobalPrefix('v1');

  // Interceptors globais
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TimeoutInterceptor(10000), // 10 segundos de timeout
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // Swagger configurado após o prefixo global
  const config = new DocumentBuilder()
    .setTitle('Patrimonio & Inventario API')
    .setDescription(
      'API RESTful completa para gestão de patrimônio e inventário. ' +
      'Inclui autenticação JWT, autorização baseada em roles, CRUD completo de usuários e patrimônio, ' +
      'sistema de auditoria e validação de dados. ' +
      '\n\n' +
      '**Autenticação**: Use o endpoint `/v1/auth/login` para obter tokens. ' +
      'O access token expira em 15 minutos. Use o refresh token para renovar os tokens. ' +
      '\n\n' +
      '**Autorização**: Use o Bearer token no header `Authorization: Bearer <token>` para acessar endpoints protegidos.',
    )
    .setVersion('1.0.0')
    .setContact('Equipe de Desenvolvimento', '', 'dev@example.com')
    // Não adicionar servidor com /v1, pois o prefixo global já está configurado
    // O Swagger automaticamente incluirá o prefixo /v1 nos endpoints documentados
    // Usar ignoreGlobalPrefix: true no setup para servir o Swagger UI em /docs (sem /v1)
    .addTag('root', 'Endpoints raiz da API')
    .addTag('auth', 'Autenticação e autorização')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('patrimonio', 'Gestão de patrimônio')
    .addTag('categorias', 'Categorias de patrimônio')
    .addTag('events', 'Eventos relacionados a patrimônio')
    .addTag('audit', 'Sistema de auditoria')
    .addTag('maintenance', 'Gestão de manutenção e ordens de serviço')
    .addTag('reports', 'Geração e gerenciamento de relatórios')
    .addTag('reports-metrics', 'Métricas e estatísticas de relatórios')
    .addTag('reports-catalog', 'Catálogo de relatórios e permissões')
    .addTag('notifications', 'Sistema de notificações e templates')
    .addTag('integrations-erp', 'Integrações com sistemas ERP')
    .addTag('inventory-mobile', 'Inventário móvel e campanhas')
    .addTag('cache', 'Gerenciamento de cache')
    .addTag('metrics', 'Métricas e monitoramento do sistema')
    .addTag('enums', 'Enumeradores e constantes do sistema')
    .addTag('common', 'Utilitários compartilhados')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Digite o token JWT obtido no endpoint /auth/login',
      },
      'bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  // Customizar Swagger UI para autenticação automática (apenas em desenvolvimento)
  const swaggerOptions = process.env.NODE_ENV === 'production' 
    ? {
        // Em produção, ignorar o prefixo global para evitar duplicação
        ignoreGlobalPrefix: true,
      }
    : {
        // Ignorar o prefixo global para o Swagger UI (serve em /docs, não /v1/docs)
        // Isso evita duplicação do prefixo v1 nas URLs dos endpoints
        ignoreGlobalPrefix: true,
        customSiteTitle: 'Patrimonio & Inventario API - Swagger',
        swaggerOptions: {
          persistAuthorization: true, // Persiste a autorização entre recarregamentos
          // Configurar URL base para scripts customizados
          customCssUrl: undefined,
        },
        // URLs dos scripts customizados (relativas à raiz da aplicação)
        customJs: [
          // Usar URL absoluta desde a raiz (sem prefixo v1, pois o Swagger UI gerencia isso)
          '/v1/swagger/auto-auth.js',
        ],
        customCss: undefined,
      };
  
  SwaggerModule.setup('docs', app, document, swaggerOptions);

  await app.listen(process.env.PORT ?? 3101);
}
void bootstrap();
