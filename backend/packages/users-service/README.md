# Users Service

Serviço de gestão de usuários para o sistema de patrimônio.

## 📋 Descrição

O Users Service é responsável por:
- CRUD completo de usuários
- Validação de credenciais (usado pelo Auth Service)
- Busca avançada com filtros
- Estatísticas de usuários
- Gestão de roles e permissões

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+
- Docker (opcional)

### Instalação

```bash
npm install
```

### Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no `.env`

### Executar Migrations

```bash
npm run migration:run
```

### Executar em Desenvolvimento

```bash
npm run start:dev
```

O serviço estará disponível em `http://localhost:3002`

## 📚 Endpoints

### Principais

- `GET /users` - Listar usuários com filtros
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário
- `POST /users/validate` - Validar credenciais (público)

### Busca Avançada

- `GET /users/advanced/search` - Busca avançada
- `GET /users/cursor/search` - Busca com cursor
- `GET /users/fuzzy/search` - Busca fuzzy
- `GET /users/date-range` - Busca por intervalo de datas

### Estatísticas

- `GET /users/stats/roles` - Estatísticas por role
- `GET /users/recent/active` - Usuários ativos recentes

### Health Check

- `GET /health` - Health check do serviço

## 🔐 Autenticação

O serviço usa JWT tokens do Auth Service para autenticação. Configure `AUTH_API_URL` para apontar para o Auth Service.

## 🧪 Testes

```bash
# Testes de contrato
npm run test:contract

# Testes unitários
npm run test:unit

# Testes E2E
npm run test:e2e

# Todos os testes
npm run test:all
```

## 🐳 Docker

```bash
docker-compose up -d
```

## 📖 Documentação

A documentação Swagger está disponível em `http://localhost:3002/api` quando o serviço está rodando.

## 🔗 Integração

Este serviço se integra com:
- **Auth Service**: Para validação de tokens JWT
- **Database**: PostgreSQL compartilhado (inicialmente)

## 📝 Licença

UNLICENSED






