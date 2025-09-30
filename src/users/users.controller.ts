import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiConflictResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({
    description: 'Lista todos os usuários (com paginação e filtros avançados)',
    type: PaginatedUsersResponseDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Itens por página',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Busca textual genérica (nome e email)',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['STUDENT', 'TEACHER', 'ADMIN'],
    description: 'Filtrar por role',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filtrar por status ativo',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['name', 'email', 'createdAt', 'updatedAt'],
    description: 'Campo para ordenação',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'Direção da ordenação',
  })
  findAll(@Query() query: QueryUsersDto): Promise<PaginatedUsersResponseDto> {
    return this.usersService.findAllWithAdvancedFilters(query);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Retorna um usuário pelo ID',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'Cria um novo usuário',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados de entrada inválidos' })
  @ApiConflictResponse({ description: 'Email já existe' })
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'Atualiza um usuário pelo ID',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido ou dados inválidos' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Remove um usuário pelo ID' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Get('advanced/search')
  @ApiOkResponse({
    description: 'Busca avançada com filtros full-text e ordenação dinâmica',
    type: PaginatedUsersResponseDto,
  })
  @ApiQuery({
    name: 'searchText',
    required: false,
    description: 'Texto para busca full-text',
  })
  @ApiQuery({ name: 'role', required: false, description: 'Filtrar por role' })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filtrar por status ativo',
  })
  @ApiQuery({
    name: 'dateFrom',
    required: false,
    description: 'Data inicial (ISO string)',
  })
  @ApiQuery({
    name: 'dateTo',
    required: false,
    description: 'Data final (ISO string)',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Campo para ordenação',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Direção da ordenação (ASC/DESC)',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página' })
  async findWithAdvancedFilters(
    @Query('searchText') searchText?: string,
    @Query('role') role?: string,
    @Query('isActive') isActive?: boolean,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PaginatedUsersResponseDto> {
    const options = {
      searchText,
      role: role as UserRole | undefined,
      isActive,
      dateFrom: dateFrom ? new Date(dateFrom) : undefined,
      dateTo: dateTo ? new Date(dateTo) : undefined,
      sortBy,
      sortOrder,
      page,
      limit,
    };

    return this.usersService.findWithAdvancedFilters(options);
  }

  @Get('cursor/search')
  @ApiOkResponse({
    description: 'Busca com paginação baseada em cursor',
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    description: 'Cursor para paginação',
  })
  @ApiQuery({
    name: 'searchText',
    required: false,
    description: 'Texto para busca',
  })
  @ApiQuery({ name: 'role', required: false, description: 'Filtrar por role' })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filtrar por status ativo',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Campo para ordenação',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Direção da ordenação',
  })
  @ApiQuery({ name: 'limit', required: false, description: 'Itens por página' })
  async findWithCursorPagination(
    @Query('cursor') cursor?: string,
    @Query('searchText') searchText?: string,
    @Query('role') role?: string,
    @Query('isActive') isActive?: boolean,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('limit') limit?: number,
  ) {
    const options = {
      searchText,
      role: role as UserRole | undefined,
      isActive,
      sortBy,
      sortOrder,
      limit,
    };

    return this.usersService.findWithCursorPagination(options, cursor);
  }

  @Get('fuzzy/search')
  @ApiOkResponse({
    description: 'Busca fuzzy (aproximada) por nome ou email',
    type: [UserResponseDto],
  })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Texto para busca fuzzy',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de resultados',
  })
  async findFuzzy(
    @Query('q') searchText: string,
    @Query('limit') limit?: number,
  ): Promise<UserResponseDto[]> {
    return this.usersService.findFuzzy(searchText, limit);
  }

  @Get('date-range')
  @ApiOkResponse({
    description: 'Busca por intervalo de datas',
    type: [UserResponseDto],
  })
  @ApiQuery({
    name: 'dateFrom',
    required: true,
    description: 'Data inicial (ISO string)',
  })
  @ApiQuery({
    name: 'dateTo',
    required: true,
    description: 'Data final (ISO string)',
  })
  @ApiQuery({ name: 'role', required: false, description: 'Filtrar por role' })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: 'Filtrar por status ativo',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de resultados',
  })
  async findByDateRange(
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
    @Query('role') role?: string,
    @Query('isActive') isActive?: boolean,
    @Query('limit') limit?: number,
  ): Promise<UserResponseDto[]> {
    return this.usersService.findByDateRange(
      new Date(dateFrom),
      new Date(dateTo),
      { role: role as UserRole | undefined, isActive, limit },
    );
  }

  @Get('stats/roles')
  @ApiOkResponse({
    description: 'Estatísticas de usuários por role',
  })
  async getUserStatsByRole(): Promise<Record<string, number>> {
    return this.usersService.getUserStatsByRole();
  }

  @Get('recent/active')
  @ApiOkResponse({
    description: 'Usuários ativos recentes',
    type: [UserResponseDto],
  })
  @ApiQuery({
    name: 'days',
    required: false,
    description: 'Número de dias para considerar recente',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de resultados',
  })
  async findRecentActiveUsers(
    @Query('days') days?: number,
    @Query('limit') limit?: number,
  ): Promise<UserResponseDto[]> {
    return this.usersService.findRecentActiveUsers(days, limit);
  }
}
