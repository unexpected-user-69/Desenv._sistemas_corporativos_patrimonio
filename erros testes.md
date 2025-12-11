9s
3 min 45 s
Run npm run test:e2e
  npm run test:e2e
  shell: /usr/bin/bash -e {0}
  env:
    NODE_ENV: test
    DB_HOST: localhost
    DB_PORT: 5432
    DB_USER: postgres
    DB_PASS: postgres
    DB_NAME: patrimonio_inventario_test
    REDIS_HOST: localhost
    REDIS_PORT: 6379
    REDIS_DB: 0
    JWT_ACCESS_SECRET: test_secret
    JWT_REFRESH_SECRET: test_refresh_secret

> patrimonio_inventario@0.0.1 test:e2e
> jest --config ./test/jest-e2e.json

PASS test/maintenance/maintenance.e2e-spec.ts (34.274 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 34459, USERS_API_URL: http://localhost:34459/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      ✅ Patrimônio criado com sucesso: d71c9e29-785c-415d-bc8e-17f17f075282

      at createTestPatrimonio (maintenance/maintenance.e2e-spec.ts:1237:13)

    console.log
      ✅ Verificação pós-criação: {
        id: 'd71c9e29-785c-415d-bc8e-17f17f075282',
        codigo: 'TEST-MAINT-001',
        nome: 'Patrimônio Teste Manutenção'
      }

      at createTestPatrimonio (maintenance/maintenance.e2e-spec.ts:1249:13)

    console.log
      ✅ Patrimônio de teste criado/encontrado: d71c9e29-785c-415d-bc8e-17f17f075282

      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:65:13)

    console.log
      ✅ Verificação do patrimônio: [
        {
          id: 'd71c9e29-785c-415d-bc8e-17f17f075282',
          codigo: 'TEST-MAINT-001',
          nome: 'Patrimônio Teste Manutenção'
        }
      ]

      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:72:13)

    console.log
      🔍 Testando criação de plano com categoriaId: afcb6c3e-576f-42ea-9cb1-111c01551a6b

      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:667:15)

    console.log
      🔍 DTO completo: {
        "categoriaId": "afcb6c3e-576f-42ea-9cb1-111c01551a6b",
        "periodicidade": "mensal",
        "proximaExecucao": "2026-01-10T00:03:05.164Z"
      }

      at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:668:15)

