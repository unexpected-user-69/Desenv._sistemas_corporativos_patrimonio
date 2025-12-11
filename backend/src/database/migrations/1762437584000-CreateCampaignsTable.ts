import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateCampaignsTable1762437584000 implements MigrationInterface {
  name = 'CreateCampaignsTable1762437584000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campaigns',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'local',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'periodo_inicio',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'periodo_fim',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'owner_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'draft'",
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

    // Foreign key para users
    await queryRunner.createForeignKey(
      'campaigns',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
        name: 'fk_campaigns_owner',
      }),
    );

    // Constraint de check para status
    await queryRunner.query(`
      ALTER TABLE campaigns 
      ADD CONSTRAINT chk_campaigns_status 
      CHECK (status IN ('draft', 'active', 'completed', 'canceled'))
    `);

    // Índice
    await queryRunner.createIndex(
      'campaigns',
      new TableIndex({
        name: 'ix_campaigns_owner_status_periodo',
        columnNames: ['owner_id', 'status', 'periodo_inicio'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE campaigns DROP CONSTRAINT IF EXISTS chk_campaigns_status`,
    );
    await queryRunner.dropForeignKey('campaigns', 'fk_campaigns_owner');
    await queryRunner.dropIndex('campaigns', 'ix_campaigns_owner_status_periodo');
    await queryRunner.dropTable('campaigns');
  }
}

