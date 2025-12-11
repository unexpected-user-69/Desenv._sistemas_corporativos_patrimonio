import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateWorkLogsTable1762437585002 implements MigrationInterface {
  name = 'CreateWorkLogsTable1762437585002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'work_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'work_order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'tipo',
            type: 'varchar',
            length: '20',
            default: "'trabalho'",
            isNullable: false,
          },
          {
            name: 'horas',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'custo',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: false,
          },
          {
            name: 'observacao',
            type: 'text',
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

    // Foreign key
    await queryRunner.createForeignKey(
      'work_logs',
      new TableForeignKey({
        columnNames: ['work_order_id'],
        referencedTableName: 'work_orders',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Índice
    await queryRunner.createIndex(
      'work_logs',
      new TableIndex({
        name: 'ix_work_logs_work_order',
        columnNames: ['work_order_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('work_logs');
  }
}

