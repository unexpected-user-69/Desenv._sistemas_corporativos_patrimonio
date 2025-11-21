import { Module } from '@nestjs/common';
import { HttpClientsModule } from '../http-clients/http-clients.module';
import { PatrimonioController } from './patrimonio.controller';

@Module({
  imports: [HttpClientsModule],
  controllers: [PatrimonioController],
})
export class PatrimonioModule { }
