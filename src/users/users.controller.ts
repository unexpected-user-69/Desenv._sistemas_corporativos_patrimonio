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
}