FAIL test/patrimonio/patrimonio-completo.e2e-spec.ts (35.544 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 34033, USERS_API_URL: http://localhost:34033/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.error
      [JwtAuthGuard] Token inválido: No auth token Error: No auth token
          at JwtStrategy.authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport-jwt/lib/strategy.js:96:26)
          at attempt (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:378:16)
          at authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:379:7)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:88:3
          at new Promise (<anonymous>)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:80:83
          at JwtAuthGuard.canActivate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:44:32)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)

      79 |       // Log do erro para debug (apenas em desenvolvimento/testes)
      80 |       if (process.env.NODE_ENV !== 'production') {
    > 81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
         |                 ^
      82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:81:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] JWT_ACCESS_SECRET atual: test_secre...

      80 |       if (process.env.NODE_ENV !== 'production') {
      81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
    > 82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
         |                 ^
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);
      85 |     }

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:82:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] Token inválido: No auth token Error: No auth token
          at JwtStrategy.authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport-jwt/lib/strategy.js:96:26)
          at attempt (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:378:16)
          at authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:379:7)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:88:3
          at new Promise (<anonymous>)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:80:83
          at JwtAuthGuard.canActivate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:44:32)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)

      79 |       // Log do erro para debug (apenas em desenvolvimento/testes)
      80 |       if (process.env.NODE_ENV !== 'production') {
    > 81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
         |                 ^
      82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:81:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] JWT_ACCESS_SECRET atual: test_secre...

      80 |       if (process.env.NODE_ENV !== 'production') {
      81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
    > 82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
         |                 ^
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);
      85 |     }

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:82:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] Token inválido: No auth token Error: No auth token
          at JwtStrategy.authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport-jwt/lib/strategy.js:96:26)
          at attempt (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:378:16)
          at authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:379:7)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:88:3
          at new Promise (<anonymous>)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:80:83
          at JwtAuthGuard.canActivate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:44:32)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)

      79 |       // Log do erro para debug (apenas em desenvolvimento/testes)
      80 |       if (process.env.NODE_ENV !== 'production') {
    > 81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
         |                 ^
      82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:81:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] JWT_ACCESS_SECRET atual: test_secre...

      80 |       if (process.env.NODE_ENV !== 'production') {
      81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
    > 82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
         |                 ^
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);
      85 |     }

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:82:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] Token inválido: No auth token Error: No auth token
          at JwtStrategy.authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport-jwt/lib/strategy.js:96:26)
          at attempt (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:378:16)
          at authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:379:7)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:88:3
          at new Promise (<anonymous>)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:80:83
          at JwtAuthGuard.canActivate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:44:32)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)

      79 |       // Log do erro para debug (apenas em desenvolvimento/testes)
      80 |       if (process.env.NODE_ENV !== 'production') {
    > 81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
         |                 ^
      82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:81:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] JWT_ACCESS_SECRET atual: test_secre...

      80 |       if (process.env.NODE_ENV !== 'production') {
      81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
    > 82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
         |                 ^
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);
      85 |     }

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:82:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] Token inválido: No auth token Error: No auth token
          at JwtStrategy.authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport-jwt/lib/strategy.js:96:26)
          at attempt (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:378:16)
          at authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:379:7)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:88:3
          at new Promise (<anonymous>)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:80:83
          at JwtAuthGuard.canActivate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:44:32)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)

      79 |       // Log do erro para debug (apenas em desenvolvimento/testes)
      80 |       if (process.env.NODE_ENV !== 'production') {
    > 81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
         |                 ^
      82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:81:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] JWT_ACCESS_SECRET atual: test_secre...

      80 |       if (process.env.NODE_ENV !== 'production') {
      81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
    > 82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
         |                 ^
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);
      85 |     }

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:82:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] Token inválido: No auth token Error: No auth token
          at JwtStrategy.authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport-jwt/lib/strategy.js:96:26)
          at attempt (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:378:16)
          at authenticate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/passport/lib/middleware/authenticate.js:379:7)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:88:3
          at new Promise (<anonymous>)
          at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:80:83
          at JwtAuthGuard.canActivate (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/passport/dist/auth.guard.js:44:32)
          at processTicksAndRejections (node:internal/process/task_queues:95:5)

      79 |       // Log do erro para debug (apenas em desenvolvimento/testes)
      80 |       if (process.env.NODE_ENV !== 'production') {
    > 81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
         |                 ^
      82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:81:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.error
      [JwtAuthGuard] JWT_ACCESS_SECRET atual: test_secre...

      80 |       if (process.env.NODE_ENV !== 'production') {
      81 |         console.error('[JwtAuthGuard] Token inválido:', errorMessage, info);
    > 82 |         console.error('[JwtAuthGuard] JWT_ACCESS_SECRET atual:', process.env.JWT_ACCESS_SECRET?.substring(0, 10) + '...');
         |                 ^
      83 |       }
      84 |       throw new UnauthorizedException(errorMessage);
      85 |     }

      at JwtAuthGuard.handleRequest (../packages/patrimonio-service/src/common/guards/jwt-auth.guard.ts:82:17)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:44:124
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:83:24
      at allFailed (../node_modules/passport/lib/middleware/authenticate.js:110:18)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:183:28)
      at JwtStrategy.strategy.fail (../node_modules/passport/lib/middleware/authenticate.js:314:9)
      at JwtStrategy.authenticate (../node_modules/passport-jwt/lib/strategy.js:96:21)
      at attempt (../node_modules/passport/lib/middleware/authenticate.js:378:16)
      at authenticate (../node_modules/passport/lib/middleware/authenticate.js:379:7)
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:88:3
      at ../node_modules/@nestjs/passport/dist/auth.guard.js:80:83
      at JwtAuthGuard.canActivate (../node_modules/@nestjs/passport/dist/auth.guard.js:44:32)

    console.warn
      Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.jpg

      1671 |         // Verificar se o arquivo existe
      1672 |         if (!fs.existsSync(fotoPath)) {
    > 1673 |           console.warn(`Arquivo de teste não encontrado: ${fotoPath}`);
           |                   ^
      1674 |           return;
      1675 |         }
      1676 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1673:19)

    console.warn
      Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.png

      1701 |         // Verificar se o arquivo existe
      1702 |         if (!fs.existsSync(fotoPath)) {
    > 1703 |           console.warn(`Arquivo de teste não encontrado: ${fotoPath}`);
           |                   ^
      1704 |           return;
      1705 |         }
      1706 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1703:19)

    console.warn
      Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.webp

      1752 |         // Verificar se o arquivo existe
      1753 |         if (!fs.existsSync(fotoPath)) {
    > 1754 |           console.warn(`Arquivo de teste não encontrado: ${fotoPath}`);
           |                   ^
      1755 |           return;
      1756 |         }
      1757 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1754:19)

    console.warn
      Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.jpg

      1806 |         
      1807 |         if (!fs.existsSync(fotoPath)) {
    > 1808 |           console.warn(`Arquivo de teste não encontrado: ${fotoPath}`);
           |                   ^
      1809 |           return;
      1810 |         }
      1811 |

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1808:19)

  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve listar patrimônios com paginação

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

  ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (ADMIN)

    expect(received).toContain(expected) // indexOf

    Expected value: 404
    Received array: [200, 201]

      2097 |
      2098 |         // A transferência pode retornar 200 ou 201
    > 2099 |         expect([200, 201]).toContain(response.status);
           |                            ^
      2100 |         expect(response.body).toHaveProperty('responsavelId');
      2101 |         expect(response.body.responsavelId).toBe(destinoResponsavelId);
      2102 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2099:28)

  ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (MANAGER)

    expect(received).toContain(expected) // indexOf

    Expected value: 404
    Received array: [200, 201]

      2156 |
      2157 |         // A transferência pode retornar 200 ou 201
    > 2158 |         expect([200, 201]).toContain(response.status);
           |                            ^
      2159 |         expect(response.body).toHaveProperty('responsavelId');
      2160 |         expect(response.body.responsavelId).toBe(destinoResponsavelId);
      2161 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2158:28)

