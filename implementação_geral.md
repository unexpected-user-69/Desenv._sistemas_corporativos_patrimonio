nosso projeto é Sistema de controle de patrimonio e inventario 
Implementações encontradas nas fontes, separadas pelos números de referência dos documentos.

---

### PDF 043: CRUD Completo do Users Service com NestJS, TypeORM e Migrations

Este material se concentra na implementação técnica do CRUD (Create, Read, Update, Delete) de usuários no NestJS, utilizando TypeORM e o conceito de DTOs e Migrations.

#### Entidade User (`src/users/entities/user.entity.ts`)
*   Define a estrutura da tabela `users` no banco de dados.
*   Utiliza a decoradora `@Entity('users')`.
*   Possui os seguintes campos:
    *   `userId`: Chave primária gerada como UUID (`@PrimaryGeneratedColumn('uuid')`).
    *   `name`: Campo de texto (`@Column()`).
    *   `email`: Campo de texto com restrição de **unicidade** (`@Column({ unique: true })`).
    *   `password`: Campo de texto (`@Column()`).
    *   `isActive`: Booleano com valor padrão `true` (`@Column({ default: true })`).

#### Camada de Serviço (`src/users/users.service.ts`)
*   É responsável por encapsular as regras de negócio.
*   Utiliza injeção de dependência via `@InjectRepository(User)` para acessar as operações do banco de dados.
*   Implementa os métodos CRUD do TypeORM:
    *   `findAll()`: Retorna todos os usuários.
    *   `findOne(id)`: Busca usuário por `userId` e levanta `NotFoundException` se não encontrado.
    *   **`create(dto)`**: Cria e salva um novo usuário após criar a entidade a partir do DTO.
    *   `update(id, dto)`: Busca o usuário existente, aplica as alterações via `Object.assign(user, dto)` e salva.
    *   `remove(id)`: Busca o usuário existente e o remove.

#### DTOs (Data Transfer Objects)
*   **`CreateUserDto` (`src/users/dto/create-user.dto.ts`)**: Usado para controlar dados de entrada.
    *   Aplica validações de dados usando decoradores `class-validator`.
    *   Campos com validações: `name` (`@IsNotEmpty()`), `email` (`@IsEmail()`), `password` (`@MinLength(6)`).
*   **`UpdateUserDto` (`src/users/dto/update-user.dto.ts`)**:
    *   Estende `CreateUserDto` usando `PartialType` (tornando todos os campos opcionais).

#### Controller de Usuários (`src/users/users.controller.ts`)
*   Expõe os endpoints REST e é responsável por receber requisições HTTP e delegar ao serviço.
*   Utiliza documentação Swagger (`@ApiTags`, `@ApiOperation`, `@ApiResponse`).
*   Implementação dos endpoints:
    *   **GET `/users`**: Chama `usersService.findAll()`.
    *   **GET `/users/:id`**: Chama `usersService.findOne(id)` (o `id` é validado via `ParseUUIDPipe`).
    *   **POST `/users`**: Chama `usersService.create(dto)`.
    *   **PUT `/users/:id`**: Chama `usersService.update(id, dto)` (o `id` é validado via `ParseUUIDPipe`).
    *   **DELETE `/users/:id`**: Chama `usersService.remove(id)` (o `id` é validado via `ParseUUIDPipe`).

#### Módulo Users (`src/users/users.module.ts`)
*   Registra a injeção do repositório via `imports: [TypeOrmModule.forFeature([User])]`.
*   Define `UsersController` e `UsersService`.
*   Exporta `UsersService` para uso em outros módulos.

#### Configuração de Migrations (`src/data-source.ts`)
*   Define a conexão com o banco de dados PostgreSQL.
*   Especifica a localização das entidades (`entities: [User]`) e das migrações (`migrations: ['src/migrations/*.ts']`).
*   Define scripts no `package.json` para geração (`migration:generate`) e execução (`migration:run`) de migrações.

---

### PDF 051: CRUD Completo de Usuários com NestJS (1)

Este material detalha a arquitetura, boas práticas e a integração de TypeORM e PostgreSQL, além de introduzir conceitos de governança e segurança.

