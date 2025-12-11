const axios = require('axios');

async function test() {
  try {
    const response = await axios.post('http://localhost:3002/users/validate', {
      email: 'admin2@dev.local',
      password: 'Admin2Password123!'
    });

    console.log('✅ Resposta do endpoint /users/validate:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.data) {
      console.log('\n✅ Credenciais válidas!');
      console.log('   ID:', response.data.data.id);
      console.log('   Email:', response.data.data.email);
      console.log('   Nome:', response.data.data.name);
    } else {
      console.log('\n❌ Credenciais inválidas (resposta null)');
    }
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

test();
