import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppDataSource } from './database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PatrimonioModule } from './patrimonio/patrimonio.module';
import { AuditModule } from './audit/audit.module';
import { CategoriasModule } from './categorias/categorias.module';
import { LoggerModule } from './common/logger/logger.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { IntegrationsErpModule } from './integrations-erp/integrations-erp.module';
import { InventoryMobileModule } from './inventory-mobile/inventory-mobile.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MetricsController } from './common/controllers/metrics.controller';
import { MetricsInterceptor } from './common/interceptors/metrics.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';

@Module({
  imports: [
    // Rate limiting configuration
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minuto
        limit: 100, // 100 requests por minuto
      },
    ]),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    PatrimonioModule,
    CategoriasModule,
    AuditModule,
    LoggerModule,
    CommonModule,
    AuthModule,
    EventsModule,
    IntegrationsErpModule,
    InventoryMobileModule,
    MaintenanceModule,
    NotificationsModule,
  ],
  controllers: [AppController, MetricsController],
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
export class AppModule {}