#### Arquitetura em Camadas do NestJS
*   **Entidades**: Representam tabelas via TypeORM.
*   **DTOs**: Contratos com validação e transformação de dados.
*   **Serviços**: Encapsulam a lógica de negócio.
*   **Controllers**: Expõem rotas HTTP.
*   **Módulos**: Organizam a aplicação.

#### Boas Práticas e Segurança
*   **Separação de Responsabilidades** em cada camada.
*   **Validação de Dados** com `class-validator`.
*   **Tratamento de Erros** com exceções mapeadas para respostas HTTP (400, 404, 409, 500).
*   **Documentação Automática** com Swagger, acessível em `/api/docs`.
*   **Segurança de Senhas**: Uso de `bcryptjs` para hash seguro com *salt* automático, evitando armazenamento em texto plano.
*   **Migrations**: Uso para evolução controlada do schema, evitando `synchronize: true` em produção.

#### Integração e Governança
*   **Fluxo Git/GitHub**: Utilização de **Branch Feature**, **Pull Request** para proposta de mudanças, **Code Review** por pares, e **Merge**.
*   **Proteção da Branch Principal (Main)**: Regras que exigem código revisado e CI verde (testes passando).
*   **CI/CD**: Automação de Lint, Build, Test e Deploy.
*   **Checklist de Qualidade do Repositório**: Inclusão de `README` detalhado, `.gitignore` configurado e `LICENSE`.
*   **Padrões de Commit**: Uso de Conventional Commits (`tipo(escopo): descrição`) para histórico limpo.

---

### PDF 063: Guia de Gestão de Projetos no GitHub & PDF 064: Guia Didático Gestão do Projeto Serviço Users

Estes guias detalham a estruturação da governança do projeto no GitHub.

#### Componentes de Gestão
*   **Issues**: Registro rastreável de trabalho (tarefa, bug, melhoria, documentação).
*   **Labels (Classificação)**: Etiquetas essenciais para triagem e relatórios:
    *   `feat` (Novas funcionalidades)
    *   `bug` (Correções de problemas)
    *   `docs` (Atualizações de documentação)
    *   `test` (Adição/melhoria de testes)
    *   `chore` (Tarefas de manutenção)
    *   `infra` (Mudanças em infraestrutura/CI/CD)
*   **Milestones (Marcos Temporais)**: Entregas significativas com prazo definido:
    *   **M1 Users MVP**: CRUD básico, validações, Swagger inicial.
    *   **M2 Observabilidade**: Implementação de logs e métricas.
    *   **M3 Endurecimento**: Segurança, testes abrangentes.
*   **Project Kanban (Fluxo Visual)**: Quadro com colunas para acompanhar o progresso:
    *   `Todo`
    *   `In Progress`
    *   `Review`
    *   `Done`
    *   Adiciona campo customizado `Priority` (P1, P2, P3).

#### Padrões de Qualidade
*   **Definition of Done (DoD)**: Critérios para finalizar uma tarefa:
    *   Testes aprovados (unitários e de integração).
    *   Lint limpo (padrões de formatação).
    *   Swagger atualizado.
    *   Revisão aprovada (pelo menos um colega).
*   **Templates de Governança (Arquivos)**: Estrutura dentro da pasta `.github/`:
    *   `ISSUE_TEMPLATE/bug_report.md` (Template para bugs).
    *   `ISSUE_TEMPLATE/feature_request.md` (Template para features).
    *   `PULL_REQUEST_TEMPLATE.md` (Checklist padronizado para PRs).
    *   `CONTRIBUTING.md` (Guia de contribuição).
    *   `CODE_OF_CONDUCT.md` (Código de Conduta).
*   **Convenções de Commit**: Uso obrigatório do Conventional Commits.

---

### PDF 065: Plano Integrado – Aplicação do Guia Didático + Implementação da Entidade Users

Este plano integra a aplicação prática da governança com a implementação da entidade Users, incluindo detalhes dos templates e desafios de automação.

