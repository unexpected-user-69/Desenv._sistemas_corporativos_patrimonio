# Testes E2E - Inventory Mobile

## 📋 Visão Geral

Este diretório contém os testes end-to-end (E2E) para o módulo `inventory-mobile`, validando todos os endpoints e funcionalidades implementadas.

## 🎯 Cobertura de Testes

### Endpoints Testados

1. **POST /v1/inventory/campaigns**
   - ✅ Criação de campanha com sucesso (201)
   - ✅ Erro 400 para período inválido
   - ✅ Erro 400 para dados faltando

2. **GET /v1/inventory/campaigns/:id/assignments**
   - ✅ Listagem de assignments (200)
   - ✅ Erro 404 para campanha não encontrada

3. **POST /v1/inventory/campaigns/:id/assignments**
   - ✅ Distribuição de assignments (201)
   - ✅ Erro 400 para campanha com status inválido
   - ✅ Erro 400 para assignment duplicado

4. **POST /v1/inventory/sync/pull**
   - ✅ Sincronização pull básica (200)
   - ✅ Sincronização incremental com lastSyncAt

5. **POST /v1/inventory/sync/push**
   - ✅ Processamento de itens coletados (200)
   - ✅ Validação de assignment do coletor

6. **POST /v1/inventory/reconcile**
   - ✅ Início de conciliação (202)
   - ✅ Erro 404 para campanha não encontrada

7. **GET /v1/inventory/campaigns/:id/report**
   - ✅ Geração de relatório (200)
   - ✅ Erro 404 para campanha não encontrada

8. **GET /v1/inventory/campaigns/:id/export/csv**
   - ✅ Exportação CSV de divergências (200)

9. **GET /v1/inventory/campaigns/:id/export/excel**
   - ✅ Exportação Excel de relatório (200)

10. **GET /v1/inventory/dashboard**
    - ✅ Dashboard com estatísticas (200)

## 🚀 Como Executar

### Pré-requisitos

- PostgreSQL rodando e acessível
- Variáveis de ambiente configuradas
- Migrações executadas (`npm run migration:run`)

### Executar Todos os Testes E2E

```bash
npm run test:e2e
```

### Executar Apenas Testes do Inventory Mobile

```bash
npm run test:e2e -- inventory-mobile
```

### Executar com Cobertura

```bash
npm run test:cov
```

## 📊 Estrutura dos Testes

Os testes seguem o padrão **Arrange-Act-Assert (AAA)**:

```typescript
it('deve criar uma campanha com sucesso (201)', async () => {
  // Arrange - Preparar dados
  const dto = { ... };

  // Act - Executar ação
  const response = await request(httpServer)
    .post('/v1/inventory/campaigns')
    .send(dto)
    .expect(201);

  // Assert - Validar resultado
  expect(response.body).toHaveProperty('id');
});
```

## 🔧 Configuração

Os testes utilizam:
- **DEV_AUTO_AUTH**: Autenticação automática habilitada
- **NODE_ENV**: Definido como 'test'
- **Supertest**: Para requisições HTTP
- **TypeORM DataSource**: Para setup/cleanup de dados

## 📝 Notas Importantes

1. **Auto-Auth**: Os testes usam `DEV_AUTO_AUTH=true` para bypass de autenticação
2. **Setup Automático**: As tabelas são criadas automaticamente se não existirem
3. **Cleanup**: Os dados de teste podem ser mantidos para análise (comentado no código)
4. **Isolamento**: Cada teste é independente, mas compartilha dados de setup

## 🐛 Troubleshooting

### Erro: "relation does not exist"
- Execute as migrações: `npm run migration:run`
- Ou verifique se o setup automático está funcionando

### Erro: "connection refused"
- Verifique se o PostgreSQL está rodando
- Verifique as variáveis de ambiente (DATABASE_URL)

### Erro: "expected 201, got 403"
- Verifique se `DEV_AUTO_AUTH=true` está definido
- Verifique se o guard de autenticação está configurado corretamente

## 📈 Melhorias Futuras

- [ ] Adicionar testes de performance
- [ ] Adicionar testes de concorrência
- [ ] Adicionar testes de edge cases mais complexos
- [ ] Adicionar testes de integração com outros módulos
- [ ] Adicionar mocks para serviços externos

