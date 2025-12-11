#!/usr/bin/env node

/**
 * Script de preparação para CI
 * Cria arquivos de imagem dummy necessários para os testes E2E
 */

const fs = require('fs');
const path = require('path');

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