#### Implementação de Governança
*   **Labels de Prioridade**: Uso das etiquetas `P1`, `P2`, `P3` para priorizar tarefas.
*   **Fluxo de Trabalho Branch + PR**: Processo recomendado para implementar governança e alterações, garantindo histórico linear e revisão.
*   **Configuração Git Recomendada**: `git config --global pull.rebase true` para manter histórico linear.

#### Conteúdo dos Templates
*   **Template Bug Report**: Exige informações cruciais, como **Passos para reproduzir**, **Evidências** (logs, prints), **Ambiente** (versão da API, DB, Docker) e **Impacto** (severidade).
*   **Template Feature Request**: Exige **Contexto e motivação**, **Proposta detalhada**, **Alternativas consideradas** e **Critérios de aceite**.
*   **Template Pull Request**: Inclui o link para a issue (`Closes #<id>`) e um **Checklist de qualidade** (testes, lint, Swagger, breaking changes).
*   **CONTRIBUTING.md (Diretrizes)**: Detalha a **Estratégia de branch** (`tipo/escopo/descricao-curta`), **Convenções de commit** e o **Processo de pull request**.

#### Implementação da Governança (Arquivos e Estrutura)
*   **Estrutura de Arquivos da Governança**: Criação da pasta `.github/` e inclusão dos templates.
*   **Processo de Commit e PR para Governança**: Exemplo de commit: `docs(repo): adicionar templates de issue/PR, contributing e code of conduct`.

---

### PDF 066 & PDF 067: Implementação Técnica da Entidade User

Estes documentos focam nas decisões técnicas de modelagem, infraestrutura (TypeORM) e segurança para a entidade `User`.

#### Decisões de Modelagem e Segurança
*   **Modelagem de Schema**: Exclusivamente via **Migrations TypeORM**, despriorizando o uso manual ou `synchronize: true`.
*   **Banco de Dados**: PostgreSQL.
*   **E-mail Unicidade**: Restrição `UNIQUE` **case-insensitive**, preferencialmente via tipo `citext` no PostgreSQL.
*   **Chave Primária (user_id)**: Inicialmente definida como **UUID v4**.
*   **Campos de Auditoria/Ciclo de Vida**: Inclusão de `createdAt`, `updatedAt`, `deletedAt` (para soft delete) e `version` (para *optimistic lock*).
*   **Senha**: Armazenada como `password_hash` criptográfico.

#### Governança na Implementação (Passo a Passo)
*   **Criação da Issue**: Título padrão: "Criar entity User e migração da tabela users (M1)".
*   **Criação da Branch**: Padrão de nomenclatura: `feat/users/entity-and-migration`.

#### Gestão de Configurações (.env / data-source.ts)
*   **Arquivos Essenciais de Configuração**: Uso de `.env` (local, **NUNCA commitado**) e `.env.example` (template, **DEVE ser commitado**).
*   **`.gitignore`**: Configurado para ignorar `.env` e variações.
*   **DataSource TypeORM**: O arquivo `src/database/data-source.ts` é configurado para ser flexível (lendo `DATABASE_URL` ou variáveis separadas).
*   **Módulos TypeORM**: Recomendação de adotar **CommonJS** para estabilidade e usar `typeorm-ts-node-commonjs` para scripts de migração.
*   **Ajustes no `tsconfig.json`**: Inclusão de `lib: ["ES2023"]`, `types: ["node"]` e, crucialmente para ORMs, `useDefineForClassFields: false`.

#### Incidentes e Soluções (Troubleshooting)
*   **Conflitos de Versão**: Alinhamento das versões de `jest` e `ts-jest` para a série 29.x.
*   **Problemas de Lint (Type-Checking)**: Criação de `tsconfig.eslint.json` específico para incluir arquivos de teste e código-fonte, garantindo visibilidade para o linter.
*   **Segurança (Vazamento de Segredos)**: Reforço na solução do `.gitignore` para arquivos `.env`, com exceção para o template `.env.example`.

---

### PDF 071 & PDF 072: Do Planejamento à Execução: Implementando a Entidade User

Estes documentos detalham a implementação prática do ambiente Docker, a entidade e o processo de migração, incluindo correções do fluxo de trabalho.

