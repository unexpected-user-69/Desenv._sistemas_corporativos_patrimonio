import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

interface SwaggerEndpoint {
  path: string;
  methods: string[];
}

interface TestEndpoint {
  path: string;
  method: string;
  file: string;
}

async function getSwaggerEndpoints(): Promise<SwaggerEndpoint[]> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3101,
      path: '/docs-json',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const swagger = JSON.parse(data);
          const endpoints: SwaggerEndpoint[] = [];

          if (swagger.paths) {
            for (const [path, methods] of Object.entries(swagger.paths)) {
              const endpoint: SwaggerEndpoint = {
                path,
                methods: Object.keys(methods as object),
              };
              endpoints.push(endpoint);
            }
          }

          resolve(endpoints);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

function findTestFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findTestFiles(filePath, fileList);
    } else if (file.endsWith('.e2e-spec.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

async function getTestEndpoints(): Promise<TestEndpoint[]> {
  const testDir = path.join(__dirname, '..', 'test');
  const testFiles = findTestFiles(testDir);

  const endpoints: TestEndpoint[] = [];

  for (const file of testFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const fileRelative = path.relative(path.join(__dirname, '..'), file);

    // Procurar por padrões de request (supertest)
    // Exemplos:
    // .get('/v1/users')
    // .post('/v1/users')
    // .put('/v1/users/:id')
    // .patch('/v1/events/:id')
    // .delete('/v1/users/:id')

    const patterns = [
      /\.(get|post|put|patch|delete)\(['"`]([^'"`]+)['"`]\)/gi,
      /request\([^)]+\)\.(get|post|put|patch|delete)\(['"`]([^'"`]+)['"`]\)/gi,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const method = match[1].toUpperCase();
        const endpointPath = match[2];

        // Normalizar path: remover query strings e variáveis
        const normalizedPath = endpointPath
          .replace(/\?.*$/, '') // Remove query string
          .replace(/:[^/]+/g, '{id}') // Substitui :id por {id}
          .replace(/\{id\}/g, '{id}'); // Padroniza {id}

        endpoints.push({
          path: normalizedPath,
          method,
          file: fileRelative,
        });
      }
    }

    // Também procurar por describe blocks que mencionam endpoints
    const describePattern = /describe\(['"`](GET|POST|PUT|PATCH|DELETE)\s+([^'"`]+)['"`]/gi;
    let describeMatch;
    while ((describeMatch = describePattern.exec(content)) !== null) {
      const method = describeMatch[1].toUpperCase();
      const endpointPath = describeMatch[2];

      const normalizedPath = endpointPath
        .replace(/\?.*$/, '')
        .replace(/:[^/]+/g, '{id}')
        .replace(/\{id\}/g, '{id}');

      endpoints.push({
        path: normalizedPath,
        method,
        file: fileRelative,
      });
    }
  }

  return endpoints;
}

function normalizeSwaggerPath(path: string): string {
  // Normalizar paths do Swagger: /v1/users/{id} -> /v1/users/{id}
  return path.replace(/:([^/]+)/g, '{id}');
}

function normalizeTestPath(path: string): string {
  // Normalizar paths dos testes
  return path.replace(/:([^/]+)/g, '{id}');
}

function compareEndpoints(
  swaggerEndpoints: SwaggerEndpoint[],
  testEndpoints: TestEndpoint[],
): {
  covered: Array<{ path: string; methods: string[]; testFiles: string[] }>;
  missing: Array<{ path: string; methods: string[] }>;
} {
  const covered: Array<{
    path: string;
    methods: string[];
    testFiles: string[];
  }> = [];
  const missing: Array<{ path: string; methods: string[] }> = [];

  for (const swaggerEndpoint of swaggerEndpoints) {
    const normalizedSwaggerPath = normalizeSwaggerPath(swaggerEndpoint.path);
    const testedMethods: Set<string> = new Set();
    const testFiles: Set<string> = new Set();

    for (const testEndpoint of testEndpoints) {
      const normalizedTestPath = normalizeTestPath(testEndpoint.path);

      if (normalizedSwaggerPath === normalizedTestPath) {
        if (swaggerEndpoint.methods.includes(testEndpoint.method.toLowerCase())) {
          testedMethods.add(testEndpoint.method);
          testFiles.add(testEndpoint.file);
        }
      }
    }

    const missingMethods = swaggerEndpoint.methods.filter(
      (method) => !testedMethods.has(method.toUpperCase()),
    );

    if (missingMethods.length === 0) {
      covered.push({
        path: swaggerEndpoint.path,
        methods: swaggerEndpoint.methods,
        testFiles: Array.from(testFiles),
      });
    } else {
      missing.push({
        path: swaggerEndpoint.path,
        methods: missingMethods,
      });
    }
  }

  return { covered, missing };
}

async function main() {
  console.log('🔍 Analisando cobertura de testes E2E...\n');

  try {
    console.log('📡 Obtendo endpoints do Swagger...');
    const swaggerEndpoints = await getSwaggerEndpoints();
    console.log(`✅ ${swaggerEndpoints.length} endpoints encontrados no Swagger\n`);

    console.log('🧪 Analisando testes E2E...');
    const testEndpoints = await getTestEndpoints();
    console.log(`✅ ${testEndpoints.length} endpoints testados encontrados\n`);

    console.log('📊 Comparando endpoints...');
    const { covered, missing } = compareEndpoints(swaggerEndpoints, testEndpoints);

    console.log('\n' + '='.repeat(80));
    console.log('📈 RELATÓRIO DE COBERTURA DE TESTES E2E');
    console.log('='.repeat(80) + '\n');

    const totalEndpoints = swaggerEndpoints.length;
    const totalMethods = swaggerEndpoints.reduce(
      (sum, ep) => sum + ep.methods.length,
      0,
    );
    const coveredMethods = covered.reduce((sum, ep) => sum + ep.methods.length, 0);
    const missingMethods = missing.reduce((sum, ep) => sum + ep.methods.length, 0);

    console.log(`Total de endpoints no Swagger: ${totalEndpoints}`);
    console.log(`Total de métodos HTTP: ${totalMethods}`);
    console.log(`Métodos cobertos por testes: ${coveredMethods}`);
    console.log(`Métodos sem testes: ${missingMethods}`);
    console.log(
      `Cobertura: ${((coveredMethods / totalMethods) * 100).toFixed(2)}%\n`,
    );

    if (missing.length > 0) {
      console.log('❌ ENDPOINTS SEM TESTES E2E:\n');
      for (const endpoint of missing) {
        console.log(`  ${endpoint.path}`);
        console.log(`    Métodos: ${endpoint.methods.join(', ')}\n`);
      }
    } else {
      console.log('✅ Todos os endpoints possuem testes E2E!\n');
    }

    // Salvar relatório em arquivo
    const report = {
      summary: {
        totalEndpoints,
        totalMethods,
        coveredMethods,
        missingMethods,
        coverage: ((coveredMethods / totalMethods) * 100).toFixed(2) + '%',
      },
      covered: covered.map((ep) => ({
        path: ep.path,
        methods: ep.methods,
        testFiles: ep.testFiles,
      })),
      missing: missing.map((ep) => ({
        path: ep.path,
        methods: ep.methods,
      })),
    };

    const reportPath = path.join(
      __dirname,
      '..',
      'test',
      'e2e-coverage-report.json',
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`💾 Relatório salvo em: ${reportPath}\n`);

    process.exit(missing.length > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Erro ao analisar cobertura:', error);
    process.exit(1);
  }
}

main();

