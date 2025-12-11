import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { NotificationsService } from './notifications.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { TemplateResponseDto } from './dto/template-response.dto';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { PolicyResponseDto } from './dto/policy-response.dto';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { WebhookResponseDto } from './dto/webhook-response.dto';
import { NotificationTestDto } from './dto/notification-test.dto';
import { QueueStatsResponseDto } from './dto/queue-stats-response.dto';
import { MetricsQueryDto } from './dto/metrics-query.dto';
import { MetricsResponseDto } from './dto/metrics-response.dto';
import { NotificationQueueService } from './services/notification-queue.service';
import { NotificationMetricsService } from './observability/notification-metrics.service';

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly queueService: NotificationQueueService,
    private readonly metricsService: NotificationMetricsService,
  ) {}

  @Post('test')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Enviar notificação de teste',
    description: 'Dispara uma notificação de teste usando um template',
  })
  @ApiResponse({
    status: 200,
    description: 'Notificação de teste enviada com sucesso',
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiNotFoundResponse({ description: 'Template não encontrado' })
  async sendTestNotification(@Body() dto: NotificationTestDto) {
    return this.notificationsService.sendTestNotification(dto);
  }

  // ========== TEMPLATES ==========

  @Post('templates')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar template de notificação',
    description: 'Cria um novo template de notificação',
  })
  @ApiResponse({
    status: 201,
    description: 'Template criado com sucesso',
    type: TemplateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiConflictResponse({ description: 'Template já existe' })
  async createTemplate(@Body() dto: CreateTemplateDto): Promise<TemplateResponseDto> {
    return this.notificationsService.createTemplate(dto);
  }

  @Get('templates')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar templates',
    description: 'Retorna todos os templates de notificação',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de templates',
    type: [TemplateResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async findAllTemplates(): Promise<TemplateResponseDto[]> {
    return this.notificationsService.findAllTemplates();
  }

  @Get('templates/:id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Buscar template por ID',
    description: 'Retorna um template específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Template encontrado',
    type: TemplateResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiNotFoundResponse({ description: 'Template não encontrado' })
  async findTemplateById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TemplateResponseDto> {
    return this.notificationsService.findTemplateById(id);
  }

  @Put('templates/:id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar template',
    description: 'Atualiza um template existente',
  })
  @ApiResponse({
    status: 200,
    description: 'Template atualizado com sucesso',
    type: TemplateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiNotFoundResponse({ description: 'Template não encontrado' })
  @ApiConflictResponse({ description: 'Conflito de key/version' })
  async updateTemplate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTemplateDto,
  ): Promise<TemplateResponseDto> {
    return this.notificationsService.updateTemplate(id, dto);
  }

  @Delete('templates/:id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover template',
    description: 'Remove um template',
  })
  @ApiResponse({
    status: 204,
    description: 'Template removido com sucesso',
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiNotFoundResponse({ description: 'Template não encontrado' })
  async deleteTemplate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.notificationsService.deleteTemplate(id);
  }

  // ========== POLICIES ==========

  @Post('policies')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar política de notificação',
    description: 'Cria uma nova política de notificação',
  })
  @ApiResponse({
    status: 201,
    description: 'Política criada com sucesso',
    type: PolicyResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async createPolicy(@Body() dto: CreatePolicyDto): Promise<PolicyResponseDto> {
    return this.notificationsService.createPolicy(dto);
  }

  @Get('policies')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar políticas de notificação',
    description: 'Retorna todas as políticas ativas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de políticas',
    type: [PolicyResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async findAllPolicies(): Promise<PolicyResponseDto[]> {
    return this.notificationsService.findActivePolicies();
  }

  // ========== WEBHOOKS ==========

  @Post('webhooks')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar webhook',
    description: 'Registra um novo endpoint de webhook com segredo HMAC',
  })
  @ApiResponse({
    status: 201,
    description: 'Webhook registrado com sucesso',
    type: WebhookResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiConflictResponse({ description: 'Webhook com mesma URL já existe' })
  async createWebhook(@Body() dto: CreateWebhookDto): Promise<WebhookResponseDto> {
    return this.notificationsService.createWebhook(dto);
  }

  @Get('webhooks')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar webhooks',
    description: 'Retorna todos os webhooks registrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de webhooks',
    type: [WebhookResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async findAllWebhooks(): Promise<WebhookResponseDto[]> {
    return this.notificationsService.findAllWebhooks();
  }

  // ========== QUEUE STATS ==========

  @Get('queue/stats')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Estatísticas da fila de notificações',
    description: 'Retorna estatísticas sobre jobs na fila (waiting, active, completed, failed)',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas da fila',
    type: QueueStatsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getQueueStats(): Promise<QueueStatsResponseDto> {
    return this.queueService.getQueueStats();
  }

  // ========== METRICS ==========

  @Get('metrics')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Métricas de notificações',
    description: 'Retorna métricas detalhadas de notificações (sucesso, falha, latência, throughput)',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas de notificações',
    type: MetricsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getMetrics(@Query() query: MetricsQueryDto): Promise<MetricsResponseDto> {
    const fromDate = query.fromDate
      ? new Date(query.fromDate)
      : new Date(Date.now() - 24 * 60 * 60 * 1000); // Últimas 24h
    const toDate = query.toDate ? new Date(query.toDate) : new Date();

    return this.metricsService.getMetrics(
      fromDate,
      toDate,
      query.eventKey,
      query.channel,
    );
  }

  @Get('metrics/summary')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Métricas resumidas (últimas 24h)',
    description: 'Retorna métricas resumidas das últimas 24 horas',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas resumidas',
    type: MetricsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getSummaryMetrics(): Promise<MetricsResponseDto> {
    return this.metricsService.getSummaryMetrics();
  }
}

