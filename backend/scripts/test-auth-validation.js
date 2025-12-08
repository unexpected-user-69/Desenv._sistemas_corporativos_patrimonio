/**
 * Script para testar a validação de credenciais como o auth-service faz
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.HASH_PEPPER) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const adminEmail = 'admin@admin.local';
const adminPassword = 'AdminPassword123!';
const pepper = process.env.HASH_PEPPER || '';
const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '12', 10);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

// Simula o HashService.compare
async function hashServiceCompare(plainPassword, hashedPassword) {
  const passwordWithPepper = plainPassword + (pepper ? pepper : '');
  return bcrypt.compare(passwordWithPepper, hashedPassword);
}

async function testAuthValidation() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Simula a validação do auth-service
    console.log('🔐 Simulando validação do auth-service...\n');

    // Tenta primeiro no schema users (microserviços)
    let result = await client.query(
      `SELECT id, email, password_hash, name, role, is_active 
       FROM users.users 
       WHERE email = $1 AND deleted_at IS NULL`,
      [adminEmail.toLowerCase()]
    );
    
    // Se não encontrou no schema users, tenta no schema padrão
    if (result.rows.length === 0) {
      console.log('⚠️  Usuário não encontrado no schema users.users, tentando schema padrão...\n');
      result = await client.query(
        `SELECT id, email, password_hash, name, role, is_active 
         FROM users 
         WHERE email = $1 AND deleted_at IS NULL`,
        [adminEmail.toLowerCase()]
      );
    }

    if (result.rows.length === 0) {
      console.log('❌ Usuário não encontrado');
      return;
    }

    const user = result.rows[0];
    console.log('📋 Usuário encontrado:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Nome: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Ativo: ${user.is_active}\n`);

    if (!user.is_active) {
      console.log('❌ Usuário está inativo');
      return;
    }

    // Verifica a senha usando HashService (que adiciona o pepper corretamente)
    console.log('🔑 Comparando senha usando HashService (com pepper)...');
    console.log(`   Senha: ${adminPassword}`);
    console.log(`   Pepper: ${pepper ? pepper.substring(0, 10) + '...' : '(vazio)'}\n`);
    
    const isValid = await hashServiceCompare(adminPassword, user.password_hash);
    
    if (!isValid) {
      console.log('❌ Senha inválida!');
      console.log('\n💡 Verificando possíveis problemas...\n');
      
      // Teste adicional
      const passwordWithPepper = adminPassword + (pepper ? pepper : '');
      const testHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      const testCompare = await bcrypt.compare(passwordWithPepper, testHash);
      console.log(`   Teste de hash/compare: ${testCompare ? '✅ OK' : '❌ FALHOU'}`);
      
      const directCompare = await bcrypt.compare(passwordWithPepper, user.password_hash);
      console.log(`   Comparação direta: ${directCompare ? '✅ OK' : '❌ FALHOU'}`);
      
      return;
    }

    console.log('✅ Credenciais válidas!\n');
    console.log('📋 Resultado da validação:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Nome: ${user.name}`);
    console.log(`   Roles: [${user.role}]\n`);

  } catch (error) {
    console.error('❌ Erro:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  } finally {
    await client.end();
  }
}

testAuthValidation();

