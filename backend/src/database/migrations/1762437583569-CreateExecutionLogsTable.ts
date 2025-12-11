import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateExecutionLogsTable1762437583569 implements MigrationInterface {
  name = 'CreateExecutionLogsTable1762437583569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'execution_logs',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'execution_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'level',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'message',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'meta_json',
            type: 'jsonb',
            default: "'{}'",
            isNullable: false,
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

    // Criar foreign key para executions
    await queryRunner.createForeignKey(
      'execution_logs',
      new TableForeignKey({
        columnNames: ['execution_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'executions',
        onDelete: 'CASCADE',
        name: 'fk_execution_logs_execution',
      }),
    );

    // Criar constraint de check para level
    await queryRunner.query(`
      ALTER TABLE execution_logs 
      ADD CONSTRAINT chk_execution_logs_level 
      CHECK (level IN ('debug', 'info', 'warn', 'error'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE execution_logs DROP CONSTRAINT IF EXISTS chk_execution_logs_level`,
    );
    await queryRunner.dropForeignKey(
      'execution_logs',
      'fk_execution_logs_execution',
    );
    await queryRunner.dropTable('execution_logs');
  }
}





