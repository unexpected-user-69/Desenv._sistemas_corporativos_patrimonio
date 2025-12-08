import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CircuitBreakerService } from './circuit-breaker.service';

export interface ServiceConfig {
  name: string;
  baseUrl: string;
  timeout?: number;
}

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  
  private readonly services: Map<string, ServiceConfig> = new Map([
    ['auth', {
      name: 'auth-service',
      baseUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
      timeout: 10000,
    }],
    ['users', {
      name: 'users-service',
      baseUrl: process.env.USERS_SERVICE_URL || 'http://localhost:3002',
      timeout: 10000,
    }],
    ['events', {
      name: 'events-service',
      baseUrl: process.env.EVENTS_SERVICE_URL || 'http://localhost:3006',
      timeout: 10000,
    }],
    ['audit', {
      name: 'audit-service',
      baseUrl: process.env.AUDIT_SERVICE_URL || 'http://localhost:3005',
      timeout: 10000,
    }],
    ['categorias', {
      name: 'categorias-service',
      baseUrl: process.env.CATEGORIAS_SERVICE_URL || 'http://localhost:3004',
      timeout: 10000,
    }],
    ['patrimonio', {
      name: 'patrimonio-service',
      baseUrl: process.env.PATRIMONIO_SERVICE_URL || 'http://localhost:3003',
      timeout: 10000,
    }],
  ]);

  constructor(
    private readonly httpService: HttpService,
    private readonly circuitBreaker: CircuitBreakerService,
  ) {}

  async proxyRequest(
    serviceName: string,
    path: string,
    method: string,
    body?: any,
    headers?: Record<string, string>,
    queryParams?: Record<string, any>,
  ): Promise<any> {
    const service = this.services.get(serviceName);
    
    if (!service) {
      throw new HttpException(
        `Service ${serviceName} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const url = `${service.baseUrl}${path}`;
    
    this.logger.log(`Proxying ${method} ${url}`);

    try {
      return await this.circuitBreaker.execute(
        service.name,
        async () => {
          const response = await firstValueFrom(
            this.httpService.request({
              method,
              url,
              data: body,
              headers: {
                ...headers,
                'X-Forwarded-By': 'api-gateway',
              },
              params: queryParams,
              timeout: service.timeout,
            }),
          );
          return response.data;
        },
      );
    } catch (error: any) {
      this.logger.error(`Error proxying to ${service.name}: ${error.message}`);
      
      if (error.message?.includes('Circuit breaker is OPEN')) {
        throw new HttpException(
          `Service ${serviceName} is temporarily unavailable`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      if (error.response) {
        throw new HttpException(
          error.response.data || error.message,
          error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        `Failed to communicate with ${serviceName}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  getServiceHealth(serviceName: string): any {
    const service = this.services.get(serviceName);
    if (!service) {
      return { status: 'unknown', message: 'Service not found' };
    }

    return {
      name: service.name,
      baseUrl: service.baseUrl,
      circuitState: this.circuitBreaker.getCircuitState(service.name),
    };
  }

  getAllServicesHealth(): any[] {
    return Array.from(this.services.keys()).map(key => this.getServiceHealth(key));
  }
}

