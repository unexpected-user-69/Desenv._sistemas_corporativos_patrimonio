import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Request,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { MaintenanceService } from './maintenance.service';
import { SlaService } from './services/sla.service';
import { CreateWorkOrderDto } from './dto/create-work-order.dto';
import { UpdateWorkOrderStatusDto } from './dto/update-work-order-status.dto';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { CreateMaintenancePlanDto } from './dto/create-maintenance-plan.dto';
import { QueryWorkOrdersDto } from './dto/query-work-orders.dto';
import { SlaMetricsQueryDto, SlaMetricsResponseDto, MttrResponseDto, MtbfResponseDto } from './dto/sla-metrics.dto';
import { WorkOrderResponseDto } from './dto/work-order-response.dto';
import { MaintenancePlanResponseDto } from './dto/maintenance-plan-response.dto';
import { PaginatedWorkOrdersResponseDto } from './dto/paginated-work-orders-response.dto';

@ApiTags('maintenance')
@Controller('v1/maintenance')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MaintenanceController {
  constructor(
    private readonly maintenanceService: MaintenanceService,
    private readonly slaService: SlaService,
  ) {}

  @Get('os')
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar ordens de serviço',
    description: 'Retorna lista paginada de OS com filtros e ordenação',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de OS retornada com sucesso',
    type: PaginatedWorkOrdersResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async listWorkOrders(
    @Query() query: QueryWorkOrdersDto,
  ): Promise<PaginatedWorkOrdersResponseDto> {
    return this.maintenanceService.listWorkOrders(query);
  }

  @Post('os')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Abrir nova OS',
    description: 'Cria uma nova ordem de serviço de manutenção',
  })
  @ApiBody({ type: CreateWorkOrderDto })
  @ApiResponse({
    status: 201,
    description: 'OS criada com sucesso',
    type: WorkOrderResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiNotFoundResponse({ description: 'Patrimônio não encontrado' })
  async createWorkOrder(
    @Body() dto: CreateWorkOrderDto,
    @Request() req: any,
  ): Promise<WorkOrderResponseDto> {
    const ownerId = req.user?.sub;
    return this.maintenanceService.createWorkOrder(dto, ownerId);
  }

  @Patch('os/:id/status')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Atualizar status da OS',
    description: 'Transiciona o status da OS seguindo o workflow válido',
  })
  @ApiBody({ type: UpdateWorkOrderStatusDto })
  @ApiResponse({
    status: 200,
    description: 'Status atualizado com sucesso',
    type: WorkOrderResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Transição de status inválida' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiNotFoundResponse({ description: 'OS não encontrada' })
  async updateWorkOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateWorkOrderStatusDto,
  ): Promise<WorkOrderResponseDto> {
    return this.maintenanceService.updateWorkOrderStatus(id, dto);
  }

  @Get('planos')
  @Roles(UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar planos preventivos',
    description: 'Retorna todos os planos de manutenção preventiva',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de planos',
    type: [MaintenancePlanResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async listMaintenancePlans(): Promise<MaintenancePlanResponseDto[]> {
    return this.maintenanceService.listMaintenancePlans();
  }

  @Post('planos')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar plano preventivo',
    description: 'Cria um novo plano de manutenção preventiva',
  })
  @ApiBody({ type: CreateMaintenancePlanDto })
  @ApiResponse({
    status: 201,
    description: 'Plano criado com sucesso',
    type: MaintenancePlanResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async createMaintenancePlan(
    @Body() dto: CreateMaintenancePlanDto,
    @Request() req: any,
  ): Promise<MaintenancePlanResponseDto> {
    const ownerId = req.user?.sub;
    return this.maintenanceService.createMaintenancePlan(dto, ownerId);
  }

  @Get('sla/metrics')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obter métricas de SLA',
    description: 'Retorna métricas consolidadas de SLA (MTTR, taxa de cumprimento, custos)',
  })
  @ApiResponse({
    status: 200,
    description: 'Métricas de SLA',
    type: SlaMetricsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getSlaMetrics(
    @Query() query: SlaMetricsQueryDto,
  ): Promise<SlaMetricsResponseDto> {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    return this.slaService.getSlaMetrics(startDate, endDate);
  }

  @Get('sla/mttr')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Calcular MTTR',
    description: 'Calcula o tempo médio para reparo (MTTR)',
  })
  @ApiResponse({
    status: 200,
    description: 'MTTR calculado',
    type: MttrResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getMTTR(@Query() query: SlaMetricsQueryDto): Promise<MttrResponseDto> {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    const mttr = await this.slaService.calculateMTTR(startDate, endDate);
    return {
      mttr,
      period: {
        start: startDate || null,
        end: endDate || null,
      },
    };
  }

  @Get('sla/mtbf/:patrimonioId')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Calcular MTBF',
    description: 'Calcula o tempo médio entre falhas (MTBF) para um patrimônio',
  })
  @ApiResponse({
    status: 200,
    description: 'MTBF calculado',
    type: MtbfResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getMTBF(
    @Param('patrimonioId', ParseUUIDPipe) patrimonioId: string,
    @Query() query: SlaMetricsQueryDto,
  ): Promise<MtbfResponseDto> {
    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;
    const mtbf = await this.slaService.calculateMTBF(patrimonioId, startDate, endDate);
    return {
      mtbf,
      patrimonioId,
    };
  }

  @Post('apontamentos')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar apontamento',
    description: 'Cria um apontamento de tempo/custo para uma OS',
  })
  @ApiBody({ type: CreateWorkLogDto })
  @ApiResponse({
    status: 201,
    description: 'Apontamento criado com sucesso',
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiNotFoundResponse({ description: 'OS não encontrada' })
  async createWorkLog(@Body() dto: CreateWorkLogDto): Promise<void> {
    return this.maintenanceService.createWorkLog(dto);
  }
}

