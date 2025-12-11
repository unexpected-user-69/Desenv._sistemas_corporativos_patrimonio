import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CategoriasHttpClient } from './categorias-http-client';
import { UsersHttpClient } from './users-http-client';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [CategoriasHttpClient, UsersHttpClient],
  exports: [CategoriasHttpClient, UsersHttpClient],
})
export class HttpClientsModule {}




