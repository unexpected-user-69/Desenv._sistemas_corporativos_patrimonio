import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migração para ativar a extensão CITEXT do PostgreSQL.
 * 
 * A extensão CITEXT permite comparações case-insensitive nativas,
 * simplificando consultas e garantindo unicidade independente de maiúsculas/minúsculas.
 */
export class EnableCitextExtension1758646964163 implements MigrationInterface {
  name = 'EnableCitextExtension1758646964163';

  /**
   * Ativa a extensão CITEXT no banco de dados.
   * 
   * @param queryRunner - Query runner do TypeORM
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Ativa a extensão CITEXT
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "citext"`);
    
    // Log da operação
    console.log('✅ Extensão CITEXT ativada com sucesso');
  }

  /**
   * Remove a extensão CITEXT do banco de dados.
   * 
   * @param queryRunner - Query runner do TypeORM
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove a extensão CITEXT
    await queryRunner.query(`DROP EXTENSION IF EXISTS "citext"`);
    
    // Log da operação
    console.log('❌ Extensão CITEXT removida');
  }
}
