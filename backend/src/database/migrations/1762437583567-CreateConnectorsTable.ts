import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateConnectorsTable1762437583567 implements MigrationInterface {
  name = 'CreateConnectorsTable1762437583567';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'connectors',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'key',
            type: 'varchar',
            length: '80',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'config_json',
            type: 'jsonb',
            default: "'{}'",
            isNullable: false,
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Criar índice único para key
    await queryRunner.createIndex(
      'connectors',
      new TableIndex({
        name: 'ux_connectors_key',
        columnNames: ['key'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('connectors', 'ux_connectors_key');
    await queryRunner.dropTable('connectors');
  }
}


