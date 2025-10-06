# Pesquisa Crítica - Trabalho Integrado
## Swagger, Containerização, Paginação e Testes Unitários

---

## 1. Swagger com Prefixo Global

### Problema
O Swagger no NestJS pode gerar URLs incorretas quando o prefixo global é configurado após a inicialização do Swagger, resultando em URLs duplicadas como `/v1/v1/users` ou ausência do prefixo nas documentações.

### Solução
A ordem correta de configuração no `main.ts` é crucial:

```typescript
// ✅ ORDEM CORRETA
const app = await NestFactory.create(AppModule);
app.use(helmet());
app.setGlobalPrefix('v1'); // ← ANTES do Swagger
// ... outras configurações
const config = new DocumentBuilder().build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
```

### Boas Práticas
- Definir prefixo global **antes** da configuração do Swagger
- Usar `@ApiQuery` para documentar parâmetros de query
- Incluir exemplos e descrições detalhadas
- Evitar `addServer('/v1')` quando prefixo já está definido

### Erros Comuns
- Configurar Swagger antes do prefixo global
- URLs duplicadas (`/v1/v1/...`)
- Falta de documentação em parâmetros de query
- Exemplos inadequados ou ausentes

### Checklist de Validação
- [ ] Swagger acessível em `/docs`
- [ ] URLs incluem prefixo `/v1`
- [ ] Parâmetros de query documentados
- [ ] Exemplos funcionais no "Try it out"
- [ ] Respostas de erro documentadas

### Referência
[NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)

---

## 2. Containerização com Docker

### Problema
Ambientes de desenvolvimento inconsistentes, dependências não versionadas e dificuldades de deploy em diferentes ambientes (desenvolvimento, staging, produção).

### Solução
Docker multi-stage com orquestração via Docker Compose:

```dockerfile
# Dockerfile multi-stage
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/start.sh ./
RUN chmod +x ./start.sh
CMD ["./start.sh"]
```

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:15-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 12
  
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
```

### Boas Práticas
- Dockerfile multi-stage para otimizar tamanho da imagem
- Healthcheck para garantir dependências prontas
- `depends_on` com condição de saúde
- Rede dedicada para comunicação entre serviços
- Volumes persistentes para dados

### Erros Comuns
- Imagens muito grandes (incluir devDependencies)
- Race conditions na inicialização
- Falta de healthcheck
- Variáveis de ambiente hardcoded
- Rede padrão (bridge) sem isolamento

### Checklist de Validação
- [ ] Containers iniciam em ordem correta
- [ ] Healthcheck funcional
- [ ] Migrações aplicadas automaticamente
- [ ] Aplicação acessível externamente
- [ ] Logs estruturados e legíveis

### Referência
[Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

## 3. Listagem Paginada

### Problema
Performance degradada em listagens com muitos registros, falta de metadados para navegação e filtros inadequados para grandes volumes de dados.

### Solução
Implementação com QueryBuilder, DTOs validados e metadados completos:

```typescript
// DTO de entrada
export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  q?: string;
}

// Service com QueryBuilder
async findAllWithAdvancedFilters(query: QueryUsersDto) {
  const qb = this.repo.createQueryBuilder('u');
  
  if (query.q) {
    qb.andWhere('(u.name ILIKE :q OR u.email ILIKE :q)', { 
      q: `%${query.q}%` 
    });
  }
  
  if (query.role) {
    qb.andWhere('u.role = :role', { role: query.role });
  }
  
  const [users, total] = await qb
    .orderBy('u.createdAt', 'DESC')
    .skip((query.page - 1) * query.limit)
    .take(query.limit)
    .getManyAndCount();
    
  return {
    data: users.map(u => this.serializeUser(u)),
    total,
    page: query.page,
    limit: query.limit,
    totalPages: Math.ceil(total / query.limit),
    hasNextPage: query.page < Math.ceil(total / query.limit),
    hasPreviousPage: query.page > 1,
  };
}
```

### Boas Práticas
- Validação rigorosa de parâmetros de entrada
- QueryBuilder para filtros complexos
- Metadados completos de paginação
- Índices de banco para campos filtrados
- Serialização segura (excluir campos sensíveis)

### Erros Comuns
- Falta de validação de limites (limit muito alto)
- Queries N+1 por falta de joins
- Ausência de índices em campos filtrados
- Vazamento de dados sensíveis na resposta
- Metadados incompletos para navegação

### Checklist de Validação
- [ ] Validação de page >= 1 e limit <= 100
- [ ] Filtros funcionais (texto, enum, boolean)
- [ ] Ordenação dinâmica
- [ ] Metadados completos (total, totalPages, hasNext/Prev)
- [ ] Performance adequada com grandes volumes

### Referência
[TypeORM QueryBuilder Documentation](https://typeorm.io/select-query-builder)

---

## 4. Testes Unitários

### Problema
Código frágil, bugs em produção, dificuldade de refatoração e falta de confiança em mudanças devido à ausência de testes automatizados.

### Solução
Testes unitários com Test Doubles seguindo o padrão AAA:

```typescript
// Test Doubles
const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
};

const mockHashService = {
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn(),
};

// Teste seguindo padrão AAA
describe('UsersService', () => {
  it('should create user with hashed password', async () => {
    // Arrange
    const createDto = {
      name: 'João Silva',
      email: 'joao@example.com',
      password: 'password123',
    };
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockReturnValue(createDto);
    mockRepository.save.mockResolvedValue({ id: 'uuid', ...createDto });

    // Act
    const result = await service.create(createDto);

    // Assert
    expect(mockHashService.hash).toHaveBeenCalledWith('password123');
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result.passwordHash).toBeUndefined();
  });
});
```

### Boas Práticas
- **Test Doubles**: Dummy, Stub, Spy, Mock, Fake
- **Padrão AAA**: Arrange, Act, Assert
- **Isolamento**: Um conceito por teste
- **Nomes descritivos**: "should return user when valid ID provided"
- **Cobertura**: Mínimo 70% para services críticos

### Erros Comuns
- Testes dependentes de banco real
- Mocks inadequados ou ausentes
- Testes muito complexos (múltiplas responsabilidades)
- Falta de reset de mocks entre testes
- Assertions insuficientes ou inadequadas

### Checklist de Validação
- [ ] Cobertura ≥ 70% em services críticos
- [ ] Testes isolados (sem dependências externas)
- [ ] Mocks adequados para todas as dependências
- [ ] Cenários de sucesso e erro testados
- [ ] Nomes descritivos e organizados

### Referência
[Jest Testing Framework](https://jestjs.io/docs/getting-started)

---

## Conclusão

A integração desses quatro componentes (Swagger, Docker, Paginação e Testes) resulta em uma API robusta, documentada, reprodutível e confiável. Cada componente resolve problemas específicos do desenvolvimento de software, e sua combinação cria um ambiente de desenvolvimento profissional adequado para produção.

A implementação demonstra como teoria e prática se conectam, transformando conceitos abstratos em soluções concretas que melhoram a qualidade do código, a experiência do desenvolvedor e a confiabilidade do sistema.
