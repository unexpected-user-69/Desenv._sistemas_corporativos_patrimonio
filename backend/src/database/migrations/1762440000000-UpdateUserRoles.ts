import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migration para atualizar os nomes das roles de usuário:
 * - TEACHER -> MANAGER (Gerente de Patrimônio)
 * - STUDENT -> OPERATOR (Operador de Inventário)
 * 
 * Esta migration mantém a compatibilidade com dados existentes,
 * atualizando os valores no banco de dados.
 */
export class UpdateUserRoles1762440000000 implements MigrationInterface {
  name = 'UpdateUserRoles1762440000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Atualizar role TEACHER para MANAGER na tabela users
    await queryRunner.query(`
      UPDATE users 
      SET role = 'MANAGER' 
      WHERE role = 'TEACHER'
    `);

    // Atualizar role STUDENT para OPERATOR na tabela users
    await queryRunner.query(`
      UPDATE users 
      SET role = 'OPERATOR' 
      WHERE role = 'STUDENT'
    `);

    // Atualizar constraint check se existir (depende da estrutura do banco)
    // Se a tabela users tem uma constraint CHECK para validar roles,
    // ela precisará ser recriada. Isso é feito automaticamente pelo TypeORM
    // se a entidade User tiver o enum atualizado.
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter: MANAGER -> TEACHER
    await queryRunner.query(`
      UPDATE users 
      SET role = 'TEACHER' 
      WHERE role = 'MANAGER'
    `);

    // Reverter: OPERATOR -> STUDENT
    await queryRunner.query(`
      UPDATE users 
      SET role = 'STUDENT' 
      WHERE role = 'OPERATOR'
    `);
  }
}


