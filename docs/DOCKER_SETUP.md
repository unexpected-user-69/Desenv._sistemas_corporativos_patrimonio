# Setup Docker - Patrimônio e Inventário

Este documento explica como executar a aplicação usando Docker e Docker Compose.

## Pré-requisitos

- Docker Desktop instalado e rodando
- Docker Compose v2.0+

## Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações do banco de dados
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=seu_password_seguro
DB_NAME=patrimonio_inventario

# Configurações da aplicação
NODE_ENV=production
PORT=3101

# Configurações do Docker
APP_PORT=3101
```

## Executando a Aplicação

### Desenvolvimento (Apenas Banco)

Para desenvolvimento local com apenas o banco containerizado:

```bash
# Iniciar apenas o banco de dados
docker-compose up db -d

# Executar aplicação localmente
npm run start:dev
```

### Produção (Aplicação + Banco)

Para executar a aplicação completa em containers:

```bash
# Build e start de todos os serviços
docker-compose up --build

# Ou em background
docker-compose up --build -d
```

### Comandos Úteis

```bash
# Ver logs da aplicação
docker-compose logs app

# Ver logs do banco
docker-compose logs db

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados)
docker-compose down -v

# Rebuild apenas a aplicação
docker-compose build app

# Executar comandos na aplicação
docker-compose exec app npm run migration:run
```

## Estrutura dos Containers

### Serviço `db` (PostgreSQL)
- **Imagem**: postgres:15-alpine
- **Porta**: 5432
- **Volume**: db_data (persistente)
- **Healthcheck**: pg_isready

### Serviço `app` (NestJS)
- **Build**: Multi-stage Dockerfile
- **Porta**: 3101
- **Dependências**: Aguarda db estar saudável
- **Script**: start.sh (migrações + start)

## Script de Inicialização

O script `start.sh` executa automaticamente:

1. **Aguarda banco**: Verifica se PostgreSQL está pronto
2. **Executa migrações**: `npm run migration:run`
3. **Inicia aplicação**: `npm run start:prod`

## Troubleshooting

### Problema: Aplicação não conecta no banco

**Solução**: Verifique se o serviço `db` está saudável:

```bash
docker-compose ps
docker-compose logs db
```

### Problema: Migrações falham

**Solução**: Execute manualmente:

```bash
docker-compose exec app npm run migration:run
```

### Problema: Porta já em uso

**Solução**: Altere a porta no `.env`:

```env
APP_PORT=3002
```

### Problema: Build falha

**Solução**: Limpe o cache do Docker:

```bash
docker system prune -a
docker-compose build --no-cache
```

## URLs de Acesso

- **Aplicação**: http://localhost:3101
- **Swagger**: http://localhost:3101/docs
- **Health Check**: http://localhost:3101/v1/health
- **API Users**: http://localhost:3101/v1/users

## Desenvolvimento

Para desenvolvimento com hot-reload:

```bash
# Terminal 1: Banco
docker-compose up db -d

# Terminal 2: Aplicação local
npm run start:dev
```

## Produção

Para deploy em produção:

1. Configure variáveis de ambiente seguras
2. Use secrets do Docker ou variáveis de ambiente do host
3. Configure SSL/TLS se necessário
4. Monitore logs e saúde dos containers

---

**Última atualização**: 2024-09-30  
**Versão**: 1.0  
**Responsável**: Equipe de Desenvolvimento
