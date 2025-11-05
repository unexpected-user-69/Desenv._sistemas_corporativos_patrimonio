import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatrimonioService } from './patrimonio.service';
import { PatrimonioController } from './patrimonio.controller';
import { Patrimonio } from './entities/patrimonio.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patrimonio]), UsersModule],
  controllers: [PatrimonioController],
  providers: [PatrimonioService],
  exports: [PatrimonioService, TypeOrmModule],
})
export class PatrimonioModule {}
