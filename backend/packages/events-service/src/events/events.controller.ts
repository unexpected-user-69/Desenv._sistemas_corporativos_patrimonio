import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
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
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import { QueryEventsDto } from './dto/query-events.dto';
import { PaginatedEventsResponseDto } from './dto/paginated-events-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnerId } from '../common/decorators/owner-id.decorator';
import { UserRole } from '../users/enums/user-role.enum';

@ApiTags('events')
@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @ApiOperation({
    summary: 'Criar um novo evento',
    description: 'Cria um novo evento relacionado a patrimônio. Requer permissão de MANAGER ou ADMIN.',
  })
  @ApiBody({ type: CreateEventDto })
  @ApiCreatedResponse({
    description: 'Evento criado com sucesso',
    type: EventResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
  @ApiBadRequestResponse({ description: 'Dados de entrada inválidos' })
  create(
    @Body() createEventDto: CreateEventDto,
    @OwnerId() createdBy: string,
  ): Promise<EventResponseDto> {
    return this.eventsService.create(createEventDto, createdBy);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Listar eventos com filtros e paginação',
    description: 'Lista eventos com filtros avançados e paginação. Requer autenticação.',
  })
  @ApiOkResponse({
    description: 'Lista de eventos retornada com sucesso',
    type: PaginatedEventsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
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
    description: 'Itens por página (padrão: 20, máximo: 100)',
    example: 20,
  })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Busca textual (título e descrição)',
    example: 'manutenção',
  })
  @ApiQuery({
    name: 'eventType',
    required: false,
    enum: ['MANUTENCAO', 'TRANSFERENCIA', 'AUDITORIA', 'INVENTARIO', 'OUTROS'],
    description: 'Filtrar por tipo de evento',
  })
  @ApiQuery({
    name: 'state',
    required: false,
    enum: ['DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED'],
    description: 'Filtrar por estado do evento',
  })
  @ApiQuery({
    name: 'visibility',
    required: false,
    enum: ['PUBLIC', 'PRIVATE', 'RESTRICTED'],
    description: 'Filtrar por visibilidade do evento',
  })
  @ApiQuery({
    name: 'patrimonioId',
    required: false,
    type: String,
    description: 'Filtrar por ID de patrimônio relacionado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiQuery({
    name: 'from',
    required: false,
    type: String,
    description: 'Data inicial (ISO 8601)',
    example: '2025-02-01T00:00:00Z',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    type: String,
    description: 'Data final (ISO 8601)',
    example: '2025-02-28T23:59:59Z',
  })
  findAll(
    @Query() query: QueryEventsDto,
  ): Promise<PaginatedEventsResponseDto> {
    return this.eventsService.findAll(query);
  }

  @Get(':idOrSlug')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Buscar evento por ID ou slug',
    description: 'Busca um evento específico por ID (UUID) ou slug. Requer autenticação.',
  })
  @ApiParam({
    name: 'idOrSlug',
    description: 'ID (UUID) ou slug do evento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Evento encontrado',
    type: EventResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - evento não publicado ou sem permissão' })
  findOne(
    @Param('idOrSlug') idOrSlug: string,
    @Req() req?: Request,
  ): Promise<EventResponseDto> {
    const user = req?.user as { sub?: string; roles?: string[] } | undefined;
    const userId = user?.sub;
    const roles = user?.roles || [];
    const isAdmin = Array.isArray(roles) && roles.includes('admin');

    const requester = userId
      ? { userId, isAdmin }
      : undefined;

    return this.eventsService.findOneByIdOrSlug(idOrSlug, requester);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Atualizar evento',
    description: 'Atualiza um evento existente. Apenas o criador do evento ou ADMIN podem atualizar.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID (UUID) do evento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateEventDto })
  @ApiOkResponse({
    description: 'Evento atualizado com sucesso',
    type: EventResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas criador ou ADMIN' })
  @ApiBadRequestResponse({ description: 'Dados de entrada inválidos' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
    @OwnerId() userId: string,
    @Req() req?: Request,
  ): Promise<EventResponseDto> {
    const user = req?.user as { roles?: string[] } | undefined;
    const roles = user?.roles || [];
    const isAdmin = Array.isArray(roles) && roles.includes('admin');

    return this.eventsService.update(id, updateEventDto, {
      userId,
      isAdmin,
    });
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Publicar evento',
    description: 'Publica um evento (muda o estado de DRAFT para PUBLISHED). Apenas o criador do evento ou ADMIN podem publicar.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID (UUID) do evento',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'Evento publicado com sucesso',
    type: EventResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Evento não encontrado' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas criador ou ADMIN' })
  @ApiBadRequestResponse({ description: 'Evento não está em rascunho' })
  publish(
    @Param('id', ParseUUIDPipe) id: string,
    @OwnerId() userId: string,
    @Req() req?: Request,
  ): Promise<EventResponseDto> {
    const user = req?.user as { roles?: string[] } | undefined;
    const roles = user?.roles || [];
    const isAdmin = Array.isArray(roles) && roles.includes('admin');

    return this.eventsService.publish(id, {
      userId,
      isAdmin,
    });
  }
}
