# ⚡ Guia Rápido de Comandos - Deploy

Baseado no material do professor, aqui estão os comandos essenciais para fazer deploy da sua aplicação.

## 🚀 Deploy Inicial

```bash
# 1. Baixar docker-compose (se não tiver localmente)
# curl -O https://raw.githubusercontent.com/seu-usuario/patrimonio-inventario/main/docker-compose.deploy.yml

# 2. Criar arquivo .env.prod
cp env.prod.example .env.prod
# Editar e preencher os valores CHANGEME

# 3. Fazer deploy
./deploy-prod.sh
```

## 📦 Comandos Docker Compose

### Subir Containers

```bash
# Subir todos os serviços (em background)
docker compose -f docker-compose.deploy.yml up -d

# Subir e ver logs em tempo real
docker compose -f docker-compose.deploy.yml up
```

### Parar Containers

```bash
# Parar sem remover (dados preservados)
docker compose -f docker-compose.deploy.yml down

# Parar e remover volumes (⚠️ APAGA DADOS!)
docker compose -f docker-compose.deploy.yml down -v
```

### Ver Logs

```bash
# Ver últimas 50 linhas de todos os serviços
docker compose -f docker-compose.deploy.yml logs --tail=50

# Ver logs em tempo real (follow)
docker compose -f docker-compose.deploy.yml logs -f

# Ver logs de um serviço específico
docker compose -f docker-compose.deploy.yml logs -f auth-service
docker compose -f docker-compose.deploy.yml logs -f users-service
docker compose -f docker-compose.deploy.yml logs -f patrimonio-service
```

### Ver Status

```bash
# Ver status de todos os containers
docker compose -f docker-compose.deploy.yml ps

# Ver detalhes de um container
docker compose -f docker-compose.deploy.yml ps users-service
```

### Restart

```bash
# Restart de todos os serviços
docker compose -f docker-compose.deploy.yml restart

# Restart de um serviço específico
docker compose -f docker-compose.deploy.yml restart auth-service
```

## 🔍 Comandos de Verificação

### Health Checks

```bash
# Testar todos os serviços
curl http://localhost:3001/health  # Auth
curl http://localhost:3002/health  # Users
curl http://localhost:3003/health  # Patrimonio
curl http://localhost:3004/health  # Categorias
curl http://localhost:3005/health  # Audit
curl http://localhost:3006/health  # Events
curl http://localhost:3100/health  # Gateway
```

### Testar API Gateway

```bash
# Swagger (se habilitado)
curl http://localhost:3100/docs

# Health do gateway
curl http://localhost:3100/health

# Versão da API
curl http://localhost:3100/
```

## 🔧 Manutenção

### Limpar Recursos

```bash
# Remover containers parados
docker container prune -f

# Remover imagens não usadas
docker image prune -a -f

# Remover volumes não usados (⚠️ CUIDADO)
docker volume prune -f

# Limpar tudo (⚠️ MUITO CUIDADO!)
docker system prune -a --volumes -f
```

### Backup do Banco

```bash
# Fazer backup
docker compose -f docker-compose.deploy.yml exec -T db pg_dump -U postgres patrimonio_inventario > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar backup
docker compose -f docker-compose.deploy.yml exec -T db psql -U postgres patrimonio_inventario < backup_20251207_120000.sql
```

### Acessar PostgreSQL

```bash
# Conectar ao PostgreSQL
docker compose -f docker-compose.deploy.yml exec db psql -U postgres -d patrimonio_inventario

# Ver schemas
docker compose -f docker-compose.deploy.yml exec db psql -U postgres -d patrimonio_inventario -c "\dn"

# Ver tabelas de um schema
docker compose -f docker-compose.deploy.yml exec db psql -U postgres -d patrimonio_inventario -c "\dt users.*"
docker compose -f docker-compose.deploy.yml exec db psql -U postgres -d patrimonio_inventario -c "\dt patrimonio.*"

# Ver usuários
docker compose -f docker-compose.deploy.yml exec db psql -U postgres -d patrimonio_inventario -c "SELECT id, name, email, role FROM users.users;"
```

## 🔄 Atualização

### Atualizar para Nova Versão

