import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddLookupKeyToRefreshTokens1762727000000
  implements MigrationInterface
{
  name = 'AddLookupKeyToRefreshTokens1762727000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Verificar se a coluna já existe
    const table = await queryRunner.getTable('auth_refresh_tokens');
    const lookupKeyColumn = table?.findColumnByName('lookup_key');

    // Adicionar coluna lookup_key apenas se não existir
    if (!lookupKeyColumn) {
      await queryRunner.addColumn(
        'auth_refresh_tokens',
        new TableColumn({
          name: 'lookup_key',
          type: 'varchar',
          length: '64',
          isNullable: true,
          comment: 'Hash rápido (SHA256) para lookup eficiente de tokens',
        }),
      );
    }

    // Verificar se os índices já existem antes de criá-los
    const indices = table?.indices || [];
    const hasLookupKeyIndex = indices.some(
      (idx) => idx.name === 'IDX_refresh_lookup_key',
    );
    const hasLookupRevokedExpiresIndex = indices.some(
      (idx) => idx.name === 'IDX_refresh_lookup_revoked_expires',
    );

    // Criar índice para lookup_key para melhorar performance
    if (!hasLookupKeyIndex) {
      await queryRunner.createIndex(
        'auth_refresh_tokens',
        new TableIndex({
          name: 'IDX_refresh_lookup_key',
          columnNames: ['lookup_key'],
        }),
      );
    }

    // Criar índice composto para melhorar queries de refresh
    if (!hasLookupRevokedExpiresIndex) {
      await queryRunner.createIndex(
        'auth_refresh_tokens',
        new TableIndex({
          name: 'IDX_refresh_lookup_revoked_expires',
          columnNames: ['lookup_key', 'revoked_at', 'expires_at'],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índices
    await queryRunner.dropIndex(
      'auth_refresh_tokens',
      'IDX_refresh_lookup_revoked_expires',
    );
    await queryRunner.dropIndex('auth_refresh_tokens', 'IDX_refresh_lookup_key');

    // Remover coluna
    await queryRunner.dropColumn('auth_refresh_tokens', 'lookup_key');
  }
}

