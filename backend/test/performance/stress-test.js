const autocannon = require('autocannon');

// Configurações do teste de stress
const stressConfigs = [
  {
    name: 'Teste Leve',
    connections: 5,
    duration: 10,
    description: '5 conexões por 10s - Teste básico',
  },
  {
    name: 'Teste Médio',
    connections: 20,
    duration: 15,
    description: '20 conexões por 15s - Teste moderado',
  },
  {
    name: 'Teste Pesado',
    connections: 50,
    duration: 20,
    description: '50 conexões por 20s - Teste intenso',
  },
  {
    name: 'Teste Extremo',
    connections: 100,
    duration: 30,
    description: '100 conexões por 30s - Teste extremo',
  },
];

async function runStressTest(config) {
  console.log(`\n🔥 ${config.name}`);
  console.log(`📊 ${config.description}`);
  console.log('='.repeat(50));

  const autocannonConfig = {
    url: 'http://localhost:3101',
    connections: config.connections,
    duration: config.duration,
    requests: [
      {
        method: 'GET',
        path: '/v1/health',
      },
      {
        method: 'GET',
        path: '/v1/users?page=1&limit=5',
      },
      {
        method: 'GET',
        path: '/v1/users?page=1&limit=10&role=STUDENT',
      },
    ],
  };

  try {
    const result = await autocannon(autocannonConfig);
    
    console.log(`⏱️  Duração: ${result.duration}s`);
    console.log(`📊 Total de requisições: ${result.requests.total}`);
    console.log(`✅ RPS médio: ${Math.round(result.requests.average || 0)}`);
    console.log(`❌ Erros: ${result.non2xx || 0}`);
    console.log(`⚡ Latência média: ${Math.round(result.latency.average || 0)}ms`);
    console.log(`🔥 Latência p95: ${Math.round(result.latency.p95 || 0)}ms`);
    console.log(`🚀 Throughput: ${Math.round(result.throughput.average || 0)} bytes/s`);

    // Análise de stress
    const errorRate = result.non2xx > 0 ? (result.non2xx / result.requests.total) * 100 : 0;
    
    if (errorRate === 0 && result.latency.average < 200) {
      console.log('✅ Status: APROVADO - Sem erros e latência baixa');
    } else if (errorRate < 1 && result.latency.average < 500) {
      console.log('⚠️  Status: ATENÇÃO - Poucos erros ou latência moderada');
    } else {
      console.log('❌ Status: FALHOU - Muitos erros ou latência alta');
    }

    return {
      name: config.name,
      success: errorRate < 1 && result.latency.average < 500,
      errorRate,
      avgLatency: result.latency.average,
      rps: result.requests.average,
    };

  } catch (error) {
    console.log(`❌ Erro no teste: ${error.message}`);
    return {
      name: config.name,
      success: false,
      error: error.message,
    };
  }
}

async function runAllStressTests() {
  console.log('🚀 Iniciando Testes de Stress');
  console.log('🎯 URL: http://localhost:3101');
  console.log('');

  const results = [];

  for (const config of stressConfigs) {
    const result = await runStressTest(config);
    results.push(result);
    
    // Pausa entre testes para não sobrecarregar
    if (config !== stressConfigs[stressConfigs.length - 1]) {
      console.log('\n⏳ Aguardando 5s antes do próximo teste...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Relatório final
  console.log('\n📋 RELATÓRIO FINAL DOS TESTES DE STRESS');
  console.log('='.repeat(50));
  
  const passedTests = results.filter(r => r.success).length;
  const totalTests = results.length;
  
  console.log(`✅ Testes aprovados: ${passedTests}/${totalTests}`);
  console.log(`❌ Testes falharam: ${totalTests - passedTests}/${totalTests}`);
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}: ${result.success ? 'APROVADO' : 'FALHOU'}`);
    if (result.errorRate !== undefined) {
      console.log(`   - Taxa de erro: ${result.errorRate.toFixed(2)}%`);
      console.log(`   - Latência média: ${Math.round(result.avgLatency || 0)}ms`);
      console.log(`   - RPS: ${Math.round(result.rps || 0)}`);
    }
  });

  if (passedTests === totalTests) {
    console.log('\n🎉 TODOS OS TESTES FORAM APROVADOS!');
    console.log('🚀 A aplicação está pronta para produção!');
  } else {
    console.log('\n⚠️  ALGUNS TESTES FALHARAM!');
    console.log('🔧 Considere otimizar a aplicação antes de ir para produção.');
  }
}

// Verificar se a aplicação está rodando
async function checkAppHealth() {
  try {
    const response = await fetch('http://localhost:3101/v1/health');
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function main() {
  console.log('🔍 Verificando se a aplicação está rodando...');
  
  const isAppRunning = await checkAppHealth();
  if (!isAppRunning) {
    console.log('❌ Aplicação não está respondendo');
    console.log('💡 Dica: Execute "npm run start:dev" em outro terminal antes de rodar este teste');
    process.exit(1);
  }

  console.log('✅ Aplicação está rodando e respondendo');
  await runAllStressTests();
}

main().catch(console.error);

