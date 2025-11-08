import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateNotificationLogsTable1762438000003 implements MigrationInterface {
  name = 'CreateNotificationLogsTable1762438000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_logs',
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
            name: 'channel',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'pending'",
          },
          {
            name: 'attempts',
            type: 'int',
            default: 0,
          },
          {
            name: 'duration_ms',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'error',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'recipient',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'notification_logs',
      new TableIndex({
        name: 'ix_notification_logs_event_key',
        columnNames: ['event_key'],
      }),
    );

    await queryRunner.createIndex(
      'notification_logs',
      new TableIndex({
        name: 'ix_notification_logs_channel_status_created_at',
        columnNames: ['channel', 'status', 'created_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notification_logs', true);
  }
}