FAIL test/patrimonio/endpoints-faltantes.e2e-spec.ts (38.653 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  override existing env vars with { override: true }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 32939, USERS_API_URL: http://localhost:32939/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

  ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/responsavel/:responsavelId › deve retornar estatísticas do responsável

    Expected 200, 201, or 400, got 404

      529 |         )
      530 |           .send({ novoResponsavelId: responsavelId })
    > 531 |           .expect((res) => {
          |            ^
      532 |             if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
      533 |               throw new Error(`Expected 200, 201, or 400, got ${res.status}`);
      534 |             }

      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:531:12)
      ----
      at patrimonio/endpoints-faltantes.e2e-spec.ts:533:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/responsavel/:responsavelId › deve retornar estatísticas vazias para responsável sem patrimônios

    expected 200 "OK", got 404 "Not Found"

      580 |           UserRole.ADMIN
      581 |         )
    > 582 |           .expect(200);
          |            ^
      583 |
      584 |         // Pode ter 0 ou mais dependendo dos dados de teste
      585 |         expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:582:12)
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

PASS test/patrimonio/patrimonio-fases.e2e-spec.ts (14.021 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 36375, USERS_API_URL: http://localhost:36375/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/users/users.e2e-spec.ts (16.824 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🗂️ backup and recover secrets: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 35619, USERS_API_URL: http://localhost:35619/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/inventory-mobile/inventory-mobile.e2e-spec.ts (13.781 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  enable debug logging with { debug: true }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 38525, USERS_API_URL: http://localhost:38525/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/notifications/notifications.e2e-spec.ts (13.784 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 39991, USERS_API_URL: http://localhost:39991/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/integrations-erp/integrations-erp.e2e-spec.ts (14.443 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 39339, USERS_API_URL: http://localhost:39339/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:8d2c096c-e18c-413a-852a-4ff35b78dddb"],"entity":"assets","executionId":"8d2c096c-e18c-413a-852a-4ff35b78dddb","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:03:47.598Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:9038d860-1f93-4b84-823d-3f749a4515c1"],"entity":"assets","executionId":"9038d860-1f93-4b84-823d-3f749a4515c1","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:03:47.623Z","type":"export"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:5d53a743-cce3-4fa6-ab66-aac3a5e4f083"],"entity":"costCenters","executionId":"5d53a743-cce3-4fa6-ab66-aac3a5e4f083","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:03:47.635Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:738079a6-a775-498f-9148-1e8505b55f2b"],"entity":"locations","executionId":"738079a6-a775-498f-9148-1e8505b55f2b","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:03:47.646Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:52a3b32d-359c-4af2-8a5f-5625c54d8a41"],"entity":"depreciations","executionId":"52a3b32d-359c-4af2-8a5f-5625c54d8a41","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:03:47.656Z","type":"import"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

PASS test/reports-catalog/reports-catalog.e2e-spec.ts (14.099 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 45363, USERS_API_URL: http://localhost:45363/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

PASS test/patrimonio.e2e-spec.ts (14.522 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 45583, USERS_API_URL: http://localhost:45583/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] EntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3995:23
    at Array.forEach (<anonymous>)
    at SelectQueryBuilder.buildRelations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3987:32)
    at SelectQueryBuilder.applyFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3176:22)
    at SelectQueryBuilder.setFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:106:14)
    at EntityManager.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/entity-manager/EntityManager.ts:1225:14)
    at Repository.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/repository/Repository.ts:626:29)
    at EventsService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:144:55)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] EntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3995:23
    at Array.forEach (<anonymous>)
    at SelectQueryBuilder.buildRelations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3987:32)
    at SelectQueryBuilder.applyFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3176:22)
    at SelectQueryBuilder.setFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:106:14)
    at EntityManager.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/entity-manager/EntityManager.ts:1225:14)
    at Repository.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/repository/Repository.ts:626:29)
    at EventsService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:144:55)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] TypeORMError: Relation with property path patrimonios in entity was not found.
    at JoinAttribute.getValue (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:187:23)
    at JoinAttribute.get relation [as relation] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:191:53)
    at JoinAttribute.get metadata [as metadata] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:203:18)
    at SelectQueryBuilder.join (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:2100:53)
    at SelectQueryBuilder.leftJoin (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:468:14)
    at EventsService.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:186:8)
    at EventsController.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:142:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] TypeORMError: Relation with property path patrimonios in entity was not found.
    at JoinAttribute.getValue (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:187:23)
    at JoinAttribute.get relation [as relation] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:191:53)
    at JoinAttribute.get metadata [as metadata] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:203:18)
    at SelectQueryBuilder.join (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:2100:53)
    at SelectQueryBuilder.leftJoin (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:468:14)
    at EventsService.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:186:8)
    at EventsController.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:142:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] TypeORMError: Relation with property path patrimonios in entity was not found.
    at JoinAttribute.getValue (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:187:23)
    at JoinAttribute.get relation [as relation] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:191:53)
    at JoinAttribute.get metadata [as metadata] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:203:18)
    at SelectQueryBuilder.join (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:2100:53)
    at SelectQueryBuilder.leftJoin (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:468:14)
    at EventsService.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:186:8)
    at EventsController.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:142:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] TypeORMError: Relation with property path patrimonios in entity was not found.
    at JoinAttribute.getValue (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:187:23)
    at JoinAttribute.get relation [as relation] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:191:53)
    at JoinAttribute.get metadata [as metadata] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:203:18)
    at SelectQueryBuilder.join (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:2100:53)
    at SelectQueryBuilder.leftJoin (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:468:14)
    at EventsService.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:186:8)
    at EventsController.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:142:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] TypeORMError: Relation with property path patrimonios in entity was not found.
    at JoinAttribute.getValue (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:187:23)
    at JoinAttribute.get relation [as relation] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:191:53)
    at JoinAttribute.get metadata [as metadata] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:203:18)
    at SelectQueryBuilder.join (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:2100:53)
    at SelectQueryBuilder.leftJoin (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:468:14)
    at EventsService.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:186:8)
    at EventsController.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:142:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] TypeORMError: Relation with property path patrimonios in entity was not found.
    at JoinAttribute.getValue (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:187:23)
    at JoinAttribute.get relation [as relation] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:191:53)
    at JoinAttribute.get metadata [as metadata] (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/JoinAttribute.ts:203:18)
    at SelectQueryBuilder.join (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:2100:53)
    at SelectQueryBuilder.leftJoin (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:468:14)
    at EventsService.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:186:8)
    at EventsController.findAll (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:142:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] EntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3995:23
    at Array.forEach (<anonymous>)
    at SelectQueryBuilder.buildRelations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3987:32)
    at SelectQueryBuilder.applyFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3176:22)
    at SelectQueryBuilder.setFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:106:14)
    at EntityManager.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/entity-manager/EntityManager.ts:1225:14)
    at Repository.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/repository/Repository.ts:626:29)
    at EventsService.findOneByIdOrSlug (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:310:46)
    at EventsController.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:176:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] EntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3995:23
    at Array.forEach (<anonymous>)
    at SelectQueryBuilder.buildRelations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3987:32)
    at SelectQueryBuilder.applyFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3176:22)
    at SelectQueryBuilder.setFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:106:14)
    at EntityManager.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/entity-manager/EntityManager.ts:1225:14)
    at Repository.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/repository/Repository.ts:626:29)
    at EventsService.findOneByIdOrSlug (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:310:46)
    at EventsController.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.controller.ts:176:31)
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/node_modules/@nestjs/core/router/router-execution-context.js:38:29
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] EntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3995:23
    at Array.forEach (<anonymous>)
    at SelectQueryBuilder.buildRelations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3987:32)
    at SelectQueryBuilder.applyFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3176:22)
    at SelectQueryBuilder.setFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:106:14)
    at EntityManager.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/entity-manager/EntityManager.ts:1225:14)
    at Repository.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/repository/Repository.ts:626:29)
    at EventsService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:144:55)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
