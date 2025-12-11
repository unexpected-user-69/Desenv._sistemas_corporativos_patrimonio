# Migration: AddCategoriaIdToPatrimonios

## Visão Geral

Esta migration adiciona a coluna `categoria_id` (UUID) à tabela `patrimonios`, permitindo uma relação ManyToOne com a tabela `categorias`.

## Contexto

A tabela `patrimonios` originalmente tinha uma coluna `categoria` do tipo VARCHAR que armazenava o nome/código da categoria como string. Para melhorar a integridade referencial e permitir relacionamentos mais robustos, foi necessário adicionar uma coluna `categoria_id` do tipo UUID que referencia a tabela `categorias`.

## Mudanças Implementadas

### UP (Aplicação da Migration)

1. **Verificação de Existência**: A migration verifica se a coluna `categoria_id` já existe antes de tentar adicioná-la, tornando-a idempotente.

2. **Adição da Coluna**:
   - Nome: `categoria_id`
   - Tipo: `uuid`
   - Nullable: `true` (permite patrimônios sem categoria)

3. **Criação de Índice**:
   - Nome: `idx_patrimonios_categoria_id`
   - Coluna: `categoria_id`
   - Tipo: Não único (permite múltiplos patrimônios com a mesma categoria)

4. **Foreign Key**: 
   - **NOTA**: A foreign key não foi adicionada nesta migration para evitar problemas com dados existentes que possam não ter correspondência na tabela `categorias`.
   - Se necessário, a foreign key pode ser adicionada em uma migration posterior após migração de dados.

### DOWN (Reversão da Migration)

1. Remove o índice `idx_patrimonios_categoria_id`
2. Remove a coluna `categoria_id`

## Impacto no Código

### Entidade Patrimonio

A entidade `Patrimonio` foi ajustada para:
- `categoriaId`: Coluna com `select: false` para não ser carregada por padrão
- `categoria`: Relação `@ManyToOne` com `eager: false` e `createForeignKeyConstraints: false`
- Isso evita erros quando a coluna não existe ou quando há problemas com foreign keys

### Services Afetados

1. **EventsService**: Ajustado para lidar com erros ao carregar patrimônios com categoria
2. **MaintenanceNotificationsService**: Removido `patrimonioIds` de eventos para evitar erros
3. **MaintenanceService**: Validação de categoria antes de criar planos preventivos

## Migração de Dados (Opcional)

Se houver dados existentes na coluna `categoria` (VARCHAR) que precisam ser migrados para `categoria_id` (UUID), execute um script similar a:

```sql
UPDATE patrimonios p
SET categoria_id = c.id
FROM categorias c
WHERE p.categoria = c.codigo;
```

**IMPORTANTE**: Execute este script apenas após garantir que todas as categorias na coluna `categoria` tenham correspondência na tabela `categorias`.

## Testes

Os testes E2E foram ajustados para:
- Verificar e criar a coluna `categoria_id` se não existir
- Usar UUIDs válidos para testes
- Lidar com casos onde a coluna pode não existir

## Rollback

Para reverter esta migration:

```bash
npm run migration:revert
```

Ou manualmente:

```sql
DROP INDEX IF EXISTS idx_patrimonios_categoria_id;
ALTER TABLE patrimonios DROP COLUMN IF EXISTS categoria_id;
```

## Próximos Passos

1. **Migração de Dados**: Se necessário, migrar dados da coluna `categoria` (VARCHAR) para `categoria_id` (UUID)
2. **Adicionar Foreign Key**: Após migração de dados, considerar adicionar foreign key constraint
3. **Remover Coluna Antiga**: Após confirmação de que `categoria_id` está sendo usada, considerar remover a coluna `categoria` (VARCHAR)

## Notas para Desenvolvedores

- A coluna `categoria_id` é **nullable**, então patrimônios podem existir sem categoria
- A relação com `Categoria` está configurada como `eager: false` para evitar carregamento automático
- Use `createForeignKeyConstraints: false` na entidade para evitar problemas com foreign keys que podem não existir
- Sempre verifique se a coluna existe antes de tentar usá-la em queries diretas

## Referências

- Arquivo da migration: `src/database/migrations/1762438000100-AddCategoriaIdToPatrimonios.ts`
- Entidade: `src/patrimonio/entities/patrimonio.entity.ts`
- Testes: `test/maintenance/maintenance.e2e-spec.ts`


