# Sistema de Controle de Inventário e Patrimônio

## Gestão de Projetos
- Issues: utilize os templates (bug/feature) e aplique labels `feat`, `bug`, `docs`, `test`, `chore`, `infra`, `P1`, `P2`, `P3`.
- Milestones: M1 (MVP Inventário), M2 (Operações de Patrimônio), M3 (Integrações e Relatórios).
- Board (Project): usar UI do GitHub para Status e Priority. Vincule issues/PRs ao board.

## Definition of Done (DoD)
- Testes unitários e E2E passando
- Lint e build sem erros
- Swagger/Docs atualizados quando aplicável
- PR aprovado

## Conventional Commits
`<tipo>(<escopo>)?: <descrição>`
- Exemplos: `feat(assets): criar POST /assets`, `fix(users): validar email`.

## Fluxo de Contribuição
1. Abrir issue com template e critérios de aceite
2. Criar branch `tipo/escopo-descricao`
3. Commits atômicos (conventional commits)
4. Abrir PR referenciando a issue (`Closes #<id>`), usar template e checklist
5. Merge por Squash; deletar branch

## Scripts principais
- `npm run start:dev` — desenvolvimento (porta 3001)
- `npm run build` — build de produção
- `npm run test` — testes unitários
- `npm run test:e2e` — testes end-to-end
- `npm run lint` — lint de código
