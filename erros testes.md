
Annotations
1 error and 10 warnings
test
failed 15 minutes ago in 2m 24s
Search logs
3s
22s
1s
1s
21s
8s
1m 24s
Run npm run test

> patrimonio_inventario@0.0.1 test
> jest

PASS src/users/users.service.advanced.spec.ts (8.877 s)
PASS src/users/users.service.advanced-methods.spec.ts (8.899 s)
PASS src/users/users.controller.advanced.spec.ts (9.708 s)
FAIL test/integration/users.integration.spec.ts
  ● UsersService - Integration Tests with Fake Repository (PDF 086) › FAKE Repository Implementation (PDF 086) › User Creation Flow › should prevent duplicate email creation

    expect(received).rejects.toThrow()

    Received promise resolved instead of rejected
    Resolved to value: {"avatarUrl": undefined, "createdAt": 2025-12-10T01:08:48.163Z, "email": "john@example.com", "id": 2, "isActive": true, "name": "John Doe", "role": "OPERATOR", "updatedAt": 2025-12-10T01:08:48.163Z, "version": 1}

      92 |
      93 |         // Act & Assert - Tentar criar segundo usuário com mesmo email
    > 94 |         await expect(service.create(createUserDto)).rejects.toThrow(
         |               ^
      95 |           'Email already exists',
      96 |         );
      97 |       });

      at expect (node_modules/expect/build/index.js:2116:15)
      at Object.<anonymous> (test/integration/users.integration.spec.ts:94:15)

  ● UsersService - Integration Tests with Fake Repository (PDF 086) › FAKE Repository Implementation (PDF 086) › User Update Flow › should update user information

    expect(received).toBeGreaterThan(expected)

    Expected: > 0
    Received:   0

      244 |         // Arrange
      245 |         const users = await service.findAllWithAdvancedFilters({});
    > 246 |         expect(users.data.length).toBeGreaterThan(0);
          |                                   ^
      247 |         const userId = users.data[0].id;
      248 |         const updateDto: UpdateUserDto = {
      249 |           name: 'John Updated',

      at Object.<anonymous> (test/integration/users.integration.spec.ts:246:35)

  ● UsersService - Integration Tests with Fake Repository (PDF 086) › FAKE Repository Implementation (PDF 086) › User Update Flow › should update password when provided

    expect(received).toBeGreaterThan(expected)

    Expected: > 0
    Received:   0

      269 |         // Arrange
      270 |         const users = await service.findAllWithAdvancedFilters({});
    > 271 |         expect(users.data.length).toBeGreaterThan(0);
          |                                   ^
      272 |         const userId = users.data[0].id;
      273 |         const updateDto: UpdateUserDto = {
      274 |           password: 'newpassword123',

      at Object.<anonymous> (test/integration/users.integration.spec.ts:271:35)

  ● UsersService - Integration Tests with Fake Repository (PDF 086) › FAKE Repository Implementation (PDF 086) › User Deletion Flow › should soft delete user

    expect(received).toBeGreaterThan(expected)

    Expected: > 0
    Received:   0

      299 |         // Arrange
      300 |         const users = await service.findAllWithAdvancedFilters({});
    > 301 |         expect(users.data.length).toBeGreaterThan(0);
          |                                   ^
      302 |         const userId = users.data[0].id;
      303 |
      304 |         // Act

      at Object.<anonymous> (test/integration/users.integration.spec.ts:301:35)

PASS src/users/users.service.find.spec.ts
[Nest] 3082  - 12/10/2025, 1:08:49 AM   ERROR [UsersHttpClient] Erro inesperado ao validar credenciais: Error: Unexpected error, URL: http://users:3000/users/validate
[Nest] 3082  - 12/10/2025, 1:08:49 AM   ERROR [UsersHttpClient] Erro inesperado ao buscar usuário: Error: Unexpected error
PASS test/auth/services/users-http-client.spec.ts
PASS src/users/users.service.create.spec.ts
PASS src/common/services/filter.service.spec.ts
PASS src/users/users.service.new-methods.spec.ts
PASS test/events/services/events.service.update.spec.ts
PASS test/events/services/events.service.create.spec.ts
[Nest] 3081  - 12/10/2025, 1:08:54 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (1)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
[Nest] 3088  - 12/10/2025, 1:08:55 AM   ERROR [CacheService] Error getting cache key error-key:
PASS test/patrimonio/services/patrimonio.service.transferResponsavel.spec.ts
[Nest] 3088  - 12/10/2025, 1:08:55 AM   ERROR [CacheService] Error: Cache error
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
[Nest] 3088  - 12/10/2025, 1:08:55 AM   ERROR [CacheService] Error setting cache key error-key:
[Nest] 3088  - 12/10/2025, 1:08:55 AM   ERROR [CacheService] Error: Cache error
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
[Nest] 3088  - 12/10/2025, 1:08:55 AM   ERROR [CacheService] Error deleting cache key error-key:
[Nest] 3088  - 12/10/2025, 1:08:55 AM   ERROR [CacheService] Error: Cache error
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
PASS test/users/services/users.service.findOne.spec.ts
FAIL test/patrimonio/services/patrimonio.service.createBulkWithTransaction.spec.ts
  ● PatrimonioService.createBulkWithTransaction (unit) › should handle errors and continue processing

    expect(received).toBe(expected) // Object.is equality

    Expected: "CÃ³digo jÃ¡ existe"
    Received: "Código já existe"

      145 |     expect(result.totalSucessos).toBe(1);
      146 |     expect(result.totalErros).toBe(1);
    > 147 |     expect(result.erros[0].erro).toBe('CÃ³digo jÃ¡ existe');
          |                                  ^
      148 |   });
      149 | });
      150 |

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.createBulkWithTransaction.spec.ts:147:34)