[Nest] 3757  - 12/11/2025, 12:04:05 AM   ERROR [ExceptionsHandler] EntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
    at /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3995:23
    at Array.forEach (<anonymous>)
    at SelectQueryBuilder.buildRelations (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3987:32)
    at SelectQueryBuilder.applyFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:3176:22)
    at SelectQueryBuilder.setFindOptions (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/query-builder/SelectQueryBuilder.ts:106:14)
    at EntityManager.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/entity-manager/EntityManager.ts:1225:14)
    at Repository.findOne (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/repository/Repository.ts:626:29)
    at EventsService.create (/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/src/events/events.service.ts:144:55)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
FAIL test/events/events.e2e-spec.ts (13.954 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔑 add access controls to secrets: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 38099, USERS_API_URL: http://localhost:38099/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN

    expected 201 "Created", got 500 "Internal Server Error"

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
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER

    expected 201 "Created", got 500 "Internal Server Error"

      173 |       )
      174 |         .send(createEventDto)
    > 175 |         .expect(201);
          |          ^
      176 |
      177 |       expect(response.body).toHaveProperty('id');
      178 |       expect(response.body).toHaveProperty('title', createEventDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:175:10)
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

      193 |       )
      194 |         .query({ page: 1, limit: 20 })
    > 195 |         .expect(200);
          |          ^
      196 |
      197 |       expect(response.body).toHaveProperty('data');
      198 |       expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (events/events.e2e-spec.ts:195:10)
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

      214 |       )
      215 |         .query({ eventType: EventType.MANUTENCAO, page: 1, limit: 20 })
    > 216 |         .expect(200);
          |          ^
      217 |
      218 |       expect(response.body.data).toBeDefined();
      219 |       if (response.body.data.length > 0) {

      at Object.<anonymous> (events/events.e2e-spec.ts:216:10)
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

      233 |       )
      234 |         .query({ state: EventState.DRAFT, page: 1, limit: 20 })
    > 235 |         .expect(200);
          |          ^
      236 |
      237 |       expect(response.body.data).toBeDefined();
      238 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:235:10)
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

      247 |       )
      248 |         .query({ visibility: EventVisibility.PUBLIC, page: 1, limit: 20 })
    > 249 |         .expect(200);
          |          ^
      250 |
      251 |       expect(response.body.data).toBeDefined();
      252 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:249:10)
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

      261 |       )
      262 |         .query({ q: 'Teste', page: 1, limit: 20 })
    > 263 |         .expect(200);
          |          ^
      264 |
      265 |       expect(response.body.data).toBeDefined();
      266 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:263:10)
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

      280 |       )
      281 |         .query({ from: from.toISOString(), to: to.toISOString(), page: 1, limit: 20 })
    > 282 |         .expect(200);
          |          ^
      283 |
      284 |       expect(response.body.data).toBeDefined();
      285 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:282:10)
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

      294 |         tokens,
      295 |         UserRole.ADMIN, // GET /events/:idOrSlug requer autenticação
    > 296 |       ).expect(200);
          |         ^
      297 |
      298 |       expect(response.body).toHaveProperty('id', eventId1);
      299 |       expect(response.body).toHaveProperty('title');

      at Object.<anonymous> (events/events.e2e-spec.ts:296:9)
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

      308 |         tokens,
      309 |         UserRole.ADMIN,
    > 310 |       ).expect(200);
          |         ^
      311 |
      312 |       expect(response.body).toHaveProperty('id', eventId1);
      313 |       expect(response.body).toHaveProperty('slug', eventSlug1);

      at Object.<anonymous> (events/events.e2e-spec.ts:310:9)
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

      330 |       )
      331 |         .send(updateDto)
    > 332 |         .expect(200);
          |          ^
      333 |
      334 |       expect(response.body).toHaveProperty('id', eventId1);
      335 |       expect(response.body).toHaveProperty('title', updateDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:332:10)
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

      350 |       )
      351 |         .send(updateDto)
    > 352 |         .expect(200);
          |          ^
      353 |
      354 |       expect(response.body).toHaveProperty('id', eventId2);
      355 |       expect(response.body).toHaveProperty('title', updateDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:352:10)
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

      381 |           state: EventState.DRAFT,
      382 |         })
    > 383 |         .expect(201);
          |          ^
      384 |
      385 |       const eventToPublishId = createResponse.body.id;
      386 |

      at Object.<anonymous> (events/events.e2e-spec.ts:383:10)
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

      426 |           state: EventState.DRAFT,
      427 |         })
    > 428 |         .expect(201);
          |          ^
      429 |
      430 |       const eventToPublishId = createResponse.body.id;
      431 |

      at Object.<anonymous> (events/events.e2e-spec.ts:428:10)
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

