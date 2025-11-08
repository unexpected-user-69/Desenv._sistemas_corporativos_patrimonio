import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReportArtifactsTable1762438000005 implements MigrationInterface {
  name = 'CreateReportArtifactsTable1762438000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'report_artifacts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'request_id',
            type: 'uuid',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'storage_key',
            type: 'varchar',
            length: '500',
            isNullable: false,
          },
          {
            name: 'mime',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'size_bytes',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'expires_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'created_at',
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
      'report_artifacts',
      new TableIndex({
        name: 'ix_report_artifacts_request_id',
        columnNames: ['request_id'],
      }),
    );

    await queryRunner.createIndex(
      'report_artifacts',
      new TableIndex({
        name: 'ix_report_artifacts_expires_at',
        columnNames: ['expires_at'],
      }),
    );

    // Foreign Key
    await queryRunner.createForeignKey(
      'report_artifacts',
      new TableForeignKey({
        columnNames: ['request_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'report_requests',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('report_artifacts');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('request_id') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('report_artifacts', foreignKey);
      }
    }

    await queryRunner.dropIndex('report_artifacts', 'ix_report_artifacts_expires_at');
    await queryRunner.dropIndex('report_artifacts', 'ix_report_artifacts_request_id');
    await queryRunner.dropTable('report_artifacts');
  }
}



