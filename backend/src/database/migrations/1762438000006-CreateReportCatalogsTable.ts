import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReportCatalogsTable1762438000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'report_catalogs',
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
            length: '100',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'model',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'default_filters',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'current_version',
            type: 'varchar',
            length: '20',
            default: "'1.0.0'",
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'requires_permission',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_by_id',
            type: 'uuid',
          },
          {
            name: 'updated_by_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Índices
    await queryRunner.createIndex(
      'report_catalogs',
      new TableIndex({
        name: 'idx_report_catalogs_key',
        columnNames: ['key'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'report_catalogs',
      new TableIndex({
        name: 'idx_report_catalogs_active',
        columnNames: ['active'],
      }),
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'report_catalogs',
      new TableForeignKey({
        columnNames: ['created_by_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'report_catalogs',
      new TableForeignKey({
        columnNames: ['updated_by_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('report_catalogs');
    if (table) {
      const foreignKeys = table.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('report_catalogs', fk);
      }
    }

    await queryRunner.dropIndex('report_catalogs', 'idx_report_catalogs_key');
    await queryRunner.dropIndex('report_catalogs', 'idx_report_catalogs_active');
    await queryRunner.dropTable('report_catalogs');
  }
}

