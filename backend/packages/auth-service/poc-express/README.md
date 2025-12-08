# 🎯 PoC Express - Auth Service

**Fase 1**: Prova de Conceito (PoC) em Express  
**Status**: ✅ Evidência criada  
**Data**: 2025-01-27

---

## 📋 Sobre este PoC

Este é um **Provedor Mínimo (Minimal Provider)** que demonstra a Fase 1 da migração para microsserviços. Este PoC foi criado como evidência de que a Fase 1 foi executada antes da conversão para NestJS completo.

### Características:
- ✅ Respeita o contrato OpenAPI
- ✅ Retorna respostas mockadas
- ✅ Valida estrutura básica de requisições
- ✅ Implementa endpoints principais

### Limitações (intencionais):
- ❌ Não usa banco de dados real
- ❌ Não gera tokens JWT reais
- ❌ Não tem lógica de negócio completa

---

## 🚀 Como Executar

### 1. Instalar dependências

```bash
cd packages/auth-service/poc-express
npm install
```

### 2. Executar o servidor

```bash
npm run start:dev
```

O servidor iniciará na porta `3001` (ou a porta definida em `PORT`).

---

## 🧪 Testar Endpoints

### Health Check

```bash
curl http://localhost:3001/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "service": "auth-service-poc",
  "version": "1.0.0-poc",
  "timestamp": "2025-01-27T..."
}
```

### Login

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dev.local",
    "password": "AdminPassword123!"
  }'
```

**Resposta esperada:**
```json
{
  "accessToken": "mock-access-token-1234567890",
  "refreshToken": "mock-refresh-token-1234567890",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "admin@dev.local",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

### Refresh Token

```bash
curl -X POST http://localhost:3001/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "mock-refresh-token-1234567890"
  }'
```

### Me (obter usuário autenticado)

```bash
curl http://localhost:3001/auth/me \
  -H "Authorization: Bearer mock-access-token-1234567890"
```

### Logout

```bash
curl -X POST http://localhost:3001/auth/logout \
  -H "Content-Type: application/json"
```

---

## 📊 Comparação: PoC vs. NestJS

| Aspecto | PoC (Express) | NestJS Completo |
|---------|---------------|-----------------|
| Estrutura | Simples | Modular |
| Validação | Manual | Automática |
| Autenticação | Mockada | JWT real |
| Banco de Dados | Não usa | TypeORM |
| Testes | Manual | Automatizados |

---

## 📝 Notas

- Este PoC serve como **evidência da Fase 1**
- O código atual está em **NestJS completo** (Fase 3)
- Este PoC foi **convertido** para a implementação NestJS atual

---

**Veja `POC_EXPRESS.md` para documentação completa**

