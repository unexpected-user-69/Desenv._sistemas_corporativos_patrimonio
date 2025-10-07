# Auditoria de Governança (Checklist)

## Entregáveis Primários
- Issue: Auditoria de Governança (labels governance/quality/security)
- Milestone associada ao sprint atual
- Plano de Ação (até 5 itens priorizados)
- Evidências (prints/links)

## Checklist Técnico Essencial
- Branch Protection (main): PR obrigatório, required checks (up-to-date), linear history, sem bypass/force-push, auto-delete branch
- CI Required: Lint/Build/Test como required
- Revisão/Integração: CODEOWNERS, Require review from Code Owners, Required conversation resolution, Merge Queue

## Controles de Segurança
- Signed Commits (GPG/SSH)
- Secret Scanning + Push protection
- Environments (staging/prod) e required deployments

## Templates e Documentação
- PR template com checklist de riscos
- Issue templates (bug/feature)
- README, CONTRIBUTING, SECURITY.md, LICENSE, .env.example

## Evidências
- Links para PRs, configurações de proteção, prints do Actions e Branch rules
