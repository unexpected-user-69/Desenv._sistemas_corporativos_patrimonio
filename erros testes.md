
FAIL events/events.e2e-spec.ts (13.854 s)
  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN

    expected 201 "Created", got 403 "Forbidden"

      131 |       )
      132 |         .send(createEventDto)
    > 133 |         .expect(201);
          |          ^
      134 |
      135 |       expect(response.body).toHaveProperty('id');
      136 |       expect(response.body).toHaveProperty('title', createEventDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:133:10)
      ----
      at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)

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


Test Suites: 6 failed, 15 passed, 21 total
Tests:       106 failed, 348 passed, 454 total
Snapshots:   0 total
Time:        225.395 s
Ran all test suites.
Error: Process completed with exit code 1.