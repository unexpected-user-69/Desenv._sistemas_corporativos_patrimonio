# 🚀 Guia Rápido - Fases 1, 2 e 3

Guia prático e resumido para executar as três primeiras fases da migração para microsserviços.

---

## 📋 Resumo das Fases

| Fase | Objetivo | Tecnologia | Duração |
|------|----------|------------|---------|
| **Fase 1** | Criar PoC (Provedor Mínimo) | Express | 1-2 dias |
| **Fase 2** | Implementar Testes de Contrato | Jest + OpenAPI | 1-2 dias |
| **Fase 3** | Converter para NestJS Completo | NestJS | 2-3 dias |

---

## 🎯 Fase 1 - Prova de Conceito (PoC)

### Objetivo
Criar um servidor básico que respeita o contrato OpenAPI com respostas mockadas.

### Passos

1. **Criar branch**
```bash
git checkout -b feature/poc-meu-service
```

2. **Criar estrutura**
```bash
mkdir -p packages/meu-service/src
cd packages/meu-service
npm init -y
```

3. **Instalar dependências**
```bash
npm install express cors
npm install -D @types/express @types/cors typescript ts-node
```

4. **Criar openapi.yaml** (definir contrato)

5. **Criar servidor Express básico**
```typescript
// src/main.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/meu-endpoint', (req, res) => {
  // Validação básica
  if (!req.body.campo) {
    return res.status(400).json({ error: 'Campo obrigatório' });
  }
  
  // Resposta mockada
  res.json({ id: 'mock-id', ...req.body });
});

app.listen(3001, () => console.log('Serviço rodando na porta 3001'));
```

6. **Testar manualmente**
```bash
npm run start:dev
# Testar com Postman ou curl
```

### Checklist Fase 1
- [ ] Branch criada (`feature/poc-meu-service`)
- [ ] Estrutura de pastas criada
- [ ] `openapi.yaml` definido
- [ ] Servidor Express básico funcionando
- [ ] Endpoints respondem conforme contrato
- [ ] Testado manualmente

---

## 🧪 Fase 2 - Testes de Contrato

### Objetivo
Garantir que o contrato OpenAPI está correto e a implementação o respeita.

### Passos

1. **Instalar dependências de teste**
```bash
npm install -D jest @types/jest ts-jest supertest @types/supertest yaml
```

2. **Criar teste de contrato**
```typescript
// test/contract/openapi.spec.ts
import { readFileSync } from 'fs';
import * as yaml from 'yaml';
import * as path from 'path';

describe('OpenAPI Contract', () => {
  let spec: any;

  beforeAll(() => {
    const specPath = path.join(__dirname, '../../openapi.yaml');
    spec = yaml.parse(readFileSync(specPath, 'utf-8'));
  });

  it('should have OpenAPI 3.1.0', () => {
    expect(spec.openapi).toBe('3.1.0');
  });

  it('should have required paths', () => {
    expect(spec.paths['/meu-endpoint']).toBeDefined();
  });

  it('should have required schemas', () => {
    expect(spec.components.schemas).toBeDefined();
  });
});
```

3. **Criar teste de integração**
```typescript
// test/e2e/meu-service.e2e-spec.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';

describe('Meu Service E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  it('POST /meu-endpoint should return 200', async () => {
    const response = await request(app.getHttpServer())
      .post('/meu-endpoint')
      .send({ campo: 'valor' })
      .expect(200);
    
    expect(response.body).toHaveProperty('id');
  });
});
```

4. **Configurar package.json**
```json
{
  "scripts": {
    "test:contract": "jest test/contract --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "test:all": "npm run test:contract && npm run test:e2e"
  }
}
```

5. **Executar testes**
```bash
npm run test:contract
npm run test:e2e
```

### Checklist Fase 2
- [ ] Testes de contrato criados
- [ ] Testes de integração criados
- [ ] Scripts configurados no package.json
- [ ] Todos os testes passando (verde)
- [ ] Documentação de como executar testes

