/**
 * Script para criar usuário de desenvolvimento
 * 
 * Uso: node scripts/create-dev-user.js
 * 
 * Este script cria o usuário admin@dev.local com a senha AdminPassword123!
 * no banco de dados do users-service.
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const path = require('path');

// Tenta carregar .env do users-service primeiro, depois do backend
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

async function createDevUser() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados');

    // Definir search_path para usar o schema users
    await client.query('SET search_path TO users, public;');

    // Verificar se o usuário já existe no schema users
    const checkResult = await client.query(
      'SELECT id, email, is_active, deleted_at FROM users.users WHERE email = $1',
      [devEmail.toLowerCase()]
    );

    if (checkResult.rows.length > 0) {
      const user = checkResult.rows[0];
      
      if (user.deleted_at) {
        console.log(`⚠️  Usuário ${devEmail} existe mas está deletado. Atualizando...`);
        // Atualizar senha e reativar usuário
        const passwordWithPepper = devPassword + (pepper ? pepper : '');
        const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
        
        await client.query(
          `UPDATE users.users 
           SET password_hash = $1, 
               name = $2, 
               role = $3, 
               is_active = true, 
               deleted_at = NULL,
               updated_at = NOW()
           WHERE email = $4`,
          [passwordHash, devName, 'ADMIN', devEmail.toLowerCase()]
        );
        
        console.log(`✅ Usuário ${devEmail} reativado e senha atualizada`);
      } else {
        console.log(`⚠️  Usuário ${devEmail} já existe. Atualizando senha...`);
        // Atualizar apenas a senha
        const passwordWithPepper = devPassword + (pepper ? pepper : '');
        const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
        
        await client.query(
          `UPDATE users.users 
           SET password_hash = $1, 
               name = $2, 
               role = $3,
               updated_at = NOW()
           WHERE email = $4`,
          [passwordHash, devName, 'ADMIN', devEmail.toLowerCase()]
        );
        
        console.log(`✅ Senha do usuário ${devEmail} atualizada`);
      }
    } else {
      // Criar novo usuário
      console.log(`📝 Criando usuário ${devEmail}...`);
      
      const passwordWithPepper = devPassword + (pepper ? pepper : '');
      const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
      
      await client.query(
        `INSERT INTO users.users (id, name, email, password_hash, role, is_active, created_at, updated_at, version)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, true, NOW(), NOW(), 1)`,
        [devName, devEmail.toLowerCase(), passwordHash, 'ADMIN']
      );
      
      console.log(`✅ Usuário ${devEmail} criado com sucesso!`);
    }

    // Verificar criação
    const verifyResult = await client.query(
      'SELECT id, email, name, role, is_active FROM users.users WHERE email = $1',
      [devEmail.toLowerCase()]
    );
    
    if (verifyResult.rows.length > 0) {
      const user = verifyResult.rows[0];
      console.log('\n📋 Informações do usuário:');
      console.log(`   ID: ${user.id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Nome: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Ativo: ${user.is_active}`);
      console.log(`\n✅ Usuário de desenvolvimento configurado com sucesso!`);
    }

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createDevUser();

