import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CommonModule } from '../common/common.module';
import { AppCacheModule } from '../common/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule, AppCacheModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
