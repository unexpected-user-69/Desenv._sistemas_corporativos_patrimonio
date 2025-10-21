import { SetMetadata } from '@nestjs/common';

export const AUDIT_KEY = 'audit';

export interface AuditOptions {
  action: string;
  entityType: string;
  description?: string;
  skipOldValues?: boolean;
  skipNewValues?: boolean;
}

export const Audit = (options: AuditOptions) => SetMetadata(AUDIT_KEY, options);
