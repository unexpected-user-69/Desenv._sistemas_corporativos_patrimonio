/**
 * Script para verificar onde o usuário está (qual schema)
 */

const { Client } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.HASH_PEPPER) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio',
};

async function checkUserLocation() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    const email = 'admin@dev.local';

    // Verificar no schema users
    try {
      const resultUsers = await client.query(
        'SELECT id, email, name, role, is_active FROM users.users WHERE email = $1',
        [email.toLowerCase()]
      );
      if (resultUsers.rows.length > 0) {
        console.log('✅ Usuário encontrado no schema users:');
        console.log(JSON.stringify(resultUsers.rows[0], null, 2));
      } else {
        console.log('❌ Usuário NÃO encontrado no schema users');
      }
    } catch (e) {
      console.log(`❌ Erro ao buscar no schema users: ${e.message}`);
    }

    console.log('');

    // Verificar no schema public
    try {
      const resultPublic = await client.query(
        'SELECT id, email, name, role, is_active FROM public.users WHERE email = $1',
        [email.toLowerCase()]
      );
      if (resultPublic.rows.length > 0) {
        console.log('✅ Usuário encontrado no schema public:');
        console.log(JSON.stringify(resultPublic.rows[0], null, 2));
      } else {
        console.log('❌ Usuário NÃO encontrado no schema public');
      }
    } catch (e) {
      console.log(`❌ Erro ao buscar no schema public: ${e.message}`);
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

checkUserLocation();

