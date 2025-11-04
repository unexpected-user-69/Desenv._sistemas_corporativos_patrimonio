const axios = require('axios');

const BASE_URL = 'http://localhost:3101/v1';

// Função para gerar UUID válido para testes
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Função para testar endpoints
async function testAuditEndpoints() {
  console.log('🧪 Testando endpoints de auditoria...\n');

  try {
    // 1. Testar POST /audit/logs - Criar log de auditoria
    console.log('1️⃣ Testando POST /audit/logs');
    const testAuditLog = {
      userId: generateUUID(),
      action: 'CREATE',
      entityType: 'Patrimonio',
      entityId: generateUUID(),
      oldValues: { name: 'Item Antigo' },
      newValues: { name: 'Item Novo' },
      ipAddress: '192.168.1.1',
      userAgent: 'Test Agent',
      service: 'patrimonio-backend',
      endpoint: '/test',
      description: 'Teste de criação de log de auditoria'
    };

    const createResponse = await axios.post(`${BASE_URL}/audit/logs`, testAuditLog);
    console.log('✅ POST /audit/logs - Sucesso:', createResponse.status);
    console.log('📄 Resposta:', JSON.stringify(createResponse.data, null, 2));
    
    const createdLogId = createResponse.data.id;
    console.log('');

    // 2. Testar GET /audit/logs - Buscar logs
    console.log('2️⃣ Testando GET /audit/logs');
    const searchResponse = await axios.get(`${BASE_URL}/audit/logs`);
    console.log('✅ GET /audit/logs - Sucesso:', searchResponse.status);
    console.log('📄 Total de logs:', searchResponse.data.total);
    console.log('');

    // 3. Testar GET /audit/logs/:id - Buscar log por ID
    console.log('3️⃣ Testando GET /audit/logs/:id');
    const getByIdResponse = await axios.get(`${BASE_URL}/audit/logs/${createdLogId}`);
    console.log('✅ GET /audit/logs/:id - Sucesso:', getByIdResponse.status);
    console.log('📄 Log encontrado:', getByIdResponse.data.action);
    console.log('');

    // 4. Testar GET /audit/logs/entity/:entityType/:entityId
    console.log('4️⃣ Testando GET /audit/logs/entity/:entityType/:entityId');
    const entityResponse = await axios.get(`${BASE_URL}/audit/logs/entity/Patrimonio/${testAuditLog.entityId}`);
    console.log('✅ GET /audit/logs/entity - Sucesso:', entityResponse.status);
    console.log('📄 Logs da entidade:', entityResponse.data.length);
    console.log('');

    // 5. Testar GET /audit/logs/user/:userId
    console.log('5️⃣ Testando GET /audit/logs/user/:userId');
    const userResponse = await axios.get(`${BASE_URL}/audit/logs/user/${testAuditLog.userId}`);
    console.log('✅ GET /audit/logs/user - Sucesso:', userResponse.status);
    console.log('📄 Logs do usuário:', userResponse.data.length);
    console.log('');

    // 6. Testar GET /audit/stats
    console.log('6️⃣ Testando GET /audit/stats');
    const statsResponse = await axios.get(`${BASE_URL}/audit/stats`);
    console.log('✅ GET /audit/stats - Sucesso:', statsResponse.status);
    console.log('📄 Estatísticas:', JSON.stringify(statsResponse.data, null, 2));
    console.log('');

    // 7. Testar validação de UUID inválido
    console.log('7️⃣ Testando validação de UUID inválido');
    try {
      await axios.get(`${BASE_URL}/audit/logs/invalid-uuid`);
      console.log('❌ Deveria ter falhado com UUID inválido');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Validação de UUID funcionando - Bad Request:', error.response.status);
        console.log('📄 Mensagem:', error.response.data.message);
      } else {
        console.log('❌ Erro inesperado:', error.message);
      }
    }
    console.log('');

    // 8. Testar busca por log inexistente
    console.log('8️⃣ Testando busca por log inexistente');
    try {
      await axios.get(`${BASE_URL}/audit/logs/${generateUUID()}`);
      console.log('❌ Deveria ter falhado com log inexistente');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('✅ Not Found funcionando:', error.response.status);
        console.log('📄 Mensagem:', error.response.data.message);
      } else {
        console.log('❌ Erro inesperado:', error.message);
      }
    }

    console.log('\n🎉 Todos os testes de auditoria concluídos!');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
    if (error.response) {
      console.error('📄 Status:', error.response.status);
      console.error('📄 Dados:', error.response.data);
    }
  }
}

// Executar testes
testAuditEndpoints();



