import { Patrimonio } from './patrimonio.entity';

// Modelo/DTO para uso interno (não é uma entidade do TypeORM)
// Mantemos apenas as propriedades para compatibilidade tipada.
export class PatrimonioLocalizacaoHistorico {
  id!: string;
  patrimonioId!: string;
  patrimonio?: Patrimonio;
  localizacaoAnterior?: string;
  localizacaoNova!: string;
  dataMudanca!: Date;
  usuarioId?: string;
  observacoes?: string;
  createdAt!: Date;
}

