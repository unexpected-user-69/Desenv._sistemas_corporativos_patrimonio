Run npm run test:e2e
  npm run test:e2e
  shell: /usr/bin/bash -e {0}
  env:
    NODE_ENV: test
    DB_HOST: localhost
    DB_PORT: 5432
    DB_USER: postgres
    DB_PASS: postgres
    DB_NAME: patrimonio_inventario_test
    REDIS_HOST: localhost
    REDIS_PORT: 6379
    REDIS_DB: 0
    JWT_ACCESS_SECRET: test_secret
    JWT_REFRESH_SECRET: test_refresh_secret

> patrimonio_inventario@0.0.1 test:e2e
> jest --config ./test/jest-e2e.json

FAIL test/patrimonio/endpoints-faltantes.e2e-spec.ts (26.747 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Usando USERS_API_URL do .env: http://localhost:3101/v1

      at setupTestUsers (helpers/auth-helper.ts:431:15)

    console.error
      [setupTestUsers] Erro no login ADMIN: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: endpoints-faltantes-admin@example.com

      512 |   } catch (error: any) {
      513 |     // Log adicional para debug
    > 514 |     console.error(`[setupTestUsers] Erro no login ADMIN: ${error.message}`);
          |             ^
      515 |     console.error(`[setupTestUsers] USERS_API_URL atual: ${process.env.USERS_API_URL}`);
      516 |     console.error(`[setupTestUsers] Email do usuário: ${adminUser.email}`);
      517 |     

      at setupTestUsers (helpers/auth-helper.ts:514:13)
      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:45:14)

    console.error
      [setupTestUsers] USERS_API_URL atual: http://localhost:3101/v1


    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: endpoints-faltantes-admin@example.com. Email: endpoints-faltantes-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:45:14)

  ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve incluir localização anterior, nova, data, usuário, observações

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: endpoints-faltantes-admin@example.com. Email: endpoints-faltantes-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:45:14)

  ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve retornar erro 404 para patrimônio não encontrado

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: endpoints-faltantes-admin@example.com. Email: endpoints-faltantes-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:45:14)

  ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve retornar histórico vazio para patrimônio sem mudanças de localização

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: endpoints-faltantes-admin@example.com. Email: endpoints-faltantes-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:45:14)
      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:92:14)

  ● Maintenance (e2e) › POST /v1/maintenance/apontamentos › deve criar apontamento com sucesso (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: maintenance-test-admin@example.com. Email: maintenance-test-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:92:14)

  ● Maintenance (e2e) › POST /v1/maintenance/planos › deve criar um plano preventivo com sucesso (201)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: maintenance-test-admin@example.com. Email: maintenance-test-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:92:14)

  ● Maintenance (e2e) › GET /v1/maintenance/sla/metrics › deve retornar métricas de SLA (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: maintenance-test-admin@example.com. Email: maintenance-test-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:92:14)

  ● Maintenance (e2e) › GET /v1/maintenance/sla/metrics › deve filtrar métricas por período (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: maintenance-test-admin@example.com. Email: maintenance-test-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:92:14)

  ● Maintenance (e2e) › GET /v1/maintenance/sla/mttr › deve retornar MTTR (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: maintenance-test-admin@example.com. Email: maintenance-test-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:92:14)

  ● Maintenance (e2e) › GET /v1/maintenance/sla/mttr › deve filtrar MTTR por período (200)

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: maintenance-test-admin@example.com. Email: maintenance-test-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:92:14)
      at Object.<anonymous> (cache/cache.e2e-spec.ts:76:14)

  ● Cache (e2e) › GET /v1/cache/key/:key › deve retornar valor da chave (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: cache-admin@example.com. Email: cache-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (cache/cache.e2e-spec.ts:76:14)

  ● Cache (e2e) › DELETE /v1/cache/key/:key › deve remover chave do cache (200) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: cache-admin@example.com. Email: cache-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (cache/cache.e2e-spec.ts:76:14)

  ● Cache (e2e) › POST /v1/cache/clear › deve limpar cache (200/201) - ADMIN

    Failed to login ADMIN user: Login failed after 3 attempts: Expected 200 or 201, got 401. Body: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401}. Email: cache-admin@example.com. Email: cache-admin@example.com

      527 |     }
      528 |     
    > 529 |     throw new Error(`Failed to login ADMIN user: ${error.message}. Email: ${adminUser.email}`);
          |           ^
      530 |   }
      531 |
      532 |   // Criar usuário MANAGER (Gerente de Patrimônio)

      at setupTestUsers (helpers/auth-helper.ts:529:11)
      at Object.<anonymous> (cache/cache.e2e-spec.ts:76:14)


Test Suites: 18 failed, 3 passed, 21 total
Tests:       436 failed, 18 passed, 454 total
Snapshots:   0 total
Time:        84.151 s
Ran all test suites.
Error: Process completed with exit code 1.

---

## Erro: Invalid credentials (401) em testes e2e

**Problema:** Os testes e2e estão falhando com erro 401 (Invalid credentials) ao tentar fazer login. O erro indica que as credenciais estão incorretas, mesmo após criar os usuários no banco de dados.

**Causa raiz:** 
- O `AuthService` usa `UsersHttpClient` para validar credenciais via HTTP.
- Em testes e2e com supertest, o app não estava escutando em uma porta TCP real, então o `UsersHttpClient` fazia chamadas HTTP para uma porta inexistente e recebia 401/null.
- O `USERS_API_URL` ficava preso no fallback (localhost:3101) sem servidor ouvindo.

**Correções aplicadas (necessárias para o PR ser aceito):**

1. **`app-init.helper.ts`**: agora chama `app.listen(0)` após `app.init()` e propaga a porta detectada (`PORT/BACKEND_PORT/APP_PORT`). Assim o `UsersHttpClient` consegue alcançar `/users/validate` e o login deixa de retornar 401 nos testes.
2. **Ajustes anteriores mantidos**:
   - `auth-helper.ts`: timeouts maiores, re-tentativas e logs ao criar/logar usuários de teste.
   - `setupTestApp` mantém CORS, prefixo `v1` e espera adicional para rotas.
   - Specs e2e principais usam `setupTestApp`.

**Arquivos modificados nesta correção:**
- `backend/test/helpers/app-init.helper.ts`
- `erros testes.md` (esta descrição)

**Como validar localmente:**
- Rode `npm run test:e2e` com `.env` de teste carregado. O helper detectará a porta efêmera e atualizará `USERS_API_URL` automaticamente.
- Se ainda ver 401, confira logs do `setupTestUsers` para ver a porta configurada e certifique-se de que o banco de teste está limpo/consistente.
