# 📋 Explicação dos Códigos HTTP nos Testes

## O que são códigos HTTP?

Os códigos HTTP são números que o servidor retorna para indicar o resultado de uma requisição. Cada código tem um significado específico.

---

## ✅ 200 OK - Sucesso

**O que significa:** A requisição foi processada com sucesso.

**Exemplo prático:**
```typescript
// Teste: "should return paginated executions"
GET /v1/integrations/executions?page=1&limit=20

// Resposta esperada: 200 OK
// Retorna a lista de execuções com sucesso
```

**Quando acontece:**
- Listar execuções ✅
- Obter detalhes de uma execução ✅
- Obter métricas ✅
- Obter health check ✅

---

## ✅ 201 Created - Criado com Sucesso

**O que significa:** Um novo recurso foi criado com sucesso.

**Exemplo prático:**
```typescript
// Teste: "should create and queue an integration execution"
POST /v1/integrations/run
Body: {
  "connectorKey": "test-connector",
  "type": "import",
  "entity": "assets"
}

// Resposta esperada: 201 Created
// Retorna: { "executionId": "uuid", "status": "queued" }
```

**Quando acontece:**
- Criar uma nova execução de integração ✅

---

## ⚠️ 400 Bad Request - Requisição Inválida

**O que significa:** A requisição está malformada ou contém dados inválidos. **É um erro do CLIENTE** (quem fez a requisição).

### Exemplo 1: Dados Inválidos (Validação)

```typescript
// Teste: "should return 400 for invalid data"
POST /v1/integrations/run
Body: {
  "connectorKey": "",           // ❌ VAZIO - inválido
  "type": "invalid-type"        // ❌ TIPO INVÁLIDO - não existe
}

// Resposta esperada: 400 Bad Request
// Motivo: Os dados enviados não atendem às regras de validação
```

**O que está errado:**
- `connectorKey` está vazio (deveria ter um valor)
- `type` é "invalid-type" (deveria ser "import" ou "export")

### Exemplo 2: Erro de Negócio (Regra de Negócio)

```typescript
// Teste: "should return 400 for disabled connector"
POST /v1/integrations/run
Body: {
  "connectorKey": "disabled-connector",  // ✅ Existe no banco
  "type": "import",                      // ✅ Válido
  "entity": "assets"                     // ✅ Válido
}

// Resposta esperada: 400 Bad Request
// Motivo: O conector existe, mas está DESABILITADO (enabled: false)
// Regra de negócio: não podemos executar integrações com conectores desabilitados
```

**O que está errado:**
- Os dados estão corretos (formato válido)
- Mas a regra de negócio impede: conector desabilitado não pode executar integrações

**Código no serviço:**
```typescript
// src/integrations-erp/integrations-erp.service.ts
if (!connector.enabled) {
  throw new BadRequestException(
    `Connector "${dto.connectorKey}" is disabled`,
  );
}
```

---

## ❌ 404 Not Found - Recurso Não Encontrado

**O que significa:** O recurso solicitado não existe no servidor.

### Exemplo 1: Conector Não Existe

```typescript
// Teste: "should return 404 for non-existent connector"
POST /v1/integrations/run
Body: {
  "connectorKey": "conector-que-nao-existe",  // ❌ Não existe no banco
  "type": "import",
  "entity": "assets"
}

// Resposta esperada: 404 Not Found
// Motivo: Não existe nenhum conector com a chave "conector-que-nao-existe"
```

**O que está errado:**
- O conector solicitado não existe no banco de dados

**Código no serviço:**
```typescript
// src/integrations-erp/integrations-erp.service.ts
if (!connector) {
  throw new NotFoundException(
    `Connector with key "${dto.connectorKey}" not found`,
  );
}
```

### Exemplo 2: Execução Não Existe

```typescript
// Teste: "should return 404 for non-existent execution"
GET /v1/integrations/executions/00000000-0000-0000-0000-000000000000

// Resposta esperada: 404 Not Found
// Motivo: Não existe nenhuma execução com esse ID
```

### Exemplo 3: Métricas de Conector Inexistente

```typescript
// Teste: "should return 404 for non-existent connector metrics"
GET /v1/integrations/metrics?connectorKey=conector-inexistente

// Resposta esperada: 404 Not Found
// Motivo: Tentamos buscar métricas de um conector que não existe
```

**Código no serviço:**
```typescript
// src/integrations-erp/observability/integration-metrics.service.ts
if (!connector) {
  throw new NotFoundException(`Connector ${connectorKey} not found`);
}
```

---

## 📊 Resumo dos Códigos HTTP

| Código | Significado | Quando Usar | Exemplo |
|--------|-------------|-------------|---------|
| **200** | OK | Requisição bem-sucedida | Listar execuções |
| **201** | Created | Recurso criado | Criar nova execução |
| **400** | Bad Request | Dados inválidos ou regra de negócio violada | Conector desabilitado, dados inválidos |
| **404** | Not Found | Recurso não existe | Conector/execução não encontrado |

---

## 🔍 Diferença entre 400 e 404

### 400 Bad Request
- **Problema:** A requisição está errada ou viola regras de negócio
- **Exemplos:**
  - Dados faltando ou inválidos
  - Conector desabilitado (existe, mas não pode ser usado)
  - Validação falhou

### 404 Not Found
- **Problema:** O recurso solicitado não existe
- **Exemplos:**
  - Conector não existe no banco
  - Execução não existe no banco
  - ID inválido ou não encontrado

---

## ✅ Validação nos Testes

Todos os testes verificam que os endpoints retornam os códigos HTTP corretos:

1. **200/201** - Quando tudo está correto ✅
2. **400** - Quando há erro de validação ou regra de negócio ✅
3. **404** - Quando o recurso não existe ✅

Isso garante que a API está funcionando corretamente e retornando as respostas esperadas!

