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
  UseGuards,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { PatrimonioService } from './patrimonio.service';
import { CreatePatrimonioDto } from './dto/create-patrimonio.dto';
import { UpdatePatrimonioDto } from './dto/update-patrimonio.dto';
import { PatrimonioResponseDto } from './dto/patrimonio-response.dto';
import { QueryPatrimonioDto } from './dto/query-patrimonio.dto';
import { PaginatedPatrimoniosResponseDto } from './dto/paginated-patrimonios-response.dto';
import { PatrimonioStatus } from './entities/patrimonio.entity';
import { UpdateStatusPatrimonioDto } from './dto/update-status-patrimonio.dto';
import { TransferirResponsavelDto } from './dto/transferir-responsavel.dto';
import { PatrimonioDashboardResponseDto } from './dto/dashboard-response.dto';
import { DescartePatrimonioDto } from './dto/descarte-patrimonio.dto';
import { UpdateLocalizacaoPatrimonioDto } from './dto/update-localizacao-patrimonio.dto';
import { LocalizacoesStatsResponseDto } from './dto/localizacoes-stats-response.dto';
import { FaixaValorStatsResponseDto } from './dto/faixa-valor-stats-response.dto';
import { AquisicaoStatsResponseDto } from './dto/aquisicao-stats-response.dto';
import { EvolucaoStatsResponseDto } from './dto/evolucao-stats-response.dto';
import { InventarioRelatorioDto } from './dto/inventario-relatorio.dto';
import { QueryAquisicaoPeriodoDto } from './dto/query-aquisicao-periodo.dto';
import { QueryValorRangeDto } from './dto/query-valor-range.dto';
import { QueryStatusMultiplosDto } from './dto/query-status-multiplos.dto';
import { QueryCategoriasMultiplasDto } from './dto/query-categorias-multiplas.dto';
import { CreateBulkPatrimonioDto } from './dto/create-bulk-patrimonio.dto';
import { UpdateBulkPatrimonioDto } from './dto/update-bulk-patrimonio.dto';
import { TransferirResponsavelBulkDto } from './dto/transferir-responsavel-bulk.dto';
import { ValidarCodigoResponseDto } from './dto/validar-codigo-response.dto';
import { VerificarDuplicidadeDto } from './dto/verificar-duplicidade.dto';
import { DuplicataResponseDto } from './dto/duplicata-response.dto';
import { DisponibilidadeResponseDto } from './dto/disponibilidade-response.dto';
import { BulkResponseDto } from './dto/bulk-response.dto';
import { HistoricoAlteracaoResponseDto } from './dto/historico-alteracao-response.dto';
import { HistoricoResponsaveisResponseDto } from './dto/historico-responsaveis-response.dto';
import { ResponsavelStatsResponseDto } from './dto/responsavel-stats-response.dto';
import { MarcaModeloStatsResponseDto } from './dto/marca-modelo-stats-response.dto';
import { TopValiososQueryDto } from './dto/top-valiosos-query.dto';
import { NovosQueryDto } from './dto/novos-query.dto';
import { HistoricoLocalizacoesResponseDto } from './dto/historico-localizacoes-response.dto';
import { DeleteBulkPatrimonioDto } from './dto/delete-bulk-patrimonio.dto';
import { DeleteBulkResponseDto } from './dto/delete-bulk-response.dto';
import { PatrimonioPdfExportService } from './services/patrimonio-pdf-export.service';

