#!/usr/bin/env node

/**
 * Script de preparação para CI
 * Cria arquivos de imagem dummy necessários para os testes E2E
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

console.log('🚀 Preparando arquivos de imagem dummy para testes E2E...');

// Criar diretório temporário para testes
const tempDir = path.join(process.cwd(), 'test-temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log('✅ Diretório temporário criado:', tempDir);
}

// Criar arquivo PNG dummy simples (1x1 pixel transparente)
const dummyPngBuffer = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  0x00, 0x00, 0x00, 0x0D, // IHDR length
  0x49, 0x48, 0x44, 0x52, // IHDR
  0x00, 0x00, 0x00, 0x01, // width: 1
  0x00, 0x00, 0x00, 0x01, // height: 1
  0x08, 0x06, 0x00, 0x00, 0x00, // bit depth, color type, compression, filter, interlace
  0x1F, 0x15, 0xC4, 0x89, // CRC
  0x00, 0x00, 0x00, 0x0A, // IDAT length
  0x49, 0x44, 0x41, 0x54, // IDAT
  0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01, // compressed data
  0x0D, 0x0A, 0x2D, 0xB4, // CRC
  0x00, 0x00, 0x00, 0x00, // IEND length
  0x49, 0x45, 0x4E, 0x44, // IEND
  0xAE, 0x42, 0x60, 0x82  // CRC
]);

// Arquivos de teste necessários pelos testes E2E
const testFiles = [
  'foto_para_teste.jpg',
  'foto_para_teste.png',
  'foto_para_teste.webp'
];

testFiles.forEach(filename => {
  const filePath = path.join(tempDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, dummyPngBuffer);
    console.log('✅ Arquivo de teste criado:', filename);
  } else {
    console.log('ℹ️  Arquivo já existe:', filename);
  }
});

console.log('🎉 Preparação de arquivos dummy concluída!');
console.log('📁 Arquivos criados em:', tempDir);

// Criar banco de teste se não existir (idempotente)
async function ensureDatabase(dbName) {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '5432', 10);
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS || 'postgres';

  const client = new Client({
    host,
    port,
    user,
    password,
    database: 'postgres',
  });

  try {
    await client.connect();
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Banco criado: ${dbName}`);
    } else {
      console.log(`ℹ️  Banco já existe: ${dbName}`);
    }
  } catch (err) {
    console.warn(`⚠️  Não foi possível garantir banco ${dbName}: ${err.message}`);
  } finally {
    await client.end().catch(() => {});
  }
}

/**
 * Garante a existência de um usuário padrão usado em vários testes E2E
 * (evita erros de FK/NOT NULL em owner_id/created_by_id).
 */
async function ensureDefaultTestUser(dbName) {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '5432', 10);
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS || 'postgres';

  const client = new Client({
    host,
    port,
    user,
    password,
    database: dbName,
  });

  const defaultId = '00000000-0000-0000-0000-000000000001';
  const defaultEmail = 'ci-default@example.com';
  const defaultPasswordHash = 'hash';

  try {
    await client.connect();
    await client.query(
      `INSERT INTO users (id, name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES ($1, 'CI Default User', $2, $3, 'ADMIN', true, NOW(), NOW())
       ON CONFLICT (id) DO NOTHING`,
      [defaultId, defaultEmail, defaultPasswordHash],
    );
    console.log('✅ Usuário padrão para testes garantido:', defaultEmail);
  } catch (err) {
    console.warn(`⚠️  Não foi possível criar usuário padrão de teste: ${err.message}`);
  } finally {
    await client.end().catch(() => {});
  }
}

(async () => {
  const dbName = 'patrimonio_inventario_test';
  await ensureDatabase(dbName);
  await ensureDefaultTestUser(dbName);
})();