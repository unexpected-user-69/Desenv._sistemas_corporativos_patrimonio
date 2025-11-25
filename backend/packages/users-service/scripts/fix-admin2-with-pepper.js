/**
 * Script para criar senha do admin2 COM o mesmo pepper que o users-service usa
 */

const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const admin2Email = 'admin2@dev.local';
const admin2Password = 'Admin2Password123!';
const admin2Name = 'Admin 2 Dev';

// Carregar HASH_PEPPER do .env do backend
const envPath = 'C:\\Nestjs\\desenvolvi\\Desenv._sistemas_corporativos_patrimonio\\backend\\.env';
let pepper = '';
let saltRounds = 10;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const pepperMatch = envContent.match(/HASH_PEPPER=(.+)/);
  const saltMatch = envContent.match(/HASH_SALT_ROUNDS=(.+)/);
  
  if (pepperMatch) {
    pepper = pepperMatch[1].trim();
  }
  if (saltMatch) {
    saltRounds = parseInt(saltMatch[1].trim(), 10);
  }
}

const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'patrimonio_inventario',
};

async function fix() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco\n');
    console.log(`🔐 Configuração:`);
    console.log(`   HASH_PEPPER: ${pepper ? 'SIM (' + pepper.substring(0, 10) + '...)' : 'NÃO'}`);
    console.log(`   HASH_SALT_ROUNDS: ${saltRounds}\n`);

    // Criar hash COM pepper (igual ao que o users-service usa)
    const passwordWithPepper = admin2Password + (pepper ? pepper : '');
    const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
    console.log(`🔐 Hash criado: ${passwordHash.substring(0, 30)}...\n`);

    // Atualizar usuário
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
    
    console.log('✅ Usuário admin2 atualizado!');
    console.log('\n🔑 Credenciais:');
    console.log(`   Email: ${admin2Email}`);
    console.log(`   Password: ${admin2Password}`);
    console.log('\n⚠️  IMPORTANTE: Reinicie o users-service para carregar o HASH_PEPPER!');
    console.log('   Depois teste: node scripts/login-admin2.js\n');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

fix();

