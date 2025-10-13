// Tipos para sistema de monitoramento e observabilidade (M2)

export interface MetricsData {
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
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  timestamp: string;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  lastCheck: string;
  services: Array<{
    name: string;
    status: 'healthy' | 'warning' | 'critical';
    responseTime?: number;
    error?: string;
  }>;
  uptime: number;
  version: string;
}

export interface LogEntry {
  id: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  timestamp: string;
  userId?: string;
  context?: Record<string, any>;
  service?: string;
  traceId?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'resolved' | 'acknowledged';
  timestamp: string;
  source: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  threshold: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  enabled: boolean;
  lastTriggered?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }>;
}

export interface MonitoringConfig {
  refreshInterval: number;
  autoRefresh: boolean;
  alertThresholds: {
    responseTime: number;
    errorRate: number;
    cpuUsage: number;
    memoryUsage: number;
  };
  logLevels: string[];
  retentionDays: number;
}