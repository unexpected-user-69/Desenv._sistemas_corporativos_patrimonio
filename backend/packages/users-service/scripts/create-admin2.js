/**
 * Script para criar usuário admin2
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const path = require('path');

// Carregar .env do backend (onde está o HASH_PEPPER)
const fs = require('fs');
const envPath = path.join(__dirname, '../../.env');
const envPath2 = 'C:\\Nestjs\\desenvolvi\\Desenv._sistemas_corporativos_patrimonio\\backend\\.env';

// Tentar carregar de ambos os caminhos
require('dotenv').config({ path: envPath });
if (!process.env.HASH_PEPPER && fs.existsSync(envPath2)) {
  require('dotenv').config({ path: envPath2 });
}

// Forçar leitura do arquivo se ainda não tiver
if (!process.env.HASH_PEPPER) {
  const pathsToTry = [envPath, envPath2];
  for (const envFile of pathsToTry) {
    if (fs.existsSync(envFile)) {
      const envContent = fs.readFileSync(envFile, 'utf8');
      const pepperMatch = envContent.match(/HASH_PEPPER=(.+)/);
      if (pepperMatch) {
        process.env.HASH_PEPPER = pepperMatch[1].trim();
        break;
      }
    }
  }
}

const admin2Email = 'admin2@dev.local';
const admin2Password = 'Admin2Password123!';
const admin2Name = 'Admin 2 Dev';
const pepper = process.env.HASH_PEPPER || '';
const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

async function createAdmin2() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Verificar se o usuário já existe
    const checkResult = await client.query(
      'SELECT id, email, name, role, is_active FROM users WHERE email = $1',
      [admin2Email.toLowerCase()]
    );

    // Criar hash da senha
    console.log(`\n🔐 Configuração de hash:`);
    console.log(`   HASH_PEPPER: ${pepper ? 'SIM (' + pepper.substring(0, 10) + '...)' : 'NÃO'}`);
    console.log(`   HASH_SALT_ROUNDS: ${saltRounds}`);
    
    const passwordWithPepper = admin2Password + (pepper ? pepper : '');
    console.log(`   Senha com pepper: ${admin2Password}${pepper ? ' + pepper' : ''}`);
    
    const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
    console.log(`   Hash criado: ${passwordHash.substring(0, 30)}...\n`);

    if (checkResult.rows.length > 0) {
      console.log(`⚠️  Usuário ${admin2Email} já existe. Atualizando...`);
      
      await client.query(
        `UPDATE users 
         SET password_hash = $1, 
             name = $2, 
             role = $3,
             is_active = true,
             deleted_at = NULL,
             updated_at = NOW()
         WHERE email = $4`,
        [passwordHash, admin2Name, 'ADMIN', admin2Email.toLowerCase()]
      );
      
      console.log(`✅ Usuário ${admin2Email} atualizado\n`);
    } else {
      console.log(`📝 Criando novo usuário: ${admin2Email}`);
      
      await client.query(
        `INSERT INTO users (email, name, password_hash, role, is_active, created_at, updated_at, version)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), 1)
         RETURNING id`,
        [admin2Email.toLowerCase(), admin2Name, passwordHash, 'ADMIN', true]
      );
      
      console.log(`✅ Usuário criado com sucesso!\n`);
    }

    // Mostrar informações do usuário
    const userResult = await client.query(
      'SELECT id, email, name, role, is_active FROM users WHERE email = $1',
      [admin2Email.toLowerCase()]
    );
    const user = userResult.rows[0];
    
    console.log('📋 Informações do usuário:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Nome: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Ativo: ${user.is_active}`);
    console.log(`\n🔑 Credenciais:`);
    console.log(`   Email: ${admin2Email}`);
    console.log(`   Password: ${admin2Password}`);
    console.log(`\n💡 Use essas credenciais para fazer login!\n`);

  } catch (error) {
    console.error('❌ Erro:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  } finally {
    await client.end();
  }
}

createAdmin2();

