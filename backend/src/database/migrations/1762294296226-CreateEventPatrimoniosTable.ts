import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventPatrimoniosTable1762294296226
  implements MigrationInterface
{
  name = 'CreateEventPatrimoniosTable1762294296226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_patrimonios',
        columns: [
          {
            name: 'event_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'patrimonio_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
      true,
    );

    // Criar índice único composto
    await queryRunner.query(
      `CREATE UNIQUE INDEX "uq_event_patrimonios_event_patrimonio" ON "event_patrimonios" ("event_id", "patrimonio_id")`,
    );

    // Criar índices individuais
    await queryRunner.query(
      `CREATE INDEX "idx_event_patrimonios_event" ON "event_patrimonios" ("event_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_event_patrimonios_patrimonio" ON "event_patrimonios" ("patrimonio_id")`,
    );

    // Criar foreign keys
    await queryRunner.query(`
      ALTER TABLE event_patrimonios 
      ADD CONSTRAINT "FK_event_patrimonios_event" 
      FOREIGN KEY ("event_id") 
      REFERENCES events("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE event_patrimonios 
      ADD CONSTRAINT "FK_event_patrimonios_patrimonio" 
      FOREIGN KEY ("patrimonio_id") 
      REFERENCES patrimonios("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign keys
    await queryRunner.query(
      `ALTER TABLE event_patrimonios DROP CONSTRAINT IF EXISTS "FK_event_patrimonios_patrimonio"`,
    );
    await queryRunner.query(
      `ALTER TABLE event_patrimonios DROP CONSTRAINT IF EXISTS "FK_event_patrimonios_event"`,
    );

    // Remover índices
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_event_patrimonios_patrimonio"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_event_patrimonios_event"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "uq_event_patrimonios_event_patrimonio"`,
    );

    // Remover tabela
    await queryRunner.dropTable('event_patrimonios');
  }
}
