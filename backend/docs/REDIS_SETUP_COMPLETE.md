# Guia Completo de Configuração do Redis

## 📋 Índice

1. [Desenvolvimento Local](#desenvolvimento-local)
2. [CI/CD](#cicd)
3. [Produção](#produção)
4. [Scripts Disponíveis](#scripts-disponíveis)
5. [Troubleshooting](#troubleshooting)

## 🏠 Desenvolvimento Local

### Instalação Rápida

#### Windows
```powershell
# Opção 1: Docker Compose (Recomendado)
npm run redis:start

# Opção 2: Script PowerShell
npm run setup:redis:windows

# Opção 3: Docker direto
docker run -d --name patrimonio_redis -p 6379:6379 redis:alpine
```

#### Linux/macOS
```bash
# Opção 1: Docker Compose (Recomendado)
npm run redis:start

# Opção 2: Script Bash
npm run setup:redis

# Opção 3: Instalação nativa
# Linux
sudo apt-get install redis-server
sudo systemctl start redis-server

# macOS
brew install redis
brew services start redis
```

### Verificação

```bash
# Verificar status
npm run redis:status

# Ou manualmente
redis-cli ping
# Deve retornar: PONG
```

### Configuração

O Docker Compose já está configurado com Redis. As variáveis de ambiente são:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=
```

## 🔄 CI/CD

### GitHub Actions

O arquivo `.github/workflows/ci.yml` já está configurado com Redis como serviço:

```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - 6379:6379
    options: >-
      --health-cmd "redis-cli ping"
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
```

### GitLab CI

O arquivo `.gitlab-ci.yml` já está configurado:

```yaml
services:
  - redis:7-alpine

variables:
  REDIS_HOST: redis
  REDIS_PORT: 6379
  REDIS_DB: 0
```

### Executar Testes com Redis

```bash
# Certifique-se de que Redis está rodando
npm run redis:status

# Execute os testes E2E
npm run test:e2e -- test/notifications/notifications.e2e-spec.ts
```

## 🚀 Produção

### Configuração Básica

1. **Instalar Redis** (veja `docs/PRODUCTION_REDIS.md`)

2. **Configurar variáveis de ambiente**:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=sua_senha_segura_aqui
```

3. **Configurar persistência**:
```conf
# redis.conf
save 900 1
save 300 10
save 60 10000
appendonly yes
appendfsync everysec
```

4. **Configurar segurança**:
```conf
# redis.conf
requirepass sua_senha_segura_aqui
bind 127.0.0.1
protected-mode yes
```

### Monitoramento

```bash
# Verificar status
npm run redis:status

# Ou usar o script de verificação
bash scripts/check-redis.sh

# Ver métricas
redis-cli info
redis-cli info memory
redis-cli info stats
```

### Backup

```bash
# Backup manual
redis-cli --rdb /backup/redis/dump.rdb

# Backup automático (cron)
0 2 * * * redis-cli --rdb /backup/redis/dump_$(date +\%Y\%m\%d).rdb
```

## 🛠️ Scripts Disponíveis

### NPM Scripts

```bash
# Instalar e configurar Redis
npm run setup:redis              # Linux/macOS
npm run setup:redis:windows      # Windows

# Gerenciar Redis
npm run redis:start              # Iniciar Redis (Docker)
npm run redis:stop               # Parar Redis (Docker)
npm run redis:status             # Verificar status

# Verificar saúde
bash scripts/check-redis.sh      # Verificação completa
```

### Scripts Shell

- `scripts/setup-redis.sh`: Instala e configura Redis (Linux/macOS)
- `scripts/setup-redis.ps1`: Instala e configura Redis (Windows)
- `scripts/check-redis.sh`: Verifica status e saúde do Redis

## 🔧 Troubleshooting

### Problema: Redis não inicia

```bash
# Verificar logs
docker-compose logs redis

# Verificar se a porta está em uso
netstat -an | grep 6379  # Linux/macOS
netstat -an | findstr 6379  # Windows

# Reiniciar Redis
docker-compose restart redis
```

### Problema: Conexão recusada

```bash
# Verificar se Redis está rodando
npm run redis:status

# Verificar variáveis de ambiente
echo $REDIS_HOST
echo $REDIS_PORT

# Testar conexão manual
redis-cli -h localhost -p 6379 ping
```

### Problema: Jobs não processam

```bash
# Verificar filas
redis-cli LLEN bull:notification-queue:waiting
redis-cli LLEN bull:notification-queue:active
redis-cli LLEN bull:notification-queue:failed

# Limpar fila (cuidado!)
redis-cli DEL bull:notification-queue:waiting
```

### Problema: Alto uso de memória

```bash
# Verificar uso de memória
redis-cli info memory

# Verificar chaves grandes
redis-cli --bigkeys

# Limpar chaves antigas (cuidado!)
redis-cli --scan --pattern "bull:*" | xargs redis-cli del
```

## 📚 Documentação Adicional

- [TESTING_REDIS.md](./TESTING_REDIS.md): Configuração para testes
- [PRODUCTION_REDIS.md](./PRODUCTION_REDIS.md): Configuração para produção
- [README_AddCategoriaIdToPatrimonios.md](../database/migrations/README_AddCategoriaIdToPatrimonios.md): Migration relacionada

## 🔗 Links Úteis

- [Redis Documentation](https://redis.io/docs/)
- [BullMQ Documentation](https://docs.bullmq.io/)
- [Docker Redis Image](https://hub.docker.com/_/redis)

## ✅ Checklist de Configuração

### Desenvolvimento
- [ ] Redis instalado ou Docker configurado
- [ ] Redis rodando (`npm run redis:status`)
- [ ] Variáveis de ambiente configuradas
- [ ] Testes E2E passando com Redis

### CI/CD
- [ ] Redis configurado como serviço no pipeline
- [ ] Variáveis de ambiente definidas
- [ ] Testes passando no pipeline

### Produção
- [ ] Redis instalado e configurado
- [ ] Senha configurada
- [ ] Persistência habilitada
- [ ] Backup configurado
- [ ] Monitoramento configurado
- [ ] Firewall configurado
- [ ] TLS/SSL configurado (opcional)

## 🎯 Próximos Passos

1. **Desenvolvimento Local**: Execute `npm run setup:redis` ou `npm run redis:start`
2. **Testes**: Execute `npm run test:e2e -- test/notifications/notifications.e2e-spec.ts`
3. **Produção**: Siga o guia em `docs/PRODUCTION_REDIS.md`

---

**Última atualização**: 2025-01-08
**Versão do Redis**: 7.x (recomendado)


