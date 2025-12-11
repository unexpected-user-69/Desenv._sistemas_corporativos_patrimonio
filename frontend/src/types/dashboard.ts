// Tipos para sistema de dashboard e métricas

export interface DashboardStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    newThisMonth: number;
    growth: number; // Percentual de crescimento
  };
  patrimonios: {
    total: number;
    ativos: number;
    inativos: number;
    valorTotal: number;
    growth: number;
  };
  system: {
    uptime: number; // Em segundos
    memoryUsage: number; // Em MB
    cpuUsage: number; // Percentual
    diskUsage: number; // Percentual
    responseTime: number; // Em ms
  };
  cache: {
    hitRate: number; // Percentual
    missRate: number; // Percentual
    totalKeys: number;
    memoryUsed: number; // Em MB
    evictions: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  label?: string;
}

export interface UserGrowthData {
  period: string; // "2024-01", "2024-02", etc.
  total: number;
  new: number;
  active: number;
}

export interface PatrimonioGrowthData {
  period: string;
  total: number;
  valorTotal: number;
  novos: number;
}

export interface SystemMetricsData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  responseTime: number;
}

export interface CacheMetricsData {
  timestamp: string;
  hitRate: number;
  missRate: number;
  totalKeys: number;
  memoryUsed: number;
}

export interface RecentActivity {
  id: string;
  type:
    | 'user_created'
    | 'user_updated'
    | 'user_deleted'
    | 'patrimonio_created'
    | 'patrimonio_updated'
    | 'patrimonio_deleted'
    | 'login'
    | 'logout';
  description: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface DashboardFilters {
  dateRange: {
    start: string;
    end: string;
  };
  period: '7d' | '30d' | '90d' | '1y';
  refreshInterval: number; // Em segundos
}

export interface DashboardConfig {
  widgets: {
    statsCards: boolean;
    userChart: boolean;
    patrimonioChart: boolean;
    systemMetrics: boolean;
    cacheMetrics: boolean;
    recentActivity: boolean;
  };
  layout: 'grid' | 'list';
  theme: 'light' | 'dark';
  autoRefresh: boolean;
  refreshInterval: number;
}

export interface DashboardAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface DashboardNotification {
  id: string;
  type: 'system' | 'user' | 'patrimonio' | 'cache';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'table' | 'metric';
  title: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  config: Record<string, any>;
  data?: any;
  isLoading?: boolean;
  error?: string;
}

export interface DashboardLayout {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardExportOptions {
  format: 'pdf' | 'excel' | 'csv' | 'json';
  includeCharts: boolean;
  includeData: boolean;
  dateRange: {
    start: string;
    end: string;
  };
  filters?: Record<string, any>;
}

export interface DashboardExportResult {
  downloadUrl: string;
  filename: string;
  size: number; // Em bytes
  expiresAt: string;
}

// Tipos para métricas em tempo real
export interface RealtimeMetrics {
  timestamp: string;
  activeUsers: number;
  requestsPerSecond: number;
  averageResponseTime: number;
  errorRate: number;
  cacheHitRate: number;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  databaseQueryTime: number;
  cacheResponseTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

export interface UserActivityMetrics {
  totalLogins: number;
  uniqueUsers: number;
  averageSessionDuration: number;
  mostActiveHours: number[];
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

export interface PatrimonioMetrics {
  totalValue: number;
  averageValue: number;
  categories: Array<{
    name: string;
    count: number;
    value: number;
  }>;
  statusDistribution: Array<{
    status: string;
    count: number;
  }>;
  recentAdditions: number;
  recentUpdates: number;
}

// Tipos para comparações e tendências
export interface TrendData {
  current: number;
  previous: number;
  change: number; // Percentual
  direction: 'up' | 'down' | 'stable';
  period: string;
}

export interface ComparisonData {
  metric: string;
  current: number;
  previous: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'no_change';
  significance: 'low' | 'medium' | 'high';
}

export interface DashboardInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'recommendation' | 'alert';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'usage' | 'security' | 'business';
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  actionUrl?: string;
}
