import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1759200000000 implements MigrationInterface {
  name = 'CreateUsersTable1759200000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar schema users se não existir
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS users;`);

    // Criar extensão citext se não existir
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS citext;`);

    // Criar tabela users completa
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users.users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(255) NOT NULL,
        email citext NOT NULL,
        password_hash varchar(255) NOT NULL,
        role varchar(32) NOT NULL DEFAULT 'OPERATOR',
        is_active boolean NOT NULL DEFAULT true,
        avatar_url varchar(500),
        created_at timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NOT NULL DEFAULT NOW(),
        deleted_at timestamptz,
        version int NOT NULL DEFAULT 1
      );
    `);

    // Criar índice único para email
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uq_users_email ON users.users(email);
    `);

    // Criar índices adicionais para performance
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_users_role ON users.users(role);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_users_is_active ON users.users(is_active);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users.users(created_at);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS users.idx_users_created_at;`);
    await queryRunner.query(`DROP INDEX IF EXISTS users.idx_users_is_active;`);
    await queryRunner.query(`DROP INDEX IF EXISTS users.idx_users_role;`);
    await queryRunner.query(`DROP INDEX IF EXISTS users.uq_users_email;`);
    await queryRunner.query(`DROP TABLE IF EXISTS users.users;`);

    // Remover schema users (opcional - comentado para não remover se houver outros objetos)
    // await queryRunner.query(`DROP SCHEMA IF EXISTS users CASCADE;`);
  }
}






