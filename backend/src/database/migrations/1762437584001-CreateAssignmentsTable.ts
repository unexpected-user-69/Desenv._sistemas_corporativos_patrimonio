import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateAssignmentsTable1762437584001 implements MigrationInterface {
  name = 'CreateAssignmentsTable1762437584001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'assignments',
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
            name: 'coletor_id',
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
      'assignments',
      new TableForeignKey({
        columnNames: ['campaign_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'campaigns',
        onDelete: 'CASCADE',
        name: 'fk_assignments_campaign',
      }),
    );

    await queryRunner.createForeignKey(
      'assignments',
      new TableForeignKey({
        columnNames: ['coletor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
        name: 'fk_assignments_coletor',
      }),
    );

    // Constraint de check para status
    await queryRunner.query(`
      ALTER TABLE assignments 
      ADD CONSTRAINT chk_assignments_status 
      CHECK (status IN ('pending', 'in_progress', 'completed', 'canceled'))
    `);

    // Índices
    await queryRunner.createIndex(
      'assignments',
      new TableIndex({
        name: 'ix_assignments_campaign_status',
        columnNames: ['campaign_id', 'status'],
      }),
    );

    await queryRunner.createIndex(
      'assignments',
      new TableIndex({
        name: 'ix_assignments_coletor_status',
        columnNames: ['coletor_id', 'status'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE assignments DROP CONSTRAINT IF EXISTS chk_assignments_status`,
    );
    await queryRunner.dropIndex('assignments', 'ix_assignments_coletor_status');
    await queryRunner.dropIndex('assignments', 'ix_assignments_campaign_status');
    await queryRunner.dropForeignKey('assignments', 'fk_assignments_coletor');
    await queryRunner.dropForeignKey('assignments', 'fk_assignments_campaign');
    await queryRunner.dropTable('assignments');
  }
}

