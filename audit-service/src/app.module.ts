import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs/redis';

import { AuditModule } from './modules/audit/audit.module';
import { LogsModule } from './modules/logs/logs.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

import { databaseConfig } from './config/database.config';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig,
    }),

    // Redis
    RedisModule.forRootAsync({
      useFactory: () => redisConfig,
    }),

    // Feature modules
    AuditModule,
    LogsModule,
    MetricsModule,
    AlertsModule,
    DashboardModule,
  ],
})
export class AppModule {}
