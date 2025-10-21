# Trabalho Integrado — Pesquisa e Prática

**Entidade do domínio:** Users (Sistema de Patrimônio e Inventário)

## 1. Visão Geral

Este trabalho integra quatro componentes essenciais para o desenvolvimento de APIs robustas: **documentação correta (Swagger com prefixo global)**, **execução reprodutível (Docker)**, **endpoint paginado/filtrado** e **testes unitários** que expressam o contrato das regras de negócio. A implementação foi aplicada ao domínio de usuários do sistema de patrimônio e inventário, demonstrando como conectar teoria e prática em um ambiente de produção.

## 2. Como rodar

```bash
# Configurar variáveis de ambiente
cp .env.example .env
# Ajuste as variáveis se necessário

# Executar com Docker Compose
docker compose up -d --build

# Ver logs (opcional)
docker compose logs -f app

# Acessar aplicação
# Swagger: http://localhost:3101/docs
# Banco: Postgres (DB_HOST=db)
```

## 3. Endpoints implementados

### GET /v1/users com query params:
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10, máx: 100)
- `q` - Busca textual genérica (nome e email)
- `role` - Filtrar por role (STUDENT, TEACHER, ADMIN)
- `isActive` - Filtrar por status ativo (true/false)
- `sortBy` - Campo para ordenação (name, email, createdAt, updatedAt)
- `sortOrder` - Direção da ordenação (ASC, DESC)

**Resposta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "João Silva",
      "email": "joao@example.com",
      "role": "STUDENT",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "version": 1
    }
  ],
  "total": 123,
  "page": 1,
  "limit": 20,
  "totalPages": 7,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

## 4. Decisões de Projeto

### Filtros do domínio:
- **Busca textual (`q`)**: Busca case-insensitive em nome e email usando ILIKE
- **Filtro por role**: Enum UserRole (STUDENT, TEACHER, ADMIN)
- **Filtro por status**: Boolean isActive para usuários ativos/inativos
- **Ordenação dinâmica**: Por qualquer campo com direção ASC/DESC

### Ordenação:
- **Padrão**: `createdAt DESC` (mais recentes primeiro)
- **Campos disponíveis**: name, email, createdAt, updatedAt
- **Direções**: ASC (crescente), DESC (decrescente)

### Erros e validação:
- **Paginação**: page >= 1, limit <= 100
- **Role**: Deve ser um valor válido do enum UserRole
- **isActive**: Aceita true, false, "true", "false", "1", "0"
- **Busca textual**: Trim automático, case-insensitive

## 5. Testes

```bash
npm ci
npm run test:cov
```

- **Cobertura alvo**: ≥ 70% no Service da listagem
- **Cenários testados**: 
  - Sem filtros (listagem básica)
  - Com busca textual (`q`)
  - Filtros por role e isActive
  - Parâmetros inválidos (page<1, limit>100)
  - Ordenação dinâmica
  - Paginação com metadados
  - Métodos avançados (cursor, fuzzy, date range, stats)

## 6. Evidências (prints)

- `/prints/swagger-prefixo.png` — Swagger com /v1
- `/prints/compose-health.png` — containers healthy
- `/prints/get-users-paginated.png` — resposta paginada
- `/prints/coverage.png` — cobertura de testes

## 7. Pesquisa (PDF)

**Arquivo:** `/docs/trabalho-integrado/pesquisa.pdf`

**Conteúdo:** 
- **Swagger + prefixo**: Problema de URLs duplicadas → Solução de ordem correta → Checklist de validação → Pitfalls comuns → Referência
- **Containerização**: Problema de ambientes inconsistentes → Solução Docker multi-stage → Checklist de healthcheck → Pitfalls de rede → Referência
- **Listagem paginada**: Problema de performance em grandes listas → Solução QueryBuilder + metadados → Checklist de validação → Pitfalls de índices → Referência
- **Testes unitários**: Problema de código frágil → Solução Test Doubles + AAA → Checklist de cobertura → Pitfalls de mocks → Referência

## 8. Checklist de encerramento

- [x] Swagger com prefixo global e anotações do endpoint
- [x] Compose funcional com healthcheck e migrações
- [x] Endpoint paginado/filtrado do domínio
- [x] Testes com cobertura ≥ 70%
- [x] Prints + PDF anexados
- [x] PR aberto com este README referenciado

## 9. Arquitetura Implementada

### Swagger + Prefixo Global
- ✅ Prefixo `/v1` definido **antes** da configuração do Swagger
- ✅ URLs corretas: `http://localhost:3101/v1/users`
- ✅ Documentação completa com `@ApiQuery`, `@ApiOkResponse`
- ✅ Exemplos e descrições detalhadas

### Containerização
- ✅ **Dockerfile multi-stage**: base (build) + prod (runtime)
- ✅ **docker-compose.yml**: db + app com `depends_on: service_healthy`
- ✅ **Healthcheck**: PostgreSQL com `pg_isready`
- ✅ **Rede dedicada**: `patrimonio_network`
- ✅ **Script start.sh**: migrações + start da aplicação

### Endpoint Paginado
- ✅ **DTOs validados**: `PaginationQueryDto`, `QueryUsersDto`
- ✅ **QueryBuilder**: Filtros combinados com OR/AND
- ✅ **Resposta padronizada**: `{ data, total, meta }`
- ✅ **Filtros do domínio**: busca textual, role, isActive
- ✅ **Ordenação dinâmica**: qualquer campo + direção

### Testes Unitários
- ✅ **Test Doubles**: Dummy, Stub, Spy, Mock, Fake
- ✅ **Padrão AAA**: Arrange, Act, Assert
- ✅ **Cobertura**: 59.87% geral, 84.68% UsersService
- ✅ **Cenários**: happy path, edge cases, validações
- ✅ **Mocks**: Repositório, serviços, dependências


