import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddLookupKeyToRefreshTokens1762727000000
  implements MigrationInterface
{
  name = 'AddLookupKeyToRefreshTokens1762727000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar coluna lookup_key
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

    // Criar índice para lookup_key para melhorar performance
    await queryRunner.createIndex(
      'auth_refresh_tokens',
      new TableIndex({
        name: 'IDX_refresh_lookup_key',
        columnNames: ['lookup_key'],
      }),
    );

    // Criar índice composto para melhorar queries de refresh
    await queryRunner.createIndex(
      'auth_refresh_tokens',
      new TableIndex({
        name: 'IDX_refresh_lookup_revoked_expires',
        columnNames: ['lookup_key', 'revoked_at', 'expires_at'],
      }),
    );
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

