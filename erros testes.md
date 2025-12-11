
> patrimonio_inventario@0.0.1 pretest:e2e
> node scripts/prepare-ci.js

🚀 Preparando arquivos de imagem dummy para testes E2E...
ℹ️  Arquivo já existe: foto_para_teste.jpg
ℹ️  Arquivo já existe: foto_para_teste.png
ℹ️  Arquivo já existe: foto_para_teste.webp
🎉 Preparação de arquivos dummy concluída!
📁 Arquivos criados em: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/test-temp
ℹ️  Banco já existe: patrimonio_inventario_test
✅ Usuário padrão para testes garantido: ci-default@example.com

> patrimonio_inventario@0.0.1 test:e2e
> jest --config ./test/jest-e2e.json

[Nest] 3424  - 12/11/2025, 2:27:35 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Inventário Q1 2025 1765463254983',
    'Setor A - Sala 101',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Campanha Teste 1765463255076',
    'Local Teste',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
    length: 404,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (45a1432a-8e64-4e6c-850f-b268adcd2099, Campanha Teste 1765463255076, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.081884+00, 2025-12-11 14:27:35.081884+00).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'campaigns',
    column: 'owner_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 404,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (45a1432a-8e64-4e6c-850f-b268adcd2099, Campanha Teste 1765463255076, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.081884+00, 2025-12-11 14:27:35.081884+00).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'campaigns',
  column: 'owner_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
[Nest] 3424  - 12/11/2025, 2:27:35 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Campanha Teste Assignments 1765463255093',
    'Local Teste',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
    length: 416,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (ca4596b3-f118-4e9c-9d11-71f0642572e7, Campanha Teste Assignments 1765463255093, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.096547+00, 2025-12-11 14:27:35.096547+00).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'campaigns',
    column: 'owner_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 416,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (ca4596b3-f118-4e9c-9d11-71f0642572e7, Campanha Teste Assignments 1765463255093, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.096547+00, 2025-12-11 14:27:35.096547+00).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'campaigns',
  column: 'owner_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
[Nest] 3424  - 12/11/2025, 2:27:35 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Campanha Sync 1765463255124',
    'Local Teste',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
    length: 403,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (1175ce3e-35b9-45c1-942f-b9b5a8b0d298, Campanha Sync 1765463255124, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.127716+00, 2025-12-11 14:27:35.127716+00).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'campaigns',
    column: 'owner_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 403,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (1175ce3e-35b9-45c1-942f-b9b5a8b0d298, Campanha Sync 1765463255124, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.127716+00, 2025-12-11 14:27:35.127716+00).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'campaigns',
  column: 'owner_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
[Nest] 3424  - 12/11/2025, 2:27:35 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Campanha Reconciliação 1765463255133',
    'Local Teste',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
    length: 414,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (fbcbc580-66dd-47ba-ad3c-a1aa98f29297, Campanha Reconciliação 1765463255133, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.136404+00, 2025-12-11 14:27:35.136404+00).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'campaigns',
    column: 'owner_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 414,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (fbcbc580-66dd-47ba-ad3c-a1aa98f29297, Campanha Reconciliação 1765463255133, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.136404+00, 2025-12-11 14:27:35.136404+00).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'campaigns',
  column: 'owner_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
[Nest] 3424  - 12/11/2025, 2:27:35 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Campanha Relatório 1765463255140',
    'Local Teste',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
    length: 409,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (2615120b-9433-4d4e-88f7-b4a92dab76ba, Campanha Relatório 1765463255140, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.143523+00, 2025-12-11 14:27:35.143523+00).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'campaigns',
    column: 'owner_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 409,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (2615120b-9433-4d4e-88f7-b4a92dab76ba, Campanha Relatório 1765463255140, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.143523+00, 2025-12-11 14:27:35.143523+00).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'campaigns',
  column: 'owner_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
