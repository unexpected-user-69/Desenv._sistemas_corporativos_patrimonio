import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersHttpClient } from './users-http-client';
import { EventsHttpClient } from './events-http-client';
import { CategoriasHttpClient } from './categorias-http-client';
import { AuditHttpClient } from './audit-http-client';
import { PatrimonioHttpClient } from './patrimonio-http-client';

@Global()
@Module({
  imports: [HttpModule, ConfigModule],
  providers: [UsersHttpClient, EventsHttpClient, CategoriasHttpClient, AuditHttpClient, PatrimonioHttpClient],
  exports: [UsersHttpClient, EventsHttpClient, CategoriasHttpClient, AuditHttpClient, PatrimonioHttpClient],
})
export class HttpClientsModule { }