@ApiTags('patrimonio')
@ApiBearerAuth()
@Controller('patrimonio')
export class PatrimonioController {
  constructor(
    private readonly patrimonioService: PatrimonioService,
    private readonly pdfExportService: PatrimonioPdfExportService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Throttle({ default: { limit: 20, ttl: 60000 } }) // 20 requisições por minuto
  @ApiOperation({ summary: 'Criar um novo patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
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
  create(
    @Body() createPatrimonioDto: CreatePatrimonioDto,
  ): Promise<PatrimonioResponseDto> {
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
    name: 'categoriaId',
    required: false,
    description: 'Filtrar por ID da categoria',
    example: '123e4567-e89b-12d3-a456-426614174000',
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
    enum: [
      'codigo',
      'nome',
      'categoria',
      'status',
      'valorAquisicao',
      'dataAquisicao',
      'createdAt',
    ],
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
  findAll(
    @Query() filters: QueryPatrimonioDto,
  ): Promise<PaginatedPatrimoniosResponseDto> {
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
  async findByCodigo(
    @Param('codigo') codigo: string,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.findByCodigo(codigo);
  }

  @Get('categoria/:categoriaId')
  @ApiOperation({ summary: 'Buscar patrimônios por categoria' })
  @ApiParam({
    name: 'categoriaId',
    description: 'ID da categoria do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios da categoria',
    type: [PatrimonioResponseDto],
  })
  findByCategoria(
    @Param('categoriaId') categoriaId: string,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByCategoria(categoriaId);
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
  findByStatus(
    @Param('status') status: PatrimonioStatus,
  ): Promise<PatrimonioResponseDto[]> {
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
  findByResponsavel(
    @Param('responsavelId', ParseUUIDPipe) responsavelId: string,
  ): Promise<PatrimonioResponseDto[]> {
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
          example: 125000.5,
        },
      },
    },
  })
  async getValorTotal(): Promise<{ valorTotal: number }> {
    const valorTotal = await this.patrimonioService.getValorTotal();
    return { valorTotal };
  }

  @Get('vencimento-garantia')
  @ApiOperation({
    summary: 'Obter patrimônios próximos do vencimento de garantia',
  })
  @ApiQuery({
    name: 'dias',
    required: false,
    type: Number,
    description:
      'Número de dias para considerar próximo do vencimento (padrão: 30)',
    example: 30,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios próximos do vencimento de garantia',
    type: [PatrimonioResponseDto],
  })
  getPatrimoniosProximosVencimentoGarantia(
    @Query('dias') dias?: number,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.getPatrimoniosProximosVencimentoGarantia(
      dias,
    );
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter todas as métricas principais para dashboard' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiOkResponse({
    description: 'Métricas do dashboard retornadas com sucesso',
    type: PatrimonioDashboardResponseDto,
  })
  async getDashboard(): Promise<PatrimonioDashboardResponseDto> {
    return this.patrimonioService.getDashboard();
  }

  @Get('localizacao/:localizacao')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar patrimônios por localização' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiParam({
    name: 'localizacao',
    description: 'Localização para buscar',
    example: 'Sala 205',
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios na localização',
    type: [PatrimonioResponseDto],
  })
  async findByLocalizacao(
    @Param('localizacao') localizacao: string,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByLocalizacao(localizacao);
  }

  // ==================== ROTAS ESPECÍFICAS DE :id (devem vir ANTES das rotas genéricas) ====================
  // IMPORTANTE: Rotas POST específicas devem vir ANTES de rotas PATCH/GET específicas para garantir ordem correta
  
  @Post(':id/transferir-responsavel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Transferir patrimônio para outro responsável' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiBody({ type: TransferirResponsavelDto })
  @ApiOkResponse({
    description: 'Responsabilidade transferida com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio ou usuário não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos ou mesmo responsável',
  })
  async transferResponsavel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: TransferirResponsavelDto,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.transferResponsavel(id, dto);
  }

