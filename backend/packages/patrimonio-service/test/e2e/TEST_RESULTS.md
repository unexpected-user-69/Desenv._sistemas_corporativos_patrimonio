# Resultados dos Testes E2E - Patrimonio Service

## Resumo
- **Total de Testes**: 98
- **Passaram**: 57
- **Falharam**: 41

## Problemas Identificados

### 1. Estrutura de Resposta
- **Problema**: A resposta vem com estrutura `data.data` devido ao `TransformResponseInterceptor`
- **Solução**: Ajustar testes para acessar `response.body.data.data` ao invés de `response.body.data`

### 2. Autenticação
- **Problema**: `GET /patrimonio` não tem `@UseGuards(JwtAuthGuard)`, então está público
- **Solução**: Remover expectativa de 401 ou adicionar guard no controller

### 3. Estrutura de Paginação
- **Problema**: Testes esperam `meta`, mas a resposta tem `data`, `total`, `page`, `limit` diretamente em `data`
- **Solução**: Ajustar testes para verificar `response.body.data.data`, `response.body.data.total`, etc.

### 4. Validação de Query Params
- **Problema**: Vários endpoints retornam 400 porque os query params não estão sendo validados corretamente
- **Endpoints afetados**:
  - `GET /patrimonio/aquisicao-periodo` - precisa `dataInicial` e `dataFinal` como query params obrigatórios
  - `GET /patrimonio/valor-range` - precisa `valorMinimo` e `valorMaximo` como query params obrigatórios
  - `GET /patrimonio/status-multiplos` - precisa `status` como array
  - `GET /patrimonio/categorias-multiplas` - precisa `categoriaIds` como array
  - `GET /patrimonio/com-foto` - não aceita query params de paginação
  - `GET /patrimonio/garantia-expirada` - `dias` deve ser opcional ou ter valor padrão
  - `GET /patrimonio/manutencao-prolongada` - `dias` deve ser opcional ou ter valor padrão
  - `GET /patrimonio/sem-responsavel` - não aceita query params
  - `GET /patrimonio/top-valiosos` - precisa usar DTO correto
  - `GET /patrimonio/novos` - precisa usar DTO correto

### 5. Estrutura de Resposta Bulk
- **Problema**: `POST /patrimonio/bulk` retorna `totalSucessos` e `sucessos`, não `criados`
- **Solução**: Ajustar teste para verificar `response.body.data.totalSucessos`

### 6. DTOs de Atualização
- **Problema**: `PATCH /patrimonio/:id/status` precisa de `status` e `observacoes` (opcional), não `motivo`
- **Solução**: Ajustar DTO no teste

### 7. DTOs de Descarte
- **Problema**: `POST /patrimonio/:id/descarte` precisa de `dataDescarte` e `motivoDescarte`, não `motivo` e `observacoes`
- **Solução**: Ajustar DTO no teste

### 8. DTOs de Bulk Update
- **Problema**: `PATCH /patrimonio/bulk` precisa de `ids` (array) e `dados` (objeto), não `updates`
- **Solução**: Ajustar estrutura do DTO

### 9. DTOs de Bulk Transfer
- **Problema**: `POST /patrimonio/bulk/transferir-responsavel` precisa de `ids` e `novoResponsavelId`, não `patrimonioIds`
- **Solução**: Ajustar estrutura do DTO

### 10. DTOs de Bulk Delete
- **Problema**: `DELETE /patrimonio/bulk` precisa de `ids` (array)
- **Solução**: Ajustar estrutura do DTO

### 11. Endpoints com Erro 500
- `GET /patrimonio/stats/categoria` - Erro interno (provavelmente relacionado a categoria)

### 12. Endpoints com Erro 404
- `GET /patrimonio/stats/responsavel/:responsavelId` - Responsável não encontrado (esperado se não existir)
- `GET /patrimonio/responsavel/:id/historico` - Rota não encontrada (verificar ordem das rotas)

### 13. Endpoint de Verificar Duplicidade
- **Problema**: `POST /patrimonio/verificar-duplicidade` retorna 201 ao invés de 200
- **Solução**: Verificar se o endpoint está criando algo ou apenas verificando

### 14. Filtro por Código
- **Problema**: `GET /patrimonio?codigo=...` retorna 400
- **Solução**: Verificar se o DTO `QueryPatrimonioDto` aceita `codigo` como query param

### 15. Limite Máximo
- **Problema**: `GET /patrimonio?limit=200` retorna 400 ao invés de limitar a 100
- **Solução**: Verificar validação do DTO

### 16. Resposta de Delete
- **Problema**: `DELETE /patrimonio/:id` retorna objeto vazio `{}` ao invés de `{ message: ... }`
- **Solução**: Verificar implementação do controller

## Próximos Passos

1. Corrigir estrutura de resposta nos testes (usar `data.data`)
2. Ajustar DTOs nos testes para corresponder aos DTOs reais
3. Verificar se endpoints públicos devem ter autenticação
4. Corrigir validações de query params
5. Verificar implementação dos endpoints com erro 500/404














