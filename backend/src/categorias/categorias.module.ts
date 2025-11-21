import { Module } from '@nestjs/common';
import { HttpClientsModule } from '../http-clients/http-clients.module';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [HttpClientsModule],
  controllers: [CategoriasController],
})
export class CategoriasModule { }