  @Post(':id/descarte')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Marcar patrimônio para descarte' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiBody({ type: DescartePatrimonioDto })
  @ApiOkResponse({
    description: 'Patrimônio marcado para descarte com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos',
  })
  async descartar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: DescartePatrimonioDto,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.marcarDescarte(id, dto);
  }

  @Post(':id/foto')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Fazer upload de foto do patrimônio' })
  @ApiConsumes('multipart/form-data')
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Foto enviada com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'Arquivo inválido ou muito grande',
  })
  async uploadFoto(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.uploadFoto(id, file);
  }

  @Delete(':id/foto')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Remover foto do patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Foto removida com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  async removeFoto(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.removeFoto(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Alterar status de um patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiBody({ type: UpdateStatusPatrimonioDto })
  @ApiOkResponse({
    description: 'Status do patrimônio atualizado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos ou status já é o atual',
  })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStatusPatrimonioDto,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.updateStatus(id, dto);
  }

  @Patch(':id/ativar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Ativar patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Patrimônio ativado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'O patrimônio já está ativo',
  })
  async ativar(@Param('id', ParseUUIDPipe) id: string): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.ativar(id);
  }

  @Patch(':id/desativar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Desativar patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Patrimônio desativado com sucesso',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  @ApiBadRequestResponse({
    description: 'O patrimônio já está inativo',
  })
  async desativar(@Param('id', ParseUUIDPipe) id: string): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.desativar(id);
  }

  @Get(':id/disponibilidade')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verificar disponibilidade de um patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiParam({
    name: 'id',
    description: 'ID único do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Disponibilidade verificada',
    type: DisponibilidadeResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  async verificarDisponibilidade(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DisponibilidadeResponseDto> {
    return this.patrimonioService.verificarDisponibilidade(id);
  }

  @Get(':id/historico')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter histórico de alterações de um patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiParam({
    name: 'id',
    description: 'ID do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Histórico de alterações',
    type: HistoricoAlteracaoResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  async getHistorico(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HistoricoAlteracaoResponseDto> {
    return this.patrimonioService.getHistorico(id);
  }

  @Get(':id/historico/responsaveis')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter histórico de responsáveis de um patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiParam({
    name: 'id',
    description: 'ID do patrimônio',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Histórico de responsáveis',
    type: HistoricoResponsaveisResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  async getHistoricoResponsaveis(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HistoricoResponsaveisResponseDto> {
    return this.patrimonioService.getHistoricoResponsaveis(id);
  }

  @Get(':id/historico/localizacoes')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter histórico de localizações do patrimônio' })
  @ApiParam({ name: 'id', description: 'ID do patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiOkResponse({
    description: 'Histórico de localizações',
    type: HistoricoLocalizacoesResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  async getHistoricoLocalizacoes(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HistoricoLocalizacoesResponseDto> {
    return this.patrimonioService.getHistoricoLocalizacoes(id);
  }

  // ==================== ROTAS GENÉRICAS DE :id (devem vir DEPOIS das rotas específicas) ====================
  
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
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Atualizar patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
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
    @Request() req: any,
  ): Promise<PatrimonioResponseDto> {
    const userId = req.user?.sub;
    return this.patrimonioService.update(id, updatePatrimonioDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Remover patrimônio' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
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

  // ==================== FASE 2: GESTÃO DE STATUS ====================
  // Rotas movidas para o topo (antes das rotas genéricas :id) para garantir ordem correta

  // ==================== FASE 2: GESTÃO DE LOCALIZAÇÃO ====================
  // Rota movida para o topo (antes das rotas genéricas :id) para garantir ordem correta

  @Get('stats/localizacoes')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter estatísticas por localização' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiOkResponse({
    description: 'Estatísticas por localização retornadas com sucesso',
    type: LocalizacoesStatsResponseDto,
  })
  async getStatsLocalizacoes(): Promise<LocalizacoesStatsResponseDto> {
    return this.patrimonioService.getStatsLocalizacoes();
  }

  // ==================== FASE 2: ESTATÍSTICAS AVANÇADAS ====================

  @Get('stats/faixa-valor')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter estatísticas por faixa de valor' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'intervalo',
    required: false,
    type: Number,
    description: 'Intervalo para calcular as faixas (padrão: 1000)',
    example: 1000,
  })
  @ApiOkResponse({
    description: 'Estatísticas por faixa de valor retornadas com sucesso',
    type: FaixaValorStatsResponseDto,
  })
  async getStatsFaixaValor(
    @Query('intervalo') intervalo?: number,
  ): Promise<FaixaValorStatsResponseDto> {
    return this.patrimonioService.getStatsFaixaValor(intervalo || 1000);
  }

  @Get('stats/aquisicao')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter estatísticas por período de aquisição' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'periodo',
    required: false,
    enum: ['mensal', 'trimestral', 'anual'],
    description: 'Tipo de período (padrão: mensal)',
    example: 'mensal',
  })
  @ApiOkResponse({
    description: 'Estatísticas por período de aquisição retornadas com sucesso',
    type: AquisicaoStatsResponseDto,
  })
  async getStatsAquisicao(
    @Query('periodo') periodo?: 'mensal' | 'trimestral' | 'anual',
  ): Promise<AquisicaoStatsResponseDto> {
    return this.patrimonioService.getStatsAquisicao(periodo || 'mensal');
  }

  @Get('stats/evolucao')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter gráfico de evolução temporal' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'periodo',
    required: false,
    enum: ['mensal', 'trimestral', 'anual'],
    description: 'Tipo de período (padrão: mensal)',
    example: 'mensal',
  })
  @ApiQuery({
    name: 'ano',
    required: false,
    type: Number,
    description: 'Ano de referência (padrão: ano atual)',
    example: 2025,
  })
  @ApiOkResponse({
    description: 'Estatísticas de evolução temporal retornadas com sucesso',
    type: EvolucaoStatsResponseDto,
  })
  async getStatsEvolucao(
    @Query('periodo') periodo?: 'mensal' | 'trimestral' | 'anual',
    @Query('ano') ano?: number,
  ): Promise<EvolucaoStatsResponseDto> {
    return this.patrimonioService.getStatsEvolucao(
      periodo || 'mensal',
      ano,
    );
  }

  // ==================== FASE 2: EXPORTAÇÃO E RELATÓRIOS ====================

  @Get('export/csv')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Exportar patrimônios para CSV' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'categoriaId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: PatrimonioStatus })
  @ApiOkResponse({
    description: 'Arquivo CSV gerado com sucesso',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  async exportToCsv(
    @Query() query: QueryPatrimonioDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.patrimonioService.exportToCsv(query, res);
  }

  @Get('export/excel')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Exportar patrimônios para Excel' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'categoriaId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: PatrimonioStatus })
  @ApiOkResponse({
    description: 'Arquivo Excel gerado com sucesso',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  async exportToExcel(
    @Query() query: QueryPatrimonioDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.patrimonioService.exportToExcel(query, res);
  }

  @Get('relatorio/inventario')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Gerar relatório de inventário' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiQuery({ name: 'dataReferencia', required: false, type: String })
  @ApiQuery({ name: 'formato', required: false, enum: ['pdf', 'csv', 'excel'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'q', required: false, type: String })
  @ApiQuery({ name: 'categoriaId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: PatrimonioStatus })
  @ApiOkResponse({
    description: 'Relatório de inventário gerado com sucesso',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  async gerarRelatorioInventario(
    @Query() query: QueryPatrimonioDto & InventarioRelatorioDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.patrimonioService.gerarRelatorioInventario(query, res);
  }

  // ==================== FASE 3: BUSCAS AVANÇADAS ====================

  @Get('numero-serie/:numeroSerie')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônio por número de série' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiParam({
    name: 'numeroSerie',
    description: 'Número de série do patrimônio',
    example: 'DL123456',
  })
  @ApiOkResponse({
    description: 'Patrimônio encontrado',
    type: PatrimonioResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Patrimônio não encontrado',
  })
  async findByNumeroSerie(
    @Param('numeroSerie') numeroSerie: string,
  ): Promise<PatrimonioResponseDto> {
    return this.patrimonioService.findByNumeroSerie(numeroSerie);
  }

  @Get('aquisicao-periodo')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônios por intervalo de data de aquisição' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'dataInicial',
    required: true,
    type: String,
    description: 'Data inicial (YYYY-MM-DD)',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'dataFinal',
    required: true,
    type: String,
    description: 'Data final (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios encontrados',
    type: [PatrimonioResponseDto],
  })
  async findByAquisicaoPeriodo(
    @Query() query: QueryAquisicaoPeriodoDto,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByAquisicaoPeriodo(query);
  }

  @Get('valor-range')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônios por intervalo de valor' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'valorMinimo',
    required: true,
    type: Number,
    description: 'Valor mínimo de aquisição',
    example: 1000,
  })
  @ApiQuery({
    name: 'valorMaximo',
    required: true,
    type: Number,
    description: 'Valor máximo de aquisição',
    example: 5000,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios encontrados',
    type: [PatrimonioResponseDto],
  })
  async findByValorRange(
    @Query() query: QueryValorRangeDto,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByValorRange(query);
  }

  @Get('status-multiplos')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônios por múltiplos status' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'status',
    required: true,
    type: [String],
    enum: PatrimonioStatus,
    description: 'Array de status para buscar',
    example: [PatrimonioStatus.ATIVO, PatrimonioStatus.MANUTENCAO],
    isArray: true,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios encontrados',
    type: [PatrimonioResponseDto],
  })
  async findByStatusMultiplos(
    @Query() query: QueryStatusMultiplosDto,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByStatusMultiplos(query);
  }

  @Get('categorias-multiplas')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônios por múltiplas categorias' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'categoriaIds',
    required: true,
    type: [String],
    description: 'Array de IDs de categorias',
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
    isArray: true,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios encontrados',
    type: [PatrimonioResponseDto],
  })
  async findByCategoriasMultiplas(
    @Query() query: QueryCategoriasMultiplasDto,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findByCategoriasMultiplas(query);
  }

  // ==================== FASE 3: OPERAÇÕES EM LOTE ====================

  @Post('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Criar múltiplos patrimônios em lote' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiBody({ type: CreateBulkPatrimonioDto })
  @ApiCreatedResponse({
    description: 'Patrimônios criados em lote',
    type: BulkResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos',
  })
  async createBulk(
    @Body() dto: CreateBulkPatrimonioDto,
  ): Promise<BulkResponseDto> {
    return this.patrimonioService.createBulkWithTransaction(dto);
  }

  @Patch('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Atualizar múltiplos patrimônios em lote' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiBody({ type: UpdateBulkPatrimonioDto })
  @ApiOkResponse({
    description: 'Patrimônios atualizados com sucesso',
    schema: {
      type: 'object',
      properties: {
        atualizados: { type: 'number', example: 5 },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Um ou mais patrimônios não encontrados',
  })
  async updateBulk(
    @Body() dto: UpdateBulkPatrimonioDto,
  ): Promise<{ atualizados: number }> {
    return this.patrimonioService.updateBulk(dto);
  }

  @Post('bulk/transferir-responsavel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Transferir múltiplos patrimônios para o mesmo responsável' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiBody({ type: TransferirResponsavelBulkDto })
  @ApiOkResponse({
    description: 'Patrimônios transferidos com sucesso',
    schema: {
      type: 'object',
      properties: {
        transferidos: { type: 'number', example: 3 },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Um ou mais patrimônios ou usuário não encontrado',
  })
  async transferResponsavelBulk(
    @Body() dto: TransferirResponsavelBulkDto,
  ): Promise<{ transferidos: number }> {
    return this.patrimonioService.transferResponsavelBulk(dto);
  }

  // ==================== FASE 3: VALIDAÇÕES ====================

  @Get('validar-codigo/:codigo')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validar se um código está disponível' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiParam({
    name: 'codigo',
    description: 'Código a validar',
    example: 'PAT-2024-001',
  })
  @ApiOkResponse({
    description: 'Validação realizada',
    type: ValidarCodigoResponseDto,
  })
  async validarCodigo(
    @Param('codigo') codigo: string,
  ): Promise<ValidarCodigoResponseDto> {
    return this.patrimonioService.validarCodigo(codigo);
  }

  @Post('verificar-duplicidade')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Verificar duplicidade de patrimônios' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiBody({ type: VerificarDuplicidadeDto })
  @ApiOkResponse({
    description: 'Lista de possíveis duplicatas',
    type: DuplicataResponseDto,
  })
  async verificarDuplicidade(
    @Body() dto: VerificarDuplicidadeDto,
  ): Promise<DuplicataResponseDto> {
    return this.patrimonioService.verificarDuplicidade(dto);
  }

  // ==================== FASE 3: ALERTAS ====================

  @Get('garantia-expirada')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônios com garantia expirada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'dias',
    required: false,
    type: Number,
    description: 'Dias desde a expiração (padrão: 0)',
    example: 30,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios com garantia expirada',
    type: [PatrimonioResponseDto],
  })
  async findGarantiaExpirada(
    @Query('dias') dias?: number,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findGarantiaExpirada(dias || 0);
  }

  @Get('alertas/garantia')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônios com garantia vencendo em breve' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'dias',
    required: false,
    type: Number,
    description: 'Dias para considerar próximo do vencimento (padrão: 30)',
    example: 30,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios com garantia vencendo',
    type: [PatrimonioResponseDto],
  })
  async findGarantiaVencendo(
    @Query('dias') dias?: number,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findGarantiaVencendo(dias || 30);
  }

  @Get('manutencao-prolongada')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buscar patrimônios em manutenção prolongada' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiQuery({
    name: 'dias',
    required: false,
    type: Number,
    description: 'Dias em manutenção (padrão: 90)',
    example: 90,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios em manutenção prolongada',
    type: [PatrimonioResponseDto],
  })
  async findManutencaoProlongada(
    @Query('dias') dias?: number,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findManutencaoProlongada(dias || 90);
  }

  @Get('sem-responsavel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Buscar patrimônios sem responsável' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN ou MANAGER' })
  @ApiOkResponse({
    description: 'Lista de patrimônios sem responsável',
    type: [PatrimonioResponseDto],
  })
  async findSemResponsavel(): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.findSemResponsavel();
  }

  // ==================== FASE 3: HISTÓRICO ====================
  // Rotas movidas para o topo (antes das rotas genéricas :id) para garantir ordem correta

  @Get('responsavel/:id/historico')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter histórico de patrimônios por responsável' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiParam({
    name: 'id',
    description: 'ID do responsável',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios do responsável',
    type: [PatrimonioResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
  })
  async getHistoricoPorResponsavel(
    @Param('id', ParseUUIDPipe) responsavelId: string,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.getHistoricoPorResponsavel(responsavelId);
  }

  // ==================== FASE 1: GESTÃO DE FOTOS ====================
  // Rotas movidas para o topo (antes das rotas genéricas :id) para garantir ordem correta

  @Get('com-foto')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar patrimônios que possuem foto' })
  @ApiOkResponse({
    description: 'Lista de patrimônios com foto retornada com sucesso',
    type: PaginatedPatrimoniosResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  async findAllWithFoto(
    @Query() query: QueryPatrimonioDto,
  ): Promise<PaginatedPatrimoniosResponseDto> {
    return this.patrimonioService.findAllWithFoto(query);
  }

  // ==================== FASE 2: ESTATÍSTICAS AVANÇADAS ====================

  @Get('stats/responsavel/:responsavelId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter estatísticas de patrimônios por responsável' })
  @ApiParam({ name: 'responsavelId', description: 'ID do responsável' })
  @ApiOkResponse({
    description: 'Estatísticas do responsável',
    type: ResponsavelStatsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiNotFoundResponse({ description: 'Responsável não encontrado' })
  async getStatsByResponsavel(
    @Param('responsavelId', ParseUUIDPipe) responsavelId: string,
  ): Promise<ResponsavelStatsResponseDto> {
    return this.patrimonioService.getStatsByResponsavel(responsavelId);
  }

  @Get('stats/marca-modelo')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter estatísticas agrupadas por marca e modelo' })
  @ApiOkResponse({
    description: 'Estatísticas por marca/modelo',
    type: MarcaModeloStatsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  async getStatsByMarcaModelo(): Promise<MarcaModeloStatsResponseDto> {
    return this.patrimonioService.getStatsByMarcaModelo();
  }

  @Get('top-valiosos')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar os patrimônios mais valiosos' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número de patrimônios a retornar (padrão: 10, máximo: 100)',
    example: 10,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios mais valiosos',
    type: [PatrimonioResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  async getTopValiosos(
    @Query() query: TopValiososQueryDto,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.getTopValiosos(query);
  }

  @Get('novos')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar patrimônios adquiridos recentemente' })
  @ApiQuery({
    name: 'dias',
    required: false,
    type: Number,
    description: 'Número de dias para considerar patrimônios como novos (padrão: 30)',
    example: 30,
  })
  @ApiOkResponse({
    description: 'Lista de patrimônios novos',
    type: [PatrimonioResponseDto],
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  async getNovos(
    @Query() query: NovosQueryDto,
  ): Promise<PatrimonioResponseDto[]> {
    return this.patrimonioService.getNovos(query);
  }

  // ==================== FASE 3: HISTÓRICO DE LOCALIZAÇÕES ====================
  // Rota movida para o topo (antes das rotas genéricas :id) para garantir ordem correta

  // ==================== FASE 4: OPERAÇÕES EM LOTE ====================

  @Delete('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Deletar múltiplos patrimônios em lote (soft delete)' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiBody({ type: DeleteBulkPatrimonioDto })
  @ApiOkResponse({
    description: 'Patrimônios deletados com sucesso',
    type: DeleteBulkResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos (IDs inválidos, limite excedido)',
  })
  async deleteBulk(
    @Body() dto: DeleteBulkPatrimonioDto,
  ): Promise<DeleteBulkResponseDto> {
    return this.patrimonioService.deleteBulk(dto);
  }

  // ==================== FASE 5: EXPORTAÇÃO PDF ====================

  @Get('export/pdf')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Exportar patrimônios filtrados para PDF' })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Busca textual (nome, código, descrição)',
  })
  @ApiQuery({
    name: 'categoriaId',
    required: false,
    type: String,
    description: 'Filtrar por ID da categoria',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: PatrimonioStatus,
    description: 'Filtrar por status',
  })
  @ApiQuery({
    name: 'marca',
    required: false,
    type: String,
    description: 'Filtrar por marca',
  })
  @ApiQuery({
    name: 'modelo',
    required: false,
    type: String,
    description: 'Filtrar por modelo',
  })
  @ApiQuery({
    name: 'localizacao',
    required: false,
    type: String,
    description: 'Filtrar por localização',
  })
  @ApiQuery({
    name: 'responsavelId',
    required: false,
    type: String,
    description: 'Filtrar por ID do responsável',
  })
  @ApiQuery({
    name: 'valorMinimo',
    required: false,
    type: Number,
    description: 'Valor mínimo de aquisição',
  })
  @ApiQuery({
    name: 'valorMaximo',
    required: false,
    type: Number,
    description: 'Valor máximo de aquisição',
  })
  @ApiQuery({
    name: 'dataInicial',
    required: false,
    type: String,
    description: 'Data de aquisição inicial (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'dataFinal',
    required: false,
    type: String,
    description: 'Data de aquisição final (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['nome', 'codigo', 'categoria', 'status', 'valorAquisicao', 'dataAquisicao', 'createdAt'],
    description: 'Campo para ordenação',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'Direção da ordenação',
  })
  @ApiOkResponse({
    description: 'PDF gerado com sucesso',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiResponse({
    status: 500,
    description: 'Erro ao gerar PDF',
  })
  async exportPdf(
    @Query() query: QueryPatrimonioDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const pdfBuffer = await this.pdfExportService.generatePdf(query);

      const filename = `patrimonios_${new Date().toISOString().split('T')[0]}.pdf`;

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      });

      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: 'Erro ao gerar PDF',
        error: 'Internal Server Error',
      });
    }
  }
}
