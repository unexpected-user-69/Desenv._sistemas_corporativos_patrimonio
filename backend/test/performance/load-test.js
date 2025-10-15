const autocannon = require('autocannon');
const { spawn } = require('child_process');

// Configurações do teste de carga
const config = {
  url: 'http://localhost:3101',
  connections: 10, // Número de conexões simultâneas
  duration: 30, // Duração do teste em segundos
  requests: [
    {
      method: 'GET',
      path: '/v1/health',
    },
    {
      method: 'GET',
      path: '/v1/users?page=1&limit=10',
    },
  ],
};

async function runLoadTest() {
  console.log('🚀 Iniciando teste de carga...');
  console.log(`📊 Configuração: ${config.connections} conexões por ${config.duration}s`);
  console.log(`🎯 URL: ${config.url}`);
  console.log('');

  try {
    const result = await autocannon(config);
    
    console.log('📈 Resultados do Teste de Carga:');
    console.log('================================');
    console.log(`⏱️  Duração: ${result.duration}s`);
    console.log(`📊 Total de requisições: ${result.requests.total}`);
    console.log(`✅ Requisições bem-sucedidas: ${result.requests.average || 0}/s`);
    console.log(`❌ Requisições com erro: ${result.non2xx || 0}`);
    console.log(`⚡ Latência média: ${result.latency.average || 0}ms`);
    console.log(`🔥 Latência p95: ${result.latency.p95 || 0}ms`);
    console.log(`🚀 Throughput: ${result.throughput.average || 0} bytes/s`);
    console.log('');

    // Análise de performance
    if (result.latency.average < 100) {
      console.log('✅ Performance EXCELENTE - Latência < 100ms');
    } else if (result.latency.average < 500) {
      console.log('✅ Performance BOA - Latência < 500ms');
    } else if (result.latency.average < 1000) {
      console.log('⚠️  Performance ACEITÁVEL - Latência < 1s');
    } else {
      console.log('❌ Performance RUIM - Latência > 1s');
    }

    if (result.non2xx === 0) {
      console.log('✅ Taxa de erro: 0% - PERFEITO');
    } else {
      const errorRate = (result.non2xx / result.requests.total) * 100;
      console.log(`⚠️  Taxa de erro: ${errorRate.toFixed(2)}%`);
    }

  } catch (error) {
    console.error('❌ Erro durante o teste de carga:', error.message);
    process.exit(1);
  }
}

// Verificar se a aplicação está rodando
async function checkAppHealth() {
  try {
    const response = await fetch(`${config.url}/v1/health`);
    if (response.ok) {
      console.log('✅ Aplicação está rodando e respondendo');
      return true;
    }
  } catch (error) {
    console.log('❌ Aplicação não está respondendo');
    return false;
  }
  return false;
}

// Função principal
async function main() {
  console.log('🔍 Verificando se a aplicação está rodando...');
  
  const isAppRunning = await checkAppHealth();
  if (!isAppRunning) {
    console.log('💡 Dica: Execute "npm run start:dev" em outro terminal antes de rodar este teste');
    process.exit(1);
  }

  await runLoadTest();
}

main().catch(console.error);

