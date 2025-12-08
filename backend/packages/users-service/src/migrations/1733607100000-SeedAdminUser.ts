import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedAdminUser1733607100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = 'AdminPassword123!';
    const pepper = process.env.HASH_PEPPER || '';
    const passwordHash = bcrypt.hashSync(password + pepper, 10);

    await queryRunner.query(
      `
      INSERT INTO users.users (name, email, password_hash, role, is_active)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
      `,
      ['Administrator', 'admin@admin.local', passwordHash, 'ADMIN', true],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users.users WHERE email = 'admin@admin.local'`,
    );
  }
}

