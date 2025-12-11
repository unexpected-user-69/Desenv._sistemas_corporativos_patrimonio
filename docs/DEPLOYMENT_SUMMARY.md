# 📦 Resumo da Adaptação de Deploy

## ✅ O que foi feito

Adaptei o material do professor (Plataforma Aurora com 3 microserviços) para o seu Sistema de Gestão de Patrimônio (7 microserviços + API Gateway).

### Arquivos Criados

1. **`docker-compose.deploy.yml`** ✅
   - Configuração Docker Compose para deploy de produção
   - 8 serviços: PostgreSQL + 7 microserviços
   - Networks e volumes configurados
   - Health checks implementados
   - Dependencies entre serviços

2. **`deploy-prod.sh`** ✅
   - Script automatizado de deploy
   - Validação de variáveis de ambiente
   - Pull de imagens Docker
   - Health checks automáticos
   - Suporte a verificação de assinatura (cosign)

3. **`env.prod.example`** ✅
   - Template de variáveis de ambiente
   - Documentação completa de cada variável
   - Valores placeholder (CHANGEME)
   - Instruções para gerar segredos seguros

4. **`postgres-init/01-create-schemas.sql`** ✅
   - Script SQL para inicialização do PostgreSQL
   - Criação automática dos 6 schemas (users, auth, patrimonio, categorias, audit, events)
   - Configuração de permissões
   - Extensão UUID habilitada

5. **`DEPLOY_README.md`** ✅
   - Documentação completa de deploy
   - Pré-requisitos
   - Guia passo a passo
   - Comandos úteis
   - Troubleshooting
   - Checklist de segurança

6. **`QUICK_COMMANDS.md`** ✅
   - Referência rápida de comandos
   - Baseado nos exemplos do professor
   - Comandos mais usados
   - Troubleshooting rápido

## 🏗️ Arquitetura

### Microserviços

| Serviço | Porta | Schema DB | Dependências |
|---------|-------|-----------|--------------|
| **PostgreSQL** | 5432 | - | - |
| **Users Service** | 3002 | `users` | PostgreSQL |
| **Auth Service** | 3001 | `auth` | PostgreSQL, Users |
| **Patrimonio Service** | 3003 | `patrimonio` | PostgreSQL, Auth, Users |
| **Categorias Service** | 3004 | `categorias` | PostgreSQL, Auth |
| **Audit Service** | 3005 | `audit` | PostgreSQL, Auth, Users |
| **Events Service** | 3006 | `events` | PostgreSQL, Auth |
| **API Gateway** | 3100 | - | Todos os serviços |

### Fluxo de Inicialização

```
1. PostgreSQL inicia
   └─> Executa scripts em postgres-init/
       └─> Cria schemas necessários

2. Users Service inicia
   └─> Conecta ao schema users
   └─> Roda migrations

3. Auth Service inicia
   └─> Aguarda Users Service ficar healthy
   └─> Conecta ao schema auth

4. Serviços de Domínio iniciam em paralelo
   ├─> Patrimonio Service (aguarda Auth)
   ├─> Categorias Service (aguarda Auth)
   ├─> Audit Service (aguarda Auth)
   └─> Events Service (aguarda Auth)

5. API Gateway inicia
   └─> Aguarda todos os serviços ficarem healthy
   └─> Expõe API unificada na porta 3100
```

## 📋 Próximos Passos

### 1. Configurar Variáveis de Ambiente

```bash
# 1. Copiar template
cp env.prod.example .env.prod

# 2. Gerar segredos
openssl rand -hex 32  # Para JWT_ACCESS_SECRET
openssl rand -hex 32  # Para JWT_REFRESH_SECRET
openssl rand -hex 32  # Para HASH_PEPPER
openssl rand -hex 32  # Para SERVICE_TOKEN
openssl rand -base64 24  # Para POSTGRES_PASSWORD

# 3. Editar .env.prod e preencher os valores
nano .env.prod  # ou notepad .env.prod no Windows
```

**Valores obrigatórios a preencher:**
- `REPO_OWNER` - seu usuário do GitHub
- `JWT_ACCESS_SECRET` - segredo do JWT (gerado com openssl)
- `JWT_REFRESH_SECRET` - segredo do refresh token (gerado com openssl)
- `HASH_PEPPER` - pepper para hash de senhas (gerado com openssl)
- `POSTGRES_PASSWORD` - senha do PostgreSQL (forte!)
- `SERVICE_TOKEN` - token para comunicação entre serviços

### 2. Construir Imagens Docker (Desenvolvimento)

Se você ainda não publicou as imagens no GitHub Container Registry:

