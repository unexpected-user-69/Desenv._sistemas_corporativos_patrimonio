# 🧪 Como Executar Testes E2E

## 📋 Pré-requisitos

Antes de executar os testes E2E, certifique-se de que:

1. ✅ **Banco de dados PostgreSQL está rodando**
   ```powershell
   # Verificar se o Docker está rodando o banco
   docker-compose ps db
   
   # Ou iniciar o banco se não estiver rodando
   docker-compose up db -d
   ```

2. ✅ **Migrações do banco foram executadas**
   ```powershell
   npm run migration:run
   ```

3. ✅ **Redis está rodando** (se necessário para BullMQ)
   ```powershell
   npm run redis:start
   # ou
   docker-compose up redis -d
   ```

4. ✅ **Variáveis de ambiente configuradas**
   - Verifique se existe um arquivo `.env` ou `.env.test` no diretório `backend/`
   - As variáveis devem apontar para o banco de dados de teste

## 🚀 Comandos para Executar Testes E2E

### 1. Executar TODOS os testes E2E

```powershell
cd backend
npm run test:e2e
```

### 2. Executar um arquivo específico de teste E2E

```powershell
cd backend
npm run test:e2e -- test/auth/auth.e2e-spec.ts
```

### 3. Executar testes de um módulo específico

```powershell
# Testes de autenticação
npm run test:e2e -- test/auth

# Testes de usuários
npm run test:e2e -- test/users

# Testes de patrimônio
npm run test:e2e -- test/patrimonio

# Testes de relatórios
npm run test:e2e -- test/reports
```

### 4. Executar em modo watch (observa mudanças)

```powershell
npm run test:e2e -- --watch
```

### 5. Executar com cobertura de código

```powershell
npm run test:e2e -- --coverage
```

### 6. Executar um teste específico por nome

```powershell
npm run test:e2e -- -t "deve fazer login com sucesso"
```

## 📁 Arquivos de Teste E2E Disponíveis

O projeto possui os seguintes arquivos de teste E2E:

- ✅ `test/app.e2e-spec.ts` - Testes básicos da aplicação
- ✅ `test/auth/auth.e2e-spec.ts` - Testes de autenticação
- ✅ `test/users/users.e2e-spec.ts` - Testes de usuários
- ✅ `test/patrimonio/patrimonio-completo.e2e-spec.ts` - Testes completos de patrimônio
- ✅ `test/patrimonio/patrimonio-fases.e2e-spec.ts` - Testes de fases de patrimônio
- ✅ `test/reports/reports.e2e-spec.ts` - Testes de relatórios
- ✅ `test/notifications/notifications.e2e-spec.ts` - Testes de notificações
- ✅ `test/events/events.e2e-spec.ts` - Testes de eventos
- ✅ `test/integrations-erp/integrations-erp.e2e-spec.ts` - Testes de integrações ERP
- ✅ `test/inventory-mobile/inventory-mobile.e2e-spec.ts` - Testes de inventário mobile
- ✅ `test/maintenance/maintenance.e2e-spec.ts` - Testes de manutenção
- ✅ `test/cache/cache.e2e-spec.ts` - Testes de cache
- ✅ `test/metrics/metrics.e2e-spec.ts` - Testes de métricas
- ✅ `test/audit/audit.e2e-spec.ts` - Testes de auditoria
- ✅ `test/categorias/categorias.e2e-spec.ts` - Testes de categorias
- ✅ `test/reports-catalog/reports-catalog.e2e-spec.ts` - Testes de catálogo de relatórios
- ✅ `test/reports-metrics/reports-metrics.e2e-spec.ts` - Testes de métricas de relatórios

## 🔍 Testes Manuais (usando o arquivo test-auth-endpoints.md)

O arquivo `test-auth-endpoints.md` contém testes **manuais** que você pode executar usando `curl` ou PowerShell:

### Exemplo: Teste de Login (PowerShell)

```powershell
# Obter token de desenvolvimento
$response = Invoke-RestMethod -Uri "http://localhost:3101/v1/auth/dev-token" -Method POST -Headers @{"Content-Type"="application/json"}
$token = $response.accessToken

# Testar endpoint /auth/me
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}
Invoke-RestMethod -Uri "http://localhost:3101/v1/auth/me" -Method GET -Headers $headers
```

### Exemplo: Teste de Login (curl)

```bash
curl -X POST http://localhost:3101/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@exemplo.com",
    "password": "Senha123"
  }'
```

## ⚙️ Configuração dos Testes E2E

Os testes E2E usam a configuração em `test/jest-e2e.json`:

- **Timeout**: 120 segundos (2 minutos) por teste
- **Padrão de arquivos**: `*.e2e-spec.ts`
- **Setup**: `test/jest-e2e-setup.ts`

## 🐛 Resolução de Problemas

### Erro: "Cannot connect to database"

**Solução**: Certifique-se de que o PostgreSQL está rodando:
```powershell
docker-compose up db -d
```

### Erro: "Migration not found"

**Solução**: Execute as migrações:
```powershell
npm run migration:run
```

### Erro: "Redis connection failed"

**Solução**: Inicie o Redis:
```powershell
npm run redis:start
```

### Timeout nos testes

**Solução**: Os testes têm timeout de 120 segundos. Se ainda assim falhar, verifique:
- Conexão com o banco de dados
- Performance do sistema
- Logs do backend para erros

## 📊 Ver Resultados

Após executar os testes, você verá:

- ✅ Testes que passaram
- ❌ Testes que falharam (com mensagens de erro)
- ⏱️ Tempo de execução de cada teste
- 📈 Cobertura de código (se usar `--coverage`)

## 🔗 Links Úteis

- **Swagger**: http://localhost:3101/docs
- **API Health**: http://localhost:3101/v1/health
- **Documentação de Estratégia E2E**: `docs/STRATEGY_E2E_TESTING.md`

---

**Nota**: Certifique-se de que o backend está rodando (`npm run start:dev`) antes de executar os testes manuais do arquivo `test-auth-endpoints.md`.

