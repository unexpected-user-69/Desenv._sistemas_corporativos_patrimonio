import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PatrimonioModule } from './patrimonio/patrimonio.module';
import { LoggerModule } from './common/logger/logger.module';
import { MetricsController } from './common/controllers/metrics.controller';
import { MetricsInterceptor } from './common/interceptors/metrics.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { User } from './users/entities/user.entity';
import { Patrimonio } from './patrimonio/entities/patrimonio.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Rate limiting configuration
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minuto
        limit: 100, // 100 requests por minuto
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('DB_TYPE') || 'postgres';
        return {
          type: dbType as any,
          ...(dbType === 'sqlite'
            ? {
              database: configService.get<string>('DB_NAME') || 'database.sqlite',
            }
            : {
              host: configService.get<string>('DB_HOST') || 'localhost',
              port: configService.get<number>('DB_PORT') || 5432,
              username: configService.get<string>('DB_USER') || 'postgres',
              password: configService.get<string>('DB_PASS') || 'postgres',
              database: configService.get<string>('DB_NAME') || 'patrimonio_inventario',
            }),
          entities: [User, Patrimonio],
          synchronize: true,
          logging: configService.get<string>('NODE_ENV') === 'development',
        };
      },
    }),
    UsersModule,
    PatrimonioModule,
    LoggerModule,
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
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
