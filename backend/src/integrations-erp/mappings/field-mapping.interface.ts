/**
 * Interface para definição de mapeamento de campos
 */
export interface FieldMapping {
  /** Campo de origem (do ERP) */
  source: string;
  /** Campo de destino (no sistema) */
  target: string;
  /** Tipo de transformação a aplicar */
  transform?: TransformType;
  /** Função de transformação customizada (opcional) */
  transformFn?: (value: any) => any;
  /** Validações a aplicar */
  validations?: ValidationRule[];
  /** Valor padrão se o campo estiver ausente */
  defaultValue?: any;
  /** Se o campo é obrigatório */
  required?: boolean;
}

/**
 * Tipos de transformação disponíveis
 */
export enum TransformType {
  /** Sem transformação */
  NONE = 'none',
  /** Converter para string */
  TO_STRING = 'toString',
  /** Converter para número */
  TO_NUMBER = 'toNumber',
  /** Converter para data */
  TO_DATE = 'toDate',
  /** Converter para boolean */
  TO_BOOLEAN = 'toBoolean',
  /** Converter para maiúsculas */
  TO_UPPERCASE = 'toUppercase',
  /** Converter para minúsculas */
  TO_LOWERCASE = 'toLowerCase',
  /** Remover espaços */
  TRIM = 'trim',
  /** Formatar moeda */
  FORMAT_CURRENCY = 'formatCurrency',
  /** Formatar data */
  FORMAT_DATE = 'formatDate',
  /** Concatenar campos */
  CONCAT = 'concat',
  /** Dividir string */
  SPLIT = 'split',
}

/**
 * Regra de validação
 */
export interface ValidationRule {
  /** Tipo de validação */
  type: ValidationType;
  /** Valor de comparação (se aplicável) */
  value?: any;
  /** Mensagem de erro customizada */
  message?: string;
}

/**
 * Tipos de validação disponíveis
 */
export enum ValidationType {
  /** Campo obrigatório */
  REQUIRED = 'required',
  /** Valor mínimo */
  MIN = 'min',
  /** Valor máximo */
  MAX = 'max',
  /** Comprimento mínimo */
  MIN_LENGTH = 'minLength',
  /** Comprimento máximo */
  MAX_LENGTH = 'maxLength',
  /** Padrão regex */
  PATTERN = 'pattern',
  /** Valor em enum */
  ENUM = 'enum',
  /** Email válido */
  EMAIL = 'email',
  /** URL válida */
  URL = 'url',
  /** Data válida */
  DATE = 'date',
  /** Número válido */
  NUMBER = 'number',
}

/**
 * Configuração de mapeamento para uma entidade
 */
export interface EntityMappingConfig {
  /** Entidade a mapear */
  entity: string;
  /** Campo que identifica unicamente o registro (externalId) */
  externalIdField: string;
  /** Mapeamentos de campos */
  fieldMappings: FieldMapping[];
  /** Regras de validação globais */
  globalValidations?: ValidationRule[];
}

