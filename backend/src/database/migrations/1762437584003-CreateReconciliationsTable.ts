import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReconciliationsTable1762437584003 implements MigrationInterface {
  name = 'CreateReconciliationsTable1762437584003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reconciliations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'campaign_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'divergencias_json',
            type: 'jsonb',
            default: "'[]'",
            isNullable: false,
          },
          {
            name: 'executed_at',
            type: 'timestamp with time zone',
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

    // Foreign key para campaigns
    await queryRunner.createForeignKey(
      'reconciliations',
      new TableForeignKey({
        columnNames: ['campaign_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'campaigns',
        onDelete: 'CASCADE',
        name: 'fk_reconciliations_campaign',
      }),
    );

    // Constraint de check para status
    await queryRunner.query(`
      ALTER TABLE reconciliations 
      ADD CONSTRAINT chk_reconciliations_status 
      CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
    `);

    // Índice
    await queryRunner.createIndex(
      'reconciliations',
      new TableIndex({
        name: 'ix_reconciliations_campaign_status',
        columnNames: ['campaign_id', 'status'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE reconciliations DROP CONSTRAINT IF EXISTS chk_reconciliations_status`,
    );
    await queryRunner.dropIndex('reconciliations', 'ix_reconciliations_campaign_status');
    await queryRunner.dropForeignKey('reconciliations', 'fk_reconciliations_campaign');
    await queryRunner.dropTable('reconciliations');
  }
}

