import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersHttpClient } from './users-http-client';
import { EventsHttpClient } from './events-http-client';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [UsersHttpClient, EventsHttpClient],
  exports: [UsersHttpClient, EventsHttpClient],
})
export class HttpClientsModule {}





