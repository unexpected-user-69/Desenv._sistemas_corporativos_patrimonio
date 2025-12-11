# 🏢 Sistema de Gestão de Patrimônio - Backend

Sistema de gerenciamento de patrimônio corporativo construído com arquitetura de microsserviços usando NestJS, TypeORM e PostgreSQL.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Migrations](#migrations)
- [Executando os Serviços](#executando-os-serviços)
- [Usuários de Desenvolvimento](#usuários-de-desenvolvimento)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)

---

## 🎯 Visão Geral

Sistema modular de gestão de patrimônio com arquitetura de microsserviços, implementando:

- ✅ Autenticação e autorização JWT
- ✅ CRUD completo de usuários, patrimônios, categorias e eventos
- ✅ Auditoria de operações
- ✅ Schemas PostgreSQL isolados por serviço
- ✅ Validação de dados com class-validator
- ✅ Documentação OpenAPI/Swagger
- ✅ Testes E2E e de contrato

---

## 🏗️ Arquitetura

### API Gateway

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| **api-gateway** | 3000 | Gateway centralizado - Ponto único de entrada |

### Microsserviços

| Serviço | Porta | Descrição | Schema DB |
|---------|-------|-----------|-----------|
| **auth-service** | 3001 | Autenticação e tokens JWT | `auth` |
| **users-service** | 3002 | Gerenciamento de usuários | `users` |
| **events-service** | 3003 | Gerenciamento de eventos | `events` |
| **audit-service** | 3004 | Logs de auditoria | `audit` |
| **categorias-service** | 3005 | Gerenciamento de categorias | `categorias` |
| **patrimonio-service** | 3006 | Gerenciamento de patrimônios | `patrimonio` |

### Banco de Dados

- **PostgreSQL 15**: Banco de dados compartilhado com schemas isolados
- **TypeORM**: ORM para gerenciamento de entidades e migrations
- **Schemas separados**: Cada serviço tem seu próprio schema PostgreSQL

---

## 📦 Pré-requisitos

- **Node.js**: v18+ ou v22+ (recomendado)
- **npm**: v9+ ou v10+
- **PostgreSQL**: v15+
- **Git**: Para controle de versão

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd Desenv._sistemas_corporativos_patrimonio/backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Instale as dependências de cada microsserviço

```bash
cd packages/api-gateway && npm install --legacy-peer-deps && cd ../..
cd packages/auth-service && npm install && cd ../..
cd packages/users-service && npm install && cd ../..
cd packages/events-service && npm install && cd ../..
cd packages/audit-service && npm install && cd ../..
cd packages/categorias-service && npm install && cd ../..
cd packages/patrimonio-service && npm install && cd ../..
```

---

## ⚙️ Configuração

### 1. Configure o PostgreSQL

Crie o banco de dados:

```sql
CREATE DATABASE patrimonio_inventario;
```

### 2. Configure as variáveis de ambiente

#### Opção 1: Usar arquivo de referência (Recomendado)

Copie o arquivo `.env.example` para `.env` na raiz do backend:

```bash
cp .env.example .env
```

O arquivo `.env.example` contém todas as variáveis de ambiente necessárias para todos os serviços, incluindo:
- Configurações do banco de dados
- Schemas por serviço
- JWT secrets
- SERVICE_TOKEN para comunicação service-to-service
- URLs dos serviços
- Portas de cada serviço
- Configurações de CORS e ambiente

**⚠️ IMPORTANTE**: Edite o arquivo `.env` e configure os valores adequados, especialmente:
- `JWT_ACCESS_SECRET` e `JWT_REFRESH_SECRET` (gere secrets seguros)
- `SERVICE_TOKEN` (gere um token seguro de pelo menos 32 caracteres)
- `HASH_PEPPER` (gere um pepper aleatório)
- Credenciais do banco de dados

#### Opção 2: Configurar manualmente

Se preferir, crie um arquivo `.env` manualmente com as variáveis necessárias. Veja o `.env.example` como referência.

### 3. Configure variáveis específicas de cada serviço (opcional)

Cada serviço pode ter seu próprio `.env` em `packages/<service-name>/.env`. Os serviços procuram variáveis nesta ordem:
1. `.env.local` (prioridade máxima)
2. `.env` (no diretório do serviço)
3. `../.env` (diretório pai)
4. `../../.env` (raiz do backend - `.env.example` como referência)

---

## 🗃️ Migrations

### Executar todas as migrations

```bash
npm run migration:run:all
```

Este comando executa as migrations de todos os microsserviços na ordem correta:

1. users-service
2. auth-service
3. events-service
4. audit-service
5. categorias-service
6. patrimonio-service

### Executar migrations de um serviço específico

```bash
cd packages/<service-name>
npm run migration:run
```

### Reverter migrations

```bash
cd packages/<service-name>
npm run migration:revert
```

### Gerar nova migration

```bash
cd packages/<service-name>
npm run migration:generate -- src/database/migrations/NomeDaMigration
```

---

## 🏃 Executando os Serviços

### Modo Desenvolvimento (com watch)

Execute cada serviço em um terminal separado:

#### Terminal 1 - API Gateway (Recomendado)
```bash
cd packages/api-gateway
npm run start:dev
```

**Nota**: O API Gateway é o ponto único de entrada recomendado. Ele roteia requisições para todos os microsserviços e fornece autenticação centralizada, rate limiting e circuit breaker.

#### Terminal 2 - Auth Service
```bash
cd packages/auth-service
npm run start:dev
```

#### Terminal 3 - Users Service
```bash
cd packages/users-service
npm run start:dev
```

#### Terminal 4 - Events Service
```bash
cd packages/events-service
npm run start:dev
```

#### Terminal 5 - Audit Service
```bash
cd packages/audit-service
npm run start:dev
```

#### Terminal 6 - Categorias Service
```bash
cd packages/categorias-service
npm run start:dev
```

#### Terminal 7 - Patrimonio Service
```bash
cd packages/patrimonio-service
npm run start:dev
```

### Modo Produção

```bash
cd packages/<service-name>
npm run build
npm run start:prod
```

---

## 👤 Usuários de Desenvolvimento

Após executar as migrations, crie os usuários de desenvolvimento:

### Criar usuário admin principal

```bash
cd packages/users-service
node scripts/create-dev-user.js
```

**Credenciais padrão:**
- Email: `admin@dev.local`
- Senha: `AdminPassword123!`

### Criar usuário admin secundário

```bash
cd packages/users-service
node scripts/create-admin2.js
```

**Credenciais:**
- Email: `admin2@dev.local`
- Senha: `Admin2Password123!`

---

## 🧪 Testes

### Executar todos os testes

```bash
cd packages/<service-name>
npm test
```

### Testes E2E

```bash
cd packages/<service-name>
npm run test:e2e
```

### Testes de Contrato (OpenAPI)

```bash
cd packages/<service-name>
npm run test:contract
```

### Cobertura de testes

```bash
cd packages/<service-name>
npm run test:cov
```

---

## 📚 Documentação da API

### API Gateway (Recomendado)

Acesse todos os serviços através do gateway:

- **API Gateway**: http://localhost:3000/api

O gateway roteia requisições para todos os microsserviços usando o padrão:
```
http://localhost:3000/api/{service}/{path}
```

### Microsserviços (Acesso Direto)

Cada serviço expõe sua documentação Swagger em `/api`:

- **Auth Service**: http://localhost:3001/api
- **Users Service**: http://localhost:3002/api
- **Events Service**: http://localhost:3003/api
- **Audit Service**: http://localhost:3004/api
- **Categorias Service**: http://localhost:3005/api
- **Patrimonio Service**: http://localhost:3006/api

### Exemplo de uso da API

#### Via API Gateway (Recomendado)

##### 1. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dev.local",
    "password": "AdminPassword123!"
  }'
```

##### 2. Usar o token em requisições

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <accessToken>"
```

#### Via Microsserviços Direto

##### 1. Login

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dev.local",
    "password": "AdminPassword123!"
  }'
```

**Resposta:**
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "base64-encoded-refresh-token",
    "user": {
      "id": "uuid",
      "email": "admin@dev.local",
      "name": "Admin Dev",
      "role": "ADMIN"
    }
  }
}
```

#### 2. Usar o token em requisições

```bash
curl -X GET http://localhost:3002/users \
  -H "Authorization: Bearer <accessToken>"
```

---

## 📁 Estrutura do Projeto

```
backend/
├── packages/
│   ├── api-gateway/           # Gateway centralizado (porta 3000)
│   │   ├── src/
│   │   │   ├── common/        # Guards, interceptors, filters
│   │   │   ├── health/        # Health check
│   │   │   ├── proxy/         # Roteamento e circuit breaker
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── auth-service/          # Serviço de autenticação
│   │   ├── src/
│   │   │   ├── auth/          # Módulo de autenticação
│   │   │   ├── common/        # Utilitários compartilhados
│   │   │   ├── database/      # Configuração DB e migrations
│   │   │   └── main.ts        # Entry point
│   │   ├── test/              # Testes E2E e de contrato
│   │   ├── openapi.yaml       # Especificação OpenAPI
│   │   └── package.json
│   │
│   ├── users-service/         # Serviço de usuários
│   │   ├── src/
│   │   │   ├── users/         # Módulo de usuários
│   │   │   ├── auth/          # Estratégias JWT
│   │   │   ├── common/        # Utilitários
│   │   │   ├── database/      # Migrations
│   │   │   └── main.ts
│   │   ├── scripts/           # Scripts utilitários
│   │   │   ├── create-dev-user.js
│   │   │   └── create-admin2.js
│   │   └── test/
│   │
│   ├── events-service/        # Serviço de eventos
│   ├── audit-service/         # Serviço de auditoria
│   ├── categorias-service/    # Serviço de categorias
│   └── patrimonio-service/    # Serviço de patrimônios
│
├── scripts/
│   └── run-all-migrations.ts  # Script para rodar todas as migrations
│
├── .env                       # Variáveis de ambiente
├── package.json               # Dependências do workspace
└── README.md                  # Este arquivo
```

---

## 🛠️ Tecnologias

### Backend Framework
- **NestJS 11**: Framework Node.js progressivo
- **TypeScript 5.7**: Superset tipado do JavaScript
- **Express**: Framework HTTP subjacente

### Banco de Dados
- **PostgreSQL 15**: Banco de dados relacional
- **TypeORM 0.3**: ORM para TypeScript/JavaScript
- **pg**: Driver PostgreSQL para Node.js

### Autenticação & Segurança
- **Passport**: Middleware de autenticação
- **JWT**: JSON Web Tokens
- **bcryptjs**: Hashing de senhas
- **argon2**: Hashing de refresh tokens
- **class-validator**: Validação de DTOs
- **class-transformer**: Transformação de objetos

### Documentação
- **Swagger/OpenAPI 3.1**: Documentação de APIs
- **@nestjs/swagger**: Integração Swagger com NestJS

### Testes
- **Jest**: Framework de testes
- **Supertest**: Testes HTTP
- **ts-jest**: Suporte TypeScript para Jest

### Utilitários
- **dotenv**: Gerenciamento de variáveis de ambiente
- **rxjs**: Programação reativa
- **axios**: Cliente HTTP

---

## 🔒 Segurança

### Autenticação
- JWT com access tokens (15 minutos) e refresh tokens (7 dias)
- Refresh tokens armazenados com hash Argon2
- Senhas com bcrypt + pepper + salt

### Autorização
- RBAC (Role-Based Access Control)
- Guards: JwtAuthGuard, RolesGuard, OwnershipGuard
- Roles: ADMIN, MANAGER, OPERATOR

### Validação
- DTOs com class-validator
- ValidationPipe global
- Sanitização de entrada

### Headers de Segurança
- CORS configurado
- Rate limiting (Throttler)
- Timeout interceptor

---

## 🐛 Troubleshooting

### Erro: "Cannot set property crypto"

**Problema**: Polyfill do crypto em Node.js v22+

**Solução**: O polyfill foi removido. Se ainda aparecer, verifique `main.ts` dos serviços.

### Erro: "Invalid credentials" no login

**Soluções**:
1. Verifique se o users-service está rodando
2. Verifique se as migrations foram executadas
3. Verifique se o usuário foi criado
4. Reinicie ambos os serviços (auth e users)

### Erro: "relation does not exist"

**Problema**: Migrations não foram executadas

**Solução**:
```bash
npm run migration:run:all
```

### Erro: "ECONNREFUSED" entre serviços

**Problema**: Serviço não está rodando ou URL incorreta

**Solução**:
1. Verifique se todos os serviços estão rodando
2. Verifique as variáveis de ambiente (USERS_SERVICE_URL, etc.)
3. Verifique as portas (3001-3006)

---

## 📝 Scripts Úteis

### Backend (raiz)

```bash
# Rodar todas as migrations
npm run migration:run:all

# Limpar node_modules
npm run clean

# Reinstalar dependências
npm run clean && npm install
```

### Por serviço

```bash
# Desenvolvimento com watch
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Testes
npm test
npm run test:e2e
npm run test:cov

# Migrations
npm run migration:generate -- src/database/migrations/NomeDaMigration
npm run migration:run
npm run migration:revert

# Linting
npm run lint
npm run format
```

---

## 👥 Contribuindo

1. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
2. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
3. Push para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request

### Convenção de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 📄 Licença

Este projeto é parte de um trabalho acadêmico.

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a [documentação](#documentação-da-api)
2. Consulte o [troubleshooting](#troubleshooting)
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ usando NestJS**
