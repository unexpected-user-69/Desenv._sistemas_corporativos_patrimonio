import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { EventPatrimonio } from './entities/event-patrimonio.entity';
import { Patrimonio } from './entities/patrimonio.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { AuthHttpClient } from '../auth/auth-http-client';
import { UsersHttpClient } from '../users/users-http-client';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventPatrimonio, Patrimonio]),
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
  controllers: [EventsController],
  providers: [
    EventsService,
    JwtStrategy,
    AuthHttpClient,
    UsersHttpClient,
  ],
  exports: [EventsService],
})
export class EventsModule {}

