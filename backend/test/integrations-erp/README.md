# Testes E2E - integrations-erp

## ⚠️ Pré-requisitos

Antes de executar os testes e2e, é necessário:

1. **Banco de dados configurado**: O banco de dados PostgreSQL deve estar rodando
2. **Migrações executadas**: Todas as migrações devem estar aplicadas no banco de dados

### Executar migrações antes dos testes

```bash
# Opção 1: Usando o script npm
npm run migration:run

# Opção 2: Usando o script TypeScript
npm run migration:run:script
```

### Verificar se as tabelas existem

```sql
-- Conectar ao banco de dados
psql -U postgres -d patrimonio_inventario

-- Verificar se as tabelas existem
\dt connectors
\dt executions
\dt execution_logs
```

## ✅ Cenários de Erro Testados

Os testes validam os seguintes cenários de erro:

### 1. 404 - Conector não encontrado
- **Endpoint**: `POST /v1/integrations/run`
- **Teste**: `should return 404 for non-existent connector`
- **Comportamento esperado**: Retorna 404 quando o `connectorKey` não existe

### 2. 400 - Dados inválidos
- **Endpoint**: `POST /v1/integrations/run`
- **Teste**: `should return 400 for invalid data`
- **Comportamento esperado**: Retorna 400 quando:
  - `connectorKey` está vazio
  - `type` é inválido
  - Campos obrigatórios estão faltando

### 3. 400 - Conector desabilitado
- **Endpoint**: `POST /v1/integrations/run`
- **Teste**: `should return 400 for disabled connector`
- **Comportamento esperado**: Retorna 400 quando o conector existe mas está com `enabled: false`

## 🔍 Implementação dos Erros

### No Serviço (`integrations-erp.service.ts`)

```typescript
// 404 - Conector não encontrado
if (!connector) {
  throw new NotFoundException(
    `Connector with key "${dto.connectorKey}" not found`,
  );
}

// 400 - Conector desabilitado
if (!connector.enabled) {
  throw new BadRequestException(
    `Connector "${dto.connectorKey}" is disabled`,
  );
}
```

### No Controller (`integrations-erp.controller.ts`)

O controller usa o `ValidationPipe` global que automaticamente retorna 400 para dados inválidos baseado nos decorators do DTO:

```typescript
@IsString()
@IsNotEmpty()
connectorKey!: string;

@IsEnum(ExecutionType)
type!: ExecutionType;
```

## 🧪 Executar Testes

```bash
# Executar todos os testes e2e
npm run test:e2e

# Executar apenas os testes de integrations-erp
npm run test:e2e -- integrations-erp

# Executar testes específicos de erro
npm run test:e2e -- integrations-erp --testNamePattern="should return 404|should return 400"
```

## 📝 Notas

- Os testes criam dados de teste no `beforeAll` e limpam no `afterAll`
- O conector de teste é criado automaticamente com a chave `test-connector`
- Testes de erro não requerem autenticação (mas podem falhar se os guards estiverem ativos)





