# Auth Service

Serviço de autenticação e autorização para o sistema de patrimônio.

## 📋 Descrição

Este serviço é responsável por:
- Autenticação de usuários (login)
- Geração e renovação de tokens JWT
- Revogação de tokens (logout)
- Validação de tokens JWT

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+
- Docker e Docker Compose (opcional)

### Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações
```

### Executar em Desenvolvimento

```bash
# Com Docker Compose
docker-compose up -d

# Ou manualmente
npm run start:dev
```

### Executar Migrations

```bash
# Usando TypeORM CLI
npm run typeorm -- migration:run
```

## 📡 Endpoints

- `POST /auth/login` - Autenticar usuário
- `POST /auth/refresh` - Renovar tokens
- `POST /auth/logout` - Revogar token
- `GET /auth/me` - Informações do usuário autenticado
- `GET /health` - Health check

## 🧪 Testes

```bash
# Todos os testes
npm run test:all

# Testes de contrato
npm run test:contract

# Testes unitários
npm run test:unit

# Testes E2E
npm run test:e2e
```

## 🐳 Docker

```bash
# Build
docker build -t auth-service .

# Run
docker run -p 3001:3001 --env-file .env auth-service
```

## 📚 Documentação

- Swagger UI: http://localhost:3001/api
- OpenAPI Spec: `openapi.yaml`

## 🔧 Configuração

Veja `.env.example` para todas as variáveis de ambiente disponíveis.

## 📝 Licença

UNLICENSED





