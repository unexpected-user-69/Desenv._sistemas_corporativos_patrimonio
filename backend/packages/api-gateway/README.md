# API Gateway - Sistema de Gestão de Patrimônio

Gateway centralizado que roteia requisições para todos os microsserviços do sistema de patrimônio.

## Funcionalidades

- **Roteamento Centralizado**: Ponto único de entrada para todos os microsserviços
- **Autenticação JWT**: Validação centralizada de tokens JWT
- **Rate Limiting**: Proteção contra abuso com throttling
- **Circuit Breaker**: Resiliência com circuit breaker pattern
- **Logging Centralizado**: Logs de todas as requisições
- **Health Checks**: Monitoramento de saúde de todos os serviços
- **CORS**: Configuração centralizada de CORS
- **Timeout**: Proteção contra requisições lentas

## Arquitetura

```
Cliente → API Gateway (3000) → Microsserviços
                               ├── auth-service (3001)
                               ├── users-service (3002)
                               ├── events-service (3003)
                               ├── audit-service (3004)
                               ├── categorias-service (3005)
                               └── patrimonio-service (3006)
```

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
JWT_ACCESS_SECRET=seu_secret_aqui
AUTH_SERVICE_URL=http://localhost:3001
USERS_SERVICE_URL=http://localhost:3002
# ... outros serviços
```

## Executando

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

### Docker

```bash
docker build -t api-gateway .
docker run -p 3000:3000 api-gateway
```

## Endpoints

### Health Check

```bash
GET /health
```

Retorna o status do gateway.

### Health Check dos Serviços

```bash
GET /api/services/health
```

Retorna o status de todos os microsserviços e seus circuit breakers.

### Proxy para Microsserviços

Todas as requisições seguem o padrão:

```
/api/{service}/{path}
```

**Exemplos:**

```bash
# Login (auth-service)
POST /api/auth/login
Body: { "email": "admin@dev.local", "password": "AdminPassword123!" }

# Listar usuários (users-service)
GET /api/users
Headers: Authorization: Bearer {token}

# Criar evento (events-service)
POST /api/events
Headers: Authorization: Bearer {token}
Body: { ... }

# Listar categorias (categorias-service)
GET /api/categorias
Headers: Authorization: Bearer {token}

# Listar patrimônios (patrimonio-service)
GET /api/patrimonio
Headers: Authorization: Bearer {token}
```

## Autenticação

O gateway valida tokens JWT automaticamente. Endpoints públicos (como `/health` e `/api/auth/login`) não requerem autenticação.

Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer {seu_token_jwt}
```

## Circuit Breaker

O gateway implementa circuit breaker para cada microsserviço:

- **CLOSED**: Operação normal
- **OPEN**: Serviço com falhas, requisições são rejeitadas
- **HALF_OPEN**: Testando se o serviço recuperou

**Configuração padrão:**
- Threshold de falhas: 5
- Threshold de sucessos: 2
- Timeout: 60 segundos

## Rate Limiting

- **Limite**: 100 requisições por minuto
- **TTL**: 60 segundos

## Timeout

- **Timeout padrão**: 30 segundos por requisição

## Documentação da API

Acesse a documentação Swagger em:

```
http://localhost:3000/api
```

## Testes

```bash
# Testes unitários
npm test

# Testes E2E
npm run test:e2e

# Cobertura
npm run test:cov
```

## Estrutura do Projeto

```
api-gateway/
├── src/
│   ├── common/
│   │   ├── decorators/
│   │   │   └── public.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── interceptors/
│   │       ├── logging.interceptor.ts
│   │       └── timeout.interceptor.ts
│   ├── health/
│   │   └── health.controller.ts
│   ├── proxy/
│   │   ├── circuit-breaker.service.ts
│   │   ├── proxy.controller.ts
│   │   ├── proxy.module.ts
│   │   └── proxy.service.ts
│   ├── app.module.ts
│   └── main.ts
├── Dockerfile
├── package.json
└── README.md
```

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do gateway | 3000 |
| `NODE_ENV` | Ambiente | development |
| `JWT_ACCESS_SECRET` | Secret para validar JWT | dev_access_secret |
| `CORS_ORIGIN` | Origens permitidas | * |
| `AUTH_SERVICE_URL` | URL do auth-service | http://localhost:3001 |
| `USERS_SERVICE_URL` | URL do users-service | http://localhost:3002 |
| `EVENTS_SERVICE_URL` | URL do events-service | http://localhost:3003 |
| `AUDIT_SERVICE_URL` | URL do audit-service | http://localhost:3004 |
| `CATEGORIAS_SERVICE_URL` | URL do categorias-service | http://localhost:3005 |
| `PATRIMONIO_SERVICE_URL` | URL do patrimonio-service | http://localhost:3006 |

## Troubleshooting

### Gateway não conecta aos microsserviços

Verifique se:
1. Todos os microsserviços estão rodando
2. As URLs dos serviços estão corretas no `.env`
3. Não há firewall bloqueando as portas

### Circuit breaker está OPEN

O serviço está com muitas falhas. Aguarde 60 segundos para o circuit breaker tentar reconectar.

### Token JWT inválido

Verifique se:
1. O token não expirou (15 minutos)
2. O `JWT_ACCESS_SECRET` é o mesmo do auth-service
3. O token está no formato correto: `Bearer {token}`

## Licença

Este projeto é parte de um trabalho acadêmico.

