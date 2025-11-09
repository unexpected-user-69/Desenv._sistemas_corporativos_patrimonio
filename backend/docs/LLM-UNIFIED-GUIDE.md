# LLM-UNIFIED-GUIDE.md

## Guia Unificado para Interação Eficiente com LLMs (Copilot Chat)

Este guia foi elaborado a partir de um fluxo real de desenvolvimento, desde o envio de um prompt até a documentação, testes e validação final. Siga estas orientações para obter melhores resultados ao interagir com modelos de linguagem como o GitHub Copilot Chat.

**Projeto**: Sistema de Patrimônio e Inventário  
**Stack**: NestJS, TypeORM, PostgreSQL, React, TypeScript  
**Padrão**: Aurora Platform

---

## 1. Estruture seu Pedido de Forma Clara e Objetiva

- **Seja específico**: Detalhe o que deseja (ex: "Implemente o endpoint PATCH /patrimonio/:id com soft delete").
- **Contextualize**: Informe o contexto do projeto, tecnologias e padrões adotados.
- **Exemplo**: "Estou usando NestJS, TypeORM e quero CRUD completo para patrimonio, incluindo soft delete."

---

## 2. Solicite e Valide por Etapas

- **Divida tarefas grandes em etapas menores**: Peça para implementar, depois testar, depois documentar.
- **Valide cada etapa**: Peça para rodar testes, revisar código, corrigir problemas antes de avançar.
- **Exemplo**: "Implemente o endpoint GET /patrimonio/:id. Agora crie os testes. Rode os testes. Corrija se necessário."

---

## 3. Padrão de Testes (Aurora)

### Localização de Testes

- Todos os testes devem ficar em `test/` na raiz do projeto.
- Separe por domínio/feature: `test/<feature>/controllers` e `test/<feature>/services`.

### Estrutura Recomendada

```
test/
├── auth/
│   ├── controllers/
│   │   ├── auth.controller.login.spec.ts
│   │   ├── auth.controller.refresh.spec.ts
│   │   └── ...
│   └── services/
│       ├── auth.service.login.spec.ts
│       └── ...
├── users/
│   ├── controllers/
│   └── services/
├── patrimonio/
│   ├── controllers/
│   └── services/
├── common/
│   ├── guards/
│   ├── interceptors/
│   └── validators/
├── factories/
│   ├── user.factory.ts
│   ├── patrimonio.factory.ts
│   └── auth.factory.ts
└── mocks/
    └── repository.mock.ts
```

### Nome dos Arquivos

- Use `*.spec.ts` e nomes descritivos: `patrimonio.service.create.spec.ts`.
- Para múltiplos casos do mesmo método, prefira sufixos: `users.service.create.spec.ts`, `users.service.remove.spec.ts`.

### Mocks e Fábricas

- Centralize mocks reutilizáveis em `test/mocks/`.
- Use a fábrica `repositoryMockFactory` para mocks de `Repository<T>` (já presente em `test/mocks/repository.mock.ts`).

```typescript
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { getRepositoryToken } from '@nestjs/typeorm';

providers: [
  YourService,
  { provide: getRepositoryToken(YourEntity), useFactory: repositoryMockFactory },
],
```

### Factories de Teste

- Helpers para criar DTOs: `makeCreatePatrimonioDto(overrides?)`
- Helpers para criar entidades: `makePatrimonioEntity(overrides?)`
- Localização: `test/factories/<feature>.factory.ts`
- **IMPORTANTE**: Use UUID (string) para IDs, não Integer!

### Imports de Testes

```typescript
import { PatrimonioService } from '../../../src/patrimonio/patrimonio.service';
import { Patrimonio } from '../../../src/patrimonio/entities/patrimonio.entity';
```

---

## 4. Convenções de Código

### UUID vs Integer

- **TODOS** os IDs devem ser UUID (string)
- **TODAS** as factories devem gerar UUIDs
- **NUNCA** use Integer IDs

### Preferir `??` sobre `||` para defaults

```typescript
// Ruim
return user?.sub || 0;

// Bom
return user?.sub ?? 0;
```

### Tratamento de request.user

```typescript
interface User {
  sub: string; // UUID
}

const user = (request as { user?: User }).user;
return user?.sub ?? '';
```

### Imports e dotenv

- Nunca usar `require('dotenv').config()` em arquivos TypeScript
- Use: `import dotenv from 'dotenv'; dotenv.config();`

---

## 5. Variáveis de Ambiente

### Configuração Necessária

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
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_REFRESH_EXPIRES_IN=7d