PASS test/patrimonio/services/patrimonio.service.updateStatus.spec.ts
[Nest] 3081  - 12/10/2025, 1:08:57 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
PASS src/common/services/normalization.service.spec.ts
PASS src/common/services/hash.service.spec.ts
PASS test/patrimonio/services/patrimonio.service.getDashboard.spec.ts
PASS test/patrimonio/services/patrimonio.service.desativar.spec.ts
PASS test/patrimonio/services/patrimonio.service.ativar.spec.ts
PASS test/events/services/events.service.publish.spec.ts

[Nest] 3081  - 12/10/2025, 1:09:00 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (3)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
FAIL test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts
  ● PatrimonioService.verificarDisponibilidade (unit) › should return disponivel: false when patrimonio is MANUTENCAO

    expect(received).toBe(expected) // Object.is equality

    Expected: "PatrimÃ´nio em manutenÃ§Ã£o"
    Received: "Patrimônio em manutenção"

      101 |
      102 |     expect(result.disponivel).toBe(false);
    > 103 |     expect(result.motivo).toBe('PatrimÃ´nio em manutenÃ§Ã£o');
          |                           ^
      104 |   });
      105 |
      106 |   it('should return disponivel: false when patrimonio is DESCARTADO', async () => {

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts:103:27)

  ● PatrimonioService.verificarDisponibilidade (unit) › should return disponivel: false when patrimonio is DESCARTADO

    expect(received).toBe(expected) // Object.is equality

    Expected: "PatrimÃ´nio descartado"
    Received: "Patrimônio descartado"

      116 |
      117 |     expect(result.disponivel).toBe(false);
    > 118 |     expect(result.motivo).toBe('PatrimÃ´nio descartado');
          |                           ^
      119 |   });
      120 |
      121 |   it('should return disponivel: false when patrimonio is INATIVO', async () => {

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts:118:27)

  ● PatrimonioService.verificarDisponibilidade (unit) › should return disponivel: false when patrimonio is INATIVO

    expect(received).toContain(expected) // indexOf

    Expected substring: "PatrimÃ´nio estÃ¡ com status:"
    Received string:    "Patrimônio está com status: INATIVO"

      131 |
      132 |     expect(result.disponivel).toBe(false);
    > 133 |     expect(result.motivo).toContain('PatrimÃ´nio estÃ¡ com status:');
          |                           ^
      134 |   });
      135 |
      136 |   it('should throw NotFoundException when patrimonio not found', async () => {

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts:133:27)

  ● PatrimonioService.verificarDisponibilidade (unit) › should throw NotFoundException when patrimonio not found

    expect(received).rejects.toThrow(expected)

    Expected substring: "PatrimÃ´nio com ID \"62511194-0468-4b04-bb80-a4e2e79bbcfa\" nÃ£o encontrado"
    Received message:   "Patrimônio com ID \"62511194-0468-4b04-bb80-a4e2e79bbcfa\" não encontrado"

          1688 |
          1689 |     if (!patrimonio) {
        > 1690 |       throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
               |             ^
          1691 |     }
          1692 |
          1693 |     // Verificar se está em manutenção

      at PatrimonioService.verificarDisponibilidade (packages/patrimonio-service/src/patrimonio/patrimonio.service.ts:1690:13)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts:144:5)
      at Object.toThrow (node_modules/expect/build/index.js:2155:20)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.verificarDisponibilidade.spec.ts:144:64)

