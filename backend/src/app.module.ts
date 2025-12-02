import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { AppDataSource } from './database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './common/logger/logger.module';
import { CommonModule } from './common/common.module';
import { HttpClientsModule } from './http-clients/http-clients.module';
import { IntegrationsErpModule } from './integrations-erp/integrations-erp.module';
import { InventoryMobileModule } from './inventory-mobile/inventory-mobile.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ReportsModule } from './reports/reports.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MetricsController } from './common/controllers/metrics.controller';
import { MetricsInterceptor } from './common/interceptors/metrics.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { SwaggerController } from './swagger/swagger.controller';
import { TestTokenController } from './test-token.controller';

@Module({
  imports: [
    // ConfigModule global para gerenciar variáveis de ambiente
    // Habilitado globalmente conforme padrão Aurora Platform
    ConfigModule.forRoot({
      isGlobal: true,
      // Carrega variáveis de ambiente do arquivo .env
      envFilePath: ['.env', '.env.local'],
      // Permite que variáveis de ambiente do sistema sobrescrevam o .env
      ignoreEnvFile: false,
    }),
    // Schedule module for cron jobs
    ScheduleModule.forRoot(),
    // Rate limiting configuration
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minuto
        limit: 100, // 100 requests por minuto
      },
    ]),
    // BullMQ configuration (Redis)
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0', 10),
        // Configurações para reduzir tentativas quando Redis não estiver disponível
        maxRetriesPerRequest: 3, // Reduzir de 20 para 3 para falhar mais rápido
        retryStrategy: (times: number) => {
          // Retry strategy: tentar novamente até 3 vezes com delay exponencial
          if (times > 3) {
            return null; // Parar de tentar após 3 tentativas
          }
          const delay = Math.min(times * 50, 2000); // Delay máximo de 2 segundos
          return delay;
        },
        enableReadyCheck: true,
        enableOfflineQueue: false, // Não enfileirar comandos quando offline
      },
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    HttpClientsModule,
    LoggerModule,
    CommonModule,
    IntegrationsErpModule,
    InventoryMobileModule,
    MaintenanceModule,
    NotificationsModule,
    ReportsModule,
    DashboardModule,
  ],
  controllers: [AppController, MetricsController, SwaggerController, TestTokenController],
  providers: [
    AppService,
    MetricsInterceptor,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
