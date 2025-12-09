import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventsTable1762294296225 implements MigrationInterface {
  name = 'CreateEventsTable1762294296225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'event_type',
            type: 'varchar',
            length: '50',
            default: "'OUTROS'",
            isNullable: false,
          },
          {
            name: 'visibility',
            type: 'varchar',
            length: '50',
            default: "'PUBLIC'",
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '50',
            default: "'DRAFT'",
            isNullable: false,
          },
          {
            name: 'created_by',
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
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'version',
            type: 'int',
            default: 1,
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Criar índices usando SQL direto
    await queryRunner.query(
      `CREATE UNIQUE INDEX "uq_events_slug" ON "events" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_events_created_by" ON "events" ("created_by")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_events_start_date" ON "events" ("start_date")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_events_event_type" ON "events" ("event_type")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_events_state" ON "events" ("state")`,
    );

    // Criar foreign key para created_by
    await queryRunner.query(`
      ALTER TABLE events 
      ADD CONSTRAINT "FK_events_created_by" 
      FOREIGN KEY ("created_by") 
      REFERENCES users("id") 
      ON DELETE RESTRICT 
      ON UPDATE CASCADE
    `);

    // Criar constraints de check
    await queryRunner.query(`
      ALTER TABLE events 
      ADD CONSTRAINT chk_events_event_type 
      CHECK (event_type IN ('MANUTENCAO', 'TRANSFERENCIA', 'AUDITORIA', 'INVENTARIO', 'OUTROS'))
    `);

    await queryRunner.query(`
      ALTER TABLE events 
      ADD CONSTRAINT chk_events_visibility 
      CHECK (visibility IN ('PUBLIC', 'PRIVATE', 'RESTRICTED'))
    `);

    await queryRunner.query(`
      ALTER TABLE events 
      ADD CONSTRAINT chk_events_state 
      CHECK (state IN ('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign key
    await queryRunner.query(
      `ALTER TABLE events DROP CONSTRAINT IF EXISTS "FK_events_created_by"`,
    );

    // Remover constraints
    await queryRunner.query(
      `ALTER TABLE events DROP CONSTRAINT IF EXISTS chk_events_state`,
    );
    await queryRunner.query(
      `ALTER TABLE events DROP CONSTRAINT IF EXISTS chk_events_visibility`,
    );
    await queryRunner.query(
      `ALTER TABLE events DROP CONSTRAINT IF EXISTS chk_events_event_type`,
    );

    // Remover índices
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_events_state"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_events_event_type"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_events_start_date"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_events_created_by"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "uq_events_slug"`);

    // Remover tabela
    await queryRunner.dropTable('events');
  }
}
