import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReportCatalogVersionsTable1762438000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'report_catalog_versions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'catalog_id',
            type: 'uuid',
          },
          {
            name: 'version',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'changelog',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'filters',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'is_current',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_by_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Índices
    await queryRunner.createIndex(
      'report_catalog_versions',
      new TableIndex({
        name: 'idx_report_catalog_versions_catalog',
        columnNames: ['catalog_id'],
      }),
    );

    await queryRunner.createIndex(
      'report_catalog_versions',
      new TableIndex({
        name: 'idx_report_catalog_versions_version',
        columnNames: ['version'],
      }),
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'report_catalog_versions',
      new TableForeignKey({
        columnNames: ['catalog_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'report_catalogs',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'report_catalog_versions',
      new TableForeignKey({
        columnNames: ['created_by_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('report_catalog_versions');
    if (table) {
      const foreignKeys = table.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('report_catalog_versions', fk);
      }
    }

    await queryRunner.dropIndex('report_catalog_versions', 'idx_report_catalog_versions_catalog');
    await queryRunner.dropIndex('report_catalog_versions', 'idx_report_catalog_versions_version');
    await queryRunner.dropTable('report_catalog_versions');
  }
}


