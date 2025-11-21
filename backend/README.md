# 🏛️ Sistema de Patrimônio e Inventário - Backend

API RESTful completa para gestão de patrimônio e inventário, construída com NestJS, TypeORM e PostgreSQL.

## 📋 Índice

- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando](#executando)
- [Testes](#testes)
- [Documentação](#documentação)
- [Endpoints](#endpoints)

## 📝 Descrição

Backend completo para sistema de gestão de patrimônio e inventário, com autenticação JWT, autorização baseada em roles, sistema de auditoria, validação de dados e documentação Swagger automática.

## 🛠️ Tecnologias

- **NestJS** - Framework Node.js
- **TypeORM** - ORM para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação e autorização
- **Argon2** - Hash de senhas
- **Swagger** - Documentação da API
- **Jest** - Framework de testes
- **Docker** - Containerização

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── auth/              # Autenticação e autorização
│   │   ├── dto/           # DTOs de autenticação
│   │   ├── entities/      # RefreshToken entity
│   │   ├── strategies/    # JWT Strategy
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/             # Gerenciamento de usuários
│   │   ├── dto/           # DTOs de usuários
│   │   ├── entities/      # User entity
│   │   ├── enums/         # UserRole enum
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── patrimonio/        # Gestão de patrimônio
│   │   ├── dto/           # DTOs de patrimônio
│   │   ├── entities/      # Patrimonio entity
│   │   ├── patrimonio.controller.ts
│   │   ├── patrimonio.service.ts
│   │   └── patrimonio.module.ts
│   ├── categorias/        # Categorias de patrimônio
│   ├── audit/             # Sistema de auditoria
│   ├── common/            # Utilitários compartilhados
│   │   ├── guards/        # Guards (JWT, Roles)
│   │   ├── interceptors/  # Interceptors (Logging, Timeout, Transform)
│   │   ├── decorators/    # Decorators (Roles, OwnerId)
│   │   ├── validators/    # Validators customizados
│   │   └── services/      # Serviços compartilhados
│   ├── database/          # Configuração do banco
│   │   └── data-source.ts
│   └── main.ts            # Bootstrap da aplicação
├── test/                  # Testes (padrão Aurora)
│   ├── auth/              # Testes de autenticação
│   ├── users/             # Testes de usuários
│   ├── patrimonio/        # Testes de patrimônio
│   ├── common/            # Testes de utilitários
│   ├── factories/         # Factories de teste
│   └── mocks/             # Mocks reutilizáveis
├── scripts/               # Scripts de setup
├── docker-compose.yml     # Orquestração Docker
├── Dockerfile             # Imagem Docker
└── package.json           # Dependências
```

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- PostgreSQL 15+
- Docker (opcional)

### Instalação Local

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp docker.env .env

# Editar .env com suas configurações
# Ver seção "Configuração" abaixo
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=patrimonio_inventario

# Backend
PORT=3101
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_REFRESH_EXPIRES_IN=7d

# Desenvolvimento
DEV_AUTO_AUTH=false  # Auto-injeta usuário fake quando true (apenas em dev)

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Segurança
HASH_PEPPER=your-pepper-here-change-in-production
HASH_SALT_ROUNDS=12
```

### Banco de Dados

#### Opção 1: Docker (Recomendado)

```bash
# Iniciar banco de dados
docker-compose up db -d

# Verificar status
docker-compose ps
```

#### Opção 2: PostgreSQL Local

```bash
# Criar banco de dados
createdb patrimonio_inventario

# Ou via psql
psql -U postgres -c "CREATE DATABASE patrimonio_inventario;"
```

### Migrations

```bash
# Rodar migrations
npm run migration:run

# Reverter última migration
npm run migration:revert

# Gerar nova migration
npm run migration:generate -- -n MigrationName
```

## ▶️ Executando

### Desenvolvimento

```bash
# Iniciar em modo desenvolvimento (watch mode)
npm run start:dev

# A aplicação estará disponível em http://localhost:3101
```

### Produção

```bash
# Build
npm run build

# Iniciar em produção
npm run start:prod
```

### Docker

```bash
# Build e iniciar
docker-compose up --build -d

# Ver logs
docker-compose logs -f backend

# Parar
docker-compose down
```

### Execução Manual (Microsserviços + Monolito)

Para iniciar todo o ecossistema manualmente, abra terminais separados para cada serviço e execute os comandos na ordem abaixo:

#### 1. Audit Service (Porta 3005)
```powershell
cd packages/audit-service; npm install; npm run start:dev
```

#### 2. Auth Service (Porta 3001)
```powershell
cd packages/auth-service; npm install; npm run start:dev
```

#### 3. Categorias Service (Porta 3004)
```powershell
cd packages/categorias-service; npm install; npm run start:dev
```

#### 4. Events Service (Porta 3002)
```powershell
cd packages/events-service; npm install; npm run start:dev
```

#### 5. Patrimonio Service (Porta 3006)
```powershell
cd packages/patrimonio-service; npm install; npm run start:dev
```

#### 6. Users Service (Porta 3003)
```powershell
cd packages/users-service; npm install; npm run start:dev
```

#### 7. Monolito (Backend Principal - Porta 3000)
**Nota:** Inicie este por último para garantir que os microsserviços já estejam disponíveis.
```powershell
npm install; npm run start:dev
```

## 🧪 Testes

### Executar Todos os Testes

```bash
npm test
```

### Testes com Cobertura

```bash
npm run test:cov
```

### Testes E2E

```bash
npm run test:e2e
```

### Testes Específicos

```bash
# Testes de um módulo
npm test -- --testPathPatterns=test/auth

# Testes em modo watch
npm test -- --watch
```

### Estrutura de Testes

Os testes seguem o padrão Aurora, organizados em:

- `test/<feature>/controllers/` - Testes de controllers
- `test/<feature>/services/` - Testes de services
- `test/factories/` - Factories para criar dados de teste
- `test/mocks/` - Mocks reutilizáveis

## 📚 Documentação

### Swagger

Acesse a documentação interativa da API em:

**http://localhost:3101/docs**

A documentação Swagger inclui:
- Todos os endpoints disponíveis
- Schemas de request/response
- Exemplos de uso
- Autenticação Bearer Token

### LLM-UNIFIED-GUIDE

Guia completo para desenvolvimento e interação com LLMs:

**Veja `LLM-UNIFIED-GUIDE.md`**

## 🔌 Endpoints

### Autenticação

#### POST /v1/auth/login
Autentica um usuário.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd!"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh-token-string",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "STUDENT"
  }
}
```

#### POST /v1/auth/refresh
Renova o access token.

**Request:**
```json
{
  "refreshToken": "refresh-token-string"
}
```

#### POST /v1/auth/logout
Revoga o refresh token.

**Request:**
```json
{
  "refreshToken": "refresh-token-string"
}
```

#### GET /v1/auth/me
Obtém informações do usuário autenticado.

**Headers:**
```
Authorization: Bearer <access-token>
```

### Usuários

#### GET /v1/users
Lista usuários (com paginação e filtros).

#### GET /v1/users/:id
Obtém um usuário por ID.

#### POST /v1/users
Cria um novo usuário (requer ADMIN ou TEACHER).

#### PATCH /v1/users/:id
Atualiza um usuário (requer ADMIN ou o próprio usuário).

#### DELETE /v1/users/:id
Remove um usuário (soft delete, requer ADMIN).

### Patrimônio

#### GET /v1/patrimonio
Lista patrimônios (com paginação e filtros avançados).

#### GET /v1/patrimonio/:id
Obtém um patrimônio por ID.

#### POST /v1/patrimonio
Cria um novo patrimônio (requer ADMIN ou TEACHER).

#### PATCH /v1/patrimonio/:id
Atualiza um patrimônio (requer ADMIN ou TEACHER).

#### DELETE /v1/patrimonio/:id
Remove um patrimônio (soft delete, requer ADMIN ou TEACHER).

## 🔐 Autenticação e Autorização

### Roles

- **ADMIN**: Acesso total ao sistema
- **TEACHER**: Pode gerenciar patrimônio e usuários básicos
- **STUDENT**: Acesso de leitura

### Uso de Guards

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.TEACHER)
@Get('protected')
async protectedRoute() {
  // ...
}
```

### Token JWT

O token JWT deve ser enviado no header:

```
Authorization: Bearer <access-token>
```

## 📊 Status do Projeto

### ✅ Implementado

- ✅ Autenticação JWT completa
- ✅ Autorização baseada em roles
- ✅ CRUD de usuários
- ✅ CRUD de patrimônio
- ✅ Sistema de auditoria
- ✅ Validação de dados
- ✅ Documentação Swagger
- ✅ Testes unitários (padrão Aurora)
- ✅ Estrutura de testes completa
- ✅ Docker e Docker Compose

### 🔄 Em Desenvolvimento

- 🔄 Testes E2E completos
- 🔄 Métricas avançadas
- 🔄 Performance testing

## 🤝 Contribuindo

1. Leia o `LLM-UNIFIED-GUIDE.md`
2. Siga o padrão Aurora para testes
3. Use UUID para IDs
4. Execute testes antes de fazer commit
5. Documente mudanças significativas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ usando NestJS**

