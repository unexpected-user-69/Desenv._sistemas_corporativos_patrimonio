import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { InventoryMobileService } from './inventory-mobile.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { CampaignResponseDto } from './dto/campaign-response.dto';
import { AssignmentResponseDto } from './dto/assignment-response.dto';
import { SyncPullDto } from './dto/sync-pull.dto';
import { SyncPushDto } from './dto/sync-push.dto';
import { SyncPullResponseDto, SyncPushResponseDto } from './dto/sync-response.dto';
import { SyncService } from './sync.service';
import { ReconcileDto, ReconciliationResponseDto } from './dto/reconcile.dto';
import { ReconciliationService } from './reconciliation.service';
import { ReportsService } from './reports.service';
import { CampaignReportDto } from './dto/campaign-report.dto';
import { Res } from '@nestjs/common';
import type { Response } from 'express';

@ApiTags('inventory-mobile')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class InventoryMobileController {
  constructor(
    private readonly inventoryMobileService: InventoryMobileService,
    private readonly syncService: SyncService,
    private readonly reconciliationService: ReconciliationService,
    private readonly reportsService: ReportsService,
  ) {}

  @Post('campaigns')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar campanha de inventário',
    description: 'Cria uma nova campanha de inventário físico',
  })
  @ApiBody({ type: CreateCampaignDto })
  @ApiCreatedResponse({
    description: 'Campanha criada com sucesso',
    type: CampaignResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async createCampaign(
    @Body() dto: CreateCampaignDto,
    @Request() req: any,
  ): Promise<CampaignResponseDto> {
    const ownerId = req.user?.sub;
    return this.inventoryMobileService.createCampaign(dto, ownerId);
  }

  @Get('campaigns/:id/assignments')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Listar assignments de uma campanha',
    description: 'Retorna os lotes (assignments) distribuídos para uma campanha',
  })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({
    description: 'Lista de assignments',
    type: [AssignmentResponseDto],
  })
  @ApiNotFoundResponse({ description: 'Campanha não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getCampaignAssignments(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ items: AssignmentResponseDto[]; total: number }> {
    return this.inventoryMobileService.getCampaignAssignments(id);
  }

  @Post('campaigns/:id/assignments')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Distribuir lotes para coletores',
    description: 'Distribui assignments (lotes) para coletores em uma campanha',
  })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiBody({ type: CreateAssignmentDto })
  @ApiCreatedResponse({
    description: 'Assignments distribuídos com sucesso',
    type: [AssignmentResponseDto],
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou campanha inválida' })
  @ApiNotFoundResponse({ description: 'Campanha não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async distributeAssignments(
    @Param('id', ParseUUIDPipe) campaignId: string,
    @Body() dto: CreateAssignmentDto,
  ): Promise<AssignmentResponseDto[]> {
    return this.inventoryMobileService.distributeAssignments(campaignId, dto);
  }

  @Post('sync/pull')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sincronização pull (mobile)',
    description: 'Busca dados atualizados para sincronização no dispositivo mobile',
  })
  @ApiBody({ type: SyncPullDto })
  @ApiOkResponse({
    description: 'Dados para sincronização',
    type: SyncPullResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async syncPull(
    @Body() dto: SyncPullDto,
    @Request() req: any,
  ): Promise<SyncPullResponseDto> {
    const coletorId = req.user?.sub;
    return this.syncService.pull(dto, coletorId);
  }

  @Post('sync/push')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Sincronização push (mobile)',
    description: 'Envia itens coletados do dispositivo mobile para o servidor',
  })
  @ApiBody({ type: SyncPushDto })
  @ApiOkResponse({
    description: 'Itens sincronizados',
    type: SyncPushResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async syncPush(
    @Body() dto: SyncPushDto,
    @Request() req: any,
  ): Promise<SyncPushResponseDto> {
    const coletorId = req.user?.sub;
    return this.syncService.push(dto, coletorId);
  }

  @Post('reconcile')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Executar conciliação de campanha',
    description: 'Compara itens coletados com a base cadastral e gera relatório de divergências',
  })
  @ApiBody({ type: ReconcileDto })
  @ApiOkResponse({
    description: 'Conciliação iniciada',
    type: ReconciliationResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou reconciliação já em processamento' })
  @ApiNotFoundResponse({ description: 'Campanha não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async reconcile(
    @Body() dto: ReconcileDto,
  ): Promise<ReconciliationResponseDto> {
    const reconciliation = await this.reconciliationService.reconcile(dto.campaignId);
    
    return {
      id: reconciliation.id,
      campaignId: reconciliation.campaignId,
      status: reconciliation.status,
      totalDivergencias: reconciliation.divergenciasJson.length,
      executedAt: reconciliation.executedAt,
      createdAt: reconciliation.createdAt,
    };
  }

  @Get('campaigns/:id/report')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Gerar relatório de campanha',
    description: 'Gera relatório completo com estatísticas da campanha',
  })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({
    description: 'Relatório gerado com sucesso',
    type: CampaignReportDto,
  })
  @ApiNotFoundResponse({ description: 'Campanha não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getCampaignReport(
    @Param('id', ParseUUIDPipe) campaignId: string,
  ): Promise<CampaignReportDto> {
    return this.reportsService.generateCampaignReport(campaignId);
  }

  @Get('campaigns/:id/export/csv')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Exportar divergências para CSV',
    description: 'Exporta todas as divergências da campanha em formato CSV',
  })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: 'Arquivo CSV gerado' })
  @ApiNotFoundResponse({ description: 'Campanha não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async exportDivergencesToCsv(
    @Param('id', ParseUUIDPipe) campaignId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.reportsService.exportDivergencesToCsv(campaignId, res);
  }

  @Get('campaigns/:id/export/excel')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Exportar relatório de campanha para Excel',
    description: 'Exporta relatório completo da campanha em formato Excel',
  })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: 'Arquivo Excel gerado' })
  @ApiNotFoundResponse({ description: 'Campanha não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async exportCampaignToExcel(
    @Param('id', ParseUUIDPipe) campaignId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.reportsService.exportCampaignToExcel(campaignId, res);
  }

  @Get('dashboard')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Dashboard de campanhas',
    description: 'Retorna estatísticas gerais de todas as campanhas',
  })
  @ApiOkResponse({ description: 'Dashboard gerado com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getDashboard(): Promise<any> {
    return this.reportsService.getCampaignsDashboard();
  }
}

