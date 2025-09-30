# Definition of Done (DoD)

Este documento define os critérios obrigatórios para considerar uma tarefa como **concluída** no projeto Patrimônio e Inventário.

## Critérios Obrigatórios

### ✅ **Qualidade de Código**
- [ ] **Lint limpo**: Sem erros de ESLint/Prettier
- [ ] **Build bem-sucedido**: Compilação sem erros
- [ ] **Testes passando**: Todos os testes unitários e de integração aprovados
- [ ] **Cobertura mínima**: Pelo menos 80% de cobertura de testes

### ✅ **Documentação**
- [ ] **Swagger atualizado**: Endpoints documentados com exemplos
- [ ] **README atualizado**: Se houver mudanças na configuração
- [ ] **Comentários no código**: Código complexo devidamente comentado
- [ ] **Changelog**: Mudanças significativas documentadas

### ✅ **Revisão e Aprovação**
- [ ] **Code Review aprovado**: Pelo menos um colega revisou o código
- [ ] **Sem conflitos**: Branch atualizada com a main
- [ ] **CI verde**: Todos os checks obrigatórios passando
- [ ] **Aprovação do Code Owner**: Se aplicável

### ✅ **Funcionalidade**
- [ ] **Requirement atendido**: Funcionalidade implementada conforme especificado
- [ ] **Testes manuais**: Funcionalidade testada manualmente
- [ ] **Performance aceitável**: Sem degradação significativa de performance
- [ ] **Compatibilidade**: Funciona em diferentes ambientes (dev/staging)

### ✅ **Segurança**
- [ ] **Sem vazamentos**: Nenhum segredo exposto no código
- [ ] **Validação de entrada**: Dados de entrada validados adequadamente
- [ ] **Autorização**: Controles de acesso implementados quando necessário
- [ ] **Sanitização**: Dados sanitizados antes de processamento

## Critérios Específicos por Tipo

### 🐛 **Bug Fix**
- [ ] **Reprodução**: Bug reproduzível antes da correção
- [ ] **Teste de regressão**: Teste adicionado para evitar recorrência
- [ ] **Impacto avaliado**: Análise de impacto da correção

### ✨ **Feature**
- [ ] **Testes E2E**: Testes end-to-end para fluxos principais
- [ ] **Documentação de API**: Swagger com exemplos de request/response
- [ ] **Migração de dados**: Se aplicável, migração testada

### 📚 **Documentação**
- [ ] **Revisão técnica**: Conteúdo revisado por especialista
- [ ] **Exemplos práticos**: Exemplos funcionais incluídos
- [ ] **Atualização de links**: Links internos atualizados

## Processo de Validação

1. **Auto-verificação**: Desenvolvedor verifica todos os critérios
2. **Peer Review**: Colega revisa código e funcionalidade
3. **QA Check**: Testes de qualidade e integração
4. **Final Approval**: Aprovação final do responsável

## Exceções

Em casos excepcionais, critérios podem ser relaxados com:
- **Justificativa documentada**
- **Aprovação do Tech Lead**
- **Plano de correção posterior**

---

**Última atualização**: 2024-09-30  
**Versão**: 1.0  
**Responsável**: Equipe de Desenvolvimento
