import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WebhookEvent } from './webhook.service';

export class WebhookConfigDto {
  @ApiProperty({ description: 'URL do webhook', example: 'https://example.com/webhook' })
  url!: string;

  @ApiPropertyOptional({
    description: 'Secret para assinatura HMAC (opcional)',
    example: 'your-secret-key',
  })
  secret?: string;

  @ApiProperty({
    description: 'Eventos para disparar webhook',
    enum: WebhookEvent,
    isArray: true,
    example: [WebhookEvent.STARTED, WebhookEvent.SUCCESS, WebhookEvent.FAILED],
  })
  events!: WebhookEvent[];

  @ApiPropertyOptional({
    description: 'Número de tentativas em caso de falha',
    example: 3,
    default: 3,
  })
  retries?: number;

  @ApiPropertyOptional({
    description: 'Timeout em milissegundos',
    example: 10000,
    default: 10000,
  })
  timeout?: number;
}

