import { Module } from '@nestjs/common';
import { HashService } from './services/hash.service';
import { NormalizationService } from './services/normalization.service';
import { FilterService } from './services/filter.service';

/**
 * Módulo comum com serviços utilitários
 * Contém serviços reutilizáveis em toda a aplicação
 */
@Module({
  providers: [HashService, NormalizationService, FilterService],
  exports: [HashService, NormalizationService, FilterService],
})
export class CommonModule {}
