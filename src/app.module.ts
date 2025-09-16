import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USER ?? 'app',
        password: process.env.DB_PASS ?? 'app',
        database: process.env.DB_NAME ?? 'inventario',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}


