import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
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
import { IntegrationsErpService } from './integrations-erp.service';
import { RunIntegrationDto } from './dto/run-integration.dto';
import {
  RunIntegrationResponseDto,
  ExecutionResponseDto,
} from './dto/execution-response.dto';
import { ListExecutionsDto, PaginatedExecutionsResponseDto } from './dto/list-executions.dto';
import { ReconciliationSummaryDto } from './dto/reconciliation-summary.dto';
import { ConnectorMetricsDto } from './dto/metrics.dto';
import { HealthCheckResultDto, IntegrationHealthDto } from './dto/health-check.dto';

@ApiTags('integrations-erp')
@Controller('v1/integrations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class IntegrationsErpController {
  constructor(
    private readonly integrationsErpService: IntegrationsErpService,
  ) {}

  @Post('run')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Disparar integração ERP',
    description: 'Inicia uma execução de importação ou exportação com um conector ERP',
  })
  @ApiBody({ type: RunIntegrationDto })
  @ApiCreatedResponse({
    description: 'Integração enfileirada com sucesso',
    type: RunIntegrationResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou conector desabilitado' })
  @ApiNotFoundResponse({ description: 'Conector não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async runIntegration(
    @Body() dto: RunIntegrationDto,
    // @User() user: any, // TODO: Implementar decorator @User quando disponível
  ): Promise<RunIntegrationResponseDto> {
    return this.integrationsErpService.runIntegration(
      dto,
      // user?.email || user?.id, // TODO: Usar quando @User estiver disponível
    );
  }

  @Get('executions')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({
    summary: 'Listar execuções',
    description: 'Lista execuções de integração com filtros e paginação',
  })
  @ApiQuery({ name: 'connectorKey', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: ['queued', 'running', 'success', 'failed', 'canceled'] })
  @ApiQuery({ name: 'type', required: false, enum: ['import', 'export'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({
    description: 'Lista de execuções',
    type: PaginatedExecutionsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async listExecutions(
    @Query() dto: ListExecutionsDto,
  ): Promise<PaginatedExecutionsResponseDto> {
    return this.integrationsErpService.listExecutions(dto);
  }

  @Get('executions/:id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({
    summary: 'Detalhes da execução',
    description: 'Retorna detalhes completos de uma execução, incluindo logs',
  })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({
    description: 'Detalhes da execução',
    type: ExecutionResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Execução não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getExecutionById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ExecutionResponseDto> {
    return this.integrationsErpService.getExecutionById(id);
  }

  @Get('executions/:id/reconciliation')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({
    summary: 'Sumário de reconciliação',
    description: 'Retorna sumário detalhado de reconciliação de uma execução',
  })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({
    description: 'Sumário de reconciliação',
    type: ReconciliationSummaryDto,
  })
  @ApiNotFoundResponse({ description: 'Execução não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getReconciliationSummary(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReconciliationSummaryDto> {
    return this.integrationsErpService.getReconciliationSummary(id);
  }

  @Get('metrics')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({
    summary: 'Métricas de integrações',
    description: 'Retorna métricas de todas as integrações ou de um conector específico',
  })
  @ApiQuery({ name: 'connectorKey', required: false, type: String })
  @ApiQuery({ name: 'fromDate', required: false, type: String, format: 'date-time' })
  @ApiQuery({ name: 'toDate', required: false, type: String, format: 'date-time' })
  @ApiOkResponse({
    description: 'Métricas das integrações',
    type: [ConnectorMetricsDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getMetrics(
    @Query('connectorKey') connectorKey?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ): Promise<ConnectorMetricsDto | ConnectorMetricsDto[]> {
    const from = fromDate ? new Date(fromDate) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    const to = toDate ? new Date(toDate) : new Date();

    if (connectorKey) {
      return this.integrationsErpService.getConnectorMetrics(connectorKey, from, to);
    }
    return this.integrationsErpService.getAllConnectorsMetrics(from, to);
  }

  @Get('health')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({
    summary: 'Health check das integrações',
    description: 'Verifica a saúde de todas as integrações ou de uma específica',
  })
  @ApiQuery({ name: 'connectorKey', required: false, type: String })
  @ApiOkResponse({
    description: 'Status de saúde das integrações',
    type: HealthCheckResultDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getHealth(
    @Query('connectorKey') connectorKey?: string,
  ): Promise<HealthCheckResultDto | IntegrationHealthDto> {
    if (connectorKey) {
      return this.integrationsErpService.getIntegrationHealth(connectorKey);
    }
    return this.integrationsErpService.getAllIntegrationsHealth();
  }
}

