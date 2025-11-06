import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateNotificationPoliciesTable1762438000001 implements MigrationInterface {
  name = 'CreateNotificationPoliciesTable1762438000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_policies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'event_key',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'priority',
            type: 'varchar',
            length: '20',
            default: "'medium'",
          },
          {
            name: 'channels',
            type: 'varchar',
            isArray: true,
            default: "'{}'",
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'notification_policies',
      new TableIndex({
        name: 'ix_notification_policies_event_key',
        columnNames: ['event_key'],
      }),
    );

    await queryRunner.createIndex(
      'notification_policies',
      new TableIndex({
        name: 'ix_notification_policies_enabled',
        columnNames: ['enabled'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notification_policies', true);
  }
}

