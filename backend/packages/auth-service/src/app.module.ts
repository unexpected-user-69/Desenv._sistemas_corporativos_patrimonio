import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import { RefreshToken } from './auth/entities/refresh-token.entity';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

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
              database: process.env.DB_NAME ?? 'patrimonio_inventario',
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
        ttl: process.env.NODE_ENV === 'test' ? 1000 : 60000,
        limit: process.env.NODE_ENV === 'test' ? 10000 : 100,
      }],
    }),
    AuthModule,
  ],
  controllers: [HealthController],
  providers: [
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
    // Desabilitar ThrottlerGuard em modo de teste
    ...(process.env.NODE_ENV !== 'test' ? [{
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }] : []),
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new TimeoutInterceptor(),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

