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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { QueryCategoriaDto } from './dto/query-categoria.dto';
import {
  CategoriaResponseDto,
  PaginatedCategoriaResponseDto,
} from './dto/categoria-response.dto';

@Controller('categorias')
@ApiTags('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar nova categoria',
    description: 'Cria uma nova categoria de patrimônio',
  })
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
  findOne(@Param('id') id: string): Promise<CategoriaResponseDto> {
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
  @ApiOperation({
    summary: 'Atualizar categoria',
    description: 'Atualiza todos os campos de uma categoria',
  })
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
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<CategoriaResponseDto> {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Patch(':id/desativar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Desativar categoria',
    description: 'Marca a categoria como inativa',
  })
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
  deactivate(@Param('id') id: string): Promise<void> {
    return this.categoriasService.deactivate(id);
  }

  @Patch(':id/ativar')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Ativar categoria',
    description: 'Marca a categoria como ativa',
  })
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
  activate(@Param('id') id: string): Promise<void> {
    return this.categoriasService.activate(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar categoria',
    description: 'Remove uma categoria (soft delete)',
  })
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
    description: 'Categoria não pode ser deletada (patrimônios associados)',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriasService.remove(id);
  }
}

