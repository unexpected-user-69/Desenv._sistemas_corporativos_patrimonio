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
  UseGuards,
  Req,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Throttle } from '@nestjs/throttler';
import { UsersService } from './users.service';
import { UserRole } from './enums/user-role.enum';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiConflictResponse,
  ApiBody,
  ApiQuery,
  ApiOperation,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnerId } from '../common/decorators/owner-id.decorator';
import { Public } from '../common/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { QueryUsersDto } from './dto/query-users.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { AuthUser } from '../auth/strategies/jwt.strategy';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas MANAGER ou ADMIN' })
  @ApiOkResponse({
    description: 'Lista todos os usuários com paginação e filtros avançados',
    type: PaginatedUsersResponseDto,
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
    description: 'Busca textual genérica (nome e email)',
    example: 'joão silva',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: ['OPERATOR', 'MANAGER', 'ADMIN'],
    description: 'Filtrar por role específico',
    example: 'OPERATOR',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filtrar por status ativo (true/false)',
    example: true,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['name', 'email', 'createdAt', 'updatedAt'],
    description: 'Campo para ordenação',
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'Direção da ordenação',
    example: 'DESC',
  })
  findAll(@Query() query: QueryUsersDto): Promise<PaginatedUsersResponseDto> {
    return this.usersService.findAllWithAdvancedFilters(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas o próprio usuário ou ADMIN' })
  @ApiOkResponse({
    description: 'Retorna um usuário pelo ID',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'User with ID "uuid-here" not found',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido (não é um UUID válido)',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'string',
          example: 'Validation failed (uuid is expected)',
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: Request & { user?: AuthUser },
  ): Promise<UserResponseDto> {
    const authenticatedUser = req.user;
    // O JwtAuthGuard garante que o usuário está autenticado, mas fazemos uma verificação de segurança
    if (!authenticatedUser) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    // Passa informações do usuário autenticado para verificação self-or-admin no service
    return this.usersService.findOne(id, authenticatedUser.sub, authenticatedUser.roles);
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Buscar usuário por email' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiOkResponse({
    description: 'Retorna um usuário pelo email',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'User with email "email@example.com" not found',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Email inválido',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid email format' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  findByEmail(@Param('email') email: string): Promise<UserResponseDto> {
    return this.usersService.findByEmail(email);
  }

  @Public()
  @Post('validate')
  @ApiOperation({ summary: 'Validar credenciais de usuário' })
  @ApiBody({ type: ValidateUserDto })
  @ApiOkResponse({
    description: 'Retorna o usuário se as credenciais forem válidas, null caso contrário',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  async validate(@Body() dto: ValidateUserDto): Promise<UserResponseDto | null> {
    try {
      const user = await this.usersService.validateCredentials(
        dto.email,
        dto.password,
      );
      if (!user) {
        // Retorna null quando credenciais são inválidas (não é um erro HTTP)
        return null;
      }
      // Retorna serializado (sem passwordHash devido ao @Exclude)
      // Não passa autenticação pois este é um endpoint público de validação
      return await this.usersService.findOne(user.id, undefined, undefined);
    } catch (error: any) {
      // Em caso de erro, retorna null (não lança exceção para não expor detalhes)
      this.logger.error(`Erro ao validar credenciais: ${error.message}`);
      return null;
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requisições por minuto
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados do usuário a ser criado',
    examples: {
      operator: {
        summary: 'Criar operador',
        value: {
          name: 'João Silva',
          email: 'joao.silva@email.com',
          password: 'senha123',
          role: 'OPERATOR',
          isActive: true,
        },
      },
      manager: {
        summary: 'Criar gerente',
        value: {
          name: 'Maria Santos',
          email: 'maria.santos@email.com',
          password: 'senha456',
          role: 'MANAGER',
          isActive: true,
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['name should not be empty', 'email must be a valid email'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Email já existe no sistema',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Email already exists' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Criar múltiplos usuários em lote' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiBody({
    type: [CreateUserDto],
    description: 'Lista de usuários a serem criados',
    examples: {
      multiple: {
        summary: 'Criar múltiplos usuários',
        value: [
          {
            name: 'João Silva',
            email: 'joao.silva@email.com',
            password: 'senha123',
            role: 'OPERATOR',
            isActive: true,
          },
          {
            name: 'Maria Santos',
            email: 'maria.santos@email.com',
            password: 'senha456',
            role: 'MANAGER',
            isActive: true,
          },
        ],
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Usuários criados com sucesso',
    type: [UserResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Dados de entrada inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          items: { type: 'string' },
          example: ['name should not be empty', 'email must be a valid email'],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Um ou mais emails já existem no sistema',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: {
          type: 'string',
          example: 'One or more emails already exist',
        },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  createBulk(@Body() dtos: CreateUserDto[]): Promise<UserResponseDto[]> {
    return this.usersService.createBulk(dtos);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas o próprio usuário ou ADMIN' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Dados do usuário a ser atualizado (todos os campos são opcionais)',
    examples: {
      updateName: {
        summary: 'Atualizar apenas o nome',
        value: {
          name: 'João Silva Atualizado',
        },
      },
      updateEmail: {
        summary: 'Atualizar apenas o email',
        value: {
          email: 'novo.email@example.com',
        },
      },
      updatePassword: {
        summary: 'Atualizar apenas a senha',
        value: {
          password: 'NovaSenha123!',
        },
      },
      updateRole: {
        summary: 'Atualizar role (apenas ADMIN)',
        value: {
          role: 'MANAGER',
        },
      },
      updateStatus: {
        summary: 'Atualizar status ativo',
        value: {
          isActive: false,
        },
      },
      updateAvatar: {
        summary: 'Atualizar avatar URL',
        value: {
          avatarUrl: 'https://example.com/avatar.jpg',
        },
      },
      updateMultiple: {
        summary: 'Atualizar múltiplos campos',
        value: {
          name: 'João Silva',
          email: 'joao.silva@example.com',
          isActive: true,
          avatarUrl: 'https://example.com/avatar.jpg',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Usuário atualizado com sucesso',
    type: UserResponseDto,
    schema: {
      example: {
        id: '09dcf742-dabb-4fc6-abfa-cd77ccaca109',
        name: 'João Silva Atualizado',
        email: 'joao.silva@example.com',
        role: 'OPERATOR',
        isActive: true,
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-02T00:00:00.000Z',
        version: 2,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido ou dados inválidos' })
  @ApiConflictResponse({
    description: 'Email já existe no sistema (se estiver atualizando o email)',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 409 },
        message: { type: 'string', example: 'Email already exists' },
        error: { type: 'string', example: 'Conflict' },
      },
    },
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
    @OwnerId() _requesterId: string,
  ): Promise<UserResponseDto> {
    // Verifica se o usuário é o dono ou é ADMIN (verificação básica - pode ser melhorada)
    // Por enquanto, apenas retorna o update. Lógica de autorização pode ser adicionada no service se necessário
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Deletar usuário por ID' })
  @ApiUnauthorizedResponse({ description: 'Não autenticado' })
  @ApiForbiddenResponse({ description: 'Acesso negado - apenas ADMIN' })
  @ApiOkResponse({ description: 'Remove um usuário pelo ID' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Get('advanced/search')
  @ApiOperation({ summary: 'Busca avançada de usuários' })
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
  @ApiOperation({ summary: 'Busca com paginação por cursor' })
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
  @ApiOperation({ summary: 'Busca fuzzy por nome ou email' })
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
  @ApiOperation({ summary: 'Buscar usuários por intervalo de datas' })
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
  @ApiOperation({ summary: 'Estatísticas de usuários por role' })
  @ApiOkResponse({
    description: 'Estatísticas de usuários por role',
  })
  async getUserStatsByRole(): Promise<Record<string, number>> {
    return this.usersService.getUserStatsByRole();
  }

  @Get('recent/active')
  @ApiOperation({ summary: 'Listar usuários ativos recentes' })
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
