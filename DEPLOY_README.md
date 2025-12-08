# 🚀 Guia de Deploy - Sistema de Gestão de Patrimônio

Este guia explica como fazer o deploy do Sistema de Gestão de Patrimônio usando Docker Compose.

## 📋 Pré-requisitos

- Docker instalado (versão 20.10+)
- Docker Compose instalado (versão 2.0+)
- Acesso ao GitHub Container Registry (ghcr.io) ou registry de sua escolha
- Bash (Linux/Mac) ou Git Bash/WSL (Windows)

## 🏗️ Arquitetura

O sistema é composto por 8 containers:

1. **PostgreSQL** (porta interna 5432) - Banco de dados
2. **Users Service** (porta 3002) - Gestão de usuários
3. **Auth Service** (porta 3001) - Autenticação e JWT
4. **Patrimonio Service** (porta 3003) - Gestão de patrimônio
5. **Categorias Service** (porta 3004) - Gestão de categorias
6. **Audit Service** (porta 3005) - Auditoria e logs
7. **Events Service** (porta 3006) - Gestão de eventos
8. **API Gateway** (porta 3100) - Gateway unificado

## 🔧 Configuração Inicial

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/patrimonio-inventario.git
cd patrimonio-inventario
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure os valores:

```bash
cp env.prod.example .env.prod
```

**⚠️ IMPORTANTE:** Edite `.env.prod` e substitua **TODOS** os valores `CHANGEME`:

```bash
# Linux/Mac
nano .env.prod

# Windows
notepad .env.prod
```

#### Gerar Segredos Fortes

Use estes comandos para gerar valores seguros:

```bash
# Gerar JWT_ACCESS_SECRET
openssl rand -hex 32

# Gerar JWT_REFRESH_SECRET
openssl rand -hex 32

# Gerar HASH_PEPPER
openssl rand -hex 32

# Gerar SERVICE_TOKEN
openssl rand -hex 32

# Gerar senha do PostgreSQL
openssl rand -base64 24
```

### 3. Configurar REPO_OWNER

No arquivo `.env.prod`, defina seu usuário do GitHub:

```env
REPO_OWNER=seu-usuario-github
```

## 🚀 Deploy

### Opção 1: Deploy Automatizado (Recomendado)

Use o script de deploy que já faz todas as verificações:

```bash
# Tornar o script executável (apenas primeira vez)
chmod +x deploy-prod.sh

# Executar deploy
./deploy-prod.sh
```

O script irá:
1. ✅ Verificar se `.env.prod` existe
2. ✅ Validar variáveis obrigatórias
3. ✅ Baixar imagens Docker
4. ✅ Subir todos os containers
5. ✅ Executar health checks
6. ✅ Mostrar status dos serviços

### Opção 2: Deploy Manual

Se preferir controle manual:

```bash
# 1. Baixar imagens
docker compose -f docker-compose.deploy.yml pull

# 2. Subir containers
docker compose -f docker-compose.deploy.yml up -d

# 3. Aguardar containers ficarem saudáveis
sleep 15

# 4. Verificar status
docker compose -f docker-compose.deploy.yml ps
```

## 🔍 Verificação

### Health Checks

Após o deploy, teste os endpoints de saúde:

```bash
# Auth Service
curl http://localhost:3001/health

# Users Service
curl http://localhost:3002/health

# Patrimonio Service
curl http://localhost:3003/health

# Categorias Service
curl http://localhost:3004/health

# Audit Service
curl http://localhost:3005/health

# Events Service
curl http://localhost:3006/health

# API Gateway
curl http://localhost:3100/health
```

Resposta esperada: `{"status":"ok"}`

### Logs

Ver logs de todos os serviços:

```bash
docker compose -f docker-compose.deploy.yml logs --tail=50
```

Ver logs de um serviço específico:

```bash
docker compose -f docker-compose.deploy.yml logs -f auth-service
```

## 📊 Comandos Úteis

### Status dos Containers

```bash
docker compose -f docker-compose.deploy.yml ps
```

### Restart de Serviços

```bash
# Restart de um serviço específico
docker compose -f docker-compose.deploy.yml restart auth-service

# Restart de todos os serviços
docker compose -f docker-compose.deploy.yml restart
```

### Parar Containers

```bash
# Parar sem remover volumes
docker compose -f docker-compose.deploy.yml down

# Parar e remover volumes (⚠️ APAGA DADOS DO BANCO!)
docker compose -f docker-compose.deploy.yml down -v
```

### Executar Comandos em Containers

```bash
# Bash no container do PostgreSQL
docker compose -f docker-compose.deploy.yml exec db bash

# Conectar ao PostgreSQL
docker compose -f docker-compose.deploy.yml exec db psql -U postgres -d patrimonio_inventario

# Bash em um serviço
docker compose -f docker-compose.deploy.yml exec users-service sh
```