#### Configuração do Ambiente Local (Docker Compose)
*   **Uso de Docker Compose**: Garante ambiente PostgreSQL local reprodutível, isolado e com persistência de dados (via volume nomeado `pgdata`).
*   **`docker-compose.yml`**: Define o serviço `db` usando `postgres:16`, `container_name: aurora_db`, portas mapeadas (`5432:5432`) e `healthcheck` funcional.
*   **Variáveis de Conexão no `.env`**: Configuração do `DB_HOST=localhost` e outras credenciais para conectar a aplicação Node.js ao contêiner Docker.

#### Definição da Entidade User (`src/users/entities/user.entity.ts`)
*   **Ajuste de ID**: A chave primária é definida como um **inteiro** gerado automaticamente (`id!: number;`). (*Nota: Isso diverge da decisão inicial de usar UUID v4 em PDFs 066/067*).
*   **Enumeração de Papéis**: Definição do `UserRole` enum (`STUDENT`, `TEACHER`, `ADMIN`).
*   **Campos da Entidade**: Inclui `name`, `email` (com índice único), `passwordHash`, `role` (enum), `isActive`, `avatarUrl`, `createdAt` e `updatedAt`.

#### Processo de Geração e Aplicação de Migrações
*   **Geração da Migration**: Comando via CLI usando `npx typeorm-ts-node-commonjs` e referenciando o `data-source.ts`.
*   **Troubleshooting (Erros Comuns)**: Correção do erro "migration name is wrong (timestamp JS)" garantindo que o timestamp em milissegundos seja consistente no nome do arquivo e no nome da classe da migration.
*   **Validação Pós-Aplicação**: Comandos PSQL para inspeção da tabela (`\d+ users`) e do histórico de migrações (`SELECT * FROM migrations`).

#### Fluxo de Trabalho Git para Entidade/Migração
*   **Branching Limpo**: Processo de `git pull --rebase` na `main` antes de criar a nova branch (`feat/users-entity-migration`) para garantir que a feature nasça sobre a base atualizada da infraestrutura.
*   **Finalização**: Commit com Conventional Commit (`feat(users): entidade + migração...`) e merge via **Squash/Rebase** para manter o histórico linear.

---

### Trilha: Governança do Repositório + Bootstrap do Serviço Nest

Este documento consolida o *estado atual* da governança e do bootstrap do serviço Nest antes da implementação funcional do CRUD.

#### Governança do Repositório (Regras de Proteção)
*   **PR Obrigatório** para merge.
*   **Checks de Qualidade** automáticos.
*   **Histórico Linear** por Squash/Rebase.
*   **Revisão Responsável** via sistema **CODEOWNERS**.
*   **Estratégia de Merge** explícita com exclusão automática de branches.

#### Pipeline de Integração Contínua (CI)
*   CI definido com três estágios ativos, funcionando como *status checks* obrigatórios:
    *   **LINT**: Inspeção automática de estilo/padrões de código.
    *   **BUILD**: Verificação de compilação e integridade.
    *   **TEST**: Execução de testes automatizados.

#### Padrões de Colaboração e Gestão
*   **Documentação Padronizada**: Templates para Issues/PRs, `CONTRIBUTING.MD`, e Código de Conduta.
*   **Gestão Visual**: Labels organizacionais, Milestones estratégicos, e Quadro Kanban (Project V2) ativo.

#### Bootstrap do Serviço Nest
*   **Aplicação Operacional**: Base executável configurada.
*   **Configurações Mínimas**: Execução local com porta padrão, Healthcheck funcional para monitoramento e configuração mínima de variáveis de ambiente.

---

### PDF 073: Entregáveis e Códigos de Implementação (Checklist de Auditoria)

#### I. Entregáveis Primários (Resultados Esperados)
*   **Issue** `Auditoria de Governança`.
*   **Labels** `governance`, `quality`, `security` (na Issue de Auditoria).
*   **Milestone** (Associada ao sprint atual).
*   **Plano de Ação** (Realista, limitado a 5 itens prioritários).
*   **Evidências** (Prints/links que comprovem a implementação).

#### II. Checklist Técnico Essencial (Configurações Obrigatórias)
*   **Branch Protection na Main**:
    *   `PR obrigatório`.
    *   `required checks` (up-to-date).
    *   `linear history`.
    *   `sem bypass/force-push`.
    *   `auto-delete branch`.
