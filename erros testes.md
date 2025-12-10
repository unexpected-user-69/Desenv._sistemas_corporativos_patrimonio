1m 22s
Run npm run test

> patrimonio_inventario@0.0.1 test
> jest

PASS src/users/users.service.advanced-methods.spec.ts (8.772 s)
PASS src/users/users.service.advanced.spec.ts (9.021 s)
PASS src/users/users.service.find.spec.ts
PASS src/users/users.controller.advanced.spec.ts
[Nest] 3075  - 12/10/2025, 2:00:29 AM   ERROR [UsersHttpClient] Erro inesperado ao validar credenciais: Error: Unexpected error, URL: http://users:3000/users/validate
[Nest] 3075  - 12/10/2025, 2:00:29 AM   ERROR [UsersHttpClient] Erro inesperado ao buscar usuário: Error: Unexpected error
PASS test/auth/services/users-http-client.spec.ts
PASS src/users/users.service.create.spec.ts
PASS src/common/services/filter.service.spec.ts
PASS src/users/users.service.new-methods.spec.ts
PASS test/events/services/events.service.update.spec.ts
PASS test/events/services/events.service.create.spec.ts
[Nest] 3076  - 12/10/2025, 2:00:34 AM   ERROR [CacheService] Error getting cache key error-key:
[Nest] 3076  - 12/10/2025, 2:00:34 AM   ERROR [CacheService] Error: Cache error
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

Test Suites: 3 failed, 126 passed, 129 total
Tests:       35 failed, 5 skipped, 483 passed, 523 total
Snapshots:   0 total
Time:        81.135 s
Ran all test suites.
Error: Process completed with exit code 1.