```bash
# 1. Baixar novas imagens
docker compose -f docker-compose.deploy.yml pull

# 2. Recriar containers com novas imagens
docker compose -f docker-compose.deploy.yml up -d

# 3. Verificar se tudo subiu corretamente
docker compose -f docker-compose.deploy.yml ps
docker compose -f docker-compose.deploy.yml logs --tail=50
```

### Atualizar Versão Específica

```bash
# Definir tags específicas
export USERS_IMAGE_TAG=v1.2.3
export AUTH_IMAGE_TAG=v1.2.3
export PATRIMONIO_IMAGE_TAG=v1.2.3
export CATEGORIAS_IMAGE_TAG=v1.2.3
export AUDIT_IMAGE_TAG=v1.2.3
export EVENTS_IMAGE_TAG=v1.2.3
export GATEWAY_IMAGE_TAG=v1.2.3

# Fazer deploy
./deploy-prod.sh
```

## 🐛 Troubleshooting Rápido

### Container não está rodando

```bash
# 1. Ver status
docker compose -f docker-compose.deploy.yml ps

# 2. Ver logs do container problemático
docker compose -f docker-compose.deploy.yml logs [nome-do-servico]

# 3. Reiniciar container
docker compose -f docker-compose.deploy.yml restart [nome-do-servico]

# 4. Se não resolver, recriar container
docker compose -f docker-compose.deploy.yml up -d --force-recreate [nome-do-servico]
```

### Erro 502/503 no Gateway

```bash
# 1. Verificar se os serviços backend estão rodando
docker compose -f docker-compose.deploy.yml ps

# 2. Testar health check dos serviços
curl http://localhost:3001/health
curl http://localhost:3002/health
# ... outros serviços

# 3. Ver logs do gateway
docker compose -f docker-compose.deploy.yml logs api-gateway

# 4. Reiniciar gateway
docker compose -f docker-compose.deploy.yml restart api-gateway
```

### Banco de dados não conecta

```bash
# 1. Verificar se o PostgreSQL está rodando
docker compose -f docker-compose.deploy.yml ps db

# 2. Testar conexão
docker compose -f docker-compose.deploy.yml exec db pg_isready -U postgres

# 3. Ver logs
docker compose -f docker-compose.deploy.yml logs db

# 4. Se necessário, reiniciar
docker compose -f docker-compose.deploy.yml restart db
```

## 📊 Monitoramento

### Ver Uso de Recursos

```bash
# Ver uso de CPU/Memória
docker stats

# Ver uso de disco
docker system df

# Ver detalhes de um container
docker inspect [container-id]
```

### Ver Logs em Tempo Real (Multi-serviço)

```bash
# Ver logs de múltiplos serviços simultaneamente
docker compose -f docker-compose.deploy.yml logs -f auth-service users-service patrimonio-service
```

## 🔐 Segurança

### Gerar Segredos

```bash
# JWT_ACCESS_SECRET
openssl rand -hex 32

# JWT_REFRESH_SECRET
openssl rand -hex 32

# HASH_PEPPER
openssl rand -hex 32

# SERVICE_TOKEN
openssl rand -hex 32

# Senha PostgreSQL
openssl rand -base64 24
```

### Verificar Permissões

```bash
# Verificar permissões do .env.prod
ls -la .env.prod

# Deve ser: -rw------- (600)
# Se não, corrigir:
chmod 600 .env.prod
```

## 📝 Comandos do Professor (Adaptados)

```bash
# 1. Parar tudo e limpar volumes
docker compose -f docker-compose.deploy.yml down -v

# 2. Subir tudo
docker compose -f docker-compose.deploy.yml up -d

# 3. Ver logs
docker compose -f docker-compose.deploy.yml logs --tail=50

# 4. Parar sem limpar
docker compose -f docker-compose.deploy.yml down

# 5. Limpar volumes órfãos
docker volume prune -f
```

## 💡 Dicas

- Use sempre `-f docker-compose.deploy.yml` para especificar o arquivo
- Adicione `-d` para rodar em background (daemon mode)
- Use `--tail=N` para limitar número de linhas nos logs
- Use `-f` nos logs para seguir em tempo real (follow)
- Sempre faça backup antes de usar `down -v`

