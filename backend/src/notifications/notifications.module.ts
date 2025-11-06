import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationTemplate } from './entities/notification-template.entity';
import { NotificationPolicy } from './entities/notification-policy.entity';
import { Webhook } from './entities/webhook.entity';
import { NotificationLog } from './entities/notification-log.entity';
import { TemplateEngineService } from './services/template-engine.service';
import { NotificationSenderService } from './services/notification-sender.service';
import { EmailChannelService } from './services/channels/email-channel.service';
import { WebhookChannelService } from './services/channels/webhook-channel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationTemplate,
      NotificationPolicy,
      Webhook,
      NotificationLog,
    ]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    TemplateEngineService,
    NotificationSenderService,
    EmailChannelService,
    WebhookChannelService,
  ],
  exports: [NotificationsService, NotificationSenderService],
})
export class NotificationsModule {}

