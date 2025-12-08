#!/usr/bin/env ts-node

/**
 * Script para verificar schemas e tabelas no banco de dados
 * 
 * Uso:
 *   npx ts-node -r tsconfig-paths/register scripts/verify-schemas.ts
 */

import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '../.env') });

async function verifySchemas() {
  // Conectar ao banco usando configuração padrão
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'patrimonio_inventario',
  });

  try {
    await dataSource.initialize();
    console.log('✅ Conectado ao banco de dados\n');

    // Listar todos os schemas (exceto os do sistema)
    console.log('📋 SCHEMAS CRIADOS:');
    console.log('='.repeat(60));
    const schemas = await dataSource.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast', 'pg_temp_1', 'pg_toast_temp_1')
      ORDER BY schema_name;
    `);
    
    const expectedSchemas = ['auth', 'users', 'events', 'audit', 'categorias', 'patrimonio', 'public'];
    const foundSchemas = schemas.map((row: any) => row.schema_name);
    
    for (const schema of expectedSchemas) {
      const exists = foundSchemas.includes(schema);
      const icon = exists ? '✅' : '❌';
      console.log(`${icon} ${schema.padEnd(20)} ${exists ? 'EXISTE' : 'NÃO ENCONTRADO'}`);
    }
    
    console.log('\n📊 TABELAS POR SCHEMA:');
    console.log('='.repeat(60));
    
    // Listar tabelas por schema
    const tables = await dataSource.query(`
      SELECT 
        table_schema,
        table_name,
        (SELECT COUNT(*) 
         FROM information_schema.columns 
         WHERE table_schema = t.table_schema 
         AND table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        AND table_type = 'BASE TABLE'
      ORDER BY table_schema, table_name;
    `);
    
    let currentSchema = '';
    for (const table of tables) {
      if (table.table_schema !== currentSchema) {
        currentSchema = table.table_schema;
        console.log(`\n📁 Schema: ${currentSchema.toUpperCase()}`);
        console.log('-'.repeat(60));
      }
      console.log(`  ✅ ${table.table_name.padEnd(40)} (${table.column_count} colunas)`);
    }
    
    console.log('\n📈 RESUMO:');
    console.log('='.repeat(60));
    
    const summary = await dataSource.query(`
      SELECT 
        table_schema,
        COUNT(*) as tabelas
      FROM information_schema.tables
      WHERE table_schema NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
        AND table_type = 'BASE TABLE'
      GROUP BY table_schema
      ORDER BY table_schema;
    `);
    
    for (const row of summary) {
      console.log(`  ${row.table_schema.padEnd(20)}: ${row.tabelas} tabela(s)`);
    }
    
    // Verificar se os schemas esperados existem
    console.log('\n🔍 VALIDAÇÃO:');
    console.log('='.repeat(60));
    let allOk = true;
    for (const schema of ['auth', 'users', 'events', 'audit', 'categorias', 'patrimonio']) {
      const exists = foundSchemas.includes(schema);
      if (!exists) {
        allOk = false;
        console.log(`❌ Schema '${schema}' NÃO encontrado`);
      } else {
        const schemaTables = tables.filter((t: any) => t.table_schema === schema);
        if (schemaTables.length === 0) {
          allOk = false;
          console.log(`⚠️  Schema '${schema}' existe mas não tem tabelas`);
        } else {
          console.log(`✅ Schema '${schema}' OK (${schemaTables.length} tabela(s))`);
        }
      }
    }
    
    if (allOk) {
      console.log('\n🎉 Todos os schemas estão implementados corretamente!');
    } else {
      console.log('\n⚠️  Alguns schemas precisam de atenção.');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar schemas:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

verifySchemas();

