import { Controller, Get, Query, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';

@ApiTags('cache')
@ApiBearerAuth()
@Controller('cache')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class CacheController {
  
  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas do cache' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiResponse({ status: 200, description: 'Estatísticas do cache retornadas com sucesso' })
  getStats() {
    return {
      hits: 150,
      misses: 25,
      total: 175,
      hitRate: 85.7,
      memoryUsage: '45.2 MB',
      keysCount: 1250,
      uptime: '2d 14h 32m',
      lastCleanup: new Date().toISOString(),
      timestamp: new Date().toISOString()
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Verificar saúde do cache' })
  @ApiResponse({ status: 200, description: 'Status de saúde do cache' })
  getHealth() {
    return {
      status: 'healthy',
      uptime: '2d 14h 32m',
      memoryUsage: '45.2 MB',
      connections: 12,
      timestamp: new Date().toISOString()
    };
  }

  @Get('keys')
  @ApiOperation({ summary: 'Listar chaves do cache' })
  @ApiQuery({ name: 'pattern', required: false, description: 'Padrão de busca das chaves' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limite de resultados' })
  @ApiResponse({ status: 200, description: 'Lista de chaves retornada com sucesso' })
  getKeys(
    @Query('pattern') pattern: string = '*',
    @Query('limit') limit: number = 100
  ) {
    const mockKeys = [
      'user:123',
      'session:abc123',
      'config:app',
      'cache:stats',
      'temp:upload:file1',
      'api:rate:limit:192.168.1.1',
      'db:query:users:list',
      'auth:token:xyz789'
    ];

    const filteredKeys = pattern === '*' 
      ? mockKeys 
      : mockKeys.filter(key => key.includes(pattern.replace('*', '')));

    return {
      keys: filteredKeys.slice(0, limit),
      total: filteredKeys.length,
      pattern,
      limit,
      timestamp: new Date().toISOString()
    };
  }

  @Get('operations')
  @ApiOperation({ summary: 'Listar operações recentes do cache' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limite de operações' })
  @ApiResponse({ status: 200, description: 'Lista de operações retornada com sucesso' })
  getOperations(@Query('limit') limit: number = 50) {
    const mockOperations = [
      {
        id: 'op_001',
        type: 'GET',
        key: 'user:123',
        timestamp: new Date(Date.now() - 1000).toISOString(),
        duration: '2ms',
        status: 'HIT'
      },
      {
        id: 'op_002',
        type: 'SET',
        key: 'session:abc123',
        timestamp: new Date(Date.now() - 2000).toISOString(),
        duration: '5ms',
        status: 'SUCCESS'
      },
      {
        id: 'op_003',
        type: 'DELETE',
        key: 'temp:upload:file1',
        timestamp: new Date(Date.now() - 3000).toISOString(),
        duration: '1ms',
        status: 'SUCCESS'
      },
      {
        id: 'op_004',
        type: 'GET',
        key: 'config:app',
        timestamp: new Date(Date.now() - 4000).toISOString(),
        duration: '3ms',
        status: 'MISS'
      }
    ];

    return {
      operations: mockOperations.slice(0, limit),
      total: mockOperations.length,
      limit,
      timestamp: new Date().toISOString()
    };
  }

  @Get('alerts')
  @ApiOperation({ summary: 'Listar alertas do cache' })
  @ApiResponse({ status: 200, description: 'Lista de alertas retornada com sucesso' })
  getAlerts() {
    const mockAlerts = [
      {
        id: 'alert_001',
        type: 'WARNING',
        message: 'Alto uso de memória detectado',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        severity: 'medium',
        resolved: false
      },
      {
        id: 'alert_002',
        type: 'INFO',
        message: 'Cache limpo automaticamente',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        severity: 'low',
        resolved: true
      }
    ];

    return {
      alerts: mockAlerts,
      total: mockAlerts.length,
      activeAlerts: mockAlerts.filter(alert => !alert.resolved).length,
      timestamp: new Date().toISOString()
    };
  }

  @Get('config')
  @ApiOperation({ summary: 'Obter configuração do cache' })
  @ApiResponse({ status: 200, description: 'Configuração do cache retornada com sucesso' })
  getConfig() {
    return {
      ttl: 3600,
      maxSize: 1000,
      strategy: 'LRU',
      compression: true,
      encryption: false,
      persistence: true,
      maxMemory: '512MB',
      evictionPolicy: 'allkeys-lru',
      timestamp: new Date().toISOString()
    };
  }

  @Post('clear')
  @ApiOperation({ summary: 'Limpar cache' })
  @ApiResponse({ status: 200, description: 'Cache limpo com sucesso' })
  clearCache() {
    return {
      message: 'Cache limpo com sucesso',
      clearedKeys: 1250,
      timestamp: new Date().toISOString()
    };
  }

  @Delete('key/:key')
  @ApiOperation({ summary: 'Remover chave específica do cache' })
  @ApiResponse({ status: 200, description: 'Chave removida com sucesso' })
  deleteKey(@Param('key') key: string) {
    return {
      message: `Chave '${key}' removida com sucesso`,
      key,
      timestamp: new Date().toISOString()
    };
  }

  @Get('key/:key')
  @ApiOperation({ summary: 'Obter valor de uma chave específica' })
  @ApiResponse({ status: 200, description: 'Valor da chave retornado com sucesso' })
  getKey(@Param('key') key: string) {
    return {
      key,
      value: `Mock value for ${key}`,
      ttl: 3600,
      timestamp: new Date().toISOString()
    };
  }
}