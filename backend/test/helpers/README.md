# Helpers para Testes E2E

## 📁 Estrutura

- `auth-helper.ts` - Helper para autenticação (criar usuários, obter tokens)
- `database-helper.ts` - Helper para operações de banco de dados

## 🚀 Uso Rápido

### 1. Configurar Autenticação

```typescript
import { setupTestUsers, TestUserTokens } from '../helpers/auth-helper';
import { UserRole } from '../../src/users/enums/user-role.enum';

describe('ModuleName (e2e)', () => {
  let tokens: TestUserTokens;

  beforeAll(async () => {
    // ... setup app ...
    tokens = await setupTestUsers(httpServer, dataSource, hashService, 'module-name');
  });
});
```

### 2. Usar em Testes

```typescript
import { authenticatedRequest } from '../helpers/auth-helper';

it('deve retornar 200', async () => {
  const response = await authenticatedRequest(
    httpServer,
    'get',
    '/v1/endpoint',
    tokens,
    UserRole.ADMIN, // Role necessária
  ).expect(200);
});
```

## 📚 Documentação Completa

Veja `test/STRATEGY_E2E_TESTING.md` para documentação completa da estratégia.


