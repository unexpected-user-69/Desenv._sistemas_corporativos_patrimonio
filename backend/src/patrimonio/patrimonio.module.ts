import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatrimonioService } from './patrimonio.service';
import { PatrimonioController } from './patrimonio.controller';
import { Patrimonio } from './entities/patrimonio.entity';
import { PatrimonioLocalizacaoHistorico } from './entities/patrimonio-localizacao-historico.entity';
import { UsersModule } from '../users/users.module';
import { StorageService } from './services/storage.service';
import { PatrimonioPdfExportService } from './services/patrimonio-pdf-export.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patrimonio, PatrimonioLocalizacaoHistorico]),
    UsersModule,
    // ConfigModule removido - agora está global no AppModule
  ],
  controllers: [PatrimonioController],
  providers: [PatrimonioService, StorageService, PatrimonioPdfExportService],
  exports: [PatrimonioService, TypeOrmModule],
})
export class PatrimonioModule {}
