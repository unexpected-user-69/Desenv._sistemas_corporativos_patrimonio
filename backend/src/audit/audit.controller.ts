import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { SearchAuditLogsDto } from './dto/search-audit-logs.dto';

@ApiTags('audit')
@ApiBearerAuth()
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('logs')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar log de auditoria' })
  @ApiResponse({ status: 201, description: 'Log de auditoria criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createAuditLog(@Body() createAuditLogDto: CreateAuditLogDto) {
    return await this.auditService.createAuditLog(createAuditLogDto);
  }

  @Get('logs')
  @ApiOperation({ summary: 'Buscar logs de auditoria' })
  @ApiResponse({ status: 200, description: 'Lista de logs de auditoria' })
  async searchAuditLogs(@Query() searchDto: SearchAuditLogsDto) {
    return await this.auditService.findAll(searchDto);
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Buscar log de auditoria por ID' })
  @ApiResponse({ status: 200, description: 'Log de auditoria encontrado' })
  @ApiResponse({ status: 404, description: 'Log de auditoria não encontrado' })
  async findOne(@Param('id') id: string) {
    const auditLog = await this.auditService.findOne(id);
    if (!auditLog) {
      throw new Error('Log de auditoria não encontrado');
    }
    return auditLog;
  }

  @Get('logs/entity/:entityType/:entityId')
  @ApiOperation({ summary: 'Buscar logs por entidade' })
  @ApiResponse({ status: 200, description: 'Logs da entidade encontrados' })
  async findByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return await this.auditService.findByEntity(entityType, entityId);
  }

  @Get('logs/user/:userId')
  @ApiOperation({ summary: 'Buscar logs por usuário' })
  @ApiResponse({ status: 200, description: 'Logs do usuário encontrados' })
  async findByUser(@Param('userId') userId: string) {
    return await this.auditService.findByUser(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas de auditoria' })
  @ApiResponse({ status: 200, description: 'Estatísticas de auditoria' })
  async getAuditStats() {
    return await this.auditService.getAuditStats();
  }
}