[Nest] 3424  - 12/11/2025, 2:27:35 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Campanha CSV 1765463255148',
    'Local Teste',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
    length: 402,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (ed7452d3-25fb-4566-96b1-c53ce0ada010, Campanha CSV 1765463255148, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.151006+00, 2025-12-11 14:27:35.151006+00).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'campaigns',
    column: 'owner_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 402,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (ed7452d3-25fb-4566-96b1-c53ce0ada010, Campanha CSV 1765463255148, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.151006+00, 2025-12-11 14:27:35.151006+00).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'campaigns',
  column: 'owner_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
[Nest] 3424  - 12/11/2025, 2:27:35 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "owner_id" of relation "campaigns" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
  query: 'INSERT INTO "campaigns"("id", "nome", "local", "periodo_inicio", "periodo_fim", "owner_id", "status", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, DEFAULT, DEFAULT) RETURNING "id", "status", "created_at", "updated_at"',
  parameters: [
    'Campanha Excel 1765463255155',
    'Local Teste',
    2025-01-20T00:00:00.000Z,
    2025-01-25T23:59:59.000Z,
    'draft'
  ],
  driverError: error: null value in column "owner_id" of relation "campaigns" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at InventoryMobileService.createCampaign (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/inventory-mobile/inventory-mobile.service.ts:55:19) {
    length: 404,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (9849569f-0566-489a-9ba2-c1154db2f13a, Campanha Excel 1765463255155, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.158623+00, 2025-12-11 14:27:35.158623+00).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'campaigns',
    column: 'owner_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 404,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (9849569f-0566-489a-9ba2-c1154db2f13a, Campanha Excel 1765463255155, Local Teste, 2025-01-20 00:00:00+00, 2025-01-25 23:59:59+00, null, draft, 2025-12-11 14:27:35.158623+00, 2025-12-11 14:27:35.158623+00).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'campaigns',
  column: 'owner_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
FAIL test/inventory-mobile/inventory-mobile.e2e-spec.ts (33.031 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 📡 add observability to secrets: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 45583, USERS_API_URL: http://localhost:45583/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

  ● Inventory Mobile (e2e) › POST /v1/inventory/campaigns › deve criar uma campanha com sucesso (201)

    expected 201 "Created", got 500 "Internal Server Error"

      85 |       )
      86 |         .send(dto)
    > 87 |         .expect(201);
         |          ^
      88 |
      89 |       expect(response.body).toHaveProperty('id');
      90 |       expect(response.body.nome).toBe(dto.nome);

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:87:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/assignments › deve listar assignments de uma campanha (200)

    expected 201 "Created", got 500 "Internal Server Error"

      110 |           periodoFim: '2025-01-25T23:59:59Z',
      111 |         })
    > 112 |         .expect(201);
          |          ^
      113 |       const campaignId = createResponse.body.id;
      114 |
      115 |       const response = await authenticatedRequest(

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:112:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Inventory Mobile (e2e) › POST /v1/inventory/campaigns/:id/assignments › deve distribuir assignments com sucesso (201)

    expected 201 "Created", got 500 "Internal Server Error"

      153 |           periodoFim: '2025-01-25T23:59:59Z',
      154 |         })
    > 155 |         .expect(201);
          |          ^
      156 |       const campaignId = createResponse.body.id;
      157 |
      158 |       // Limpar assignments anteriores desta campanha (se houver)

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:155:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Inventory Mobile (e2e) › POST /v1/inventory/sync/push › deve processar itens coletados com sucesso (200)

    expected 201 "Created", got 500 "Internal Server Error"

      255 |           periodoFim: '2025-01-25T23:59:59Z',
      256 |         })
    > 257 |         .expect(201);
          |          ^
      258 |       const campaignId = createResponse.body.id;
      259 |
      260 |       // Limpar assignments anteriores desta campanha (se houver)

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:257:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Inventory Mobile (e2e) › POST /v1/inventory/reconcile › deve iniciar conciliação com sucesso (202)

    expected 201 "Created", got 500 "Internal Server Error"

      332 |           periodoFim: '2025-01-25T23:59:59Z',
      333 |         })
    > 334 |         .expect(201);
          |          ^
      335 |       const campaignId = createResponse.body.id;
      336 |
      337 |       // Limpar assignments anteriores desta campanha (se houver)

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:334:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/report › deve gerar relatório de campanha (200)

    expected 201 "Created", got 500 "Internal Server Error"

      389 |           periodoFim: '2025-01-25T23:59:59Z',
      390 |         })
    > 391 |         .expect(201);
          |          ^
      392 |       const campaignId = createResponse.body.id;
      393 |
      394 |       const response = await authenticatedRequest(

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:391:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/export/csv › deve exportar divergências para CSV (200)

    expected 201 "Created", got 500 "Internal Server Error"

      425 |           periodoFim: '2025-01-25T23:59:59Z',
      426 |         })
    > 427 |         .expect(201);
          |          ^
      428 |       const campaignId = createResponse.body.id;
      429 |
      430 |       const response = await authenticatedRequest(

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:427:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Inventory Mobile (e2e) › GET /v1/inventory/campaigns/:id/export/excel › deve exportar relatório para Excel (200)

    expected 201 "Created", got 500 "Internal Server Error"

      457 |           periodoFim: '2025-01-25T23:59:59Z',
      458 |         })
    > 459 |         .expect(201);
          |          ^
      460 |       const campaignId = createResponse.body.id;
      461 |
      462 |       const response = await authenticatedRequest(

      at Object.<anonymous> (inventory-mobile/inventory-mobile.e2e-spec.ts:459:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

FAIL test/users/users.e2e-spec.ts (36.299 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 46629, USERS_API_URL: http://localhost:46629/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

  ● Users (e2e) › POST /v1/users › deve retornar 403 para MANAGER (sem permissão)

    expected 403 "Forbidden", got 400 "Bad Request"

      268 |       )
      269 |         .send({ name: 'Test', email: `test-${Date.now()}@example.com`, password: 'Password123!' })
    > 270 |         .expect(403);
          |          ^
      271 |     });
      272 |   });
      273 |

      at Object.<anonymous> (users/users.e2e-spec.ts:270:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Users (e2e) › GET /v1/users/:id › deve buscar usuário por ID (200)

    expected 200 "OK", got 401 "Unauthorized"

      280 |         tokens,
      281 |         UserRole.ADMIN,
    > 282 |       ).expect(200);
          |         ^
      283 |
      284 |       expect(response.body).toHaveProperty('id', tokens.adminUserId);
      285 |       expect(response.body).toHaveProperty('email', tokens.adminEmail);

      at Object.<anonymous> (users/users.e2e-spec.ts:282:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Users (e2e) › GET /v1/users/:id › deve retornar 404 para usuário não encontrado

    expected 404 "Not Found", got 401 "Unauthorized"

      295 |         tokens,
      296 |         UserRole.ADMIN,
    > 297 |       ).expect(404);
          |         ^
      298 |     });
      299 |
      300 |     it('deve retornar 400 para UUID inválido', async () => {

      at Object.<anonymous> (users/users.e2e-spec.ts:297:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Users (e2e) › DELETE /v1/users/:id › deve retornar 403 para MANAGER (sem permissão)

    expected 403 "Forbidden", got 404 "Not Found"

      419 |         tokens,
      420 |         UserRole.MANAGER,
    > 421 |       ).expect(403);
          |         ^
      422 |     });
      423 |   });
      424 |

      at Object.<anonymous> (users/users.e2e-spec.ts:421:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Users (e2e) › POST /v1/users/bulk › deve retornar 403 para MANAGER (sem permissão)

    expected 403 "Forbidden", got 409 "Conflict"

      582 |       )
      583 |         .send([])
    > 584 |         .expect(403);
          |          ^
      585 |     });
      586 |   });
      587 |

      at Object.<anonymous> (users/users.e2e-spec.ts:584:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

PASS test/notifications/notifications.e2e-spec.ts (12.744 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 36037, USERS_API_URL: http://localhost:36037/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/integrations-erp/integrations-erp.e2e-spec.ts (13.52 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 40935, USERS_API_URL: http://localhost:40935/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:99e98bc6-59d5-40cb-a49a-3b191e4b7390"],"entity":"assets","executionId":"99e98bc6-59d5-40cb-a49a-3b191e4b7390","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:27:51.527Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:7d19a2c1-5b8b-4eee-b517-77c01f278541"],"entity":"assets","executionId":"7d19a2c1-5b8b-4eee-b517-77c01f278541","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:27:51.554Z","type":"export"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:d7cd78ac-e787-46ad-9a84-41c3f1cfadd7"],"entity":"costCenters","executionId":"d7cd78ac-e787-46ad-9a84-41c3f1cfadd7","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:27:51.566Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:2a1cb312-4468-4f62-ad19-6963a3370087"],"entity":"locations","executionId":"2a1cb312-4468-4f62-ad19-6963a3370087","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:27:51.581Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:b6a1f441-1d6c-4ad6-8231-807634463ab9"],"entity":"depreciations","executionId":"b6a1f441-1d6c-4ad6-8231-807634463ab9","service":"patrimonio-inventario-api","timestamp":"2025-12-11T14:27:51.592Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

[Nest] 3424  - 12/11/2025, 2:28:00 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at ReportCatalogService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/reports/services/report-catalog.service.ts:51:19) {
  query: 'INSERT INTO "report_catalogs"("id", "key", "name", "description", "type", "model", "default_filters", "current_version", "active", "requires_permission", "created_by_id", "updated_by_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "current_version", "active", "requires_permission", "created_at", "updated_at"',
  parameters: [
    'test-catalog-1765463280631',
    'Test Catalog 1',
    'Test catalog description',
    'pdf',
    'patrimonio',
    '{"status":"ATIVO"}',
    '1.0.0',
    true,
    false
  ],
  driverError: error: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at ReportCatalogService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/reports/services/report-catalog.service.ts:51:19) {
    length: 449,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (85e7a04b-561b-4c98-aef4-07c7fb999929, test-catalog-1765463280631, Test Catalog 1, Test catalog description, pdf, patrimonio, {"status": "ATIVO"}, 1.0.0, t, f, null, null, 2025-12-11 14:28:00.644909, 2025-12-11 14:28:00.644909).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'report_catalogs',
    column: 'created_by_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 449,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (85e7a04b-561b-4c98-aef4-07c7fb999929, test-catalog-1765463280631, Test Catalog 1, Test catalog description, pdf, patrimonio, {"status": "ATIVO"}, 1.0.0, t, f, null, null, 2025-12-11 14:28:00.644909, 2025-12-11 14:28:00.644909).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'report_catalogs',
  column: 'created_by_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
[Nest] 3424  - 12/11/2025, 2:28:00 PM   ERROR [ExceptionsHandler] QueryFailedError: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
    at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:325:19)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
    at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
    at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
    at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
    at ReportCatalogService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/reports/services/report-catalog.service.ts:51:19) {
  query: 'INSERT INTO "report_catalogs"("id", "key", "name", "description", "type", "model", "default_filters", "current_version", "active", "requires_permission", "created_by_id", "updated_by_id", "created_at", "updated_at") VALUES (DEFAULT, $1, $2, DEFAULT, $3, $4, DEFAULT, $5, $6, $7, DEFAULT, DEFAULT, DEFAULT, DEFAULT) RETURNING "id", "current_version", "active", "requires_permission", "created_at", "updated_at"',
  parameters: [
    'test-catalog-2-1765463280724',
    'Test Catalog 2',
    'csv',
    'manutencao',
    '1.0.0',
    true,
    false
  ],
  driverError: error: null value in column "created_by_id" of relation "report_catalogs" violates not-null constraint
      at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/pg/lib/client.js:545:17
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at PostgresQueryRunner.query (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/driver/postgres/PostgresQueryRunner.ts:254:25)
      at InsertQueryBuilder.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/InsertQueryBuilder.ts:164:33)
      at SubjectExecutor.executeInsertOperations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:435:42)
      at SubjectExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/SubjectExecutor.ts:137:9)
      at EntityPersistExecutor.execute (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/persistence/EntityPersistExecutor.ts:182:21)
      at ReportCatalogService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/reports/services/report-catalog.service.ts:51:19) {
    length: 416,
    severity: 'ERROR',
    code: '23502',
    detail: 'Failing row contains (03bda98c-a48c-47fb-9bcf-3be4993f24c2, test-catalog-2-1765463280724, Test Catalog 2, null, csv, manutencao, null, 1.0.0, t, f, null, null, 2025-12-11 14:28:00.730473, 2025-12-11 14:28:00.730473).',
    hint: undefined,
    position: undefined,
    internalPosition: undefined,
    internalQuery: undefined,
    where: undefined,
    schema: 'public',
    table: 'report_catalogs',
    column: 'created_by_id',
    dataType: undefined,
    constraint: undefined,
    file: 'execMain.c',
    line: '2023',
    routine: 'ExecConstraints'
  },
  length: 416,
  severity: 'ERROR',
  code: '23502',
  detail: 'Failing row contains (03bda98c-a48c-47fb-9bcf-3be4993f24c2, test-catalog-2-1765463280724, Test Catalog 2, null, csv, manutencao, null, 1.0.0, t, f, null, null, 2025-12-11 14:28:00.730473, 2025-12-11 14:28:00.730473).',
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: 'public',
  table: 'report_catalogs',
  column: 'created_by_id',
  dataType: undefined,
  constraint: undefined,
  file: 'execMain.c',
  line: '2023',
  routine: 'ExecConstraints'
}
FAIL test/reports-catalog/reports-catalog.e2e-spec.ts (12.923 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 45469, USERS_API_URL: http://localhost:45469/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.warn
      ⚠️ catalogId1 não definido, pulando teste

      344 |       // Garantir que catalogId1 existe
      345 |       if (!catalogId1) {
    > 346 |         console.warn('⚠️ catalogId1 não definido, pulando teste');
          |                 ^
      347 |         return;
      348 |       }
      349 |

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:346:17)

    console.warn
      ⚠️ catalogId2 não definido, pulando teste

      388 |       // Garantir que catalogId2 existe (foi criado no segundo teste de POST /catalog)
      389 |       if (!catalogId2) {
    > 390 |         console.warn('⚠️ catalogId2 não definido, pulando teste');
          |                 ^
      391 |         return;
      392 |       }
      393 |

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:390:17)

    console.warn
      ⚠️ permissionId1 não definido, pulando teste de delete

      449 |       // Garantir que permissionId1 foi definido
      450 |       if (!permissionId1) {
    > 451 |         console.warn('⚠️ permissionId1 não definido, pulando teste de delete');
          |                 ^
      452 |         return;
      453 |       }
      454 |

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:451:17)

  ● Reports Catalog (e2e) › POST /v1/reports/catalog › deve criar catálogo de relatório com sucesso (201) - ADMIN

    expected 201 "Created", got 500 "Internal Server Error"

      138 |       )
      139 |         .send(createCatalogDto)
    > 140 |         .expect(201);
          |          ^
      141 |
      142 |       expect(response.body).toHaveProperty('id');
      143 |       expect(response.body).toHaveProperty('key', createCatalogDto.key);

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:140:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › POST /v1/reports/catalog › deve criar segundo catálogo com sucesso (201) - ADMIN

    expected 201 "Created", got 500 "Internal Server Error"

      168 |       )
      169 |         .send(createCatalogDto)
    > 170 |         .expect(201);
          |          ^
      171 |
      172 |       expect(response.body).toHaveProperty('id');
      173 |       catalogId2 = response.body.id;

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:170:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/:id › deve buscar catálogo por ID com sucesso (200) - ADMIN

    expected 200 "OK", got 400 "Bad Request"

      229 |         tokens,
      230 |         UserRole.ADMIN,
    > 231 |       ).expect(200);
          |         ^
      232 |
      233 |       expect(response.body).toHaveProperty('id', catalogId1);
      234 |       expect(response.body).toHaveProperty('key');

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:231:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/:id › deve buscar catálogo por ID com sucesso (200) - MANAGER

    expected 200 "OK", got 400 "Bad Request"

      243 |         tokens,
      244 |         UserRole.MANAGER,
    > 245 |       ).expect(200);
          |         ^
      246 |
      247 |       expect(response.body).toHaveProperty('id', catalogId1);
      248 |     });

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:245:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/key/:key › deve buscar catálogo por chave com sucesso (200) - ADMIN

    expected 200 "OK", got 404 "Not Found"

      257 |         tokens,
      258 |         UserRole.ADMIN,
    > 259 |       ).expect(200);
          |         ^
      260 |
      261 |       expect(response.body).toHaveProperty('key', catalogKey1);
      262 |       expect(response.body).toHaveProperty('id');

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:259:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/key/:key › deve buscar catálogo por chave com sucesso (200) - MANAGER

    expected 200 "OK", got 404 "Not Found"

      270 |         tokens,
      271 |         UserRole.MANAGER,
    > 272 |       ).expect(200);
          |         ^
      273 |
      274 |       expect(response.body).toHaveProperty('key', catalogKey1);
      275 |     });

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:272:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › PUT /v1/reports/catalog/:id › deve atualizar catálogo com sucesso (200) - ADMIN

    expected 200 "OK", got 400 "Bad Request"

      292 |       )
      293 |         .send(updateCatalogDto)
    > 294 |         .expect(200);
          |          ^
      295 |
      296 |       expect(response.body).toHaveProperty('id', catalogId1);
      297 |       expect(response.body).toHaveProperty('name', updateCatalogDto.name);

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:294:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › POST /v1/reports/catalog/:id/versions › deve criar versão de catálogo com sucesso (201) - ADMIN

    expected 201 "Created", got 400 "Bad Request"

      318 |       )
      319 |         .send(createVersionDto)
    > 320 |         .expect(201);
          |          ^
      321 |
      322 |       expect(response.body).toHaveProperty('id');
      323 |       expect(response.body).toHaveProperty('version', createVersionDto.version);

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:320:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › PUT /v1/reports/catalog/:id/versions/:version/current › deve definir versão como atual com sucesso (200) - ADMIN

    expected 200 "OK", got 400 "Bad Request"

      336 |         tokens,
      337 |         UserRole.ADMIN, // PUT /catalog/:id/versions/:version/current requer apenas ADMIN
    > 338 |       ).expect(200);
          |         ^
      339 |     });
      340 |   });
      341 |

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:338:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › GET /v1/reports/catalog/permissions/catalog/:catalogId › deve listar permissões do catálogo com sucesso (200) - ADMIN

    expected 200 "OK", got 400 "Bad Request"

      424 |         tokens,
      425 |         UserRole.ADMIN, // GET /catalog/permissions/catalog/:catalogId requer apenas ADMIN
    > 426 |       ).expect(200);
          |         ^
      427 |
      428 |       expect(Array.isArray(response.body)).toBe(true);
      429 |       expect(response.body.length).toBeGreaterThanOrEqual(0);

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:426:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Reports Catalog (e2e) › DELETE /v1/reports/catalog/:id › deve deletar catálogo com sucesso (204) - ADMIN

    expected 204 "No Content", got 400 "Bad Request"

      471 |         tokens,
      472 |         UserRole.ADMIN, // DELETE /catalog/:id requer apenas ADMIN
    > 473 |       ).expect(204);
          |         ^
      474 |     });
      475 |   });
      476 | });

      at Object.<anonymous> (reports-catalog/reports-catalog.e2e-spec.ts:473:9)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

