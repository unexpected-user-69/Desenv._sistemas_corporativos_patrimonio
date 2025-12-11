import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateMaintenancePlansTable1762437585000 implements MigrationInterface {
  name = 'CreateMaintenancePlansTable1762437585000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenance_plans',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'categoria_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'periodicidade',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'proxima_execucao',
            type: 'timestamp with time zone',
            isNullable: false,
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
      'maintenance_plans',
      new TableForeignKey({
        columnNames: ['categoria_id'],
        referencedTableName: 'categorias',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'maintenance_plans',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );

    // Índices
    await queryRunner.createIndex(
      'maintenance_plans',
      new TableIndex({
        name: 'ix_maintenance_plans_categoria',
        columnNames: ['categoria_id'],
      }),
    );

    await queryRunner.createIndex(
      'maintenance_plans',
      new TableIndex({
        name: 'ix_maintenance_plans_owner',
        columnNames: ['owner_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('maintenance_plans');
  }
}

