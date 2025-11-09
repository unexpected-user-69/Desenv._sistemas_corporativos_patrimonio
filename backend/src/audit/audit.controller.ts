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
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { SearchAuditLogsDto } from './dto/search-audit-logs.dto';
import { TransformAndValidatePipe } from './pipes/transform-and-validate.pipe';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@ApiTags('audit')
@ApiBearerAuth()
@Controller('audit')
export class AuditController {
  private readonly logger = new Logger(AuditController.name);

  constructor(private readonly auditService: AuditService) {}

  @Post('logs')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Criar log de auditoria',
    description: 'Cria um novo log de auditoria. Campos obrigatórios: action e entityType. Campos userId, entityId e sessionId devem ser UUIDs válidos se fornecidos. Não inclua comentários no JSON.'
  })
  @ApiBody({ type: CreateAuditLogDto })
  @ApiResponse({ status: 201, description: 'Log de auditoria criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos - verifique se os UUIDs estão no formato correto e se não há comentários no JSON' })
  async createAuditLog(@Body(new TransformAndValidatePipe()) createAuditLogDto: CreateAuditLogDto) {
    try {
      // Validação simples de UUIDs se presentes
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      
      if (createAuditLogDto.userId && typeof createAuditLogDto.userId === 'string' && !uuidRegex.test(createAuditLogDto.userId)) {
        throw new BadRequestException('userId must be a valid UUID');
      }
      if (createAuditLogDto.entityId && typeof createAuditLogDto.entityId === 'string' && !uuidRegex.test(createAuditLogDto.entityId)) {
        throw new BadRequestException('entityId must be a valid UUID');
      }
      if (createAuditLogDto.sessionId && typeof createAuditLogDto.sessionId === 'string' && !uuidRegex.test(createAuditLogDto.sessionId)) {
        throw new BadRequestException('sessionId must be a valid UUID');
      }

      const auditLog = await this.auditService.createAuditLog(createAuditLogDto);
      return auditLog;
    } catch (error) {
      // Se já for uma HttpException, apenas re-lançar
      if (error instanceof HttpException) {
        throw error;
      }
      
      // Log do erro completo para debug
      this.logger.error('Erro ao criar log de auditoria', {
        errorType: error?.constructor?.name,
        message: error?.message,
        stack: error?.stack,
        code: error?.code,
        name: error?.name,
        detail: error?.detail,
        dto: createAuditLogDto,
      });
      
      // Se for um erro de banco de dados, retornar BadRequest
      if (error?.name === 'QueryFailedError' || error?.code?.startsWith('23')) {
        throw new BadRequestException({
          message: 'Erro ao salvar log de auditoria no banco de dados',
          error: error?.message || 'Erro desconhecido',
          detail: error?.detail,
        });
      }
      
      // Para outros erros, relançar como Internal Server Error com detalhes
      throw new HttpException(
        {
          message: 'Erro interno ao criar log de auditoria',
          error: error?.message || String(error) || 'Erro desconhecido',
          type: error?.constructor?.name || 'Unknown',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('logs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Buscar logs de auditoria' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
  @ApiResponse({ status: 200, description: 'Lista de logs de auditoria' })
  async searchAuditLogs(@Query() searchDto: SearchAuditLogsDto) {
    return await this.auditService.findAll(searchDto);
  }

  @Get('logs/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Buscar log de auditoria por ID' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Buscar logs por entidade' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Buscar logs por usuário' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obter estatísticas de auditoria' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiResponse({ status: 200, description: 'Estatísticas de auditoria' })
  async getAuditStats() {
    return await this.auditService.getAuditStats();
  }
}

