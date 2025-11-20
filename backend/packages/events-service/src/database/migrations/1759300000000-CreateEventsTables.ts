import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventsTables1759300000000 implements MigrationInterface {
  name = 'CreateEventsTables1759300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela events
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title varchar(255) NOT NULL,
        description text,
        slug varchar(255) NOT NULL,
        start_date timestamptz NOT NULL,
        end_date timestamptz,
        event_type varchar(50) NOT NULL DEFAULT 'OUTROS',
        visibility varchar(50) NOT NULL DEFAULT 'PUBLIC',
        state varchar(50) NOT NULL DEFAULT 'DRAFT',
        created_by uuid NOT NULL,
        created_at timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NOT NULL DEFAULT NOW(),
        deleted_at timestamptz,
        version int NOT NULL DEFAULT 1,
        CONSTRAINT chk_events_event_type CHECK (event_type IN ('MANUTENCAO', 'TRANSFERENCIA', 'AUDITORIA', 'INVENTARIO', 'OUTROS')),
        CONSTRAINT chk_events_visibility CHECK (visibility IN ('PUBLIC', 'PRIVATE', 'RESTRICTED')),
        CONSTRAINT chk_events_state CHECK (state IN ('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED'))
      );
    `);

    // Criar índices para events
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uq_events_slug ON events(slug);
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_events_state ON events(state);
    `);

    // Criar foreign key para created_by (referência a users)
    await queryRunner.query(`
      ALTER TABLE events 
      ADD CONSTRAINT FK_events_created_by 
      FOREIGN KEY (created_by) 
      REFERENCES users(id) 
      ON DELETE RESTRICT 
      ON UPDATE CASCADE;
    `);

    // Criar tabela event_patrimonios
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS event_patrimonios (
        event_id uuid NOT NULL,
        patrimonio_id uuid NOT NULL,
        PRIMARY KEY (event_id, patrimonio_id)
      );
    `);

    // Criar índices para event_patrimonios
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uq_event_patrimonios_event_patrimonio 
      ON event_patrimonios (event_id, patrimonio_id);
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_event_patrimonios_event 
      ON event_patrimonios (event_id);
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_event_patrimonios_patrimonio 
      ON event_patrimonios (patrimonio_id);
    `);

    // Criar foreign keys para event_patrimonios
    await queryRunner.query(`
      ALTER TABLE event_patrimonios 
      ADD CONSTRAINT FK_event_patrimonios_event 
      FOREIGN KEY (event_id) 
      REFERENCES events(id) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE event_patrimonios 
      ADD CONSTRAINT FK_event_patrimonios_patrimonio 
      FOREIGN KEY (patrimonio_id) 
      REFERENCES patrimonios(id) 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign keys de event_patrimonios
    await queryRunner.query(`
      ALTER TABLE event_patrimonios 
      DROP CONSTRAINT IF EXISTS FK_event_patrimonios_patrimonio;
    `);
    await queryRunner.query(`
      ALTER TABLE event_patrimonios 
      DROP CONSTRAINT IF EXISTS FK_event_patrimonios_event;
    `);

    // Remover índices de event_patrimonios
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_event_patrimonios_patrimonio;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_event_patrimonios_event;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS uq_event_patrimonios_event_patrimonio;
    `);

    // Remover tabela event_patrimonios
    await queryRunner.query(`
      DROP TABLE IF EXISTS event_patrimonios;
    `);

    // Remover foreign key de events
    await queryRunner.query(`
      ALTER TABLE events 
      DROP CONSTRAINT IF EXISTS FK_events_created_by;
    `);

    // Remover índices de events
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_events_state;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_events_event_type;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_events_start_date;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_events_created_by;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS uq_events_slug;
    `);

    // Remover tabela events
    await queryRunner.query(`
      DROP TABLE IF EXISTS events;
    `);
  }
}





