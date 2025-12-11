// Tipos para sistema de relatórios avançados

export enum ReportType {
  USERS = 'users',
  PATRIMONIOS = 'patrimonios',
  ACTIVITY = 'activity',
  SYSTEM = 'system',
  CACHE = 'cache',
  AUDIT = 'audit',
  CUSTOM = 'custom',
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  JSON = 'json',
}

export enum ReportStatus {
  PENDING = 'pending',
  GENERATING = 'generating',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired',
  ACTIVE = 'active',
  DRAFT = 'draft',
  PAUSED = 'paused',
  ARCHIVED = 'archived',
}

export enum ReportFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export interface ReportFilter {
  // Filtros de data
  dateRange?: {
    start: string;
    end: string;
  };
  period?:
    | 'today'
    | 'yesterday'
    | 'last_7_days'
    | 'last_30_days'
    | 'last_90_days'
    | 'this_month'
    | 'last_month'
    | 'this_year'
    | 'last_year'
    | 'custom';

  // Filtros de usuário
  userIds?: string[];
  userRoles?: string[];
  userStatus?: 'active' | 'inactive' | 'all';

  // Filtros de patrimônio
  patrimonioIds?: string[];
  categorias?: string[];
  status?: string[];
  responsavelIds?: string[];
  valorRange?: {
    min: number;
    max: number;
  };

  // Filtros de sistema
  logLevels?: string[];
  operations?: string[];

  // Filtros de cache
  cacheKeys?: string[];
  cachePatterns?: string[];

  // Filtros customizados
  customFilters?: Record<string, any>;
}

// Alias para compatibilidade
export type ReportFilterOptions = ReportFilter;

