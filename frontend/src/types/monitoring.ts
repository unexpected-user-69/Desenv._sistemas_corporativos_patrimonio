// Tipos para sistema de monitoramento e observabilidade (M2)

export interface MetricsData {
  timestamp: string;
  requests: {
    total: number;
    byMethod: Record<string, number>;
    byStatus: Record<string, number>;
  };
  performance: {
    averageResponseTime: number;
    p95Latency: number;
    throughput: number;
  };
  system: {
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
  };
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  context?: Record<string, unknown>;
  userId?: string;
  requestId?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  lastTriggered?: string;
}

export interface DashboardConfig {
  id: string;
  name: string;
  widgets: WidgetConfig[];
  refreshInterval: number;
  autoRefresh: boolean;
}

export interface WidgetConfig {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'alert';
  title: string;
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, unknown>;
}

export interface PerformanceMetrics {
  responseTime: {
    min: number;
    max: number;
    avg: number;
    p50: number;
    p95: number;
    p99: number;
  };
  throughput: {
    requestsPerSecond: number;
    requestsPerMinute: number;
  };
  errorRate: {
    percentage: number;
    count: number;
  };
  uptime: {
    percentage: number;
    downtime: number;
  };
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  services: ServiceHealth[];
  lastCheck: string;
}

export interface ServiceHealth {
  name: string;
  status: 'up' | 'down' | 'degraded';
  responseTime?: number;
  lastCheck: string;
  error?: string;
}

export interface MonitoringConfig {
  metricsCollection: {
    enabled: boolean;
    interval: number;
    retention: number;
  };
  logging: {
    level: string;
    maxSize: number;
    maxFiles: number;
  };
  alerts: {
    enabled: boolean;
    email: string[];
    webhook?: string;
  };
}
