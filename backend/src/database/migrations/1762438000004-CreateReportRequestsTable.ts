import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReportRequestsTable1762438000004 implements MigrationInterface {
  name = 'CreateReportRequestsTable1762438000004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'report_requests',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'model',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'filters_json',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'created_by_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'error_message',
            type: 'text',
            isNullable: true,
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

    // Índices
    await queryRunner.createIndex(
      'report_requests',
      new TableIndex({
        name: 'ix_report_requests_status_created_at',
        columnNames: ['status', 'created_at'],
      }),
    );

    await queryRunner.createIndex(
      'report_requests',
      new TableIndex({
        name: 'ix_report_requests_created_by_created_at',
        columnNames: ['created_by_id', 'created_at'],
      }),
    );

    // Foreign Key
    await queryRunner.createForeignKey(
      'report_requests',
      new TableForeignKey({
        columnNames: ['created_by_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('report_requests');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('created_by_id') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('report_requests', foreignKey);
      }
    }

    await queryRunner.dropIndex('report_requests', 'ix_report_requests_created_by_created_at');
    await queryRunner.dropIndex('report_requests', 'ix_report_requests_status_created_at');
    await queryRunner.dropTable('report_requests');
  }
}



