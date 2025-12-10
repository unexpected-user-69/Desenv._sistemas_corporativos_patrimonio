// Bootstrap file to load crypto globally before starting the app
globalThis.crypto = require('crypto');

// Try different possible paths for the compiled main.js
const path = require('path');
const fs = require('fs');

// Possible paths for main.js
const possiblePaths = [
  './dist/main.js',
  './dist/src/main.js',
  path.join(__dirname, 'dist', 'main.js'),
  path.join(__dirname, 'dist', 'src', 'main.js'),
];

let mainPath = null;
for (const testPath of possiblePaths) {
  const fullPath = path.isAbsolute(testPath) ? testPath : path.join(__dirname, testPath);
  if (fs.existsSync(fullPath)) {
    mainPath = testPath;
    break;
  }
}

if (!mainPath) {
  console.error('Erro: Não foi possível encontrar o arquivo main.js compilado.');
  console.error('Caminhos testados:');
  possiblePaths.forEach(p => console.error(`  - ${p}`));
  process.exit(1);
}

require(mainPath);

