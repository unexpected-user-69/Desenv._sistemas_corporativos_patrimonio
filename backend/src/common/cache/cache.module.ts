import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../services/cache.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      // ConfigModule removido - agora está global no AppModule
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');

        if (redisUrl) {
          // Configuração para Redis

          return {
            store: redisStore,
            url: redisUrl,
            ttl: configService.get<number>('CACHE_TTL', 300), // 5 minutos por padrão
            max: configService.get<number>('CACHE_MAX_ITEMS', 1000),
            isGlobal: true,
          } as any;
        } else {
          // Fallback para cache em memória

          return {
            ttl: configService.get<number>('CACHE_TTL', 300),
            max: configService.get<number>('CACHE_MAX_ITEMS', 1000),
            isGlobal: true,
          } as any;
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class AppCacheModule {}
