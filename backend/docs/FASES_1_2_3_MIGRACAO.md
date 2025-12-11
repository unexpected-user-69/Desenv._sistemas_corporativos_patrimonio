# 📚 Fases 1, 2 e 3 - Migração para Microsserviços

Este documento apresenta as três primeiras fases da migração do monólito para microsserviços, com foco em Prova de Conceito (PoC), Testes de Contrato e Conversão para NestJS completo.

---

## 📋 Índice

1. [Fase 1 - Objetivo da Migração e Prova de Conceito](#fase-1)
2. [Fase 2 - Testes de Contrato e Integração](#fase-2)
3. [Fase 3 - Conversão para Microsserviço NestJS Completo](#fase-3)
4. [Status Atual do Projeto](#status-atual)
5. [Guia de Execução](#guia-de-execucao)

## 📚 Documentação Relacionada

Para facilitar o acompanhamento do trabalho, foram criados os seguintes documentos:

- **[CHECKLIST_FASES_TRABALHO.md](./CHECKLIST_FASES_TRABALHO.md)** - Checklist detalhado e completo para cada fase
- **[GUIA_RAPIDO_FASES_1_2_3.md](./GUIA_RAPIDO_FASES_1_2_3.md)** - Guia prático passo a passo
- **[RESUMO_EXECUTIVO_FASES.md](./RESUMO_EXECUTIVO_FASES.md)** - Resumo visual e rápido
- **[CHECKLIST_FASES_1_2_3.md](./CHECKLIST_FASES_1_2_3.md)** - Checklist de acompanhamento por serviço

---

## 🎯 Fase 1 - Objetivo da Migração e Prova de Conceito

**Peso**: 10%  
**Prazo**: 25/11/2025  
**Status**: ✅ Completo

### Objetivo

Criar uma Prova de Conceito (PoC) simples para cada serviço (auth, users, events), baseada no contrato OpenAPI. Esta etapa foca na criação de um "provedor mínimo" com endpoints básicos, respostas mockadas e validação essencial.

### Conceitos Fundamentais

#### 1. **Provedor Mínimo (Minimal Provider)**

Um provedor mínimo é uma implementação básica que:
- ✅ Respeita o contrato OpenAPI definido
- ✅ Retorna respostas mockadas ou básicas
- ✅ Valida a estrutura de requisições
- ✅ Garante que os endpoints respondem corretamente
- ❌ Não possui lógica de negócio completa
- ❌ Não se conecta a banco de dados real (ou usa dados mockados)

#### 2. **Contrato OpenAPI**

O arquivo `openapi.yaml` define:
- **Paths**: Endpoints disponíveis (`/auth/login`, `/users`, etc.)
- **Schemas**: Estrutura de dados (request/response)
- **Security**: Esquemas de autenticação (Bearer Token)
- **Responses**: Códigos de status e formatos esperados

#### 3. **Migração Gradual**

A migração é feita gradualmente para:
- Reduzir riscos de quebra do sistema
- Permitir testes incrementais
- Facilitar rollback se necessário
- Manter o sistema funcionando durante a transição

### Estrutura Esperada (PoC)

```
packages/
├── auth-service/
│   ├── openapi.yaml          # Contrato OpenAPI
│   ├── src/
│   │   ├── main.ts           # Servidor Express básico
│   │   └── routes/           # Rotas mockadas
│   └── package.json
├── users-service/
│   └── ... (mesma estrutura)
└── events-service/
    └── ... (mesma estrutura)
```

### Exemplo de Provedor Mínimo (Express)

```typescript
// src/main.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint mockado
app.post('/auth/login', (req, res) => {
  // Validação básica
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }
  
  // Resposta mockada
  res.status(200).json({
    accessToken: 'mock-token-123',
    refreshToken: 'mock-refresh-456',
    user: {
      id: 'uuid-mock',
      email: req.body.email,
      name: 'Usuário Mock',
      role: 'ADMIN'
    }
  });
});

app.listen(3001, () => {
  console.log('Auth Service (PoC) rodando na porta 3001');
});
```

### Checklist Fase 1

- [x] Criar branch específica para cada serviço (`feature/poc-auth-service`)
- [x] Criar estrutura básica do serviço
- [x] Definir contrato OpenAPI (`openapi.yaml`)
- [x] Implementar endpoints básicos com respostas mockadas
- [x] Validar que os endpoints respondem conforme o contrato
- [x] Testar manualmente os endpoints principais

---

## 🧪 Fase 2 - Testes de Contrato e Integração

**Peso**: 10%  
**Prazo**: 25/11/2025  
**Status**: ✅ Completo

### Objetivo

Implementar testes de contrato e testes de integração a partir da especificação OpenAPI de cada serviço, garantindo que cada API cumpra rigorosamente o contrato definido.

### Tipos de Testes

#### 1. **Testes de Contrato (Contract Tests)**

Validam que a especificação OpenAPI está correta e completa:

```typescript
// test/contract/openapi.spec.ts
import { readFileSync } from 'fs';
import * as yaml from 'yaml';
import * as path from 'path';

describe('OpenAPI Contract Structure', () => {
  let spec: any;

  beforeAll(() => {
    const specPath = path.join(__dirname, '../../openapi.yaml');
    const specContent = readFileSync(specPath, 'utf-8');
    spec = yaml.parse(specContent);
  });

  it('should have OpenAPI 3.1.0 version', () => {
    expect(spec.openapi).toBe('3.1.0');
  });

  it('should have required paths', () => {
    expect(spec.paths).toBeDefined();
    expect(spec.paths['/auth/login']).toBeDefined();
    expect(spec.paths['/auth/refresh']).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(spec.components.schemas).toBeDefined();
    expect(spec.components.schemas.LoginRequest).toBeDefined();
    expect(spec.components.schemas.LoginResponse).toBeDefined();
  });
});
```

#### 2. **Testes de Integração (Integration Tests)**

Validam que a implementação adere ao contrato:

```typescript
// test/integration/auth.integration.spec.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('Auth Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /auth/login should return 200 with valid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body).toHaveProperty('user');
  });

  it('POST /auth/login should return 401 with invalid credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword'
      })
      .expect(401);
  });
});
```

### Executando os Testes

```bash
# Testes de contrato
npm run test:contract

# Testes de integração
npm run test:e2e

# Todos os testes
npm run test:all
```

### OpenAPI Generator

O OpenAPI Generator pode ser usado para:
- Gerar clientes TypeScript para consumir os serviços
- Gerar server stubs como ponto de partida

```bash
# Instalar OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# Gerar cliente TypeScript
openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-axios \
  -o ./generated/client

# Gerar server stub NestJS
openapi-generator-cli generate \
  -i openapi.yaml \
  -g @openapitools/openapi-generator-cli \
  -o ./generated/server
```

### Checklist Fase 2

- [x] Criar testes de contrato (`test/contract/openapi.spec.ts`)
- [x] Validar estrutura do OpenAPI (paths, schemas, security)
- [x] Criar testes de integração (`test/e2e/*.e2e-spec.ts`)
- [x] Validar que endpoints retornam status codes corretos
- [x] Validar que respostas seguem os schemas definidos
- [x] Configurar scripts no `package.json` para executar testes
- [x] Garantir que todos os testes passam (verde)

---

## 🏗️ Fase 3 - Conversão para Microsserviço NestJS Completo

**Peso**: 10%  
**Prazo**: 25/11/2025  
**Status**: ✅ Completo

### Objetivo

Refatorar o provedor mínimo (PoC em Express) para uma aplicação NestJS completa, mantendo fidelidade máxima ao monólito e preparando o terreno para receber os handlers reais extraídos do monólito.

### Por que NestJS?

1. **Redução de Curva de Aprendizado**: O monólito já usa NestJS
2. **Reutilização de Código**: Guards, pipes, interceptors, DTOs podem ser compartilhados
3. **Convenções Consolidadas**: Padrões já estabelecidos no projeto
4. **Arquitetura Escalável**: Módulos, injeção de dependências, decorators
5. **Testabilidade**: Estrutura que facilita testes unitários e de integração

### Arquitetura NestJS

#### 1. **Módulos (Modules)**

Organizam a aplicação em unidades funcionais:

```typescript
// src/events/events.module.ts
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
```

#### 2. **Controllers**

Definem as rotas e endpoints:

```typescript
// src/events/events.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Roles('ADMIN', 'MANAGER')
  findAll() {
    return this.eventsService.findAll();
  }

  @Post()
  @Roles('ADMIN', 'MANAGER')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
}
```

#### 3. **Services**

Contêm a lógica de negócio:

```typescript
// src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(event);
  }
}
```

#### 4. **DTOs (Data Transfer Objects)**

Validam e transformam dados:

```typescript
// src/events/dto/create-event.dto.ts
import { IsString, IsDate, IsEnum, IsOptional } from 'class-validator';
import { EventType } from '../enums/event-type.enum';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  startDate: Date;

  @IsEnum(EventType)
  eventType: EventType;
}
```

#### 5. **Guards**

Protegem rotas e validam permissões:

```typescript
// src/common/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

#### 6. **Pipes**

Transformam e validam dados:

```typescript
// src/common/pipes/validation.pipe.ts
import { ValidationPipe } from '@nestjs/common';

export const globalValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
```

#### 7. **Interceptors**

Interceptam requisições/respostas:

```typescript
// src/common/interceptors/transform-response.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        data,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
```

### Estrutura Completa do Microsserviço

```
packages/events-service/
├── src/
│   ├── app.module.ts              # Módulo raiz
│   ├── main.ts                    # Bootstrap
│   ├── events/
│   │   ├── dto/                   # DTOs de validação
│   │   ├── entities/              # Entidades TypeORM
│   │   ├── enums/                 # Enums
│   │   ├── events.controller.ts   # Controller
│   │   ├── events.service.ts      # Service
│   │   └── events.module.ts       # Módulo
│   ├── common/
│   │   ├── guards/                # Guards (JWT, Roles)
│   │   ├── interceptors/          # Interceptors
│   │   ├── pipes/                 # Pipes
│   │   └── decorators/            # Decorators customizados
│   ├── database/
│   │   └── data-source.ts         # Configuração TypeORM
│   └── health/
│       └── health.controller.ts   # Health check
├── test/
│   ├── contract/
│   │   └── openapi.spec.ts        # Testes de contrato
│   ├── e2e/
│   │   └── events.e2e-spec.ts     # Testes E2E
│   └── helpers/
│       └── auth-helper.ts         # Helpers de teste
├── openapi.yaml                   # Contrato OpenAPI
├── package.json
└── tsconfig.json
```

### Checklist Fase 3

- [x] Criar estrutura de pastas adequada (módulos, controllers, services)
- [x] Configurar injeção de dependências
- [x] Implementar DTOs com validação (class-validator)
- [x] Configurar TypeORM e entidades
- [x] Implementar guards (JWT, Roles)
- [x] Implementar interceptors (Transform, Logging)
- [x] Configurar pipes de validação global
- [x] Criar health check endpoint
- [x] Manter fidelidade ao contrato OpenAPI
- [x] Garantir que testes de contrato continuam passando

---

## 📊 Status Atual do Projeto

### Serviços Implementados

| Serviço | Fase 1 (PoC) | Fase 2 (Testes) | Fase 3 (NestJS) | Status |
|---------|--------------|-----------------|-----------------|--------|
| **auth-service** | ✅ | ✅ | ✅ | Completo |
| **users-service** | ✅ | ✅ | ✅ | Completo |
| **events-service** | ✅ | ✅ | ✅ | Completo |
| **audit-service** | ✅ | ✅ | ✅ | Completo |
| **categorias-service** | ✅ | ✅ | ✅ | Completo |
| **patrimonio-service** | ✅ | ✅ | ✅ | Completo |

### Estrutura de Testes

Todos os serviços possuem:
- ✅ Testes de contrato (`test/contract/openapi.spec.ts`)
- ✅ Testes E2E (`test/e2e/*.e2e-spec.ts`)
- ✅ Helpers de teste (`test/helpers/auth-helper.ts`)

### Contratos OpenAPI

Todos os serviços possuem:
- ✅ Arquivo `openapi.yaml` completo
- ✅ Schemas definidos
- ✅ Security schemes configurados
- ✅ Endpoints documentados

---

## 🚀 Guia de Execução

### Para um Novo Serviço

#### 1. Fase 1 - Criar PoC

```bash
# Criar branch
git checkout -b feature/poc-novo-service

# Criar estrutura básica
mkdir -p packages/novo-service/src
cd packages/novo-service

# Criar openapi.yaml
# Implementar servidor Express básico
# Criar endpoints mockados

# Testar manualmente
npm run start:dev
```

#### 2. Fase 2 - Adicionar Testes

```bash
# Criar testes de contrato
mkdir -p test/contract
touch test/contract/openapi.spec.ts

# Criar testes de integração
mkdir -p test/e2e
touch test/e2e/novo-service.e2e-spec.ts

# Executar testes
npm run test:contract
npm run test:e2e
```

#### 3. Fase 3 - Converter para NestJS

```bash
# Instalar NestJS CLI
npm install -g @nestjs/cli

# Criar estrutura NestJS
nest new . --skip-git

# Criar módulos, controllers, services
nest generate module novo-modulo
nest generate controller novo-modulo
nest generate service novo-modulo

# Configurar TypeORM, guards, interceptors
# Implementar lógica de negócio
# Garantir que testes passam
```

### Executando Testes

```bash
# Testes de contrato
npm run test:contract

# Testes E2E
npm run test:e2e

# Todos os testes
npm run test:all

# Com cobertura
npm run test:cov
```

### Executando Serviços

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

---

## 📚 Recursos Adicionais

### Documentação

- [NestJS Documentation](https://docs.nestjs.com/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [TypeORM Documentation](https://typeorm.io/)

### Arquivos de Referência

- `packages/auth-service/` - Exemplo completo de serviço
- `packages/events-service/test/contract/openapi.spec.ts` - Exemplo de testes de contrato
- `packages/events-service/test/e2e/smoke-auth-health.e2e-spec.ts` - Exemplo de testes E2E

---

## ✅ Conclusão

As três primeiras fases da migração foram concluídas com sucesso. Todos os serviços possuem:

1. ✅ Contratos OpenAPI bem definidos
2. ✅ Testes de contrato e integração implementados
3. ✅ Estrutura NestJS completa e escalável
4. ✅ Validações, guards e interceptors configurados
5. ✅ Prontos para receber a lógica de negócio do monólito

O projeto está preparado para as próximas fases da migração, onde a lógica real será extraída do monólito e integrada nos microsserviços.

---

**Última atualização**: 2025-01-XX  
**Status**: ✅ Fases 1, 2 e 3 completas

