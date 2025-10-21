import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
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
    try {
      const auditLog = await this.auditService.createAuditLog(createAuditLogDto);
      return auditLog;
    } catch (error) {
      throw new BadRequestException('Erro ao criar log de auditoria: ' + error.message);
    }
  }

  @Get('logs')
  @ApiOperation({ summary: 'Buscar logs de auditoria' })
  @ApiResponse({ status: 200, description: 'Lista de logs de auditoria' })
  async searchAuditLogs(@Query() searchDto: SearchAuditLogsDto) {
    return await this.auditService.findAll(searchDto);
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Buscar log de auditoria por ID' })
  @ApiParam({ name: 'id', description: 'ID do log de auditoria', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Log de auditoria encontrado' })
  @ApiResponse({ status: 404, description: 'Log de auditoria não encontrado' })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  async findOne(@Param('id') id: string) {
    // Validar se o ID é um UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('ID deve ser um UUID válido');
    }

    const auditLog = await this.auditService.findOne(id);
    if (!auditLog) {
      throw new NotFoundException('Log de auditoria não encontrado');
    }
    return auditLog;
  }

  @Get('logs/entity/:entityType/:entityId')
  @ApiOperation({ summary: 'Buscar logs por entidade' })
  @ApiParam({ name: 'entityType', description: 'Tipo da entidade', type: 'string' })
  @ApiParam({ name: 'entityId', description: 'ID da entidade', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Logs da entidade encontrados' })
  @ApiResponse({ status: 400, description: 'ID da entidade inválido' })
  async findByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    // Validar se o entityId é um UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(entityId)) {
      throw new BadRequestException('ID da entidade deve ser um UUID válido');
    }

    return await this.auditService.findByEntity(entityType, entityId);
  }

  @Get('logs/user/:userId')
  @ApiOperation({ summary: 'Buscar logs por usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Logs do usuário encontrados' })
  @ApiResponse({ status: 400, description: 'ID do usuário inválido' })
  async findByUser(@Param('userId') userId: string) {
    // Validar se o userId é um UUID válido
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      throw new BadRequestException('ID do usuário deve ser um UUID válido');
    }

    return await this.auditService.findByUser(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas de auditoria' })
  @ApiResponse({ status: 200, description: 'Estatísticas de auditoria' })
  async getAuditStats() {
    return await this.auditService.getAuditStats();
  }
}
