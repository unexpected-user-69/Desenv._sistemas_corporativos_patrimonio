/**
 * Script para testar o hash da senha do usuário admin
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

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

async function testPasswordHash() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Verificar se existe schema users
    const schemaCheck = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'users'
    `);

    const useSchema = schemaCheck.rows.length > 0;
    const tableName = useSchema ? 'users.users' : 'users';
    
    console.log(`📋 Usando tabela: ${tableName}\n`);

    const result = await client.query(
      `SELECT email, password_hash, role, is_active FROM ${tableName} WHERE email = $1`,
      [adminEmail.toLowerCase()]
    );

    if (result.rows.length === 0) {
      console.log('❌ Usuário não encontrado');
      return;
    }

    const user = result.rows[0];
    console.log('📋 Informações do usuário:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Ativo: ${user.is_active}`);
    console.log(`   Hash (primeiros 50 chars): ${user.password_hash.substring(0, 50)}...\n`);

    // Testar com pepper
    const passwordWithPepper = adminPassword + (pepper ? pepper : '');
    console.log(`🔑 Testando senha:`);
    console.log(`   Senha: ${adminPassword}`);
    console.log(`   Pepper: ${pepper ? pepper.substring(0, 10) + '...' : '(vazio)'}`);
    console.log(`   Senha + Pepper: ${passwordWithPepper.substring(0, 20)}...\n`);

    const isValidWithPepper = await bcrypt.compare(passwordWithPepper, user.password_hash);
    console.log(`✅ Senha válida (com pepper): ${isValidWithPepper}`);

    const isValidWithoutPepper = await bcrypt.compare(adminPassword, user.password_hash);
    console.log(`✅ Senha válida (sem pepper): ${isValidWithoutPepper}\n`);

    if (!isValidWithPepper && !isValidWithoutPepper) {
      console.log('❌ PROBLEMA: A senha não está válida nem com nem sem pepper!');
      console.log('💡 Vamos recriar o hash da senha...\n');
      
      // Recriar hash com pepper
      const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '12', 10);
      const newHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      
      await client.query(
        `UPDATE ${tableName} 
         SET password_hash = $1, updated_at = NOW()
         WHERE email = $2`,
        [newHash, adminEmail.toLowerCase()]
      );
      
      console.log('✅ Hash da senha atualizado!');
      
      // Testar novamente
      const isValidAfterUpdate = await bcrypt.compare(passwordWithPepper, newHash);
      console.log(`✅ Senha válida após atualização: ${isValidAfterUpdate}\n`);
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

testPasswordHash();

