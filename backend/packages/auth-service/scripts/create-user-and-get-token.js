/**
 * Script para criar usuário manualmente e obter token
 * 
 * Uso: node scripts/create-user-and-get-token.js
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const axios = require('axios');
const path = require('path');

// Tenta carregar .env do auth-service primeiro, depois do backend
require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.HASH_PEPPER) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const devEmail = process.env.SWAGGER_DEV_EMAIL || 'admin@dev.local';
const devPassword = process.env.SWAGGER_DEV_PASSWORD || 'AdminPassword123!';
const devName = process.env.SWAGGER_DEV_NAME || 'Admin Dev';
const pepper = process.env.HASH_PEPPER || '';
const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

// URL do auth-service
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

async function createUserAndGetToken() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Verificar se o usuário já existe
    const checkResult = await client.query(
      'SELECT id, email, name, role, is_active FROM users WHERE email = $1',
      [devEmail.toLowerCase()]
    );

    let userId;

    if (checkResult.rows.length > 0) {
      const existingUser = checkResult.rows[0];
      console.log(`⚠️  Usuário ${devEmail} já existe. Atualizando senha...`);
      
      // Atualizar senha
      const passwordWithPepper = devPassword + (pepper ? pepper : '');
      const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      
      await client.query(
        `UPDATE users 
         SET password_hash = $1, 
             name = $2, 
             role = $3,
             is_active = true,
             deleted_at = NULL,
             updated_at = NOW()
         WHERE email = $4`,
        [passwordHash, devName, 'ADMIN', devEmail.toLowerCase()]
      );
      
      userId = existingUser.id;
      console.log(`✅ Senha do usuário ${devEmail} atualizada\n`);
    } else {
      console.log(`📝 Criando novo usuário: ${devEmail}`);
      
      // Criar hash da senha
      const passwordWithPepper = devPassword + (pepper ? pepper : '');
      const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      
      // Inserir usuário
      const insertResult = await client.query(
        `INSERT INTO users (email, name, password_hash, role, is_active, created_at, updated_at, version)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), 1)
         RETURNING id`,
        [devEmail.toLowerCase(), devName, passwordHash, 'ADMIN', true]
      );
      
      userId = insertResult.rows[0].id;
      console.log(`✅ Usuário criado com sucesso!\n`);
    }

    // Mostrar informações do usuário
    const userResult = await client.query(
      'SELECT id, email, name, role, is_active FROM users WHERE id = $1',
      [userId]
    );
    const user = userResult.rows[0];
    
    console.log('📋 Informações do usuário:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Nome: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Ativo: ${user.is_active}\n`);

    // Fazer login via API para obter o token
    console.log('🔑 Fazendo login para obter token...\n');
    
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
      console.log('─'.repeat(80));
      console.log(accessToken);
      console.log('─'.repeat(80));
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

    } catch (loginError) {
      console.error('❌ Erro ao fazer login:', loginError.response?.data || loginError.message);
      console.log('\n💡 Tente fazer login manualmente via Swagger:');
      console.log(`   POST ${authServiceUrl}/auth/login`);
      console.log(`   Body: { "email": "${devEmail}", "password": "${devPassword}" }\n`);
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  } finally {
    await client.end();
  }
}

createUserAndGetToken();

