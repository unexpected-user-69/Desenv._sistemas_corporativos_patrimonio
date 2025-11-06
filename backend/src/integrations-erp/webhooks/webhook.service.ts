import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';
import { Execution, ExecutionStatus } from '../entities/execution.entity';
import { Connector } from '../entities/connector.entity';
import { DataSanitizationService } from '../security/data-sanitization.service';

export interface WebhookConfig {
  url: string;
  secret?: string;
  events: WebhookEvent[];
  retries?: number;
  timeout?: number;
}

export enum WebhookEvent {
  STARTED = 'started',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELED = 'canceled',
}

export interface WebhookPayload {
  event: WebhookEvent;
  executionId: string;
  connectorKey: string;
  status: ExecutionStatus;
  timestamp: Date;
  data?: any;
  signature?: string;
}

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  private readonly httpClient: AxiosInstance;
  private readonly webhookQueue: Map<string, Promise<void>> = new Map();

  constructor(
    @InjectRepository(Connector)
    private readonly connectorRepository: Repository<Connector>,
    private readonly sanitization: DataSanitizationService,
  ) {
    this.httpClient = axios.create({
      timeout: 10000, // 10 segundos
    });
  }

  /**
   * Dispara webhook para uma execução
   */
  async triggerWebhook(
    execution: Execution,
    event: WebhookEvent,
    data?: any,
  ): Promise<void> {
    const connector = await this.connectorRepository.findOne({
      where: { id: execution.connectorId },
    });

    if (!connector) {
      this.logger.warn(`Connector not found for execution ${execution.id}`);
      return;
    }

    const config = (connector.configJson as any)?.webhooks as WebhookConfig;
    if (!config || !config.url) {
      // Sem webhook configurado
      return;
    }

    // Verificar se o evento está configurado
    if (!config.events || !config.events.includes(event)) {
      return;
    }

    // Sanitizar dados antes de enviar
    const sanitizedData = this.sanitization.sanitizeForWebhooks(data);

    const payload: WebhookPayload = {
      event,
      executionId: execution.id,
      connectorKey: connector.key,
      status: execution.status,
      timestamp: new Date(),
      data: sanitizedData,
    };

    // Adicionar assinatura se houver secret
    if (config.secret) {
      payload.signature = this.generateSignature(payload, config.secret);
    }

    // Enfileirar webhook (execução assíncrona)
    const webhookKey = `${execution.id}-${event}`;
    const webhookPromise = this.sendWebhook(config, payload, 0);
    this.webhookQueue.set(webhookKey, webhookPromise);

    webhookPromise
      .then(() => {
        this.webhookQueue.delete(webhookKey);
      })
      .catch((error) => {
        this.logger.error(`Webhook failed for execution ${execution.id}`, error);
        this.webhookQueue.delete(webhookKey);
      });
  }

  /**
   * Envia webhook com retries
   */
  private async sendWebhook(
    config: WebhookConfig,
    payload: WebhookPayload,
    attempt: number,
  ): Promise<void> {
    const maxRetries = config.retries || 3;
    const timeout = config.timeout || 10000;

    try {
      await this.httpClient.post(config.url, payload, {
        timeout,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'integrations-erp/1.0',
        },
      });

      this.logger.log(
        `Webhook sent successfully to ${config.url} for event ${payload.event}`,
      );
    } catch (error: any) {
      if (attempt < maxRetries) {
        // Retry com backoff exponencial
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
        this.logger.warn(
          `Webhook attempt ${attempt + 1}/${maxRetries} failed, retrying in ${delay}ms`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.sendWebhook(config, payload, attempt + 1);
      } else {
        this.logger.error(
          `Webhook failed after ${maxRetries} attempts to ${config.url}`,
          error.message,
        );
        throw error;
      }
    }
  }

  /**
   * Gera assinatura HMAC para webhook
   */
  private generateSignature(payload: WebhookPayload, secret: string): string {
    const payloadString = JSON.stringify(payload);
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payloadString);
    return hmac.digest('hex');
  }

  /**
   * Verifica assinatura de webhook
   */
  verifySignature(payload: WebhookPayload, secret: string): boolean {
    if (!payload.signature) {
      return false;
    }

    const expectedSignature = this.generateSignature(payload, secret);
    return crypto.timingSafeEqual(
      Buffer.from(payload.signature),
      Buffer.from(expectedSignature),
    );
  }
}