```bash
cd backend/packages

# Construir cada serviço
docker build -t patrimonio/users-service:latest ./users-service
docker build -t patrimonio/auth-service:latest ./auth-service
docker build -t patrimonio/patrimonio-service:latest ./patrimonio-service
docker build -t patrimonio/categorias-service:latest ./categorias-service
docker build -t patrimonio/audit-service:latest ./audit-service
docker build -t patrimonio/events-service:latest ./events-service
docker build -t patrimonio/api-gateway:latest ./api-gateway
```

**Ou usar docker-compose para construir:**

```bash
# No diretório backend/
docker compose build
```

### 3. Publicar no GitHub Container Registry (Produção)

```bash
# Login no GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u SEU_USUARIO --password-stdin

# Tag das imagens
docker tag patrimonio/users-service:latest ghcr.io/SEU_USUARIO/users-service:latest
docker tag patrimonio/auth-service:latest ghcr.io/SEU_USUARIO/auth-service:latest
# ... outros serviços

# Push das imagens
docker push ghcr.io/SEU_USUARIO/users-service:latest
docker push ghcr.io/SEU_USUARIO/auth-service:latest
# ... outros serviços
```

### 4. Fazer Deploy

```bash
# Tornar script executável (apenas primeira vez)
chmod +x deploy-prod.sh

# Executar deploy
./deploy-prod.sh
```

### 5. Verificar Deploy

```bash
# Ver status dos containers
docker compose -f docker-compose.deploy.yml ps

# Ver logs
docker compose -f docker-compose.deploy.yml logs --tail=50

# Testar health checks
curl http://localhost:3001/health  # Auth
curl http://localhost:3002/health  # Users
curl http://localhost:3003/health  # Patrimonio
curl http://localhost:3004/health  # Categorias
curl http://localhost:3005/health  # Audit
curl http://localhost:3006/health  # Events
curl http://localhost:3100/health  # Gateway
```

### 6. Criar Usuário Admin

```bash
# Conectar ao users-service
docker compose -f docker-compose.deploy.yml exec users-service sh

# Dentro do container, criar admin (exemplo)
# Ou use o script que você criou anteriormente
```

## 🔄 Comparação com Material do Professor

### O que foi adaptado:

| Aurora (Professor) | Patrimônio (Seu) |
|-------------------|------------------|
| 3 microserviços | 7 microserviços + Gateway |
| 3 portas (3010-3012) | 8 portas (3001-3006, 3100) |
| Schemas: users, auth, events | Schemas: users, auth, patrimonio, categorias, audit, events |
| Sem API Gateway | Com API Gateway na porta 3100 |
| 3 health checks | 7 health checks |
| Variáveis simples | Variáveis completas + SERVICE_TOKEN |

### O que permaneceu igual:

- ✅ Uso de Docker Compose
- ✅ PostgreSQL com múltiplos schemas
- ✅ Health checks
- ✅ Volumes persistentes
- ✅ Network isolada
- ✅ Restart policies
- ✅ Estrutura de .env
- ✅ Script de deploy automatizado

## 📚 Documentação Disponível

1. **DEPLOY_README.md** - Guia completo de deploy (este arquivo que você está lendo)
2. **QUICK_COMMANDS.md** - Referência rápida de comandos
3. **env.prod.example** - Template de variáveis de ambiente

## ⚠️ Checklist Antes de Ir para Produção

- [ ] Todos os valores CHANGEME foram substituídos no .env.prod
- [ ] Segredos são fortes (32+ caracteres aleatórios)
- [ ] SWAGGER_ENABLED=false
- [ ] DEV_AUTO_AUTH=false
- [ ] Arquivo .env.prod não está no Git
- [ ] Imagens foram publicadas no registry
- [ ] REPO_OWNER está correto no .env.prod
- [ ] Backup do banco configurado
- [ ] HTTPS configurado (reverse proxy)
- [ ] Firewall configurado
- [ ] Monitoramento configurado
- [ ] Health checks funcionando
- [ ] Migrations executadas
- [ ] Usuário admin criado
- [ ] Testes de integração passando

## 🆘 Suporte

Se tiver problemas:

1. Consulte **DEPLOY_README.md** seção Troubleshooting
2. Consulte **QUICK_COMMANDS.md** para comandos rápidos
3. Verifique logs: `docker compose -f docker-compose.deploy.yml logs [servico]`
4. Verifique health checks: `curl http://localhost:[porta]/health`

## 🎉 Sucesso!

Se tudo funcionou:
- ✅ Todos os containers estão rodando
- ✅ Health checks retornam `{"status":"ok"}`
- ✅ API Gateway responde na porta 3100
- ✅ Você consegue fazer login e usar a API

**Parabéns! Seu Sistema de Gestão de Patrimônio está em produção! 🚀**

