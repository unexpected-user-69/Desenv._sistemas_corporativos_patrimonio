// Polyfill para crypto (necessário para TypeORM)
// No Node.js v18+, crypto já está disponível globalmente
// Não é necessário fazer polyfill

// Carregar .env manualmente antes de tudo para garantir que as variáveis estejam disponíveis
import { config } from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Tenta carregar .env de múltiplos locais
// __dirname em runtime aponta para dist/src, então precisamos subir 3 níveis para chegar ao backend
// process.cwd() aponta para packages/auth-service quando rodando com npm run start:dev
const envPaths = [
  path.join(process.cwd(), '..', '..', '.env'), // packages/auth-service -> packages -> backend -> .env
  path.join(__dirname, '..', '..', '..', '.env'), // dist/src -> dist -> packages/auth-service -> backend
  path.join(__dirname, '..', '..', '..', '..', '.env'), // dist/src -> dist -> packages -> backend
  path.join(process.cwd(), '.env'), // diretório de trabalho atual
  path.join(process.cwd(), '..', '.env'), // um nível acima
  path.resolve(__dirname, '..', '..', '..', '.env'), // caminho absoluto
];

// Primeiro tenta carregar do diretório atual (fallback padrão do dotenv)
config();

// Depois tenta carregar dos caminhos específicos
// Prioriza o .env do backend (raiz) sobre o do auth-service
let loaded = false;
let bestPath = '';
let bestPepper = '';

// Primeiro, tenta carregar do backend (raiz) - prioridade máxima
const backendEnvPath = path.join(process.cwd(), '..', '..', '.env');
if (fs.existsSync(backendEnvPath)) {
  try {
    const result = config({ path: backendEnvPath, override: true });
    const currentPepper = process.env.HASH_PEPPER || '';
    if (!result.error && currentPepper && currentPepper.trim() !== '') {
      console.log(`✅ .env carregado de: ${backendEnvPath}`);
      console.log(`   HASH_PEPPER: ${currentPepper.substring(0, 10)}... (length: ${currentPepper.length})`);
      loaded = true;
    }
  } catch (error) {
    // Continua para outros caminhos
  }
}

// Se não encontrou, tenta outros caminhos
if (!loaded) {
  for (const envPath of envPaths) {
    try {
      if (fs.existsSync(envPath)) {
        const result = config({ path: envPath, override: false });
        const currentPepper = process.env.HASH_PEPPER || '';
        
        if (!result.error && currentPepper && currentPepper.trim() !== '') {
          bestPath = envPath;
          bestPepper = currentPepper;
          // Se não é do auth-service, usa e para
          if (!envPath.includes('auth-service')) {
            process.env.HASH_PEPPER = bestPepper;
            console.log(`✅ .env carregado de: ${bestPath}`);
            console.log(`   HASH_PEPPER: ${bestPepper.substring(0, 10)}... (length: ${bestPepper.length})`);
            loaded = true;
            break;
          }
        }
      }
    } catch (error) {
      // Ignora erros e continua tentando outros caminhos
    }
  }
  
  // Se encontrou um HASH_PEPPER válido mas não carregou ainda, usa ele
  if (!loaded && bestPepper) {
    process.env.HASH_PEPPER = bestPepper;
    console.log(`✅ .env carregado de: ${bestPath}`);
    console.log(`   HASH_PEPPER: ${bestPepper.substring(0, 10)}... (length: ${bestPepper.length})`);
    loaded = true;
  }
}

if (!process.env.HASH_PEPPER) {
  console.warn('⚠️ HASH_PEPPER não encontrado no .env!');
  console.warn(`   __dirname: ${__dirname}`);
  console.warn(`   process.cwd(): ${process.cwd()}`);
  console.warn(`   Caminhos testados:`);
  envPaths.forEach(p => console.warn(`     - ${p}`));
}

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('');

  // ValidationPipe, Interceptors e Filters estão configurados no AppModule
  // via APP_PIPE, APP_INTERCEPTOR e APP_FILTER

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('Serviço de autenticação e autorização para o sistema de patrimônio')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addServer('http://localhost:3001', 'Servidor de desenvolvimento local')
    .addServer('http://auth-service:3001', 'Servidor Docker interno')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Load OpenAPI spec from file for validation
  try {
    const openApiPath = path.join(__dirname, '..', 'openapi.yaml');
    if (fs.existsSync(openApiPath)) {
      console.log('OpenAPI spec encontrado em:', openApiPath);
    }
  } catch (error) {
    console.warn('Não foi possível carregar openapi.yaml:', error);
  }

  const port = parseInt(process.env.PORT || '3001', 10);
  
  // Função para verificar se a porta está livre
  const checkPort = async (portNumber: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const server = require('http').createServer();
      server.listen(portNumber, () => {
        server.once('close', () => resolve(true));
        server.close();
      });
      server.on('error', () => resolve(false));
    });
  };

  // Verificar porta antes de tentar usar
  const portAvailable = await checkPort(port);
  
  if (!portAvailable) {
    console.error(`\n❌ Erro: Porta ${port} já está em uso!`);
    console.error(`\nPara resolver, execute um dos comandos:`);
    console.error(`  1. npm run kill-port:3001`);
    console.error(`  2. Ou encontre e encerre o processo manualmente:`);
    console.error(`     netstat -ano | findstr :${port}`);
    console.error(`     taskkill /PID <PID> /F`);
    console.error(`\nOu use outra porta:`);
    console.error(`  $env:PORT=3002; npm run start:dev\n`);
    process.exit(1);
  }
  
  try {
    await app.listen(port);
    console.log(`✅ Auth Service está rodando em: http://localhost:${port}`);
    console.log(`📖 Swagger está disponível em: http://localhost:${port}/api`);
  } catch (error: any) {
    if (error.code === 'EADDRINUSE') {
      console.error(`\n❌ Erro: Porta ${port} já está em uso!`);
      console.error(`\nExecute: npm run kill-port:3001\n`);
      process.exit(1);
    }
    throw error;
  }
}

bootstrap();

