import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationTemplate, NotificationChannel } from './entities/notification-template.entity';
import { NotificationPolicy, NotificationPriority } from './entities/notification-policy.entity';
import { Webhook } from './entities/webhook.entity';
import { NotificationLog, NotificationStatus } from './entities/notification-log.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateResponseDto } from './dto/template-response.dto';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { PolicyResponseDto } from './dto/policy-response.dto';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { WebhookResponseDto } from './dto/webhook-response.dto';
import { NotificationTestDto } from './dto/notification-test.dto';
import { TemplateEngineService } from './services/template-engine.service';
import { NotificationSenderService } from './services/notification-sender.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(NotificationTemplate)
    private templateRepository: Repository<NotificationTemplate>,
    @InjectRepository(NotificationPolicy)
    private policyRepository: Repository<NotificationPolicy>,
    @InjectRepository(Webhook)
    private webhookRepository: Repository<Webhook>,
    @InjectRepository(NotificationLog)
    private logRepository: Repository<NotificationLog>,
    private templateEngine: TemplateEngineService,
    private notificationSender: NotificationSenderService,
  ) {}

  // ========== TEMPLATES ==========

  async createTemplate(dto: CreateTemplateDto): Promise<TemplateResponseDto> {
    // Verificar se já existe template com mesma key e version
    const existing = await this.templateRepository.findOne({
      where: { key: dto.key, version: dto.version || 1 },
    });

    if (existing) {
      throw new ConflictException(
        `Template com key "${dto.key}" e versão ${dto.version || 1} já existe`,
      );
    }

    const template = this.templateRepository.create({
      key: dto.key,
      version: dto.version || 1,
      channel: dto.channel,
      subject: dto.subject,
      body: dto.body,
      locale: dto.locale || 'pt-BR',
    });

    const saved = await this.templateRepository.save(template);
    this.logger.log(`Template criado: ${saved.id} (${saved.key} v${saved.version})`);

    return this.toTemplateResponseDto(saved);
  }

  async findAllTemplates(): Promise<TemplateResponseDto[]> {
    const templates = await this.templateRepository.find({
      order: { key: 'ASC', version: 'DESC' },
    });

    return templates.map((t) => this.toTemplateResponseDto(t));
  }

  async findTemplateById(id: string): Promise<TemplateResponseDto> {
    const template = await this.templateRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException(`Template ${id} não encontrado`);
    }

    return this.toTemplateResponseDto(template);
  }

  async updateTemplate(id: string, dto: UpdateTemplateDto): Promise<TemplateResponseDto> {
    const template = await this.templateRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException(`Template ${id} não encontrado`);
    }

    // Se estiver atualizando key ou version, verificar conflito
    if (dto.key || dto.version) {
      const newKey = dto.key || template.key;
      const newVersion = dto.version || template.version;

      if (newKey !== template.key || newVersion !== template.version) {
        const existing = await this.templateRepository.findOne({
          where: { key: newKey, version: newVersion },
        });

        if (existing && existing.id !== id) {
          throw new ConflictException(
            `Template com key "${newKey}" e versão ${newVersion} já existe`,
          );
        }
      }
    }

    Object.assign(template, dto);
    const saved = await this.templateRepository.save(template);

    this.logger.log(`Template atualizado: ${saved.id}`);
    return this.toTemplateResponseDto(saved);
  }

  async deleteTemplate(id: string): Promise<void> {
    const template = await this.templateRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException(`Template ${id} não encontrado`);
    }

    await this.templateRepository.remove(template);
    this.logger.log(`Template removido: ${id}`);
  }

  // ========== POLICIES ==========

  async createPolicy(dto: CreatePolicyDto): Promise<PolicyResponseDto> {
    const policy = this.policyRepository.create({
      eventKey: dto.eventKey,
      priority: dto.priority || NotificationPriority.MEDIUM,
      channels: dto.channels,
      enabled: dto.enabled !== undefined ? dto.enabled : true,
    });

    const saved = await this.policyRepository.save(policy);
    this.logger.log(`Política criada: ${saved.id} (${saved.eventKey})`);

    return this.toPolicyResponseDto(saved);
  }

  async findAllPolicies(): Promise<PolicyResponseDto[]> {
    const policies = await this.policyRepository.find({
      order: { eventKey: 'ASC' },
    });

    return policies.map((p) => this.toPolicyResponseDto(p));
  }

  async findActivePolicies(): Promise<PolicyResponseDto[]> {
    const policies = await this.policyRepository.find({
      where: { enabled: true },
      order: { eventKey: 'ASC' },
    });

    return policies.map((p) => this.toPolicyResponseDto(p));
  }

  // ========== WEBHOOKS ==========

  async createWebhook(dto: CreateWebhookDto): Promise<WebhookResponseDto> {
    // Verificar se já existe webhook com mesma URL
    const existing = await this.webhookRepository.findOne({
      where: { url: dto.url },
    });

    if (existing) {
      throw new ConflictException(`Webhook com URL "${dto.url}" já existe`);
    }

    const webhook = this.webhookRepository.create({
      name: dto.name,
      url: dto.url,
      secret: dto.secret,
      enabled: dto.enabled !== undefined ? dto.enabled : true,
    });

    const saved = await this.webhookRepository.save(webhook);
    this.logger.log(`Webhook criado: ${saved.id} (${saved.name})`);

    return this.toWebhookResponseDto(saved);
  }

  async findAllWebhooks(): Promise<WebhookResponseDto[]> {
    const webhooks = await this.webhookRepository.find({
      order: { name: 'ASC' },
    });

    return webhooks.map((w) => this.toWebhookResponseDto(w));
  }

  // ========== TEST NOTIFICATION ==========

  async sendTestNotification(dto: NotificationTestDto): Promise<{ success: boolean; message: string }> {
    // Buscar template
    const template = await this.templateRepository.findOne({
      where: { key: dto.templateKey, channel: dto.channel },
      order: { version: 'DESC' }, // Pegar versão mais recente
    });

    if (!template) {
      throw new NotFoundException(
        `Template não encontrado para key "${dto.templateKey}" e canal "${dto.channel}"`,
      );
    }

    // Renderizar template usando Handlebars
    const rendered = this.templateEngine.renderTemplate(template, dto.data || {});

    // Enviar notificação via NotificationSenderService
    await this.notificationSender.sendNotification(
      dto.templateKey,
      dto.data || {},
      dto.recipient,
    );

    this.logger.log(
      `Notificação de teste enviada: ${dto.channel} -> ${dto.recipient || 'N/A'}`,
    );

    return {
      success: true,
      message: `Notificação de teste enviada com sucesso. Template renderizado: ${rendered.subject || 'N/A'}`,
    };
  }

  // ========== HELPERS ==========

  private toTemplateResponseDto(template: NotificationTemplate): TemplateResponseDto {
    return {
      id: template.id,
      key: template.key,
      version: template.version,
      channel: template.channel,
      subject: template.subject,
      body: template.body,
      locale: template.locale,
      createdAt: template.createdAt,
      updatedAt: template.updatedAt,
    };
  }

  private toPolicyResponseDto(policy: NotificationPolicy): PolicyResponseDto {
    return {
      id: policy.id,
      eventKey: policy.eventKey,
      priority: policy.priority,
      channels: policy.channels,
      enabled: policy.enabled,
      createdAt: policy.createdAt,
      updatedAt: policy.updatedAt,
    };
  }

  private toWebhookResponseDto(webhook: Webhook): WebhookResponseDto {
    return {
      id: webhook.id,
      name: webhook.name,
      url: webhook.url,
      enabled: webhook.enabled,
      createdAt: webhook.createdAt,
      updatedAt: webhook.updatedAt,
    };
  }

}

