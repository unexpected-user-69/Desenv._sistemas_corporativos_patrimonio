import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexesToIntegrations1762437583570
  implements MigrationInterface
{
  name = 'AddIndexesToIntegrations1762437583570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Índice para executions: (connector_id, status, started_at DESC)
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ix_executions_connector_status_started_at 
      ON executions(connector_id, status, started_at DESC)
    `);

    // Índice para executions: (created_by, started_at DESC)
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ix_executions_created_by_started_at 
      ON executions(created_by, started_at DESC)
    `);

    // Índice para execution_logs: (execution_id, created_at ASC)
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS ix_execution_logs_execution_created_at 
      ON execution_logs(execution_id, created_at ASC)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS ix_execution_logs_execution_created_at`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS ix_executions_created_by_started_at`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS ix_executions_connector_status_started_at`,
    );
  }
}





