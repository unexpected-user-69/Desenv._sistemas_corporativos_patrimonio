import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreatePartsTable1762437585003 implements MigrationInterface {
  name = 'CreatePartsTable1762437585003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'parts',
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
            name: 'descricao',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'quantidade',
            type: 'int',
            default: 1,
            isNullable: false,
          },
          {
            name: 'custo_unitario',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Foreign key
    await queryRunner.createForeignKey(
      'parts',
      new TableForeignKey({
        columnNames: ['work_order_id'],
        referencedTableName: 'work_orders',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Índice
    await queryRunner.createIndex(
      'parts',
      new TableIndex({
        name: 'ix_parts_work_order',
        columnNames: ['work_order_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parts');
  }
}