*   **CI Mínima Required**:
    *   `Lint` (marcado como Required).
    *   `build` (marcado como Required).
    *   `test` (marcado como Required).
*   **Revisão/Integração**:
    *   `CODEOWNERS` (arquivo configurado).
    *   `Require review from Code Owners` (ativado).
    *   `Required conversation resolution` (habilitada).
    *   `Merge Queue` (ativada).

#### III. Controles de Segurança
*   `Signed Commits` (GPG/SSH requeridos).
*   `Secret Scanning + Push protection` (ativos).
*   `Environments` (`staging`/`prod` configurados).
*   `required deployments` (configurados para CD).

#### IV. Templates e Documentação
*   **Templates Obrigatórios**:
    *   `PR template` (com checklist de riscos).
    *   `Issue templates` (para bugs e features).
*   **Arquivos de Documentação/Segurança**:
    *   `README` (com instruções claras).
    *   `CONTRIBUTING` (com padrões Git).
    *   `SECURITY.md` (para repositórios públicos).
    *   `LICENSE` (apropriada).
    *   `.env.example` (para configurações).

#### V. Entregáveis do Monitor/Professor (Relatório Consolidado)
*   **Planilha/board** de consolidação.
*   **Relatório Consolidado por Turma** (Documento/painel de status).
*   **Critérios de Status**: `Verde`, `Amarelo`, `Vermelho` (para classificação das equipes).
*   **Achados por Categoria** (Ex: Branch protection: status e gaps, CI Required: implementação e bloqueios, etc.).

O seu pedido é para que eu detalhe as implementações essenciais contidas em cada arquivo de origem (PDF), seguindo o formato solicitado.

---

### PDF 078: Excerpts from "078-Microsservico-Users-Implementacao-Completa (2).pdf"

Este guia foca na implementação completa do microsserviço Users, seguindo o padrão Verificar → Implementar → Validar → Documentar → Entregar.

**Componentes e Implementações Chave:**

1.  **Configuração Inicial e Dependências:**
    *   Utilizar **NestJS, TypeORM e PostgreSQL** como base.
    *   Instalar dependências essenciais: `@nestjs/typeorm`, `typeorm`, `pg`, `class-validator`, `class-transformer`, `@nestjs/swagger`, `swagger-ui-express`, e `helmet`.
2.  **Scripts de Desenvolvimento:**
    *   Implementar scripts no `package.json` para **migrações** (`migration:generate`, `migration:run`, `migration:revert`) e testes (`test`, `test:e2e`).
3.  **Módulo Principal (`App.module.ts`):**
    *   Configurar o `TypeOrmModule` usando o `AppDataSource.options`.
    *   Ativar o **`ValidationPipe` globalmente** (`APP_PIPE`) com as opções: `whitelist: true`, `forbidNonWhitelisted: true`, e `transform: true`.
4.  **Inicialização (`main.ts`):**
    *   Utilizar `helmet()` para segurança básica.
    *   Configurar o **Swagger** (`DocumentBuilder`, `SwaggerModule`) para documentação automática da API com prefixo `/docs`.
    *   Definir o **prefixo global** como `v1` (`app.setGlobalPrefix('v1')`).
5.  **Configuração do Banco de Dados (`data-source.ts`):**
    *   Configurar a conexão PostgreSQL, suportando URL completa ou variáveis de ambiente separadas (host, port, user, pass, db name).
    *   Incluir suporte a **SSL** opcional para ambientes como Supabase/Render.
    *   Garantir que `synchronize: false` e `migrationsRun: false` estejam definidos.
6.  **Modelagem do Domínio (`User Entity`):**
    *   Definir a entidade `User` com campos como `id`, `name`, `email`, `passwordHash` (com `length: 255`), `role` (usando `UserRole` enum), `isActive`, `avatarUrl`, e timestamps (`createdAt`, `updatedAt`).
    *   Garantir um **índice único no campo `email`**.
