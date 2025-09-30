import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAuditFields1758646964162 implements MigrationInterface {
  name = 'AddUserAuditFields1758646964162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS avatar_url varchar(500),
      ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
      ADD COLUMN IF NOT EXISTS version int NOT NULL DEFAULT 1
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users 
      DROP COLUMN IF EXISTS avatar_url,
      DROP COLUMN IF EXISTS deleted_at,
      DROP COLUMN IF EXISTS version
    `);
  }
}
