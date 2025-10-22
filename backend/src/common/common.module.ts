import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';
import { NormalizationService } from './services/normalization.service';
import { FilterService } from './services/filter.service';
import { CacheController } from './controllers/cache.controller';
import { EnumsController } from './controllers/enums.controller';

/**
 * Módulo comum com serviços utilitários
 * Contém serviços reutilizáveis em toda a aplicação
 */
@Module({
  controllers: [CacheController, EnumsController],
  providers: [HashService, NormalizationService, FilterService],
  exports: [HashService, NormalizationService, FilterService],
})
export class CommonModule {}
