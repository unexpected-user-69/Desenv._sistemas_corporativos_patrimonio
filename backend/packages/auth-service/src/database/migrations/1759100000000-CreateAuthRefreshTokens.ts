import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

/**
 * Migração para criar a tabela auth_refresh_tokens.
 * 
 * Baseada no padrão do Aurora Platform, adaptada para UUID.
 */
export class CreateAuthRefreshTokens1759100000000 implements MigrationInterface {
  name = 'CreateAuthRefreshTokens1759100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_refresh_tokens',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'lookup_key',
            type: 'varchar',
            length: '64',
            isNullable: true,
          },
          {
            name: 'token_hash',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'issued_at',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'expires_at',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'revoked_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'replaced_by_token_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ip',
            type: 'varchar',
            length: '45',
            isNullable: true,
          },
          {
            name: 'user_agent',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Criar índices
    await queryRunner.createIndex(
      'auth_refresh_tokens',
      new TableIndex({
        name: 'idx_auth_refresh_tokens_user_id',
        columnNames: ['user_id'],
      }),
    );

    await queryRunner.createIndex(
      'auth_refresh_tokens',
      new TableIndex({
        name: 'idx_auth_refresh_tokens_expires_at',
        columnNames: ['expires_at'],
      }),
    );

    await queryRunner.createIndex(
      'auth_refresh_tokens',
      new TableIndex({
        name: 'idx_auth_refresh_tokens_lookup_key',
        columnNames: ['lookup_key'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth_refresh_tokens');
  }
}






