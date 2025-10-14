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


---

### PDF 084: Implementações de Containerização e Configuração

O foco deste tutorial é migrar a aplicação NestJS para um ambiente totalmente containerizado (aplicação e PostgreSQL), utilizando o Docker Compose.

#### `Dockerfile` (Aplicação NestJS)

Este arquivo define a construção e o ambiente de execução da aplicação, utilizando uma abordagem multi-stage (`base` para build, `prod` para runtime).

1.  **Estágio `base` (Build):**
    *   Usar imagem leve (ex: `node:18-alpine`).
    *   Definir diretório de trabalho: `/usr/src/app`.
    *   Instalar dependências de sistema operacional necessárias (ex: `bash`).
    *   Copiar `package*.json` e instalar dependências completas (`npm ci`).
    *   Copiar o código-fonte e compilar a aplicação (`npm run build`).
2.  **Estágio `prod` (Produção/Runtime):**
    *   Usar uma nova imagem leve (ex: `node:18-alpine`).
    *   Instalar `bash` para executar o `start.sh`.
    *   Copiar `package*.json` e instalar dependências de produção (`npm ci --omit=dev`).
    *   Copiar os artefatos compilados (`dist`) e o script de inicialização (`start.sh`) do estágio `base`.
    *   Garantir que o script de inicialização seja executável (`RUN chmod +x ./start.sh`).
    *   Definir a variável de ambiente `NODE_ENV=production`.
    *   Definir o comando de inicialização final: **`CMD ["./start.sh"]`**.

#### `start.sh` (Script de Inicialização do Container)

Este script automatiza as etapas que devem ocorrer antes da aplicação iniciar.

1.  **Configuração de Segurança:** Implementar `set -euo pipefail`.
2.  **Espera do Banco de Dados:** Incluir lógica (mencionada, mas não totalmente detalhada no excerto) para aguardar que o serviço `db` esteja pronto.
3.  **Execução de Migrações:** Executar o comando do TypeORM (ou ORM equivalente) para aplicar migrações: **`npm run migration:run`**. O script deve ser tolerante a erros se não houver migrações pendentes.
4.  **Início da Aplicação:** Iniciar a aplicação em modo produção: **`npm run start:prod`**.

#### `docker-compose.yml` (Orquestração)

Este arquivo define os serviços, redes e volumes necessários para rodar a aplicação e o banco de dados em conjunto.

