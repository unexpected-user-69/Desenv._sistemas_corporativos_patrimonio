import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';
import { Webhook } from '../../entities/webhook.entity';

/**
 * Serviço responsável por enviar notificações via Webhook (HTTP POST)
 */
@Injectable()
export class WebhookChannelService {
  private readonly logger = new Logger(WebhookChannelService.name);
  private readonly httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      timeout: 10000, // 10 segundos
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Envia uma notificação para um webhook com assinatura HMAC
   */
  async sendWebhook(
    webhook: Webhook,
    payload: Record<string, any>,
  ): Promise<{ success: boolean; statusCode?: number; error?: string }> {
    try {
      // Criar assinatura HMAC
      const signature = this.createHmacSignature(JSON.stringify(payload), webhook.secret);

      // Enviar requisição
      const response = await this.httpClient.post(webhook.url, payload, {
        headers: {
          'X-Webhook-Signature': signature,
          'X-Webhook-Id': webhook.id,
          'X-Webhook-Name': webhook.name,
        },
      });

      this.logger.log(`Webhook enviado com sucesso: ${webhook.name} (${webhook.url})`);

      return {
        success: true,
        statusCode: response.status,
      };
    } catch (error: any) {
      this.logger.error(`Erro ao enviar webhook ${webhook.name}:`, error.message);

      return {
        success: false,
        statusCode: error.response?.status,
        error: error.message,
      };
    }
  }

  /**
   * Cria assinatura HMAC SHA256 do payload
   */
  private createHmacSignature(payload: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  /**
   * Valida assinatura HMAC recebida
   */
  validateSignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = this.createHmacSignature(payload, secret);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  }

  /**
   * Valida se uma URL é válida
   */
  validateUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}



