/**
 * Script para criar usuário administrador "admin6"
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.HASH_PEPPER) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const adminEmail = 'admin6@admin.local';
const adminPassword = 'AdminPassword123!';
const adminName = 'admin6';
const pepper = process.env.HASH_PEPPER || '';
const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '12', 10);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

async function createAdmin6() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    const tableName = 'users.users';
    
    // Verificar se o usuário já existe
    const checkResult = await client.query(
      `SELECT id, email, name, role, is_active, deleted_at FROM ${tableName} WHERE email = $1`,
      [adminEmail.toLowerCase()]
    );

    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      console.log(`⚠️  Usuário ${adminEmail} já existe. Atualizando...`);
      
      const passwordWithPepper = adminPassword + (pepper ? pepper : '');
      const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      
      await client.query(
        `UPDATE ${tableName} 
         SET password_hash = $1, 
             name = $2, 
             role = $3,
             is_active = true,
             deleted_at = NULL,
             updated_at = NOW()
         WHERE email = $4`,
        [passwordHash, adminName, 'ADMIN', adminEmail.toLowerCase()]
      );
      
      console.log(`✅ Usuário ${adminEmail} atualizado!\n`);
    } else {
      console.log(`📝 Criando usuário ${adminEmail}...`);
      
      const passwordWithPepper = adminPassword + (pepper ? pepper : '');
      const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      
      await client.query(
        `INSERT INTO ${tableName} (id, name, email, password_hash, role, is_active, created_at, updated_at, version)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, true, NOW(), NOW(), 1)`,
        [adminName, adminEmail.toLowerCase(), passwordHash, 'ADMIN']
      );
      
      console.log(`✅ Usuário ${adminEmail} criado com sucesso!\n`);
    }

    // Verificar criação
    const verifyResult = await client.query(
      `SELECT id, email, name, role, is_active FROM ${tableName} WHERE email = $1`,
      [adminEmail.toLowerCase()]
    );
    
    if (verifyResult.rows.length > 0) {
      const user = verifyResult.rows[0];
      console.log('📋 Informações do usuário administrador:');
      console.log('─'.repeat(60));
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Nome: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Ativo: ${user.is_active}`);
      console.log('─'.repeat(60));
      console.log(`\n✅ Usuário administrador admin6 configurado com sucesso!`);
      console.log(`\n🔑 Credenciais:`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Senha: ${adminPassword}`);
      console.log(`\n💡 Você pode usar essas credenciais para fazer login no sistema.\n`);
    }

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

createAdmin6();

