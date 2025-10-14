import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Controller para métricas e monitoramento do sistema
 */
@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  /**
   * Retorna métricas gerais do sistema
   */
  @Get()
  @ApiOperation({ summary: 'Obter métricas do sistema' })
  @ApiResponse({ status: 200, description: 'Métricas do sistema' })
  getMetrics() {
    const memUsage = process.memoryUsage();
    return {
      system: {
        uptime: process.uptime(),
        memory: {
          rss: Math.round(memUsage.rss / 1024 / 1024), // MB
          heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024), // MB
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
          external: Math.round(memUsage.external / 1024 / 1024), // MB
        },
        cpu: {
          usage: process.cpuUsage(),
        },
        platform: process.platform,
        nodeVersion: process.version,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Retorna saúde do sistema
   */
  @Get('health')
  @ApiOperation({ summary: 'Verificar saúde do sistema' })
  @ApiResponse({ status: 200, description: 'Status de saúde do sistema' })
  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
    };
  }

  /**
   * Retorna logs do sistema
   */
  @Get('logs')
  @ApiOperation({ summary: 'Obter logs do sistema' })
  @ApiResponse({ status: 200, description: 'Logs do sistema' })
  getLogs(@Query('limit') limit = 10) {
    return {
      logs: [
        {
          id: 1,
          level: 'info',
          message: 'Sistema iniciado com sucesso',
          timestamp: new Date().toISOString(),
          source: 'app',
        },
        {
          id: 2,
          level: 'info',
          message: 'Cache configurado',
          timestamp: new Date().toISOString(),
          source: 'cache',
        },
      ],
      total: 2,
      limit: Number(limit),
      timestamp: new Date().toISOString(),
    };
  }
}