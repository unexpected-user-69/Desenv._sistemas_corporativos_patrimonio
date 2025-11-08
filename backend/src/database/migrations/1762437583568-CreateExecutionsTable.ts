import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateExecutionsTable1762437583568 implements MigrationInterface {
  name = 'CreateExecutionsTable1762437583568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'executions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'connector_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '16',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '16',
            isNullable: false,
          },
          {
            name: 'started_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'finished_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'error',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'varchar',
            length: '120',
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

    // Criar foreign key para connectors
    await queryRunner.createForeignKey(
      'executions',
      new TableForeignKey({
        columnNames: ['connector_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'connectors',
        onDelete: 'RESTRICT',
        name: 'fk_executions_connector',
      }),
    );

    // Criar constraints de check
    await queryRunner.query(`
      ALTER TABLE executions 
      ADD CONSTRAINT chk_executions_type 
      CHECK (type IN ('import', 'export'))
    `);

    await queryRunner.query(`
      ALTER TABLE executions 
      ADD CONSTRAINT chk_executions_status 
      CHECK (status IN ('queued', 'running', 'success', 'failed', 'canceled'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE executions DROP CONSTRAINT IF EXISTS chk_executions_status`,
    );
    await queryRunner.query(
      `ALTER TABLE executions DROP CONSTRAINT IF EXISTS chk_executions_type`,
    );
    await queryRunner.dropForeignKey('executions', 'fk_executions_connector');
    await queryRunner.dropTable('executions');
  }
}




