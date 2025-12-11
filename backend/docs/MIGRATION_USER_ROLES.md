# 🔄 Migration de Roles de Usuário

## 📋 Resumo

Esta migration atualiza os nomes das roles de usuário de termos educacionais para termos relacionados a patrimônio e inventário:

- **TEACHER** → **MANAGER** (Gerente de Patrimônio)
- **STUDENT** → **OPERATOR** (Operador de Inventário)
- **ADMIN** → Mantido (Administrador)

## 🎯 Motivo da Mudança

O sistema é de **patrimônio e inventário**, não um sistema educacional. Os nomes das roles devem refletir a natureza do negócio.

## 📝 Mudanças Realizadas

### 1. Enum UserRole

**Arquivo**: `src/users/enums/user-role.enum.ts`

```typescript
// ANTES
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

// DEPOIS
export enum UserRole {
  OPERATOR = 'OPERATOR',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}
```

### 2. Migration do Banco de Dados

**Arquivo**: `src/database/migrations/1762440000000-UpdateUserRoles.ts`

- Atualiza `TEACHER` → `MANAGER` na tabela `users`
- Atualiza `STUDENT` → `OPERATOR` na tabela `users`
- Mantém compatibilidade com dados existentes

### 3. Controllers Atualizados

Todos os controllers foram atualizados para usar as novas roles:

- `MaintenanceController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `PatrimonioController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `UsersController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `CategoriasController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `EventsController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `AuditController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `ReportsController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `NotificationsController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `InventoryMobileController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`
- `IntegrationsErpController`: `TEACHER` → `MANAGER`, `STUDENT` → `OPERATOR`

### 4. Helpers de Teste Atualizados

**Arquivo**: `test/helpers/auth-helper.ts`

- `teacherToken` → `managerToken`
- `studentToken` → `operatorToken`
- `teacherUserId` → `managerUserId`
- `studentUserId` → `operatorUserId`
- `teacherEmail` → `managerEmail`
- `studentEmail` → `operatorEmail`

### 5. Frontend Atualizado

**Arquivo**: `frontend/src/types/user.ts`

- Enum `UserRole` atualizado para `OPERATOR`, `MANAGER`, `ADMIN`

### 6. Enums Controller Atualizado

**Arquivo**: `src/common/controllers/enums.controller.ts`

- Endpoint `GET /v1/enums/roles` atualizado com novos nomes e descrições

## 🚀 Como Aplicar a Migration

### 1. Executar Migration

```bash
# Desenvolvimento
npm run migration:run

# Ou via script
npm run migration:run:script
```

### 2. Verificar Dados

```sql
-- Verificar usuários atualizados
SELECT id, email, role, name FROM users;

-- Verificar contagem por role
SELECT role, COUNT(*) as total FROM users GROUP BY role;
```

### 3. Rollback (se necessário)

```bash
# Reverter migration
npm run migration:revert
```

## ✅ Checklist de Validação

- [x] Enum `UserRole` atualizado
- [x] Migration criada para atualizar dados no banco
- [x] Todos os controllers atualizados
- [x] Helpers de teste atualizados
- [x] Frontend atualizado
- [x] Enums controller atualizado
- [x] Documentação atualizada
- [ ] Migration executada no banco de dados
- [ ] Testes E2E atualizados e passando
- [ ] Frontend testado com novas roles

## 🔍 Verificação

### Backend

```bash
# Verificar se não há mais referências a TEACHER/STUDENT
grep -r "UserRole.TEACHER\|UserRole.STUDENT" src/
grep -r "TEACHER\|STUDENT" src/controllers/
```

### Frontend

```bash
# Verificar se frontend está atualizado
grep -r "TEACHER\|STUDENT" frontend/src/
```

### Testes

```bash
# Executar testes para verificar se estão passando
npm run test:e2e
```

## 📚 Documentação Atualizada

- [x] `STRATEGY_E2E_TESTING.md` - Atualizado com novas roles
- [x] `EXEMPLO_MIGRACAO.md` - Atualizado com novas roles
- [x] `MIGRATION_USER_ROLES.md` - Este arquivo

## ⚠️ Observações Importantes

1. **Dados Existentes**: A migration atualiza automaticamente os dados existentes no banco
2. **Tokens JWT**: Tokens existentes continuarão funcionando, mas novos tokens usarão as novas roles
3. **Frontend**: O frontend precisa ser atualizado para usar as novas roles
4. **Testes**: Todos os testes E2E precisam ser atualizados para usar as novas roles

## 🎯 Próximos Passos

1. ✅ Executar migration no banco de dados
2. ✅ Atualizar testes E2E que referenciam TEACHER/STUDENT
3. ✅ Validar que todos os endpoints funcionam com novas roles
4. ✅ Atualizar documentação da API (Swagger)
5. ✅ Testar frontend com novas roles

---

**Data da Migration**: 2025-01-08
**Versão**: 1.0.0


