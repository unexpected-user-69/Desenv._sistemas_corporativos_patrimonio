import { ReportType, ReportModel } from '../entities/report-request.entity';

/**
 * Dados do job de processamento de relatório
 */
export interface ReportJobData {
  requestId: string;
  type: ReportType;
  model: ReportModel;
  filters?: Record<string, any>;
  userId: string;
  priority?: 'high' | 'medium' | 'low';
  attempt?: number;
}

/**
 * Resultado do processamento do job
 */
export interface ReportJobResult {
  success: boolean;
  requestId: string;
  artifactId?: string;
  error?: string;
}



