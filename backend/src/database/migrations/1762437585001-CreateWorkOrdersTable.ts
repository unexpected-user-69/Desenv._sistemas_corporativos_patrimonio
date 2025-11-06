import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateWorkOrdersTable1762437585001 implements MigrationInterface {
  name = 'CreateWorkOrdersTable1762437585001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'work_orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'patrimonio_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'aberta'",
            isNullable: false,
          },
          {
            name: 'titulo',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'descricao',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'prioridade',
            type: 'varchar',
            length: '20',
            default: "'media'",
            isNullable: false,
          },
          {
            name: 'opened_at',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'closed_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'owner_id',
            type: 'uuid',
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

    // Foreign keys
    await queryRunner.createForeignKey(
      'work_orders',
      new TableForeignKey({
        columnNames: ['patrimonio_id'],
        referencedTableName: 'patrimonios',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'work_orders',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    // Índices
    await queryRunner.createIndex(
      'work_orders',
      new TableIndex({
        name: 'ix_work_orders_status_opened_at',
        columnNames: ['status', 'opened_at'],
      }),
    );

    await queryRunner.createIndex(
      'work_orders',
      new TableIndex({
        name: 'ix_work_orders_patrimonio_status',
        columnNames: ['patrimonio_id', 'status'],
      }),
    );

    await queryRunner.createIndex(
      'work_orders',
      new TableIndex({
        name: 'ix_work_orders_owner_opened_at',
        columnNames: ['owner_id', 'opened_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('work_orders');
  }
}

