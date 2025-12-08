import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuditTables1759400000000 implements MigrationInterface {
  name = 'CreateAuditTables1759400000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar schema audit se não existir
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS audit;`);

    // Criar tabela audit_logs
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS audit.audit_logs (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid,
        action varchar(100) NOT NULL,
        entity_type varchar(100) NOT NULL,
        entity_id uuid,
        old_values jsonb,
        new_values jsonb,
        ip_address inet,
        user_agent text,
        session_id uuid,
        service varchar(100),
        endpoint varchar(200),
        description text,
        timestamp timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NOT NULL DEFAULT NOW()
      );
    `);

    // Criar índices para audit_logs
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id_timestamp 
      ON audit.audit_logs(user_id, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_type_entity_id 
      ON audit.audit_logs(entity_type, entity_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_audit_logs_action_timestamp 
      ON audit.audit_logs(action, timestamp);
    `);

    // Criar enum para LogLevel
    await queryRunner.query(`
      CREATE TYPE audit.log_level AS ENUM ('debug', 'info', 'warn', 'error', 'fatal');
    `);

    // Criar tabela system_logs
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS audit.system_logs (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        level audit.log_level NOT NULL DEFAULT 'info',
        message text NOT NULL,
        context jsonb,
        service varchar(100),
        module varchar(100),
        function varchar(200),
        stack_trace text,
        user_id uuid,
        ip_address inet,
        endpoint varchar(200),
        method varchar(10),
        status_code int,
        response_time int,
        timestamp timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NOT NULL DEFAULT NOW()
      );
    `);

    // Criar índices para system_logs
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_system_logs_level_timestamp 
      ON audit.system_logs(level, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_system_logs_service_timestamp 
      ON audit.system_logs(service, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_system_logs_module_function 
      ON audit.system_logs(module, function);
    `);

    // Criar tabela metrics
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS audit.metrics (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(200) NOT NULL,
        value decimal(15,4) NOT NULL,
        tags jsonb,
        service varchar(100),
        endpoint varchar(200),
        response_time int,
        status_code int,
        unit varchar(50),
        description text,
        timestamp timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NOT NULL DEFAULT NOW()
      );
    `);

    // Criar índices para metrics
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_metrics_name_timestamp 
      ON audit.metrics(name, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_metrics_service_timestamp 
      ON audit.metrics(service, timestamp);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_metrics_tags 
      ON audit.metrics USING GIN(tags);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índices de metrics
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_metrics_tags;`);
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_metrics_service_timestamp;`);
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_metrics_name_timestamp;`);

    // Remover tabela metrics
    await queryRunner.query(`DROP TABLE IF EXISTS audit.metrics;`);

    // Remover índices de system_logs
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_system_logs_module_function;`);
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_system_logs_service_timestamp;`);
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_system_logs_level_timestamp;`);

    // Remover tabela system_logs
    await queryRunner.query(`DROP TABLE IF EXISTS audit.system_logs;`);

    // Remover enum LogLevel
    await queryRunner.query(`DROP TYPE IF EXISTS audit.log_level;`);

    // Remover índices de audit_logs
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_audit_logs_action_timestamp;`);
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_audit_logs_entity_type_entity_id;`);
    await queryRunner.query(`DROP INDEX IF EXISTS audit.idx_audit_logs_user_id_timestamp;`);

    // Remover tabela audit_logs
    await queryRunner.query(`DROP TABLE IF EXISTS audit.audit_logs;`);

    // Remover schema audit (opcional - comentado para não remover se houver outros objetos)
    // await queryRunner.query(`DROP SCHEMA IF EXISTS audit CASCADE;`);
  }
}

