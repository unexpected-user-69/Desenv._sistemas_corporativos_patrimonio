import * as fs from 'fs';
import * as path from 'path';

interface ControllerEndpoint {
  path: string;
  methods: string[];
  controller: string;
}

interface TestEndpoint {
  path: string;
  method: string;
  file: string;
}

function findFiles(dir: string, extension: string, fileList: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          findFiles(filePath, extension, fileList);
        } else if (file.endsWith(extension)) {
          fileList.push(filePath);
        }
      } catch (e) {
        // Ignorar erros de acesso
      }
    });
  } catch (e) {
    // Ignorar erros de acesso
  }

  return fileList;
}

function extractEndpointsFromController(filePath: string): ControllerEndpoint[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const endpoints: ControllerEndpoint[] = [];
  const controllerName = path.basename(filePath, '.controller.ts');

  // Extrair prefixo do controller (ex: @Controller('v1/patrimonio'))
  const controllerMatch = content.match(/@Controller\(['"`]([^'"`]+)['"`]\)/);
  const basePath = controllerMatch ? controllerMatch[1] : '';

  // Padrões para métodos HTTP com decoradores
  const methodPatterns = [
    { decorator: '@Get', method: 'GET' },
    { decorator: '@Post', method: 'POST' },
    { decorator: '@Put', method: 'PUT' },
    { decorator: '@Patch', method: 'PATCH' },
    { decorator: '@Delete', method: 'DELETE' },
  ];

  for (const { decorator, method } of methodPatterns) {
    // Buscar por @Get(), @Get('path'), @Get(':id'), etc.
    const regex = new RegExp(
      `${decorator.replace('@', '\\@')}\\(['"\`]?([^'"\`\\)]*)?['"\`]?\\)`,
      'g',
    );
    let match;

    while ((match = regex.exec(content)) !== null) {
      const routePath = match[1] || '';
      const fullPath = basePath
        ? `/${basePath}${routePath ? '/' + routePath : ''}`
        : routePath
          ? `/${routePath}`
          : '';

      // Normalizar path
      const normalizedPath = fullPath
        .replace(/\/+/g, '/') // Remover barras duplicadas
        .replace(/\/$/, '') // Remover barra final
        .replace(/:([^/]+)/g, '{id}') // Substituir :id por {id}
        || '/';

      endpoints.push({
        path: normalizedPath,
        methods: [method],
        controller: controllerName,
      });
    }
  }

  return endpoints;
}

function getControllerEndpoints(): ControllerEndpoint[] {
  const srcDir = path.join(__dirname, '..', 'src');
  const controllerFiles = findFiles(srcDir, '.controller.ts');
  const endpoints: ControllerEndpoint[] = [];

  for (const file of controllerFiles) {
    try {
      const controllerEndpoints = extractEndpointsFromController(file);
      endpoints.push(...controllerEndpoints);
    } catch (error) {
      console.warn(`⚠️  Erro ao processar ${file}:`, error);
    }
  }

  // Agrupar endpoints por path
  const groupedEndpoints = new Map<string, ControllerEndpoint>();

  for (const endpoint of endpoints) {
    const key = endpoint.path;
    if (groupedEndpoints.has(key)) {
      const existing = groupedEndpoints.get(key)!;
      existing.methods.push(...endpoint.methods);
      existing.methods = Array.from(new Set(existing.methods)); // Remover duplicados
    } else {
      groupedEndpoints.set(key, { ...endpoint });
    }
  }

  return Array.from(groupedEndpoints.values());
}

function getTestEndpoints(): TestEndpoint[] {
  const testDir = path.join(__dirname, '..', 'test');
  const testFiles = findFiles(testDir, '.e2e-spec.ts');
  const endpoints: TestEndpoint[] = [];

  for (const file of testFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const fileRelative = path.relative(path.join(__dirname, '..'), file);

      // Procurar por padrões de request (supertest)
      const patterns = [
        /\.(get|post|put|patch|delete)\(['"`]([^'"`]+)['"`]\)/gi,
        /request\([^)]+\)\.(get|post|put|patch|delete)\(['"`]([^'"`]+)['"`]\)/gi,
      ];

      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const method = match[1].toUpperCase();
          let endpointPath = match[2];

          // Remover query strings
          endpointPath = endpointPath.split('?')[0];

          // Normalizar path
          const normalizedPath = endpointPath
            .replace(/\/+/g, '/')
            .replace(/\/$/, '')
            .replace(/:([^/]+)/g, '{id}')
            .replace(/\$\{[^}]+\}/g, '{id}') // Substituir ${id} por {id}
            || '/';

          endpoints.push({
            path: normalizedPath,
            method,
            file: fileRelative,
          });
        }
      }

      // Procurar por describe blocks que mencionam endpoints
      const describePattern =
        /describe\(['"`](GET|POST|PUT|PATCH|DELETE)\s+([^'"`]+)['"`]/gi;
      let describeMatch;
      while ((describeMatch = describePattern.exec(content)) !== null) {
        const method = describeMatch[1].toUpperCase();
        let endpointPath = describeMatch[2];

        endpointPath = endpointPath.split('?')[0];

        const normalizedPath = endpointPath
          .replace(/\/+/g, '/')
          .replace(/\/$/, '')
          .replace(/:([^/]+)/g, '{id}')
          .replace(/\$\{[^}]+\}/g, '{id}')
          || '/';

        endpoints.push({
          path: normalizedPath,
          method,
          file: fileRelative,
        });
      }
    } catch (error) {
      console.warn(`⚠️  Erro ao processar teste ${file}:`, error);
    }
  }

  return endpoints;
}

function compareEndpoints(
  controllerEndpoints: ControllerEndpoint[],
  testEndpoints: TestEndpoint[],
): {
  covered: Array<{
    path: string;
    methods: string[];
    controller: string;
    testFiles: string[];
  }>;
  missing: Array<{ path: string; methods: string[]; controller: string }>;
} {
  const covered: Array<{
    path: string;
    methods: string[];
    controller: string;
    testFiles: string[];
  }> = [];
  const missing: Array<{ path: string; methods: string[]; controller: string }> = [];

  for (const controllerEndpoint of controllerEndpoints) {
    const testedMethods: Set<string> = new Set();
    const testFiles: Set<string> = new Set();

    for (const testEndpoint of testEndpoints) {
      if (controllerEndpoint.path === testEndpoint.path) {
        if (controllerEndpoint.methods.includes(testEndpoint.method)) {
          testedMethods.add(testEndpoint.method);
          testFiles.add(testEndpoint.file);
        }
      }
    }

    const missingMethods = controllerEndpoint.methods.filter(
      (method) => !testedMethods.has(method),
    );

    if (missingMethods.length === 0) {
      covered.push({
        path: controllerEndpoint.path,
        methods: controllerEndpoint.methods,
        controller: controllerEndpoint.controller,
        testFiles: Array.from(testFiles),
      });
    } else {
      missing.push({
        path: controllerEndpoint.path,
        methods: missingMethods,
        controller: controllerEndpoint.controller,
      });
    }
  }

  return { covered, missing };
}

async function main() {
  console.log('🔍 Analisando cobertura de testes E2E a partir dos controllers...\n');

  try {
    console.log('📁 Analisando controllers...');
    const controllerEndpoints = getControllerEndpoints();
    console.log(
      `✅ ${controllerEndpoints.length} endpoints encontrados nos controllers\n`,
    );

    console.log('🧪 Analisando testes E2E...');
    const testEndpoints = getTestEndpoints();
    console.log(`✅ ${testEndpoints.length} endpoints testados encontrados\n`);

    console.log('📊 Comparando endpoints...');
    const { covered, missing } = compareEndpoints(controllerEndpoints, testEndpoints);

    console.log('\n' + '='.repeat(80));
    console.log('📈 RELATÓRIO DE COBERTURA DE TESTES E2E');
    console.log('='.repeat(80) + '\n');

    const totalEndpoints = controllerEndpoints.length;
    const totalMethods = controllerEndpoints.reduce(
      (sum, ep) => sum + ep.methods.length,
      0,
    );
    const coveredMethods = covered.reduce((sum, ep) => sum + ep.methods.length, 0);
    const missingMethods = missing.reduce((sum, ep) => sum + ep.methods.length, 0);

    console.log(`Total de endpoints nos controllers: ${totalEndpoints}`);
    console.log(`Total de métodos HTTP: ${totalMethods}`);
    console.log(`Métodos cobertos por testes: ${coveredMethods}`);
    console.log(`Métodos sem testes: ${missingMethods}`);
    console.log(
      `Cobertura: ${((coveredMethods / totalMethods) * 100).toFixed(2)}%\n`,
    );

    if (missing.length > 0) {
      console.log('❌ ENDPOINTS SEM TESTES E2E:\n');
      const groupedByController = new Map<string, typeof missing>();

      for (const endpoint of missing) {
        if (!groupedByController.has(endpoint.controller)) {
          groupedByController.set(endpoint.controller, []);
        }
        groupedByController.get(endpoint.controller)!.push(endpoint);
      }

      for (const [controller, endpoints] of groupedByController.entries()) {
        console.log(`\n📦 Controller: ${controller}`);
        for (const endpoint of endpoints) {
          console.log(`  ${endpoint.path}`);
          console.log(`    Métodos sem teste: ${endpoint.methods.join(', ')}`);
        }
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
        controller: ep.controller,
        testFiles: ep.testFiles,
      })),
      missing: missing.map((ep) => ({
        path: ep.path,
        methods: ep.methods,
        controller: ep.controller,
      })),
    };

    const reportPath = path.join(
      __dirname,
      '..',
      'test',
      'e2e-coverage-report.json',
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Relatório salvo em: ${reportPath}\n`);

    process.exit(missing.length > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Erro ao analisar cobertura:', error);
    process.exit(1);
  }
}

main();

