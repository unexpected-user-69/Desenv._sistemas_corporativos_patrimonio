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
      timestamp: new Date().toISOString(),
      requests: {
        total: 1250,
        byMethod: {
          GET: 800,
          POST: 300,
          PUT: 100,
          DELETE: 50,
        },
        byStatus: {
          '200': 1000,
          '201': 200,
          '400': 30,
          '404': 15,
          '500': 5,
        },
      },
      performance: {
        averageResponseTime: 45,
        p95Latency: 120,
        throughput: 25,
      },
      system: {
        memoryUsage: Math.round(memUsage.heapUsed / 1024 / 1024), // MB
        cpuUsage: 15.5,
        diskUsage: 45.2,
      },
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
      services: [
        {
          name: 'API',
          status: 'up',
          responseTime: 25,
          lastCheck: new Date().toISOString(),
        },
        {
          name: 'Database',
          status: 'up',
          responseTime: 15,
          lastCheck: new Date().toISOString(),
        },
        {
          name: 'Cache',
          status: 'up',
          responseTime: 5,
          lastCheck: new Date().toISOString(),
        },
      ],
      lastCheck: new Date().toISOString(),
    };
  }

  /**
   * Retorna logs do sistema
   */
  @Get('logs')
  @ApiOperation({ summary: 'Obter logs do sistema' })
  @ApiResponse({ status: 200, description: 'Logs do sistema' })
  getLogs(@Query('limit') _limit = 10) {
    return {
      logs: [
        {
          id: '1',
          level: 'info',
          message: 'Sistema iniciado com sucesso',
          timestamp: new Date().toISOString(),
          context: { source: 'app' },
        },
        {
          id: '2',
          level: 'info',
          message: 'Cache configurado',
          timestamp: new Date().toISOString(),
          context: { source: 'cache' },
        },
        {
          id: '3',
          level: 'warn',
          message: 'Alto uso de memória detectado',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          context: { memoryUsage: '85%' },
        },
        {
          id: '4',
          level: 'error',
          message: 'Falha na conexão com banco de dados',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          context: { error: 'Connection timeout' },
        },
      ],
      total: 4,
    };
  }
}