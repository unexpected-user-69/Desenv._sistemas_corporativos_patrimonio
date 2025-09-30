import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import dataSource from './database/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './common/logger/logger.module';
import { MetricsController } from './common/controllers/metrics.controller';
import { MetricsInterceptor } from './common/interceptors/metrics.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options as TypeOrmModuleOptions),
    UsersModule,
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
  ],
})
export class AppModule {}
