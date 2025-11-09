import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
  ParseEnumPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ReportMetricsService } from './services/report-metrics.service';
import { ReportQuotaService } from './services/report-quota.service';
import { MetricsQueryDto } from './dto/metrics-query.dto';
import { ReportMetrics } from './services/report-metrics.service';
import { QuotaResponseDto } from './dto/quota-response.dto';
import { ReportModel } from './entities/report-request.entity';

@ApiTags('reports-metrics')
@ApiBearerAuth()
@Controller('reports/metrics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsMetricsController {
  constructor(
    private readonly metricsService: ReportMetricsService,
    private readonly quotaService: ReportQuotaService,
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter métricas de relatórios' })
  @ApiResponse({
    status: 200,
    description: 'Métricas obtidas com sucesso',
    type: Object,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getMetrics(@Query() query: MetricsQueryDto, @Request() req: any): Promise<ReportMetrics> {
    // Se não for admin, filtrar apenas métricas do próprio usuário
    const userId = req.user?.role === UserRole.ADMIN ? query.userId : req.user?.id || req.user?.sub;

    const toDate = query.toDate ? new Date(query.toDate) : new Date();
    const fromDate = query.fromDate
      ? new Date(query.fromDate)
      : new Date(toDate.getTime() - 24 * 60 * 60 * 1000); // Últimas 24h por padrão

    if (userId) {
      return this.metricsService.getMetricsByUser(userId, fromDate, toDate);
    }

    return this.metricsService.getMetrics(fromDate, toDate, undefined, query.model);
  }

  @Get('summary')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter métricas resumidas (últimas 24 horas)' })
  @ApiResponse({
    status: 200,
    description: 'Métricas resumidas obtidas com sucesso',
    type: Object,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getSummaryMetrics(@Request() req: any): Promise<ReportMetrics> {
    // Se não for admin, mostrar apenas métricas do próprio usuário
    const userId = req.user?.role === UserRole.ADMIN ? undefined : req.user?.id || req.user?.sub;
    return this.metricsService.getSummaryMetrics(userId);
  }

  @Get('model/:model')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter métricas por modelo de relatório' })
  @ApiResponse({
    status: 200,
    description: 'Métricas por modelo obtidas com sucesso',
    type: Object,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  @ApiResponse({ status: 400, description: 'Modelo inválido' })
  async getMetricsByModel(
    @Param('model', new ParseEnumPipe(ReportModel, {
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: () => new BadRequestException(
        `Modelo inválido. Valores válidos: ${Object.values(ReportModel).join(', ')}`
      ),
    })) model: ReportModel,
    @Query() query: MetricsQueryDto,
  ): Promise<ReportMetrics> {
    const toDate = query.toDate ? new Date(query.toDate) : new Date();
    const fromDate = query.fromDate
      ? new Date(query.fromDate)
      : new Date(toDate.getTime() - 24 * 60 * 60 * 1000);

    return this.metricsService.getMetricsByModel(model, fromDate, toDate);
  }

  @Get('quota')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter quota atual do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Quota obtida com sucesso',
    type: QuotaResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getQuota(@Request() req: any, @Query('periodType') periodType?: string): Promise<QuotaResponseDto> {
    const userId = req.user?.id || req.user?.sub;
    const period = (periodType as 'daily' | 'weekly' | 'monthly') || 'monthly';

    const quota = await this.quotaService.getQuota(userId, period);

    return {
      id: quota.id,
      userId: quota.userId,
      limit: quota.limit,
      used: quota.used,
      periodStart: quota.periodStart,
      periodEnd: quota.periodEnd,
      periodType: quota.periodType,
      createdAt: quota.createdAt,
      updatedAt: quota.updatedAt,
    };
  }

  @Get('quota/:userId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter quota de um usuário (ADMIN)' })
  @ApiResponse({
    status: 200,
    description: 'Quota obtida com sucesso',
    type: QuotaResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getUserQuota(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('periodType') periodType?: string,
  ): Promise<QuotaResponseDto> {
    const period = (periodType as 'daily' | 'weekly' | 'monthly') || 'monthly';

    const quota = await this.quotaService.getQuota(userId, period);

    return {
      id: quota.id,
      userId: quota.userId,
      limit: quota.limit,
      used: quota.used,
      periodStart: quota.periodStart,
      periodEnd: quota.periodEnd,
      periodType: quota.periodType,
      createdAt: quota.createdAt,
      updatedAt: quota.updatedAt,
    };
  }
}


