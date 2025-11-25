# Events Service

Serviço de gestão de eventos relacionados a patrimônio.

## 📋 Descrição

O Events Service é responsável por:
- CRUD completo de eventos
- Busca avançada com filtros
- Publicação de eventos
- Relacionamento com patrimônios
- Gestão de estados e visibilidade

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

O serviço estará disponível em `http://localhost:3003`

## 📚 Endpoints

### Principais

- `GET /events` - Listar eventos com filtros
- `POST /events` - Criar evento
- `GET /events/:idOrSlug` - Buscar evento por ID ou slug
- `PATCH /events/:id` - Atualizar evento
- `POST /events/:id/publish` - Publicar evento

### Health Check

- `GET /health` - Health check do serviço

## 🔐 Autenticação

O serviço usa JWT tokens do Auth Service para autenticação. Configure `AUTH_API_URL` para apontar para o Auth Service.

## 🔗 Integração

Este serviço se integra com:
- **Auth Service**: Para validação de tokens JWT
- **Users Service**: Para validação de usuários e permissões
- **Database**: PostgreSQL compartilhado (inicialmente)

## 🧪 Testes

```bash
# Testes de contrato
npm run test:contract

# Todos os testes
npm run test:all
```

## 🐳 Docker

```bash
docker-compose up -d
```

## 📖 Documentação

A documentação Swagger está disponível em `http://localhost:3003/api` quando o serviço está rodando.

## 📝 Licença

UNLICENSED








