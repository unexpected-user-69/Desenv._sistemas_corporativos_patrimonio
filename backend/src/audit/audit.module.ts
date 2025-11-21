import { Module } from '@nestjs/common';
import { HttpClientsModule } from '../http-clients/http-clients.module';
import { AuditController } from './audit.controller';

@Module({
  imports: [HttpClientsModule],
  controllers: [AuditController],
})
export class AuditModule { }
