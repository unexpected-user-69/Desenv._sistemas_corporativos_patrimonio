#!/usr/bin/env node

/**
 * Script de preparação para CI
 * Cria arquivos necessários para os testes E2E passarem no ambiente automatizado
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparando ambiente para CI...');

// Criar diretório temporário para testes
const tempDir = path.join(process.cwd(), 'test-temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log('✅ Diretório temporário criado:', tempDir);
}

// Criar arquivo PNG dummy para testes de upload
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

// Arquivos de teste necessários
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
  }
});

// Verificar se há .env para teste
const envPath = path.join(process.cwd(), '.env');
const envTestPath = path.join(process.cwd(), '.env.test');

if (!fs.existsSync(envPath) && fs.existsSync(envTestPath)) {
  fs.copyFileSync(envTestPath, envPath);
  console.log('✅ Arquivo .env copiado de .env.test');
} else if (!fs.existsSync(envPath)) {
  // Criar .env básico para testes
  const basicEnv = `# Ambiente de teste para CI
NODE_ENV=test
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=patrimonio_inventario_test
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
JWT_ACCESS_SECRET=test_secret
JWT_REFRESH_SECRET=test_refresh_secret
USERS_API_URL=http://localhost:3101/v1
PATRIMONIO_SERVICE_URL=http://localhost:3101/v1
`;
  fs.writeFileSync(envPath, basicEnv);
  console.log('✅ Arquivo .env básico criado para testes');
}

console.log('🎉 Preparação para CI concluída com sucesso!');
console.log('📁 Arquivos criados em:', tempDir);
console.log('🧪 Ambiente pronto para execução dos testes E2E.');
