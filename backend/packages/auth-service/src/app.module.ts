import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import { RefreshToken } from './auth/entities/refresh-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const sslOptions =
          process.env.DB_SSL === 'true' ||
          (process.env.DATABASE_URL ?? '').includes('sslmode=require')
            ? { rejectUnauthorized: false }
            : undefined;

        return process.env.DATABASE_URL
          ? {
              type: 'postgres',
              url: process.env.DATABASE_URL,
              ssl: sslOptions,
              entities: [RefreshToken],
              synchronize: false,
              migrationsRun: false,
              logging: process.env.DB_LOGGING === 'true',
              applicationName: 'auth-service',
            }
          : {
              type: 'postgres',
              host: process.env.DB_HOST ?? 'localhost',
              port: parseInt(process.env.DB_PORT ?? '5432', 10),
              username: process.env.DB_USER ?? 'postgres',
              password: process.env.DB_PASS ?? 'postgres',
              database: process.env.DB_NAME ?? 'patrimonio',
              ssl: sslOptions,
              entities: [RefreshToken],
              synchronize: false,
              migrationsRun: false,
              logging: process.env.DB_LOGGING === 'true',
              applicationName: 'auth-service',
            };
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 60000,
        limit: 100,
      }],
    }),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

