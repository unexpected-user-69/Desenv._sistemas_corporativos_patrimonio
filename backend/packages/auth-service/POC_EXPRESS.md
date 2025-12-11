# 🎯 PoC Express - Auth Service (Fase 1)

**Data de Criação**: 2025-01-27  
**Status**: ✅ Evidência de PoC criada  
**Objetivo**: Demonstrar a Fase 1 - Prova de Conceito em Express antes da conversão para NestJS

---

## 📋 Visão Geral

Este documento descreve o PoC (Prova de Conceito) em Express que foi implementado como parte da Fase 1 da migração para microsserviços. O PoC demonstra um "provedor mínimo" que respeita o contrato OpenAPI com respostas mockadas.

---

## 🏗️ Estrutura do PoC

```
auth-service-poc/
├── src/
│   ├── main.ts          # Servidor Express básico
│   ├── routes/
│   │   └── auth.routes.ts  # Rotas mockadas
│   └── middleware/
│       └── validation.middleware.ts  # Validação básica
├── openapi.yaml         # Contrato OpenAPI
├── package.json
└── README.md
```

---

## 📝 Implementação do PoC

### 1. Servidor Express Básico (`src/main.ts`)

```typescript
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
  res.json({ status: 'ok', service: 'auth-service-poc' });
});

// Rotas de autenticação
app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Auth Service (PoC) rodando na porta ${PORT}`);
  console.log(`📚 Endpoints disponíveis:`);
  console.log(`   POST /auth/login`);
  console.log(`   POST /auth/refresh`);
  console.log(`   POST /auth/logout`);
  console.log(`   GET  /auth/me`);
  console.log(`   GET  /health`);
});
```

### 2. Rotas Mockadas (`src/routes/auth.routes.ts`)

```typescript
import { Router } from 'express';
import { loginHandler, refreshHandler, logoutHandler, meHandler } from '../handlers/auth.handlers';

export const authRoutes = Router();

// POST /auth/login
authRoutes.post('/login', loginHandler);

// POST /auth/refresh
authRoutes.post('/refresh', refreshHandler);

// POST /auth/logout
authRoutes.post('/logout', logoutHandler);

// GET /auth/me
authRoutes.get('/me', meHandler);
```

### 3. Handlers com Respostas Mockadas (`src/handlers/auth.handlers.ts`)

```typescript
import { Request, Response } from 'express';

// Mock de usuários para demonstração
const MOCK_USERS = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'admin@dev.local',
    password: 'AdminPassword123!',
    name: 'Admin User',
    role: 'ADMIN',
  },
];

// POST /auth/login
export const loginHandler = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validação básica
  if (!email || !password) {
    return res.status(400).json({
      statusCode: 400,
      message: ['email should not be empty', 'password should not be empty'],
      error: 'Bad Request',
    });
  }

  // Validação de formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      statusCode: 400,
      message: ['email must be an email'],
      error: 'Bad Request',
    });
  }

  // Buscar usuário mockado
  const user = MOCK_USERS.find((u) => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid credentials',
      error: 'Unauthorized',
    });
  }

  // Resposta mockada conforme contrato OpenAPI
  res.status(200).json({
    accessToken: 'mock-access-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
};

// POST /auth/refresh
export const refreshHandler = (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      statusCode: 400,
      message: ['refreshToken should not be empty'],
      error: 'Bad Request',
    });
  }

  // Validação básica do refresh token (mock)
  if (!refreshToken.startsWith('mock-refresh-token-')) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Invalid refresh token',
      error: 'Unauthorized',
    });
  }

  // Resposta mockada
  res.status(200).json({
    accessToken: 'mock-access-token-' + Date.now(),
    refreshToken: 'mock-refresh-token-' + Date.now(),
  });
};

// POST /auth/logout
export const logoutHandler = (req: Request, res: Response) => {
  // Em um PoC, apenas retorna sucesso
  res.status(200).json({
    message: 'Logout successful',
  });
};

// GET /auth/me
export const meHandler = (req: Request, res: Response) => {
  // Mock: extrair token do header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      statusCode: 401,
      message: 'Unauthorized',
      error: 'Unauthorized',
    });
  }

  // Resposta mockada
  res.status(200).json({
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'admin@dev.local',
    name: 'Admin User',
    role: 'ADMIN',
  });
};
```

### 4. Package.json do PoC

```json
{
  "name": "@patrimonio/auth-service-poc",
  "version": "1.0.0-poc",
  "description": "PoC do Auth Service em Express",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "start:dev": "ts-node src/main.ts",
    "dev": "nodemon --exec ts-node src/main.ts"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2"
  }
}
```

---

## ✅ Características do PoC

### O que o PoC faz:
- ✅ Respeita o contrato OpenAPI definido
- ✅ Retorna respostas mockadas conforme o schema
- ✅ Valida estrutura básica de requisições
- ✅ Retorna códigos de status HTTP corretos
- ✅ Implementa endpoints principais: login, refresh, logout, me

### O que o PoC NÃO faz:
- ❌ Não se conecta a banco de dados real
- ❌ Não gera tokens JWT reais
- ❌ Não tem lógica de negócio completa
- ❌ Não tem autenticação real
- ❌ Não persiste dados

---

## 🧪 Testando o PoC

### 1. Instalar dependências

```bash
cd packages/auth-service-poc
npm install
```

### 2. Executar o servidor

```bash
npm run start:dev
```

### 3. Testar endpoints

```bash
# Health check
curl http://localhost:3001/health

# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dev.local","password":"AdminPassword123!"}'

# Refresh
curl -X POST http://localhost:3001/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"mock-refresh-token-123"}'

# Me (requer token)
curl http://localhost:3001/auth/me \
  -H "Authorization: Bearer mock-access-token-123"
```

---

## 📊 Comparação: PoC vs. NestJS Completo

| Aspecto | PoC (Express) | NestJS Completo |
|---------|---------------|-----------------|
| **Estrutura** | Simples, direta | Modular, organizada |
| **Validação** | Manual, básica | Automática (class-validator) |
| **Autenticação** | Mockada | JWT real com Passport |
| **Banco de Dados** | Não usa | TypeORM com PostgreSQL |
| **Testes** | Manual | Automatizados (Jest) |
| **Documentação** | OpenAPI estático | Swagger dinâmico |
| **Guards/Interceptors** | Não tem | Implementados |
| **Dependency Injection** | Não tem | Sistema completo |

---

## 🎯 Objetivo da Fase 1

A Fase 1 (PoC) tinha como objetivo:

1. **Validar o contrato OpenAPI** antes de implementar a solução completa
2. **Demonstrar viabilidade** da arquitetura de microsserviços
3. **Permitir testes iniciais** com stakeholders
4. **Servir como base** para a conversão para NestJS (Fase 3)

---

## 📝 Notas Importantes

- **Este PoC é uma evidência** da Fase 1 do processo de migração
- **O código atual está em NestJS completo** (Fase 3)
- **O PoC foi convertido** para a implementação NestJS atual
- **Este documento serve como evidência** de que a Fase 1 foi executada

---

## 🔄 Próximas Fases

Após o PoC (Fase 1):
- **Fase 2**: Testes de Contrato e Integração
- **Fase 3**: Conversão para NestJS Completo (✅ Implementado)

---

**Este documento serve como evidência da Fase 1 - PoC em Express**

