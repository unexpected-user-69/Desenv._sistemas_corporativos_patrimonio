import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { MetricsInterceptor } from '../interceptors/metrics.interceptor';
import type { MetricsData } from '../interceptors/metrics.interceptor';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsInterceptor: MetricsInterceptor) {}

  @Get()
  @ApiOperation({ summary: 'Obter métricas da aplicação' })
  @ApiOkResponse({ description: 'Métricas da aplicação' })
  getMetrics(): MetricsData {
    return this.metricsInterceptor.getMetrics();
  }

  @Get('reset')
  @ApiOperation({ summary: 'Resetar métricas da aplicação' })
  @ApiOkResponse({ description: 'Métricas resetadas com sucesso' })
  resetMetrics() {
    this.metricsInterceptor.resetMetrics();
    return { message: 'Métricas resetadas com sucesso' };
  }
}
