# Audit Service

Serviço de auditoria e logs para o sistema de patrimônio.

## 📋 Descrição

Este serviço é responsável por:
- Criação de logs de auditoria
- Busca e consulta de logs de auditoria
- Estatísticas de auditoria
- Métricas e logs do sistema

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

- `POST /audit/logs` - Criar log de auditoria
- `GET /audit/logs` - Buscar logs de auditoria (com filtros)
- `GET /audit/logs/:id` - Obter log por ID
- `GET /audit/logs/entity/:entityType/:entityId` - Buscar logs por entidade
- `GET /audit/logs/user/:userId` - Buscar logs por usuário
- `GET /audit/stats` - Obter estatísticas de auditoria
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
docker build -t audit-service .

# Run
docker run -p 3005:3005 --env-file .env audit-service
```

## 📚 Documentação

- Swagger UI: http://localhost:3005/api
- OpenAPI Spec: `openapi.yaml`

## 🔧 Configuração

Veja `.env.example` para todas as variáveis de ambiente disponíveis.

## 📝 Licença

UNLICENSED




