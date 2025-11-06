import { Injectable, Logger } from '@nestjs/common';

/**
 * Serviço para sanitização e mascaramento de dados sensíveis
 */
@Injectable()
export class DataSanitizationService {
  private readonly logger = new Logger(DataSanitizationService.name);

  /**
   * Campos sensíveis que devem ser mascarados
   */
  private readonly sensitiveFields = [
    'password',
    'senha',
    'token',
    'secret',
    'apiKey',
    'api_key',
    'accessToken',
    'access_token',
    'refreshToken',
    'refresh_token',
    'authorization',
    'auth',
    'credential',
    'credential',
    'privateKey',
    'private_key',
    'clientSecret',
    'client_secret',
  ];

  /**
   * Mascara um valor sensível
   */
  maskValue(value: any, visibleChars: number = 4): string {
    if (!value || typeof value !== 'string') {
      return '***';
    }

    if (value.length <= visibleChars) {
      return '*'.repeat(value.length);
    }

    const visible = value.substring(0, visibleChars);
    const masked = '*'.repeat(Math.min(value.length - visibleChars, 20));
    return `${visible}${masked}`;
  }

  /**
   * Sanitiza um objeto removendo ou mascarando campos sensíveis
   */
  sanitizeObject(obj: any, options: { mask?: boolean; remove?: boolean } = {}): any {
    const { mask = true, remove = false } = options;

    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeObject(item, options));
    }

    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = this.sensitiveFields.some((field) =>
        lowerKey.includes(field.toLowerCase()),
      );

      if (isSensitive) {
        if (remove) {
          // Pular campo sensível
          continue;
        } else if (mask) {
          // Mascarar valor
          sanitized[key] = this.maskValue(value);
        } else {
          sanitized[key] = value;
        }
      } else if (typeof value === 'object' && value !== null) {
        // Recursivamente sanitizar objetos aninhados
        sanitized[key] = this.sanitizeObject(value, options);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Sanitiza dados para logs
   */
  sanitizeForLogs(data: any): any {
    return this.sanitizeObject(data, { mask: true, remove: false });
  }

  /**
   * Sanitiza dados para webhooks
   */
  sanitizeForWebhooks(data: any): any {
    return this.sanitizeObject(data, { mask: true, remove: false });
  }

  /**
   * Remove campos sensíveis completamente
   */
  removeSensitiveFields(data: any): any {
    return this.sanitizeObject(data, { mask: false, remove: true });
  }
}