### Migrations

```bash
# Users Service
docker compose -f docker-compose.deploy.yml exec users-service npm run migration:run

# Auth Service
docker compose -f docker-compose.deploy.yml exec auth-service npm run migration:run

# Patrimonio Service
docker compose -f docker-compose.deploy.yml exec patrimonio-service npm run migration:run

# Categorias Service
docker compose -f docker-compose.deploy.yml exec categorias-service npm run migration:run

# Audit Service
docker compose -f docker-compose.deploy.yml exec audit-service npm run migration:run

# Events Service
docker compose -f docker-compose.deploy.yml exec events-service npm run migration:run
```

### Criar Usuário Admin Inicial

```bash
# Conectar ao users-service e criar admin
docker compose -f docker-compose.deploy.yml exec users-service sh -c "
node -e \"
const bcrypt = require('bcryptjs');
const { Client } = require('pg');

async function createAdmin() {
  const client = new Client({
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'patrimonio_inventario'
  });

  await client.connect();

  const pepper = process.env.HASH_PEPPER || '';
  const password = 'AdminPassword123!';
  const passwordHash = await bcrypt.hash(password + pepper, 12);

  await client.query(
    'INSERT INTO users.users (id, name, email, password_hash, role, is_active, created_at, updated_at, version) VALUES (gen_random_uuid(), \$1, \$2, \$3, \$4, true, NOW(), NOW(), 1) ON CONFLICT (email) DO NOTHING',
    ['Administrador', 'admin@patrimonio.com', passwordHash, 'ADMIN']
  );

  console.log('✅ Admin criado: admin@patrimonio.com / AdminPassword123!');
  await client.end();
}

createAdmin();
\"
"
```

## 🔒 Segurança

### Checklist de Segurança para Produção

- [ ] Todos os valores `CHANGEME` foram substituídos
- [ ] Segredos JWT são fortes (32+ caracteres aleatórios)
- [ ] HASH_PEPPER é forte e único
- [ ] Senha do PostgreSQL é forte
- [ ] SERVICE_TOKEN é forte e único
- [ ] SWAGGER_ENABLED=false (desabilitar Swagger em produção)
- [ ] DEV_AUTO_AUTH=false (desabilitar auto-auth)
- [ ] Arquivo `.env.prod` NÃO está no Git (.gitignore)
- [ ] Firewall configurado (apenas portas necessárias abertas)
- [ ] HTTPS configurado (usar reverse proxy como Nginx)
- [ ] Backup do banco de dados configurado

## 🔄 Atualização

### Atualizar Serviços para Nova Versão

```bash
# 1. Definir tags específicas
export USERS_IMAGE_TAG=v1.2.3
export AUTH_IMAGE_TAG=v1.2.3
# ... outros serviços

# 2. Executar deploy
./deploy-prod.sh

# Ou manualmente:
docker compose -f docker-compose.deploy.yml pull
docker compose -f docker-compose.deploy.yml up -d
```

### Rollback

```bash
# 1. Definir tags antigas
export USERS_IMAGE_TAG=v1.2.2
export AUTH_IMAGE_TAG=v1.2.2

# 2. Executar deploy
./deploy-prod.sh
```

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs do container com problemas
docker compose -f docker-compose.deploy.yml logs [service-name]

# Ver últimas 100 linhas
docker compose -f docker-compose.deploy.yml logs --tail=100 [service-name]
```

### Erro de conexão com banco de dados

```bash
# Verificar se o PostgreSQL está rodando
docker compose -f docker-compose.deploy.yml ps db

# Testar conexão
docker compose -f docker-compose.deploy.yml exec db pg_isready -U postgres

# Ver logs do PostgreSQL
docker compose -f docker-compose.deploy.yml logs db
```

### Serviço retorna 502/503

1. Verifique se o container está rodando: `docker compose -f docker-compose.deploy.yml ps`
2. Verifique os logs: `docker compose -f docker-compose.deploy.yml logs [service-name]`
3. Verifique health check: `curl http://localhost:[port]/health`
4. Reinicie o serviço: `docker compose -f docker-compose.deploy.yml restart [service-name]`

### Espaço em disco cheio

```bash
# Remover containers parados
docker container prune

# Remover imagens não usadas
docker image prune -a

# Remover volumes não usados (⚠️ CUIDADO)
docker volume prune

# Ver uso de espaço
docker system df
```

## 📚 Referências

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)

## 📝 Notas

- O banco de dados usa um volume persistente (`pgdata`)
- Uploads do patrimonio-service usam volume persistente (`uploads`)
- Containers reiniciam automaticamente (`restart: unless-stopped`)
- Health checks verificam os serviços a cada 30 segundos