PASS test/events/services/events.service.findOneByIdOrSlug.spec.ts
PASS test/patrimonio/services/patrimonio.service.updateLocalizacao.spec.ts
PASS test/patrimonio/services/patrimonio.service.verificarDuplicidade.spec.ts
PASS test/patrimonio/services/patrimonio.service.findAllWithFilters.spec.ts
PASS test/patrimonio/services/patrimonio.service.update.spec.ts
[Nest] 3081  - 12/10/2025, 1:09:03 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (4)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
PASS test/users/services/users.service.update.spec.ts
PASS test/auth/services/auth.service.login.spec.ts

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      45 |     };
      46 |
    > 47 |     const module = await Test.createTestingModule({
         |                    ^
      48 |       providers: [
      49 |         PatrimonioService,
      50 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByValorRange.spec.ts:47:20)

  ● PatrimonioService.findByValorRange (unit) › should throw BadRequestException when valorMinimo > valorMaximo

    Nest can't resolve dependencies of the PatrimonioService (PatrimonioRepository, ?, UsersHttpClient, CategoriasHttpClient, DataSource, StorageService). Please make sure that the argument "PatrimonioLocalizacaoHistoricoRepository" at index [1] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      45 |     };
      46 |
    > 47 |     const module = await Test.createTestingModule({
         |                    ^
      48 |       providers: [
      49 |         PatrimonioService,
      50 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByValorRange.spec.ts:47:20)

  ● PatrimonioService.findByValorRange (unit) › should return empty array when no patrimonios found

    Nest can't resolve dependencies of the PatrimonioService (PatrimonioRepository, ?, UsersHttpClient, CategoriasHttpClient, DataSource, StorageService). Please make sure that the argument "PatrimonioLocalizacaoHistoricoRepository" at index [1] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      45 |     };
      46 |
    > 47 |     const module = await Test.createTestingModule({
         |                    ^
      48 |       providers: [
      49 |         PatrimonioService,
      50 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByValorRange.spec.ts:47:20)


    Number of calls: 1

      86 |
      87 |     expect(usersHttpClient.findOne).toHaveBeenCalledWith(responsavelId);
    > 88 |     expect(repository.find).toHaveBeenCalledWith({
         |                             ^
      89 |       where: { responsavelId },
      90 |       relations: ['categoria'],
      91 |       order: { nome: 'ASC' },

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getHistoricoPorResponsavel.spec.ts:88:29)

/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/exceljs/lib/utils/stream-buf.js:205
        pipe.write(chunk.toBuffer(), () => {
             ^

[TypeError: pipe.write is not a function]

Node.js v20.19.6
PASS test/patrimonio/services/patrimonio.service.exportToCsv.spec.ts
[Nest] 3081  - 12/10/2025, 1:09:06 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (5)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
PASS test/patrimonio/services/patrimonio.service.create.spec.ts
PASS test/patrimonio/services/patrimonio.service.getStatsLocalizacoes.spec.ts

          1366 |
          1367 |     if (dataInicial > dataFinal) {
        > 1368 |       throw new BadRequestException(
               |             ^
          1369 |         'Data inicial deve ser anterior ou igual à data final',
          1370 |       );
          1371 |     }

      at PatrimonioService.findByAquisicaoPeriodo (packages/patrimonio-service/src/patrimonio/patrimonio.service.ts:1368:13)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByAquisicaoPeriodo.spec.ts:102:26)
      at Object.toThrow (node_modules/expect/build/index.js:2155:20)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByAquisicaoPeriodo.spec.ts:102:63)

[Nest] 3081  - 12/10/2025, 1:09:09 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (6)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
PASS test/users/services/users.service.create.spec.ts
PASS test/users/services/users.service.validateCredentials.spec.ts
/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/exceljs/lib/utils/stream-buf.js:205
        pipe.write(chunk.toBuffer(), () => {
             ^

[TypeError: pipe.write is not a function]

Node.js v20.19.6

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      44 |     };
      45 |
    > 46 |     const module = await Test.createTestingModule({
         |                    ^
      47 |       providers: [
      48 |         PatrimonioService,
      49 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findManutencaoProlongada.spec.ts:46:20)

  ● PatrimonioService.findManutencaoProlongada (unit) › should use default dias = 90 when not provided

    Nest can't resolve dependencies of the PatrimonioService (PatrimonioRepository, ?, UsersHttpClient, CategoriasHttpClient, DataSource, StorageService). Please make sure that the argument "PatrimonioLocalizacaoHistoricoRepository" at index [1] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      44 |     };
      45 |
    > 46 |     const module = await Test.createTestingModule({
         |                    ^
      47 |       providers: [
      48 |         PatrimonioService,
      49 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findManutencaoProlongada.spec.ts:46:20)

  ● PatrimonioService.findManutencaoProlongada (unit) › should return empty array when no patrimonios found

    Nest can't resolve dependencies of the PatrimonioService (PatrimonioRepository, ?, UsersHttpClient, CategoriasHttpClient, DataSource, StorageService). Please make sure that the argument "PatrimonioLocalizacaoHistoricoRepository" at index [1] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      44 |     };
      45 |
    > 46 |     const module = await Test.createTestingModule({
         |                    ^
      47 |       providers: [
      48 |         PatrimonioService,
      49 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findManutencaoProlongada.spec.ts:46:20)

[Nest] 3081  - 12/10/2025, 1:09:12 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (7)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
PASS test/auth/strategies/jwt.strategy.spec.ts
PASS test/common/guards/jwt-auth.guard.spec.ts

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getHistoricoResponsaveis.spec.ts:93:32)


          1865 |
          1866 |     if (!patrimonio) {
        > 1867 |       throw new NotFoundException(`Patrimônio com ID "${id}" não encontrado`);
               |             ^
          1868 |     }
          1869 |
          1870 |     const responsaveis: HistoricoResponsavelItemDto[] = [];

      at PatrimonioService.getHistoricoResponsaveis (packages/patrimonio-service/src/patrimonio/patrimonio.service.ts:1867:13)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getHistoricoResponsaveis.spec.ts:110:5)
      at Object.toThrow (node_modules/expect/build/index.js:2155:20)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getHistoricoResponsaveis.spec.ts:110:64)

PASS test/patrimonio/services/patrimonio.service.gerarRelatorioInventario.spec.ts
[Nest] 3081  - 12/10/2025, 1:09:15 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (8)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      52 |     };
      53 |
    > 54 |     const module = await Test.createTestingModule({
         |                    ^
      55 |       providers: [
      56 |         PatrimonioService,
      57 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getStatsEvolucao.spec.ts:54:20)

  ● PatrimonioService.getStatsEvolucao (unit) › should use current year when ano not provided

    Nest can't resolve dependencies of the PatrimonioService (PatrimonioRepository, ?, UsersHttpClient, CategoriasHttpClient, DataSource, StorageService). Please make sure that the argument "PatrimonioLocalizacaoHistoricoRepository" at index [1] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      52 |     };
      53 |
    > 54 |     const module = await Test.createTestingModule({
         |                    ^
      55 |       providers: [
      56 |         PatrimonioService,
      57 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getStatsEvolucao.spec.ts:54:20)

/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/exceljs/lib/utils/stream-buf.js:205
        pipe.write(chunk.toBuffer(), () => {
             ^

[TypeError: pipe.write is not a function]

Node.js v20.19.6
PASS test/patrimonio/services/patrimonio.service.findByStatusMultiplos.spec.ts
[Nest] 3081  - 12/10/2025, 1:09:19 AM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (9)...
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
    at TCP.callbackTrampoline (node:internal/async_hooks:130:17)
FAIL test/patrimonio/swagger-validation.spec.ts (32.194 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (14) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }

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
          at TCP.onStreamRead (node:internal/stream_base_commons:191:23)
          at TCP.callbackTrampoline (node:internal/async_hooks:130:17) {
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

      67 |       swaggerDocument = SwaggerModule.createDocument(app, config);
      68 |     } catch (error) {
    > 69 |       console.error('Erro ao inicializar aplicação no teste:', error);
         |               ^
      70 |       throw error;
      71 |     }
      72 |   }, 60000); // Aumentar timeout para 60 segundos

      at Object.<anonymous> (test/patrimonio/swagger-validation.spec.ts:69:15)

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

PASS test/auth/controllers/auth.controller.me.spec.ts
PASS test/patrimonio/services/patrimonio.service.findByCategoriasMultiplas.spec.ts

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      50 |     };
      51 |
    > 52 |     const module = await Test.createTestingModule({
         |                    ^
      53 |       providers: [
      54 |         PatrimonioService,
      55 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getStatsAquisicao.spec.ts:52:20)

  ● PatrimonioService.getStatsAquisicao (unit) › should use default periodo when not provided

    Nest can't resolve dependencies of the PatrimonioService (PatrimonioRepository, ?, UsersHttpClient, CategoriasHttpClient, DataSource, StorageService). Please make sure that the argument "PatrimonioLocalizacaoHistoricoRepository" at index [1] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      50 |     };
      51 |
    > 52 |     const module = await Test.createTestingModule({
         |                    ^
      53 |       providers: [
      54 |         PatrimonioService,
      55 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getStatsAquisicao.spec.ts:52:20)


    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      45 |     };
      46 |
    > 47 |     const module = await Test.createTestingModule({
         |                    ^
      48 |       providers: [
      49 |         PatrimonioService,
      50 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingInstanceLoader.createInstancesOfProviders (node_modules/@nestjs/core/injector/instance-loader.js:55:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:40:13
          at async Promise.all (index 1)
      at TestingInstanceLoader.createInstances (node_modules/@nestjs/core/injector/instance-loader.js:39:9)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/core/injector/instance-loader.js:22:13)
      at TestingInstanceLoader.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
      at TestingModuleBuilder.createInstancesOfDependencies (node_modules/@nestjs/testing/testing-module.builder.js:118:9)
      at TestingModuleBuilder.compile (node_modules/@nestjs/testing/testing-module.builder.js:74:9)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.getStatsFaixaValor.spec.ts:47:20)

  ● PatrimonioService.getStatsFaixaValor (unit) › should use default intervalo when not provided

    Nest can't resolve dependencies of the PatrimonioService (PatrimonioRepository, ?, UsersHttpClient, CategoriasHttpClient, DataSource, StorageService). Please make sure that the argument "PatrimonioLocalizacaoHistoricoRepository" at index [1] is available in the RootTestModule context.

    Potential solutions:
    - Is RootTestModule a valid NestJS module?
    - If "PatrimonioLocalizacaoHistoricoRepository" is a provider, is it part of the current RootTestModule?
    - If "PatrimonioLocalizacaoHistoricoRepository" is exported from a separate @Module, is that module imported within RootTestModule?
      @Module({
        imports: [ /* the Module containing "PatrimonioLocalizacaoHistoricoRepository" */ ]
      })

    For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

      45 |     };
      46 |
    > 47 |     const module = await Test.createTestingModule({
         |                    ^
      48 |       providers: [
      49 |         PatrimonioService,
      50 |         {

      at TestingInjector.lookupComponentInParentModules (node_modules/@nestjs/core/injector/injector.js:286:19)
      at TestingInjector.resolveComponentWrapper (node_modules/@nestjs/testing/testing-injector.js:19:45)
      at resolveParam (node_modules/@nestjs/core/injector/injector.js:141:38)
          at async Promise.all (index 1)
      at TestingInjector.resolveConstructorParams (node_modules/@nestjs/core/injector/injector.js:169:27)
      at TestingInjector.loadInstance (node_modules/@nestjs/core/injector/injector.js:75:13)
      at TestingInjector.loadProvider (node_modules/@nestjs/core/injector/injector.js:103:9)
      at node_modules/@nestjs/core/injector/instance-loader.js:56:13
          at async Promise.all (index 3)
      at TestingI


      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByNumeroSerie.spec.ts:82:32)


          1348 |
          1349 |     if (!patrimonio) {
        > 1350 |       throw new NotFoundException(
               |             ^
          1351 |         `Patrimônio com número de série "${numeroSerie}" não encontrado`,
          1352 |       );
          1353 |     }

      at PatrimonioService.findByNumeroSerie (packages/patrimonio-service/src/patrimonio/patrimonio.service.ts:1350:13)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByNumeroSerie.spec.ts:98:5)
      at Object.toThrow (node_modules/expect/build/index.js:2155:20)
      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findByNumeroSerie.spec.ts:98:66)

Tests:       65 failed, 5 skipped, 448 passed, 518 total
Snapshots:   0 total
Time:        83.026 s
Ran all test suites.
Error: Process completed with exit code 1.