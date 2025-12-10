Annotations
1 error and 10 warnings
test
failed now in 2m 30s
Search logs
2s
22s
2s
2s
39s
9s
1m 10s
Run npm run test

> patrimonio_inventario@0.0.1 test
> jest

FAIL test/patrimonio/swagger-validation.spec.ts
  ● Test suite failed to run

    src/database/data-source.ts:10:28 - error TS2307: Cannot find module '../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity' or its corresponding type declarations.

    10 import { Patrimonio } from '../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    src/database/data-source.ts:11:48 - error TS2307: Cannot find module '../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity' or its corresponding type declarations.

    11 import { PatrimonioLocalizacaoHistorico } from '../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
                                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PASS src/users/users.service.advanced-methods.spec.ts (9.335 s)
PASS src/users/users.service.advanced.spec.ts (9.375 s)
PASS test/integration/users.integration.spec.ts
PASS src/users/users.service.find.spec.ts
PASS src/users/users.controller.advanced.spec.ts
[Nest] 3258  - 12/10/2025, 2:39:39 AM   ERROR [UsersHttpClient] Erro inesperado ao validar credenciais: Error: Unexpected error, URL: http://users:3000/users/validate
[Nest] 3258  - 12/10/2025, 2:39:39 AM   ERROR [UsersHttpClient] Erro inesperado ao buscar usuário: Error: Unexpected error
PASS test/auth/services/users-http-client.spec.ts
PASS src/users/users.service.create.spec.ts
PASS src/common/services/filter.service.spec.ts
PASS test/events/services/events.service.update.spec.ts
PASS src/users/users.service.new-methods.spec.ts
PASS test/patrimonio/services/patrimonio.service.exportToExcel.spec.ts
[Nest] 3265  - 12/10/2025, 2:39:43 AM   ERROR [CacheService] Error getting cache key error-key:
[Nest] 3265  - 12/10/2025, 2:39:43 AM   ERROR [CacheService] Error: Cache error
    at Object.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/common/services/cache.service.spec.ts:71:42)
    at Promise.finally.completed (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:1557:28)
    at new Promise (<anonymous>)
    at callAsyncCircusFn (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:1497:10)
    at _callCircusTest (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:1007:40)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at _runTest (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:947:3)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:849:7
    at _runTestsForDescribeBlock (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:862:11)
    at _runTestsForDescribeBlock (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:857:11)
    at _runTestsForDescribeBlock (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:857:11)
    at run (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:761:3)
    at runAndTransformResultsToJestFormat (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/jestAdapterInit.js:1918:21)
    at jestAdapter (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-circus/build/runner.js:101:19)
    at runTestInternal (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-runner/build/testWorker.js:275:16)
PASS test/events/controllers/events.controller.create.spec.ts
PASS test/users/controllers/users.controller.remove.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findSemResponsavel.spec.ts
PASS test/events/controllers/events.controller.findAll.spec.ts
PASS test/users/controllers/users.controller.findAll.spec.ts
PASS test/users/controllers/users.controller.create.spec.ts
PASS src/app.controller.spec.ts

Summary of all failing tests
FAIL test/patrimonio/swagger-validation.spec.ts
  ● Test suite failed to run

    src/database/data-source.ts:10:28 - error TS2307: Cannot find module '../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity' or its corresponding type declarations.

    10 import { Patrimonio } from '../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';
                                  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    src/database/data-source.ts:11:48 - error TS2307: Cannot find module '../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity' or its corresponding type declarations.

    11 import { PatrimonioLocalizacaoHistorico } from '../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';
                                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Test Suites: 1 failed, 128 passed, 129 total
Tests:       5 skipped, 486 passed, 491 total
Snapshots:   0 total
Time:        68.578 s
Ran all test suites.
Error: Process completed with exit code 1.

---

## SOLUÇÃO APLICADA

### Problema: Erro de caminho de importação após merge dev/main

**Erro:** `Cannot find module '../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity'`

**Causa:** O caminho relativo estava incorreto. O arquivo `data-source.ts` está em `backend/src/database/` e estava usando `../packages/` quando deveria usar `../../packages/` para acessar `backend/packages/`.

**Solução implementada:**

1. **Correção do caminho relativo:**
   - Alterado de `../packages/` para `../../packages/`
   - O caminho correto de `backend/src/database/data-source.ts` para `backend/packages/` requer dois níveis acima (`../../`)

**Arquivo corrigido:** `backend/src/database/data-source.ts`

**Linhas alteradas:**
- Linha 10: `import { Patrimonio } from '../../packages/patrimonio-service/src/patrimonio/entities/patrimonio.entity';`
- Linha 11: `import { PatrimonioLocalizacaoHistorico } from '../../packages/patrimonio-service/src/patrimonio/entities/patrimonio-localizacao-historico.entity';`