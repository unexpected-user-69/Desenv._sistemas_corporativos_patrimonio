/**
 * Script para verificar se a tabela auth_refresh_tokens existe
 */

const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function checkTable() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'patrimonio_inventario',
  };

  console.log('🔍 Verificando tabela auth_refresh_tokens...\n');
  console.log(`Banco: ${dbConfig.database}:${dbConfig.port}\n`);

  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    // Verificar se a tabela existe
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'auth_refresh_tokens'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log('✅ Tabela auth_refresh_tokens existe!\n');
      
      // Verificar estrutura da tabela
      const columns = await client.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'auth_refresh_tokens'
        ORDER BY ordinal_position;
      `);
      
      console.log('📋 Estrutura da tabela:');
      columns.rows.forEach(col => {
        console.log(`   ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : '(NULLABLE)'}`);
      });
      
      // Contar registros
      const count = await client.query('SELECT COUNT(*) FROM auth_refresh_tokens');
      console.log(`\n📊 Total de registros: ${count.rows[0].count}`);
    } else {
      console.log('❌ Tabela auth_refresh_tokens NÃO existe!');
      console.log('\n💡 Execute a migration: npm run typeorm -- migration:run');
    }

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

checkTable();

