3m 37s
Run npm run test:e2e

> patrimonio_inventario@0.0.1 pretest:e2e
> node scripts/prepare-ci.js

🚀 Preparando arquivos de imagem dummy para testes E2E...
ℹ️  Arquivo já existe: foto_para_teste.jpg
ℹ️  Arquivo já existe: foto_para_teste.png
ℹ️  Arquivo já existe: foto_para_teste.webp
🎉 Preparação de arquivos dummy concluída!
📁 Arquivos criados em: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test-temp
ℹ️  Banco já existe: patrimonio_inventario_test

> patrimonio_inventario@0.0.1 test:e2e
> jest --config ./test/jest-e2e.json

[Nest] 3470  - 12/11/2025, 2:11:08 PM   ERROR [ExceptionsHandler] QueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at MaintenanceService.createWorkOrder (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/maintenance/maintenance.service.ts:77:19) {
  query: 'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"',
  parameters: [
    '13f8d055-e59e-48da-bea6-d8455900c559',
    'aberta',
    'Manutenção preventiva do ar condicionado',
    'Limpeza e verificação do sistema de ar condicionado',
    'media',
    2025-12-11T14:11:08.420Z,
    '00000000-0000-0000-0000-000000000001'
  ],
  driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

Test Suites: 6 failed, 11 passed, 17 total
Tests:       62 failed, 268 passed, 330 total
Snapshots:   0 total
Time:        217.351 s
Ran all test suites.
Error: Process completed with exit code 1.



2025-12-11T14:09:52.8157315Z 🚀 Preparando arquivos de imagem dummy para testes E2E...
2025-12-11T14:09:52.8163345Z ℹ️  Arquivo já existe: foto_para_teste.jpg
2025-12-11T14:09:52.8164119Z ℹ️  Arquivo já existe: foto_para_teste.png
2025-12-11T14:09:52.8164846Z ℹ️  Arquivo já existe: foto_para_teste.webp
2025-12-11T14:09:52.8165587Z 🎉 Preparação de arquivos dummy concluída!
2025-12-11T14:09:52.8167224Z 📁 Arquivos criados em: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test-temp
2025-12-11T14:09:52.8470248Z ℹ️  Banco já existe: patrimonio_inventario_test
2025-12-11T14:09:52.8554312Z 
2025-12-11T14:09:52.8554658Z > patrimonio_inventario@0.0.1 test
2025-12-11T14:09:52.8555133Z > jest
2025-12-11T14:09:52.8555313Z 
2025-12-11T14:10:02.8333754Z PASS src/users/users.service.advanced-methods.spec.ts (8.939 s)
2025-12-11T14:10:03.0491547Z PASS src/users/users.service.advanced.spec.ts (9.084 s)
2025-12-11T14:10:03.7635017Z PASS src/users/users.controller.advanced.spec.ts (9.783 s)
2025-12-11T14:10:04.0349712Z PASS src/users/users.service.find.spec.ts
2025-12-11T14:10:04.2694406Z [31m[Nest] 3149  - [39m12/11/2025, 2:10:04 PM [31m  ERROR[39m [38;5;3m[UsersHttpClient] [39m[31mErro inesperado ao validar credenciais: Error: Unexpected error, URL: http://users:3000/users/validate[39m
2025-12-11T14:10:04.2860388Z [31m[Nest] 3149  - [39m12/11/2025, 2:10:04 PM [31m  ERROR[39m [38;5;3m[UsersHttpClient] [39m[31mErro inesperado ao buscar usuário: Error: Unexpected error[39m
2025-12-11T14:10:04.3002055Z PASS test/auth/services/users-http-client.spec.ts
2025-12-11T14:10:05.0218173Z PASS src/users/users.service.create.spec.ts
2025-12-11T14:10:05.4218491Z PASS src/common/services/filter.service.spec.ts
2025-12-11T14:10:06.7784635Z PASS src/users/users.service.new-methods.spec.ts
2025-12-11T14:10:07.2267967Z PASS test/patrimonio/services/patrimonio.service.exportToExcel.spec.ts
2025-12-11T14:10:07.5052751Z PASS test/patrimonio/services/patrimonio.service.transferResponsavel.spec.ts
2025-12-11T14:10:07.7148516Z [31m[Nest] 3156  - [39m12/11/2025, 2:10:07 PM [31m  ERROR[39m [38;5;3m[CacheService] [39m[31mError getting cache key error-key:[39m
2025-12-11T14:10:07.7457593Z [31m[Nest] 3156  - [39m12/11/2025, 2:10:07 PM [31m  ERROR[39m [38;5;3m[CacheService] [39mError: Cache error
2025-12-11T14:10:07.7459873Z     at Object.<anonymous> [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/common/services/cache.service.spec.ts:71:42[90m)[39m
2025-12-11T14:10:07.7463213Z     at Promise.finally.completed [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1557:28[90m)[39m
2025-12-11T14:10:07.7464889Z     at new Promise (<anonymous>)
2025-12-11T14:10:07.7466887Z     at callAsyncCircusFn [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1497:10[90m)[39m
2025-12-11T14:10:07.7470011Z     at _callCircusTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1007:40[90m)[39m
2025-12-11T14:10:07.7472261Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:10:07.7475178Z     at _runTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:947:3[90m)[39m
2025-12-11T14:10:07.7478178Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:849:7
2025-12-11T14:10:07.7481325Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:862:11[90m)[39m
2025-12-11T14:10:07.7484679Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:857:11[90m)[39m
2025-12-11T14:10:07.7487834Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:857:11[90m)[39m
2025-12-11T14:10:07.7490628Z     at run [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:761:3[90m)[39m
2025-12-11T14:10:07.7493919Z     at runAndTransformResultsToJestFormat [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1918:21[90m)[39m
2025-12-11T14:10:07.7496920Z     at jestAdapter [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/runner.js:101:19[90m)[39m
2025-12-11T14:10:07.7499791Z     at runTestInternal [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:275:16[90m)[39m
2025-12-11T14:10:07.7502731Z     at runTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:343:7[90m)[39m
2025-12-11T14:10:07.7505499Z     at Object.worker [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:497:12[90m)[39m
2025-12-11T14:10:07.7580879Z [31m[Nest] 3156  - [39m12/11/2025, 2:10:07 PM [31m  ERROR[39m [38;5;3m[CacheService] [39m[31mError setting cache key error-key:[39m
2025-12-11T14:10:07.7595364Z [31m[Nest] 3156  - [39m12/11/2025, 2:10:07 PM [31m  ERROR[39m [38;5;3m[CacheService] [39mError: Cache error
2025-12-11T14:10:07.7597514Z     at Object.<anonymous> [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/common/services/cache.service.spec.ts:111:42[90m)[39m
2025-12-11T14:10:07.7600522Z     at Promise.finally.completed [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1557:28[90m)[39m
2025-12-11T14:10:07.7602337Z     at new Promise (<anonymous>)
2025-12-11T14:10:07.7604299Z     at callAsyncCircusFn [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1497:10[90m)[39m
2025-12-11T14:10:07.7607238Z     at _callCircusTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1007:40[90m)[39m
2025-12-11T14:10:07.7609219Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:10:07.7612107Z     at _runTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:947:3[90m)[39m
2025-12-11T14:10:07.7614847Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:849:7
2025-12-11T14:10:07.7617726Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:862:11[90m)[39m
2025-12-11T14:10:07.7620843Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:857:11[90m)[39m
2025-12-11T14:10:07.7688496Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:857:11[90m)[39m
2025-12-11T14:10:07.7692990Z     at run [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:761:3[90m)[39m
2025-12-11T14:10:07.7695970Z     at runAndTransformResultsToJestFormat [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1918:21[90m)[39m
2025-12-11T14:10:07.7698930Z     at jestAdapter [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/runner.js:101:19[90m)[39m
2025-12-11T14:10:07.7701955Z     at runTestInternal [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:275:16[90m)[39m
2025-12-11T14:10:07.7704788Z     at runTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:343:7[90m)[39m
2025-12-11T14:10:07.7707497Z     at Object.worker [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:497:12[90m)[39m
2025-12-11T14:10:07.7774748Z [31m[Nest] 3156  - [39m12/11/2025, 2:10:07 PM [31m  ERROR[39m [38;5;3m[CacheService] [39m[31mError deleting cache key error-key:[39m
2025-12-11T14:10:07.7783962Z [31m[Nest] 3156  - [39m12/11/2025, 2:10:07 PM [31m  ERROR[39m [38;5;3m[CacheService] [39mError: Cache error
2025-12-11T14:10:07.7786594Z     at Object.<anonymous> [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/common/services/cache.service.spec.ts:133:42[90m)[39m
2025-12-11T14:10:07.7789944Z     at Promise.finally.completed [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1557:28[90m)[39m
2025-12-11T14:10:07.7792105Z     at new Promise (<anonymous>)
2025-12-11T14:10:07.7794415Z     at callAsyncCircusFn [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1497:10[90m)[39m
2025-12-11T14:10:07.7798428Z     at _callCircusTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1007:40[90m)[39m
2025-12-11T14:10:07.7800869Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:10:07.7803515Z     at _runTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:947:3[90m)[39m
2025-12-11T14:10:07.7806314Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:849:7
2025-12-11T14:10:07.7809264Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:862:11[90m)[39m
2025-12-11T14:10:07.7812635Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:857:11[90m)[39m
2025-12-11T14:10:07.7815832Z     at _runTestsForDescribeBlock [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:857:11[90m)[39m
2025-12-11T14:10:07.7818747Z     at run [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:761:3[90m)[39m
2025-12-11T14:10:07.7822019Z     at runAndTransformResultsToJestFormat [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/jestAdapterInit.js:1918:21[90m)[39m
2025-12-11T14:10:07.7825180Z     at jestAdapter [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-circus[24m/build/runner.js:101:19[90m)[39m
2025-12-11T14:10:07.7828101Z     at runTestInternal [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:275:16[90m)[39m
2025-12-11T14:10:07.7830940Z     at runTest [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:343:7[90m)[39m
2025-12-11T14:10:07.7833966Z     at Object.worker [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mjest-runner[24m/build/testWorker.js:497:12[90m)[39m
2025-12-11T14:10:07.8193624Z PASS src/common/services/cache.service.spec.ts
2025-12-11T14:10:08.6049250Z PASS test/patrimonio/services/patrimonio.service.createBulkWithTransaction.spec.ts
2025-12-11T14:10:08.8231668Z PASS test/patrimonio/services/patrimonio.service.transferResponsavelBulk.spec.ts
2025-12-11T14:10:09.5096575Z PASS src/common/services/normalization.service.spec.ts
2025-12-11T14:10:09.5116161Z PASS test/patrimonio/services/patrimonio.service.updateStatus.spec.ts
2025-12-11T14:10:09.6197753Z PASS src/common/services/hash.service.spec.ts
2025-12-11T14:10:10.7621918Z PASS test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts
2025-12-11T14:10:10.8560612Z PASS test/patrimonio/services/patrimonio.service.getDashboard.spec.ts
2025-12-11T14:10:10.8966575Z PASS test/patrimonio/services/patrimonio.service.desativar.spec.ts
2025-12-11T14:10:11.9833837Z PASS test/patrimonio/services/patrimonio.service.updateLocalizacao.spec.ts
2025-12-11T14:10:12.0395951Z PASS test/patrimonio/services/patrimonio.service.updateBulk.spec.ts
2025-12-11T14:10:12.1987966Z PASS test/patrimonio/services/patrimonio.service.ativar.spec.ts
2025-12-11T14:10:13.0687933Z PASS test/patrimonio/services/patrimonio.service.verificarDuplicidade.spec.ts
2025-12-11T14:10:13.2124131Z PASS test/patrimonio/services/patrimonio.service.findByValorRange.spec.ts
2025-12-11T14:10:13.3965597Z PASS test/patrimonio/services/patrimonio.service.findAllWithFilters.spec.ts
2025-12-11T14:10:14.2182306Z PASS test/patrimonio/services/patrimonio.service.update.spec.ts
2025-12-11T14:10:14.4281093Z PASS test/patrimonio/services/patrimonio.service.findManutencaoProlongada.spec.ts
2025-12-11T14:10:14.4559282Z PASS test/patrimonio/services/patrimonio.service.getHistoricoPorResponsavel.spec.ts
2025-12-11T14:10:15.6110794Z PASS test/patrimonio/services/patrimonio.service.findByAquisicaoPeriodo.spec.ts
2025-12-11T14:10:15.8347077Z PASS test/patrimonio/services/patrimonio.service.create.spec.ts
2025-12-11T14:10:16.1469773Z PASS test/patrimonio/services/patrimonio.service.getStatsLocalizacoes.spec.ts
2025-12-11T14:10:17.3107511Z PASS test/auth/strategies/jwt.strategy.spec.ts
2025-12-11T14:10:17.4277093Z PASS test/patrimonio/services/patrimonio.service.getStatsEvolucao.spec.ts
2025-12-11T14:10:17.5336408Z PASS test/patrimonio/services/patrimonio.service.getHistoricoResponsaveis.spec.ts
2025-12-11T14:10:18.4111339Z PASS test/common/guards/jwt-auth.guard.spec.ts
2025-12-11T14:10:18.5483870Z PASS test/patrimonio/services/patrimonio.service.getStatsFaixaValor.spec.ts
2025-12-11T14:10:18.6159386Z PASS test/patrimonio/services/patrimonio.service.getStatsAquisicao.spec.ts
2025-12-11T14:10:19.5750478Z PASS test/patrimonio/services/patrimonio.service.gerarRelatorioInventario.spec.ts
2025-12-11T14:10:19.6770559Z PASS test/patrimonio/services/patrimonio.service.getHistorico.spec.ts
2025-12-11T14:10:19.8863985Z PASS test/patrimonio/services/patrimonio.service.findByStatusMultiplos.spec.ts
2025-12-11T14:10:20.7114816Z PASS test/patrimonio/services/patrimonio.service.findByCategoriasMultiplas.spec.ts
2025-12-11T14:10:20.8081486Z PASS test/patrimonio/services/patrimonio.service.findGarantiaExpirada.spec.ts
2025-12-11T14:10:20.9650703Z PASS test/patrimonio/services/patrimonio.service.findByNumeroSerie.spec.ts
2025-12-11T14:10:21.7896499Z PASS test/patrimonio/services/patrimonio.service.findOne.spec.ts
2025-12-11T14:10:21.9337170Z PASS test/patrimonio/services/patrimonio.service.validarCodigo.spec.ts
2025-12-11T14:10:22.1103748Z PASS test/patrimonio/services/patrimonio.service.findGarantiaVencendo.spec.ts
2025-12-11T14:10:22.9409761Z PASS test/patrimonio/services/patrimonio.service.remove.spec.ts
2025-12-11T14:10:22.9617720Z PASS test/patrimonio/services/patrimonio.service.findByLocalizacao.spec.ts
2025-12-11T14:10:23.4070640Z PASS test/patrimonio/services/patrimonio.service.findSemResponsavel.spec.ts
2025-12-11T14:10:23.4844397Z PASS test/common/interceptors/logging.interceptor.spec.ts
2025-12-11T14:10:23.6088248Z PASS test/common/guards/roles.guard.spec.ts
2025-12-11T14:10:24.5392101Z PASS src/users/users.service.spec.ts
2025-12-11T14:10:24.8101002Z PASS test/common/interceptors/timeout.interceptor.spec.ts
2025-12-11T14:10:24.8707505Z PASS src/users/users.controller.spec.ts
2025-12-11T14:10:25.2734294Z PASS test/common/validators/is-strong-password.validator.spec.ts
2025-12-11T14:10:25.4129832Z PASS test/common/validators/is-trimmed.validator.spec.ts
2025-12-11T14:10:25.5673452Z PASS test/common/guards/jwt-auth.guard.public.spec.ts
2025-12-11T14:10:26.0613109Z PASS test/common/interceptors/transform-response.interceptor.spec.ts
2025-12-11T14:10:26.1290897Z PASS test/common/decorators/owner-id.decorator.spec.ts
2025-12-11T14:10:26.3154623Z PASS src/app.controller.spec.ts
2025-12-11T14:10:26.4943123Z 
2025-12-11T14:10:26.4946467Z Test Suites: 60 passed, 60 total
2025-12-11T14:10:26.4947002Z Tests:       4 skipped, 306 passed, 310 total
2025-12-11T14:10:26.4947335Z Snapshots:   0 total
2025-12-11T14:10:26.4947563Z Time:        33.155 s
2025-12-11T14:10:26.4947791Z Ran all test suites.
2025-12-11T14:10:26.5124874Z ##[group]Run cp .env.example .env || true
2025-12-11T14:10:26.5125227Z [36;1mcp .env.example .env || true[0m
2025-12-11T14:10:26.5125479Z [36;1mecho "NODE_ENV=test" >> .env[0m
2025-12-11T14:10:26.5125723Z [36;1mecho "DB_HOST=localhost" >> .env[0m
2025-12-11T14:10:26.5126181Z [36;1mecho "DB_PORT=5432" >> .env[0m
2025-12-11T14:10:26.5126424Z [36;1mecho "DB_USER=postgres" >> .env[0m
2025-12-11T14:10:26.5126668Z [36;1mecho "DB_PASS=postgres" >> .env[0m
2025-12-11T14:10:26.5126965Z [36;1mecho "DB_NAME=patrimonio_inventario_test" >> .env[0m
2025-12-11T14:10:26.5127265Z [36;1mecho "REDIS_HOST=localhost" >> .env[0m
2025-12-11T14:10:26.5127516Z [36;1mecho "REDIS_PORT=6379" >> .env[0m
2025-12-11T14:10:26.5127746Z [36;1mecho "REDIS_DB=0" >> .env[0m
2025-12-11T14:10:26.5128003Z [36;1mecho "JWT_ACCESS_SECRET=test_secret" >> .env[0m
2025-12-11T14:10:26.5128328Z [36;1mecho "JWT_REFRESH_SECRET=test_refresh_secret" >> .env[0m
2025-12-11T14:10:26.5160958Z shell: /usr/bin/bash -e {0}
2025-12-11T14:10:26.5161187Z ##[endgroup]
2025-12-11T14:10:26.5228355Z cp: cannot stat '.env.example': No such file or directory
2025-12-11T14:10:26.5265089Z ##[group]Run npm run migration:run
2025-12-11T14:10:26.5265376Z [36;1mnpm run migration:run[0m
2025-12-11T14:10:26.5294730Z shell: /usr/bin/bash -e {0}
2025-12-11T14:10:26.5294952Z env:
2025-12-11T14:10:26.5295113Z   DB_HOST: localhost
2025-12-11T14:10:26.5295306Z   DB_PORT: 5432
2025-12-11T14:10:26.5295478Z   DB_USER: postgres
2025-12-11T14:10:26.5295664Z   DB_PASS: postgres
2025-12-11T14:10:26.5295854Z   DB_NAME: patrimonio_inventario_test
2025-12-11T14:10:26.5296097Z ##[endgroup]
2025-12-11T14:10:26.6343254Z 
2025-12-11T14:10:26.6343926Z > patrimonio_inventario@0.0.1 migration:run
2025-12-11T14:10:26.6344641Z > npm run typeorm -- migration:run
2025-12-11T14:10:26.6344953Z 
2025-12-11T14:10:26.7393510Z 
2025-12-11T14:10:26.7393869Z > patrimonio_inventario@0.0.1 typeorm
2025-12-11T14:10:26.7395058Z > node --require ts-node/register --require tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/database/data-source.ts migration:run
2025-12-11T14:10:26.7395687Z 
2025-12-11T14:10:29.0879599Z [dotenv@17.2.3] injecting env (15) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
2025-12-11T14:10:29.1457576Z [90m[4mquery:[24m[39m [94mSELECT[0m [95mversion[0m[37m([0m[37m)[0m
2025-12-11T14:10:29.1477330Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:34.9379042Z [90m[4mquery:[24m[39m [94mCREATE[0m [37mEXTENSION[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"uuid-ossp"[0m
2025-12-11T14:10:34.9424815Z [90m[4mquery:[24m[39m [94mCREATE[0m [37mEXTENSION[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"citext"[0m
2025-12-11T14:10:34.9625875Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'migrations'[0m
2025-12-11T14:10:34.9692364Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"migrations"[0m [37m([0m[37m"id"[0m [37mSERIAL[0m [94mNOT NULL[0m[37m,[0m [37m"timestamp"[0m [37mbigint[0m [94mNOT NULL[0m[37m,[0m [37m"name"[0m [37mcharacter[0m [37mvarying[0m [94mNOT NULL[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_8c82d7f526340ab734260ea46be"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:34.9819911Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"migrations"[0m [37m"migrations"[0m [94mORDER BY[0m [37m"id"[0m [94mDESC[0m
2025-12-11T14:10:34.9835459Z [4m0 migrations are already loaded in the database.[24m
2025-12-11T14:10:34.9836261Z [4m37 migrations were found in the source code.[24m
2025-12-11T14:10:34.9837255Z [4m37 migrations are new migrations must be executed.[24m
2025-12-11T14:10:34.9840257Z [90m[4mquery:[24m[39m [37mSTART[0m [37mTRANSACTION[0m
2025-12-11T14:10:34.9846978Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:34.9847813Z       [94mCREATE[0m [37mEXTENSION[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37mcitext[0m[37m;[0m
2025-12-11T14:10:34.9848933Z       [94mCREATE TABLE[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [95musers[0m [37m([0m
2025-12-11T14:10:34.9850623Z         [37mid[0m [37muuid[0m [94mPRIMARY KEY[0m [94mDEFAULT[0m [95mgen_random_uuid[0m[37m([0m[37m)[0m[37m,[0m
2025-12-11T14:10:34.9852218Z         [37mname[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m
2025-12-11T14:10:34.9853238Z         [37memail[0m [37mcitext[0m [94mNOT NULL[0m[37m,[0m
2025-12-11T14:10:34.9854515Z         [37mpassword_hash[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m
2025-12-11T14:10:34.9855975Z         [37mrole[0m [94mvarchar[0m[37m([0m[32m32[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'OPERATOR'[0m[37m,[0m
2025-12-11T14:10:34.9857368Z         [37mis_active[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m
2025-12-11T14:10:34.9859138Z         [37mcreated_at[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [95mNOW[0m[37m([0m[37m)[0m[37m,[0m
2025-12-11T14:10:34.9860746Z         [37mupdated_at[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [95mNOW[0m[37m([0m[37m)[0m
2025-12-11T14:10:34.9861655Z       [37m)[0m[37m;[0m
2025-12-11T14:10:34.9863214Z       [94mCREATE UNIQUE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37muq_users_email[0m [94mON[0m [95musers[0m[37m([0m[37memail[0m[37m)[0m[37m;[0m
2025-12-11T14:10:34.9864144Z     
2025-12-11T14:10:34.9926653Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1758646964161,"UsersInit1758646964161"][0m
2025-12-11T14:10:34.9939901Z [4mMigration UsersInit1758646964161 has been executed successfully.[24m
2025-12-11T14:10:34.9945492Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m
2025-12-11T14:10:34.9976795Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"patrimonios"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"codigo"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"nome"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"descricao"[0m [94mtext[0m[37m,[0m [37m"categoria"[0m [94mvarchar[0m[37m([0m[32m32[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'EQUIPAMENTO'[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m32[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'ATIVO'[0m[37m,[0m [37m"marca"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m[37m,[0m [37m"modelo"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m[37m,[0m [37m"numero_serie"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m[37m,[0m [37m"valor_aquisicao"[0m [94mdecimal[0m[37m([0m[32m10[0m[37m,[0m[32m2[0m[37m)[0m[37m,[0m [37m"data_aquisicao"[0m [37mdate[0m[37m,[0m [37m"data_garantia"[0m [37mdate[0m[37m,[0m [37m"localizacao"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m[37m,[0m [37m"responsavel_id"[0m [37muuid[0m[37m,[0m [37m"observacoes"[0m [94mtext[0m[37m,[0m [37m"foto_url"[0m [94mvarchar[0m[37m([0m[32m500[0m[37m)[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"deleted_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"version"[0m [37mint[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m1[0m[37m,[0m [94mCONSTRAINT[0m [37m"UQ_5d6293dff3eeaeb662317ee9389"[0m [94mUNIQUE[0m [37m([0m[37m"codigo"[0m[37m)[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_87b394890aa11c2f6595597965c"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0028965Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"uq_patrimonios_codigo"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"codigo"[0m[37m)[0m
2025-12-11T14:10:35.0042064Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_patrimonios_categoria"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"categoria"[0m[37m)[0m
2025-12-11T14:10:35.0054685Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_patrimonios_status"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"status"[0m[37m)[0m
2025-12-11T14:10:35.0068763Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_patrimonios_responsavel"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"responsavel_id"[0m[37m)[0m
2025-12-11T14:10:35.0081100Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0081708Z       [94mALTER TABLE[0m [37mpatrimonios[0m 
2025-12-11T14:10:35.0082444Z       [94mADD CONSTRAINT[0m [37mchk_patrimonios_categoria[0m 
2025-12-11T14:10:35.0083602Z       [94mCHECK[0m [37m([0m[37mcategoria[0m [94mIN[0m [37m([0m[37m'EQUIPAMENTO'[0m[37m,[0m [37m'MOBILIARIO'[0m[37m,[0m [37m'VEICULO'[0m[37m,[0m [37m'IMOVEL'[0m[37m,[0m [37m'SOFTWARE'[0m[37m,[0m [37m'OUTROS'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0084253Z     
2025-12-11T14:10:35.0095833Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0096375Z       [94mALTER TABLE[0m [37mpatrimonios[0m 
2025-12-11T14:10:35.0097030Z       [94mADD CONSTRAINT[0m [37mchk_patrimonios_status[0m 
2025-12-11T14:10:35.0098001Z       [94mCHECK[0m [37m([0m[37mstatus[0m [94mIN[0m [37m([0m[37m'ATIVO'[0m[37m,[0m [37m'INATIVO'[0m[37m,[0m [37m'MANUTENCAO'[0m[37m,[0m [37m'DESCARTADO'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0098522Z     
2025-12-11T14:10:35.0103269Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0103673Z       [94mALTER TABLE[0m [37mpatrimonios[0m 
2025-12-11T14:10:35.0104136Z       [94mADD CONSTRAINT[0m [37mchk_patrimonios_valor_aquisicao[0m 
2025-12-11T14:10:35.0104778Z       [94mCHECK[0m [37m([0m[37mvalor_aquisicao[0m [37m>=[0m [32m0[0m[37m)[0m
2025-12-11T14:10:35.0105167Z     
2025-12-11T14:10:35.0120650Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1758646964162,"CreatePatrimoniosTable1758646964162"][0m
2025-12-11T14:10:35.0124736Z [4mMigration CreatePatrimoniosTable1758646964162 has been executed successfully.[24m
2025-12-11T14:10:35.0125641Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0126148Z       [94mALTER TABLE[0m [37musers[0m 
2025-12-11T14:10:35.0127367Z       [94mADD[0m [94mCOLUMN[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37mavatar_url[0m [94mvarchar[0m[37m([0m[32m500[0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.0128878Z       [94mADD[0m [94mCOLUMN[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37mdeleted_at[0m [37mtimestamptz[0m[37m,[0m
2025-12-11T14:10:35.0130400Z       [94mADD[0m [94mCOLUMN[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37mversion[0m [37mint[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m1[0m
2025-12-11T14:10:35.0131227Z     
2025-12-11T14:10:35.0139787Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1758646964162,"AddUserAuditFields1758646964162"][0m
2025-12-11T14:10:35.0143379Z [4mMigration AddUserAuditFields1758646964162 has been executed successfully.[24m
2025-12-11T14:10:35.0145450Z [90m[4mquery:[24m[39m [94mCREATE[0m [37mEXTENSION[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"citext"[0m
2025-12-11T14:10:35.0149013Z ✅ Extensão CITEXT ativada com sucesso
2025-12-11T14:10:35.0152829Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1758646964163,"EnableCitextExtension1758646964163"][0m
2025-12-11T14:10:35.0156087Z [4mMigration EnableCitextExtension1758646964163 has been executed successfully.[24m
2025-12-11T14:10:35.0157288Z [90m[4mquery:[24m[39m [94mDROP INDEX[0m [94mIF[0m [94mEXISTS[0m [37m"uq_users_email"[0m
2025-12-11T14:10:35.0170034Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0170600Z       [94mALTER TABLE[0m [37m"users"[0m 
2025-12-11T14:10:35.0173096Z       [94mALTER COLUMN[0m [37m"email"[0m [37mTYPE[0m [37mcitext[0m
2025-12-11T14:10:35.0173653Z     
2025-12-11T14:10:35.0177507Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0178545Z       [94mCREATE UNIQUE INDEX[0m [37m"uq_users_email"[0m [94mON[0m [37m"users"[0m [37m([0m[37m"email"[0m[37m)[0m
2025-12-11T14:10:35.0179066Z     
2025-12-11T14:10:35.0192773Z ✅ Coluna email migrada para CITEXT com sucesso
2025-12-11T14:10:35.0197105Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1758646964164,"MigrateEmailToCitext1758646964164"][0m
2025-12-11T14:10:35.0200543Z [4mMigration MigrateEmailToCitext1758646964164 has been executed successfully.[24m
2025-12-11T14:10:35.0205877Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m
2025-12-11T14:10:35.0220224Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"uq_patrimonios_codigo"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"codigo"[0m[37m)[0m
2025-12-11T14:10:35.0224768Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_categoria"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"categoria"[0m[37m)[0m
2025-12-11T14:10:35.0228736Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_status"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"status"[0m[37m)[0m
2025-12-11T14:10:35.0234394Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_responsavel"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"responsavel_id"[0m[37m)[0m
2025-12-11T14:10:35.0239408Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_nome"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"nome"[0m[37m)[0m
2025-12-11T14:10:35.0252987Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_marca"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"marca"[0m[37m)[0m
2025-12-11T14:10:35.0266148Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_modelo"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"modelo"[0m[37m)[0m
2025-12-11T14:10:35.0283970Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_localizacao"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"localizacao"[0m[37m)[0m
2025-12-11T14:10:35.0296632Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_data_aquisicao"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"data_aquisicao"[0m[37m)[0m
2025-12-11T14:10:35.0312309Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m"idx_patrimonios_valor_aquisicao"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"valor_aquisicao"[0m[37m)[0m
2025-12-11T14:10:35.0325362Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0325998Z       [94mALTER TABLE[0m [37m"patrimonios"[0m 
2025-12-11T14:10:35.0326832Z       [94mADD CONSTRAINT[0m [37m"fk_patrimonios_responsavel"[0m 
2025-12-11T14:10:35.0327730Z       [94mFOREIGN KEY[0m [37m([0m[37m"responsavel_id"[0m[37m)[0m 
2025-12-11T14:10:35.0328642Z       [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m 
2025-12-11T14:10:35.0329453Z       [94mON[0m [94mDELETE[0m [94mSET[0m [94mNULL[0m 
2025-12-11T14:10:35.0330129Z       [94mON[0m [94mUPDATE[0m [94mCASCADE[0m
2025-12-11T14:10:35.0330557Z     
2025-12-11T14:10:35.0355576Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0356197Z       [37mDO[0m [37m$[0m[37m$[0m
2025-12-11T14:10:35.0356721Z       [94mBEGIN[0m
2025-12-11T14:10:35.0357287Z         [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m([0m
2025-12-11T14:10:35.0358505Z           [94mSELECT[0m [32m1[0m [94mFROM[0m [37mpg_constraint[0m [94mWHERE[0m [37mconname[0m [37m=[0m [37m'chk_patrimonios_categoria'[0m
2025-12-11T14:10:35.0359402Z         [37m)[0m [94mTHEN[0m
2025-12-11T14:10:35.0359941Z           [94mALTER TABLE[0m [37m"patrimonios"[0m
2025-12-11T14:10:35.0360662Z           [94mADD CONSTRAINT[0m [37m"chk_patrimonios_categoria"[0m
2025-12-11T14:10:35.0362532Z           [94mCHECK[0m [37m([0m[37mcategoria[0m [94mIN[0m [37m([0m[37m'EQUIPAMENTO'[0m[37m,[0m [37m'MOBILIARIO'[0m[37m,[0m [37m'VEICULO'[0m[37m,[0m [37m'IMOVEL'[0m[37m,[0m [37m'OUTROS'[0m[37m)[0m[37m)[0m[37m;[0m
2025-12-11T14:10:35.0363762Z         [94mEND[0m [94mIF[0m[37m;[0m
2025-12-11T14:10:35.0364342Z       [94mEND[0m[37m$[0m[37m$[0m[37m;[0m
2025-12-11T14:10:35.0364775Z     
2025-12-11T14:10:35.0370819Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0371508Z       [37mDO[0m [37m$[0m[37m$[0m
2025-12-11T14:10:35.0372517Z       [94mBEGIN[0m
2025-12-11T14:10:35.0373203Z         [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m([0m
2025-12-11T14:10:35.0374807Z           [94mSELECT[0m [32m1[0m [94mFROM[0m [37mpg_constraint[0m [94mWHERE[0m [37mconname[0m [37m=[0m [37m'chk_patrimonios_status'[0m
2025-12-11T14:10:35.0376077Z         [37m)[0m [94mTHEN[0m
2025-12-11T14:10:35.0376800Z           [94mALTER TABLE[0m [37m"patrimonios"[0m
2025-12-11T14:10:35.0377716Z           [94mADD CONSTRAINT[0m [37m"chk_patrimonios_status"[0m
2025-12-11T14:10:35.0379685Z           [94mCHECK[0m [37m([0m[37mstatus[0m [94mIN[0m [37m([0m[37m'ATIVO'[0m[37m,[0m [37m'INATIVO'[0m[37m,[0m [37m'MANUTENCAO'[0m[37m,[0m [37m'DESCARTADO'[0m[37m)[0m[37m)[0m[37m;[0m
2025-12-11T14:10:35.0381160Z         [94mEND[0m [94mIF[0m[37m;[0m
2025-12-11T14:10:35.0382118Z       [94mEND[0m[37m$[0m[37m$[0m[37m;[0m
2025-12-11T14:10:35.0382650Z     
2025-12-11T14:10:35.0383144Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0383638Z       [37mDO[0m [37m$[0m[37m$[0m
2025-12-11T14:10:35.0384089Z       [94mBEGIN[0m
2025-12-11T14:10:35.0384618Z         [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37m([0m
2025-12-11T14:10:35.0385908Z           [94mSELECT[0m [32m1[0m [94mFROM[0m [37mpg_constraint[0m [94mWHERE[0m [37mconname[0m [37m=[0m [37m'chk_patrimonios_valor_aquisicao'[0m
2025-12-11T14:10:35.0386895Z         [37m)[0m [94mTHEN[0m
2025-12-11T14:10:35.0387451Z           [94mALTER TABLE[0m [37m"patrimonios"[0m
2025-12-11T14:10:35.0388242Z           [94mADD CONSTRAINT[0m [37m"chk_patrimonios_valor_aquisicao"[0m
2025-12-11T14:10:35.0389649Z           [94mCHECK[0m [37m([0m[37mvalor_aquisicao[0m [94mIS NULL[0m [94mOR[0m [37mvalor_aquisicao[0m [37m>=[0m [32m0[0m[37m)[0m[37m;[0m
2025-12-11T14:10:35.0390261Z         [94mEND[0m [94mIF[0m[37m;[0m
2025-12-11T14:10:35.0390818Z       [94mEND[0m[37m$[0m[37m$[0m[37m;[0m
2025-12-11T14:10:35.0391064Z     
2025-12-11T14:10:35.0391334Z ✅ Tabela patrimonios criada com sucesso
2025-12-11T14:10:35.0392889Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1758646964165,"CreatePatrimoniosTable1758646964165"][0m
2025-12-11T14:10:35.0393966Z [4mMigration CreatePatrimoniosTable1758646964165 has been executed successfully.[24m
2025-12-11T14:10:35.0395428Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'categorias'[0m
2025-12-11T14:10:35.0414284Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"categorias"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"codigo"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"nome"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"descricao"[0m [94mtext[0m[37m,[0m [37m"icone"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m[37m,[0m [37m"cor"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m[37m,[0m [37m"ativo"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"deleted_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [94mCONSTRAINT[0m [37m"UQ_0c84ea3592b4f7d7100f8a3d2f7"[0m [94mUNIQUE[0m [37m([0m[37m"codigo"[0m[37m)[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_3886a26251605c571c6b4f861fe"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0454467Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0455173Z       [94mSELECT[0m [37mindexname[0m [94mFROM[0m [37mpg_indexes[0m 
2025-12-11T14:10:35.0456332Z       [94mWHERE[0m [37mtablename[0m [37m=[0m [37m'categorias'[0m [94mAND[0m [37mindexname[0m [94mIN[0m [37m([0m[37m'idx_categorias_codigo'[0m[37m,[0m [37m'idx_categorias_ativo'[0m[37m)[0m
2025-12-11T14:10:35.0456930Z     
2025-12-11T14:10:35.0487826Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.0492989Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.0500736Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'categorias'[0m[37m)[0m
2025-12-11T14:10:35.0523062Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.0606629Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'categorias'[0m[37m)[0m
2025-12-11T14:10:35.0618642Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'categorias'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0631047Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'categorias'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0650955Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'categorias'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.0788465Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_categorias_codigo"[0m [94mON[0m [37m"categorias"[0m [37m([0m[37m"codigo"[0m[37m)[0m 
2025-12-11T14:10:35.0803054Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_categorias_ativo"[0m [94mON[0m [37m"categorias"[0m [37m([0m[37m"ativo"[0m[37m)[0m 
2025-12-11T14:10:35.0817967Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0819462Z       [94mSELECT[0m [37mcodigo[0m [94mFROM[0m [37mcategorias[0m [94mWHERE[0m [37mcodigo[0m [94mIN[0m [37m([0m[37m'EQUIPAMENTO'[0m[37m,[0m [37m'MOBILIARIO'[0m[37m,[0m [37m'VEICULO'[0m[37m,[0m [37m'IMOVEL'[0m[37m,[0m [37m'SOFTWARE'[0m[37m,[0m [37m'OUTROS'[0m[37m)[0m
2025-12-11T14:10:35.0820299Z     
2025-12-11T14:10:35.0828743Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0829950Z         [94mINSERT INTO[0m [95mcategorias[0m [37m([0m[37mcodigo[0m[37m,[0m [37mnome[0m[37m,[0m [37mdescricao[0m[37m,[0m [37micone[0m[37m,[0m [37mcor[0m[37m,[0m [37mativo[0m[37m)[0m [94mVALUES[0m
2025-12-11T14:10:35.0831582Z         [37m([0m[37m'EQUIPAMENTO'[0m[37m,[0m [37m'Equipamento'[0m[37m,[0m [37m'Equipamentos eletrônicos, computadores e periféricos'[0m[37m,[0m [37m'laptop'[0m[37m,[0m [37m'#3B82F6'[0m[37m,[0m [94mtrue[0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.0833282Z         [37m([0m[37m'MOBILIARIO'[0m[37m,[0m [37m'Mobiliário'[0m[37m,[0m [37m'Móveis, cadeiras, mesas, armários'[0m[37m,[0m [37m'chair'[0m[37m,[0m [37m'#8B5CF6'[0m[37m,[0m [94mtrue[0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.0834426Z         [37m([0m[37m'VEICULO'[0m[37m,[0m [37m'Veículo'[0m[37m,[0m [37m'Carros, motos, veículos em geral'[0m[37m,[0m [37m'car'[0m[37m,[0m [37m'#F59E0B'[0m[37m,[0m [94mtrue[0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.0836035Z         [37m([0m[37m'IMOVEL'[0m[37m,[0m [37m'Imóvel'[0m[37m,[0m [37m'Terrenos, prédios, salas comerciais'[0m[37m,[0m [37m'building'[0m[37m,[0m [37m'#10B981'[0m[37m,[0m [94mtrue[0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.0837230Z         [37m([0m[37m'SOFTWARE'[0m[37m,[0m [37m'Software'[0m[37m,[0m [37m'Licenças de software, sistemas'[0m[37m,[0m [37m'code'[0m[37m,[0m [37m'#6366F1'[0m[37m,[0m [94mtrue[0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.0838692Z         [37m([0m[37m'OUTROS'[0m[37m,[0m [37m'Outros'[0m[37m,[0m [37m'Outros tipos de patrimônio'[0m[37m,[0m [37m'package'[0m[37m,[0m [37m'#6B7280'[0m[37m,[0m [94mtrue[0m[37m)[0m
2025-12-11T14:10:35.0839761Z         [94mON[0m [95mCONFLICT[0m [37m([0m[37mcodigo[0m[37m)[0m [37mDO[0m [37mNOTHING[0m[37m;[0m
2025-12-11T14:10:35.0840228Z       
2025-12-11T14:10:35.0841700Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1758648000000,"CreateCategoriasTable1758648000000"][0m
2025-12-11T14:10:35.0843367Z [4mMigration CreateCategoriasTable1758648000000 has been executed successfully.[24m
2025-12-11T14:10:35.0846889Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'audit_logs'[0m
2025-12-11T14:10:35.0867426Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"audit_logs"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"user_id"[0m [37muuid[0m[37m,[0m [37m"action"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"entity_type"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"entity_id"[0m [37muuid[0m[37m,[0m [37m"old_values"[0m [37mjsonb[0m[37m,[0m [37m"new_values"[0m [37mjsonb[0m[37m,[0m [37m"ip_address"[0m [37minet[0m[37m,[0m [37m"user_agent"[0m [94mtext[0m[37m,[0m [37m"session_id"[0m [37muuid[0m[37m,[0m [37m"service"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m[37m,[0m [37m"endpoint"[0m [94mvarchar[0m[37m([0m[32m200[0m[37m)[0m[37m,[0m [37m"description"[0m [94mtext[0m[37m,[0m [37m"timestamp"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_1bb179d048bbc581caa3b013439"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0896891Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.0897607Z       [94mSELECT[0m [37mindexname[0m [94mFROM[0m [37mpg_indexes[0m 
2025-12-11T14:10:35.0899679Z       [94mWHERE[0m [37mtablename[0m [37m=[0m [37m'audit_logs'[0m [94mAND[0m [37mindexname[0m [94mIN[0m [37m([0m[37m'idx_audit_logs_user_timestamp'[0m[37m,[0m [37m'idx_audit_logs_entity'[0m[37m,[0m [37m'idx_audit_logs_action_timestamp'[0m[37m)[0m
2025-12-11T14:10:35.0901223Z     
2025-12-11T14:10:35.0909540Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.0913012Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.0918962Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'audit_logs'[0m[37m)[0m
2025-12-11T14:10:35.0932528Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.0968935Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'audit_logs'[0m[37m)[0m
2025-12-11T14:10:35.0980586Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'audit_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.0993138Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'audit_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1013169Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'audit_logs'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.1127455Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_audit_logs_user_timestamp"[0m [94mON[0m [37m"audit_logs"[0m [37m([0m[37m"user_id"[0m[37m,[0m [37m"timestamp"[0m[37m)[0m 
2025-12-11T14:10:35.1148267Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_audit_logs_entity"[0m [94mON[0m [37m"audit_logs"[0m [37m([0m[37m"entity_type"[0m[37m,[0m [37m"entity_id"[0m[37m)[0m 
2025-12-11T14:10:35.1161439Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_audit_logs_action_timestamp"[0m [94mON[0m [37m"audit_logs"[0m [37m([0m[37m"action"[0m[37m,[0m [37m"timestamp"[0m[37m)[0m 
2025-12-11T14:10:35.1176535Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1759000000000,"CreateAuditLogsTable1759000000000"][0m
2025-12-11T14:10:35.1180316Z [4mMigration CreateAuditLogsTable1759000000000 has been executed successfully.[24m
2025-12-11T14:10:35.1183835Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'auth_refresh_tokens'[0m
2025-12-11T14:10:35.1200871Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"auth_refresh_tokens"[0m [37m([0m[37m"id"[0m [37mSERIAL[0m [94mNOT NULL[0m[37m,[0m [37m"user_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"token_hash"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"issued_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m[37m,[0m [37m"expires_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m[37m,[0m [37m"revoked_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"replaced_by_token_id"[0m [37mint[0m[37m,[0m [37m"ip"[0m [94mvarchar[0m[37m([0m[32m45[0m[37m)[0m[37m,[0m [37m"user_agent"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_df6893d2063a4ea7bbf1eda31e5"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1231396Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.1232271Z       [94mSELECT[0m [37mindexname[0m [94mFROM[0m [37mpg_indexes[0m 
2025-12-11T14:10:35.1233581Z       [94mWHERE[0m [37mtablename[0m [37m=[0m [37m'auth_refresh_tokens'[0m [94mAND[0m [37mindexname[0m [94mIN[0m [37m([0m[37m'idx_auth_refresh_tokens_user_id'[0m[37m,[0m [37m'idx_auth_refresh_tokens_expires_at'[0m[37m)[0m
2025-12-11T14:10:35.1234401Z     
2025-12-11T14:10:35.1242653Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.1246117Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.1266202Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m
2025-12-11T14:10:35.1268922Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.1300457Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m
2025-12-11T14:10:35.1312041Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1324405Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1344164Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.1442022Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_auth_refresh_tokens_user_id"[0m [94mON[0m [37m"auth_refresh_tokens"[0m [37m([0m[37m"user_id"[0m[37m)[0m 
2025-12-11T14:10:35.1458205Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_auth_refresh_tokens_expires_at"[0m [94mON[0m [37m"auth_refresh_tokens"[0m [37m([0m[37m"expires_at"[0m[37m)[0m 
2025-12-11T14:10:35.1472548Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1759100000000,"CreateAuthRefreshTokens1759100000000"][0m
2025-12-11T14:10:35.1477123Z [4mMigration CreateAuthRefreshTokens1759100000000 has been executed successfully.[24m
2025-12-11T14:10:35.1480711Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'events'[0m
2025-12-11T14:10:35.1504332Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"events"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"title"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"description"[0m [94mtext[0m[37m,[0m [37m"slug"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"start_date"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m[37m,[0m [37m"end_date"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"event_type"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'OUTROS'[0m[37m,[0m [37m"visibility"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'PUBLIC'[0m[37m,[0m [37m"state"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'DRAFT'[0m[37m,[0m [37m"created_by"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"deleted_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"version"[0m [37mint[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m1[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_40731c7151fe4be3116e45ddf73"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1543110Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"uq_events_slug"[0m [94mON[0m [37m"events"[0m [37m([0m[37m"slug"[0m[37m)[0m
2025-12-11T14:10:35.1556726Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_events_created_by"[0m [94mON[0m [37m"events"[0m [37m([0m[37m"created_by"[0m[37m)[0m
2025-12-11T14:10:35.1569667Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_events_start_date"[0m [94mON[0m [37m"events"[0m [37m([0m[37m"start_date"[0m[37m)[0m
2025-12-11T14:10:35.1581988Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_events_event_type"[0m [94mON[0m [37m"events"[0m [37m([0m[37m"event_type"[0m[37m)[0m
2025-12-11T14:10:35.1594342Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_events_state"[0m [94mON[0m [37m"events"[0m [37m([0m[37m"state"[0m[37m)[0m
2025-12-11T14:10:35.1606185Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.1606710Z       [94mALTER TABLE[0m [37mevents[0m 
2025-12-11T14:10:35.1607466Z       [94mADD CONSTRAINT[0m [37m"FK_events_created_by"[0m 
2025-12-11T14:10:35.1608317Z       [94mFOREIGN KEY[0m [37m([0m[37m"created_by"[0m[37m)[0m 
2025-12-11T14:10:35.1609475Z       [94mREFERENCES[0m [95musers[0m[37m([0m[37m"id"[0m[37m)[0m 
2025-12-11T14:10:35.1610241Z       [94mON[0m [94mDELETE[0m [37mRESTRICT[0m 
2025-12-11T14:10:35.1610900Z       [94mON[0m [94mUPDATE[0m [94mCASCADE[0m
2025-12-11T14:10:35.1611334Z     
2025-12-11T14:10:35.1623375Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.1623966Z       [94mALTER TABLE[0m [37mevents[0m 
2025-12-11T14:10:35.1624406Z       [94mADD CONSTRAINT[0m [37mchk_events_event_type[0m 
2025-12-11T14:10:35.1625527Z       [94mCHECK[0m [37m([0m[37mevent_type[0m [94mIN[0m [37m([0m[37m'MANUTENCAO'[0m[37m,[0m [37m'TRANSFERENCIA'[0m[37m,[0m [37m'AUDITORIA'[0m[37m,[0m [37m'INVENTARIO'[0m[37m,[0m [37m'OUTROS'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1626150Z     
2025-12-11T14:10:35.1629951Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.1630515Z       [94mALTER TABLE[0m [37mevents[0m 
2025-12-11T14:10:35.1631258Z       [94mADD CONSTRAINT[0m [37mchk_events_visibility[0m 
2025-12-11T14:10:35.1632847Z       [94mCHECK[0m [37m([0m[37mvisibility[0m [94mIN[0m [37m([0m[37m'PUBLIC'[0m[37m,[0m [37m'PRIVATE'[0m[37m,[0m [37m'RESTRICTED'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1633724Z     
2025-12-11T14:10:35.1637907Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.1638425Z       [94mALTER TABLE[0m [37mevents[0m 
2025-12-11T14:10:35.1639125Z       [94mADD CONSTRAINT[0m [37mchk_events_state[0m 
2025-12-11T14:10:35.1640610Z       [94mCHECK[0m [37m([0m[37mstate[0m [94mIN[0m [37m([0m[37m'DRAFT'[0m[37m,[0m [37m'PUBLISHED'[0m[37m,[0m [37m'CANCELLED'[0m[37m,[0m [37m'COMPLETED'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1641552Z     
2025-12-11T14:10:35.1648606Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762294296225,"CreateEventsTable1762294296225"][0m
2025-12-11T14:10:35.1652494Z [4mMigration CreateEventsTable1762294296225 has been executed successfully.[24m
2025-12-11T14:10:35.1655543Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'event_patrimonios'[0m
2025-12-11T14:10:35.1669051Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"event_patrimonios"[0m [37m([0m[37m"event_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"patrimonio_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_8b70e4aa91feb5e6b75c8759e9c"[0m [94mPRIMARY KEY[0m [37m([0m[37m"event_id"[0m[37m,[0m [37m"patrimonio_id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1687102Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"uq_event_patrimonios_event_patrimonio"[0m [94mON[0m [37m"event_patrimonios"[0m [37m([0m[37m"event_id"[0m[37m,[0m [37m"patrimonio_id"[0m[37m)[0m
2025-12-11T14:10:35.1700708Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_event_patrimonios_event"[0m [94mON[0m [37m"event_patrimonios"[0m [37m([0m[37m"event_id"[0m[37m)[0m
2025-12-11T14:10:35.1712646Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_event_patrimonios_patrimonio"[0m [94mON[0m [37m"event_patrimonios"[0m [37m([0m[37m"patrimonio_id"[0m[37m)[0m
2025-12-11T14:10:35.1724405Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.1725143Z       [94mALTER TABLE[0m [37mevent_patrimonios[0m 
2025-12-11T14:10:35.1725938Z       [94mADD CONSTRAINT[0m [37m"FK_event_patrimonios_event"[0m 
2025-12-11T14:10:35.1726772Z       [94mFOREIGN KEY[0m [37m([0m[37m"event_id"[0m[37m)[0m 
2025-12-11T14:10:35.1727626Z       [94mREFERENCES[0m [95mevents[0m[37m([0m[37m"id"[0m[37m)[0m 
2025-12-11T14:10:35.1728365Z       [94mON[0m [94mDELETE[0m [94mCASCADE[0m 
2025-12-11T14:10:35.1729300Z       [94mON[0m [94mUPDATE[0m [94mCASCADE[0m
2025-12-11T14:10:35.1729737Z     
2025-12-11T14:10:35.1745853Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.1746535Z       [94mALTER TABLE[0m [37mevent_patrimonios[0m 
2025-12-11T14:10:35.1747395Z       [94mADD CONSTRAINT[0m [37m"FK_event_patrimonios_patrimonio"[0m 
2025-12-11T14:10:35.1748318Z       [94mFOREIGN KEY[0m [37m([0m[37m"patrimonio_id"[0m[37m)[0m 
2025-12-11T14:10:35.1749263Z       [94mREFERENCES[0m [95mpatrimonios[0m[37m([0m[37m"id"[0m[37m)[0m 
2025-12-11T14:10:35.1750055Z       [94mON[0m [94mDELETE[0m [94mCASCADE[0m 
2025-12-11T14:10:35.1750698Z       [94mON[0m [94mUPDATE[0m [94mCASCADE[0m
2025-12-11T14:10:35.1751135Z     
2025-12-11T14:10:35.1764540Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762294296226,"CreateEventPatrimoniosTable1762294296226"][0m
2025-12-11T14:10:35.1767795Z [4mMigration CreateEventPatrimoniosTable1762294296226 has been executed successfully.[24m
2025-12-11T14:10:35.1770466Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'connectors'[0m
2025-12-11T14:10:35.1790530Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"connectors"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"key"[0m [94mvarchar[0m[37m([0m[32m80[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"name"[0m [94mvarchar[0m[37m([0m[32m120[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"config_json"[0m [37mjsonb[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'{}'[0m[37m,[0m [37m"enabled"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"UQ_7b6fdd4504f608a94fb344918ee"[0m [94mUNIQUE[0m [37m([0m[37m"key"[0m[37m)[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_c1334e2a68a8de86d1732a8e3fb"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1831658Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.1835331Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.1843027Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'connectors'[0m[37m)[0m
2025-12-11T14:10:35.1854913Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.1890151Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'connectors'[0m[37m)[0m
2025-12-11T14:10:35.1901178Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'connectors'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1913709Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'connectors'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.1933628Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'connectors'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.2015806Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"ux_connectors_key"[0m [94mON[0m [37m"connectors"[0m [37m([0m[37m"key"[0m[37m)[0m 
2025-12-11T14:10:35.2031045Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437583567,"CreateConnectorsTable1762437583567"][0m
2025-12-11T14:10:35.2034070Z [4mMigration CreateConnectorsTable1762437583567 has been executed successfully.[24m
2025-12-11T14:10:35.2036843Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'executions'[0m
2025-12-11T14:10:35.2055273Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"executions"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"connector_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"type"[0m [94mvarchar[0m[37m([0m[32m16[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m16[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"started_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"finished_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"error"[0m [94mtext[0m[37m,[0m [37m"created_by"[0m [94mvarchar[0m[37m([0m[32m120[0m[37m)[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_703e64e0ef651986191844b7b8b"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2084122Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.2087515Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.2095606Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'executions'[0m[37m)[0m
2025-12-11T14:10:35.2108211Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.2141359Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'executions'[0m[37m)[0m
2025-12-11T14:10:35.2160766Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'executions'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2183947Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'executions'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2221116Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'executions'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.2319744Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"executions"[0m [94mADD CONSTRAINT[0m [37m"fk_executions_connector"[0m [94mFOREIGN KEY[0m [37m([0m[37m"connector_id"[0m[37m)[0m [94mREFERENCES[0m [37m"connectors"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.2340905Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.2346120Z       [94mALTER TABLE[0m [37mexecutions[0m 
2025-12-11T14:10:35.2346763Z       [94mADD CONSTRAINT[0m [37mchk_executions_type[0m 
2025-12-11T14:10:35.2347930Z       [94mCHECK[0m [37m([0m[37mtype[0m [94mIN[0m [37m([0m[37m'import'[0m[37m,[0m [37m'export'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2348614Z     
2025-12-11T14:10:35.2348996Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.2349529Z       [94mALTER TABLE[0m [37mexecutions[0m 
2025-12-11T14:10:35.2350276Z       [94mADD CONSTRAINT[0m [37mchk_executions_status[0m 
2025-12-11T14:10:35.2352516Z       [94mCHECK[0m [37m([0m[37mstatus[0m [94mIN[0m [37m([0m[37m'queued'[0m[37m,[0m [37m'running'[0m[37m,[0m [37m'success'[0m[37m,[0m [37m'failed'[0m[37m,[0m [37m'canceled'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2353539Z     
2025-12-11T14:10:35.2362210Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437583568,"CreateExecutionsTable1762437583568"][0m
2025-12-11T14:10:35.2366220Z [4mMigration CreateExecutionsTable1762437583568 has been executed successfully.[24m
2025-12-11T14:10:35.2370412Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'execution_logs'[0m
2025-12-11T14:10:35.2396205Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"execution_logs"[0m [37m([0m[37m"id"[0m [37mBIGSERIAL[0m [94mNOT NULL[0m[37m,[0m [37m"execution_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"level"[0m [94mvarchar[0m[37m([0m[32m10[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"message"[0m [94mtext[0m [94mNOT NULL[0m[37m,[0m [37m"meta_json"[0m [37mjsonb[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'{}'[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_9db55f176b2d494e695536f03a7"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2425413Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.2429094Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.2437436Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'execution_logs'[0m[37m)[0m
2025-12-11T14:10:35.2450346Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.2497027Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'execution_logs'[0m[37m)[0m
2025-12-11T14:10:35.2515585Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'execution_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2538761Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'execution_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2575597Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'execution_logs'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.2687457Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"execution_logs"[0m [94mADD CONSTRAINT[0m [37m"fk_execution_logs_execution"[0m [94mFOREIGN KEY[0m [37m([0m[37m"execution_id"[0m[37m)[0m [94mREFERENCES[0m [37m"executions"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.2690336Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.2690888Z       [94mALTER TABLE[0m [37mexecution_logs[0m 
2025-12-11T14:10:35.2691594Z       [94mADD CONSTRAINT[0m [37mchk_execution_logs_level[0m 
2025-12-11T14:10:35.2693381Z       [94mCHECK[0m [37m([0m[37mlevel[0m [94mIN[0m [37m([0m[37m'debug'[0m[37m,[0m [37m'info'[0m[37m,[0m [37m'warn'[0m[37m,[0m [37m'error'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2694230Z     
2025-12-11T14:10:35.2700812Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437583569,"CreateExecutionLogsTable1762437583569"][0m
2025-12-11T14:10:35.2704513Z [4mMigration CreateExecutionLogsTable1762437583569 has been executed successfully.[24m
2025-12-11T14:10:35.2705661Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.2706657Z       [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37mix_executions_connector_status_started_at[0m 
2025-12-11T14:10:35.2707736Z       [94mON[0m [95mexecutions[0m[37m([0m[37mconnector_id[0m[37m,[0m [37mstatus[0m[37m,[0m [37mstarted_at[0m [94mDESC[0m[37m)[0m
2025-12-11T14:10:35.2708205Z     
2025-12-11T14:10:35.2726777Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.2727723Z       [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37mix_executions_created_by_started_at[0m 
2025-12-11T14:10:35.2728621Z       [94mON[0m [95mexecutions[0m[37m([0m[37mcreated_by[0m[37m,[0m [37mstarted_at[0m [94mDESC[0m[37m)[0m
2025-12-11T14:10:35.2729021Z     
2025-12-11T14:10:35.2740978Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.2742031Z       [94mCREATE INDEX[0m [94mIF[0m [94mNOT[0m [94mEXISTS[0m [37mix_execution_logs_execution_created_at[0m 
2025-12-11T14:10:35.2742812Z       [94mON[0m [95mexecution_logs[0m[37m([0m[37mexecution_id[0m[37m,[0m [37mcreated_at[0m [94mASC[0m[37m)[0m
2025-12-11T14:10:35.2743220Z     
2025-12-11T14:10:35.2757874Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437583570,"AddIndexesToIntegrations1762437583570"][0m
2025-12-11T14:10:35.2760952Z [4mMigration AddIndexesToIntegrations1762437583570 has been executed successfully.[24m
2025-12-11T14:10:35.2765292Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'campaigns'[0m
2025-12-11T14:10:35.2785811Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"campaigns"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"nome"[0m [94mvarchar[0m[37m([0m[32m200[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"local"[0m [94mvarchar[0m[37m([0m[32m200[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"periodo_inicio"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m[37m,[0m [37m"periodo_fim"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m[37m,[0m [37m"owner_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'draft'[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_831e3fcd4fc45b4e4c3f57a9ee4"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2803754Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.2807815Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.2815195Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'campaigns'[0m[37m)[0m
2025-12-11T14:10:35.2827801Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.2863361Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'campaigns'[0m[37m)[0m
2025-12-11T14:10:35.2883515Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'campaigns'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2906493Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'campaigns'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.2943847Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'campaigns'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.3019278Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"campaigns"[0m [94mADD CONSTRAINT[0m [37m"fk_campaigns_owner"[0m [94mFOREIGN KEY[0m [37m([0m[37m"owner_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.3032191Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.3032790Z       [94mALTER TABLE[0m [37mcampaigns[0m 
2025-12-11T14:10:35.3033700Z       [94mADD CONSTRAINT[0m [37mchk_campaigns_status[0m 
2025-12-11T14:10:35.3035181Z       [94mCHECK[0m [37m([0m[37mstatus[0m [94mIN[0m [37m([0m[37m'draft'[0m[37m,[0m [37m'active'[0m[37m,[0m [37m'completed'[0m[37m,[0m [37m'canceled'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3036130Z     
2025-12-11T14:10:35.3040284Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_campaigns_owner_status_periodo"[0m [94mON[0m [37m"campaigns"[0m [37m([0m[37m"owner_id"[0m[37m,[0m [37m"status"[0m[37m,[0m [37m"periodo_inicio"[0m[37m)[0m 
2025-12-11T14:10:35.3057726Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437584000,"CreateCampaignsTable1762437584000"][0m
2025-12-11T14:10:35.3060722Z [4mMigration CreateCampaignsTable1762437584000 has been executed successfully.[24m
2025-12-11T14:10:35.3065011Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'assignments'[0m
2025-12-11T14:10:35.3083959Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"assignments"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"campaign_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"coletor_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'pending'[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_c54ca359535e0012b04dcbd80ee"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3128721Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.3131054Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.3136349Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'assignments'[0m[37m)[0m
2025-12-11T14:10:35.3152388Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.3188560Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'assignments'[0m[37m)[0m
2025-12-11T14:10:35.3208382Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'assignments'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3231652Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'assignments'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3268414Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'assignments'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.3338878Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"assignments"[0m [94mADD CONSTRAINT[0m [37m"fk_assignments_campaign"[0m [94mFOREIGN KEY[0m [37m([0m[37m"campaign_id"[0m[37m)[0m [94mREFERENCES[0m [37m"campaigns"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.3355879Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"assignments"[0m [94mADD CONSTRAINT[0m [37m"fk_assignments_coletor"[0m [94mFOREIGN KEY[0m [37m([0m[37m"coletor_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.3368671Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.3369236Z       [94mALTER TABLE[0m [37massignments[0m 
2025-12-11T14:10:35.3369986Z       [94mADD CONSTRAINT[0m [37mchk_assignments_status[0m 
2025-12-11T14:10:35.3371725Z       [94mCHECK[0m [37m([0m[37mstatus[0m [94mIN[0m [37m([0m[37m'pending'[0m[37m,[0m [37m'in_progress'[0m[37m,[0m [37m'completed'[0m[37m,[0m [37m'canceled'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3372933Z     
2025-12-11T14:10:35.3377561Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_assignments_campaign_status"[0m [94mON[0m [37m"assignments"[0m [37m([0m[37m"campaign_id"[0m[37m,[0m [37m"status"[0m[37m)[0m 
2025-12-11T14:10:35.3394533Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_assignments_coletor_status"[0m [94mON[0m [37m"assignments"[0m [37m([0m[37m"coletor_id"[0m[37m,[0m [37m"status"[0m[37m)[0m 
2025-12-11T14:10:35.3410827Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437584001,"CreateAssignmentsTable1762437584001"][0m
2025-12-11T14:10:35.3413878Z [4mMigration CreateAssignmentsTable1762437584001 has been executed successfully.[24m
2025-12-11T14:10:35.3418277Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'collected_items'[0m
2025-12-11T14:10:35.3437702Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"collected_items"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"assignment_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"patrimonio_id"[0m [37muuid[0m[37m,[0m [37m"codigo_lido"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"tipo_leitura"[0m [94mvarchar[0m[37m([0m[32m10[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"coletado_em"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"geo"[0m [37mjsonb[0m[37m,[0m [37m"offline_batch_id"[0m [37muuid[0m[37m,[0m [37m"version"[0m [37mint[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m1[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_31062ab1e5337907a818fc45902"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3469370Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.3472741Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.3478501Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'collected_items'[0m[37m)[0m
2025-12-11T14:10:35.3491310Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.3524994Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'collected_items'[0m[37m)[0m
2025-12-11T14:10:35.3536721Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'collected_items'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3549251Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'collected_items'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3569085Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'collected_items'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.3654750Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"collected_items"[0m [94mADD CONSTRAINT[0m [37m"fk_collected_items_assignment"[0m [94mFOREIGN KEY[0m [37m([0m[37m"assignment_id"[0m[37m)[0m [94mREFERENCES[0m [37m"assignments"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.3669106Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"collected_items"[0m [94mADD CONSTRAINT[0m [37m"fk_collected_items_patrimonio"[0m [94mFOREIGN KEY[0m [37m([0m[37m"patrimonio_id"[0m[37m)[0m [94mREFERENCES[0m [37m"patrimonios"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mSET[0m [94mNULL[0m
2025-12-11T14:10:35.3681058Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.3681722Z       [94mALTER TABLE[0m [37mcollected_items[0m 
2025-12-11T14:10:35.3682516Z       [94mADD CONSTRAINT[0m [37mchk_collected_items_tipo_leitura[0m 
2025-12-11T14:10:35.3683313Z       [94mCHECK[0m [37m([0m[37mtipo_leitura[0m [94mIN[0m [37m([0m[37m'qrcode'[0m[37m,[0m [37m'rfid'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3683733Z     
2025-12-11T14:10:35.3689728Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_collected_items_assignment_coletado"[0m [94mON[0m [37m"collected_items"[0m [37m([0m[37m"assignment_id"[0m[37m,[0m [37m"coletado_em"[0m[37m)[0m 
2025-12-11T14:10:35.3707504Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_collected_items_patrimonio_coletado"[0m [94mON[0m [37m"collected_items"[0m [37m([0m[37m"patrimonio_id"[0m[37m,[0m [37m"coletado_em"[0m[37m)[0m 
2025-12-11T14:10:35.3721422Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_collected_items_offline_batch"[0m [94mON[0m [37m"collected_items"[0m [37m([0m[37m"offline_batch_id"[0m[37m)[0m 
2025-12-11T14:10:35.3736229Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437584002,"CreateCollectedItemsTable1762437584002"][0m
2025-12-11T14:10:35.3739371Z [4mMigration CreateCollectedItemsTable1762437584002 has been executed successfully.[24m
2025-12-11T14:10:35.3742523Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'reconciliations'[0m
2025-12-11T14:10:35.3758222Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"reconciliations"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"campaign_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'pending'[0m[37m,[0m [37m"divergencias_json"[0m [37mjsonb[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'[]'[0m[37m,[0m [37m"executed_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_110f3839ca29e2fd8ff4aaec7b8"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3787582Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.3791596Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.3797649Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'reconciliations'[0m[37m)[0m
2025-12-11T14:10:35.3809690Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.3845332Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'reconciliations'[0m[37m)[0m
2025-12-11T14:10:35.3865011Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'reconciliations'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3937021Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'reconciliations'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.3974027Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'reconciliations'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.3993736Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"reconciliations"[0m [94mADD CONSTRAINT[0m [37m"fk_reconciliations_campaign"[0m [94mFOREIGN KEY[0m [37m([0m[37m"campaign_id"[0m[37m)[0m [94mREFERENCES[0m [37m"campaigns"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.4006700Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.4007260Z       [94mALTER TABLE[0m [37mreconciliations[0m 
2025-12-11T14:10:35.4007849Z       [94mADD CONSTRAINT[0m [37mchk_reconciliations_status[0m 
2025-12-11T14:10:35.4008695Z       [94mCHECK[0m [37m([0m[37mstatus[0m [94mIN[0m [37m([0m[37m'pending'[0m[37m,[0m [37m'processing'[0m[37m,[0m [37m'completed'[0m[37m,[0m [37m'failed'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4009213Z     
2025-12-11T14:10:35.4015357Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_reconciliations_campaign_status"[0m [94mON[0m [37m"reconciliations"[0m [37m([0m[37m"campaign_id"[0m[37m,[0m [37m"status"[0m[37m)[0m 
2025-12-11T14:10:35.4032100Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437584003,"CreateReconciliationsTable1762437584003"][0m
2025-12-11T14:10:35.4035600Z [4mMigration CreateReconciliationsTable1762437584003 has been executed successfully.[24m
2025-12-11T14:10:35.4038526Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'maintenance_plans'[0m
2025-12-11T14:10:35.4056813Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"maintenance_plans"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"categoria_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"periodicidade"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"proxima_execucao"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m[37m,[0m [37m"owner_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_bc2a330993cedb65505a154ac5d"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4073867Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.4077610Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.4083865Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'maintenance_plans'[0m[37m)[0m
2025-12-11T14:10:35.4095364Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.4153390Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'maintenance_plans'[0m[37m)[0m
2025-12-11T14:10:35.4176089Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'maintenance_plans'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4199450Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'maintenance_plans'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4237069Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'maintenance_plans'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.4304721Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"maintenance_plans"[0m [94mADD CONSTRAINT[0m [37m"FK_74bc8a03b35a334b9d103d66d54"[0m [94mFOREIGN KEY[0m [37m([0m[37m"categoria_id"[0m[37m)[0m [94mREFERENCES[0m [37m"categorias"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.4322749Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"maintenance_plans"[0m [94mADD CONSTRAINT[0m [37m"FK_adc889d10ac565683ffd9703b5b"[0m [94mFOREIGN KEY[0m [37m([0m[37m"owner_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.4334827Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_maintenance_plans_categoria"[0m [94mON[0m [37m"maintenance_plans"[0m [37m([0m[37m"categoria_id"[0m[37m)[0m 
2025-12-11T14:10:35.4349455Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_maintenance_plans_owner"[0m [94mON[0m [37m"maintenance_plans"[0m [37m([0m[37m"owner_id"[0m[37m)[0m 
2025-12-11T14:10:35.4365097Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437585000,"CreateMaintenancePlansTable1762437585000"][0m
2025-12-11T14:10:35.4368111Z [4mMigration CreateMaintenancePlansTable1762437585000 has been executed successfully.[24m
2025-12-11T14:10:35.4371523Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'work_orders'[0m
2025-12-11T14:10:35.4389323Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"work_orders"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"patrimonio_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'aberta'[0m[37m,[0m [37m"titulo"[0m [94mvarchar[0m[37m([0m[32m200[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"descricao"[0m [94mtext[0m[37m,[0m [37m"prioridade"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'media'[0m[37m,[0m [37m"opened_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m[37m,[0m [37m"closed_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"owner_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_29f6c1884082ee6f535aed93660"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4418175Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.4421565Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.4427484Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'work_orders'[0m[37m)[0m
2025-12-11T14:10:35.4439190Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.4474199Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'work_orders'[0m[37m)[0m
2025-12-11T14:10:35.4485410Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'work_orders'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4497716Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'work_orders'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4517810Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'work_orders'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.4603953Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"work_orders"[0m [94mADD CONSTRAINT[0m [37m"FK_84d5c3814e14f180c7994840af6"[0m [94mFOREIGN KEY[0m [37m([0m[37m"patrimonio_id"[0m[37m)[0m [94mREFERENCES[0m [37m"patrimonios"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.4618789Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"work_orders"[0m [94mADD CONSTRAINT[0m [37m"FK_149398966336295f0423c28d726"[0m [94mFOREIGN KEY[0m [37m([0m[37m"owner_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.4632305Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_work_orders_status_opened_at"[0m [94mON[0m [37m"work_orders"[0m [37m([0m[37m"status"[0m[37m,[0m [37m"opened_at"[0m[37m)[0m 
2025-12-11T14:10:35.4646205Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_work_orders_patrimonio_status"[0m [94mON[0m [37m"work_orders"[0m [37m([0m[37m"patrimonio_id"[0m[37m,[0m [37m"status"[0m[37m)[0m 
2025-12-11T14:10:35.4659091Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_work_orders_owner_opened_at"[0m [94mON[0m [37m"work_orders"[0m [37m([0m[37m"owner_id"[0m[37m,[0m [37m"opened_at"[0m[37m)[0m 
2025-12-11T14:10:35.4674411Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437585001,"CreateWorkOrdersTable1762437585001"][0m
2025-12-11T14:10:35.4677260Z [4mMigration CreateWorkOrdersTable1762437585001 has been executed successfully.[24m
2025-12-11T14:10:35.4680428Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'work_logs'[0m
2025-12-11T14:10:35.4695219Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"work_logs"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"work_order_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"tipo"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'trabalho'[0m[37m,[0m [37m"horas"[0m [94mdecimal[0m[37m([0m[32m5[0m[37m,[0m[32m2[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"custo"[0m [94mdecimal[0m[37m([0m[32m10[0m[37m,[0m[32m2[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m0[0m[37m,[0m [37m"observacao"[0m [94mtext[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_f4f3234af57451baa20576887be"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4726164Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.4729520Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.4735368Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'work_logs'[0m[37m)[0m
2025-12-11T14:10:35.4746878Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.4782556Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'work_logs'[0m[37m)[0m
2025-12-11T14:10:35.4802605Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'work_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4825768Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'work_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.4862901Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'work_logs'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.4936579Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"work_logs"[0m [94mADD CONSTRAINT[0m [37m"FK_32a6882b7f22fab6ba40fb7784f"[0m [94mFOREIGN KEY[0m [37m([0m[37m"work_order_id"[0m[37m)[0m [94mREFERENCES[0m [37m"work_orders"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.4950642Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_work_logs_work_order"[0m [94mON[0m [37m"work_logs"[0m [37m([0m[37m"work_order_id"[0m[37m)[0m 
2025-12-11T14:10:35.4964637Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437585002,"CreateWorkLogsTable1762437585002"][0m
2025-12-11T14:10:35.4968277Z [4mMigration CreateWorkLogsTable1762437585002 has been executed successfully.[24m
2025-12-11T14:10:35.4971335Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'parts'[0m
2025-12-11T14:10:35.4984787Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"parts"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"work_order_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"descricao"[0m [94mvarchar[0m[37m([0m[32m200[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"quantidade"[0m [37mint[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m1[0m[37m,[0m [37m"custo_unitario"[0m [94mdecimal[0m[37m([0m[32m10[0m[37m,[0m[32m2[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_daa5595bb8933f49ac00c9ebc79"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5001978Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5005226Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5010930Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'parts'[0m[37m)[0m
2025-12-11T14:10:35.5022993Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.5056601Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'parts'[0m[37m)[0m
2025-12-11T14:10:35.5067903Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'parts'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5080336Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'parts'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5100278Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'parts'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.5181343Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"parts"[0m [94mADD CONSTRAINT[0m [37m"FK_d9a3917ab87d33772ca9f9ea059"[0m [94mFOREIGN KEY[0m [37m([0m[37m"work_order_id"[0m[37m)[0m [94mREFERENCES[0m [37m"work_orders"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.5193937Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_parts_work_order"[0m [94mON[0m [37m"parts"[0m [37m([0m[37m"work_order_id"[0m[37m)[0m 
2025-12-11T14:10:35.5208423Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762437585003,"CreatePartsTable1762437585003"][0m
2025-12-11T14:10:35.5211177Z [4mMigration CreatePartsTable1762437585003 has been executed successfully.[24m
2025-12-11T14:10:35.5215025Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_templates'[0m
2025-12-11T14:10:35.5229915Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"notification_templates"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"key"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"version"[0m [37mint[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m1[0m[37m,[0m [37m"channel"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"subject"[0m [94mvarchar[0m[37m([0m[32m200[0m[37m)[0m[37m,[0m [37m"body"[0m [94mtext[0m [94mNOT NULL[0m[37m,[0m [37m"locale"[0m [94mvarchar[0m[37m([0m[32m10[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'pt-BR'[0m[37m,[0m [37m"created_at"[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_76f0fc48b8d057d2ae7f3a2848a"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5259588Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5262791Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5268712Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_templates'[0m[37m)[0m
2025-12-11T14:10:35.5281613Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.5315826Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_templates'[0m[37m)[0m
2025-12-11T14:10:35.5334942Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_templates'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5358174Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_templates'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5395260Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_templates'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.5477828Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"ix_notification_templates_key_version"[0m [94mON[0m [37m"notification_templates"[0m [37m([0m[37m"key"[0m[37m,[0m [37m"version"[0m[37m)[0m 
2025-12-11T14:10:35.5493814Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_notification_templates_channel"[0m [94mON[0m [37m"notification_templates"[0m [37m([0m[37m"channel"[0m[37m)[0m 
2025-12-11T14:10:35.5508902Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000000,"CreateNotificationTemplatesTable1762438000000"][0m
2025-12-11T14:10:35.5511550Z [4mMigration CreateNotificationTemplatesTable1762438000000 has been executed successfully.[24m
2025-12-11T14:10:35.5514922Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_policies'[0m
2025-12-11T14:10:35.5529653Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"notification_policies"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"event_key"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"priority"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'medium'[0m[37m,[0m [37m"channels"[0m [94mvarchar[0m [37marray[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'{}'[0m[37m,[0m [37m"enabled"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"created_at"[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_869308526ba1f3e57fad1723a5d"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5562698Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5565988Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5572147Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_policies'[0m[37m)[0m
2025-12-11T14:10:35.5584267Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.5625370Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_policies'[0m[37m)[0m
2025-12-11T14:10:35.5646053Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_policies'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5669234Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_policies'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5706718Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_policies'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.5781230Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"udt_schema"[0m[37m,[0m [37m"udt_name"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_policies'[0m [94mAND[0m [37m"column_name"[0m[37m=[0m[37m'channels'[0m
2025-12-11T14:10:35.5809782Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"e"[0m[37m.[0m[37m"enumlabel"[0m [94mAS[0m [37m"value"[0m [94mFROM[0m [37m"pg_enum"[0m [37m"e"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"e"[0m[37m.[0m[37m"enumtypid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"n"[0m [94mON[0m [37m"n"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"typnamespace"[0m [94mWHERE[0m [37m"n"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"typname"[0m [37m=[0m [37m'varchar'[0m
2025-12-11T14:10:35.5820693Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_notification_policies_event_key"[0m [94mON[0m [37m"notification_policies"[0m [37m([0m[37m"event_key"[0m[37m)[0m 
2025-12-11T14:10:35.5835075Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_notification_policies_enabled"[0m [94mON[0m [37m"notification_policies"[0m [37m([0m[37m"enabled"[0m[37m)[0m 
2025-12-11T14:10:35.5848172Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000001,"CreateNotificationPoliciesTable1762438000001"][0m
2025-12-11T14:10:35.5850945Z [4mMigration CreateNotificationPoliciesTable1762438000001 has been executed successfully.[24m
2025-12-11T14:10:35.5854249Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'webhooks'[0m
2025-12-11T14:10:35.5868846Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"webhooks"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"name"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"url"[0m [94mvarchar[0m[37m([0m[32m500[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"secret"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"enabled"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"created_at"[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_9e8795cfc899ab7bdaa831e8527"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.5897771Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5901244Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.5907543Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'webhooks'[0m[37m)[0m
2025-12-11T14:10:35.5918697Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.5958743Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'webhooks'[0m[37m)[0m
2025-12-11T14:10:35.5978228Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'webhooks'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6001336Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'webhooks'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6027892Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'webhooks'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.6087428Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_webhooks_enabled"[0m [94mON[0m [37m"webhooks"[0m [37m([0m[37m"enabled"[0m[37m)[0m 
2025-12-11T14:10:35.6102860Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000002,"CreateWebhooksTable1762438000002"][0m
2025-12-11T14:10:35.6105860Z [4mMigration CreateWebhooksTable1762438000002 has been executed successfully.[24m
2025-12-11T14:10:35.6109448Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_logs'[0m
2025-12-11T14:10:35.6128683Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"notification_logs"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"event_key"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"channel"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'pending'[0m[37m,[0m [37m"attempts"[0m [37mint[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m0[0m[37m,[0m [37m"duration_ms"[0m [37mint[0m[37m,[0m [37m"error"[0m [94mtext[0m[37m,[0m [37m"recipient"[0m [94mvarchar[0m[37m([0m[32m500[0m[37m)[0m[37m,[0m [37m"created_at"[0m [37mtimestamptz[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_19c524e644cdeaebfcffc284871"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6166251Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.6170331Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.6184168Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_logs'[0m[37m)[0m
2025-12-11T14:10:35.6193046Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.6243956Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'notification_logs'[0m[37m)[0m
2025-12-11T14:10:35.6255026Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6267412Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_logs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6289349Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'notification_logs'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.6373222Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_notification_logs_event_key"[0m [94mON[0m [37m"notification_logs"[0m [37m([0m[37m"event_key"[0m[37m)[0m 
2025-12-11T14:10:35.6387752Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_notification_logs_channel_status_created_at"[0m [94mON[0m [37m"notification_logs"[0m [37m([0m[37m"channel"[0m[37m,[0m [37m"status"[0m[37m,[0m [37m"created_at"[0m[37m)[0m 
2025-12-11T14:10:35.6403718Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000003,"CreateNotificationLogsTable1762438000003"][0m
2025-12-11T14:10:35.6406513Z [4mMigration CreateNotificationLogsTable1762438000003 has been executed successfully.[24m
2025-12-11T14:10:35.6410322Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_requests'[0m
2025-12-11T14:10:35.6429646Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"report_requests"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"type"[0m [94mvarchar[0m[37m([0m[32m10[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"model"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"filters_json"[0m [37mjsonb[0m[37m,[0m [37m"status"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'pending'[0m[37m,[0m [37m"created_by_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"error_message"[0m [94mtext[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_85ea1b338c4669892e21725c212"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6459311Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.6462954Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.6470409Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_requests'[0m[37m)[0m
2025-12-11T14:10:35.6482752Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.6520244Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_requests'[0m[37m)[0m
2025-12-11T14:10:35.6532270Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_requests'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6544496Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_requests'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6564421Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_requests'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.6649286Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_report_requests_status_created_at"[0m [94mON[0m [37m"report_requests"[0m [37m([0m[37m"status"[0m[37m,[0m [37m"created_at"[0m[37m)[0m 
2025-12-11T14:10:35.6663675Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_report_requests_created_by_created_at"[0m [94mON[0m [37m"report_requests"[0m [37m([0m[37m"created_by_id"[0m[37m,[0m [37m"created_at"[0m[37m)[0m 
2025-12-11T14:10:35.6678001Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_requests"[0m [94mADD CONSTRAINT[0m [37m"FK_8ad85d402b28a33433a706f5d7b"[0m [94mFOREIGN KEY[0m [37m([0m[37m"created_by_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.6693209Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000004,"CreateReportRequestsTable1762438000004"][0m
2025-12-11T14:10:35.6696018Z [4mMigration CreateReportRequestsTable1762438000004 has been executed successfully.[24m
2025-12-11T14:10:35.6699247Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_artifacts'[0m
2025-12-11T14:10:35.6714385Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"report_artifacts"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"request_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"storage_key"[0m [94mvarchar[0m[37m([0m[32m500[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"mime"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"size_bytes"[0m [37mbigint[0m [94mNOT NULL[0m[37m,[0m [37m"expires_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m[37m,[0m [37m"created_at"[0m [94mTIMESTAMP[0m [94mWITH[0m [37mTIME[0m [37mZONE[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"UQ_56138d8aa21aee1f824059c3b32"[0m [94mUNIQUE[0m [37m([0m[37m"request_id"[0m[37m)[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_63380a81380056ff15b91fccf9f"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6756374Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.6759542Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.6765558Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_artifacts'[0m[37m)[0m
2025-12-11T14:10:35.6777057Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.6812383Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_artifacts'[0m[37m)[0m
2025-12-11T14:10:35.6824682Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_artifacts'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6837561Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_artifacts'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.6857580Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_artifacts'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.6936880Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_report_artifacts_request_id"[0m [94mON[0m [37m"report_artifacts"[0m [37m([0m[37m"request_id"[0m[37m)[0m 
2025-12-11T14:10:35.6950157Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"ix_report_artifacts_expires_at"[0m [94mON[0m [37m"report_artifacts"[0m [37m([0m[37m"expires_at"[0m[37m)[0m 
2025-12-11T14:10:35.6963571Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_artifacts"[0m [94mADD CONSTRAINT[0m [37m"FK_56138d8aa21aee1f824059c3b32"[0m [94mFOREIGN KEY[0m [37m([0m[37m"request_id"[0m[37m)[0m [94mREFERENCES[0m [37m"report_requests"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.6978051Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000005,"CreateReportArtifactsTable1762438000005"][0m
2025-12-11T14:10:35.6980758Z [4mMigration CreateReportArtifactsTable1762438000005 has been executed successfully.[24m
2025-12-11T14:10:35.6984664Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_catalogs'[0m
2025-12-11T14:10:35.7002184Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"report_catalogs"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"key"[0m [94mvarchar[0m[37m([0m[32m100[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"name"[0m [94mvarchar[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"description"[0m [94mtext[0m[37m,[0m [37m"type"[0m [94mvarchar[0m[37m([0m[32m10[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"model"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"default_filters"[0m [37mjsonb[0m[37m,[0m [37m"current_version"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'1.0.0'[0m[37m,[0m [37m"active"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"requires_permission"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mfalse[0m[37m,[0m [37m"created_by_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"updated_by_id"[0m [37muuid[0m[37m,[0m [37m"created_at"[0m [94mtimestamp[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mtimestamp[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"UQ_f068508a4fee9b02d8496292000"[0m [94mUNIQUE[0m [37m([0m[37m"key"[0m[37m)[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_5771d81d9046bfc844cb81ea527"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7042980Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7046306Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7052244Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_catalogs'[0m[37m)[0m
2025-12-11T14:10:35.7063508Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.7098340Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_catalogs'[0m[37m)[0m
2025-12-11T14:10:35.7110108Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_catalogs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7122524Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_catalogs'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7142483Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_catalogs'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.7232296Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"idx_report_catalogs_key"[0m [94mON[0m [37m"report_catalogs"[0m [37m([0m[37m"key"[0m[37m)[0m 
2025-12-11T14:10:35.7244985Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_catalogs_active"[0m [94mON[0m [37m"report_catalogs"[0m [37m([0m[37m"active"[0m[37m)[0m 
2025-12-11T14:10:35.7258233Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_catalogs"[0m [94mADD CONSTRAINT[0m [37m"FK_89412bfa419936cad21d3c387d3"[0m [94mFOREIGN KEY[0m [37m([0m[37m"created_by_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.7273594Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_catalogs"[0m [94mADD CONSTRAINT[0m [37m"FK_916e16c82b24ad01e5f251b6f13"[0m [94mFOREIGN KEY[0m [37m([0m[37m"updated_by_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mSET[0m [94mNULL[0m
2025-12-11T14:10:35.7287858Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000006,"CreateReportCatalogsTable1762438000006"][0m
2025-12-11T14:10:35.7290953Z [4mMigration CreateReportCatalogsTable1762438000006 has been executed successfully.[24m
2025-12-11T14:10:35.7293971Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_catalog_versions'[0m
2025-12-11T14:10:35.7308499Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"report_catalog_versions"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"catalog_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"version"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m[37m,[0m [37m"changelog"[0m [94mtext[0m[37m,[0m [37m"filters"[0m [37mjsonb[0m[37m,[0m [37m"is_current"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mfalse[0m[37m,[0m [37m"created_by_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"created_at"[0m [94mtimestamp[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_50d991d652cfd29478fd1f20b5e"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7339218Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7342571Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7348439Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_catalog_versions'[0m[37m)[0m
2025-12-11T14:10:35.7360702Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.7395999Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_catalog_versions'[0m[37m)[0m
2025-12-11T14:10:35.7407190Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_catalog_versions'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7419520Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_catalog_versions'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7439716Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_catalog_versions'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.7520489Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_catalog_versions_catalog"[0m [94mON[0m [37m"report_catalog_versions"[0m [37m([0m[37m"catalog_id"[0m[37m)[0m 
2025-12-11T14:10:35.7534857Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_catalog_versions_version"[0m [94mON[0m [37m"report_catalog_versions"[0m [37m([0m[37m"version"[0m[37m)[0m 
2025-12-11T14:10:35.7548613Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_catalog_versions"[0m [94mADD CONSTRAINT[0m [37m"FK_c43418bafc1384a35d3c9d058e2"[0m [94mFOREIGN KEY[0m [37m([0m[37m"catalog_id"[0m[37m)[0m [94mREFERENCES[0m [37m"report_catalogs"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.7563059Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_catalog_versions"[0m [94mADD CONSTRAINT[0m [37m"FK_6b0e03e8610f0e509c6762fdae5"[0m [94mFOREIGN KEY[0m [37m([0m[37m"created_by_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.7576575Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000007,"CreateReportCatalogVersionsTable1762438000007"][0m
2025-12-11T14:10:35.7579686Z [4mMigration CreateReportCatalogVersionsTable1762438000007 has been executed successfully.[24m
2025-12-11T14:10:35.7583812Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_permissions'[0m
2025-12-11T14:10:35.7603091Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"report_permissions"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"catalog_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"user_id"[0m [37muuid[0m[37m,[0m [37m"role"[0m [94mvarchar[0m[37m([0m[32m50[0m[37m)[0m[37m,[0m [37m"can_view"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"can_generate"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"can_download"[0m [37mboolean[0m [94mNOT NULL[0m [94mDEFAULT[0m [94mtrue[0m[37m,[0m [37m"created_by_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"created_at"[0m [94mtimestamp[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mtimestamp[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_504660129fc88f7cd1e1c41814b"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7623984Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7627308Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7634827Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_permissions'[0m[37m)[0m
2025-12-11T14:10:35.7647055Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.7684796Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_permissions'[0m[37m)[0m
2025-12-11T14:10:35.7695643Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_permissions'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7708040Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_permissions'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7728192Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_permissions'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.7810986Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_permissions_catalog"[0m [94mON[0m [37m"report_permissions"[0m [37m([0m[37m"catalog_id"[0m[37m)[0m 
2025-12-11T14:10:35.7825737Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_permissions_user"[0m [94mON[0m [37m"report_permissions"[0m [37m([0m[37m"user_id"[0m[37m)[0m 
2025-12-11T14:10:35.7838494Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_permissions_role"[0m [94mON[0m [37m"report_permissions"[0m [37m([0m[37m"role"[0m[37m)[0m 
2025-12-11T14:10:35.7853151Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"idx_report_permissions_unique"[0m [94mON[0m [37m"report_permissions"[0m [37m([0m[37m"catalog_id"[0m[37m,[0m [37m"user_id"[0m[37m,[0m [37m"role"[0m[37m)[0m 
2025-12-11T14:10:35.7869570Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_permissions"[0m [94mADD CONSTRAINT[0m [37m"FK_c6436eda60fc9c8f3b8ac0d91dd"[0m [94mFOREIGN KEY[0m [37m([0m[37m"catalog_id"[0m[37m)[0m [94mREFERENCES[0m [37m"report_catalogs"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.7884579Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_permissions"[0m [94mADD CONSTRAINT[0m [37m"FK_5ae880d9cafd9ec24f2efe53f8d"[0m [94mFOREIGN KEY[0m [37m([0m[37m"user_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.7898144Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_permissions"[0m [94mADD CONSTRAINT[0m [37m"FK_2ed759a730b31f8ba64178abe51"[0m [94mFOREIGN KEY[0m [37m([0m[37m"created_by_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [37mRESTRICT[0m
2025-12-11T14:10:35.7912440Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000008,"CreateReportPermissionsTable1762438000008"][0m
2025-12-11T14:10:35.7915273Z [4mMigration CreateReportPermissionsTable1762438000008 has been executed successfully.[24m
2025-12-11T14:10:35.7918335Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_quotas'[0m
2025-12-11T14:10:35.7934484Z [90m[4mquery:[24m[39m [94mCREATE TABLE[0m [37m"report_quotas"[0m [37m([0m[37m"id"[0m [37muuid[0m [94mNOT NULL[0m [94mDEFAULT[0m [95muuid_generate_v4[0m[37m([0m[37m)[0m[37m,[0m [37m"user_id"[0m [37muuid[0m [94mNOT NULL[0m[37m,[0m [37m"limit"[0m [94minteger[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m100[0m[37m,[0m [37m"used"[0m [94minteger[0m [94mNOT NULL[0m [94mDEFAULT[0m [32m0[0m[37m,[0m [37m"period_start"[0m [37mdate[0m [94mNOT NULL[0m[37m,[0m [37m"period_end"[0m [37mdate[0m [94mNOT NULL[0m[37m,[0m [37m"period_type"[0m [94mvarchar[0m[37m([0m[32m20[0m[37m)[0m [94mNOT NULL[0m [94mDEFAULT[0m [37m'monthly'[0m[37m,[0m [37m"created_at"[0m [94mtimestamp[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [37m"updated_at"[0m [94mtimestamp[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m [94mCONSTRAINT[0m [37m"PK_ed6f9eeed094aa04fe22bb99baa"[0m [94mPRIMARY KEY[0m [37m([0m[37m"id"[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.7954650Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7958199Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.7964125Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_quotas'[0m[37m)[0m
2025-12-11T14:10:35.7975812Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.8010879Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'report_quotas'[0m[37m)[0m
2025-12-11T14:10:35.8030558Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_quotas'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8053915Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_quotas'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8090920Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'report_quotas'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.8165164Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_quotas_user"[0m [94mON[0m [37m"report_quotas"[0m [37m([0m[37m"user_id"[0m[37m)[0m 
2025-12-11T14:10:35.8180070Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_report_quotas_period"[0m [94mON[0m [37m"report_quotas"[0m [37m([0m[37m"period_start"[0m[37m,[0m [37m"period_end"[0m[37m)[0m 
2025-12-11T14:10:35.8198582Z [90m[4mquery:[24m[39m [94mCREATE UNIQUE INDEX[0m [37m"idx_report_quotas_unique"[0m [94mON[0m [37m"report_quotas"[0m [37m([0m[37m"user_id"[0m[37m,[0m [37m"period_start"[0m[37m,[0m [37m"period_end"[0m[37m)[0m 
2025-12-11T14:10:35.8214531Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"report_quotas"[0m [94mADD CONSTRAINT[0m [37m"FK_25a4534f7ce9b4b3ec62de3656d"[0m [94mFOREIGN KEY[0m [37m([0m[37m"user_id"[0m[37m)[0m [94mREFERENCES[0m [37m"users"[0m[37m([0m[37m"id"[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m
2025-12-11T14:10:35.8230192Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000009,"CreateReportQuotasTable1762438000009"][0m
2025-12-11T14:10:35.8232996Z [4mMigration CreateReportQuotasTable1762438000009 has been executed successfully.[24m
2025-12-11T14:10:35.8234505Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.8235246Z       [94mCREATE TABLE[0m [95mpatrimonio_localizacao_historico[0m [37m([0m
2025-12-11T14:10:35.8235947Z         [37mid[0m [37mUUID[0m [94mPRIMARY KEY[0m [94mDEFAULT[0m [95mgen_random_uuid[0m[37m([0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.8236752Z         [37mpatrimonio_id[0m [37mUUID[0m [94mNOT NULL[0m[37m,[0m
2025-12-11T14:10:35.8237311Z         [37mlocalizacao_anterior[0m [94mVARCHAR[0m[37m([0m[32m255[0m[37m)[0m[37m,[0m
2025-12-11T14:10:35.8237942Z         [37mlocalizacao_nova[0m [94mVARCHAR[0m[37m([0m[32m255[0m[37m)[0m [94mNOT NULL[0m[37m,[0m
2025-12-11T14:10:35.8238656Z         [37mdata_mudanca[0m [94mTIMESTAMP[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m
2025-12-11T14:10:35.8239163Z         [37musuario_id[0m [37mUUID[0m[37m,[0m
2025-12-11T14:10:35.8239512Z         [37mobservacoes[0m [94mTEXT[0m[37m,[0m
2025-12-11T14:10:35.8240196Z         [37mcreated_at[0m [94mTIMESTAMP[0m [94mNOT NULL[0m [94mDEFAULT[0m [37mCURRENT_TIMESTAMP[0m[37m,[0m
2025-12-11T14:10:35.8241186Z         [94mFOREIGN KEY[0m [37m([0m[37mpatrimonio_id[0m[37m)[0m [94mREFERENCES[0m [95mpatrimonios[0m[37m([0m[37mid[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mCASCADE[0m[37m,[0m
2025-12-11T14:10:35.8242610Z         [94mFOREIGN KEY[0m [37m([0m[37musuario_id[0m[37m)[0m [94mREFERENCES[0m [95musers[0m[37m([0m[37mid[0m[37m)[0m [94mON[0m [94mDELETE[0m [94mSET[0m [94mNULL[0m
2025-12-11T14:10:35.8243162Z       [37m)[0m[37m;[0m
2025-12-11T14:10:35.8243359Z     
2025-12-11T14:10:35.8284254Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.8285021Z       [94mCREATE INDEX[0m [37midx_patrimonio_localizacao_historico_patrimonio_id[0m 
2025-12-11T14:10:35.8285725Z         [94mON[0m [95mpatrimonio_localizacao_historico[0m[37m([0m[37mpatrimonio_id[0m[37m)[0m[37m;[0m
2025-12-11T14:10:35.8286122Z     
2025-12-11T14:10:35.8297313Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.8298168Z       [94mCREATE INDEX[0m [37midx_patrimonio_localizacao_historico_data_mudanca[0m 
2025-12-11T14:10:35.8299503Z         [94mON[0m [95mpatrimonio_localizacao_historico[0m[37m([0m[37mdata_mudanca[0m [94mDESC[0m[37m)[0m[37m;[0m
2025-12-11T14:10:35.8300283Z     
2025-12-11T14:10:35.8318989Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000010,"CreatePatrimonioLocalizacaoHistoricoTable1762438000010"][0m
2025-12-11T14:10:35.8321607Z [4mMigration CreatePatrimonioLocalizacaoHistoricoTable1762438000010 has been executed successfully.[24m
2025-12-11T14:10:35.8323341Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.8326689Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.8332642Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m
2025-12-11T14:10:35.8344020Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.8378800Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m
2025-12-11T14:10:35.8389611Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8401998Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8422125Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.8537617Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.8541063Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.8548977Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m
2025-12-11T14:10:35.8560942Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.8601960Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m
2025-12-11T14:10:35.8621568Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8645296Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8682382Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.8781053Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"patrimonios"[0m [94mADD[0m [37m"categoria_id"[0m [37muuid[0m
2025-12-11T14:10:35.8789456Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.8792490Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.8798264Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m
2025-12-11T14:10:35.8809607Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.8844710Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m
2025-12-11T14:10:35.8855458Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8868138Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.8888155Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'patrimonios'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.8996177Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"idx_patrimonios_categoria_id"[0m [94mON[0m [37m"patrimonios"[0m [37m([0m[37m"categoria_id"[0m[37m)[0m 
2025-12-11T14:10:35.9015150Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762438000100,"AddCategoriaIdToPatrimonios1762438000100"][0m
2025-12-11T14:10:35.9017640Z [4mMigration AddCategoriaIdToPatrimonios1762438000100 has been executed successfully.[24m
2025-12-11T14:10:35.9018338Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.9018809Z       [94mUPDATE[0m [37musers[0m 
2025-12-11T14:10:35.9019472Z       [94mSET[0m [37mrole[0m [37m=[0m [37m'MANAGER'[0m 
2025-12-11T14:10:35.9020268Z       [94mWHERE[0m [37mrole[0m [37m=[0m [37m'TEACHER'[0m
2025-12-11T14:10:35.9020759Z     
2025-12-11T14:10:35.9025091Z [90m[4mquery:[24m[39m 
2025-12-11T14:10:35.9025598Z       [94mUPDATE[0m [37musers[0m 
2025-12-11T14:10:35.9026573Z       [94mSET[0m [37mrole[0m [37m=[0m [37m'OPERATOR'[0m 
2025-12-11T14:10:35.9027189Z       [94mWHERE[0m [37mrole[0m [37m=[0m [37m'STUDENT'[0m
2025-12-11T14:10:35.9027589Z     
2025-12-11T14:10:35.9031139Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762440000000,"UpdateUserRoles1762440000000"][0m
2025-12-11T14:10:35.9034149Z [4mMigration UpdateUserRoles1762440000000 has been executed successfully.[24m
2025-12-11T14:10:35.9035665Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_schema[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.9039973Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m*[0m [94mFROM[0m [95mcurrent_database[0m[37m([0m[37m)[0m
2025-12-11T14:10:35.9048369Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"table_schema"[0m[37m,[0m [37m"table_name"[0m[37m,[0m [95mobj_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"table_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"table_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m,[0m [37m'pg_class'[0m[37m)[0m [94mAS[0m [37mtable_comment[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"tables"[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m
2025-12-11T14:10:35.9060791Z [90m[4mquery:[24m[39m [94mSELECT[0m [94mTRUE[0m [94mFROM[0m [37minformation_schema[0m[37m.[0m[37mcolumns[0m [94mWHERE[0m [37mtable_name[0m [37m=[0m [37m'pg_class'[0m [94mand[0m [37mcolumn_name[0m [37m=[0m [37m'relispartition'[0m
2025-12-11T14:10:35.9101232Z [90m[4mquery:[24m[39m [94mSELECT[0m [37mcolumns[0m[37m.[0m[37m*[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mcol_description[0m[37m([0m[37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37mtable_catalog[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_schema[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37mtable_name[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37mregclass[0m[37m:[0m[37m:[0m[37moid[0m[37m,[0m [37mordinal_position[0m[37m)[0m [94mAS[0m [37mdescription[0m[37m,[0m [37m([0m[37m'"'[0m [37m|[0m[37m|[0m [37m"udt_schema"[0m [37m|[0m[37m|[0m [37m'"."'[0m [37m|[0m[37m|[0m [37m"udt_name"[0m [37m|[0m[37m|[0m [37m'"'[0m[37m)[0m[37m:[0m[37m:[0m[37m"regtype"[0m[37m:[0m[37m:[0m[94mtext[0m [94mAS[0m [37m"regtype"[0m[37m,[0m [37mpg_catalog[0m[37m.[0m[95mformat_type[0m[37m([0m[37m"col_attr"[0m[37m.[0m[37m"atttypid"[0m[37m,[0m [37m"col_attr"[0m[37m.[0m[37m"atttypmod"[0m[37m)[0m [94mAS[0m [37m"format_type"[0m [94mFROM[0m [37m"information_schema"[0m[37m.[0m[37m"columns"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_attribute"[0m [94mAS[0m [37m"col_attr"[0m [94mON[0m [37m"col_attr"[0m[37m.[0m[37m"attname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"column_name"[0m [94mAND[0m [37m"col_attr"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m([0m [94mSELECT[0m [37m"cls"[0m[37m.[0m[37m"oid"[0m [94mFROM[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_class"[0m [94mAS[0m [37m"cls"[0m [94mLEFT JOIN[0m [37m"pg_catalog"[0m[37m.[0m[37m"pg_namespace"[0m [94mAS[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cls"[0m[37m.[0m[37m"relnamespace"[0m [94mWHERE[0m [37m"cls"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_name"[0m [94mAND[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m"columns"[0m[37m.[0m[37m"table_schema"[0m [37m)[0m [94mWHERE[0m [37m([0m[37m"table_schema"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"table_name"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m
2025-12-11T14:10:35.9121028Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [95mpg_get_constraintdef[0m[37m([0m[37m"cnst"[0m[37m.[0m[37m"oid"[0m[37m)[0m [94mAS[0m [37m"expression"[0m[37m,[0m [94mCASE[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mWHEN[0m [37m'p'[0m [94mTHEN[0m [37m'PRIMARY'[0m [94mWHEN[0m [37m'u'[0m [94mTHEN[0m [37m'UNIQUE'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CHECK'[0m [94mWHEN[0m [37m'x'[0m [94mTHEN[0m [37m'EXCLUDE'[0m [94mEND[0m [94mAS[0m [37m"constraint_type"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m [94mFROM[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"t"[0m [94mON[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"connamespace"[0m [94mLEFT JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"cnst"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"cnst"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.9144553Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"a"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [94mCASE[0m [37m"ix"[0m[37m.[0m[37m"indisunique"[0m [94mWHEN[0m [37m't'[0m [94mTHEN[0m [37m'TRUE'[0m [94mELSE[0m[37m'FALSE'[0m [94mEND[0m [94mAS[0m [37m"is_unique"[0m[37m,[0m [95mpg_get_expr[0m[37m([0m[37m"ix"[0m[37m.[0m[37m"indpred"[0m[37m,[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m[37m)[0m [94mAS[0m [37m"condition"[0m[37m,[0m [37m"types"[0m[37m.[0m[37m"typname"[0m [94mAS[0m [37m"type_name"[0m[37m,[0m [37m"am"[0m[37m.[0m[37m"amname"[0m [94mAS[0m [37m"index_type"[0m [94mFROM[0m [37m"pg_class"[0m [37m"t"[0m [94mINNER JOIN[0m [37m"pg_index"[0m [37m"ix"[0m [94mON[0m [37m"ix"[0m[37m.[0m[37m"indrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"a"[0m [94mON[0m [37m"a"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"oid"[0m  [94mAND[0m [37m"a"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [94mANY[0m [37m([0m[37m"ix"[0m[37m.[0m[37m"indkey"[0m[37m)[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"t"[0m[37m.[0m[37m"relnamespace"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"i"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"ix"[0m[37m.[0m[37m"indexrelid"[0m [94mINNER JOIN[0m [37m"pg_type"[0m [37m"types"[0m [94mON[0m [37m"types"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"a"[0m[37m.[0m[37m"atttypid"[0m [94mINNER JOIN[0m [37m"pg_am"[0m [37m"am"[0m [94mON[0m [37m"i"[0m[37m.[0m[37m"relam"[0m [37m=[0m [37m"am"[0m[37m.[0m[37m"oid"[0m [94mLEFT JOIN[0m [37m"pg_constraint"[0m [37m"cnst"[0m [94mON[0m [37m"cnst"[0m[37m.[0m[37m"conname"[0m [37m=[0m [37m"i"[0m[37m.[0m[37m"relname"[0m [94mWHERE[0m [37m"t"[0m[37m.[0m[37m"relkind"[0m [94mIN[0m [37m([0m[37m'r'[0m[37m,[0m [37m'p'[0m[37m)[0m [94mAND[0m [37m"cnst"[0m[37m.[0m[37m"contype"[0m [94mIS NULL[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"t"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m[37m)[0m
2025-12-11T14:10:35.9181640Z [90m[4mquery:[24m[39m [94mSELECT[0m [37m"con"[0m[37m.[0m[37m"conname"[0m [94mAS[0m [37m"constraint_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"table_schema"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"table_name"[0m[37m,[0m [37m"att2"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"column_name"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m [94mAS[0m [37m"referenced_table_schema"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [94mAS[0m [37m"referenced_table_name"[0m[37m,[0m [37m"att"[0m[37m.[0m[37m"attname"[0m [94mAS[0m [37m"referenced_column_name"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confdeltype"[0m [94mAS[0m [37m"on_delete"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"confupdtype"[0m [94mAS[0m [37m"on_update"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferrable"[0m [94mAS[0m [37m"deferrable"[0m[37m,[0m [37m"con"[0m[37m.[0m[37m"condeferred"[0m [94mAS[0m [37m"deferred"[0m [94mFROM[0m [37m([0m [94mSELECT[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"conkey"[0m[37m)[0m [94mAS[0m [37m"parent"[0m[37m,[0m [95mUNNEST[0m [37m([0m[37m"con1"[0m[37m.[0m[37m"confkey"[0m[37m)[0m [94mAS[0m [37m"child"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"confrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"conname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m[37m,[0m [37m"ns"[0m[37m.[0m[37m"nspname"[0m[37m,[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m[37m,[0m [37m"con1"[0m[37m.[0m[37m"condeferrable"[0m[37m,[0m [94mCASE[0m [94mWHEN[0m [37m"con1"[0m[37m.[0m[37m"condeferred"[0m [94mTHEN[0m [37m'INITIALLY DEFERRED'[0m [94mELSE[0m [37m'INITIALLY IMMEDIATE'[0m [94mEND[0m [94mas[0m [37mcondeferred[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confdeltype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confdeltype"[0m[37m,[0m [94mCASE[0m [37m"con1"[0m[37m.[0m[37m"confupdtype"[0m [94mWHEN[0m [37m'a'[0m [94mTHEN[0m [37m'NO ACTION'[0m [94mWHEN[0m [37m'r'[0m [94mTHEN[0m [37m'RESTRICT'[0m [94mWHEN[0m [37m'c'[0m [94mTHEN[0m [37m'CASCADE'[0m [94mWHEN[0m [37m'n'[0m [94mTHEN[0m [37m'SET NULL'[0m [94mWHEN[0m [37m'd'[0m [94mTHEN[0m [37m'SET DEFAULT'[0m [94mEND[0m [94mas[0m [37m"confupdtype"[0m [94mFROM[0m [37m"pg_class"[0m [37m"cl"[0m [94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_constraint"[0m [37m"con1"[0m [94mON[0m [37m"con1"[0m[37m.[0m[37m"conrelid"[0m [37m=[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [94mWHERE[0m [37m"con1"[0m[37m.[0m[37m"contype"[0m [37m=[0m [37m'f'[0m [94mAND[0m [37m([0m[37m([0m[37m"ns"[0m[37m.[0m[37m"nspname"[0m [37m=[0m [37m'public'[0m [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relname"[0m [37m=[0m [37m'auth_refresh_tokens'[0m[37m)[0m[37m)[0m [37m)[0m [37m"con"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att"[0m [94mON[0m [37m"att"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m [94mAND[0m [37m"att"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"child"[0m [94mINNER JOIN[0m [37m"pg_class"[0m [37m"cl"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"oid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"confrelid"[0m  [94mAND[0m [37m"cl"[0m[37m.[0m[37m"relispartition"[0m [37m=[0m [37m'f'[0m[94mINNER JOIN[0m [37m"pg_namespace"[0m [37m"ns"[0m [94mON[0m [37m"cl"[0m[37m.[0m[37m"relnamespace"[0m [37m=[0m [37m"ns"[0m[37m.[0m[37m"oid"[0m [94mINNER JOIN[0m [37m"pg_attribute"[0m [37m"att2"[0m [94mON[0m [37m"att2"[0m[37m.[0m[37m"attrelid"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"conrelid"[0m [94mAND[0m [37m"att2"[0m[37m.[0m[37m"attnum"[0m [37m=[0m [37m"con"[0m[37m.[0m[37m"parent"[0m
2025-12-11T14:10:35.9258110Z [90m[4mquery:[24m[39m [94mALTER TABLE[0m [37m"auth_refresh_tokens"[0m [94mADD[0m [37m"lookup_key"[0m [94mvarchar[0m[37m([0m[32m64[0m[37m)[0m
2025-12-11T14:10:35.9263499Z [90m[4mquery:[24m[39m [37mCOMMENT[0m [94mON[0m [94mCOLUMN[0m [37m"auth_refresh_tokens"[0m[37m.[0m[37m"lookup_key"[0m [94mIS[0m [37m'Hash rápido (SHA256) para lookup eficiente de tokens'[0m
2025-12-11T14:10:35.9269321Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"IDX_refresh_lookup_key"[0m [94mON[0m [37m"auth_refresh_tokens"[0m [37m([0m[37m"lookup_key"[0m[37m)[0m 
2025-12-11T14:10:35.9284374Z [90m[4mquery:[24m[39m [94mCREATE INDEX[0m [37m"IDX_refresh_lookup_revoked_expires"[0m [94mON[0m [37m"auth_refresh_tokens"[0m [37m([0m[37m"lookup_key"[0m[37m,[0m [37m"revoked_at"[0m[37m,[0m [37m"expires_at"[0m[37m)[0m 
2025-12-11T14:10:35.9298732Z [90m[4mquery:[24m[39m [94mINSERT INTO[0m [37m"migrations"[0m[37m([0m[37m"timestamp"[0m[37m,[0m [37m"name"[0m[37m)[0m [94mVALUES[0m [37m([0m[37m$[0m[32m1[0m[37m,[0m [37m$[0m[32m2[0m[37m)[0m [90m-- PARAMETERS: [1762727000000,"AddLookupKeyToRefreshTokens1762727000000"][0m
2025-12-11T14:10:35.9302401Z [4mMigration AddLookupKeyToRefreshTokens1762727000000 has been executed successfully.[24m
2025-12-11T14:10:35.9303710Z [90m[4mquery:[24m[39m [94mCOMMIT[0m
2025-12-11T14:10:36.0059739Z ##[group]Run npm run test:e2e
2025-12-11T14:10:36.0060148Z [36;1mnpm run test:e2e[0m
2025-12-11T14:10:36.0093301Z shell: /usr/bin/bash -e {0}
2025-12-11T14:10:36.0093526Z env:
2025-12-11T14:10:36.0093682Z   NODE_ENV: test
2025-12-11T14:10:36.0093859Z   DB_HOST: localhost
2025-12-11T14:10:36.0094041Z   DB_PORT: 5432
2025-12-11T14:10:36.0094210Z   DB_USER: postgres
2025-12-11T14:10:36.0094389Z   DB_PASS: postgres
2025-12-11T14:10:36.0094574Z   DB_NAME: patrimonio_inventario_test
2025-12-11T14:10:36.0094818Z   REDIS_HOST: localhost
2025-12-11T14:10:36.0094997Z   REDIS_PORT: 6379
2025-12-11T14:10:36.0095167Z   REDIS_DB: 0
2025-12-11T14:10:36.0095337Z   JWT_ACCESS_SECRET: test_secret
2025-12-11T14:10:36.0095570Z   JWT_REFRESH_SECRET: test_refresh_secret
2025-12-11T14:10:36.0095805Z ##[endgroup]
2025-12-11T14:10:36.1173522Z 
2025-12-11T14:10:36.1174087Z > patrimonio_inventario@0.0.1 pretest:e2e
2025-12-11T14:10:36.1174493Z > node scripts/prepare-ci.js
2025-12-11T14:10:36.1174662Z 
2025-12-11T14:10:36.1790862Z 🚀 Preparando arquivos de imagem dummy para testes E2E...
2025-12-11T14:10:36.1797553Z ℹ️  Arquivo já existe: foto_para_teste.jpg
2025-12-11T14:10:36.1798206Z ℹ️  Arquivo já existe: foto_para_teste.png
2025-12-11T14:10:36.1798839Z ℹ️  Arquivo já existe: foto_para_teste.webp
2025-12-11T14:10:36.1799465Z 🎉 Preparação de arquivos dummy concluída!
2025-12-11T14:10:36.1800455Z 📁 Arquivos criados em: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test-temp
2025-12-11T14:10:36.2011272Z ℹ️  Banco já existe: patrimonio_inventario_test
2025-12-11T14:10:36.2083768Z 
2025-12-11T14:10:36.2084112Z > patrimonio_inventario@0.0.1 test:e2e
2025-12-11T14:10:36.2084512Z > jest --config ./test/jest-e2e.json
2025-12-11T14:10:36.2084695Z 
2025-12-11T14:11:08.4802685Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.4805570Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.4807664Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.4809745Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.4813024Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.4816080Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.4818975Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.4822209Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.4825596Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.4827221Z   parameters: [
2025-12-11T14:11:08.4828134Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.4828677Z     [32m'aberta'[39m,
2025-12-11T14:11:08.4829291Z     [32m'Manutenção preventiva do ar condicionado'[39m,
2025-12-11T14:11:08.4830115Z     [32m'Limpeza e verificação do sistema de ar condicionado'[39m,
2025-12-11T14:11:08.4830726Z     [32m'media'[39m,
2025-12-11T14:11:08.4831183Z     [35m2025-12-11T14:11:08.420Z[39m,
2025-12-11T14:11:08.4831981Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.4832412Z   ],
2025-12-11T14:11:08.4833268Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.4835288Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.4837185Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.4839385Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.4842499Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.4845529Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.4848459Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.4851385Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.4854708Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.4856283Z     length: [33m314[39m,
2025-12-11T14:11:08.4856741Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.4857182Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.4858129Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.4858953Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.4859439Z     position: [90mundefined[39m,
2025-12-11T14:11:08.4859986Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.4860542Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.4861066Z     where: [90mundefined[39m,
2025-12-11T14:11:08.4861537Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.4862173Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.4862674Z     column: [90mundefined[39m,
2025-12-11T14:11:08.4863161Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.4863782Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.4864382Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.4864830Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.4865328Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.4865736Z   },
2025-12-11T14:11:08.4866054Z   length: [33m314[39m,
2025-12-11T14:11:08.4866494Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.4866908Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.4867828Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.4868637Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.4869384Z   position: [90mundefined[39m,
2025-12-11T14:11:08.4869933Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.4870492Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.4870965Z   where: [90mundefined[39m,
2025-12-11T14:11:08.4871395Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.4872021Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.4872516Z   column: [90mundefined[39m,
2025-12-11T14:11:08.4872996Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.4873590Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.4874173Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.4874613Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.4875089Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.4875500Z }
2025-12-11T14:11:08.5149533Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5160408Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.5163099Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5165865Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5175452Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5178349Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5181156Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.5184470Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.5187849Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.5189460Z   parameters: [
2025-12-11T14:11:08.5190055Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.5190645Z     [32m'aberta'[39m,
2025-12-11T14:11:08.5191349Z     [32m'Manutenção preventiva - MANAGER 1765462268496'[39m,
2025-12-11T14:11:08.5192286Z     [32m'Limpeza e verificação do sistema'[39m,
2025-12-11T14:11:08.5192769Z     [32m'alta'[39m,
2025-12-11T14:11:08.5193250Z     [35m2025-12-11T14:11:08.506Z[39m,
2025-12-11T14:11:08.5193857Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.5194276Z   ],
2025-12-11T14:11:08.5195127Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5197120Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.5198845Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5201536Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.5204784Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5207810Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5210695Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5214186Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.5217254Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.5218854Z     length: [33m314[39m,
2025-12-11T14:11:08.5219299Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.5219693Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.5220647Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.5221537Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.5222417Z     position: [90mundefined[39m,
2025-12-11T14:11:08.5222983Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.5223596Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.5224150Z     where: [90mundefined[39m,
2025-12-11T14:11:08.5224651Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.5225144Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.5225645Z     column: [90mundefined[39m,
2025-12-11T14:11:08.5226144Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.5226731Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.5227314Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.5227774Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.5228262Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.5228685Z   },
2025-12-11T14:11:08.5229025Z   length: [33m314[39m,
2025-12-11T14:11:08.5229483Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.5229936Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.5230850Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.5231668Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.5232415Z   position: [90mundefined[39m,
2025-12-11T14:11:08.5232943Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.5233511Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.5233991Z   where: [90mundefined[39m,
2025-12-11T14:11:08.5234417Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.5234886Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.5235347Z   column: [90mundefined[39m,
2025-12-11T14:11:08.5235802Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.5236408Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.5236991Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.5237434Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.5237926Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.5238323Z }
2025-12-11T14:11:08.5385848Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5389131Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.5391215Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5393875Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5396941Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5399963Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5403297Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.5406434Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.5409842Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.5411607Z   parameters: [
2025-12-11T14:11:08.5412428Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.5412940Z     [32m'aberta'[39m,
2025-12-11T14:11:08.5413463Z     [32m'OS Teste Status 1765462268517'[39m,
2025-12-11T14:11:08.5413978Z     [32m'media'[39m,
2025-12-11T14:11:08.5414464Z     [35m2025-12-11T14:11:08.531Z[39m,
2025-12-11T14:11:08.5415094Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.5415536Z   ],
2025-12-11T14:11:08.5416400Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5418488Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.5420257Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5422774Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.5442611Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5445525Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5448490Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5451395Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.5455023Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.5456593Z     length: [33m314[39m,
2025-12-11T14:11:08.5457077Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.5457521Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.5458497Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.5459344Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.5459828Z     position: [90mundefined[39m,
2025-12-11T14:11:08.5460418Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.5460969Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.5461475Z     where: [90mundefined[39m,
2025-12-11T14:11:08.5462120Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.5462861Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.5463381Z     column: [90mundefined[39m,
2025-12-11T14:11:08.5463893Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.5464513Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.5465121Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.5465589Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.5466084Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.5466489Z   },
2025-12-11T14:11:08.5466810Z   length: [33m314[39m,
2025-12-11T14:11:08.5467257Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.5467668Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.5468597Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.5469406Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.5469880Z   position: [90mundefined[39m,
2025-12-11T14:11:08.5470404Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.5470991Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.5487538Z   where: [90mundefined[39m,
2025-12-11T14:11:08.5488046Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.5488546Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.5489031Z   column: [90mundefined[39m,
2025-12-11T14:11:08.5489508Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.5490147Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.5490751Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.5491210Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.5491713Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.5492340Z }
2025-12-11T14:11:08.5621272Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5628998Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.5632472Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5634532Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5637378Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5640133Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5643116Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.5646029Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.5649260Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.5650839Z   parameters: [
2025-12-11T14:11:08.5651340Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.5651969Z     [32m'aberta'[39m,
2025-12-11T14:11:08.5652626Z     [32m'OS Teste Workflow'[39m,
2025-12-11T14:11:08.5653053Z     [32m'media'[39m,
2025-12-11T14:11:08.5653485Z     [35m2025-12-11T14:11:08.554Z[39m,
2025-12-11T14:11:08.5654026Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.5654419Z   ],
2025-12-11T14:11:08.5655215Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5657112Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.5658654Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5660707Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.5697918Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5701117Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5704286Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5707218Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.5710351Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.5712224Z     length: [33m314[39m,
2025-12-11T14:11:08.5712756Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.5713222Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.5714127Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.5714977Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.5715483Z     position: [90mundefined[39m,
2025-12-11T14:11:08.5716062Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.5716644Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.5717195Z     where: [90mundefined[39m,
2025-12-11T14:11:08.5717687Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.5718155Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.5718656Z     column: [90mundefined[39m,
2025-12-11T14:11:08.5719202Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.5719825Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.5720451Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.5721320Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.5726295Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.5726763Z   },
2025-12-11T14:11:08.5727159Z   length: [33m314[39m,
2025-12-11T14:11:08.5727635Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.5728117Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.5729097Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.5729953Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.5730488Z   position: [90mundefined[39m,
2025-12-11T14:11:08.5731051Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.5731643Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.5732483Z   where: [90mundefined[39m,
2025-12-11T14:11:08.5732940Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.5733786Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.5734318Z   column: [90mundefined[39m,
2025-12-11T14:11:08.5734843Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.5735506Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.5736150Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.5736618Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.5737061Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.5737471Z }
2025-12-11T14:11:08.5876265Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5879127Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.5928171Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5930563Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5933606Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5936351Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5939072Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.5942246Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.5945562Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.5947186Z   parameters: [
2025-12-11T14:11:08.5947787Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.5948309Z     [32m'aberta'[39m,
2025-12-11T14:11:08.5948791Z     [32m'OS Teste Listagem 1'[39m,
2025-12-11T14:11:08.5949254Z     [32m'alta'[39m,
2025-12-11T14:11:08.5949736Z     [35m2025-12-11T14:11:08.581Z[39m,
2025-12-11T14:11:08.5950374Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.5950813Z   ],
2025-12-11T14:11:08.5952359Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.5954333Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.5955979Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.5958194Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.5961132Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.5964739Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.5967512Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.5970278Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6004040Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6005863Z     length: [33m314[39m,
2025-12-11T14:11:08.6006268Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6006646Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.6007655Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6008543Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.6009050Z     position: [90mundefined[39m,
2025-12-11T14:11:08.6009650Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6010247Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6010806Z     where: [90mundefined[39m,
2025-12-11T14:11:08.6011328Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.6012079Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6012573Z     column: [90mundefined[39m,
2025-12-11T14:11:08.6013050Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.6013643Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6014223Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6014673Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.6015141Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6018991Z   },
2025-12-11T14:11:08.6019393Z   length: [33m314[39m,
2025-12-11T14:11:08.6019832Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6020240Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.6021142Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6022181Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.6022659Z   position: [90mundefined[39m,
2025-12-11T14:11:08.6023162Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6023687Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6024138Z   where: [90mundefined[39m,
2025-12-11T14:11:08.6024540Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.6025025Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6025573Z   column: [90mundefined[39m,
2025-12-11T14:11:08.6026089Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.6026771Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6027430Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6028277Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.6028833Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6029276Z }
2025-12-11T14:11:08.6121096Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6124061Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.6126038Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6128207Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6131711Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6134825Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6137753Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6140892Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6172684Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.6174283Z   parameters: [
2025-12-11T14:11:08.6174864Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.6175377Z     [32m'aberta'[39m,
2025-12-11T14:11:08.6175895Z     [32m'OS Teste Status 1765462268589'[39m,
2025-12-11T14:11:08.6176417Z     [32m'media'[39m,
2025-12-11T14:11:08.6176918Z     [35m2025-12-11T14:11:08.599Z[39m,
2025-12-11T14:11:08.6177556Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.6177983Z   ],
2025-12-11T14:11:08.6178826Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6180808Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.6183914Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6186718Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.6189659Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6193109Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6198094Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6229514Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6232595Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6234078Z     length: [33m314[39m,
2025-12-11T14:11:08.6234524Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6234940Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.6236167Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6236962Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.6237430Z     position: [90mundefined[39m,
2025-12-11T14:11:08.6237949Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6238494Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6238979Z     where: [90mundefined[39m,
2025-12-11T14:11:08.6239421Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.6239870Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6240332Z     column: [90mundefined[39m,
2025-12-11T14:11:08.6240795Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.6241385Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6242094Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6242526Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.6242994Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6243375Z   },
2025-12-11T14:11:08.6243696Z   length: [33m314[39m,
2025-12-11T14:11:08.6244099Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6244493Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.6245376Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6246120Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.6246565Z   position: [90mundefined[39m,
2025-12-11T14:11:08.6247051Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6247571Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6248013Z   where: [90mundefined[39m,
2025-12-11T14:11:08.6248414Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.6248862Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6249313Z   column: [90mundefined[39m,
2025-12-11T14:11:08.6249754Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.6250347Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6250894Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6251312Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.6257821Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6258325Z }
2025-12-11T14:11:08.6323486Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6327292Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.6329192Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6331214Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6334632Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6337395Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6340122Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6343108Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6346349Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.6348139Z   parameters: [
2025-12-11T14:11:08.6348637Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.6349117Z     [32m'aberta'[39m,
2025-12-11T14:11:08.6349589Z     [32m'OS Teste Prioridade 1765462268606'[39m,
2025-12-11T14:11:08.6350046Z     [32m'alta'[39m,
2025-12-11T14:11:08.6350479Z     [35m2025-12-11T14:11:08.625Z[39m,
2025-12-11T14:11:08.6351013Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.6351396Z   ],
2025-12-11T14:11:08.6352339Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6354229Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.6355769Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6357808Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.6360561Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6363534Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6366263Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6368992Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6372165Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6373636Z     length: [33m314[39m,
2025-12-11T14:11:08.6374070Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6374471Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.6375367Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6376155Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.6376614Z     position: [90mundefined[39m,
2025-12-11T14:11:08.6377127Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6377894Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6378418Z     where: [90mundefined[39m,
2025-12-11T14:11:08.6378869Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.6379323Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6379795Z     column: [90mundefined[39m,
2025-12-11T14:11:08.6380261Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.6380843Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6381400Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6382048Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.6382523Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6382904Z   },
2025-12-11T14:11:08.6383217Z   length: [33m314[39m,
2025-12-11T14:11:08.6383629Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6384024Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.6385101Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6386101Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.6386552Z   position: [90mundefined[39m,
2025-12-11T14:11:08.6387038Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6387553Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6387995Z   where: [90mundefined[39m,
2025-12-11T14:11:08.6388392Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.6388837Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6389294Z   column: [90mundefined[39m,
2025-12-11T14:11:08.6389743Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.6390310Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6390860Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6391277Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.6392022Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6392426Z }
2025-12-11T14:11:08.6584736Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6600515Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.6602970Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6605053Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6608173Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6611277Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6619032Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6622359Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6625748Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.6627399Z   parameters: [
2025-12-11T14:11:08.6628516Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.6629141Z     [32m'aberta'[39m,
2025-12-11T14:11:08.6629685Z     [32m'OS BuscaTeste1765462268645'[39m,
2025-12-11T14:11:08.6630233Z     [32m'Descrição de teste'[39m,
2025-12-11T14:11:08.6630652Z     [32m'media'[39m,
2025-12-11T14:11:08.6631114Z     [35m2025-12-11T14:11:08.653Z[39m,
2025-12-11T14:11:08.6631707Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.6632488Z   ],
2025-12-11T14:11:08.6633324Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6635313Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.6637337Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6639512Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.6643026Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6646085Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6649011Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6652209Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6655210Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6656837Z     length: [33m314[39m,
2025-12-11T14:11:08.6657336Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6657826Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.6658839Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6659772Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.6660333Z     position: [90mundefined[39m,
2025-12-11T14:11:08.6660991Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6661630Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6662462Z     where: [90mundefined[39m,
2025-12-11T14:11:08.6662957Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.6663458Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6663964Z     column: [90mundefined[39m,
2025-12-11T14:11:08.6664451Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.6665144Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6665778Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6666261Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.6666795Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6667197Z   },
2025-12-11T14:11:08.6667551Z   length: [33m314[39m,
2025-12-11T14:11:08.6668029Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6668469Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.6669389Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6670291Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.6670762Z   position: [90mundefined[39m,
2025-12-11T14:11:08.6671548Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6672343Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6672843Z   where: [90mundefined[39m,
2025-12-11T14:11:08.6673301Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.6673791Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6675762Z   column: [90mundefined[39m,
2025-12-11T14:11:08.6676362Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.6676986Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6677628Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6678117Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.6678628Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6679054Z }
2025-12-11T14:11:08.6751491Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6762315Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.6764449Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6766659Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6769764Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6773030Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6776089Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6779219Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6782986Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.6784747Z   parameters: [
2025-12-11T14:11:08.6785333Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.6785839Z     [32m'aberta'[39m,
2025-12-11T14:11:08.6786326Z     [32m'OS Ordenação 1'[39m,
2025-12-11T14:11:08.6786777Z     [32m'media'[39m,
2025-12-11T14:11:08.6787355Z     [35m2025-12-11T14:11:08.670Z[39m,
2025-12-11T14:11:08.6787959Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.6788386Z   ],
2025-12-11T14:11:08.6789260Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6791327Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.6793292Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6795487Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.6798934Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6836999Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6840060Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6843341Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6846851Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6848489Z     length: [33m314[39m,
2025-12-11T14:11:08.6848968Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6849437Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.6850442Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6851331Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.6852081Z     position: [90mundefined[39m,
2025-12-11T14:11:08.6852669Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6853268Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6853829Z     where: [90mundefined[39m,
2025-12-11T14:11:08.6854365Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.6854881Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6855407Z     column: [90mundefined[39m,
2025-12-11T14:11:08.6855932Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.6856611Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6857265Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6857761Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.6858307Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6858745Z   },
2025-12-11T14:11:08.6859135Z   length: [33m314[39m,
2025-12-11T14:11:08.6859645Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.6860124Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.6861130Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.6862212Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.6862646Z   position: [90mundefined[39m,
2025-12-11T14:11:08.6863195Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.6863815Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.6864335Z   where: [90mundefined[39m,
2025-12-11T14:11:08.6864842Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.6865369Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.6865930Z   column: [90mundefined[39m,
2025-12-11T14:11:08.6866479Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.6867151Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.6867821Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.6868284Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.6868794Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.6869232Z }
2025-12-11T14:11:08.6947450Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6957401Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.6961641Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6964657Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6966693Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6968314Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.6970115Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.6971959Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.6975707Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.6977400Z   parameters: [
2025-12-11T14:11:08.6977972Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.6978523Z     [32m'aberta'[39m,
2025-12-11T14:11:08.6979013Z     [32m'OS Paginação 0'[39m,
2025-12-11T14:11:08.6979491Z     [32m'media'[39m,
2025-12-11T14:11:08.6979989Z     [35m2025-12-11T14:11:08.689Z[39m,
2025-12-11T14:11:08.6980854Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.6981323Z   ],
2025-12-11T14:11:08.6982947Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.6985078Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.6986756Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.6988980Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.6992228Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.6995335Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.6999236Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.7003157Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.7006851Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.7009415Z     length: [33m314[39m,
2025-12-11T14:11:08.7010014Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.7010756Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.7011331Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.7012189Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.7013283Z     position: [90mundefined[39m,
2025-12-11T14:11:08.7013926Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.7014536Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.7015086Z     where: [90mundefined[39m,
2025-12-11T14:11:08.7015583Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.7016088Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.7016605Z     column: [90mundefined[39m,
2025-12-11T14:11:08.7017425Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.7018091Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.7018709Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.7019202Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.7019732Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.7020159Z   },
2025-12-11T14:11:08.7020503Z   length: [33m314[39m,
2025-12-11T14:11:08.7020957Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.7021402Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.7022605Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.7023456Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.7023948Z   position: [90mundefined[39m,
2025-12-11T14:11:08.7024476Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.7025024Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.7025493Z   where: [90mundefined[39m,
2025-12-11T14:11:08.7025935Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.7026405Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.7026890Z   column: [90mundefined[39m,
2025-12-11T14:11:08.7027369Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.7027973Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.7028564Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.7029000Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.7029477Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.7029883Z }
2025-12-11T14:11:08.7078872Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.7082747Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.7085389Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.7098844Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.7102238Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.7105288Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.7108276Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.7111943Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.7115473Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.7117225Z   parameters: [
2025-12-11T14:11:08.7117775Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.7118281Z     [32m'aberta'[39m,
2025-12-11T14:11:08.7118710Z     [32m'OS Teste Data'[39m,
2025-12-11T14:11:08.7119146Z     [32m'media'[39m,
2025-12-11T14:11:08.7119605Z     [35m2025-12-11T14:11:08.703Z[39m,
2025-12-11T14:11:08.7120553Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.7120996Z   ],
2025-12-11T14:11:08.7122053Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.7124176Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.7125945Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.7128196Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.7131216Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.7134957Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.7138442Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.7141447Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.7144945Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.7146668Z     length: [33m314[39m,
2025-12-11T14:11:08.7147194Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.7147696Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.7148766Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.7149693Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.7150229Z     position: [90mundefined[39m,
2025-12-11T14:11:08.7150805Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.7151427Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.7152218Z     where: [90mundefined[39m,
2025-12-11T14:11:08.7152709Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.7153219Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.7153743Z     column: [90mundefined[39m,
2025-12-11T14:11:08.7154253Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.7154899Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.7155788Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.7156670Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.7157235Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.7157888Z   },
2025-12-11T14:11:08.7158516Z   length: [33m314[39m,
2025-12-11T14:11:08.7159018Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.7159469Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.7160428Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.7161312Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.7162163Z   position: [90mundefined[39m,
2025-12-11T14:11:08.7162989Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.7163908Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.7164461Z   where: [90mundefined[39m,
2025-12-11T14:11:08.7164954Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.7165483Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.7167933Z   column: [90mundefined[39m,
2025-12-11T14:11:08.7168576Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.7169070Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.7169530Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.7169872Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.7170250Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.7170569Z }
2025-12-11T14:11:08.7214836Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.7217615Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.7219577Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.7221697Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.7225324Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.7228223Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.7231070Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.7234231Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.7237634Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.7239228Z   parameters: [
2025-12-11T14:11:08.7239732Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.7240218Z     [32m'aberta'[39m,
2025-12-11T14:11:08.7240714Z     [32m'OS Teste Apontamento 1765462268708'[39m,
2025-12-11T14:11:08.7241183Z     [32m'media'[39m,
2025-12-11T14:11:08.7241615Z     [35m2025-12-11T14:11:08.715Z[39m,
2025-12-11T14:11:08.7242301Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.7242715Z   ],
2025-12-11T14:11:08.7243539Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.7245777Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.7247388Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.7249523Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.7252528Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.7255472Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.7258527Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.7261371Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.7264528Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.7266048Z     length: [33m314[39m,
2025-12-11T14:11:08.7266492Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.7266913Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.7267836Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.7268645Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.7269116Z     position: [90mundefined[39m,
2025-12-11T14:11:08.7269634Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.7270181Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.7270675Z     where: [90mundefined[39m,
2025-12-11T14:11:08.7271119Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.7271581Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.7272327Z     column: [90mundefined[39m,
2025-12-11T14:11:08.7272821Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.7273427Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.7274007Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.7274440Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.7274930Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.7275322Z   },
2025-12-11T14:11:08.7275627Z   length: [33m314[39m,
2025-12-11T14:11:08.7276046Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.7276451Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.7277355Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.7278117Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.7278572Z   position: [90mundefined[39m,
2025-12-11T14:11:08.7279071Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.7279598Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.7280050Z   where: [90mundefined[39m,
2025-12-11T14:11:08.7280461Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.7280912Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.7281372Z   column: [90mundefined[39m,
2025-12-11T14:11:08.7281965Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.7282555Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.7283123Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.7283543Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.7284009Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.7284394Z }
2025-12-11T14:11:08.8937515Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.8943382Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.8952348Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.8954503Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.8957751Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.8960605Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.8963593Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.8966577Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.8969976Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.8971576Z   parameters: [
2025-12-11T14:11:08.8972213Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.8972708Z     [32m'aberta'[39m,
2025-12-11T14:11:08.8973168Z     [32m'OS Teste Parts 1765462268883'[39m,
2025-12-11T14:11:08.8973617Z     [32m'media'[39m,
2025-12-11T14:11:08.8974046Z     [35m2025-12-11T14:11:08.888Z[39m,
2025-12-11T14:11:08.8974587Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.8974981Z   ],
2025-12-11T14:11:08.8975808Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.8977765Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.8979370Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.8981501Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.8984676Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.8987628Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.8990678Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.8993699Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.8996677Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.8998240Z     length: [33m314[39m,
2025-12-11T14:11:08.8998684Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.8999112Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.9000030Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.9001038Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.9001517Z     position: [90mundefined[39m,
2025-12-11T14:11:08.9022655Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.9023269Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.9023793Z     where: [90mundefined[39m,
2025-12-11T14:11:08.9024268Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.9024736Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.9025222Z     column: [90mundefined[39m,
2025-12-11T14:11:08.9025704Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.9026322Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.9026896Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.9027339Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.9027827Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.9028219Z   },
2025-12-11T14:11:08.9028529Z   length: [33m314[39m,
2025-12-11T14:11:08.9028950Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.9029356Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.9030291Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.9031079Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.9031539Z   position: [90mundefined[39m,
2025-12-11T14:11:08.9032232Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.9032773Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.9033234Z   where: [90mundefined[39m,
2025-12-11T14:11:08.9033648Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.9034105Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.9034571Z   column: [90mundefined[39m,
2025-12-11T14:11:08.9035021Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.9035603Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.9036173Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.9036587Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.9037060Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.9037465Z }
2025-12-11T14:11:08.9094148Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.9097153Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.9099376Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.9101685Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.9104976Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.9109396Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.9112391Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.9115400Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.9162498Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.9164440Z   parameters: [
2025-12-11T14:11:08.9165024Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.9165527Z     [32m'aberta'[39m,
2025-12-11T14:11:08.9166028Z     [32m'OS Teste List Parts 1765462268894'[39m,
2025-12-11T14:11:08.9166506Z     [32m'media'[39m,
2025-12-11T14:11:08.9166936Z     [35m2025-12-11T14:11:08.902Z[39m,
2025-12-11T14:11:08.9167486Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.9167885Z   ],
2025-12-11T14:11:08.9168704Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.9170680Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.9172436Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.9174588Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.9243001Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.9246125Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.9249033Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.9252077Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.9255090Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.9256607Z     length: [33m314[39m,
2025-12-11T14:11:08.9257057Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.9257477Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.9258396Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.9259203Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.9292699Z     position: [90mundefined[39m,
2025-12-11T14:11:08.9293266Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.9293861Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.9294371Z     where: [90mundefined[39m,
2025-12-11T14:11:08.9295109Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.9295594Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.9296091Z     column: [90mundefined[39m,
2025-12-11T14:11:08.9296581Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.9297198Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.9297841Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.9298283Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.9298768Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.9299175Z   },
2025-12-11T14:11:08.9299483Z   length: [33m314[39m,
2025-12-11T14:11:08.9299914Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.9300325Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.9301241Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.9302372Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.9302845Z   position: [90mundefined[39m,
2025-12-11T14:11:08.9303355Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.9303903Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.9304357Z   where: [90mundefined[39m,
2025-12-11T14:11:08.9304776Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.9305236Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.9305698Z   column: [90mundefined[39m,
2025-12-11T14:11:08.9306159Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.9306745Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.9307314Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.9307738Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.9308197Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.9308601Z }
2025-12-11T14:11:08.9310465Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:08 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.9313472Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:08.9315445Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.9317580Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.9320576Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.9323589Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.9326428Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.9329380Z     at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.9332881Z   query: [32m'INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"'[39m,
2025-12-11T14:11:08.9334490Z   parameters: [
2025-12-11T14:11:08.9335000Z     [32m'13f8d055-e59e-48da-bea6-d8455900c559'[39m,
2025-12-11T14:11:08.9335474Z     [32m'aberta'[39m,
2025-12-11T14:11:08.9336173Z     [32m'OS Teste Delete Part 1765462268907'[39m,
2025-12-11T14:11:08.9336655Z     [32m'media'[39m,
2025-12-11T14:11:08.9337089Z     [35m2025-12-11T14:11:08.914Z[39m,
2025-12-11T14:11:08.9337626Z     [32m'00000000-0000-0000-0000-000000000001'[39m
2025-12-11T14:11:08.9338009Z   ],
2025-12-11T14:11:08.9338826Z   driverError: error: insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:11:08.9340801Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:08.9342541Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:08.9344675Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:08.9347726Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:08.9350666Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:08.9353638Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:08.9356475Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:08.9359459Z       at MaintenanceService.createWorkOrder [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/maintenance/maintenance.service.ts:77:19[90m)[39m {
2025-12-11T14:11:08.9360966Z     length: [33m314[39m,
2025-12-11T14:11:08.9374859Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.9375324Z     code: [32m'23503'[39m,
2025-12-11T14:11:08.9376283Z     detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.9377113Z     hint: [90mundefined[39m,
2025-12-11T14:11:08.9377585Z     position: [90mundefined[39m,
2025-12-11T14:11:08.9378116Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.9378685Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.9379178Z     where: [90mundefined[39m,
2025-12-11T14:11:08.9379665Z     schema: [32m'public'[39m,
2025-12-11T14:11:08.9380139Z     table: [32m'work_orders'[39m,
2025-12-11T14:11:08.9380619Z     column: [90mundefined[39m,
2025-12-11T14:11:08.9381114Z     dataType: [90mundefined[39m,
2025-12-11T14:11:08.9381719Z     constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.9382470Z     file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.9382926Z     line: [32m'2596'[39m,
2025-12-11T14:11:08.9383418Z     routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.9383822Z   },
2025-12-11T14:11:08.9384145Z   length: [33m314[39m,
2025-12-11T14:11:08.9384582Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:08.9385003Z   code: [32m'23503'[39m,
2025-12-11T14:11:08.9385886Z   detail: [32m'Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".'[39m,
2025-12-11T14:11:08.9386663Z   hint: [90mundefined[39m,
2025-12-11T14:11:08.9387157Z   position: [90mundefined[39m,
2025-12-11T14:11:08.9387707Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:08.9388299Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:08.9388784Z   where: [90mundefined[39m,
2025-12-11T14:11:08.9389465Z   schema: [32m'public'[39m,
2025-12-11T14:11:08.9389977Z   table: [32m'work_orders'[39m,
2025-12-11T14:11:08.9390472Z   column: [90mundefined[39m,
2025-12-11T14:11:08.9390964Z   dataType: [90mundefined[39m,
2025-12-11T14:11:08.9391579Z   constraint: [32m'FK_149398966336295f0423c28d726'[39m,
2025-12-11T14:11:08.9392512Z   file: [32m'ri_triggers.c'[39m,
2025-12-11T14:11:08.9392971Z   line: [32m'2596'[39m,
2025-12-11T14:11:08.9393486Z   routine: [32m'ri_ReportViolation'[39m
2025-12-11T14:11:08.9393898Z }
2025-12-11T14:11:10.7716725Z FAIL test/maintenance/maintenance.e2e-spec.ts (33.592 s)
2025-12-11T14:11:10.7809620Z   ● Console
2025-12-11T14:11:10.7809816Z 
2025-12-11T14:11:10.7810175Z     console.log
2025-12-11T14:11:10.7811364Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 📡 add observability to secrets: https://dotenvx.com/ops
2025-12-11T14:11:10.7812564Z 
2025-12-11T14:11:10.7812837Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:10.7813158Z 
2025-12-11T14:11:10.7813316Z     console.log
2025-12-11T14:11:10.7814165Z       [setupTestUsers] ✅ Porta detectada: 41131, USERS_API_URL: http://localhost:41131/v1
2025-12-11T14:11:10.7814706Z 
2025-12-11T14:11:10.7814987Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:10.7815337Z 
2025-12-11T14:11:10.7815459Z     console.log
2025-12-11T14:11:10.7816155Z       ✅ Patrimônio criado com sucesso: 13f8d055-e59e-48da-bea6-d8455900c559
2025-12-11T14:11:10.7816741Z 
2025-12-11T14:11:10.7817152Z       at createTestPatrimonio (maintenance/maintenance.e2e-spec.ts:1237:13)
2025-12-11T14:11:10.7817620Z 
2025-12-11T14:11:10.7817736Z     console.log
2025-12-11T14:11:10.7818177Z       ✅ Verificação pós-criação: {
2025-12-11T14:11:10.7818669Z         id: '13f8d055-e59e-48da-bea6-d8455900c559',
2025-12-11T14:11:10.7819143Z         codigo: 'TEST-MAINT-001',
2025-12-11T14:11:10.7819702Z         nome: 'Patrimônio Teste Manutenção'
2025-12-11T14:11:10.7820096Z       }
2025-12-11T14:11:10.7820246Z 
2025-12-11T14:11:10.7820648Z       at createTestPatrimonio (maintenance/maintenance.e2e-spec.ts:1249:13)
2025-12-11T14:11:10.7821122Z 
2025-12-11T14:11:10.7821340Z     console.log
2025-12-11T14:11:10.7822251Z       ✅ Patrimônio de teste criado/encontrado: 13f8d055-e59e-48da-bea6-d8455900c559
2025-12-11T14:11:10.7822739Z 
2025-12-11T14:11:10.7823085Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:65:13)
2025-12-11T14:11:10.7823510Z 
2025-12-11T14:11:10.7823623Z     console.log
2025-12-11T14:11:10.7824051Z       ✅ Verificação do patrimônio: [
2025-12-11T14:11:10.7824424Z         {
2025-12-11T14:11:10.7824796Z           id: '13f8d055-e59e-48da-bea6-d8455900c559',
2025-12-11T14:11:10.7825278Z           codigo: 'TEST-MAINT-001',
2025-12-11T14:11:10.7825821Z           nome: 'Patrimônio Teste Manutenção'
2025-12-11T14:11:10.7826226Z         }
2025-12-11T14:11:10.7826489Z       ]
2025-12-11T14:11:10.7826641Z 
2025-12-11T14:11:10.7826988Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:72:13)
2025-12-11T14:11:10.7827415Z 
2025-12-11T14:11:10.7827537Z     console.log
2025-12-11T14:11:10.7828271Z       🔍 Testando criação de plano com categoriaId: 236db937-4b66-4ceb-87ed-873c5eb3a87c
2025-12-11T14:11:10.7828764Z 
2025-12-11T14:11:10.7829111Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:667:15)
2025-12-11T14:11:10.7829530Z 
2025-12-11T14:11:10.7829652Z     console.log
2025-12-11T14:11:10.7829997Z       🔍 DTO completo: {
2025-12-11T14:11:10.7830489Z         "categoriaId": "236db937-4b66-4ceb-87ed-873c5eb3a87c",
2025-12-11T14:11:10.7831020Z         "periodicidade": "mensal",
2025-12-11T14:11:10.7831491Z         "proximaExecucao": "2026-01-10T14:11:08.725Z"
2025-12-11T14:11:10.7832042Z       }
2025-12-11T14:11:10.7832186Z 
2025-12-11T14:11:10.7832537Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:668:15)
2025-12-11T14:11:10.7832968Z 
2025-12-11T14:11:10.7833581Z   ● Maintenance (e2e) › POST /v1/maintenance/os › deve criar uma OS com sucesso (201) - ADMIN
2025-12-11T14:11:10.7834375Z 
2025-12-11T14:11:10.7834664Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7835028Z 
2025-12-11T14:11:10.7835263Z     [0m [90m  95 |[39m       )
2025-12-11T14:11:10.7835771Z      [90m  96 |[39m         [33m.[39msend(dto)
2025-12-11T14:11:10.7836530Z     [31m[1m>[22m[39m[90m  97 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7837196Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7837639Z      [90m  98 |[39m
2025-12-11T14:11:10.7838449Z      [90m  99 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:10.7839705Z      [90m 100 |[39m       expect(response[33m.[39mbody[33m.[39mtitulo)[33m.[39mtoBe(dto[33m.[39mtitulo)[33m;[39m[0m
2025-12-11T14:11:10.7840480Z 
2025-12-11T14:11:10.7840831Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:97:10)
2025-12-11T14:11:10.7841366Z       ----
2025-12-11T14:11:10.7842050Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7842704Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7843390Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7844166Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7844840Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7845447Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7846132Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7846900Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7847731Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7848237Z 
2025-12-11T14:11:10.7848886Z   ● Maintenance (e2e) › POST /v1/maintenance/os › deve criar uma OS com sucesso (201) - MANAGER
2025-12-11T14:11:10.7849435Z 
2025-12-11T14:11:10.7849713Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7850077Z 
2025-12-11T14:11:10.7850300Z     [0m [90m 122 |[39m       )
2025-12-11T14:11:10.7850817Z      [90m 123 |[39m         [33m.[39msend(dto)
2025-12-11T14:11:10.7851562Z     [31m[1m>[22m[39m[90m 124 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7852379Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7852831Z      [90m 125 |[39m
2025-12-11T14:11:10.7853649Z      [90m 126 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:10.7854909Z      [90m 127 |[39m       expect(response[33m.[39mbody[33m.[39mtitulo)[33m.[39mtoBe(dto[33m.[39mtitulo)[33m;[39m[0m
2025-12-11T14:11:10.7855514Z 
2025-12-11T14:11:10.7855872Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:124:10)
2025-12-11T14:11:10.7856399Z       ----
2025-12-11T14:11:10.7856919Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7857576Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7858247Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7858980Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7859658Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7860254Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7860942Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7861713Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7862674Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7863182Z 
2025-12-11T14:11:10.7864121Z   ● Maintenance (e2e) › PATCH /v1/maintenance/os/:id/status › deve atualizar status da OS com sucesso (200)
2025-12-11T14:11:10.7864741Z 
2025-12-11T14:11:10.7865024Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7865378Z 
2025-12-11T14:11:10.7865950Z     [0m [90m 147 |[39m           titulo[33m:[39m [32m`OS Teste Status ${Date.now()}`[39m[33m,[39m
2025-12-11T14:11:10.7866629Z      [90m 148 |[39m         })
2025-12-11T14:11:10.7867336Z     [31m[1m>[22m[39m[90m 149 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7868012Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7869003Z      [90m 150 |[39m       [36mconst[39m workOrderId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:10.7869743Z      [90m 151 |[39m
2025-12-11T14:11:10.7870267Z      [90m 152 |[39m       [36mconst[39m dto [33m=[39m {[0m
2025-12-11T14:11:10.7870763Z 
2025-12-11T14:11:10.7871113Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:149:10)
2025-12-11T14:11:10.7871654Z       ----
2025-12-11T14:11:10.7872301Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7872963Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7873649Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7874387Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7875072Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7875685Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7876370Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7877149Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7877988Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7878486Z 
2025-12-11T14:11:10.7879524Z   ● Maintenance (e2e) › PATCH /v1/maintenance/os/:id/status › deve validar workflow completo (aberta -> em_andamento -> concluida -> validada)
2025-12-11T14:11:10.7880341Z 
2025-12-11T14:11:10.7880614Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7880984Z 
2025-12-11T14:11:10.7881478Z     [0m [90m 182 |[39m           titulo[33m:[39m [32m'OS Teste Workflow'[39m[33m,[39m
2025-12-11T14:11:10.7882259Z      [90m 183 |[39m         })
2025-12-11T14:11:10.7882963Z     [31m[1m>[22m[39m[90m 184 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7883649Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7884645Z      [90m 185 |[39m       [36mconst[39m workOrderId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:10.7885372Z      [90m 186 |[39m
2025-12-11T14:11:10.7885928Z      [90m 187 |[39m       [90m// ABERTA -> EM_ANDAMENTO[39m[0m
2025-12-11T14:11:10.7886273Z 
2025-12-11T14:11:10.7886638Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:184:10)
2025-12-11T14:11:10.7887164Z       ----
2025-12-11T14:11:10.7887666Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7888324Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7888997Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7889732Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7890414Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7891017Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7891706Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7892628Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7893466Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7893976Z 
2025-12-11T14:11:10.7894717Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve listar OS com paginação (200)
2025-12-11T14:11:10.7895214Z 
2025-12-11T14:11:10.7895497Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7895859Z 
2025-12-11T14:11:10.7896307Z     [0m [90m 253 |[39m           prioridade[33m:[39m [32m'alta'[39m[33m,[39m
2025-12-11T14:11:10.7896908Z      [90m 254 |[39m         })
2025-12-11T14:11:10.7897607Z     [31m[1m>[22m[39m[90m 255 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7898274Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7898722Z      [90m 256 |[39m
2025-12-11T14:11:10.7899441Z      [90m 257 |[39m       [36mconst[39m os2 [33m=[39m [36mawait[39m authenticatedRequest(
2025-12-11T14:11:10.7900369Z      [90m 258 |[39m         httpServer[33m,[39m[0m
2025-12-11T14:11:10.7900685Z 
2025-12-11T14:11:10.7901040Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:255:10)
2025-12-11T14:11:10.7901573Z       ----
2025-12-11T14:11:10.7902248Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7902903Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7903583Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7904308Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7904985Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7905589Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7906266Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7907035Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7907870Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7908364Z 
2025-12-11T14:11:10.7908902Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve filtrar OS por status (200)
2025-12-11T14:11:10.7909381Z 
2025-12-11T14:11:10.7909654Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7910010Z 
2025-12-11T14:11:10.7910560Z     [0m [90m 304 |[39m           titulo[33m:[39m [32m`OS Teste Status ${Date.now()}`[39m[33m,[39m
2025-12-11T14:11:10.7911227Z      [90m 305 |[39m         })
2025-12-11T14:11:10.7912055Z     [31m[1m>[22m[39m[90m 306 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7912739Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7913728Z      [90m 307 |[39m       [36mconst[39m workOrderId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:10.7914460Z      [90m 308 |[39m
2025-12-11T14:11:10.7915063Z      [90m 309 |[39m       [90m// Mudar status para em_andamento[39m[0m
2025-12-11T14:11:10.7915438Z 
2025-12-11T14:11:10.7915796Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:306:10)
2025-12-11T14:11:10.7916319Z       ----
2025-12-11T14:11:10.7916817Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7917455Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7918130Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7918864Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7919535Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7920138Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7920819Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7921587Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7922578Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7923072Z 
2025-12-11T14:11:10.7923825Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve filtrar OS por prioridade (200)
2025-12-11T14:11:10.7924329Z 
2025-12-11T14:11:10.7924601Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7924966Z 
2025-12-11T14:11:10.7925410Z     [0m [90m 349 |[39m           prioridade[33m:[39m [32m'alta'[39m[33m,[39m
2025-12-11T14:11:10.7926012Z      [90m 350 |[39m         })
2025-12-11T14:11:10.7926704Z     [31m[1m>[22m[39m[90m 351 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7927373Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7927815Z      [90m 352 |[39m
2025-12-11T14:11:10.7928359Z      [90m 353 |[39m       [90m// Filtrar por prioridade alta[39m
2025-12-11T14:11:10.7929298Z      [90m 354 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest([0m
2025-12-11T14:11:10.7930064Z 
2025-12-11T14:11:10.7930425Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:351:10)
2025-12-11T14:11:10.7930948Z       ----
2025-12-11T14:11:10.7931441Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7932250Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7932922Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7933650Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7934337Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7934938Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7935621Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7936389Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7937218Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7937718Z 
2025-12-11T14:11:10.7938291Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve filtrar OS por patrimônio (200)
2025-12-11T14:11:10.7938782Z 
2025-12-11T14:11:10.7939010Z     expect(received).toBeGreaterThan(expected)
2025-12-11T14:11:10.7939319Z 
2025-12-11T14:11:10.7939438Z     Expected: > 0
2025-12-11T14:11:10.7939733Z     Received:   0
2025-12-11T14:11:10.7939907Z 
2025-12-11T14:11:10.7940311Z     [0m [90m 380 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:10.7940822Z      [90m 381 |[39m
2025-12-11T14:11:10.7942072Z     [31m[1m>[22m[39m[90m 382 |[39m       expect(response[33m.[39mbody[33m.[39mdata[33m.[39mlength)[33m.[39mtoBeGreaterThan([35m0[39m)[33m;[39m
2025-12-11T14:11:10.7943162Z      [90m     |[39m                                         [31m[1m^[22m[39m
2025-12-11T14:11:10.7944207Z      [90m 383 |[39m       response[33m.[39mbody[33m.[39mdata[33m.[39mforEach((os[33m:[39m any) [33m=>[39m {
2025-12-11T14:11:10.7945388Z      [90m 384 |[39m         expect(os[33m.[39mpatrimonioId)[33m.[39mtoBe(testPatrimonioId)[33m;[39m
2025-12-11T14:11:10.7946165Z      [90m 385 |[39m       })[33m;[39m[0m
2025-12-11T14:11:10.7946437Z 
2025-12-11T14:11:10.7946787Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:382:41)
2025-12-11T14:11:10.7947209Z 
2025-12-11T14:11:10.7947878Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve buscar OS por texto (título ou descrição) (200)
2025-12-11T14:11:10.7948459Z 
2025-12-11T14:11:10.7948729Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7949082Z 
2025-12-11T14:11:10.7949613Z     [0m [90m 401 |[39m           descricao[33m:[39m [32m'Descrição de teste'[39m[33m,[39m
2025-12-11T14:11:10.7950262Z      [90m 402 |[39m         })
2025-12-11T14:11:10.7950958Z     [31m[1m>[22m[39m[90m 403 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7951640Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7952225Z      [90m 404 |[39m
2025-12-11T14:11:10.7952922Z      [90m 405 |[39m       [90m// Buscar por texto[39m
2025-12-11T14:11:10.7953852Z      [90m 406 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest([0m
2025-12-11T14:11:10.7954360Z 
2025-12-11T14:11:10.7954706Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:403:10)
2025-12-11T14:11:10.7955235Z       ----
2025-12-11T14:11:10.7955731Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7956372Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7957054Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7957789Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7958460Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7959229Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7959926Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7960692Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7961517Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7962186Z 
2025-12-11T14:11:10.7962797Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve ordenar OS por data de abertura (200)
2025-12-11T14:11:10.7963321Z 
2025-12-11T14:11:10.7963588Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7963950Z 
2025-12-11T14:11:10.7964420Z     [0m [90m 436 |[39m           titulo[33m:[39m [32m'OS Ordenação 1'[39m[33m,[39m
2025-12-11T14:11:10.7965039Z      [90m 437 |[39m         })
2025-12-11T14:11:10.7965722Z     [31m[1m>[22m[39m[90m 438 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7966413Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7966856Z      [90m 439 |[39m
2025-12-11T14:11:10.7968108Z      [90m 440 |[39m       [36mawait[39m [36mnew[39m [33mPromise[39m((resolve) [33m=>[39m setTimeout(resolve[33m,[39m [35m100[39m))[33m;[39m [90m// Pequeno delay[39m
2025-12-11T14:11:10.7969076Z      [90m 441 |[39m[0m
2025-12-11T14:11:10.7969278Z 
2025-12-11T14:11:10.7969631Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:438:10)
2025-12-11T14:11:10.7970152Z       ----
2025-12-11T14:11:10.7970648Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7971294Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7972100Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7972833Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7973525Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7974125Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7974819Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7975590Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7976409Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7976908Z 
2025-12-11T14:11:10.7977409Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve validar paginação (200)
2025-12-11T14:11:10.7977860Z 
2025-12-11T14:11:10.7978135Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7978494Z 
2025-12-11T14:11:10.7978986Z     [0m [90m 506 |[39m             titulo[33m:[39m [32m`OS Paginação ${i}`[39m[33m,[39m
2025-12-11T14:11:10.7979622Z      [90m 507 |[39m           })
2025-12-11T14:11:10.7980334Z     [31m[1m>[22m[39m[90m 508 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7981019Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T14:11:10.7981679Z      [90m 509 |[39m       }
2025-12-11T14:11:10.7982301Z      [90m 510 |[39m
2025-12-11T14:11:10.7982816Z      [90m 511 |[39m       [90m// Primeira página[39m[0m
2025-12-11T14:11:10.7983148Z 
2025-12-11T14:11:10.7983491Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:508:12)
2025-12-11T14:11:10.7984026Z       ----
2025-12-11T14:11:10.7984514Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7985156Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.7985825Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.7986549Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.7987227Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.7988001Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.7988682Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.7989459Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.7990281Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.7990773Z 
2025-12-11T14:11:10.7991369Z   ● Maintenance (e2e) › GET /v1/maintenance/os › deve filtrar OS por data de abertura (200)
2025-12-11T14:11:10.7992042Z 
2025-12-11T14:11:10.7992315Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.7992673Z 
2025-12-11T14:11:10.7993146Z     [0m [90m 558 |[39m           titulo[33m:[39m [32m'OS Teste Data'[39m[33m,[39m
2025-12-11T14:11:10.7993763Z      [90m 559 |[39m         })
2025-12-11T14:11:10.7994453Z     [31m[1m>[22m[39m[90m 560 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.7995133Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.7995571Z      [90m 561 |[39m
2025-12-11T14:11:10.7996108Z      [90m 562 |[39m       [90m// Filtrar por data (hoje)[39m
2025-12-11T14:11:10.7997041Z      [90m 563 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest([0m
2025-12-11T14:11:10.7997546Z 
2025-12-11T14:11:10.7997890Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:560:10)
2025-12-11T14:11:10.7998417Z       ----
2025-12-11T14:11:10.7998911Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.7999547Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.8000223Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.8000952Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.8001621Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.8002369Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.8003062Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.8003839Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.8004662Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.8005153Z 
2025-12-11T14:11:10.8005852Z   ● Maintenance (e2e) › POST /v1/maintenance/apontamentos › deve criar apontamento com sucesso (201)
2025-12-11T14:11:10.8006451Z 
2025-12-11T14:11:10.8006719Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.8007080Z 
2025-12-11T14:11:10.8007677Z     [0m [90m 594 |[39m           titulo[33m:[39m [32m`OS Teste Apontamento ${Date.now()}`[39m[33m,[39m
2025-12-11T14:11:10.8008376Z      [90m 595 |[39m         })
2025-12-11T14:11:10.8009066Z     [31m[1m>[22m[39m[90m 596 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.8009749Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.8010920Z      [90m 597 |[39m       [36mconst[39m workOrderId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:10.8011664Z      [90m 598 |[39m
2025-12-11T14:11:10.8012346Z      [90m 599 |[39m       [36mconst[39m dto [33m=[39m {[0m
2025-12-11T14:11:10.8012682Z 
2025-12-11T14:11:10.8013025Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:596:10)
2025-12-11T14:11:10.8013557Z       ----
2025-12-11T14:11:10.8014051Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.8014689Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.8015365Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.8016101Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.8016797Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.8017565Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.8018248Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.8019020Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.8019843Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.8020335Z 
2025-12-11T14:11:10.8021041Z   ● Maintenance (e2e) › POST /v1/maintenance/planos › deve criar um plano preventivo com sucesso (201)
2025-12-11T14:11:10.8021643Z 
2025-12-11T14:11:10.8021987Z     expected 201 "Created", got 404 "Not Found"
2025-12-11T14:11:10.8022289Z 
2025-12-11T14:11:10.8022519Z     [0m [90m 676 |[39m       )
2025-12-11T14:11:10.8023028Z      [90m 677 |[39m         [33m.[39msend(dto)
2025-12-11T14:11:10.8023778Z     [31m[1m>[22m[39m[90m 678 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.8024450Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.8024898Z      [90m 679 |[39m
2025-12-11T14:11:10.8025728Z      [90m 680 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:10.8027115Z      [90m 681 |[39m       expect(response[33m.[39mbody[33m.[39mperiodicidade)[33m.[39mtoBe(dto[33m.[39mperiodicidade)[33m;[39m[0m
2025-12-11T14:11:10.8027799Z 
2025-12-11T14:11:10.8028141Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:678:10)
2025-12-11T14:11:10.8028672Z       ----
2025-12-11T14:11:10.8029167Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.8029810Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.8030484Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.8031215Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.8032015Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.8032633Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.8033318Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.8034080Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.8034907Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.8035397Z 
2025-12-11T14:11:10.8036127Z   ● Maintenance (e2e) › POST /v1/maintenance/os/:id/parts › deve registrar peça em uma OS com sucesso (201)
2025-12-11T14:11:10.8036735Z 
2025-12-11T14:11:10.8037004Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.8037366Z 
2025-12-11T14:11:10.8037905Z     [0m [90m 784 |[39m           titulo[33m:[39m [32m`OS Teste Parts ${Date.now()}`[39m[33m,[39m
2025-12-11T14:11:10.8038569Z      [90m 785 |[39m         })
2025-12-11T14:11:10.8039253Z     [31m[1m>[22m[39m[90m 786 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.8039938Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.8041117Z      [90m 787 |[39m       [36mconst[39m workOrderId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:10.8042036Z      [90m 788 |[39m
2025-12-11T14:11:10.8042568Z      [90m 789 |[39m       [36mconst[39m dto [33m=[39m {[0m
2025-12-11T14:11:10.8042901Z 
2025-12-11T14:11:10.8043254Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:786:10)
2025-12-11T14:11:10.8043773Z       ----
2025-12-11T14:11:10.8044316Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.8044965Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.8045635Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.8046366Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.8047217Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.8047818Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.8048507Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.8049275Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.8050095Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.8050596Z 
2025-12-11T14:11:10.8051205Z   ● Maintenance (e2e) › GET /v1/maintenance/os/:id/parts › deve listar peças de uma OS (200)
2025-12-11T14:11:10.8051871Z 
2025-12-11T14:11:10.8052156Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.8052516Z 
2025-12-11T14:11:10.8053105Z     [0m [90m 826 |[39m           titulo[33m:[39m [32m`OS Teste List Parts ${Date.now()}`[39m[33m,[39m
2025-12-11T14:11:10.8053791Z      [90m 827 |[39m         })
2025-12-11T14:11:10.8054480Z     [31m[1m>[22m[39m[90m 828 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.8055165Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.8056141Z      [90m 829 |[39m       [36mconst[39m workOrderId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:10.8056880Z      [90m 830 |[39m
2025-12-11T14:11:10.8057381Z      [90m 831 |[39m       [90m// Adicionar peça[39m[0m
2025-12-11T14:11:10.8057708Z 
2025-12-11T14:11:10.8058051Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:828:10)
2025-12-11T14:11:10.8058578Z       ----
2025-12-11T14:11:10.8059066Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.8059712Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.8060391Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.8061111Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.8061934Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.8062542Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.8063230Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.8064007Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.8064828Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.8065319Z 
2025-12-11T14:11:10.8066102Z   ● Maintenance (e2e) › DELETE /v1/maintenance/os/:id/parts/:partId › deve remover peça de uma OS com sucesso (204)
2025-12-11T14:11:10.8066762Z 
2025-12-11T14:11:10.8067027Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:10.8067387Z 
2025-12-11T14:11:10.8067971Z     [0m [90m 874 |[39m           titulo[33m:[39m [32m`OS Teste Delete Part ${Date.now()}`[39m[33m,[39m
2025-12-11T14:11:10.8068654Z      [90m 875 |[39m         })
2025-12-11T14:11:10.8069352Z     [31m[1m>[22m[39m[90m 876 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:10.8070217Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:10.8071204Z      [90m 877 |[39m       [36mconst[39m workOrderId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:10.8072073Z      [90m 878 |[39m
2025-12-11T14:11:10.8072587Z      [90m 879 |[39m       [90m// Adicionar peça[39m[0m
2025-12-11T14:11:10.8072908Z 
2025-12-11T14:11:10.8073254Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:876:10)
2025-12-11T14:11:10.8073775Z       ----
2025-12-11T14:11:10.8074268Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:10.8074909Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:10.8075575Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:10.8076303Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:10.8077155Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:10.8077774Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:10.8078467Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:10.8079234Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:10.8080060Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:10.8080559Z 
2025-12-11T14:11:13.0720868Z FAIL test/users/users.e2e-spec.ts (35.855 s)
2025-12-11T14:11:13.0728917Z   ● Console
2025-12-11T14:11:13.0729103Z 
2025-12-11T14:11:13.0729228Z     console.log
2025-12-11T14:11:13.0730292Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
2025-12-11T14:11:13.0730958Z 
2025-12-11T14:11:13.0731242Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:13.0731630Z 
2025-12-11T14:11:13.0731972Z     console.log
2025-12-11T14:11:13.0732898Z       [setupTestUsers] ✅ Porta detectada: 37649, USERS_API_URL: http://localhost:37649/v1
2025-12-11T14:11:13.0733444Z 
2025-12-11T14:11:13.0733743Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:13.0734103Z 
2025-12-11T14:11:13.0734700Z   ● Users (e2e) › POST /v1/users › deve retornar 403 para MANAGER (sem permissão)
2025-12-11T14:11:13.0735193Z 
2025-12-11T14:11:13.0735471Z     expected 403 "Forbidden", got 400 "Bad Request"
2025-12-11T14:11:13.0735807Z 
2025-12-11T14:11:13.0736083Z     [0m [90m 268 |[39m       )
2025-12-11T14:11:13.0737513Z      [90m 269 |[39m         [33m.[39msend({ name[33m:[39m [32m'Test'[39m[33m,[39m email[33m:[39m [32m`test-${Date.now()}@example.com`[39m[33m,[39m password[33m:[39m [32m'Password123!'[39m })
2025-12-11T14:11:13.0738954Z     [31m[1m>[22m[39m[90m 270 |[39m         [33m.[39mexpect([35m403[39m)[33m;[39m
2025-12-11T14:11:13.0739745Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:13.0740317Z      [90m 271 |[39m     })[33m;[39m
2025-12-11T14:11:13.0740850Z      [90m 272 |[39m   })[33m;[39m
2025-12-11T14:11:13.0741289Z      [90m 273 |[39m[0m
2025-12-11T14:11:13.0741508Z 
2025-12-11T14:11:13.0742000Z       at Object.<anonymous> (users/users.e2e-spec.ts:270:10)
2025-12-11T14:11:13.0742482Z       ----
2025-12-11T14:11:13.0742992Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:13.0743658Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:13.0744338Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:13.0745083Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:13.0745802Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:13.0746427Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:13.0747187Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:13.0748462Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:13.0749431Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:13.0749981Z 
2025-12-11T14:11:13.0750510Z   ● Users (e2e) › GET /v1/users/:id › deve buscar usuário por ID (200)
2025-12-11T14:11:13.0750951Z 
2025-12-11T14:11:13.0751180Z     expected 200 "OK", got 401 "Unauthorized"
2025-12-11T14:11:13.0751496Z 
2025-12-11T14:11:13.0752024Z     [0m [90m 280 |[39m         tokens[33m,[39m
2025-12-11T14:11:13.0752839Z      [90m 281 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T14:11:13.0753797Z     [31m[1m>[22m[39m[90m 282 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:13.0754540Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:13.0755016Z      [90m 283 |[39m
2025-12-11T14:11:13.0756455Z      [90m 284 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m tokens[33m.[39madminUserId)[33m;[39m
2025-12-11T14:11:13.0758130Z      [90m 285 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'email'[39m[33m,[39m tokens[33m.[39madminEmail)[33m;[39m[0m
2025-12-11T14:11:13.0758871Z 
2025-12-11T14:11:13.0759151Z       at Object.<anonymous> (users/users.e2e-spec.ts:282:9)
2025-12-11T14:11:13.0759627Z       ----
2025-12-11T14:11:13.0760146Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:13.0760816Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:13.0761517Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:13.0762544Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:13.0763252Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:13.0763940Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:13.0764648Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:13.0765463Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:13.0766321Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:13.0766829Z 
2025-12-11T14:11:13.0767404Z   ● Users (e2e) › GET /v1/users/:id › deve retornar 404 para usuário não encontrado
2025-12-11T14:11:13.0767864Z 
2025-12-11T14:11:13.0768112Z     expected 404 "Not Found", got 401 "Unauthorized"
2025-12-11T14:11:13.0768456Z 
2025-12-11T14:11:13.0768760Z     [0m [90m 295 |[39m         tokens[33m,[39m
2025-12-11T14:11:13.0769527Z      [90m 296 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T14:11:13.0770426Z     [31m[1m>[22m[39m[90m 297 |[39m       )[33m.[39mexpect([35m404[39m)[33m;[39m
2025-12-11T14:11:13.0771198Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:13.0772014Z      [90m 298 |[39m     })[33m;[39m
2025-12-11T14:11:13.0772542Z      [90m 299 |[39m
2025-12-11T14:11:13.0773579Z      [90m 300 |[39m     it([32m'deve retornar 400 para UUID inválido'[39m[33m,[39m [36masync[39m () [33m=>[39m {[0m
2025-12-11T14:11:13.0774197Z 
2025-12-11T14:11:13.0774509Z       at Object.<anonymous> (users/users.e2e-spec.ts:297:9)
2025-12-11T14:11:13.0774996Z       ----
2025-12-11T14:11:13.0775543Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:13.0776252Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:13.0776983Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:13.0777780Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:13.0778525Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:13.0779165Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:13.0779923Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:13.0780966Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:13.0782076Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:13.0782606Z 
2025-12-11T14:11:13.0783223Z   ● Users (e2e) › DELETE /v1/users/:id › deve retornar 403 para MANAGER (sem permissão)
2025-12-11T14:11:13.0783726Z 
2025-12-11T14:11:13.0783992Z     expected 403 "Forbidden", got 404 "Not Found"
2025-12-11T14:11:13.0784341Z 
2025-12-11T14:11:13.0784701Z     [0m [90m 419 |[39m         tokens[33m,[39m
2025-12-11T14:11:13.0785526Z      [90m 420 |[39m         [33mUserRole[39m[33m.[39m[33mMANAGER[39m[33m,[39m
2025-12-11T14:11:13.0786474Z     [31m[1m>[22m[39m[90m 421 |[39m       )[33m.[39mexpect([35m403[39m)[33m;[39m
2025-12-11T14:11:13.0787206Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:13.0788029Z      [90m 422 |[39m     })[33m;[39m
2025-12-11T14:11:13.0788525Z      [90m 423 |[39m   })[33m;[39m
2025-12-11T14:11:13.0789019Z      [90m 424 |[39m[0m
2025-12-11T14:11:13.0789246Z 
2025-12-11T14:11:13.0789534Z       at Object.<anonymous> (users/users.e2e-spec.ts:421:9)
2025-12-11T14:11:13.0790062Z       ----
2025-12-11T14:11:13.0790627Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:13.0791353Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:13.0792313Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:13.0793135Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:13.0793876Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:13.0794510Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:13.0795272Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:13.0796139Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:13.0797052Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:13.0797610Z 
2025-12-11T14:11:13.0798269Z   ● Users (e2e) › POST /v1/users/bulk › deve retornar 403 para MANAGER (sem permissão)
2025-12-11T14:11:13.0798814Z 
2025-12-11T14:11:13.0799072Z     expected 403 "Forbidden", got 409 "Conflict"
2025-12-11T14:11:13.0799420Z 
2025-12-11T14:11:13.0799719Z     [0m [90m 582 |[39m       )
2025-12-11T14:11:13.0800277Z      [90m 583 |[39m         [33m.[39msend([])
2025-12-11T14:11:13.0801103Z     [31m[1m>[22m[39m[90m 584 |[39m         [33m.[39mexpect([35m403[39m)[33m;[39m
2025-12-11T14:11:13.0802061Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:13.0802673Z      [90m 585 |[39m     })[33m;[39m
2025-12-11T14:11:13.0803232Z      [90m 586 |[39m   })[33m;[39m
2025-12-11T14:11:13.0803758Z      [90m 587 |[39m[0m
2025-12-11T14:11:13.0803992Z 
2025-12-11T14:11:13.0804281Z       at Object.<anonymous> (users/users.e2e-spec.ts:584:10)
2025-12-11T14:11:13.0804828Z       ----
2025-12-11T14:11:13.0805397Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:13.0806111Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:13.0806876Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:13.0807698Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:13.0808453Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:13.0809130Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:13.0809904Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:13.0810752Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:13.0811674Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:13.0812432Z 
2025-12-11T14:11:14.2165389Z PASS test/patrimonio/patrimonio-completo.e2e-spec.ts (37.077 s)
2025-12-11T14:11:14.2177869Z   ● Console
2025-12-11T14:11:14.2178057Z 
2025-12-11T14:11:14.2178179Z     console.log
2025-12-11T14:11:14.2179241Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
2025-12-11T14:11:14.2179913Z 
2025-12-11T14:11:14.2180204Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:14.2183509Z 
2025-12-11T14:11:14.2183698Z     console.log
2025-12-11T14:11:14.2186917Z       [setupTestUsers] ✅ Porta detectada: 36227, USERS_API_URL: http://localhost:36227/v1
2025-12-11T14:11:14.2187535Z 
2025-12-11T14:11:14.2187831Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:14.2188195Z 
2025-12-11T14:11:24.6172432Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6177147Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6179158Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6181281Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6184434Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6187378Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6190332Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6193698Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6196854Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6198245Z   parameters: [
2025-12-11T14:11:24.6198752Z     [32m'Inventário Q1 2025 1765462284554'[39m,
2025-12-11T14:11:24.6199305Z     [32m'Setor A - Sala 101'[39m,
2025-12-11T14:11:24.6199833Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6200335Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6200767Z     [32m'draft'[39m
2025-12-11T14:11:24.6201075Z   ],
2025-12-11T14:11:24.6201955Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6203885Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6205521Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6207703Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6210945Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6214194Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6217113Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6220029Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6223622Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6225283Z     length: [33m416[39m,
2025-12-11T14:11:24.6225749Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6226184Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6228134Z     detail: [32m'Failing row contains (a0486f50-f73d-4b37-8b27-f5c6f2264b73, Inventário Q1 2025 1765462284554, Setor A - Sala 101, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.559859+00, 2025-12-11 14:11:24.559859+00).'[39m,
2025-12-11T14:11:24.6229630Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6230123Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6230661Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6231226Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6231906Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6232396Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6232876Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6233379Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6233878Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6234392Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6234898Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6235336Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6235812Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6236215Z   },
2025-12-11T14:11:24.6236540Z   length: [33m416[39m,
2025-12-11T14:11:24.6236970Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6237390Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6239295Z   detail: [32m'Failing row contains (a0486f50-f73d-4b37-8b27-f5c6f2264b73, Inventário Q1 2025 1765462284554, Setor A - Sala 101, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.559859+00, 2025-12-11 14:11:24.559859+00).'[39m,
2025-12-11T14:11:24.6240717Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6241191Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6241723Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6242428Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6242905Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6243339Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6243803Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6244271Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6244737Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6245230Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6245724Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6246133Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6246599Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6246990Z }
2025-12-11T14:11:24.6420397Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6425722Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6427817Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6429947Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6433129Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6436053Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6439176Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6442480Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6445575Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6446948Z   parameters: [
2025-12-11T14:11:24.6447428Z     [32m'Campanha Teste 1765462284633'[39m,
2025-12-11T14:11:24.6447942Z     [32m'Local Teste'[39m,
2025-12-11T14:11:24.6448434Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6448973Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6449406Z     [32m'draft'[39m
2025-12-11T14:11:24.6449715Z   ],
2025-12-11T14:11:24.6450423Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6452438Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6453413Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6454607Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6456198Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6457802Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6459698Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6461268Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6463227Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6464343Z     length: [33m404[39m,
2025-12-11T14:11:24.6464628Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6465028Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6466205Z     detail: [32m'Failing row contains (8b85ae0f-54dd-43e8-a812-4af856a93925, Campanha Teste 1765462284633, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.638288+00, 2025-12-11 14:11:24.638288+00).'[39m,
2025-12-11T14:11:24.6467074Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6467779Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6468272Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6468760Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6469068Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6469334Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6469787Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6470064Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6470345Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6470634Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6470920Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6471163Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6471443Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6471671Z   },
2025-12-11T14:11:24.6471998Z   length: [33m404[39m,
2025-12-11T14:11:24.6472255Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6472494Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6473524Z   detail: [32m'Failing row contains (8b85ae0f-54dd-43e8-a812-4af856a93925, Campanha Teste 1765462284633, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.638288+00, 2025-12-11 14:11:24.638288+00).'[39m,
2025-12-11T14:11:24.6474301Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6474583Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6475142Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6475612Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6476011Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6476509Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6476790Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6477075Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6477467Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6477749Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6478029Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6478267Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6478532Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6478762Z }
2025-12-11T14:11:24.6490456Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6493247Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6495023Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6496207Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6497825Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6499383Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6501125Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6503087Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6504804Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6505579Z   parameters: [
2025-12-11T14:11:24.6505888Z     [32m'Campanha Teste Assignments 1765462284643'[39m,
2025-12-11T14:11:24.6506201Z     [32m'Local Teste'[39m,
2025-12-11T14:11:24.6506648Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6506933Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6507184Z     [32m'draft'[39m
2025-12-11T14:11:24.6507365Z   ],
2025-12-11T14:11:24.6507777Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6508827Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6509709Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6510883Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6512604Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6514238Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6515799Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6517351Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6519041Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6519953Z     length: [33m416[39m,
2025-12-11T14:11:24.6520223Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6520473Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6521558Z     detail: [32m'Failing row contains (161adbd2-c39f-44eb-8f37-f4dd95d5c68f, Campanha Teste Assignments 1765462284643, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.645836+00, 2025-12-11 14:11:24.645836+00).'[39m,
2025-12-11T14:11:24.6522499Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6522773Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6523090Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6523410Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6523700Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6523970Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6524261Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6524551Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6524829Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6525124Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6525552Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6525825Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6526114Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6526341Z   },
2025-12-11T14:11:24.6526538Z   length: [33m416[39m,
2025-12-11T14:11:24.6526790Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6527036Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6528095Z   detail: [32m'Failing row contains (161adbd2-c39f-44eb-8f37-f4dd95d5c68f, Campanha Teste Assignments 1765462284643, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.645836+00, 2025-12-11 14:11:24.645836+00).'[39m,
2025-12-11T14:11:24.6528914Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6529179Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6529485Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6529980Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6530262Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6530522Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6530793Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6539652Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6539992Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6540307Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6540600Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6540860Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6541153Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6541393Z }
2025-12-11T14:11:24.6708572Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6711227Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6713012Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6714294Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6716053Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6717764Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6719583Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6722586Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6724536Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6725376Z   parameters: [
2025-12-11T14:11:24.6725654Z     [32m'Campanha Sync 1765462284665'[39m,
2025-12-11T14:11:24.6725935Z     [32m'Local Teste'[39m,
2025-12-11T14:11:24.6726222Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6726510Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6726765Z     [32m'draft'[39m
2025-12-11T14:11:24.6726948Z   ],
2025-12-11T14:11:24.6727557Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6728626Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6729528Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6730699Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6732507Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6734283Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6735845Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6737389Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6739067Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6739988Z     length: [33m403[39m,
2025-12-11T14:11:24.6740256Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6740500Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6741516Z     detail: [32m'Failing row contains (2410655a-48ce-44cc-8b35-adeab8a6fc10, Campanha Sync 1765462284665, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.668099+00, 2025-12-11 14:11:24.668099+00).'[39m,
2025-12-11T14:11:24.6742556Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6742863Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6743169Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6743489Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6743775Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6744288Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6744857Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6745156Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6745447Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6745750Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6746032Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6746285Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6746565Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6746797Z   },
2025-12-11T14:11:24.6746984Z   length: [33m403[39m,
2025-12-11T14:11:24.6747232Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6747475Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6748477Z   detail: [32m'Failing row contains (2410655a-48ce-44cc-8b35-adeab8a6fc10, Campanha Sync 1765462284665, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.668099+00, 2025-12-11 14:11:24.668099+00).'[39m,
2025-12-11T14:11:24.6749239Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6749553Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6750117Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6750739Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6751289Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6751943Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6752506Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6753157Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6753594Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6753899Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6754187Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6754424Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6754700Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6754928Z }
2025-12-11T14:11:24.6770045Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6772903Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6774759Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6775950Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6777587Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6779154Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6780710Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6782697Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6784432Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6785200Z   parameters: [
2025-12-11T14:11:24.6785522Z     [32m'Campanha Reconciliação 1765462284672'[39m,
2025-12-11T14:11:24.6785837Z     [32m'Local Teste'[39m,
2025-12-11T14:11:24.6786110Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6786399Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6786639Z     [32m'draft'[39m
2025-12-11T14:11:24.6786819Z   ],
2025-12-11T14:11:24.6787240Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6788288Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6789173Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6790338Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6792090Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6793700Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6795413Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6796986Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6798674Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6799580Z     length: [33m414[39m,
2025-12-11T14:11:24.6799842Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6800214Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6802031Z     detail: [32m'Failing row contains (a902e4be-9bd8-4e1c-9a9f-4fd24386e89a, Campanha Reconciliação 1765462284672, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.674415+00, 2025-12-11 14:11:24.674415+00).'[39m,
2025-12-11T14:11:24.6802956Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6803250Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6803563Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6803882Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6804178Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6804440Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6804721Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6805000Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6805269Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6805555Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6805835Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6806087Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6806365Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6806593Z   },
2025-12-11T14:11:24.6806784Z   length: [33m414[39m,
2025-12-11T14:11:24.6807033Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6807264Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6808915Z   detail: [32m'Failing row contains (a902e4be-9bd8-4e1c-9a9f-4fd24386e89a, Campanha Reconciliação 1765462284672, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.674415+00, 2025-12-11 14:11:24.674415+00).'[39m,
2025-12-11T14:11:24.6810510Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6810991Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6811582Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6812143Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6812429Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6812684Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6812961Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6813228Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6813503Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6813790Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6814070Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6814309Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6814580Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6814808Z }
2025-12-11T14:11:24.6830101Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6832875Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6834373Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6835752Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6837404Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6838964Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6840537Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6842410Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6844270Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6845040Z   parameters: [
2025-12-11T14:11:24.6845330Z     [32m'Campanha Relatório 1765462284678'[39m,
2025-12-11T14:11:24.6845634Z     [32m'Local Teste'[39m,
2025-12-11T14:11:24.6845912Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6846204Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6846451Z     [32m'draft'[39m
2025-12-11T14:11:24.6846624Z   ],
2025-12-11T14:11:24.6847036Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6848135Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6849019Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6850189Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6851942Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6853566Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6855148Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6856698Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6858384Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6859296Z     length: [33m409[39m,
2025-12-11T14:11:24.6859734Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6860330Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6862856Z     detail: [32m'Failing row contains (f3b19d41-a17b-42bc-900c-3ad4412e3056, Campanha Relatório 1765462284678, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.680093+00, 2025-12-11 14:11:24.680093+00).'[39m,
2025-12-11T14:11:24.6864533Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6865077Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6865699Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6866333Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6866924Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6867475Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6868001Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6868580Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6869141Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6869707Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6870278Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6870783Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6871618Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6872190Z   },
2025-12-11T14:11:24.6872407Z   length: [33m409[39m,
2025-12-11T14:11:24.6872697Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6872948Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6874024Z   detail: [32m'Failing row contains (f3b19d41-a17b-42bc-900c-3ad4412e3056, Campanha Relatório 1765462284678, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.680093+00, 2025-12-11 14:11:24.680093+00).'[39m,
2025-12-11T14:11:24.6874840Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6875118Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6875409Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6875722Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6875997Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6876237Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6876691Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6877228Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6877686Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6878211Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6878788Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6879264Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6879783Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6880208Z }
2025-12-11T14:11:24.6890196Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6892086Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6893249Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6894420Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6896078Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6898840Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6900510Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6902399Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6904337Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6905139Z   parameters: [
2025-12-11T14:11:24.6905419Z     [32m'Campanha CSV 1765462284683'[39m,
2025-12-11T14:11:24.6905701Z     [32m'Local Teste'[39m,
2025-12-11T14:11:24.6905980Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6906267Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6906505Z     [32m'draft'[39m
2025-12-11T14:11:24.6906686Z   ],
2025-12-11T14:11:24.6907102Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6908143Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6909193Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6910383Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6912170Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6913835Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6915404Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6916955Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6918638Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6919538Z     length: [33m402[39m,
2025-12-11T14:11:24.6919799Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6920051Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6921075Z     detail: [32m'Failing row contains (a061a7d3-179e-423d-b604-a79a06238fe2, Campanha CSV 1765462284683, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.685972+00, 2025-12-11 14:11:24.685972+00).'[39m,
2025-12-11T14:11:24.6922014Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6922296Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6922727Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6923295Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6923834Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6924137Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6924412Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6924690Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6924967Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6925256Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6925537Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6925785Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6926069Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6926294Z   },
2025-12-11T14:11:24.6926494Z   length: [33m402[39m,
2025-12-11T14:11:24.6926750Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6926986Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6928289Z   detail: [32m'Failing row contains (a061a7d3-179e-423d-b604-a79a06238fe2, Campanha CSV 1765462284683, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.685972+00, 2025-12-11 14:11:24.685972+00).'[39m,
2025-12-11T14:11:24.6929273Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6929554Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6929859Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6930216Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6930722Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6931435Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6932136Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6932659Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6933198Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6933749Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6934577Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6935034Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6935564Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6935979Z }
2025-12-11T14:11:24.6952216Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:24 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6954873Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:24.6956961Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6959154Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6961480Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6963368Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6964953Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6966663Z     at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6968389Z   query: [32m'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"'[39m,
2025-12-11T14:11:24.6969165Z   parameters: [
2025-12-11T14:11:24.6969431Z     [32m'Campanha Excel 1765462284689'[39m,
2025-12-11T14:11:24.6969712Z     [32m'Local Teste'[39m,
2025-12-11T14:11:24.6969987Z     [35m2025-01-20T00:00:00.000Z[39m,
2025-12-11T14:11:24.6970276Z     [35m2025-01-25T23:59:59.000Z[39m,
2025-12-11T14:11:24.6970520Z     [32m'draft'[39m
2025-12-11T14:11:24.6970708Z   ],
2025-12-11T14:11:24.6971118Z   driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:11:24.6972384Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:24.6973299Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:24.6974693Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:24.6976299Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:24.6977906Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:24.6979464Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:24.6981162Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:24.6983091Z       at InventoryMobileService.createCampaign [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/inventory-mobile/inventory-mobile.service.ts:55:19[90m)[39m {
2025-12-11T14:11:24.6984001Z     length: [33m404[39m,
2025-12-11T14:11:24.6984262Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6984518Z     code: [32m'23502'[39m,
2025-12-11T14:11:24.6985556Z     detail: [32m'Failing row contains (bf078c2e-8dde-4c55-a730-5f25b07fe994, Campanha Excel 1765462284689, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.692308+00, 2025-12-11 14:11:24.692308+00).'[39m,
2025-12-11T14:11:24.6986390Z     hint: [90mundefined[39m,
2025-12-11T14:11:24.6986674Z     position: [90mundefined[39m,
2025-12-11T14:11:24.6986993Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6987307Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6987603Z     where: [90mundefined[39m,
2025-12-11T14:11:24.6987872Z     schema: [32m'public'[39m,
2025-12-11T14:11:24.6988135Z     table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6988416Z     column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6988706Z     dataType: [90mundefined[39m,
2025-12-11T14:11:24.6989004Z     constraint: [90mundefined[39m,
2025-12-11T14:11:24.6989295Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6989539Z     line: [32m'2023'[39m,
2025-12-11T14:11:24.6989820Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6990051Z   },
2025-12-11T14:11:24.6990234Z   length: [33m404[39m,
2025-12-11T14:11:24.6990486Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:24.6990732Z   code: [32m'23502'[39m,
2025-12-11T14:11:24.6991988Z   detail: [32m'Failing row contains (bf078c2e-8dde-4c55-a730-5f25b07fe994, Campanha Excel 1765462284689, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.692308+00, 2025-12-11 14:11:24.692308+00).'[39m,
2025-12-11T14:11:24.6992927Z   hint: [90mundefined[39m,
2025-12-11T14:11:24.6993220Z   position: [90mundefined[39m,
2025-12-11T14:11:24.6993516Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:24.6993827Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:24.6994088Z   where: [90mundefined[39m,
2025-12-11T14:11:24.6994333Z   schema: [32m'public'[39m,
2025-12-11T14:11:24.6994602Z   table: [32m'campaigns'[39m,
2025-12-11T14:11:24.6994862Z   column: [32m'owner_id'[39m,
2025-12-11T14:11:24.6995125Z   dataType: [90mundefined[39m,
2025-12-11T14:11:24.6995407Z   constraint: [90mundefined[39m,
2025-12-11T14:11:24.6995679Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:24.6995916Z   line: [32m'2023'[39m,
2025-12-11T14:11:24.6996185Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:24.6996415Z }
2025-12-11T14:11:25.9666861Z FAIL test/inventory-mobile/inventory-mobile.e2e-spec.ts (12.885 s)
2025-12-11T14:11:25.9679881Z   ● Console
2025-12-11T14:11:25.9680136Z 
2025-12-11T14:11:25.9680262Z     console.log
2025-12-11T14:11:25.9681091Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
2025-12-11T14:11:25.9681611Z 
2025-12-11T14:11:25.9682105Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:25.9682452Z 
2025-12-11T14:11:25.9682584Z     console.log
2025-12-11T14:11:25.9683465Z       [setupTestUsers] ✅ Porta detectada: 41039, USERS_API_URL: http://localhost:41039/v1
2025-12-11T14:11:25.9684018Z 
2025-12-11T14:11:25.9684310Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:25.9684662Z 
2025-12-11T14:11:25.9685396Z   ● Inventory Mobile (e2e) › POST /v1/inventory/campaigns › deve criar uma campanha com sucesso (201)
2025-12-11T14:11:25.9686329Z 
2025-12-11T14:11:25.9686628Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9687013Z 
2025-12-11T14:11:25.9687328Z     [0m [90m 85 |[39m       )
2025-12-11T14:11:25.9687908Z      [90m 86 |[39m         [33m.[39msend(dto)
2025-12-11T14:11:25.9688709Z     [31m[1m>[22m[39m[90m 87 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9689414Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9689877Z      [90m 88 |[39m
2025-12-11T14:11:25.9690704Z      [90m 89 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:25.9692140Z      [90m 90 |[39m       expect(response[33m.[39mbody[33m.[39mnome)[33m.[39mtoBe(dto[33m.[39mnome)[33m;[39m[0m
2025-12-11T14:11:25.9692725Z 
2025-12-11T14:11:25.9693152Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:87:10)
2025-12-11T14:11:25.9693775Z       ----
2025-12-11T14:11:25.9694316Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9694993Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9695737Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9696499Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9697237Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9697916Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9698668Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9699491Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9700375Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9700889Z 
2025-12-11T14:11:25.9702030Z   ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/assignments › deve listar assignments de uma campanha (200)
2025-12-11T14:11:25.9702793Z 
2025-12-11T14:11:25.9703119Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9703512Z 
2025-12-11T14:11:25.9704092Z     [0m [90m 110 |[39m           periodoFim[33m:[39m [32m'2025-01-25T23:59:59Z'[39m[33m,[39m
2025-12-11T14:11:25.9704790Z      [90m 111 |[39m         })
2025-12-11T14:11:25.9705522Z     [31m[1m>[22m[39m[90m 112 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9706222Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9707258Z      [90m 113 |[39m       [36mconst[39m campaignId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:25.9707997Z      [90m 114 |[39m
2025-12-11T14:11:25.9708809Z      [90m 115 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest([0m
2025-12-11T14:11:25.9709322Z 
2025-12-11T14:11:25.9709771Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:112:10)
2025-12-11T14:11:25.9710405Z       ----
2025-12-11T14:11:25.9711181Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9712084Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9712774Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9713548Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9714289Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9714920Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9715630Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9716420Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9717265Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9718031Z 
2025-12-11T14:11:25.9718949Z   ● Inventory Mobile (e2e) › POST /v1/inventory/campaigns/:id/assignments › deve distribuir assignments com sucesso (201)
2025-12-11T14:11:25.9719714Z 
2025-12-11T14:11:25.9720038Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9720419Z 
2025-12-11T14:11:25.9721036Z     [0m [90m 153 |[39m           periodoFim[33m:[39m [32m'2025-01-25T23:59:59Z'[39m[33m,[39m
2025-12-11T14:11:25.9722055Z      [90m 154 |[39m         })
2025-12-11T14:11:25.9723216Z     [31m[1m>[22m[39m[90m 155 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9723971Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9724987Z      [90m 156 |[39m       [36mconst[39m campaignId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:25.9725758Z      [90m 157 |[39m
2025-12-11T14:11:25.9726773Z      [90m 158 |[39m       [90m// Limpar assignments anteriores desta campanha (se houver)[39m[0m
2025-12-11T14:11:25.9727328Z 
2025-12-11T14:11:25.9727786Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:155:10)
2025-12-11T14:11:25.9728443Z       ----
2025-12-11T14:11:25.9728989Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9729673Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9730399Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9731171Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9732094Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9732717Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9733435Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9734201Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9735059Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9735597Z 
2025-12-11T14:11:25.9736459Z   ● Inventory Mobile (e2e) › POST /v1/inventory/sync/push › deve processar itens coletados com sucesso (200)
2025-12-11T14:11:25.9737136Z 
2025-12-11T14:11:25.9737445Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9737847Z 
2025-12-11T14:11:25.9738443Z     [0m [90m 255 |[39m           periodoFim[33m:[39m [32m'2025-01-25T23:59:59Z'[39m[33m,[39m
2025-12-11T14:11:25.9739172Z      [90m 256 |[39m         })
2025-12-11T14:11:25.9739850Z     [31m[1m>[22m[39m[90m 257 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9740614Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9741645Z      [90m 258 |[39m       [36mconst[39m campaignId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:25.9742709Z      [90m 259 |[39m
2025-12-11T14:11:25.9743601Z      [90m 260 |[39m       [90m// Limpar assignments anteriores desta campanha (se houver)[39m[0m
2025-12-11T14:11:25.9744159Z 
2025-12-11T14:11:25.9744882Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:257:10)
2025-12-11T14:11:25.9745525Z       ----
2025-12-11T14:11:25.9746089Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9746820Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9747568Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9748367Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9749126Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9749792Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9750557Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9751423Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9752926Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9753427Z 
2025-12-11T14:11:25.9754246Z   ● Inventory Mobile (e2e) › POST /v1/inventory/reconcile › deve iniciar conciliação com sucesso (202)
2025-12-11T14:11:25.9754891Z 
2025-12-11T14:11:25.9755232Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9755635Z 
2025-12-11T14:11:25.9756269Z     [0m [90m 332 |[39m           periodoFim[33m:[39m [32m'2025-01-25T23:59:59Z'[39m[33m,[39m
2025-12-11T14:11:25.9757028Z      [90m 333 |[39m         })
2025-12-11T14:11:25.9757824Z     [31m[1m>[22m[39m[90m 334 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9758587Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9759655Z      [90m 335 |[39m       [36mconst[39m campaignId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:25.9760527Z      [90m 336 |[39m
2025-12-11T14:11:25.9761374Z      [90m 337 |[39m       [90m// Limpar assignments anteriores desta campanha (se houver)[39m[0m
2025-12-11T14:11:25.9762163Z 
2025-12-11T14:11:25.9762631Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:334:10)
2025-12-11T14:11:25.9763290Z       ----
2025-12-11T14:11:25.9763838Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9764562Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9765220Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9766016Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9766774Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9767462Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9768219Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9769079Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9770007Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9770556Z 
2025-12-11T14:11:25.9771417Z   ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/report › deve gerar relatório de campanha (200)
2025-12-11T14:11:25.9772334Z 
2025-12-11T14:11:25.9772660Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9773061Z 
2025-12-11T14:11:25.9773667Z     [0m [90m 389 |[39m           periodoFim[33m:[39m [32m'2025-01-25T23:59:59Z'[39m[33m,[39m
2025-12-11T14:11:25.9774405Z      [90m 390 |[39m         })
2025-12-11T14:11:25.9775737Z     [31m[1m>[22m[39m[90m 391 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9776535Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9777624Z      [90m 392 |[39m       [36mconst[39m campaignId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:25.9778485Z      [90m 393 |[39m
2025-12-11T14:11:25.9779616Z      [90m 394 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest([0m
2025-12-11T14:11:25.9780199Z 
2025-12-11T14:11:25.9780684Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:391:10)
2025-12-11T14:11:25.9781337Z       ----
2025-12-11T14:11:25.9782225Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9782970Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9783718Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9784524Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9785278Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9785942Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9786968Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9787822Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9788742Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9789296Z 
2025-12-11T14:11:25.9790212Z   ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/export/csv › deve exportar divergências para CSV (200)
2025-12-11T14:11:25.9790944Z 
2025-12-11T14:11:25.9791262Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9791650Z 
2025-12-11T14:11:25.9792453Z     [0m [90m 425 |[39m           periodoFim[33m:[39m [32m'2025-01-25T23:59:59Z'[39m[33m,[39m
2025-12-11T14:11:25.9793195Z      [90m 426 |[39m         })
2025-12-11T14:11:25.9793972Z     [31m[1m>[22m[39m[90m 427 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9794718Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9795621Z      [90m 428 |[39m       [36mconst[39m campaignId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:25.9796284Z      [90m 429 |[39m
2025-12-11T14:11:25.9797066Z      [90m 430 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest([0m
2025-12-11T14:11:25.9797609Z 
2025-12-11T14:11:25.9798075Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:427:10)
2025-12-11T14:11:25.9798762Z       ----
2025-12-11T14:11:25.9799316Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9800071Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9800853Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9801689Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9802616Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9803246Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9803954Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9804738Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9809413Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9810013Z 
2025-12-11T14:11:25.9810972Z   ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/export/excel › deve exportar relatório para Excel (200)
2025-12-11T14:11:25.9811911Z 
2025-12-11T14:11:25.9812358Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:25.9812754Z 
2025-12-11T14:11:25.9813371Z     [0m [90m 457 |[39m           periodoFim[33m:[39m [32m'2025-01-25T23:59:59Z'[39m[33m,[39m
2025-12-11T14:11:25.9814104Z      [90m 458 |[39m         })
2025-12-11T14:11:25.9814880Z     [31m[1m>[22m[39m[90m 459 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:25.9815654Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:25.9816953Z      [90m 460 |[39m       [36mconst[39m campaignId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:25.9817801Z      [90m 461 |[39m
2025-12-11T14:11:25.9818665Z      [90m 462 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest([0m
2025-12-11T14:11:25.9819211Z 
2025-12-11T14:11:25.9819669Z       at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:459:10)
2025-12-11T14:11:25.9820334Z       ----
2025-12-11T14:11:25.9820883Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:25.9821585Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:25.9822528Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:25.9823347Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:25.9824322Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:25.9824995Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:25.9825771Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:25.9826621Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:25.9827422Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:25.9827837Z 
2025-12-11T14:11:27.2807209Z PASS test/notifications/notifications.e2e-spec.ts (13.054 s)
2025-12-11T14:11:27.2819159Z   ● Console
2025-12-11T14:11:27.2819386Z 
2025-12-11T14:11:27.2819898Z     console.log
2025-12-11T14:11:27.2820820Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
2025-12-11T14:11:27.2821371Z 
2025-12-11T14:11:27.2821653Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:27.2822409Z 
2025-12-11T14:11:27.2823108Z     console.log
2025-12-11T14:11:27.2824072Z       [setupTestUsers] ✅ Porta detectada: 35111, USERS_API_URL: http://localhost:35111/v1
2025-12-11T14:11:27.2824670Z 
2025-12-11T14:11:27.2825004Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:27.2825391Z 
2025-12-11T14:11:38.7524755Z [31m[Nest] 3469  - [39m12/11/2025, 2:11:38 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
2025-12-11T14:11:38.7527695Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:38.7529869Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:38.7532370Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:38.7535537Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:38.7538441Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:38.7541270Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:38.7544410Z     at ReportCatalogService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/reports/services/report-catalog.service.ts:51:19[90m)[39m {
2025-12-11T14:11:38.7548637Z   query: [32m'INSERT INTO "report_catalogs"("id", "key", "name", "description", "type", "model", "default_filters", "current_version", "active", "requires_permission", "created_by_id", "updated_by_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "current_version", "active", "requires_permission", "created_at", "updated_at"'[39m,
2025-12-11T14:11:38.7550737Z   parameters: [
2025-12-11T14:11:38.7551246Z     [32m'test-catalog-1765462298687'[39m,
2025-12-11T14:11:38.7552025Z     [32m'Test Catalog 1'[39m,
2025-12-11T14:11:38.7552587Z     [32m'Test catalog description'[39m,
2025-12-11T14:11:38.7553074Z     [32m'pdf'[39m,
2025-12-11T14:11:38.7553472Z     [32m'patrimonio'[39m,
2025-12-11T14:11:38.7553951Z     [32m'{"status":"ATIVO"}'[39m,
2025-12-11T14:11:38.7554377Z     [32m'1.0.0'[39m,
2025-12-11T14:11:38.7554740Z     [33mtrue[39m,
2025-12-11T14:11:38.7555372Z     [33mfalse[39m
2025-12-11T14:11:38.7555662Z   ],
2025-12-11T14:11:38.7556464Z   driverError: error: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
2025-12-11T14:11:38.7558428Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:38.7560051Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:38.7562465Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:38.7565419Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:38.7568432Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:38.7571368Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:38.7574457Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:38.7577480Z       at ReportCatalogService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/reports/services/report-catalog.service.ts:51:19[90m)[39m {
2025-12-11T14:11:38.7579049Z     length: [33m449[39m,
2025-12-11T14:11:38.7579503Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:38.7579946Z     code: [32m'23502'[39m,
2025-12-11T14:11:38.7582204Z     detail: [32m'Failing row contains (da4c1a4f-dffd-4931-acdc-f49aee5ab866, test-catalog-1765462298687, Test Catalog 1, Test catalog description, pdf, patrimonio, {"status": "ATIVO"}, 1.0.0, t, f, null, null, 2025-12-11 14:11:38.698496, 2025-12-11 14:11:38.698496).'[39m,
2025-12-11T14:11:38.7583856Z     hint: [90mundefined[39m,
2025-12-11T14:11:38.7584351Z     position: [90mundefined[39m,
2025-12-11T14:11:38.7584897Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:38.7585454Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:38.7585989Z     where: [90mundefined[39m,
2025-12-11T14:11:38.7586457Z     schema: [32m'public'[39m,
2025-12-11T14:11:38.7586940Z     table: [32m'report_catalogs'[39m,
2025-12-11T14:11:38.7587485Z     column: [32m'created_by_id'[39m,
2025-12-11T14:11:38.7588006Z     dataType: [90mundefined[39m,
2025-12-11T14:11:38.7588517Z     constraint: [90mundefined[39m,
2025-12-11T14:11:38.7589021Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:38.7589682Z     line: [32m'2023'[39m,
2025-12-11T14:11:38.7590179Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:38.7590576Z   },
2025-12-11T14:11:38.7590893Z   length: [33m449[39m,
2025-12-11T14:11:38.7591339Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:38.7591925Z   code: [32m'23502'[39m,
2025-12-11T14:11:38.7594014Z   detail: [32m'Failing row contains (da4c1a4f-dffd-4931-acdc-f49aee5ab866, test-catalog-1765462298687, Test Catalog 1, Test catalog description, pdf, patrimonio, {"status": "ATIVO"}, 1.0.0, t, f, null, null, 2025-12-11 14:11:38.698496, 2025-12-11 14:11:38.698496).'[39m,
2025-12-11T14:11:38.7595606Z   hint: [90mundefined[39m,
2025-12-11T14:11:38.7596077Z   position: [90mundefined[39m,
2025-12-11T14:11:38.7596593Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:38.7597139Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:38.7597810Z   where: [90mundefined[39m,
2025-12-11T14:11:38.7598234Z   schema: [32m'public'[39m,
2025-12-11T14:11:38.7598744Z   table: [32m'report_catalogs'[39m,
2025-12-11T14:11:38.7599255Z   column: [32m'created_by_id'[39m,
2025-12-11T14:11:38.7599759Z   dataType: [90mundefined[39m,
2025-12-11T14:11:38.7600250Z   constraint: [90mundefined[39m,
2025-12-11T14:11:38.7600739Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:38.7601157Z   line: [32m'2023'[39m,
2025-12-11T14:11:38.7601624Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:38.7602186Z }
2025-12-11T14:11:38.7800952Z [31m[Nest] 3469  - [39m12/11/2025, 2:11:38 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mQueryFailedError: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
2025-12-11T14:11:38.7803378Z     at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:325:19[90m)[39m
2025-12-11T14:11:38.7804681Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:38.7806047Z     at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:38.7807932Z     at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:38.7810561Z     at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:38.7812708Z     at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:38.7814524Z     at ReportCatalogService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/reports/services/report-catalog.service.ts:51:19[90m)[39m {
2025-12-11T14:11:38.7817245Z   query: [32m'INSERT INTO "report_catalogs"("id", "key", "name", "description", "type", "model", "default_filters", "current_version", "active", "requires_permission", "created_by_id", "updated_by_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, DEFAULT, $3, $4, DEFAULT, $5, $6, $7, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "current_version", "active", "requires_permission", "created_at", "updated_at"'[39m,
2025-12-11T14:11:38.7818524Z   parameters: [
2025-12-11T14:11:38.7818815Z     [32m'test-catalog-2-1765462298769'[39m,
2025-12-11T14:11:38.7819129Z     [32m'Test Catalog 2'[39m,
2025-12-11T14:11:38.7819381Z     [32m'csv'[39m,
2025-12-11T14:11:38.7819613Z     [32m'manutencao'[39m,
2025-12-11T14:11:38.7819840Z     [32m'1.0.0'[39m,
2025-12-11T14:11:38.7820329Z     [33mtrue[39m,
2025-12-11T14:11:38.7820555Z     [33mfalse[39m
2025-12-11T14:11:38.7820728Z   ],
2025-12-11T14:11:38.7821208Z   driverError: error: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
2025-12-11T14:11:38.7822680Z       at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4mpg[24m/lib/client.js:545:17
2025-12-11T14:11:38.7823647Z   [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:38.7824911Z       at PostgresQueryRunner.query [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/driver/postgres/PostgresQueryRunner.ts:254:25[90m)[39m
2025-12-11T14:11:38.7826578Z       at InsertQueryBuilder.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/InsertQueryBuilder.ts:164:33[90m)[39m
2025-12-11T14:11:38.7828353Z       at SubjectExecutor.executeInsertOperations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:435:42[90m)[39m
2025-12-11T14:11:38.7829894Z       at SubjectExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/SubjectExecutor.ts:137:9[90m)[39m
2025-12-11T14:11:38.7831431Z       at EntityPersistExecutor.execute [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/persistence/EntityPersistExecutor.ts:182:21[90m)[39m
2025-12-11T14:11:38.7833174Z       at ReportCatalogService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/reports/services/report-catalog.service.ts:51:19[90m)[39m {
2025-12-11T14:11:38.7834035Z     length: [33m416[39m,
2025-12-11T14:11:38.7834301Z     severity: [32m'ERROR'[39m,
2025-12-11T14:11:38.7834552Z     code: [32m'23502'[39m,
2025-12-11T14:11:38.7835565Z     detail: [32m'Failing row contains (df80c5e0-8521-4dcb-af4e-4658d0c019cc, test-catalog-2-1765462298769, Test Catalog 2, null, csv, manutencao, null, 1.0.0, t, f, null, null, 2025-12-11 14:11:38.776367, 2025-12-11 14:11:38.776367).'[39m,
2025-12-11T14:11:38.7836359Z     hint: [90mundefined[39m,
2025-12-11T14:11:38.7836633Z     position: [90mundefined[39m,
2025-12-11T14:11:38.7836939Z     internalPosition: [90mundefined[39m,
2025-12-11T14:11:38.7837247Z     internalQuery: [90mundefined[39m,
2025-12-11T14:11:38.7837533Z     where: [90mundefined[39m,
2025-12-11T14:11:38.7837795Z     schema: [32m'public'[39m,
2025-12-11T14:11:38.7838071Z     table: [32m'report_catalogs'[39m,
2025-12-11T14:11:38.7838369Z     column: [32m'created_by_id'[39m,
2025-12-11T14:11:38.7838654Z     dataType: [90mundefined[39m,
2025-12-11T14:11:38.7838941Z     constraint: [90mundefined[39m,
2025-12-11T14:11:38.7839230Z     file: [32m'execMain.c'[39m,
2025-12-11T14:11:38.7839474Z     line: [32m'2023'[39m,
2025-12-11T14:11:38.7839755Z     routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:38.7839978Z   },
2025-12-11T14:11:38.7840163Z   length: [33m416[39m,
2025-12-11T14:11:38.7840414Z   severity: [32m'ERROR'[39m,
2025-12-11T14:11:38.7840652Z   code: [32m'23502'[39m,
2025-12-11T14:11:38.7841654Z   detail: [32m'Failing row contains (df80c5e0-8521-4dcb-af4e-4658d0c019cc, test-catalog-2-1765462298769, Test Catalog 2, null, csv, manutencao, null, 1.0.0, t, f, null, null, 2025-12-11 14:11:38.776367, 2025-12-11 14:11:38.776367).'[39m,
2025-12-11T14:11:38.7842687Z   hint: [90mundefined[39m,
2025-12-11T14:11:38.7842956Z   position: [90mundefined[39m,
2025-12-11T14:11:38.7843265Z   internalPosition: [90mundefined[39m,
2025-12-11T14:11:38.7843578Z   internalQuery: [90mundefined[39m,
2025-12-11T14:11:38.7843981Z   where: [90mundefined[39m,
2025-12-11T14:11:38.7844241Z   schema: [32m'public'[39m,
2025-12-11T14:11:38.7844522Z   table: [32m'report_catalogs'[39m,
2025-12-11T14:11:38.7844806Z   column: [32m'created_by_id'[39m,
2025-12-11T14:11:38.7845092Z   dataType: [90mundefined[39m,
2025-12-11T14:11:38.7845368Z   constraint: [90mundefined[39m,
2025-12-11T14:11:38.7845644Z   file: [32m'execMain.c'[39m,
2025-12-11T14:11:38.7845884Z   line: [32m'2023'[39m,
2025-12-11T14:11:38.7846144Z   routine: [32m'ExecConstraints'[39m
2025-12-11T14:11:38.7846370Z }
2025-12-11T14:11:39.6733841Z PASS test/integrations-erp/integrations-erp.e2e-spec.ts (13.697 s)
2025-12-11T14:11:39.6765053Z   ● Console
2025-12-11T14:11:39.6765237Z 
2025-12-11T14:11:39.6765366Z     console.log
2025-12-11T14:11:39.6766221Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
2025-12-11T14:11:39.6767215Z 
2025-12-11T14:11:39.6767500Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:39.6767885Z 
2025-12-11T14:11:39.6768035Z     console.log
2025-12-11T14:11:39.6768822Z       [setupTestUsers] ✅ Porta detectada: 32839, USERS_API_URL: http://localhost:32839/v1
2025-12-11T14:11:39.6769373Z 
2025-12-11T14:11:39.6769664Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:39.6770022Z 
2025-12-11T14:11:39.6770148Z     console.log
2025-12-11T14:11:39.6772975Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:4f05f45a-8995-4bf1-b0b5-43492b1b7cb4"],"entity":"assets","executionId":"4f05f45a-8995-4bf1-b0b5-43492b1b7cb4","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:11:37.967Z","type":"import"}
2025-12-11T14:11:39.6774661Z 
2025-12-11T14:11:39.6775129Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:11:39.6775651Z 
2025-12-11T14:11:39.6775779Z     console.log
2025-12-11T14:11:39.6778179Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:ddb89f64-36a2-413a-9d4e-806852f584ac"],"entity":"assets","executionId":"ddb89f64-36a2-413a-9d4e-806852f584ac","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:11:37.992Z","type":"export"}
2025-12-11T14:11:39.6779850Z 
2025-12-11T14:11:39.6780343Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:11:39.6780857Z 
2025-12-11T14:11:39.6780978Z     console.log
2025-12-11T14:11:39.6783779Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:1899d834-611d-4c37-a31d-8752ecb1849d"],"entity":"costCenters","executionId":"1899d834-611d-4c37-a31d-8752ecb1849d","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:11:38.002Z","type":"import"}
2025-12-11T14:11:39.6785515Z 
2025-12-11T14:11:39.6785987Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:11:39.6786513Z 
2025-12-11T14:11:39.6786650Z     console.log
2025-12-11T14:11:39.6789141Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:e3dbf172-2107-45c3-92f7-e5174fd97922"],"entity":"locations","executionId":"e3dbf172-2107-45c3-92f7-e5174fd97922","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:11:38.013Z","type":"import"}
2025-12-11T14:11:39.6790853Z 
2025-12-11T14:11:39.6791311Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:11:39.6792171Z 
2025-12-11T14:11:39.6792315Z     console.log
2025-12-11T14:11:39.6794815Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:29cf288a-9270-49e6-a655-2d356abe8690"],"entity":"depreciations","executionId":"29cf288a-9270-49e6-a655-2d356abe8690","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:11:38.023Z","type":"import"}
2025-12-11T14:11:39.6796573Z 
2025-12-11T14:11:39.6797281Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:11:39.6797817Z 
2025-12-11T14:11:40.1903518Z FAIL test/reports-catalog/reports-catalog.e2e-spec.ts (12.902 s)
2025-12-11T14:11:40.2201060Z   ● Console
2025-12-11T14:11:40.2207479Z 
2025-12-11T14:11:40.2207858Z     console.log
2025-12-11T14:11:40.2208951Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
2025-12-11T14:11:40.2209653Z 
2025-12-11T14:11:40.2210171Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:40.2210531Z 
2025-12-11T14:11:40.2210666Z     console.log
2025-12-11T14:11:40.2211487Z       [setupTestUsers] ✅ Porta detectada: 35289, USERS_API_URL: http://localhost:35289/v1
2025-12-11T14:11:40.2212190Z 
2025-12-11T14:11:40.2212479Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:40.2213358Z 
2025-12-11T14:11:40.2213505Z     console.warn
2025-12-11T14:11:40.2214080Z       ⚠️ catalogId1 não definido, pulando teste
2025-12-11T14:11:40.2222444Z 
2025-12-11T14:11:40.2223018Z     [0m [90m 344 |[39m       [90m// Garantir que catalogId1 existe[39m
2025-12-11T14:11:40.2223874Z      [90m 345 |[39m       [36mif[39m ([33m![39mcatalogId1) {
2025-12-11T14:11:40.2225145Z     [31m[1m>[22m[39m[90m 346 |[39m         console[33m.[39mwarn([32m'⚠️ catalogId1 não definido, pulando teste'[39m)[33m;[39m
2025-12-11T14:11:40.2226208Z      [90m     |[39m                 [31m[1m^[22m[39m
2025-12-11T14:11:40.2226938Z      [90m 347 |[39m         [36mreturn[39m[33m;[39m
2025-12-11T14:11:40.2227517Z      [90m 348 |[39m       }
2025-12-11T14:11:40.2228050Z      [90m 349 |[39m[0m
2025-12-11T14:11:40.2228289Z 
2025-12-11T14:11:40.2228738Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:346:17)
2025-12-11T14:11:40.2229269Z 
2025-12-11T14:11:40.2229446Z     console.warn
2025-12-11T14:11:40.2230049Z       ⚠️ catalogId2 não definido, pulando teste
2025-12-11T14:11:40.2230399Z 
2025-12-11T14:11:40.2231237Z     [0m [90m 388 |[39m       [90m// Garantir que catalogId2 existe (foi criado no segundo teste de POST /catalog)[39m
2025-12-11T14:11:40.2232565Z      [90m 389 |[39m       [36mif[39m ([33m![39mcatalogId2) {
2025-12-11T14:11:40.2233820Z     [31m[1m>[22m[39m[90m 390 |[39m         console[33m.[39mwarn([32m'⚠️ catalogId2 não definido, pulando teste'[39m)[33m;[39m
2025-12-11T14:11:40.2234885Z      [90m     |[39m                 [31m[1m^[22m[39m
2025-12-11T14:11:40.2235592Z      [90m 391 |[39m         [36mreturn[39m[33m;[39m
2025-12-11T14:11:40.2236162Z      [90m 392 |[39m       }
2025-12-11T14:11:40.2236619Z      [90m 393 |[39m[0m
2025-12-11T14:11:40.2236848Z 
2025-12-11T14:11:40.2237294Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:390:17)
2025-12-11T14:11:40.2237826Z 
2025-12-11T14:11:40.2237999Z     console.warn
2025-12-11T14:11:40.2238680Z       ⚠️ permissionId1 não definido, pulando teste de delete
2025-12-11T14:11:40.2239089Z 
2025-12-11T14:11:40.2239642Z     [0m [90m 449 |[39m       [90m// Garantir que permissionId1 foi definido[39m
2025-12-11T14:11:40.2240537Z      [90m 450 |[39m       [36mif[39m ([33m![39mpermissionId1) {
2025-12-11T14:11:40.2242094Z     [31m[1m>[22m[39m[90m 451 |[39m         console[33m.[39mwarn([32m'⚠️ permissionId1 não definido, pulando teste de delete'[39m)[33m;[39m
2025-12-11T14:11:40.2243250Z      [90m     |[39m                 [31m[1m^[22m[39m
2025-12-11T14:11:40.2243949Z      [90m 452 |[39m         [36mreturn[39m[33m;[39m
2025-12-11T14:11:40.2244517Z      [90m 453 |[39m       }
2025-12-11T14:11:40.2244979Z      [90m 454 |[39m[0m
2025-12-11T14:11:40.2245223Z 
2025-12-11T14:11:40.2245658Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:451:17)
2025-12-11T14:11:40.2246179Z 
2025-12-11T14:11:40.2247086Z   ● Reports Catalog (e2e) › POST /v1/reports/catalog › deve criar catálogo de relatório com sucesso (201) - ADMIN
2025-12-11T14:11:40.2247790Z 
2025-12-11T14:11:40.2248481Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:40.2248913Z 
2025-12-11T14:11:40.2249206Z     [0m [90m 138 |[39m       )
2025-12-11T14:11:40.2249886Z      [90m 139 |[39m         [33m.[39msend(createCatalogDto)
2025-12-11T14:11:40.2250794Z     [31m[1m>[22m[39m[90m 140 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:40.2251588Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:40.2252372Z      [90m 141 |[39m
2025-12-11T14:11:40.2253294Z      [90m 142 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:40.2254887Z      [90m 143 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'key'[39m[33m,[39m createCatalogDto[33m.[39mkey)[33m;[39m[0m
2025-12-11T14:11:40.2256004Z 
2025-12-11T14:11:40.2256480Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:140:10)
2025-12-11T14:11:40.2257151Z       ----
2025-12-11T14:11:40.2257736Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2258474Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2259235Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2260033Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2260830Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2261519Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2262523Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2263393Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2264315Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2264870Z 
2025-12-11T14:11:40.2265733Z   ● Reports Catalog (e2e) › POST /v1/reports/catalog › deve criar segundo catálogo com sucesso (201) - ADMIN
2025-12-11T14:11:40.2266411Z 
2025-12-11T14:11:40.2266743Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:40.2267145Z 
2025-12-11T14:11:40.2267448Z     [0m [90m 168 |[39m       )
2025-12-11T14:11:40.2268158Z      [90m 169 |[39m         [33m.[39msend(createCatalogDto)
2025-12-11T14:11:40.2269059Z     [31m[1m>[22m[39m[90m 170 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:40.2269838Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:40.2270391Z      [90m 171 |[39m
2025-12-11T14:11:40.2271297Z      [90m 172 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:40.2272768Z      [90m 173 |[39m       catalogId2 [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m[0m
2025-12-11T14:11:40.2273328Z 
2025-12-11T14:11:40.2273788Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:170:10)
2025-12-11T14:11:40.2274443Z       ----
2025-12-11T14:11:40.2274999Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2275726Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2276468Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2289341Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2290163Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2290869Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2291634Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2292742Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2293683Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2294248Z 
2025-12-11T14:11:40.2295356Z   ● Reports Catalog (e2e) › GET /v1/reports/catalog/:id › deve buscar catálogo por ID com sucesso (200) - ADMIN
2025-12-11T14:11:40.2296076Z 
2025-12-11T14:11:40.2296332Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T14:11:40.2296662Z 
2025-12-11T14:11:40.2297017Z     [0m [90m 229 |[39m         tokens[33m,[39m
2025-12-11T14:11:40.2297816Z      [90m 230 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T14:11:40.2298733Z     [31m[1m>[22m[39m[90m 231 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:40.2299449Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:40.2299932Z      [90m 232 |[39m
2025-12-11T14:11:40.2300820Z      [90m 233 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m catalogId1)[33m;[39m
2025-12-11T14:11:40.2302420Z      [90m 234 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'key'[39m)[33m;[39m[0m
2025-12-11T14:11:40.2303307Z 
2025-12-11T14:11:40.2303774Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:231:9)
2025-12-11T14:11:40.2304385Z       ----
2025-12-11T14:11:40.2304935Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2305631Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2306338Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2307105Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2307818Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2308455Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2309213Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2310050Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2311003Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2311557Z 
2025-12-11T14:11:40.2312670Z   ● Reports Catalog (e2e) › GET /v1/reports/catalog/:id › deve buscar catálogo por ID com sucesso (200) - MANAGER
2025-12-11T14:11:40.2313267Z 
2025-12-11T14:11:40.2313459Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T14:11:40.2313731Z 
2025-12-11T14:11:40.2314075Z     [0m [90m 243 |[39m         tokens[33m,[39m
2025-12-11T14:11:40.2315003Z      [90m 244 |[39m         [33mUserRole[39m[33m.[39m[33mMANAGER[39m[33m,[39m
2025-12-11T14:11:40.2315979Z     [31m[1m>[22m[39m[90m 245 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:40.2316758Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:40.2317305Z      [90m 246 |[39m
2025-12-11T14:11:40.2318383Z      [90m 247 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m catalogId1)[33m;[39m
2025-12-11T14:11:40.2319293Z      [90m 248 |[39m     })[33m;[39m[0m
2025-12-11T14:11:40.2319548Z 
2025-12-11T14:11:40.2319997Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:245:9)
2025-12-11T14:11:40.2320650Z       ----
2025-12-11T14:11:40.2321223Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2322164Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2322942Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2323749Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2324502Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2325188Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2325968Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2326834Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2327773Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2328547Z 
2025-12-11T14:11:40.2329508Z   ● Reports Catalog (e2e) › GET /v1/reports/catalog/key/:key › deve buscar catálogo por chave com sucesso (200) - ADMIN
2025-12-11T14:11:40.2330262Z 
2025-12-11T14:11:40.2330498Z     expected 200 "OK", got 404 "Not Found"
2025-12-11T14:11:40.2330819Z 
2025-12-11T14:11:40.2331209Z     [0m [90m 257 |[39m         tokens[33m,[39m
2025-12-11T14:11:40.2332259Z      [90m 258 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T14:11:40.2333271Z     [31m[1m>[22m[39m[90m 259 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:40.2334079Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:40.2334614Z      [90m 260 |[39m
2025-12-11T14:11:40.2335690Z      [90m 261 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'key'[39m[33m,[39m catalogKey1)[33m;[39m
2025-12-11T14:11:40.2337468Z      [90m 262 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m[0m
2025-12-11T14:11:40.2338084Z 
2025-12-11T14:11:40.2338548Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:259:9)
2025-12-11T14:11:40.2339199Z       ----
2025-12-11T14:11:40.2339702Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2340424Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2341183Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2342212Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2342971Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2343671Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2344441Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2345311Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2346224Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2346763Z 
2025-12-11T14:11:40.2347696Z   ● Reports Catalog (e2e) › GET /v1/reports/catalog/key/:key › deve buscar catálogo por chave com sucesso (200) - MANAGER
2025-12-11T14:11:40.2348421Z 
2025-12-11T14:11:40.2348655Z     expected 200 "OK", got 404 "Not Found"
2025-12-11T14:11:40.2348986Z 
2025-12-11T14:11:40.2349355Z     [0m [90m 270 |[39m         tokens[33m,[39m
2025-12-11T14:11:40.2350195Z      [90m 271 |[39m         [33mUserRole[39m[33m.[39m[33mMANAGER[39m[33m,[39m
2025-12-11T14:11:40.2351185Z     [31m[1m>[22m[39m[90m 272 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:40.2352213Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:40.2352790Z      [90m 273 |[39m
2025-12-11T14:11:40.2353886Z      [90m 274 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'key'[39m[33m,[39m catalogKey1)[33m;[39m
2025-12-11T14:11:40.2354943Z      [90m 275 |[39m     })[33m;[39m[0m
2025-12-11T14:11:40.2355252Z 
2025-12-11T14:11:40.2355707Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:272:9)
2025-12-11T14:11:40.2356366Z       ----
2025-12-11T14:11:40.2356918Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2357651Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2358397Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2359219Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2359971Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2360666Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2361448Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2362795Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2363782Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2364343Z 
2025-12-11T14:11:40.2365167Z   ● Reports Catalog (e2e) › PUT /v1/reports/catalog/:id › deve atualizar catálogo com sucesso (200) - ADMIN
2025-12-11T14:11:40.2365832Z 
2025-12-11T14:11:40.2366074Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T14:11:40.2366405Z 
2025-12-11T14:11:40.2366696Z     [0m [90m 292 |[39m       )
2025-12-11T14:11:40.2367378Z      [90m 293 |[39m         [33m.[39msend(updateCatalogDto)
2025-12-11T14:11:40.2368333Z     [31m[1m>[22m[39m[90m 294 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:40.2369128Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:40.2369668Z      [90m 295 |[39m
2025-12-11T14:11:40.2371034Z      [90m 296 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m catalogId1)[33m;[39m
2025-12-11T14:11:40.2373052Z      [90m 297 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'name'[39m[33m,[39m updateCatalogDto[33m.[39mname)[33m;[39m[0m
2025-12-11T14:11:40.2373877Z 
2025-12-11T14:11:40.2374330Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:294:10)
2025-12-11T14:11:40.2374964Z       ----
2025-12-11T14:11:40.2375503Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2376160Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2376839Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2377565Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2378248Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2378878Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2379564Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2380347Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2381171Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2381671Z 
2025-12-11T14:11:40.2382781Z   ● Reports Catalog (e2e) › POST /v1/reports/catalog/:id/versions › deve criar versão de catálogo com sucesso (201) - ADMIN
2025-12-11T14:11:40.2383471Z 
2025-12-11T14:11:40.2383699Z     expected 201 "Created", got 400 "Bad Request"
2025-12-11T14:11:40.2384021Z 
2025-12-11T14:11:40.2384253Z     [0m [90m 318 |[39m       )
2025-12-11T14:11:40.2384850Z      [90m 319 |[39m         [33m.[39msend(createVersionDto)
2025-12-11T14:11:40.2385653Z     [31m[1m>[22m[39m[90m 320 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:40.2386349Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:40.2386809Z      [90m 321 |[39m
2025-12-11T14:11:40.2387638Z      [90m 322 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:40.2389168Z      [90m 323 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'version'[39m[33m,[39m createVersionDto[33m.[39mversion)[33m;[39m[0m
2025-12-11T14:11:40.2389952Z 
2025-12-11T14:11:40.2390364Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:320:10)
2025-12-11T14:11:40.2390945Z       ----
2025-12-11T14:11:40.2391459Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2392341Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2393074Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2393862Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2394620Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2395290Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2396304Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2397206Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2398115Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2398655Z 
2025-12-11T14:11:40.2399763Z   ● Reports Catalog (e2e) › PUT /v1/reports/catalog/:id/versions/:version/current › deve definir versão como atual com sucesso (200) - ADMIN
2025-12-11T14:11:40.2400644Z 
2025-12-11T14:11:40.2400908Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T14:11:40.2401240Z 
2025-12-11T14:11:40.2401615Z     [0m [90m 336 |[39m         tokens[33m,[39m
2025-12-11T14:11:40.2403169Z      [90m 337 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m [90m// PUT /catalog/:id/versions/:version/current requer apenas ADMIN[39m
2025-12-11T14:11:40.2404821Z     [31m[1m>[22m[39m[90m 338 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:40.2405606Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:40.2406203Z      [90m 339 |[39m     })[33m;[39m
2025-12-11T14:11:40.2406757Z      [90m 340 |[39m   })[33m;[39m
2025-12-11T14:11:40.2407223Z      [90m 341 |[39m[0m
2025-12-11T14:11:40.2407463Z 
2025-12-11T14:11:40.2407901Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:338:9)
2025-12-11T14:11:40.2408534Z       ----
2025-12-11T14:11:40.2409053Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2409779Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2410537Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2411334Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2412319Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2413032Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2413792Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2414698Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2415636Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2416187Z 
2025-12-11T14:11:40.2417406Z   ● Reports Catalog (e2e) › GET /v1/reports/catalog/permissions/catalog/:catalogId › deve listar permissões do catálogo com sucesso (200) - ADMIN
2025-12-11T14:11:40.2418344Z 
2025-12-11T14:11:40.2418595Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T14:11:40.2418925Z 
2025-12-11T14:11:40.2419297Z     [0m [90m 424 |[39m         tokens[33m,[39m
2025-12-11T14:11:40.2420659Z      [90m 425 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m [90m// GET /catalog/permissions/catalog/:catalogId requer apenas ADMIN[39m
2025-12-11T14:11:40.2422173Z     [31m[1m>[22m[39m[90m 426 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:40.2422942Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:40.2423460Z      [90m 427 |[39m
2025-12-11T14:11:40.2424539Z      [90m 428 |[39m       expect([33mArray[39m[33m.[39misArray(response[33m.[39mbody))[33m.[39mtoBe([36mtrue[39m)[33m;[39m
2025-12-11T14:11:40.2426150Z      [90m 429 |[39m       expect(response[33m.[39mbody[33m.[39mlength)[33m.[39mtoBeGreaterThanOrEqual([35m0[39m)[33m;[39m[0m
2025-12-11T14:11:40.2426878Z 
2025-12-11T14:11:40.2427344Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:426:9)
2025-12-11T14:11:40.2428004Z       ----
2025-12-11T14:11:40.2428577Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2429316Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2430055Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2431134Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2432163Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2432864Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2433620Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2434470Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2435385Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2435935Z 
2025-12-11T14:11:40.2436795Z   ● Reports Catalog (e2e) › DELETE /v1/reports/catalog/:id › deve deletar catálogo com sucesso (204) - ADMIN
2025-12-11T14:11:40.2437447Z 
2025-12-11T14:11:40.2437731Z     expected 204 "No Content", got 400 "Bad Request"
2025-12-11T14:11:40.2438373Z 
2025-12-11T14:11:40.2438747Z     [0m [90m 471 |[39m         tokens[33m,[39m
2025-12-11T14:11:40.2439953Z      [90m 472 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m [90m// DELETE /catalog/:id requer apenas ADMIN[39m
2025-12-11T14:11:40.2441196Z     [31m[1m>[22m[39m[90m 473 |[39m       )[33m.[39mexpect([35m204[39m)[33m;[39m
2025-12-11T14:11:40.2442178Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:40.2442798Z      [90m 474 |[39m     })[33m;[39m
2025-12-11T14:11:40.2443354Z      [90m 475 |[39m   })[33m;[39m
2025-12-11T14:11:40.2443918Z      [90m 476 |[39m })[33m;[39m[0m
2025-12-11T14:11:40.2444213Z 
2025-12-11T14:11:40.2444645Z       at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:473:9)
2025-12-11T14:11:40.2445301Z       ----
2025-12-11T14:11:40.2445839Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:40.2446573Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:40.2447318Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:40.2448161Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:40.2448914Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:40.2449611Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:40.2450384Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:40.2451226Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:40.2452347Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:40.2452888Z 
2025-12-11T14:11:51.1744271Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T14:11:51.1746974Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T14:11:51.1748299Z     at Array.forEach (<anonymous>)
2025-12-11T14:11:51.1750283Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T14:11:51.1753358Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T14:11:51.1755678Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T14:11:51.1758137Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T14:11:51.1760162Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T14:11:51.1762297Z     at EventsService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:180:55[90m)[39m
2025-12-11T14:11:51.1763709Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2089297Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T14:11:51.2092747Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T14:11:51.2094126Z     at Array.forEach (<anonymous>)
2025-12-11T14:11:51.2096251Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T14:11:51.2099538Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T14:11:51.2102992Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T14:11:51.2106087Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T14:11:51.2108925Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T14:11:51.2111696Z     at EventsService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:180:55[90m)[39m
2025-12-11T14:11:51.2114000Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2169900Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T14:11:51.2172817Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T14:11:51.2175882Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T14:11:51.2178998Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T14:11:51.2182332Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T14:11:51.2185391Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T14:11:51.2188560Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:222:8[90m)[39m
2025-12-11T14:11:51.2191465Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:146:31[90m)[39m
2025-12-11T14:11:51.2194585Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2196661Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2214383Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T14:11:51.2217328Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T14:11:51.2220361Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T14:11:51.2223700Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T14:11:51.2226732Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T14:11:51.2229798Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T14:11:51.2232959Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:222:8[90m)[39m
2025-12-11T14:11:51.2235833Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:146:31[90m)[39m
2025-12-11T14:11:51.2238733Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2240763Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2257381Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T14:11:51.2260089Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T14:11:51.2263351Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T14:11:51.2266501Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T14:11:51.2269812Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T14:11:51.2273095Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T14:11:51.2276022Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:222:8[90m)[39m
2025-12-11T14:11:51.2278886Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:146:31[90m)[39m
2025-12-11T14:11:51.2282010Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2284328Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2302630Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T14:11:51.2305272Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T14:11:51.2308296Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T14:11:51.2311403Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T14:11:51.2314666Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T14:11:51.2317697Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T14:11:51.2320609Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:222:8[90m)[39m
2025-12-11T14:11:51.2323683Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:146:31[90m)[39m
2025-12-11T14:11:51.2326609Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2328667Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2350154Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T14:11:51.2352712Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T14:11:51.2355378Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T14:11:51.2359420Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T14:11:51.2362243Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T14:11:51.2364247Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T14:11:51.2365896Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:222:8[90m)[39m
2025-12-11T14:11:51.2367625Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:146:31[90m)[39m
2025-12-11T14:11:51.2369221Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2370347Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2385645Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T14:11:51.2387149Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T14:11:51.2388745Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T14:11:51.2390339Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T14:11:51.2392578Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T14:11:51.2394845Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T14:11:51.2396387Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:222:8[90m)[39m
2025-12-11T14:11:51.2397886Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:146:31[90m)[39m
2025-12-11T14:11:51.2399412Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2400478Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2422414Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T14:11:51.2424242Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T14:11:51.2425336Z     at Array.forEach (<anonymous>)
2025-12-11T14:11:51.2426671Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T14:11:51.2428723Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T14:11:51.2432200Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T14:11:51.2433989Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T14:11:51.2436790Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T14:11:51.2439511Z     at EventsService.findOneByIdOrSlug [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:346:46[90m)[39m
2025-12-11T14:11:51.2441239Z     at EventsController.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:180:31[90m)[39m
2025-12-11T14:11:51.2442861Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2443909Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2457623Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T14:11:51.2459004Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T14:11:51.2459713Z     at Array.forEach (<anonymous>)
2025-12-11T14:11:51.2460772Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T14:11:51.2462649Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T14:11:51.2464299Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T14:11:51.2466836Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T14:11:51.2468334Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T14:11:51.2469803Z     at EventsService.findOneByIdOrSlug [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:346:46[90m)[39m
2025-12-11T14:11:51.2471469Z     at EventsController.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:180:31[90m)[39m
2025-12-11T14:11:51.2473254Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T14:11:51.2474284Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2616595Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T14:11:51.2619042Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T14:11:51.2620162Z     at Array.forEach (<anonymous>)
2025-12-11T14:11:51.2621527Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T14:11:51.2623901Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T14:11:51.2626750Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T14:11:51.2628771Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T14:11:51.2630587Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T14:11:51.2632493Z     at EventsService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:180:55[90m)[39m
2025-12-11T14:11:51.2633691Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.2750134Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T14:11:51.2752023Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T14:11:51.2752933Z     at Array.forEach (<anonymous>)
2025-12-11T14:11:51.2754278Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T14:11:51.2756649Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T14:11:51.2759250Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T14:11:51.2761334Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T14:11:51.2763704Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T14:11:51.2765210Z     at EventsService.create [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:180:55[90m)[39m
2025-12-11T14:11:51.2766222Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T14:11:51.7787475Z [31m[Nest] 3469  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4 (attempt 1):[39m
2025-12-11T14:11:51.7788867Z No metadata for "Patrimonio" was found.
2025-12-11T14:11:51.8572729Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório 7f5c41ca-d798-4854-993d-a8d837d92a02 (attempt 1):[39m
2025-12-11T14:11:51.8574943Z Relation with property path patrimonio in entity was not found.
2025-12-11T14:11:51.8759878Z [31m[Nest] 3469  - [39m12/11/2025, 2:11:51 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório 228406c9-ff1e-45a0-964d-fc48cc8fd8bc (attempt 1):[39m
2025-12-11T14:11:51.8760648Z No metadata for "Patrimonio" was found.
2025-12-11T14:11:52.6339681Z FAIL test/events/events.e2e-spec.ts (12.95 s)
2025-12-11T14:11:52.6347398Z   ● Console
2025-12-11T14:11:52.6347581Z 
2025-12-11T14:11:52.6347714Z     console.log
2025-12-11T14:11:52.6348578Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
2025-12-11T14:11:52.6349121Z 
2025-12-11T14:11:52.6349385Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:11:52.6349723Z 
2025-12-11T14:11:52.6349841Z     console.log
2025-12-11T14:11:52.6350627Z       [setupTestUsers] ✅ Porta detectada: 34773, USERS_API_URL: http://localhost:34773/v1
2025-12-11T14:11:52.6351195Z 
2025-12-11T14:11:52.6351479Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:11:52.6352015Z 
2025-12-11T14:11:52.6352628Z   ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN
2025-12-11T14:11:52.6353094Z 
2025-12-11T14:11:52.6353410Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:52.6353780Z 
2025-12-11T14:11:52.6354055Z     [0m [90m 131 |[39m       )
2025-12-11T14:11:52.6354761Z      [90m 132 |[39m         [33m.[39msend(createEventDto)
2025-12-11T14:11:52.6355543Z     [31m[1m>[22m[39m[90m 133 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:52.6356351Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6356873Z      [90m 134 |[39m
2025-12-11T14:11:52.6357728Z      [90m 135 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:52.6359465Z      [90m 136 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m createEventDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T14:11:52.6360308Z 
2025-12-11T14:11:52.6360624Z       at Object.<anonymous> (events/events.e2e-spec.ts:133:10)
2025-12-11T14:11:52.6361113Z       ----
2025-12-11T14:11:52.6361670Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6362679Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6363431Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6364235Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6364979Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6365614Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6366339Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6367184Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6368464Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6369033Z 
2025-12-11T14:11:52.6369669Z   ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER
2025-12-11T14:11:52.6370151Z 
2025-12-11T14:11:52.6370455Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:52.6370832Z 
2025-12-11T14:11:52.6371093Z     [0m [90m 173 |[39m       )
2025-12-11T14:11:52.6371710Z      [90m 174 |[39m         [33m.[39msend(createEventDto)
2025-12-11T14:11:52.6372812Z     [31m[1m>[22m[39m[90m 175 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:52.6373556Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6374045Z      [90m 176 |[39m
2025-12-11T14:11:52.6374896Z      [90m 177 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:11:52.6376751Z      [90m 178 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m createEventDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T14:11:52.6377533Z 
2025-12-11T14:11:52.6377840Z       at Object.<anonymous> (events/events.e2e-spec.ts:175:10)
2025-12-11T14:11:52.6378333Z       ----
2025-12-11T14:11:52.6378849Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6379540Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6380246Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6380991Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6381682Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6382588Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6383302Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6384103Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6384958Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6385463Z 
2025-12-11T14:11:52.6385996Z   ● Events (e2e) › GET /v1/events › deve listar eventos com paginação (200)
2025-12-11T14:11:52.6386446Z 
2025-12-11T14:11:52.6386719Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6387074Z 
2025-12-11T14:11:52.6387357Z     [0m [90m 193 |[39m       )
2025-12-11T14:11:52.6388289Z      [90m 194 |[39m         [33m.[39mquery({ page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T14:11:52.6389357Z     [31m[1m>[22m[39m[90m 195 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6390117Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6390600Z      [90m 196 |[39m
2025-12-11T14:11:52.6391513Z      [90m 197 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'data'[39m)[33m;[39m
2025-12-11T14:11:52.6393063Z      [90m 198 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'total'[39m)[33m;[39m[0m
2025-12-11T14:11:52.6393654Z 
2025-12-11T14:11:52.6393972Z       at Object.<anonymous> (events/events.e2e-spec.ts:195:10)
2025-12-11T14:11:52.6394463Z       ----
2025-12-11T14:11:52.6394968Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6395652Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6396315Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6397075Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6397801Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6398428Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6399178Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6400247Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6401177Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6401626Z 
2025-12-11T14:11:52.6402470Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por eventType (200)
2025-12-11T14:11:52.6402934Z 
2025-12-11T14:11:52.6403199Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6403560Z 
2025-12-11T14:11:52.6403853Z     [0m [90m 214 |[39m       )
2025-12-11T14:11:52.6405389Z      [90m 215 |[39m         [33m.[39mquery({ eventType[33m:[39m [33mEventType[39m[33m.[39m[33mMANUTENCAO[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T14:11:52.6406870Z     [31m[1m>[22m[39m[90m 216 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6407879Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6408420Z      [90m 217 |[39m
2025-12-11T14:11:52.6409328Z      [90m 218 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T14:11:52.6410707Z      [90m 219 |[39m       [36mif[39m (response[33m.[39mbody[33m.[39mdata[33m.[39mlength [33m>[39m [35m0[39m) {[0m
2025-12-11T14:11:52.6411336Z 
2025-12-11T14:11:52.6411665Z       at Object.<anonymous> (events/events.e2e-spec.ts:216:10)
2025-12-11T14:11:52.6412417Z       ----
2025-12-11T14:11:52.6412980Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6413703Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6414459Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6415237Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6415997Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6416708Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6417474Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6418332Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6419253Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6419895Z 
2025-12-11T14:11:52.6420447Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por state (200)
2025-12-11T14:11:52.6420923Z 
2025-12-11T14:11:52.6421210Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6421581Z 
2025-12-11T14:11:52.6422133Z     [0m [90m 233 |[39m       )
2025-12-11T14:11:52.6423592Z      [90m 234 |[39m         [33m.[39mquery({ state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T14:11:52.6425009Z     [31m[1m>[22m[39m[90m 235 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6425771Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6426198Z      [90m 236 |[39m
2025-12-11T14:11:52.6427072Z      [90m 237 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T14:11:52.6427967Z      [90m 238 |[39m     })[33m;[39m[0m
2025-12-11T14:11:52.6428278Z 
2025-12-11T14:11:52.6428600Z       at Object.<anonymous> (events/events.e2e-spec.ts:235:10)
2025-12-11T14:11:52.6429152Z       ----
2025-12-11T14:11:52.6429707Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6430438Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6431200Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6432249Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6433051Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6434001Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6434740Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6435601Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6436496Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6437047Z 
2025-12-11T14:11:52.6437649Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por visibility (200)
2025-12-11T14:11:52.6438139Z 
2025-12-11T14:11:52.6438425Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6438804Z 
2025-12-11T14:11:52.6439087Z     [0m [90m 247 |[39m       )
2025-12-11T14:11:52.6440627Z      [90m 248 |[39m         [33m.[39mquery({ visibility[33m:[39m [33mEventVisibility[39m[33m.[39m[33mPUBLIC[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T14:11:52.6442663Z     [31m[1m>[22m[39m[90m 249 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6443420Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6443918Z      [90m 250 |[39m
2025-12-11T14:11:52.6444795Z      [90m 251 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T14:11:52.6445642Z      [90m 252 |[39m     })[33m;[39m[0m
2025-12-11T14:11:52.6445943Z 
2025-12-11T14:11:52.6446263Z       at Object.<anonymous> (events/events.e2e-spec.ts:249:10)
2025-12-11T14:11:52.6446778Z       ----
2025-12-11T14:11:52.6447334Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6448054Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6448795Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6449613Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6450363Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6451031Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6451953Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6452808Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6453704Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6454242Z 
2025-12-11T14:11:52.6454776Z   ● Events (e2e) › GET /v1/events › deve buscar eventos por texto (q) (200)
2025-12-11T14:11:52.6455244Z 
2025-12-11T14:11:52.6455519Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6455796Z 
2025-12-11T14:11:52.6455994Z     [0m [90m 261 |[39m       )
2025-12-11T14:11:52.6456965Z      [90m 262 |[39m         [33m.[39mquery({ q[33m:[39m [32m'Teste'[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T14:11:52.6458134Z     [31m[1m>[22m[39m[90m 263 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6458906Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6459432Z      [90m 264 |[39m
2025-12-11T14:11:52.6460353Z      [90m 265 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T14:11:52.6461265Z      [90m 266 |[39m     })[33m;[39m[0m
2025-12-11T14:11:52.6461591Z 
2025-12-11T14:11:52.6462200Z       at Object.<anonymous> (events/events.e2e-spec.ts:263:10)
2025-12-11T14:11:52.6462715Z       ----
2025-12-11T14:11:52.6463208Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6463876Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6464571Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6465316Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6466024Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6466914Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6467707Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6468565Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6469470Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6470015Z 
2025-12-11T14:11:52.6470657Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por intervalo de datas (200)
2025-12-11T14:11:52.6471206Z 
2025-12-11T14:11:52.6471485Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6472045Z 
2025-12-11T14:11:52.6472315Z     [0m [90m 280 |[39m       )
2025-12-11T14:11:52.6474094Z      [90m 281 |[39m         [33m.[39mquery({ [36mfrom[39m[33m:[39m [36mfrom[39m[33m.[39mtoISOString()[33m,[39m to[33m:[39m to[33m.[39mtoISOString()[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T14:11:52.6475943Z     [31m[1m>[22m[39m[90m 282 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6476698Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6477206Z      [90m 283 |[39m
2025-12-11T14:11:52.6478082Z      [90m 284 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T14:11:52.6478935Z      [90m 285 |[39m     })[33m;[39m[0m
2025-12-11T14:11:52.6479234Z 
2025-12-11T14:11:52.6479568Z       at Object.<anonymous> (events/events.e2e-spec.ts:282:10)
2025-12-11T14:11:52.6480098Z       ----
2025-12-11T14:11:52.6480659Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6481377Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6482356Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6483189Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6483941Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6484622Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6485390Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6486245Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6487165Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6487579Z 
2025-12-11T14:11:52.6488022Z   ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por ID (200)
2025-12-11T14:11:52.6488435Z 
2025-12-11T14:11:52.6488688Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6489037Z 
2025-12-11T14:11:52.6489349Z     [0m [90m 294 |[39m         tokens[33m,[39m
2025-12-11T14:11:52.6490559Z      [90m 295 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m [90m// GET /events/:idOrSlug requer autenticação[39m
2025-12-11T14:11:52.6492019Z     [31m[1m>[22m[39m[90m 296 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6492815Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:52.6493325Z      [90m 297 |[39m
2025-12-11T14:11:52.6494387Z      [90m 298 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T14:11:52.6495833Z      [90m 299 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m)[33m;[39m[0m
2025-12-11T14:11:52.6496462Z 
2025-12-11T14:11:52.6496779Z       at Object.<anonymous> (events/events.e2e-spec.ts:296:9)
2025-12-11T14:11:52.6497236Z       ----
2025-12-11T14:11:52.6497756Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6498522Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6499533Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6500418Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6501164Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6502119Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6502597Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6503059Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6503545Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6503829Z 
2025-12-11T14:11:52.6504177Z   ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por slug (200)
2025-12-11T14:11:52.6504445Z 
2025-12-11T14:11:52.6504600Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T14:11:52.6504991Z 
2025-12-11T14:11:52.6505176Z     [0m [90m 308 |[39m         tokens[33m,[39m
2025-12-11T14:11:52.6505617Z      [90m 309 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T14:11:52.6506119Z     [31m[1m>[22m[39m[90m 310 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6506517Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T14:11:52.6506781Z      [90m 311 |[39m
2025-12-11T14:11:52.6507338Z      [90m 312 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T14:11:52.6508158Z      [90m 313 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'slug'[39m[33m,[39m eventSlug1)[33m;[39m[0m
2025-12-11T14:11:52.6508540Z 
2025-12-11T14:11:52.6508713Z       at Object.<anonymous> (events/events.e2e-spec.ts:310:9)
2025-12-11T14:11:52.6509005Z       ----
2025-12-11T14:11:52.6509316Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6509690Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6510093Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6510525Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6510916Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6511260Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6511659Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6512367Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6512842Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6513120Z 
2025-12-11T14:11:52.6513523Z   ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - ADMIN (proprietário)
2025-12-11T14:11:52.6513869Z 
2025-12-11T14:11:52.6513990Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T14:11:52.6514168Z 
2025-12-11T14:11:52.6514310Z     [0m [90m 330 |[39m       )
2025-12-11T14:11:52.6514645Z      [90m 331 |[39m         [33m.[39msend(updateDto)
2025-12-11T14:11:52.6515091Z     [31m[1m>[22m[39m[90m 332 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6515496Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6515769Z      [90m 333 |[39m
2025-12-11T14:11:52.6516316Z      [90m 334 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T14:11:52.6517185Z      [90m 335 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m updateDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T14:11:52.6517597Z 
2025-12-11T14:11:52.6517776Z       at Object.<anonymous> (events/events.e2e-spec.ts:332:10)
2025-12-11T14:11:52.6518065Z       ----
2025-12-11T14:11:52.6518365Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6518881Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6519286Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6519754Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6520145Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6520489Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6520885Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6521336Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6522001Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6522303Z 
2025-12-11T14:11:52.6522713Z   ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - MANAGER (proprietário)
2025-12-11T14:11:52.6523193Z 
2025-12-11T14:11:52.6523336Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T14:11:52.6523507Z 
2025-12-11T14:11:52.6523642Z     [0m [90m 350 |[39m       )
2025-12-11T14:11:52.6523965Z      [90m 351 |[39m         [33m.[39msend(updateDto)
2025-12-11T14:11:52.6524411Z     [31m[1m>[22m[39m[90m 352 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:11:52.6524797Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6525063Z      [90m 353 |[39m
2025-12-11T14:11:52.6525610Z      [90m 354 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId2)[33m;[39m
2025-12-11T14:11:52.6526477Z      [90m 355 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m updateDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T14:11:52.6526891Z 
2025-12-11T14:11:52.6527070Z       at Object.<anonymous> (events/events.e2e-spec.ts:352:10)
2025-12-11T14:11:52.6527357Z       ----
2025-12-11T14:11:52.6527653Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6528039Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6528435Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6528859Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6529251Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6529610Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6530005Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6530452Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6530925Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6531215Z 
2025-12-11T14:11:52.6531625Z   ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - ADMIN (proprietário)
2025-12-11T14:11:52.6532157Z 
2025-12-11T14:11:52.6532339Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:52.6532560Z 
2025-12-11T14:11:52.6532900Z     [0m [90m 381 |[39m           state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m
2025-12-11T14:11:52.6533313Z      [90m 382 |[39m         })
2025-12-11T14:11:52.6533712Z     [31m[1m>[22m[39m[90m 383 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:52.6534105Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6534374Z      [90m 384 |[39m
2025-12-11T14:11:52.6534894Z      [90m 385 |[39m       [36mconst[39m eventToPublishId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:52.6535345Z      [90m 386 |[39m[0m
2025-12-11T14:11:52.6535472Z 
2025-12-11T14:11:52.6535654Z       at Object.<anonymous> (events/events.e2e-spec.ts:383:10)
2025-12-11T14:11:52.6535936Z       ----
2025-12-11T14:11:52.6536363Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6536751Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6537139Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6537558Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6537943Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6538294Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6538690Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6539130Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6539599Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6539992Z 
2025-12-11T14:11:52.6540417Z   ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - MANAGER (proprietário)
2025-12-11T14:11:52.6540783Z 
2025-12-11T14:11:52.6540958Z     expected 201 "Created", got 500 "Internal Server Error"
2025-12-11T14:11:52.6541166Z 
2025-12-11T14:11:52.6541495Z     [0m [90m 426 |[39m           state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m
2025-12-11T14:11:52.6542066Z      [90m 427 |[39m         })
2025-12-11T14:11:52.6542470Z     [31m[1m>[22m[39m[90m 428 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T14:11:52.6542858Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:11:52.6543120Z      [90m 429 |[39m
2025-12-11T14:11:52.6543638Z      [90m 430 |[39m       [36mconst[39m eventToPublishId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T14:11:52.6544080Z      [90m 431 |[39m[0m
2025-12-11T14:11:52.6544205Z 
2025-12-11T14:11:52.6544383Z       at Object.<anonymous> (events/events.e2e-spec.ts:428:10)
2025-12-11T14:11:52.6544665Z       ----
2025-12-11T14:11:52.6544954Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:11:52.6545330Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:11:52.6545709Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:11:52.6546121Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:11:52.6546508Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:11:52.6546849Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:11:52.6547243Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:11:52.6547688Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:11:52.6548151Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:11:52.6548441Z 
2025-12-11T14:11:53.9031023Z [31m[Nest] 3469  - [39m12/11/2025, 2:11:53 PM [31m  ERROR[39m [38;5;3m[LoggingInterceptor] [39m[31mGET /v1/reports/228406c9-ff1e-45a0-964d-fc48cc8fd8bc/download 500 - 29ms[39m
2025-12-11T14:11:53.9348687Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:53 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1 (attempt 1):[39m
2025-12-11T14:11:53.9350579Z No metadata for "Patrimonio" was found.
2025-12-11T14:11:56.8032434Z [31m[Nest] 3469  - [39m12/11/2025, 2:11:56 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4 (attempt 1):[39m
2025-12-11T14:11:56.8033233Z No metadata for "Patrimonio" was found.
2025-12-11T14:11:56.8944090Z [31m[Nest] 3470  - [39m12/11/2025, 2:11:56 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório 228406c9-ff1e-45a0-964d-fc48cc8fd8bc (attempt 1):[39m
2025-12-11T14:11:56.8945441Z No metadata for "Patrimonio" was found.
2025-12-11T14:11:58.9971963Z [31m[Nest] 3481  - [39m12/11/2025, 2:11:58 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1 (attempt 1):[39m
2025-12-11T14:11:58.9972852Z No metadata for "Patrimonio" was found.
2025-12-11T14:12:03.9622868Z [31m[Nest] 3469  - [39m12/11/2025, 2:12:03 PM [31m  ERROR[39m [38;5;3m[LoggingInterceptor] [39m[31mGET /v1/reports/f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1/download 500 - 33ms[39m
2025-12-11T14:12:05.4978879Z PASS test/reports/reports.e2e-spec.ts (25.269 s)
2025-12-11T14:12:05.5048654Z   ● Console
2025-12-11T14:12:05.5048839Z 
2025-12-11T14:12:05.5048973Z     console.log
2025-12-11T14:12:05.5049611Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  enable debug logging with { debug: true }
2025-12-11T14:12:05.5050048Z 
2025-12-11T14:12:05.5050326Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:05.5051180Z 
2025-12-11T14:12:05.5051316Z     console.log
2025-12-11T14:12:05.5052536Z       [setupTestUsers] ✅ Porta detectada: 43321, USERS_API_URL: http://localhost:43321/v1
2025-12-11T14:12:05.5053063Z 
2025-12-11T14:12:05.5053348Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:12:05.5053708Z 
2025-12-11T14:12:05.5053852Z     console.log
2025-12-11T14:12:05.5057285Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","user:00000000-0000-0000-0000-000000000001"],"model":"patrimonio","requestId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T14:11:51.749Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5059933Z 
2025-12-11T14:12:05.5060511Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5061156Z 
2025-12-11T14:12:05.5061301Z     console.log
2025-12-11T14:12:05.5064667Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","job:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4"],"jobId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","model":"patrimonio","requestId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:11:51.758Z","type":"csv"}
2025-12-11T14:12:05.5066908Z 
2025-12-11T14:12:05.5067405Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5067933Z 
2025-12-11T14:12:05.5068064Z     console.log
2025-12-11T14:12:05.5071526Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","user:00000000-0000-0000-0000-000000000001"],"durationMs":16,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:51.776Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5074206Z 
2025-12-11T14:12:05.5074684Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5075194Z 
2025-12-11T14:12:05.5075319Z     console.log
2025-12-11T14:12:05.5078356Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:7f5c41ca-d798-4854-993d-a8d837d92a02","user:00000000-0000-0000-0000-000000000001"],"model":"manutencao","requestId":"7f5c41ca-d798-4854-993d-a8d837d92a02","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T14:11:51.803Z","type":"pdf","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5080227Z 
2025-12-11T14:12:05.5080594Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5080986Z 
2025-12-11T14:12:05.5081086Z     console.log
2025-12-11T14:12:05.5083953Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","user:00000000-0000-0000-0000-000000000001"],"model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T14:11:51.865Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5085982Z 
2025-12-11T14:12:05.5086420Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5086922Z 
2025-12-11T14:12:05.5087049Z     console.log
2025-12-11T14:12:05.5090147Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","job:228406c9-ff1e-45a0-964d-fc48cc8fd8bc"],"jobId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:11:51.868Z","type":"csv"}
2025-12-11T14:12:05.5092796Z 
2025-12-11T14:12:05.5093255Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5093770Z 
2025-12-11T14:12:05.5093911Z     console.log
2025-12-11T14:12:05.5097327Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","user:00000000-0000-0000-0000-000000000001"],"durationMs":6,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:51.874Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5099715Z 
2025-12-11T14:12:05.5100191Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5100712Z 
2025-12-11T14:12:05.5100853Z     console.log
2025-12-11T14:12:05.5104571Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","user:00000000-0000-0000-0000-000000000001"],"durationMs":10,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:53.898Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5106997Z 
2025-12-11T14:12:05.5107469Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5107993Z 
2025-12-11T14:12:05.5108123Z     console.log
2025-12-11T14:12:05.5111070Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","user:00000000-0000-0000-0000-000000000001"],"model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T14:11:53.919Z","type":"pdf","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5113394Z 
2025-12-11T14:12:05.5113902Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5114469Z 
2025-12-11T14:12:05.5114605Z     console.log
2025-12-11T14:12:05.5117771Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","job:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4"],"jobId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","model":"patrimonio","requestId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:11:56.795Z","type":"csv"}
2025-12-11T14:12:05.5120117Z 
2025-12-11T14:12:05.5120611Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5121174Z 
2025-12-11T14:12:05.5121305Z     console.log
2025-12-11T14:12:05.5125274Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","user:00000000-0000-0000-0000-000000000001"],"durationMs":6,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:56.802Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5127794Z 
2025-12-11T14:12:05.5128302Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5128839Z 
2025-12-11T14:12:05.5128966Z     console.log
2025-12-11T14:12:05.5132821Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","user:00000000-0000-0000-0000-000000000001"],"durationMs":9,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:12:03.956Z","type":"pdf","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:05.5135538Z 
2025-12-11T14:12:05.5136051Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:05.5136622Z 
2025-12-11T14:12:06.2533202Z PASS test/categorias/categorias.e2e-spec.ts (13.607 s)
2025-12-11T14:12:06.2534501Z   ● Console
2025-12-11T14:12:06.2534969Z 
2025-12-11T14:12:06.2535292Z     console.log
2025-12-11T14:12:06.2536477Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops
2025-12-11T14:12:06.2537346Z 
2025-12-11T14:12:06.2538200Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:06.2538784Z 
2025-12-11T14:12:06.2539005Z     console.log
2025-12-11T14:12:06.2539947Z       [setupTestUsers] ✅ Porta detectada: 45767, USERS_API_URL: http://localhost:45767/v1
2025-12-11T14:12:06.2540821Z 
2025-12-11T14:12:06.2541258Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:12:06.2542021Z 
2025-12-11T14:12:06.2542421Z     console.log
2025-12-11T14:12:06.2545953Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","job:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1"],"jobId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:11:58.967Z","type":"pdf"}
2025-12-11T14:12:06.2549285Z 
2025-12-11T14:12:06.2549963Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:06.2550688Z 
2025-12-11T14:12:06.2551084Z     console.log
2025-12-11T14:12:06.2555078Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","user:00000000-0000-0000-0000-000000000001"],"durationMs":21,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:58.992Z","type":"pdf","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:06.2558137Z 
2025-12-11T14:12:06.2558804Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:06.2559504Z 
2025-12-11T14:12:11.8270365Z [31m[Nest] 3470  - [39m12/11/2025, 2:12:11 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4 (attempt 1):[39m
2025-12-11T14:12:11.8273494Z No metadata for "Patrimonio" was found.
2025-12-11T14:12:11.9316789Z [31m[Nest] 3469  - [39m12/11/2025, 2:12:11 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório 228406c9-ff1e-45a0-964d-fc48cc8fd8bc (attempt 1):[39m
2025-12-11T14:12:11.9318438Z No metadata for "Patrimonio" was found.
2025-12-11T14:12:14.0233800Z [31m[Nest] 3470  - [39m12/11/2025, 2:12:14 PM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1 (attempt 1):[39m
2025-12-11T14:12:14.0234993Z No metadata for "Patrimonio" was found.
2025-12-11T14:12:18.7287175Z PASS test/reports-metrics/reports-metrics.e2e-spec.ts (13.213 s)
2025-12-11T14:12:18.7304495Z   ● Console
2025-12-11T14:12:18.7304675Z 
2025-12-11T14:12:18.7304793Z     console.log
2025-12-11T14:12:18.7305481Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ✅ audit secrets and track compliance: https://dotenvx.com/ops
2025-12-11T14:12:18.7305848Z 
2025-12-11T14:12:18.7306006Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:18.7306207Z 
2025-12-11T14:12:18.7306279Z     console.log
2025-12-11T14:12:18.7306733Z       [setupTestUsers] ✅ Porta detectada: 36275, USERS_API_URL: http://localhost:36275/v1
2025-12-11T14:12:18.7307223Z 
2025-12-11T14:12:18.7307493Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:12:18.7307790Z 
2025-12-11T14:12:18.7307866Z     console.log
2025-12-11T14:12:18.7310277Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","job:228406c9-ff1e-45a0-964d-fc48cc8fd8bc"],"jobId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:12:11.902Z","type":"csv"}
2025-12-11T14:12:18.7311632Z 
2025-12-11T14:12:18.7312084Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:18.7312375Z 
2025-12-11T14:12:18.7312452Z     console.log
2025-12-11T14:12:18.7314368Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","user:00000000-0000-0000-0000-000000000001"],"durationMs":24,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:12:11.929Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:12:18.7315696Z 
2025-12-11T14:12:18.7315950Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:12:18.7316241Z 
2025-12-11T14:12:20.0423100Z PASS test/audit/audit.e2e-spec.ts (13.769 s)
2025-12-11T14:12:20.0424253Z   ● Console
2025-12-11T14:12:20.0424842Z 
2025-12-11T14:12:20.0425205Z     console.log
2025-12-11T14:12:20.0426474Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  override existing env vars with { override: true }
2025-12-11T14:12:20.0427317Z 
2025-12-11T14:12:20.0427763Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:20.0428307Z 
2025-12-11T14:12:20.0428598Z     console.log
2025-12-11T14:12:20.0440952Z       [setupTestUsers] ✅ Porta detectada: 40885, USERS_API_URL: http://localhost:40885/v1
2025-12-11T14:12:20.0441689Z 
2025-12-11T14:12:20.0442405Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:12:20.0442941Z 
2025-12-11T14:12:23.6524702Z PASS test/enums/enums.e2e-spec.ts
2025-12-11T14:12:23.6533426Z   ● Console
2025-12-11T14:12:23.6533807Z 
2025-12-11T14:12:23.6533942Z     console.log
2025-12-11T14:12:23.6534771Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  override existing env vars with { override: true }
2025-12-11T14:12:23.6535134Z 
2025-12-11T14:12:23.6535414Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:23.6535743Z 
2025-12-11T14:12:26.6507320Z PASS test/metrics/metrics.e2e-spec.ts
2025-12-11T14:12:26.6513711Z   ● Console
2025-12-11T14:12:26.6513897Z 
2025-12-11T14:12:26.6514037Z     console.log
2025-12-11T14:12:26.6515005Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops
2025-12-11T14:12:26.6515605Z 
2025-12-11T14:12:26.6515874Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:26.6516233Z 
2025-12-11T14:12:29.7337402Z PASS test/app.e2e-spec.ts
2025-12-11T14:12:29.7343705Z   ● Console
2025-12-11T14:12:29.7343830Z 
2025-12-11T14:12:29.7343909Z     console.log
2025-12-11T14:12:29.7344859Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops
2025-12-11T14:12:29.7345235Z 
2025-12-11T14:12:29.7345399Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:29.7345611Z 
2025-12-11T14:12:32.2790293Z PASS test/cache/cache.e2e-spec.ts (13.543 s)
2025-12-11T14:12:32.2796964Z   ● Console
2025-12-11T14:12:32.2797151Z 
2025-12-11T14:12:32.2797271Z     console.log
2025-12-11T14:12:32.2798000Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
2025-12-11T14:12:32.2798413Z 
2025-12-11T14:12:32.2798588Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:12:32.2798797Z 
2025-12-11T14:12:32.2798872Z     console.log
2025-12-11T14:12:32.2799348Z       [setupTestUsers] ✅ Porta detectada: 33291, USERS_API_URL: http://localhost:33291/v1
2025-12-11T14:12:32.2800078Z 
2025-12-11T14:12:32.2800253Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:12:32.2800480Z 
2025-12-11T14:14:13.8138509Z FAIL test/auth/auth.e2e-spec.ts (183.025 s)
2025-12-11T14:14:13.8276767Z   ● Console
2025-12-11T14:14:13.8278769Z 
2025-12-11T14:14:13.8279189Z     console.log
2025-12-11T14:14:13.8281381Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
2025-12-11T14:14:13.8282439Z 
2025-12-11T14:14:13.8282976Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T14:14:13.8283460Z 
2025-12-11T14:14:13.8283682Z     console.log
2025-12-11T14:14:13.8284657Z       [setupTestUsers] ✅ Porta detectada: 41087, USERS_API_URL: http://localhost:41087/v1
2025-12-11T14:14:13.8285325Z 
2025-12-11T14:14:13.8285651Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T14:14:13.8286083Z 
2025-12-11T14:14:13.8286296Z     console.log
2025-12-11T14:14:13.8290124Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:7f5c41ca-d798-4854-993d-a8d837d92a02","job:7f5c41ca-d798-4854-993d-a8d837d92a02"],"jobId":"7f5c41ca-d798-4854-993d-a8d837d92a02","model":"manutencao","requestId":"7f5c41ca-d798-4854-993d-a8d837d92a02","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:11:51.807Z","type":"pdf"}
2025-12-11T14:14:13.8292565Z 
2025-12-11T14:14:13.8293041Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8293577Z 
2025-12-11T14:14:13.8293782Z     console.log
2025-12-11T14:14:13.8297425Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:7f5c41ca-d798-4854-993d-a8d837d92a02","user:00000000-0000-0000-0000-000000000001"],"durationMs":32,"error":"Relation with property path patrimonio in entity was not found.","model":"manutencao","requestId":"7f5c41ca-d798-4854-993d-a8d837d92a02","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:51.851Z","type":"pdf","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:14:13.8300007Z 
2025-12-11T14:14:13.8300465Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8300987Z 
2025-12-11T14:14:13.8301114Z     console.log
2025-12-11T14:14:13.8304456Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","job:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1"],"jobId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:11:53.921Z","type":"pdf"}
2025-12-11T14:14:13.8306645Z 
2025-12-11T14:14:13.8307122Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8307640Z 
2025-12-11T14:14:13.8307780Z     console.log
2025-12-11T14:14:13.8311929Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","user:00000000-0000-0000-0000-000000000001"],"durationMs":10,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:53.932Z","type":"pdf","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:14:13.8314344Z 
2025-12-11T14:14:13.8314806Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8315317Z 
2025-12-11T14:14:13.8315453Z     console.log
2025-12-11T14:14:13.8318600Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","job:228406c9-ff1e-45a0-964d-fc48cc8fd8bc"],"jobId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:11:56.881Z","type":"csv"}
2025-12-11T14:14:13.8321068Z 
2025-12-11T14:14:13.8321545Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8322273Z 
2025-12-11T14:14:13.8322409Z     console.log
2025-12-11T14:14:13.8325752Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:228406c9-ff1e-45a0-964d-fc48cc8fd8bc","user:00000000-0000-0000-0000-000000000001"],"durationMs":8,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"228406c9-ff1e-45a0-964d-fc48cc8fd8bc","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:11:56.890Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:14:13.8328025Z 
2025-12-11T14:14:13.8328465Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8328956Z 
2025-12-11T14:14:13.8329079Z     console.log
2025-12-11T14:14:13.8332381Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","job:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4"],"jobId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","model":"patrimonio","requestId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:12:11.807Z","type":"csv"}
2025-12-11T14:14:13.8334527Z 
2025-12-11T14:14:13.8334964Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8335463Z 
2025-12-11T14:14:13.8335581Z     console.log
2025-12-11T14:14:13.8338879Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","user:00000000-0000-0000-0000-000000000001"],"durationMs":15,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"ca0ae519-a76c-46c2-8cf2-ae2f9fb41bb4","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:12:11.823Z","type":"csv","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:14:13.8341175Z 
2025-12-11T14:14:13.8341607Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8342256Z 
2025-12-11T14:14:13.8342375Z     console.log
2025-12-11T14:14:13.8345375Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","job:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1"],"jobId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T14:12:14.012Z","type":"pdf"}
2025-12-11T14:14:13.8347491Z 
2025-12-11T14:14:13.8347919Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8348402Z 
2025-12-11T14:14:13.8348539Z     console.log
2025-12-11T14:14:13.8352149Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","user:00000000-0000-0000-0000-000000000001"],"durationMs":8,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"f5a187ee-9c4e-4029-bbfc-e69f54a4f6e1","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T14:12:14.022Z","type":"pdf","userId":"00000000-0000-0000-0000-000000000001"}
2025-12-11T14:14:13.8354465Z 
2025-12-11T14:14:13.8354904Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T14:14:13.8355407Z 
2025-12-11T14:14:13.8355528Z     console.warn
2025-12-11T14:14:13.8356580Z       Erro ao limpar dados de teste: QueryFailedError: update or delete on table "users" violates foreign key constraint "FK_events_created_by" on table "events"
2025-12-11T14:14:13.8358676Z           at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
2025-12-11T14:14:13.8360485Z           at processTicksAndRejections (node:internal/process/task_queues:95:5)
2025-12-11T14:14:13.8362167Z           at DataSource.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/data-source/DataSource.ts:541:20)
2025-12-11T14:14:13.8364232Z           at cleanupTestData (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test/auth/auth.e2e-spec.ts:746:5)
2025-12-11T14:14:13.8366252Z           at Object.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test/auth/auth.e2e-spec.ts:84:5) {
2025-12-11T14:14:13.8367281Z         query: 'DELETE FROM users \n' +
2025-12-11T14:14:13.8367718Z           "       WHERE email LIKE '%@example.com' \n" +
2025-12-11T14:14:13.8368235Z           "       AND (email LIKE 'test-%' OR email LIKE 'inactive-%')",
2025-12-11T14:14:13.8368702Z         parameters: undefined,
2025-12-11T14:14:13.8369515Z         driverError: error: update or delete on table "users" violates foreign key constraint "FK_events_created_by" on table "events"
2025-12-11T14:14:13.8370928Z             at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
2025-12-11T14:14:13.8372769Z             at processTicksAndRejections (node:internal/process/task_queues:95:5)
2025-12-11T14:14:13.8374268Z             at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
2025-12-11T14:14:13.8376210Z             at DataSource.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/data-source/DataSource.ts:541:20)
2025-12-11T14:14:13.8377997Z             at cleanupTestData (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test/auth/auth.e2e-spec.ts:746:5)
2025-12-11T14:14:13.8379738Z             at Object.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test/auth/auth.e2e-spec.ts:84:5) {
2025-12-11T14:14:13.8380726Z           length: 303,
2025-12-11T14:14:13.8381019Z           severity: 'ERROR',
2025-12-11T14:14:13.8381316Z           code: '23503',
2025-12-11T14:14:13.8382101Z           detail: 'Key (id)=(00000000-0000-0000-0000-000000000001) is still referenced from table "events".',
2025-12-11T14:14:13.8382712Z           hint: undefined,
2025-12-11T14:14:13.8383056Z           position: undefined,
2025-12-11T14:14:13.8383461Z           internalPosition: undefined,
2025-12-11T14:14:13.8383871Z           internalQuery: undefined,
2025-12-11T14:14:13.8384239Z           where: undefined,
2025-12-11T14:14:13.8384579Z           schema: 'public',
2025-12-11T14:14:13.8384876Z           table: 'events',
2025-12-11T14:14:13.8385392Z           column: undefined,
2025-12-11T14:14:13.8385750Z           dataType: undefined,
2025-12-11T14:14:13.8386139Z           constraint: 'FK_events_created_by',
2025-12-11T14:14:13.8386551Z           file: 'ri_triggers.c',
2025-12-11T14:14:13.8386864Z           line: '2609',
2025-12-11T14:14:13.8387202Z           routine: 'ri_ReportViolation'
2025-12-11T14:14:13.8387551Z         },
2025-12-11T14:14:13.8387791Z         length: 303,
2025-12-11T14:14:13.8388078Z         severity: 'ERROR',
2025-12-11T14:14:13.8388365Z         code: '23503',
2025-12-11T14:14:13.8388990Z         detail: 'Key (id)=(00000000-0000-0000-0000-000000000001) is still referenced from table "events".',
2025-12-11T14:14:13.8389605Z         hint: undefined,
2025-12-11T14:14:13.8389905Z         position: undefined,
2025-12-11T14:14:13.8390283Z         internalPosition: undefined,
2025-12-11T14:14:13.8390865Z         internalQuery: undefined,
2025-12-11T14:14:13.8391203Z         where: undefined,
2025-12-11T14:14:13.8391511Z         schema: 'public',
2025-12-11T14:14:13.8391973Z         table: 'events',
2025-12-11T14:14:13.8392282Z         column: undefined,
2025-12-11T14:14:13.8392597Z         dataType: undefined,
2025-12-11T14:14:13.8392975Z         constraint: 'FK_events_created_by',
2025-12-11T14:14:13.8393391Z         file: 'ri_triggers.c',
2025-12-11T14:14:13.8393710Z         line: '2609',
2025-12-11T14:14:13.8394044Z         routine: 'ri_ReportViolation'
2025-12-11T14:14:13.8394398Z       }
2025-12-11T14:14:13.8394535Z 
2025-12-11T14:14:13.8394861Z     [0m [90m 751 |[39m   } [36mcatch[39m (error) {
2025-12-11T14:14:13.8395456Z      [90m 752 |[39m     [90m// Ignorar erros de limpeza[39m
2025-12-11T14:14:13.8396463Z     [31m[1m>[22m[39m[90m 753 |[39m     console[33m.[39mwarn([32m'Erro ao limpar dados de teste:'[39m[33m,[39m error)[33m;[39m
2025-12-11T14:14:13.8397292Z      [90m     |[39m             [31m[1m^[22m[39m
2025-12-11T14:14:13.8397717Z      [90m 754 |[39m   }
2025-12-11T14:14:13.8398055Z      [90m 755 |[39m }
2025-12-11T14:14:13.8398381Z      [90m 756 |[39m[0m
2025-12-11T14:14:13.8398577Z 
2025-12-11T14:14:13.8398805Z       at cleanupTestData (auth/auth.e2e-spec.ts:753:13)
2025-12-11T14:14:13.8399357Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:84:5)
2025-12-11T14:14:13.8399651Z 
2025-12-11T14:14:13.8400301Z   ● Auth (e2e) › POST /v1/auth/login › deve retornar 401 para credenciais inválidas (email incorreto)
2025-12-11T14:14:13.8400833Z 
2025-12-11T14:14:13.8401074Z     expect(received).toContain(expected) // indexOf
2025-12-11T14:14:13.8401461Z 
2025-12-11T14:14:13.8401601Z     Expected value: 201
2025-12-11T14:14:13.8402116Z     Received array: [401, 429]
2025-12-11T14:14:13.8402359Z 
2025-12-11T14:14:13.8402596Z     [0m [90m 127 |[39m       
2025-12-11T14:14:13.8403350Z      [90m 128 |[39m       [90m// Aceitar 401 (credenciais inválidas) ou 429 (rate limiting)[39m
2025-12-11T14:14:13.8404645Z     [31m[1m>[22m[39m[90m 129 |[39m       expect([[35m401[39m[33m,[39m [35m429[39m])[33m.[39mtoContain(response[33m.[39mstatus)[33m;[39m
2025-12-11T14:14:13.8405624Z      [90m     |[39m                          [31m[1m^[22m[39m
2025-12-11T14:14:13.8406181Z      [90m 130 |[39m     })[33m;[39m
2025-12-11T14:14:13.8406601Z      [90m 131 |[39m
2025-12-11T14:14:13.8407722Z      [90m 132 |[39m     it([32m'deve retornar 401 para credenciais inválidas (senha incorreta)'[39m[33m,[39m [36masync[39m () [33m=>[39m {[0m
2025-12-11T14:14:13.8408460Z 
2025-12-11T14:14:13.8408739Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:129:26)
2025-12-11T14:14:13.8409091Z 
2025-12-11T14:14:13.8409589Z   ● Auth (e2e) › POST /v1/auth/login › deve retornar 401 para usuário inativo
2025-12-11T14:14:13.8410036Z 
2025-12-11T14:14:13.8410267Z     expected 401 "Unauthorized", got 201 "Created"
2025-12-11T14:14:13.8410594Z 
2025-12-11T14:14:13.8411003Z     [0m [90m 230 |[39m         [33m.[39mpost([32m'/v1/auth/login'[39m)
2025-12-11T14:14:13.8411658Z      [90m 231 |[39m         [33m.[39msend(dto)
2025-12-11T14:14:13.8412792Z     [31m[1m>[22m[39m[90m 232 |[39m         [33m.[39mexpect([35m401[39m)[33m;[39m
2025-12-11T14:14:13.8413512Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:14:13.8414047Z      [90m 233 |[39m     })[33m;[39m
2025-12-11T14:14:13.8414541Z      [90m 234 |[39m   })[33m;[39m
2025-12-11T14:14:13.8414970Z      [90m 235 |[39m[0m
2025-12-11T14:14:13.8415183Z 
2025-12-11T14:14:13.8415465Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:232:10)
2025-12-11T14:14:13.8415921Z       ----
2025-12-11T14:14:13.8416422Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:14:13.8417081Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:14:13.8417750Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:14:13.8418684Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:14:13.8419384Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:14:13.8419984Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:14:13.8420678Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:892:12)
2025-12-11T14:14:13.8421447Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:14:13.8422542Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:14:13.8423046Z 
2025-12-11T14:14:13.8423630Z   ● Auth (e2e) › GET /v1/auth/me › deve retornar informações do usuário autenticado (200)
2025-12-11T14:14:13.8424115Z 
2025-12-11T14:14:13.8424333Z     expected 200 "OK", got 401 "Unauthorized"
2025-12-11T14:14:13.8424629Z 
2025-12-11T14:14:13.8425053Z     [0m [90m 260 |[39m         [33m.[39m[36mget[39m([32m'/v1/auth/me'[39m)
2025-12-11T14:14:13.8426868Z      [90m 261 |[39m         [33m.[39m[36mset[39m([32m'Authorization'[39m[33m,[39m [32m`***
2025-12-11T14:14:13.8427830Z     [31m[1m>[22m[39m[90m 262 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T14:14:13.8428524Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:14:13.8428971Z      [90m 263 |[39m
2025-12-11T14:14:13.8429773Z      [90m 264 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:14:13.8431136Z      [90m 265 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'email'[39m[33m,[39m testUserEmail)[33m;[39m[0m
2025-12-11T14:14:13.8431975Z 
2025-12-11T14:14:13.8432254Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:262:10)
2025-12-11T14:14:13.8432716Z       ----
2025-12-11T14:14:13.8433220Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T14:14:13.8433859Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:14:13.8434548Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:14:13.8435289Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:14:13.8435960Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:14:13.8436569Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:14:13.8437255Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:14:13.8438022Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:14:13.8438862Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:14:13.8439365Z 
2025-12-11T14:14:13.8439971Z   ● Auth (e2e) › POST /v1/auth/refresh › deve renovar tokens com refresh token válido (200)
2025-12-11T14:14:13.8440475Z 
2025-12-11T14:14:13.8440710Z     expect(received).toHaveProperty(path, value)
2025-12-11T14:14:13.8441039Z 
2025-12-11T14:14:13.8441191Z     Expected path: "email"
2025-12-11T14:14:13.8441417Z 
2025-12-11T14:14:13.8441640Z     Expected value: "auth-admin@example.com"
2025-12-11T14:14:13.8442651Z     Received value: "user-123e4567-e89b-12d3-a456-426614174000@example.com"
2025-12-11T14:14:13.8443119Z 
2025-12-11T14:14:13.8443811Z     [0m [90m 354 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'user'[39m)[33m;[39m
2025-12-11T14:14:13.8445075Z      [90m 355 |[39m       expect(response[33m.[39mbody[33m.[39muser)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T14:14:13.8446656Z     [31m[1m>[22m[39m[90m 356 |[39m       expect(response[33m.[39mbody[33m.[39muser)[33m.[39mtoHaveProperty([32m'email'[39m[33m,[39m testUserEmail)[33m;[39m
2025-12-11T14:14:13.8447778Z      [90m     |[39m                                  [31m[1m^[22m[39m
2025-12-11T14:14:13.8448946Z      [90m 357 |[39m       expect([36mtypeof[39m response[33m.[39mbody[33m.[39maccessToken)[33m.[39mtoBe([32m'string'[39m)[33m;[39m
2025-12-11T14:14:13.8450674Z      [90m 358 |[39m       expect(response[33m.[39mbody[33m.[39maccessToken[33m.[39mlength)[33m.[39mtoBeGreaterThan([35m0[39m)[33m;[39m
2025-12-11T14:14:13.8452422Z      [90m 359 |[39m       expect([36mtypeof[39m response[33m.[39mbody[33m.[39mrefreshToken)[33m.[39mtoBe([32m'string'[39m)[33m;[39m[0m
2025-12-11T14:14:13.8453134Z 
2025-12-11T14:14:13.8453406Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:356:34)
2025-12-11T14:14:13.8453759Z 
2025-12-11T14:14:13.8454251Z   ● Auth (e2e) › POST /v1/auth/logout › deve revogar refresh token após logout
2025-12-11T14:14:13.8454700Z 
2025-12-11T14:14:13.8454876Z     Expected 200 or 201, got 429
2025-12-11T14:14:13.8455122Z 
2025-12-11T14:14:13.8455564Z     [0m [90m 516 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T14:14:13.8456186Z      [90m 517 |[39m         })
2025-12-11T14:14:13.8456858Z     [31m[1m>[22m[39m[90m 518 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T14:14:13.8457534Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:14:13.8458216Z      [90m 519 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T14:14:13.8459406Z      [90m 520 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T14:14:13.8460827Z      [90m 521 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T14:14:13.8461457Z 
2025-12-11T14:14:13.8461721Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:518:10)
2025-12-11T14:14:13.8462447Z       ----
2025-12-11T14:14:13.8462786Z       at auth/auth.e2e-spec.ts:521:19
2025-12-11T14:14:13.8463298Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:14:13.8463982Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:14:13.8464720Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:14:13.8465410Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:14:13.8466026Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:14:13.8466708Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:14:13.8467483Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:14:13.8468317Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:14:13.8468816Z 
2025-12-11T14:14:13.8469366Z   ● Auth (e2e) › POST /v1/auth/logout › deve permitir logout múltiplo (idempotente)
2025-12-11T14:14:13.8469846Z 
2025-12-11T14:14:13.8470014Z     Expected 200 or 201, got 429
2025-12-11T14:14:13.8470259Z 
2025-12-11T14:14:13.8470715Z     [0m [90m 556 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T14:14:13.8471326Z      [90m 557 |[39m         })
2025-12-11T14:14:13.8472183Z     [31m[1m>[22m[39m[90m 558 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T14:14:13.8473048Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:14:13.8473751Z      [90m 559 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T14:14:13.8474961Z      [90m 560 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T14:14:13.8476375Z      [90m 561 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T14:14:13.8477001Z 
2025-12-11T14:14:13.8477275Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:558:10)
2025-12-11T14:14:13.8477726Z       ----
2025-12-11T14:14:13.8478069Z       at auth/auth.e2e-spec.ts:561:19
2025-12-11T14:14:13.8478567Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:14:13.8479243Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:14:13.8480172Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:14:13.8480867Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:14:13.8481485Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:14:13.8482336Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:14:13.8483110Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:14:13.8483939Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:14:13.8484436Z 
2025-12-11T14:14:13.8485100Z   ● Auth (e2e) › Fluxo completo de autenticação › deve permitir login -> me -> refresh -> logout
2025-12-11T14:14:13.8485647Z 
2025-12-11T14:14:13.8485824Z     Expected 200 or 201, got 429
2025-12-11T14:14:13.8486072Z 
2025-12-11T14:14:13.8486510Z     [0m [90m 605 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T14:14:13.8487143Z      [90m 606 |[39m         })
2025-12-11T14:14:13.8487828Z     [31m[1m>[22m[39m[90m 607 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T14:14:13.8488499Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T14:14:13.8489180Z      [90m 608 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T14:14:13.8490388Z      [90m 609 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T14:14:13.8491963Z      [90m 610 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T14:14:13.8492609Z 
2025-12-11T14:14:13.8492879Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:607:10)
2025-12-11T14:14:13.8493350Z       ----
2025-12-11T14:14:13.8493685Z       at auth/auth.e2e-spec.ts:610:19
2025-12-11T14:14:13.8494199Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T14:14:13.8494883Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T14:14:13.8495622Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T14:14:13.8496313Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T14:14:13.8496924Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T14:14:13.8497613Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T14:14:13.8498387Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T14:14:13.8499218Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T14:14:13.8499724Z 
2025-12-11T14:14:13.9310134Z Test Suites: 6 failed, 11 passed, 17 total
2025-12-11T14:14:13.9310899Z Tests:       62 failed, 268 passed, 330 total
2025-12-11T14:14:13.9311431Z Snapshots:   0 total
2025-12-11T14:14:13.9312019Z Time:        217.351 s
2025-12-11T14:14:13.9312442Z Ran all test suites.
2025-12-11T14:14:13.9479393Z ##[error]Process completed with exit code 1.
2025-12-11T14:14:13.9547011Z Post job cleanup.
2025-12-11T14:14:14.0497977Z [command]/usr/bin/git version
2025-12-11T14:14:14.0537978Z git version 2.52.0
2025-12-11T14:14:14.0588872Z Temporarily overriding HOME='/home/runner/work/_temp/0aad855a-484b-4198-918d-dedb904b20c3' before making global git config changes
2025-12-11T14:14:14.0590328Z Adding repository directory to the temporary git global config as a safe directory
2025-12-11T14:14:14.0595746Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio
2025-12-11T14:14:14.0631465Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-12-11T14:14:14.0665394Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-12-11T14:14:14.0916285Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-12-11T14:14:14.0938606Z http.https://github.com/.extraheader
2025-12-11T14:14:14.0952152Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-12-11T14:14:14.0985365Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-12-11T14:14:14.1219876Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2025-12-11T14:14:14.1251429Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2025-12-11T14:14:14.1592534Z Print service container logs: c94fed91d9af4f86a193f7e68421c1db_postgres15alpine_a3afea
2025-12-11T14:14:14.1597404Z ##[command]/usr/bin/docker logs --details 7d9f4fc6f8ab9ae24fbb65f42bd9126c813ecdadf8c1b66cf47f1a99761596e9
2025-12-11T14:14:14.1722139Z  The files belonging to this database system will be owned by user "postgres".
2025-12-11T14:14:14.1723678Z  sh: locale: not found
2025-12-11T14:14:14.1724486Z  2025-12-11 14:09:05.218 UTC [35] WARNING:  no usable system locales were found
2025-12-11T14:14:14.1725409Z  initdb: warning: enabling "trust" authentication for local connections
2025-12-11T14:14:14.1729974Z  initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
2025-12-11T14:14:14.1731166Z  2025-12-11 14:09:06.182 UTC [1] LOG:  starting PostgreSQL 15.15 on x86_64-pc-linux-musl, compiled by gcc (Alpine 15.2.0) 15.2.0, 64-bit
2025-12-11T14:14:14.1732312Z  2025-12-11 14:09:06.182 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2025-12-11T14:14:14.1733017Z  2025-12-11 14:09:06.182 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2025-12-11T14:14:14.1733819Z  2025-12-11 14:09:06.183 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2025-12-11T14:14:14.1734638Z  2025-12-11 14:09:06.186 UTC [57] LOG:  database system was shut down at 2025-12-11 14:09:06 UTC
2025-12-11T14:14:14.1735408Z  2025-12-11 14:09:06.190 UTC [1] LOG:  database system is ready to accept connections
2025-12-11T14:14:14.1736083Z  2025-12-11 14:09:14.808 UTC [67] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1736662Z  2025-12-11 14:09:24.854 UTC [74] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1737229Z  2025-12-11 14:09:34.909 UTC [81] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1737768Z  This user must also own the server process.
2025-12-11T14:14:14.1738174Z  
2025-12-11T14:14:14.1738589Z  The database cluster will be initialized with locale "en_US.utf8".
2025-12-11T14:14:14.1739268Z  The default database encoding has accordingly been set to "UTF8".
2025-12-11T14:14:14.1739928Z  The default text search configuration will be set to "english".
2025-12-11T14:14:14.1740429Z  
2025-12-11T14:14:14.1740703Z  Data page checksums are disabled.
2025-12-11T14:14:14.1741062Z  
2025-12-11T14:14:14.1741480Z  fixing permissions on existing directory /var/lib/postgresql/data ... ok
2025-12-11T14:14:14.1742201Z  creating subdirectories ... ok
2025-12-11T14:14:14.1742671Z  selecting dynamic shared memory implementation ... posix
2025-12-11T14:14:14.1743203Z  selecting default max_connections ... 100
2025-12-11T14:14:14.1743649Z  selecting default shared_buffers ... 128MB
2025-12-11T14:14:14.1744080Z  selecting default time zone ... UTC
2025-12-11T14:14:14.1744486Z  creating configuration files ... ok
2025-12-11T14:14:14.1744876Z  running bootstrap script ... ok
2025-12-11T14:14:14.1745313Z  performing post-bootstrap initialization ... ok
2025-12-11T14:14:14.1745772Z  syncing data to disk ... ok
2025-12-11T14:14:14.1746098Z  
2025-12-11T14:14:14.1746313Z  
2025-12-11T14:14:14.1746606Z  Success. You can now start the database server using:
2025-12-11T14:14:14.1747345Z  
2025-12-11T14:14:14.1747667Z      pg_ctl -D /var/lib/postgresql/data -l logfile start
2025-12-11T14:14:14.1748075Z  
2025-12-11T14:14:14.1748787Z  waiting for server to start....2025-12-11 14:09:05.897 UTC [41] LOG:  starting PostgreSQL 15.15 on x86_64-pc-linux-musl, compiled by gcc (Alpine 15.2.0) 15.2.0, 64-bit
2025-12-11T14:14:14.1749920Z  2025-12-11 14:09:05.898 UTC [41] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2025-12-11T14:14:14.1750751Z  2025-12-11 14:09:05.901 UTC [44] LOG:  database system was shut down at 2025-12-11 14:09:05 UTC
2025-12-11T14:14:14.1751507Z  2025-12-11 14:09:05.906 UTC [41] LOG:  database system is ready to accept connections
2025-12-11T14:14:14.1752180Z   done
2025-12-11T14:14:14.1752448Z  server started
2025-12-11T14:14:14.1753196Z  CREATE DATABASE
2025-12-11T14:14:14.1753724Z  
2025-12-11T14:14:14.1753961Z  
2025-12-11T14:14:14.1754360Z  /usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*
2025-12-11T14:14:14.1754746Z  
2025-12-11T14:14:14.1755051Z  waiting for server to shut down...2025-12-11 14:09:06.062 UTC [41] LOG:  received fast shutdown request
2025-12-11T14:14:14.1755527Z  .2025-12-11 14:09:06.063 UTC [41] LOG:  aborting any active transactions
2025-12-11T14:14:14.1756029Z  2025-12-11 14:09:06.065 UTC [41] LOG:  background worker "logical replication launcher" (PID 47) exited with exit code 1
2025-12-11T14:14:14.1756477Z  2025-12-11 14:09:06.067 UTC [42] LOG:  shutting down
2025-12-11T14:14:14.1756815Z  2025-12-11 14:09:06.068 UTC [42] LOG:  checkpoint starting: shutdown immediate
2025-12-11T14:14:14.1757645Z  2025-12-11 14:09:06.087 UTC [42] LOG:  checkpoint complete: wrote 921 buffers (5.6%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.015 s, sync=0.002 s, total=0.021 s; sync files=301, longest=0.001 s, average=0.001 s; distance=4239 kB, estimate=4239 kB
2025-12-11T14:14:14.1758425Z  2025-12-11 14:09:06.095 UTC [41] LOG:  database system is shut down
2025-12-11T14:14:14.1758707Z   done
2025-12-11T14:14:14.1758863Z  server stopped
2025-12-11T14:14:14.1759022Z  
2025-12-11T14:14:14.1759225Z  PostgreSQL init process complete; ready for start up.
2025-12-11T14:14:14.1759483Z  
2025-12-11T14:14:14.1759717Z  2025-12-11 14:09:44.951 UTC [89] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1760045Z  2025-12-11 14:09:55.019 UTC [97] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1760371Z  2025-12-11 14:10:05.078 UTC [103] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1760697Z  2025-12-11 14:10:15.161 UTC [111] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1761021Z  2025-12-11 14:10:25.221 UTC [118] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1761343Z  2025-12-11 14:10:35.265 UTC [126] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1761662Z  2025-12-11 14:10:45.333 UTC [135] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1762248Z  2025-12-11 14:10:55.426 UTC [142] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1762579Z  2025-12-11 14:11:05.471 UTC [153] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1763110Z  2025-12-11 14:11:08.422 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1763793Z  2025-12-11 14:11:08.422 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1764922Z  2025-12-11 14:11:08.422 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1766099Z  2025-12-11 14:11:08.508 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1766769Z  2025-12-11 14:11:08.508 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1768059Z  2025-12-11 14:11:08.508 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1769228Z  2025-12-11 14:11:08.534 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1769885Z  2025-12-11 14:11:08.534 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1771137Z  2025-12-11 14:11:08.534 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1772524Z  2025-12-11 14:11:08.556 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1773181Z  2025-12-11 14:11:08.556 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1774359Z  2025-12-11 14:11:08.556 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1775582Z  2025-12-11 14:11:08.583 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1776257Z  2025-12-11 14:11:08.583 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1777391Z  2025-12-11 14:11:08.583 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1778585Z  2025-12-11 14:11:08.601 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1779255Z  2025-12-11 14:11:08.601 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1780386Z  2025-12-11 14:11:08.601 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1781574Z  2025-12-11 14:11:08.626 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1782346Z  2025-12-11 14:11:08.626 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1783483Z  2025-12-11 14:11:08.626 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1784797Z  2025-12-11 14:11:08.655 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1785480Z  2025-12-11 14:11:08.655 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1786584Z  2025-12-11 14:11:08.655 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT, $7, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1787743Z  2025-12-11 14:11:08.671 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1788505Z  2025-12-11 14:11:08.671 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1789669Z  2025-12-11 14:11:08.671 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1790863Z  2025-12-11 14:11:08.691 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1791525Z  2025-12-11 14:11:08.691 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1792769Z  2025-12-11 14:11:08.691 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1793970Z  2025-12-11 14:11:08.704 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1794631Z  2025-12-11 14:11:08.704 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1795760Z  2025-12-11 14:11:08.704 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1796948Z  2025-12-11 14:11:08.716 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1797614Z  2025-12-11 14:11:08.716 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1798746Z  2025-12-11 14:11:08.716 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1799974Z  2025-12-11 14:11:08.824 UTC [146] ERROR:  insert or update on table "maintenance_plans" violates foreign key constraint "FK_adc889d10ac565683ffd9703b5b"
2025-12-11T14:14:14.1800670Z  2025-12-11 14:11:08.824 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1801646Z  2025-12-11 14:11:08.824 UTC [146] STATEMENT:  INSERT INTO "maintenance_plans"("id", "categoria_id", "periodicidade", "proxima_execucao", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, DEFAULT) RETURNING "id", "created_at", "updated_at"
2025-12-11T14:14:14.1803390Z  2025-12-11 14:11:08.889 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1804087Z  2025-12-11 14:11:08.889 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1805229Z  2025-12-11 14:11:08.889 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1806579Z  2025-12-11 14:11:08.903 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1807285Z  2025-12-11 14:11:08.903 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1808431Z  2025-12-11 14:11:08.903 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1809636Z  2025-12-11 14:11:08.915 UTC [146] ERROR:  insert or update on table "work_orders" violates foreign key constraint "FK_149398966336295f0423c28d726"
2025-12-11T14:14:14.1810306Z  2025-12-11 14:11:08.915 UTC [146] DETAIL:  Key (owner_id)=(00000000-0000-0000-0000-000000000001) is not present in table "users".
2025-12-11T14:14:14.1811447Z  2025-12-11 14:11:08.915 UTC [146] STATEMENT:  INSERT INTO "work_orders"("id", "patrimonio_id", "status", "titulo", "descricao", "prioridade", "opened_at", "closed_at", "owner_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4, $5, DEFAULT, $6, DEFAULT, DEFAULT) RETURNING "id", "status", "prioridade", "created_at", "updated_at"
2025-12-11T14:14:14.1812597Z  2025-12-11 14:11:15.546 UTC [171] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1813101Z  2025-12-11 14:11:24.561 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1814133Z  2025-12-11 14:11:24.561 UTC [164] DETAIL:  Failing row contains (a0486f50-f73d-4b37-8b27-f5c6f2264b73, Inventário Q1 2025 1765462284554, Setor A - Sala 101, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.559859+00, 2025-12-11 14:11:24.559859+00).
2025-12-11T14:14:14.1815538Z  2025-12-11 14:11:24.561 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1816555Z  2025-12-11 14:11:24.639 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1817542Z  2025-12-11 14:11:24.639 UTC [164] DETAIL:  Failing row contains (8b85ae0f-54dd-43e8-a812-4af856a93925, Campanha Teste 1765462284633, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.638288+00, 2025-12-11 14:11:24.638288+00).
2025-12-11T14:14:14.1818887Z  2025-12-11 14:11:24.639 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1819892Z  2025-12-11 14:11:24.646 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1821030Z  2025-12-11 14:11:24.646 UTC [164] DETAIL:  Failing row contains (161adbd2-c39f-44eb-8f37-f4dd95d5c68f, Campanha Teste Assignments 1765462284643, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.645836+00, 2025-12-11 14:11:24.645836+00).
2025-12-11T14:14:14.1822556Z  2025-12-11 14:11:24.646 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1823552Z  2025-12-11 14:11:24.668 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1824625Z  2025-12-11 14:11:24.668 UTC [164] DETAIL:  Failing row contains (2410655a-48ce-44cc-8b35-adeab8a6fc10, Campanha Sync 1765462284665, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.668099+00, 2025-12-11 14:11:24.668099+00).
2025-12-11T14:14:14.1825972Z  2025-12-11 14:11:24.668 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1826969Z  2025-12-11 14:11:24.675 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1827988Z  2025-12-11 14:11:24.675 UTC [164] DETAIL:  Failing row contains (a902e4be-9bd8-4e1c-9a9f-4fd24386e89a, Campanha Reconciliação 1765462284672, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.674415+00, 2025-12-11 14:11:24.674415+00).
2025-12-11T14:14:14.1829371Z  2025-12-11 14:11:24.675 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1830379Z  2025-12-11 14:11:24.680 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1831366Z  2025-12-11 14:11:24.680 UTC [164] DETAIL:  Failing row contains (f3b19d41-a17b-42bc-900c-3ad4412e3056, Campanha Relatório 1765462284678, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.680093+00, 2025-12-11 14:11:24.680093+00).
2025-12-11T14:14:14.1833231Z  2025-12-11 14:11:24.680 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1834252Z  2025-12-11 14:11:24.687 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1835219Z  2025-12-11 14:11:24.687 UTC [164] DETAIL:  Failing row contains (a061a7d3-179e-423d-b604-a79a06238fe2, Campanha CSV 1765462284683, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.685972+00, 2025-12-11 14:11:24.685972+00).
2025-12-11T14:14:14.1836558Z  2025-12-11 14:11:24.687 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1837591Z  2025-12-11 14:11:24.693 UTC [164] ERROR:  null value in column "owner_id" of relation "campaigns" violates not-null constraint
2025-12-11T14:14:14.1838572Z  2025-12-11 14:11:24.693 UTC [164] DETAIL:  Failing row contains (bf078c2e-8dde-4c55-a730-5f25b07fe994, Campanha Excel 1765462284689, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:11:24.692308+00, 2025-12-11 14:11:24.692308+00).
2025-12-11T14:14:14.1840059Z  2025-12-11 14:11:24.693 UTC [164] STATEMENT:  INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"
2025-12-11T14:14:14.1840942Z  2025-12-11 14:11:25.587 UTC [180] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1841291Z  2025-12-11 14:11:35.629 UTC [190] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1841975Z  2025-12-11 14:11:38.700 UTC [182] ERROR:  null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
2025-12-11T14:14:14.1843220Z  2025-12-11 14:11:38.700 UTC [182] DETAIL:  Failing row contains (da4c1a4f-dffd-4931-acdc-f49aee5ab866, test-catalog-1765462298687, Test Catalog 1, Test catalog description, pdf, patrimonio, {"status": "ATIVO"}, 1.0.0, t, f, null, null, 2025-12-11 14:11:38.698496, 2025-12-11 14:11:38.698496).
2025-12-11T14:14:14.1845088Z  2025-12-11 14:11:38.700 UTC [182] STATEMENT:  INSERT INTO "report_catalogs"("id", "key", "name", "description", "type", "model", "default_filters", "current_version", "active", "requires_permission", "created_by_id", "updated_by_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "current_version", "active", "requires_permission", "created_at", "updated_at"
2025-12-11T14:14:14.1846493Z  2025-12-11 14:11:38.777 UTC [182] ERROR:  null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
2025-12-11T14:14:14.1847516Z  2025-12-11 14:11:38.777 UTC [182] DETAIL:  Failing row contains (df80c5e0-8521-4dcb-af4e-4658d0c019cc, test-catalog-2-1765462298769, Test Catalog 2, null, csv, manutencao, null, 1.0.0, t, f, null, null, 2025-12-11 14:11:38.776367, 2025-12-11 14:11:38.776367).
2025-12-11T14:14:14.1849325Z  2025-12-11 14:11:38.777 UTC [182] STATEMENT:  INSERT INTO "report_catalogs"("id", "key", "name", "description", "type", "model", "default_filters", "current_version", "active", "requires_permission", "created_by_id", "updated_by_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, DEFAULT, $3, $4, DEFAULT, $5, $6, $7, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "current_version", "active", "requires_permission", "created_at", "updated_at"
2025-12-11T14:14:14.1850607Z  2025-12-11 14:11:45.668 UTC [200] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1850967Z  2025-12-11 14:11:55.709 UTC [210] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1851298Z  2025-12-11 14:12:05.758 UTC [218] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1851623Z  2025-12-11 14:12:15.796 UTC [228] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1852116Z  2025-12-11 14:12:25.835 UTC [239] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1852476Z  2025-12-11 14:12:35.874 UTC [247] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1852806Z  2025-12-11 14:12:45.947 UTC [255] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1853142Z  2025-12-11 14:12:55.987 UTC [263] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1853466Z  2025-12-11 14:13:06.025 UTC [271] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1853793Z  2025-12-11 14:13:16.063 UTC [279] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1854124Z  2025-12-11 14:13:26.100 UTC [288] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1854447Z  2025-12-11 14:13:36.137 UTC [296] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1864268Z  2025-12-11 14:13:46.181 UTC [304] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1864618Z  2025-12-11 14:13:56.219 UTC [311] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1864958Z  2025-12-11 14:14:06.221 UTC [55] LOG:  checkpoint starting: time
2025-12-11T14:14:14.1865312Z  2025-12-11 14:14:06.259 UTC [319] FATAL:  role "root" does not exist
2025-12-11T14:14:14.1866034Z  2025-12-11 14:14:12.195 UTC [320] ERROR:  update or delete on table "users" violates foreign key constraint "FK_events_created_by" on table "events"
2025-12-11T14:14:14.1866725Z  2025-12-11 14:14:12.195 UTC [320] DETAIL:  Key (id)=(00000000-0000-0000-0000-000000000001) is still referenced from table "events".
2025-12-11T14:14:14.1867211Z  2025-12-11 14:14:12.195 UTC [320] STATEMENT:  DELETE FROM users 
2025-12-11T14:14:14.1867511Z  	       WHERE email LIKE '%@example.com' 
2025-12-11T14:14:14.1867803Z  	       AND (email LIKE 'test-%' OR email LIKE 'inactive-%')
2025-12-11T14:14:14.1873048Z Stop and remove container: c94fed91d9af4f86a193f7e68421c1db_postgres15alpine_a3afea
2025-12-11T14:14:14.1878221Z ##[command]/usr/bin/docker rm --force 7d9f4fc6f8ab9ae24fbb65f42bd9126c813ecdadf8c1b66cf47f1a99761596e9
2025-12-11T14:14:14.3202160Z 7d9f4fc6f8ab9ae24fbb65f42bd9126c813ecdadf8c1b66cf47f1a99761596e9
2025-12-11T14:14:14.3222914Z Print service container logs: d7b5bc8d1fe246088266330aa6afc162_redis7alpine_8153f6
2025-12-11T14:14:14.3224107Z ##[command]/usr/bin/docker logs --details ffa9b0ef2813b7d9f556290f0edd140220625ab442bca9f0d5dcf2796cf4c5b9
2025-12-11T14:14:14.3342948Z  1:C 11 Dec 2025 14:09:06.053 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
2025-12-11T14:14:14.3344610Z  1:C 11 Dec 2025 14:09:06.054 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
2025-12-11T14:14:14.3345143Z  1:C 11 Dec 2025 14:09:06.054 * Redis version=7.4.7, bits=64, commit=00000000, modified=0, pid=1, just started
2025-12-11T14:14:14.3345879Z  1:C 11 Dec 2025 14:09:06.054 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
2025-12-11T14:14:14.3346532Z  1:M 11 Dec 2025 14:09:06.054 * monotonic clock: POSIX clock_gettime
2025-12-11T14:14:14.3346895Z  1:M 11 Dec 2025 14:09:06.055 * Running mode=standalone, port=6379.
2025-12-11T14:14:14.3347215Z  1:M 11 Dec 2025 14:09:06.055 * Server initialized
2025-12-11T14:14:14.3347529Z  1:M 11 Dec 2025 14:09:06.055 * Ready to accept connections tcp
2025-12-11T14:14:14.3347879Z  1:M 11 Dec 2025 14:14:07.013 * 100 changes in 300 seconds. Saving...
2025-12-11T14:14:14.3348252Z  1:M 11 Dec 2025 14:14:07.013 * Background saving started by pid 195
2025-12-11T14:14:14.3348591Z  195:C 11 Dec 2025 14:14:07.015 * DB saved on disk
2025-12-11T14:14:14.3348980Z  195:C 11 Dec 2025 14:14:07.016 * Fork CoW for RDB: current 0 MB, peak 0 MB, average 0 MB
2025-12-11T14:14:14.3349445Z  1:M 11 Dec 2025 14:14:07.114 * Background saving terminated with success
2025-12-11T14:14:14.3354127Z Stop and remove container: d7b5bc8d1fe246088266330aa6afc162_redis7alpine_8153f6
2025-12-11T14:14:14.3354857Z ##[command]/usr/bin/docker rm --force ffa9b0ef2813b7d9f556290f0edd140220625ab442bca9f0d5dcf2796cf4c5b9
2025-12-11T14:14:14.4549658Z ffa9b0ef2813b7d9f556290f0edd140220625ab442bca9f0d5dcf2796cf4c5b9
2025-12-11T14:14:14.4572577Z Remove container network: github_network_971d2e1777e44e0c8164f0fdc1d8887c
2025-12-11T14:14:14.4577375Z ##[command]/usr/bin/docker network rm github_network_971d2e1777e44e0c8164f0fdc1d8887c
2025-12-11T14:14:14.5869261Z github_network_971d2e1777e44e0c8164f0fdc1d8887c
2025-12-11T14:14:14.5923737Z Cleaning up orphan processes
