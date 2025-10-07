import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { PatrimonioService } from './patrimonio.service';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { PatrimonioResponseDto } from './dto/patrimonio-response.dto';
import { QueryPatrimonioDto } from './dto/query-patrimonio.dto';
import { PaginatedPatrimonioResponseDto } from './dto/paginated-patrimonio-response.dto';

@ApiTags('Patrimônio')
@Controller('patrimonios')
export class PatrimonioController {
  constructor(private readonly patrimonioService: PatrimonioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo patrimônio' })
  @ApiCreatedResponse({
    description: 'Patrimônio criado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Código de patrimônio já existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Código de patrimônio já existe' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  @ApiBody({
    type: CreatePatrimonioDto,
    examples: {
      equipamento: {
        summary: 'Equipamento de informática',
        value: {
          codigo: 'PAT-2024-001',
          nome: 'Notebook Dell Inspiron 15',
          descricao: 'Notebook para uso administrativo com Windows 11',
          categoria: 'EQUIPAMENTO',
          status: 'ATIVO',
          marca: 'Dell',
          modelo: 'Inspiron 15 3000',
          numeroSerie: 'ABC123456789',
          valorAquisicao: 2500.00,
          dataAquisicao: '2024-01-15',
          dataGarantia: '2025-01-15',
          localizacao: 'Sala 101 - Setor Administrativo',
          observacoes: 'Equipamento em perfeito estado de conservação',
        },
      },
      mobiliario: {
        summary: 'Mobiliário de escritório',
        value: {
          codigo: 'PAT-2024-002',
          nome: 'Mesa de Escritório',
          descricao: 'Mesa de escritório com 4 gavetas',
          categoria: 'MOBILIARIO',
          status: 'ATIVO',
          marca: 'Steelcase',
          modelo: 'Think V2',
          valorAquisicao: 1200.00,
          dataAquisicao: '2024-02-01',
          localizacao: 'Sala 201 - Setor Comercial',
        },
      },
    },
  })
  create(@Body() createPatrimonioDto: CreatePatrimonioDto): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.create(createPatrimonioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar patrimônios com filtros e paginação' })
  @ApiOkResponse({
    description: 'Lista de patrimônios retornada com sucesso',
    type: PaginatedPatrimonioResponseDto,
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página', example: 10 })
  @ApiQuery({ name: 'q', required: false, description: 'Busca textual', example: 'notebook dell' })
  @ApiQuery({ name: 'categoria', required: false, description: 'Filtrar por categoria', example: 'EQUIPAMENTO' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por status', example: 'ATIVO' })
  @ApiQuery({ name: 'marca', required: false, description: 'Filtrar por marca', example: 'Dell' })
  @ApiQuery({ name: 'localizacao', required: false, description: 'Filtrar por localização', example: 'Sala 101' })
  @ApiQuery({ name: 'responsavelId', required: false, description: 'Filtrar por responsável', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiQuery({ name: 'valorMin', required: false, description: 'Valor mínimo', example: 1000 })
  @ApiQuery({ name: 'valorMax', required: false, description: 'Valor máximo', example: 5000 })
  @ApiQuery({ name: 'dataInicio', required: false, description: 'Data início (YYYY-MM-DD)', example: '2024-01-01' })
  @ApiQuery({ name: 'dataFim', required: false, description: 'Data fim (YYYY-MM-DD)', example: '2024-12-31' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Campo para ordenação', example: 'nome' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Direção da ordenação', example: 'ASC' })
  findAll(@Query() query: QueryPatrimonioDto): Promise<PaginatedPatrimonioResponseDto> {
    return this.patrimonioService.findAllWithFilters(query);
  }

  @Get('codigo/:codigo')
  @ApiOperation({ summary: 'Buscar patrimônio por código' })
  @ApiParam({ name: 'codigo', description: 'Código do patrimônio', example: 'PAT-2024-001' })
  @ApiOkResponse({
    description: 'Patrimônio encontrado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Patrimônio com código "PAT-2024-001" não encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findByCodigo(@Param('codigo') codigo: string): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.findByCodigo(codigo);
  }

  @Get('categoria/:categoria')
  @ApiOperation({ summary: 'Buscar patrimônios por categoria' })
  @ApiParam({ name: 'categoria', description: 'Categoria do patrimônio', example: 'EQUIPAMENTO' })
  @ApiOkResponse({
    description: 'Lista de patrimônios da categoria',
    type: [PatrimonioResponseDto],
  })
  findByCategoria(@Param('categoria') categoria: string): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByCategoria(categoria);
  }

  @Get('responsavel/:responsavelId')
  @ApiOperation({ summary: 'Buscar patrimônios por responsável' })
  @ApiParam({ name: 'responsavelId', description: 'ID do responsável', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({
    description: 'Lista de patrimônios do responsável',
    type: [PatrimonioResponseDto],
  })
  findByResponsavel(@Param('responsavelId') responsavelId: string): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByResponsavel(responsavelId);
  }

  @Get('stats/categoria')
  @ApiOperation({ summary: 'Obter estatísticas por categoria' })
  @ApiOkResponse({
    description: 'Estatísticas por categoria',
    schema: {
      type: 'object',
      example: {
        EQUIPAMENTO: 25,
        MOBILIARIO: 15,
        VEICULO: 5,
        IMOVEL: 3,
        SOFTWARE: 8,
        OUTROS: 2,
      },
    },
  })
  getStatsByCategoria(): Promise<Record<string, number>> {
    return this.patrimonioService.getStatsByCategoria();
  }

  @Get('stats/status')
  @ApiOperation({ summary: 'Obter estatísticas por status' })
  @ApiOkResponse({
    description: 'Estatísticas por status',
    schema: {
      type: 'object',
      example: {
        ATIVO: 45,
        INATIVO: 8,
        MANUTENCAO: 3,
        DESCARTADO: 2,
      },
    },
  })
  getStatsByStatus(): Promise<Record<string, number>> {
    return this.patrimonioService.getStatsByStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar patrimônio por ID' })
  @ApiParam({ name: 'id', description: 'ID único do patrimônio', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({
    description: 'Patrimônio encontrado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Patrimônio com ID "123e4567-e89b-12d3-a456-426614174000" não encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id') id: string): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar patrimônio' })
  @ApiParam({ name: 'id', description: 'ID único do patrimônio', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiOkResponse({
    description: 'Patrimônio atualizado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Patrimônio com ID "123e4567-e89b-12d3-a456-426614174000" não encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Código de patrimônio já existe',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Código de patrimônio já existe' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updatePatrimonioDto: UpdatePatrimonioDto,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.update(id, updatePatrimonioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover patrimônio (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID único do patrimônio', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 204, description: 'Patrimônio removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Patrimônio com ID "123e4567-e89b-12d3-a456-426614174000" não encontrado' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.patrimonioService.remove(id);
  }

  @Post('bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar múltiplos patrimônios' })
  @ApiCreatedResponse({
    description: 'Patrimônios criados com sucesso',
    type: [PatrimonioResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos fornecidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Códigos duplicados ou já existentes',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Códigos já existem: PAT-2024-001, PAT-2024-002' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  @ApiBody({
    type: [CreatePatrimonioDto],
    examples: {
      multiple: {
        summary: 'Criação em lote',
        value: [
          {
            codigo: 'PAT-2024-003',
            nome: 'Monitor Dell 24"',
            categoria: 'EQUIPAMENTO',
            marca: 'Dell',
            valorAquisicao: 800.00,
            localizacao: 'Sala 101',
          },
          {
            codigo: 'PAT-2024-004',
            nome: 'Teclado Logitech',
            categoria: 'EQUIPAMENTO',
            marca: 'Logitech',
            valorAquisicao: 150.00,
            localizacao: 'Sala 101',
          },
        ],
      },
    },
  })
  createBulk(@Body() createPatrimonioDtos: CreatePatrimonioDto[]): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.createBulk(createPatrimonioDtos);
  }
}
