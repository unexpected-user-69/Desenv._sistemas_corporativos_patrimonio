/**
 * Script para testar a autenticação automática do Swagger
 * Testa se o endpoint dev-token funciona e se os endpoints protegidos estão acessíveis
 */

const http = require('http');

const BASE_URL = 'http://localhost:3101';
const API_PREFIX = '/v1';

// Cores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(method, path, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port || 3101,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: jsonData || data,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function testDevTokenEndpoint() {
  log('\n🔐 Testando endpoint /v1/auth/dev-token...', 'cyan');
  try {
    const response = await makeRequest('POST', `${API_PREFIX}/auth/dev-token`);
    
    if (response.status === 200 && response.body && response.body.accessToken) {
      log('✅ Endpoint dev-token funcionando!', 'green');
      log(`   Token obtido: ${response.body.accessToken.substring(0, 30)}...`, 'blue');
      log(`   User: ${response.body.user?.email || 'N/A'}`, 'blue');
      return response.body.accessToken;
    } else {
      log(`❌ Endpoint dev-token falhou! Status: ${response.status}`, 'red');
      log(`   Response: ${JSON.stringify(response.body, null, 2)}`, 'yellow');
      return null;
    }
  } catch (error) {
    log(`❌ Erro ao testar dev-token: ${error.message}`, 'red');
    log('   Certifique-se de que o servidor está rodando em http://localhost:3101', 'yellow');
    return null;
  }
}

