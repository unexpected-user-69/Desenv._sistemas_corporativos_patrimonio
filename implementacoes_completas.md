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

Próximas entregas sugeridas (alto valor):
- DTOs adicionais, documentação de erros e testes e2e/integração ampliados

Ver também: `implementacoes.md` e `implementação_geral.md`.
