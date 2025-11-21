import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CategoriasHttpClient } from '../http-clients/categorias-http-client';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { QueryCategoriaDto } from './dto/query-categoria.dto';
import {
  CategoriaResponseDto,
  PaginatedCategoriaResponseDto,
} from './dto/categoria-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@Controller('categorias')
@ApiTags('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasHttpClient) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar nova categoria',
    description: 'Cria uma nova categoria de patrimônio. Requer permissão de MANAGER ou ADMIN.',
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    type: CategoriaResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Categoria com este código já existe',
  })
  create(
    @Body() createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar categorias',
    description: 'Lista todas as categorias com filtros e paginação',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso',
    type: PaginatedCategoriaResponseDto,
  })
  findAll(
    @Query() query: QueryCategoriaDto,
  ): Promise<PaginatedCategoriaResponseDto> {
    return this.categoriasService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar categoria por ID',
    description: 'Retorna uma categoria específica pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria (exemplo: categoria EQUIPAMENTO)',
    example: '7c0a1973-422c-47a1-8d27-caab79ffd612',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
    type: CategoriaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido (UUID inválido)',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CategoriaResponseDto> {
    return this.categoriasService.findOne(id);
  }

  @Get('codigo/:codigo')
  @ApiOperation({
    summary: 'Buscar categoria por código',
    description: 'Retorna uma categoria específica pelo código',
  })
  @ApiParam({
    name: 'codigo',
    description: 'Código da categoria',
    example: 'EQUIPAMENTO',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
    type: CategoriaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  findByCodigo(@Param('codigo') codigo: string): Promise<CategoriaResponseDto> {
    return this.categoriasService.findByCodigo(codigo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar categoria',
    description: 'Atualiza todos os campos de uma categoria. Requer permissão de MANAGER ou ADMIN.',
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria (exemplo: categoria EQUIPAMENTO)',
    example: '7c0a1973-422c-47a1-8d27-caab79ffd612',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria atualizada com sucesso',
    type: CategoriaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Código da categoria já existe',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido (UUID inválido)',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Patch(':id/desativar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Desativar categoria',
    description: 'Marca a categoria como inativa. Requer permissão de MANAGER ou ADMIN.',
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria (exemplo: categoria EQUIPAMENTO)',
    example: '7c0a1973-422c-47a1-8d27-caab79ffd612',
  })
  @ApiResponse({
    status: 204,
    description: 'Categoria desativada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido (UUID inválido)',
  })
  deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoriasService.deactivate(id);
  }

  @Patch(':id/ativar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Ativar categoria',
    description: 'Marca a categoria como ativa. Requer permissão de MANAGER ou ADMIN.',
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria (exemplo: categoria EQUIPAMENTO)',
    example: '7c0a1973-422c-47a1-8d27-caab79ffd612',
  })
  @ApiResponse({
    status: 204,
    description: 'Categoria ativada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido (UUID inválido)',
  })
  activate(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoriasService.activate(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar categoria',
    description: 'Remove uma categoria (soft delete). Requer permissão de ADMIN.',
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiParam({
    name: 'id',
    description: 'ID da categoria (exemplo: categoria EQUIPAMENTO)',
    example: '7c0a1973-422c-47a1-8d27-caab79ffd612',
  })
  @ApiResponse({
    status: 204,
    description: 'Categoria deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria não encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Categoria não pode ser deletada (patrimônios associados) ou ID inválido (UUID inválido)',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoriasService.remove(id);
  }
}

