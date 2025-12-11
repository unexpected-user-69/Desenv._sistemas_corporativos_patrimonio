
import { PatrimonioStatus } from '../enums/patrimonio-status.enum';

export { PatrimonioStatus };

export class Patrimonio {
    id!: string;
    codigo!: string;
    nome!: string;
    descricao?: string;
    categoriaId?: string;
    status!: PatrimonioStatus;
    valorAquisicao?: number;
    dataAquisicao?: Date;
    dataGarantia?: Date;
    numeroSerie?: string;
    modelo?: string;
    marca?: string;
    localizacao?: string;
    observacoes?: string;
    fotoUrl?: string;
    responsavelId?: string;

    // Propriedades virtuais/relações para compatibilidade com relatórios
    categoria?: { nome: string };
    responsavel?: { name: string };

    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;
    version!: number;
}
