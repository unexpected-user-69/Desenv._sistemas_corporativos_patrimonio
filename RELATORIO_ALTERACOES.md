# Relatório de Alterações

Este documento resume todas as alterações realizadas no projeto durante a sessão atual.

## 1. Configuração e Correção do Swagger
- **Dependências**: Executado `npm install` para instalar dependências faltantes.
- **Banco de Dados**:
  - Alterado `src/app.module.ts` para usar SQLite em vez de Postgres para facilitar o desenvolvimento local.
  - Criado arquivo `.env` com configurações do SQLite (`DB_TYPE=sqlite`, `DB_NAME=database.sqlite`).
- **Versionamento**: Alterações enviadas para a branch `Henrique` no GitHub.

## 2. PoC do Serviço de Usuários (Express.js)
- **Diretório**: Criado `poc-express-users/`.
- **Arquivos**:
  - `package.json`: Configuração básica com dependência `express`.
  - `index.js`: Implementação de servidor Express com operações CRUD em memória para usuários.
  - `test-endpoints.js`: Script de teste para verificar os endpoints do PoC.

## 3. Testes de Contrato
- **Diretório**: Criado `packages/users-service/test/contract/`.
- **Arquivo**: `openapi.spec.ts` criado com estrutura básica de teste Jest.

## 4. Autenticação via Service Token
- **Guard**: Implementado `src/common/guards/service-token.guard.ts` para validar o header `X-Service-Token`.
- **Configuração**: Adicionada variável `SERVICE_TOKEN` ao arquivo `.env`.
- **Teste**:
  - Criado `src/test-token.controller.ts` para testar o guard.
  - Atualizado `src/app.module.ts` para incluir o controller de teste.
  - Criado `test-token.js` para verificar a autenticação (embora a verificação tenha enfrentado problemas de timeout na inicialização da aplicação).

## Arquivos Modificados/Criados
- `.env`
- `src/app.module.ts`
- `src/main.ts` (verificação)
- `src/common/guards/service-token.guard.ts`
- `src/test-token.controller.ts`
- `test-token.js`
- `poc-express-users/` (diretório completo)
- `packages/users-service/test/contract/openapi.spec.ts`
