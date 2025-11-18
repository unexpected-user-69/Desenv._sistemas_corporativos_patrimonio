import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashService } from '../common/services/hash.service';
import { NormalizationService } from '../common/services/normalization.service';
import { FilterService } from '../common/services/filter.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthHttpClient } from '../auth/auth-http-client';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: process.env.JWT_ACCESS_SECRET ?? configService.get<string>('JWT_ACCESS_SECRET') ?? 'dev_access_secret',
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m',
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    NormalizationService,
    FilterService,
    JwtStrategy,
    AuthHttpClient,
  ],
  exports: [UsersService],
})
export class UsersModule {}

