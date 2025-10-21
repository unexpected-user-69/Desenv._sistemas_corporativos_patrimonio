# Scripts de Automação

Este diretório contém scripts de automação para configurar e gerenciar o projeto Patrimônio e Inventário.

## 📋 Scripts Disponíveis

### 🏛️ `setup-governanca.sh`
Configura a governança do repositório GitHub, incluindo:
- Labels organizacionais, de prioridade e governança
- Milestones estratégicos (M1, M2, M3)
- Project Board Kanban
- Branch Protection Rules
- Verificação de CODEOWNERS e Dependabot

**Uso:**
```bash
npm run setup:governance
# ou
bash scripts/setup-governanca.sh
```

**Pré-requisitos:**
- GitHub CLI (gh) instalado e autenticado
- Acesso de administrador ao repositório

### 🚀 `setup-environment.sh`
Configura um novo ambiente de desenvolvimento, incluindo:
- Verificação de dependências do sistema
- Instalação de dependências do projeto
- Configuração do arquivo .env
- Inicialização do banco de dados PostgreSQL
- Execução de migrações
- Execução de testes e lint
- Configuração de Git hooks

**Uso:**
```bash
npm run setup:environment
# ou
bash scripts/setup-environment.sh
```

**Pré-requisitos:**
- Node.js e npm instalados
- Docker e Docker Compose instalados (para banco de dados)
- Git configurado

### 🔄 `run-migrations.ts`
Script TypeScript para executar migrações do banco de dados com:
- Verificação de conexão
- Execução de migrações pendentes
- Relatório detalhado de status
- Tratamento de erros específicos
- Logs estruturados

**Uso:**
```bash
npm run migration:run:script
# ou
npx ts-node scripts/run-migrations.ts
# ou
node dist/scripts/run-migrations.js
```

**Pré-requisitos:**
- Banco de dados PostgreSQL rodando
- Arquivo .env configurado
- Dependências instaladas

### 🚀 `setup-cicd.sh`
Configura CI/CD e automação, incluindo:
- Verificação do GitHub CLI
- Configuração de workflows de CI
- Configuração do Dependabot
- Configuração do CodeQL
- Automação de releases
- Proteção de branches

**Uso:**
```bash
npm run setup:cicd
# ou
bash scripts/setup-cicd.sh
```

**Pré-requisitos:**
- GitHub CLI (gh) instalado e autenticado
- Acesso de administrador ao repositório

## 🛠️ Instalação e Configuração

### 1. Pré-requisitos do Sistema

**Windows:**
```bash
# Instalar Node.js
# Download: https://nodejs.org/

# Instalar Docker Desktop
# Download: https://docs.docker.com/desktop/windows/install/

# Instalar GitHub CLI
# Download: https://cli.github.com/
```

**Linux/macOS:**
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### 2. Configuração Inicial

```bash
# 1. Clonar o repositório
git clone <repository-url>
cd Desenv._sistemas_corporativos_patrimonio

# 2. Configurar ambiente de desenvolvimento
npm run setup:environment

# 3. Configurar governança (opcional)
npm run setup:governance

# 4. Configurar CI/CD (opcional)
npm run setup:cicd
```

## 📚 Comandos Úteis

### Desenvolvimento
```bash
# Iniciar aplicação
npm run start:dev

# Executar testes
npm test

# Executar lint
npm run lint

# Executar build
npm run build

# Executar migrações
npm run migration:run
```

### Scripts de Automação
```bash
# Configurar governança
npm run setup:governance

# Configurar ambiente
npm run setup:environment

# Configurar CI/CD
npm run setup:cicd

# Executar migrações via script
npm run migration:run:script
```

### Docker
```bash
# Iniciar banco de dados
docker-compose up db -d

# Ver logs do banco
docker-compose logs db

# Parar banco de dados
docker-compose down
```

## 🔧 Troubleshooting

### Problemas Comuns

**1. Erro de permissão no GitHub CLI:**
```bash
gh auth login
gh auth status
```

**2. Banco de dados não conecta:**
```bash
# Verificar se Docker está rodando
docker ps

# Verificar logs do banco
docker-compose logs db

# Reiniciar banco
docker-compose restart db
```

**3. Migrações falham:**
```bash
# Verificar conexão
npm run migration:run:script

# Verificar arquivo .env
cat .env
```

**4. Testes falham:**
```bash
# Executar testes com verbose
npm test -- --verbose

# Executar testes específicos
npm test -- --testNamePattern="UsersService"
```

## 📖 Documentação Adicional

- [README.md](../README.md) - Documentação principal do projeto
- [implementacoes_completas.md](../implementacoes_completas.md) - Status das implementações
- [.env.example](../.env.example) - Exemplo de configuração
- [docker-compose.yml](../docker-compose.yml) - Configuração do banco de dados

## 🤝 Contribuição

Para contribuir com melhorias nos scripts:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as melhorias
4. Teste os scripts
5. Faça um pull request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.
