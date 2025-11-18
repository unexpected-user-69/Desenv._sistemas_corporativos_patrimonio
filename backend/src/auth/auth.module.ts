import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshToken } from './entities/refresh-token.entity';
import { CommonModule } from '../common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersHttpClient } from './users-http-client';
import { HttpClientsModule } from '../http-clients/http-clients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // @ts-ignore - JWT aceita string como expiresIn em runtime (ex: '15m'), mas TypeScript não reconhece o tipo StringValue
      useFactory: (configService: ConfigService) => ({
        // Prioriza process.env diretamente para garantir consistência com JwtStrategy
        // O ConfigService pode não ter carregado variáveis definidas em runtime (testes)
        secret: process.env.JWT_ACCESS_SECRET ?? configService.get<string>('JWT_ACCESS_SECRET') ?? 'dev_access_secret',
        signOptions: { 
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES_IN') ?? '15m',
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    HttpClientsModule,
    CommonModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersHttpClient],
  exports: [AuthService],
})
export class AuthModule {}