PASS test/users.e2e-spec.ts (13.963 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 34651, USERS_API_URL: http://localhost:34651/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

[Nest] 3758  - 12/11/2025, 12:04:19 AM   ERROR [ReportProcessor] Erro ao processar relatório c9c69a0b-d39c-4c7c-9124-3e005c5832fb (attempt 1):
No metadata for "Patrimonio" was found.
[Nest] 3757  - 12/11/2025, 12:04:19 AM   ERROR [ReportProcessor] Erro ao processar relatório 3922d3f7-d0de-4738-9410-62e2b97eeb29 (attempt 1):
Relation with property path patrimonio in entity was not found.
[Nest] 3764  - 12/11/2025, 12:04:19 AM   ERROR [ReportProcessor] Erro ao processar relatório 21e797f2-de4c-4bfd-89e9-d4619cc240c5 (attempt 1):
No metadata for "Patrimonio" was found.
[Nest] 3757  - 12/11/2025, 12:04:21 AM   ERROR [LoggingInterceptor] GET /v1/reports/21e797f2-de4c-4bfd-89e9-d4619cc240c5/download 500 - 14ms
[Nest] 3757  - 12/11/2025, 12:04:21 AM   ERROR [ReportProcessor] Erro ao processar relatório 41f1441c-b3ad-4d12-845b-cb4b2278e595 (attempt 1):
No metadata for "Patrimonio" was found.
[Nest] 3758  - 12/11/2025, 12:04:24 AM   ERROR [ReportProcessor] Erro ao processar relatório c9c69a0b-d39c-4c7c-9124-3e005c5832fb (attempt 1):
No metadata for "Patrimonio" was found.
[Nest] 3764  - 12/11/2025, 12:04:25 AM   ERROR [ReportProcessor] Erro ao processar relatório 21e797f2-de4c-4bfd-89e9-d4619cc240c5 (attempt 1):
No metadata for "Patrimonio" was found.
[Nest] 3757  - 12/11/2025, 12:04:26 AM   ERROR [ReportProcessor] Erro ao processar relatório 41f1441c-b3ad-4d12-845b-cb4b2278e595 (attempt 1):
No metadata for "Patrimonio" was found.
[Nest] 3757  - 12/11/2025, 12:04:31 AM   ERROR [LoggingInterceptor] GET /v1/reports/41f1441c-b3ad-4d12-845b-cb4b2278e595/download 500 - 15ms
PASS test/reports-metrics/reports-metrics.e2e-spec.ts (13.942 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ✅ audit secrets and track compliance: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:21e797f2-de4c-4bfd-89e9-d4619cc240c5","job:21e797f2-de4c-4bfd-89e9-d4619cc240c5"],"jobId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","model":"patrimonio","requestId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:19.559Z","type":"csv"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:21e797f2-de4c-4bfd-89e9-d4619cc240c5","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":20,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:19.584Z","type":"csv","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      [setupTestUsers] ✅ Porta detectada: 38553, USERS_API_URL: http://localhost:38553/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:21e797f2-de4c-4bfd-89e9-d4619cc240c5","job:21e797f2-de4c-4bfd-89e9-d4619cc240c5"],"jobId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","model":"patrimonio","requestId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:24.753Z","type":"csv"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:21e797f2-de4c-4bfd-89e9-d4619cc240c5","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":271,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:25.026Z","type":"csv","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

PASS test/reports/reports.e2e-spec.ts (25.67 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 34563, USERS_API_URL: http://localhost:34563/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      info: Solicitação de relatório criada {"correlationIds":["request:c9c69a0b-d39c-4c7c-9124-3e005c5832fb","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"model":"patrimonio","requestId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:04:19.430Z","type":"csv","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Solicitação de relatório criada {"correlationIds":["request:3922d3f7-d0de-4738-9410-62e2b97eeb29","user:7e3e904e-b93b-4e3e-a309-e693c38ee8f3"],"model":"manutencao","requestId":"3922d3f7-d0de-4738-9410-62e2b97eeb29","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:04:19.459Z","type":"pdf","userId":"7e3e904e-b93b-4e3e-a309-e693c38ee8f3"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:3922d3f7-d0de-4738-9410-62e2b97eeb29","job:3922d3f7-d0de-4738-9410-62e2b97eeb29"],"jobId":"3922d3f7-d0de-4738-9410-62e2b97eeb29","model":"manutencao","requestId":"3922d3f7-d0de-4738-9410-62e2b97eeb29","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:19.466Z","type":"pdf"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:3922d3f7-d0de-4738-9410-62e2b97eeb29","user:7e3e904e-b93b-4e3e-a309-e693c38ee8f3"],"durationMs":16,"error":"Relation with property path patrimonio in entity was not found.","model":"manutencao","requestId":"3922d3f7-d0de-4738-9410-62e2b97eeb29","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:19.484Z","type":"pdf","userId":"7e3e904e-b93b-4e3e-a309-e693c38ee8f3"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Solicitação de relatório criada {"correlationIds":["request:21e797f2-de4c-4bfd-89e9-d4619cc240c5","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"model":"patrimonio","requestId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:04:19.555Z","type":"csv","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:21e797f2-de4c-4bfd-89e9-d4619cc240c5","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":5,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:21.571Z","type":"csv","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Solicitação de relatório criada {"correlationIds":["request:41f1441c-b3ad-4d12-845b-cb4b2278e595","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"model":"patrimonio","requestId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:04:21.584Z","type":"pdf","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:41f1441c-b3ad-4d12-845b-cb4b2278e595","job:41f1441c-b3ad-4d12-845b-cb4b2278e595"],"jobId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","model":"patrimonio","requestId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:21.587Z","type":"pdf"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:41f1441c-b3ad-4d12-845b-cb4b2278e595","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":6,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:21.593Z","type":"pdf","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:41f1441c-b3ad-4d12-845b-cb4b2278e595","job:41f1441c-b3ad-4d12-845b-cb4b2278e595"],"jobId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","model":"patrimonio","requestId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:26.611Z","type":"pdf"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:41f1441c-b3ad-4d12-845b-cb4b2278e595","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":8,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:26.620Z","type":"pdf","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:41f1441c-b3ad-4d12-845b-cb4b2278e595","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":6,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:31.608Z","type":"pdf","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

[Nest] 3758  - 12/11/2025, 12:04:39 AM   ERROR [ReportProcessor] Erro ao processar relatório c9c69a0b-d39c-4c7c-9124-3e005c5832fb (attempt 1):
Solicitação c9c69a0b-d39c-4c7c-9124-3e005c5832fb não encontrada
[Nest] 3764  - 12/11/2025, 12:04:40 AM   ERROR [ReportProcessor] Erro ao processar relatório 21e797f2-de4c-4bfd-89e9-d4619cc240c5 (attempt 1):
Solicitação 21e797f2-de4c-4bfd-89e9-d4619cc240c5 não encontrada
[Nest] 3757  - 12/11/2025, 12:04:41 AM   ERROR [ReportProcessor] Erro ao processar relatório 41f1441c-b3ad-4d12-845b-cb4b2278e595 (attempt 1):
Solicitação 41f1441c-b3ad-4d12-845b-cb4b2278e595 não encontrada
PASS test/categorias/categorias.e2e-spec.ts (14.027 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  enable debug logging with { debug: true }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 34549, USERS_API_URL: http://localhost:34549/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:21e797f2-de4c-4bfd-89e9-d4619cc240c5","job:21e797f2-de4c-4bfd-89e9-d4619cc240c5"],"jobId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","model":"patrimonio","requestId":"21e797f2-de4c-4bfd-89e9-d4619cc240c5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:40.035Z","type":"csv"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

PASS test/audit/audit.e2e-spec.ts (14.268 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 38557, USERS_API_URL: http://localhost:38557/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:41f1441c-b3ad-4d12-845b-cb4b2278e595","job:41f1441c-b3ad-4d12-845b-cb4b2278e595"],"jobId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","model":"patrimonio","requestId":"41f1441c-b3ad-4d12-845b-cb4b2278e595","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:41.630Z","type":"pdf"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

PASS test/enums/enums.e2e-spec.ts
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  suppress all logs with { quiet: true }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

PASS test/metrics/metrics.e2e-spec.ts
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`

      at _log (../node_modules/dotenv/lib/main.js:142:11)

[Nest] 3758  - 12/11/2025, 12:04:55 AM   ERROR [JwtAuthGuard] Token inválido:
[Nest] 3758  - 12/11/2025, 12:04:55 AM   ERROR [JwtAuthGuard] jwt malformed
[Nest] 3758  - 12/11/2025, 12:04:55 AM   ERROR [JwtAuthGuard] JsonWebTokenError {
  name: 'JsonWebTokenError',
  message: 'jwt malformed'
}
[Nest] 3758  - 12/11/2025, 12:04:55 AM   ERROR [JwtAuthGuard] Token inválido:
[Nest] 3758  - 12/11/2025, 12:04:55 AM   ERROR [JwtAuthGuard] invalid signature
[Nest] 3758  - 12/11/2025, 12:04:55 AM   ERROR [JwtAuthGuard] JsonWebTokenError {
  name: 'JsonWebTokenError',
  message: 'invalid signature'
}
PASS test/app.e2e-spec.ts
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild

      at _log (../node_modules/dotenv/lib/main.js:142:11)

PASS test/cache/cache.e2e-spec.ts (14.341 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 46775, USERS_API_URL: http://localhost:46775/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

FAIL test/auth/auth.e2e-spec.ts (184.863 s)
  ● Console

    console.log
      [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  suppress all logs with { quiet: true }

      at _log (../node_modules/dotenv/lib/main.js:142:11)

    console.log
      [setupTestUsers] ✅ Porta detectada: 46453, USERS_API_URL: http://localhost:46453/v1

      at setupTestUsers (helpers/auth-helper.ts:449:13)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:c9c69a0b-d39c-4c7c-9124-3e005c5832fb","job:c9c69a0b-d39c-4c7c-9124-3e005c5832fb"],"jobId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","model":"patrimonio","requestId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:19.441Z","type":"csv"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:c9c69a0b-d39c-4c7c-9124-3e005c5832fb","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":27,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:19.480Z","type":"csv","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:c9c69a0b-d39c-4c7c-9124-3e005c5832fb","job:c9c69a0b-d39c-4c7c-9124-3e005c5832fb"],"jobId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","model":"patrimonio","requestId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:24.523Z","type":"csv"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      error: Falha ao processar relatório {"correlationIds":["request:c9c69a0b-d39c-4c7c-9124-3e005c5832fb","user:5c276a75-9420-41d0-ba97-008f67285fbc"],"durationMs":16,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:04:24.540Z","type":"csv","userId":"5c276a75-9420-41d0-ba97-008f67285fbc"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

    console.log
      info: Processando relatório da fila {"attempt":1,"correlationIds":["request:c9c69a0b-d39c-4c7c-9124-3e005c5832fb","job:c9c69a0b-d39c-4c7c-9124-3e005c5832fb"],"jobId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","model":"patrimonio","requestId":"c9c69a0b-d39c-4c7c-9124-3e005c5832fb","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:04:39.548Z","type":"csv"}

      at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)

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

Summary of all failing tests
FAIL patrimonio/patrimonio-completo.e2e-spec.ts (35.544 s)
  ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio - Listar patrimônios › deve listar patrimônios com paginação

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

    expected 200 "OK", got 401 "Unauthorized"

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

  ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (ADMIN)

    expect(received).toContain(expected) // indexOf

    Expected value: 404
    Received array: [200, 201]

      2097 |
      2098 |         // A transferência pode retornar 200 ou 201
    > 2099 |         expect([200, 201]).toContain(response.status);
           |                            ^
      2100 |         expect(response.body).toHaveProperty('responsavelId');
      2101 |         expect(response.body.responsavelId).toBe(destinoResponsavelId);
      2102 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2099:28)

  ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (MANAGER)

    expect(received).toContain(expected) // indexOf

    Expected value: 404
    Received array: [200, 201]

      2156 |
      2157 |         // A transferência pode retornar 200 ou 201
    > 2158 |         expect([200, 201]).toContain(response.status);
           |                            ^
      2159 |         expect(response.body).toHaveProperty('responsavelId');
      2160 |         expect(response.body.responsavelId).toBe(destinoResponsavelId);
      2161 |       });

      at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2158:28)

FAIL patrimonio/endpoints-faltantes.e2e-spec.ts (38.653 s)
  ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/responsavel/:responsavelId › deve retornar estatísticas do responsável

    Expected 200, 201, or 400, got 404

      529 |         )
      530 |           .send({ novoResponsavelId: responsavelId })
    > 531 |           .expect((res) => {
          |            ^
      532 |             if (res.status !== 200 && res.status !== 201 && res.status !== 400) {
      533 |               throw new Error(`Expected 200, 201, or 400, got ${res.status}`);
      534 |             }

      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:531:12)
      ----
      at patrimonio/endpoints-faltantes.e2e-spec.ts:533:21
      at ../node_modules/supertest/lib/test.js:365:13
      at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
      at Test.assert (../node_modules/supertest/lib/test.js:195:23)
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 2: Estatísticas Avançadas › GET /v1/patrimonio/stats/responsavel/:responsavelId › deve retornar estatísticas vazias para responsável sem patrimônios

    expected 200 "OK", got 404 "Not Found"

      580 |           UserRole.ADMIN
      581 |         )
    > 582 |           .expect(200);
          |            ^
      583 |
      584 |         // Pode ter 0 ou mais dependendo dos dados de teste
      585 |         expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:582:12)
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

FAIL events/events.e2e-spec.ts (13.954 s)
  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN

    expected 201 "Created", got 500 "Internal Server Error"

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
      at localAssert (../node_modules/supertest/lib/test.js:138:14)
      at ../node_modules/supertest/lib/test.js:156:7
      at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
      at callback (../node_modules/superagent/src/node/index.js:1183:18)
      at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)

  ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER

    expected 201 "Created", got 500 "Internal Server Error"

      173 |       )
      174 |         .send(createEventDto)
    > 175 |         .expect(201);
          |          ^
      176 |
      177 |       expect(response.body).toHaveProperty('id');
      178 |       expect(response.body).toHaveProperty('title', createEventDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:175:10)
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

      193 |       )
      194 |         .query({ page: 1, limit: 20 })
    > 195 |         .expect(200);
          |          ^
      196 |
      197 |       expect(response.body).toHaveProperty('data');
      198 |       expect(response.body).toHaveProperty('total');

      at Object.<anonymous> (events/events.e2e-spec.ts:195:10)
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

      214 |       )
      215 |         .query({ eventType: EventType.MANUTENCAO, page: 1, limit: 20 })
    > 216 |         .expect(200);
          |          ^
      217 |
      218 |       expect(response.body.data).toBeDefined();
      219 |       if (response.body.data.length > 0) {

      at Object.<anonymous> (events/events.e2e-spec.ts:216:10)
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

      233 |       )
      234 |         .query({ state: EventState.DRAFT, page: 1, limit: 20 })
    > 235 |         .expect(200);
          |          ^
      236 |
      237 |       expect(response.body.data).toBeDefined();
      238 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:235:10)
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

      247 |       )
      248 |         .query({ visibility: EventVisibility.PUBLIC, page: 1, limit: 20 })
    > 249 |         .expect(200);
          |          ^
      250 |
      251 |       expect(response.body.data).toBeDefined();
      252 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:249:10)
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

      261 |       )
      262 |         .query({ q: 'Teste', page: 1, limit: 20 })
    > 263 |         .expect(200);
          |          ^
      264 |
      265 |       expect(response.body.data).toBeDefined();
      266 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:263:10)
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

      280 |       )
      281 |         .query({ from: from.toISOString(), to: to.toISOString(), page: 1, limit: 20 })
    > 282 |         .expect(200);
          |          ^
      283 |
      284 |       expect(response.body.data).toBeDefined();
      285 |     });

      at Object.<anonymous> (events/events.e2e-spec.ts:282:10)
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

      294 |         tokens,
      295 |         UserRole.ADMIN, // GET /events/:idOrSlug requer autenticação
    > 296 |       ).expect(200);
          |         ^
      297 |
      298 |       expect(response.body).toHaveProperty('id', eventId1);
      299 |       expect(response.body).toHaveProperty('title');

      at Object.<anonymous> (events/events.e2e-spec.ts:296:9)
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

      308 |         tokens,
      309 |         UserRole.ADMIN,
    > 310 |       ).expect(200);
          |         ^
      311 |
      312 |       expect(response.body).toHaveProperty('id', eventId1);
      313 |       expect(response.body).toHaveProperty('slug', eventSlug1);

      at Object.<anonymous> (events/events.e2e-spec.ts:310:9)
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

      330 |       )
      331 |         .send(updateDto)
    > 332 |         .expect(200);
          |          ^
      333 |
      334 |       expect(response.body).toHaveProperty('id', eventId1);
      335 |       expect(response.body).toHaveProperty('title', updateDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:332:10)
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

      350 |       )
      351 |         .send(updateDto)
    > 352 |         .expect(200);
          |          ^
      353 |
      354 |       expect(response.body).toHaveProperty('id', eventId2);
      355 |       expect(response.body).toHaveProperty('title', updateDto.title);

      at Object.<anonymous> (events/events.e2e-spec.ts:352:10)
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

      381 |           state: EventState.DRAFT,
      382 |         })
    > 383 |         .expect(201);
          |          ^
      384 |
      385 |       const eventToPublishId = createResponse.body.id;
      386 |

      at Object.<anonymous> (events/events.e2e-spec.ts:383:10)
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

      426 |           state: EventState.DRAFT,
      427 |         })
    > 428 |         .expect(201);
          |          ^
      429 |
      430 |       const eventToPublishId = createResponse.body.id;
      431 |

      at Object.<anonymous> (events/events.e2e-spec.ts:428:10)
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

FAIL auth/auth.e2e-spec.ts (184.863 s)
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


Test Suites: 4 failed, 17 passed, 21 total
Tests:       30 failed, 424 passed, 454 total
Snapshots:   0 total
Time:        224.268 s
Ran all test suites.
Error: Process completed with exit code 1.
0s