---

## 🏗️ Fase 3 - NestJS Completo

### Objetivo
Converter o PoC Express para uma aplicação NestJS completa e escalável.

### Passos

1. **Instalar NestJS**
```bash
npm install @nestjs/common @nestjs/core @nestjs/platform-express
npm install -D @nestjs/cli @nestjs/schematics
```

2. **Criar estrutura NestJS**
```bash
nest new . --skip-git
# Ou criar manualmente
```

3. **Criar módulo**
```bash
nest generate module meu-modulo
nest generate controller meu-modulo
nest generate service meu-modulo
```

4. **Implementar Controller**
```typescript
// src/meu-modulo/meu-modulo.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MeuModuloService } from './meu-modulo.service';
import { CreateDto } from './dto/create.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('meu-endpoint')
@UseGuards(JwtAuthGuard)
export class MeuModuloController {
  constructor(private readonly service: MeuModuloService) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.service.create(createDto);
  }
}
```

5. **Implementar Service**
```typescript
// src/meu-modulo/meu-modulo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entity } from './entities/entity.entity';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class MeuModuloService {
  constructor(
    @InjectRepository(Entity)
    private repository: Repository<Entity>,
  ) {}

  async create(createDto: CreateDto): Promise<Entity> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }
}
```

6. **Criar DTOs com validação**
```typescript
// src/meu-modulo/dto/create.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  campo: string;
}
```

7. **Configurar TypeORM**
```typescript
// src/database/data-source.ts
import { DataSource } from 'typeorm';
import { Entity } from '../meu-modulo/entities/entity.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Entity],
  synchronize: false,
  migrations: ['src/database/migrations/*.ts'],
});
```

8. **Configurar Guards e Interceptors**
```typescript
// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

app.useGlobalPipes(new ValidationPipe());
app.useGlobalInterceptors(new TransformResponseInterceptor());
```

9. **Garantir que testes passam**
```bash
npm run test:contract
npm run test:e2e
```

### Checklist Fase 3
- [ ] Estrutura NestJS criada
- [ ] Módulos, controllers e services implementados
- [ ] DTOs com validação (class-validator)
- [ ] TypeORM configurado
- [ ] Guards implementados (JWT, Roles)
- [ ] Interceptors configurados
- [ ] Pipes de validação global
- [ ] Health check endpoint
- [ ] Testes de contrato passando
- [ ] Testes E2E passando

---

## 📝 Comandos Úteis

### Desenvolvimento
```bash
# Iniciar em modo desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod
```

### Testes
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

### TypeORM
```bash
# Gerar migration
npm run migration:generate -- -n NomeMigration

# Executar migrations
npm run migration:run

# Reverter migration
npm run migration:revert
```

---

## 🔍 Verificação Final

Antes de considerar uma fase completa, verifique:

### Fase 1 ✅
- [ ] Servidor responde em todas as rotas definidas no OpenAPI
- [ ] Respostas seguem o formato do contrato
- [ ] Validação básica de entrada funciona

### Fase 2 ✅
- [ ] Testes de contrato validam estrutura do OpenAPI
- [ ] Testes de integração validam implementação
- [ ] Todos os testes passam
- [ ] Scripts configurados e funcionando

### Fase 3 ✅
- [ ] Estrutura NestJS completa
- [ ] Injeção de dependências funcionando
- [ ] Validações com DTOs funcionando
- [ ] Guards e interceptors configurados
- [ ] Testes continuam passando
- [ ] Pronto para receber lógica do monólito

---

## 📚 Referências

- **Exemplo Completo**: `packages/auth-service/`
- **Testes de Contrato**: `packages/events-service/test/contract/openapi.spec.ts`
- **Testes E2E**: `packages/events-service/test/e2e/smoke-auth-health.e2e-spec.ts`
- **Documentação Completa**: `docs/FASES_1_2_3_MIGRACAO.md`

---

**Dica**: Use os serviços já implementados como referência para entender os padrões e estrutura esperada.
















