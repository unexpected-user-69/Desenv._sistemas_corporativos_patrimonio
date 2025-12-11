/**
 * Script para encontrar onde a tabela users está
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

async function findUsersTable() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Buscar todas as tabelas chamadas 'users' em todos os schemas
    const result = await client.query(`
      SELECT table_schema, table_name, 
             (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = t.table_schema AND table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_name = 'users'
      ORDER BY table_schema;
    `);

    console.log('📋 Tabelas "users" encontradas:');
    if (result.rows.length === 0) {
      console.log('   (nenhuma tabela encontrada)');
    } else {
      for (const row of result.rows) {
        console.log(`   Schema: ${row.table_schema}, Tabela: ${row.table_name}, Colunas: ${row.column_count}`);
        
        // Contar registros
        try {
          const count = await client.query(`SELECT COUNT(*) as count FROM ${row.table_schema}.${row.table_name};`);
          console.log(`      Registros: ${count.rows[0].count}`);
          
          // Verificar se tem o admin
          const admin = await client.query(`SELECT id, email, name, role FROM ${row.table_schema}.${row.table_name} WHERE email = 'admin@dev.local';`);
          if (admin.rows.length > 0) {
            console.log(`      ✅ Admin encontrado: ${JSON.stringify(admin.rows[0])}`);
          }
        } catch (e) {
          console.log(`      ❌ Erro ao acessar: ${e.message}`);
        }
        console.log('');
      }
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

findUsersTable();

