import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateNotificationTemplatesTable1762438000000 implements MigrationInterface {
  name = 'CreateNotificationTemplatesTable1762438000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_templates',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'key',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'version',
            type: 'int',
            default: 1,
          },
          {
            name: 'channel',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'subject',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'body',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'locale',
            type: 'varchar',
            length: '10',
            default: "'pt-BR'",
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
      'notification_templates',
      new TableIndex({
        name: 'ix_notification_templates_key_version',
        columnNames: ['key', 'version'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'notification_templates',
      new TableIndex({
        name: 'ix_notification_templates_channel',
        columnNames: ['channel'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notification_templates', true);
  }
}



