
# SEMPRE busque terminar as implementacoes de `implementação_geral.md`.
# Implementações Completas

- Bootstrap NestJS na raiz (lint/build/test OK)
- Docker Compose PostgreSQL (`patrimonio_inventario_db`) + healthcheck
- Variáveis `.env` (não versionado) e defaults
- TypeORM `src/database/data-source.ts` (export default)
- Entidade `User` com índice único em `email`
- Migração inicial `users` aplicada
- CI (lint/build/test) habilitado e verde em `.github/workflows/ci.yml`
- Renomeação do projeto e banco: `patrimonio_inventario`
- CRUD Users scaffold: `UsersModule`, `UsersService`, `UsersController`, DTOs (validações)
- Integração TypeORM no `AppModule` (tipado)

Novidades (entregues):
- ValidationPipe global e documentação Swagger (`/api/docs`)
- Endpoint `GET /health` para healthcheck
- Templates de governança: issues/PR, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`
- `.env.example` versionado (sem segredos)
 - Tratamento de erros padronizado via filtro global (`HttpExceptionFilter`)

Entregáveis de Auditoria (docs/processo):
- PR template com checklist de riscos
- Documento `GOVERNANCE_AUDIT.md` com checklist e plano de ação

Segurança e Qualidade de Dados:
- Hash seguro de senha com `bcryptjs` no `UsersService` (create/update)
- Campo `passwordHash` excluído de respostas (ClassSerializer via `@Exclude`)
- Email com `citext` + índice único (unicidade case-insensitive)

Testes adicionais:
- Testes unitários do `UsersController` com service mock

Campos de Auditoria e Ciclo de Vida:
- Campo `avatarUrl` (opcional) na entidade User e DTOs
- Campo `deletedAt` para soft delete (DeleteDateColumn)
- Campo `version` para optimistic lock (VersionColumn)
- Migração `AddUserAuditFields` para adicionar novos campos
- Soft delete implementado no `UsersService.remove()`

Gestão Visual e Organizacional (PDF 063/064):
- Labels organizacionais: `feat`, `bug`, `docs`, `test`, `chore`, `infra`
- Labels de prioridade: `P1`, `P2`, `P3`
- Labels de governança: `governance`, `quality`, `security`
- Milestones estratégicos: M1 Users MVP, M2 Observabilidade, M3 Endurecimento
- Template Project Kanban com colunas Todo/In Progress/Review/Done
- Definition of Done (DoD) com critérios de qualidade

Proteção de Branch e CI Required (PDF 073):
- Branch Protection Rules: PR obrigatório, required checks, linear history
- CI Required Checks: Lint, Build, Test marcados como obrigatórios
- Security Settings: Signed commits, secret scanning, dependabot
- Environments: staging/prod configurados com proteções
- Guia de Branch Protection e troubleshooting

Microsserviço Users Completo (PDF 078/079/081/082/083):
- Helmet para segurança básica
- Prefixo global `v1` configurado corretamente
- UserResponseDto com @Exclude/@Expose para serialização segura
- ClassSerializerInterceptor global ativado
- Métodos privados `hash()` e `stripSensitive()` no UsersService
- Normalização de email (toLowerCase) e checagem de unicidade
- Tratamento de erro de conflito (código '23505')
- Swagger em `/docs` com URLs corretas `/v1/users`
- ValidationPipe com `forbidNonWhitelisted: true`
- Tipagem explícita em controllers e services
- `select: false` na coluna passwordHash da entidade

Containerização e Configuração (PDF 084):
- Dockerfile multi-stage (base para build, prod para runtime)
- Script start.sh com segurança, espera do banco e migrações
- docker-compose.yml com serviços db e app, rede dedicada
- .dockerignore para otimizar build
- data-source.ts com export nomeado AppDataSource
- package.json com script start:prod corrigido (.js)
- .env.example com configurações para Docker
- Documentação DOCKER_SETUP.md com guia completo

Próximas entregas sugeridas (cite elas):

Ver também: `implementacoes.md` e `implementação_geral.md`.

