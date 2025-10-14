import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migração para alterar o tipo da coluna email de VARCHAR para CITEXT.
 * 
 * Esta migração:
 * 1. Remove o índice único existente
 * 2. Altera o tipo da coluna para CITEXT
 * 3. Recria o índice único (agora case-insensitive)
 */
export class MigrateEmailToCitext1758646964164 implements MigrationInterface {
  name = 'MigrateEmailToCitext1758646964164';

  /**
   * Migra a coluna email para CITEXT.
   * 
   * @param queryRunner - Query runner do TypeORM
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remove o índice único existente
    await queryRunner.query(`DROP INDEX IF EXISTS "uq_users_email"`);
    
    // Altera o tipo da coluna email para CITEXT
    await queryRunner.query(`
      ALTER TABLE "users" 
      ALTER COLUMN "email" TYPE citext
    `);
    
    // Recria o índice único (agora case-insensitive)
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_users_email" ON "users" ("email")
    `);
    
    // Log da operação
    console.log('✅ Coluna email migrada para CITEXT com sucesso');
  }

  /**
   * Reverte a migração, voltando para VARCHAR.
   * 
   * @param queryRunner - Query runner do TypeORM
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove o índice único
    await queryRunner.query(`DROP INDEX IF EXISTS "uq_users_email"`);
    
    // Altera o tipo da coluna email de volta para VARCHAR
    await queryRunner.query(`
      ALTER TABLE "users" 
      ALTER COLUMN "email" TYPE varchar(255)
    `);
    
    // Recria o índice único original
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_users_email" ON "users" ("email")
    `);
    
    // Log da operação
    console.log('❌ Coluna email revertida para VARCHAR');
  }
}
