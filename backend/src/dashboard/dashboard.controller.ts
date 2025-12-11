import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas gerais do dashboard' })
  @ApiOkResponse({ description: 'Estatísticas do dashboard retornadas com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  async getDashboardStats() {
    return this.dashboardService.getDashboardStats();
  }

  @Get('users/growth')
  @ApiOperation({ summary: 'Obter dados de crescimento de usuários' })
  @ApiQuery({ name: 'period', required: false, description: 'Período (ex: 30d, 7d)' })
  @ApiOkResponse({ description: 'Dados de crescimento de usuários' })
  async getUserGrowthData(@Query('period') period: string = '30d') {
    return this.dashboardService.getUserGrowthData(period);
  }

  @Get('patrimonios/growth')
  @ApiOperation({ summary: 'Obter dados de crescimento de patrimônios' })
  @ApiQuery({ name: 'period', required: false, description: 'Período (ex: 30d, 7d)' })
  @ApiOkResponse({ description: 'Dados de crescimento de patrimônios' })
  async getPatrimonioGrowthData(@Query('period') period: string = '30d') {
    return this.dashboardService.getPatrimonioGrowthData(period);
  }

  @Get('system/metrics')
  @ApiOperation({ summary: 'Obter métricas do sistema' })
  @ApiQuery({ name: 'period', required: false, description: 'Período (ex: 1h, 24h)' })
  @ApiOkResponse({ description: 'Métricas do sistema' })
  async getSystemMetrics(@Query('period') period: string = '1h') {
    return this.dashboardService.getSystemMetrics(period);
  }

  @Get('cache/metrics')
  @ApiOperation({ summary: 'Obter métricas do cache' })
  @ApiQuery({ name: 'period', required: false, description: 'Período (ex: 1h, 24h)' })
  @ApiOkResponse({ description: 'Métricas do cache' })
  async getCacheMetrics(@Query('period') period: string = '1h') {
    return this.dashboardService.getCacheMetrics(period);
  }

  @Get('activity/recent')
  @ApiOperation({ summary: 'Obter atividade recente' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de atividades' })
  @ApiOkResponse({ description: 'Atividade recente' })
  async getRecentActivity(@Query('limit') limit: number = 10) {
    return this.dashboardService.getRecentActivity(limit);
  }

  @Get('metrics/realtime')
  @ApiOperation({ summary: 'Obter métricas em tempo real' })
  @ApiOkResponse({ description: 'Métricas em tempo real' })
  async getRealtimeMetrics() {
    return this.dashboardService.getRealtimeMetrics();
  }

  @Get('performance/metrics')
  @ApiOperation({ summary: 'Obter métricas de performance' })
  @ApiOkResponse({ description: 'Métricas de performance' })
  async getPerformanceMetrics() {
    return this.dashboardService.getPerformanceMetrics();
  }

  @Get('users/activity')
  @ApiOperation({ summary: 'Obter métricas de atividade de usuários' })
  @ApiQuery({ name: 'period', required: false, description: 'Período (ex: 7d, 30d)' })
  @ApiOkResponse({ description: 'Métricas de atividade de usuários' })
  async getUserActivityMetrics(@Query('period') period: string = '7d') {
    return this.dashboardService.getUserActivityMetrics(period);
  }
}

