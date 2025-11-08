export interface NotificationJobData {
  eventKey: string;
  data: Record<string, any>;
  recipient?: string;
  priority?: string;
  attempt?: number;
  messageId?: string; // Para idempotência
}

export interface NotificationJobResult {
  success: boolean;
  messageId?: string;
  error?: string;
  channel?: string;
}



