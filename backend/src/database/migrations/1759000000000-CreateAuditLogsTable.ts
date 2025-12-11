import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAuditLogsTable1759000000000 implements MigrationInterface {
  name = 'CreateAuditLogsTable1759000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'audit_logs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'action',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'entity_type',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'entity_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'old_values',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'new_values',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'ip_address',
            type: 'inet',
            isNullable: true,
          },
          {
            name: 'user_agent',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'session_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'service',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'endpoint',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Criar índices (se não existirem)
    const indices = await queryRunner.query(`
      SELECT indexname FROM pg_indexes 
      WHERE tablename = 'audit_logs' AND indexname IN ('idx_audit_logs_user_timestamp', 'idx_audit_logs_entity', 'idx_audit_logs_action_timestamp')
    `);
    
    const existingIndexNames = indices.map((idx: any) => idx.indexname);
    
    if (!existingIndexNames.includes('idx_audit_logs_user_timestamp')) {
      await queryRunner.createIndex(
        'audit_logs',
        new TableIndex({
          name: 'idx_audit_logs_user_timestamp',
          columnNames: ['user_id', 'timestamp'],
        }),
      );
    }

    if (!existingIndexNames.includes('idx_audit_logs_entity')) {
      await queryRunner.createIndex(
        'audit_logs',
        new TableIndex({
          name: 'idx_audit_logs_entity',
          columnNames: ['entity_type', 'entity_id'],
        }),
      );
    }

    if (!existingIndexNames.includes('idx_audit_logs_action_timestamp')) {
      await queryRunner.createIndex(
        'audit_logs',
        new TableIndex({
          name: 'idx_audit_logs_action_timestamp',
          columnNames: ['action', 'timestamp'],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('audit_logs', true);
  }
}


