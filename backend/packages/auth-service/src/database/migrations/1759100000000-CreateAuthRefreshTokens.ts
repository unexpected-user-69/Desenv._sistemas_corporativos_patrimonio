import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migração para criar a tabela auth_refresh_tokens.
 * 
 * Baseada no padrão do Aurora Platform, adaptada para UUID.
 */
export class CreateAuthRefreshTokens1759100000000 implements MigrationInterface {
  name = 'CreateAuthRefreshTokens1759100000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar schema auth se não existir
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth;`);

    // Criar tabela auth_refresh_tokens
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS auth.auth_refresh_tokens (
        id SERIAL PRIMARY KEY,
        user_id uuid NOT NULL,
        lookup_key varchar(64),
        token_hash varchar(255) NOT NULL,
        issued_at timestamptz NOT NULL,
        expires_at timestamptz NOT NULL,
        revoked_at timestamptz,
        replaced_by_token_id int,
        ip varchar(45),
        user_agent varchar(255),
        created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criar índices
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_auth_refresh_tokens_user_id 
      ON auth.auth_refresh_tokens(user_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_auth_refresh_tokens_expires_at 
      ON auth.auth_refresh_tokens(expires_at);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_auth_refresh_tokens_lookup_key 
      ON auth.auth_refresh_tokens(lookup_key);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índices
    await queryRunner.query(`DROP INDEX IF EXISTS auth.idx_auth_refresh_tokens_lookup_key;`);
    await queryRunner.query(`DROP INDEX IF EXISTS auth.idx_auth_refresh_tokens_expires_at;`);
    await queryRunner.query(`DROP INDEX IF EXISTS auth.idx_auth_refresh_tokens_user_id;`);

    // Remover tabela auth_refresh_tokens
    await queryRunner.query(`DROP TABLE IF EXISTS auth.auth_refresh_tokens;`);

    // Remover schema auth (opcional - comentado para não remover se houver outros objetos)
    // await queryRunner.query(`DROP SCHEMA IF EXISTS auth CASCADE;`);
  }
}
