Sistema de controle de patrimonio e inventario 


As implementações podem ser divididas em três fases principais: **Configuração do Ambiente (DevOps/Infraestrutura)**, **Implementação da Entidade Principal (Users)** e **Próximos Passos (Backlog Funcional)**.

### I. Implementação da Configuração do Ambiente e Infraestrutura

A implementação técnica visa garantir um ambiente de desenvolvimento robusto e um fluxo de trabalho eficiente.

1.  **Ambiente Reprodutível (PostgreSQL com Docker Compose):**
    *   **Provisionamento do PostgreSQL** com Docker Compose para criar um ambiente de desenvolvimento estável e versionável.
    *   Criação e configuração do arquivo **`docker-compose.yml`** na raiz do projeto para orquestrar o serviço PostgreSQL local (`patrimonio_inventario_db`), definindo a imagem (`postgres:16`), variáveis de ambiente (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB), portas e volumes.
    *   Definição e uso de um **volume nomeado (`pgdata`)** do Docker para garantir a persistência controlada dos dados entre reinícios do contêiner.
    *   Configuração de um **healthcheck** crucial para verificar se o serviço PostgreSQL está pronto para aceitar conexões.

2.  **Configuração de Segurança e Integração:**
    *   Criação do arquivo **`.env`** contendo variáveis de ambiente sensíveis (como `DB_HOST=localhost`, `DB_PORT=5432`, `DB_USER`, `DB_PASS`, `DB_NAME=patrimonio_inventario`), que **NUNCA deve ser versionado**.
    *   Criação do arquivo **`.env.example`** como referência pública das variáveis necessárias (mas sem os valores sensíveis), o qual **DEVE ser versionado**.
    *   Atualizar o **`.env.example`** e garantir que o **`.env`** esteja corretamente listado no **`.gitignore`** para evitar vazamento de credenciais.

3.  **Configuração TypeORM e Migrações:**
    *   Configuração de um **DataSource robusto** (no arquivo `src/database/data-source.ts`).
    *   Garantir que a propriedade `entities` no DataSource esteja configurada para buscar arquivos `.entity.ts`.
    *   Configurar o **DataSource** para ter o `export default` (lição aprendida após falhas).
    *   Aplicação de migrações para a entidade User de forma auditável.

4.  **Otimização do Workflow Git/CI:**
    *   **Estabilização Lint/ESM e CI**, assegurando que o CI permaneça verde e o código esteja padronizado.
    *   Consolidação de um fluxo de trabalho Git eficaz para manter um histórico limpo, especialmente para **Pull Requests (PRs) de infraestrutura**, que devem nascer diretamente da branch `main` (`git switch -c chore/db-compose origin/main`).

### II. Implementação da Entidade User e Migração

Estes passos transformam as diretrizes conceituais da entidade `User` em código e esquema de banco de dados.

1.  **Criação da Branch Dedicada:**
    *   Criar uma nova branch específica para as alterações da entidade e migração (ex: `feat/users-entity-migration`), a partir da `main` atualizada.

2.  **Definição da Entidade User (TypeORM):**
    *   Criar o arquivo **`src/users/entities/user.entity.ts`**.
    *   Definir o `enum UserRole` com os papéis `STUDENT`, `TEACHER`, e `ADMIN`.
    *   Definir a classe **`User`** com os campos e tipos TypeORM correspondentes, garantindo o uso de `snake_case` para os nomes das colunas no banco de dados (ex: `password_hash`, `is_active`).
    *   Implementar um **índice único** na coluna `email` para garantir a integridade dos dados.

3.  **Geração e Aplicação da Migração:**
    *   **Gerar o arquivo de migração** usando a CLI do TypeORM (`migration:generate`), que conterá o SQL para criar a tabela `users`.
    *   Garantir que o **timestamp em milissegundos** esteja tanto no nome do arquivo quanto no nome da classe de migração (Regra de ouro, para evitar o erro de "migration name is wrong").
    *   Rodar a migração para aplicar as mudanças no banco de dados (`migration:run`).

4.  **Finalização:**
    *   Realizar o **Commit, Push e PR** da entidade e migração, usando mensagens claras e, idealmente, fechando a issue relacionada (`Closes #<ID-DA-ISSUE>`).

### III. Próximos Passos (Backlog Imediato)

Após a persistência do domínio ter sido estabelecida com sucesso, os próximos passos naturais para expandir a borda da API são:

1.  **DTOs e Validações:**
    *   Desenvolvimento dos **Data Transfer Objects (DTOs)** para entrada e saída de dados.
    *   Criação das **validações de input**.

2.  **Camadas da API:**
    *   Implementação das camadas de **Controller e Service** para expor as operações CRUD (Create, Read, Update, Delete) com regras de negócio mínimas.
    *   Implementação do **CRUD** (mencionado como próximo passo fora do escopo inicial).

3.  **Qualidade e Documentação:**
    *   Geração de **documentação interativa da API** utilizando **Swagger**.
    *   Tratamento padronizado de erros para feedback claro.
    *   Criação de **testes** (unitários e end-to-end) para garantir a robustez do sistema.
    *   Criação de scripts de **seed de dados** para popular o banco de dados em ambientes de desenvolvimento.

4.  **Funcionalidades Avançadas:**
    *   Adição de funcionalidades como **Paginação e Filtros** (ex: por nome/e-mail).
    *   Implementação de políticas de acesso (**Autenticação/RBAC**).
    