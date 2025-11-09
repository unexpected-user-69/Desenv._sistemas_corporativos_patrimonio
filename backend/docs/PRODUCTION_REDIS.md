# Configuração de Redis para Produção

## Visão Geral

Este documento descreve como configurar Redis para produção no sistema de Patrimônio e Inventário. Redis é usado para:
- **Filas de Notificações** (BullMQ): Processamento assíncrono de notificações
- **Filas de Relatórios** (BullMQ): Geração assíncrona de relatórios
- **Cache** (opcional): Cache de dados frequentes

## Requisitos

- Redis 6.0 ou superior (recomendado: Redis 7.x)
- Mínimo 1GB de RAM dedicada ao Redis
- Persistência habilitada (AOF ou RDB)
- Autenticação configurada (senha)
- TLS/SSL para conexões remotas (recomendado)

## Configuração de Produção

### 1. Instalação

#### Opção A: Docker (Recomendado)

```yaml
# docker-compose.prod.yml
services:
  redis:
    image: redis:7-alpine
    container_name: patrimonio_redis_prod
    restart: always
    ports:
      - "127.0.0.1:6379:6379"  # Apenas localhost para segurança
    volumes:
      - redis_data:/data
      - ./redis.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    networks:
      - app_network

volumes:
  redis_data:
    driver: local
```

#### Opção B: Instalação Nativa (Linux)

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y redis-server

# Fedora/RHEL
sudo dnf install -y redis

# Arch Linux
sudo pacman -S redis
```

### 2. Configuração do Redis (redis.conf)

```conf
# /etc/redis/redis.conf ou ./redis.conf

# Rede
bind 127.0.0.1  # Apenas localhost (use IP privado em clusters)
port 6379
protected-mode yes

# Autenticação
requirepass sua_senha_segura_aqui  # MUDAR EM PRODUÇÃO

# Persistência
save 900 1      # Salvar após 900s se pelo menos 1 chave mudou
save 300 10     # Salvar após 300s se pelo menos 10 chaves mudaram
save 60 10000   # Salvar após 60s se pelo menos 10000 chaves mudaram

appendonly yes
appendfsync everysec
appendfilename "appendonly.aof"

# Memória
maxmemory 2gb
maxmemory-policy allkeys-lru  # Remover chaves menos usadas quando memória cheia

# Logs
loglevel notice
logfile /var/log/redis/redis-server.log

# Segurança
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command CONFIG "CONFIG_9a7b8c5d4e3f2a1b"
```

### 3. Variáveis de Ambiente

```env
# .env.production
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=sua_senha_segura_aqui
REDIS_TLS=false  # true se usar TLS
REDIS_KEY_PREFIX=patrimonio:  # Prefixo para todas as chaves
```

### 4. Configuração no AppModule

O `AppModule` já está configurado para usar Redis. Certifique-se de que as variáveis de ambiente estão corretas:

```typescript
BullModule.forRoot({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
    // TLS (opcional)
    ...(process.env.REDIS_TLS === 'true' && {
      tls: {
        rejectUnauthorized: false,
      },
    }),
  },
}),
```

## Monitoramento

### 1. Health Check

Crie um endpoint de health check para Redis:

```typescript
@Get('health/redis')
async checkRedisHealth() {
  try {
    const redis = this.bullModule.getQueue('notification-queue');
    await redis.client.ping();
    return { status: 'ok', service: 'redis' };
  } catch (error) {
    return { status: 'error', service: 'redis', error: error.message };
  }
}
```

### 2. Métricas

Monitore as seguintes métricas:
- **Uso de memória**: `redis-cli info memory`
- **Conexões ativas**: `redis-cli info clients`
- **Comandos por segundo**: `redis-cli info stats`
- **Tamanho das filas**: Via endpoint `/v1/notifications/queue/stats`

### 3. Alertas

Configure alertas para:
- Uso de memória > 80%
- Número de conexões > 1000
- Latência > 100ms
- Falhas de conexão
- Jobs falhados na fila > 100

## Backup e Recuperação

### Backup Automático

```bash
# Script de backup diário
#!/bin/bash
BACKUP_DIR="/backup/redis"
DATE=$(date +%Y%m%d_%H%M%S)
redis-cli --rdb $BACKUP_DIR/dump_$DATE.rdb
# Copiar AOF também
cp /var/lib/redis/appendonly.aof $BACKUP_DIR/appendonly_$DATE.aof
```

### Recuperação

```bash
# Parar Redis
systemctl stop redis

# Restaurar RDB
cp /backup/redis/dump_YYYYMMDD_HHMMSS.rdb /var/lib/redis/dump.rdb

# Ou restaurar AOF
cp /backup/redis/appendonly_YYYYMMDD_HHMMSS.aof /var/lib/redis/appendonly.aof

# Iniciar Redis
systemctl start redis
```

## Alta Disponibilidade

### Opção 1: Redis Sentinel

```yaml
# docker-compose.sentinel.yml
services:
  redis-master:
    image: redis:7-alpine
    command: redis-server --masterauth senha --requirepass senha

  redis-slave1:
    image: redis:7-alpine
    command: redis-server --slaveof redis-master 6379 --masterauth senha --requirepass senha

  redis-sentinel:
    image: redis:7-alpine
    command: redis-sentinel /etc/redis/sentinel.conf
```

### Opção 2: Redis Cluster

Para ambientes de grande escala, considere Redis Cluster com sharding.

## Segurança

### 1. Firewall

```bash
# Permitir apenas conexões locais
ufw allow from 10.0.0.0/8 to any port 6379
ufw allow from 172.16.0.0/12 to any port 6379
```

### 2. TLS/SSL

```conf
# redis.conf
tls-port 6380
tls-cert-file /path/to/redis.crt
tls-key-file /path/to/redis.key
tls-ca-cert-file /path/to/ca.crt
```

### 3. Autenticação Forte

- Use senhas complexas (mínimo 32 caracteres)
- Rotacione senhas regularmente
- Use variáveis de ambiente para senhas (nunca hardcode)

## Troubleshooting

### Problema: Redis não inicia

```bash
# Verificar logs
tail -f /var/log/redis/redis-server.log

# Verificar permissões
ls -la /var/lib/redis/

# Verificar configuração
redis-server /etc/redis/redis.conf --test-memory 1
```

### Problema: Alto uso de memória

```bash
# Verificar chaves grandes
redis-cli --bigkeys

# Verificar uso de memória por chave
redis-cli memory usage key_name

# Limpar chaves antigas (cuidado!)
redis-cli --scan --pattern "patrimonio:*" | xargs redis-cli del
```

### Problema: Jobs não processam

```bash
# Verificar status da fila
redis-cli LLEN bull:notification-queue:waiting
redis-cli LLEN bull:notification-queue:active
redis-cli LLEN bull:notification-queue:failed

# Reprocessar jobs falhados (via código)
# GET /v1/notifications/queue/retry-failed
```

## Referências

- [Redis Documentation](https://redis.io/docs/)
- [BullMQ Documentation](https://docs.bullmq.io/)
- [Redis Best Practices](https://redis.io/docs/manual/patterns/)
- [Redis Security](https://redis.io/docs/manual/security/)


