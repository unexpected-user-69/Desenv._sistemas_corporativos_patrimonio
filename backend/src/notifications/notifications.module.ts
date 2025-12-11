import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { LoggerModule } from '../common/logger/logger.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationTemplate } from './entities/notification-template.entity';
import { NotificationPolicy } from './entities/notification-policy.entity';
import { Webhook } from './entities/webhook.entity';
import { NotificationLog } from './entities/notification-log.entity';
import { TemplateEngineService } from './services/template-engine.service';
import { NotificationSenderService } from './services/notification-sender.service';
import { NotificationQueueService } from './services/notification-queue.service';
import { EmailChannelService } from './services/channels/email-channel.service';
import { WebhookChannelService } from './services/channels/webhook-channel.service';
import { NotificationProcessor } from './processors/notification.processor';
import { NotificationMetricsService } from './observability/notification-metrics.service';
import { NotificationStructuredLoggerService } from './observability/notification-structured-logger.service';
import { NotificationTracingService } from './observability/notification-tracing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationTemplate,
      NotificationPolicy,
      Webhook,
      NotificationLog,
    ]),
    // ConfigModule removido - agora está global no AppModule
    LoggerModule,
    // BullModule.forRoot deve estar configurado no AppModule ou em um módulo compartilhado
    // Aqui apenas registramos a fila específica
    BullModule.registerQueue({
      name: 'notification-queue',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: {
          age: 24 * 3600, // 24 horas
          count: 1000,
        },
        removeOnFail: {
          age: 7 * 24 * 3600, // 7 dias (DLQ)
        },
      },
    }),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    TemplateEngineService,
    NotificationSenderService,
    NotificationQueueService,
    EmailChannelService,
    WebhookChannelService,
    NotificationProcessor,
    NotificationMetricsService,
    NotificationStructuredLoggerService,
    NotificationTracingService,
  ],
  exports: [NotificationsService, NotificationSenderService, NotificationQueueService],
})
export class NotificationsModule {}

