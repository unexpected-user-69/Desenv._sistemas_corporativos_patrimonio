# API Gateway - Resumo da Implementação

## Visão Geral

API Gateway completo implementado como ponto único de entrada para todos os microsserviços do sistema de patrimônio.

## Arquitetura

```
Cliente
   ↓
API Gateway (porta 3000)
   ├─→ auth-service (3001)
   ├─→ users-service (3002)
   ├─→ events-service (3003)
   ├─→ audit-service (3004)
   ├─→ categorias-service (3005)
   └─→ patrimonio-service (3006)
```

## Funcionalidades Implementadas

### 1. Roteamento Centralizado
- **Padrão de URL**: `/api/{service}/{path}`
- **Exemplo**: `GET /api/users` → `http://localhost:3002/users`
- Proxy transparente para todos os 6 microsserviços

### 2. Autenticação JWT Centralizada
- Validação automática de tokens JWT
- Integração com auth-service
- Decorador `@Public()` para endpoints públicos
- Secret compartilhado: `JWT_ACCESS_SECRET`

### 3. Rate Limiting
- **Limite**: 100 requisições por minuto
- **TTL**: 60 segundos
- Proteção contra abuso
- Implementado com `@nestjs/throttler`

### 4. Circuit Breaker
- **Estados**: CLOSED, OPEN, HALF_OPEN
- **Threshold de falhas**: 5
- **Threshold de sucessos**: 2
- **Timeout**: 60 segundos
- Resiliência automática

### 5. Logging Centralizado
- Log de todas as requisições
- Formato: `METHOD URL STATUS - TIME`
- Níveis: log, warn, error
- Timestamp automático

### 6. Timeout Protection
- **Timeout padrão**: 30 segundos
- Previne requisições travadas
- Retorna erro 408 (Request Timeout)

### 7. Health Checks
- **Gateway**: `GET /health`
- **Serviços**: `GET /api/services/health`
- Monitoramento de circuit breakers
- Status de todos os microsserviços

### 8. CORS
- Configuração centralizada
- Suporte a credenciais
- Origens configuráveis via env

### 9. Documentação Swagger
- **URL**: `http://localhost:3000/api`
- Documentação integrada
- Todos os endpoints documentados

## Estrutura de Arquivos

```
api-gateway/
├── src/
│   ├── common/
│   │   ├── decorators/
│   │   │   └── public.decorator.ts        # Decorador @Public()
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts   # Tratamento de erros
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts          # Validação JWT
│   │   └── interceptors/
│   │       ├── logging.interceptor.ts     # Logging
│   │       └── timeout.interceptor.ts     # Timeout
│   ├── health/
│   │   └── health.controller.ts           # Health check
│   ├── proxy/
│   │   ├── circuit-breaker.service.ts     # Circuit breaker
│   │   ├── proxy.controller.ts            # Roteamento
│   │   ├── proxy.module.ts                # Módulo proxy
│   │   └── proxy.service.ts               # Lógica de proxy
│   ├── app.module.ts                      # Módulo principal
│   └── main.ts                            # Entry point
├── Dockerfile                             # Build Docker
├── .dockerignore                          # Exclusões Docker
├── .env.example                           # Exemplo de env
├── package.json                           # Dependências
├── tsconfig.json                          # Config TypeScript
├── nest-cli.json                          # Config NestJS
└── README.md                              # Documentação
```

## Tecnologias Utilizadas

- **NestJS 11**: Framework principal
- **@nestjs/axios**: Cliente HTTP
- **@nestjs/jwt**: Validação JWT
- **@nestjs/throttler**: Rate limiting
- **@nestjs/swagger**: Documentação
- **TypeScript 5.7**: Linguagem
- **RxJS 7**: Programação reativa

## Configuração

### Variáveis de Ambiente

```env
PORT=3000
NODE_ENV=development
JWT_ACCESS_SECRET=dev_access_secret
CORS_ORIGIN=*

AUTH_SERVICE_URL=http://localhost:3001
USERS_SERVICE_URL=http://localhost:3002
EVENTS_SERVICE_URL=http://localhost:3003
AUDIT_SERVICE_URL=http://localhost:3004
CATEGORIAS_SERVICE_URL=http://localhost:3005
PATRIMONIO_SERVICE_URL=http://localhost:3006
```

## Uso

### Desenvolvimento

```bash
cd packages/api-gateway
npm install --legacy-peer-deps
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

## Exemplos de Uso

### Login (Público)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dev.local","password":"AdminPassword123!"}'
```

### Listar Usuários (Protegido)

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer {token}"
```

### Health Check

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/services/health
```

## Benefícios

1. **Ponto Único de Entrada**: Simplifica o acesso aos microsserviços
2. **Segurança Centralizada**: Autenticação e autorização em um só lugar
3. **Resiliência**: Circuit breaker previne cascata de falhas
4. **Monitoramento**: Logs e health checks centralizados
5. **Proteção**: Rate limiting e timeout protection
6. **Documentação**: Swagger integrado
7. **Escalabilidade**: Fácil adicionar novos serviços

## Próximos Passos

1. Adicionar cache (Redis)
2. Implementar load balancing
3. Adicionar métricas (Prometheus)
4. Implementar tracing distribuído
5. Adicionar TLS/HTTPS
6. Implementar API versioning

## Status

✅ **IMPLEMENTADO E FUNCIONAL**

Todos os 8 TODOs concluídos:
1. ✅ Estrutura do api-gateway service
2. ✅ Proxy HTTP para microsserviços
3. ✅ Autenticação JWT centralizada
4. ✅ Rate limiting e throttling
5. ✅ CORS e logging centralizado
6. ✅ Circuit breaker
7. ✅ Dockerfile e configuração
8. ✅ Documentação e README

