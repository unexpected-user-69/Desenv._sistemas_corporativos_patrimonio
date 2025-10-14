import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
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
import { FilterPatrimoniosDto } from './dto/filter-patrimonios.dto';
import { PaginatedPatrimoniosResponseDto } from './dto/paginated-patrimonios-response.dto';
import { PatrimonioCategoria, PatrimonioStatus } from './entities/patrimonio.entity';

@ApiTags('patrimonio')
@Controller('patrimonio')
export class PatrimonioController {
  constructor(private readonly patrimonioService: PatrimonioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo patrimônio' })
  @ApiBody({ type: CreatePatrimonioDto })
  @ApiCreatedResponse({
    description: 'Patrimônio criado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos',
  })
  @ApiConflictResponse({
    description: 'Código do patrimônio já existe',
  })
  create(@Body() createPatrimonioDto: CreatePatrimonioDto): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.create(createPatrimonioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar patrimônios com filtros e paginação' })
  @ApiOkResponse({
    description: 'Lista de patrimônios retornada com sucesso',
    type: PaginatedPatrimoniosResponseDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página (padrão: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Itens por página (padrão: 10, máximo: 100)',
    example: 10,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Busca textual genérica (código, nome, descrição)',
    example: 'notebook',
  })
  @ApiQuery({
    name: 'categoria',
    required: false,
    enum: PatrimonioCategoria,
    description: 'Filtrar por categoria',
    example: PatrimonioCategoria.EQUIPAMENTO,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: PatrimonioStatus,
    description: 'Filtrar por status',
    example: PatrimonioStatus.ATIVO,
  })
  @ApiQuery({
    name: 'marca',
    required: false,
    type: String,
    description: 'Filtrar por marca',
    example: 'Dell',
  })
  @ApiQuery({
    name: 'modelo',
    required: false,
    type: String,
    description: 'Filtrar por modelo',
    example: 'Inspiron 15',
  })
  @ApiQuery({
    name: 'localizacao',
    required: false,
    type: String,
    description: 'Filtrar por localização',
    example: 'Sala 101',
  })
  @ApiQuery({
    name: 'responsavelId',
    required: false,
    type: String,
    description: 'Filtrar por responsável (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiQuery({
    name: 'valorMinimo',
    required: false,
    type: Number,
    description: 'Valor mínimo de aquisição',
    example: 1000,
  })
  @ApiQuery({
    name: 'valorMaximo',
    required: false,
    type: Number,
    description: 'Valor máximo de aquisição',
    example: 5000,
  })
  @ApiQuery({
    name: 'dataInicial',
    required: false,
    type: String,
    description: 'Data inicial de aquisição (ISO)',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'dataFinal',
    required: false,
    type: String,
    description: 'Data final de aquisição (ISO)',
    example: '2024-12-31',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['codigo', 'nome', 'categoria', 'status', 'valorAquisicao', 'dataAquisicao', 'createdAt'],
    description: 'Campo para ordenação',
    example: 'nome',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'Direção da ordenação',
    example: 'ASC',
  })
  findAll(@Query() filters: FilterPatrimoniosDto): Promise<PaginatedPatrimoniosResponseDto> {
    return this.patrimonioService.findAllWithFilters(filters);
  }

  @Get('codigo/:codigo')
  @ApiOperation({ summary: 'Buscar patrimônio por código' })
  @ApiParam({
    name: 'codigo',
    description: 'Código único do patrimônio',
    example: 'PAT-2024-001',
  })
  @ApiOkResponse({
    description: 'Patrimônio encontrado',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  findByCodigo(@Param('codigo') codigo: string): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.findByCodigo(codigo);
  }

  @Get('categoria/:categoria')
  @ApiOperation({ summary: 'Buscar patrimônios por categoria' })
  @ApiParam({
    name: 'categoria',
    enum: PatrimonioCategoria,
    description: 'Categoria do patrimônio',
    example: PatrimonioCategoria.EQUIPAMENTO,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios da categoria',
    type: [PatrimonioResponseDto],
  })
  findByCategoria(@Param('categoria') categoria: PatrimonioCategoria): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByCategoria(categoria);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Buscar patrimônios por status' })
  @ApiParam({
    name: 'status',
    enum: PatrimonioStatus,
    description: 'Status do patrimônio',
    example: PatrimonioStatus.ATIVO,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios com o status',
    type: [PatrimonioResponseDto],
  })
  findByStatus(@Param('status') status: PatrimonioStatus): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByStatus(status);
  }

  @Get('responsavel/:responsavelId')
  @ApiOperation({ summary: 'Buscar patrimônios por responsável' })
  @ApiParam({
    name: 'responsavelId',
    description: 'ID do usuário responsável',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios do responsável',
    type: [PatrimonioResponseDto],
  })
  findByResponsavel(@Param('responsavelId', ParseUUIDPipe) responsavelId: string): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByResponsavel(responsavelId);
  }

  @Get('stats/categoria')
  @ApiOperation({ summary: 'Obter estatísticas por categoria' })
  @ApiOkResponse({
    description: 'Estatísticas de patrimônios por categoria',
    schema: {
      type: 'object',
      example: {
        EQUIPAMENTO: 25,
        MOBILIARIO: 15,
        VEICULO: 3,
        IMOVEL: 2,
        OUTROS: 5,
      },
    },
  })
  getStatsByCategoria(): Promise<Record<string, number>> {
    return this.patrimonioService.getStatsByCategoria();
  }

  @Get('stats/status')
  @ApiOperation({ summary: 'Obter estatísticas por status' })
  @ApiOkResponse({
    description: 'Estatísticas de patrimônios por status',
    schema: {
      type: 'object',
      example: {
        ATIVO: 40,
        INATIVO: 5,
        MANUTENCAO: 3,
        DESCARTADO: 2,
      },
    },
  })
  getStatsByStatus(): Promise<Record<string, number>> {
    return this.patrimonioService.getStatsByStatus();
  }

  @Get('stats/valor-total')
  @ApiOperation({ summary: 'Obter valor total do patrimônio' })
  @ApiOkResponse({
    description: 'Valor total do patrimônio',
    schema: {
      type: 'object',
      properties: {
        valorTotal: {
          type: 'number',
          example: 125000.50,
        },
      },
    },
  })
  async getValorTotal(): Promise<{ valorTotal: number }> {
    const valorTotal = await this.patrimonioService.getValorTotal();
    return { valorTotal };
  }

  @Get('vencimento-garantia')
  @ApiOperation({ summary: 'Obter patrimônios próximos do vencimento de garantia' })
  @ApiQuery({
    name: 'dias',
    required: false,
    type: Number,
    description: 'Número de dias para considerar próximo do vencimento (padrão: 30)',
    example: 30,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios próximos do vencimento de garantia',
    type: [PatrimonioResponseDto],
  })
  getPatrimoniosProximosVencimentoGarantia(@Query('dias') dias?: number): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.getPatrimoniosProximosVencimentoGarantia(dias);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar patrimônio por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Patrimônio encontrado',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar patrimônio' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdatePatrimonioDto })
  @ApiOkResponse({
    description: 'Patrimônio atualizado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos',
  })
  @ApiConflictResponse({
    description: 'Código do patrimônio já existe',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePatrimonioDto: UpdatePatrimonioDto,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.update(id, updatePatrimonioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover patrimônio' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Patrimônio removido com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.patrimonioService.remove(id);
  }
}