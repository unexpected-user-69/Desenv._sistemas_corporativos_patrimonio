import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UsersModule } from '../users/users.module';
import { PatrimonioModule } from '../patrimonio/patrimonio.module';
import { User } from '../users/entities/user.entity';
import { Patrimonio } from '../patrimonio/entities/patrimonio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Patrimonio]),
    UsersModule,
    PatrimonioModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}

