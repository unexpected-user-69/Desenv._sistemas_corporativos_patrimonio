# Correções Necessárias nos Testes E2E

## Problemas Encontrados e Soluções

### 1. Estrutura de Resposta (TransformResponseInterceptor)
**Problema**: A resposta vem com estrutura `{ data: { data: [...], total: ..., page: ... } }`

**Correção**: Ajustar todos os testes para:
```typescript
// Ao invés de:
expect(response.body.data).toBeInstanceOf(Array);
expect(response.body.total).toBeDefined();

// Usar:
expect(response.body.data.data).toBeInstanceOf(Array);
expect(response.body.data.total).toBeDefined();
```

### 2. GET /patrimonio é Público
**Problema**: O endpoint não tem `@UseGuards(JwtAuthGuard)`, então está público

**Correção**: Remover testes que esperam 401 ou adicionar guard no controller

### 3. Filtro por Código não Existe
**Problema**: `QueryPatrimonioDto` não tem campo `codigo`

**Correção**: Usar busca textual `q` ao invés de `codigo`:
```typescript
.query({ q: 'TEST-E2E-001' })
```

### 4. Limite Máximo
**Problema**: `limit` tem `@Max(100)`, então valores acima retornam 400

**Correção**: Teste está correto, mas deve esperar 400:
```typescript
.query({ limit: 200 })
.expect(400); // Ao invés de 200
```

### 5. Query Params Obrigatórios
**Problema**: Vários endpoints precisam de query params obrigatórios

**Correções**:
- `GET /patrimonio/aquisicao-periodo`: `dataInicial` e `dataFinal` são obrigatórios
- `GET /patrimonio/valor-range`: `valorMinimo` e `valorMaximo` são obrigatórios
- `GET /patrimonio/status-multiplos`: `status` deve ser array (usar `status[]=ATIVO&status[]=MANUTENCAO`)
- `GET /patrimonio/categorias-multiplas`: `categoriaIds` deve ser array (usar `categoriaIds[]=...`)

### 6. Query Params Opcionais com Valores Padrão
**Correções**:
- `GET /patrimonio/garantia-expirada`: `dias` é opcional (remover query param ou usar valor padrão)
- `GET /patrimonio/manutencao-prolongada`: `dias` é opcional (remover query param ou usar valor padrão)
- `GET /patrimonio/sem-responsavel`: Não aceita query params (remover)

### 7. Estrutura Bulk Response
**Problema**: Retorna `totalSucessos` e `sucessos`, não `criados`

**Correção**:
```typescript
expect(response.body.data).toHaveProperty('totalSucessos');
expect(response.body.data.totalSucessos).toBeGreaterThan(0);
```

### 8. DTOs de Atualização de Status
**Problema**: Precisa `status` e `observacoes` (opcional), não `motivo`

**Correção**:
```typescript
const updateStatusDto = {
  status: 'MANUTENCAO',
  observacoes: 'Manutenção preventiva', // Ao invés de 'motivo'
};
```

### 9. DTOs de Descarte
**Problema**: Precisa `dataDescarte` e `motivoDescarte`, não `motivo` e `observacoes`

**Correção**:
```typescript
const descarteDto = {
  dataDescarte: '2025-12-31',
  motivoDescarte: 'Equipamento obsoleto', // Ao invés de 'motivo'
  destinoDescarte: 'Leilão público', // Opcional
};
```

### 10. DTOs de Bulk Update
**Problema**: Precisa `ids` (array) e `dados` (objeto), não `updates`

**Correção**:
```typescript
const bulkUpdateDto = {
  ids: [id1, id2],
  dados: { // Ao invés de 'updates'
    localizacao: 'Sala 300',
  },
};
```

### 11. DTOs de Bulk Transfer
**Problema**: Precisa `ids` e `novoResponsavelId`, não `patrimonioIds`

**Correção**:
```typescript
const bulkTransferDto = {
  ids: [id1], // Ao invés de 'patrimonioIds'
  novoResponsavelId: '223e4567-e89b-12d3-a456-426614174001',
  observacoes: 'Transferência em lote',
};
```

### 12. DTOs de Bulk Delete
**Problema**: Precisa `ids` (array)

**Correção**: Já está correto, mas verificar se está sendo enviado corretamente

### 13. Resposta de Delete
**Problema**: `DELETE /patrimonio/:id` retorna `Promise<void>`, então não retorna mensagem

**Correção**: Remover expectativa de `message`:
```typescript
.expect(200)
// Remover: expect(response.body).toHaveProperty('message');
```

### 14. Endpoint de Verificar Duplicidade
**Problema**: Retorna 201 ao invés de 200

**Correção**: Verificar implementação do controller ou ajustar expectativa

### 15. Endpoints com Erro 500/404
**Problemas**:
- `GET /patrimonio/stats/categoria`: Erro 500 (verificar implementação)
- `GET /patrimonio/stats/responsavel/:responsavelId`: 404 se responsável não existir (esperado)
- `GET /patrimonio/responsavel/:id/historico`: 404 (verificar ordem das rotas)

### 16. GET /patrimonio/com-foto
**Problema**: Não aceita query params de paginação

**Correção**: Verificar se o endpoint aceita `QueryPatrimonioDto` ou apenas alguns campos

## Prioridade de Correções

### Alta Prioridade
1. Ajustar estrutura de resposta (`data.data`)
2. Corrigir DTOs de bulk operations
3. Corrigir DTOs de status e descarte
4. Corrigir query params obrigatórios

### Média Prioridade
5. Remover expectativas de autenticação para GET /patrimonio
6. Ajustar filtros (usar `q` ao invés de `codigo`)
7. Corrigir expectativas de resposta de delete

### Baixa Prioridade
8. Investigar erros 500/404
9. Ajustar testes de endpoints opcionais
















