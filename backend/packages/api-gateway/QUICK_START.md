# API Gateway - Guia Rápido

## Iniciar o Gateway

```bash
cd packages/api-gateway
npm run start:dev
```

O gateway estará disponível em: **http://localhost:3000**

## Pré-requisitos

Os microsserviços precisam estar rodando:

```bash
# Terminal 1 - Auth Service
cd packages/auth-service && npm run start:dev

# Terminal 2 - Users Service
cd packages/users-service && npm run start:dev

# Terminal 3 - Events Service
cd packages/events-service && npm run start:dev

# Terminal 4 - Audit Service
cd packages/audit-service && npm run start:dev

# Terminal 5 - Categorias Service
cd packages/categorias-service && npm run start:dev

# Terminal 6 - Patrimonio Service
cd packages/patrimonio-service && npm run start:dev
```

## Testar o Gateway

### 1. Health Check

```bash
curl http://localhost:3000/api/health
```

### 2. Health Check dos Microsserviços

```bash
curl http://localhost:3000/api/services/health
```

### 3. Login (Público)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dev.local","password":"AdminPassword123!"}'
```

### 4. Listar Usuários (Protegido)

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer {seu_token}"
```

### 5. Criar Evento (Protegido)

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Authorization: Bearer {seu_token}" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Evento Teste","descricao":"Teste via gateway"}'
```

## Padrão de URLs

Todas as requisições seguem o padrão:

```
http://localhost:3000/api/{service}/{path}
```

**Exemplos:**
- `/api/auth/login` → `http://localhost:3001/auth/login`
- `/api/users` → `http://localhost:3002/users`
- `/api/events` → `http://localhost:3003/events`
- `/api/categorias` → `http://localhost:3005/categorias`
- `/api/patrimonio` → `http://localhost:3006/patrimonio`

## PowerShell (Windows)

### Login

```powershell
$body = @{email='admin@dev.local';password='AdminPassword123!'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri 'http://localhost:3000/api/auth/login' -Method Post -Body $body -ContentType 'application/json'
$token = $response.data.accessToken
```

### Usar Token

```powershell
$headers = @{Authorization="Bearer $token"}
Invoke-RestMethod -Uri 'http://localhost:3000/api/users' -Headers $headers
```

## Documentação Swagger

Acesse: **http://localhost:3000/api**

## Troubleshooting

### Erro 502 (Bad Gateway)

**Causa**: Microsserviço não está rodando

**Solução**: Inicie o microsserviço correspondente

### Erro 401 (Unauthorized)

**Causa**: Token inválido ou expirado

**Solução**: Faça login novamente para obter novo token

### Erro 503 (Service Unavailable)

**Causa**: Circuit breaker está OPEN

**Solução**: Aguarde 60 segundos para o circuit breaker tentar reconectar

### Erro 429 (Too Many Requests)

**Causa**: Rate limit excedido (100 req/min)

**Solução**: Aguarde 1 minuto

## Circuit Breaker

O gateway monitora a saúde de cada microsserviço:

- **CLOSED**: Normal (serviço funcionando)
- **OPEN**: Serviço com falhas (requisições bloqueadas)
- **HALF_OPEN**: Testando recuperação

Verifique o status: `GET /api/services/health`

## Benefícios

✅ **Ponto único de entrada** - Simplifica o acesso  
✅ **Segurança centralizada** - JWT validado no gateway  
✅ **Resiliência** - Circuit breaker previne cascata de falhas  
✅ **Monitoramento** - Logs e health checks centralizados  
✅ **Proteção** - Rate limiting e timeout  
✅ **Documentação** - Swagger integrado  

## Próximos Passos

1. Inicie todos os microsserviços
2. Inicie o gateway
3. Acesse http://localhost:3000/api
4. Teste o login
5. Use o token para acessar endpoints protegidos