# Desenvolvimento
DEV_AUTO_AUTH=false  # Auto-injeta usuário fake quando true

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Segurança
HASH_PEPPER=your-pepper-here
HASH_SALT_ROUNDS=12
```

---

## 6. Endpoints de Autenticação

### POST /v1/auth/login

Autentica um usuário e retorna access token e refresh token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd!"
}
```

**Response (200):**
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

### POST /v1/auth/refresh

Renova o access token usando um refresh token válido.

**Request Body:**
```json
{
  "refreshToken": "refresh-token-string"
}
```

**Response (200):**
```json
{
  "accessToken": "new-access-token",
  "refreshToken": "new-refresh-token"
}
```

### POST /v1/auth/logout

Revoga um refresh token (logout).

**Request Body:**
```json
{
  "refreshToken": "refresh-token-string"
}
```

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### GET /v1/auth/me

Obtém informações do usuário autenticado.

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "role": "STUDENT",
  "isActive": true
}
```

---

## 7. Checklist para PRs

### Antes de Abrir PR

- [ ] Testes adicionados em `test/` com estrutura `controllers/` e `services/`
- [ ] Usado `test/mocks/repository.mock.ts` quando mockando repositórios TypeORM
- [ ] Factories criadas em `test/factories/` usando UUID
- [ ] `npm run lint` rodado sem erros
- [ ] `npm test` — todos os testes unitários passaram
- [ ] Removidos imports não usados
- [ ] Evitado `any` e `as any`
- [ ] Usado `??` para defaults de variáveis de ambiente
- [ ] Documentação atualizada (se necessário)

---

## 8. Estrutura do Projeto

### Backend

```
backend/
├── src/
│   ├── auth/              # Autenticação e autorização
│   ├── users/             # Gerenciamento de usuários
│   ├── patrimonio/        # Gestão de patrimônio
│   ├── categorias/        # Categorias de patrimônio
│   ├── audit/             # Sistema de auditoria
│   ├── common/            # Utilitários compartilhados
│   │   ├── guards/        # Guards de autenticação/autorização
│   │   ├── interceptors/  # Interceptors HTTP
│   │   ├── decorators/    # Decorators customizados
│   │   └── validators/    # Validators customizados
│   └── database/          # Configuração do banco
├── test/                  # Testes (seguir estrutura Aurora)
└── scripts/               # Scripts de setup
```

---

## 9. Padrões de Desenvolvimento

### Services

- Um service por domínio/feature
- Métodos assíncronos tipados
- Tratamento de erros adequado
- Validação de dados

### Controllers

- Um controller por domínio
- Uso de DTOs para validação
- Documentação Swagger
- Guards para autenticação/autorização

### Entities

- UUID como ID primário
- Soft delete quando aplicável
- Timestamps automáticos (createdAt, updatedAt)
- Versionamento para otimistic locking

---

## 10. Comandos Úteis

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run start:dev

# Build
npm run build

# Iniciar em produção
npm run start:prod
```

### Testes

```bash
# Todos os testes
npm test

# Testes com cobertura
npm run test:cov

# Testes E2E
npm run test:e2e

# Testes em modo watch
npm test -- --watch
```

### Qualidade

```bash
# Lint
npm run lint

# Lint com correção automática
npm run lint -- --fix

# Formatação
npm run format
```

### Banco de Dados

```bash
# Rodar migrations
npm run migration:run

# Reverter última migration
npm run migration:revert

# Gerar nova migration
npm run migration:generate -- -n MigrationName
```

---

## 11. URLs e Portas

- **Backend**: http://localhost:3101
- **Swagger**: http://localhost:3101/docs
- **API Base**: http://localhost:3101/v1
- **Database**: localhost:5432

---

## 12. Referências Importantes

- **Padrão Aurora**: `dsc-2025-2-aurora-platform/`
- **Estrutura de Testes**: Seguir padrão Aurora (`test/<feature>/controllers/`, `test/<feature>/services/`)
- **Documentação Swagger**: Acessível em `/docs`
- **Guia de Migração**: Ver `Migration_catalagaçao/03-PLANO_IMPLEMENTACAO.md`

---

## 13. Dicas Finais

- **Interaja de forma iterativa**: Implemente, teste, corrija, documente, valide.
- **Peça explicações e exemplos sempre que necessário**.
- **Use o Copilot Chat como parceiro ativo, não apenas executor**.
- **Sempre use UUID para IDs**.
- **Siga o padrão Aurora** para consistência.

---

**Última Atualização**: 2025-01-27  
**Versão**: 1.0.0

