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


Ver também: `implementacoes.md` e `implementação_geral.md`.
