test
failed 2 minutes ago in 2m 23s
Search logs
2s
23s
1s
1s
19s
8s
1m 25s
Run npm run test

> patrimonio_inventario@0.0.1 test
> jest

PASS src/users/users.service.advanced-methods.spec.ts (8.757 s)
PASS src/users/users.service.advanced.spec.ts (8.917 s)
PASS test/integration/users.integration.spec.ts
PASS src/users/users.controller.advanced.spec.ts
PASS src/users/users.service.find.spec.ts
[Nest] 3074  - 12/10/2025, 2:11:48 AM   ERROR [UsersHttpClient] Erro inesperado ao validar credenciais: Error: Unexpected error, URL: http://users:3000/users/validate
[Nest] 3074  - 12/10/2025, 2:11:48 AM   ERROR [UsersHttpClient] Erro inesperado ao buscar usuário: Error: Unexpected error
PASS test/auth/services/users-http-client.spec.ts
PASS src/users/users.service.create.spec.ts
PASS src/common/services/filter.service.spec.ts
[Nest] 3073  - 12/10/2025, 2:11:50 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/events/services/events.service.update.spec.ts
PASS src/users/users.service.new-methods.spec.ts
PASS test/events/services/events.service.create.spec.ts
[Nest] 3074  - 12/10/2025, 2:11:52 AM   ERROR [CacheService] Error getting cache key error-key:
[Nest] 3074  - 12/10/2025, 2:11:52 AM   ERROR [CacheService] Error: Cache error
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
PASS test/patrimonio/services/patrimonio.service.transferResponsavel.spec.ts
[Nest] 3074  - 12/10/2025, 2:11:52 AM   ERROR [CacheService] Error setting cache key error-key:
[Nest] 3074  - 12/10/2025, 2:11:52 AM   ERROR [CacheService] Error: Cache error
    at Object.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/common/services/cache.service.spec.ts:111:42)
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
[Nest] 3074  - 12/10/2025, 2:11:52 AM   ERROR [CacheService] Error deleting cache key error-key:
[Nest] 3074  - 12/10/2025, 2:11:52 AM   ERROR [CacheService] Error: Cache error
    at Object.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/common/services/cache.service.spec.ts:133:42)
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
PASS src/common/services/cache.service.spec.ts
PASS test/events/services/events.service.findAll.spec.ts
PASS test/auth/services/auth.service.refresh.spec.ts
[Nest] 3073  - 12/10/2025, 2:11:53 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/users/services/users.service.findOne.spec.ts
PASS test/patrimonio/services/patrimonio.service.createBulkWithTransaction.spec.ts
PASS test/patrimonio/services/patrimonio.service.transferResponsavelBulk.spec.ts
PASS test/patrimonio/services/patrimonio.service.updateStatus.spec.ts
PASS src/common/services/normalization.service.spec.ts
PASS src/common/services/hash.service.spec.ts
PASS test/patrimonio/services/patrimonio.service.getDashboard.spec.ts
[Nest] 3073  - 12/10/2025, 2:11:56 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (3)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts
PASS test/patrimonio/services/patrimonio.service.desativar.spec.ts
PASS test/patrimonio/services/patrimonio.service.updateBulk.spec.ts
PASS test/events/services/events.service.publish.spec.ts
PASS test/patrimonio/services/patrimonio.service.ativar.spec.ts
PASS test/events/services/events.service.findOneByIdOrSlug.spec.ts
PASS test/patrimonio/services/patrimonio.service.updateLocalizacao.spec.ts
[Nest] 3073  - 12/10/2025, 2:11:59 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (4)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.findByValorRange.spec.ts
PASS test/patrimonio/services/patrimonio.service.verificarDuplicidade.spec.ts
PASS test/patrimonio/services/patrimonio.service.findAllWithFilters.spec.ts
/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/exceljs/lib/utils/stream-buf.js:205
        pipe.write(chunk.toBuffer(), () => {
             ^

[TypeError: pipe.write is not a function]

Node.js v20.19.6
PASS test/patrimonio/services/patrimonio.service.update.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:02 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (5)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/users/services/users.service.update.spec.ts
PASS test/patrimonio/services/patrimonio.service.getHistoricoPorResponsavel.spec.ts
PASS test/auth/services/auth.service.login.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:05 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (6)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.findManutencaoProlongada.spec.ts
/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/exceljs/lib/utils/stream-buf.js:205
        pipe.write(chunk.toBuffer(), () => {
             ^

[TypeError: pipe.write is not a function]

Node.js v20.19.6
PASS test/patrimonio/services/patrimonio.service.findByAquisicaoPeriodo.spec.ts
PASS test/patrimonio/services/patrimonio.service.exportToCsv.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:08 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (7)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.create.spec.ts
PASS test/patrimonio/services/patrimonio.service.getStatsLocalizacoes.spec.ts
PASS test/users/services/users.service.create.spec.ts
PASS test/users/services/users.service.validateCredentials.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:11 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (8)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/exceljs/lib/utils/stream-buf.js:205
        pipe.write(chunk.toBuffer(), () => {
             ^

[TypeError: pipe.write is not a function]

Node.js v20.19.6
PASS test/patrimonio/services/patrimonio.service.getStatsEvolucao.spec.ts
PASS test/patrimonio/services/patrimonio.service.getHistoricoResponsaveis.spec.ts
PASS test/auth/strategies/jwt.strategy.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:14 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (9)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
[Nest] 3073  - 12/10/2025, 2:12:14 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.getStatsAquisicao.spec.ts
PASS test/patrimonio/services/patrimonio.service.getStatsFaixaValor.spec.ts
PASS test/common/guards/jwt-auth.guard.spec.ts
/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/exceljs/lib/utils/stream-buf.js:205
        pipe.write(chunk.toBuffer(), () => {
             ^

[TypeError: pipe.write is not a function]

Node.js v20.19.6
FAIL test/patrimonio/services/patrimonio.service.exportToExcel.spec.ts
  ● Test suite failed to run

    Jest worker encountered 4 child process exceptions, exceeding retry limit

      at ChildProcessWorker.initialize (node_modules/jest-worker/build/index.js:805:21)

[Nest] 3073  - 12/10/2025, 2:12:17 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.gerarRelatorioInventario.spec.ts
PASS test/patrimonio/services/patrimonio.service.findByStatusMultiplos.spec.ts
PASS test/auth/controllers/auth.controller.me.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:20 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (3)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.findByCategoriasMultiplas.spec.ts
PASS test/patrimonio/services/patrimonio.service.findGarantiaExpirada.spec.ts
PASS test/patrimonio/services/patrimonio.service.getHistorico.spec.ts (5.578 s)
PASS test/patrimonio/services/patrimonio.service.findByNumeroSerie.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:23 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (4)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.findOne.spec.ts
PASS test/patrimonio/services/patrimonio.service.validarCodigo.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.transferResponsavel.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:26 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (5)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/services/patrimonio.service.findGarantiaVencendo.spec.ts
PASS test/patrimonio/services/patrimonio.service.findByLocalizacao.spec.ts
PASS test/patrimonio/services/patrimonio.service.remove.spec.ts
PASS test/patrimonio/services/patrimonio.service.findSemResponsavel.spec.ts
PASS test/common/interceptors/logging.interceptor.spec.ts
PASS src/users/users.service.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.marcarDescarte.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:29 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (6)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/controllers/patrimonio.controller.updateStatus.spec.ts
PASS src/users/users.controller.spec.ts
PASS test/auth/services/auth.service.logout.spec.ts
PASS test/events/controllers/events.controller.publish.spec.ts
PASS test/common/validators/is-strong-password.validator.spec.ts
PASS test/common/interceptors/timeout.interceptor.spec.ts
PASS test/users/controllers/users.controller.findOne.spec.ts
PASS test/common/guards/roles.guard.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:32 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (7)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/auth/controllers/auth.controller.login.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.updateLocalizacao.spec.ts
PASS test/events/controllers/events.controller.update.spec.ts
PASS test/auth/services/auth.service.me.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.getStatsEvolucao.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:35 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (8)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
PASS test/patrimonio/controllers/patrimonio.controller.getStatsAquisicao.spec.ts
PASS test/events/controllers/events.controller.findOne.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.desativar.spec.ts
PASS test/users/services/users.service.findAll.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.ativar.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.update.spec.ts
[Nest] 3073  - 12/10/2025, 2:12:38 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (9)...
error: database "patrimonio_inventario" does not exist
    at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
    at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
    at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
    at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
    at Socket.emit (node:events:524:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Socket.Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
FAIL test/patrimonio/swagger-validation.spec.ts (63.524 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (14) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops

      at _log (node_modules/dotenv/lib/main.js:142:11)

    console.error
      Erro ao inicializar aplicação no teste: error: database "patrimonio_inventario" does not exist
          at Parser.parseErrorMessage (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:369:69)
          at Parser.handlePacket (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:187:21)
          at Parser.parse (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/parser.ts:102:30)
          at Socket.<anonymous> (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg-protocol/src/index.ts:7:48)
          at Socket.emit (node:events:524:28)
          at addChunk (node:internal/streams/readable:561:12)
          at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
          at Socket.Readable.push (node:internal/streams/readable:392:5)
          at TCP.onStreamRead (node:internal/stream_base_commons:191:23) {
        length: 106,
        severity: 'FATAL',
        code: '3D000',
        detail: undefined,
        hint: undefined,
        position: undefined,
        internalPosition: undefined,
        internalQuery: undefined,
        where: undefined,
        schema: undefined,
        table: undefined,
        column: undefined,
        dataType: undefined,
        constraint: undefined,
        file: 'postinit.c',
        line: '948',
        routine: 'InitPostgres'
      }

      120 |       swaggerDocument = SwaggerModule.createDocument(app, config);
      121 |     } catch (error) {
    > 122 |       console.error('Erro ao inicializar aplicação no teste:', error);
          |               ^
      123 |       throw error;
      124 |     }
      125 |   }, 60000); // Aumentar timeout para 60 segundos

      at Object.<anonymous> (test/patrimonio/swagger-validation.spec.ts:122:15)

  ● Swagger Documentation Validation › FASE 1: Endpoints de Alta Prioridade › deve ter documentação para PATCH /v1/patrimonio/{id}/status

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 1: Endpoints de Alta Prioridade › deve ter documentação para POST /v1/patrimonio/{id}/transferir-responsavel

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 1: Endpoints de Alta Prioridade › deve ter documentação para GET /v1/patrimonio/dashboard

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Status › deve ter documentação para PATCH /v1/patrimonio/{id}/ativar

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Status › deve ter documentação para PATCH /v1/patrimonio/{id}/desativar

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Status › deve ter documentação para POST /v1/patrimonio/{id}/descarte

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Localização › deve ter documentação para PATCH /v1/patrimonio/{id}/localizacao

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Localização › deve ter documentação para GET /v1/patrimonio/localizacao/{localizacao}

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Localização › deve ter documentação para GET /v1/patrimonio/stats/localizacoes

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Estatísticas Avançadas › deve ter documentação para GET /v1/patrimonio/stats/faixa-valor

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Estatísticas Avançadas › deve ter documentação para GET /v1/patrimonio/stats/aquisicao

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Estatísticas Avançadas › deve ter documentação para GET /v1/patrimonio/stats/evolucao

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/numero-serie/{numeroSerie}

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/aquisicao-periodo

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/valor-range

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/status-multiplos

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/categorias-multiplas

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Operações em Lote › deve ter documentação para POST /v1/patrimonio/bulk

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Operações em Lote › deve ter documentação para PATCH /v1/patrimonio/bulk

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Operações em Lote › deve ter documentação para POST /v1/patrimonio/bulk/transferir-responsavel

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Validações › deve ter documentação para GET /v1/patrimonio/validar-codigo/{codigo}

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Validações › deve ter documentação para POST /v1/patrimonio/verificar-duplicidade

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Validações › deve ter documentação para GET /v1/patrimonio/{id}/disponibilidade

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/garantia-expirada

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/alertas/garantia

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/manutencao-prolongada

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/sem-responsavel

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Histórico › deve ter documentação para GET /v1/patrimonio/{id}/historico

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Histórico › deve ter documentação para GET /v1/patrimonio/{id}/historico/responsaveis

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Histórico › deve ter documentação para GET /v1/patrimonio/responsavel/{id}/historico

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter tag "patrimonio" definida

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter *** configurado

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter informações da API

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter pelo menos 32 endpoints de patrimônio documentados

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

PASS test/patrimonio/controllers/patrimonio.controller.getDashboard.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.gerarRelatorioInventario.spec.ts
PASS test/common/guards/jwt-auth.guard.public.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.exportToCsv.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.getStatsFaixaValor.spec.ts
PASS test/auth/controllers/auth.controller.refresh.spec.ts
PASS test/auth/controllers/auth.controller.logout.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.exportToExcel.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findGarantiaVencendo.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findManutencaoProlongada.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findOne.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findGarantiaExpirada.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.transferResponsavelBulk.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.create.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findByStatusMultiplos.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.createBulk.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.remove.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findByCategoriasMultiplas.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findByLocalizacao.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.verificarDuplicidade.spec.ts
PASS test/users/controllers/users.controller.update.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findAll.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findByAquisicaoPeriodo.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.getStatsLocalizacoes.spec.ts
PASS test/common/validators/is-trimmed.validator.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.updateBulk.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findByNumeroSerie.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findByValorRange.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.verificarDisponibilidade.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.getHistoricoResponsaveis.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.getHistoricoPorResponsavel.spec.ts
PASS test/common/interceptors/transform-response.interceptor.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.getHistorico.spec.ts
PASS test/common/decorators/owner-id.decorator.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.validarCodigo.spec.ts
PASS test/events/controllers/events.controller.create.spec.ts
PASS test/patrimonio/controllers/patrimonio.controller.findSemResponsavel.spec.ts
PASS test/users/controllers/users.controller.remove.spec.ts
PASS test/users/controllers/users.controller.findAll.spec.ts
PASS src/app.controller.spec.ts
PASS test/users/controllers/users.controller.create.spec.ts
PASS test/events/controllers/events.controller.findAll.spec.ts
A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.

Summary of all failing tests
FAIL test/patrimonio/services/patrimonio.service.exportToExcel.spec.ts
  ● Test suite failed to run

    Jest worker encountered 4 child process exceptions, exceeding retry limit

      at ChildProcessWorker.initialize (node_modules/jest-worker/build/index.js:805:21)

FAIL test/patrimonio/swagger-validation.spec.ts (63.524 s)
  ● Swagger Documentation Validation › FASE 1: Endpoints de Alta Prioridade › deve ter documentação para PATCH /v1/patrimonio/{id}/status

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 1: Endpoints de Alta Prioridade › deve ter documentação para POST /v1/patrimonio/{id}/transferir-responsavel

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 1: Endpoints de Alta Prioridade › deve ter documentação para GET /v1/patrimonio/dashboard

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Status › deve ter documentação para PATCH /v1/patrimonio/{id}/ativar

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Status › deve ter documentação para PATCH /v1/patrimonio/{id}/desativar

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Status › deve ter documentação para POST /v1/patrimonio/{id}/descarte

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Localização › deve ter documentação para PATCH /v1/patrimonio/{id}/localizacao

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Localização › deve ter documentação para GET /v1/patrimonio/localizacao/{localizacao}

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Gestão de Localização › deve ter documentação para GET /v1/patrimonio/stats/localizacoes

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Estatísticas Avançadas › deve ter documentação para GET /v1/patrimonio/stats/faixa-valor

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Estatísticas Avançadas › deve ter documentação para GET /v1/patrimonio/stats/aquisicao

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 2: Estatísticas Avançadas › deve ter documentação para GET /v1/patrimonio/stats/evolucao

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/numero-serie/{numeroSerie}

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/aquisicao-periodo

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/valor-range

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/status-multiplos

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Buscas Avançadas › deve ter documentação para GET /v1/patrimonio/categorias-multiplas

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Operações em Lote › deve ter documentação para POST /v1/patrimonio/bulk

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Operações em Lote › deve ter documentação para PATCH /v1/patrimonio/bulk

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Operações em Lote › deve ter documentação para POST /v1/patrimonio/bulk/transferir-responsavel

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Validações › deve ter documentação para GET /v1/patrimonio/validar-codigo/{codigo}

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Validações › deve ter documentação para POST /v1/patrimonio/verificar-duplicidade

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Validações › deve ter documentação para GET /v1/patrimonio/{id}/disponibilidade

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/garantia-expirada

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/alertas/garantia

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/manutencao-prolongada

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Alertas › deve ter documentação para GET /v1/patrimonio/sem-responsavel

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Histórico › deve ter documentação para GET /v1/patrimonio/{id}/historico

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Histórico › deve ter documentação para GET /v1/patrimonio/{id}/historico/responsaveis

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › FASE 3: Histórico › deve ter documentação para GET /v1/patrimonio/responsavel/{id}/historico

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter tag "patrimonio" definida

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter *** configurado

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter informações da API

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)

  ● Swagger Documentation Validation › Validação Geral do Swagger › deve ter pelo menos 32 endpoints de patrimônio documentados

    error: database "patrimonio_inventario" does not exist

      at Parser.parseErrorMessage (node_modules/pg-protocol/src/parser.ts:369:69)
      at Parser.handlePacket (node_modules/pg-protocol/src/parser.ts:187:21)
      at Parser.parse (node_modules/pg-protocol/src/parser.ts:102:30)
      at Socket.<anonymous> (node_modules/pg-protocol/src/index.ts:7:48)


Test Suites: 2 failed, 127 passed, 129 total
Tests:       34 failed, 5 skipped, 484 passed, 523 total
Snapshots:   0 total
Time:        84.372 s
Ran all test suites.
Error: Process completed with exit code 1.