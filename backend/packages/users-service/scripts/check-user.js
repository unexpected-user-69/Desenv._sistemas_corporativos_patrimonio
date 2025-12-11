/**
 * Script para verificar se o usuário existe nos bancos
 */

const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

async function checkUser() {
  // Banco do users-service (patrimonio_inventario na porta 5432)
  const usersDbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'patrimonio_inventario',
  };

  // Banco do auth-service (patrimonio na porta 5433)
  const authDbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: 5433,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: 'patrimonio',
  };

  const devEmail = 'admin@dev.local';

  console.log('🔍 Verificando usuário nos bancos...\n');

  // Verificar no banco do users-service
  const usersClient = new Client(usersDbConfig);
  try {
    await usersClient.connect();
    const result = await usersClient.query(
      'SELECT id, email, name, role, is_active, deleted_at FROM users WHERE email = $1',
      [devEmail.toLowerCase()]
    );
    console.log(`📊 Banco users-service (${usersDbConfig.database}:${usersDbConfig.port}):`);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log(`   ✅ Usuário encontrado:`);
      console.log(`      ID: ${user.id}`);
      console.log(`      Email: ${user.email}`);
      console.log(`      Nome: ${user.name}`);
      console.log(`      Role: ${user.role}`);
      console.log(`      Ativo: ${user.is_active}`);
      console.log(`      Deletado: ${user.deleted_at ? 'SIM' : 'NÃO'}`);
    } else {
      console.log(`   ❌ Usuário NÃO encontrado`);
    }
  } catch (error) {
    console.log(`   ❌ Erro ao conectar: ${error.message}`);
  } finally {
    await usersClient.end();
  }

  console.log('');

  // Verificar no banco do auth-service
  const authClient = new Client(authDbConfig);
  try {
    await authClient.connect();
    const result = await authClient.query(
      'SELECT id, email, name, role, is_active, deleted_at FROM users WHERE email = $1',
      [devEmail.toLowerCase()]
    );
    console.log(`📊 Banco auth-service (${authDbConfig.database}:${authDbConfig.port}):`);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log(`   ✅ Usuário encontrado:`);
      console.log(`      ID: ${user.id}`);
      console.log(`      Email: ${user.email}`);
      console.log(`      Nome: ${user.name}`);
      console.log(`      Role: ${user.role}`);
      console.log(`      Ativo: ${user.is_active}`);
      console.log(`      Deletado: ${user.deleted_at ? 'SIM' : 'NÃO'}`);
    } else {
      console.log(`   ❌ Usuário NÃO encontrado`);
    }
  } catch (error) {
    console.log(`   ❌ Erro ao conectar: ${error.message}`);
  } finally {
    await authClient.end();
  }
}

checkUser();

