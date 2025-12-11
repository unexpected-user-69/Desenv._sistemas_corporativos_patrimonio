
2025-12-11T00:26:17.9893853Z 
2025-12-11T00:26:17.9894429Z > patrimonio_inventario@0.0.1 test:e2e
2025-12-11T00:26:17.9895120Z > jest --config ./test/jest-e2e.json
2025-12-11T00:26:17.9895690Z 
2025-12-11T00:26:54.4378466Z PASS test/maintenance/maintenance.e2e-spec.ts (35.44 s)
2025-12-11T00:26:54.4570303Z   ● Console
2025-12-11T00:26:54.4570864Z 
2025-12-11T00:26:54.4571005Z     console.log
2025-12-11T00:26:54.4573999Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 📡 add observability to secrets: https://dotenvx.com/ops
2025-12-11T00:26:54.4574580Z 
2025-12-11T00:26:54.4574834Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:26:54.4575138Z 
2025-12-11T00:26:54.4575254Z     console.log
2025-12-11T00:26:54.4575981Z       [setupTestUsers] ✅ Porta detectada: 38155, USERS_API_URL: http://localhost:38155/v1
2025-12-11T00:26:54.4576488Z 
2025-12-11T00:26:54.4576952Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:26:54.4578831Z 
2025-12-11T00:26:54.4579125Z     console.log
2025-12-11T00:26:54.4580991Z       ✅ Patrimônio criado com sucesso: ccc19a87-3158-4856-b562-d9f74f892d55
2025-12-11T00:26:54.4581798Z 
2025-12-11T00:26:54.4583484Z       at createTestPatrimonio (maintenance/maintenance.e2e-spec.ts:1237:13)
2025-12-11T00:26:54.4584120Z 
2025-12-11T00:26:54.4585339Z     console.log
2025-12-11T00:26:54.4586790Z       ✅ Verificação pós-criação: {
2025-12-11T00:26:54.4587309Z         id: 'ccc19a87-3158-4856-b562-d9f74f892d55',
2025-12-11T00:26:54.4587812Z         codigo: 'TEST-MAINT-001',
2025-12-11T00:26:54.4588382Z         nome: 'Patrimônio Teste Manutenção'
2025-12-11T00:26:54.4588778Z       }
2025-12-11T00:26:54.4588926Z 
2025-12-11T00:26:54.4589293Z       at createTestPatrimonio (maintenance/maintenance.e2e-spec.ts:1249:13)
2025-12-11T00:26:54.4589752Z 
2025-12-11T00:26:54.4589879Z     console.log
2025-12-11T00:26:54.4590603Z       ✅ Patrimônio de teste criado/encontrado: ccc19a87-3158-4856-b562-d9f74f892d55
2025-12-11T00:26:54.4591068Z 
2025-12-11T00:26:54.4591402Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:65:13)
2025-12-11T00:26:54.4592107Z 
2025-12-11T00:26:54.4592229Z     console.log
2025-12-11T00:26:54.4592741Z       ✅ Verificação do patrimônio: [
2025-12-11T00:26:54.4593158Z         {
2025-12-11T00:26:54.4593551Z           id: 'ccc19a87-3158-4856-b562-d9f74f892d55',
2025-12-11T00:26:54.4594032Z           codigo: 'TEST-MAINT-001',
2025-12-11T00:26:54.4594599Z           nome: 'Patrimônio Teste Manutenção'
2025-12-11T00:26:54.4595035Z         }
2025-12-11T00:26:54.4595298Z       ]
2025-12-11T00:26:54.4595460Z 
2025-12-11T00:26:54.4595825Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:72:13)
2025-12-11T00:26:54.4596259Z 
2025-12-11T00:26:54.4596382Z     console.log
2025-12-11T00:26:54.4597213Z       🔍 Testando criação de plano com categoriaId: 073906ff-8ecf-4734-8542-a152120ec905
2025-12-11T00:26:54.4597689Z 
2025-12-11T00:26:54.4598024Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:667:15)
2025-12-11T00:26:54.4598420Z 
2025-12-11T00:26:54.4598540Z     console.log
2025-12-11T00:26:54.4598890Z       🔍 DTO completo: {
2025-12-11T00:26:54.4599685Z         "categoriaId": "073906ff-8ecf-4734-8542-a152120ec905",
2025-12-11T00:26:54.4600218Z         "periodicidade": "mensal",
2025-12-11T00:26:54.4600690Z         "proximaExecucao": "2026-01-10T00:26:52.257Z"
2025-12-11T00:26:54.4601122Z       }
2025-12-11T00:26:54.4601263Z 
2025-12-11T00:26:54.4601593Z       at Object.<anonymous> (maintenance/maintenance.e2e-spec.ts:668:15)
2025-12-11T00:26:54.4602213Z 
2025-12-11T00:26:54.9679416Z FAIL test/patrimonio/patrimonio-completo.e2e-spec.ts (35.948 s)
2025-12-11T00:26:55.0943526Z   ● Console
2025-12-11T00:26:55.0945096Z 
2025-12-11T00:26:55.0946642Z     console.log
2025-12-11T00:26:55.0947752Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  override existing env vars with { override: true }
2025-12-11T00:26:55.0948346Z 
2025-12-11T00:26:55.0948610Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:26:55.0948971Z 
2025-12-11T00:26:55.0949096Z     console.log
2025-12-11T00:26:55.0949942Z       [setupTestUsers] ✅ Porta detectada: 33553, USERS_API_URL: http://localhost:33553/v1
2025-12-11T00:26:55.0950493Z 
2025-12-11T00:26:55.0950761Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:26:55.0951452Z 
2025-12-11T00:26:55.0951572Z     console.warn
2025-12-11T00:26:55.0952961Z       Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.jpg
2025-12-11T00:26:55.0953776Z 
2025-12-11T00:26:55.0954262Z     [0m [90m 1671 |[39m         [90m// Verificar se o arquivo existe[39m
2025-12-11T00:26:55.0955287Z      [90m 1672 |[39m         [36mif[39m ([33m![39mfs[33m.[39mexistsSync(fotoPath)) {
2025-12-11T00:26:55.0956637Z     [31m[1m>[22m[39m[90m 1673 |[39m           console[33m.[39mwarn([32m`Arquivo de teste não encontrado: ${fotoPath}`[39m)[33m;[39m
2025-12-11T00:26:55.0957692Z      [90m      |[39m                   [31m[1m^[22m[39m
2025-12-11T00:26:55.0958388Z      [90m 1674 |[39m           [36mreturn[39m[33m;[39m
2025-12-11T00:26:55.0959004Z      [90m 1675 |[39m         }
2025-12-11T00:26:55.0959460Z      [90m 1676 |[39m[0m
2025-12-11T00:26:55.0959708Z 
2025-12-11T00:26:55.0960155Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1673:19)
2025-12-11T00:26:55.0960712Z 
2025-12-11T00:26:55.0960843Z     console.warn
2025-12-11T00:26:55.0962227Z       Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.png
2025-12-11T00:26:55.0963015Z 
2025-12-11T00:26:55.0963607Z     [0m [90m 1701 |[39m         [90m// Verificar se o arquivo existe[39m
2025-12-11T00:26:55.0964496Z      [90m 1702 |[39m         [36mif[39m ([33m![39mfs[33m.[39mexistsSync(fotoPath)) {
2025-12-11T00:26:55.0965815Z     [31m[1m>[22m[39m[90m 1703 |[39m           console[33m.[39mwarn([32m`Arquivo de teste não encontrado: ${fotoPath}`[39m)[33m;[39m
2025-12-11T00:26:55.0966832Z      [90m      |[39m                   [31m[1m^[22m[39m
2025-12-11T00:26:55.0967498Z      [90m 1704 |[39m           [36mreturn[39m[33m;[39m
2025-12-11T00:26:55.0968062Z      [90m 1705 |[39m         }
2025-12-11T00:26:55.0968488Z      [90m 1706 |[39m[0m
2025-12-11T00:26:55.0968722Z 
2025-12-11T00:26:55.0969148Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1703:19)
2025-12-11T00:26:55.0969646Z 
2025-12-11T00:26:55.0969766Z     console.warn
2025-12-11T00:26:55.0970935Z       Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.webp
2025-12-11T00:26:55.0972125Z 
2025-12-11T00:26:55.0972560Z     [0m [90m 1752 |[39m         [90m// Verificar se o arquivo existe[39m
2025-12-11T00:26:55.0973435Z      [90m 1753 |[39m         [36mif[39m ([33m![39mfs[33m.[39mexistsSync(fotoPath)) {
2025-12-11T00:26:55.0974663Z     [31m[1m>[22m[39m[90m 1754 |[39m           console[33m.[39mwarn([32m`Arquivo de teste não encontrado: ${fotoPath}`[39m)[33m;[39m
2025-12-11T00:26:55.0975930Z      [90m      |[39m                   [31m[1m^[22m[39m
2025-12-11T00:26:55.0976610Z      [90m 1755 |[39m           [36mreturn[39m[33m;[39m
2025-12-11T00:26:55.0977183Z      [90m 1756 |[39m         }
2025-12-11T00:26:55.0977631Z      [90m 1757 |[39m[0m
2025-12-11T00:26:55.0977857Z 
2025-12-11T00:26:55.0978305Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1754:19)
2025-12-11T00:26:55.0978819Z 
2025-12-11T00:26:55.0978943Z     console.warn
2025-12-11T00:26:55.0980072Z       Arquivo de teste não encontrado: /home/runner/work/Desenv._sistemas_corporativos_patrimonio/E2e_Faltantes/foto_para_teste.jpg
2025-12-11T00:26:55.0980871Z 
2025-12-11T00:26:55.0981118Z     [0m [90m 1806 |[39m         
2025-12-11T00:26:55.0982196Z      [90m 1807 |[39m         [36mif[39m ([33m![39mfs[33m.[39mexistsSync(fotoPath)) {
2025-12-11T00:26:55.0983487Z     [31m[1m>[22m[39m[90m 1808 |[39m           console[33m.[39mwarn([32m`Arquivo de teste não encontrado: ${fotoPath}`[39m)[33m;[39m
2025-12-11T00:26:55.0984537Z      [90m      |[39m                   [31m[1m^[22m[39m
2025-12-11T00:26:55.0985235Z      [90m 1809 |[39m           [36mreturn[39m[33m;[39m
2025-12-11T00:26:55.0986169Z      [90m 1810 |[39m         }
2025-12-11T00:26:55.0986661Z      [90m 1811 |[39m[0m
2025-12-11T00:26:55.0986896Z 
2025-12-11T00:26:55.0987339Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1808:19)
2025-12-11T00:26:55.0987862Z 
2025-12-11T00:26:55.0988901Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › POST /v1/patrimonio - Criar patrimônio › deve criar patrimônio com sucesso (ADMIN)
2025-12-11T00:26:55.0989733Z 
2025-12-11T00:26:55.0989941Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.0990243Z 
2025-12-11T00:26:55.0990533Z     [0m [90m 180 |[39m         )
2025-12-11T00:26:55.0991141Z      [90m 181 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.0992330Z     [31m[1m>[22m[39m[90m 182 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.0993094Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.0994015Z      [90m 183 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.0995675Z      [90m 184 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.0997503Z      [90m 185 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.0998206Z 
2025-12-11T00:26:55.0998663Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:182:12)
2025-12-11T00:26:55.0999306Z       ----
2025-12-11T00:26:55.0999730Z       at patrimonio/patrimonio-completo.e2e-spec.ts:185:21
2025-12-11T00:26:55.1000393Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1001092Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1002094Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1002842Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1003498Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1004221Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1005046Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1005938Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1006496Z 
2025-12-11T00:26:55.1007589Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › POST /v1/patrimonio - Criar patrimônio › deve criar patrimônio com sucesso (MANAGER)
2025-12-11T00:26:55.1008453Z 
2025-12-11T00:26:55.1008662Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1008958Z 
2025-12-11T00:26:55.1009468Z     [0m [90m 215 |[39m         )
2025-12-11T00:26:55.1010073Z      [90m 216 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.1010959Z     [31m[1m>[22m[39m[90m 217 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1012134Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1013084Z      [90m 218 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1014878Z      [90m 219 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1016725Z      [90m 220 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1017430Z 
2025-12-11T00:26:55.1017864Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:217:12)
2025-12-11T00:26:55.1018540Z       ----
2025-12-11T00:26:55.1019031Z       at patrimonio/patrimonio-completo.e2e-spec.ts:220:21
2025-12-11T00:26:55.1020018Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1020770Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1021591Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1023047Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1023753Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1024526Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1025397Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1026306Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1026849Z 
2025-12-11T00:26:55.1028274Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio/:id - Buscar por ID › deve buscar patrimônio por ID
2025-12-11T00:26:55.1029055Z 
2025-12-11T00:26:55.1029294Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:26:55.1029550Z 
2025-12-11T00:26:55.1030205Z     [0m [90m 305 |[39m         [36mconst[39m response [33m=[39m [36mawait[39m request(httpServer)
2025-12-11T00:26:55.1031343Z      [90m 306 |[39m           [33m.[39m[36mget[39m([32m`/v1/patrimonio/${patrimonio1Id}`[39m)
2025-12-11T00:26:55.1032595Z     [31m[1m>[22m[39m[90m 307 |[39m           [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:26:55.1033380Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1033903Z      [90m 308 |[39m
2025-12-11T00:26:55.1034840Z      [90m 309 |[39m         expect(response[33m.[39mbody[33m.[39mid)[33m.[39mtoBe(patrimonio1Id)[33m;[39m
2025-12-11T00:26:55.1036250Z      [90m 310 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'codigo'[39m)[33m;[39m[0m
2025-12-11T00:26:55.1036901Z 
2025-12-11T00:26:55.1037375Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:307:12)
2025-12-11T00:26:55.1038063Z       ----
2025-12-11T00:26:55.1038630Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:55.1039340Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1040069Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1040867Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1041802Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1042470Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1043144Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1043861Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1044860Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1045362Z 
2025-12-11T00:26:55.1046493Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › PATCH /v1/patrimonio/:id - Atualizar patrimônio › deve atualizar patrimônio com sucesso (ADMIN)
2025-12-11T00:26:55.1047381Z 
2025-12-11T00:26:55.1047575Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1047841Z 
2025-12-11T00:26:55.1048122Z     [0m [90m 331 |[39m         )
2025-12-11T00:26:55.1048767Z      [90m 332 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:26:55.1049642Z     [31m[1m>[22m[39m[90m 333 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1050430Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1051355Z      [90m 334 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1055463Z      [90m 335 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1058998Z      [90m 336 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1059720Z 
2025-12-11T00:26:55.1060177Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:333:12)
2025-12-11T00:26:55.1063865Z       ----
2025-12-11T00:26:55.1064352Z       at patrimonio/patrimonio-completo.e2e-spec.ts:336:21
2025-12-11T00:26:55.1064952Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1065634Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1066428Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1067135Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1067804Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1068559Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1069397Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1070243Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1072471Z 
2025-12-11T00:26:55.1075520Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › PATCH /v1/patrimonio/:id - Atualizar patrimônio › deve atualizar patrimônio com sucesso (MANAGER)
2025-12-11T00:26:55.1077209Z 
2025-12-11T00:26:55.1077404Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1078504Z 
2025-12-11T00:26:55.1078762Z     [0m [90m 356 |[39m         )
2025-12-11T00:26:55.1079588Z      [90m 357 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:26:55.1084180Z     [31m[1m>[22m[39m[90m 358 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1085014Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1085938Z      [90m 359 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1087548Z      [90m 360 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1089218Z      [90m 361 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1089935Z 
2025-12-11T00:26:55.1090405Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:358:12)
2025-12-11T00:26:55.1091050Z       ----
2025-12-11T00:26:55.1091541Z       at patrimonio/patrimonio-completo.e2e-spec.ts:361:21
2025-12-11T00:26:55.1097140Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1103474Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1122952Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1125423Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1131082Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1132218Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1133091Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1134026Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1134609Z 
2025-12-11T00:26:55.1135779Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › DELETE /v1/patrimonio/:id - Deletar patrimônio › deve deletar patrimônio com sucesso (ADMIN)
2025-12-11T00:26:55.1137489Z 
2025-12-11T00:26:55.1137750Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1138052Z 
2025-12-11T00:26:55.1138613Z     [0m [90m 383 |[39m         )
2025-12-11T00:26:55.1139264Z      [90m 384 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.1141038Z     [31m[1m>[22m[39m[90m 385 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1142663Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1143562Z      [90m 386 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1145155Z      [90m 387 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1147060Z      [90m 388 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1148341Z 
2025-12-11T00:26:55.1149203Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:385:12)
2025-12-11T00:26:55.1150128Z       ----
2025-12-11T00:26:55.1150624Z       at patrimonio/patrimonio-completo.e2e-spec.ts:388:21
2025-12-11T00:26:55.1151292Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1152297Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1153111Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1153851Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1154515Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1155270Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1156104Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1157000Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1157536Z 
2025-12-11T00:26:55.1158587Z   ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/codigo/:codigo › deve buscar patrimônio por código
2025-12-11T00:26:55.1159355Z 
2025-12-11T00:26:55.1159546Z     expected 200 "OK", got 404 "Not Found"
2025-12-11T00:26:55.1159812Z 
2025-12-11T00:26:55.1160379Z     [0m [90m 414 |[39m         [36mconst[39m response [33m=[39m [36mawait[39m request(httpServer)
2025-12-11T00:26:55.1161573Z      [90m 415 |[39m           [33m.[39m[36mget[39m([32m`/v1/patrimonio/codigo/${patrimonio1Codigo}`[39m)
2025-12-11T00:26:55.1162894Z     [31m[1m>[22m[39m[90m 416 |[39m           [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:26:55.1163696Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1164248Z      [90m 417 |[39m
2025-12-11T00:26:55.1165153Z      [90m 418 |[39m         expect(response[33m.[39mbody[33m.[39mcodigo)[33m.[39mtoBe(patrimonio1Codigo)[33m;[39m
2025-12-11T00:26:55.1166018Z      [90m 419 |[39m         [0m
2025-12-11T00:26:55.1166290Z 
2025-12-11T00:26:55.1166994Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:416:12)
2025-12-11T00:26:55.1167659Z       ----
2025-12-11T00:26:55.1168231Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:55.1168941Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1169671Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1170470Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1171496Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1172356Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1173112Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1173954Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1174750Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1175232Z 
2025-12-11T00:26:55.1176480Z   ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/numero-serie/:numeroSerie › deve buscar patrimônio por número de série (ADMIN)
2025-12-11T00:26:55.1177790Z 
2025-12-11T00:26:55.1178016Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1178319Z 
2025-12-11T00:26:55.1178614Z     [0m [90m 488 |[39m         )
2025-12-11T00:26:55.1179242Z      [90m 489 |[39m           [33m.[39msend({ numeroSerie })
2025-12-11T00:26:55.1180154Z     [31m[1m>[22m[39m[90m 490 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1180917Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1182184Z      [90m 491 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1183959Z      [90m 492 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1185674Z      [90m 493 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1186375Z 
2025-12-11T00:26:55.1186840Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:490:12)
2025-12-11T00:26:55.1187524Z       ----
2025-12-11T00:26:55.1188030Z       at patrimonio/patrimonio-completo.e2e-spec.ts:493:21
2025-12-11T00:26:55.1188704Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1195514Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1196435Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1197233Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1197930Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1198740Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1199596Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1200547Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1201092Z 
2025-12-11T00:26:55.1202428Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio (ADMIN)
2025-12-11T00:26:55.1203274Z 
2025-12-11T00:26:55.1203504Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1203815Z 
2025-12-11T00:26:55.1204124Z     [0m [90m 628 |[39m         )
2025-12-11T00:26:55.1204802Z      [90m 629 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:26:55.1205672Z     [31m[1m>[22m[39m[90m 630 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1206525Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1207743Z      [90m 631 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1209583Z      [90m 632 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1211454Z      [90m 633 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1212401Z 
2025-12-11T00:26:55.1212876Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:630:12)
2025-12-11T00:26:55.1213559Z       ----
2025-12-11T00:26:55.1214057Z       at patrimonio/patrimonio-completo.e2e-spec.ts:633:21
2025-12-11T00:26:55.1214731Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1215507Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1216485Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1217231Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1218201Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1218949Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1219804Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1220726Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1221280Z 
2025-12-11T00:26:55.1222794Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio (MANAGER)
2025-12-11T00:26:55.1223671Z 
2025-12-11T00:26:55.1223894Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1224201Z 
2025-12-11T00:26:55.1224511Z     [0m [90m 651 |[39m         )
2025-12-11T00:26:55.1225184Z      [90m 652 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:26:55.1226064Z     [31m[1m>[22m[39m[90m 653 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1226876Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1227792Z      [90m 654 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1229577Z      [90m 655 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1242558Z      [90m 656 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1243575Z 
2025-12-11T00:26:55.1244081Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:653:12)
2025-12-11T00:26:55.1244759Z       ----
2025-12-11T00:26:55.1245279Z       at patrimonio/patrimonio-completo.e2e-spec.ts:656:21
2025-12-11T00:26:55.1245939Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1246777Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1248109Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1248978Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1249788Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1250817Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1252156Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1269306Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1269879Z 
2025-12-11T00:26:55.1270884Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve ativar patrimônio (ADMIN)
2025-12-11T00:26:55.1272144Z 
2025-12-11T00:26:55.1272391Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1272705Z 
2025-12-11T00:26:55.1273012Z     [0m [90m 673 |[39m         )
2025-12-11T00:26:55.1274079Z      [90m 674 |[39m           [33m.[39msend({ status[33m:[39m [33mPatrimonioStatus[39m[33m.[39m[33mINATIVO[39m })
2025-12-11T00:26:55.1275253Z     [31m[1m>[22m[39m[90m 675 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1276045Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1276996Z      [90m 676 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1278772Z      [90m 677 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1280643Z      [90m 678 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1281372Z 
2025-12-11T00:26:55.1282053Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:675:12)
2025-12-11T00:26:55.1283005Z       ----
2025-12-11T00:26:55.1283490Z       at patrimonio/patrimonio-completo.e2e-spec.ts:678:21
2025-12-11T00:26:55.1284168Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1284925Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1286162Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1286939Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1287626Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1288386Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1289249Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1290182Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1290731Z 
2025-12-11T00:26:55.1291981Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve desativar patrimônio (ADMIN)
2025-12-11T00:26:55.1292808Z 
2025-12-11T00:26:55.1293064Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:26:55.1293412Z 
2025-12-11T00:26:55.1293720Z     [0m [90m 715 |[39m         )
2025-12-11T00:26:55.1294359Z      [90m 716 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.1295208Z     [31m[1m>[22m[39m[90m 717 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:26:55.1296004Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1296535Z      [90m 718 |[39m
2025-12-11T00:26:55.1297563Z      [90m 719 |[39m         [36mconst[39m tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:26:55.1298485Z      [90m 720 |[39m[0m
2025-12-11T00:26:55.1298724Z 
2025-12-11T00:26:55.1299179Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:717:12)
2025-12-11T00:26:55.1299868Z       ----
2025-12-11T00:26:55.1300423Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:55.1301144Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1302145Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1302986Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1303740Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1304424Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1305185Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1306047Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1307242Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1307806Z 
2025-12-11T00:26:55.1308936Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › POST /v1/patrimonio/:id/descarte › deve marcar patrimônio para descarte (ADMIN)
2025-12-11T00:26:55.1309811Z 
2025-12-11T00:26:55.1310075Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:26:55.1310422Z 
2025-12-11T00:26:55.1310723Z     [0m [90m 754 |[39m         )
2025-12-11T00:26:55.1311376Z      [90m 755 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.1312519Z     [31m[1m>[22m[39m[90m 756 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:26:55.1313320Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1313865Z      [90m 757 |[39m
2025-12-11T00:26:55.1314884Z      [90m 758 |[39m         [36mconst[39m tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:26:55.1315834Z      [90m 759 |[39m[0m
2025-12-11T00:26:55.1316083Z 
2025-12-11T00:26:55.1316545Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:756:12)
2025-12-11T00:26:55.1317501Z       ----
2025-12-11T00:26:55.1318082Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:55.1318818Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1319566Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1320388Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1321150Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1322048Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1322817Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1323679Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1324591Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1325149Z 
2025-12-11T00:26:55.1326369Z   ● Patrimonio - Completo (e2e) › GRUPO 5: Gestão de Localização › PATCH /v1/patrimonio/:id/localizacao › deve atualizar localização do patrimônio (ADMIN)
2025-12-11T00:26:55.1329682Z 
2025-12-11T00:26:55.1329928Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1330241Z 
2025-12-11T00:26:55.1330554Z     [0m [90m 805 |[39m         )
2025-12-11T00:26:55.1331195Z      [90m 806 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.1332285Z     [31m[1m>[22m[39m[90m 807 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1333083Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1334017Z      [90m 808 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1335811Z      [90m 809 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1337667Z      [90m 810 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1338378Z 
2025-12-11T00:26:55.1338847Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:807:12)
2025-12-11T00:26:55.1345414Z       ----
2025-12-11T00:26:55.1345931Z       at patrimonio/patrimonio-completo.e2e-spec.ts:810:21
2025-12-11T00:26:55.1346596Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1347358Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1348187Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1348937Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1349860Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1350683Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1351553Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1352692Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1353235Z 
2025-12-11T00:26:55.1354414Z   ● Patrimonio - Completo (e2e) › GRUPO 7: Exportação e Relatórios › GET /v1/patrimonio/relatorio/inventario › deve gerar relatório de inventário
2025-12-11T00:26:55.1371135Z 
2025-12-11T00:26:55.1371368Z     Expected 200, 400 or 500, got 403
2025-12-11T00:26:55.1371897Z 
2025-12-11T00:26:55.1372193Z     [0m [90m 987 |[39m         )
2025-12-11T00:26:55.1372952Z      [90m 988 |[39m           [33m.[39mquery({ limit[33m:[39m [32m'10'[39m })
2025-12-11T00:26:55.1373883Z     [31m[1m>[22m[39m[90m 989 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1374703Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1375700Z      [90m 990 |[39m             [90m// Aceitar 200, 400 (validação) ou 500 (erro interno do service)[39m
2025-12-11T00:26:55.1377802Z      [90m 991 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m500[39m) {
2025-12-11T00:26:55.1379647Z      [90m 992 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 400 or 500, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1380369Z 
2025-12-11T00:26:55.1380846Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:989:12)
2025-12-11T00:26:55.1381530Z       ----
2025-12-11T00:26:55.1382261Z       at patrimonio/patrimonio-completo.e2e-spec.ts:992:21
2025-12-11T00:26:55.1382944Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1383718Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1384545Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1385329Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1386019Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1386784Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1387641Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1388560Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1389118Z 
2025-12-11T00:26:55.1390138Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › POST /v1/patrimonio/bulk › deve criar múltiplos patrimônios em lote
2025-12-11T00:26:55.1390954Z 
2025-12-11T00:26:55.1391172Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1391468Z 
2025-12-11T00:26:55.1414233Z     [0m [90m 1085 |[39m         )
2025-12-11T00:26:55.1414947Z      [90m 1086 |[39m           [33m.[39msend(bulkDto)
2025-12-11T00:26:55.1415779Z     [31m[1m>[22m[39m[90m 1087 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1416582Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1417539Z      [90m 1088 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1419353Z      [90m 1089 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1421235Z      [90m 1090 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1422193Z 
2025-12-11T00:26:55.1422668Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1087:12)
2025-12-11T00:26:55.1423511Z       ----
2025-12-11T00:26:55.1424017Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1090:21
2025-12-11T00:26:55.1424717Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1425470Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1426302Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1427058Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1427734Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1428500Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1429354Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1430275Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1430838Z 
2025-12-11T00:26:55.1457633Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › PATCH /v1/patrimonio/bulk › deve atualizar múltiplos patrimônios em lote
2025-12-11T00:26:55.1458542Z 
2025-12-11T00:26:55.1459030Z     Expected 200, 201 or 400, got 403
2025-12-11T00:26:55.1459352Z 
2025-12-11T00:26:55.1459649Z     [0m [90m 1119 |[39m         )
2025-12-11T00:26:55.1460288Z      [90m 1120 |[39m           [33m.[39msend(bulkDto)
2025-12-11T00:26:55.1461123Z     [31m[1m>[22m[39m[90m 1121 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1462128Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1462986Z      [90m 1122 |[39m             [90m// Aceitar 200, 201 ou 400 (se validação falhar)[39m
2025-12-11T00:26:55.1464668Z      [90m 1123 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:26:55.1466486Z      [90m 1124 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 400, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1467229Z 
2025-12-11T00:26:55.1467682Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1121:12)
2025-12-11T00:26:55.1468337Z       ----
2025-12-11T00:26:55.1468830Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1124:21
2025-12-11T00:26:55.1469511Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1470115Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1470762Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1471452Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1472224Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1472965Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1473843Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1474777Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1475341Z 
2025-12-11T00:26:55.1476756Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › POST /v1/patrimonio/bulk/transferir-responsavel › deve transferir múltiplos patrimônios para o mesmo responsável
2025-12-11T00:26:55.1477867Z 
2025-12-11T00:26:55.1478060Z     Expected 200 or 201, got 403
2025-12-11T00:26:55.1478332Z 
2025-12-11T00:26:55.1478987Z     [0m [90m 1188 |[39m               responsavelId[33m:[39m tokens[33m.[39madminUserId[33m,[39m
2025-12-11T00:26:55.1479822Z      [90m 1189 |[39m             })
2025-12-11T00:26:55.1480626Z     [31m[1m>[22m[39m[90m 1190 |[39m             [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1481408Z      [90m      |[39m              [31m[1m^[22m[39m
2025-12-11T00:26:55.1483006Z      [90m 1191 |[39m               [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:26:55.1484584Z      [90m 1192 |[39m                 [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:55.1485633Z      [90m 1193 |[39m               }[0m
2025-12-11T00:26:55.1485942Z 
2025-12-11T00:26:55.1486399Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1190:14)
2025-12-11T00:26:55.1487051Z       ----
2025-12-11T00:26:55.1487523Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1192:23
2025-12-11T00:26:55.1488190Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1488940Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1489769Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1490511Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1491195Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1492166Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1493247Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1494150Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1494702Z 
2025-12-11T00:26:55.1495807Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › DELETE /v1/patrimonio/bulk › deve deletar múltiplos patrimônios em lote (ADMIN)
2025-12-11T00:26:55.1496681Z 
2025-12-11T00:26:55.1496908Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1497209Z 
2025-12-11T00:26:55.1497509Z     [0m [90m 1272 |[39m         )
2025-12-11T00:26:55.1498181Z      [90m 1273 |[39m           [33m.[39msend(createDto1)
2025-12-11T00:26:55.1499023Z     [31m[1m>[22m[39m[90m 1274 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1499833Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1500794Z      [90m 1275 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1503421Z      [90m 1276 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1505300Z      [90m 1277 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1506021Z 
2025-12-11T00:26:55.1506480Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1274:12)
2025-12-11T00:26:55.1507129Z       ----
2025-12-11T00:26:55.1507616Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1277:21
2025-12-11T00:26:55.1508284Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1509044Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1509846Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1510613Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1511289Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1512150Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1512986Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1513912Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1514472Z 
2025-12-11T00:26:55.1515622Z   ● Patrimonio - Completo (e2e) › GRUPO 10: Validações › POST /v1/patrimonio/verificar-duplicidade › deve verificar duplicidade de patrimônios
2025-12-11T00:26:55.1516524Z 
2025-12-11T00:26:55.1516727Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1517027Z 
2025-12-11T00:26:55.1517515Z     [0m [90m 1389 |[39m         )
2025-12-11T00:26:55.1518228Z      [90m 1390 |[39m           [33m.[39msend(duplicidadeDto)
2025-12-11T00:26:55.1519125Z     [31m[1m>[22m[39m[90m 1391 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1519853Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1520712Z      [90m 1392 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1522678Z      [90m 1393 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1524546Z      [90m 1394 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1525279Z 
2025-12-11T00:26:55.1525781Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1391:12)
2025-12-11T00:26:55.1526427Z       ----
2025-12-11T00:26:55.1526929Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1394:21
2025-12-11T00:26:55.1527894Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1528643Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1529485Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1530260Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1530938Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1531904Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1532768Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1533654Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1534230Z 
2025-12-11T00:26:55.1535356Z   ● Patrimonio - Completo (e2e) › GRUPO 10: Validações › GET /v1/patrimonio/:id/disponibilidade › deve verificar disponibilidade do patrimônio
2025-12-11T00:26:55.1536269Z 
2025-12-11T00:26:55.1536466Z     Expected 200 or 404, got 400
2025-12-11T00:26:55.1536733Z 
2025-12-11T00:26:55.1537292Z     [0m [90m 1413 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:26:55.1537940Z      [90m 1414 |[39m         )
2025-12-11T00:26:55.1538696Z     [31m[1m>[22m[39m[90m 1415 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1539479Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1540364Z      [90m 1416 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1542001Z      [90m 1417 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1543609Z      [90m 1418 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1544301Z 
2025-12-11T00:26:55.1544763Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1415:12)
2025-12-11T00:26:55.1545409Z       ----
2025-12-11T00:26:55.1545856Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1418:21
2025-12-11T00:26:55.1546488Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1547306Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1548137Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1548898Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1549559Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1550287Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1551360Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1552542Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1553111Z 
2025-12-11T00:26:55.1554121Z   ● Patrimonio - Completo (e2e) › GRUPO 11: Alertas › GET /v1/patrimonio/sem-responsavel › deve buscar patrimônios sem responsável
2025-12-11T00:26:55.1554920Z 
2025-12-11T00:26:55.1555127Z     Expected 200, 201 or 404, got 403
2025-12-11T00:26:55.1555436Z 
2025-12-11T00:26:55.1555731Z     [0m [90m 1533 |[39m         )
2025-12-11T00:26:55.1556383Z      [90m 1534 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.1557235Z     [31m[1m>[22m[39m[90m 1535 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1557980Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1558874Z      [90m 1536 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:26:55.1560681Z      [90m 1537 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1563033Z      [90m 1538 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1563768Z 
2025-12-11T00:26:55.1564232Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1535:12)
2025-12-11T00:26:55.1564876Z       ----
2025-12-11T00:26:55.1565365Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1538:21
2025-12-11T00:26:55.1566054Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1566815Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1567617Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1568377Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1569053Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1569785Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1570626Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1571523Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1573041Z 
2025-12-11T00:26:55.1574146Z   ● Patrimonio - Completo (e2e) › GRUPO 12: Histórico › GET /v1/patrimonio/:id/historico › deve obter histórico de alterações do patrimônio
2025-12-11T00:26:55.1574999Z 
2025-12-11T00:26:55.1575192Z     Expected 200 or 404, got 400
2025-12-11T00:26:55.1575427Z 
2025-12-11T00:26:55.1575939Z     [0m [90m 1579 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:26:55.1576631Z      [90m 1580 |[39m         )
2025-12-11T00:26:55.1577371Z     [31m[1m>[22m[39m[90m 1581 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1578220Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1579317Z      [90m 1582 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir ou não tiver histórico)[39m
2025-12-11T00:26:55.1580868Z      [90m 1583 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1582704Z      [90m 1584 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1583412Z 
2025-12-11T00:26:55.1583878Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1581:12)
2025-12-11T00:26:55.1584535Z       ----
2025-12-11T00:26:55.1585020Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1584:21
2025-12-11T00:26:55.1585675Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1586637Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1587445Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1588200Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1588862Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1589586Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1590413Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1591294Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1592026Z 
2025-12-11T00:26:55.1593229Z   ● Patrimonio - Completo (e2e) › GRUPO 12: Histórico › GET /v1/patrimonio/:id/historico/responsaveis › deve obter histórico de responsáveis do patrimônio
2025-12-11T00:26:55.1594197Z 
2025-12-11T00:26:55.1594379Z     Expected 200 or 404, got 400
2025-12-11T00:26:55.1594630Z 
2025-12-11T00:26:55.1595199Z     [0m [90m 1602 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:26:55.1595887Z      [90m 1603 |[39m         )
2025-12-11T00:26:55.1596877Z     [31m[1m>[22m[39m[90m 1604 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1597732Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1598826Z      [90m 1605 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir ou não tiver histórico)[39m
2025-12-11T00:26:55.1600370Z      [90m 1606 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1602193Z      [90m 1607 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1602901Z 
2025-12-11T00:26:55.1603374Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1604:12)
2025-12-11T00:26:55.1604069Z       ----
2025-12-11T00:26:55.1604570Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1607:21
2025-12-11T00:26:55.1605276Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1606043Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1606882Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1607642Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1608306Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1609059Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1609930Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1610835Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1611403Z 
2025-12-11T00:26:55.1612987Z   ● Patrimonio - Completo (e2e) › GRUPO 15: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve obter histórico de localizações do patrimônio
2025-12-11T00:26:55.1614054Z 
2025-12-11T00:26:55.1614266Z     Expected 200 or 404, got 400
2025-12-11T00:26:55.1614548Z 
2025-12-11T00:26:55.1615120Z     [0m [90m 1986 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:26:55.1615881Z      [90m 1987 |[39m         )
2025-12-11T00:26:55.1616642Z     [31m[1m>[22m[39m[90m 1988 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:55.1617459Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1618522Z      [90m 1989 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir ou não tiver histórico)[39m
2025-12-11T00:26:55.1620056Z      [90m 1990 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:55.1622117Z      [90m 1991 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:55.1622877Z 
2025-12-11T00:26:55.1623356Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1988:12)
2025-12-11T00:26:55.1624041Z       ----
2025-12-11T00:26:55.1624549Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1991:21
2025-12-11T00:26:55.1625217Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1625968Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1626779Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1627530Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1628205Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1628967Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1629848Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1630771Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1631797Z 
2025-12-11T00:26:55.1633255Z   ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (ADMIN)
2025-12-11T00:26:55.1634359Z 
2025-12-11T00:26:55.1634612Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:26:55.1634957Z 
2025-12-11T00:26:55.1635262Z     [0m [90m 2056 |[39m           )
2025-12-11T00:26:55.1635903Z      [90m 2057 |[39m             [33m.[39msend(createDto)
2025-12-11T00:26:55.1636808Z     [31m[1m>[22m[39m[90m 2058 |[39m             [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:26:55.1637621Z      [90m      |[39m              [31m[1m^[22m[39m
2025-12-11T00:26:55.1638127Z      [90m 2059 |[39m
2025-12-11T00:26:55.1639069Z      [90m 2060 |[39m           tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:26:55.1639952Z      [90m 2061 |[39m         }[0m
2025-12-11T00:26:55.1640290Z 
2025-12-11T00:26:55.1640755Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2058:14)
2025-12-11T00:26:55.1641403Z       ----
2025-12-11T00:26:55.1642175Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:55.1642899Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1643621Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1644401Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1645047Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1645714Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1646477Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1647434Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1648355Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1648893Z 
2025-12-11T00:26:55.1650341Z   ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (MANAGER)
2025-12-11T00:26:55.1651488Z 
2025-12-11T00:26:55.1651957Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:26:55.1652384Z 
2025-12-11T00:26:55.1652685Z     [0m [90m 2120 |[39m         )
2025-12-11T00:26:55.1653348Z      [90m 2121 |[39m           [33m.[39msend(createDto)
2025-12-11T00:26:55.1654247Z     [31m[1m>[22m[39m[90m 2122 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:26:55.1655042Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:55.1655570Z      [90m 2123 |[39m
2025-12-11T00:26:55.1656794Z      [90m 2124 |[39m         expect(createResponse[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:26:55.1658351Z      [90m 2125 |[39m         [36mconst[39m tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m[0m
2025-12-11T00:26:55.1659064Z 
2025-12-11T00:26:55.1659537Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2122:12)
2025-12-11T00:26:55.1660211Z       ----
2025-12-11T00:26:55.1660770Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:55.1661464Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:55.1662436Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:55.1663235Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:55.1663989Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:55.1664698Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:55.1665463Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:55.1666592Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:55.1667528Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:55.1668080Z 
2025-12-11T00:26:58.0748595Z FAIL test/patrimonio/endpoints-faltantes.e2e-spec.ts (39.173 s)
2025-12-11T00:26:58.0758611Z   ● Console
2025-12-11T00:26:58.0758781Z 
2025-12-11T00:26:58.0758899Z     console.log
2025-12-11T00:26:58.0759812Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }
2025-12-11T00:26:58.0760417Z 
2025-12-11T00:26:58.0760680Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:26:58.0761054Z 
2025-12-11T00:26:58.0761186Z     console.log
2025-12-11T00:26:58.0762277Z       [setupTestUsers] ✅ Porta detectada: 40501, USERS_API_URL: http://localhost:40501/v1
2025-12-11T00:26:58.0762799Z 
2025-12-11T00:26:58.0763073Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:26:58.0763469Z 
2025-12-11T00:26:58.0764474Z   ● PatrimonioController - Endpoints Faltantes (e2e) › Setup: Criar dados de teste › deve criar patrimônios para testes
2025-12-11T00:26:58.0765215Z 
2025-12-11T00:26:58.0765462Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:26:58.0765788Z 
2025-12-11T00:26:58.0766073Z     [0m [90m  96 |[39m       )
2025-12-11T00:26:58.0766641Z      [90m  97 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.0767437Z     [31m[1m>[22m[39m[90m  98 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:26:58.0768191Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.0768710Z      [90m  99 |[39m
2025-12-11T00:26:58.0769608Z      [90m 100 |[39m       createdPatrimonioId [33m=[39m response1[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:26:58.0770399Z      [90m 101 |[39m[0m
2025-12-11T00:26:58.0770626Z 
2025-12-11T00:26:58.0771041Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:98:10)
2025-12-11T00:26:58.0772051Z       ----
2025-12-11T00:26:58.0772592Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:58.0773254Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0773945Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0774693Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0775373Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0776006Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0776722Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0777541Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0778847Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0779423Z 
2025-12-11T00:26:58.0780605Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve fazer upload de foto com sucesso
2025-12-11T00:26:58.0781514Z 
2025-12-11T00:26:58.0782337Z     Expected 200, 201, or 400, got 403. Body: {"message":"Forbidden resource","error":"Forbidden","statusCode":403}
2025-12-11T00:26:58.0782984Z 
2025-12-11T00:26:58.0783265Z     [0m [90m 241 |[39m         )
2025-12-11T00:26:58.0784053Z      [90m 242 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:26:58.0785006Z     [31m[1m>[22m[39m[90m 243 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0785748Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0787257Z      [90m 244 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:26:58.0789203Z      [90m 245 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201, or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`[39m)[33m;[39m
2025-12-11T00:26:58.0790550Z      [90m 246 |[39m             }[0m
2025-12-11T00:26:58.0790838Z 
2025-12-11T00:26:58.0791255Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:243:12)
2025-12-11T00:26:58.0792074Z       ----
2025-12-11T00:26:58.0792530Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:245:21
2025-12-11T00:26:58.0793157Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0793851Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0794620Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0795338Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0795951Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0796673Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0797505Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0798373Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0798889Z 
2025-12-11T00:26:58.0800119Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve retornar erro 404 para patrimônio não encontrado
2025-12-11T00:26:58.0801085Z 
2025-12-11T00:26:58.0801262Z     Expected 404 or 400, got 403
2025-12-11T00:26:58.0801530Z 
2025-12-11T00:26:58.0802144Z     [0m [90m 264 |[39m         )
2025-12-11T00:26:58.0802971Z      [90m 265 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:26:58.0803959Z     [31m[1m>[22m[39m[90m 266 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0804741Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0805990Z      [90m 267 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m404[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:26:58.0807580Z      [90m 268 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 404 or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0808554Z      [90m 269 |[39m             }[0m
2025-12-11T00:26:58.0808858Z 
2025-12-11T00:26:58.0809314Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:266:12)
2025-12-11T00:26:58.0809959Z       ----
2025-12-11T00:26:58.0810435Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:268:21
2025-12-11T00:26:58.0811068Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0812284Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0813120Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0813877Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0814696Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0815472Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0816308Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0817212Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0817749Z 
2025-12-11T00:26:58.0818899Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve retornar erro 400 para arquivo muito grande
2025-12-11T00:26:58.0819850Z 
2025-12-11T00:26:58.0820051Z     Expected 400, 413, or 500, got 403
2025-12-11T00:26:58.0820323Z 
2025-12-11T00:26:58.0820624Z     [0m [90m 286 |[39m           )
2025-12-11T00:26:58.0821465Z      [90m 287 |[39m             [33m.[39mattach([32m'file'[39m[33m,[39m largeImagePath)
2025-12-11T00:26:58.0822984Z     [31m[1m>[22m[39m[90m 288 |[39m             [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0823784Z      [90m     |[39m              [31m[1m^[22m[39m
2025-12-11T00:26:58.0825325Z      [90m 289 |[39m               [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m400[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m413[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m500[39m) {
2025-12-11T00:26:58.0827130Z      [90m 290 |[39m                 [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 400, 413, or 500, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0828131Z      [90m 291 |[39m               }[0m
2025-12-11T00:26:58.0828443Z 
2025-12-11T00:26:58.0828893Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:288:14)
2025-12-11T00:26:58.0829556Z       ----
2025-12-11T00:26:58.0830052Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:290:23
2025-12-11T00:26:58.0830724Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0831488Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0832506Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0833259Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0833895Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0834649Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0835522Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0836426Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0836981Z 
2025-12-11T00:26:58.0838269Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve retornar erro 400 para arquivo não-imagem
2025-12-11T00:26:58.0839276Z 
2025-12-11T00:26:58.0839510Z     Expected 400, 415, 422, or 500, got 403
2025-12-11T00:26:58.0839860Z 
2025-12-11T00:26:58.0840169Z     [0m [90m 311 |[39m           )
2025-12-11T00:26:58.0840959Z      [90m 312 |[39m             [33m.[39mattach([32m'file'[39m[33m,[39m textFilePath)
2025-12-11T00:26:58.0842183Z     [31m[1m>[22m[39m[90m 313 |[39m             [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0842949Z      [90m     |[39m              [31m[1m^[22m[39m
2025-12-11T00:26:58.0843895Z      [90m 314 |[39m               [90m// Pode retornar 400, 415, 422 ou 500 dependendo da validação[39m
2025-12-11T00:26:58.0845377Z      [90m 315 |[39m               [36mif[39m ([33m![39m[[35m400[39m[33m,[39m [35m415[39m[33m,[39m [35m422[39m[33m,[39m [35m500[39m][33m.[39mincludes(res[33m.[39mstatus)) {
2025-12-11T00:26:58.0847355Z      [90m 316 |[39m                 [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 400, 415, 422, or 500, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:26:58.0848141Z 
2025-12-11T00:26:58.0848616Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:313:14)
2025-12-11T00:26:58.0849272Z       ----
2025-12-11T00:26:58.0849765Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:316:23
2025-12-11T00:26:58.0850422Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0851174Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0852232Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0853007Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0853673Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0854424Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0855216Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0856116Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0857007Z 
2025-12-11T00:26:58.0858167Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › DELETE /v1/patrimonio/:id/foto › deve remover foto com sucesso
2025-12-11T00:26:58.0859073Z 
2025-12-11T00:26:58.0859299Z     Expected 200, 201, or 400, got 403
2025-12-11T00:26:58.0859588Z 
2025-12-11T00:26:58.0859881Z     [0m [90m 336 |[39m         )
2025-12-11T00:26:58.0860694Z      [90m 337 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:26:58.0861875Z     [31m[1m>[22m[39m[90m 338 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0862633Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0864185Z      [90m 339 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:26:58.0865970Z      [90m 340 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201, or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0866909Z      [90m 341 |[39m             }[0m
2025-12-11T00:26:58.0867197Z 
2025-12-11T00:26:58.0867640Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:338:12)
2025-12-11T00:26:58.0868281Z       ----
2025-12-11T00:26:58.0868768Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:340:21
2025-12-11T00:26:58.0869401Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0870136Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0870935Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0871838Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0872523Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0873266Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0874096Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0874982Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0875516Z 
2025-12-11T00:26:58.0876801Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › DELETE /v1/patrimonio/:id/foto › deve retornar erro 404 para patrimônio não encontrado
2025-12-11T00:26:58.0877671Z 
2025-12-11T00:26:58.0877871Z     expected 404 "Not Found", got 403 "Forbidden"
2025-12-11T00:26:58.0878162Z 
2025-12-11T00:26:58.0878532Z     [0m [90m 375 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m
2025-12-11T00:26:58.0879119Z      [90m 376 |[39m         )
2025-12-11T00:26:58.0880112Z     [31m[1m>[22m[39m[90m 377 |[39m           [33m.[39mexpect([35m404[39m)[33m;[39m
2025-12-11T00:26:58.0880945Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0881580Z      [90m 378 |[39m       })[33m;[39m
2025-12-11T00:26:58.0882382Z      [90m 379 |[39m     })[33m;[39m
2025-12-11T00:26:58.0882897Z      [90m 380 |[39m[0m
2025-12-11T00:26:58.0883136Z 
2025-12-11T00:26:58.0883611Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:377:12)
2025-12-11T00:26:58.0884287Z       ----
2025-12-11T00:26:58.0884859Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:26:58.0885558Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0886242Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0887010Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0887694Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0888308Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0889062Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0890153Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0891059Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0891803Z 
2025-12-11T00:26:58.0893004Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › GET /v1/patrimonio/com-foto › deve listar apenas patrimônios com foto
2025-12-11T00:26:58.0893929Z 
2025-12-11T00:26:58.0894139Z     Expected 200, 201, or 400, got 403
2025-12-11T00:26:58.0894430Z 
2025-12-11T00:26:58.0894682Z     [0m [90m 390 |[39m         )
2025-12-11T00:26:58.0895464Z      [90m 391 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:26:58.0896386Z     [31m[1m>[22m[39m[90m 392 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0897124Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0898657Z      [90m 393 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:26:58.0900412Z      [90m 394 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201, or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0901361Z      [90m 395 |[39m             }[0m
2025-12-11T00:26:58.0901834Z 
2025-12-11T00:26:58.0902282Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:392:12)
2025-12-11T00:26:58.0902928Z       ----
2025-12-11T00:26:58.0903407Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:394:21
2025-12-11T00:26:58.0904049Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0904792Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0905590Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0906341Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0906999Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0907796Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0908638Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0909532Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0910005Z 
2025-12-11T00:26:58.0911140Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › GET /v1/patrimonio/com-foto › deve retornar lista vazia quando não há patrimônios com foto
2025-12-11T00:26:58.0912232Z 
2025-12-11T00:26:58.0912440Z     Expected 200, 404, or 400, got 403
2025-12-11T00:26:58.0912716Z 
2025-12-11T00:26:58.0913392Z     [0m [90m 482 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m
2025-12-11T00:26:58.0914058Z      [90m 483 |[39m         )
2025-12-11T00:26:58.0914850Z     [31m[1m>[22m[39m[90m 484 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0915649Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0917201Z      [90m 485 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:26:58.0918953Z      [90m 486 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 404, or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0919882Z      [90m 487 |[39m             }[0m
2025-12-11T00:26:58.0920171Z 
2025-12-11T00:26:58.0920596Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:484:12)
2025-12-11T00:26:58.0921172Z       ----
2025-12-11T00:26:58.0921855Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:486:21
2025-12-11T00:26:58.0922531Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0923568Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0924400Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0925124Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0925814Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0926573Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0927412Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0928306Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0928819Z 
2025-12-11T00:26:58.0930403Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve retornar histórico de localizações do patrimônio
2025-12-11T00:26:58.0931861Z 
2025-12-11T00:26:58.0932099Z     Expected 200 or 404, got 403
2025-12-11T00:26:58.0932394Z 
2025-12-11T00:26:58.0933170Z     [0m [90m 835 |[39m             observacoes[33m:[39m [32m'Mudança de localização via teste E2E'[39m[33m,[39m
2025-12-11T00:26:58.0934067Z      [90m 836 |[39m           })
2025-12-11T00:26:58.0934848Z     [31m[1m>[22m[39m[90m 837 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0935608Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0936837Z      [90m 838 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:58.0938341Z      [90m 839 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0939275Z      [90m 840 |[39m             }[0m
2025-12-11T00:26:58.0939574Z 
2025-12-11T00:26:58.0940021Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:837:12)
2025-12-11T00:26:58.0940669Z       ----
2025-12-11T00:26:58.0941071Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:839:21
2025-12-11T00:26:58.0941881Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0942632Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0943451Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0944201Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0944905Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0945666Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0946536Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0948185Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0948756Z 
2025-12-11T00:26:58.0950412Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve retornar histórico ordenado por data (mais recente primeiro)
2025-12-11T00:26:58.0951875Z 
2025-12-11T00:26:58.0952072Z     Expected 200 or 404, got 403
2025-12-11T00:26:58.0952346Z 
2025-12-11T00:26:58.0953010Z     [0m [90m 874 |[39m             localizacao[33m:[39m [32m'Sala 305 - Outro Setor'[39m[33m,[39m
2025-12-11T00:26:58.0953752Z      [90m 875 |[39m           })
2025-12-11T00:26:58.0954504Z     [31m[1m>[22m[39m[90m 876 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0955246Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0956414Z      [90m 877 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:58.0957959Z      [90m 878 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0959163Z      [90m 879 |[39m             }[0m
2025-12-11T00:26:58.0959462Z 
2025-12-11T00:26:58.0959922Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:876:12)
2025-12-11T00:26:58.0960593Z       ----
2025-12-11T00:26:58.0961087Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:878:21
2025-12-11T00:26:58.0961946Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0962636Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0963439Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0964178Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0964843Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0965597Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0966427Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0967329Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0967867Z 
2025-12-11T00:26:58.0969621Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve registrar histórico quando localização é alterada via updateLocalizacao
2025-12-11T00:26:58.0971084Z 
2025-12-11T00:26:58.0971354Z     Expected 200 or 404, got 403
2025-12-11T00:26:58.0971786Z 
2025-12-11T00:26:58.0972043Z     [0m [90m 970 |[39m         )
2025-12-11T00:26:58.0972722Z      [90m 971 |[39m           [33m.[39msend({ localizacao[33m:[39m novaLocalizacao })
2025-12-11T00:26:58.0973636Z     [31m[1m>[22m[39m[90m 972 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0974416Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:26:58.0975668Z      [90m 973 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:26:58.0977251Z      [90m 974 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0978226Z      [90m 975 |[39m             }[0m
2025-12-11T00:26:58.0978529Z 
2025-12-11T00:26:58.0978954Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:972:12)
2025-12-11T00:26:58.0979611Z       ----
2025-12-11T00:26:58.0980085Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:974:21
2025-12-11T00:26:58.0980730Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.0981465Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.0982697Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.0983459Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.0984142Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.0984914Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.0985798Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.0986699Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.0987248Z 
2025-12-11T00:26:58.0988586Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve deletar múltiplos patrimônios em lote (soft delete)
2025-12-11T00:26:58.0989650Z 
2025-12-11T00:26:58.0989853Z     Expected 201 or 409, got 403
2025-12-11T00:26:58.0990143Z 
2025-12-11T00:26:58.0990418Z     [0m [90m 1020 |[39m       )
2025-12-11T00:26:58.0991069Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.0992121Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.0993210Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.0994422Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:26:58.0995969Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.0996935Z      [90m 1025 |[39m           }[0m
2025-12-11T00:26:58.0997238Z 
2025-12-11T00:26:58.0997709Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:26:58.0998372Z       ----
2025-12-11T00:26:58.0998873Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:26:58.0999536Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.1000246Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.1001058Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.1002027Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.1002721Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.1003488Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.1004339Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.1005272Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.1005839Z 
2025-12-11T00:26:58.1007176Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar quantidade de deletados e não encontrados
2025-12-11T00:26:58.1008272Z 
2025-12-11T00:26:58.1008492Z     Expected 201 or 409, got 403
2025-12-11T00:26:58.1008761Z 
2025-12-11T00:26:58.1009018Z     [0m [90m 1020 |[39m       )
2025-12-11T00:26:58.1009592Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.1010478Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.1011277Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.1012677Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:26:58.1014242Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.1015155Z      [90m 1025 |[39m           }[0m
2025-12-11T00:26:58.1015449Z 
2025-12-11T00:26:58.1015893Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:26:58.1016524Z       ----
2025-12-11T00:26:58.1017213Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:26:58.1017888Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.1018595Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.1019340Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.1020114Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.1020823Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.1021809Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.1022649Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.1023560Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.1024112Z 
2025-12-11T00:26:58.1025458Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar listas de IDs deletados e não encontrados
2025-12-11T00:26:58.1026496Z 
2025-12-11T00:26:58.1026695Z     Expected 201 or 409, got 403
2025-12-11T00:26:58.1027246Z 
2025-12-11T00:26:58.1027555Z     [0m [90m 1020 |[39m       )
2025-12-11T00:26:58.1028207Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.1029050Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.1029824Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.1031072Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:26:58.1032889Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.1033840Z      [90m 1025 |[39m           }[0m
2025-12-11T00:26:58.1034143Z 
2025-12-11T00:26:58.1034627Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:26:58.1035300Z       ----
2025-12-11T00:26:58.1035801Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:26:58.1036487Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.1037247Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.1038024Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.1038760Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.1039451Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.1040204Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.1041047Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.1042155Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.1042721Z 
2025-12-11T00:26:58.1043947Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar erro 400 para mais de 100 IDs
2025-12-11T00:26:58.1044916Z 
2025-12-11T00:26:58.1045116Z     Expected 201 or 409, got 403
2025-12-11T00:26:58.1045385Z 
2025-12-11T00:26:58.1045634Z     [0m [90m 1020 |[39m       )
2025-12-11T00:26:58.1046206Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.1046972Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.1047711Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.1048934Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:26:58.1050739Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.1051971Z      [90m 1025 |[39m           }[0m
2025-12-11T00:26:58.1052290Z 
2025-12-11T00:26:58.1052756Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:26:58.1053443Z       ----
2025-12-11T00:26:58.1053919Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:26:58.1054590Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.1055340Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.1056117Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.1056813Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.1057485Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.1058264Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.1059140Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.1060065Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.1060862Z 
2025-12-11T00:26:58.1062285Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar erro 400 para array vazio
2025-12-11T00:26:58.1063276Z 
2025-12-11T00:26:58.1063482Z     Expected 201 or 409, got 403
2025-12-11T00:26:58.1063767Z 
2025-12-11T00:26:58.1064086Z     [0m [90m 1020 |[39m       )
2025-12-11T00:26:58.1064724Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.1065626Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.1066382Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.1067608Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:26:58.1069196Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.1070178Z      [90m 1025 |[39m           }[0m
2025-12-11T00:26:58.1070449Z 
2025-12-11T00:26:58.1070906Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:26:58.1071526Z       ----
2025-12-11T00:26:58.1072219Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:26:58.1072915Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.1073689Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.1074536Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.1075314Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.1076005Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.1076796Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.1077653Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.1078598Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.1079159Z 
2025-12-11T00:26:58.1080470Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar erro 400 para IDs inválidos (não UUID)
2025-12-11T00:26:58.1081433Z 
2025-12-11T00:26:58.1081817Z     Expected 201 or 409, got 403
2025-12-11T00:26:58.1082083Z 
2025-12-11T00:26:58.1082347Z     [0m [90m 1020 |[39m       )
2025-12-11T00:26:58.1082936Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.1083777Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.1084543Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.1086050Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:26:58.1087661Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.1088651Z      [90m 1025 |[39m           }[0m
2025-12-11T00:26:58.1088954Z 
2025-12-11T00:26:58.1089398Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:26:58.1090038Z       ----
2025-12-11T00:26:58.1090524Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:26:58.1091223Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.1092189Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.1092989Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.1093736Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.1094410Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.1095147Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.1096217Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.1097053Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.1097548Z 
2025-12-11T00:26:58.1098775Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve remover IDs duplicados automaticamente
2025-12-11T00:26:58.1099758Z 
2025-12-11T00:26:58.1099945Z     Expected 201 or 409, got 403
2025-12-11T00:26:58.1100217Z 
2025-12-11T00:26:58.1100522Z     [0m [90m 1020 |[39m       )
2025-12-11T00:26:58.1101150Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:26:58.1102229Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:26:58.1103002Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:26:58.1104184Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:26:58.1105717Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:26:58.1106631Z      [90m 1025 |[39m           }[0m
2025-12-11T00:26:58.1106912Z 
2025-12-11T00:26:58.1107419Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:26:58.1108054Z       ----
2025-12-11T00:26:58.1108476Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:26:58.1109082Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:26:58.1109810Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:26:58.1110647Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:26:58.1111408Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:26:58.1112325Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:26:58.1113082Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:26:58.1113924Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:26:58.1114818Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:26:58.1115356Z 
2025-12-11T00:27:07.5640885Z FAIL test/patrimonio/patrimonio-fases.e2e-spec.ts (13.087 s)
2025-12-11T00:27:07.5649268Z   ● Console
2025-12-11T00:27:07.5649494Z 
2025-12-11T00:27:07.5649629Z     console.log
2025-12-11T00:27:07.5650548Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  enable debug logging with { debug: true }
2025-12-11T00:27:07.5651042Z 
2025-12-11T00:27:07.5651235Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:07.5652077Z 
2025-12-11T00:27:07.5652230Z     console.log
2025-12-11T00:27:07.5653082Z       [setupTestUsers] ✅ Porta detectada: 41985, USERS_API_URL: http://localhost:41985/v1
2025-12-11T00:27:07.5653670Z 
2025-12-11T00:27:07.5653966Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:07.5654334Z 
2025-12-11T00:27:07.5655771Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio para MANUTENCAO (200)
2025-12-11T00:27:07.5656743Z 
2025-12-11T00:27:07.5656960Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5657296Z 
2025-12-11T00:27:07.5657560Z     [0m [90m 94 |[39m       )
2025-12-11T00:27:07.5657934Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5658653Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5659341Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5659631Z      [90m 97 |[39m
2025-12-11T00:27:07.5660095Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5661032Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:27:07.5661370Z 
2025-12-11T00:27:07.5661806Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:27:07.5662172Z       ----
2025-12-11T00:27:07.5662474Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5662886Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5663272Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5663697Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5664091Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5664441Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5664838Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5665292Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5665755Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5666043Z 
2025-12-11T00:27:07.5666679Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve retornar 400 quando status é o mesmo
2025-12-11T00:27:07.5667178Z 
2025-12-11T00:27:07.5667315Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5667496Z 
2025-12-11T00:27:07.5667633Z     [0m [90m 94 |[39m       )
2025-12-11T00:27:07.5667943Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5668384Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5668775Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5669050Z      [90m 97 |[39m
2025-12-11T00:27:07.5669506Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5670179Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:27:07.5670512Z 
2025-12-11T00:27:07.5670740Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:27:07.5671070Z       ----
2025-12-11T00:27:07.5671360Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5671933Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5672325Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5672738Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5673261Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5673619Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5674015Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5674454Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5674919Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5675194Z 
2025-12-11T00:27:07.5675850Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve retornar 404 quando patrimônio não existe
2025-12-11T00:27:07.5676364Z 
2025-12-11T00:27:07.5676493Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5676674Z 
2025-12-11T00:27:07.5676802Z     [0m [90m 94 |[39m       )
2025-12-11T00:27:07.5677116Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5677558Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5677938Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5678338Z      [90m 97 |[39m
2025-12-11T00:27:07.5678790Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5679465Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:27:07.5679793Z 
2025-12-11T00:27:07.5680016Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:27:07.5680338Z       ----
2025-12-11T00:27:07.5680637Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5681012Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5681395Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5682013Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5682401Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5682758Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5683144Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5683582Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5684052Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5684328Z 
2025-12-11T00:27:07.5685076Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir responsável do patrimônio (200/201)
2025-12-11T00:27:07.5685661Z 
2025-12-11T00:27:07.5685790Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5685978Z 
2025-12-11T00:27:07.5686109Z     [0m [90m 94 |[39m       )
2025-12-11T00:27:07.5686434Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5686870Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5687263Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5687528Z      [90m 97 |[39m
2025-12-11T00:27:07.5687975Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5688651Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:27:07.5688980Z 
2025-12-11T00:27:07.5689204Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:27:07.5689526Z       ----
2025-12-11T00:27:07.5689818Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5690191Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5690703Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5691130Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5691529Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5692088Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5692491Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5692932Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5693406Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5693690Z 
2025-12-11T00:27:07.5694396Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › POST /v1/patrimonio/:id/transferir-responsavel › deve retornar 400 quando mesmo responsável
2025-12-11T00:27:07.5694946Z 
2025-12-11T00:27:07.5695078Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5695253Z 
2025-12-11T00:27:07.5695388Z     [0m [90m 94 |[39m       )
2025-12-11T00:27:07.5695700Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5696278Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5696654Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5696914Z      [90m 97 |[39m
2025-12-11T00:27:07.5697360Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5698025Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:27:07.5698360Z 
2025-12-11T00:27:07.5698578Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:27:07.5698902Z       ----
2025-12-11T00:27:07.5699188Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5699565Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5699950Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5700370Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5700757Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5701105Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5701493Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5702162Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5702634Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5702913Z 
2025-12-11T00:27:07.5703524Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › GET /v1/patrimonio/dashboard › deve retornar métricas do dashboard (200)
2025-12-11T00:27:07.5704017Z 
2025-12-11T00:27:07.5704148Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5704322Z 
2025-12-11T00:27:07.5704452Z     [0m [90m 94 |[39m       )
2025-12-11T00:27:07.5704766Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5705200Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5705586Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5705841Z      [90m 97 |[39m
2025-12-11T00:27:07.5706287Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5706958Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:27:07.5707285Z 
2025-12-11T00:27:07.5707503Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:27:07.5707827Z       ----
2025-12-11T00:27:07.5708122Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5708608Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5709000Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5709420Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5709803Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5710147Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5710539Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5710972Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5711442Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5711963Z 
2025-12-11T00:27:07.5712565Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve ativar patrimônio inativo (200)
2025-12-11T00:27:07.5713017Z 
2025-12-11T00:27:07.5713154Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5713344Z 
2025-12-11T00:27:07.5713476Z     [0m [90m 295 |[39m       )
2025-12-11T00:27:07.5713946Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5714385Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5714779Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5715044Z      [90m 298 |[39m
2025-12-11T00:27:07.5715526Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5715986Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5716143Z 
2025-12-11T00:27:07.5716371Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:27:07.5716696Z       ----
2025-12-11T00:27:07.5716988Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5717370Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5717752Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5718176Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5718578Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5718933Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5719354Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5719798Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5720263Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5720548Z 
2025-12-11T00:27:07.5721120Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve retornar 400 quando já está ativo
2025-12-11T00:27:07.5721560Z 
2025-12-11T00:27:07.5721913Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5722098Z 
2025-12-11T00:27:07.5722240Z     [0m [90m 295 |[39m       )
2025-12-11T00:27:07.5722563Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5723005Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5723392Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5723657Z      [90m 298 |[39m
2025-12-11T00:27:07.5724134Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5724585Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5724747Z 
2025-12-11T00:27:07.5724968Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:27:07.5725298Z       ----
2025-12-11T00:27:07.5725581Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5726080Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5726475Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5726891Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5727277Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5727624Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5728006Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5728451Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5728924Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5729203Z 
2025-12-11T00:27:07.5729767Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve desativar patrimônio ativo (200)
2025-12-11T00:27:07.5730226Z 
2025-12-11T00:27:07.5730360Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5730538Z 
2025-12-11T00:27:07.5730666Z     [0m [90m 295 |[39m       )
2025-12-11T00:27:07.5731095Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5731537Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5732167Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5732427Z      [90m 298 |[39m
2025-12-11T00:27:07.5732896Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5733349Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5733505Z 
2025-12-11T00:27:07.5733726Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:27:07.5734055Z       ----
2025-12-11T00:27:07.5734349Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5734722Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5735107Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5735528Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5735908Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5736253Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5736644Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5737099Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5737563Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5737840Z 
2025-12-11T00:27:07.5738409Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve retornar 400 quando já está inativo
2025-12-11T00:27:07.5738861Z 
2025-12-11T00:27:07.5738997Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5739182Z 
2025-12-11T00:27:07.5739309Z     [0m [90m 295 |[39m       )
2025-12-11T00:27:07.5739632Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5740066Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5740450Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5740711Z      [90m 298 |[39m
2025-12-11T00:27:07.5741173Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5741741Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5741900Z 
2025-12-11T00:27:07.5742122Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:27:07.5742442Z       ----
2025-12-11T00:27:07.5742732Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5743234Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5743617Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5744032Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5744416Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5744756Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5745141Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5745581Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5746037Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5746317Z 
2025-12-11T00:27:07.5746915Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › POST /v1/patrimonio/:id/descarte › deve marcar patrimônio para descarte (200/201/400)
2025-12-11T00:27:07.5747394Z 
2025-12-11T00:27:07.5747525Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5747698Z 
2025-12-11T00:27:07.5747831Z     [0m [90m 295 |[39m       )
2025-12-11T00:27:07.5748259Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5748699Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5749079Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5749338Z      [90m 298 |[39m
2025-12-11T00:27:07.5749801Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5750247Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5750408Z 
2025-12-11T00:27:07.5750626Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:27:07.5750949Z       ----
2025-12-11T00:27:07.5751228Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5751783Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5752246Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5752665Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5753049Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5753390Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5753777Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5754214Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5754672Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5754955Z 
2025-12-11T00:27:07.5755607Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › PATCH /v1/patrimonio/:id/localizacao › deve atualizar localização do patrimônio (200/404)
2025-12-11T00:27:07.5756114Z 
2025-12-11T00:27:07.5756244Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5756417Z 
2025-12-11T00:27:07.5756549Z     [0m [90m 415 |[39m       )
2025-12-11T00:27:07.5756865Z      [90m 416 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5757303Z     [31m[1m>[22m[39m[90m 417 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5757691Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5757945Z      [90m 418 |[39m
2025-12-11T00:27:07.5758361Z      [90m 419 |[39m       patrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5758769Z      [90m 420 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5758928Z 
2025-12-11T00:27:07.5759144Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
2025-12-11T00:27:07.5759480Z       ----
2025-12-11T00:27:07.5759763Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5760264Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5760654Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5761069Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5761456Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5761922Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5762308Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5762774Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5763245Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5763522Z 
2025-12-11T00:27:07.5764215Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › GET /v1/patrimonio/localizacao/:localizacao › deve listar patrimônios por localização (200 ou 404)
2025-12-11T00:27:07.5764759Z 
2025-12-11T00:27:07.5764890Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5765072Z 
2025-12-11T00:27:07.5765199Z     [0m [90m 415 |[39m       )
2025-12-11T00:27:07.5765649Z      [90m 416 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5766084Z     [31m[1m>[22m[39m[90m 417 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5766470Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5766726Z      [90m 418 |[39m
2025-12-11T00:27:07.5767147Z      [90m 419 |[39m       patrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5767563Z      [90m 420 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5767721Z 
2025-12-11T00:27:07.5767945Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
2025-12-11T00:27:07.5768267Z       ----
2025-12-11T00:27:07.5768555Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5768929Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5769321Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5769739Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5770121Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5770469Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5770860Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5771291Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5771983Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5772265Z 
2025-12-11T00:27:07.5772926Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › GET /v1/patrimonio/stats/localizacoes › deve retornar estatísticas por localização (200)
2025-12-11T00:27:07.5773435Z 
2025-12-11T00:27:07.5773571Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5773745Z 
2025-12-11T00:27:07.5773881Z     [0m [90m 415 |[39m       )
2025-12-11T00:27:07.5774194Z      [90m 416 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5774629Z     [31m[1m>[22m[39m[90m 417 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5775006Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5775267Z      [90m 418 |[39m
2025-12-11T00:27:07.5775678Z      [90m 419 |[39m       patrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5776090Z      [90m 420 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5776251Z 
2025-12-11T00:27:07.5776469Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
2025-12-11T00:27:07.5776791Z       ----
2025-12-11T00:27:07.5777079Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5777582Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5777962Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5778377Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5778764Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5779104Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5779490Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5779927Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5780387Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5780669Z 
2025-12-11T00:27:07.5781326Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/numero-serie/:numeroSerie › deve buscar patrimônio por número de série (200)
2025-12-11T00:27:07.5781976Z 
2025-12-11T00:27:07.5782105Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5782282Z 
2025-12-11T00:27:07.5782573Z     [0m [90m 637 |[39m       )
2025-12-11T00:27:07.5782886Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5783325Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5783710Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5783963Z      [90m 640 |[39m
2025-12-11T00:27:07.5784451Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5784916Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5785075Z 
2025-12-11T00:27:07.5785294Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:27:07.5785618Z       ----
2025-12-11T00:27:07.5785900Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5786278Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5786658Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5787071Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5787455Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5787803Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5788185Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5788625Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5789092Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5789370Z 
2025-12-11T00:27:07.5789984Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/numero-serie/:numeroSerie › deve retornar 404 quando não encontrado
2025-12-11T00:27:07.5790480Z 
2025-12-11T00:27:07.5790604Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5790784Z 
2025-12-11T00:27:07.5790917Z     [0m [90m 637 |[39m       )
2025-12-11T00:27:07.5791232Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5791771Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5792262Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5792522Z      [90m 640 |[39m
2025-12-11T00:27:07.5792999Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5793467Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5793622Z 
2025-12-11T00:27:07.5793844Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:27:07.5794161Z       ----
2025-12-11T00:27:07.5794446Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5794935Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5795324Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5795747Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5796131Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5796481Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5796871Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5797304Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5797775Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5798053Z 
2025-12-11T00:27:07.5798728Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/aquisicao-periodo › deve buscar patrimônios por período de aquisição (200)
2025-12-11T00:27:07.5799260Z 
2025-12-11T00:27:07.5799383Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5799558Z 
2025-12-11T00:27:07.5799833Z     [0m [90m 637 |[39m       )
2025-12-11T00:27:07.5800145Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5800585Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5800974Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5801225Z      [90m 640 |[39m
2025-12-11T00:27:07.5801834Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5802307Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5802461Z 
2025-12-11T00:27:07.5802681Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:27:07.5803008Z       ----
2025-12-11T00:27:07.5803305Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5803672Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5804052Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5804463Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5804848Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5805195Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5805576Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5806014Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5806477Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5806755Z 
2025-12-11T00:27:07.5807370Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/valor-range › deve buscar patrimônios por intervalo de valor (200)
2025-12-11T00:27:07.5807858Z 
2025-12-11T00:27:07.5807979Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5808187Z 
2025-12-11T00:27:07.5808317Z     [0m [90m 637 |[39m       )
2025-12-11T00:27:07.5808633Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5809067Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5809452Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5809710Z      [90m 640 |[39m
2025-12-11T00:27:07.5810184Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5810649Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5810802Z 
2025-12-11T00:27:07.5811025Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:27:07.5811341Z       ----
2025-12-11T00:27:07.5811845Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5812239Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5812622Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5813051Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5813433Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5813778Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5814173Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5814615Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5815085Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5815370Z 
2025-12-11T00:27:07.5816010Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/status-multiplos › deve buscar patrimônios por múltiplos status (200)
2025-12-11T00:27:07.5816514Z 
2025-12-11T00:27:07.5816644Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5816941Z 
2025-12-11T00:27:07.5817071Z     [0m [90m 637 |[39m       )
2025-12-11T00:27:07.5817391Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5817830Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5818218Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5818479Z      [90m 640 |[39m
2025-12-11T00:27:07.5818966Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5819429Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5819589Z 
2025-12-11T00:27:07.5819806Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:27:07.5820135Z       ----
2025-12-11T00:27:07.5820421Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5820793Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5821182Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5821592Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5822093Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5822432Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5822822Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5823262Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5823725Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5824004Z 
2025-12-11T00:27:07.5824675Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/categorias-multiplas › deve buscar patrimônios por múltiplas categorias (200)
2025-12-11T00:27:07.5825210Z 
2025-12-11T00:27:07.5825333Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5825512Z 
2025-12-11T00:27:07.5825643Z     [0m [90m 637 |[39m       )
2025-12-11T00:27:07.5825955Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:27:07.5826395Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5826788Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:07.5827044Z      [90m 640 |[39m
2025-12-11T00:27:07.5827525Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5827988Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:27:07.5828144Z 
2025-12-11T00:27:07.5828360Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:27:07.5828682Z       ----
2025-12-11T00:27:07.5829097Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5829467Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5829850Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5830265Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5830642Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5830987Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5831376Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5832046Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5832517Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5832794Z 
2025-12-11T00:27:07.5833384Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › POST /v1/patrimonio/bulk › deve criar múltiplos patrimônios em lote (201)
2025-12-11T00:27:07.5833831Z 
2025-12-11T00:27:07.5833952Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5834265Z 
2025-12-11T00:27:07.5834400Z     [0m [90m 811 |[39m         )
2025-12-11T00:27:07.5834707Z      [90m 812 |[39m           [33m.[39msend(dto)
2025-12-11T00:27:07.5835139Z     [31m[1m>[22m[39m[90m 813 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5835529Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:27:07.5835792Z      [90m 814 |[39m
2025-12-11T00:27:07.5836288Z      [90m 815 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'totalSucessos'[39m)[33m;[39m
2025-12-11T00:27:07.5837008Z      [90m 816 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'totalErros'[39m)[33m;[39m[0m
2025-12-11T00:27:07.5837340Z 
2025-12-11T00:27:07.5837567Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:813:12)
2025-12-11T00:27:07.5837896Z       ----
2025-12-11T00:27:07.5838185Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5838561Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5838936Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5839353Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5839741Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5840081Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5840474Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5840916Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5841375Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5841774Z 
2025-12-11T00:27:07.5842355Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › PATCH /v1/patrimonio/bulk › deve atualizar múltiplos patrimônios (200 ou 400)
2025-12-11T00:27:07.5842822Z 
2025-12-11T00:27:07.5842950Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5843124Z 
2025-12-11T00:27:07.5843467Z     [0m [90m 835 |[39m             nome[33m:[39m [32m'Patrimônio para atualização em lote'[39m[33m,[39m
2025-12-11T00:27:07.5843867Z      [90m 836 |[39m           })
2025-12-11T00:27:07.5844278Z     [31m[1m>[22m[39m[90m 837 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5844673Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:27:07.5844935Z      [90m 838 |[39m
2025-12-11T00:27:07.5845435Z      [90m 839 |[39m         [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5845859Z      [90m 840 |[39m[0m
2025-12-11T00:27:07.5845988Z 
2025-12-11T00:27:07.5846334Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:837:12)
2025-12-11T00:27:07.5846674Z       ----
2025-12-11T00:27:07.5846963Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5847350Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5847739Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5848154Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5848541Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5848888Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5849282Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5849738Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5850206Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5850484Z 
2025-12-11T00:27:07.5851178Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › POST /v1/patrimonio/bulk/transferir-responsavel › deve transferir múltiplos patrimônios (200 ou 400)
2025-12-11T00:27:07.5852078Z 
2025-12-11T00:27:07.5852217Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5852405Z 
2025-12-11T00:27:07.5852772Z     [0m [90m 883 |[39m             nome[33m:[39m [32m'Patrimônio para transferência em lote'[39m[33m,[39m
2025-12-11T00:27:07.5853185Z      [90m 884 |[39m           })
2025-12-11T00:27:07.5853594Z     [31m[1m>[22m[39m[90m 885 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5853998Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:27:07.5854261Z      [90m 886 |[39m
2025-12-11T00:27:07.5854759Z      [90m 887 |[39m         [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:07.5855189Z      [90m 888 |[39m[0m
2025-12-11T00:27:07.5855331Z 
2025-12-11T00:27:07.5855559Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:885:12)
2025-12-11T00:27:07.5855895Z       ----
2025-12-11T00:27:07.5856188Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5856562Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5856950Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5857369Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5857754Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5858103Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5858501Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5858940Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5859414Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5859702Z 
2025-12-11T00:27:07.5860359Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › GET /v1/patrimonio/validar-codigo/:codigo › deve retornar não disponível para código existente (200)
2025-12-11T00:27:07.5860881Z 
2025-12-11T00:27:07.5861050Z     expect(received).toBe(expected) // Object.is equality
2025-12-11T00:27:07.5861260Z 
2025-12-11T00:27:07.5861336Z     Expected: false
2025-12-11T00:27:07.5861526Z     Received: true
2025-12-11T00:27:07.5861742Z 
2025-12-11T00:27:07.5861996Z     [0m [90m 940 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:07.5862306Z      [90m 941 |[39m
2025-12-11T00:27:07.5862911Z     [31m[1m>[22m[39m[90m 942 |[39m         expect(response[33m.[39mbody[33m.[39mdisponivel)[33m.[39mtoBe([36mfalse[39m)[33m;[39m
2025-12-11T00:27:07.5863494Z      [90m     |[39m                                          [31m[1m^[22m[39m
2025-12-11T00:27:07.5863959Z      [90m 943 |[39m       })[33m;[39m
2025-12-11T00:27:07.5864258Z      [90m 944 |[39m     })[33m;[39m
2025-12-11T00:27:07.5864509Z      [90m 945 |[39m[0m
2025-12-11T00:27:07.5864635Z 
2025-12-11T00:27:07.5864863Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:942:42)
2025-12-11T00:27:07.5865135Z 
2025-12-11T00:27:07.5865790Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › POST /v1/patrimonio/verificar-duplicidade › deve verificar duplicidade de patrimônios (200 ou 201)
2025-12-11T00:27:07.5866310Z 
2025-12-11T00:27:07.5866441Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:07.5866617Z 
2025-12-11T00:27:07.5866860Z     [0m [90m 961 |[39m             numeroSerie[33m:[39m numeroSerie[33m,[39m
2025-12-11T00:27:07.5867215Z      [90m 962 |[39m           })
2025-12-11T00:27:07.5867629Z     [31m[1m>[22m[39m[90m 963 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:07.5868033Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:27:07.5868297Z      [90m 964 |[39m
2025-12-11T00:27:07.5868675Z      [90m 965 |[39m         [90m// Aguardar um pouco para garantir persistência[39m
2025-12-11T00:27:07.5869539Z      [90m 966 |[39m         [36mawait[39m [36mnew[39m [33mPromise[39m(resolve [33m=>[39m setTimeout(resolve[33m,[39m [35m300[39m))[33m;[39m[0m
2025-12-11T00:27:07.5869946Z 
2025-12-11T00:27:07.5870166Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:963:12)
2025-12-11T00:27:07.5870499Z       ----
2025-12-11T00:27:07.5870789Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5871164Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5871548Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5872206Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5872605Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5872967Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5873352Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5873803Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5874274Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5874550Z 
2025-12-11T00:27:07.5875184Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › GET /v1/patrimonio/:id/disponibilidade › deve verificar disponibilidade do patrimônio (200)
2025-12-11T00:27:07.5875682Z 
2025-12-11T00:27:07.5875801Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:27:07.5875972Z 
2025-12-11T00:27:07.5876144Z     [0m [90m 1001 |[39m           tokens[33m,[39m
2025-12-11T00:27:07.5876573Z      [90m 1002 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:27:07.5877084Z     [31m[1m>[22m[39m[90m 1003 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:07.5877481Z      [90m      |[39m           [31m[1m^[22m[39m
2025-12-11T00:27:07.5877749Z      [90m 1004 |[39m
2025-12-11T00:27:07.5878251Z      [90m 1005 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'disponivel'[39m)[33m;[39m
2025-12-11T00:27:07.5878940Z      [90m 1006 |[39m         [90m// Pode ter `motivo` ao invés de `status` dependendo da implementação[39m[0m
2025-12-11T00:27:07.5879241Z 
2025-12-11T00:27:07.5879472Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1003:11)
2025-12-11T00:27:07.5879800Z       ----
2025-12-11T00:27:07.5880090Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5880461Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5880836Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5881386Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5881903Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5882256Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5882648Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5883090Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5883562Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5883849Z 
2025-12-11T00:27:07.5884406Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Histórico › GET /v1/patrimonio/:id/historico › deve retornar histórico de alterações (200)
2025-12-11T00:27:07.5884849Z 
2025-12-11T00:27:07.5884969Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:27:07.5885134Z 
2025-12-11T00:27:07.5885303Z     [0m [90m 1104 |[39m           tokens[33m,[39m
2025-12-11T00:27:07.5885739Z      [90m 1105 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:27:07.5886242Z     [31m[1m>[22m[39m[90m 1106 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:07.5886755Z      [90m      |[39m           [31m[1m^[22m[39m
2025-12-11T00:27:07.5887018Z      [90m 1107 |[39m
2025-12-11T00:27:07.5887525Z      [90m 1108 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'patrimonioId'[39m)[33m;[39m
2025-12-11T00:27:07.5888248Z      [90m 1109 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'historico'[39m)[33m;[39m[0m
2025-12-11T00:27:07.5888586Z 
2025-12-11T00:27:07.5888809Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1106:11)
2025-12-11T00:27:07.5889141Z       ----
2025-12-11T00:27:07.5889432Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5889801Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5890185Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5890596Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5890996Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5891346Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5891838Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5892282Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5892751Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5893025Z 
2025-12-11T00:27:07.5893646Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Histórico › GET /v1/patrimonio/:id/historico/responsaveis › deve retornar histórico de responsáveis (200)
2025-12-11T00:27:07.5894149Z 
2025-12-11T00:27:07.5894271Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:27:07.5894442Z 
2025-12-11T00:27:07.5894607Z     [0m [90m 1120 |[39m           tokens[33m,[39m
2025-12-11T00:27:07.5895042Z      [90m 1121 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:27:07.5895533Z     [31m[1m>[22m[39m[90m 1122 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:07.5895929Z      [90m      |[39m           [31m[1m^[22m[39m
2025-12-11T00:27:07.5896190Z      [90m 1123 |[39m
2025-12-11T00:27:07.5896691Z      [90m 1124 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'patrimonioId'[39m)[33m;[39m
2025-12-11T00:27:07.5897438Z      [90m 1125 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'responsaveis'[39m)[33m;[39m[0m
2025-12-11T00:27:07.5897784Z 
2025-12-11T00:27:07.5898009Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1122:11)
2025-12-11T00:27:07.5898336Z       ----
2025-12-11T00:27:07.5898741Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:07.5899120Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:07.5899507Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:07.5899924Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:07.5900319Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:07.5900665Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:07.5901063Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:07.5901514Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:07.5902095Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:07.5902379Z 
2025-12-11T00:27:12.3913118Z PASS test/users/users.e2e-spec.ts (17.29 s)
2025-12-11T00:27:12.3920021Z   ● Console
2025-12-11T00:27:12.3920257Z 
2025-12-11T00:27:12.3920396Z     console.log
2025-12-11T00:27:12.3921334Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }
2025-12-11T00:27:12.3922315Z 
2025-12-11T00:27:12.3922490Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:12.3922689Z 
2025-12-11T00:27:12.3922768Z     console.log
2025-12-11T00:27:12.3923267Z       [setupTestUsers] ✅ Porta detectada: 35357, USERS_API_URL: http://localhost:35357/v1
2025-12-11T00:27:12.3923593Z 
2025-12-11T00:27:12.3923756Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:12.3923956Z 
2025-12-11T00:27:21.5968547Z PASS test/inventory-mobile/inventory-mobile.e2e-spec.ts (14.027 s)
2025-12-11T00:27:21.5976538Z   ● Console
2025-12-11T00:27:21.5976705Z 
2025-12-11T00:27:21.5976792Z     console.log
2025-12-11T00:27:21.5977390Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  suppress all logs with { quiet: true }
2025-12-11T00:27:21.5977727Z 
2025-12-11T00:27:21.5977882Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:21.5978077Z 
2025-12-11T00:27:21.5978173Z     console.log
2025-12-11T00:27:21.5978623Z       [setupTestUsers] ✅ Porta detectada: 38327, USERS_API_URL: http://localhost:38327/v1
2025-12-11T00:27:21.5978941Z 
2025-12-11T00:27:21.5979099Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:21.5979295Z 
2025-12-11T00:27:26.4914011Z PASS test/notifications/notifications.e2e-spec.ts (14.095 s)
2025-12-11T00:27:26.4921572Z   ● Console
2025-12-11T00:27:26.4921995Z 
2025-12-11T00:27:26.4922397Z     console.log
2025-12-11T00:27:26.4923450Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
2025-12-11T00:27:26.4924179Z 
2025-12-11T00:27:26.4924716Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:26.4925051Z 
2025-12-11T00:27:26.4925177Z     console.log
2025-12-11T00:27:26.4925998Z       [setupTestUsers] ✅ Porta detectada: 42449, USERS_API_URL: http://localhost:42449/v1
2025-12-11T00:27:26.4926533Z 
2025-12-11T00:27:26.4926808Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:26.4927142Z 
2025-12-11T00:27:36.4042098Z PASS test/integrations-erp/integrations-erp.e2e-spec.ts (14.801 s)
2025-12-11T00:27:36.4102099Z   ● Console
2025-12-11T00:27:36.4102334Z 
2025-12-11T00:27:36.4102466Z     console.log
2025-12-11T00:27:36.4103393Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  override existing env vars with { override: true }
2025-12-11T00:27:36.4103982Z 
2025-12-11T00:27:36.4104240Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:36.4104587Z 
2025-12-11T00:27:36.4104711Z     console.log
2025-12-11T00:27:36.4105497Z       [setupTestUsers] ✅ Porta detectada: 36491, USERS_API_URL: http://localhost:36491/v1
2025-12-11T00:27:36.4106033Z 
2025-12-11T00:27:36.4106305Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:36.4107005Z 
2025-12-11T00:27:36.4107136Z     console.log
2025-12-11T00:27:36.4109581Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:bcece35c-c35b-4e7d-9545-2d73ce8659ae"],"entity":"assets","executionId":"bcece35c-c35b-4e7d-9545-2d73ce8659ae","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:27:34.682Z","type":"import"}
2025-12-11T00:27:36.4111829Z 
2025-12-11T00:27:36.4112290Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:27:36.4112805Z 
2025-12-11T00:27:36.4112935Z     console.log
2025-12-11T00:27:36.4115416Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:21415e8b-fc96-4c31-a033-5cd528526435"],"entity":"assets","executionId":"21415e8b-fc96-4c31-a033-5cd528526435","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:27:34.707Z","type":"export"}
2025-12-11T00:27:36.4117171Z 
2025-12-11T00:27:36.4117621Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:27:36.4118146Z 
2025-12-11T00:27:36.4118278Z     console.log
2025-12-11T00:27:36.4120770Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:d2c9b04b-0c97-4d24-b199-540ed1459bf4"],"entity":"costCenters","executionId":"d2c9b04b-0c97-4d24-b199-540ed1459bf4","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:27:34.722Z","type":"import"}
2025-12-11T00:27:36.4122815Z 
2025-12-11T00:27:36.4123267Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:27:36.4123785Z 
2025-12-11T00:27:36.4123907Z     console.log
2025-12-11T00:27:36.4129059Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:45567171-d4e4-4b9b-a7d1-4d1c42d6a76a"],"entity":"locations","executionId":"45567171-d4e4-4b9b-a7d1-4d1c42d6a76a","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:27:34.736Z","type":"import"}
2025-12-11T00:27:36.4130855Z 
2025-12-11T00:27:36.4131329Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:27:36.4132027Z 
2025-12-11T00:27:36.4132152Z     console.log
2025-12-11T00:27:36.4134641Z       [32minfo[39m: Integration queued {"connectorKey":"test-connector","correlationIds":["execution:799a8453-f0e6-4740-a552-125dcad8d642"],"entity":"depreciations","executionId":"799a8453-f0e6-4740-a552-125dcad8d642","service":"patrimonio-inventario-api","timestamp":"2025-12-11T00:27:34.746Z","type":"import"}
2025-12-11T00:27:36.4136410Z 
2025-12-11T00:27:36.4136853Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:27:36.4137360Z 
2025-12-11T00:27:40.7089412Z PASS test/reports-catalog/reports-catalog.e2e-spec.ts (14.211 s)
2025-12-11T00:27:40.7096696Z   ● Console
2025-12-11T00:27:40.7096913Z 
2025-12-11T00:27:40.7097048Z     console.log
2025-12-11T00:27:40.7098042Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }
2025-12-11T00:27:40.7098612Z 
2025-12-11T00:27:40.7098815Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:40.7099022Z 
2025-12-11T00:27:40.7099097Z     console.log
2025-12-11T00:27:40.7099596Z       [setupTestUsers] ✅ Porta detectada: 36355, USERS_API_URL: http://localhost:36355/v1
2025-12-11T00:27:40.7099913Z 
2025-12-11T00:27:40.7100078Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:40.7100278Z 
2025-12-11T00:27:50.6325629Z FAIL test/patrimonio.e2e-spec.ts (14.213 s)
2025-12-11T00:27:50.6333302Z   ● Console
2025-12-11T00:27:50.6333521Z 
2025-12-11T00:27:50.6333665Z     console.log
2025-12-11T00:27:50.6334599Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  override existing env vars with { override: true }
2025-12-11T00:27:50.6335198Z 
2025-12-11T00:27:50.6335462Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:50.6336251Z 
2025-12-11T00:27:50.6336399Z     console.log
2025-12-11T00:27:50.6337195Z       [setupTestUsers] ✅ Porta detectada: 39693, USERS_API_URL: http://localhost:39693/v1
2025-12-11T00:27:50.6337985Z 
2025-12-11T00:27:50.6338246Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:50.6338601Z 
2025-12-11T00:27:50.6339229Z   ● PatrimonioController (e2e) › POST /v1/patrimonio › should create a new patrimonio (201)
2025-12-11T00:27:50.6339787Z 
2025-12-11T00:27:50.6340009Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6340317Z 
2025-12-11T00:27:50.6340545Z     [0m [90m 76 |[39m       )
2025-12-11T00:27:50.6341135Z      [90m 77 |[39m         [33m.[39msend(createPatrimonioDto)
2025-12-11T00:27:50.6342146Z     [31m[1m>[22m[39m[90m 78 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6342830Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6343282Z      [90m 79 |[39m
2025-12-11T00:27:50.6343950Z      [90m 80 |[39m       expect(response[33m.[39mbody)[33m.[39mtoMatchObject({
2025-12-11T00:27:50.6344913Z      [90m 81 |[39m         codigo[33m:[39m createPatrimonioDto[33m.[39mcodigo[33m,[39m[0m
2025-12-11T00:27:50.6345396Z 
2025-12-11T00:27:50.6345670Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:78:10)
2025-12-11T00:27:50.6346148Z       ----
2025-12-11T00:27:50.6346646Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6347301Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6347974Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6348697Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6349378Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6349980Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6350677Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6351441Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6352405Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6352891Z 
2025-12-11T00:27:50.6353553Z   ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 409 when codigo already exists
2025-12-11T00:27:50.6354135Z 
2025-12-11T00:27:50.6354342Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6354638Z 
2025-12-11T00:27:50.6355085Z     [0m [90m 110 |[39m           nome[33m:[39m [32m'First Notebook'[39m[33m,[39m
2025-12-11T00:27:50.6355677Z      [90m 111 |[39m         })
2025-12-11T00:27:50.6356361Z     [31m[1m>[22m[39m[90m 112 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6357010Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6357434Z      [90m 113 |[39m
2025-12-11T00:27:50.6358031Z      [90m 114 |[39m       [90m// Tentar criar outro com mesmo código[39m
2025-12-11T00:27:50.6358814Z      [90m 115 |[39m       [36mconst[39m createPatrimonioDto [33m=[39m {[0m
2025-12-11T00:27:50.6359209Z 
2025-12-11T00:27:50.6359474Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:112:10)
2025-12-11T00:27:50.6359935Z       ----
2025-12-11T00:27:50.6360426Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6361065Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6361904Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6362618Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6363282Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6363872Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6364526Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6365457Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6366273Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6366902Z 
2025-12-11T00:27:50.6367625Z   ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 400 when required fields are missing
2025-12-11T00:27:50.6368233Z 
2025-12-11T00:27:50.6368459Z     expected 400 "Bad Request", got 403 "Forbidden"
2025-12-11T00:27:50.6368779Z 
2025-12-11T00:27:50.6368997Z     [0m [90m 144 |[39m       )
2025-12-11T00:27:50.6369541Z      [90m 145 |[39m         [33m.[39msend(invalidDto)
2025-12-11T00:27:50.6370321Z     [31m[1m>[22m[39m[90m 146 |[39m         [33m.[39mexpect([35m400[39m)[33m;[39m
2025-12-11T00:27:50.6371014Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6371556Z      [90m 147 |[39m     })[33m;[39m
2025-12-11T00:27:50.6372237Z      [90m 148 |[39m   })[33m;[39m
2025-12-11T00:27:50.6372685Z      [90m 149 |[39m[0m
2025-12-11T00:27:50.6372897Z 
2025-12-11T00:27:50.6373175Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:146:10)
2025-12-11T00:27:50.6373668Z       ----
2025-12-11T00:27:50.6374184Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6374844Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6375532Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6376276Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6376966Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6377636Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6378341Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6379147Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6380016Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6380533Z 
2025-12-11T00:27:50.6381227Z   ● PatrimonioController (e2e) › GET /v1/patrimonio/:id › should return a patrimonio by id (200)
2025-12-11T00:27:50.6382001Z 
2025-12-11T00:27:50.6382226Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6382538Z 
2025-12-11T00:27:50.6383269Z     [0m [90m 280 |[39m           status[33m:[39m [33mPatrimonioStatus[39m[33m.[39m[33mATIVO[39m[33m,[39m
2025-12-11T00:27:50.6384051Z      [90m 281 |[39m         })
2025-12-11T00:27:50.6384777Z     [31m[1m>[22m[39m[90m 282 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6385475Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6385937Z      [90m 283 |[39m
2025-12-11T00:27:50.6386857Z      [90m 284 |[39m       [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:50.6387639Z      [90m 285 |[39m[0m
2025-12-11T00:27:50.6388065Z 
2025-12-11T00:27:50.6388366Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:282:10)
2025-12-11T00:27:50.6388884Z       ----
2025-12-11T00:27:50.6389416Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6390096Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6390801Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6391553Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6405291Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6406036Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6406786Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6407606Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6408505Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6409041Z 
2025-12-11T00:27:50.6409910Z   ● PatrimonioController (e2e) › GET /v1/patrimonio/codigo/:codigo › should return a patrimonio by codigo (200)
2025-12-11T00:27:50.6410852Z 
2025-12-11T00:27:50.6411094Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6411422Z 
2025-12-11T00:27:50.6412160Z     [0m [90m 328 |[39m           nome[33m:[39m [32m'Notebook Dell Inspiron 15'[39m[33m,[39m
2025-12-11T00:27:50.6412865Z      [90m 329 |[39m         })
2025-12-11T00:27:50.6413611Z     [31m[1m>[22m[39m[90m 330 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6414323Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6414809Z      [90m 331 |[39m
2025-12-11T00:27:50.6415593Z      [90m 332 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest(
2025-12-11T00:27:50.6416438Z      [90m 333 |[39m         httpServer[33m,[39m[0m
2025-12-11T00:27:50.6416789Z 
2025-12-11T00:27:50.6417084Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:330:10)
2025-12-11T00:27:50.6417570Z       ----
2025-12-11T00:27:50.6418098Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6418784Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6419491Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6420256Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6420967Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6421585Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6422496Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6423297Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6424144Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6424665Z 
2025-12-11T00:27:50.6425317Z   ● PatrimonioController (e2e) › PATCH /v1/patrimonio/:id › should update a patrimonio (200)
2025-12-11T00:27:50.6425892Z 
2025-12-11T00:27:50.6426119Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6426428Z 
2025-12-11T00:27:50.6426954Z     [0m [90m 408 |[39m           nome[33m:[39m [32m'Notebook Dell Inspiron 15'[39m[33m,[39m
2025-12-11T00:27:50.6427624Z      [90m 409 |[39m         })
2025-12-11T00:27:50.6428327Z     [31m[1m>[22m[39m[90m 410 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6429016Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6429475Z      [90m 411 |[39m
2025-12-11T00:27:50.6430374Z      [90m 412 |[39m       [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:50.6431134Z      [90m 413 |[39m[0m
2025-12-11T00:27:50.6431351Z 
2025-12-11T00:27:50.6432001Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:410:10)
2025-12-11T00:27:50.6432513Z       ----
2025-12-11T00:27:50.6433033Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6433713Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6434399Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6435132Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6435818Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6436428Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6437120Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6437904Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6438784Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6439302Z 
2025-12-11T00:27:50.6440157Z   ● PatrimonioController (e2e) › PATCH /v1/patrimonio/:id › should return 404 when updating non-existent patrimonio
2025-12-11T00:27:50.6441148Z 
2025-12-11T00:27:50.6441389Z     expected 404 "Not Found", got 403 "Forbidden"
2025-12-11T00:27:50.6441911Z 
2025-12-11T00:27:50.6442171Z     [0m [90m 447 |[39m       )
2025-12-11T00:27:50.6442750Z      [90m 448 |[39m         [33m.[39msend(updateDto)
2025-12-11T00:27:50.6443555Z     [31m[1m>[22m[39m[90m 449 |[39m         [33m.[39mexpect([35m404[39m)[33m;[39m
2025-12-11T00:27:50.6444250Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6444775Z      [90m 450 |[39m     })[33m;[39m
2025-12-11T00:27:50.6445273Z      [90m 451 |[39m   })[33m;[39m
2025-12-11T00:27:50.6445703Z      [90m 452 |[39m[0m
2025-12-11T00:27:50.6445910Z 
2025-12-11T00:27:50.6446187Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:449:10)
2025-12-11T00:27:50.6446655Z       ----
2025-12-11T00:27:50.6447179Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6447827Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6448523Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6449273Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6449947Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6450568Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6451272Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6452244Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6453079Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6453585Z 
2025-12-11T00:27:50.6454319Z   ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should create multiple patrimonios (201)
2025-12-11T00:27:50.6454949Z 
2025-12-11T00:27:50.6455167Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6455484Z 
2025-12-11T00:27:50.6455726Z     [0m [90m 479 |[39m       )
2025-12-11T00:27:50.6456427Z      [90m 480 |[39m         [33m.[39msend({ patrimonios[33m:[39m createDtos })
2025-12-11T00:27:50.6457292Z     [31m[1m>[22m[39m[90m 481 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6457978Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6458445Z      [90m 482 |[39m
2025-12-11T00:27:50.6459186Z      [90m 483 |[39m       [90m// O endpoint retorna BulkResponseDto com sucessos e erros[39m
2025-12-11T00:27:50.6460378Z      [90m 484 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'sucessos'[39m)[33m;[39m[0m
2025-12-11T00:27:50.6460970Z 
2025-12-11T00:27:50.6461260Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:481:10)
2025-12-11T00:27:50.6461901Z       ----
2025-12-11T00:27:50.6462611Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6463318Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6464024Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6464778Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6465473Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6466088Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6466781Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6467549Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6468392Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6468896Z 
2025-12-11T00:27:50.6469688Z   ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should return 400 or 409 when empty array provided
2025-12-11T00:27:50.6470338Z 
2025-12-11T00:27:50.6470507Z     Expected 400 or 409, got 403
2025-12-11T00:27:50.6470930Z 
2025-12-11T00:27:50.6471154Z     [0m [90m 507 |[39m       )
2025-12-11T00:27:50.6471973Z      [90m 508 |[39m         [33m.[39msend({ patrimonios[33m:[39m [] })
2025-12-11T00:27:50.6472783Z     [31m[1m>[22m[39m[90m 509 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:27:50.6473444Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6474398Z      [90m 510 |[39m           [90m// Pode retornar 400 (Bad Request) ou 409 (Conflict) dependendo da validação[39m
2025-12-11T00:27:50.6475808Z      [90m 511 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m400[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:27:50.6477308Z      [90m 512 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 400 or 409, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:27:50.6477987Z 
2025-12-11T00:27:50.6478282Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:509:10)
2025-12-11T00:27:50.6478788Z       ----
2025-12-11T00:27:50.6479143Z       at patrimonio.e2e-spec.ts:512:19
2025-12-11T00:27:50.6479676Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6480381Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6481135Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6482037Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6482680Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6483392Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6483921Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6484406Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6484702Z 
2025-12-11T00:27:50.6485157Z   ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should handle duplicate codigos in request (201)
2025-12-11T00:27:50.6485534Z 
2025-12-11T00:27:50.6485666Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6485846Z 
2025-12-11T00:27:50.6485985Z     [0m [90m 542 |[39m       )
2025-12-11T00:27:50.6486395Z      [90m 543 |[39m         [33m.[39msend({ patrimonios[33m:[39m duplicateDtos })
2025-12-11T00:27:50.6486898Z     [31m[1m>[22m[39m[90m 544 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6487294Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6487559Z      [90m 545 |[39m
2025-12-11T00:27:50.6487951Z      [90m 546 |[39m       [90m// Verificar que retornou estrutura de resposta bulk[39m
2025-12-11T00:27:50.6488593Z      [90m 547 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'sucessos'[39m)[33m;[39m[0m
2025-12-11T00:27:50.6489089Z 
2025-12-11T00:27:50.6489263Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:544:10)
2025-12-11T00:27:50.6489545Z       ----
2025-12-11T00:27:50.6489853Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6490228Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6490615Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6491036Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6491423Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6492038Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6492432Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6492880Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6493358Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6493635Z 
2025-12-11T00:27:50.6494062Z   ● PatrimonioController (e2e) › DELETE /v1/patrimonio/:id › should soft delete a patrimonio (200 or 204)
2025-12-11T00:27:50.6494563Z 
2025-12-11T00:27:50.6494693Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:50.6494874Z 
2025-12-11T00:27:50.6495157Z     [0m [90m 573 |[39m           nome[33m:[39m [32m'Notebook para deletar'[39m[33m,[39m
2025-12-11T00:27:50.6495527Z      [90m 574 |[39m         })
2025-12-11T00:27:50.6495924Z     [31m[1m>[22m[39m[90m 575 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:50.6496314Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:50.6496577Z      [90m 576 |[39m
2025-12-11T00:27:50.6497073Z      [90m 577 |[39m       [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:50.6497502Z      [90m 578 |[39m[0m
2025-12-11T00:27:50.6497626Z 
2025-12-11T00:27:50.6497800Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:575:10)
2025-12-11T00:27:50.6498072Z       ----
2025-12-11T00:27:50.6498376Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6498751Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6499131Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6499548Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6499935Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6500280Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6500671Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6501111Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6501579Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6502122Z 
2025-12-11T00:27:50.6502581Z   ● PatrimonioController (e2e) › DELETE /v1/patrimonio/:id › should return 404 when deleting non-existent patrimonio
2025-12-11T00:27:50.6502978Z 
2025-12-11T00:27:50.6503119Z     expected 404 "Not Found", got 403 "Forbidden"
2025-12-11T00:27:50.6503300Z 
2025-12-11T00:27:50.6503464Z     [0m [90m 598 |[39m         tokens[33m,[39m
2025-12-11T00:27:50.6503884Z      [90m 599 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:27:50.6504374Z     [31m[1m>[22m[39m[90m 600 |[39m       )[33m.[39mexpect([35m404[39m)[33m;[39m
2025-12-11T00:27:50.6504757Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T00:27:50.6505058Z      [90m 601 |[39m     })[33m;[39m
2025-12-11T00:27:50.6505343Z      [90m 602 |[39m   })[33m;[39m
2025-12-11T00:27:50.6505614Z      [90m 603 |[39m })[33m;[39m[0m
2025-12-11T00:27:50.6505766Z 
2025-12-11T00:27:50.6505928Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:600:9)
2025-12-11T00:27:50.6506336Z       ----
2025-12-11T00:27:50.6506632Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:50.6507015Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:50.6507393Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:50.6507811Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:50.6508198Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:50.6508537Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:50.6508926Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:50.6509365Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:50.6509828Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:50.6510109Z 
2025-12-11T00:27:52.9095565Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T00:27:52.9098758Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T00:27:52.9102709Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T00:27:52.9105617Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T00:27:52.9108461Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T00:27:52.9111305Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T00:27:52.9114287Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:186:8[90m)[39m
2025-12-11T00:27:52.9116929Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:144:31[90m)[39m
2025-12-11T00:27:52.9119600Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9121448Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:52.9137474Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T00:27:52.9140770Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T00:27:52.9143824Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T00:27:52.9146929Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T00:27:52.9149791Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T00:27:52.9152789Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T00:27:52.9155497Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:186:8[90m)[39m
2025-12-11T00:27:52.9158125Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:144:31[90m)[39m
2025-12-11T00:27:52.9160791Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9162957Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:52.9220852Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T00:27:52.9223860Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T00:27:52.9227353Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T00:27:52.9231266Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T00:27:52.9234384Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T00:27:52.9237228Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T00:27:52.9239922Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:186:8[90m)[39m
2025-12-11T00:27:52.9242693Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:144:31[90m)[39m
2025-12-11T00:27:52.9245369Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9247205Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:52.9261291Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T00:27:52.9264086Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T00:27:52.9270258Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T00:27:52.9273400Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T00:27:52.9276240Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T00:27:52.9279062Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T00:27:52.9281908Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:186:8[90m)[39m
2025-12-11T00:27:52.9284586Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:144:31[90m)[39m
2025-12-11T00:27:52.9287478Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9289305Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:52.9302130Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T00:27:52.9304764Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T00:27:52.9308537Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T00:27:52.9311439Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T00:27:52.9314482Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T00:27:52.9317322Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T00:27:52.9320045Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:186:8[90m)[39m
2025-12-11T00:27:52.9322838Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:144:31[90m)[39m
2025-12-11T00:27:52.9325525Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9327362Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:52.9344339Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mTypeORMError: Relation with property path patrimonios in entity was not found.
2025-12-11T00:27:52.9347112Z     at JoinAttribute.getValue [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:187:23[90m)[39m
2025-12-11T00:27:52.9351340Z     at JoinAttribute.get relation [as relation] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:191:53[90m)[39m
2025-12-11T00:27:52.9354396Z     at JoinAttribute.get metadata [as metadata] [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/JoinAttribute.ts:203:18[90m)[39m
2025-12-11T00:27:52.9357216Z     at SelectQueryBuilder.join [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:2100:53[90m)[39m
2025-12-11T00:27:52.9360040Z     at SelectQueryBuilder.leftJoin [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:468:14[90m)[39m
2025-12-11T00:27:52.9363136Z     at EventsService.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:186:8[90m)[39m
2025-12-11T00:27:52.9365767Z     at EventsController.findAll [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:144:31[90m)[39m
2025-12-11T00:27:52.9368424Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9370251Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:52.9459235Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T00:27:52.9464443Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T00:27:52.9465707Z     at Array.forEach (<anonymous>)
2025-12-11T00:27:52.9467625Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T00:27:52.9470622Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T00:27:52.9473801Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T00:27:52.9476614Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T00:27:52.9479203Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T00:27:52.9481982Z     at EventsService.findOneByIdOrSlug [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:310:46[90m)[39m
2025-12-11T00:27:52.9484889Z     at EventsController.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:178:31[90m)[39m
2025-12-11T00:27:52.9487569Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9489397Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:52.9495925Z [31m[Nest] 3781  - [39m12/11/2025, 12:27:52 AM [31m  ERROR[39m [38;5;3m[ExceptionsHandler] [39mEntityPropertyNotFoundError: Property "patrimonios" was not found in "Event". Make sure your query is correct.
2025-12-11T00:27:52.9500888Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3995:23
2025-12-11T00:27:52.9502306Z     at Array.forEach (<anonymous>)
2025-12-11T00:27:52.9504243Z     at SelectQueryBuilder.buildRelations [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3987:32[90m)[39m
2025-12-11T00:27:52.9507256Z     at SelectQueryBuilder.applyFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:3176:22[90m)[39m
2025-12-11T00:27:52.9510486Z     at SelectQueryBuilder.setFindOptions [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/query-builder/SelectQueryBuilder.ts:106:14[90m)[39m
2025-12-11T00:27:52.9513503Z     at EntityManager.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/entity-manager/EntityManager.ts:1225:14[90m)[39m
2025-12-11T00:27:52.9516109Z     at Repository.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/repository/Repository.ts:626:29[90m)[39m
2025-12-11T00:27:52.9518756Z     at EventsService.findOneByIdOrSlug [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.service.ts:310:46[90m)[39m
2025-12-11T00:27:52.9521474Z     at EventsController.findOne [90m(/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39msrc/events/events.controller.ts:178:31[90m)[39m
2025-12-11T00:27:52.9524301Z     at [90m/home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio/backend/[39mnode_modules/[4m@nestjs/core[24m/router/router-execution-context.js:38:29
2025-12-11T00:27:52.9526140Z [90m    at processTicksAndRejections (node:internal/process/task_queues:95:5)[39m
2025-12-11T00:27:54.5708878Z FAIL test/events/events.e2e-spec.ts (13.854 s)
2025-12-11T00:27:54.5715781Z   ● Console
2025-12-11T00:27:54.5717619Z 
2025-12-11T00:27:54.5717778Z     console.log
2025-12-11T00:27:54.5718709Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  enable debug logging with { debug: true }
2025-12-11T00:27:54.5719279Z 
2025-12-11T00:27:54.5719541Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:27:54.5719888Z 
2025-12-11T00:27:54.5720013Z     console.log
2025-12-11T00:27:54.5720808Z       [setupTestUsers] ✅ Porta detectada: 46195, USERS_API_URL: http://localhost:46195/v1
2025-12-11T00:27:54.5721345Z 
2025-12-11T00:27:54.5721785Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:27:54.5722139Z 
2025-12-11T00:27:54.5723200Z   ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN
2025-12-11T00:27:54.5723658Z 
2025-12-11T00:27:54.5723885Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:54.5724194Z 
2025-12-11T00:27:54.5724420Z     [0m [90m 131 |[39m       )
2025-12-11T00:27:54.5725003Z      [90m 132 |[39m         [33m.[39msend(createEventDto)
2025-12-11T00:27:54.5726163Z     [31m[1m>[22m[39m[90m 133 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:54.5726873Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5727340Z      [90m 134 |[39m
2025-12-11T00:27:54.5728166Z      [90m 135 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:27:54.5729632Z      [90m 136 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m createEventDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:27:54.5730385Z 
2025-12-11T00:27:54.5730677Z       at Object.<anonymous> (events/events.e2e-spec.ts:133:10)
2025-12-11T00:27:54.5731158Z       ----
2025-12-11T00:27:54.5731823Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5732484Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5733160Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5733905Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5734582Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5735394Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5736068Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5736823Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5737629Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5738112Z 
2025-12-11T00:27:54.5738617Z   ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER
2025-12-11T00:27:54.5739063Z 
2025-12-11T00:27:54.5739274Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:54.5739570Z 
2025-12-11T00:27:54.5739794Z     [0m [90m 173 |[39m       )
2025-12-11T00:27:54.5740344Z      [90m 174 |[39m         [33m.[39msend(createEventDto)
2025-12-11T00:27:54.5741124Z     [31m[1m>[22m[39m[90m 175 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:54.5741970Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5742405Z      [90m 176 |[39m
2025-12-11T00:27:54.5743196Z      [90m 177 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:27:54.5744623Z      [90m 178 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m createEventDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:27:54.5745343Z 
2025-12-11T00:27:54.5745624Z       at Object.<anonymous> (events/events.e2e-spec.ts:175:10)
2025-12-11T00:27:54.5746086Z       ----
2025-12-11T00:27:54.5746574Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5747199Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5747851Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5748565Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5749223Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5749814Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5750484Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5751229Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5752242Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5752795Z 
2025-12-11T00:27:54.5753295Z   ● Events (e2e) › GET /v1/events › deve listar eventos com paginação (200)
2025-12-11T00:27:54.5753740Z 
2025-12-11T00:27:54.5753992Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5754337Z 
2025-12-11T00:27:54.5754562Z     [0m [90m 193 |[39m       )
2025-12-11T00:27:54.5755614Z      [90m 194 |[39m         [33m.[39mquery({ page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:27:54.5756607Z     [31m[1m>[22m[39m[90m 195 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5757306Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5757766Z      [90m 196 |[39m
2025-12-11T00:27:54.5758595Z      [90m 197 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'data'[39m)[33m;[39m
2025-12-11T00:27:54.5759807Z      [90m 198 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'total'[39m)[33m;[39m[0m
2025-12-11T00:27:54.5760368Z 
2025-12-11T00:27:54.5760677Z       at Object.<anonymous> (events/events.e2e-spec.ts:195:10)
2025-12-11T00:27:54.5761165Z       ----
2025-12-11T00:27:54.5761872Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5762569Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5763288Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5764049Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5764953Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5765594Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5766313Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5767119Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5767978Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5768517Z 
2025-12-11T00:27:54.5769132Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por eventType (200)
2025-12-11T00:27:54.5769584Z 
2025-12-11T00:27:54.5769849Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5770199Z 
2025-12-11T00:27:54.5770433Z     [0m [90m 214 |[39m       )
2025-12-11T00:27:54.5772073Z      [90m 215 |[39m         [33m.[39mquery({ eventType[33m:[39m [33mEventType[39m[33m.[39m[33mMANUTENCAO[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:27:54.5773468Z     [31m[1m>[22m[39m[90m 216 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5774176Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5774644Z      [90m 217 |[39m
2025-12-11T00:27:54.5775451Z      [90m 218 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:27:54.5776686Z      [90m 219 |[39m       [36mif[39m (response[33m.[39mbody[33m.[39mdata[33m.[39mlength [33m>[39m [35m0[39m) {[0m
2025-12-11T00:27:54.5777262Z 
2025-12-11T00:27:54.5777553Z       at Object.<anonymous> (events/events.e2e-spec.ts:216:10)
2025-12-11T00:27:54.5778038Z       ----
2025-12-11T00:27:54.5778559Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5779210Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5779904Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5780682Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5781420Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5782253Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5782960Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5783766Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5784623Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5785136Z 
2025-12-11T00:27:54.5785607Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por state (200)
2025-12-11T00:27:54.5786036Z 
2025-12-11T00:27:54.5786484Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5786834Z 
2025-12-11T00:27:54.5787069Z     [0m [90m 233 |[39m       )
2025-12-11T00:27:54.5788379Z      [90m 234 |[39m         [33m.[39mquery({ state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:27:54.5789697Z     [31m[1m>[22m[39m[90m 235 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5790413Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5790885Z      [90m 236 |[39m
2025-12-11T00:27:54.5791892Z      [90m 237 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:27:54.5792700Z      [90m 238 |[39m     })[33m;[39m[0m
2025-12-11T00:27:54.5792994Z 
2025-12-11T00:27:54.5793291Z       at Object.<anonymous> (events/events.e2e-spec.ts:235:10)
2025-12-11T00:27:54.5793799Z       ----
2025-12-11T00:27:54.5794330Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5795019Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5795938Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5796718Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5797437Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5798089Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5798816Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5799613Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5800465Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5800987Z 
2025-12-11T00:27:54.5801499Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por visibility (200)
2025-12-11T00:27:54.5802164Z 
2025-12-11T00:27:54.5802429Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5802791Z 
2025-12-11T00:27:54.5803044Z     [0m [90m 247 |[39m       )
2025-12-11T00:27:54.5804479Z      [90m 248 |[39m         [33m.[39mquery({ visibility[33m:[39m [33mEventVisibility[39m[33m.[39m[33mPUBLIC[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:27:54.5805834Z     [31m[1m>[22m[39m[90m 249 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5806527Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5806986Z      [90m 250 |[39m
2025-12-11T00:27:54.5807789Z      [90m 251 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:27:54.5808562Z      [90m 252 |[39m     })[33m;[39m[0m
2025-12-11T00:27:54.5808847Z 
2025-12-11T00:27:54.5809145Z       at Object.<anonymous> (events/events.e2e-spec.ts:249:10)
2025-12-11T00:27:54.5809647Z       ----
2025-12-11T00:27:54.5810150Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5810822Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5811501Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5812421Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5813120Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5813734Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5814431Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5815208Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5816031Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5816542Z 
2025-12-11T00:27:54.5817198Z   ● Events (e2e) › GET /v1/events › deve buscar eventos por texto (q) (200)
2025-12-11T00:27:54.5817652Z 
2025-12-11T00:27:54.5817910Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5818264Z 
2025-12-11T00:27:54.5818510Z     [0m [90m 261 |[39m       )
2025-12-11T00:27:54.5819576Z      [90m 262 |[39m         [33m.[39mquery({ q[33m:[39m [32m'Teste'[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:27:54.5820729Z     [31m[1m>[22m[39m[90m 263 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5821444Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5822124Z      [90m 264 |[39m
2025-12-11T00:27:54.5822968Z      [90m 265 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:27:54.5823772Z      [90m 266 |[39m     })[33m;[39m[0m
2025-12-11T00:27:54.5824055Z 
2025-12-11T00:27:54.5824353Z       at Object.<anonymous> (events/events.e2e-spec.ts:263:10)
2025-12-11T00:27:54.5824853Z       ----
2025-12-11T00:27:54.5825372Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5826242Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5826932Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5827662Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5828347Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5828961Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5829652Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5830444Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5831265Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5831955Z 
2025-12-11T00:27:54.5832532Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por intervalo de datas (200)
2025-12-11T00:27:54.5833026Z 
2025-12-11T00:27:54.5833281Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5833624Z 
2025-12-11T00:27:54.5833857Z     [0m [90m 280 |[39m       )
2025-12-11T00:27:54.5835490Z      [90m 281 |[39m         [33m.[39mquery({ [36mfrom[39m[33m:[39m [36mfrom[39m[33m.[39mtoISOString()[33m,[39m to[33m:[39m to[33m.[39mtoISOString()[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:27:54.5837284Z     [31m[1m>[22m[39m[90m 282 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5837971Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5838433Z      [90m 283 |[39m
2025-12-11T00:27:54.5839243Z      [90m 284 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:27:54.5840016Z      [90m 285 |[39m     })[33m;[39m[0m
2025-12-11T00:27:54.5840309Z 
2025-12-11T00:27:54.5840607Z       at Object.<anonymous> (events/events.e2e-spec.ts:282:10)
2025-12-11T00:27:54.5841100Z       ----
2025-12-11T00:27:54.5841798Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5842487Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5843172Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5843922Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5844626Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5845238Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5845933Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5846717Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5847786Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5848302Z 
2025-12-11T00:27:54.5848794Z   ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por ID (200)
2025-12-11T00:27:54.5849246Z 
2025-12-11T00:27:54.5849495Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5849826Z 
2025-12-11T00:27:54.5850115Z     [0m [90m 294 |[39m         tokens[33m,[39m
2025-12-11T00:27:54.5851183Z      [90m 295 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m [90m// GET /events/:idOrSlug requer autenticação[39m
2025-12-11T00:27:54.5852472Z     [31m[1m>[22m[39m[90m 296 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5853148Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T00:27:54.5853591Z      [90m 297 |[39m
2025-12-11T00:27:54.5854545Z      [90m 298 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T00:27:54.5855855Z      [90m 299 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m)[33m;[39m[0m
2025-12-11T00:27:54.5856434Z 
2025-12-11T00:27:54.5856910Z       at Object.<anonymous> (events/events.e2e-spec.ts:296:9)
2025-12-11T00:27:54.5857406Z       ----
2025-12-11T00:27:54.5857912Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5858586Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5859284Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5860050Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5860756Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5861380Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5862283Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5863082Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5863945Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5864264Z 
2025-12-11T00:27:54.5864601Z   ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por slug (200)
2025-12-11T00:27:54.5864863Z 
2025-12-11T00:27:54.5865013Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:27:54.5865209Z 
2025-12-11T00:27:54.5865380Z     [0m [90m 308 |[39m         tokens[33m,[39m
2025-12-11T00:27:54.5865806Z      [90m 309 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:27:54.5866288Z     [31m[1m>[22m[39m[90m 310 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5866672Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T00:27:54.5866936Z      [90m 311 |[39m
2025-12-11T00:27:54.5867479Z      [90m 312 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T00:27:54.5868288Z      [90m 313 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'slug'[39m[33m,[39m eventSlug1)[33m;[39m[0m
2025-12-11T00:27:54.5868665Z 
2025-12-11T00:27:54.5868839Z       at Object.<anonymous> (events/events.e2e-spec.ts:310:9)
2025-12-11T00:27:54.5869118Z       ----
2025-12-11T00:27:54.5869415Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5869793Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5870172Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5870590Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5870979Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5871319Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5871973Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5872596Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5873078Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5873367Z 
2025-12-11T00:27:54.5873768Z   ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - ADMIN (proprietário)
2025-12-11T00:27:54.5874097Z 
2025-12-11T00:27:54.5874222Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:27:54.5874393Z 
2025-12-11T00:27:54.5874525Z     [0m [90m 330 |[39m       )
2025-12-11T00:27:54.5874845Z      [90m 331 |[39m         [33m.[39msend(updateDto)
2025-12-11T00:27:54.5875291Z     [31m[1m>[22m[39m[90m 332 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5875676Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5875941Z      [90m 333 |[39m
2025-12-11T00:27:54.5876500Z      [90m 334 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T00:27:54.5877351Z      [90m 335 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m updateDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:27:54.5877883Z 
2025-12-11T00:27:54.5878055Z       at Object.<anonymous> (events/events.e2e-spec.ts:332:10)
2025-12-11T00:27:54.5878342Z       ----
2025-12-11T00:27:54.5878634Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5879006Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5879389Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5879810Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5880205Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5880553Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5880951Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5881405Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5882011Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5882290Z 
2025-12-11T00:27:54.5882676Z   ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - MANAGER (proprietário)
2025-12-11T00:27:54.5883018Z 
2025-12-11T00:27:54.5883136Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:27:54.5883307Z 
2025-12-11T00:27:54.5883436Z     [0m [90m 350 |[39m       )
2025-12-11T00:27:54.5883750Z      [90m 351 |[39m         [33m.[39msend(updateDto)
2025-12-11T00:27:54.5884194Z     [31m[1m>[22m[39m[90m 352 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:27:54.5884582Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5884838Z      [90m 353 |[39m
2025-12-11T00:27:54.5885386Z      [90m 354 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId2)[33m;[39m
2025-12-11T00:27:54.5886235Z      [90m 355 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m updateDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:27:54.5886654Z 
2025-12-11T00:27:54.5886827Z       at Object.<anonymous> (events/events.e2e-spec.ts:352:10)
2025-12-11T00:27:54.5887100Z       ----
2025-12-11T00:27:54.5887392Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5887840Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5888225Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5888642Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5889028Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5889379Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5889897Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5890344Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5890817Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5891095Z 
2025-12-11T00:27:54.5891507Z   ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - ADMIN (proprietário)
2025-12-11T00:27:54.5891971Z 
2025-12-11T00:27:54.5892103Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:54.5892278Z 
2025-12-11T00:27:54.5892606Z     [0m [90m 381 |[39m           state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m
2025-12-11T00:27:54.5893005Z      [90m 382 |[39m         })
2025-12-11T00:27:54.5893403Z     [31m[1m>[22m[39m[90m 383 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:54.5893794Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5894055Z      [90m 384 |[39m
2025-12-11T00:27:54.5894573Z      [90m 385 |[39m       [36mconst[39m eventToPublishId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:54.5895139Z      [90m 386 |[39m[0m
2025-12-11T00:27:54.5895264Z 
2025-12-11T00:27:54.5895432Z       at Object.<anonymous> (events/events.e2e-spec.ts:383:10)
2025-12-11T00:27:54.5895710Z       ----
2025-12-11T00:27:54.5895994Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5896364Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5896740Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5897155Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5897543Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5897883Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5898278Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5898722Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5899190Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5899474Z 
2025-12-11T00:27:54.5899881Z   ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - MANAGER (proprietário)
2025-12-11T00:27:54.5900239Z 
2025-12-11T00:27:54.5900364Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:27:54.5900540Z 
2025-12-11T00:27:54.5900865Z     [0m [90m 426 |[39m           state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m
2025-12-11T00:27:54.5901254Z      [90m 427 |[39m         })
2025-12-11T00:27:54.5901793Z     [31m[1m>[22m[39m[90m 428 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:27:54.5902195Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:27:54.5902456Z      [90m 429 |[39m
2025-12-11T00:27:54.5902970Z      [90m 430 |[39m       [36mconst[39m eventToPublishId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:27:54.5903419Z      [90m 431 |[39m[0m
2025-12-11T00:27:54.5903541Z 
2025-12-11T00:27:54.5903705Z       at Object.<anonymous> (events/events.e2e-spec.ts:428:10)
2025-12-11T00:27:54.5903985Z       ----
2025-12-11T00:27:54.5904272Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:27:54.5904636Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:27:54.5905026Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:27:54.5905445Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:27:54.5905839Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:27:54.5906190Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:27:54.5906704Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:27:54.5907156Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:27:54.5907628Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:27:54.5907908Z 
2025-12-11T00:28:05.2680030Z PASS test/users.e2e-spec.ts (14.628 s)
2025-12-11T00:28:05.2687524Z   ● Console
2025-12-11T00:28:05.2687698Z 
2025-12-11T00:28:05.2687817Z     console.log
2025-12-11T00:28:05.2688692Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🛠️  run anywhere with `dotenvx run -- yourcommand`
2025-12-11T00:28:05.2689242Z 
2025-12-11T00:28:05.2689496Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:05.2689835Z 
2025-12-11T00:28:05.2689958Z     console.log
2025-12-11T00:28:05.2690683Z       [setupTestUsers] ✅ Porta detectada: 37381, USERS_API_URL: http://localhost:37381/v1
2025-12-11T00:28:05.2691019Z 
2025-12-11T00:28:05.2691224Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:28:05.2691433Z 
2025-12-11T00:28:07.2051564Z [31m[Nest] 3781  - [39m12/11/2025, 12:28:07 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório e07c7de9-796c-4b2c-bed5-63d896cf573d (attempt 1):[39m
2025-12-11T00:28:07.2053701Z Relation with property path patrimonio in entity was not found.
2025-12-11T00:28:07.2105035Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:07 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório a0bc4d0a-254a-4448-a412-9e3926addaa5 (attempt 1):[39m
2025-12-11T00:28:07.2108070Z No metadata for "Patrimonio" was found.
2025-12-11T00:28:07.3068210Z [31m[Nest] 3788  - [39m12/11/2025, 12:28:07 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório f76e3a15-3327-4377-85c7-23fbfcc89da5 (attempt 1):[39m
2025-12-11T00:28:07.3069671Z No metadata for "Patrimonio" was found.
2025-12-11T00:28:09.2942524Z [31m[Nest] 3781  - [39m12/11/2025, 12:28:09 AM [31m  ERROR[39m [38;5;3m[LoggingInterceptor] [39m[31mGET /v1/reports/f76e3a15-3327-4377-85c7-23fbfcc89da5/download 500 - 13ms[39m
2025-12-11T00:28:09.3135119Z [31m[Nest] 3781  - [39m12/11/2025, 12:28:09 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório 56f7166b-b55e-49d0-a495-f399b5d0fee2 (attempt 1):[39m
2025-12-11T00:28:09.3136044Z No metadata for "Patrimonio" was found.
2025-12-11T00:28:12.2568731Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:12 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório a0bc4d0a-254a-4448-a412-9e3926addaa5 (attempt 1):[39m
2025-12-11T00:28:12.2569958Z No metadata for "Patrimonio" was found.
2025-12-11T00:28:12.4831304Z [31m[Nest] 3788  - [39m12/11/2025, 12:28:12 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório f76e3a15-3327-4377-85c7-23fbfcc89da5 (attempt 1):[39m
2025-12-11T00:28:12.4833191Z No metadata for "Patrimonio" was found.
2025-12-11T00:28:14.3413853Z [31m[Nest] 3781  - [39m12/11/2025, 12:28:14 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório 56f7166b-b55e-49d0-a495-f399b5d0fee2 (attempt 1):[39m
2025-12-11T00:28:14.3414872Z No metadata for "Patrimonio" was found.
2025-12-11T00:28:19.2574611Z PASS test/reports-metrics/reports-metrics.e2e-spec.ts (13.979 s)
2025-12-11T00:28:19.2602720Z   ● Console
2025-12-11T00:28:19.2602913Z 
2025-12-11T00:28:19.2603047Z     console.log
2025-12-11T00:28:19.2604106Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent building .env in docker: https://dotenvx.com/prebuild
2025-12-11T00:28:19.2604743Z 
2025-12-11T00:28:19.2605003Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:19.2605339Z 
2025-12-11T00:28:19.2605520Z     console.log
2025-12-11T00:28:19.2609144Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:f76e3a15-3327-4377-85c7-23fbfcc89da5","job:f76e3a15-3327-4377-85c7-23fbfcc89da5"],"jobId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","model":"patrimonio","requestId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:07.277Z","type":"csv"}
2025-12-11T00:28:19.2611471Z 
2025-12-11T00:28:19.2612237Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:19.2612762Z 
2025-12-11T00:28:19.2612897Z     console.log
2025-12-11T00:28:19.2616358Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:f76e3a15-3327-4377-85c7-23fbfcc89da5","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":22,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:07.303Z","type":"csv","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:19.2618847Z 
2025-12-11T00:28:19.2619352Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:19.2619903Z 
2025-12-11T00:28:19.2620034Z     console.log
2025-12-11T00:28:19.2621248Z       [setupTestUsers] ✅ Porta detectada: 41519, USERS_API_URL: http://localhost:41519/v1
2025-12-11T00:28:19.2622024Z 
2025-12-11T00:28:19.2622315Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:28:19.2622700Z 
2025-12-11T00:28:19.2622827Z     console.log
2025-12-11T00:28:19.2626020Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:f76e3a15-3327-4377-85c7-23fbfcc89da5","job:f76e3a15-3327-4377-85c7-23fbfcc89da5"],"jobId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","model":"patrimonio","requestId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:12.438Z","type":"csv"}
2025-12-11T00:28:19.2628246Z 
2025-12-11T00:28:19.2628721Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:19.2629224Z 
2025-12-11T00:28:19.2629343Z     console.log
2025-12-11T00:28:19.2632972Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:f76e3a15-3327-4377-85c7-23fbfcc89da5","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":42,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:12.481Z","type":"csv","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:19.2635471Z 
2025-12-11T00:28:19.2635918Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:19.2636444Z 
2025-12-11T00:28:19.3336473Z [31m[Nest] 3781  - [39m12/11/2025, 12:28:19 AM [31m  ERROR[39m [38;5;3m[LoggingInterceptor] [39m[31mGET /v1/reports/56f7166b-b55e-49d0-a495-f399b5d0fee2/download 500 - 16ms[39m
2025-12-11T00:28:20.3903107Z PASS test/reports/reports.e2e-spec.ts (25.807 s)
2025-12-11T00:28:20.4164157Z   ● Console
2025-12-11T00:28:20.4164372Z 
2025-12-11T00:28:20.4164493Z     console.log
2025-12-11T00:28:20.4165503Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 📡 add observability to secrets: https://dotenvx.com/ops
2025-12-11T00:28:20.4166124Z 
2025-12-11T00:28:20.4166389Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:20.4166727Z 
2025-12-11T00:28:20.4166845Z     console.log
2025-12-11T00:28:20.4167637Z       [setupTestUsers] ✅ Porta detectada: 46827, USERS_API_URL: http://localhost:46827/v1
2025-12-11T00:28:20.4168146Z 
2025-12-11T00:28:20.4168420Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:28:20.4168792Z 
2025-12-11T00:28:20.4168926Z     console.log
2025-12-11T00:28:20.4172541Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:a0bc4d0a-254a-4448-a412-9e3926addaa5","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"model":"patrimonio","requestId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:28:07.153Z","type":"csv","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:20.4174727Z 
2025-12-11T00:28:20.4175176Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4175694Z 
2025-12-11T00:28:20.4175812Z     console.log
2025-12-11T00:28:20.4178841Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:e07c7de9-796c-4b2c-bed5-63d896cf573d","user:e39d5d53-b45f-423e-80b4-d39f23f9e0c9"],"model":"manutencao","requestId":"e07c7de9-796c-4b2c-bed5-63d896cf573d","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:28:07.179Z","type":"pdf","userId":"e39d5d53-b45f-423e-80b4-d39f23f9e0c9"}
2025-12-11T00:28:20.4181068Z 
2025-12-11T00:28:20.4181547Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4182286Z 
2025-12-11T00:28:20.4182441Z     console.log
2025-12-11T00:28:20.4185648Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:e07c7de9-796c-4b2c-bed5-63d896cf573d","job:e07c7de9-796c-4b2c-bed5-63d896cf573d"],"jobId":"e07c7de9-796c-4b2c-bed5-63d896cf573d","model":"manutencao","requestId":"e07c7de9-796c-4b2c-bed5-63d896cf573d","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:07.185Z","type":"pdf"}
2025-12-11T00:28:20.4188205Z 
2025-12-11T00:28:20.4188648Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4189164Z 
2025-12-11T00:28:20.4189296Z     console.log
2025-12-11T00:28:20.4243136Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:e07c7de9-796c-4b2c-bed5-63d896cf573d","user:e39d5d53-b45f-423e-80b4-d39f23f9e0c9"],"durationMs":14,"error":"Relation with property path patrimonio in entity was not found.","model":"manutencao","requestId":"e07c7de9-796c-4b2c-bed5-63d896cf573d","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:07.202Z","type":"pdf","userId":"e39d5d53-b45f-423e-80b4-d39f23f9e0c9"}
2025-12-11T00:28:20.4245235Z 
2025-12-11T00:28:20.4245619Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4246017Z 
2025-12-11T00:28:20.4246116Z     console.log
2025-12-11T00:28:20.4248514Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:f76e3a15-3327-4377-85c7-23fbfcc89da5","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"model":"patrimonio","requestId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:28:07.274Z","type":"csv","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:20.4250160Z 
2025-12-11T00:28:20.4250502Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4250896Z 
2025-12-11T00:28:20.4251008Z     console.log
2025-12-11T00:28:20.4254550Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:f76e3a15-3327-4377-85c7-23fbfcc89da5","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":5,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:09.291Z","type":"csv","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:20.4257116Z 
2025-12-11T00:28:20.4257603Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4258161Z 
2025-12-11T00:28:20.4258306Z     console.log
2025-12-11T00:28:20.4262046Z       [32minfo[39m: Solicitação de relatório criada {"correlationIds":["request:56f7166b-b55e-49d0-a495-f399b5d0fee2","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"model":"patrimonio","requestId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","service":"patrimonio-inventario-api","status":"created","timestamp":"2025-12-11T00:28:09.303Z","type":"pdf","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:20.4264347Z 
2025-12-11T00:28:20.4264827Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4265373Z 
2025-12-11T00:28:20.4265525Z     console.log
2025-12-11T00:28:20.4268864Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:56f7166b-b55e-49d0-a495-f399b5d0fee2","job:56f7166b-b55e-49d0-a495-f399b5d0fee2"],"jobId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","model":"patrimonio","requestId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:09.305Z","type":"pdf"}
2025-12-11T00:28:20.4271206Z 
2025-12-11T00:28:20.4301927Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4302554Z 
2025-12-11T00:28:20.4302704Z     console.log
2025-12-11T00:28:20.4306357Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:56f7166b-b55e-49d0-a495-f399b5d0fee2","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":6,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:09.312Z","type":"pdf","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:20.4309131Z 
2025-12-11T00:28:20.4309634Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4310144Z 
2025-12-11T00:28:20.4310283Z     console.log
2025-12-11T00:28:20.4313687Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:56f7166b-b55e-49d0-a495-f399b5d0fee2","job:56f7166b-b55e-49d0-a495-f399b5d0fee2"],"jobId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","model":"patrimonio","requestId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:14.329Z","type":"pdf"}
2025-12-11T00:28:20.4315950Z 
2025-12-11T00:28:20.4316415Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4316966Z 
2025-12-11T00:28:20.4317115Z     console.log
2025-12-11T00:28:20.4320595Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:56f7166b-b55e-49d0-a495-f399b5d0fee2","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":10,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:14.340Z","type":"pdf","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:20.4323183Z 
2025-12-11T00:28:20.4323672Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4324222Z 
2025-12-11T00:28:20.4324353Z     console.log
2025-12-11T00:28:20.4327746Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:56f7166b-b55e-49d0-a495-f399b5d0fee2","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":5,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:19.325Z","type":"pdf","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:28:20.4330199Z 
2025-12-11T00:28:20.4330663Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:20.4331118Z 
2025-12-11T00:28:27.2747557Z [31m[Nest] 3781  - [39m12/11/2025, 12:28:27 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório a0bc4d0a-254a-4448-a412-9e3926addaa5 (attempt 1):[39m
2025-12-11T00:28:27.2748834Z Solicitação a0bc4d0a-254a-4448-a412-9e3926addaa5 não encontrada
2025-12-11T00:28:27.4962748Z [31m[Nest] 3788  - [39m12/11/2025, 12:28:27 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório f76e3a15-3327-4377-85c7-23fbfcc89da5 (attempt 1):[39m
2025-12-11T00:28:27.4964360Z Solicitação f76e3a15-3327-4377-85c7-23fbfcc89da5 não encontrada
2025-12-11T00:28:29.3480334Z [31m[Nest] 3781  - [39m12/11/2025, 12:28:29 AM [31m  ERROR[39m [38;5;3m[ReportProcessor] [39m[31mErro ao processar relatório 56f7166b-b55e-49d0-a495-f399b5d0fee2 (attempt 1):[39m
2025-12-11T00:28:29.3482302Z Solicitação 56f7166b-b55e-49d0-a495-f399b5d0fee2 não encontrada
2025-12-11T00:28:33.5229467Z PASS test/categorias/categorias.e2e-spec.ts (14.256 s)
2025-12-11T00:28:33.5251954Z   ● Console
2025-12-11T00:28:33.5252633Z 
2025-12-11T00:28:33.5253029Z     console.log
2025-12-11T00:28:33.5254356Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit
2025-12-11T00:28:33.5255328Z 
2025-12-11T00:28:33.5256049Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:33.5256638Z 
2025-12-11T00:28:33.5262822Z     console.log
2025-12-11T00:28:33.5263693Z       [setupTestUsers] ✅ Porta detectada: 34103, USERS_API_URL: http://localhost:34103/v1
2025-12-11T00:28:33.5264646Z 
2025-12-11T00:28:33.5264917Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:28:33.5265270Z 
2025-12-11T00:28:33.5265390Z     console.log
2025-12-11T00:28:33.5267917Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:f76e3a15-3327-4377-85c7-23fbfcc89da5","job:f76e3a15-3327-4377-85c7-23fbfcc89da5"],"jobId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","model":"patrimonio","requestId":"f76e3a15-3327-4377-85c7-23fbfcc89da5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:27.490Z","type":"csv"}
2025-12-11T00:28:33.5270350Z 
2025-12-11T00:28:33.5270844Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:33.5271388Z 
2025-12-11T00:28:35.0997283Z PASS test/audit/audit.e2e-spec.ts (14.664 s)
2025-12-11T00:28:35.1029244Z   ● Console
2025-12-11T00:28:35.1029733Z 
2025-12-11T00:28:35.1030108Z     console.log
2025-12-11T00:28:35.1031562Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 👥 sync secrets across teammates & machines: https://dotenvx.com/ops
2025-12-11T00:28:35.1037318Z 
2025-12-11T00:28:35.1037619Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:35.1038003Z 
2025-12-11T00:28:35.1038138Z     console.log
2025-12-11T00:28:35.1038978Z       [setupTestUsers] ✅ Porta detectada: 38223, USERS_API_URL: http://localhost:38223/v1
2025-12-11T00:28:35.1039527Z 
2025-12-11T00:28:35.1039797Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:28:35.1040144Z 
2025-12-11T00:28:35.1040272Z     console.log
2025-12-11T00:28:35.1044466Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:a0bc4d0a-254a-4448-a412-9e3926addaa5","job:a0bc4d0a-254a-4448-a412-9e3926addaa5"],"jobId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","model":"patrimonio","requestId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:27.264Z","type":"csv"}
2025-12-11T00:28:35.1046851Z 
2025-12-11T00:28:35.1047338Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:35.1047891Z 
2025-12-11T00:28:35.1048024Z     console.log
2025-12-11T00:28:35.1051248Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:56f7166b-b55e-49d0-a495-f399b5d0fee2","job:56f7166b-b55e-49d0-a495-f399b5d0fee2"],"jobId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","model":"patrimonio","requestId":"56f7166b-b55e-49d0-a495-f399b5d0fee2","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:29.345Z","type":"pdf"}
2025-12-11T00:28:35.1053723Z 
2025-12-11T00:28:35.1054578Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:28:35.1055111Z 
2025-12-11T00:28:38.3527563Z PASS test/enums/enums.e2e-spec.ts
2025-12-11T00:28:38.3537254Z   ● Console
2025-12-11T00:28:38.3537442Z 
2025-12-11T00:28:38.3537573Z     console.log
2025-12-11T00:28:38.3538570Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔄 add secrets lifecycle management: https://dotenvx.com/ops
2025-12-11T00:28:38.3539205Z 
2025-12-11T00:28:38.3539472Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:38.3539803Z 
2025-12-11T00:28:41.3567141Z PASS test/metrics/metrics.e2e-spec.ts
2025-12-11T00:28:41.3576135Z   ● Console
2025-12-11T00:28:41.3576553Z 
2025-12-11T00:28:41.3595288Z     console.log
2025-12-11T00:28:41.3598332Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
2025-12-11T00:28:41.3600330Z 
2025-12-11T00:28:41.3600705Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:41.3602804Z 
2025-12-11T00:28:42.1909239Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:42 AM [31m  ERROR[39m [38;5;3m[JwtAuthGuard] [39m[31mToken inválido:[39m
2025-12-11T00:28:42.1915421Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:42 AM [31m  ERROR[39m [38;5;3m[JwtAuthGuard] [39m[31mjwt malformed[39m
2025-12-11T00:28:42.1926012Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:42 AM [31m  ERROR[39m [38;5;3m[JwtAuthGuard] [39mJsonWebTokenError {
2025-12-11T00:28:42.1928127Z   name: [32m'JsonWebTokenError'[39m,
2025-12-11T00:28:42.1928800Z   message: [32m'jwt malformed'[39m
2025-12-11T00:28:42.1929237Z }
2025-12-11T00:28:42.1998404Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:42 AM [31m  ERROR[39m [38;5;3m[JwtAuthGuard] [39m[31mToken inválido:[39m
2025-12-11T00:28:42.2000211Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:42 AM [31m  ERROR[39m [38;5;3m[JwtAuthGuard] [39m[31minvalid signature[39m
2025-12-11T00:28:42.2002007Z [31m[Nest] 3782  - [39m12/11/2025, 12:28:42 AM [31m  ERROR[39m [38;5;3m[JwtAuthGuard] [39mJsonWebTokenError {
2025-12-11T00:28:42.2002997Z   name: [32m'JsonWebTokenError'[39m,
2025-12-11T00:28:42.2003641Z   message: [32m'invalid signature'[39m
2025-12-11T00:28:42.2004105Z }
2025-12-11T00:28:44.4612661Z PASS test/app.e2e-spec.ts
2025-12-11T00:28:44.4618675Z   ● Console
2025-12-11T00:28:44.4618818Z 
2025-12-11T00:28:44.4618903Z     console.log
2025-12-11T00:28:44.4619498Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 📡 add observability to secrets: https://dotenvx.com/ops
2025-12-11T00:28:44.4619849Z 
2025-12-11T00:28:44.4620000Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:44.4620192Z 
2025-12-11T00:28:48.1233702Z PASS test/cache/cache.e2e-spec.ts (14.59 s)
2025-12-11T00:28:48.1243458Z   ● Console
2025-12-11T00:28:48.1243599Z 
2025-12-11T00:28:48.1243690Z     console.log
2025-12-11T00:28:48.1244235Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
2025-12-11T00:28:48.1244557Z 
2025-12-11T00:28:48.1244745Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:28:48.1244950Z 
2025-12-11T00:28:48.1245029Z     console.log
2025-12-11T00:28:48.1245501Z       [setupTestUsers] ✅ Porta detectada: 39273, USERS_API_URL: http://localhost:39273/v1
2025-12-11T00:28:48.1245810Z 
2025-12-11T00:28:48.1245971Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:28:48.1246167Z 
2025-12-11T00:30:03.3225450Z FAIL test/auth/auth.e2e-spec.ts (185.238 s)
2025-12-11T00:30:03.3253835Z   ● Console
2025-12-11T00:30:03.3254031Z 
2025-12-11T00:30:03.3254115Z     console.log
2025-12-11T00:30:03.3254829Z       [dotenv@17.2.3] injecting env (9) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
2025-12-11T00:30:03.3255421Z 
2025-12-11T00:30:03.3255677Z       at _log (../node_modules/dotenv/lib/main.js:142:11)
2025-12-11T00:30:03.3255977Z 
2025-12-11T00:30:03.3256082Z     console.log
2025-12-11T00:30:03.3257310Z       [setupTestUsers] ✅ Porta detectada: 38107, USERS_API_URL: http://localhost:38107/v1
2025-12-11T00:30:03.3257831Z 
2025-12-11T00:30:03.3258093Z       at setupTestUsers (helpers/auth-helper.ts:449:13)
2025-12-11T00:30:03.3258431Z 
2025-12-11T00:30:03.3258541Z     console.log
2025-12-11T00:30:03.3261421Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:a0bc4d0a-254a-4448-a412-9e3926addaa5","job:a0bc4d0a-254a-4448-a412-9e3926addaa5"],"jobId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","model":"patrimonio","requestId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:07.164Z","type":"csv"}
2025-12-11T00:30:03.3263917Z 
2025-12-11T00:30:03.3264408Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:30:03.3264918Z 
2025-12-11T00:30:03.3265042Z     console.log
2025-12-11T00:30:03.3268419Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:a0bc4d0a-254a-4448-a412-9e3926addaa5","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":28,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:07.202Z","type":"csv","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:30:03.3271136Z 
2025-12-11T00:30:03.3271580Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:30:03.3272372Z 
2025-12-11T00:30:03.3272496Z     console.log
2025-12-11T00:30:03.3275501Z       [32minfo[39m: Processando relatório da fila {"attempt":1,"correlationIds":["request:a0bc4d0a-254a-4448-a412-9e3926addaa5","job:a0bc4d0a-254a-4448-a412-9e3926addaa5"],"jobId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","model":"patrimonio","requestId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","service":"patrimonio-inventario-api","status":"processing","timestamp":"2025-12-11T00:28:12.245Z","type":"csv"}
2025-12-11T00:30:03.3277671Z 
2025-12-11T00:30:03.3278098Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:30:03.3278665Z 
2025-12-11T00:30:03.3278785Z     console.log
2025-12-11T00:30:03.3282216Z       [31merror[39m: Falha ao processar relatório {"correlationIds":["request:a0bc4d0a-254a-4448-a412-9e3926addaa5","user:9c05daf4-3218-4509-ae91-c9ada8bc19a1"],"durationMs":9,"error":"No metadata for \"Patrimonio\" was found.","model":"patrimonio","requestId":"a0bc4d0a-254a-4448-a412-9e3926addaa5","service":"patrimonio-inventario-api","status":"failed","timestamp":"2025-12-11T00:28:12.255Z","type":"csv","userId":"9c05daf4-3218-4509-ae91-c9ada8bc19a1"}
2025-12-11T00:30:03.3284551Z 
2025-12-11T00:30:03.3284976Z       at Console.log (../node_modules/winston/lib/winston/transports/console.js:87:23)
2025-12-11T00:30:03.3285467Z 
2025-12-11T00:30:03.3286040Z   ● Auth (e2e) › GET /v1/auth/me › deve retornar informações do usuário autenticado (200)
2025-12-11T00:30:03.3286522Z 
2025-12-11T00:30:03.3286749Z     expected 200 "OK", got 401 "Unauthorized"
2025-12-11T00:30:03.3287059Z 
2025-12-11T00:30:03.3287479Z     [0m [90m 260 |[39m         [33m.[39m[36mget[39m([32m'/v1/auth/me'[39m)
2025-12-11T00:30:03.3289274Z      [90m 261 |[39m         [33m.[39m[36mset[39m([32m'Authorization'[39m[33m,[39m [32m`***
2025-12-11T00:30:03.3290207Z     [31m[1m>[22m[39m[90m 262 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.3290875Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.3291329Z      [90m 263 |[39m
2025-12-11T00:30:03.3292304Z      [90m 264 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:30:03.3293626Z      [90m 265 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'email'[39m[33m,[39m testUserEmail)[33m;[39m[0m
2025-12-11T00:30:03.3294306Z 
2025-12-11T00:30:03.3294575Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:262:10)
2025-12-11T00:30:03.3295308Z       ----
2025-12-11T00:30:03.3295821Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.3296481Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.3297144Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.3297855Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.3298539Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.3299144Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.3299819Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.3300583Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.3301394Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.3302056Z 
2025-12-11T00:30:03.3302647Z   ● Auth (e2e) › POST /v1/auth/refresh › deve renovar tokens com refresh token válido (200)
2025-12-11T00:30:03.3303153Z 
2025-12-11T00:30:03.3303330Z     Expected 200 or 201, got 401
2025-12-11T00:30:03.3303964Z 
2025-12-11T00:30:03.3304457Z     [0m [90m 343 |[39m           refreshToken[33m:[39m originalRefreshToken[33m,[39m
2025-12-11T00:30:03.3305099Z      [90m 344 |[39m         })
2025-12-11T00:30:03.3305754Z     [31m[1m>[22m[39m[90m 345 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.3306410Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.3307070Z      [90m 346 |[39m           [90m// Refresh pode retornar 200 ou 201[39m
2025-12-11T00:30:03.3308216Z      [90m 347 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.3309592Z      [90m 348 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.3310218Z 
2025-12-11T00:30:03.3310474Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:345:10)
2025-12-11T00:30:03.3310925Z       ----
2025-12-11T00:30:03.3311277Z       at auth/auth.e2e-spec.ts:348:19
2025-12-11T00:30:03.3312006Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.3312706Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.3313443Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.3314125Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.3314750Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.3315434Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.3316207Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.3317049Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.3317565Z 
2025-12-11T00:30:03.3318174Z   ● Auth (e2e) › POST /v1/auth/refresh › deve revogar refresh token antigo após renovação
2025-12-11T00:30:03.3318686Z 
2025-12-11T00:30:03.3318857Z     Expected 200 or 201, got 401
2025-12-11T00:30:03.3319109Z 
2025-12-11T00:30:03.3319598Z     [0m [90m 423 |[39m           refreshToken[33m:[39m originalRefreshToken[33m,[39m
2025-12-11T00:30:03.3320255Z      [90m 424 |[39m         })
2025-12-11T00:30:03.3320911Z     [31m[1m>[22m[39m[90m 425 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.3321581Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.3322449Z      [90m 426 |[39m           [90m// Refresh pode retornar 200 ou 201[39m
2025-12-11T00:30:03.3323613Z      [90m 427 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.3325244Z      [90m 428 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.3325885Z 
2025-12-11T00:30:03.3326156Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:425:10)
2025-12-11T00:30:03.3326609Z       ----
2025-12-11T00:30:03.3326950Z       at auth/auth.e2e-spec.ts:428:19
2025-12-11T00:30:03.3327440Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.3328102Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.3328832Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.3329495Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.3330087Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.3330759Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.3331515Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.3332495Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.3333225Z 
2025-12-11T00:30:03.3333723Z   ● Auth (e2e) › POST /v1/auth/logout › deve revogar refresh token após logout
2025-12-11T00:30:03.3334150Z 
2025-12-11T00:30:03.3334324Z     Expected 200 or 201, got 429
2025-12-11T00:30:03.3334563Z 
2025-12-11T00:30:03.3334990Z     [0m [90m 516 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T00:30:03.3335595Z      [90m 517 |[39m         })
2025-12-11T00:30:03.3336251Z     [31m[1m>[22m[39m[90m 518 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.3336904Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.3337543Z      [90m 519 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T00:30:03.3338669Z      [90m 520 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.3340011Z      [90m 521 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.3340621Z 
2025-12-11T00:30:03.3340865Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:518:10)
2025-12-11T00:30:03.3341295Z       ----
2025-12-11T00:30:03.3341760Z       at auth/auth.e2e-spec.ts:521:19
2025-12-11T00:30:03.3342234Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.3342882Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.3343556Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.3344177Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.3344745Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.3345372Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.3346134Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.3346867Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.3347305Z 
2025-12-11T00:30:03.3347771Z   ● Auth (e2e) › POST /v1/auth/logout › deve permitir logout múltiplo (idempotente)
2025-12-11T00:30:03.3348199Z 
2025-12-11T00:30:03.3348349Z     Expected 200 or 201, got 429
2025-12-11T00:30:03.3348572Z 
2025-12-11T00:30:03.3348961Z     [0m [90m 556 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T00:30:03.3349500Z      [90m 557 |[39m         })
2025-12-11T00:30:03.3350079Z     [31m[1m>[22m[39m[90m 558 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.3350671Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.3351250Z      [90m 559 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T00:30:03.3352668Z      [90m 560 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.3353936Z      [90m 561 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.3354501Z 
2025-12-11T00:30:03.3354737Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:558:10)
2025-12-11T00:30:03.3355141Z       ----
2025-12-11T00:30:03.3355442Z       at auth/auth.e2e-spec.ts:561:19
2025-12-11T00:30:03.3355889Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.3356488Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.3357138Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.3357735Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.3358275Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.3358901Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.3359585Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.3360551Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.3360996Z 
2025-12-11T00:30:03.3361577Z   ● Auth (e2e) › Fluxo completo de autenticação › deve permitir login -> me -> refresh -> logout
2025-12-11T00:30:03.3362263Z 
2025-12-11T00:30:03.3362448Z     Expected 200 or 201, got 429
2025-12-11T00:30:03.3362683Z 
2025-12-11T00:30:03.3363130Z     [0m [90m 605 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T00:30:03.3363711Z      [90m 606 |[39m         })
2025-12-11T00:30:03.3364324Z     [31m[1m>[22m[39m[90m 607 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.3364903Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.3365507Z      [90m 608 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T00:30:03.3366556Z      [90m 609 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.3367823Z      [90m 610 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.3368405Z 
2025-12-11T00:30:03.3368656Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:607:10)
2025-12-11T00:30:03.3369075Z       ----
2025-12-11T00:30:03.3369382Z       at auth/auth.e2e-spec.ts:610:19
2025-12-11T00:30:03.3369838Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.3370455Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.3371120Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.3371943Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.3372519Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.3373137Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.3373848Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.3374597Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.3375046Z 
2025-12-11T00:30:03.4516838Z Summary of all failing tests
2025-12-11T00:30:03.4524578Z FAIL patrimonio/patrimonio-completo.e2e-spec.ts (35.948 s)
2025-12-11T00:30:03.4532675Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › POST /v1/patrimonio - Criar patrimônio › deve criar patrimônio com sucesso (ADMIN)
2025-12-11T00:30:03.4533249Z 
2025-12-11T00:30:03.4533452Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4533731Z 
2025-12-11T00:30:03.4535362Z     [0m [90m 180 |[39m         )
2025-12-11T00:30:03.4538597Z      [90m 181 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.4544189Z     [31m[1m>[22m[39m[90m 182 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4546424Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4551875Z      [90m 183 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4560456Z      [90m 184 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4566876Z      [90m 185 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4567596Z 
2025-12-11T00:30:03.4572188Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:182:12)
2025-12-11T00:30:03.4572892Z       ----
2025-12-11T00:30:03.4573428Z       at patrimonio/patrimonio-completo.e2e-spec.ts:185:21
2025-12-11T00:30:03.4576984Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4581781Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4592594Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4595667Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4596496Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4598349Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4599148Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4632644Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4633641Z 
2025-12-11T00:30:03.4635000Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › POST /v1/patrimonio - Criar patrimônio › deve criar patrimônio com sucesso (MANAGER)
2025-12-11T00:30:03.4638403Z 
2025-12-11T00:30:03.4642980Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4643297Z 
2025-12-11T00:30:03.4643631Z     [0m [90m 215 |[39m         )
2025-12-11T00:30:03.4644264Z      [90m 216 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.4645060Z     [31m[1m>[22m[39m[90m 217 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4645759Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4646626Z      [90m 218 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4648277Z      [90m 219 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4649976Z      [90m 220 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4650662Z 
2025-12-11T00:30:03.4651130Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:217:12)
2025-12-11T00:30:03.4651982Z       ----
2025-12-11T00:30:03.4652471Z       at patrimonio/patrimonio-completo.e2e-spec.ts:220:21
2025-12-11T00:30:03.4653288Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4654095Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4654973Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4655773Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4656493Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4662604Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4676587Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4677820Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4679573Z 
2025-12-11T00:30:03.4680641Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › GET /v1/patrimonio/:id - Buscar por ID › deve buscar patrimônio por ID
2025-12-11T00:30:03.4681478Z 
2025-12-11T00:30:03.4681932Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:30:03.4682257Z 
2025-12-11T00:30:03.4682926Z     [0m [90m 305 |[39m         [36mconst[39m response [33m=[39m [36mawait[39m request(httpServer)
2025-12-11T00:30:03.4684025Z      [90m 306 |[39m           [33m.[39m[36mget[39m([32m`/v1/patrimonio/${patrimonio1Id}`[39m)
2025-12-11T00:30:03.4685028Z     [31m[1m>[22m[39m[90m 307 |[39m           [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.4685772Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4686260Z      [90m 308 |[39m
2025-12-11T00:30:03.4687244Z      [90m 309 |[39m         expect(response[33m.[39mbody[33m.[39mid)[33m.[39mtoBe(patrimonio1Id)[33m;[39m
2025-12-11T00:30:03.4700158Z      [90m 310 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'codigo'[39m)[33m;[39m[0m
2025-12-11T00:30:03.4701104Z 
2025-12-11T00:30:03.4701565Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:307:12)
2025-12-11T00:30:03.4702425Z       ----
2025-12-11T00:30:03.4702955Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.4703692Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4704382Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4705123Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4705818Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4706455Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4707155Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4707807Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4708336Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4708642Z 
2025-12-11T00:30:03.4709315Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › PATCH /v1/patrimonio/:id - Atualizar patrimônio › deve atualizar patrimônio com sucesso (ADMIN)
2025-12-11T00:30:03.4709797Z 
2025-12-11T00:30:03.4709913Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4710074Z 
2025-12-11T00:30:03.4710213Z     [0m [90m 331 |[39m         )
2025-12-11T00:30:03.4710559Z      [90m 332 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:30:03.4712621Z     [31m[1m>[22m[39m[90m 333 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4713414Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4714370Z      [90m 334 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4716136Z      [90m 335 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4717873Z      [90m 336 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4718535Z 
2025-12-11T00:30:03.4718962Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:333:12)
2025-12-11T00:30:03.4719701Z       ----
2025-12-11T00:30:03.4720785Z       at patrimonio/patrimonio-completo.e2e-spec.ts:336:21
2025-12-11T00:30:03.4721773Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4722549Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4723025Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4724134Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4724957Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4727099Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4728507Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4730623Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4731150Z 
2025-12-11T00:30:03.4735163Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › PATCH /v1/patrimonio/:id - Atualizar patrimônio › deve atualizar patrimônio com sucesso (MANAGER)
2025-12-11T00:30:03.4736036Z 
2025-12-11T00:30:03.4736226Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4736502Z 
2025-12-11T00:30:03.4736733Z     [0m [90m 356 |[39m         )
2025-12-11T00:30:03.4737303Z      [90m 357 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:30:03.4739610Z     [31m[1m>[22m[39m[90m 358 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4740420Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4743257Z      [90m 359 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4748586Z      [90m 360 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4751877Z      [90m 361 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4752371Z 
2025-12-11T00:30:03.4753155Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:358:12)
2025-12-11T00:30:03.4753760Z       ----
2025-12-11T00:30:03.4754434Z       at patrimonio/patrimonio-completo.e2e-spec.ts:361:21
2025-12-11T00:30:03.4755647Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4757828Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4758999Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4760693Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4761555Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4763797Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4765166Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4767219Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4767733Z 
2025-12-11T00:30:03.4771119Z   ● Patrimonio - Completo (e2e) › GRUPO 1: CRUD Básico › DELETE /v1/patrimonio/:id - Deletar patrimônio › deve deletar patrimônio com sucesso (ADMIN)
2025-12-11T00:30:03.4772103Z 
2025-12-11T00:30:03.4772312Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4772580Z 
2025-12-11T00:30:03.4772816Z     [0m [90m 383 |[39m         )
2025-12-11T00:30:03.4773403Z      [90m 384 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.4775125Z     [31m[1m>[22m[39m[90m 385 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4776274Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4778782Z      [90m 386 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4787353Z      [90m 387 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4790597Z      [90m 388 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4791306Z 
2025-12-11T00:30:03.4792096Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:385:12)
2025-12-11T00:30:03.4792766Z       ----
2025-12-11T00:30:03.4793229Z       at patrimonio/patrimonio-completo.e2e-spec.ts:388:21
2025-12-11T00:30:03.4793866Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4795730Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4798408Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4799116Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4799811Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4802793Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4803627Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4806055Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4807493Z 
2025-12-11T00:30:03.4808672Z   ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/codigo/:codigo › deve buscar patrimônio por código
2025-12-11T00:30:03.4809340Z 
2025-12-11T00:30:03.4809518Z     expected 200 "OK", got 404 "Not Found"
2025-12-11T00:30:03.4809696Z 
2025-12-11T00:30:03.4810790Z     [0m [90m 414 |[39m         [36mconst[39m response [33m=[39m [36mawait[39m request(httpServer)
2025-12-11T00:30:03.4813691Z      [90m 415 |[39m           [33m.[39m[36mget[39m([32m`/v1/patrimonio/codigo/${patrimonio1Codigo}`[39m)
2025-12-11T00:30:03.4814696Z     [31m[1m>[22m[39m[90m 416 |[39m           [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.4815211Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4815559Z      [90m 417 |[39m
2025-12-11T00:30:03.4819465Z      [90m 418 |[39m         expect(response[33m.[39mbody[33m.[39mcodigo)[33m.[39mtoBe(patrimonio1Codigo)[33m;[39m
2025-12-11T00:30:03.4820387Z      [90m 419 |[39m         [0m
2025-12-11T00:30:03.4820646Z 
2025-12-11T00:30:03.4821090Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:416:12)
2025-12-11T00:30:03.4821846Z       ----
2025-12-11T00:30:03.4822404Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.4823067Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4824357Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4826149Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4827517Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4828690Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4831542Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4832551Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4833313Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4833832Z 
2025-12-11T00:30:03.4837498Z   ● Patrimonio - Completo (e2e) › GRUPO 2: Buscas por Filtros › GET /v1/patrimonio/numero-serie/:numeroSerie › deve buscar patrimônio por número de série (ADMIN)
2025-12-11T00:30:03.4838440Z 
2025-12-11T00:30:03.4838568Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4838732Z 
2025-12-11T00:30:03.4838985Z     [0m [90m 488 |[39m         )
2025-12-11T00:30:03.4839592Z      [90m 489 |[39m           [33m.[39msend({ numeroSerie })
2025-12-11T00:30:03.4841038Z     [31m[1m>[22m[39m[90m 490 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4842057Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4844609Z      [90m 491 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4849616Z      [90m 492 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4852508Z      [90m 493 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4853261Z 
2025-12-11T00:30:03.4853702Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:490:12)
2025-12-11T00:30:03.4854304Z       ----
2025-12-11T00:30:03.4854750Z       at patrimonio/patrimonio-completo.e2e-spec.ts:493:21
2025-12-11T00:30:03.4855570Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4857397Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4858589Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4860123Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4860898Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4863032Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4864200Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4866164Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4866672Z 
2025-12-11T00:30:03.4869343Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio (ADMIN)
2025-12-11T00:30:03.4870115Z 
2025-12-11T00:30:03.4870294Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4870571Z 
2025-12-11T00:30:03.4870795Z     [0m [90m 628 |[39m         )
2025-12-11T00:30:03.4871368Z      [90m 629 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:30:03.4873174Z     [31m[1m>[22m[39m[90m 630 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4874219Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4876509Z      [90m 631 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4883472Z      [90m 632 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4886405Z      [90m 633 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4886915Z 
2025-12-11T00:30:03.4887371Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:630:12)
2025-12-11T00:30:03.4887976Z       ----
2025-12-11T00:30:03.4888862Z       at patrimonio/patrimonio-completo.e2e-spec.ts:633:21
2025-12-11T00:30:03.4889906Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4892023Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4893166Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4894769Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4895673Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4897742Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4899075Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4901309Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4902003Z 
2025-12-11T00:30:03.4904951Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio (MANAGER)
2025-12-11T00:30:03.4905737Z 
2025-12-11T00:30:03.4905928Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4906201Z 
2025-12-11T00:30:03.4906668Z     [0m [90m 651 |[39m         )
2025-12-11T00:30:03.4907263Z      [90m 652 |[39m           [33m.[39msend(updateDto)
2025-12-11T00:30:03.4909134Z     [31m[1m>[22m[39m[90m 653 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4910153Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4912910Z      [90m 654 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4918286Z      [90m 655 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4921310Z      [90m 656 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4922128Z 
2025-12-11T00:30:03.4922545Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:653:12)
2025-12-11T00:30:03.4923164Z       ----
2025-12-11T00:30:03.4923789Z       at patrimonio/patrimonio-completo.e2e-spec.ts:656:21
2025-12-11T00:30:03.4924910Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4926829Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4928523Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4929688Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4930849Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4933058Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4934260Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4936459Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4936967Z 
2025-12-11T00:30:03.4939492Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve ativar patrimônio (ADMIN)
2025-12-11T00:30:03.4940220Z 
2025-12-11T00:30:03.4940413Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.4940695Z 
2025-12-11T00:30:03.4940930Z     [0m [90m 673 |[39m         )
2025-12-11T00:30:03.4943766Z      [90m 674 |[39m           [33m.[39msend({ status[33m:[39m [33mPatrimonioStatus[39m[33m.[39m[33mINATIVO[39m })
2025-12-11T00:30:03.4945180Z     [31m[1m>[22m[39m[90m 675 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.4946178Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4948664Z      [90m 676 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.4954231Z      [90m 677 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.4957230Z      [90m 678 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.4957738Z 
2025-12-11T00:30:03.4958177Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:675:12)
2025-12-11T00:30:03.4958797Z       ----
2025-12-11T00:30:03.4959486Z       at patrimonio/patrimonio-completo.e2e-spec.ts:678:21
2025-12-11T00:30:03.4960548Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4962579Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4963902Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4965388Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4966374Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4968520Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4969999Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.4971930Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.4972450Z 
2025-12-11T00:30:03.4975318Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve desativar patrimônio (ADMIN)
2025-12-11T00:30:03.4976165Z 
2025-12-11T00:30:03.4976404Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.4976703Z 
2025-12-11T00:30:03.4976872Z     [0m [90m 715 |[39m         )
2025-12-11T00:30:03.4977399Z      [90m 716 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.4979866Z     [31m[1m>[22m[39m[90m 717 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.4980785Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.4981249Z      [90m 718 |[39m
2025-12-11T00:30:03.4986321Z      [90m 719 |[39m         [36mconst[39m tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.4987194Z      [90m 720 |[39m[0m
2025-12-11T00:30:03.4987655Z 
2025-12-11T00:30:03.4989417Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:717:12)
2025-12-11T00:30:03.4990042Z       ----
2025-12-11T00:30:03.4990556Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.4991986Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.4992790Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.4993724Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.4994509Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.4995645Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.4997664Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.4998931Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5001102Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5001777Z 
2025-12-11T00:30:03.5004926Z   ● Patrimonio - Completo (e2e) › GRUPO 4: Gestão de Status › POST /v1/patrimonio/:id/descarte › deve marcar patrimônio para descarte (ADMIN)
2025-12-11T00:30:03.5005725Z 
2025-12-11T00:30:03.5005944Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.5006261Z 
2025-12-11T00:30:03.5006498Z     [0m [90m 754 |[39m         )
2025-12-11T00:30:03.5007061Z      [90m 755 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.5009017Z     [31m[1m>[22m[39m[90m 756 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.5009943Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5010410Z      [90m 757 |[39m
2025-12-11T00:30:03.5014415Z      [90m 758 |[39m         [36mconst[39m tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.5015037Z      [90m 759 |[39m[0m
2025-12-11T00:30:03.5015239Z 
2025-12-11T00:30:03.5015743Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:756:12)
2025-12-11T00:30:03.5016359Z       ----
2025-12-11T00:30:03.5017237Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.5018265Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5020208Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5021423Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5022894Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5023852Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5025845Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5027458Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5029425Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5029941Z 
2025-12-11T00:30:03.5033531Z   ● Patrimonio - Completo (e2e) › GRUPO 5: Gestão de Localização › PATCH /v1/patrimonio/:id/localizacao › deve atualizar localização do patrimônio (ADMIN)
2025-12-11T00:30:03.5034392Z 
2025-12-11T00:30:03.5034582Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.5034854Z 
2025-12-11T00:30:03.5035084Z     [0m [90m 805 |[39m         )
2025-12-11T00:30:03.5035653Z      [90m 806 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.5037599Z     [31m[1m>[22m[39m[90m 807 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5038303Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5040921Z      [90m 808 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.5046314Z      [90m 809 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5049318Z      [90m 810 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5049877Z 
2025-12-11T00:30:03.5050307Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:807:12)
2025-12-11T00:30:03.5050918Z       ----
2025-12-11T00:30:03.5051754Z       at patrimonio/patrimonio-completo.e2e-spec.ts:810:21
2025-12-11T00:30:03.5052908Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5054885Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5056084Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5057434Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5058517Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5060514Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5061936Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5064078Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5064596Z 
2025-12-11T00:30:03.5067751Z   ● Patrimonio - Completo (e2e) › GRUPO 7: Exportação e Relatórios › GET /v1/patrimonio/relatorio/inventario › deve gerar relatório de inventário
2025-12-11T00:30:03.5068602Z 
2025-12-11T00:30:03.5068794Z     Expected 200, 400 or 500, got 403
2025-12-11T00:30:03.5069024Z 
2025-12-11T00:30:03.5069180Z     [0m [90m 987 |[39m         )
2025-12-11T00:30:03.5070265Z      [90m 988 |[39m           [33m.[39mquery({ limit[33m:[39m [32m'10'[39m })
2025-12-11T00:30:03.5072489Z     [31m[1m>[22m[39m[90m 989 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5073385Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5075989Z      [90m 990 |[39m             [90m// Aceitar 200, 400 (validação) ou 500 (erro interno do service)[39m
2025-12-11T00:30:03.5081102Z      [90m 991 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m500[39m) {
2025-12-11T00:30:03.5084335Z      [90m 992 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 400 or 500, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5084769Z 
2025-12-11T00:30:03.5086832Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:989:12)
2025-12-11T00:30:03.5087464Z       ----
2025-12-11T00:30:03.5088425Z       at patrimonio/patrimonio-completo.e2e-spec.ts:992:21
2025-12-11T00:30:03.5089643Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5091361Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5092614Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5094115Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5094994Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5096953Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5098241Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5100300Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5100817Z 
2025-12-11T00:30:03.5103666Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › POST /v1/patrimonio/bulk › deve criar múltiplos patrimônios em lote
2025-12-11T00:30:03.5104401Z 
2025-12-11T00:30:03.5104598Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.5104879Z 
2025-12-11T00:30:03.5105057Z     [0m [90m 1085 |[39m         )
2025-12-11T00:30:03.5105795Z      [90m 1086 |[39m           [33m.[39msend(bulkDto)
2025-12-11T00:30:03.5107898Z     [31m[1m>[22m[39m[90m 1087 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5108603Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5111149Z      [90m 1088 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.5116490Z      [90m 1089 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5119533Z      [90m 1090 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5119954Z 
2025-12-11T00:30:03.5120565Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1087:12)
2025-12-11T00:30:03.5121145Z       ----
2025-12-11T00:30:03.5122162Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1090:21
2025-12-11T00:30:03.5123282Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5125267Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5126425Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5127802Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5128867Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5130857Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5132690Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5134227Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5134743Z 
2025-12-11T00:30:03.5137738Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › PATCH /v1/patrimonio/bulk › deve atualizar múltiplos patrimônios em lote
2025-12-11T00:30:03.5138524Z 
2025-12-11T00:30:03.5138711Z     Expected 200, 201 or 400, got 403
2025-12-11T00:30:03.5138989Z 
2025-12-11T00:30:03.5139195Z     [0m [90m 1119 |[39m         )
2025-12-11T00:30:03.5139835Z      [90m 1120 |[39m           [33m.[39msend(bulkDto)
2025-12-11T00:30:03.5142349Z     [31m[1m>[22m[39m[90m 1121 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5144060Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5146556Z      [90m 1122 |[39m             [90m// Aceitar 200, 201 ou 400 (se validação falhar)[39m
2025-12-11T00:30:03.5150496Z      [90m 1123 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:30:03.5154229Z      [90m 1124 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 400, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5154968Z 
2025-12-11T00:30:03.5155391Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1121:12)
2025-12-11T00:30:03.5156048Z       ----
2025-12-11T00:30:03.5156499Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1124:21
2025-12-11T00:30:03.5157143Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5158410Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5159694Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5161470Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5162382Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5164955Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5165918Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5167094Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5167684Z 
2025-12-11T00:30:03.5170807Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › POST /v1/patrimonio/bulk/transferir-responsavel › deve transferir múltiplos patrimônios para o mesmo responsável
2025-12-11T00:30:03.5172079Z 
2025-12-11T00:30:03.5172268Z     Expected 200 or 201, got 403
2025-12-11T00:30:03.5172550Z 
2025-12-11T00:30:03.5173234Z     [0m [90m 1188 |[39m               responsavelId[33m:[39m tokens[33m.[39madminUserId[33m,[39m
2025-12-11T00:30:03.5174046Z      [90m 1189 |[39m             })
2025-12-11T00:30:03.5174879Z     [31m[1m>[22m[39m[90m 1190 |[39m             [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5175651Z      [90m      |[39m              [31m[1m^[22m[39m
2025-12-11T00:30:03.5177816Z      [90m 1191 |[39m               [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.5179838Z      [90m 1192 |[39m                 [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5180688Z      [90m 1193 |[39m               }[0m
2025-12-11T00:30:03.5180857Z 
2025-12-11T00:30:03.5183394Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1190:14)
2025-12-11T00:30:03.5184077Z       ----
2025-12-11T00:30:03.5184533Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1192:23
2025-12-11T00:30:03.5185289Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5188097Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5188968Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5189748Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5190458Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5191384Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5192705Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5194260Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5194814Z 
2025-12-11T00:30:03.5197076Z   ● Patrimonio - Completo (e2e) › GRUPO 9: Operações em Lote › DELETE /v1/patrimonio/bulk › deve deletar múltiplos patrimônios em lote (ADMIN)
2025-12-11T00:30:03.5197958Z 
2025-12-11T00:30:03.5198156Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.5198459Z 
2025-12-11T00:30:03.5198714Z     [0m [90m 1272 |[39m         )
2025-12-11T00:30:03.5199381Z      [90m 1273 |[39m           [33m.[39msend(createDto1)
2025-12-11T00:30:03.5200573Z     [31m[1m>[22m[39m[90m 1274 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5201382Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5203091Z      [90m 1275 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.5206973Z      [90m 1276 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5208870Z      [90m 1277 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5209540Z 
2025-12-11T00:30:03.5210131Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1274:12)
2025-12-11T00:30:03.5210767Z       ----
2025-12-11T00:30:03.5211280Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1277:21
2025-12-11T00:30:03.5212129Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5212902Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5214381Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5215833Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5216935Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5219056Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5220620Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5222884Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5223217Z 
2025-12-11T00:30:03.5226155Z   ● Patrimonio - Completo (e2e) › GRUPO 10: Validações › POST /v1/patrimonio/verificar-duplicidade › deve verificar duplicidade de patrimônios
2025-12-11T00:30:03.5227107Z 
2025-12-11T00:30:03.5227328Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.5227639Z 
2025-12-11T00:30:03.5227895Z     [0m [90m 1389 |[39m         )
2025-12-11T00:30:03.5228612Z      [90m 1390 |[39m           [33m.[39msend(duplicidadeDto)
2025-12-11T00:30:03.5229476Z     [31m[1m>[22m[39m[90m 1391 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5230205Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5232860Z      [90m 1392 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.5237182Z      [90m 1393 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5239351Z      [90m 1394 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5240064Z 
2025-12-11T00:30:03.5240561Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1391:12)
2025-12-11T00:30:03.5241195Z       ----
2025-12-11T00:30:03.5241861Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1394:21
2025-12-11T00:30:03.5242694Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5244774Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5245672Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5247047Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5247945Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5249907Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5250906Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5253070Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5253812Z 
2025-12-11T00:30:03.5256491Z   ● Patrimonio - Completo (e2e) › GRUPO 10: Validações › GET /v1/patrimonio/:id/disponibilidade › deve verificar disponibilidade do patrimônio
2025-12-11T00:30:03.5257362Z 
2025-12-11T00:30:03.5257555Z     Expected 200 or 404, got 400
2025-12-11T00:30:03.5257859Z 
2025-12-11T00:30:03.5258370Z     [0m [90m 1413 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.5259086Z      [90m 1414 |[39m         )
2025-12-11T00:30:03.5260327Z     [31m[1m>[22m[39m[90m 1415 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5261061Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5263625Z      [90m 1416 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.5266703Z      [90m 1417 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5270974Z      [90m 1418 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5272091Z 
2025-12-11T00:30:03.5272584Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1415:12)
2025-12-11T00:30:03.5273226Z       ----
2025-12-11T00:30:03.5273710Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1418:21
2025-12-11T00:30:03.5274336Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5275471Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5276666Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5277966Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5278793Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5280849Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5281970Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5283572Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5284114Z 
2025-12-11T00:30:03.5286660Z   ● Patrimonio - Completo (e2e) › GRUPO 11: Alertas › GET /v1/patrimonio/sem-responsavel › deve buscar patrimônios sem responsável
2025-12-11T00:30:03.5287446Z 
2025-12-11T00:30:03.5287684Z     Expected 200, 201 or 404, got 403
2025-12-11T00:30:03.5287977Z 
2025-12-11T00:30:03.5288240Z     [0m [90m 1533 |[39m         )
2025-12-11T00:30:03.5288844Z      [90m 1534 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.5290179Z     [31m[1m>[22m[39m[90m 1535 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5291072Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5293569Z      [90m 1536 |[39m             [90m// Aceitar 200, 201 ou 404 (se o patrimônio não existir)[39m
2025-12-11T00:30:03.5297853Z      [90m 1537 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5300191Z      [90m 1538 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5300909Z 
2025-12-11T00:30:03.5301346Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1535:12)
2025-12-11T00:30:03.5302174Z       ----
2025-12-11T00:30:03.5302672Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1538:21
2025-12-11T00:30:03.5303484Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5305037Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5306244Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5307692Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5308602Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5310367Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5311749Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5313475Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5313997Z 
2025-12-11T00:30:03.5316749Z   ● Patrimonio - Completo (e2e) › GRUPO 12: Histórico › GET /v1/patrimonio/:id/historico › deve obter histórico de alterações do patrimônio
2025-12-11T00:30:03.5317611Z 
2025-12-11T00:30:03.5317811Z     Expected 200 or 404, got 400
2025-12-11T00:30:03.5318085Z 
2025-12-11T00:30:03.5318619Z     [0m [90m 1579 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.5319290Z      [90m 1580 |[39m         )
2025-12-11T00:30:03.5320434Z     [31m[1m>[22m[39m[90m 1581 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5321321Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5324490Z      [90m 1582 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir ou não tiver histórico)[39m
2025-12-11T00:30:03.5327509Z      [90m 1583 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5329961Z      [90m 1584 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5330717Z 
2025-12-11T00:30:03.5331158Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1581:12)
2025-12-11T00:30:03.5332007Z       ----
2025-12-11T00:30:03.5332510Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1584:21
2025-12-11T00:30:03.5333481Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5334979Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5336180Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5337433Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5338321Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5340235Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5341580Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5343798Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5344360Z 
2025-12-11T00:30:03.5347174Z   ● Patrimonio - Completo (e2e) › GRUPO 12: Histórico › GET /v1/patrimonio/:id/historico/responsaveis › deve obter histórico de responsáveis do patrimônio
2025-12-11T00:30:03.5348140Z 
2025-12-11T00:30:03.5348357Z     Expected 200 or 404, got 400
2025-12-11T00:30:03.5348620Z 
2025-12-11T00:30:03.5349157Z     [0m [90m 1602 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.5349850Z      [90m 1603 |[39m         )
2025-12-11T00:30:03.5350934Z     [31m[1m>[22m[39m[90m 1604 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5352028Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5354927Z      [90m 1605 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir ou não tiver histórico)[39m
2025-12-11T00:30:03.5358078Z      [90m 1606 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5362258Z      [90m 1607 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5362973Z 
2025-12-11T00:30:03.5363649Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1604:12)
2025-12-11T00:30:03.5364298Z       ----
2025-12-11T00:30:03.5364822Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1607:21
2025-12-11T00:30:03.5365469Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5366617Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5367866Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5369108Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5369963Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5373596Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5374528Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5376471Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5377050Z 
2025-12-11T00:30:03.5380532Z   ● Patrimonio - Completo (e2e) › GRUPO 15: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve obter histórico de localizações do patrimônio
2025-12-11T00:30:03.5381981Z 
2025-12-11T00:30:03.5382207Z     Expected 200 or 404, got 400
2025-12-11T00:30:03.5382473Z 
2025-12-11T00:30:03.5382991Z     [0m [90m 1986 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.5383710Z      [90m 1987 |[39m         )
2025-12-11T00:30:03.5384699Z     [31m[1m>[22m[39m[90m 1988 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5385508Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5387817Z      [90m 1989 |[39m             [90m// Aceitar 200 ou 404 (se o patrimônio não existir ou não tiver histórico)[39m
2025-12-11T00:30:03.5390145Z      [90m 1990 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5392297Z      [90m 1991 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5393018Z 
2025-12-11T00:30:03.5393514Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:1988:12)
2025-12-11T00:30:03.5394164Z       ----
2025-12-11T00:30:03.5394689Z       at patrimonio/patrimonio-completo.e2e-spec.ts:1991:21
2025-12-11T00:30:03.5395354Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5396544Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5397678Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5398907Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5399629Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5401262Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5402696Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5404026Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5404614Z 
2025-12-11T00:30:03.5407823Z   ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (ADMIN)
2025-12-11T00:30:03.5409015Z 
2025-12-11T00:30:03.5409264Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.5409603Z 
2025-12-11T00:30:03.5409876Z     [0m [90m 2056 |[39m           )
2025-12-11T00:30:03.5410504Z      [90m 2057 |[39m             [33m.[39msend(createDto)
2025-12-11T00:30:03.5411380Z     [31m[1m>[22m[39m[90m 2058 |[39m             [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.5412350Z      [90m      |[39m              [31m[1m^[22m[39m
2025-12-11T00:30:03.5413080Z      [90m 2059 |[39m
2025-12-11T00:30:03.5414091Z      [90m 2060 |[39m           tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.5415048Z      [90m 2061 |[39m         }[0m
2025-12-11T00:30:03.5415314Z 
2025-12-11T00:30:03.5415840Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2058:14)
2025-12-11T00:30:03.5416490Z       ----
2025-12-11T00:30:03.5417223Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.5417960Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5419368Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5420657Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5421923Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5422844Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5424472Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5425673Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5427203Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5427799Z 
2025-12-11T00:30:03.5431029Z   ● Patrimonio - Completo (e2e) › GRUPO 17: Transferência de Responsável › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir patrimônio para outro responsável (MANAGER)
2025-12-11T00:30:03.5432368Z 
2025-12-11T00:30:03.5432618Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.5432986Z 
2025-12-11T00:30:03.5433267Z     [0m [90m 2120 |[39m         )
2025-12-11T00:30:03.5433897Z      [90m 2121 |[39m           [33m.[39msend(createDto)
2025-12-11T00:30:03.5434808Z     [31m[1m>[22m[39m[90m 2122 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.5435633Z      [90m      |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5436157Z      [90m 2123 |[39m
2025-12-11T00:30:03.5437550Z      [90m 2124 |[39m         expect(createResponse[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:30:03.5439621Z      [90m 2125 |[39m         [36mconst[39m tempPatrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m[0m
2025-12-11T00:30:03.5440363Z 
2025-12-11T00:30:03.5440827Z       at Object.<anonymous> (patrimonio/patrimonio-completo.e2e-spec.ts:2122:12)
2025-12-11T00:30:03.5441520Z       ----
2025-12-11T00:30:03.5442193Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.5444478Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5445732Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5447078Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5448307Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5449151Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5452155Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5453000Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5454120Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5454617Z 
2025-12-11T00:30:03.5457883Z FAIL patrimonio/endpoints-faltantes.e2e-spec.ts (39.173 s)
2025-12-11T00:30:03.5459624Z   ● PatrimonioController - Endpoints Faltantes (e2e) › Setup: Criar dados de teste › deve criar patrimônios para testes
2025-12-11T00:30:03.5460334Z 
2025-12-11T00:30:03.5460568Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.5460920Z 
2025-12-11T00:30:03.5461179Z     [0m [90m  96 |[39m       )
2025-12-11T00:30:03.5462070Z      [90m  97 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5463331Z     [31m[1m>[22m[39m[90m  98 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.5464125Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5464647Z      [90m  99 |[39m
2025-12-11T00:30:03.5466711Z      [90m 100 |[39m       createdPatrimonioId [33m=[39m response1[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.5467472Z      [90m 101 |[39m[0m
2025-12-11T00:30:03.5467704Z 
2025-12-11T00:30:03.5468178Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:98:10)
2025-12-11T00:30:03.5468788Z       ----
2025-12-11T00:30:03.5469365Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.5470294Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5471487Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5472602Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5473684Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5474663Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5475813Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5489682Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5490499Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5490823Z 
2025-12-11T00:30:03.5491519Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve fazer upload de foto com sucesso
2025-12-11T00:30:03.5492653Z 
2025-12-11T00:30:03.5493171Z     Expected 200, 201, or 400, got 403. Body: {"message":"Forbidden resource","error":"Forbidden","statusCode":403}
2025-12-11T00:30:03.5493761Z 
2025-12-11T00:30:03.5493973Z     [0m [90m 241 |[39m         )
2025-12-11T00:30:03.5494444Z      [90m 242 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:30:03.5495358Z     [31m[1m>[22m[39m[90m 243 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5495804Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5497071Z      [90m 244 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:30:03.5498561Z      [90m 245 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201, or 400, got ${res.status}. Body: ${JSON.stringify(res.body)}`[39m)[33m;[39m
2025-12-11T00:30:03.5499564Z      [90m 246 |[39m             }[0m
2025-12-11T00:30:03.5499763Z 
2025-12-11T00:30:03.5500019Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:243:12)
2025-12-11T00:30:03.5500360Z       ----
2025-12-11T00:30:03.5500812Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:245:21
2025-12-11T00:30:03.5501419Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5502020Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5502694Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5503319Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5503673Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5504148Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5504936Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5505482Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5505764Z 
2025-12-11T00:30:03.5509278Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve retornar erro 404 para patrimônio não encontrado
2025-12-11T00:30:03.5510149Z 
2025-12-11T00:30:03.5510276Z     Expected 404 or 400, got 403
2025-12-11T00:30:03.5510441Z 
2025-12-11T00:30:03.5510636Z     [0m [90m 264 |[39m         )
2025-12-11T00:30:03.5511853Z      [90m 265 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:30:03.5513993Z     [31m[1m>[22m[39m[90m 266 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5514732Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5519087Z      [90m 267 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m404[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:30:03.5522185Z      [90m 268 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 404 or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5522952Z      [90m 269 |[39m             }[0m
2025-12-11T00:30:03.5523117Z 
2025-12-11T00:30:03.5526305Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:266:12)
2025-12-11T00:30:03.5526949Z       ----
2025-12-11T00:30:03.5527672Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:268:21
2025-12-11T00:30:03.5529424Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5531444Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5533299Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5535205Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5536152Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5538355Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5539855Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5542111Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5542645Z 
2025-12-11T00:30:03.5546344Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve retornar erro 400 para arquivo muito grande
2025-12-11T00:30:03.5547327Z 
2025-12-11T00:30:03.5547521Z     Expected 400, 413, or 500, got 403
2025-12-11T00:30:03.5547695Z 
2025-12-11T00:30:03.5547905Z     [0m [90m 286 |[39m           )
2025-12-11T00:30:03.5549255Z      [90m 287 |[39m             [33m.[39mattach([32m'file'[39m[33m,[39m largeImagePath)
2025-12-11T00:30:03.5551315Z     [31m[1m>[22m[39m[90m 288 |[39m             [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5552248Z      [90m     |[39m              [31m[1m^[22m[39m
2025-12-11T00:30:03.5558261Z      [90m 289 |[39m               [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m400[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m413[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m500[39m) {
2025-12-11T00:30:03.5561110Z      [90m 290 |[39m                 [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 400, 413, or 500, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5562093Z      [90m 291 |[39m               }[0m
2025-12-11T00:30:03.5562281Z 
2025-12-11T00:30:03.5563214Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:288:14)
2025-12-11T00:30:03.5563823Z       ----
2025-12-11T00:30:03.5565641Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:290:23
2025-12-11T00:30:03.5566273Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5569174Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5569991Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5570776Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5571465Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5572589Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5573508Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5574447Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5574982Z 
2025-12-11T00:30:03.5576280Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › POST /v1/patrimonio/:id/foto › deve retornar erro 400 para arquivo não-imagem
2025-12-11T00:30:03.5577268Z 
2025-12-11T00:30:03.5577487Z     Expected 400, 415, 422, or 500, got 403
2025-12-11T00:30:03.5577808Z 
2025-12-11T00:30:03.5578080Z     [0m [90m 311 |[39m           )
2025-12-11T00:30:03.5578908Z      [90m 312 |[39m             [33m.[39mattach([32m'file'[39m[33m,[39m textFilePath)
2025-12-11T00:30:03.5580115Z     [31m[1m>[22m[39m[90m 313 |[39m             [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5580897Z      [90m     |[39m              [31m[1m^[22m[39m
2025-12-11T00:30:03.5583247Z      [90m 314 |[39m               [90m// Pode retornar 400, 415, 422 ou 500 dependendo da validação[39m
2025-12-11T00:30:03.5586171Z      [90m 315 |[39m               [36mif[39m ([33m![39m[[35m400[39m[33m,[39m [35m415[39m[33m,[39m [35m422[39m[33m,[39m [35m500[39m][33m.[39mincludes(res[33m.[39mstatus)) {
2025-12-11T00:30:03.5588249Z      [90m 316 |[39m                 [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 400, 415, 422, or 500, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.5588981Z 
2025-12-11T00:30:03.5589466Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:313:14)
2025-12-11T00:30:03.5590113Z       ----
2025-12-11T00:30:03.5590603Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:316:23
2025-12-11T00:30:03.5591284Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5592533Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5593658Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5594806Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5595616Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5597446Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5598340Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5599832Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5600417Z 
2025-12-11T00:30:03.5602914Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › DELETE /v1/patrimonio/:id/foto › deve remover foto com sucesso
2025-12-11T00:30:03.5603742Z 
2025-12-11T00:30:03.5603984Z     Expected 200, 201, or 400, got 403
2025-12-11T00:30:03.5604299Z 
2025-12-11T00:30:03.5604555Z     [0m [90m 336 |[39m         )
2025-12-11T00:30:03.5605444Z      [90m 337 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:30:03.5606433Z     [31m[1m>[22m[39m[90m 338 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5609155Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5613450Z      [90m 339 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:30:03.5615313Z      [90m 340 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201, or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5616295Z      [90m 341 |[39m             }[0m
2025-12-11T00:30:03.5616581Z 
2025-12-11T00:30:03.5617030Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:338:12)
2025-12-11T00:30:03.5617721Z       ----
2025-12-11T00:30:03.5618456Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:340:21
2025-12-11T00:30:03.5619157Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5620147Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5621230Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5622508Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5623420Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5625069Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5626161Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5627697Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5628291Z 
2025-12-11T00:30:03.5631306Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › DELETE /v1/patrimonio/:id/foto › deve retornar erro 404 para patrimônio não encontrado
2025-12-11T00:30:03.5632502Z 
2025-12-11T00:30:03.5632783Z     expected 404 "Not Found", got 403 "Forbidden"
2025-12-11T00:30:03.5633375Z 
2025-12-11T00:30:03.5633879Z     [0m [90m 375 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m
2025-12-11T00:30:03.5634553Z      [90m 376 |[39m         )
2025-12-11T00:30:03.5635357Z     [31m[1m>[22m[39m[90m 377 |[39m           [33m.[39mexpect([35m404[39m)[33m;[39m
2025-12-11T00:30:03.5636178Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5636751Z      [90m 378 |[39m       })[33m;[39m
2025-12-11T00:30:03.5637285Z      [90m 379 |[39m     })[33m;[39m
2025-12-11T00:30:03.5637786Z      [90m 380 |[39m[0m
2025-12-11T00:30:03.5638031Z 
2025-12-11T00:30:03.5638809Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:377:12)
2025-12-11T00:30:03.5639461Z       ----
2025-12-11T00:30:03.5640147Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.5640900Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5642517Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5643769Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5644797Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5645724Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5647336Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5648420Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5649941Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5650530Z 
2025-12-11T00:30:03.5653310Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › GET /v1/patrimonio/com-foto › deve listar apenas patrimônios com foto
2025-12-11T00:30:03.5654279Z 
2025-12-11T00:30:03.5654508Z     Expected 200, 201, or 400, got 403
2025-12-11T00:30:03.5654794Z 
2025-12-11T00:30:03.5655100Z     [0m [90m 390 |[39m         )
2025-12-11T00:30:03.5655918Z      [90m 391 |[39m           [33m.[39mattach([32m'file'[39m[33m,[39m testImagePath)
2025-12-11T00:30:03.5656915Z     [31m[1m>[22m[39m[90m 392 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5657719Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5661360Z      [90m 393 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:30:03.5663284Z      [90m 394 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 201, or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5664235Z      [90m 395 |[39m             }[0m
2025-12-11T00:30:03.5664517Z 
2025-12-11T00:30:03.5665400Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:392:12)
2025-12-11T00:30:03.5666114Z       ----
2025-12-11T00:30:03.5666651Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:394:21
2025-12-11T00:30:03.5667359Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5669271Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5670403Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5672032Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5673113Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5675297Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5676504Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5678684Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5679270Z 
2025-12-11T00:30:03.5683677Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 1: Gestão de Fotos › GET /v1/patrimonio/com-foto › deve retornar lista vazia quando não há patrimônios com foto
2025-12-11T00:30:03.5684509Z 
2025-12-11T00:30:03.5684686Z     Expected 200, 404, or 400, got 403
2025-12-11T00:30:03.5684961Z 
2025-12-11T00:30:03.5685388Z     [0m [90m 482 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m
2025-12-11T00:30:03.5685976Z      [90m 483 |[39m         )
2025-12-11T00:30:03.5688353Z     [31m[1m>[22m[39m[90m 484 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5689485Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5696604Z      [90m 485 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m400[39m) {
2025-12-11T00:30:03.5699578Z      [90m 486 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200, 404, or 400, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5700329Z      [90m 487 |[39m             }[0m
2025-12-11T00:30:03.5700508Z 
2025-12-11T00:30:03.5701203Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:484:12)
2025-12-11T00:30:03.5701963Z       ----
2025-12-11T00:30:03.5702628Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:486:21
2025-12-11T00:30:03.5703557Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5705428Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5706526Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5707846Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5708805Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5710753Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5712099Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5714140Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5714636Z 
2025-12-11T00:30:03.5718812Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve retornar histórico de localizações do patrimônio
2025-12-11T00:30:03.5719508Z 
2025-12-11T00:30:03.5719640Z     Expected 200 or 404, got 403
2025-12-11T00:30:03.5719793Z 
2025-12-11T00:30:03.5721020Z     [0m [90m 835 |[39m             observacoes[33m:[39m [32m'Mudança de localização via teste E2E'[39m[33m,[39m
2025-12-11T00:30:03.5721952Z      [90m 836 |[39m           })
2025-12-11T00:30:03.5723610Z     [31m[1m>[22m[39m[90m 837 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5724506Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5728248Z      [90m 838 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5730938Z      [90m 839 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5731969Z      [90m 840 |[39m             }[0m
2025-12-11T00:30:03.5732143Z 
2025-12-11T00:30:03.5732872Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:837:12)
2025-12-11T00:30:03.5733477Z       ----
2025-12-11T00:30:03.5734139Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:839:21
2025-12-11T00:30:03.5735108Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5736867Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5737978Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5739295Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5740261Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5742295Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5743580Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5745488Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5746028Z 
2025-12-11T00:30:03.5750497Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve retornar histórico ordenado por data (mais recente primeiro)
2025-12-11T00:30:03.5751244Z 
2025-12-11T00:30:03.5751360Z     Expected 200 or 404, got 403
2025-12-11T00:30:03.5751510Z 
2025-12-11T00:30:03.5752322Z     [0m [90m 874 |[39m             localizacao[33m:[39m [32m'Sala 305 - Outro Setor'[39m[33m,[39m
2025-12-11T00:30:03.5753026Z      [90m 875 |[39m           })
2025-12-11T00:30:03.5754936Z     [31m[1m>[22m[39m[90m 876 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5755640Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5759546Z      [90m 877 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5762533Z      [90m 878 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5763291Z      [90m 879 |[39m             }[0m
2025-12-11T00:30:03.5763498Z 
2025-12-11T00:30:03.5764382Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:876:12)
2025-12-11T00:30:03.5764972Z       ----
2025-12-11T00:30:03.5765584Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:878:21
2025-12-11T00:30:03.5766628Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5768430Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5769514Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5770834Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5771946Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5773936Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5775087Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5777046Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5777555Z 
2025-12-11T00:30:03.5782727Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 3: Histórico de Localizações › GET /v1/patrimonio/:id/historico/localizacoes › deve registrar histórico quando localização é alterada via updateLocalizacao
2025-12-11T00:30:03.5783685Z 
2025-12-11T00:30:03.5783978Z     Expected 200 or 404, got 403
2025-12-11T00:30:03.5784272Z 
2025-12-11T00:30:03.5784528Z     [0m [90m 970 |[39m         )
2025-12-11T00:30:03.5785232Z      [90m 971 |[39m           [33m.[39msend({ localizacao[33m:[39m novaLocalizacao })
2025-12-11T00:30:03.5786269Z     [31m[1m>[22m[39m[90m 972 |[39m           [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5787160Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.5792122Z      [90m 973 |[39m             [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m404[39m) {
2025-12-11T00:30:03.5794877Z      [90m 974 |[39m               [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 404, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5795658Z      [90m 975 |[39m             }[0m
2025-12-11T00:30:03.5795825Z 
2025-12-11T00:30:03.5796693Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:972:12)
2025-12-11T00:30:03.5797322Z       ----
2025-12-11T00:30:03.5797933Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:974:21
2025-12-11T00:30:03.5798986Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5800746Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5801970Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5803275Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5804191Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5806180Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5807389Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5809380Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5809881Z 
2025-12-11T00:30:03.5813681Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve deletar múltiplos patrimônios em lote (soft delete)
2025-12-11T00:30:03.5814579Z 
2025-12-11T00:30:03.5814710Z     Expected 201 or 409, got 403
2025-12-11T00:30:03.5814977Z 
2025-12-11T00:30:03.5815209Z     [0m [90m 1020 |[39m       )
2025-12-11T00:30:03.5815771Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5816989Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5817937Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5821916Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.5824690Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5825483Z      [90m 1025 |[39m           }[0m
2025-12-11T00:30:03.5825647Z 
2025-12-11T00:30:03.5826507Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:30:03.5827128Z       ----
2025-12-11T00:30:03.5827775Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:30:03.5828764Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5830588Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5831862Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5833145Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5834166Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5836071Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5837266Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5839415Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5839865Z 
2025-12-11T00:30:03.5843535Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar quantidade de deletados e não encontrados
2025-12-11T00:30:03.5844417Z 
2025-12-11T00:30:03.5844572Z     Expected 201 or 409, got 403
2025-12-11T00:30:03.5844832Z 
2025-12-11T00:30:03.5845064Z     [0m [90m 1020 |[39m       )
2025-12-11T00:30:03.5845627Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5846837Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5847655Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5851768Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.5854485Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5855371Z      [90m 1025 |[39m           }[0m
2025-12-11T00:30:03.5855534Z 
2025-12-11T00:30:03.5856250Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:30:03.5856838Z       ----
2025-12-11T00:30:03.5857458Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:30:03.5858387Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5860182Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5861231Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5862706Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5863597Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5865536Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5866711Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5868678Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5869241Z 
2025-12-11T00:30:03.5872949Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar listas de IDs deletados e não encontrados
2025-12-11T00:30:03.5873834Z 
2025-12-11T00:30:03.5873947Z     Expected 201 or 409, got 403
2025-12-11T00:30:03.5874214Z 
2025-12-11T00:30:03.5874486Z     [0m [90m 1020 |[39m       )
2025-12-11T00:30:03.5875032Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5876227Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5877006Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5880999Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.5883898Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5884643Z      [90m 1025 |[39m           }[0m
2025-12-11T00:30:03.5884809Z 
2025-12-11T00:30:03.5886554Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:30:03.5887124Z       ----
2025-12-11T00:30:03.5887550Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:30:03.5888565Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5890287Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5891353Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5892842Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5893972Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5895724Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5896844Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5898773Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5899277Z 
2025-12-11T00:30:03.5902521Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar erro 400 para mais de 100 IDs
2025-12-11T00:30:03.5903385Z 
2025-12-11T00:30:03.5903499Z     Expected 201 or 409, got 403
2025-12-11T00:30:03.5903657Z 
2025-12-11T00:30:03.5903916Z     [0m [90m 1020 |[39m       )
2025-12-11T00:30:03.5904477Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5905846Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5906664Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5910489Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.5913371Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5914121Z      [90m 1025 |[39m           }[0m
2025-12-11T00:30:03.5914287Z 
2025-12-11T00:30:03.5915082Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:30:03.5915661Z       ----
2025-12-11T00:30:03.5916353Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:30:03.5917291Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5919082Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5920109Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5921456Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5922526Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5924423Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5925572Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5927469Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5927971Z 
2025-12-11T00:30:03.5931044Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar erro 400 para array vazio
2025-12-11T00:30:03.5932056Z 
2025-12-11T00:30:03.5932175Z     Expected 201 or 409, got 403
2025-12-11T00:30:03.5932332Z 
2025-12-11T00:30:03.5932566Z     [0m [90m 1020 |[39m       )
2025-12-11T00:30:03.5933138Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5934681Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5935372Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5939176Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.5942005Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5942771Z      [90m 1025 |[39m           }[0m
2025-12-11T00:30:03.5942938Z 
2025-12-11T00:30:03.5943819Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:30:03.5944403Z       ----
2025-12-11T00:30:03.5945019Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:30:03.5945997Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5947949Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5948812Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5950136Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5951081Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5953128Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5954271Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5956221Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5956727Z 
2025-12-11T00:30:03.5960102Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve retornar erro 400 para IDs inválidos (não UUID)
2025-12-11T00:30:03.5960963Z 
2025-12-11T00:30:03.5961077Z     Expected 201 or 409, got 403
2025-12-11T00:30:03.5961289Z 
2025-12-11T00:30:03.5961540Z     [0m [90m 1020 |[39m       )
2025-12-11T00:30:03.5962291Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5963543Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5964293Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5968191Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.5970904Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.5971874Z      [90m 1025 |[39m           }[0m
2025-12-11T00:30:03.5972054Z 
2025-12-11T00:30:03.5972829Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:30:03.5973415Z       ----
2025-12-11T00:30:03.5974037Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:30:03.5974974Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.5976746Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.5977782Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.5980209Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.5980921Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.5983042Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.5984179Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.5986082Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.5986598Z 
2025-12-11T00:30:03.5989754Z   ● PatrimonioController - Endpoints Faltantes (e2e) › FASE 4: Operações em Lote › DELETE /v1/patrimonio/bulk › deve remover IDs duplicados automaticamente
2025-12-11T00:30:03.5990602Z 
2025-12-11T00:30:03.5990720Z     Expected 201 or 409, got 403
2025-12-11T00:30:03.5990928Z 
2025-12-11T00:30:03.5991164Z     [0m [90m 1020 |[39m       )
2025-12-11T00:30:03.5991913Z      [90m 1021 |[39m         [33m.[39msend(createDto1)
2025-12-11T00:30:03.5993162Z     [31m[1m>[22m[39m[90m 1022 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.5993965Z      [90m      |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.5997801Z      [90m 1023 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m201[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.6000391Z      [90m 1024 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 201 or 409, got ${res.status}`[39m)[33m;[39m
2025-12-11T00:30:03.6001156Z      [90m 1025 |[39m           }[0m
2025-12-11T00:30:03.6001325Z 
2025-12-11T00:30:03.6002348Z       at Object.<anonymous> (patrimonio/endpoints-faltantes.e2e-spec.ts:1022:10)
2025-12-11T00:30:03.6003146Z       ----
2025-12-11T00:30:03.6003641Z       at patrimonio/endpoints-faltantes.e2e-spec.ts:1024:19
2025-12-11T00:30:03.6004506Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6006210Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6007237Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6008548Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6009509Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6011371Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6012698Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6014621Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6015129Z 
2025-12-11T00:30:03.6016449Z FAIL patrimonio/patrimonio-fases.e2e-spec.ts (13.087 s)
2025-12-11T00:30:03.6020802Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve alterar status do patrimônio para MANUTENCAO (200)
2025-12-11T00:30:03.6022123Z 
2025-12-11T00:30:03.6022338Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6022661Z 
2025-12-11T00:30:03.6022898Z     [0m [90m 94 |[39m       )
2025-12-11T00:30:03.6023349Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6024478Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6025189Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6025651Z      [90m 97 |[39m
2025-12-11T00:30:03.6028213Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6030578Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:30:03.6031007Z 
2025-12-11T00:30:03.6031518Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:30:03.6032249Z       ----
2025-12-11T00:30:03.6033312Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6034215Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6035949Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6037004Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6038320Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6039226Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6041140Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6042487Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6044415Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6044919Z 
2025-12-11T00:30:03.6048413Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve retornar 400 quando status é o mesmo
2025-12-11T00:30:03.6049334Z 
2025-12-11T00:30:03.6049579Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6049920Z 
2025-12-11T00:30:03.6050168Z     [0m [90m 94 |[39m       )
2025-12-11T00:30:03.6050682Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6052009Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6052762Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6053229Z      [90m 97 |[39m
2025-12-11T00:30:03.6055676Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6058383Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:30:03.6058980Z 
2025-12-11T00:30:03.6059404Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:30:03.6059806Z       ----
2025-12-11T00:30:03.6060539Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6061446Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6063275Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6065908Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6066911Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6067809Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6069732Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6070962Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6073080Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6073689Z 
2025-12-11T00:30:03.6077055Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › PATCH /v1/patrimonio/:id/status › deve retornar 404 quando patrimônio não existe
2025-12-11T00:30:03.6077997Z 
2025-12-11T00:30:03.6078146Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6078401Z 
2025-12-11T00:30:03.6078664Z     [0m [90m 94 |[39m       )
2025-12-11T00:30:03.6079210Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6080760Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6081430Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6082031Z      [90m 97 |[39m
2025-12-11T00:30:03.6084479Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6086767Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:30:03.6087235Z 
2025-12-11T00:30:03.6087636Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:30:03.6088218Z       ----
2025-12-11T00:30:03.6089512Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6090180Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6092096Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6093197Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6094482Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6095419Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6097331Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6098524Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6100418Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6100930Z 
2025-12-11T00:30:03.6105224Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › POST /v1/patrimonio/:id/transferir-responsavel › deve transferir responsável do patrimônio (200/201)
2025-12-11T00:30:03.6106140Z 
2025-12-11T00:30:03.6106355Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6106677Z 
2025-12-11T00:30:03.6106902Z     [0m [90m 94 |[39m       )
2025-12-11T00:30:03.6107358Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6108437Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6109224Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6109681Z      [90m 97 |[39m
2025-12-11T00:30:03.6112515Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6114624Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:30:03.6115107Z 
2025-12-11T00:30:03.6115495Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:30:03.6116075Z       ----
2025-12-11T00:30:03.6117109Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6118034Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6119764Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6120833Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6122323Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6123279Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6125185Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6126332Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6128270Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6128773Z 
2025-12-11T00:30:03.6132790Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › POST /v1/patrimonio/:id/transferir-responsavel › deve retornar 400 quando mesmo responsável
2025-12-11T00:30:03.6133746Z 
2025-12-11T00:30:03.6133895Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6134217Z 
2025-12-11T00:30:03.6134450Z     [0m [90m 94 |[39m       )
2025-12-11T00:30:03.6134964Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6136200Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6136914Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6137369Z      [90m 97 |[39m
2025-12-11T00:30:03.6139940Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6142442Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:30:03.6142858Z 
2025-12-11T00:30:03.6143422Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:30:03.6143978Z       ----
2025-12-11T00:30:03.6145028Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6145937Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6147743Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6151142Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6152527Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6153484Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6155373Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6156580Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6158539Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6159039Z 
2025-12-11T00:30:03.6162454Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 1: Endpoints de Alta Prioridade › GET /v1/patrimonio/dashboard › deve retornar métricas do dashboard (200)
2025-12-11T00:30:03.6163340Z 
2025-12-11T00:30:03.6163560Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6163764Z 
2025-12-11T00:30:03.6164012Z     [0m [90m 94 |[39m       )
2025-12-11T00:30:03.6164557Z      [90m 95 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6166197Z     [31m[1m>[22m[39m[90m 96 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6167054Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6167521Z      [90m 97 |[39m
2025-12-11T00:30:03.6169816Z      [90m 98 |[39m       createdPatrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6172303Z      [90m 99 |[39m       createdPatrimonioCodigo [33m=[39m response[33m.[39mbody[33m.[39mcodigo[33m;[39m[0m
2025-12-11T00:30:03.6172759Z 
2025-12-11T00:30:03.6173190Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:96:10)
2025-12-11T00:30:03.6173769Z       ----
2025-12-11T00:30:03.6174843Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6175768Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6177530Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6178606Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6179951Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6180867Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6183007Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6184143Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6186065Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6186571Z 
2025-12-11T00:30:03.6189518Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve ativar patrimônio inativo (200)
2025-12-11T00:30:03.6190312Z 
2025-12-11T00:30:03.6190535Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6190802Z 
2025-12-11T00:30:03.6190954Z     [0m [90m 295 |[39m       )
2025-12-11T00:30:03.6191519Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6193623Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6194311Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6194775Z      [90m 298 |[39m
2025-12-11T00:30:03.6197337Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6198155Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6198333Z 
2025-12-11T00:30:03.6199268Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:30:03.6199847Z       ----
2025-12-11T00:30:03.6200891Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6201927Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6203735Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6204814Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6206098Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6207054Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6209003Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6210120Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6212133Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6212636Z 
2025-12-11T00:30:03.6215648Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/ativar › deve retornar 400 quando já está ativo
2025-12-11T00:30:03.6216452Z 
2025-12-11T00:30:03.6216665Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6216896Z 
2025-12-11T00:30:03.6217049Z     [0m [90m 295 |[39m       )
2025-12-11T00:30:03.6217587Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6219719Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6220419Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6220882Z      [90m 298 |[39m
2025-12-11T00:30:03.6223409Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6224205Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6224380Z 
2025-12-11T00:30:03.6225268Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:30:03.6225855Z       ----
2025-12-11T00:30:03.6226986Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6227845Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6229611Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6230706Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6232262Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6233189Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6235109Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6236260Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6238199Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6238705Z 
2025-12-11T00:30:03.6241886Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve desativar patrimônio ativo (200)
2025-12-11T00:30:03.6242708Z 
2025-12-11T00:30:03.6242928Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6243167Z 
2025-12-11T00:30:03.6243324Z     [0m [90m 295 |[39m       )
2025-12-11T00:30:03.6244674Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6246573Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6247255Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6247725Z      [90m 298 |[39m
2025-12-11T00:30:03.6250328Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6251127Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6251408Z 
2025-12-11T00:30:03.6252520Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:30:03.6253200Z       ----
2025-12-11T00:30:03.6254150Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6254947Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6256769Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6257631Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6259196Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6260031Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6262012Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6263191Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6265149Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6265670Z 
2025-12-11T00:30:03.6268997Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › PATCH /v1/patrimonio/:id/desativar › deve retornar 400 quando já está inativo
2025-12-11T00:30:03.6269874Z 
2025-12-11T00:30:03.6270111Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6270431Z 
2025-12-11T00:30:03.6270698Z     [0m [90m 295 |[39m       )
2025-12-11T00:30:03.6271240Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6272780Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6273529Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6274197Z      [90m 298 |[39m
2025-12-11T00:30:03.6276550Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6277412Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6277635Z 
2025-12-11T00:30:03.6278412Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:30:03.6279031Z       ----
2025-12-11T00:30:03.6279896Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6280774Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6282782Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6283981Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6285050Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6285925Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6287799Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6289026Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6290967Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6291483Z 
2025-12-11T00:30:03.6294981Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Status › POST /v1/patrimonio/:id/descarte › deve marcar patrimônio para descarte (200/201/400)
2025-12-11T00:30:03.6295866Z 
2025-12-11T00:30:03.6296070Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6296299Z 
2025-12-11T00:30:03.6296544Z     [0m [90m 295 |[39m       )
2025-12-11T00:30:03.6297111Z      [90m 296 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6298728Z     [31m[1m>[22m[39m[90m 297 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6299412Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6299877Z      [90m 298 |[39m
2025-12-11T00:30:03.6302455Z      [90m 299 |[39m       patrimonioParaAtivarId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6303257Z      [90m 300 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6303469Z 
2025-12-11T00:30:03.6304635Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:297:10)
2025-12-11T00:30:03.6305179Z       ----
2025-12-11T00:30:03.6306055Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6306987Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6308779Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6309756Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6311076Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6312260Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6314152Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6315317Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6317242Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6317729Z 
2025-12-11T00:30:03.6321360Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › PATCH /v1/patrimonio/:id/localizacao › deve atualizar localização do patrimônio (200/404)
2025-12-11T00:30:03.6322422Z 
2025-12-11T00:30:03.6322644Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6322976Z 
2025-12-11T00:30:03.6323210Z     [0m [90m 415 |[39m       )
2025-12-11T00:30:03.6327236Z      [90m 416 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6328656Z     [31m[1m>[22m[39m[90m 417 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6329495Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6330149Z      [90m 418 |[39m
2025-12-11T00:30:03.6330925Z      [90m 419 |[39m       patrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6331844Z      [90m 420 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6332144Z 
2025-12-11T00:30:03.6332544Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
2025-12-11T00:30:03.6333013Z       ----
2025-12-11T00:30:03.6333330Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6333743Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6334223Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6334980Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6335752Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6336528Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6338537Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6339710Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6341592Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6342232Z 
2025-12-11T00:30:03.6346115Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › GET /v1/patrimonio/localizacao/:localizacao › deve listar patrimônios por localização (200 ou 404)
2025-12-11T00:30:03.6347089Z 
2025-12-11T00:30:03.6347239Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6347541Z 
2025-12-11T00:30:03.6347779Z     [0m [90m 415 |[39m       )
2025-12-11T00:30:03.6348476Z      [90m 416 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6349658Z     [31m[1m>[22m[39m[90m 417 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6350379Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6350847Z      [90m 418 |[39m
2025-12-11T00:30:03.6353346Z      [90m 419 |[39m       patrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6354085Z      [90m 420 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6354300Z 
2025-12-11T00:30:03.6355333Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
2025-12-11T00:30:03.6355899Z       ----
2025-12-11T00:30:03.6356904Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6357851Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6359625Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6360725Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6362176Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6363075Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6364998Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6366157Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6368066Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6368559Z 
2025-12-11T00:30:03.6372274Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 2: Gestão de Localização › GET /v1/patrimonio/stats/localizacoes › deve retornar estatísticas por localização (200)
2025-12-11T00:30:03.6373236Z 
2025-12-11T00:30:03.6373380Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6373605Z 
2025-12-11T00:30:03.6373849Z     [0m [90m 415 |[39m       )
2025-12-11T00:30:03.6374400Z      [90m 416 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6376100Z     [31m[1m>[22m[39m[90m 417 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6376805Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6377418Z      [90m 418 |[39m
2025-12-11T00:30:03.6379485Z      [90m 419 |[39m       patrimonioId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6380238Z      [90m 420 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6380414Z 
2025-12-11T00:30:03.6381424Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:417:10)
2025-12-11T00:30:03.6382130Z       ----
2025-12-11T00:30:03.6383152Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6384030Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6385853Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6386892Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6388242Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6389200Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6391174Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6392433Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6394450Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6394947Z 
2025-12-11T00:30:03.6398636Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/numero-serie/:numeroSerie › deve buscar patrimônio por número de série (200)
2025-12-11T00:30:03.6399548Z 
2025-12-11T00:30:03.6399727Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6400058Z 
2025-12-11T00:30:03.6400292Z     [0m [90m 637 |[39m       )
2025-12-11T00:30:03.6400789Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6402094Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6402840Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6403312Z      [90m 640 |[39m
2025-12-11T00:30:03.6406073Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6406869Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6407035Z 
2025-12-11T00:30:03.6407864Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:30:03.6408453Z       ----
2025-12-11T00:30:03.6409516Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6410436Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6412362Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6413357Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6414902Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6415681Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6417575Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6418737Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6420681Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6421186Z 
2025-12-11T00:30:03.6424655Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/numero-serie/:numeroSerie › deve retornar 404 quando não encontrado
2025-12-11T00:30:03.6425558Z 
2025-12-11T00:30:03.6425746Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6425939Z 
2025-12-11T00:30:03.6426084Z     [0m [90m 637 |[39m       )
2025-12-11T00:30:03.6427127Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6429193Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6429889Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6430590Z      [90m 640 |[39m
2025-12-11T00:30:03.6433277Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6434086Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6434264Z 
2025-12-11T00:30:03.6435134Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:30:03.6435729Z       ----
2025-12-11T00:30:03.6436700Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6437653Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6439397Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6440470Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6441948Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6442903Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6444805Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6446035Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6447939Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6448439Z 
2025-12-11T00:30:03.6452222Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/aquisicao-periodo › deve buscar patrimônios por período de aquisição (200)
2025-12-11T00:30:03.6453167Z 
2025-12-11T00:30:03.6453353Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6453547Z 
2025-12-11T00:30:03.6453800Z     [0m [90m 637 |[39m       )
2025-12-11T00:30:03.6454359Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6456129Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6456810Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6457279Z      [90m 640 |[39m
2025-12-11T00:30:03.6459964Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6460756Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6460931Z 
2025-12-11T00:30:03.6461905Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:30:03.6462489Z       ----
2025-12-11T00:30:03.6463527Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6464458Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6466284Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6467328Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6468813Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6469635Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6471544Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6472792Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6474731Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6475235Z 
2025-12-11T00:30:03.6478732Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/valor-range › deve buscar patrimônios por intervalo de valor (200)
2025-12-11T00:30:03.6479626Z 
2025-12-11T00:30:03.6479810Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6480010Z 
2025-12-11T00:30:03.6480254Z     [0m [90m 637 |[39m       )
2025-12-11T00:30:03.6480801Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6482531Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6483214Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6483864Z      [90m 640 |[39m
2025-12-11T00:30:03.6486547Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6487351Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6487533Z 
2025-12-11T00:30:03.6488297Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:30:03.6488889Z       ----
2025-12-11T00:30:03.6489901Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6490819Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6492727Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6493762Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6495109Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6496087Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6497989Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6499206Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6501094Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6501594Z 
2025-12-11T00:30:03.6505240Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/status-multiplos › deve buscar patrimônios por múltiplos status (200)
2025-12-11T00:30:03.6506170Z 
2025-12-11T00:30:03.6506354Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6506565Z 
2025-12-11T00:30:03.6506809Z     [0m [90m 637 |[39m       )
2025-12-11T00:30:03.6507363Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6509022Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6509707Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6510174Z      [90m 640 |[39m
2025-12-11T00:30:03.6513138Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6513926Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6514097Z 
2025-12-11T00:30:03.6514875Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:30:03.6515454Z       ----
2025-12-11T00:30:03.6516495Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6517442Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6519164Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6521185Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6522680Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6523372Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6525356Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6526509Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6528450Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6528959Z 
2025-12-11T00:30:03.6532853Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Buscas Avançadas › GET /v1/patrimonio/categorias-multiplas › deve buscar patrimônios por múltiplas categorias (200)
2025-12-11T00:30:03.6546548Z 
2025-12-11T00:30:03.6546829Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6547157Z 
2025-12-11T00:30:03.6547430Z     [0m [90m 637 |[39m       )
2025-12-11T00:30:03.6547992Z      [90m 638 |[39m         [33m.[39msend(createDto)
2025-12-11T00:30:03.6548681Z     [31m[1m>[22m[39m[90m 639 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6549641Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6550094Z      [90m 640 |[39m
2025-12-11T00:30:03.6550716Z      [90m 641 |[39m       patrimonioComNumeroSerieId [33m=[39m response[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6551214Z      [90m 642 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.6551424Z 
2025-12-11T00:30:03.6551960Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:639:10)
2025-12-11T00:30:03.6552534Z       ----
2025-12-11T00:30:03.6552857Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6553243Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6553638Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6554139Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6554822Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6555276Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6555688Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6556371Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6557196Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6557692Z 
2025-12-11T00:30:03.6558725Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › POST /v1/patrimonio/bulk › deve criar múltiplos patrimônios em lote (201)
2025-12-11T00:30:03.6559255Z 
2025-12-11T00:30:03.6559394Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6559703Z 
2025-12-11T00:30:03.6559936Z     [0m [90m 811 |[39m         )
2025-12-11T00:30:03.6560458Z      [90m 812 |[39m           [33m.[39msend(dto)
2025-12-11T00:30:03.6561026Z     [31m[1m>[22m[39m[90m 813 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6561876Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.6562181Z      [90m 814 |[39m
2025-12-11T00:30:03.6563051Z      [90m 815 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'totalSucessos'[39m)[33m;[39m
2025-12-11T00:30:03.6564282Z      [90m 816 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'totalErros'[39m)[33m;[39m[0m
2025-12-11T00:30:03.6564628Z 
2025-12-11T00:30:03.6564864Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:813:12)
2025-12-11T00:30:03.6565445Z       ----
2025-12-11T00:30:03.6565894Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6566295Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6567139Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6567631Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6568107Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6568718Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6569230Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6569942Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6570746Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6571252Z 
2025-12-11T00:30:03.6572654Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › PATCH /v1/patrimonio/bulk › deve atualizar múltiplos patrimônios (200 ou 400)
2025-12-11T00:30:03.6573575Z 
2025-12-11T00:30:03.6573931Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6574962Z 
2025-12-11T00:30:03.6575611Z     [0m [90m 835 |[39m             nome[33m:[39m [32m'Patrimônio para atualização em lote'[39m[33m,[39m
2025-12-11T00:30:03.6576341Z      [90m 836 |[39m           })
2025-12-11T00:30:03.6577259Z     [31m[1m>[22m[39m[90m 837 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6577784Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.6578074Z      [90m 838 |[39m
2025-12-11T00:30:03.6580006Z      [90m 839 |[39m         [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6580603Z      [90m 840 |[39m[0m
2025-12-11T00:30:03.6580737Z 
2025-12-11T00:30:03.6581379Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:837:12)
2025-12-11T00:30:03.6582100Z       ----
2025-12-11T00:30:03.6583098Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6584014Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6585785Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6586839Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6588125Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6589067Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6590973Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6592345Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6594223Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6594724Z 
2025-12-11T00:30:03.6599430Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Operações em Lote › POST /v1/patrimonio/bulk/transferir-responsavel › deve transferir múltiplos patrimônios (200 ou 400)
2025-12-11T00:30:03.6600102Z 
2025-12-11T00:30:03.6600251Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6600461Z 
2025-12-11T00:30:03.6601851Z     [0m [90m 883 |[39m             nome[33m:[39m [32m'Patrimônio para transferência em lote'[39m[33m,[39m
2025-12-11T00:30:03.6602597Z      [90m 884 |[39m           })
2025-12-11T00:30:03.6604422Z     [31m[1m>[22m[39m[90m 885 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6605123Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.6605579Z      [90m 886 |[39m
2025-12-11T00:30:03.6608536Z      [90m 887 |[39m         [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6609138Z      [90m 888 |[39m[0m
2025-12-11T00:30:03.6609270Z 
2025-12-11T00:30:03.6609977Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:885:12)
2025-12-11T00:30:03.6610562Z       ----
2025-12-11T00:30:03.6611727Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6612832Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6614420Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6615472Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6616783Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6617712Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6619640Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6620825Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6622957Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6623455Z 
2025-12-11T00:30:03.6627016Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › GET /v1/patrimonio/validar-codigo/:codigo › deve retornar não disponível para código existente (200)
2025-12-11T00:30:03.6627963Z 
2025-12-11T00:30:03.6628258Z     expect(received).toBe(expected) // Object.is equality
2025-12-11T00:30:03.6628273Z 
2025-12-11T00:30:03.6628364Z     Expected: false
2025-12-11T00:30:03.6628608Z     Received: true
2025-12-11T00:30:03.6628616Z 
2025-12-11T00:30:03.6629554Z     [0m [90m 940 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.6629736Z      [90m 941 |[39m
2025-12-11T00:30:03.6633494Z     [31m[1m>[22m[39m[90m 942 |[39m         expect(response[33m.[39mbody[33m.[39mdisponivel)[33m.[39mtoBe([36mfalse[39m)[33m;[39m
2025-12-11T00:30:03.6634490Z      [90m     |[39m                                          [31m[1m^[22m[39m
2025-12-11T00:30:03.6635062Z      [90m 943 |[39m       })[33m;[39m
2025-12-11T00:30:03.6635929Z      [90m 944 |[39m     })[33m;[39m
2025-12-11T00:30:03.6636334Z      [90m 945 |[39m[0m
2025-12-11T00:30:03.6636346Z 
2025-12-11T00:30:03.6638250Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:942:42)
2025-12-11T00:30:03.6638277Z 
2025-12-11T00:30:03.6642403Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › POST /v1/patrimonio/verificar-duplicidade › deve verificar duplicidade de patrimônios (200 ou 201)
2025-12-11T00:30:03.6642431Z 
2025-12-11T00:30:03.6642650Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6642660Z 
2025-12-11T00:30:03.6644276Z     [0m [90m 961 |[39m             numeroSerie[33m:[39m numeroSerie[33m,[39m
2025-12-11T00:30:03.6644506Z      [90m 962 |[39m           })
2025-12-11T00:30:03.6646823Z     [31m[1m>[22m[39m[90m 963 |[39m           [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6647386Z      [90m     |[39m            [31m[1m^[22m[39m
2025-12-11T00:30:03.6647661Z      [90m 964 |[39m
2025-12-11T00:30:03.6649967Z      [90m 965 |[39m         [90m// Aguardar um pouco para garantir persistência[39m
2025-12-11T00:30:03.6653680Z      [90m 966 |[39m         [36mawait[39m [36mnew[39m [33mPromise[39m(resolve [33m=>[39m setTimeout(resolve[33m,[39m [35m300[39m))[33m;[39m[0m
2025-12-11T00:30:03.6653692Z 
2025-12-11T00:30:03.6654421Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:963:12)
2025-12-11T00:30:03.6654556Z       ----
2025-12-11T00:30:03.6656164Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6656878Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6658678Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6659830Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6661159Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6662142Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6663975Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6665296Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6667236Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6667261Z 
2025-12-11T00:30:03.6670955Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Validações › GET /v1/patrimonio/:id/disponibilidade › deve verificar disponibilidade do patrimônio (200)
2025-12-11T00:30:03.6670973Z 
2025-12-11T00:30:03.6671183Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:30:03.6671196Z 
2025-12-11T00:30:03.6671938Z     [0m [90m 1001 |[39m           tokens[33m,[39m
2025-12-11T00:30:03.6673991Z      [90m 1002 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.6675789Z     [31m[1m>[22m[39m[90m 1003 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.6676460Z      [90m      |[39m           [31m[1m^[22m[39m
2025-12-11T00:30:03.6676680Z      [90m 1004 |[39m
2025-12-11T00:30:03.6679901Z      [90m 1005 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'disponivel'[39m)[33m;[39m
2025-12-11T00:30:03.6682108Z      [90m 1006 |[39m         [90m// Pode ter `motivo` ao invés de `status` dependendo da implementação[39m[0m
2025-12-11T00:30:03.6682333Z 
2025-12-11T00:30:03.6683183Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1003:11)
2025-12-11T00:30:03.6683305Z       ----
2025-12-11T00:30:03.6684913Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6685739Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6687383Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6688577Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6689877Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6691513Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6693380Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6694685Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6696468Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6696481Z 
2025-12-11T00:30:03.6699924Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Histórico › GET /v1/patrimonio/:id/historico › deve retornar histórico de alterações (200)
2025-12-11T00:30:03.6699948Z 
2025-12-11T00:30:03.6700147Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:30:03.6700157Z 
2025-12-11T00:30:03.6700971Z     [0m [90m 1104 |[39m           tokens[33m,[39m
2025-12-11T00:30:03.6703203Z      [90m 1105 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.6704982Z     [31m[1m>[22m[39m[90m 1106 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.6705551Z      [90m      |[39m           [31m[1m^[22m[39m
2025-12-11T00:30:03.6705900Z      [90m 1107 |[39m
2025-12-11T00:30:03.6709078Z      [90m 1108 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'patrimonioId'[39m)[33m;[39m
2025-12-11T00:30:03.6711441Z      [90m 1109 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'historico'[39m)[33m;[39m[0m
2025-12-11T00:30:03.6711457Z 
2025-12-11T00:30:03.6712969Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1106:11)
2025-12-11T00:30:03.6713094Z       ----
2025-12-11T00:30:03.6714063Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6715029Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6716766Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6718060Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6719030Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6720185Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6722045Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6723352Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6724996Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6725013Z 
2025-12-11T00:30:03.6728927Z   ● PatrimonioController - Fases 1, 2 e 3 (e2e) › FASE 3: Histórico › GET /v1/patrimonio/:id/historico/responsaveis › deve retornar histórico de responsáveis (200)
2025-12-11T00:30:03.6728944Z 
2025-12-11T00:30:03.6729149Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:30:03.6729159Z 
2025-12-11T00:30:03.6729872Z     [0m [90m 1120 |[39m           tokens[33m,[39m
2025-12-11T00:30:03.6732103Z      [90m 1121 |[39m           [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.6733942Z     [31m[1m>[22m[39m[90m 1122 |[39m         )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.6734580Z      [90m      |[39m           [31m[1m^[22m[39m
2025-12-11T00:30:03.6734976Z      [90m 1123 |[39m
2025-12-11T00:30:03.6738142Z      [90m 1124 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'patrimonioId'[39m)[33m;[39m
2025-12-11T00:30:03.6740564Z      [90m 1125 |[39m         expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'responsaveis'[39m)[33m;[39m[0m
2025-12-11T00:30:03.6740587Z 
2025-12-11T00:30:03.6741509Z       at Object.<anonymous> (patrimonio/patrimonio-fases.e2e-spec.ts:1122:11)
2025-12-11T00:30:03.6741781Z       ----
2025-12-11T00:30:03.6743435Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6744022Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6745888Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6747128Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6748344Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6749106Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6751048Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6752546Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6754246Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6754262Z 
2025-12-11T00:30:03.6755636Z FAIL ./patrimonio.e2e-spec.ts (14.213 s)
2025-12-11T00:30:03.6757783Z   ● PatrimonioController (e2e) › POST /v1/patrimonio › should create a new patrimonio (201)
2025-12-11T00:30:03.6757800Z 
2025-12-11T00:30:03.6758095Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6758109Z 
2025-12-11T00:30:03.6758713Z     [0m [90m 76 |[39m       )
2025-12-11T00:30:03.6760399Z      [90m 77 |[39m         [33m.[39msend(createPatrimonioDto)
2025-12-11T00:30:03.6762249Z     [31m[1m>[22m[39m[90m 78 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6762976Z      [90m    |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6763179Z      [90m 79 |[39m
2025-12-11T00:30:03.6765429Z      [90m 80 |[39m       expect(response[33m.[39mbody)[33m.[39mtoMatchObject({
2025-12-11T00:30:03.6767405Z      [90m 81 |[39m         codigo[33m:[39m createPatrimonioDto[33m.[39mcodigo[33m,[39m[0m
2025-12-11T00:30:03.6767421Z 
2025-12-11T00:30:03.6767978Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:78:10)
2025-12-11T00:30:03.6768107Z       ----
2025-12-11T00:30:03.6769922Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6770579Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6772555Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6773898Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6774925Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6775828Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6777749Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6779041Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6780795Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6780811Z 
2025-12-11T00:30:03.6784108Z   ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 409 when codigo already exists
2025-12-11T00:30:03.6784125Z 
2025-12-11T00:30:03.6784339Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6784350Z 
2025-12-11T00:30:03.6786445Z     [0m [90m 110 |[39m           nome[33m:[39m [32m'First Notebook'[39m[33m,[39m
2025-12-11T00:30:03.6786689Z      [90m 111 |[39m         })
2025-12-11T00:30:03.6788862Z     [31m[1m>[22m[39m[90m 112 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6789393Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6789690Z      [90m 113 |[39m
2025-12-11T00:30:03.6791865Z      [90m 114 |[39m       [90m// Tentar criar outro com mesmo código[39m
2025-12-11T00:30:03.6793399Z      [90m 115 |[39m       [36mconst[39m createPatrimonioDto [33m=[39m {[0m
2025-12-11T00:30:03.6793415Z 
2025-12-11T00:30:03.6794186Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:112:10)
2025-12-11T00:30:03.6794312Z       ----
2025-12-11T00:30:03.6796006Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6796638Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6798511Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6799534Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6800975Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6801833Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6803835Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6805123Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6806855Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6806877Z 
2025-12-11T00:30:03.6809183Z   ● PatrimonioController (e2e) › POST /v1/patrimonio › should return 400 when required fields are missing
2025-12-11T00:30:03.6809202Z 
2025-12-11T00:30:03.6809434Z     expected 400 "Bad Request", got 403 "Forbidden"
2025-12-11T00:30:03.6809453Z 
2025-12-11T00:30:03.6810077Z     [0m [90m 144 |[39m       )
2025-12-11T00:30:03.6811507Z      [90m 145 |[39m         [33m.[39msend(invalidDto)
2025-12-11T00:30:03.6813518Z     [31m[1m>[22m[39m[90m 146 |[39m         [33m.[39mexpect([35m400[39m)[33m;[39m
2025-12-11T00:30:03.6814045Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6814898Z      [90m 147 |[39m     })[33m;[39m
2025-12-11T00:30:03.6815497Z      [90m 148 |[39m   })[33m;[39m
2025-12-11T00:30:03.6815929Z      [90m 149 |[39m[0m
2025-12-11T00:30:03.6815944Z 
2025-12-11T00:30:03.6817426Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:146:10)
2025-12-11T00:30:03.6817553Z       ----
2025-12-11T00:30:03.6819034Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6819721Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6821496Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6822795Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6824105Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6825103Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6826822Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6828085Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6829845Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6829869Z 
2025-12-11T00:30:03.6832074Z   ● PatrimonioController (e2e) › GET /v1/patrimonio/:id › should return a patrimonio by id (200)
2025-12-11T00:30:03.6832090Z 
2025-12-11T00:30:03.6832314Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6832332Z 
2025-12-11T00:30:03.6835290Z     [0m [90m 280 |[39m           status[33m:[39m [33mPatrimonioStatus[39m[33m.[39m[33mATIVO[39m[33m,[39m
2025-12-11T00:30:03.6835517Z      [90m 281 |[39m         })
2025-12-11T00:30:03.6837493Z     [31m[1m>[22m[39m[90m 282 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6838020Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6838371Z      [90m 283 |[39m
2025-12-11T00:30:03.6841744Z      [90m 284 |[39m       [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6841946Z      [90m 285 |[39m[0m
2025-12-11T00:30:03.6841959Z 
2025-12-11T00:30:03.6842639Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:282:10)
2025-12-11T00:30:03.6842768Z       ----
2025-12-11T00:30:03.6844523Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6845254Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6846936Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6848213Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6849458Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6850175Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6852326Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6853651Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6855374Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6855390Z 
2025-12-11T00:30:03.6857842Z   ● PatrimonioController (e2e) › GET /v1/patrimonio/codigo/:codigo › should return a patrimonio by codigo (200)
2025-12-11T00:30:03.6857860Z 
2025-12-11T00:30:03.6858073Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6858083Z 
2025-12-11T00:30:03.6860411Z     [0m [90m 328 |[39m           nome[33m:[39m [32m'Notebook Dell Inspiron 15'[39m[33m,[39m
2025-12-11T00:30:03.6860632Z      [90m 329 |[39m         })
2025-12-11T00:30:03.6862882Z     [31m[1m>[22m[39m[90m 330 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6863467Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6863743Z      [90m 331 |[39m
2025-12-11T00:30:03.6866426Z      [90m 332 |[39m       [36mconst[39m response [33m=[39m [36mawait[39m authenticatedRequest(
2025-12-11T00:30:03.6867037Z      [90m 333 |[39m         httpServer[33m,[39m[0m
2025-12-11T00:30:03.6867053Z 
2025-12-11T00:30:03.6868204Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:330:10)
2025-12-11T00:30:03.6868331Z       ----
2025-12-11T00:30:03.6869909Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6871911Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6873497Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6874595Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6876013Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6876849Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6878704Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6879933Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6881815Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6881840Z 
2025-12-11T00:30:03.6883777Z   ● PatrimonioController (e2e) › PATCH /v1/patrimonio/:id › should update a patrimonio (200)
2025-12-11T00:30:03.6883794Z 
2025-12-11T00:30:03.6884007Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6884017Z 
2025-12-11T00:30:03.6886496Z     [0m [90m 408 |[39m           nome[33m:[39m [32m'Notebook Dell Inspiron 15'[39m[33m,[39m
2025-12-11T00:30:03.6886717Z      [90m 409 |[39m         })
2025-12-11T00:30:03.6888843Z     [31m[1m>[22m[39m[90m 410 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6889375Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6889729Z      [90m 411 |[39m
2025-12-11T00:30:03.6893013Z      [90m 412 |[39m       [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.6893417Z      [90m 413 |[39m[0m
2025-12-11T00:30:03.6893427Z 
2025-12-11T00:30:03.6894069Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:410:10)
2025-12-11T00:30:03.6894190Z       ----
2025-12-11T00:30:03.6895937Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6896712Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6898433Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6899586Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6900923Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6901812Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6903726Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6905040Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6906779Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6906795Z 
2025-12-11T00:30:03.6909390Z   ● PatrimonioController (e2e) › PATCH /v1/patrimonio/:id › should return 404 when updating non-existent patrimonio
2025-12-11T00:30:03.6909404Z 
2025-12-11T00:30:03.6909636Z     expected 404 "Not Found", got 403 "Forbidden"
2025-12-11T00:30:03.6909646Z 
2025-12-11T00:30:03.6910185Z     [0m [90m 447 |[39m       )
2025-12-11T00:30:03.6911739Z      [90m 448 |[39m         [33m.[39msend(updateDto)
2025-12-11T00:30:03.6913709Z     [31m[1m>[22m[39m[90m 449 |[39m         [33m.[39mexpect([35m404[39m)[33m;[39m
2025-12-11T00:30:03.6914218Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6914976Z      [90m 450 |[39m     })[33m;[39m
2025-12-11T00:30:03.6915735Z      [90m 451 |[39m   })[33m;[39m
2025-12-11T00:30:03.6916137Z      [90m 452 |[39m[0m
2025-12-11T00:30:03.6916162Z 
2025-12-11T00:30:03.6917683Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:449:10)
2025-12-11T00:30:03.6917808Z       ----
2025-12-11T00:30:03.6919280Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6919997Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6921916Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6923159Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6924407Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6925115Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6927076Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6928566Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6930180Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6930205Z 
2025-12-11T00:30:03.6932489Z   ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should create multiple patrimonios (201)
2025-12-11T00:30:03.6932508Z 
2025-12-11T00:30:03.6932728Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6932738Z 
2025-12-11T00:30:03.6933333Z     [0m [90m 479 |[39m       )
2025-12-11T00:30:03.6935473Z      [90m 480 |[39m         [33m.[39msend({ patrimonios[33m:[39m createDtos })
2025-12-11T00:30:03.6937244Z     [31m[1m>[22m[39m[90m 481 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6937769Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6938098Z      [90m 482 |[39m
2025-12-11T00:30:03.6940657Z      [90m 483 |[39m       [90m// O endpoint retorna BulkResponseDto com sucessos e erros[39m
2025-12-11T00:30:03.6943294Z      [90m 484 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'sucessos'[39m)[33m;[39m[0m
2025-12-11T00:30:03.6943529Z 
2025-12-11T00:30:03.6943832Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:481:10)
2025-12-11T00:30:03.6943958Z       ----
2025-12-11T00:30:03.6945677Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.6946409Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6948180Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6949420Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6950694Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6951452Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6953504Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6954820Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6956578Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6956601Z 
2025-12-11T00:30:03.6959052Z   ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should return 400 or 409 when empty array provided
2025-12-11T00:30:03.6959066Z 
2025-12-11T00:30:03.6959241Z     Expected 400 or 409, got 403
2025-12-11T00:30:03.6959251Z 
2025-12-11T00:30:03.6959511Z     [0m [90m 507 |[39m       )
2025-12-11T00:30:03.6961423Z      [90m 508 |[39m         [33m.[39msend({ patrimonios[33m:[39m [] })
2025-12-11T00:30:03.6964035Z     [31m[1m>[22m[39m[90m 509 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.6964621Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6967538Z      [90m 510 |[39m           [90m// Pode retornar 400 (Bad Request) ou 409 (Conflict) dependendo da validação[39m
2025-12-11T00:30:03.6970800Z      [90m 511 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m400[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m409[39m) {
2025-12-11T00:30:03.6973726Z      [90m 512 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 400 or 409, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.6973753Z 
2025-12-11T00:30:03.6974088Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:509:10)
2025-12-11T00:30:03.6974205Z       ----
2025-12-11T00:30:03.6975039Z       at patrimonio.e2e-spec.ts:512:19
2025-12-11T00:30:03.6976213Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.6977792Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.6978892Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.6980276Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.6980991Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.6983310Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.6984308Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.6986219Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.6986242Z 
2025-12-11T00:30:03.6988662Z   ● PatrimonioController (e2e) › POST /v1/patrimonio/bulk › should handle duplicate codigos in request (201)
2025-12-11T00:30:03.6988680Z 
2025-12-11T00:30:03.6988896Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.6988915Z 
2025-12-11T00:30:03.6989463Z     [0m [90m 542 |[39m       )
2025-12-11T00:30:03.6991743Z      [90m 543 |[39m         [33m.[39msend({ patrimonios[33m:[39m duplicateDtos })
2025-12-11T00:30:03.6993469Z     [31m[1m>[22m[39m[90m 544 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.6994126Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.6994368Z      [90m 545 |[39m
2025-12-11T00:30:03.6996652Z      [90m 546 |[39m       [90m// Verificar que retornou estrutura de resposta bulk[39m
2025-12-11T00:30:03.6999184Z      [90m 547 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'sucessos'[39m)[33m;[39m[0m
2025-12-11T00:30:03.6999202Z 
2025-12-11T00:30:03.6999601Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:544:10)
2025-12-11T00:30:03.6999726Z       ----
2025-12-11T00:30:03.7001475Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7002365Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7004171Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7005320Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7006665Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7007352Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7009386Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7010673Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7012446Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7012470Z 
2025-12-11T00:30:03.7014780Z   ● PatrimonioController (e2e) › DELETE /v1/patrimonio/:id › should soft delete a patrimonio (200 or 204)
2025-12-11T00:30:03.7014800Z 
2025-12-11T00:30:03.7015020Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.7015030Z 
2025-12-11T00:30:03.7017323Z     [0m [90m 573 |[39m           nome[33m:[39m [32m'Notebook para deletar'[39m[33m,[39m
2025-12-11T00:30:03.7017550Z      [90m 574 |[39m         })
2025-12-11T00:30:03.7019686Z     [31m[1m>[22m[39m[90m 575 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.7020257Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7020568Z      [90m 576 |[39m
2025-12-11T00:30:03.7023827Z      [90m 577 |[39m       [36mconst[39m patrimonioId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.7024029Z      [90m 578 |[39m[0m
2025-12-11T00:30:03.7024040Z 
2025-12-11T00:30:03.7024884Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:575:10)
2025-12-11T00:30:03.7025006Z       ----
2025-12-11T00:30:03.7026742Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7027370Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7029254Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7030460Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7031855Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7032679Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7034777Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7035776Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7037696Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7037709Z 
2025-12-11T00:30:03.7040342Z   ● PatrimonioController (e2e) › DELETE /v1/patrimonio/:id › should return 404 when deleting non-existent patrimonio
2025-12-11T00:30:03.7040355Z 
2025-12-11T00:30:03.7040586Z     expected 404 "Not Found", got 403 "Forbidden"
2025-12-11T00:30:03.7040596Z 
2025-12-11T00:30:03.7041896Z     [0m [90m 598 |[39m         tokens[33m,[39m
2025-12-11T00:30:03.7043686Z      [90m 599 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.7045446Z     [31m[1m>[22m[39m[90m 600 |[39m       )[33m.[39mexpect([35m404[39m)[33m;[39m
2025-12-11T00:30:03.7045974Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T00:30:03.7046720Z      [90m 601 |[39m     })[33m;[39m
2025-12-11T00:30:03.7047424Z      [90m 602 |[39m   })[33m;[39m
2025-12-11T00:30:03.7048245Z      [90m 603 |[39m })[33m;[39m[0m
2025-12-11T00:30:03.7048261Z 
2025-12-11T00:30:03.7049610Z       at Object.<anonymous> (patrimonio.e2e-spec.ts:600:9)
2025-12-11T00:30:03.7049737Z       ----
2025-12-11T00:30:03.7051279Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7052135Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7053861Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7055895Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7056929Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7057861Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7059780Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7061090Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7063014Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7063031Z 
2025-12-11T00:30:03.7063876Z FAIL events/events.e2e-spec.ts (13.854 s)
2025-12-11T00:30:03.7065825Z   ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - ADMIN
2025-12-11T00:30:03.7065842Z 
2025-12-11T00:30:03.7066122Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.7066142Z 
2025-12-11T00:30:03.7066816Z     [0m [90m 131 |[39m       )
2025-12-11T00:30:03.7068414Z      [90m 132 |[39m         [33m.[39msend(createEventDto)
2025-12-11T00:30:03.7070273Z     [31m[1m>[22m[39m[90m 133 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.7070908Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7071146Z      [90m 134 |[39m
2025-12-11T00:30:03.7074267Z      [90m 135 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:30:03.7077674Z      [90m 136 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m createEventDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:30:03.7077695Z 
2025-12-11T00:30:03.7077994Z       at Object.<anonymous> (events/events.e2e-spec.ts:133:10)
2025-12-11T00:30:03.7078117Z       ----
2025-12-11T00:30:03.7080013Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7080683Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7082689Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7083692Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7085149Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7086093Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7087899Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7089091Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7090875Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7090887Z 
2025-12-11T00:30:03.7092784Z   ● Events (e2e) › POST /v1/events › deve criar evento com sucesso (201) - MANAGER
2025-12-11T00:30:03.7092797Z 
2025-12-11T00:30:03.7093123Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.7093135Z 
2025-12-11T00:30:03.7093757Z     [0m [90m 173 |[39m       )
2025-12-11T00:30:03.7095338Z      [90m 174 |[39m         [33m.[39msend(createEventDto)
2025-12-11T00:30:03.7097159Z     [31m[1m>[22m[39m[90m 175 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.7097732Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7098168Z      [90m 176 |[39m
2025-12-11T00:30:03.7100978Z      [90m 177 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:30:03.7104581Z      [90m 178 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m createEventDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:30:03.7104604Z 
2025-12-11T00:30:03.7104914Z       at Object.<anonymous> (events/events.e2e-spec.ts:175:10)
2025-12-11T00:30:03.7105035Z       ----
2025-12-11T00:30:03.7106660Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7107361Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7109477Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7110850Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7112280Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7112978Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7114945Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7116205Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7117964Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7117980Z 
2025-12-11T00:30:03.7119441Z   ● Events (e2e) › GET /v1/events › deve listar eventos com paginação (200)
2025-12-11T00:30:03.7119457Z 
2025-12-11T00:30:03.7120080Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7120092Z 
2025-12-11T00:30:03.7120585Z     [0m [90m 193 |[39m       )
2025-12-11T00:30:03.7123806Z      [90m 194 |[39m         [33m.[39mquery({ page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:30:03.7125400Z     [31m[1m>[22m[39m[90m 195 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7125882Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7126249Z      [90m 196 |[39m
2025-12-11T00:30:03.7129170Z      [90m 197 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'data'[39m)[33m;[39m
2025-12-11T00:30:03.7131467Z      [90m 198 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'total'[39m)[33m;[39m[0m
2025-12-11T00:30:03.7131484Z 
2025-12-11T00:30:03.7132299Z       at Object.<anonymous> (events/events.e2e-spec.ts:195:10)
2025-12-11T00:30:03.7132422Z       ----
2025-12-11T00:30:03.7134122Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7134829Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7136654Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7137852Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7139210Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7139949Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7141937Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7143254Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7146031Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7146049Z 
2025-12-11T00:30:03.7147415Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por eventType (200)
2025-12-11T00:30:03.7147431Z 
2025-12-11T00:30:03.7147989Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7148003Z 
2025-12-11T00:30:03.7148631Z     [0m [90m 214 |[39m       )
2025-12-11T00:30:03.7153784Z      [90m 215 |[39m         [33m.[39mquery({ eventType[33m:[39m [33mEventType[39m[33m.[39m[33mMANUTENCAO[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:30:03.7154846Z     [31m[1m>[22m[39m[90m 216 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7155644Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7156016Z      [90m 217 |[39m
2025-12-11T00:30:03.7158691Z      [90m 218 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:30:03.7161174Z      [90m 219 |[39m       [36mif[39m (response[33m.[39mbody[33m.[39mdata[33m.[39mlength [33m>[39m [35m0[39m) {[0m
2025-12-11T00:30:03.7161191Z 
2025-12-11T00:30:03.7161880Z       at Object.<anonymous> (events/events.e2e-spec.ts:216:10)
2025-12-11T00:30:03.7162003Z       ----
2025-12-11T00:30:03.7163783Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7164439Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7166261Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7167419Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7168765Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7169500Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7171524Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7172861Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7174634Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7174650Z 
2025-12-11T00:30:03.7175980Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por state (200)
2025-12-11T00:30:03.7176002Z 
2025-12-11T00:30:03.7176617Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7176631Z 
2025-12-11T00:30:03.7177198Z     [0m [90m 233 |[39m       )
2025-12-11T00:30:03.7182242Z      [90m 234 |[39m         [33m.[39mquery({ state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:30:03.7183306Z     [31m[1m>[22m[39m[90m 235 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7183985Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7184313Z      [90m 236 |[39m
2025-12-11T00:30:03.7187131Z      [90m 237 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:30:03.7187392Z      [90m 238 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.7187405Z 
2025-12-11T00:30:03.7188793Z       at Object.<anonymous> (events/events.e2e-spec.ts:235:10)
2025-12-11T00:30:03.7188922Z       ----
2025-12-11T00:30:03.7190397Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7191067Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7193273Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7194206Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7195573Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7196339Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7198201Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7199534Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7201370Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7201387Z 
2025-12-11T00:30:03.7202763Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por visibility (200)
2025-12-11T00:30:03.7202779Z 
2025-12-11T00:30:03.7203464Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7203479Z 
2025-12-11T00:30:03.7204034Z     [0m [90m 247 |[39m       )
2025-12-11T00:30:03.7209174Z      [90m 248 |[39m         [33m.[39mquery({ visibility[33m:[39m [33mEventVisibility[39m[33m.[39m[33mPUBLIC[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:30:03.7210198Z     [31m[1m>[22m[39m[90m 249 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7210875Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7211193Z      [90m 250 |[39m
2025-12-11T00:30:03.7214349Z      [90m 251 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:30:03.7214610Z      [90m 252 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.7214621Z 
2025-12-11T00:30:03.7215904Z       at Object.<anonymous> (events/events.e2e-spec.ts:249:10)
2025-12-11T00:30:03.7216024Z       ----
2025-12-11T00:30:03.7217497Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7218209Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7220026Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7221298Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7222611Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7223311Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7225248Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7226555Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7228288Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7228304Z 
2025-12-11T00:30:03.7229777Z   ● Events (e2e) › GET /v1/events › deve buscar eventos por texto (q) (200)
2025-12-11T00:30:03.7229791Z 
2025-12-11T00:30:03.7231888Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7231901Z 
2025-12-11T00:30:03.7232247Z     [0m [90m 261 |[39m       )
2025-12-11T00:30:03.7236334Z      [90m 262 |[39m         [33m.[39mquery({ q[33m:[39m [32m'Teste'[39m[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:30:03.7237699Z     [31m[1m>[22m[39m[90m 263 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7238199Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7238542Z      [90m 264 |[39m
2025-12-11T00:30:03.7241423Z      [90m 265 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:30:03.7241818Z      [90m 266 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.7241831Z 
2025-12-11T00:30:03.7243202Z       at Object.<anonymous> (events/events.e2e-spec.ts:263:10)
2025-12-11T00:30:03.7243325Z       ----
2025-12-11T00:30:03.7244791Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7245486Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7247503Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7248405Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7249827Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7250522Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7252633Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7253932Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7255666Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7255682Z 
2025-12-11T00:30:03.7257409Z   ● Events (e2e) › GET /v1/events › deve filtrar eventos por intervalo de datas (200)
2025-12-11T00:30:03.7257424Z 
2025-12-11T00:30:03.7257906Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7257930Z 
2025-12-11T00:30:03.7258561Z     [0m [90m 280 |[39m       )
2025-12-11T00:30:03.7264790Z      [90m 281 |[39m         [33m.[39mquery({ [36mfrom[39m[33m:[39m [36mfrom[39m[33m.[39mtoISOString()[33m,[39m to[33m:[39m to[33m.[39mtoISOString()[33m,[39m page[33m:[39m [35m1[39m[33m,[39m limit[33m:[39m [35m20[39m })
2025-12-11T00:30:03.7265714Z     [31m[1m>[22m[39m[90m 282 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7266474Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7266734Z      [90m 283 |[39m
2025-12-11T00:30:03.7269466Z      [90m 284 |[39m       expect(response[33m.[39mbody[33m.[39mdata)[33m.[39mtoBeDefined()[33m;[39m
2025-12-11T00:30:03.7269717Z      [90m 285 |[39m     })[33m;[39m[0m
2025-12-11T00:30:03.7269728Z 
2025-12-11T00:30:03.7271133Z       at Object.<anonymous> (events/events.e2e-spec.ts:282:10)
2025-12-11T00:30:03.7271251Z       ----
2025-12-11T00:30:03.7272886Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7273607Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7275422Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7276446Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7277894Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7278567Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7280570Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7282029Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7283797Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7283810Z 
2025-12-11T00:30:03.7285367Z   ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por ID (200)
2025-12-11T00:30:03.7285382Z 
2025-12-11T00:30:03.7285993Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7286005Z 
2025-12-11T00:30:03.7287175Z     [0m [90m 294 |[39m         tokens[33m,[39m
2025-12-11T00:30:03.7290457Z      [90m 295 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m [90m// GET /events/:idOrSlug requer autenticação[39m
2025-12-11T00:30:03.7291968Z     [31m[1m>[22m[39m[90m 296 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7292480Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T00:30:03.7292778Z      [90m 297 |[39m
2025-12-11T00:30:03.7296221Z      [90m 298 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T00:30:03.7298309Z      [90m 299 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m)[33m;[39m[0m
2025-12-11T00:30:03.7298333Z 
2025-12-11T00:30:03.7298862Z       at Object.<anonymous> (events/events.e2e-spec.ts:296:9)
2025-12-11T00:30:03.7298984Z       ----
2025-12-11T00:30:03.7300957Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7301438Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7303351Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7304371Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7305801Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7306499Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7308497Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7309798Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7311560Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7311576Z 
2025-12-11T00:30:03.7313396Z   ● Events (e2e) › GET /v1/events/:idOrSlug › deve buscar evento por slug (200)
2025-12-11T00:30:03.7313413Z 
2025-12-11T00:30:03.7313749Z     expected 200 "OK", got 500 "Internal Server Error"
2025-12-11T00:30:03.7313948Z 
2025-12-11T00:30:03.7314923Z     [0m [90m 308 |[39m         tokens[33m,[39m
2025-12-11T00:30:03.7316843Z      [90m 309 |[39m         [33mUserRole[39m[33m.[39m[33mADMIN[39m[33m,[39m
2025-12-11T00:30:03.7318581Z     [31m[1m>[22m[39m[90m 310 |[39m       )[33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7319154Z      [90m     |[39m         [31m[1m^[22m[39m
2025-12-11T00:30:03.7319447Z      [90m 311 |[39m
2025-12-11T00:30:03.7323000Z      [90m 312 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T00:30:03.7326458Z      [90m 313 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'slug'[39m[33m,[39m eventSlug1)[33m;[39m[0m
2025-12-11T00:30:03.7326476Z 
2025-12-11T00:30:03.7326903Z       at Object.<anonymous> (events/events.e2e-spec.ts:310:9)
2025-12-11T00:30:03.7327031Z       ----
2025-12-11T00:30:03.7328780Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7329397Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7331267Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7332726Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7334031Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7334780Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7336698Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7338059Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7339804Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7339819Z 
2025-12-11T00:30:03.7342199Z   ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - ADMIN (proprietário)
2025-12-11T00:30:03.7342227Z 
2025-12-11T00:30:03.7342431Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:30:03.7342442Z 
2025-12-11T00:30:03.7342992Z     [0m [90m 330 |[39m       )
2025-12-11T00:30:03.7344473Z      [90m 331 |[39m         [33m.[39msend(updateDto)
2025-12-11T00:30:03.7346379Z     [31m[1m>[22m[39m[90m 332 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7346968Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7347253Z      [90m 333 |[39m
2025-12-11T00:30:03.7350741Z      [90m 334 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId1)[33m;[39m
2025-12-11T00:30:03.7354056Z      [90m 335 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m updateDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:30:03.7354287Z 
2025-12-11T00:30:03.7354611Z       at Object.<anonymous> (events/events.e2e-spec.ts:332:10)
2025-12-11T00:30:03.7354731Z       ----
2025-12-11T00:30:03.7356325Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7356971Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7358799Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7359847Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7361320Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7362181Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7364185Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7365473Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7367233Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7367247Z 
2025-12-11T00:30:03.7369533Z   ● Events (e2e) › PATCH /v1/events/:id › deve atualizar evento com sucesso (200) - MANAGER (proprietário)
2025-12-11T00:30:03.7369737Z 
2025-12-11T00:30:03.7369946Z     expected 200 "OK", got 400 "Bad Request"
2025-12-11T00:30:03.7369957Z 
2025-12-11T00:30:03.7370385Z     [0m [90m 350 |[39m       )
2025-12-11T00:30:03.7371943Z      [90m 351 |[39m         [33m.[39msend(updateDto)
2025-12-11T00:30:03.7373784Z     [31m[1m>[22m[39m[90m 352 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7374504Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7374681Z      [90m 353 |[39m
2025-12-11T00:30:03.7377990Z      [90m 354 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m[33m,[39m eventId2)[33m;[39m
2025-12-11T00:30:03.7381180Z      [90m 355 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'title'[39m[33m,[39m updateDto[33m.[39mtitle)[33m;[39m[0m
2025-12-11T00:30:03.7381204Z 
2025-12-11T00:30:03.7381504Z       at Object.<anonymous> (events/events.e2e-spec.ts:352:10)
2025-12-11T00:30:03.7381786Z       ----
2025-12-11T00:30:03.7383534Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7384151Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7386038Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7387190Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7388522Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7389279Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7391199Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7392670Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7394378Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7394402Z 
2025-12-11T00:30:03.7396780Z   ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - ADMIN (proprietário)
2025-12-11T00:30:03.7396803Z 
2025-12-11T00:30:03.7397021Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.7397038Z 
2025-12-11T00:30:03.7399726Z     [0m [90m 381 |[39m           state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m
2025-12-11T00:30:03.7399951Z      [90m 382 |[39m         })
2025-12-11T00:30:03.7402214Z     [31m[1m>[22m[39m[90m 383 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.7402690Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7403005Z      [90m 384 |[39m
2025-12-11T00:30:03.7406274Z      [90m 385 |[39m       [36mconst[39m eventToPublishId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.7406714Z      [90m 386 |[39m[0m
2025-12-11T00:30:03.7406734Z 
2025-12-11T00:30:03.7407358Z       at Object.<anonymous> (events/events.e2e-spec.ts:383:10)
2025-12-11T00:30:03.7407491Z       ----
2025-12-11T00:30:03.7409158Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7409895Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7411763Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7413014Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7414275Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7414934Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7417728Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7419006Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7420763Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7420778Z 
2025-12-11T00:30:03.7423430Z   ● Events (e2e) › POST /v1/events/:id/publish › deve publicar evento com sucesso (200) - MANAGER (proprietário)
2025-12-11T00:30:03.7423627Z 
2025-12-11T00:30:03.7423847Z     expected 201 "Created", got 403 "Forbidden"
2025-12-11T00:30:03.7423858Z 
2025-12-11T00:30:03.7426321Z     [0m [90m 426 |[39m           state[33m:[39m [33mEventState[39m[33m.[39m[33mDRAFT[39m[33m,[39m
2025-12-11T00:30:03.7426546Z      [90m 427 |[39m         })
2025-12-11T00:30:03.7428575Z     [31m[1m>[22m[39m[90m 428 |[39m         [33m.[39mexpect([35m201[39m)[33m;[39m
2025-12-11T00:30:03.7429094Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7429471Z      [90m 429 |[39m
2025-12-11T00:30:03.7432911Z      [90m 430 |[39m       [36mconst[39m eventToPublishId [33m=[39m createResponse[33m.[39mbody[33m.[39mid[33m;[39m
2025-12-11T00:30:03.7433110Z      [90m 431 |[39m[0m
2025-12-11T00:30:03.7433124Z 
2025-12-11T00:30:03.7433990Z       at Object.<anonymous> (events/events.e2e-spec.ts:428:10)
2025-12-11T00:30:03.7434123Z       ----
2025-12-11T00:30:03.7435868Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7436632Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7438353Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7439612Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7440873Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7441578Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7443675Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7444990Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7446717Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7446733Z 
2025-12-11T00:30:03.7447477Z FAIL auth/auth.e2e-spec.ts (185.238 s)
2025-12-11T00:30:03.7449708Z   ● Auth (e2e) › GET /v1/auth/me › deve retornar informações do usuário autenticado (200)
2025-12-11T00:30:03.7449726Z 
2025-12-11T00:30:03.7449944Z     expected 200 "OK", got 401 "Unauthorized"
2025-12-11T00:30:03.7449954Z 
2025-12-11T00:30:03.7452141Z     [0m [90m 260 |[39m         [33m.[39m[36mget[39m([32m'/v1/auth/me'[39m)
2025-12-11T00:30:03.7455186Z      [90m 261 |[39m         [33m.[39m[36mset[39m([32m'Authorization'[39m[33m,[39m [32m`***
2025-12-11T00:30:03.7456246Z     [31m[1m>[22m[39m[90m 262 |[39m         [33m.[39mexpect([35m200[39m)[33m;[39m
2025-12-11T00:30:03.7456961Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7457295Z      [90m 263 |[39m
2025-12-11T00:30:03.7460501Z      [90m 264 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'id'[39m)[33m;[39m
2025-12-11T00:30:03.7463370Z      [90m 265 |[39m       expect(response[33m.[39mbody)[33m.[39mtoHaveProperty([32m'email'[39m[33m,[39m testUserEmail)[33m;[39m[0m
2025-12-11T00:30:03.7463402Z 
2025-12-11T00:30:03.7463680Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:262:10)
2025-12-11T00:30:03.7463806Z       ----
2025-12-11T00:30:03.7465552Z       at Test._assertStatus (../node_modules/supertest/lib/test.js:309:14)
2025-12-11T00:30:03.7466198Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7468075Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7469267Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7470488Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7471251Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7473268Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7474536Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7476319Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7476342Z 
2025-12-11T00:30:03.7478183Z   ● Auth (e2e) › POST /v1/auth/refresh › deve renovar tokens com refresh token válido (200)
2025-12-11T00:30:03.7478200Z 
2025-12-11T00:30:03.7478371Z     Expected 200 or 201, got 401
2025-12-11T00:30:03.7478381Z 
2025-12-11T00:30:03.7480504Z     [0m [90m 343 |[39m           refreshToken[33m:[39m originalRefreshToken[33m,[39m
2025-12-11T00:30:03.7480728Z      [90m 344 |[39m         })
2025-12-11T00:30:03.7482860Z     [31m[1m>[22m[39m[90m 345 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.7483399Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7485262Z      [90m 346 |[39m           [90m// Refresh pode retornar 200 ou 201[39m
2025-12-11T00:30:03.7488786Z      [90m 347 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.7491784Z      [90m 348 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.7491806Z 
2025-12-11T00:30:03.7492080Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:345:10)
2025-12-11T00:30:03.7492199Z       ----
2025-12-11T00:30:03.7492910Z       at auth/auth.e2e-spec.ts:348:19
2025-12-11T00:30:03.7494252Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7495784Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7497043Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7498294Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7499053Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7500981Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7502479Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7504214Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7504227Z 
2025-12-11T00:30:03.7506058Z   ● Auth (e2e) › POST /v1/auth/refresh › deve revogar refresh token antigo após renovação
2025-12-11T00:30:03.7506076Z 
2025-12-11T00:30:03.7506243Z     Expected 200 or 201, got 401
2025-12-11T00:30:03.7506253Z 
2025-12-11T00:30:03.7509176Z     [0m [90m 423 |[39m           refreshToken[33m:[39m originalRefreshToken[33m,[39m
2025-12-11T00:30:03.7509396Z      [90m 424 |[39m         })
2025-12-11T00:30:03.7511408Z     [31m[1m>[22m[39m[90m 425 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.7512128Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7514237Z      [90m 426 |[39m           [90m// Refresh pode retornar 200 ou 201[39m
2025-12-11T00:30:03.7517488Z      [90m 427 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.7520220Z      [90m 428 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.7520249Z 
2025-12-11T00:30:03.7520547Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:425:10)
2025-12-11T00:30:03.7520664Z       ----
2025-12-11T00:30:03.7521432Z       at auth/auth.e2e-spec.ts:428:19
2025-12-11T00:30:03.7522843Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7524382Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7525405Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7526918Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7527594Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7529582Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7530803Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7532889Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7532901Z 
2025-12-11T00:30:03.7534498Z   ● Auth (e2e) › POST /v1/auth/logout › deve revogar refresh token após logout
2025-12-11T00:30:03.7534512Z 
2025-12-11T00:30:03.7534685Z     Expected 200 or 201, got 429
2025-12-11T00:30:03.7534696Z 
2025-12-11T00:30:03.7536660Z     [0m [90m 516 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T00:30:03.7536886Z      [90m 517 |[39m         })
2025-12-11T00:30:03.7539003Z     [31m[1m>[22m[39m[90m 518 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.7539566Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7541380Z      [90m 519 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T00:30:03.7545016Z      [90m 520 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.7547766Z      [90m 521 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.7547784Z 
2025-12-11T00:30:03.7548067Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:518:10)
2025-12-11T00:30:03.7548193Z       ----
2025-12-11T00:30:03.7549012Z       at auth/auth.e2e-spec.ts:521:19
2025-12-11T00:30:03.7550136Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7551905Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7553151Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7554419Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7555111Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7557103Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7558409Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7560134Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7560151Z 
2025-12-11T00:30:03.7561998Z   ● Auth (e2e) › POST /v1/auth/logout › deve permitir logout múltiplo (idempotente)
2025-12-11T00:30:03.7562013Z 
2025-12-11T00:30:03.7562186Z     Expected 200 or 201, got 429
2025-12-11T00:30:03.7562196Z 
2025-12-11T00:30:03.7564141Z     [0m [90m 556 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T00:30:03.7564362Z      [90m 557 |[39m         })
2025-12-11T00:30:03.7566584Z     [31m[1m>[22m[39m[90m 558 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.7566999Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7568837Z      [90m 559 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T00:30:03.7572416Z      [90m 560 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.7575276Z      [90m 561 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.7575303Z 
2025-12-11T00:30:03.7575707Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:558:10)
2025-12-11T00:30:03.7575831Z       ----
2025-12-11T00:30:03.7576485Z       at auth/auth.e2e-spec.ts:561:19
2025-12-11T00:30:03.7577658Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7579172Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7580399Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7582015Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7582811Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7584778Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7586042Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7587744Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7587761Z 
2025-12-11T00:30:03.7589827Z   ● Auth (e2e) › Fluxo completo de autenticação › deve permitir login -> me -> refresh -> logout
2025-12-11T00:30:03.7589855Z 
2025-12-11T00:30:03.7590024Z     Expected 200 or 201, got 429
2025-12-11T00:30:03.7590034Z 
2025-12-11T00:30:03.7591959Z     [0m [90m 605 |[39m           password[33m:[39m testUserPassword[33m,[39m
2025-12-11T00:30:03.7592209Z      [90m 606 |[39m         })
2025-12-11T00:30:03.7594274Z     [31m[1m>[22m[39m[90m 607 |[39m         [33m.[39mexpect((res) [33m=>[39m {
2025-12-11T00:30:03.7595955Z      [90m     |[39m          [31m[1m^[22m[39m
2025-12-11T00:30:03.7597471Z      [90m 608 |[39m           [90m// Login pode retornar 200 ou 201[39m
2025-12-11T00:30:03.7600967Z      [90m 609 |[39m           [36mif[39m (res[33m.[39mstatus [33m!==[39m [35m200[39m [33m&&[39m res[33m.[39mstatus [33m!==[39m [35m201[39m) {
2025-12-11T00:30:03.7603920Z      [90m 610 |[39m             [36mthrow[39m [36mnew[39m [33mError[39m([32m`Expected 200 or 201, got ${res.status}`[39m)[33m;[39m[0m
2025-12-11T00:30:03.7603935Z 
2025-12-11T00:30:03.7604346Z       at Object.<anonymous> (auth/auth.e2e-spec.ts:607:10)
2025-12-11T00:30:03.7604465Z       ----
2025-12-11T00:30:03.7605131Z       at auth/auth.e2e-spec.ts:610:19
2025-12-11T00:30:03.7606381Z       at ../node_modules/supertest/lib/test.js:365:13
2025-12-11T00:30:03.7607946Z       at Test._assertFunction (../node_modules/supertest/lib/test.js:342:13)
2025-12-11T00:30:03.7609108Z       at Test.assert (../node_modules/supertest/lib/test.js:195:23)
2025-12-11T00:30:03.7610448Z       at localAssert (../node_modules/supertest/lib/test.js:138:14)
2025-12-11T00:30:03.7611140Z       at ../node_modules/supertest/lib/test.js:156:7
2025-12-11T00:30:03.7613252Z       at Test.fn [as callback] (../node_modules/superagent/src/node/index.js:904:3)
2025-12-11T00:30:03.7614523Z       at callback (../node_modules/superagent/src/node/index.js:1183:18)
2025-12-11T00:30:03.7616199Z       at IncomingMessage.fn (../node_modules/superagent/src/node/parsers/json.js:19:7)
2025-12-11T00:30:03.7616222Z 
2025-12-11T00:30:03.7616231Z 
2025-12-11T00:30:03.7619538Z Test Suites: 6 failed, 15 passed, 21 total
2025-12-11T00:30:03.7619803Z Tests:       106 failed, 348 passed, 454 total
2025-12-11T00:30:03.7619964Z Snapshots:   0 total
2025-12-11T00:30:03.7620107Z Time:        225.395 s
2025-12-11T00:30:03.7620406Z Ran all test suites.
2025-12-11T00:30:03.7794126Z ##[error]Process completed with exit code 1.
2025-12-11T00:30:03.7860316Z Post job cleanup.
2025-12-11T00:30:03.9021467Z [command]/usr/bin/git version
2025-12-11T00:30:03.9070234Z git version 2.52.0
2025-12-11T00:30:03.9115236Z Temporarily overriding HOME='/home/runner/work/_temp/d05add43-93c5-4b22-9be1-271f82f5bf14' before making global git config changes
2025-12-11T00:30:03.9116097Z Adding repository directory to the temporary git global config as a safe directory
2025-12-11T00:30:03.9119949Z [command]/usr/bin/git config --global --add safe.directory /home/runner/work/Desenv._sistemas_corporativos_patrimonio/Desenv._sistemas_corporativos_patrimonio
2025-12-11T00:30:03.9154512Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
2025-12-11T00:30:03.9188010Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
2025-12-11T00:30:03.9436569Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
2025-12-11T00:30:03.9458186Z http.https://github.com/.extraheader
2025-12-11T00:30:03.9474423Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
2025-12-11T00:30:03.9507703Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
2025-12-11T00:30:03.9745685Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
2025-12-11T00:30:03.9784362Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
2025-12-11T00:30:04.0160398Z Print service container logs: 3db668d6fddb4083990b40c52f455afb_postgres15alpine_416f60
2025-12-11T00:30:04.0164713Z ##[command]/usr/bin/docker logs --details a87f04bed4e84dada81592fce9422a3f595b8e5afe252097845a6e5107b8b60a
2025-12-11T00:30:04.0341580Z  sh: locale: not found
2025-12-11T00:30:04.0342425Z  The files belonging to this database system will be owned by user "postgres".
2025-12-11T00:30:04.0343221Z  2025-12-11 00:24:02.646 UTC [35] WARNING:  no usable system locales were found
2025-12-11T00:30:04.0343922Z  initdb: warning: enabling "trust" authentication for local connections
2025-12-11T00:30:04.0344972Z  initdb: hint: You can change this by editing pg_hba.conf or using the option -A, or --auth-local and --auth-host, the next time you run initdb.
2025-12-11T00:30:04.0346239Z  2025-12-11 00:24:03.536 UTC [1] LOG:  starting PostgreSQL 15.15 on x86_64-pc-linux-musl, compiled by gcc (Alpine 15.2.0) 15.2.0, 64-bit
2025-12-11T00:30:04.0347254Z  2025-12-11 00:24:03.536 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
2025-12-11T00:30:04.0347932Z  2025-12-11 00:24:03.536 UTC [1] LOG:  listening on IPv6 address "::", port 5432
2025-12-11T00:30:04.0348552Z  2025-12-11 00:24:03.537 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2025-12-11T00:30:04.0349055Z  2025-12-11 00:24:03.541 UTC [57] LOG:  database system was shut down at 2025-12-11 00:24:03 UTC
2025-12-11T00:30:04.0349497Z  2025-12-11 00:24:03.547 UTC [1] LOG:  database system is ready to accept connections
2025-12-11T00:30:04.0349880Z  2025-12-11 00:24:12.215 UTC [67] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0350206Z  2025-12-11 00:24:22.260 UTC [74] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0350528Z  2025-12-11 00:24:32.314 UTC [81] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0350845Z  2025-12-11 00:24:42.364 UTC [89] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0351165Z  2025-12-11 00:24:52.422 UTC [96] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0351514Z  2025-12-11 00:25:02.500 UTC [103] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0352079Z  2025-12-11 00:25:12.577 UTC [110] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0352480Z  2025-12-11 00:25:15.861 UTC [111] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0352932Z  2025-12-11 00:25:18.880 UTC [112] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0353358Z  2025-12-11 00:25:21.912 UTC [113] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0353739Z  2025-12-11 00:25:22.635 UTC [120] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0354127Z  2025-12-11 00:25:24.927 UTC [121] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0354551Z  2025-12-11 00:25:27.947 UTC [122] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0354965Z  2025-12-11 00:25:30.959 UTC [123] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0355346Z  2025-12-11 00:25:32.692 UTC [130] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0356163Z  2025-12-11 00:25:33.975 UTC [132] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0356950Z  2025-12-11 00:25:36.987 UTC [133] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0357707Z  2025-12-11 00:25:40.006 UTC [134] FATAL:  database "patrimonio_inventario" does not exist
2025-12-11T00:30:04.0358084Z  2025-12-11 00:25:42.764 UTC [140] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0358414Z  2025-12-11 00:25:52.836 UTC [147] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0358735Z  2025-12-11 00:26:02.900 UTC [154] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0359050Z  2025-12-11 00:26:12.949 UTC [163] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0359369Z  2025-12-11 00:26:23.028 UTC [170] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0359891Z  2025-12-11 00:26:33.092 UTC [177] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0360217Z  2025-12-11 00:26:43.146 UTC [188] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0360842Z  2025-12-11 00:26:52.938 UTC [193] ERROR:  update or delete on table "categorias" violates foreign key constraint "FK_74bc8a03b35a334b9d103d66d54" on table "maintenance_plans"
2025-12-11T00:30:04.0361909Z  2025-12-11 00:26:52.938 UTC [193] DETAIL:  Key (id)=(073906ff-8ecf-4734-8542-a152120ec905) is still referenced from table "maintenance_plans".
2025-12-11T00:30:04.0362523Z  2025-12-11 00:26:52.938 UTC [193] STATEMENT:  DELETE FROM categorias
2025-12-11T00:30:04.0362830Z  	           WHERE codigo LIKE 'CAT-TEST-%'
2025-12-11T00:30:04.0363125Z  2025-12-11 00:26:53.208 UTC [203] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0363448Z  2025-12-11 00:27:03.249 UTC [214] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0363783Z  2025-12-11 00:27:13.309 UTC [221] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0364104Z  2025-12-11 00:27:23.351 UTC [233] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0364425Z  2025-12-11 00:27:33.390 UTC [241] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0364743Z  2025-12-11 00:27:43.435 UTC [251] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0365055Z  2025-12-11 00:27:53.476 UTC [259] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0365378Z  2025-12-11 00:28:03.516 UTC [268] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0365701Z  2025-12-11 00:28:13.555 UTC [279] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0366017Z  2025-12-11 00:28:23.594 UTC [289] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0366333Z  2025-12-11 00:28:33.657 UTC [297] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0366652Z  2025-12-11 00:28:43.696 UTC [309] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0366972Z  2025-12-11 00:28:53.734 UTC [317] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0367307Z  2025-12-11 00:29:03.641 UTC [55] LOG:  checkpoint starting: time
2025-12-11T00:30:04.0367626Z  2025-12-11 00:29:03.776 UTC [325] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0367950Z  2025-12-11 00:29:13.817 UTC [334] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0368273Z  2025-12-11 00:29:23.856 UTC [342] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0368595Z  2025-12-11 00:29:33.894 UTC [350] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0368912Z  2025-12-11 00:29:43.933 UTC [357] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0369232Z  2025-12-11 00:29:53.973 UTC [365] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0370007Z  2025-12-11 00:29:57.246 UTC [55] LOG:  checkpoint complete: wrote 539 buffers (3.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=53.602 s, sync=0.002 s, total=53.606 s; sync files=295, longest=0.001 s, average=0.001 s; distance=2363 kB, estimate=2363 kB
2025-12-11T00:30:04.0370793Z  2025-12-11 00:30:04.026 UTC [374] FATAL:  role "root" does not exist
2025-12-11T00:30:04.0371108Z  This user must also own the server process.
2025-12-11T00:30:04.0371342Z  
2025-12-11T00:30:04.0371583Z  The database cluster will be initialized with locale "en_US.utf8".
2025-12-11T00:30:04.0372219Z  The default database encoding has accordingly been set to "UTF8".
2025-12-11T00:30:04.0372595Z  The default text search configuration will be set to "english".
2025-12-11T00:30:04.0373044Z  
2025-12-11T00:30:04.0373206Z  Data page checksums are disabled.
2025-12-11T00:30:04.0373422Z  
2025-12-11T00:30:04.0373682Z  fixing permissions on existing directory /var/lib/postgresql/data ... ok
2025-12-11T00:30:04.0374031Z  creating subdirectories ... ok
2025-12-11T00:30:04.0374324Z  selecting dynamic shared memory implementation ... posix
2025-12-11T00:30:04.0374633Z  selecting default max_connections ... 100
2025-12-11T00:30:04.0374898Z  selecting default shared_buffers ... 128MB
2025-12-11T00:30:04.0375150Z  selecting default time zone ... UTC
2025-12-11T00:30:04.0375383Z  creating configuration files ... ok
2025-12-11T00:30:04.0375742Z  running bootstrap script ... ok
2025-12-11T00:30:04.0376008Z  performing post-bootstrap initialization ... ok
2025-12-11T00:30:04.0376280Z  syncing data to disk ... ok
2025-12-11T00:30:04.0376473Z  
2025-12-11T00:30:04.0376617Z  
2025-12-11T00:30:04.0376817Z  Success. You can now start the database server using:
2025-12-11T00:30:04.0377071Z  
2025-12-11T00:30:04.0377271Z      pg_ctl -D /var/lib/postgresql/data -l logfile start
2025-12-11T00:30:04.0377528Z  
2025-12-11T00:30:04.0377979Z  waiting for server to start....2025-12-11 00:24:03.242 UTC [41] LOG:  starting PostgreSQL 15.15 on x86_64-pc-linux-musl, compiled by gcc (Alpine 15.2.0) 15.2.0, 64-bit
2025-12-11T00:30:04.0378643Z  2025-12-11 00:24:03.243 UTC [41] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2025-12-11T00:30:04.0379120Z  2025-12-11 00:24:03.246 UTC [44] LOG:  database system was shut down at 2025-12-11 00:24:03 UTC
2025-12-11T00:30:04.0379542Z  2025-12-11 00:24:03.251 UTC [41] LOG:  database system is ready to accept connections
2025-12-11T00:30:04.0379851Z   done
2025-12-11T00:30:04.0380003Z  server started
2025-12-11T00:30:04.0380166Z  CREATE DATABASE
2025-12-11T00:30:04.0380327Z  
2025-12-11T00:30:04.0380486Z  
2025-12-11T00:30:04.0380805Z  /usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*
2025-12-11T00:30:04.0381156Z  
2025-12-11T00:30:04.0381447Z  waiting for server to shut down....2025-12-11 00:24:03.403 UTC [41] LOG:  received fast shutdown request
2025-12-11T00:30:04.0382068Z  2025-12-11 00:24:03.404 UTC [41] LOG:  aborting any active transactions
2025-12-11T00:30:04.0382546Z  2025-12-11 00:24:03.406 UTC [41] LOG:  background worker "logical replication launcher" (PID 47) exited with exit code 1
2025-12-11T00:30:04.0383018Z  2025-12-11 00:24:03.409 UTC [42] LOG:  shutting down
2025-12-11T00:30:04.0383359Z  2025-12-11 00:24:03.409 UTC [42] LOG:  checkpoint starting: shutdown immediate
2025-12-11T00:30:04.0384157Z  2025-12-11 00:24:03.432 UTC [42] LOG:  checkpoint complete: wrote 921 buffers (5.6%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.019 s, sync=0.003 s, total=0.024 s; sync files=301, longest=0.001 s, average=0.001 s; distance=4239 kB, estimate=4239 kB
2025-12-11T00:30:04.0384929Z  2025-12-11 00:24:03.442 UTC [41] LOG:  database system is shut down
2025-12-11T00:30:04.0385198Z   done
2025-12-11T00:30:04.0385348Z  server stopped
2025-12-11T00:30:04.0385512Z  
2025-12-11T00:30:04.0385721Z  PostgreSQL init process complete; ready for start up.
2025-12-11T00:30:04.0385977Z  
2025-12-11T00:30:04.0391190Z Stop and remove container: 3db668d6fddb4083990b40c52f455afb_postgres15alpine_416f60
2025-12-11T00:30:04.0396425Z ##[command]/usr/bin/docker rm --force a87f04bed4e84dada81592fce9422a3f595b8e5afe252097845a6e5107b8b60a
2025-12-11T00:30:04.1683410Z a87f04bed4e84dada81592fce9422a3f595b8e5afe252097845a6e5107b8b60a
2025-12-11T00:30:04.1706681Z Print service container logs: c39ccf37465447f2b5c8f2c85b2282c5_redis7alpine_9dd597
2025-12-11T00:30:04.1707854Z ##[command]/usr/bin/docker logs --details f4736f59644cb2de32af052ccbd84873f818d2e3528dac764e73d3e41dc66e9a
2025-12-11T00:30:04.1834458Z  1:C 11 Dec 2025 00:24:03.739 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
2025-12-11T00:30:04.1837490Z  1:C 11 Dec 2025 00:24:03.739 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
2025-12-11T00:30:04.1838290Z  1:C 11 Dec 2025 00:24:03.739 * Redis version=7.4.7, bits=64, commit=00000000, modified=0, pid=1, just started
2025-12-11T00:30:04.1839515Z  1:C 11 Dec 2025 00:24:03.739 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
2025-12-11T00:30:04.1840777Z  1:M 11 Dec 2025 00:24:03.739 * monotonic clock: POSIX clock_gettime
2025-12-11T00:30:04.1841365Z  1:M 11 Dec 2025 00:24:03.740 * Running mode=standalone, port=6379.
2025-12-11T00:30:04.1842063Z  1:M 11 Dec 2025 00:24:03.740 * Server initialized
2025-12-11T00:30:04.1842565Z  1:M 11 Dec 2025 00:24:03.740 * Ready to accept connections tcp
2025-12-11T00:30:04.1843146Z  1:M 11 Dec 2025 00:29:04.032 * 100 changes in 300 seconds. Saving...
2025-12-11T00:30:04.1843725Z  1:M 11 Dec 2025 00:29:04.033 * Background saving started by pid 195
2025-12-11T00:30:04.1844241Z  195:C 11 Dec 2025 00:29:04.035 * DB saved on disk
2025-12-11T00:30:04.1844830Z  195:C 11 Dec 2025 00:29:04.035 * Fork CoW for RDB: current 0 MB, peak 0 MB, average 0 MB
2025-12-11T00:30:04.1845505Z  1:M 11 Dec 2025 00:29:04.133 * Background saving terminated with success
2025-12-11T00:30:04.1850314Z Stop and remove container: c39ccf37465447f2b5c8f2c85b2282c5_redis7alpine_9dd597
2025-12-11T00:30:04.1851035Z ##[command]/usr/bin/docker rm --force f4736f59644cb2de32af052ccbd84873f818d2e3528dac764e73d3e41dc66e9a
2025-12-11T00:30:04.3180857Z f4736f59644cb2de32af052ccbd84873f818d2e3528dac764e73d3e41dc66e9a
2025-12-11T00:30:04.3203044Z Remove container network: github_network_edefacc86d774098ab9de73f445284c8
2025-12-11T00:30:04.3207960Z ##[command]/usr/bin/docker network rm github_network_edefacc86d774098ab9de73f445284c8
2025-12-11T00:30:04.4205373Z github_network_edefacc86d774098ab9de73f445284c8
2025-12-11T00:30:04.4266759Z Cleaning up orphan processes
