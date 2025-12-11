import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('enums')
@ApiTags('enums')
export class EnumsController {
  @Get('categorias')
  @ApiOperation({
    summary: 'Listar categorias de patrimônio disponíveis',
    description:
      'Retorna todas as categorias válidas para patrimônios com metadados úteis',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias retornada com sucesso',
  })
  getCategorias() {
    return {
      categorias: [
        {
          value: 'EQUIPAMENTO',
          label: 'Equipamento',
          description: 'Equipamentos eletrônicos, computadores, periféricos',
          icon: 'laptop',
          color: '#3B82F6',
        },
        {
          value: 'MOBILIARIO',
          label: 'Mobiliário',
          description: 'Móveis, cadeiras, mesas, armários',
          icon: 'chair',
          color: '#8B5CF6',
        },
        {
          value: 'VEICULO',
          label: 'Veículo',
          description: 'Carros, motos, veículos em geral',
          icon: 'car',
          color: '#F59E0B',
        },
        {
          value: 'IMOVEL',
          label: 'Imóvel',
          description: 'Terrenos, prédios, salas comerciais',
          icon: 'building',
          color: '#10B981',
        },
        {
          value: 'SOFTWARE',
          label: 'Software',
          description: 'Licenças de software, sistemas',
          icon: 'code',
          color: '#6366F1',
        },
        {
          value: 'OUTROS',
          label: 'Outros',
          description: 'Outros tipos de patrimônio',
          icon: 'package',
          color: '#6B7280',
        },
      ],
    };
  }

  @Get('status')
  @ApiOperation({
    summary: 'Listar status de patrimônio disponíveis',
    description:
      'Retorna todos os status válidos para patrimônios com metadados úteis',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de status retornada com sucesso',
  })
  getStatus() {
    return {
      status: [
        {
          value: 'ATIVO',
          label: 'Ativo',
          description: 'Patrimônio em uso normal',
          color: '#10B981',
          badge: 'success',
        },
        {
          value: 'INATIVO',
          label: 'Inativo',
          description: 'Patrimônio não está em uso',
          color: '#6B7280',
          badge: 'secondary',
        },
        {
          value: 'MANUTENCAO',
          label: 'Manutenção',
          description: 'Patrimônio em manutenção',
          color: '#F59E0B',
          badge: 'warning',
        },
        {
          value: 'DESCARTADO',
          label: 'Descartado',
          description: 'Patrimônio descartado ou alienado',
          color: '#EF4444',
          badge: 'danger',
        },
      ],
    };
  }

  @Get('roles')
  @ApiOperation({
    summary: 'Listar roles de usuário disponíveis',
    description:
      'Retorna todos os roles válidos para usuários com permissões associadas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles retornada com sucesso',
  })
  getRoles() {
    return {
      roles: [
        {
          value: 'ADMIN',
          label: 'Administrador',
          description: 'Acesso total ao sistema',
          permissions: [
            'users.create',
            'users.read',
            'users.update',
            'users.delete',
            'patrimonio.create',
            'patrimonio.read',
            'patrimonio.update',
            'patrimonio.delete',
            'audit.read',
            'reports.all',
          ],
          color: '#EF4444',
        },
        {
          value: 'MANAGER',
          label: 'Gerente de Patrimônio',
          description: 'Pode gerenciar patrimônios e visualizar relatórios',
          permissions: [
            'users.read',
            'patrimonio.create',
            'patrimonio.read',
            'patrimonio.update',
            'reports.view',
          ],
          color: '#3B82F6',
        },
        {
          value: 'OPERATOR',
          label: 'Operador de Inventário',
          description: 'Acesso para operações de inventário e manutenção',
          permissions: ['patrimonio.read', 'patrimonio.update', 'maintenance.read'],
          color: '#10B981',
        },
      ],
    };
  }

  @Get('campos-ordenacao')
  @ApiOperation({
    summary: 'Listar campos disponíveis para ordenação',
    description: 'Retorna campos que podem ser usados em sortBy',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de campos retornada com sucesso',
  })
  getCamposOrdenacao() {
    return {
      patrimonio: [
        { value: 'nome', label: 'Nome' },
        { value: 'codigo', label: 'Código' },
        { value: 'categoria', label: 'Categoria' },
        { value: 'status', label: 'Status' },
        { value: 'valorAquisicao', label: 'Valor de Aquisição' },
        { value: 'dataAquisicao', label: 'Data de Aquisição' },
        { value: 'createdAt', label: 'Data de Criação' },
      ],
      users: [
        { value: 'name', label: 'Nome' },
        { value: 'email', label: 'E-mail' },
        { value: 'role', label: 'Perfil' },
        { value: 'createdAt', label: 'Data de Criação' },
      ],
    };
  }

  @Get('direcoes-ordenacao')
  @ApiOperation({
    summary: 'Listar direções de ordenação disponíveis',
    description: 'Retorna as direções válidas para sortOrder',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de direções retornada com sucesso',
  })
  getDirecoesOrdenacao() {
    return {
      direcoes: [
        { value: 'ASC', label: 'Crescente (A-Z, 0-9)' },
        { value: 'DESC', label: 'Decrescente (Z-A, 9-0)' },
      ],
    };
  }
}


