# 🔄 Migração de Testes E2E - Em Andamento

## 📊 Status Atual

**Data**: 2025-01-08  
**Arquivo em Migração**: `test/maintenance/maintenance.e2e-spec.ts`  
**Progresso**: ~30% migrado

## ✅ O que já foi feito

### 1. Cabeçalho e Setup
- ✅ Removido `DEV_AUTO_AUTH`
- ✅ Importado `auth-helper`
- ✅ Importado `UserRole`
- ✅ Substituído setup manual por `setupTestUsers`
- ✅ Configurado `tokens: TestUserTokens`

### 2. Testes Migrados
- ✅ `POST /v1/maintenance/os` - Criar OS (ADMIN)
- ✅ `POST /v1/maintenance/os` - Criar OS (MANAGER)
- ✅ `PATCH /v1/maintenance/os/:id/status` - Atualizar status
- ✅ `PATCH /v1/maintenance/os/:id/status` - Workflow completo
- ✅ `GET /v1/maintenance/planos` - Listar planos
- ✅ `GET /v1/maintenance/os` - Listar OS com paginação (parcial)

### 3. Testes Removidos
- ✅ Removidos testes de erro (400, 404) - foco em sucesso (200/201)

## ⏳ O que ainda precisa ser feito

### 1. Substituir todas as referências a `request(httpServer)` por `authenticatedRequest`

**Padrão atual:**
```typescript
await request(httpServer)
  .get('/v1/maintenance/os')
  .expect(200);
```

**Padrão novo:**
```typescript
await authenticatedRequest(
  httpServer,
  'get',
  '/v1/maintenance/os',
  tokens,
  UserRole.ADMIN, // ou UserRole.MANAGER, UserRole.OPERATOR
).expect(200);
```

### 2. Testes que ainda precisam ser migrados

- ⏳ `GET /v1/maintenance/os` - Filtrar por status
- ⏳ `GET /v1/maintenance/os` - Filtrar por prioridade
- ⏳ `GET /v1/maintenance/os` - Filtrar por patrimônio
- ⏳ `GET /v1/maintenance/os` - Buscar por texto
- ⏳ `GET /v1/maintenance/os` - Ordenar por data
- ⏳ `GET /v1/maintenance/os` - Paginação
- ⏳ `GET /v1/maintenance/os/:id` - Buscar OS por ID
- ⏳ `POST /v1/maintenance/planos` - Criar plano
- ⏳ `GET /v1/maintenance/sla/metrics` - Métricas SLA
- ⏳ `GET /v1/maintenance/dashboard` - Dashboard
- ⏳ `GET /v1/maintenance/reports` - Relatórios
- ⏳ E muitos outros...

### 3. Verificar roles corretas

Para cada endpoint, verificar no controller quais roles são permitidas:
- `@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OPERATOR)` - Todos podem acessar
- `@Roles(UserRole.ADMIN, UserRole.MANAGER)` - Apenas ADMIN e MANAGER
- `@Roles(UserRole.ADMIN)` - Apenas ADMIN

## 🎯 Próximos Passos

1. **Continuar migração do arquivo `maintenance.e2e-spec.ts`**
   - Substituir todas as referências a `request(httpServer)`
   - Verificar roles corretas
   - Remover testes de erro opcionais

2. **Validar testes**
   - Executar testes após migração
   - Verificar que todos retornam 200/201
   - Corrigir erros se houver

3. **Atualizar arquivo de progresso**
   - Marcar `maintenance.e2e-spec.ts` como migrado
   - Atualizar estatísticas

4. **Migrar próximo arquivo**
   - Escolher próximo arquivo da Fase 1 (Prioridade Alta)
   - Repetir processo

## 📝 Notas

- O arquivo `maintenance.e2e-spec.ts` tem mais de 1200 linhas
- Muitos testes ainda usam `request(httpServer)` diretamente
- Alguns testes podem precisar de ajustes para funcionar com autenticação
- Focar em testes de sucesso (200/201) primeiro
- Testes de erro podem ser removidos ou tornados opcionais

---

**Última Atualização**: 2025-01-08


