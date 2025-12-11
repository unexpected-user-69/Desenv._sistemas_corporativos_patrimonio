# Estrutura dos Containers do Backend

## Visão Geral

O backend foi reorganizado para que cada microserviço possua seu próprio container, todos agrupados logicamente dentro do grupo "backend". Todos os microserviços compartilham o mesmo banco de dados PostgreSQL, utilizando schemas separados para isolamento lógico dos dados.

## Estrutura Atual

### Grupo Backend - Microserviços

Todos os microserviços estão agrupados usando labels Docker (`com.patrimonio.group=backend`) e possuem nomes de container prefixados com `patrimonio_backend_`:

1. **auth-service** (Porta 3001)
   - Container: `patrimonio_backend_auth_service`
   - Schema: `auth`
   - Descrição: Serviço de autenticação e autorização

2. **users-service** (Porta 3002)
   - Container: `patrimonio_backend_users_service`
   - Schema: `users`
   - Descrição: Gerenciamento de usuários

3. **events-service** (Porta 3003)
   - Container: `patrimonio_backend_events_service`
   - Schema: `events`
   - Descrição: Gerenciamento de eventos do sistema

4. **audit-service** (Porta 3004)
   - Container: `patrimonio_backend_audit_service`
   - Schema: `audit`
   - Descrição: Auditoria e logs do sistema

5. **categorias-service** (Porta 3005)
   - Container: `patrimonio_backend_categorias_service`
   - Schema: `categorias`
   - Descrição: Gerenciamento de categorias

6. **patrimonio-service** (Porta 3006)
   - Container: `patrimonio_backend_patrimonio_service`
   - Schema: `patrimonio`
   - Descrição: Gerenciamento de patrimônios

### Infraestrutura Compartilhada

- **PostgreSQL** (Porta 5432)
  - Container: `patrimonio_inventario_db`
  - Banco: `patrimonio_inventario`
  - Schemas criados automaticamente via script de inicialização
  - Localização dos scripts: `./backend/scripts/database/init/`

- **Redis** (Porta 6379)
  - Container: `patrimonio_inventario_redis`
  - Uso: Cache e filas (BullMQ)

## Configuração de Schemas

Os schemas são criados automaticamente quando o container do PostgreSQL é inicializado pela primeira vez. O script está localizado em:

```
./backend/scripts/database/init/create-schemas.sql
```

Este script cria os seguintes schemas:
- `auth`
- `users`
- `events`
- `audit`
- `categorias`
- `patrimonio`

Cada microserviço é configurado para usar seu schema específico através da variável de ambiente `DB_SCHEMA`.

## Labels Docker

Todos os microserviços do backend possuem as seguintes labels:

```yaml
labels:
  - "com.patrimonio.group=backend"
  - "com.patrimonio.type=microservice"
  - "com.patrimonio.service=<nome_do_servico>"
```

Isso permite filtrar e gerenciar containers por grupo:

```bash
# Listar todos os containers do backend
docker ps --filter "label=com.patrimonio.group=backend"

# Parar todos os microserviços do backend
docker stop $(docker ps -q --filter "label=com.patrimonio.group=backend")

# Ver logs de todos os serviços do backend
docker logs --filter "label=com.patrimonio.group=backend"
```

## Comandos Úteis

### Iniciar todos os serviços do backend

```bash
docker-compose up -d auth-service users-service events-service audit-service categorias-service patrimonio-service
```

### Iniciar apenas os serviços do backend (usando labels)

```bash
docker-compose up -d $(docker-compose config --services | grep -E "(auth|users|events|audit|categorias|patrimonio)-service")
```

### Ver status de todos os containers do backend

```bash
docker ps --filter "label=com.patrimonio.group=backend" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Ver logs de um microserviço específico

```bash
docker logs -f patrimonio_backend_auth_service
```

### Ver logs de todos os microserviços do backend

```bash
docker logs -f $(docker ps -q --filter "label=com.patrimonio.group=backend")
```

### Reiniciar todos os microserviços do backend

```bash
docker restart $(docker ps -q --filter "label=com.patrimonio.group=backend")
```

### Executar comando em um microserviço específico

```bash
docker exec -it patrimonio_backend_auth_service sh
```

## Dependências entre Serviços

A ordem de inicialização é gerenciada automaticamente pelo Docker Compose através de `depends_on`:

```
db (PostgreSQL) ──┐
                  ├──> auth-service
redis ────────────┘

auth-service ────> users-service
                    ├──> events-service
                    └──> audit-service

auth-service ────> categorias-service ───> patrimonio-service
```

## Variáveis de Ambiente

Cada microserviço recebe as seguintes variáveis de ambiente principais:

- `DB_HOST`: Nome do serviço do banco (db)
- `DB_PORT`: 5432
- `DB_USER`: Usuário do PostgreSQL
- `DB_PASS`: Senha do PostgreSQL
- `DB_NAME`: Nome do banco (patrimonio_inventario)
- `DB_SCHEMA`: Schema específico do microserviço
- `REDIS_HOST`: redis
- `REDIS_PORT`: 6379
- `PORT`: Porta específica do serviço (3001-3006)

## Health Checks

Todos os microserviços possuem health checks configurados que verificam o endpoint `/health`:

- Intervalo: 30 segundos
- Timeout: 10 segundos
- Retries: 3
- Start period: 40 segundos

## Isolamento de Dados

Embora todos os microserviços compartilhem o mesmo banco de dados PostgreSQL, o isolamento lógico é garantido através de:

1. **Schemas separados**: Cada microserviço usa seu próprio schema
2. **Containers separados**: Cada microserviço roda em seu próprio container
3. **Rede isolada**: Todos os serviços estão na mesma rede Docker (`patrimonio_network`)

## Migração do Monolito

O serviço monolítico `backend` foi removido do `docker-compose.yml`. Todos os serviços agora rodam como microserviços independentes.

## Próximos Passos

1. Verificar se todos os microserviços estão funcionando corretamente
2. Ajustar as dependências do frontend para apontar para os microserviços corretos
3. Configurar um API Gateway se necessário
4. Considerar separação completa de bancos de dados no futuro (Fase 2)

## Notas Importantes

- Os schemas são criados automaticamente na primeira inicialização do PostgreSQL
- O serviço monolítico foi removido para evitar conflitos
- Todos os containers do backend estão na mesma rede para facilitar a comunicação
- Os health checks garantem que os serviços estejam prontos antes de aceitar dependências

