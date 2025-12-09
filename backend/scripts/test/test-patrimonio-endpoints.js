#!/usr/bin/env node

const axios = require('axios');

const BASE_URL = 'http://localhost:3101/v1';

async function testPatrimonioEndpoints() {
  console.log('🧪 Testando endpoints de patrimônio...\n');

  try {
    // 1. Testar GET /v1/patrimonio (lista com filtros)
    console.log('1. Testando GET /v1/patrimonio');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio`);
      console.log('✅ GET /v1/patrimonio - Status:', response.status);
      console.log('   Total de patrimônios:', response.data.total || 0);
    } catch (error) {
      console.log('❌ GET /v1/patrimonio - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 2. Testar POST /v1/patrimonio (criar patrimônio)
    console.log('\n2. Testando POST /v1/patrimonio');
    const patrimonioData = {
      codigo: 'PAT-TEST-001',
      nome: 'Notebook Teste',
      descricao: 'Notebook para testes',
      categoria: 'EQUIPAMENTO',
      status: 'ATIVO',
      marca: 'Dell',
      modelo: 'Test Model',
      valorAquisicao: 2000.00,
      dataAquisicao: '2024-01-01',
      localizacao: 'Sala Teste'
    };

    try {
      const response = await axios.post(`${BASE_URL}/patrimonio`, patrimonioData);
      console.log('✅ POST /v1/patrimonio - Status:', response.status);
      console.log('   Patrimônio criado com ID:', response.data.id);
      
      const patrimonioId = response.data.id;

      // 3. Testar GET /v1/patrimonio/{id}
      console.log('\n3. Testando GET /v1/patrimonio/{id}');
      try {
        const getResponse = await axios.get(`${BASE_URL}/patrimonio/${patrimonioId}`);
        console.log('✅ GET /v1/patrimonio/{id} - Status:', getResponse.status);
        console.log('   Nome do patrimônio:', getResponse.data.nome);
      } catch (error) {
        console.log('❌ GET /v1/patrimonio/{id} - Erro:', error.response?.status, error.response?.data?.message || error.message);
      }

      // 4. Testar PATCH /v1/patrimonio/{id}
      console.log('\n4. Testando PATCH /v1/patrimonio/{id}');
      try {
        const updateData = { nome: 'Notebook Teste Atualizado' };
        const patchResponse = await axios.patch(`${BASE_URL}/patrimonio/${patrimonioId}`, updateData);
        console.log('✅ PATCH /v1/patrimonio/{id} - Status:', patchResponse.status);
        console.log('   Nome atualizado:', patchResponse.data.nome);
      } catch (error) {
        console.log('❌ PATCH /v1/patrimonio/{id} - Erro:', error.response?.status, error.response?.data?.message || error.message);
      }

      // 5. Testar DELETE /v1/patrimonio/{id}
      console.log('\n5. Testando DELETE /v1/patrimonio/{id}');
      try {
        const deleteResponse = await axios.delete(`${BASE_URL}/patrimonio/${patrimonioId}`);
        console.log('✅ DELETE /v1/patrimonio/{id} - Status:', deleteResponse.status);
      } catch (error) {
        console.log('❌ DELETE /v1/patrimonio/{id} - Erro:', error.response?.status, error.response?.data?.message || error.message);
      }

    } catch (error) {
      console.log('❌ POST /v1/patrimonio - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 6. Testar GET /v1/patrimonio/codigo/{codigo}
    console.log('\n6. Testando GET /v1/patrimonio/codigo/{codigo}');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio/codigo/PAT-2024-001`);
      console.log('✅ GET /v1/patrimonio/codigo/{codigo} - Status:', response.status);
      console.log('   Patrimônio encontrado:', response.data.nome);
    } catch (error) {
      console.log('❌ GET /v1/patrimonio/codigo/{codigo} - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 7. Testar GET /v1/patrimonio/categoria/{categoria}
    console.log('\n7. Testando GET /v1/patrimonio/categoria/{categoria}');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio/categoria/EQUIPAMENTO`);
      console.log('✅ GET /v1/patrimonio/categoria/{categoria} - Status:', response.status);
      console.log('   Patrimônios encontrados:', response.data.length);
    } catch (error) {
      console.log('❌ GET /v1/patrimonio/categoria/{categoria} - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 8. Testar GET /v1/patrimonio/status/{status}
    console.log('\n8. Testando GET /v1/patrimonio/status/{status}');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio/status/ATIVO`);
      console.log('✅ GET /v1/patrimonio/status/{status} - Status:', response.status);
      console.log('   Patrimônios ativos:', response.data.length);
    } catch (error) {
      console.log('❌ GET /v1/patrimonio/status/{status} - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 9. Testar GET /v1/patrimonio/stats/categoria
    console.log('\n9. Testando GET /v1/patrimonio/stats/categoria');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio/stats/categoria`);
      console.log('✅ GET /v1/patrimonio/stats/categoria - Status:', response.status);
      console.log('   Estatísticas:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ GET /v1/patrimonio/stats/categoria - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 10. Testar GET /v1/patrimonio/stats/status
    console.log('\n10. Testando GET /v1/patrimonio/stats/status');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio/stats/status`);
      console.log('✅ GET /v1/patrimonio/stats/status - Status:', response.status);
      console.log('   Estatísticas:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ GET /v1/patrimonio/stats/status - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 11. Testar GET /v1/patrimonio/stats/valor-total
    console.log('\n11. Testando GET /v1/patrimonio/stats/valor-total');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio/stats/valor-total`);
      console.log('✅ GET /v1/patrimonio/stats/valor-total - Status:', response.status);
      console.log('   Valor total:', response.data.valorTotal);
    } catch (error) {
      console.log('❌ GET /v1/patrimonio/stats/valor-total - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

    // 12. Testar GET /v1/patrimonio/vencimento-garantia
    console.log('\n12. Testando GET /v1/patrimonio/vencimento-garantia');
    try {
      const response = await axios.get(`${BASE_URL}/patrimonio/vencimento-garantia`);
      console.log('✅ GET /v1/patrimonio/vencimento-garantia - Status:', response.status);
      console.log('   Patrimônios próximos do vencimento:', response.data.length);
    } catch (error) {
      console.log('❌ GET /v1/patrimonio/vencimento-garantia - Erro:', error.response?.status, error.response?.data?.message || error.message);
    }

  } catch (error) {
    console.log('❌ Erro geral:', error.message);
  }

  console.log('\n🏁 Teste concluído!');
}

// Executar os testes
testPatrimonioEndpoints().catch(console.error);
