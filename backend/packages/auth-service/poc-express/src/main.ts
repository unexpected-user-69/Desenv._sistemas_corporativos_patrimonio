/**
 * PoC Express - Auth Service
 * 
 * Este é um Provedor Mínimo (Minimal Provider) que demonstra a Fase 1
 * da migração para microsserviços. Este PoC:
 * - Respeita o contrato OpenAPI
 * - Retorna respostas mockadas
 * - Valida estrutura básica de requisições
 * - Serve como evidência da Fase 1 antes da conversão para NestJS
 */

import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'auth-service-poc',
    version: '1.0.0-poc',
    timestamp: new Date().toISOString(),
  });
});

// Rotas de autenticação
app.use('/auth', authRoutes);

// Middleware de erro básico
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro no PoC:', err);
  res.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
    error: 'Internal Server Error',
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Auth Service (PoC Express) rodando na porta ${PORT}`);
  console.log(`📚 Endpoints disponíveis:`);
  console.log(`   POST /auth/login`);
  console.log(`   POST /auth/refresh`);
  console.log(`   POST /auth/logout`);
  console.log(`   GET  /auth/me`);
  console.log(`   GET  /health`);
  console.log(`\n⚠️  Este é um PoC com respostas mockadas`);
  console.log(`📖 Veja POC_EXPRESS.md para mais detalhes\n`);
});

