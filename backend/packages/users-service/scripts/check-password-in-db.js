/**
 * Script para verificar qual senha está no banco e testar diferentes senhas
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const path = require('path');

// Tenta carregar .env do users-service primeiro, depois do backend
require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.HASH_PEPPER) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const devEmail = 'admin@dev.local';
const pepper = process.env.HASH_PEPPER || '';

// Senhas possíveis para testar
const possiblePasswords = [
  'AdminPassword123!',
  'admin123',
  'password',
  'admin',
  '123456',
  process.env.SWAGGER_DEV_PASSWORD || '',
].filter(p => p);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

async function checkPassword() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Buscar usuário
    const result = await client.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [devEmail.toLowerCase()]
    );

    if (result.rows.length === 0) {
      console.log('❌ Usuário não encontrado');
      return;
    }

    const user = result.rows[0];
    console.log(`📋 Usuário encontrado: ${user.email}`);
    console.log(`   Password Hash: ${user.password_hash.substring(0, 30)}...\n`);

    console.log('🔑 Testando senhas possíveis:\n');
    console.log(`HASH_PEPPER configurado: ${pepper ? 'SIM (' + pepper.substring(0, 10) + '...)' : 'NÃO'}\n`);

    let found = false;
    for (const password of possiblePasswords) {
      const passwordWithPepper = password + (pepper ? pepper : '');
      const isValid = await bcrypt.compare(passwordWithPepper, user.password_hash);
      
      if (isValid) {
        console.log(`✅ SENHA CORRETA ENCONTRADA: "${password}"`);
        found = true;
        break;
      } else {
        console.log(`❌ "${password}" - inválida`);
      }
    }

    if (!found) {
      console.log('\n❌ Nenhuma das senhas testadas funcionou!');
      console.log('\n💡 Possíveis causas:');
      console.log('   1. A senha foi criada com um HASH_PEPPER diferente');
      console.log('   2. A senha no banco foi criada manualmente com outro método');
      console.log('   3. O HASH_PEPPER atual não corresponde ao usado na criação');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

checkPassword();

