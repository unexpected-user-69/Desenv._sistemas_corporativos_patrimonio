import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { ReportCatalogService } from './services/report-catalog.service';
import { ReportPermissionService } from './services/report-permission.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { CatalogResponseDto } from './dto/catalog-response.dto';
import { CreateCatalogVersionDto } from './dto/create-catalog-version.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionResponseDto } from './dto/permission-response.dto';

@ApiTags('reports-catalog')
@ApiBearerAuth()
@Controller('v1/reports/catalog')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportCatalogController {
  constructor(
    private readonly catalogService: ReportCatalogService,
    private readonly permissionService: ReportPermissionService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo catálogo de relatório' })
  @ApiResponse({ status: 201, description: 'Catálogo criado', type: CatalogResponseDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async create(
    @Body() dto: CreateCatalogDto,
    @Request() req: any,
  ): Promise<CatalogResponseDto> {
    const userId = req.user?.id || req.user?.sub;
    return this.catalogService.create(dto, userId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar catálogos de relatórios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de catálogos',
    type: [CatalogResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async findAll(@Query('activeOnly') activeOnly?: string): Promise<CatalogResponseDto[]> {
    const activeOnlyBool = activeOnly === 'true';
    return this.catalogService.findAll(activeOnlyBool);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar catálogo por ID' })
  @ApiResponse({ status: 200, description: 'Catálogo encontrado', type: CatalogResponseDto })
  @ApiNotFoundResponse({ description: 'Catálogo não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CatalogResponseDto> {
    return this.catalogService.findOne(id);
  }

  @Get('key/:key')
  @Roles(UserRole.ADMIN, UserRole.TEACHER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar catálogo por chave' })
  @ApiResponse({ status: 200, description: 'Catálogo encontrado', type: CatalogResponseDto })
  @ApiNotFoundResponse({ description: 'Catálogo não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async findByKey(@Param('key') key: string): Promise<CatalogResponseDto> {
    return this.catalogService.findByKey(key);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar catálogo' })
  @ApiResponse({ status: 200, description: 'Catálogo atualizado', type: CatalogResponseDto })
  @ApiNotFoundResponse({ description: 'Catálogo não encontrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCatalogDto,
    @Request() req: any,
  ): Promise<CatalogResponseDto> {
    const userId = req.user?.id || req.user?.sub;
    return this.catalogService.update(id, dto, userId);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover catálogo' })
  @ApiResponse({ status: 204, description: 'Catálogo removido' })
  @ApiNotFoundResponse({ description: 'Catálogo não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.catalogService.remove(id);
  }

  @Post(':id/versions')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar versão ao catálogo' })
  @ApiResponse({ status: 201, description: 'Versão adicionada' })
  @ApiNotFoundResponse({ description: 'Catálogo não encontrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async addVersion(
    @Param('id', ParseUUIDPipe) catalogId: string,
    @Body() dto: CreateCatalogVersionDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || req.user?.sub;
    return this.catalogService.addVersion(catalogId, dto, userId);
  }

  @Put(':id/versions/:version/current')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Definir versão como atual' })
  @ApiResponse({ status: 200, description: 'Versão definida como atual' })
  @ApiNotFoundResponse({ description: 'Catálogo ou versão não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async setCurrentVersion(
    @Param('id', ParseUUIDPipe) catalogId: string,
    @Param('version') version: string,
    @Request() req: any,
  ): Promise<void> {
    const userId = req.user?.id || req.user?.sub;
    await this.catalogService.setCurrentVersion(catalogId, version, userId);
  }

  @Post('permissions')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar permissão de relatório' })
  @ApiResponse({ status: 201, description: 'Permissão criada', type: PermissionResponseDto })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async createPermission(
    @Body() dto: CreatePermissionDto,
    @Request() req: any,
  ): Promise<PermissionResponseDto> {
    const userId = req.user?.id || req.user?.sub;
    return this.permissionService.create(dto, userId);
  }

  @Get('permissions/catalog/:catalogId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar permissões de um catálogo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de permissões',
    type: [PermissionResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getPermissionsByCatalog(
    @Param('catalogId', ParseUUIDPipe) catalogId: string,
  ): Promise<PermissionResponseDto[]> {
    return this.permissionService.findByCatalog(catalogId);
  }

  @Get('permissions/user/:userId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar permissões de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de permissões',
    type: [PermissionResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async getPermissionsByUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<PermissionResponseDto[]> {
    return this.permissionService.findByUser(userId);
  }

  @Delete('permissions/:id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover permissão' })
  @ApiResponse({ status: 204, description: 'Permissão removida' })
  @ApiNotFoundResponse({ description: 'Permissão não encontrada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Sem permissão' })
  async removePermission(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.permissionService.remove(id);
  }
}