7.  **DTOs de Contrato:**
    *   Implementar **`CreateUserDto`** com validações de entrada (mínimo de 2 caracteres para nome, formato de e-mail, mínimo de 6 caracteres para senha, e `IsEnum` opcional para `role`).
    *   Implementar **`UserResponseDto`** usando `@Exclude()` na classe e `@Expose()` nos campos que devem ser retornados (excluindo `passwordHash` por padrão) para garantir segurança e um contrato de API estável.
8.  **Gerenciamento de Segurança (Serviço):**
    *   Implementar o método **`private async hash(plain: string)`** usando **bcrypt** para gerar um hash seguro com salt, dificultando ataques de força bruta.
    *   Implementar o método **`private stripSensitive(u: User)`** para remover explicitamente o `passwordHash` da entidade antes de retornar ao cliente, prevenindo vazamento de dados sensíveis.
9.  **Serialização Global:**
    *   Ativar o **`ClassSerializerInterceptor`** globalmente em `main.ts` para que os decoradores `@Exclude()` e `@Expose()` funcionem nos DTOs de resposta.
10. **Implementação do `Create` (Serviço):**
    *   No método `create`, incluir a normalização de e-mail (para minúsculas).
    *   Realizar uma **checagem preliminar de e-mail único** (`findOne`) e tratar o erro.
    *   Aplicar o `hash()` na senha, opcionalmente com um **"pepper"**.
    *   Tratar o **erro de conflito do banco de dados (código '23505')** para condições de corrida.
    *   Retornar o resultado sanitizado usando `this.stripSensitive(saved)` ou `plainToInstance(UserResponseDto, user, ...)` no controller.
11. **Users Controller:**
    *   Implementar o endpoint **`POST /users`**.
    *   Utilizar o `plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true })` para garantir que apenas os campos expostos sejam retornados na resposta.
    *   Documentar o endpoint completamente usando decoradores **Swagger** (`@ApiTags`, `@ApiBody`, `@ApiCreatedResponse`, `ApiConflictResponse`).

---

### PDF 079: Excerpts from "079-Microsservico-Users.pdf"

Este documento reforça a metodologia e os requisitos de implementação do microsserviço Users.

**Pontos de Implementação Confirmados/Reforçados:**

1.  **Metodologia:** Seguir os passos: Verificar, Implementar, Validar, Documentar, Entregar.
2.  **Configuração de Módulo:** Confirma a estrutura do `App.module.ts` com `TypeOrmModule` e `ValidationPipe` global.
3.  **Segurança e Hashing:** Reitera a importância de evitar a exposição de dados sensíveis (como `passwordHash`) e a necessidade de usar algoritmos de hash robustos como **bcrypt** com "salt".
4.  **Integração do ClassSerializer:** Confirma a necessidade de ativar o `ClassSerializerInterceptor` globalmente no `main.ts` para que os DTOs de resposta funcionem corretamente.
5.  **Validação:** O processo de validação em ambiente controlado deve incluir: conexão com PostgreSQL em Docker, aplicação de migrações, teste do `POST /v1/users` via **cURL** (confirmando 201 e ausência do hash na resposta), e verificação direta no banco de dados.
6.  **Próximos Passos (Implementações Futuras):**
    *   Implementar listagem paginada, busca por ID, atualização idempotente (PUT/PATCH), e remoção (soft delete).
    *   Criar **Testes Automatizados** (Unitários e E2E).
    *   Orquestrar o serviço e o PostgreSQL usando **Docker Compose**.

---

### PDF 081: Excerpts from "081-TypeScript-para-Backend-com-NestJS.pdf"

Este material foca na utilização robusta do TypeScript, suas ferramentas e como combiná-lo com as práticas de NestJS e TypeORM.

**Implementações de Tipagem e Validação:**

1.  **Configuração TypeScript:**
    *   Garantir a configuração correta do `tsconfig.json`, habilitando `experimentalDecorators: true` e `emitDecoratorMetadata: true` para o funcionamento dos decoradores do NestJS.
2.  **DTOs (Classes vs. Interfaces):**
    *   DTOs de entrada devem ser **Classes** (não interfaces) para gerar metadados de runtime que o `ValidationPipe` e o `class-validator` possam utilizar.
    *   Utilizar decoradores como `@IsEmail`, `@IsNotEmpty`, e `@MinLength` nos DTOs.
    *   Usar `PartialType` do `@nestjs/swagger` para criar DTOs de atualização.
