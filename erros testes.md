
Run npm run test
  npm run test
  shell: /usr/bin/bash -e {0}

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
    -   "relations": Array [
    -     "categoria",
    -   ],
        "where": Object {
          "id": "f8cae4f3-2508-4424-a846-07ebb4b9a8f5",
        },
      },

    Number of calls: 1

      81 |     const result = await service.findOne(patrimonioId);
      82 |
    > 83 |     expect(repository.findOne).toHaveBeenCalledWith({
         |                                ^
      84 |       where: { id: patrimonioId },
      85 |       relations: ['categoria'],
      86 |     });

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findOne.spec.ts:83:32)

  ● PatrimonioService.findOne (unit) › should throw NotFoundException when patrimonio not found

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    - Expected
    + Received

      Object {
    -   "relations": Array [
    -     "categoria",
    -   ],
        "where": Object {
          "id": "bd9c9a1c-2691-45f3-ba9e-38ccde439d3e",
        },
      },

    Number of calls: 1

      100 |       NotFoundException,
      101 |     );
    > 102 |     expect(repository.findOne).toHaveBeenCalledWith({
          |                                ^
      103 |       where: { id: patrimonioId },
      104 |       relations: ['categoria'],
      105 |     });

      at Object.<anonymous> (test/patrimonio/services/patrimonio.service.findOne.spec.ts:102:32)


Test Suites: 19 failed, 110 passed, 129 total
Tests:       65 failed, 5 skipped, 448 passed, 518 total
Snapshots:   0 total
Time:        83.026 s
Ran all test suites.
Error: Process completed with exit code 1.