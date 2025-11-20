import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';

@Controller()
@ApiTags('health')
export class HealthController {
  @Get('health')
  @Public()
  @ApiOperation({ 
    summary: 'Health check do serviço',
    description: 'Retorna o status de saúde do serviço, incluindo timestamp e uptime.',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Serviço está funcionando',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', format: 'date-time' },
        uptime: { type: 'number', example: 1234.56 },
        service: { type: 'string', example: 'categorias-service' },
        version: { type: 'string', example: '1.0.0' },
      },
    },
  })
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'categorias-service',
      version: process.env.npm_package_version || '1.0.0',
    };
  }
}




