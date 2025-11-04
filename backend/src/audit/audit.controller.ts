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
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { SearchAuditLogsDto } from './dto/search-audit-logs.dto';
import { TransformAndValidatePipe } from './pipes/transform-and-validate.pipe';

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
  async createAuditLog(@Body(new TransformAndValidatePipe()) createAuditLogDto: CreateAuditLogDto) {
    try {
      // Validar e transformar UUIDs manualmente (após o pipe de transformação)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      
      // Limpar strings vazias, objetos vazios e null dos outros campos
      const cleanField = (value: any) => {
        if (value === null || value === undefined || value === 'string' || value === '' || 
            (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 0)) {
          return undefined;
        }
        return value;
      };

      // Tratar campos string opcionais (não JSONB)
      if (createAuditLogDto.ipAddress !== undefined) {
        createAuditLogDto.ipAddress = cleanField(createAuditLogDto.ipAddress);
      }
      if (createAuditLogDto.userAgent !== undefined) {
        createAuditLogDto.userAgent = cleanField(createAuditLogDto.userAgent);
      }
      if (createAuditLogDto.service !== undefined) {
        createAuditLogDto.service = cleanField(createAuditLogDto.service);
      }
      if (createAuditLogDto.endpoint !== undefined) {
        createAuditLogDto.endpoint = cleanField(createAuditLogDto.endpoint);
      }
      if (createAuditLogDto.description !== undefined) {
        createAuditLogDto.description = cleanField(createAuditLogDto.description);
      }
      
      // Tratar UUIDs também
      if (createAuditLogDto.userId !== undefined) {
        createAuditLogDto.userId = cleanField(createAuditLogDto.userId);
      }
      if (createAuditLogDto.entityId !== undefined) {
        createAuditLogDto.entityId = cleanField(createAuditLogDto.entityId);
      }
      if (createAuditLogDto.sessionId !== undefined) {
        createAuditLogDto.sessionId = cleanField(createAuditLogDto.sessionId);
      }
      
      // Validar UUIDs se ainda tiverem valor
      if (createAuditLogDto.userId && !uuidRegex.test(createAuditLogDto.userId)) {
        throw new BadRequestException('userId must be a valid UUID');
      }
      if (createAuditLogDto.entityId && !uuidRegex.test(createAuditLogDto.entityId)) {
        throw new BadRequestException('entityId must be a valid UUID');
      }
      if (createAuditLogDto.sessionId && !uuidRegex.test(createAuditLogDto.sessionId)) {
        throw new BadRequestException('sessionId must be a valid UUID');
      }

      const auditLog = await this.auditService.createAuditLog(createAuditLogDto);
      return auditLog;
    } catch (error) {
      // Se já for uma HttpException, apenas re-lançar
      if (error instanceof BadRequestException || error instanceof HttpException) {
        throw error;
      }
      // Log do erro completo para debug
      console.error('Erro ao criar log de auditoria:', error);
      console.error('Stack trace:', error?.stack);
      console.error('DTO recebido:', JSON.stringify(createAuditLogDto, null, 2));
      throw new BadRequestException({
        message: 'Erro ao criar log de auditoria',
        error: error?.message || String(error) || 'Erro desconhecido',
      });
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
  @ApiParam({ 
    name: 'id', 
    description: 'ID do log de auditoria', 
    type: 'string', 
    format: 'uuid',
    example: 'b4e78c33-a198-452d-932d-a05d0794fad0',
    required: true
  })
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
  @ApiParam({ 
    name: 'entityType', 
    description: 'Tipo da entidade', 
    type: 'string',
    example: 'Patrimonio',
    required: true
  })
  @ApiParam({ 
    name: 'entityId', 
    description: 'ID da entidade', 
    type: 'string', 
    format: 'uuid',
    example: 'b4e78c33-a198-452d-932d-a05d0794fad0',
    required: true
  })
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
  @ApiParam({ 
    name: 'userId', 
    description: 'ID do usuário', 
    type: 'string', 
    format: 'uuid',
    example: '143b7f80-daca-4d0f-aa52-752f678e748e',
    required: true
  })
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

