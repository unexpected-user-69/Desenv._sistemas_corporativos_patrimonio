# 🔍 Microsserviço de Auditoria e Logs

Microsserviço dedicado para auditoria e logs do sistema de patrimônio, seguindo arquitetura de microsserviços e boas práticas de observabilidade.

## 🚀 Funcionalidades

- **Auditoria Completa**: Rastreamento de todas as operações CRUD
- **Logs Estruturados**: Sistema de logging com diferentes níveis
- **Métricas de Performance**: Coleta de métricas do sistema
- **Alertas Inteligentes**: Sistema de alertas baseado em padrões
- **Dashboard de Monitoramento**: Interface para visualização

## 🏗️ Arquitetura

- **Tecnologia**: NestJS + TypeScript
- **Banco de Dados**: PostgreSQL
- **Cache**: Redis
- **Documentação**: Swagger/OpenAPI
- **Containerização**: Docker

## 📊 Entidades Principais

### AuditLog
- Rastreamento de operações de usuários
- Histórico completo de mudanças
- Metadados de contexto (IP, User Agent, etc.)

### SystemLog
- Logs estruturados do sistema
- Diferentes níveis (DEBUG, INFO, WARN, ERROR, FATAL)
- Contexto e stack traces

### Metric
- Métricas de performance
- Tempo de resposta
- Contadores e gauges

## 🔌 Endpoints Principais

```
GET    /audit/logs              # Listar logs de auditoria
GET    /audit/logs/:id          # Detalhes de log específico
GET    /audit/metrics           # Métricas do sistema
GET    /audit/alerts            # Alertas ativos
POST   /audit/search            # Busca avançada em logs
GET    /audit/dashboard/data     # Dados para dashboard
```

## 🚀 Como Executar

### Desenvolvimento
```bash
npm install
npm run start:dev
```

### Produção com Docker
```bash
docker-compose up -d
```

### Acessos
- **API**: http://localhost:3001
- **Documentação**: http://localhost:3001/docs
- **Health Check**: http://localhost:3001/health

## 🔧 Configuração

### Variáveis de Ambiente
```env
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=audit_db
REDIS_HOST=localhost
REDIS_PORT=6379
FRONTEND_URL=http://localhost:5173
```

## 📋 Uso do Decorator de Auditoria

```typescript
import { Audit } from './common/decorators/audit.decorator';

@Controller('patrimonio')
export class PatrimonioController {
  @Post()
  @Audit({
    action: 'CREATE',
    entityType: 'Patrimonio',
    description: 'Criação de novo patrimônio'
  })
  async create(@Body() createDto: CreatePatrimonioDto) {
    // Implementação
  }
}
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Coverage
npm run test:cov
```

## 📈 Monitoramento

- **Health Check**: `/health`
- **Métricas**: `/metrics`
- **Logs**: Estruturados com Winston
- **Alertas**: Sistema de alertas configurável

## 🔒 Segurança

- **Helmet**: Headers de segurança
- **CORS**: Configuração restritiva
- **Validação**: Class-validator
- **Rate Limiting**: Proteção contra abuso

## 📚 Documentação

A documentação completa da API está disponível em `/docs` quando o serviço estiver rodando.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
