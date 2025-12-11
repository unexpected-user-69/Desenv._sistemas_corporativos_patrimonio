# 📚 Guia de Migração - Padrão Aurora

Este guia documenta a migração do projeto para seguir os padrões do Aurora Platform.

## 🎯 Objetivo

Migrar o sistema de patrimônio para seguir as melhores práticas e padrões estabelecidos no Aurora Platform, garantindo consistência, manutenibilidade e escalabilidade.

## 📋 Fases da Migração

### ✅ Fase 1: Infraestrutura
- Data Source centralizado
- TypeORM configurado
- Migrations organizadas
- Docker configurado

### ✅ Fase 2: Auth & Common
- Autenticação JWT completa
- Guards e interceptors
- Decorators e validators
- Serviços compartilhados

### ✅ Fase 3: Módulos de Domínio
- Users Module
- Patrimônio Module
- Categorias Module
- Audit Module

### ✅ Fase 4: Testes
- Estrutura de testes (padrão Aurora)
- Factories e mocks
- Testes unitários completos
- Cobertura >70% nos módulos principais

### 🔄 Fase 5: Documentação e Limpeza
- LLM-UNIFIED-GUIDE
- README completo
- Swagger final
- Limpeza de código

## 🔧 Mudanças Principais

### Estrutura de Testes

**Antes:**
```
src/
  users/
    users.service.spec.ts
    users.controller.spec.ts
```

**Depois (Padrão Aurora):**
```
test/
  users/
    services/
      users.service.create.spec.ts
      users.service.findOne.spec.ts
      ...
    controllers/
      users.controller.findOne.spec.ts
      ...
```

### IDs: Integer → UUID

**Antes:**
```typescript
id: number;
```

**Depois:**
```typescript
id: string; // UUID
```

### Factories de Teste

**Antes:**
```typescript
const user = {
  id: 1,
  name: 'Test User',
  // ...
};
```

**Depois:**
```typescript
import { makeUserEntity } from '../../factories/user.factory';

const user = makeUserEntity({
  name: 'Test User',
  // id é gerado automaticamente como UUID
});
```

## 📝 Checklist de Migração

### Para Desenvolvedores

- [ ] Ler `LLM-UNIFIED-GUIDE.md`
- [ ] Verificar estrutura de testes em `test/`
- [ ] Usar factories de `test/factories/`
- [ ] Usar mocks de `test/mocks/`
- [ ] Seguir padrão Aurora para novos testes
- [ ] Usar UUID para IDs (não Integer)
- [ ] Executar `npm run lint` antes de commit
- [ ] Executar `npm test` antes de commit

### Para Novos Recursos

- [ ] Criar testes em `test/<feature>/`
- [ ] Criar factories em `test/factories/`
- [ ] Documentar endpoints no Swagger
- [ ] Adicionar validações apropriadas
- [ ] Implementar soft delete quando aplicável
- [ ] Adicionar auditoria quando necessário

## 🚀 Como Usar

### Criar Novo Teste

1. Escolha a localização: `test/<feature>/services/` ou `test/<feature>/controllers/`
2. Use factories: `makeUserEntity()`, `makePatrimonioEntity()`, etc.
3. Use mocks: `repositoryMockFactory()`
4. Siga o padrão de um arquivo por método

### Exemplo de Teste

```typescript
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory, MockType } from '../../mocks/repository.mock';
import { UsersService } from '../../../src/users/users.service';
import { makeUserEntity } from '../../factories/user.factory';

describe('UsersService.create (unit)', () => {
  let service: UsersService;
  let repository: MockType<Repository<User>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should create user successfully', async () => {
    const dto = makeCreateUserDto();
    const entity = makeUserEntity(dto);

    repository.save.mockResolvedValue(entity as User);

    const result = await service.create(dto);

    expect(result).toMatchObject({
      email: dto.email,
      name: dto.name,
    });
  });
});
```

## 📚 Referências

- **Aurora Platform**: `dsc-2025-2-aurora-platform/`
- **LLM-UNIFIED-GUIDE**: `backend/LLM-UNIFIED-GUIDE.md`
- **Plano de Implementação**: `Migration_catalagaçao/03-PLANO_IMPLEMENTACAO.md`
- **Checklist**: `Migration_catalagaçao/04-CHECKLIST_MIGRACAO.md`

---

**Última Atualização**: 2025-01-27