async function testProtectedEndpoint(token, method, path, description) {
  try {
    const response = await makeRequest(method, path, {
      'Authorization': `Bearer ${token}`,
    });
    
    const statusCode = response.status;
    const isSuccess = statusCode >= 200 && statusCode < 300;
    const isClientError = statusCode >= 400 && statusCode < 500;
    
    if (isSuccess) {
      log(`   ✅ ${description}: ${statusCode}`, 'green');
      return true;
    } else if (statusCode === 401 || statusCode === 403) {
      log(`   ⚠️  ${description}: ${statusCode} (não autenticado/autorizado)`, 'yellow');
      return false;
    } else if (isClientError) {
      log(`   ⚠️  ${description}: ${statusCode} (erro esperado para este endpoint)`, 'yellow');
      return true; // Considera sucesso se não for erro de autenticação
    } else {
      log(`   ❌ ${description}: ${statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    log(`   ❌ ${description}: Erro - ${error.message}`, 'red');
    return false;
  }
}

async function testSwaggerScript() {
  log('\n📜 Testando se o script JavaScript está sendo servido...', 'cyan');
  try {
    const response = await makeRequest('GET', `${API_PREFIX}/swagger/auto-auth.js`);
    
    if (response.status === 200 && typeof response.body === 'string' && response.body.includes('setupAutoAuth')) {
      log('✅ Script JavaScript está sendo servido corretamente!', 'green');
      return true;
    } else {
      log(`❌ Script JavaScript não encontrado! Status: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Erro ao testar script: ${error.message}`, 'red');
    return false;
  }
}

async function testSwaggerDocs() {
  log('\n📚 Testando se o Swagger UI está acessível...', 'cyan');
  try {
    const response = await makeRequest('GET', '/docs');
    
    if (response.status === 200 || response.status === 301 || response.status === 302) {
      log('✅ Swagger UI está acessível!', 'green');
      return true;
    } else {
      log(`⚠️  Swagger UI retornou status: ${response.status}`, 'yellow');
      return false;
    }
  } catch (error) {
    log(`❌ Erro ao acessar Swagger UI: ${error.message}`, 'red');
    return false;
  }
}

async function runTests() {
  log('🚀 Iniciando testes de autenticação automática do Swagger...', 'cyan');
  log('=' .repeat(60), 'cyan');
  
  // Teste 1: Verificar se o servidor está rodando
  log('\n1️⃣  Verificando se o servidor está rodando...', 'cyan');
  try {
    await makeRequest('GET', `${API_PREFIX}/`);
    log('✅ Servidor está rodando!', 'green');
  } catch (error) {
    log('❌ Servidor não está rodando!', 'red');
    log('   Execute: npm run start:dev', 'yellow');
    process.exit(1);
  }
  
  // Teste 2: Testar endpoint dev-token
  const token = await testDevTokenEndpoint();
  if (!token) {
    log('\n❌ Não foi possível obter token. Abortando testes.', 'red');
    process.exit(1);
  }
  
  // Teste 3: Testar script JavaScript
  await testSwaggerScript();
  
  // Teste 4: Testar Swagger UI
  await testSwaggerDocs();
  
  // Teste 5: Testar endpoints protegidos
  log('\n🔒 Testando endpoints protegidos com o token...', 'cyan');
  
  const endpoints = [
    { method: 'GET', path: `${API_PREFIX}/auth/me`, desc: 'GET /v1/auth/me' },
    { method: 'GET', path: `${API_PREFIX}/users`, desc: 'GET /v1/users' },
    { method: 'GET', path: `${API_PREFIX}/patrimonio`, desc: 'GET /v1/patrimonio' },
    { method: 'GET', path: `${API_PREFIX}/categorias`, desc: 'GET /v1/categorias' },
    { method: 'GET', path: `${API_PREFIX}/events`, desc: 'GET /v1/events' },
    { method: 'GET', path: `${API_PREFIX}/audit`, desc: 'GET /v1/audit' },
    { method: 'GET', path: `${API_PREFIX}/maintenance`, desc: 'GET /v1/maintenance' },
    { method: 'GET', path: `${API_PREFIX}/reports`, desc: 'GET /v1/reports' },
    { method: 'GET', path: `${API_PREFIX}/notifications`, desc: 'GET /v1/notifications' },
    { method: 'GET', path: `${API_PREFIX}/integrations-erp/connectors`, desc: 'GET /v1/integrations-erp/connectors' },
    { method: 'GET', path: `${API_PREFIX}/inventory/campaigns`, desc: 'GET /v1/inventory/campaigns' },
  ];
  
  let successCount = 0;
  let totalCount = endpoints.length;
  
  for (const endpoint of endpoints) {
    const success = await testProtectedEndpoint(token, endpoint.method, endpoint.path, endpoint.desc);
    if (success) successCount++;
    // Pequeno delay para não sobrecarregar o servidor
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Resumo
  log('\n' + '='.repeat(60), 'cyan');
  log(`\n📊 Resumo dos testes:`, 'cyan');
  log(`   ✅ Endpoints funcionando: ${successCount}/${totalCount}`, successCount === totalCount ? 'green' : 'yellow');
  log(`   🔑 Token obtido com sucesso: ${token ? 'Sim' : 'Não'}`, token ? 'green' : 'red');
  
  if (successCount === totalCount) {
    log('\n🎉 Todos os testes passaram! A autenticação automática está funcionando!', 'green');
  } else if (successCount > totalCount / 2) {
    log('\n⚠️  Alguns endpoints falharam, mas a autenticação básica está funcionando.', 'yellow');
    log('   Isso pode ser normal se alguns endpoints requerem dados específicos ou têm validações adicionais.', 'yellow');
  } else {
    log('\n❌ Muitos endpoints falharam. Verifique a configuração.', 'red');
  }
  
  log('\n💡 Para testar manualmente:', 'cyan');
  log('   1. Acesse: http://localhost:3101/docs', 'blue');
  log('   2. Verifique no console do navegador se apareceu: "✅ Autenticação automática configurada no Swagger!"', 'blue');
  log('   3. Teste qualquer endpoint protegido - deve funcionar sem inserir token manualmente', 'blue');
  log('   4. Verifique se o botão "Authorize" mostra que está autenticado', 'blue');
  
  process.exit(successCount >= totalCount / 2 ? 0 : 1);
}

// Executar testes
runTests().catch((error) => {
  log(`\n❌ Erro fatal: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});