export interface ReportConfig {
  id?: string;
  name: string;
  description?: string;
  type: ReportType;
  format: ReportFormat;
  filters: ReportFilter;
  columns?: string[];
  groupBy?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  includeCharts?: boolean;
  includeSummary?: boolean;
  includeDetails?: boolean;
  pageSize?: number;
  maxRows?: number;
  template?: string;
  isPublic?: boolean;
  isScheduled?: boolean;
  schedule?: {
    frequency: ReportFrequency;
    time?: string; // HH:MM format
    dayOfWeek?: number; // 0-6 (Sunday-Saturday)
    dayOfMonth?: number; // 1-31
    month?: number; // 1-12
    timezone?: string;
  };
  recipients?: string[];
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Report {
  id: string;
  config: ReportConfig;
  status: ReportStatus;
  progress?: number;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  generatedAt?: string;
  expiresAt?: string;
  error?: string;
  metadata?: {
    totalRows?: number;
    processingTime?: number;
    filters?: ReportFilter;
    generatedBy?: string;
  };
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: ReportType;
  config: Partial<ReportConfig>;
  isDefault: boolean;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  tags: string[];
}

export interface ReportSchedule {
  id: string;
  config: ReportConfig;
  status: 'active' | 'paused' | 'disabled';
  nextRun?: string;
  lastRun?: string;
  lastStatus?: ReportStatus;
  runCount: number;
  errorCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReportHistory {
  id: string;
  reportId: string;
  config: ReportConfig;
  status: ReportStatus;
  generatedAt: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
  metadata?: Record<string, any>;
}

export interface ReportStats {
  totalReports: number;
  reportsByType: Record<ReportType, number>;
  reportsByStatus: Record<ReportStatus, number>;
  reportsByFormat: Record<ReportFormat, number>;
  totalGenerated: number;
  totalScheduled: number;
  averageGenerationTime: number;
  mostUsedTemplates: Array<{
    templateId: string;
    templateName: string;
    usageCount: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'generated' | 'scheduled' | 'failed' | 'deleted';
    reportName: string;
    timestamp: string;
    user?: string;
  }>;
}

export interface ReportColumn {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage';
  format?: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  order?: number;
}

export interface ReportData {
  columns: ReportColumn[];
  rows: Record<string, any>[];
  summary?: {
    totalRows: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  aggregations?: Record<
    string,
    {
      sum?: number;
      avg?: number;
      min?: number;
      max?: number;
      count?: number;
    }
  >;
  charts?: Array<{
    type: 'bar' | 'line' | 'pie' | 'doughnut' | 'area';
    title: string;
    data: any;
    config?: Record<string, any>;
  }>;
}

export interface ReportPreview {
  id: string;
  config: ReportConfig;
  data: ReportData;
  generatedAt: string;
  expiresAt: string;
}

export interface ReportExportOptions {
  format: ReportFormat;
  includeCharts: boolean;
  includeSummary: boolean;
  includeDetails: boolean;
  pageSize?: number;
  orientation?: 'portrait' | 'landscape';
  paperSize?: 'A4' | 'A3' | 'Letter' | 'Legal';
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  header?: {
    title: string;
    subtitle?: string;
    logo?: string;
    showDate: boolean;
    showPageNumbers: boolean;
  };
  footer?: {
    text?: string;
    showPageNumbers: boolean;
  };
  styling?: {
    fontFamily?: string;
    fontSize?: number;
    colors?: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}

export interface ReportExportResult {
  downloadUrl: string;
  fileName: string;
  fileSize: number;
  expiresAt: string;
  reportId: string;
}

export interface ReportValidation {
  isValid: boolean;
  errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;
  warnings: Array<{
    field: string;
    message: string;
    code: string;
  }>;
}

export interface ReportSearchOptions {
  query?: string;
  type?: ReportType;
  status?: ReportStatus;
  format?: ReportFormat;
  createdBy?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
  isPublic?: boolean;
  isScheduled?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ReportSearchResult {
  reports: Report[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ReportAnalytics {
  reportId: string;
  views: number;
  downloads: number;
  lastViewed?: string;
  lastDownloaded?: string;
  averageViewTime?: number;
  userEngagement: Array<{
    userId: string;
    userName: string;
    views: number;
    downloads: number;
    lastAccess: string;
  }>;
  popularSections: Array<{
    section: string;
    views: number;
    percentage: number;
  }>;
}

export interface ReportSharing {
  id: string;
  reportId: string;
  sharedWith: Array<{
    userId?: string;
    email: string;
    role: 'viewer' | 'editor' | 'admin';
    permissions: string[];
  }>;
  isPublic: boolean;
  publicUrl?: string;
  accessCode?: string;
  expiresAt?: string;
  createdAt: string;
  createdBy: string;
}

export interface ReportNotification {
  id: string;
  reportId: string;
  type: 'generated' | 'failed' | 'scheduled' | 'shared' | 'expired';
  title: string;
  message: string;
  recipients: string[];
  sentAt?: string;
  status: 'pending' | 'sent' | 'failed';
  metadata?: Record<string, any>;
}

// Tipos para relatórios específicos
export interface UserReportData {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    lastLogin?: string;
    loginCount: number;
  }>;
  summary: {
    total: number;
    active: number;
    inactive: number;
    byRole: Record<string, number>;
    newThisMonth: number;
    lastLoginDistribution: Record<string, number>;
  };
}

export interface PatrimonioReportData {
  patrimonios: Array<{
    id: string;
    codigo: string;
    nome: string;
    categoria: string;
    status: string;
    valor: number;
    responsavel: string;
    localizacao: string;
    dataAquisicao: string;
    garantia: string;
    observacoes?: string;
  }>;
  summary: {
    total: number;
    totalValue: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
    byResponsavel: Record<string, number>;
    averageValue: number;
    oldestItem: string;
    newestItem: string;
  };
}

export interface ActivityReportData {
  activities: Array<{
    id: string;
    type: string;
    description: string;
    user: string;
    timestamp: string;
    metadata?: Record<string, any>;
  }>;
  summary: {
    total: number;
    byType: Record<string, number>;
    byUser: Record<string, number>;
    byHour: Record<string, number>;
    byDay: Record<string, number>;
    mostActiveUser: string;
    mostCommonActivity: string;
  };
}

export interface SystemReportData {
  metrics: Array<{
    timestamp: string;
    cpu: number;
    memory: number;
    disk: number;
    responseTime: number;
    requests: number;
    errors: number;
  }>;
  summary: {
    averageCpu: number;
    averageMemory: number;
    averageDisk: number;
    averageResponseTime: number;
    totalRequests: number;
    totalErrors: number;
    errorRate: number;
    uptime: number;
    peakUsage: {
      cpu: number;
      memory: number;
      disk: number;
    };
  };
}

export interface CacheReportData {
  metrics: Array<{
    timestamp: string;
    hitRate: number;
    missRate: number;
    totalKeys: number;
    memoryUsed: number;
    evictions: number;
    operations: number;
  }>;
  summary: {
    averageHitRate: number;
    averageMissRate: number;
    totalKeys: number;
    totalMemoryUsed: number;
    totalEvictions: number;
    totalOperations: number;
    mostUsedKeys: Array<{
      key: string;
      hits: number;
      size: number;
    }>;
    performance: {
      averageResponseTime: number;
      peakResponseTime: number;
      slowestOperations: Array<{
        operation: string;
        averageTime: number;
        count: number;
      }>;
    };
  };
}

export interface AuditReportData {
  logs: Array<{
    id: string;
    timestamp: string;
    level: string;
    message: string;
    user?: string;
    action: string;
    resource: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, any>;
  }>;
  summary: {
    total: number;
    byLevel: Record<string, number>;
    byAction: Record<string, number>;
    byUser: Record<string, number>;
    byResource: Record<string, number>;
    byHour: Record<string, number>;
    byDay: Record<string, number>;
    securityEvents: number;
    errorEvents: number;
    mostActiveUser: string;
    mostAccessedResource: string;
  };
}

// Tipos de auditoria para o store
export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  details: { [key: string]: any };
}

export interface PaginatedAuditLogs {
  data: AuditLog[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
