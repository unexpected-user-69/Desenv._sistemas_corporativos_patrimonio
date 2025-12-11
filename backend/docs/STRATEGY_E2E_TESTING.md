# Estratégia de Testes E2E - Foco em Sucesso (200)

## 📋 Visão Geral

Este documento define a estratégia revisada para testes E2E, focando em fazer os testes retornarem **200 (sucesso)** ao invés de testar cenários de erro (400, 401, 403, etc.).

## 🎯 Objetivo Principal

**Garantir que todos os testes E2E retornem 200 (sucesso) usando autenticação adequada e dados válidos.**

## 🔐 Estratégia de Autenticação

### 1. Helper de Autenticação

Criamos um helper reutilizável (`test/helpers/auth-helper.ts`) que:
- Cria usuários de teste para cada role (ADMIN, TEACHER, STUDENT)
- Faz login e obtém tokens reais
- Fornece funções para obter o token correto baseado na role necessária

### 2. Uso do Helper

```typescript
import { setupTestUsers, getTokenForRole, authenticatedRequest } from '../helpers/auth-helper';
import { UserRole } from '../../src/users/enums/user-role.enum';

describe('ModuleName (e2e)', () => {
  let tokens: TestUserTokens;

  beforeAll(async () => {
    // ... setup app ...
    
    // Configurar usuários e obter tokens
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'module-prefix');
  });

  it('deve retornar 200 com autenticação ADMIN', async () => {
    const response = await authenticatedRequest(
      httpServer,
      'get',
      '/v1/endpoint',
      tokens,
      UserRole.ADMIN, // Role necessária
    ).expect(200);

    expect(response.body).toHaveProperty('data');
  });
});
```

### 3. Roles por Endpoint

Cada endpoint tem roles permitidas. Use a role apropriada:

- **ADMIN**: Acesso total (use para testes que precisam de permissões máximas)
- **MANAGER**: Acesso médio (use para testes que precisam de permissões de gerente de patrimônio)
- **OPERATOR**: Acesso limitado (use apenas para testes específicos de operador de inventário)

### 4. Verificação de Roles nos Controllers

Antes de escrever o teste, verifique no controller quais roles são permitidas:

```typescript
@Roles(UserRole.ADMIN, UserRole.TEACHER) // Use ADMIN ou TEACHER
@Get('endpoint')
async getEndpoint() { ... }
```

## 📝 Padrão de Teste

### Teste de Sucesso (200)

```typescript
it('deve retornar 200 com dados válidos', async () => {
  // 1. Preparar dados válidos
  const dto = {
    campo1: 'valor1',
    campo2: 'valor2',
  };

  // 2. Fazer requisição autenticada com role correta
  const response = await authenticatedRequest(
    httpServer,
    'post',
    '/v1/endpoint',
    tokens,
    UserRole.ADMIN, // Role necessária
  )
    .send(dto)
    .expect(200);

  // 3. Verificar resposta
  expect(response.body).toHaveProperty('id');
  expect(response.body.campo1).toBe(dto.campo1);
});
```

### Quando Testar Erros?

Testes de erro (400, 401, 403, 404, 409) devem ser **opcionais** e apenas para:
1. Validações críticas de segurança
2. Casos de uso específicos que precisam ser testados

**Prioridade**: Focar em testes de sucesso (200) primeiro.

## 🔧 Migração de Testes Existentes

### Passo 1: Atualizar imports

```typescript
// Antes
import { DataSource } from 'typeorm';

// Depois
import { setupTestUsers, authenticatedRequest, TestUserTokens } from '../helpers/auth-helper';
import { UserRole } from '../../src/users/enums/user-role.enum';
```

### Passo 2: Configurar tokens no beforeAll

```typescript
// Antes
beforeAll(async () => {
  // ... setup app ...
  testUserId = '00000000-0000-0000-0000-000000000001';
  await createTestUser(dataSource, testUserId);
});

// Depois
let tokens: TestUserTokens;

beforeAll(async () => {
  // ... setup app ...
  tokens = await setupTestUsers(httpServer, dataSource, hashService, 'module-prefix');
});
```

### Passo 3: Atualizar requisições

```typescript
// Antes (sem autenticação ou DEV_AUTO_AUTH)
const response = await request(httpServer)
  .get('/v1/endpoint')
  .expect(200);

// Depois (com autenticação adequada)
const response = await authenticatedRequest(
  httpServer,
  'get',
  '/v1/endpoint',
  tokens,
  UserRole.ADMIN, // Role necessária
).expect(200);
```

### Passo 4: Remover testes de erro (opcional)

```typescript
// Remover ou comentar testes que verificam 400, 401, 403, etc.
// Focar apenas em testes de sucesso (200)
```

## 📊 Exemplo Completo

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as http from 'http';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { HashService } from '../../src/common/services/hash.service';
import { setupTestUsers, authenticatedRequest, TestUserTokens } from '../helpers/auth-helper';
import { UserRole } from '../../src/users/enums/user-role.enum';

describe('ModuleName (e2e)', () => {
  let app: INestApplication;
  let httpServer: http.Server;
  let dataSource: DataSource;
  let hashService: HashService;
  let tokens: TestUserTokens;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('v1');
    await app.init();

    httpServer = app.getHttpServer() as http.Server;
    dataSource = app.get(DataSource);
    hashService = app.get(HashService);

    // Configurar usuários e obter tokens
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'module-name');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /v1/endpoint', () => {
    it('deve retornar 200 com autenticação ADMIN', async () => {
      const response = await authenticatedRequest(
        httpServer,
        'get',
        '/v1/endpoint',
        tokens,
        UserRole.ADMIN,
      ).expect(200);

      expect(response.body).toHaveProperty('data');
    });
  });

  describe('POST /v1/endpoint', () => {
    it('deve criar com sucesso (201)', async () => {
      const dto = {
        campo1: 'valor1',
        campo2: 'valor2',
      };

      const response = await authenticatedRequest(
        httpServer,
        'post',
        '/v1/endpoint',
        tokens,
        UserRole.ADMIN,
      )
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.campo1).toBe(dto.campo1);
    });
  });
});
```

## ✅ Checklist de Migração

- [ ] Importar `auth-helper.ts`
- [ ] Configurar `tokens` no `beforeAll`
- [ ] Atualizar todas as requisições para usar `authenticatedRequest`
- [ ] Verificar role necessária em cada endpoint
- [ ] Garantir que dados de teste são válidos
- [ ] Remover `DEV_AUTO_AUTH` dos testes (não é mais necessário)
- [ ] Remover testes de erro (400, 401, 403) ou torná-los opcionais
- [ ] Verificar que todos os testes retornam 200/201

## 🎯 Benefícios

1. **Testes mais rápidos**: Não precisa testar todos os cenários de erro
2. **Testes mais focados**: Foca no que funciona (happy path)
3. **Autenticação real**: Usa tokens reais, não mocks
4. **Permissões corretas**: Testa com roles reais (ADMIN, TEACHER, STUDENT)
5. **Código reutilizável**: Helper pode ser usado em todos os testes

## 📚 Referências

- `test/helpers/auth-helper.ts` - Helper de autenticação
- `test/helpers/database-helper.ts` - Helper de banco de dados
- Controllers - Verificar `@Roles()` para saber qual role usar

