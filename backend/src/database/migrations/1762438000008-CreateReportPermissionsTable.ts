import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReportPermissionsTable1762438000008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'report_permissions',
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
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'can_view',
            type: 'boolean',
            default: true,
          },
          {
            name: 'can_generate',
            type: 'boolean',
            default: true,
          },
          {
            name: 'can_download',
            type: 'boolean',
            default: true,
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
      'report_permissions',
      new TableIndex({
        name: 'idx_report_permissions_catalog',
        columnNames: ['catalog_id'],
      }),
    );

    await queryRunner.createIndex(
      'report_permissions',
      new TableIndex({
        name: 'idx_report_permissions_user',
        columnNames: ['user_id'],
      }),
    );

    await queryRunner.createIndex(
      'report_permissions',
      new TableIndex({
        name: 'idx_report_permissions_role',
        columnNames: ['role'],
      }),
    );

    await queryRunner.createIndex(
      'report_permissions',
      new TableIndex({
        name: 'idx_report_permissions_unique',
        columnNames: ['catalog_id', 'user_id', 'role'],
        isUnique: true,
      }),
    );

    // Foreign keys
    await queryRunner.createForeignKey(
      'report_permissions',
      new TableForeignKey({
        columnNames: ['catalog_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'report_catalogs',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'report_permissions',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'report_permissions',
      new TableForeignKey({
        columnNames: ['created_by_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('report_permissions');
    if (table) {
      const foreignKeys = table.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('report_permissions', fk);
      }
    }

    await queryRunner.dropIndex('report_permissions', 'idx_report_permissions_catalog');
    await queryRunner.dropIndex('report_permissions', 'idx_report_permissions_user');
    await queryRunner.dropIndex('report_permissions', 'idx_report_permissions_role');
    await queryRunner.dropIndex('report_permissions', 'idx_report_permissions_unique');
    await queryRunner.dropTable('report_permissions');
  }
}

