# 🐳 Comandos Docker - Sistema de Patrimônio

Este guia documenta os comandos Docker essenciais para trabalhar com o projeto.

## 📋 Pré-requisitos

- Docker instalado e rodando
- Docker Compose instalado
- Portas 5432 (PostgreSQL) e 3101 (Backend) disponíveis

## 🚀 Comandos Básicos

### Iniciar Serviços

```bash
# Iniciar apenas o banco de dados
docker-compose up -d db

# Iniciar todos os serviços (banco + aplicação)
docker-compose up -d

# Iniciar em modo foreground (ver logs)
docker-compose up
```

### Parar Serviços

```bash
# Parar todos os serviços
docker-compose down

# Parar e remover volumes (⚠️ apaga dados do banco)
docker-compose down -v

# Parar apenas um serviço específico
docker-compose stop db
```

### Verificar Status

```bash
# Ver status dos containers
docker-compose ps

# Ver logs de um serviço
docker-compose logs -f db
docker-compose logs -f app

# Ver logs de todos os serviços
docker-compose logs -f
```

## 🔧 Comandos de Desenvolvimento

### Build da Aplicação

```bash
# Build da imagem Docker
docker-compose build app

# Build forçando recriação (sem cache)
docker-compose build --no-cache app
```

### Executar Comandos no Container

```bash
# Executar comandos no container do backend
docker-compose exec app npm test
docker-compose exec app npm run lint
docker-compose exec app npm run migration:run

# Acessar shell do container
docker-compose exec app sh
```

### Banco de Dados

```bash
# Acessar PostgreSQL no container
docker-compose exec db psql -U postgres -d patrimonio_inventario

# Executar SQL direto
docker-compose exec db psql -U postgres -d patrimonio_inventario -c "SELECT version();"

# Backup do banco
docker-compose exec db pg_dump -U postgres patrimonio_inventario > backup.sql

# Restaurar backup
docker-compose exec -T db psql -U postgres -d patrimonio_inventario < backup.sql
```

## 📦 Variáveis de Ambiente

### Configuração

As variáveis de ambiente são configuradas no arquivo `.env` ou `docker-compose.yml`.

**Variáveis principais:**
- `DB_HOST=db` (nome do serviço no Docker)
- `DB_PORT=5432`
- `DB_USER=postgres`
- `DB_PASS=postgres`
- `DB_NAME=patrimonio_inventario`
- `PORT=3101`
- `NODE_ENV=development`
- `JWT_ACCESS_SECRET=dev_access_secret_change_in_production`
- `JWT_REFRESH_SECRET=dev_refresh_secret_change_in_production`
- `REFRESH_EXPIRES_DAYS=7`

### Criar Arquivo .env

```bash
# Copiar exemplo
cp .env.example .env

# Editar com suas configurações
# IMPORTANTE: Altere os secrets JWT em produção!
```

## 🔍 Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs app

# Verificar se portas estão em uso
netstat -ano | findstr :5432
netstat -ano | findstr :3101

# Reiniciar containers
docker-compose restart
```

### Banco de dados não conecta

```bash
# Verificar se o banco está saudável
docker-compose ps db

# Verificar logs do banco
docker-compose logs db

# Testar conexão manualmente
docker-compose exec db pg_isready -U postgres
```

### Limpar tudo e recomeçar

```bash
# ⚠️ ATENÇÃO: Isso apaga todos os dados!
docker-compose down -v
docker-compose up -d --build
```

### Rebuild completo

```bash
# Parar tudo
docker-compose down

# Remover imagens antigas
docker-compose rm -f

# Build e iniciar
docker-compose up -d --build
```

## 📊 Monitoramento

```bash
# Ver uso de recursos
docker stats

# Ver uso de espaço
docker system df

# Limpar imagens não utilizadas
docker system prune -a
```

## 🎯 Workflow Recomendado

### Desenvolvimento Local

1. **Iniciar banco de dados:**
   ```bash
   docker-compose up -d db
   ```

2. **Aguardar banco estar pronto:**
   ```bash
   docker-compose ps db
   # Aguardar status "healthy"
   ```

3. **Rodar migrations localmente:**
   ```bash
   npm run migration:run
   ```

4. **Iniciar backend localmente:**
   ```bash
   npm run start:dev
   ```

### Produção com Docker

1. **Criar arquivo .env de produção:**
   ```bash
   cp .env.example .env.production
   # Editar com valores de produção
   ```

2. **Build e iniciar:**
   ```bash
   docker-compose -f docker-compose.yml --env-file .env.production up -d --build
   ```

3. **Verificar logs:**
   ```bash
   docker-compose logs -f app
   ```

## 🔐 Segurança

### ⚠️ IMPORTANTE

- **NUNCA** commite o arquivo `.env` com secrets reais
- **SEMPRE** altere os secrets JWT em produção
- Use variáveis de ambiente do sistema para secrets em produção
- Considere usar Docker Secrets ou um gerenciador de secrets em produção

## 📚 Referências

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

---

**Última Atualização**: 2025-01-27

