/**
 * Script para listar todas as tabelas e seus dados
 * 
 * Uso: node scripts/list-tables-and-data.js
 * 
 * Este script lista todas as tabelas do banco de dados, seus schemas,
 * estruturas e dados inseridos.
 */

const { Client } = require('pg');
const path = require('path');

// Tenta carregar .env do backend
require('dotenv').config({ path: path.join(__dirname, '../.env') });
if (!process.env.DB_HOST) {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
}

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'patrimonio_inventario',
};

async function listTablesAndData() {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');
    console.log('='.repeat(80));
    console.log('📊 LISTAGEM DE TABELAS E DADOS');
    console.log('='.repeat(80));
    console.log(`Database: ${dbConfig.database}`);
    console.log(`Host: ${dbConfig.host}:${dbConfig.port}`);
    console.log('='.repeat(80));
    console.log();

    // Listar todos os schemas
    const schemasResult = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
      ORDER BY schema_name
    `);

    console.log('📁 SCHEMAS ENCONTRADOS:');
    console.log('-'.repeat(80));
    schemasResult.rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.schema_name}`);
    });
    console.log();

    // Para cada schema, listar tabelas
    for (const schemaRow of schemasResult.rows) {
      const schemaName = schemaRow.schema_name;
      
      console.log('='.repeat(80));
      console.log(`📋 SCHEMA: ${schemaName.toUpperCase()}`);
      console.log('='.repeat(80));
      console.log();

      // Listar tabelas do schema
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = $1 
          AND table_type = 'BASE TABLE'
        ORDER BY table_name
      `, [schemaName]);

      if (tablesResult.rows.length === 0) {
        console.log('  ⚠️  Nenhuma tabela encontrada neste schema\n');
        continue;
      }

      // Para cada tabela, mostrar estrutura e dados
      for (const tableRow of tablesResult.rows) {
        const tableName = tableRow.table_name;
        const fullTableName = schemaName === 'public' ? tableName : `${schemaName}.${tableName}`;
        
        console.log('─'.repeat(80));
        console.log(`📊 TABELA: ${fullTableName}`);
        console.log('─'.repeat(80));

        // Obter estrutura da tabela (colunas)
        const columnsResult = await client.query(`
          SELECT 
            column_name,
            data_type,
            character_maximum_length,
            is_nullable,
            column_default
          FROM information_schema.columns
          WHERE table_schema = $1 AND table_name = $2
          ORDER BY ordinal_position
        `, [schemaName, tableName]);

        console.log('\n📐 ESTRUTURA:');
        console.log('  Coluna                          | Tipo              | Null | Default');
        console.log('  ' + '-'.repeat(70));
        columnsResult.rows.forEach(col => {
          const colName = col.column_name.padEnd(30);
          let dataType = col.data_type;
          if (col.character_maximum_length) {
            dataType += `(${col.character_maximum_length})`;
          }
          dataType = dataType.padEnd(18);
          const nullable = col.is_nullable === 'YES' ? 'YES' : 'NO';
          const defaultValue = col.column_default || '';
          console.log(`  ${colName} | ${dataType} | ${nullable.padEnd(4)} | ${defaultValue}`);
        });

        // Contar registros
        const countResult = await client.query(`SELECT COUNT(*) as count FROM ${fullTableName}`);
        const recordCount = parseInt(countResult.rows[0].count, 10);

        console.log(`\n📈 TOTAL DE REGISTROS: ${recordCount}`);

        if (recordCount > 0) {
          // Obter dados (limitado a 10 registros para não sobrecarregar)
          const limit = 10;
          const dataResult = await client.query(`SELECT * FROM ${fullTableName} LIMIT ${limit}`);
          
          console.log(`\n📝 DADOS (mostrando até ${limit} registros):`);
          console.log('  ' + '-'.repeat(70));
          
          if (dataResult.rows.length > 0) {
            // Mostrar cabeçalho com nomes das colunas
            const columns = Object.keys(dataResult.rows[0]);
            console.log('  ' + columns.map(c => c.padEnd(20)).join(' | '));
            console.log('  ' + '-'.repeat(70));
            
            // Mostrar dados
            dataResult.rows.forEach((row, index) => {
              const values = columns.map(col => {
                let value = row[col];
                if (value === null) return 'NULL'.padEnd(20);
                if (typeof value === 'object') return JSON.stringify(value).substring(0, 18).padEnd(20);
                if (typeof value === 'string' && value.length > 20) return value.substring(0, 17) + '...'.padEnd(20);
                return String(value).padEnd(20);
              });
              console.log(`  ${values.join(' | ')}`);
            });
            
            if (recordCount > limit) {
              console.log(`  ... e mais ${recordCount - limit} registro(s)`);
            }
          }
        } else {
          console.log('\n  ⚠️  Tabela vazia');
        }

        console.log();
      }
    }

    // Resumo final
    console.log('='.repeat(80));
    console.log('📊 RESUMO');
    console.log('='.repeat(80));
    
    let totalTables = 0;
    let totalRecords = 0;
    
    for (const schemaRow of schemasResult.rows) {
      const schemaName = schemaRow.schema_name;
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = $1 
          AND table_type = 'BASE TABLE'
      `, [schemaName]);
      
      for (const tableRow of tablesResult.rows) {
        const tableName = tableRow.table_name;
        const fullTableName = schemaName === 'public' ? tableName : `${schemaName}.${tableName}`;
        const countResult = await client.query(`SELECT COUNT(*) as count FROM ${fullTableName}`);
        const count = parseInt(countResult.rows[0].count, 10);
        totalTables++;
        totalRecords += count;
      }
    }
    
    console.log(`Total de schemas: ${schemasResult.rows.length}`);
    console.log(`Total de tabelas: ${totalTables}`);
    console.log(`Total de registros: ${totalRecords}`);
    console.log('='.repeat(80));

  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error(error);
  } finally {
    await client.end();
  }
}

listTablesAndData();

