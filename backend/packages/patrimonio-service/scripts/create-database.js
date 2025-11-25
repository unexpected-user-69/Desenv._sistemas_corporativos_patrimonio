/**
 * Script para criar o banco de dados do patrimonio-service
 * Execute: node scripts/create-database.js
 */

const { Client } = require('pg');
require('dotenv').config({ path: ['.env.local', '.env'] });

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: 'postgres', // Conecta ao banco padrão para criar o novo
};

const dbName = process.env.DB_NAME || 'patrimonio';

async function createDatabase() {
  const client = new Client(config);

  try {
    console.log('Conectando ao PostgreSQL...');
    await client.connect();
    console.log('✅ Conectado ao PostgreSQL');

    // Verificar se o banco já existe
    const checkResult = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkResult.rows.length > 0) {
      console.log(`✅ Banco de dados "${dbName}" já existe.`);
      return;
    }

    // Criar o banco de dados
    console.log(`Criando banco de dados "${dbName}"...`);
    await client.query(`CREATE DATABASE ${dbName}`);
    console.log(`✅ Banco de dados "${dbName}" criado com sucesso!`);

  } catch (error) {
    if (error.code === '42P04') {
      console.log(`✅ Banco de dados "${dbName}" já existe.`);
    } else {
      console.error('❌ Erro ao criar banco de dados:', error.message);
      process.exit(1);
    }
  } finally {
    await client.end();
  }
}

createDatabase();




