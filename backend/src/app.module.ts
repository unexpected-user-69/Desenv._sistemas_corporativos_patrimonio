import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PatrimonioModule } from './patrimonio/patrimonio.module';
import { AuditModule } from './audit/audit.module';
import { CategoriasModule } from './categorias/categorias.module';
import { LoggerModule } from './common/logger/logger.module';
import { CommonModule } from './common/common.module';
import { MetricsController } from './common/controllers/metrics.controller';
import { MetricsInterceptor } from './common/interceptors/metrics.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { User } from './users/entities/user.entity';
import { Patrimonio } from './patrimonio/entities/patrimonio.entity';
import { Categoria } from './categorias/entities/categoria.entity';
import { AuditLog } from './audit/entities/audit-log.entity';
import { SystemLog } from './audit/entities/system-log.entity';
import { Metric } from './audit/entities/metric.entity';

@Module({
  imports: [
    // Rate limiting configuration
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minuto
        limit: 100, // 100 requests por minuto
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'patrimonio_inventario',
      entities: [User, Patrimonio, Categoria, AuditLog, SystemLog, Metric],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    } as TypeOrmModuleOptions),
    UsersModule,
    PatrimonioModule,
    CategoriasModule,
    AuditModule,
    LoggerModule,
    CommonModule,
  ],
  controllers: [AppController, MetricsController],
  providers: [
    AppService,
    MetricsInterceptor,
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
