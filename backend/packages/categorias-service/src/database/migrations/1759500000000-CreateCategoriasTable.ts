import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriasTable1759500000000 implements MigrationInterface {
  name = 'CreateCategoriasTable1759500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar schema categorias se não existir
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS categorias;`);

    // Criar tabela categorias
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS categorias.categorias (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        codigo varchar(50) NOT NULL,
        nome varchar(100) NOT NULL,
        descricao text,
        icone varchar(50),
        cor varchar(20),
        ativo boolean NOT NULL DEFAULT true,
        created_at timestamptz NOT NULL DEFAULT NOW(),
        updated_at timestamptz NOT NULL DEFAULT NOW(),
        deleted_at timestamptz
      );
    `);

    // Criar índice único para codigo
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uq_categorias_codigo 
      ON categorias.categorias(codigo);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índice único
    await queryRunner.query(`DROP INDEX IF EXISTS categorias.uq_categorias_codigo;`);

    // Remover tabela categorias
    await queryRunner.query(`DROP TABLE IF EXISTS categorias.categorias;`);

    // Remover schema categorias (opcional - comentado para não remover se houver outros objetos)
    // await queryRunner.query(`DROP SCHEMA IF EXISTS categorias CASCADE;`);
  }
}

