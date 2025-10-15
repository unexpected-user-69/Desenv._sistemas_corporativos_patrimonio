// Tipos para sistema de patrimônios

export interface Patrimonio {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  categoria: PatrimonioCategoria;
  status: PatrimonioStatus;
  valorAquisicao: string;
  dataAquisicao: string;
  dataGarantia?: string;
  numeroSerie?: string;
  modelo?: string;
  marca?: string;
  localizacao: string;
  observacoes?: string;
  fotoUrl?: string;
  responsavelId?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export enum PatrimonioCategoria {
  EQUIPAMENTO = 'EQUIPAMENTO',
  MOBILIARIO = 'MOBILIARIO',
  INFORMATICA = 'INFORMATICA',
  ELETRONICO = 'ELETRONICO',
  VEICULO = 'VEICULO',
  IMOVEL = 'IMOVEL',
  OUTROS = 'OUTROS',
}

export enum PatrimonioStatus {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  MANUTENCAO = 'MANUTENCAO',
  DESCARTADO = 'DESCARTADO',
  PERDIDO = 'PERDIDO',
}

export interface CreatePatrimonioRequest {
  codigo: string;
  nome: string;
  descricao?: string;
  categoria: PatrimonioCategoria;
  status: PatrimonioStatus;
  valorAquisicao: string;
  dataAquisicao: string;
  dataGarantia?: string;
  numeroSerie?: string;
  modelo?: string;
  marca?: string;
  localizacao: string;
  observacoes?: string;
  fotoUrl?: string;
  responsavelId?: string;
}

export interface UpdatePatrimonioRequest {
  codigo?: string;
  nome?: string;
  descricao?: string;
  categoria?: PatrimonioCategoria;
  status?: PatrimonioStatus;
  valorAquisicao?: string;
  dataAquisicao?: string;
  dataGarantia?: string;
  numeroSerie?: string;
  modelo?: string;
  marca?: string;
  localizacao?: string;
  observacoes?: string;
  fotoUrl?: string;
  responsavelId?: string;
}

export interface PatrimonioFilters {
  page?: number;
  limit?: number;
  q?: string; // busca textual
  categoria?: PatrimonioCategoria;
  status?: PatrimonioStatus;
  localizacao?: string;
  responsavelId?: string;
  dataAquisicaoInicio?: string;
  dataAquisicaoFim?: string;
  valorMinimo?: number;
  valorMaximo?: number;
}

export interface PaginatedPatrimoniosResponse {
  data: Patrimonio[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PatrimonioStats {
  total: number;
  porCategoria: Record<PatrimonioCategoria, number>;
  porStatus: Record<PatrimonioStatus, number>;
  valorTotal: number;
  valorMedio: number;
  vencimentoGarantia: Patrimonio[];
}

export interface PatrimonioSearchResult {
  patrimonios: Patrimonio[];
  total: number;
  facets: {
    categorias: Array<{ categoria: PatrimonioCategoria; count: number }>;
    status: Array<{ status: PatrimonioStatus; count: number }>;
    localizacoes: Array<{ localizacao: string; count: number }>;
  };
}

// Opções para selects
export const CATEGORIA_OPTIONS = [
  { value: PatrimonioCategoria.EQUIPAMENTO, label: 'Equipamento' },
  { value: PatrimonioCategoria.MOBILIARIO, label: 'Mobiliário' },
  { value: PatrimonioCategoria.INFORMATICA, label: 'Informática' },
  { value: PatrimonioCategoria.ELETRONICO, label: 'Eletrônico' },
  { value: PatrimonioCategoria.VEICULO, label: 'Veículo' },
  { value: PatrimonioCategoria.IMOVEL, label: 'Imóvel' },
  { value: PatrimonioCategoria.OUTROS, label: 'Outros' },
];

export const STATUS_OPTIONS = [
  { value: PatrimonioStatus.ATIVO, label: 'Ativo' },
  { value: PatrimonioStatus.INATIVO, label: 'Inativo' },
  { value: PatrimonioStatus.MANUTENCAO, label: 'Manutenção' },
  { value: PatrimonioStatus.DESCARTADO, label: 'Descartado' },
  { value: PatrimonioStatus.PERDIDO, label: 'Perdido' },
];

// Utilitários
export const getCategoriaLabel = (categoria: PatrimonioCategoria): string => {
  return (
    CATEGORIA_OPTIONS.find((opt) => opt.value === categoria)?.label || categoria
  );
};

export const getStatusLabel = (status: PatrimonioStatus): string => {
  return STATUS_OPTIONS.find((opt) => opt.value === status)?.label || status;
};

export const getStatusColor = (status: PatrimonioStatus): string => {
  switch (status) {
    case PatrimonioStatus.ATIVO:
      return 'text-green-600 bg-green-100';
    case PatrimonioStatus.INATIVO:
      return 'text-gray-600 bg-gray-100';
    case PatrimonioStatus.MANUTENCAO:
      return 'text-yellow-600 bg-yellow-100';
    case PatrimonioStatus.DESCARTADO:
      return 'text-red-600 bg-red-100';
    case PatrimonioStatus.PERDIDO:
      return 'text-red-800 bg-red-200';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getCategoriaColor = (categoria: PatrimonioCategoria): string => {
  switch (categoria) {
    case PatrimonioCategoria.EQUIPAMENTO:
      return 'text-blue-600 bg-blue-100';
    case PatrimonioCategoria.MOBILIARIO:
      return 'text-amber-600 bg-amber-100';
    case PatrimonioCategoria.INFORMATICA:
      return 'text-purple-600 bg-purple-100';
    case PatrimonioCategoria.ELETRONICO:
      return 'text-indigo-600 bg-indigo-100';
    case PatrimonioCategoria.VEICULO:
      return 'text-orange-600 bg-orange-100';
    case PatrimonioCategoria.IMOVEL:
      return 'text-green-600 bg-green-100';
    case PatrimonioCategoria.OUTROS:
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
