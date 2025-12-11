import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReportQuotasTable1762438000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'report_quotas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'limit',
            type: 'integer',
            default: 100,
          },
          {
            name: 'used',
            type: 'integer',
            default: 0,
          },
          {
            name: 'period_start',
            type: 'date',
          },
          {
            name: 'period_end',
            type: 'date',
          },
          {
            name: 'period_type',
            type: 'varchar',
            length: '20',
            default: "'monthly'",
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
      'report_quotas',
      new TableIndex({
        name: 'idx_report_quotas_user',
        columnNames: ['user_id'],
      }),
    );

    await queryRunner.createIndex(
      'report_quotas',
      new TableIndex({
        name: 'idx_report_quotas_period',
        columnNames: ['period_start', 'period_end'],
      }),
    );

    await queryRunner.createIndex(
      'report_quotas',
      new TableIndex({
        name: 'idx_report_quotas_unique',
        columnNames: ['user_id', 'period_start', 'period_end'],
        isUnique: true,
      }),
    );

    // Foreign key
    await queryRunner.createForeignKey(
      'report_quotas',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('report_quotas');
    if (table) {
      const foreignKeys = table.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('report_quotas', fk);
      }
    }

    await queryRunner.dropIndex('report_quotas', 'idx_report_quotas_user');
    await queryRunner.dropIndex('report_quotas', 'idx_report_quotas_period');
    await queryRunner.dropIndex('report_quotas', 'idx_report_quotas_unique');
    await queryRunner.dropTable('report_quotas');
  }
}


