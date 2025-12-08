/**
 * Script para verificar se o usuário está no schema correto
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

async function verifyUser() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    const email = 'admin@dev.local';

    // Verificar em TODOS os schemas
    const allSchemas = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
      ORDER BY schema_name;
    `);

    console.log('🔍 Procurando usuário em todos os schemas...\n');

    for (const schemaRow of allSchemas.rows) {
      const schema = schemaRow.schema_name;
      try {
        const result = await client.query(`
          SELECT id, email, name, role, is_active 
          FROM ${schema}.users 
          WHERE email = $1
        `, [email.toLowerCase()]);
        
        if (result.rows.length > 0) {
          console.log(`✅ Usuário encontrado no schema: ${schema}`);
          console.log(JSON.stringify(result.rows[0], null, 2));
          console.log('');
        }
      } catch (e) {
        // Schema não tem tabela users, ignorar
      }
    }

    // Verificar especificamente no schema users
    console.log('🔍 Verificando especificamente no schema users...\n');
    try {
      const result = await client.query(`
        SELECT id, email, name, role, is_active, password_hash 
        FROM users.users 
        WHERE email = $1
      `, [email.toLowerCase()]);
      
      if (result.rows.length > 0) {
        console.log('✅ Usuário encontrado no schema users.users:');
        console.log(`   ID: ${result.rows[0].id}`);
        console.log(`   Email: ${result.rows[0].email}`);
        console.log(`   Nome: ${result.rows[0].name}`);
        console.log(`   Role: ${result.rows[0].role}`);
        console.log(`   Ativo: ${result.rows[0].is_active}`);
        console.log(`   Hash: ${result.rows[0].password_hash.substring(0, 30)}...`);
      } else {
        console.log('❌ Usuário NÃO encontrado no schema users.users');
        console.log('   A tabela existe mas está vazia.');
        console.log('   Vou criar o usuário agora...\n');
        
        // Criar usuário
        const bcrypt = require('bcryptjs');
        const pepper = process.env.HASH_PEPPER || '';
        const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);
        const password = 'AdminPassword123!';
        const passwordWithPepper = password + (pepper ? pepper : '');
        const passwordHash = await bcrypt.hash(passwordWithPepper, saltRounds);
        
        await client.query(`
          INSERT INTO users.users (id, name, email, password_hash, role, is_active, created_at, updated_at, version)
          VALUES (gen_random_uuid(), $1, $2, $3, $4, true, NOW(), NOW(), 1)
        `, ['Admin Dev', email.toLowerCase(), passwordHash, 'ADMIN']);
        
        console.log('✅ Usuário criado no schema users.users!');
      }
    } catch (e) {
      console.log(`❌ Erro ao verificar schema users: ${e.message}`);
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

verifyUser();

