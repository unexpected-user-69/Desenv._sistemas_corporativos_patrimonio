Run npm run test

> patrimonio_inventario@0.0.1 pretest
> node scripts/prepare-ci.js

🚀 Preparando arquivos de imagem dummy para testes E2E...
ℹ️  Arquivo já existe: foto_para_teste.jpg
ℹ️  Arquivo já existe: foto_para_teste.png
ℹ️  Arquivo já existe: foto_para_teste.webp
🎉 Preparação de arquivos dummy concluída!
📁 Arquivos criados em: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test-temp
ℹ️  Banco já existe: patrimonio_inventario_test

> patrimonio_inventario@0.0.1 test
> jest

PASS src/users/users.service.advanced-methods.spec.ts (9.14 s)
PASS src/users/users.service.advanced.spec.ts (9.366 s)
PASS src/users/users.controller.advanced.spec.ts (10.058 s)
PASS src/users/users.service.find.spec.ts
[Nest] 3088  - 12/11/2025, 3:26:53 AM   ERROR [UsersHttpClient] Erro inesperado ao validar credenciais: Error: Unexpected error, URL: http://users:3000/users/validate
[Nest] 3088  - 12/11/2025, 3:26:53 AM   ERROR [UsersHttpClient] Erro inesperado ao buscar usuário: Error: Unexpected error
PASS test/auth/services/users-http-client.spec.ts
PASS src/users/users.service.create.spec.ts
PASS src/common/services/filter.service.spec.ts
PASS src/users/users.service.new-methods.spec.ts
PASS test/patrimonio/services/patrimonio.service.transferResponsavel.spec.ts
PASS test/patrimonio/services/patrimonio.service.exportToExcel.spec.ts
[Nest] 3095  - 12/11/2025, 3:26:56 AM   ERROR [CacheService] Error getting cache key error-key:
[Nest] 3095  - 12/11/2025, 3:26:56 AM   ERROR [CacheService] Error: Cache error
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
    at runTest (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-runner/build/testWorker.js:343:7)
    at Object.worker (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/jest-runner/build/testWorker.js:497:12)
      66 |
    > 67 |     expect(result).toBe(false);
         |                    ^
      68 |   });
      69 |
      70 |   it('should deny access when user is not authenticated', () => {

      at Object.<anonymous> (test/common/guards/roles.guard.spec.ts:67:20)

  ● RolesGuard (unit) › should deny access when user is not authenticated

    expect(received).toBe(expected) // Object.is equality

    Expected: false
    Received: true

      74 |     const result = guard.canActivate(context);
      75 |
    > 76 |     expect(result).toBe(false);
         |                    ^
      77 |   });
      78 |
      79 |   it('should deny access when user has no roles', () => {

      at Object.<anonymous> (test/common/guards/roles.guard.spec.ts:76:20)

  ● RolesGuard (unit) › should deny access when user has no roles

    expect(received).toBe(expected) // Object.is equality

    Expected: false
    Received: true

      83 |     const result = guard.canActivate(context);
      84 |
    > 85 |     expect(result).toBe(false);
         |                    ^
      86 |   });
      87 |
      88 |   it('should allow access when user has one of multiple required roles', () => {

      at Object.<anonymous> (test/common/guards/roles.guard.spec.ts:85:20)


Test Suites: 1 failed, 59 passed, 60 total
Tests:       3 failed, 4 skipped, 303 passed, 310 total
Snapshots:   0 total
Time:        33.546 s
Ran all test suites.
Error: Process completed with exit code 1.