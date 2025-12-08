/**
 * Script para criar usuário administrador "admin"
 * 
 * Uso: node scripts/create-admin-user.js
 * 
 * Este script cria o usuário admin@admin.local com a senha AdminPassword123!
 * no banco de dados. Funciona tanto para backend monolítico quanto microserviços.
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const path = require('path');

// Tenta carregar .env do backend
require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.HASH_PEPPER) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const adminEmail = 'admin@admin.local';
const adminPassword = 'AdminPassword123!';
const adminName = 'admin';
const pepper = process.env.HASH_PEPPER || '';
const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '12', 10);

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

async function createAdminUser() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Verificar se existe schema users (microserviços)
    const schemaCheck = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'users'
    `);

    const useSchema = schemaCheck.rows.length > 0;
    const tableName = useSchema ? 'users.users' : 'users';
    
    console.log(`📋 Usando tabela: ${tableName}\n`);

    // Verificar se o usuário já existe
    const checkResult = await client.query(
      `SELECT id, email, name, role, is_active, deleted_at FROM ${tableName} WHERE email = $1`,
      [adminEmail.toLowerCase()]
    );

    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      
      if (user.deleted_at) {
        console.log(`⚠️  Usuário ${adminEmail} existe mas está deletado. Reativando...`);
        // Atualizar senha e reativar usuário
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
        
        console.log(`✅ Usuário ${adminEmail} reativado e senha atualizada\n`);
      } else {
        console.log(`⚠️  Usuário ${adminEmail} já existe. Atualizando senha e garantindo role ADMIN...`);
        // Atualizar senha e garantir que é ADMIN
        const passwordWithPepper = adminPassword + (pepper ? pepper : '');
        const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
        
        await client.query(
          `UPDATE ${tableName} 
           SET password_hash = $1, 
               name = $2, 
               role = $3,
               is_active = true,
               updated_at = NOW()
           WHERE email = $4`,
          [passwordHash, adminName, 'ADMIN', adminEmail.toLowerCase()]
        );
        
        console.log(`✅ Senha do usuário ${adminEmail} atualizada e role definido como ADMIN\n`);
      }
    } else {
      // Criar novo usuário
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
      console.log(`\n✅ Usuário administrador configurado com sucesso!`);
      console.log(`\n🔑 Credenciais:`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Senha: ${adminPassword}`);
      console.log(`\n💡 Você pode usar essas credenciais para fazer login no sistema.\n`);
    } else {
      console.error('❌ Erro: Usuário não foi encontrado após criação');
      process.exit(1);
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

createAdminUser();

