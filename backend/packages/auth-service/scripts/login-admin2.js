const axios = require('axios');

async function login() {
  try {
    const response = await axios.post('http://localhost:3001/auth/login', {
      email: 'admin2@dev.local',
      password: 'Admin2Password123!'
    });

    console.log('✅ LOGIN SUCESSO!\n');
    console.log('🎫 TOKEN:');
    console.log('═'.repeat(80));
    console.log(response.data.accessToken);
    console.log('═'.repeat(80));
    console.log('\n📋 User:', response.data.user.email, '-', response.data.user.name);
    console.log('   Role:', response.data.user.role);
    console.log('\n💡 Use esse token no Swagger do users-service!');
    
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
  }
}

login();

