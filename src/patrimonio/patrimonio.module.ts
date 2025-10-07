import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatrimonioService } from './patrimonio.service';
import { PatrimonioController } from './patrimonio.controller';
import { Patrimonio } from './entities/patrimonio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patrimonio])],
  controllers: [PatrimonioController],
  providers: [PatrimonioService],
  exports: [PatrimonioService],
})
export class PatrimonioModule {}
