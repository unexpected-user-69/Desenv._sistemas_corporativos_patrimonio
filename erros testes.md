Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER

    expected 201 "Created", got 500 "Internal Server Error"

      171 |       )
      172 |         .send(createEventDto)
    > 173 |         .expect(201);
          |          ^
      174 |
      175 |       expect(response.body).toHaveProperty('id');
      176 |       expect(response.body).toHaveProperty('title', createEventDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:173:10)
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

  ● Events (e2e) › GET /v1/events › deve listar eventos com paginação (200)

    expected 200 "OK", got 500 "Internal Server Error"

      191 |       )
      192 |         .query({ page: 1, limit: 20 })
    > 193 |         .expect(200);
          |          ^
      194 |
      195 |       expect(response.body).toHaveProperty('data');
      196 |       expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (events/events.e2e-spec.ts:193:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

FAIL patrimonio/patrimonio-completo.e2e-spec.ts (33.961 s)
  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › POST /v1/patrimonio - Criar patrimônio › deve criar patrimônio com sucesso (ADMIN)

    expect(received).toHaveProperty(path)

    Expected path: "id"
    Received path: []

    Received value: {"error": "Not Found", "message": "Cannot POST /v1/patrimonio", "statusCode": 404}

      187 |           });
      188 |
    > 189 |         expect(response.body).toHaveProperty('id');
          |                               ^
      190 |         expect(response.body.codigo).toBe(createDto.codigo.toUpperCase());
      191 |         expect(response.body.nome).toBe(createDto.nome);
      192 |         patrimonio1Id = response.body.id;

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:189:31)

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › POST /v1/patrimonio - Criar patrimônio › deve criar patrimônio com sucesso (MANAGER)

    expect(received).toHaveProperty(path)

    Expected path: "id"
    Received path: []

    Received value: {"error": "Not Found", "message": "Cannot POST /v1/patrimonio", "statusCode": 404}

      222 |           });
      223 |
    > 224 |         expect(response.body).toHaveProperty('id');
          |                               ^
      225 |         patrimonio2Id = response.body.id;
      226 |         patrimonio2Codigo = response.body.codigo;
      227 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:224:31)

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve listar patrimônios com paginação

    expected 200 "OK", got 404 "Not Found"

      233 |           .get('/v1/patrimonio')
      234 |           .query({ page: 1, limit: 10 })
    > 235 |           .expect(200);
          |            ^
      236 |
      237 |         expect(response.body).toHaveProperty('data');
      238 |         expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:235:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve filtrar por status

    expected 200 "OK", got 404 "Not Found"

      246 |           .get('/v1/patrimonio')
      247 |           .query({ status: PatrimonioStatus.ATIVO })
    > 248 |           .expect(200);
          |            ^
      249 |
      250 |         expect(response.body).toHaveProperty('data');
      251 |         if (response.body.data.length > 0) {

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:248:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve filtrar por categoria

    expected 200 "OK", got 404 "Not Found"

      260 |           .get('/v1/patrimonio')
      261 |           .query({ categoriaId: categoriaId })
    > 262 |           .expect(200);
          |            ^
      263 |
      264 |         expect(response.body).toHaveProperty('data');
      265 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:262:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve buscar por texto (q)

    expected 200 "OK", got 404 "Not Found"

      271 |           .get('/v1/patrimonio')
      272 |           .query({ q: 'Notebook' })
    > 273 |           .expect(200);
          |            ^
      274 |
      275 |         expect(response.body).toHaveProperty('data');
      276 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:273:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve filtrar por intervalo de valor

    expected 200 "OK", got 404 "Not Found"

      282 |           .get('/v1/patrimonio')
      283 |           .query({ valorMinimo: 1000, valorMaximo: 3000 })
    > 284 |           .expect(200);
          |            ^
      285 |
      286 |         expect(response.body).toHaveProperty('data');
      287 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:284:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve ordenar por campo

    expected 200 "OK", got 404 "Not Found"

      293 |           .get('/v1/patrimonio')
      294 |           .query({ sortBy: 'nome', sortOrder: 'ASC' })
    > 295 |           .expect(200);
          |            ^
      296 |
      297 |         expect(response.body).toHaveProperty('data');
      298 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:295:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio/:id - Buscar por ID › deve buscar patrimônio por ID

    expected 200 "OK", got 404 "Not Found"

      305 |         const response = await request(httpServer)
      306 |           .get(`/v1/patrimonio/${patrimonio1Id}`)
    > 307 |           .expect(200);
          |            ^
      308 |
      309 |         expect(response.body.id).toBe(patrimonio1Id);
      310 |         expect(response.body).toHaveProperty('codigo');

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:307:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › PATCH /v1/patrimonio/:id - Atualizar patrimônio › deve atualizar patrimônio com sucesso (ADMIN)

    expect(received).toBe(expected) // Object.is equality

    Expected: "Notebook Dell Inspiron 15 - Atualizado"
    Received: undefined

      338 |           });
      339 |
    > 340 |         expect(response.body.nome).toBe(updateDto.nome);
          |                                    ^
      341 |         expect(response.body.descricao).toBe(updateDto.descricao);
      342 |       });
      343 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:340:36)

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › PATCH /v1/patrimonio/:id - Atualizar patrimônio › deve atualizar patrimônio com sucesso (MANAGER)

    expect(received).toBe(expected) // Object.is equality

    Expected: "Projetor Epson - Atualizado"
    Received: undefined

      363 |           });
      364 |
    > 365 |         expect(response.body.nome).toBe(updateDto.nome);
          |                                    ^
      366 |       });
      367 |     });
      368 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:365:36)

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › DELETE /v1/patrimonio/:id - Deletar patrimônio › deve deletar patrimônio com sucesso (ADMIN)

    Expected 200 or 204, got 404

      398 |           tokens,
      399 |           UserRole.ADMIN, // DELETE /patrimonio/:id requer apenas ADMIN
    > 400 |         ).expect((res) => {
          |           ^
      401 |           if (res.status !== 200 && res.status !== 204) {
      402 |             throw new Error(`Expected 200 or 204, got ${res.status}`);
      403 |           }

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:400:11)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:402:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/codigo/:codigo › deve buscar patrimônio por código

    expected 200 "OK", got 404 "Not Found"

      414 |         const response = await request(httpServer)
      415 |           .get(`/v1/patrimonio/codigo/${patrimonio1Codigo}`)
    > 416 |           .expect(200);
          |            ^
      417 |
      418 |         expect(response.body.codigo).toBe(patrimonio1Codigo);
      419 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:416:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/categoria/:categoriaId › deve buscar patrimônios por categoria

    expected 200 "OK", got 404 "Not Found"

      427 |         const response = await request(httpServer)
      428 |           .get(`/v1/patrimonio/categoria/${categoriaId}`)
    > 429 |           .expect(200);
          |            ^
      430 |
      431 |         expect(Array.isArray(response.body)).toBe(true);
      432 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:429:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/status/:status › deve buscar patrimônios por status

    expected 200 "OK", got 404 "Not Found"

      439 |         const response = await request(httpServer)
      440 |           .get(`/v1/patrimonio/status/${PatrimonioStatus.ATIVO}`)
    > 441 |           .expect(200);
          |            ^
      442 |
      443 |         expect(Array.isArray(response.body)).toBe(true);
      444 |         if (response.body.length > 0) {

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:441:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/responsavel/:responsavelId › deve buscar patrimônios por responsável

    expected 200 "OK", got 404 "Not Found"

      454 |         const response = await request(httpServer)
      455 |           .get(`/v1/patrimonio/responsavel/${tokens.adminUserId}`)
    > 456 |           .expect(200);
          |            ^
      457 |
      458 |         expect(Array.isArray(response.body)).toBe(true);
      459 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:456:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/localizacao/:localizacao › deve buscar patrimônios por localização (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      470 |           tokens,
      471 |           UserRole.ADMIN, // GET /patrimonio/localizacao/:localizacao requer autenticação
    > 472 |         ).expect(200);
          |           ^
      473 |
      474 |         expect(Array.isArray(response.body)).toBe(true);
      475 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:472:11)
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

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/numero-serie/:numeroSerie › deve buscar patrimônio por número de série (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      501 |           tokens,
      502 |           UserRole.ADMIN, // GET /patrimonio/numero-serie/:numeroSerie requer autenticação
    > 503 |         ).expect(200);
          |           ^
      504 |
      505 |         expect(response.body.numeroSerie).toBe(numeroSerie);
      506 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:503:11)
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

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/aquisicao-periodo › deve buscar patrimônios por período de aquisição

    Expected 200 or 400, got 404

      528 |             dataFinal: dataFinal,
      529 |           })
    > 530 |           .expect((res) => {
          |            ^
      531 |             // Aceitar 200 (sucesso) ou 400 (validação de data falhou)
      532 |             if (res.status !== 200 && res.status !== 400) {
      533 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:530:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:533:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/valor-range › deve buscar patrimônios por intervalo de valor (ADMIN)

    Expected 200 or 400, got 404

      556 |             valorMaximo: 100000,
      557 |           })
    > 558 |           .expect((res) => {
          |            ^
      559 |             // Aceitar 200 ou 400 (se validação falhar)
      560 |             if (res.status !== 200 && res.status !== 400) {
      561 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:558:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:561:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 3: Estatísticas Básicas › GET /v1/patrimonio/stats/categoria › deve retornar estatísticas por categoria

    expected 200 "OK", got 404 "Not Found"

      577 |         const response = await request(httpServer)
      578 |           .get('/v1/patrimonio/stats/categoria')
    > 579 |           .expect(200);
          |            ^
      580 |
      581 |         expect(typeof response.body).toBe('object');
      582 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:579:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 3: Estatísticas Básicas › GET /v1/patrimonio/stats/status › deve retornar estatísticas por status

    expected 200 "OK", got 404 "Not Found"

      589 |         const response = await request(httpServer)
      590 |           .get('/v1/patrimonio/stats/status')
    > 591 |           .expect(200);
          |            ^
      592 |
      593 |         expect(typeof response.body).toBe('object');
      594 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:591:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 3: Estatísticas Básicas › GET /v1/patrimonio/stats/valor-total › deve retornar valor total do patrimônio

    expected 200 "OK", got 404 "Not Found"

      601 |         const response = await request(httpServer)
      602 |           .get('/v1/patrimonio/stats/valor-total')
    > 603 |           .expect(200);
          |            ^
      604 |
      605 |         expect(response.body).toHaveProperty('valorTotal');
      606 |         expect(typeof response.body.valorTotal).toBe('number');

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:603:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio (ADMIN)

    expect(received).toBe(expected) // Object.is equality

    Expected: "MANUTENCAO"
    Received: undefined

      635 |           });
      636 |
    > 637 |         expect(response.body.status).toBe(PatrimonioStatus.MANUTENCAO);
          |                                      ^
      638 |       });
      639 |
      640 |       it('deve alterar status do patrimônio (MANAGER)', async () => {

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:637:38)

  ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio (MANAGER)

    expect(received).toBe(expected) // Object.is equality

    Expected: "ATIVO"
    Received: undefined

      658 |           });
      659 |
    > 660 |         expect(response.body.status).toBe(PatrimonioStatus.ATIVO);
          |                                      ^
      661 |       });
      662 |     });
      663 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:660:38)

  ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve ativar patrimônio (ADMIN)

    Expected 200 or 201, got 404

      686 |           tokens,
      687 |           UserRole.ADMIN, // PATCH /patrimonio/:id/ativar requer ADMIN ou MANAGER
    > 688 |         ).expect((res) => {
          |           ^
      689 |           if (res.status !== 200 && res.status !== 201) {
      690 |             throw new Error(`Expected 200 or 201, got ${res.status}`);
      691 |           }

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:688:11)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:690:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve desativar patrimônio (ADMIN)

    expected 201 "Created", got 404 "Not Found"

      715 |         )
      716 |           .send(createDto)
    > 717 |           .expect(201);
          |            ^
      718 |
      719 |         const tempPatrimonioId = createResponse.body.id;
      720 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:717:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › POST /v1/patrimonio/:id/descarte › deve marcar patrimônio para descarte (ADMIN)

    expected 201 "Created", got 404 "Not Found"

      754 |         )
      755 |           .send(createDto)
    > 756 |           .expect(201);
          |            ^
      757 |
      758 |         const tempPatrimonioId = createResponse.body.id;
      759 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:756:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 5: Gestão de Localização › GET /v1/patrimonio/stats/localizacoes › deve retornar estatísticas por localização (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      853 |           tokens,
      854 |           UserRole.ADMIN, // GET /patrimonio/stats/localizacoes requer autenticação
    > 855 |         ).expect(200);
          |           ^
      856 |
      857 |         expect(response.body).toHaveProperty('localizacoes');
      858 |         expect(Array.isArray(response.body.localizacoes)).toBe(true);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:855:11)
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

  ● Patrimonio - Completo (e2e) › GRUPO 6: Estatísticas Avançadas › GET /v1/patrimonio/stats/faixa-valor › deve retornar estatísticas por faixa de valor (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      874 |         )
      875 |           .query({ intervalo: 1000 })
    > 876 |           .expect(200);
          |            ^
      877 |
      878 |         expect(response.body).toHaveProperty('faixas');
      879 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:876:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 6: Estatísticas Avançadas › GET /v1/patrimonio/stats/aquisicao › deve retornar estatísticas por período de aquisição (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      890 |         )
      891 |           .query({ periodo: 'mensal' })
    > 892 |           .expect(200);
          |            ^
      893 |
      894 |         expect(response.body).toHaveProperty('periodos');
      895 |         expect(response.body).toHaveProperty('tipoPeriodo');

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:892:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 6: Estatísticas Avançadas › GET /v1/patrimonio/stats/evolucao › deve retornar gráfico de evolução temporal (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      907 |         )
      908 |           .query({ periodo: 'mensal', ano: 2024 })
    > 909 |           .expect(200);
          |            ^
      910 |
      911 |         expect(response.body).toHaveProperty('evolucao');
      912 |         expect(response.body).toHaveProperty('tipoPeriodo');

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:909:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 6: Estatísticas Avançadas › GET /v1/patrimonio/dashboard › deve retornar métricas do dashboard (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      923 |           tokens,
      924 |           UserRole.ADMIN, // GET /patrimonio/dashboard requer autenticação
    > 925 |         ).expect(200);
          |           ^
      926 |
      927 |         expect(response.body).toHaveProperty('total');
      928 |         expect(response.body).toHaveProperty('valorTotal');

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:925:11)
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

  ● Patrimonio - Completo (e2e) › GRUPO 7: Exportação e Relatórios › GET /v1/patrimonio/export/csv › deve exportar patrimônios para CSV

    Expected 200 or 500, got 404

      947 |         )
      948 |           .query({ limit: 10 })
    > 949 |           .expect((res) => {
          |            ^
      950 |             // Aceitar 200 ou 500 (erro quando não há dados suficientes)
      951 |             if (res.status !== 200 && res.status !== 500) {
      952 |               throw new Error(`Expected 200 or 500, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:949:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:952:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 7: Exportação e Relatórios › GET /v1/patrimonio/export/excel › deve exportar patrimônios para Excel

    expected 200 "OK", got 404 "Not Found"

      970 |         )
      971 |           .query({ limit: 10 })
    > 972 |           .expect(200);
          |            ^
      973 |
      974 |         expect(response.headers['content-type']).toContain('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      975 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:972:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 7: Exportação e Relatórios › GET /v1/patrimonio/relatorio/inventario › deve gerar relatório de inventário

    Expected 200, 400 or 500, got 404

      987 |         )
      988 |           .query({ limit: '10' })
    > 989 |           .expect((res) => {
          |            ^
      990 |             // Aceitar 200, 400 (validação) ou 500 (erro interno do service)
      991 |             if (res.status !== 200 && res.status !== 400 && res.status !== 500) {
      992 |               throw new Error(`Expected 200, 400 or 500, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:989:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:992:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 8: Buscas Avançadas › GET /v1/patrimonio/status-multiplos › deve buscar patrimônios por múltiplos status

    Expected 200 or 400, got 404

      1018 |             status: [PatrimonioStatus.ATIVO, PatrimonioStatus.MANUTENCAO] 
      1019 |           })
    > 1020 |           .expect((res) => {
           |            ^
      1021 |             // Aceitar 200 ou 400 (se validação falhar)
      1022 |             if (res.status !== 200 && res.status !== 400) {
      1023 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1020:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1023:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 8: Buscas Avançadas › GET /v1/patrimonio/categorias-multiplas › deve buscar patrimônios por múltiplas categorias

    Expected 200 or 400, got 404

      1043 |         )
      1044 |           .query({ categoriaIds: [categoriaId] })
    > 1045 |           .expect((res) => {
           |            ^
      1046 |             // Aceitar 200 ou 400 (se validação falhar)
      1047 |             if (res.status !== 200 && res.status !== 400) {
      1048 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1045:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1048:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › POST /v1/patrimonio/bulk › deve criar múltiplos patrimônios em lote

    expect(received).toHaveProperty(path)

    Expected path: "sucessos"
    Received path: []

    Received value: {"error": "Not Found", "message": "Cannot POST /v1/patrimonio/bulk", "statusCode": 404}

      1092 |           });
      1093 |
    > 1094 |         expect(response.body).toHaveProperty('sucessos');
           |                               ^
      1095 |         expect(response.body).toHaveProperty('totalSucessos');
      1096 |         expect(response.body.totalSucessos).toBeGreaterThan(0);
      1097 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1094:31)

  ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › PATCH /v1/patrimonio/bulk › deve atualizar múltiplos patrimônios em lote

    Expected 200, 201 or 400, got 404

      1119 |         )
      1120 |           .send(bulkDto)
    > 1121 |           .expect((res) => {
           |            ^
      1122 |             // Aceitar 200, 201 ou 400 (se validação falhar)
      1123 |             if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
      1124 |               throw new Error(`Expected 200, 201 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1121:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1124:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › POST /v1/patrimonio/bulk/transferir-responsavel › deve transferir múltiplos patrimônios para o mesmo responsável

    Expected 200 or 201, got 404

      1188 |               responsavelId: tokens.adminUserId,
      1189 |             })
    > 1190 |             .expect((res) => {
           |              ^
      1191 |               if (res.status !== 200 && res.status !== 201) {
      1192 |                 throw new Error(`Expected 200 or 201, got ${res.status}`);
      1193 |               }

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1190:14)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1192:23
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › DELETE /v1/patrimonio/bulk › deve deletar múltiplos patrimônios em lote (ADMIN)

    Expected 200, 201 or 400, got 404

      1306 |         )
      1307 |           .send(bulkDto)
    > 1308 |           .expect((res) => {
           |            ^
      1309 |             // Aceitar 200, 201 ou 400 (se formato estiver incorreto)
      1310 |             if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
      1311 |               throw new Error(`Expected 200, 201 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1308:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1311:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 10: Validações › GET /v1/patrimonio/validar-codigo/:codigo › deve validar código disponível

    expected 200 "OK", got 404 "Not Found"

      1334 |           tokens,
      1335 |           UserRole.ADMIN,
    > 1336 |         ).expect(200);
           |           ^
      1337 |
      1338 |         expect(response.body).toHaveProperty('disponivel');
      1339 |         expect(response.body.disponivel).toBe(true);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1336:11)
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

  ● Patrimonio - Completo (e2e) › GRUPO 10: Validações › GET /v1/patrimonio/validar-codigo/:codigo › deve validar código indisponível

    Expected 200 or 400, got 404

      1356 |           UserRole.ADMIN,
      1357 |         )
    > 1358 |           .expect((res) => {
           |            ^
      1359 |             // Aceitar 200 (código disponível) ou 400 (código inválido ou erro de validação)
      1360 |             // O importante é que o endpoint responde
      1361 |             if (res.status !== 200 && res.status !== 400) {

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1358:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1362:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 10: Validações › POST /v1/patrimonio/verificar-duplicidade › deve verificar duplicidade de patrimônios

    expect(received).toHaveProperty(path)

    Expected path: "duplicatas"
    Received path: []

    Received value: {"error": "Not Found", "message": "Cannot POST /v1/patrimonio/verificar-duplicidade", "statusCode": 404}

      1396 |           });
      1397 |
    > 1398 |         expect(response.body).toHaveProperty('duplicatas');
           |                               ^
      1399 |         expect(response.body).toHaveProperty('total');
      1400 |         expect(Array.isArray(response.body.duplicatas)).toBe(true);
      1401 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1398:31)

  ● Patrimonio - Completo (e2e) › GRUPO 11: Alertas › GET /v1/patrimonio/vencimento-garantia › deve buscar patrimônios próximos do vencimento de garantia

    expected 200 "OK", got 404 "Not Found"

      1440 |         )
      1441 |           .query({ dias: '30' })
    > 1442 |           .expect(200);
           |            ^
      1443 |
      1444 |         expect(Array.isArray(response.body)).toBe(true);
      1445 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1442:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 11: Alertas › GET /v1/patrimonio/garantia-expirada › deve buscar patrimônios com garantia expirada

    Expected 200 or 400, got 404

      1458 |           UserRole.ADMIN,
      1459 |         )
    > 1460 |           .expect((res) => {
           |            ^
      1461 |             // Aceitar 200 ou 400 (se dias for obrigatório e inválido)
      1462 |             if (res.status !== 200 && res.status !== 400) {
      1463 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1460:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1463:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 11: Alertas › GET /v1/patrimonio/alertas/garantia › deve buscar patrimônios com garantia vencendo em breve

    expected 200 "OK", got 404 "Not Found"

      1483 |         )
      1484 |           .query({ dias: '30' })
    > 1485 |           .expect(200);
           |            ^
      1486 |
      1487 |         expect(Array.isArray(response.body)).toBe(true);
      1488 |         

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1485:12)
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

  ● Patrimonio - Completo (e2e) › GRUPO 11: Alertas › GET /v1/patrimonio/manutencao-prolongada › deve buscar patrimônios em manutenção prolongada

    Expected 200 or 400, got 404

      1501 |           UserRole.ADMIN,
      1502 |         )
    > 1503 |           .expect((res) => {
           |            ^
      1504 |             // Aceitar 200 ou 400 (se dias for obrigatório e inválido)
      1505 |             if (res.status !== 200 && res.status !== 400) {
      1506 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1503:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1506:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 11: Alertas › GET /v1/patrimonio/sem-responsavel › deve buscar patrimônios sem responsável

    Expected 200 or 400, got 404

      1551 |           UserRole.ADMIN,
      1552 |         )
    > 1553 |           .expect((res) => {
           |            ^
      1554 |             // Aceitar 200 ou 400 (se houver problema de validação)
      1555 |             if (res.status !== 200 && res.status !== 400) {
      1556 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1553:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1556:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 13: Gestão de Fotos › GET /v1/patrimonio/com-foto › deve listar patrimônios que possuem foto

    Expected 200 or 400, got 404

      1650 |           UserRole.ADMIN,
      1651 |         )
    > 1652 |           .expect((res) => {
           |            ^
      1653 |             // Aceitar 200 ou 400 (se parâmetros forem inválidos)
      1654 |             if (res.status !== 200 && res.status !== 400) {
      1655 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1652:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1655:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 14: Estatísticas por Responsável/Marca › GET /v1/patrimonio/stats/marca-modelo › deve retornar estatísticas agrupadas por marca e modelo (ADMIN)

    expected 200 "OK", got 404 "Not Found"

      1914 |           tokens,
      1915 |           UserRole.ADMIN, // GET /patrimonio/stats/marca-modelo requer autenticação
    > 1916 |         ).expect(200);
           |           ^
      1917 |
      1918 |         expect(response.body).toHaveProperty('itens');
      1919 |         expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1916:11)
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

  ● Patrimonio - Completo (e2e) › GRUPO 14: Estatísticas por Responsável/Marca › GET /v1/patrimonio/top-valiosos › deve listar os patrimônios mais valiosos

    Expected 200 or 400, got 404

      1932 |         )
      1933 |           .query({ limit: 10 })
    > 1934 |           .expect((res) => {
           |            ^
      1935 |             // Aceitar 200 ou 400 (se validação falhar)
      1936 |             if (res.status !== 200 && res.status !== 400) {
      1937 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1934:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1937:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 14: Estatísticas por Responsável/Marca › GET /v1/patrimonio/novos › deve listar patrimônios adquiridos recentemente

    Expected 200 or 400, got 404

      1958 |         )
      1959 |           .query({ dias: 30 })
    > 1960 |           .expect((res) => {
           |            ^
      1961 |             // Aceitar 200 ou 400 (se validação falhar)
      1962 |             if (res.status !== 200 && res.status !== 400) {
      1963 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1960:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:1963:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 16: Exportação PDF › GET /v1/patrimonio/export/pdf › deve exportar patrimônios filtrados para PDF

    Expected 200 or 500, got 404

      2015 |         )
      2016 |           .query({ limit: 10 })
    > 2017 |           .expect((res) => {
           |            ^
      2018 |             // Aceitar 200 ou 500 (erro quando não há dados suficientes ou problema na geração)
      2019 |             if (res.status !== 200 && res.status !== 500) {
      2020 |               throw new Error(`Expected 200 or 500, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2017:12)
      ----
      at patrimonio/patrimonio-completo.e2e-spec.ts:2020:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (ADMIN)

    expected 201 "Created", got 404 "Not Found"

      2056 |           )
      2057 |             .send(createDto)
    > 2058 |             .expect(201);
           |              ^
      2059 |
      2060 |           tempPatrimonioId = createResponse.body.id;
      2061 |         }

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2058:14)
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

  ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (MANAGER)

    expected 201 "Created", got 404 "Not Found"

      2120 |         )
      2121 |           .send(createDto)
    > 2122 |           .expect(201);
           |            ^
      2123 |
      2124 |         expect(createResponse.body).toHaveProperty('id');
      2125 |         const tempPatrimonioId = createResponse.body.id;

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2122:12)
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

FAIL patrimonio/patrimonio-fases.e2e-spec.ts (12.84 s)
  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio para MANUTENCAO (200)

    expected 201 "Created", got 404 "Not Found"

      94 |       )
      95 |         .send(createDto)
    > 96 |         .expect(201);
         |          ^
      97 |
      98 |       createdPatrimonioId = response.body.id;
      99 |       createdPatrimonioCodigo = response.body.codigo;

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve retornar 400 quando status é o mesmo

    expected 201 "Created", got 404 "Not Found"

      94 |       )
      95 |         .send(createDto)
    > 96 |         .expect(201);
         |          ^
      97 |
      98 |       createdPatrimonioId = response.body.id;
      99 |       createdPatrimonioCodigo = response.body.codigo;

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve retornar 404 quando patrimônio não existe

    expected 201 "Created", got 404 "Not Found"

      94 |       )
      95 |         .send(createDto)
    > 96 |         .expect(201);
         |          ^
      97 |
      98 |       createdPatrimonioId = response.body.id;
      99 |       createdPatrimonioCodigo = response.body.codigo;

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir responsável do patrimônio (200/201)

    expected 201 "Created", got 404 "Not Found"

      94 |       )
      95 |         .send(createDto)
    > 96 |         .expect(201);
         |          ^
      97 |
      98 |       createdPatrimonioId = response.body.id;
      99 |       createdPatrimonioCodigo = response.body.codigo;

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › POST /v1/patrimonio/:id/transferir-responsavel › deve retornar 400 quando mesmo responsável

    expected 201 "Created", got 404 "Not Found"

      94 |       )
      95 |         .send(createDto)
    > 96 |         .expect(201);
         |          ^
      97 |
      98 |       createdPatrimonioId = response.body.id;
      99 |       createdPatrimonioCodigo = response.body.codigo;

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › GET /v1/patrimonio/dashboard › deve retornar métricas do dashboard (200)

    expected 201 "Created", got 404 "Not Found"

      94 |       )
      95 |         .send(createDto)
    > 96 |         .expect(201);
         |          ^
      97 |
      98 |       createdPatrimonioId = response.body.id;
      99 |       createdPatrimonioCodigo = response.body.codigo;

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve ativar patrimônio inativo (200)

    expected 201 "Created", got 404 "Not Found"

      295 |       )
      296 |         .send(createDto)
    > 297 |         .expect(201);
          |          ^
      298 |
      299 |       patrimonioParaAtivarId = response.body.id;
      300 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve retornar 400 quando já está ativo

    expected 201 "Created", got 404 "Not Found"

      295 |       )
      296 |         .send(createDto)
    > 297 |         .expect(201);
          |          ^
      298 |
      299 |       patrimonioParaAtivarId = response.body.id;
      300 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve desativar patrimônio ativo (200)

    expected 201 "Created", got 404 "Not Found"

      295 |       )
      296 |         .send(createDto)
    > 297 |         .expect(201);
          |          ^
      298 |
      299 |       patrimonioParaAtivarId = response.body.id;
      300 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve retornar 400 quando já está inativo

    expected 201 "Created", got 404 "Not Found"

      295 |       )
      296 |         .send(createDto)
    > 297 |         .expect(201);
          |          ^
      298 |
      299 |       patrimonioParaAtivarId = response.body.id;
      300 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › POST /v1/patrimonio/:id/descarte › deve marcar patrimônio para descarte (200/201/400)

    expected 201 "Created", got 404 "Not Found"

      295 |       )
      296 |         .send(createDto)
    > 297 |         .expect(201);
          |          ^
      298 |
      299 |       patrimonioParaAtivarId = response.body.id;
      300 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › PATCH /v1/patrimonio/:id/localizacao › deve atualizar localização do patrimônio (200/404)

    expected 201 "Created", got 404 "Not Found"

      415 |       )
      416 |         .send(createDto)
    > 417 |         .expect(201);
          |          ^
      418 |
      419 |       patrimonioId = response.body.id;
      420 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › GET /v1/patrimonio/localizacao/:localizacao › deve listar patrimônios por localização (200 ou 404)

    expected 201 "Created", got 404 "Not Found"

      415 |       )
      416 |         .send(createDto)
    > 417 |         .expect(201);
          |          ^
      418 |
      419 |       patrimonioId = response.body.id;
      420 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › GET /v1/patrimonio/stats/localizacoes › deve retornar estatísticas por localização (200)

    expected 201 "Created", got 404 "Not Found"

      415 |       )
      416 |         .send(createDto)
    > 417 |         .expect(201);
          |          ^
      418 |
      419 |       patrimonioId = response.body.id;
      420 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/faixa-valor › deve retornar estatísticas por faixa de valor (200)

    expected 200 "OK", got 404 "Not Found"

      554 |           tokens,
      555 |           UserRole.ADMIN,
    > 556 |         ).expect(200);
          |           ^
      557 |
      558 |         expect(response.body).toHaveProperty('intervalo');
      559 |         expect(response.body).toHaveProperty('faixas');

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:556:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/aquisicao › deve retornar estatísticas por período de aquisição (200)

    expected 200 "OK", got 404 "Not Found"

      570 |           tokens,
      571 |           UserRole.ADMIN,
    > 572 |         ).expect(200);
          |           ^
      573 |
      574 |         expect(response.body).toHaveProperty('tipoPeriodo');
      575 |         expect(response.body).toHaveProperty('periodos');

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:572:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/aquisicao › deve aceitar período trimestral (200)

    expected 200 "OK", got 404 "Not Found"

      584 |           tokens,
      585 |           UserRole.ADMIN,
    > 586 |         ).expect(200);
          |           ^
      587 |       });
      588 |
      589 |       it('deve aceitar período anual (200)', async () => {

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:586:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/aquisicao › deve aceitar período anual (200)

    expected 200 "OK", got 404 "Not Found"

      594 |           tokens,
      595 |           UserRole.ADMIN,
    > 596 |         ).expect(200);
          |           ^
      597 |       });
      598 |     });
      599 |

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:596:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/evolucao › deve retornar gráfico de evolução temporal (200)

    expected 200 "OK", got 404 "Not Found"

      606 |           tokens,
      607 |           UserRole.ADMIN,
    > 608 |         ).expect(200);
          |           ^
      609 |
      610 |         expect(response.body).toHaveProperty('tipoPeriodo');
      611 |         expect(response.body).toHaveProperty('ano');

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:608:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/numero-serie/:numeroSerie › deve buscar patrimônio por número de série (200)

    expected 201 "Created", got 404 "Not Found"

      637 |       )
      638 |         .send(createDto)
    > 639 |         .expect(201);
          |          ^
      640 |
      641 |       patrimonioComNumeroSerieId = response.body.id;
      642 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/numero-serie/:numeroSerie › deve retornar 404 quando não encontrado

    expected 201 "Created", got 404 "Not Found"

      637 |       )
      638 |         .send(createDto)
    > 639 |         .expect(201);
          |          ^
      640 |
      641 |       patrimonioComNumeroSerieId = response.body.id;
      642 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/aquisicao-periodo › deve buscar patrimônios por período de aquisição (200)

    expected 201 "Created", got 404 "Not Found"

      637 |       )
      638 |         .send(createDto)
    > 639 |         .expect(201);
          |          ^
      640 |
      641 |       patrimonioComNumeroSerieId = response.body.id;
      642 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/valor-range › deve buscar patrimônios por intervalo de valor (200)

    expected 201 "Created", got 404 "Not Found"

      637 |       )
      638 |         .send(createDto)
    > 639 |         .expect(201);
          |          ^
      640 |
      641 |       patrimonioComNumeroSerieId = response.body.id;
      642 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/status-multiplos › deve buscar patrimônios por múltiplos status (200)

    expected 201 "Created", got 404 "Not Found"

      637 |       )
      638 |         .send(createDto)
    > 639 |         .expect(201);
          |          ^
      640 |
      641 |       patrimonioComNumeroSerieId = response.body.id;
      642 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/categorias-multiplas › deve buscar patrimônios por múltiplas categorias (200)

    expected 201 "Created", got 404 "Not Found"

      637 |       )
      638 |         .send(createDto)
    > 639 |         .expect(201);
          |          ^
      640 |
      641 |       patrimonioComNumeroSerieId = response.body.id;
      642 |     });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › POST /v1/patrimonio/bulk › deve criar múltiplos patrimônios em lote (201)

    expected 201 "Created", got 404 "Not Found"

      811 |         )
      812 |           .send(dto)
    > 813 |           .expect(201);
          |            ^
      814 |
      815 |         expect(response.body).toHaveProperty('totalSucessos');
      816 |         expect(response.body).toHaveProperty('totalErros');

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:813:12)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › PATCH /v1/patrimonio/bulk › deve atualizar múltiplos patrimônios (200 ou 400)

    expected 201 "Created", got 404 "Not Found"

      835 |             nome: 'Patrimônio para atualização em lote',
      836 |           })
    > 837 |           .expect(201);
          |            ^
      838 |
      839 |         const patrimonioId = createResponse.body.id;
      840 |

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:837:12)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › POST /v1/patrimonio/bulk/transferir-responsavel › deve transferir múltiplos patrimônios (200 ou 400)

    expected 201 "Created", got 404 "Not Found"

      883 |             nome: 'Patrimônio para transferência em lote',
      884 |           })
    > 885 |           .expect(201);
          |            ^
      886 |
      887 |         const patrimonioId = createResponse.body.id;
      888 |

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:885:12)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › GET /v1/patrimonio/validar-codigo/:codigo › deve validar código disponível (200)

    expected 200 "OK", got 404 "Not Found"

      925 |           tokens,
      926 |           UserRole.ADMIN,
    > 927 |         ).expect(200);
          |           ^
      928 |
      929 |         expect(response.body).toHaveProperty('disponivel');
      930 |         // Pode não retornar codigo dependendo da implementação

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:927:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › GET /v1/patrimonio/validar-codigo/:codigo › deve retornar não disponível para código existente (200)

    expected 200 "OK", got 404 "Not Found"

      938 |           tokens,
      939 |           UserRole.ADMIN,
    > 940 |         ).expect(200);
          |           ^
      941 |
      942 |         expect(response.body.disponivel).toBe(false);
      943 |       });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:940:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › POST /v1/patrimonio/verificar-duplicidade › deve verificar duplicidade de patrimônios (200 ou 201)

    expected 201 "Created", got 404 "Not Found"

      961 |             numeroSerie: numeroSerie,
      962 |           })
    > 963 |           .expect(201);
          |            ^
      964 |
      965 |         // Aguardar um pouco para garantir persistência
      966 |         await new Promise(resolve => setTimeout(resolve, 300));

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:963:12)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › GET /v1/patrimonio/:id/disponibilidade › deve verificar disponibilidade do patrimônio (200)

    expected 200 "OK", got 404 "Not Found"

      1001 |           tokens,
      1002 |           UserRole.ADMIN,
    > 1003 |         ).expect(200);
           |           ^
      1004 |
      1005 |         expect(response.body).toHaveProperty('disponivel');
      1006 |         // Pode ter `motivo` ao invés de `status` dependendo da implementação

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1003:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Alertas › GET /v1/patrimonio/garantia-expirada › deve buscar patrimônios com garantia expirada (200 ou 400)

    Expected 200 or 400, got 404

      1021 |         )
      1022 |           .query({ dias: 0 })
    > 1023 |           .expect((res) => {
           |            ^
      1024 |             // Pode retornar 200 (com resultados) ou 400 (erro de validação)
      1025 |             if (res.status !== 200 && res.status !== 400) {
      1026 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1023:12)
      ----
      at patrimonio/patrimonio-fases.e2e-spec.ts:1026:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Alertas › GET /v1/patrimonio/alertas/garantia › deve buscar patrimônios com garantia vencendo (200)

    expected 200 "OK", got 404 "Not Found"

      1044 |         )
      1045 |           .query({ dias: 30 })
    > 1046 |           .expect(200);
           |            ^
      1047 |
      1048 |         expect(Array.isArray(response.body)).toBe(true);
      1049 |       });

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1046:12)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Alertas › GET /v1/patrimonio/manutencao-prolongada › deve buscar patrimônios em manutenção prolongada (200 ou 400)

    Expected 200 or 400, got 404

      1060 |         )
      1061 |           .query({ dias: 90 })
    > 1062 |           .expect((res) => {
           |            ^
      1063 |             // Pode retornar 200 (com resultados) ou 400 (erro de validação)
      1064 |             if (res.status !== 200 && res.status !== 400) {
      1065 |               throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1062:12)
      ----
      at patrimonio/patrimonio-fases.e2e-spec.ts:1065:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Alertas › GET /v1/patrimonio/sem-responsavel › deve buscar patrimônios sem responsável (200 ou 400)

    Expected 200 or 400, got 404

      1081 |           tokens,
      1082 |           UserRole.ADMIN,
    > 1083 |         ).expect((res) => {
           |           ^
      1084 |           // Pode retornar 200 (com resultados) ou 400 (erro de validação)
      1085 |           if (res.status !== 200 && res.status !== 400) {
      1086 |             throw new Error(`Expected 200 or 400, got ${res.status}`);

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1083:11)
      ----
      at patrimonio/patrimonio-fases.e2e-spec.ts:1086:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Histórico › GET /v1/patrimonio/:id/historico › deve retornar histórico de alterações (200)

    expected 200 "OK", got 404 "Not Found"

      1104 |           tokens,
      1105 |           UserRole.ADMIN,
    > 1106 |         ).expect(200);
           |           ^
      1107 |
      1108 |         expect(response.body).toHaveProperty('patrimonioId');
      1109 |         expect(response.body).toHaveProperty('historico');

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1106:11)
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

  ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Histórico › GET /v1/patrimonio/:id/historico/responsaveis › deve retornar histórico de responsáveis (200)

    expected 200 "OK", got 404 "Not Found"

      1120 |           tokens,
      1121 |           UserRole.ADMIN,
    > 1122 |         ).expect(200);
           |           ^
      1123 |
      1124 |         expect(response.body).toHaveProperty('patrimonioId');
      1125 |         expect(response.body).toHaveProperty('responsaveis');

      at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1122:11)
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

FAIL ./patrimonio.e2e-spec.ts (14.147 s)
  ● PatrimonioController (e2e) › POST /v1/patrimonio › should create a new patrimonio (201)

    expected 201 "Created", got 404 "Not Found"

      76 |       )
      77 |         .send(createPatrimonioDto)
    > 78 |         .expect(201);
         |          ^
      79 |
      80 |       expect(response.body).toMatchObject({
      81 |         codigo: createPatrimonioDto.codigo,

      at Object.<anonymous> (patrimonio.e2e-spec.ts:78:10)
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

  ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 409 when codigo already exists

    expected 201 "Created", got 404 "Not Found"

      110 |           nome: 'First Notebook',
      111 |         })
    > 112 |         .expect(201);
          |          ^
      113 |
      114 |       // Tentar criar outro com mesmo código
      115 |       const createPatrimonioDto = {

      at Object.<anonymous> (patrimonio.e2e-spec.ts:112:10)
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

  ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 400 when required fields are missing

    expected 400 "Bad Request", got 404 "Not Found"

      144 |       )
      145 |         .send(invalidDto)
    > 146 |         .expect(400);
          |          ^
      147 |     });
      148 |   });
      149 |

      at Object.<anonymous> (patrimonio.e2e-spec.ts:146:10)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should return paginated patrimonios list (200)

    expected 200 "OK", got 404 "Not Found"

      156 |         tokens,
      157 |         UserRole.ADMIN, // GET /patrimonio pode requerer autenticação
    > 158 |       ).expect(200);
          |         ^
      159 |
      160 |       expect(response.body).toMatchObject({
      161 |         data: expect.any(Array),

      at Object.<anonymous> (patrimonio.e2e-spec.ts:158:9)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should filter patrimonios by categoriaId (200)

    expected 200 "OK", got 404 "Not Found"

      177 |         tokens,
      178 |         UserRole.ADMIN,
    > 179 |       ).expect(200);
          |         ^
      180 |
      181 |       expect(response.body.data).toBeDefined();
      182 |       expect(Array.isArray(response.body.data)).toBe(true);

      at Object.<anonymous> (patrimonio.e2e-spec.ts:179:9)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should filter patrimonios by status (200)

    expected 200 "OK", got 404 "Not Found"

      192 |       )
      193 |         .query({ status: PatrimonioStatus.ATIVO })
    > 194 |         .expect(200);
          |          ^
      195 |
      196 |       expect(response.body.data).toBeDefined();
      197 |       if (response.body.data.length > 0) {

      at Object.<anonymous> (patrimonio.e2e-spec.ts:194:10)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should search patrimonios by text query (200)

    expected 200 "OK", got 404 "Not Found"

      209 |       )
      210 |         .query({ q: 'notebook' })
    > 211 |         .expect(200);
          |          ^
      212 |
      213 |       expect(response.body.data).toBeDefined();
      214 |       if (response.body.data.length > 0) {

      at Object.<anonymous> (patrimonio.e2e-spec.ts:211:10)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should filter patrimonios by valor range (200)

    expected 200 "OK", got 404 "Not Found"

      227 |       )
      228 |         .query({ valorMinimo: 1000, valorMaximo: 3000 })
    > 229 |         .expect(200);
          |          ^
      230 |
      231 |       expect(response.body.data).toBeDefined();
      232 |       if (response.body.data.length > 0) {

      at Object.<anonymous> (patrimonio.e2e-spec.ts:229:10)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio › should sort patrimonios by nome ASC (200)

    expected 200 "OK", got 404 "Not Found"

      250 |       )
      251 |         .query({ sortBy: 'nome', sortOrder: 'ASC' })
    > 252 |         .expect(200);
          |          ^
      253 |
      254 |       expect(response.body.data).toBeDefined();
      255 |       expect(Array.isArray(response.body.data)).toBe(true);

      at Object.<anonymous> (patrimonio.e2e-spec.ts:252:10)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio/:id › should return a patrimonio by id (200)

    expected 201 "Created", got 404 "Not Found"

      280 |           status: PatrimonioStatus.ATIVO,
      281 |         })
    > 282 |         .expect(201);
          |          ^
      283 |
      284 |       const patrimonioId = createResponse.body.id;
      285 |

      at Object.<anonymous> (patrimonio.e2e-spec.ts:282:10)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio/:id › should return 404 when patrimonio not found

    expect(received).toContain(expected) // indexOf

    Expected substring: "não encontrado"
    Received string:    "Cannot GET /v1/patrimonio/00000000-0000-0000-0000-000000000000"

      309 |       ).expect(404);
      310 |
    > 311 |       expect(response.body.message).toContain('não encontrado');
          |                                     ^
      312 |     });
      313 |   });
      314 |

      at Object.<anonymous> (patrimonio.e2e-spec.ts:311:37)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/codigo/:codigo › should return a patrimonio by codigo (200)

    expected 201 "Created", got 404 "Not Found"

      328 |           nome: 'Notebook Dell Inspiron 15',
      329 |         })
    > 330 |         .expect(201);
          |          ^
      331 |
      332 |       const response = await authenticatedRequest(
      333 |         httpServer,

      at Object.<anonymous> (patrimonio.e2e-spec.ts:330:10)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio/codigo/:codigo › should return 404 when patrimonio not found by codigo

    expect(received).toContain(expected) // indexOf

    Expected substring: "não encontrado"
    Received string:    "Cannot GET /v1/patrimonio/codigo/NON-EXISTENT"

      353 |       ).expect(404);
      354 |
    > 355 |       expect(response.body.message).toContain('não encontrado');
          |                                     ^
      356 |     });
      357 |   });
      358 |

      at Object.<anonymous> (patrimonio.e2e-spec.ts:355:37)

  ● PatrimonioController (e2e) › GET /v1/patrimonio/stats/categoria › should return stats by categoria (200)

    expected 200 "OK", got 404 "Not Found"

      368 |         tokens,
      369 |         UserRole.ADMIN,
    > 370 |       ).expect(200);
          |         ^
      371 |
      372 |       expect(typeof response.body).toBe('object');
      373 |       // Pode não ter dados se não houver patrimônios

      at Object.<anonymous> (patrimonio.e2e-spec.ts:370:9)
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

  ● PatrimonioController (e2e) › GET /v1/patrimonio/stats/status › should return stats by status (200)

    expected 200 "OK", got 404 "Not Found"

      383 |         tokens,
      384 |         UserRole.ADMIN,
    > 385 |       ).expect(200);
          |         ^
      386 |
      387 |       expect(typeof response.body).toBe('object');
      388 |       // Pode não ter a propriedade se não houver patrimônios

      at Object.<anonymous> (patrimonio.e2e-spec.ts:385:9)
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

  ● PatrimonioController (e2e) › PATCH /v1/patrimonio/:id › should update a patrimonio (200)

    expected 201 "Created", got 404 "Not Found"

      408 |           nome: 'Notebook Dell Inspiron 15',
      409 |         })
    > 410 |         .expect(201);
          |          ^
      411 |
      412 |       const patrimonioId = createResponse.body.id;
      413 |

      at Object.<anonymous> (patrimonio.e2e-spec.ts:410:10)
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

  ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should create multiple patrimonios (201)

    expected 201 "Created", got 404 "Not Found"

      479 |       )
      480 |         .send({ patrimonios: createDtos })
    > 481 |         .expect(201);
          |          ^
      482 |
      483 |       // O endpoint retorna BulkResponseDto com sucessos e erros
      484 |       expect(response.body).toHaveProperty('sucessos');

      at Object.<anonymous> (patrimonio.e2e-spec.ts:481:10)
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

  ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should return 400 or 409 when empty array provided

    Expected 400 or 409, got 404

      507 |       )
      508 |         .send({ patrimonios: [] })
    > 509 |         .expect((res) => {
          |          ^
      510 |           // Pode retornar 400 (Bad Request) ou 409 (Conflict) dependendo da validação
      511 |           if (res.status !== 400 && res.status !== 409) {
      512 |             throw new Error(`Expected 400 or 409, got ${res.status}`);

      at Object.<anonymous> (patrimonio.e2e-spec.ts:509:10)
      ----
      at patrimonio.e2e-spec.ts:512:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should handle duplicate codigos in request (201)

    expected 201 "Created", got 404 "Not Found"

      542 |       )
      543 |         .send({ patrimonios: duplicateDtos })
    > 544 |         .expect(201);
          |          ^
      545 |
      546 |       // Verificar que retornou estrutura de resposta bulk
      547 |       expect(response.body).toHaveProperty('sucessos');

      at Object.<anonymous> (patrimonio.e2e-spec.ts:544:10)
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

  ● PatrimonioController (e2e) › DELETE /v1/patrimonio/:id › should soft delete a patrimonio (200 or 204)

    expected 201 "Created", got 404 "Not Found"

      573 |           nome: 'Notebook para deletar',
      574 |         })
    > 575 |         .expect(201);
          |          ^
      576 |
      577 |       const patrimonioId = createResponse.body.id;
      578 |

      at Object.<anonymous> (patrimonio.e2e-spec.ts:575:10)
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

FAIL events/events.e2e-spec.ts (14.103 s)
  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN

    expected 201 "Created", got 500 "Internal Server Error"

      130 |       )
      131 |         .send(createEventDto)
    > 132 |         .expect(201);
          |          ^
      133 |
      134 |       expect(response.body).toHaveProperty('id');
      135 |       expect(response.body).toHaveProperty('title', createEventDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:132:10)
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

  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER

    expected 201 "Created", got 500 "Internal Server Error"

      171 |       )
      172 |         .send(createEventDto)
    > 173 |         .expect(201);
          |          ^
      174 |
      175 |       expect(response.body).toHaveProperty('id');
      176 |       expect(response.body).toHaveProperty('title', createEventDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:173:10)
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

  ● Events (e2e) › GET /v1/events › deve listar eventos com paginação (200)

    expected 200 "OK", got 500 "Internal Server Error"

      191 |       )
      192 |         .query({ page: 1, limit: 20 })
    > 193 |         .expect(200);
          |          ^
      194 |
      195 |       expect(response.body).toHaveProperty('data');
      196 |       expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (events/events.e2e-spec.ts:193:10)
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

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por eventType (200)

    expected 200 "OK", got 500 "Internal Server Error"

      212 |       )
      213 |         .query({ eventType: EventType.MANUTENCAO, page: 1, limit: 20 })
    > 214 |         .expect(200);
          |          ^
      215 |
      216 |       expect(response.body.data).toBeDefined();
      217 |       if (response.body.data.length > 0) {

      at Object.<anonymous> (events/events.e2e-spec.ts:214:10)
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

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por state (200)

    expected 200 "OK", got 500 "Internal Server Error"

      231 |       )
      232 |         .query({ state: EventState.DRAFT, page: 1, limit: 20 })
    > 233 |         .expect(200);
          |          ^
      234 |
      235 |       expect(response.body.data).toBeDefined();
      236 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:233:10)
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

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por visibility (200)

    expected 200 "OK", got 500 "Internal Server Error"

      245 |       )
      246 |         .query({ visibility: EventVisibility.PUBLIC, page: 1, limit: 20 })
    > 247 |         .expect(200);
          |          ^
      248 |
      249 |       expect(response.body.data).toBeDefined();
      250 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:247:10)
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

  ● Events (e2e) › GET /v1/events › deve buscar eventos por texto (q) (200)

    expected 200 "OK", got 500 "Internal Server Error"

      259 |       )
      260 |         .query({ q: 'Teste', page: 1, limit: 20 })
    > 261 |         .expect(200);
          |          ^
      262 |
      263 |       expect(response.body.data).toBeDefined();
      264 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:261:10)
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

  ● Events (e2e) › GET /v1/events › deve filtrar eventos por intervalo de datas (200)

    expected 200 "OK", got 500 "Internal Server Error"

      278 |       )
      279 |         .query({ from: from.toISOString(), to: to.toISOString(), page: 1, limit: 20 })
    > 280 |         .expect(200);
          |          ^
      281 |
      282 |       expect(response.body.data).toBeDefined();
      283 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:280:10)
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

  ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por ID (200)

    expected 200 "OK", got 500 "Internal Server Error"

      292 |         tokens,
      293 |         UserRole.ADMIN, // GET /events/:idOrSlug requer autenticação
    > 294 |       ).expect(200);
          |         ^
      295 |
      296 |       expect(response.body).toHaveProperty('id', eventId1);
      297 |       expect(response.body).toHaveProperty('title');

      at Object.<anonymous> (events/events.e2e-spec.ts:294:9)
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

  ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por slug (200)

    expected 200 "OK", got 500 "Internal Server Error"

      306 |         tokens,
      307 |         UserRole.ADMIN,
    > 308 |       ).expect(200);
          |         ^
      309 |
      310 |       expect(response.body).toHaveProperty('id', eventId1);
      311 |       expect(response.body).toHaveProperty('slug', eventSlug1);

      at Object.<anonymous> (events/events.e2e-spec.ts:308:9)
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

  ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - ADMIN (proprietário)

    expected 200 "OK", got 400 "Bad Request"

      328 |       )
      329 |         .send(updateDto)
    > 330 |         .expect(200);
          |          ^
      331 |
      332 |       expect(response.body).toHaveProperty('id', eventId1);
      333 |       expect(response.body).toHaveProperty('title', updateDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:330:10)
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

  ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - MANAGER (proprietário)

    expected 200 "OK", got 400 "Bad Request"

      348 |       )
      349 |         .send(updateDto)
    > 350 |         .expect(200);
          |          ^
      351 |
      352 |       expect(response.body).toHaveProperty('id', eventId2);
      353 |       expect(response.body).toHaveProperty('title', updateDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:350:10)
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

  ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - ADMIN (proprietário)

    expected 201 "Created", got 500 "Internal Server Error"

      379 |           state: EventState.DRAFT,
      380 |         })
    > 381 |         .expect(201);
          |          ^
      382 |
      383 |       const eventToPublishId = createResponse.body.id;
      384 |

      at Object.<anonymous> (events/events.e2e-spec.ts:381:10)
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

  ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - MANAGER (proprietário)

    expected 201 "Created", got 500 "Internal Server Error"

      424 |           state: EventState.DRAFT,
      425 |         })
    > 426 |         .expect(201);
          |          ^
      427 |
      428 |       const eventToPublishId = createResponse.body.id;
      429 |

      at Object.<anonymous> (events/events.e2e-spec.ts:426:10)
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

FAIL auth/auth.e2e-spec.ts (186.171 s)
  ● Auth (e2e) › GET /v1/auth/me › deve retornar informações do usuário autenticado (200)

    expected 200 "OK", got 401 "Unauthorized"

      260 |         .get('/v1/auth/me')
      261 |         .set('Authorization', `***
    > 262 |         .expect(200);
          |          ^
      263 |
      264 |       expect(response.body).toHaveProperty('id');
      265 |       expect(response.body).toHaveProperty('email', testUserEmail);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:262:10)
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

    Expected 200 or 201, got 401

      343 |           refreshToken: originalRefreshToken,
      344 |         })
    > 345 |         .expect((res) => {
          |          ^
      346 |           // Refresh pode retornar 200 ou 201
      347 |           if (res.status !== 200 && res.status !== 201) {
      348 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:345:10)
      ----
      at auth/auth.e2e-spec.ts:348:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Auth (e2e) › POST /v1/auth/refresh › deve revogar refresh token antigo após renovação

    Expected 200 or 201, got 401

      423 |           refreshToken: originalRefreshToken,
      424 |         })
    > 425 |         .expect((res) => {
          |          ^
      426 |           // Refresh pode retornar 200 ou 201
      427 |           if (res.status !== 200 && res.status !== 201) {
      428 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:425:10)
      ----
      at auth/auth.e2e-spec.ts:428:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Auth (e2e) › POST /v1/auth/logout › deve revogar refresh token após logout

    Expected 200 or 201, got 429

      516 |           password: testUserPassword,
      517 |         })
    > 518 |         .expect((res) => {
          |          ^
      519 |           // Login pode retornar 200 ou 201
      520 |           if (res.status !== 200 && res.status !== 201) {
      521 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:518:10)
      ----
      at auth/auth.e2e-spec.ts:521:19
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

      556 |           password: testUserPassword,
      557 |         })
    > 558 |         .expect((res) => {
          |          ^
      559 |           // Login pode retornar 200 ou 201
      560 |           if (res.status !== 200 && res.status !== 201) {
      561 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:558:10)
      ----
      at auth/auth.e2e-spec.ts:561:19
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

      605 |           password: testUserPassword,
      606 |         })
    > 607 |         .expect((res) => {
          |          ^
      608 |           // Login pode retornar 200 ou 201
      609 |           if (res.status !== 200 && res.status !== 201) {
      610 |             throw new Error(`Expected 200 or 201, got ${res.status}`);

      at Object.<anonymous> (auth/auth.e2e-spec.ts:607:10)
      ----
      at auth/auth.e2e-spec.ts:610:19
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)


Test Suites: 7 failed, 14 passed, 21 total
Tests:       176 failed, 278 passed, 454 total
Snapshots:   0 total
Time:        221.415 s
Ran all test suites.
Error: Process completed with exit code 1.