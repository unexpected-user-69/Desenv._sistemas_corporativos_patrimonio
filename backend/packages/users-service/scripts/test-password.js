/**
 * Script para testar se a senha está correta
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const path = require('path');

// Tenta carregar .env do users-service primeiro, depois do backend
require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.HASH_PEPPER) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

async function testPassword() {
  const devEmail = 'admin@dev.local';
  const devPassword = 'AdminPassword123!';
  const pepper = process.env.HASH_PEPPER || '';
  const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);

  console.log('🔐 Testando senha...\n');
  console.log(`HASH_PEPPER: ${pepper ? 'SIM (' + pepper.substring(0, 10) + '...)' : 'NÃO'}`);
  console.log(`HASH_SALT_ROUNDS: ${saltRounds}\n`);

  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'patrimonio_inventario',
  };

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
    console.log(`   Password Hash: ${user.password_hash.substring(0, 20)}...\n`);

    // Testar senha com pepper
    const passwordWithPepper = devPassword + (pepper ? pepper : '');
    console.log(`🔑 Testando senha: "${devPassword}" + pepper`);
    
    const isValid = await bcrypt.compare(passwordWithPepper, user.password_hash);
    
    if (isValid) {
      console.log('✅ Senha VÁLIDA!');
    } else {
      console.log('❌ Senha INVÁLIDA!');
      console.log('\n🔧 Tentando recriar hash...');
      
      // Recriar hash
      const newHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      console.log(`   Novo hash: ${newHash.substring(0, 20)}...`);
      
      // Atualizar no banco
      await client.query(
        'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE email = $2',
        [newHash, devEmail.toLowerCase()]
      );
      
      console.log('✅ Hash atualizado no banco!');
      
      // Testar novamente
      const isValidAfter = await bcrypt.compare(passwordWithPepper, newHash);
      if (isValidAfter) {
        console.log('✅ Senha agora está VÁLIDA!');
      }
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

testPassword();