3.  **Entities (TypeORM):**
    *   Definir entidades TypeORM com tipagem forte e decoradores.
    *   Usar o atributo `select: false` na coluna `passwordHash` (embora isso possa ser sobrescrito pelo TypeORM, é uma camada de proteção).
4.  **Services Tipados:**
    *   Injetar o repositório (`Repository<UserEntity>`) usando `@InjectRepository`.
    *   Declarar explicitamente os tipos de retorno nas funções assíncronas (ex: `Promise<User | null>`), seguindo a boa prática de usar retorno explícito em serviços.
5.  **Controllers Tipados:**
    *   Definir tipos explícitos para parâmetros e retornos nos métodos do controller (ex: `@Param('id') id: string`, `@Body() dto: CreateUserDto`).
6.  **Validação Runtime:**
    *   Ativar o **`ValidationPipe` global** no `main.ts` com as opções `whitelist: true`, `forbidNonWhitelisted: true`, e `transform: true`.
7.  **Swagger e Tipos:**
    *   A combinação de DTOs tipados com decoradores do Swagger (`@ApiProperty()`) gera documentação automática e consistente.
8.  **Boas Práticas de Resposta:**
    *   Usar **Utility Types** como `Pick<T, K>` ou `Omit<T, K>` para definir tipos de resposta pública que não contenham dados sensíveis.

---

### PDF 082: Excerpts from "082-TypeScript-para-Backend-com-NestJS.pdf"

Este arquivo reitera e detalha os aspectos de tipagem e arquitetura de um projeto NestJS com foco em robustez e validação.

**Implementações de Tipagem e Validação (Reiteradas):**

1.  **Decisões de Tipagem:** Reforça a preferência por **União de Literais** (`'ACTIVE' | 'BLOCKED'`) para estados simples em APIs, em vez de `enum`.
2.  **Configuração Essencial:** Confirma a necessidade de configurar `experimentalDecorators` e `emitDecoratorMetadata` no `tsconfig.json`.
3.  **DTOs:** Reafirma que DTOs devem ser classes com decoradores de validação (`@IsNotEmpty`, `@MinLength`) para que o `ValidationPipe` funcione em runtime.
4.  **Entidade:** Mostra um exemplo de `UserEntity` com a propriedade `passwordHash` configurada com `select: false`.
5.  **Validação Global:** Confirma a ativação do `ValidationPipe` global com as três regras (`whitelist`, `forbidNonWhitelisted`, `transform`) no `main.ts`.

---

### PDF 083: Excerpts from "083-Tutorial-Configuracao-e-Correcao-do-Swagger-no-NestJS-prefixo-global-v1.pdf"

Este tutorial aborda uma correção crucial de configuração para o NestJS ao usar o versionamento de API com prefixo global.

**Implementação e Correção do Swagger:**

1.  **Causa-Raiz do Problema:** O problema de o Swagger não exibir o prefixo global (`/v1`) nas URLs das rotas ocorre quando **`SwaggerModule.setup` é configurado antes de `app.setGlobalPrefix('v1')`**.
2.  **Solução Implementada (Ordem Correta no `main.ts`):**
    *   A implementação de correção exige que o **prefixo global seja definido antes** da configuração do Swagger.
    *   **Ordem Correta de Configuração:**
        1.  `const app = await NestFactory.create(AppModule);`
        2.  `app.use(helmet());` (Configurações de segurança)
        3.  **`app.setGlobalPrefix('v1');`** (Definir o prefixo global)
        4.  Configuração do Swagger (`DocumentBuilder`, `SwaggerModule.createDocument`, `SwaggerModule.setup('docs', app, document);`).
3.  **Advertência:** Não utilizar `DocumentBuilder().addServer('/v1', 'API v1')` quando o prefixo global já estiver definido, para evitar URLs duplicadas (ex: `/v1/v1/...`).
4.  **Validação:** Após a correção, a URL gerada no Swagger deve conter `/v1`, como em `http://localhost:3001/v1/users?...`.