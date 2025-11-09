# 🚀 Configuração Rápida do Redis

## ⚡ Início Rápido

### Windows
```powershell
# Opção 1: Docker Compose (Mais fácil)
npm run redis:start

# Opção 2: Script automatizado
npm run setup:redis:windows
```

### Linux/macOS
```bash
# Opção 1: Docker Compose (Mais fácil)
npm run redis:start

# Opção 2: Script automatizado
npm run setup:redis
```

### Verificar Status
```bash
npm run redis:status
```

## 📋 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run setup:redis` | Instala e configura Redis (Linux/macOS) |
| `npm run setup:redis:windows` | Instala e configura Redis (Windows) |
| `npm run redis:start` | Inicia Redis via Docker Compose |
| `npm run redis:stop` | Para Redis |
| `npm run redis:status` | Verifica status do Redis |

## 🔧 Configuração

O Redis já está configurado no `docker-compose.yml`. As variáveis de ambiente são:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=
```

## ✅ Verificação

```bash
# Testar conexão
redis-cli ping
# Deve retornar: PONG

# Verificar status completo
bash scripts/check-redis.sh
```

## 📚 Documentação Completa

- [REDIS_SETUP_COMPLETE.md](./docs/REDIS_SETUP_COMPLETE.md): Guia completo
- [TESTING_REDIS.md](./docs/TESTING_REDIS.md): Configuração para testes
- [PRODUCTION_REDIS.md](./docs/PRODUCTION_REDIS.md): Configuração para produção

## 🆘 Problemas?

### Redis não inicia
```bash
# Verificar logs
docker-compose logs redis

# Reiniciar
docker-compose restart redis
```

### Conexão recusada
```bash
# Verificar se está rodando
npm run redis:status

# Verificar porta
netstat -an | grep 6379  # Linux/macOS
netstat -an | findstr 6379  # Windows
```

## 🎯 Próximos Passos

1. ✅ Inicie Redis: `npm run redis:start`
2. ✅ Verifique status: `npm run redis:status`
3. ✅ Execute testes: `npm run test:e2e -- test/notifications/notifications.e2e-spec.ts`

---

**Pronto para usar!** 🎉


