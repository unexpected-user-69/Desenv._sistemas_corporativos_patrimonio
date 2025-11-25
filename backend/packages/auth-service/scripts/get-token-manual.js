/**
 * Script para obter token manualmente via API
 * 
 * Uso: node scripts/get-token-manual.js
 * 
 * Este script tenta fazer login via API e mostra o token.
 * Se o login falhar, mostra instruções para fazer manualmente.
 */

const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Carregar .env
require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.SWAGGER_DEV_EMAIL) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const devEmail = process.env.SWAGGER_DEV_EMAIL || 'admin@dev.local';
const devPassword = process.env.SWAGGER_DEV_PASSWORD || 'AdminPassword123!';
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

async function getToken() {
  console.log('🔑 Obtendo token de acesso...\n');
  console.log(`📧 Email: ${devEmail}`);
  console.log(`🔒 Senha: ${devPassword}`);
  console.log(`🌐 Auth Service: ${authServiceUrl}\n`);

  try {
    const loginResponse = await axios.post(
      `${authServiceUrl}/auth/login`,
      {
        email: devEmail,
        password: devPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { accessToken, refreshToken, user: userInfo } = loginResponse.data;

    console.log('✅ Login realizado com sucesso!\n');
    console.log('🎫 TOKEN DE ACESSO (use no Swagger):');
    console.log('═'.repeat(80));
    console.log(accessToken);
    console.log('═'.repeat(80));
    console.log('\n📋 Informações do token:');
    console.log(`   User ID: ${userInfo.id}`);
    console.log(`   Email: ${userInfo.email}`);
    console.log(`   Nome: ${userInfo.name}`);
    console.log(`   Role: ${userInfo.role}`);
    console.log(`\n💾 Refresh Token (guardar para renovação):`);
    console.log(`   ${refreshToken.substring(0, 50)}...\n`);

    console.log('📝 Para usar no Swagger:');
    console.log('   1. Abra o Swagger do users-service: http://localhost:3002/api');
    console.log('   2. Clique no botão "Authorize" (cadeado no topo)');
    console.log('   3. Cole o token acima no campo "Value"');
    console.log('   4. Clique em "Authorize" e depois "Close"');
    console.log('   5. Agora você pode testar os endpoints!\n');

    // Salvar token em arquivo para facilitar
    const fs = require('fs');
    const tokenFile = path.join(__dirname, '../.token');
    fs.writeFileSync(tokenFile, accessToken);
    console.log(`💾 Token salvo em: ${tokenFile}\n`);

  } catch (loginError) {
    console.error('❌ Erro ao fazer login:', loginError.response?.data || loginError.message);
    console.log('\n💡 INSTRUÇÕES PARA OBTER TOKEN MANUALMENTE:\n');
    console.log('1. Abra o Swagger do auth-service: http://localhost:3001/api');
    console.log('2. Vá para o endpoint: POST /auth/login');
    console.log('3. Use as seguintes credenciais:');
    console.log(`   Email: ${devEmail}`);
    console.log(`   Password: ${devPassword}`);
    console.log('4. Execute o endpoint');
    console.log('5. Copie o "accessToken" da resposta');
    console.log('6. Use esse token no Swagger do users-service\n');
    
    console.log('🔧 Se o login falhar com "Invalid credentials":');
    console.log('   - Verifique se o users-service está rodando');
    console.log('   - Verifique se o usuário existe no banco');
    console.log('   - Execute: node scripts/create-dev-user.js (no users-service)\n');
  }
}

getToken();

