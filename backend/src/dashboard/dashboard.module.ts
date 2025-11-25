import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { HttpClientsModule } from '../http-clients/http-clients.module';
import { User } from '../shared/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpClientsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule { }

