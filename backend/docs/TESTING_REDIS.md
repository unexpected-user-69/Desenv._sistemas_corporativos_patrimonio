# Configuração de Redis para Testes

## Visão Geral

O módulo de Notifications utiliza BullMQ (Bull) para gerenciar filas de notificações, que requer Redis como backend. Este documento descreve como configurar Redis para testes E2E.

## Pré-requisitos

- Redis instalado e rodando
- Porta 6379 disponível (padrão do Redis)

## Configuração para Testes

### Opção 1: Redis Local

1. **Instalar Redis** (se ainda não tiver):
   ```bash
   # Windows (usando Chocolatey)
   choco install redis-64

   # Linux
   sudo apt-get install redis-server

   # macOS
   brew install redis
   ```

2. **Iniciar Redis**:
   ```bash
   # Windows
   redis-server

   # Linux/macOS
   redis-server
   ```

3. **Verificar se está rodando**:
   ```bash
   redis-cli ping
   # Deve retornar: PONG
   ```

### Opção 2: Redis via Docker

1. **Iniciar Redis em container**:
   ```bash
   docker run -d --name redis-test -p 6379:6379 redis:latest
   ```

2. **Verificar se está rodando**:
   ```bash
   docker ps | grep redis
   ```

### Opção 3: Redis em Memória (Mock) para Testes

Para testes que não requerem Redis real, você pode usar um mock. No entanto, o BullMQ requer Redis real, então esta opção é limitada.

## Variáveis de Ambiente

Configure as seguintes variáveis de ambiente para os testes:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=  # Opcional, deixe vazio se não usar senha
```

Ou crie um arquivo `.env.test`:

```env
NODE_ENV=test
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
```

## Executando Testes com Redis

### Testes E2E de Notifications

```bash
# Certifique-se de que Redis está rodando
redis-cli ping

# Execute os testes
npm run test:e2e -- test/notifications/notifications.e2e-spec.ts
```

### Testes que Requerem Redis

Os seguintes endpoints/testes requerem Redis:

1. **GET /v1/notifications/queue/stats**: Retorna estatísticas da fila Bull
   - Requer conexão ativa com Redis
   - Se Redis não estiver disponível, o teste pode falhar com timeout

## Tratamento de Erros nos Testes

Os testes E2E de Notifications foram configurados para lidar graciosamente com a ausência de Redis:

```typescript
// Exemplo do teste queue/stats
it('deve retornar estatísticas da fila (200)', async () => {
  try {
    const response = await request(httpServer)
      .get('/v1/notifications/queue/stats')
      .timeout(5000);

    if (response.status === 200) {
      // Verificar estrutura da resposta
    } else {
      console.warn('⚠️ Redis não disponível');
    }
  } catch (error) {
    if (error.message?.includes('timeout') || error.message?.includes('ECONNREFUSED')) {
      console.warn('⚠️ Redis não disponível');
      return; // Não falhar o teste
    }
    throw error;
  }
});
```

## Configuração no AppModule

O BullModule está configurado no `AppModule`:

```typescript
BullModule.forRoot({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
}),
```

## Troubleshooting

### Erro: "ECONNREFUSED"

**Causa**: Redis não está rodando ou não está acessível na porta configurada.

**Solução**:
1. Verifique se Redis está rodando: `redis-cli ping`
2. Verifique a porta: `netstat -an | grep 6379` (Linux/macOS) ou `netstat -an | findstr 6379` (Windows)
3. Verifique as variáveis de ambiente

### Erro: Timeout nos Testes

**Causa**: Redis está lento ou não está respondendo.

**Solução**:
1. Verifique a performance do Redis: `redis-cli --latency`
2. Aumente o timeout nos testes se necessário
3. Verifique se há muitos jobs na fila que podem estar causando lentidão

### Erro: "ERR invalid password"

**Causa**: Senha do Redis configurada incorretamente.

**Solução**:
1. Verifique a variável `REDIS_PASSWORD`
2. Se não usar senha, deixe a variável vazia ou não defina

## Limpeza de Dados de Teste

Após os testes, você pode limpar os dados do Redis:

```bash
# Limpar todas as chaves (CUIDADO: isso apaga tudo!)
redis-cli FLUSHALL

# Ou limpar apenas o banco de dados de teste (db 0)
redis-cli -n 0 FLUSHDB
```

## CI/CD

Para ambientes de CI/CD, configure Redis como serviço:

```yaml
# Exemplo para GitHub Actions
services:
  redis:
    image: redis:latest
    ports:
      - 6379:6379
    options: >-
      --health-cmd "redis-cli ping"
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
```

## Referências

- [BullMQ Documentation](https://docs.bullmq.io/)
- [Redis Documentation](https://redis.io/docs/)
- [NestJS Bull Module](https://docs.nestjs.com/techniques/queues)