PASS test/categorias/categorias.e2e-spec.ts (13.773 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 42493, USERS_API_URL: http://localhost:42493/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/reports-metrics/reports-metrics.e2e-spec.ts (12.911 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 38593, USERS_API_URL: http://localhost:38593/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/audit/audit.e2e-spec.ts (13.555 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 32941, USERS_API_URL: http://localhost:32941/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/enums/enums.e2e-spec.ts
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

PASS test/metrics/metrics.e2e-spec.ts
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild

      at _log (../node_modules/dotenv/lib/main.js:142:11)

PASS test/cache/cache.e2e-spec.ts (13.6 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 38201, USERS_API_URL: http://localhost:38201/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/app.e2e-spec.ts
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

FAIL test/auth/auth.e2e-spec.ts (202.858 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 38249, USERS_API_URL: http://localhost:38249/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

  ● Auth (e2e) › POST /v1/auth/login › deve retornar 401 para credenciais inválidas (email incorreto)

    expect(received).toContain(expected) // indexOf

    Expected value: 201
    Received array: [401, 429]

      128 |       
      129 |       // Aceitar 401 (credenciais inválidas) ou 429 (rate limiting)
    > 130 |       expect([401, 429]).toContain(response.status);
          |                          ^
      131 |     });
      132 |
      133 |     it('deve retornar 401 para credenciais inválidas (senha incorreta)', async () => {

      at Object.<anonymous> (auth/auth.e2e-spec.ts:130:26)

  ● Auth (e2e) › POST /v1/auth/login › deve retornar 401 para usuário inativo

    expected 401 "Unauthorized", got 201 "Created"

      231 |         .post('/v1/auth/login')
      232 |         .send(dto)
    > 233 |         .expect(401);
          |          ^
      234 |     });
      235 |   });
      236 |

      at Object.<anonymous> (auth/auth.e2e-spec.ts:233:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:892:12)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Auth (e2e) › GET /v1/auth/me › deve retornar informações do usuário autenticado (200)

    expected 200 "OK", got 401 "Unauthorized"

      261 |         .get('/v1/auth/me')
      262 |         .set('Authorization', `***
    > 263 |         .expect(200);
          |          ^
      264 |
      265 |       expect(response.body).toHaveProperty('id');
      266 |       expect(response.body).toHaveProperty('email', testUserEmail);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:263:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Auth (e2e) › POST /v1/auth/refresh › deve renovar tokens com refresh token válido (200)

    expect(received).toHaveProperty(path, value)

    Expected path: "email"

    Expected value: "auth-admin@example.com"
    Received value: "user-123e4567-e89b-12d3-a456-426614174000@example.com"

      355 |       expect(response.body).toHaveProperty('user');
      356 |       expect(response.body.user).toHaveProperty('id');
    > 357 |       expect(response.body.user).toHaveProperty('email', testUserEmail);
          |                                  ^
      358 |       expect(typeof response.body.accessToken).toBe('string');
      359 |       expect(response.body.accessToken.length).toBeGreaterThan(0);
      360 |       expect(typeof response.body.refreshToken).toBe('string');

      at Object.<anonymous> (auth/auth.e2e-spec.ts:357:34)

  ● Auth (e2e) › POST /v1/auth/logout › deve revogar refresh token após logout

    Expected 200 or 201, got 429

      517 |           password: testUserPassword,
      518 |         })
    > 519 |         .expect((res) => {
          |          ^
      520 |           // Login pode retornar 200 ou 201
      521 |           if (res.status !== 200 && res.status !== 201) {
      522 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:519:10)
      ----
      at auth/auth.e2e-spec.ts:522:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Auth (e2e) › POST /v1/auth/logout › deve permitir logout múltiplo (idempotente)

    Expected 200 or 201, got 429

      557 |           password: testUserPassword,
      558 |         })
    > 559 |         .expect((res) => {
          |          ^
      560 |           // Login pode retornar 200 ou 201
      561 |           if (res.status !== 200 && res.status !== 201) {
      562 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:559:10)
      ----
      at auth/auth.e2e-spec.ts:562:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Auth (e2e) › Fluxo completo de autenticação › deve permitir login -> me -> refresh -> logout

    Expected 200 or 201, got 429

      606 |           password: testUserPassword,
      607 |         })
    > 608 |         .expect((res) => {
          |          ^
      609 |           // Login pode retornar 200 ou 201
      610 |           if (res.status !== 200 && res.status !== 201) {
      611 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:608:10)
      ----
      at auth/auth.e2e-spec.ts:611:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

Test Suites: 4 failed, 9 passed, 13 total
Tests:       31 failed, 173 passed, 204 total
Snapshots:   0 total
Time:        203.588 s
Ran all test suites.
Error: Process completed with exit code 1.