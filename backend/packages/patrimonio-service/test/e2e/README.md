# Testes E2E - Patrimonio Service

Este diretório contém os testes end-to-end (E2E) para o Patrimonio Service.

## Arquivos de Teste

- `patrimonio.e2e-spec.ts` - Testes básicos originais
- `patrimonio-complete.e2e-spec.ts` - **Testes completos para todos os endpoints**

## Executar Testes

### Executar todos os testes E2E
```bash
npm run test:e2e
```

### Executar apenas os testes completos
```bash
npm run test:e2e -- patrimonio-complete.e2e-spec.ts
```

### Executar testes com cobertura
```bash
npm run test:cov
```

### Executar testes em modo watch
```bash
npm run test:watch
```

## Requisitos

Antes de executar os testes E2E, certifique-se de que:

1. **Banco de dados de teste está configurado**
   - O teste usa `DB_SYNC_TEST=true` para criar automaticamente as tabelas
   - Configure as variáveis de ambiente no arquivo `.env` ou `.env.test`

2. **JWT Secret está configurado**
   - O teste usa `JWT_ACCESS_SECRET` (padrão: `dev_access_secret_change_in_production`)

3. **Serviços externos (opcional)**
   - Os testes podem falhar se dependerem de serviços externos (users-service, categorias-service)
   - Considere mockar esses serviços em testes futuros

## Estrutura dos Testes

Os testes estão organizados em grupos lógicos:

### 1. CRIAÇÃO DE PATRIMÔNIO
- POST /patrimonio - Criar com todos os campos
- POST /patrimonio - Criar com campos mínimos
- Validações de erro (código duplicado, dados inválidos, autenticação)

### 2. LISTAGEM E FILTROS
- GET /patrimonio - Listagem com paginação
- Filtros: busca textual, status, marca, modelo, localização
- Filtros: valor mínimo/máximo, período de aquisição
- Ordenação e limites

### 3. BUSCAS ESPECÍFICAS
- GET /patrimonio/codigo/:codigo
- GET /patrimonio/categoria/:categoriaId
- GET /patrimonio/status/:status
- GET /patrimonio/responsavel/:responsavelId
- GET /patrimonio/localizacao/:localizacao
- GET /patrimonio/numero-serie/:numeroSerie

### 4. BUSCAS AVANÇADAS
- GET /patrimonio/aquisicao-periodo
- GET /patrimonio/valor-range
- GET /patrimonio/status-multiplos
- GET /patrimonio/categorias-multiplas
- GET /patrimonio/com-foto

### 5. ESTATÍSTICAS
- GET /patrimonio/stats/categoria
- GET /patrimonio/stats/status
- GET /patrimonio/stats/valor-total
- GET /patrimonio/stats/localizacoes
- GET /patrimonio/stats/faixa-valor
- GET /patrimonio/stats/aquisicao
- GET /patrimonio/stats/evolucao
- GET /patrimonio/stats/responsavel/:responsavelId
- GET /patrimonio/stats/marca-modelo
- GET /patrimonio/dashboard

### 6. BUSCAS ESPECIAIS
- GET /patrimonio/vencimento-garantia
- GET /patrimonio/garantia-expirada
- GET /patrimonio/alertas/garantia
- GET /patrimonio/manutencao-prolongada
- GET /patrimonio/sem-responsavel
- GET /patrimonio/top-valiosos
- GET /patrimonio/novos

### 7. OPERAÇÕES POR ID
- GET /patrimonio/:id
- GET /patrimonio/:id/disponibilidade
- GET /patrimonio/:id/historico
- GET /patrimonio/:id/historico/responsaveis
- GET /patrimonio/:id/historico/localizacoes

### 8. ATUALIZAÇÃO
- PATCH /patrimonio/:id
- PATCH /patrimonio/:id/status
- PATCH /patrimonio/:id/ativar
- PATCH /patrimonio/:id/desativar
- PATCH /patrimonio/:id/localizacao

### 9. OPERAÇÕES ESPECIAIS
- POST /patrimonio/:id/transferir-responsavel
- POST /patrimonio/:id/descarte

### 10. VALIDAÇÕES
- GET /patrimonio/validar-codigo/:codigo
- POST /patrimonio/verificar-duplicidade

### 11. OPERAÇÕES EM LOTE
- POST /patrimonio/bulk
- PATCH /patrimonio/bulk
- POST /patrimonio/bulk/transferir-responsavel
- DELETE /patrimonio/bulk

### 12. EXPORTAÇÃO
- GET /patrimonio/export/csv
- GET /patrimonio/export/excel
- GET /patrimonio/export/pdf

### 13. RELATÓRIOS
- GET /patrimonio/relatorio/inventario

### 14. HISTÓRICO POR RESPONSÁVEL
- GET /patrimonio/responsavel/:id/historico

### 15. AUTENTICAÇÃO E AUTORIZAÇÃO
- Testes de token inválido
- Testes de permissões (ADMIN vs MANAGER)

### 16. DELETE
- DELETE /patrimonio/:id

## Limpeza Automática

Os testes incluem limpeza automática no `afterAll`:
- Remove todos os patrimônios criados durante os testes
- Remove histórico relacionado
- Limpa por códigos conhecidos de teste

## Notas Importantes

1. **IDs de Teste**: Os testes usam códigos como `TEST-E2E-*` para facilitar identificação e limpeza

2. **Dependências**: Alguns testes podem falhar se serviços externos (users-service, categorias-service) não estiverem disponíveis

3. **Timeout**: O timeout padrão é de 30 segundos (configurado em `jest-e2e.json`)

4. **Banco de Dados**: Os testes usam `synchronize: true` apenas quando `DB_SYNC_TEST=true`, garantindo que as tabelas sejam criadas automaticamente

## Melhorias Futuras

- [ ] Mockar serviços externos (users-service, categorias-service)
- [ ] Adicionar testes de upload de foto
- [ ] Adicionar testes de performance
- [ ] Adicionar testes de concorrência
- [ ] Adicionar testes de integração com outros serviços

