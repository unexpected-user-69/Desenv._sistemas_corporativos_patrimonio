import {
  Controller,
  All,
  Req,
  Res,
  Param,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { ProxyService } from './proxy.service';

@ApiTags('gateway')
@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Public()
  @Get('services/health')
  @ApiOperation({ summary: 'Health check de todos os microsserviços' })
  async getServicesHealth() {
    return {
      gateway: 'healthy',
      services: this.proxyService.getAllServicesHealth(),
      timestamp: new Date().toISOString(),
    };
  }

  @Public()
  @All(':service/*path')
  @ApiOperation({ summary: 'Proxy para microsserviços' })
  @ApiParam({ name: 'service', description: 'Nome do serviço (auth, users, events, audit, categorias, patrimonio)' })
  @ApiParam({ name: 'path', description: 'Caminho dentro do serviço' })
  async proxyToService(
    @Param('service') service: string,
    @Param('path') pathParam: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // Build the full path: /service/path
      // Example: /api/auth/login -> /auth/login
      const path = '/' + service + '/' + pathParam;
      
      // Extract headers (excluding host)
      const headers: Record<string, string> = {};
      Object.keys(req.headers).forEach(key => {
        if (key !== 'host' && typeof req.headers[key] === 'string') {
          headers[key] = req.headers[key] as string;
        }
      });

      const result = await this.proxyService.proxyRequest(
        service,
        path,
        req.method,
        req.body,
        headers,
        req.query as Record<string, any>,
      );

      res.status(HttpStatus.OK).json(result);
    } catch (error: any) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response || error.message || 'Internal server error';
      
      res.status(status).json({
        ok: false,
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }
  }
}

