import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule, InjectDataSource } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersHttpClient } from './users-http-client';
import { HashService } from '../common/services/hash.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      // @ts-ignore - JWT aceita string como expiresIn em runtime (ex: '15m'), mas TypeScript não reconhece o tipo StringValue
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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersHttpClient, HashService],
  exports: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(
    private readonly usersHttpClient: UsersHttpClient,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  onModuleInit() {
    // Configura DataSource para validação direta em desenvolvimento
    // Isso permite que o auth-service valide credenciais diretamente no banco
    // sem precisar chamar o users-service via HTTP
    // Em desenvolvimento, sempre usa validação direta para facilitar testes
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔧 Configurando validação direta no banco de dados (modo desenvolvimento)');
      this.usersHttpClient.setDataSource(this.dataSource);
    } else {
      console.log('🔧 Modo produção: usando validação via HTTP (users-service)');
      console.log(`   USERS_SERVICE_URL: ${process.env.USERS_SERVICE_URL || '(não configurado)'}`);
    }
  }
}