1.  **Serviço `db` (PostgreSQL):**
    *   Configurar a imagem (`postgres:15-alpine`).
    *   Definir variáveis de ambiente para credenciais (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`) lendo valores do `.env` ou usando *defaults*.
    *   Mapear portas (`5432:5432`).
    *   Configurar um volume persistente (`db_data`).
    *   Implementar um **`healthcheck`** usando `pg_isready` para garantir que o banco esteja pronto antes que a aplicação tente se conectar.
    *   Conectar à rede dedicada (`aurora_network`).
2.  **Serviço `app` (Aplicação NestJS):**
    *   Especificar a construção do container (`build: .`).
    *   Configurar a dependência no serviço `db` com condição de saúde: **`depends_on: { db: { condition: service_healthy } }`**.
    *   Carregar variáveis de ambiente do arquivo `.env` (`env_file: .env`).
    *   Definir variáveis de ambiente para a conexão com o banco de dados, crucialmente usando o nome do serviço `db` como host: **`DB_HOST: db`** e `DB_PORT: 5432`.
    *   Mapear portas (`3001:3001`).
    *   Conectar à rede dedicada (`aurora_network`).
3.  **Rede e Volumes:**
    *   Definir a rede `aurora_network` com `driver: bridge`.
    *   Definir o volume `db_data`.

#### `data-source.ts` (Configuração TypeORM)

Este arquivo exige ajustes para garantir a conectividade dentro do Docker e para compatibilidade com o TypeORM CLI.

1.  **Variáveis de Ambiente:** Implementar a leitura de todas as configurações de conexão (host, porta, usuário, senha, nome do banco) a partir de `process.env`, com *fallbacks* para valores padrão (ex: `host: process.env.DB_HOST || 'localhost'`).
2.  **Correção de Export (Problema 2):** Garantir que o arquivo contenha **apenas um export** da instância `DataSource`.
    *   **Implementação:** Manter apenas o *export nomeado*: `export const AppDataSource = new DataSource({ /* ... */ });`.

#### `package.json` (Scripts)

Necessita de uma correção essencial no script de inicialização de produção.

1.  **Correção do Script de Start (Problema 1):** Ajustar o script `start:prod` para refletir o nome do arquivo JavaScript compilado real (que inclui a extensão `.js`).
    *   **Implementação:** `"start:prod": "node dist/main.js"`.

#### `.dockerignore`

Criar este arquivo para otimizar o processo de build do Docker, excluindo arquivos desnecessários.

1.  **Conteúdo Essencial:** Listar diretórios e arquivos que não devem ser copiados para o contexto de build (ex: `node_modules`, `.git`, `.gitignore`, `.env`, `coverage`, `Dockerfile`, etc.).

#### `.env.example` e `.env`

Documentar e configurar as variáveis de ambiente.

1.  **Configuração de Rede:** Definir `DB_HOST=db` (nome do serviço no Docker Compose) e `DB_PORT=5432` para uso interno da rede Docker.
2.  **Configurações de ORM:** Incluir variáveis como `TYPEORM_LOGGING` e `TYPEORM_SYNC`.

#### Arquivos de Migração (TypeORM)

Caso haja scripts de migração existentes, eles podem precisar de uma correção nos imports.

1.  **Correção de Import (Problema 3):** Se o `data-source.ts` foi alterado para usar apenas o export nomeado (`export const AppDataSource`), os scripts de migração devem ser atualizados para usar o **import nomeado**: `import { AppDataSource } from './data-source';`.




pdf 085 -----
O roteiro didático foca na implementação, documentação e teste de um endpoint de listagem paginada de usuários (`findAll()`) com filtros e metadados. As implementações solicitadas e detalhadas nas fontes são as seguintes:

### Fase 2: Estruturação dos DTOs (Data Transfer Objects)

#### DTO de Entrada (PaginationQueryDto)
Implementação do DTO para lidar com os parâmetros de consulta, incluindo transformações de tipo, *defaults* e validação na borda (controlador):

*   **Paginação (`page`, `limit`):**
    *   Implementação de `@Transform` para garantir que os valores sejam numéricos (com *default* `1` para `page` e `20` para `limit`).
    *   Validações `@IsInt`, `@Min(1)` (para `page` e `limit`) e `@Max(100)` (para `limit`).
*   **Filtro Textual (`q`):**
    *   Implementação como opcional (`@IsOptional`).
    *   Transformação para remover espaços (`trim`).
    *   Validação `@IsString`.
*   **Filtro por Role (`role`):**
    *   Implementação como opcional.
    *   Validação `@IsIn` para restringir os valores aceitos (ex: `['admin', 'teacher', 'student']`).
*   **Filtro por Status (`is_active`):**
    *   Implementação como opcional.
    *   Validação `@IsBooleanString` para aceitar `'true'` ou `'false'`.

#### DTO de Resposta (PaginatedUsersResponseDto)
Implementação de uma estrutura de resposta padronizada:

*   Define as propriedades `data: T[]`, `total: number`.
*   Define a propriedade `meta` contendo `page`, `limit`, `has_next`, e `has_prev`.

### Fase 3: Implementação do Service (users.service.ts)

A implementação do método `findAllPaged` evolui utilizando o TypeORM, culminando no uso do *QueryBuilder* para lidar com filtros combinados.

#### Implementações Sequenciais do Service:

1.  **Básico:** Implementação inicial temporária de `async findAll(): Promise<User[]>` retornando todos os resultados via `this.repo.find()`.
2.  **Paginação:** Implementação de `findAllPaged`:
    *   Cálculo de `const skip = (page - 1) * limit`.
    *   Uso de `this.repo.findAndCount({ skip, take: limit, order: { created_at: 'DESC' } })`.
    *   Cálculo e retorno dos metadados de paginação (`has_next`, `has_prev`).
3.  **Filtro Textual (`q`) (usando repositório):** Implementação da cláusula `where` para buscar por nome OU email usando `ILike`.
    *   Exemplo de `where`: `q ? [{ name: ILike(%${q}%) }, { email: ILike(%${q}%) }] : {}`.
4.  **Composição de Filtros (Transição para QueryBuilder):** Implementação da estratégia de usar o `QueryBuilder` para combinar filtros com lógica OR (para `q`) e AND (para `role`/`is_active`).
    *   Iniciação do QueryBuilder: `const qb = this.repo.createQueryBuilder('u')`.
5.  **Filtros Combinados no QueryBuilder:**
    *   **Busca Textual (OR):** Implementação de `qb.andWhere('(u.name ILIKE :q OR u.email ILIKE :q)', { q: `%${q}%` })` se `q` estiver presente.
    *   **Filtro por Role (AND):** Implementação de `qb.andWhere('u.role = :role', { role })` se `role` estiver presente.
    *   **Filtro Ativo/Inativo (AND):** Implementação de `qb.andWhere('u.is_active = :active', { active: is_active === 'true' })` se `is_active` estiver definido.
    *   **Ordenação e Paginação:** Configuração de `qb.orderBy('u.created_at', 'DESC').skip((page - 1) * limit).take(limit)`.
    *   Execução da busca: `const [data, total] = await qb.getManyAndCount()`.

#### Implementações de Refatoração e Otimização:

*   **Extração de Filtros:** Extrair a construção de filtros para uma função privada.
*   **Garantia de Índices:** Garantir índices nas colunas `email`, `created_at` e colunas filtradas.
*   **Campos Públicos:** Implementar o retorno de apenas campos públicos (evitar campos sensíveis como `password_hash`).

### Fase 4: Implementação do Controller (users.controller.ts)

1.  **Estrutura Básica:** Implementação do método `@Get() findAll()`.
2.  **Query Params e Validação:** Implementação da injeção e validação dos parâmetros de consulta usando `@Query() query: PaginationQueryDto`.
3.  **Chamada do Service:** Chamada para `this.usersService.findAllPaged(query)`.
4.  **Transformação de Dados:** Uso de `ClassSerializerInterceptor` ou mapeamento DTO de saída para tratar campos sensíveis.
5.  **Padronização da Resposta:** Garantir que a resposta final padronizada seja `{ data, total, meta }`.

### Fase 5: Documentação Swagger

Implementação de decoradores Swagger para documentação profissional do endpoint:

*   **Operação:** Implementação de `@ApiTags('users')` e `@ApiOperation({ summary: 'List users (paginated)' })`.
*   **Parâmetros de Consulta:** Implementação de `@ApiQuery` para documentar `page`, `limit`, `q`, `role` (incluindo `enum: ['admin','teacher','student']`), e `is_active` (incluindo `enum: ['true','false']`).
*   **Resposta:** Implementação de `@ApiOkResponse({ type: PaginatedUsersResponseDto })`.

### Fase 6: Validação e Testes

Embora esta fase se concentre em cenários, as implementações solicitadas envolvem:

*   **Implementação de Testes Unitários:** Para a montagem do QueryBuilder (usando mocks).
*   **Implementação de Testes de Integração:** Leves com banco de dados em memória ou contêiner.
*   **Validação do DTO:** Garantir que a validação do DTO implementada na Fase 2 dispare erros 400 para casos como `page < 1`, `limit > 100`, ou `role` inválido.

### Fase 7: Evolução e Melhorias

Futuras implementações para escalabilidade e melhoria da UX de API:

*   **Cache:** Implementação de *cache* de resultados (ex.: Redis) para consultas populares.
*   **Filtros Avançados:** Implementação de filtros por intervalo de datas.
*   **Ordenação Dinâmica:** Implementação de ordenação dinâmica (via `sort` e `order`).
*   **Busca Fuzzy:** Implementação de busca fuzzy ou trigramas.
*   **Agregações:** Implementação de agregações/estatísticas (ex.: por *role*).
*   **Controle de Acesso:** Implementação de *Rate limiting* e chaves de paginação (cursor).



-----------------------------------
pdf 86----- Implementações para Testes Unitários (Teoria + Aplicação em NestJS)

**1. Instalação e Configuração do Jest:**

*   **Instalação Básica (JavaScript):** Executar `npm i -D jest`.
*   **Configuração de Scripts:** Adicionar ao `package.json` os scripts `"test": "jest"`, `"test:watch": "jest --watch"`, e `"test:cov": "jest --coverage"`.
*   **Instalação (TypeScript/NestJS):** Executar `npm i -D jest ts-jest @types/jest`.

**2. Estrutura de Código e Teste:**

*   **Criação de Arquivos:** Criar arquivos de teste com o sufixo `.spec.ts` ou `.test.ts`, preferencialmente co-localizados ou em um diretório `test/`.
*   **Exemplo Mínimo:** Implementar uma função pura (ex.: `sum` em `src/lib/sum.ts`) e seu teste correspondente (ex.: `test/sum.spec.ts`) usando `describe`, `it`, e `expect`.

**3. Implementação de Dobrês de Teste (Test Doubles):**

A injeção de dependências no NestJS é o ponto chave para implementar dobres.

*   **Implementar Dummy (useValue):** Fornecer objetos com métodos vazios ou que não fazem nada, para satisfazer as interfaces (ex.: `{ log(){ /* vazio */ } }`).
*   **Implementar Stub (useValue):** Utilizar `jest.fn().mockResolvedValue(...)` para pré-configurar retornos e controlar o fluxo de execução.
*   **Implementar Spy (useValue):** Usar `jest.fn()` para monitorar chamadas e argumentos, verificando com `toHaveBeenCalledWith`.
*   **Implementar Mock (useValue):** Usar `jest.fn()` com expectativas rígidas, incluindo negativas (e.g., `expect(repo.save).not.toHaveBeenCalled()`).
*   **Implementar Fake (useClass):** Fornecer implementações simplificadas e em memória via `useClass: RepoFake`, para simular lógica de negócio sem dependências reais (ex.: `UsersRepoFake` em memória).

**4. Setup de Módulos de Teste no NestJS:**

*   **Criação do Módulo de Teste:** Utilizar `Test.createTestingModule` para construir um módulo isolado para o teste.
*   **Substituição de Providers:** Dentro do `providers` do `TestingModule`, substituir implementações reais por mocks/stubs usando `useValue` ou `useClass`. Por exemplo: `{ provide:'UsersRepo', useValue:{ findByEmail: jest.fn(), save: jest.fn() } }`.

**5. Boas Práticas de Implementação de Testes (Padrão AAA):**

*   **Arrange (Preparação):** Implementar a configuração de dados de entrada e dobles de teste antes da execução.
*   **Act (Ação):** Implementar a execução da única ação que será testada (ex.: `const result = await service.createUser(dto)`).
*   **Assert (Verificação):** Implementar a validação do valor de retorno e a verificação das interações com os dobles (ex.: `expect(result).toEqual(...)`, `expect(mockHasher.hash).toHaveBeenCalledWith(...)`).
*   **Reset de Mocks:** Implementar `jest.clearAllMocks()` dentro do `beforeEach` para garantir o isolamento entre os testes.
*   **Controle de Tempo:** Implementar `jest.useFakeTimers().setSystemTime(...)` para controlar funcionalidades que dependem de datas ou intervalos.

**6. Sugestões Finais para a Qualidade:**

*   **Isolar Dependências:** Implementar stubs e spies para simular comportamentos, focando exclusivamente no comportamento da unidade sob teste.
*   **Monitorar Cobertura:** Implementar e rodar o script `npm run test:cov` regularmente para identificar áreas do código não testadas.

---
pdf 87a-----

A seguir estão todas as implementações solicitadas ou descritas no material, focadas na arquitetura do microsserviço Users, DTOs, *Service* e a estrutura de Testes Unitários:

### 1. Implementações da Estrutura da Entidade e Enum

*   **Implementar o *Enum* `UserRole`** com os valores `STUDENT`, `TEACHER`, e `ADMIN`.
*   **Implementar a *Entity* `User`** usando *decorators* do TypeORM, incluindo:
    *   `@Entity({ name: 'users' })`.
    *   `@Index(['email'], { unique: true })` para garantir a integridade dos dados.
    *   Definir propriedades como `id`, `name`, `email`, `passwordHash`, `role`, `isActive`, `avatarUrl` (opcional), `createdAt`, e `updatedAt`.
    *   Configurar `@Column` para `role` usando `enum: UserRole` com *default* para `UserRole.STUDENT`.
    *   Configurar `@Column` para `isActive` com tipo `boolean` e *default* `true`.

### 2. Implementações dos DTOs (Data Transfer Objects)

*   **Implementar `CreateUserDto`** definindo a estrutura de entrada (campos obrigatórios: `name`, `email`, `password`, e `role` opcional).
*   **Implementar `PaginationQueryDto` (QueryUsersDto)** para filtros e paginação:
    *   Configurar `page` e `limit` com `@Type(() => Number)`, `@IsInt()`, `@Min(1)`, `@Max(100)`.
    *   Configurar o campo de busca textual `q` com `@Transform` para realizar o *trim* do valor.
    *   Configurar o filtro `role` com `@IsEnum(UserRole)`.
    *   Configurar o filtro `is_active` com um `@Transform` customizado para converter valores de *string* (e.g., 'true', '1', 'yes') para booleano.
    *   Aplicar `@IsBoolean()` e `@IsOptional()` para `is_active`.
*   **Implementar a Estrutura de Resposta Paginada** que deve retornar o formato `{ data, total, page, limit }`.

### 3. Implementações no UsersService (Lógica de Negócio)

*   **Implementar a Injeção de Dependência** do repositório TypeORM no construtor do `UsersService` usando `@InjectRepository(User)`.
*   **Implementar Utilitários Privados:**
    *   `private stripSensitive(u: User)`: Para remover campos sensíveis (como `passwordHash`) das respostas.
    *   `private async hash(plain: string)`: Para gerar o *salt* (`bcrypt.genSalt(10)`) e aplicar o hash na senha.
    *   `private normalizeEmail(email: string)`: Para normalizar o email (*trim* e *lower case*).
    *   `private normalizeName(name: string)`: Para normalizar o nome (*trim* e compactar espaços).
*   **Implementar o Método `create(dto: CreateUserDto)`:**
    *   Aplicar normalização de `email` e `name`.
    *   Realizar checagem preliminar de existência de email usando `this.repo.findOne({ where: { email } })`.
    *   Aplicar o *hash* da senha, concatenando o `HASH_PEPPER` do `process.env` se presente.
    *   Criar a entidade com `this.repo.create()` e persistir com `this.repo.save()`.
    *   Implementar `try/catch` para capturar `QueryFailedError` com código `'23505'` (violação de índice único) e lançar `ConflictException`.
*   **Implementar o Método `findAll(query: PaginationQueryDto)`:**
    *   Destruturar o `query` DTO aplicando *defaults* (`page = 1`, `limit = 20`).
    *   Construir dinamicamente a cláusula `where` para o `repo.findAndCount`:
        *   Usar `ILike` para busca textual `q` em `name` OU `email`.
        *   Aplicar filtros `role` e `is_active` (opcionais).
        *   Estruturar o `whereClause` para aplicar OR na busca textual e AND nos demais filtros.
    *   Executar `this.repo.findAndCount` aplicando `order: { createdAt: 'DESC' }`, `skip`, e `take`.
    *   Mapear os dados de saída, aplicando `this.stripSensitive(u)` a cada usuário.

### 4. Implementações de Mocks e Estrutura de Testes Unitários

*   **Implementar a Fábrica de Mocks do Repositório (`repositoryMockFactory`)**: Uma função que retorna um objeto simulando o `Repository<any>` da TypeORM, com `jest.Mock` para os métodos essenciais (`create`, `save`, `findOne`, `findAndCount`, etc.).
*   **Implementar a Tipagem `MockType<T>`** para garantir segurança de tipo ao mockar o repositório.
*   **Implementar o Mock Global do `bcrypt`**: Usar `jest.mock('bcrypt', ...)` para controlar o retorno de `genSalt` e `hash`.
*   **Implementar o Setup do Módulo de Teste (em `users.service.create.spec.ts`):**
    *   Usar `Test.createTestingModule` para configurar o ambiente de injeção.
    *   Substituir o repositório real com o *factory* mockado: `{ provide: getRepositoryToken(User), useFactory: repositoryMockFactory }`.
    *   Implementar `beforeEach` e `afterEach` para gerenciar variáveis de ambiente e limpar mocks (`jest.clearAllMocks()`).
*   **Implementar Testes Unitários para `create`** cobrindo os seguintes cenários:
    *   Caminho feliz (sucesso, normalização de dados, uso de `passwordHash` no salvamento, e exclusão do *hash* no retorno).
    *   Verificação do uso correto de `HASH_PEPPER` do ambiente.
    *   Respeito à `role` explícita.
    *   Tratamento de conflito de email na pré-checagem (`findOne` retorna existente).
    *   Tratamento de conflito de email na condição de corrida (captura de `QueryFailedError` 23505).
*   **Implementar a Estrutura de Pastas de Testes:** Organizar os testes paralelamente ao código fonte, separando `mocks` reutilizáveis e testes específicos (e.g., `users.service.create.spec.ts`).
*   **Implementar a Configuração do Jest (`jest.config.ts`):**
    *   Definir `preset: 'ts-jest'`, `testMatch`, e `moduleNameMapper` para *imports* com `@/`.
    *   Configurar a Cobertura (`collectCoverageFrom`, `coveragePathIgnorePatterns` excluindo DTOs e *Entities*, e `coverageThreshold` exigindo, por exemplo, 80% de linhas).
    *   Garantir qualidade dos mocks com `clearMocks: true`, `resetMocks: true`, `restoreMocks: true`.

### 5. Implementações de Evolução Técnica (Próximos Passos)

*   **Implementar um Service Dedicado para Hash de Senhas** com injeção de dependência.
*   **Implementar Testes Adicionais** para `findOne`, `update`, `remove`, cobrindo cenários de erro de repositório e *timeouts*.
*   **Implementar `UserResponseDto` e Mappers Puros** para garantir transformações controladas na saída e prevenir vazamento de `passwordHash`.
*   **Implementar Filtros Avançados** como busca *full-text*, ordenação dinâmica, e filtragem por intervalo de datas.
*   **Implementar Paginação Baseada em Cursor** para grandes listas.

---

Trabalho Integrado (NestJS) Entrega: 06/10, às 13h (abrir PR com todas as evidências até esse horário) Documentação (Swagger).
Ajustar o main.ts para aplicar um prefixo global /v1 antes da inicialização do Swagger.
Anotar o endpoint de listagem com @ApiQuery para os filtros e @ApiOkResponse para o sucesso.
Containerização (Docker)
Criar um Dockerfile multi-stage para a aplicação NestJS.
Criar um docker-compose.yml contendo:
Serviço db (Postgres).
Serviço app (NestJS) com depends_on e condition: service_healthy para o banco.
Rede dedicada para os serviços.
Criar um script dockerstart.sh que aguarda a conexão com o banco, executa as migrações e então inicia a aplicação.
Endpoint de Listagem Paginada
Implementar um endpoint GET /<entidade> para uma entidade central do projeto.
Adicionar suporte aos query parameters: page, limit, q (busca textual) e filtros específicos do domínio.
Estruturar a resposta no formato { data, total, meta }.
Ocultar campos sensíveis na resposta.
Testes Unitários (Jest)
Criar uma suíte de testes para o Service responsável pela listagem.
Cobrir os seguintes cenários:
Listagem sem filtros.
Com paginação.
Com busca textual.
Com pelo menos 2 filtros específicos do domínio.
Com entradas inválidas (page<1, limit>100).
Utilizar stubs ou spies para simular o repositório, evitando o acesso real ao banco.
Atingir uma cobertura de código de no mínimo 70% para o Service testado.
---
101--- Identificar oque deve ser implementado

O objetivo principal do plano de padronização é **fundamentar o que falta padronizar/criar** (como *validators*, *interceptors*, *guards*, convenções de `enums/` e `dto` vs `dtos`), explicando o que são, para que servem, quando e como usá-los no projeto do serviço *users* no NestJS, aplicando as mudanças em *Pull Requests* (PRs) pequenos e incrementais.

As principais frentes de implementação e padronização identificadas são:

### 1. Padronização de Estrutura e Convenções

A padronização de nomenclatura de pastas e a organização de tipos comuns são cruciais para a previsibilidade e ergonomia de navegação.

*   **Convenção de DTOs:** Padronizar a nomenclatura de pasta para `dto/` (singular) em todo o repositório. Isso implica renomear `src/users/dtos/` para **`src/users/dto/`** e corrigir os imports.
*   **Enums:** Criar uma pasta dedicada para tipos enumerados em `src/users/enums/` e **mover `src/users/domain/user-role.enum.ts`** para esse novo local, ajustando os imports. Se surgirem *enums* globais, eles devem ir para `src/common/enums/`.

### 2. Implementação de Validadores Customizados

Devem ser criados para impor regras de domínio e higiene de dados que não são nativas do `class-validator`/`class-transformer`. A pasta `src/common/validators/` deve ser criada.

*   **`IsTrimmed` (Validator):** Garante a consistência de entrada ao verificar que o valor não contém espaços excedentes à esquerda ou à direita. Deve ser aplicado em campos como `name` nos DTOs.
*   **`ToLowerCase` (Transform):** Normaliza valores para minúsculas. É essencial para campos como `email` ou `username`. Mesmo com o uso de CITEXT no banco de dados, a normalização é útil para consistência em logs e testes.
*   **`IsStrongPassword` (Opcional):** Um validador de exemplo para impor regras de força de senha, como ter 8+ caracteres, maiúsculas, minúsculas e números, caso o *roadmap* inclua autenticação.

### 3. Implementação de Interceptors (Cross-cutting Concerns)

Interceptors são usados para aplicar lógica comum e comportamentos transversais (como logging e timeout) de forma centralizada, promovendo a separação de responsabilidades e evitando duplicação de código. A pasta `src/common/interceptors/` deve ser criada.

*   **`LoggingInterceptor`:** Para logging estruturado, registrando informações como método, rota, status code e latência da requisição.
    *   **Recomendação de Implementação:** Utilizar o `Logger` nativo do NestJS inicialmente, substituindo o `tap()` por **`finalize()`** para garantir que o log seja emitido tanto em casos de sucesso quanto de erro. Deve-se implementar lógica para determinar o nível de log (error/warn/info) baseado no status HTTP (ex: >= 500 como error).
    *   **Meta de Produção:** Avaliar a migração para bibliotecas robustas como **`nestjs-pino` ou `nest-winston`** para logs estruturados em JSON, alto desempenho e rastreabilidade (Correlation ID) em ambientes de produção.
*   **`TimeoutInterceptor`:** Para impor um tempo máximo de resposta (ex: 10 segundos) e evitar requisições penduradas, liberando recursos.
*   **`TransformResponseInterceptor` (Opcional):** Usado para padronizar o formato de saída da resposta (envelopamento) em um padrão como `{ data }` ou `{ data, meta }`. Sua ativação deve ser alinhada com os clientes.

**Registro de Interceptors:** `LoggingInterceptor` e `TimeoutInterceptor` devem ser registrados **globalmente** em `main.ts`.

### 4. Implementação de Guards e Autorização

Guards controlam o fluxo da requisição com base em autenticação e autorização, protegendo rotas sensíveis. A pasta `src/common/guards/` deve ser criada.

*   **Decorator de Roles (`roles.decorator.ts`):** Para definir os papéis necessários para acessar um endpoint.
*   **Guard de Roles (`roles.guard.ts`):** Usa o `Reflector` para ler a metadata de *roles* definida pelo decorator e verificar se o papel do usuário autenticado no *request* (quando existir) está incluído nas roles requeridas.
*   **Guard de JWT (`jwt-auth.guard.ts`):** Deve ser implementado como um *placeholder* (estendendo `AuthGuard('jwt')`), mas **não deve ser aplicado globalmente** até que a estratégia JWT (Passport) seja configurada e implementada no projeto.

### 5. Padronização de Tipagem de Banco de Dados (CITEXT)

É fundamental garantir que as comparações e restrições de unicidade para o campo `email` sejam *case-insensitive* (não diferenciam maiúsculas de minúsculas).

*   **CITEXT (Escolha Recomendada):** A extensão CITEXT do PostgreSQL é a solução ideal por simplificar consultas (`WHERE email = $1`), garantir unicidade nativa de forma *case-insensitive* e otimizar a performance de indexação.
    *   **Implementação (Passo a Passo):**
        1.  Ativar a extensão **`citext`** no banco de dados.
        2.  Migrar a coluna `email` do tipo `TEXT`/`varchar` para o tipo **`CITEXT`**.
        3.  Garantir a restrição `UNIQUE` na coluna `email`, recriando o índice único se necessário.
        4.  Ajustar a entidade TypeORM (`user.entity.ts`) alterando o tipo da coluna para **`type: 'citext'`** e removendo a especificação de *length*.
*   **Alternativa (Índice Funcional):** Caso a extensão CITEXT não seja permitida, pode-se usar um índice funcional no PostgreSQL com `LOWER()` (`CREATE UNIQUE INDEX uq_users_email_lower ON users (LOWER(email));`). Essa abordagem, porém, exige que o desenvolvedor aplique `LOWER(...)` manualmente em todas as consultas e validações da aplicação.

### Roteiro de Implementação Sugerido (PRs)

O plano sugere que a implementação seja dividida em cinco pequenos PRs para garantir a adoção facilitada e a verificação:

1.  **PR#1 (Estrutura Básica):** Renomear `src/users/dtos/` para `src/users/dto/`, criar pastas em `src/common/`, e mover `user-role.enum`, ajustando todos os imports.
2.  **PR#2 (Validadores em DTOs):** Desenvolver e aplicar `IsTrimmed` para campos de texto e a combinação `ToLowerCase` + `IsEmail` para o campo `email` nos DTOs.
3.  **PR#3 (Interceptors de Logging):** Introduzir o `LoggingInterceptor` (com níveis de severidade) e registrar globalmente no `main.ts`.
4.  **PR#4 (Guards e Decorators de Roles):** Implementar `roles.decorator.ts`, `roles.guard.ts` e o `jwt-auth.guard.ts` como *placeholder*.
5.  **PR#5 (CITEXT ou Alternativa):** Aplicar a estratégia de *case-insensitive* para o campo `email` no banco de dados, com uma migração dedicada (CITEXT é a opção primária).